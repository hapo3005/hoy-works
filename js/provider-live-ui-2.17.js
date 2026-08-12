/* HOY Works 2.17 — provider-controlled, expiring availability */
(function(){
  if(window.__hoyWorksProviderLiveUI217)return;
  window.__hoyWorksProviderLiveUI217=true;

  const labels={
    unknown:'Nicht live bestätigt',
    available_now:'Jetzt erreichbar',
    available_today:'Heute verfügbar',
    limited:'Heute eingeschränkt',
    unavailable:'Aktuell keine Kapazität'
  };

  function timeLabel(value){
    if(!value)return '';
    try{return new Intl.DateTimeFormat('de-DE',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(value))}catch{return ''}
  }

  function liveControl(){
    const pc=state.providerContext;
    if(!pc?.provider)return '';
    const live=pc.live_status||{status:'unknown',accepts_urgent:false,availability_note:null,expires_at:null};
    const status=live.status||'unknown';
    const expiry=timeLabel(live.expires_at);
    return `<div class="provider-live-control">
      <div class="provider-live-head"><div><div class="eyebrow">HOY NOW · BETRIEBSSTATUS</div><h3>Bist du heute erreichbar?</h3></div><span class="provider-live-pill live-${esc(status)}">${esc(labels[status]||labels.unknown)}</span></div>
      <p>Nur du als bestätigter Betreiber kannst diesen Status setzen. Er verfällt automatisch – HOY zeigt niemals alte Verfügbarkeit als aktuell an.</p>
      ${expiry?`<div class="provider-live-expiry">Bestätigt bis <b>${esc(expiry)}</b></div>`:''}
      <label class="provider-live-urgent"><input id="providerUrgent" type="checkbox" ${live.accepts_urgent?'checked':''}><span>Auch dringende Anfragen akzeptieren</span></label>
      <div class="field provider-live-note"><label>Optionaler Hinweis</label><input id="providerLiveNote" maxlength="240" value="${esc(live.availability_note||'')}" placeholder="z. B. heute nur bis 18 Uhr"></div>
      <div class="provider-live-actions">
        <button data-provider-live-status="available_now">Jetzt · 4 Std.</button>
        <button data-provider-live-status="available_today">Heute verfügbar</button>
        <button data-provider-live-status="limited">Eingeschränkt</button>
        <button data-provider-live-status="unavailable">Keine Kapazität</button>
        ${status!=='unknown'?'<button class="quiet" data-provider-live-status="unknown">Live-Status löschen</button>':''}
      </div>
      <small class="provider-live-foot">„Heute verfügbar“ und „eingeschränkt“ enden automatisch am lokalen Tagesende. „Keine Kapazität“ verfällt nach 24 Stunden.</small>
    </div>`;
  }

  const baseBusinessLive=businessLive;
  businessLive=function(){
    const html=baseBusinessLive();
    if(!state.providerContext?.provider)return html;
    const marker='<div class="inbox-tabs">';
    return html.includes(marker)?html.replace(marker,liveControl()+marker):html+liveControl();
  };

  document.addEventListener('click',async e=>{
    const btn=e.target.closest('[data-provider-live-status]');
    if(!btn)return;
    const providerId=state.providerContext?.provider?.id;
    if(!providerId||!window.HOYWorksBackend?.setProviderLiveStatus){toast('Betriebsstatus ist noch nicht verfügbar');return}
    const status=btn.dataset.providerLiveStatus;
    const acceptsUrgent=!!document.querySelector('#providerUrgent')?.checked;
    const note=status==='unknown'?null:(document.querySelector('#providerLiveNote')?.value.trim()||null);
    try{
      btn.disabled=true;
      const row=await window.HOYWorksBackend.setProviderLiveStatus({providerId,status,acceptsUrgent,note});
      state.providerContext.live_status=row||{provider_id:providerId,status:'unknown',accepts_urgent:false,availability_note:null,confirmed_at:null,expires_at:null};
      try{state.providers=await window.HOYWorksBackend.listProviders()}catch{}
      render();
      toast(status==='unknown'?'Live-Status entfernt':`${labels[status]||'Status'} bestätigt`);
    }catch(err){console.error(err);toast(err?.message||'Live-Status konnte nicht gespeichert werden')}
  });
})();
