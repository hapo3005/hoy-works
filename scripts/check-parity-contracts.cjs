const fs=require('node:fs');
const path=require('node:path');
const root=process.cwd();
const required=[
  'index.html','works-data.js','supabase-live.js','js/parity-core-2.18.js','js/privacy-hardening-2.18.js',
  'js/provider-live-backend-2.17.js','js/provider-live-ui-2.17.js','js/app-02.js','js/app-03.js','docs/VERTICAL_PARITY.md'
];
const missing=required.filter(file=>!fs.existsSync(path.join(root,file)));
if(missing.length)throw new Error(`Missing Works parity files: ${missing.join(', ')}`);

const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!html.includes('@supabase/supabase-js@2.111.0'))throw new Error('Supabase browser SDK is not exactly pinned');
if(html.includes('@supabase/supabase-js@2/dist/'))throw new Error('Floating Supabase browser dependency remains');
if(!html.includes('parity-core-2.18.js')||!html.includes('privacy-hardening-2.18.js'))throw new Error('Parity/privacy runtime is not wired');

const backend=fs.readFileSync(path.join(root,'supabase-live.js'),'utf8');
if(!backend.includes('sourceCheckedAt:p.source_checked_at'))throw new Error('Source freshness timestamp is not propagated from provider_catalog');

const parity=fs.readFileSync(path.join(root,'js/parity-core-2.18.js'),'utf8');
for(const token of ['NEEDS_CONFIRMATION','business_confirmed','community_confirmed','disclosureRequired','organicRank','safetyStatus','RESEARCH_MAX_AGE_DAYS=180','STALE']){
  if(!parity.includes(token))throw new Error(`Parity engine missing contract token: ${token}`);
}
if(/commercial|placement|sponsor/i.test(parity.split('const score=')[1]?.split(';')[0]||''))throw new Error('Commercial placement leaked into organic score expression');

const privacy=fs.readFileSync(path.join(root,'js/privacy-hardening-2.18.js'),'utf8');
for(const token of ["localStorage.removeItem(REQUEST_KEY)","localStorage.removeItem(PROVIDER_KEY)","sessionStorage.setItem(REQUEST_KEY","LOCAL_PERSONAL_DATA_DISABLED"]){
  if(!privacy.includes(token))throw new Error(`Privacy hardening missing: ${token}`);
}
const oldStore=fs.readFileSync(path.join(root,'works-data.js'),'utf8');
if(!oldStore.includes("hoyworks:v1.1:requests"))throw new Error('Expected legacy fallback key changed; privacy migration must be reviewed');

const live=fs.readFileSync(path.join(root,'js/provider-live-ui-2.17.js'),'utf8');
if(!live.includes('verfällt automatisch')||!live.includes('alte Verfügbarkeit als aktuell'))throw new Error('Expiring live-status user contract missing');

const app2=fs.readFileSync(path.join(root,'js/app-02.js'),'utf8');
if(!app2.includes('nicht Betreiber-bestätigt')||!app2.includes('sponsorshipState'))throw new Error('Trust/commercial labels are not surfaced');
const app3=fs.readFileSync(path.join(root,'js/app-03.js'),'utf8');
if(!app3.includes('rankProviders')||!app3.includes('Bezahlte Platzierung verändert den organischen HOY-Match nicht'))throw new Error('Organic parity ranking is not wired to discovery');

const doc=fs.readFileSync(path.join(root,'docs/VERTICAL_PARITY.md'),'utf8');
for(const token of ['MUST / PREFER / IGNORE','Commercial integrity','Privacy','180 days','PARITY_CODE_COMPLETE']){
  if(!doc.includes(token))throw new Error(`Parity document missing: ${token}`);
}
console.log(JSON.stringify({ok:true,parity:'PARITY_CODE_COMPLETE',requiredFiles:required.length,researchFreshnessDays:180},null,2));
