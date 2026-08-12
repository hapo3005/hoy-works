(function(){
  const URL='https://dqfouwyclvmpkunmxkun.supabase.co';
  const PUBLISHABLE_KEY='sb_publishable_dGjnjLGAFx5Nt5O4Flc2aw_VG-QwKXE';
  if(!window.supabase?.createClient){
    console.warn('HOY Works: Supabase SDK nicht geladen; lokaler Fallback bleibt aktiv.');
    return;
  }

  const client=window.supabase.createClient(URL,PUBLISHABLE_KEY,{
    auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
  });

  function initials(name=''){
    return name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]?.toUpperCase()||'').join('')||'HW';
  }
  function dateDE(value){
    if(!value)return null;
    try{return new Intl.DateTimeFormat('de-DE',{day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(value));}catch{return null;}
  }
  function functionError(error,data,fallback){
    if(data?.error){const e=new Error(data.error);e.code=data.error;e.detail=data;throw e;}
    if(error){const e=new Error(error.message||fallback);e.code=error.name||'FUNCTION_ERROR';throw e;}
  }

  async function listProviders(){
    const {data,error}=await client.from('provider_catalog').select('*').order('name');
    if(error)throw error;
    return (data||[]).map(p=>({
      id:p.id,slug:p.slug,name:p.name,initials:initials(p.name),cats:p.services||[],
      area:[...new Set(p.coverage||[])].join(' · ')||'Einsatzgebiet wird geprüft',
      phone:p.phone||null,languages:p.languages||[],urgent:false,summary:p.summary||'',
      source:`Unternehmensquelle geprüft${p.source_checked_at?' am '+dateDE(p.source_checked_at):''}`,
      sourceUrl:p.public_source_url||p.website_url||null,verification:p.source_status||'unverified',
      partnership:p.partnership_status||'none',website:p.website_url||null,live:true
    }));
  }

  async function getSession(){
    const {data,error}=await client.auth.getSession();
    if(error)throw error;
    return data.session||null;
  }
  async function getUser(){
    const {data,error}=await client.auth.getUser();
    if(error)return null;
    return data.user||null;
  }
  async function signInWithOtp(email){
    const clean=String(email||'').trim().toLowerCase();
    if(!clean)throw new Error('E-Mail fehlt');
    const options={shouldCreateUser:true};
    if(location.protocol==='http:'||location.protocol==='https:')options.emailRedirectTo=location.origin+location.pathname;
    const {data,error}=await client.auth.signInWithOtp({email:clean,options});
    if(error)throw error;
    return data;
  }
  async function signOut(){
    const {error}=await client.auth.signOut();
    if(error)throw error;
  }
  async function ensureProfile(){
    const user=await getUser();
    if(!user)return null;
    const {data,error}=await client.from('profiles').upsert({user_id:user.id},{onConflict:'user_id'}).select().single();
    if(error)throw error;
    return data;
  }

  async function resolveServiceZone({lat,lng,accuracy}){
    const {data,error}=await client.functions.invoke('resolve-service-zone',{body:{lat,lng,accuracy}});
    functionError(error,data,'Zuständigkeit konnte nicht ermittelt werden');
    return data;
  }

  async function createRequest(payload){
    const user=await getUser();
    if(!user){const e=new Error('AUTH_REQUIRED');e.code='AUTH_REQUIRED';throw e;}
    await ensureProfile();
    const row={
      service_id:payload.category,
      urgency:payload.urgency||'soon',
      location_text:payload.location||'La Manga del Mar Menor',
      latitude:Number.isFinite(Number(payload.latitude))?Number(payload.latitude):null,
      longitude:Number.isFinite(Number(payload.longitude))?Number(payload.longitude):null,
      municipality:payload.municipality||null,
      municipality_code:payload.municipalityCode||null,
      locality:payload.locality||null,
      location_source:payload.locationSource||'manual',
      location_accuracy_m:Number.isFinite(Number(payload.locationAccuracy))?Number(payload.locationAccuracy):null,
      zone_source:payload.zoneSource||null,
      zone_verified_at:payload.zoneVerifiedAt||null,
      preferred_language:payload.language||'DE',
      description:payload.description||'Keine Beschreibung'
    };
    const {data,error}=await client.from('work_requests').insert(row).select('id,public_ref,status,service_id,urgency,location_text,latitude,longitude,municipality,municipality_code,locality,location_source,location_accuracy_m,zone_source,zone_verified_at,preferred_language,description,created_at,updated_at').single();
    if(error)throw error;
    return data;
  }

  async function listMyRequests(){
    const user=await getUser();
    if(!user)return [];
    const {data,error}=await client.from('work_requests')
      .select('id,public_ref,status,service_id,urgency,location_text,latitude,longitude,municipality,municipality_code,locality,location_source,location_accuracy_m,zone_source,zone_verified_at,preferred_language,description,assigned_provider_id,created_at,updated_at')
      .order('created_at',{ascending:false});
    if(error)throw error;
    const rows=data||[];
    if(!rows.length)return rows;
    const {data:photoRows}=await client.from('request_photos').select('request_id').in('request_id',rows.map(r=>r.id));
    const counts={};
    for(const p of photoRows||[])counts[p.request_id]=(counts[p.request_id]||0)+1;
    return rows.map(r=>({...r,photo_count:counts[r.id]||0}));
  }

  async function listMyMatches(){
    const user=await getUser();
    if(!user)return [];
    const {data,error}=await client.from('request_matches')
      .select('request_id,provider_id,score,reasons,is_eligible,providers(id,name,slug,source_status,partnership_status)')
      .order('score',{ascending:false});
    if(error)throw error;
    return data||[];
  }

  async function matchRequest(requestId){
    const {data,error}=await client.functions.invoke('request-match',{body:{request_id:requestId}});
    functionError(error,data,'Matching fehlgeschlagen');
    return data;
  }

  async function uploadRequestPhoto(requestId,file){
    if(!file)throw new Error('Datei fehlt');
    const {data:ticket,error:ticketError}=await client.functions.invoke('request-photos',{body:{
      action:'create_upload',request_id:requestId,original_name:file.name,content_type:file.type,byte_size:file.size
    }});
    functionError(ticketError,ticket,'Upload konnte nicht vorbereitet werden');
    const {error:uploadError}=await client.storage.from('request-photos').uploadToSignedUrl(ticket.path,ticket.token,file);
    if(uploadError)throw uploadError;
    const {data:complete,error:completeError}=await client.functions.invoke('request-photos',{body:{
      action:'complete_upload',request_id:requestId,path:ticket.path,original_name:file.name,content_type:file.type,byte_size:file.size
    }});
    functionError(completeError,complete,'Foto konnte nicht bestätigt werden');
    return complete.photo;
  }

  async function listRequestPhotos(requestId){
    const {data,error}=await client.functions.invoke('request-photos',{body:{action:'list',request_id:requestId}});
    functionError(error,data,'Fotos konnten nicht geladen werden');
    return data.photos||[];
  }

  async function submitProviderApplication(payload){
    const {data,error}=await client.functions.invoke('provider-onboarding',{body:payload});
    functionError(error,data,'Betriebsanmeldung fehlgeschlagen');
    return data;
  }

  async function getProviderContext(providerId=null){
    const {data,error}=await client.functions.invoke('provider-inbox',{body:providerId?{provider_id:providerId}:{}});
    functionError(error,data,'Betriebs-Inbox konnte nicht geladen werden');
    return data;
  }

  async function providerRequestAction({requestId,providerId,action,status}){
    const {data,error}=await client.functions.invoke('provider-request-action',{
      body:{request_id:requestId,provider_id:providerId,action,status}
    });
    functionError(error,data,'Anfrage konnte nicht aktualisiert werden');
    return data;
  }

  async function ping(){
    const rows=await listProviders();
    return {ok:true,providers:rows.length,url:URL};
  }

  client.auth.onAuthStateChange((event,session)=>{
    window.dispatchEvent(new CustomEvent('hoyworks:auth',{detail:{event,session}}));
  });

  window.HOYWorksBackend={
    client,url:URL,mode:'live',listProviders,getSession,getUser,signInWithOtp,signOut,ensureProfile,
    resolveServiceZone,createRequest,listMyRequests,listMyMatches,matchRequest,uploadRequestPhoto,listRequestPhotos,
    submitProviderApplication,getProviderContext,providerRequestAction,ping
  };
})();
