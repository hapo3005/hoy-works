async function submitRequest(){
  if(!state.request.category){toast('Bitte zuerst eine Leistung wählen');openRequest(1);return}
  if(!state.request.description.trim()){toast('Bitte das Problem kurz beschreiben');openRequest(4);return}
  if(!window.HOYWorksBackend){window.HOYWorksStore?.create?.(state.request);toast('Lokal gespeichert · Backend nicht erreichbar');$('#requestFlow')?.close();state.view='request';render();return}
  try{
    const session=await window.HOYWorksBackend.getSession();
    if(!session){localStorage.setItem('hoyworks:pending-family-request',JSON.stringify(state.request));openAuth('request');return}
    toast('Standort und Matching werden geprüft …');
    await resolveZoneBeforeSubmit();
    const row=await window.HOYWorksBackend.createRequest(state.request);state.lastLiveRequest=row;
    let match=null;try{match=await window.HOYWorksBackend.matchRequest(row.id)}catch(err){console.warn('Matching failed',err)}
    const upload=await uploadSelectedPhotos(row.id);
    state.requestPhotos=[];localStorage.removeItem('hoyworks:pending-family-request');clearDraft();state.request=blankRequest();
    $('#requestFlow')?.close();state.view='request';await refreshMyArea();render();
    const eligible=match?.matches?.filter(x=>x.is_eligible)?.length||0;
    toast(`${row.public_ref} gespeichert · ${eligible} Match${eligible===1?'':'es'}${upload.ok?` · ${upload.ok} Foto${upload.ok===1?'':'s'}`:''}`)
  }catch(err){console.error(err);toast('Live-Speichern fehlgeschlagen · Entwurf bleibt erhalten')}
}

function openAuth(returnTo='none'){
  $('#requestFlow')?.close();if(returnTo)localStorage.setItem('hoyworks:auth-return',returnTo);const d=$('#authFlow');
  d.innerHTML=`<div class="auth-box"><button class="round" data-auth-close>${icons.back}</button><div class="eyebrow" style="margin-top:20px">SICHER ANMELDEN</div><h2>Mit E-Mail bestätigen.</h2><p>Kein Passwort nötig. Der Link ordnet deine privaten Anfragen oder deinen Betrieb eindeutig deinem Konto zu.</p><div class="field"><label>E-Mail</label><input id="authEmail" type="email" autocomplete="email" placeholder="name@beispiel.de" value="${esc(authEmail())}"></div><button class="auth-submit" data-auth-send>Anmeldelink senden</button><p class="flow-note">Der Link führt auf die aktuelle HOY-Works-Seite zurück. Danach setzen wir den gewünschten Vorgang fort.</p></div>`;d.showModal();
}

async function resumeAfterAuth(){
  if(!signedIn()||!window.HOYWorksBackend)return;
  const returnTo=localStorage.getItem('hoyworks:auth-return');localStorage.removeItem('hoyworks:auth-return');
  if(returnTo==='request'){
    const raw=localStorage.getItem('hoyworks:pending-family-request');
    if(raw){try{state.request={...blankRequest(),...JSON.parse(raw)};saveDraft();openRequest(5)}catch{}}
  }
  if(returnTo==='provider')openProviderFlow();
}

async function refreshMyArea(){
  if(!window.HOYWorksBackend||!signedIn()){state.myRequests=[];state.myMatches=[];state.providerContext=null;return}
  try{
    const [requests,matches,providerContext]=await Promise.all([
      window.HOYWorksBackend.listMyRequests(),
      window.HOYWorksBackend.listMyMatches(),
      window.HOYWorksBackend.getProviderContext().catch(()=>null)
    ]);
    state.myRequests=requests||[];state.myMatches=matches||[];state.providerContext=providerContext;
  }catch(err){console.warn('Private area refresh failed',err)}
}

function providerOnboardingProgress(step){
  const labels=['Betrieb','Leistungen','Prüfung'];
  return `<div class="provider-progress" aria-label="Schritt ${step} von 3">${labels.map((label,i)=>{const n=i+1;return `<div class="${n<step?'done':n===step?'active':''}"><span>${n<step?'✓':n}</span><small>${label}</small></div>`}).join('')}</div>`;
}
function captureProviderStep(step){
  const d=state.providerDraft;
  if(step===1){
    d.provider_id=$('#provExisting')?.value||null;
    d.business_name=$('#provName')?.value.trim()||'';
    d.contact_name=$('#provContact')?.value.trim()||'';
    d.role_title=$('#provRole')?.value.trim()||'';
    d.business_email=$('#provEmail')?.value.trim()||'';
    d.authorized_attested=!!$('#provAuthorized')?.checked;
  }
  if(step===2){
    d.phone=$('#provPhone')?.value.trim()||'';
    d.website_url=$('#provWeb')?.value.trim()||'';
    d.coverage_text=$('#provCoverage')?.value.trim()||'';
    d.service_ids=[...document.querySelectorAll('[data-prov-service]:checked')].map(x=>x.value);
    d.languages=[...document.querySelectorAll('[data-prov-lang]:checked')].map(x=>x.value);
    d.notes=$('#provNotes')?.value.trim()||'';
  }
  saveProviderDraft();
}
function providerStepOne(){
  const d=state.providerDraft;
  return `<div class="provider-copy"><div class="eyebrow">DEIN BETRIEB AUF HOY</div><h2>Ist dein Betrieb schon bei HOY?</h2><p>Wir haben viele Profile bereits vorbereitet. Wenn deins dabei ist, musst du es nicht neu anlegen.</p></div>
  <div class="provider-trust"><span>✓ Kostenlos starten</span><span>✓ Keine automatische Partnerschaft</span><span>✓ Veröffentlichung erst nach Prüfung</span></div>
  <div class="field"><label>Bestehender HOY-Eintrag</label><select id="provExisting"><option value="">Mein Betrieb ist noch nicht gelistet</option>${state.providers.map(p=>`<option value="${esc(p.id)}" ${String(d.provider_id)===String(p.id)?'selected':''}>${esc(p.name)} · ${esc(p.area||'')}</option>`).join('')}</select></div>
  <div class="field"><label>Betriebsname</label><input id="provName" value="${esc(d.business_name)}" placeholder="Firmenname"></div>
  <div class="two-fields"><div class="field"><label>Ansprechpartner</label><input id="provContact" value="${esc(d.contact_name)}" placeholder="Vor- und Nachname"></div><div class="field"><label>Rolle</label><input id="provRole" value="${esc(d.role_title)}" placeholder="Inhaber, Leitung …"></div></div>
  <div class="field"><label>Geschäftliche E-Mail</label><input id="provEmail" type="email" value="${esc(d.business_email||authEmail())}" placeholder="firma@beispiel.es"><small>Darüber klärt HOY Rückfragen zur Verifizierung.</small></div>
  <label class="provider-authorized"><input id="provAuthorized" type="checkbox" ${d.authorized_attested?'checked':''}><span>Ich bin berechtigt, diesen Betrieb auf HOY zu vertreten.</span></label>
  <div class="provider-note">Diese Erklärung ist noch keine HOY-Verifizierung. Die Berechtigung wird nach dem Absenden separat geprüft.</div>`;
}
function providerStepTwo(){
  const d=state.providerDraft;const existing=state.providers.find(p=>String(p.id)===String(d.provider_id));
  return `<div class="provider-copy"><div class="eyebrow">HOY HAT VORGEARBEITET</div><h2>Was kann dein Betrieb wirklich übernehmen?</h2><p>Bestätige nur Leistungen, Sprachen und Gebiete, die du tatsächlich bedienen kannst. So bleiben spätere Leads relevant.</p></div>
  ${existing?`<div class="provider-prefill"><div><b>${esc(existing.name)}</b><span>${esc(serviceNames(existing))} · ${esc(existing.area||'Gebiet wird geprüft')}</span></div><span>VORBEFÜLLT</span></div>`:''}
  <div class="two-fields"><div class="field"><label>Telefon</label><input id="provPhone" value="${esc(d.phone)}" placeholder="+34 …"></div><div class="field"><label>Website</label><input id="provWeb" value="${esc(d.website_url)}" placeholder="https://…"></div></div>
  <div class="field"><label>Einsatzgebiet</label><textarea id="provCoverage" placeholder="z. B. La Manga komplett, Cabo de Palos, Cartagena …">${esc(d.coverage_text)}</textarea><small>HOY prüft dieses Gebiet später – es wird nicht ungeprüft als Match-Gebiet freigeschaltet.</small></div>
  <div class="field"><label>Leistungen</label><div class="check-grid">${categories.map(c=>`<label><input type="checkbox" value="${c.id}" data-prov-service ${d.service_ids.includes(c.id)?'checked':''}><span>${c.glyph} ${c.label}</span></label>`).join('')}</div></div>
  <div class="field"><label>Sprachen</label><div class="check-grid languages">${[['DE','DE Deutsch'],['EN','EN English'],['ES','ES Español']].map(([v,l])=>`<label><input type="checkbox" value="${v}" data-prov-lang ${d.languages.includes(v)?'checked':''}><span>${l}</span></label>`).join('')}</div></div>
  <div class="field"><label>Optionaler Hinweis</label><textarea id="provNotes" placeholder="z. B. Notdienst, saisonale Kapazität, Spezialgebiet …">${esc(d.notes)}</textarea></div>`;
}
function providerStepThree(){
  const d=state.providerDraft;
  const services=d.service_ids.map(id=>cat(id)?.label||id).join(' · ');
  return `<div class="provider-copy"><div class="eyebrow">BEREIT ZUR PRÜFUNG</div><h2>Das war’s schon.</h2><p>Mit dem Absenden beantragst du nur die kostenlose Prüfung deines Betriebs. Es wird kein Abo abgeschlossen.</p></div>
  <div class="provider-review">
    <div><span>Betrieb</span><b>${esc(d.business_name||'—')}</b></div>
    <div><span>Verantwortlich</span><b>${esc(d.contact_name||'—')}</b></div>
    <div><span>E-Mail</span><b>${esc(d.business_email||'—')}</b></div>
    <div><span>Einsatzgebiet</span><b>${esc(d.coverage_text||'—')}</b></div>
    <div><span>Leistungen</span><b>${esc(services||'—')}</b></div>
    <div><span>Sprachen</span><b>${esc((d.languages||[]).join(' · ')||'—')}</b></div>
  </div>
  <div class="provider-after"><small>DANACH PASSIERT</small><div><span>1</span><p><b>HOY prüft die Berechtigung.</b><br>Dein Antrag bleibt bis dahin unveröffentlicht.</p></div><div><span>2</span><p><b>Leistungen und Einsatzgebiet werden geprüft.</b><br>Nur bestätigte Daten dürfen Matching auslösen.</p></div><div><span>3</span><p><b>Danach öffnet sich deine Live-Inbox.</b><br>Du bekommst nur passende Leads.</p></div></div>`;
}
