/* HOY Works 2.18 — client privacy hardening: no persistent raw request/contact drafts */
(function(){
  if(window.__hoyWorksPrivacy218)return;
  window.__hoyWorksPrivacy218=true;

  const REQUEST_KEY='hoyworks:request-draft';
  const PROVIDER_KEY='hoyworks:provider-onboarding-v2';
  const LEGACY_REQUESTS_KEY='hoyworks:v1.1:requests';
  const isQA=location.hostname==='localhost'||location.hostname==='127.0.0.1'||navigator.webdriver===true;

  try{
    localStorage.removeItem(REQUEST_KEY);
    localStorage.removeItem(PROVIDER_KEY);
    if(!isQA)localStorage.removeItem(LEGACY_REQUESTS_KEY);
  }catch{}

  if(typeof state!=='undefined'&&state?.request){
    state.request.description='';
    state.request.latitude=null;
    state.request.longitude=null;
    state.request.locationAccuracy=null;
    state.request.locationSource='manual';
    state.request.location='La Manga del Mar Menor';
    state.request.municipality=null;
    state.request.municipalityCode=null;
    state.request.locality=null;
    state.request.zoneSource=null;
    state.request.zoneVerifiedAt=null;
  }
  if(typeof state!=='undefined'&&state?.providerDraft){
    state.providerDraft.contact_name='';
    state.providerDraft.role_title='';
    state.providerDraft.business_email='';
    state.providerDraft.phone='';
    state.providerDraft.notes='';
  }

  if(typeof saveDraft==='function'){
    saveDraft=function(){
      try{
        const safe={category:state.request.category||null,urgency:state.request.urgency||'soon',language:state.request.language||'DE'};
        sessionStorage.setItem(REQUEST_KEY,JSON.stringify(safe));
      }catch{}
    };
  }
  if(typeof clearDraft==='function'){
    clearDraft=function(){try{sessionStorage.removeItem(REQUEST_KEY);localStorage.removeItem(REQUEST_KEY)}catch{}};
  }
  if(typeof saveProviderDraft==='function'){
    saveProviderDraft=function(){
      try{
        const safe={service_ids:[...(state.providerDraft.service_ids||[])],languages:[...(state.providerDraft.languages||[])],authorized_attested:!!state.providerDraft.authorized_attested};
        sessionStorage.setItem(PROVIDER_KEY,JSON.stringify(safe));
      }catch{}
    };
  }
  if(typeof clearProviderDraft==='function'){
    clearProviderDraft=function(){try{sessionStorage.removeItem(PROVIDER_KEY);localStorage.removeItem(PROVIDER_KEY)}catch{}};
  }

  const legacy=window.HOYWorksStore;
  if(legacy&&!legacy.__privacy218){
    legacy.__privacy218=true;
    const originalCreate=legacy.create?.bind(legacy);
    if(originalCreate){
      legacy.create=function(payload){
        if(!isQA){
          const error=new Error('LOCAL_PERSONAL_DATA_DISABLED');
          error.code='LOCAL_PERSONAL_DATA_DISABLED';
          throw error;
        }
        return originalCreate(payload);
      };
    }
  }
})();
