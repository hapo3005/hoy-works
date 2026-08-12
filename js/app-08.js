function openProviderFlow(step=state.providerDraft.step||1){
  if(!signedIn()){openAuth('provider');return}
  const d=$('#providerFlow');step=Math.max(1,Math.min(3,Number(step)||1));state.providerDraft.step=step;
  if(!state.providerDraft.business_email)state.providerDraft.business_email=authEmail();
  saveProviderDraft();
  const content=step===1?providerStepOne():step===2?providerStepTwo():providerStepThree();
  d.innerHTML=`<div class="flow provider-flow"><div class="flow-head"><button class="round" data-provider-close>${icons.back}</button><span class="eyebrow">HOY WORKS · BETRIEB ANMELDEN</span><span class="provider-step-count">${step}/3</span></div>${providerOnboardingProgress(step)}${content}<div class="flow-actions">${step>1?'<button class="back" data-provider-back>Zurück</button>':'<button class="back" data-provider-close>Abbrechen</button>'}<button class="next ${step===3?'orange':''}" data-provider-next>${step===3?'Kostenlos zur Prüfung senden':'Weiter'}</button></div></div>`;
  if(!d.open)d.showModal();

  d.querySelectorAll('[data-provider-close]').forEach(btn=>btn.addEventListener('click',()=>{captureProviderStep(step);d.close()}));
  d.querySelector('[data-provider-back]')?.addEventListener('click',()=>{captureProviderStep(step);state.providerDraft.step=step-1;saveProviderDraft();openProviderFlow(step-1)});
  d.querySelector('[data-provider-next]')?.addEventListener('click',async()=>{
    captureProviderStep(step);const x=state.providerDraft;
    if(step===1){
      if(!x.business_name||!x.contact_name||!x.business_email){toast('Bitte Betrieb, Kontakt und E-Mail ausfüllen');return}
      if(!x.authorized_attested){toast('Bitte deine Berechtigung bestätigen');return}
    }
    if(step===2){
      if(!x.coverage_text){toast('Bitte das Einsatzgebiet angeben');return}
      if(!x.service_ids.length){toast('Bitte mindestens eine Leistung wählen');return}
      if(!x.languages.length){toast('Bitte mindestens eine Sprache wählen');return}
    }
    if(step<3){x.step=step+1;saveProviderDraft();openProviderFlow(step+1);return}
    await submitProviderApplication();
  });

  d.querySelector('#provExisting')?.addEventListener('change',e=>{
    const p=state.providers.find(x=>String(x.id)===String(e.target.value));
    state.providerDraft.provider_id=e.target.value||null;
    if(p){
      state.providerDraft.business_name=p.name||'';
      state.providerDraft.phone=p.phone||'';
      state.providerDraft.website_url=p.website||'';
      state.providerDraft.coverage_text=p.area||'';
      state.providerDraft.service_ids=[...(p.cats||[])];
      state.providerDraft.languages=[...(p.languages||[])];
    }
    saveProviderDraft();openProviderFlow(1);
  });
}

async function submitProviderApplication(){
  const d=$('#providerFlow');const payload={...state.providerDraft};
  try{
    const btn=d?.querySelector('[data-provider-next]');if(btn){btn.disabled=true;btn.textContent='Wird sicher eingereicht …'}
    const res=await window.HOYWorksBackend.submitProviderApplication(payload);
    clearProviderDraft();state.providerDraft=blankProviderDraft();await refreshMyArea();render();
    if(d){
      d.innerHTML=`<div class="flow provider-flow provider-success"><div class="provider-success-icon">✓</div><div class="eyebrow">ERFOLGREICH EINGEREICHT</div><h2>HOY ist jetzt am Zug.</h2><p class="flow-lead">Die Anmeldung für <b>${esc(payload.business_name)}</b> ist angekommen. Bis zur Prüfung wird weder eine Partnerschaft noch ein verifiziertes Einsatzgebiet freigeschaltet.</p><div class="provider-after compact"><small>WENN BESTÄTIGT</small><div><span>1</span><p>Der Betrieb erhält einen bestätigten Betreiberzugang.</p></div><div><span>2</span><p>Leistungen und Einsatzgebiet werden für Matches freigegeben.</p></div><div><span>3</span><p>Die Live-Inbox zeigt nur passende Anfragen.</p></div></div><button class="auth-submit" data-provider-finish>Zum Partnerbereich</button></div>`;
      d.querySelector('[data-provider-finish]')?.addEventListener('click',()=>{d.close();state.view='partner';render()});
    }
    toast(res.duplicate?'Offener Antrag bereits vorhanden':'Betriebsanmeldung sicher gespeichert');
  }catch(err){console.error(err);toast(err.message||'Betriebsanmeldung fehlgeschlagen');openProviderFlow(3)}
}

