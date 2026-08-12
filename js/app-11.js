document.addEventListener('click',async e=>{
  const nav=e.target.closest('[data-nav]');if(nav){navigate(nav.dataset.nav);return}
  const fav=e.target.closest('[data-fav]');if(fav){e.stopPropagation();toggleFav(fav.dataset.fav);return}
  const open=e.target.closest('[data-open]');if(open){openDetail(open.dataset.open);return}
  if(e.target.closest('[data-detail-close]')){$('#detail')?.close();return}
  if(e.target.closest('[data-start-request]')){openRequest(1);return}
  const rj=e.target.closest('[data-request-jump]');if(rj){openRequest(Number(rj.dataset.requestJump));return}
  const rp=e.target.closest('[data-request-provider]');if(rp){const p=state.providers.find(x=>String(x.id)===String(rp.dataset.requestProvider));if(p?.cats?.length)state.request.category=p.cats[0];$('#detail')?.close();saveDraft();openRequest(1);return}
  const f=e.target.closest('[data-filter]');if(f){state.filter=f.dataset.filter;render();return}
  const fh=e.target.closest('[data-filter-home]');if(fh){state.filter=fh.dataset.filter;navigate('discover');return}
  if(e.target.closest('[data-search]')){state.query=$('#q')?.value||'';render();return}
  const cc=e.target.closest('[data-choose-cat]');if(cc){state.request.category=cc.dataset.chooseCat;saveDraft();openRequest(1);return}
  const cu=e.target.closest('[data-choose-urgency]');if(cu){state.request.urgency=cu.dataset.chooseUrgency;saveDraft();openRequest(2);return}
  if(e.target.closest('[data-use-location]')){await useCurrentLocation();return}
  if(e.target.closest('[data-flow-close]')){$('#requestFlow')?.close();return}
  if(e.target.closest('[data-flow-back]')){captureStep();openRequest(Math.max(1,state.request.step-1));return}
  if(e.target.closest('[data-flow-next]')){captureStep();if(state.request.step===1&&!state.request.category){toast('Bitte eine Leistung wählen');return}if(state.request.step<5){openRequest(state.request.step+1);return}await submitRequest();return}
  if(e.target.closest('[data-auth-open]')){openAuth('none');return}
  if(e.target.closest('[data-auth-close]')){$('#authFlow')?.close();return}
  if(e.target.closest('[data-auth-send]')){const email=$('#authEmail')?.value.trim();if(!email){toast('Bitte E-Mail eingeben');return}try{await window.HOYWorksBackend.signInWithOtp(email);toast('Anmeldelink gesendet');$('#authFlow')?.close()}catch(err){toast(err?.message||'Anmeldung fehlgeschlagen')}return}
  const call=e.target.closest('[data-call]');if(call){location.href=`tel:${call.dataset.call.replace(/\s+/g,'')}`;return}
  const site=e.target.closest('[data-site]');if(site){window.open(site.dataset.site,'_blank','noopener');return}
  if(e.target.closest('[data-provider-start]')){openProviderFlow();return}
  if(e.target.closest('[data-provider-close]')){$('#providerFlow')?.close();return}
  if(e.target.closest('[data-provider-submit]')){await submitProviderApplication();return}
  if(e.target.closest('[data-business-live]')){state.view='business-live';render();return}
  const liveAccept=e.target.closest('[data-live-accept]');if(liveAccept){const providerId=state.providerContext?.provider?.id;if(!providerId)return;try{await window.HOYWorksBackend.providerRequestAction({requestId:liveAccept.dataset.liveAccept,providerId,action:'accept'});toast('Anfrage angenommen');await refreshProviderContext()}catch(err){toast(err.message||'Annahme fehlgeschlagen')}return}
  const liveStatus=e.target.closest('[data-live-status]');if(liveStatus){const providerId=state.providerContext?.provider?.id;if(!providerId)return;try{await window.HOYWorksBackend.providerRequestAction({requestId:liveStatus.dataset.liveStatus,providerId,action:'status',status:liveStatus.dataset.status});toast('Status aktualisiert');await refreshProviderContext()}catch(err){toast(err.message||'Statusänderung fehlgeschlagen')}return}
  const rd=e.target.closest('[data-request-detail]');if(rd){openRequestDetail(rd.dataset.requestDetail);return}
  const cp=e.target.closest('[data-customer-photos]');if(cp){await openPhotoGallery(cp.dataset.customerPhotos);return}
  const pp=e.target.closest('[data-provider-photos]');if(pp){await openPhotoGallery(pp.dataset.providerPhotos);return}
});

document.addEventListener('change',async e=>{if(e.target.matches('[data-photo-request]'))await handlePostRequestPhotos(e.target)});

window.addEventListener('hoyworks:auth',async e=>{
  state.user=e.detail?.session?.user||null;
  if(state.user){await refreshMyArea();render();await resumeAfterAuth()}else{state.myRequests=[];state.myMatches=[];state.providerContext=null;render()}
});

render();
initCloud();
