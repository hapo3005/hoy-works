async function refreshProviderContext(){
  if(!window.HOYWorksBackend||!signedIn())return;
  try{state.providerContext=await window.HOYWorksBackend.getProviderContext(state.providerContext?.provider?.id||null);render()}catch(err){console.error(err);toast('Betriebs-Inbox konnte nicht aktualisiert werden')}
}

function openRequestDetail(id){
  const r=state.myRequests.find(x=>String(x.id)===String(id));if(!r)return;const matches=matchesForRequest(r.id);const d=$('#detail');
  d.innerHTML=`<div class="detail-body request-detail-body"><div class="detail-head-inline"><button class="round" data-detail-close>${icons.back}</button><div class="eyebrow">${esc(r.public_ref)}</div></div><h2>${esc(cat(r.service_id)?.label||r.service_id)}</h2><div class="status-badge status-${esc(r.status)}">${esc(statusText(r.status))}</div><div class="summary-card"><div class="summary-row"><span>Ort</span><b>${esc(r.location_text)}</b></div><div class="summary-row"><span>Gemeinde</span><b>${esc(r.municipality||'manuelle Prüfung')}</b></div><div class="summary-row"><span>Wann?</span><b>${esc(urgency(r.urgency))}</b></div><div class="summary-row"><span>Sprache</span><b>${esc(r.preferred_language)}</b></div><div class="summary-row"><span>Fotos</span><b>${Number(r.photo_count||0)}</b></div></div><div class="detail-section"><h3>Beschreibung</h3><p>${esc(r.description)}</p></div><div class="detail-section"><h3>HOY Match</h3>${matches.length?matches.map(m=>`<div class="match-line"><div><b>${esc(m.providers?.name||'Anbieter')}</b><small>${esc((m.reasons||[]).join(' · '))}</small></div><span>${Math.round(Number(m.score||0))}%</span></div>`).join(''):'<p>Noch kein Anbieter mit verifiziert passendem Einsatzgebiet.</p>'}</div>${r.photo_count?`<button class="primary-wide" data-customer-photos="${esc(r.id)}">Private Fotos ansehen</button>`:''}</div>`;d.showModal();
}

async function openPhotoGallery(requestId){
  try{
    toast('Private Fotos werden geladen …');const photos=await window.HOYWorksBackend.listRequestPhotos(requestId);const d=$('#detail');
    d.innerHTML=`<div class="detail-body request-detail-body"><div class="detail-head-inline"><button class="round" data-detail-close>${icons.back}</button><div class="eyebrow">PRIVATE FOTOS</div></div><h2>Nur für Beteiligte.</h2><p class="flow-lead">Die Links sind zeitlich begrenzt und nicht öffentlich.</p><div class="photo-gallery">${photos.length?photos.map(p=>`<figure><img src="${esc(p.signed_url||'')}" alt="Privates Anfragefoto"><figcaption>${esc(p.original_name||'Foto')}</figcaption></figure>`).join(''):'<div class="empty compact"><p>Keine Fotos vorhanden.</p></div>'}</div></div>`;d.showModal();
  }catch(err){console.error(err);toast('Fotos konnten nicht geladen werden')}
}

async function handlePostRequestPhotos(input){
  const requestId=input.dataset.photoRequest;const files=[...input.files].slice(0,6);if(!files.length)return;
  let ok=0;toast('Fotos werden privat hochgeladen …');
  for(const file of files){try{await window.HOYWorksBackend.uploadRequestPhoto(requestId,file);ok++}catch(err){console.error(err)}}
  await refreshMyArea();render();toast(`${ok} Foto${ok===1?'':'s'} privat gespeichert`)
}

