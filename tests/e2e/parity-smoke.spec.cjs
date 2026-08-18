const {test,expect}=require('@playwright/test');

test('Works parity runtime renders without page errors or horizontal overflow',async({page})=>{
  const errors=[];
  page.on('pageerror',error=>errors.push(String(error)));
  await page.goto('/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('#view')).not.toBeEmpty();
  await expect(page.getByText('Was heute', {exact:false}).first()).toBeVisible();
  const contract=await page.evaluate(()=>({
    parity:typeof window.HOYWorksParity?.rankProviders==='function',
    privacy:window.__hoyWorksPrivacy218===true,
    result:window.HOYWorksParity?.evaluateRequirement?.({value:'yes',verification:'external_unverified',isCurrent:true},{level:'MUST',value:'yes'})?.state
  }));
  expect(contract).toEqual({parity:true,privacy:true,result:'NEEDS_CONFIRMATION'});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1);
  expect(overflow).toBe(false);
  expect(errors).toEqual([]);
});

test('commercial disclosure cannot reorder organic match',async({page})=>{
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const result=await page.evaluate(()=>{
    const now=new Date('2026-08-18T12:00:00Z');
    const a={id:'a',name:'A',cats:['clima'],area:'La Manga',languages:['de'],verification:'business_confirmed'};
    const b={id:'b',name:'B',cats:['clima'],area:'La Manga',languages:['de'],verification:'source_checked'};
    const before=window.HOYWorksParity.rankProviders([a,b],{category:'clima'},now);
    const after=window.HOYWorksParity.rankProviders([a,{...b,commercial:{placement:{status:'active',reviewState:'approved',disclosureRequired:true}}}],{category:'clima'},now);
    return {before:before.map(x=>[x.provider.id,x.score,x.organicRank]),after:after.map(x=>[x.provider.id,x.score,x.organicRank]),label:after.find(x=>x.provider.id==='b')?.sponsorship?.label};
  });
  expect(result.after).toEqual(result.before);
  expect(result.label).toBe('Anzeige');
});
