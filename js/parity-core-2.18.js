/* HOY Works 2.18 — thin vertical adapter over HOY Platform Core v1 */
(function(root,factory){
  const core=(root&&root.HOYPlatformCore)||(typeof require==='function'?require('../vendor/hoy-platform-core-v1.js'):null);
  const api=factory(core);
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(root)root.HOYWorksParity=api;
})(typeof globalThis!=='undefined'?globalThis:null,function(core){
  if(!core||core.CORE_VERSION!=='1.0.0'||core.CONTRACT_VERSION!=='HOY-PC-1.0')throw new Error('HOY Platform Core v1 is missing or incompatible');

  const MATCH=core.MATCH_STATES;
  const RESEARCH_MAX_AGE_DAYS=core.DEFAULT_POLICY.researchMaxAgeDays;
  const clean=v=>String(v??'').trim().toLowerCase();

  function availabilityState(provider,now=new Date()){
    const state=core.availabilityState(provider,now);
    if(!state.current)return{...state,label:'Bestätigung erforderlich'};
    const labels={available_now:'Jetzt erreichbar',available_today:'Heute verfügbar',limited:'Heute eingeschränkt',unavailable:'Aktuell keine Kapazität'};
    return{...state,label:labels[state.status]||state.label};
  }

  function providerTrust(provider,now=new Date()){
    const trust=core.evidenceTrust(provider,now);
    if(trust.key===core.TRUST_STATES.LIVE_TODAY){
      const live=availabilityState(provider,now);
      return{...trust,label:live.label,live};
    }
    if(trust.key===core.TRUST_STATES.HOY_VERIFIED)return{...trust,label:'HOY geprüft'};
    if(trust.key===core.TRUST_STATES.EXTERNAL_UNVERIFIED&&clean(provider?.verification||provider?.source_status)==='directory_only')return{...trust,label:'Verzeichnisfund · Bestätigung nötig'};
    return trust;
  }

  function evaluateRequirement(fact,requirement={},now=new Date()){
    return core.evaluateRequirement(fact,requirement,now);
  }

  function evaluateRequirements(provider,requirements=[],now=new Date()){
    return core.evaluateRequirements(provider,requirements,now);
  }

  function sponsorshipState(provider,now=new Date()){
    return core.sponsorshipState(provider,now);
  }

  function hardGate(provider,request={},now=new Date()){
    const safety=core.safetyGate(provider,request);
    if(!safety.eligible)return{eligible:false,reasons:[safety.reason==='suppressed'?'Anbieter nicht freigegeben':'Sicherheitslage blockiert Vermittlung'],safety};
    const verification=clean(provider?.verification||provider?.source_status);
    if(verification==='blocked'||clean(provider?.reviewState)==='conflict')return{eligible:false,reasons:['Anbieterstatus blockiert']};
    if(request.category&&!(provider?.cats||provider?.services||[]).includes(request.category))return{eligible:false,reasons:['Leistung nicht bestätigt']};
    const requirements=evaluateRequirements(provider,request.requirements||[],now);
    if(requirements.state===MATCH.NO_MATCH)return{eligible:false,reasons:['Bestätigte Muss-Anforderung nicht erfüllt'],requirements};
    const live=availabilityState(provider,now);
    if(['now','today'].includes(clean(request.urgency))&&live.current&&live.status==='unavailable')return{eligible:false,reasons:['Betrieb hat aktuell keine Kapazität bestätigt'],requirements,live};
    return{eligible:true,reasons:[],requirements,live,safety};
  }

  function providerScore(provider,request={},now=new Date()){
    const gate=hardGate(provider,request,now);
    if(!gate.eligible)return{eligible:false,score:-1,reasons:gate.reasons,requirements:gate.requirements||evaluateRequirements(provider,request.requirements||[],now)};
    const trust=providerTrust(provider,now),live=gate.live||availabilityState(provider,now),requirements=gate.requirements||evaluateRequirements(provider,request.requirements||[],now);
    const services=provider.cats||provider.services||[];
    const service=request.category?(services.includes(request.category)?1:0):.65;
    const requestLocation=clean(request.municipality||request.locality||request.location),area=clean(provider.area||provider.coverage_text||'');
    const locality=requestLocation&&area?((area.includes(requestLocation)||requestLocation.includes(area))?.92:.55):.55;
    const languages=(provider.languages||[]).map(clean),wanted=clean(request.language||request.preferred_language);
    const language=wanted?(languages.includes(wanted)?1:.45):.65;
    let availability=.55;
    if(live.current&&live.status==='available_now')availability=1;
    else if(live.current&&live.status==='available_today')availability=.92;
    else if(live.current&&live.status==='limited')availability=.68;
    else if(live.current&&live.status==='unavailable')availability=0;
    const preference=requirements.preferCount?requirements.preferScore:.65;
    const score=Math.round(100*(.35*service+.15*locality+.10*language+.20*availability+.15*trust.score+.05*preference));
    const reasons=[];
    if(live.current)reasons.push(live.label);else reasons.push('Live-Verfügbarkeit nicht bestätigt');
    if(requirements.state===MATCH.NEEDS_CONFIRMATION)reasons.push('Muss-Merkmal: Bestätigung nötig');
    else if(requirements.mustCount)reasons.push('Muss-Merkmale bestätigt');
    reasons.push(trust.label);
    return{eligible:true,score,reasons:reasons.slice(0,3),trust,live,requirements,sponsorship:sponsorshipState(provider,now)};
  }

  function rankProviders(providers,request={},now=new Date()){
    return(providers||[]).map(provider=>({provider,...providerScore(provider,request,now)})).filter(x=>x.eligible).sort((a,b)=>b.score-a.score||String(a.provider.name||'').localeCompare(String(b.provider.name||''),'de')).map((row,index)=>({...row,organicRank:index+1,sponsorship:sponsorshipState(row.provider,now)}));
  }

  return{MATCH,RESEARCH_MAX_AGE_DAYS,PLATFORM_CORE:core,availabilityState,providerTrust,evaluateRequirement,evaluateRequirements,sponsorshipState,hardGate,providerScore,rankProviders};
});
