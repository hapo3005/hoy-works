const test=require('node:test');
const assert=require('node:assert/strict');
const parity=require('../../js/parity-core-2.18.js');
const now=new Date('2026-08-18T12:00:00Z');

function provider(overrides={}){
  return {id:'p1',name:'Provider',cats:['clima'],area:'La Manga',languages:['de','es'],verification:'source_checked',...overrides};
}
function fact(value,extra={}){return {value,verification:'business_confirmed',isCurrent:true,...extra}}

test('expired live availability never counts as current',()=>{
  const p=provider({availabilityStatus:'available_now',availabilityConfirmedAt:'2026-08-18T08:00:00Z',availabilityExpiresAt:'2026-08-18T11:00:00Z'});
  assert.equal(parity.availabilityState(p,now).current,false);
  assert.equal(parity.providerTrust(p,now).key,'RESEARCHED');
});

test('fresh operator availability outranks researched source status',()=>{
  const p=provider({availabilityStatus:'available_now',availabilityConfirmedAt:'2026-08-18T10:00:00Z',availabilityExpiresAt:'2026-08-18T14:00:00Z'});
  assert.equal(parity.providerTrust(p,now).key,'LIVE_TODAY');
});

test('external yes cannot satisfy a MUST',()=>{
  const result=parity.evaluateRequirement({value:'yes',verification:'external_unverified',isCurrent:true},{key:'insured',level:'MUST',value:'yes'});
  assert.equal(result.state,parity.MATCH.NEEDS_CONFIRMATION);
});

test('confirmed failed MUST excludes provider',()=>{
  const p=provider({facts:{insured:fact('no')}});
  const result=parity.providerScore(p,{category:'clima',requirements:[{key:'insured',level:'MUST',value:'yes'}]},now);
  assert.equal(result.eligible,false);
});

test('unknown MUST remains possible but explicitly needs confirmation',()=>{
  const p=provider({facts:{}});
  const result=parity.providerScore(p,{category:'clima',requirements:[{key:'insured',level:'MUST',value:'yes'}]},now);
  assert.equal(result.eligible,true);
  assert.equal(result.requirements.state,parity.MATCH.NEEDS_CONFIRMATION);
  assert.ok(result.reasons.some(x=>x.includes('Bestätigung nötig')));
});

test('numeric comparator supports minimum thresholds',()=>{
  const p=provider({facts:{response_minutes:fact('yes',{measurement:25})}});
  assert.equal(parity.evaluateRequirements(p,[{key:'response_minutes',level:'MUST',operator:'lte',value:30}]).state,parity.MATCH.MATCH);
  assert.equal(parity.evaluateRequirements({...p,facts:{response_minutes:fact('yes',{measurement:45})}},[{key:'response_minutes',level:'MUST',operator:'lte',value:30}]).state,parity.MATCH.NO_MATCH);
});

test('current unavailable provider is excluded for today urgency',()=>{
  const p=provider({availabilityStatus:'unavailable',availabilityConfirmedAt:'2026-08-18T10:00:00Z',availabilityExpiresAt:'2026-08-19T10:00:00Z'});
  assert.equal(parity.providerScore(p,{category:'clima',urgency:'today'},now).eligible,false);
});

test('sponsorship does not alter organic score or order',()=>{
  const base=provider({id:'a',name:'A',verification:'business_confirmed'});
  const sponsored={...provider({id:'b',name:'B',verification:'source_checked'}),commercial:{placement:{status:'active',reviewState:'approved',disclosureRequired:true}}};
  const before=parity.rankProviders([base,{...sponsored,commercial:undefined}],{category:'clima'},now);
  const after=parity.rankProviders([base,sponsored],{category:'clima'},now);
  assert.deepEqual(after.map(x=>[x.provider.id,x.score,x.organicRank]),before.map(x=>[x.provider.id,x.score,x.organicRank]));
  assert.equal(after.find(x=>x.provider.id==='b').sponsorship.label,'Anzeige');
});

test('safety block overrides all positive ranking signals',()=>{
  const p=provider({verification:'hoy_verified',availabilityStatus:'available_now',availabilityConfirmedAt:'2026-08-18T10:00:00Z',availabilityExpiresAt:'2026-08-18T14:00:00Z'});
  assert.equal(parity.providerScore(p,{category:'clima',safetyStatus:'blocked'},now).eligible,false);
});
