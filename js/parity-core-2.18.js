/* HOY Works 2.18 — cross-vertical trust, matching and commercial integrity contract */
(function(root,factory){
  const api=factory();
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(root)root.HOYWorksParity=api;
})(typeof window!=='undefined'?window:null,function(){
  const MATCH={MATCH:'MATCH',NO_MATCH:'NO_MATCH',NEEDS_CONFIRMATION:'NEEDS_CONFIRMATION'};
  const CONFIRMED=new Set(['hoy_verified','business_confirmed','community_confirmed']);
  const ACTIVE_NOW=new Set(['available_now','available_today','limited','unavailable']);
  const RESEARCH_MAX_AGE_DAYS=180;
  const clean=v=>String(v??'').trim().toLowerCase();
  const date=v=>{const d=new Date(v);return Number.isFinite(d.getTime())?d:null};
  const ageDays=(value,now=new Date())=>{const d=date(value);return d?Math.max(0,(now-d)/86400000):Number.POSITIVE_INFINITY};

  function availabilityState(provider,now=new Date()){
    const status=clean(provider?.availabilityStatus||provider?.availability_status||'unknown');
    const expires=date(provider?.availabilityExpiresAt||provider?.availability_expires_at);
    const confirmed=date(provider?.availabilityConfirmedAt||provider?.availability_confirmed_at);
    if(!ACTIVE_NOW.has(status))return{status:'unknown',confirmed:false,current:false,label:'Nicht live bestätigt'};
    if(!confirmed||!expires||now>=expires)return{status:'unknown',confirmed:false,current:false,label:'Bestätigung erforderlich'};
    const labels={available_now:'Jetzt erreichbar',available_today:'Heute verfügbar',limited:'Heute eingeschränkt',unavailable:'Aktuell keine Kapazität'};
    return{status,confirmed:true,current:true,label:labels[status]||'Bestätigt'};
  }

  function providerTrust(provider,now=new Date()){
    if(!provider||provider.suppressed||clean(provider.reviewState)==='conflict')return{key:'CONFLICT',score:0,label:'Nicht ausspielen'};
    const live=availabilityState(provider,now);
    if(live.current)return{key:'LIVE_TODAY',score:1,label:live.label};
    const verification=clean(provider.verification||provider.verificationStatus||provider.source_status);
    if(verification==='hoy_verified')return{key:'HOY_VERIFIED',score:.92,label:'HOY geprüft'};
    if(verification==='business_confirmed')return{key:'BUSINESS_CONFIRMED',score:.84,label:'Vom Betrieb bestätigt'};
    if(verification==='community_confirmed')return{key:'COMMUNITY_CONFIRMED',score:.76,label:'Community bestätigt'};
    if(verification==='source_checked'){
      const checkedAt=provider.sourceCheckedAt||provider.source_checked_at||provider.lastVerified;
      if(ageDays(checkedAt,now)>RESEARCH_MAX_AGE_DAYS)return{key:'STALE',score:.22,label:'Recherche veraltet · Bestätigung erforderlich'};
      return{key:'RESEARCHED',score:.58,label:'Quelle geprüft · nicht Betreiber-bestätigt'};
    }
    if(verification==='directory_only')return{key:'EXTERNAL_UNVERIFIED',score:.32,label:'Verzeichnisfund · Bestätigung nötig'};
    return{key:'UNKNOWN',score:.22,label:'Bestätigung erforderlich'};
  }

  function confirmedFact(fact){
    return !!fact&&fact.isCurrent!==false&&fact.stale!==true&&clean(fact.reviewState)!=='disputed'&&CONFIRMED.has(clean(fact.verification));
  }

  function compare(fact,requirement){
    const op=clean(requirement.operator||'equals');
    if(op==='gte'||op==='lte'){
      const actual=Number(fact.measurement??fact.value),expected=Number(requirement.value);
      if(!Number.isFinite(actual)||!Number.isFinite(expected))return null;
      return op==='gte'?actual>=expected:actual<=expected;
    }
    const actual=clean(fact.value),expected=clean(requirement.value??'yes');
    if(!actual)return null;
    return actual===expected;
  }

  function evaluateRequirement(fact,requirement={}){
    const level=String(requirement.level||'MUST').toUpperCase();
    if(level==='IGNORE')return{state:MATCH.MATCH,level,ignored:true,confirmed:false};
    if(!fact)return{state:MATCH.NEEDS_CONFIRMATION,level,confirmed:false,reason:'Merkmal nicht belegt'};
    const value=clean(fact.value);
    if(['','unknown','partial','temporarily_unavailable'].includes(value))return{state:MATCH.NEEDS_CONFIRMATION,level,confirmed:false,reason:'Merkmal nicht eindeutig bestätigt'};
    if(!confirmedFact(fact))return{state:MATCH.NEEDS_CONFIRMATION,level,confirmed:false,reason:'Quelle nicht bestätigt'};
    const ok=compare(fact,requirement);
    if(ok===null)return{state:MATCH.NEEDS_CONFIRMATION,level,confirmed:true,reason:'Vergleichswert fehlt'};
    return{state:ok?MATCH.MATCH:MATCH.NO_MATCH,level,confirmed:true,reason:ok?'Bestätigt erfüllt':'Bestätigt nicht erfüllt'};
  }

  function evaluateRequirements(provider,requirements=[]){
    const facts=provider?.facts||{};
    const evaluations=(requirements||[]).map(requirement=>({requirement,...evaluateRequirement(facts[requirement.key],requirement)}));
    const must=evaluations.filter(x=>x.level==='MUST'&&!x.ignored),prefer=evaluations.filter(x=>x.level==='PREFER'&&!x.ignored);
    let state=MATCH.MATCH;
    if(must.some(x=>x.state===MATCH.NO_MATCH))state=MATCH.NO_MATCH;
    else if(must.some(x=>x.state===MATCH.NEEDS_CONFIRMATION))state=MATCH.NEEDS_CONFIRMATION;
    return{state,evaluations,mustCount:must.length,preferCount:prefer.length,preferScore:prefer.length?prefer.filter(x=>x.state===MATCH.MATCH).length/prefer.length:1};
  }

  function sponsorshipState(provider,now=new Date()){
    const placement=provider?.commercial?.placement||provider?.commercialPlacement;
    if(!placement)return{eligible:false,label:null,reason:'none'};
    if(provider?.suppressed)return{eligible:false,label:null,reason:'suppressed'};
    if(clean(placement.status)!=='active'||clean(placement.reviewState)!=='approved'||placement.disclosureRequired!==true)return{eligible:false,label:null,reason:'not_approved'};
    const start=date(placement.startsAt),end=date(placement.endsAt);
    if(start&&now<start)return{eligible:false,label:null,reason:'not_started'};
    if(end&&now>end)return{eligible:false,label:null,reason:'expired'};
    return{eligible:true,label:'Anzeige',reason:'active'};
  }

  function hardGate(provider,request={},now=new Date()){
    if(!provider||provider.suppressed)return{eligible:false,reasons:['Anbieter nicht freigegeben']};
    const verification=clean(provider.verification||provider.source_status);
    if(verification==='blocked'||clean(provider.reviewState)==='conflict')return{eligible:false,reasons:['Anbieterstatus blockiert']};
    if(clean(provider.safetyStatus)==='blocked'||clean(request.safetyStatus)==='blocked')return{eligible:false,reasons:['Sicherheitslage blockiert Vermittlung']};
    if(request.category&&!(provider.cats||provider.services||[]).includes(request.category))return{eligible:false,reasons:['Leistung nicht bestätigt']};
    const requirements=evaluateRequirements(provider,request.requirements||[]);
    if(requirements.state===MATCH.NO_MATCH)return{eligible:false,reasons:['Bestätigte Muss-Anforderung nicht erfüllt'],requirements};
    const live=availabilityState(provider,now);
    if(['now','today'].includes(clean(request.urgency))&&live.current&&live.status==='unavailable')return{eligible:false,reasons:['Betrieb hat aktuell keine Kapazität bestätigt'],requirements,live};
    return{eligible:true,reasons:[],requirements,live};
  }

  function providerScore(provider,request={},now=new Date()){
    const gate=hardGate(provider,request,now);
    if(!gate.eligible)return{eligible:false,score:-1,reasons:gate.reasons,requirements:gate.requirements||evaluateRequirements(provider,request.requirements||[])};
    const trust=providerTrust(provider,now),live=gate.live||availabilityState(provider,now),requirements=gate.requirements||evaluateRequirements(provider,request.requirements||[]);
    const services=provider.cats||provider.services||[];
    const service=request.category?(services.includes(request.category)?1:0):.65;
    const requestLocation=clean(request.municipality||request.locality||request.location),area=clean(provider.area||provider.coverage_text||'');
    const locality=requestLocation&&area?((area.includes(requestLocation)||requestLocation.includes(area)) ? .92 : .55):.55;
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
    return(providers||[]).map(provider=>({provider,...providerScore(provider,request,now)})).filter(x=>x.eligible).sort((a,b)=>b.score-a.score||String(a.provider.name||'').localeCompare(String(b.provider.name||''),'de')).map((row,index)=>({...row,organicRank:index+1}));
  }

  return{MATCH,RESEARCH_MAX_AGE_DAYS,availabilityState,providerTrust,evaluateRequirement,evaluateRequirements,sponsorshipState,hardGate,providerScore,rankProviders};
});
