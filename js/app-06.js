function openRequest(step=state.request.step||1){
  state.request.step=step;saveDraft();const d=$('#requestFlow');const pct=step/5*100;let content='';
  if(step===1)content=`<div class="flow-step">${categories.map(c=>`<button class="choice ${state.request.category===c.id?'active':''}" data-choose-cat="${c.id}"><span class="choice-icon">${c.glyph}</span><span><strong>${c.label}</strong><small>${c.desc}</small></span><span class="tick">${state.request.category===c.id?'✓':'›'}</span></button>`).join('')}</div>`;
  if(step===2)content=`<div class="flow-step">${[['now','Jetzt / Notfall','Akutes Problem – schnellstmöglich'],['today','Heute','Noch heute wäre ideal'],['soon','Nächste Tage','Flexibel in den kommenden Tagen'],['plan','Planbar','Termin kann abgestimmt werden']].map(([k,l,s])=>`<button class="choice ${state.request.urgency===k?'active':''}" data-choose-urgency="${k}"><span class="choice-icon">◷</span><span><strong>${l}</strong><small>${s}</small></span><span class="tick">${state.request.urgency===k?'✓':'›'}</span></button>`).join('')}</div>`;
  if(step===3)content=`<div class="field"><label>Ort / Adresse</label><input id="reqLocation" value="${esc(state.request.location)}" placeholder="z. B. La Manga km 14"></div><button class="gps-button" data-use-location ${state.locationBusy?'disabled':''}>${icons.pin}${state.locationBusy?'Standort wird gelesen …':'Meinen Standort verwenden'}</button>${zoneStatusMarkup()}<div class="field"><label>Bevorzugte Sprache</label><select id="reqLang"><option ${state.request.language==='DE'?'selected':''}>DE</option><option ${state.request.language==='EN'?'selected':''}>EN</option><option ${state.request.language==='ES'?'selected':''}>ES</option></select></div><p class="flow-note">Bei GPS-Nutzung prüft HOY die Gemeinde später mit der offiziellen IGN-Verwaltungsgeometrie. Keine erfundene km-Grenze zwischen Cartagena und San Javier.</p>`;
  if(step===4)content=`<div class="field"><label>Was ist genau zu tun?</label><textarea id="reqDesc" placeholder="z. B. Die Klimaanlage läuft, kühlt aber seit gestern kaum noch …">${esc(state.request.description)}</textarea></div>${photoSelectionMarkup()}`;
  if(step===5)content=`<div class="summary-card"><div class="summary-row"><span>Leistung</span><b>${esc(cat(state.request.category)?.label||'Noch wählen')}</b></div><div class="summary-row"><span>Wann?</span><b>${esc(urgency(state.request.urgency))}</b></div><div class="summary-row"><span>Wo?</span><b>${esc(state.request.location)}</b></div><div class="summary-row"><span>Gemeinde</span><b>${esc(state.request.municipality||(state.request.locationSource==='device_gps'?'wird sicher geprüft':'manuelle Prüfung'))}</b></div><div class="summary-row"><span>Sprache</span><b>${esc(state.request.language)}</b></div><div class="summary-row"><span>Fotos</span><b>${state.requestPhotos.length}</b></div><div class="summary-row"><span>Beschreibung</span><b>${esc(state.request.description||'Noch keine')}</b></div></div><div class="profile-trust"><strong>HOY qualifiziert – der Betrieb entscheidet.</strong><p>Die Anfrage ist noch keine Beauftragung. Verfügbarkeit, Preis und Termin werden mit dem Betrieb geklärt.</p></div>`;
  d.innerHTML=`<div class="flow"><div class="flow-head"><button class="round" data-flow-close>${icons.back}</button><span class="eyebrow">HOY WORKS · SCHRITT ${step} VON 5</span></div><div class="progress"><span style="width:${pct}%"></span></div><h2>${['','Worum geht es?','Wann brauchst du Hilfe?','Wo ist der Auftrag?','Was ist passiert?','Alles richtig?'][step]}</h2><p class="flow-lead">${['','Wähle den Bereich. HOY nutzt ihn für das fachliche Matching.','Die Dringlichkeit hilft Betrieben sofort einzuschätzen, ob der Auftrag passt.','Ort und Sprache verhindern unnötige Rückfragen und falsche Zuständigkeiten.','Je klarer die Beschreibung, desto besser kann ein Betrieb entscheiden. Fotos bleiben privat.','Prüfe die Angaben. Danach speichert HOY die Anfrage sicher und berechnet passende Anbieter.'][step]}</p>${content}<div class="flow-actions"><button class="back" ${step===1?'data-flow-close':'data-flow-back'}>${step===1?'Abbrechen':'Zurück'}</button><button class="next ${step===5?'orange':''}" data-flow-next>${step===5?'Sicher senden':'Weiter'}</button></div></div>`;
  d.showModal();
  if(step===4){$('#reqPhotos')?.addEventListener('change',e=>{const valid=[...e.target.files].filter(f=>f.size<=8*1024*1024&&['image/jpeg','image/png','image/webp','image/heic','image/heif'].includes(f.type));state.requestPhotos=valid.slice(0,6);openRequest(4)})}
  if(step===3){$('#reqLocation')?.addEventListener('input',e=>{if(state.request.locationSource==='device_gps'&&e.target.value!==state.request.location){state.request.latitude=null;state.request.longitude=null;state.request.locationAccuracy=null;state.request.locationSource='manual';state.request.municipality=null;state.request.municipalityCode=null;state.request.zoneSource=null;state.request.zoneVerifiedAt=null}})}
}

function captureStep(){
  if(state.request.step===3){state.request.location=$('#reqLocation')?.value.trim()||state.request.location;state.request.language=$('#reqLang')?.value||state.request.language}
  if(state.request.step===4)state.request.description=$('#reqDesc')?.value.trim()||'';
  saveDraft();
}

async function useCurrentLocation(){
  if(!navigator.geolocation){toast('Standortzugriff wird auf diesem Gerät nicht unterstützt');return}
  state.locationBusy=true;openRequest(3);
  navigator.geolocation.getCurrentPosition(pos=>{
    state.locationBusy=false;state.request.latitude=pos.coords.latitude;state.request.longitude=pos.coords.longitude;state.request.locationAccuracy=pos.coords.accuracy||null;state.request.locationSource='device_gps';state.request.location='Aktueller Standort · La Manga / Mar Menor';state.request.municipality=null;state.request.municipalityCode=null;state.request.zoneSource=null;state.request.zoneVerifiedAt=null;saveDraft();openRequest(3);toast('GPS-Standort erfasst')
  },err=>{state.locationBusy=false;openRequest(3);toast(err.code===1?'Standortfreigabe wurde abgelehnt':'Standort konnte nicht gelesen werden')},{enableHighAccuracy:true,timeout:9000,maximumAge:60000});
}

async function resolveZoneBeforeSubmit(){
  if(state.request.locationSource!=='device_gps'||!Number.isFinite(Number(state.request.latitude))||!Number.isFinite(Number(state.request.longitude)))return;
  try{
    const zone=await window.HOYWorksBackend.resolveServiceZone({lat:state.request.latitude,lng:state.request.longitude,accuracy:state.request.locationAccuracy});
    if(zone?.ok){state.request.municipality=zone.municipality||null;state.request.municipalityCode=zone.municipality_code||null;state.request.zoneSource=zone.source||'IGN';state.request.zoneVerifiedAt=zone.verified_at||new Date().toISOString()}
    else{state.request.locationSource='manual_review';state.request.zoneSource='IGN · manuelle Prüfung erforderlich';state.request.zoneVerifiedAt=new Date().toISOString()}
  }catch(err){console.warn('Zone resolution failed',err);state.request.locationSource='manual_review';state.request.zoneSource='Gemeindeprüfung vorübergehend nicht verfügbar'}
  saveDraft();
}

async function uploadSelectedPhotos(requestId){
  if(!state.requestPhotos.length||!window.HOYWorksBackend)return {ok:0,failed:0};
  let ok=0,failed=0;
  for(const file of state.requestPhotos){try{await window.HOYWorksBackend.uploadRequestPhoto(requestId,file);ok++}catch(err){console.error(err);failed++}}
  return {ok,failed};
}

