/* HOY Works 2.17 — clearer language + trust signal + expiring provider live status */
(function(){
  if(window.__hoyWorksProfileEnhance29)return;
  window.__hoyWorksProfileEnhance29=true;
  const baseOpenDetail=openDetail;
  const labels={DE:'Deutsch',EN:'English',ES:'Español'};
  const liveLabels={available_now:'Jetzt erreichbar',available_today:'Heute verfügbar',limited:'Heute eingeschränkt',unavailable:'Aktuell keine Kapazität'};
  function liveText(p){return liveLabels[p.availabilityStatus]||'Nicht live bestätigt'}
  function liveInfo(p){
    if(!p.availabilityStatus)return 'Keine aktuelle Betreiberbestätigung. Website-Daten werden nicht als Verfügbarkeit interpretiert.';
    let suffix='Vom Betreiber aktuell bestätigt';
    if(p.acceptsUrgent&&['available_now','available_today','limited'].includes(p.availabilityStatus))suffix+=' · dringende Anfragen möglich';
    if(p.availabilityNote)suffix+=` · ${p.availabilityNote}`;
    return suffix+'.';
  }
  openDetail=function(id){
    baseOpenDetail(id);
    const p=state.providers.find(x=>String(x.id)===String(id));
    const body=document.querySelector('#detail .detail-body');
    if(!p||!body)return;
    const preferred=state.request?.language||'DE';
    const speaks=(p.languages||[]).includes(preferred);
    const block=document.createElement('div');
    block.className='provider-fit-card';
    block.innerHTML=`<div class="provider-fit-top"><div><small>HOY MATCH SIGNAL</small><b>${speaks?'Sprache passt':'Sprachabgleich beachten'}</b></div><span class="${speaks?'fit-good':'fit-neutral'}">${speaks?'✓ '+(labels[preferred]||preferred):(labels[preferred]||preferred)}</span></div><div class="provider-fit-grid"><div><small>BESTÄTIGTE SPRACHEN</small><strong>${esc((p.languages||[]).map(l=>labels[l]||l).join(' · ')||'Noch offen')}</strong></div><div><small>QUELLENSTATUS</small><strong>${p.verification==='source_checked'?'Unternehmensquelle geprüft':p.verification==='directory_only'?'Nur Verzeichnisquelle':'Noch zu prüfen'}</strong></div><div><small>LIVE-VERFÜGBARKEIT</small><strong>${esc(liveText(p))}</strong></div></div><p>${esc(liveInfo(p))} HOY trennt veröffentlichte Unternehmensdaten, bestätigte Sprache, Einsatzgebiet und aktuelle Verfügbarkeit bewusst voneinander.</p>`;
    const trust=body.querySelector('.profile-trust');
    if(trust)trust.insertAdjacentElement('afterend',block);else body.prepend(block);
  };
})();
