/* HOY Works 2.17 — provider live-status backend bridge */
(function(){
  const b=window.HOYWorksBackend;
  if(!b||b.__providerLive217)return;
  b.__providerLive217=true;
  const client=b.client;
  const baseList=b.listProviders.bind(b);
  const baseContext=b.getProviderContext.bind(b);

  b.listProviders=async function(){
    const providers=await baseList();
    const {data,error}=await client.from('provider_catalog')
      .select('id,availability_status,accepts_urgent,availability_note,availability_confirmed_at,availability_expires_at');
    if(error){console.warn('HOY Works: live status catalogue enrichment failed',error);return providers}
    const live=new Map((data||[]).map(x=>[String(x.id),x]));
    return providers.map(p=>{
      const s=live.get(String(p.id))||{};
      return {...p,
        availabilityStatus:s.availability_status||null,
        acceptsUrgent:!!s.accepts_urgent,
        availabilityNote:s.availability_note||null,
        availabilityConfirmedAt:s.availability_confirmed_at||null,
        availabilityExpiresAt:s.availability_expires_at||null
      };
    });
  };

  b.getProviderContext=async function(providerId=null){
    const ctx=await baseContext(providerId);
    const id=ctx?.provider?.id;
    if(!id)return ctx;
    if(ctx.live_status)return ctx;
    const {data,error}=await client.from('provider_live_status')
      .select('provider_id,status,accepts_urgent,availability_note,confirmed_at,expires_at,updated_at')
      .eq('provider_id',id).maybeSingle();
    if(!error)ctx.live_status=data||{provider_id:id,status:'unknown',accepts_urgent:false,availability_note:null,confirmed_at:null,expires_at:null};
    return ctx;
  };

  b.setProviderLiveStatus=async function({providerId,status,acceptsUrgent=false,note=null}){
    const {data,error}=await client.functions.invoke('provider-live-status',{body:{
      provider_id:providerId,
      status,
      accepts_urgent:!!acceptsUrgent,
      note:note||null
    }});
    if(error)throw error;
    if(data?.error)throw new Error(data.error);
    return data?.live_status||null;
  };
})();
