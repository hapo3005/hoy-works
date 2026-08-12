function businessLive(){
  const pc=state.providerContext;if(!pc?.provider)return provider();
  const leads=pc.open_leads||[],assigned=pc.assigned||[];
  const transitions={accepted:['question','quoted','scheduled','done'],question:['quoted','scheduled','done'],quoted:['scheduled','done'],scheduled:['done']};
  return `<section><div class="head"><div class="head-top"><div class="eyebrow">BETRIEBS-INBOX · LIVE</div><button class="round" data-nav="partner">${icons.back}</button></div><h1>${esc(pc.provider.name)}.</h1><p>Nur Leads, die zu Leistung und verifiziertem Einsatzgebiet passen. Details werden nach Annahme freigegeben.</p></div>${cloudStrip()}<div class="inbox-tabs"><button class="active">Neue Leads · ${leads.length}</button><button>Aufträge · ${assigned.length}</button></div><div class="section inbox-section"><div class="section-head"><h2>Passende Leads</h2></div>${leads.length?leads.map(r=>`<article class="lead-card"><div class="lead-top"><div><div class="eyebrow">${esc(r.public_ref)}</div><h3>${esc(cat(r.service_id)?.label||r.service_id)}</h3></div><span class="pill ${r.urgency==='now'?'warn':'good'}">${esc(urgency(r.urgency))}</span></div><div class="lead-grid"><span><b>Gebiet</b>${esc(r.area_label||'—')}</span><span><b>Sprache</b>${esc(r.preferred_language)}</span><span><b>Match</b>${esc(r.match_reason||'Gebiet passt')}</span></div><p class="privacy-line">Beschreibung, genaue Position und Fotos bleiben bis zur Annahme privat.</p><button class="primary-wide" data-live-accept="${esc(r.id)}">Anfrage annehmen</button></article>`).join(''):'<div class="empty compact"><h2>Gerade kein passender Lead.</h2><p>HOY zeigt nur fachlich und regional passende Anfragen.</p></div>'}</div><div class="section inbox-section"><div class="section-head"><h2>Deine Aufträge</h2></div>${assigned.length?assigned.map(r=>`<article class="assigned-card"><div class="request-card-top"><div><div class="eyebrow">${esc(r.public_ref)}</div><h3>${esc(cat(r.service_id)?.label||r.service_id)}</h3></div><span class="status-badge status-${esc(r.status)}">${esc(statusText(r.status))}</span></div><p>${esc(r.description)}</p><div class="request-meta"><span>${icons.pin}${esc(r.location_text||r.municipality||'—')}</span><span>${icons.camera}${Number(r.photo_count||0)} Foto${Number(r.photo_count||0)===1?'':'s'}</span></div>${r.customer_email?`<a class="contact-row" href="mailto:${esc(r.customer_email)}">${icons.mail}<span><b>Kunde kontaktieren</b><small>${esc(r.customer_email)}</small></span></a>`:''}${r.photo_count?`<button class="request-more" data-provider-photos="${esc(r.id)}">Private Fotos ansehen</button>`:''}<div class="status-actions">${(transitions[r.status]||[]).map(s=>`<button data-live-status="${esc(r.id)}" data-status="${s}">${esc(statusText(s))}</button>`).join('')}</div></article>`).join(''):'<div class="empty compact"><p>Noch kein angenommener Auftrag.</p></div>'}</div></section>`;
}

function render(){
  const view=$('#view');
  view.innerHTML=state.view==='home'?home():state.view==='discover'?discover():state.view==='request'?requestPage():state.view==='saved'?saved():state.view==='business-live'?businessLive():provider();
  setBottom();bindInline();
}
function bindInline(){$('#q')?.addEventListener('input',e=>{state.query=e.target.value})}

function openDetail(id){
  const p=state.providers.find(x=>String(x.id)===String(id));if(!p)return;
  const d=$('#detail');
  d.innerHTML=`<div class="detail-art">${mediaMarkup(p)}<div class="detail-top"><button class="round" data-detail-close>${icons.back}</button><button class="round ${state.favorites.has(p.id)?'active':''}" data-fav="${esc(p.id)}">${icons.heart}</button></div><div class="detail-title"><div class="eyebrow" style="color:#ffd0b3">HOY WORKS</div><h2>${esc(p.name)}</h2><p>${esc(p.area||'Einsatzgebiet wird geprüft')}</p></div></div><div class="detail-body"><div class="detail-actions">${p.phone?`<button data-call="${esc(p.phone)}">${icons.phone}Anrufen</button>`:'<button disabled>'+icons.phone+'Telefon prüfen</button>'}${p.website?`<button data-site="${esc(p.website)}">${icons.globe}Website</button>`:'<button disabled>'+icons.globe+'Quelle</button>'}<button data-request-provider="${esc(p.id)}">${icons.plus}Anfrage</button></div><div class="profile-trust"><strong>${p.verification==='source_checked'?'Quelle öffentlich geprüft':'Datenstatus sichtbar'}</strong><p>${esc(p.source||'Öffentliche Unternehmensquelle geprüft.')} · ${p.partnership==='none'?'Noch keine HOY-Partnerschaft.':'Partnerschaftsstatus separat geführt.'} Aktuelle Verfügbarkeit wird nicht aus einer Website abgeleitet.</p></div><div class="detail-section"><h3>Leistungen</h3><div class="service-pills">${(p.cats||[]).map(id=>`<span class="pill">${esc(cat(id)?.label||id)}</span>`).join('')}</div></div><div class="detail-section"><h3>Über den Betrieb</h3><p>${esc(p.summary||'Noch keine Beschreibung übernommen.')}</p></div><div class="detail-section"><h3>Sprachen & Gebiet</h3><p>${esc((p.languages||[]).join(' · ')||'Sprachen werden geprüft')} · ${esc(p.area||'Einsatzgebiet wird geprüft')}</p></div><button class="primary-wide" data-request-provider="${esc(p.id)}">Anfrage an ${esc(p.name)} vorbereiten</button></div>`;
  d.showModal();
}

function photoSelectionMarkup(){
  if(!signedIn())return `<div class="profile-trust"><strong>Private Fotos nach dem sicheren Senden.</strong><p>Nach der E-Mail-Anmeldung kannst du Fotos direkt in deinem privaten Anfragebereich ergänzen.</p></div>`;
  return `<label class="photo-picker"><input id="reqPhotos" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple><span>${icons.camera}<b>Fotos hinzufügen</b><small>Privat · JPG/PNG/WebP/HEIC · max. 8 MB je Bild</small></span></label>${state.requestPhotos.length?`<div class="photo-selected">${state.requestPhotos.map(f=>`<span>${esc(f.name)} · ${(f.size/1024/1024).toFixed(1)} MB</span>`).join('')}</div>`:''}`;
}

function zoneStatusMarkup(){
  if(state.request.municipality)return `<div class="zone-result verified"><b>${icons.check}${esc(state.request.municipality)}</b><small>Offizielle Gemeindezuordnung · ${esc(state.request.zoneSource||'IGN')}</small></div>`;
  if(state.request.locationSource==='device_gps')return `<div class="zone-result"><b>${icons.pin} GPS erfasst</b><small>Die Gemeinde wird beim sicheren Senden gegen IGN-Verwaltungsdaten geprüft.</small></div>`;
  return '';
}

