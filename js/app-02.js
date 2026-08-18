function cat(id){return categories.find(x=>x.id===id)}
function urgency(v){return ({now:'Jetzt / Notfall',today:'Heute',soon:'In den nächsten Tagen',plan:'Planbar'})[v]||'In den nächsten Tagen'}
function statusText(v){return ({open:'Offen',accepted:'Angenommen',question:'Rückfrage',quoted:'Angebot',scheduled:'Termin',done:'Erledigt',cancelled:'Storniert',expired:'Abgelaufen'})[v]||v}
function brand(){return `<div class="brand"><b>H<span>O</span><em>Y</em></b><small><strong>WORKS</strong> · LA MANGA</small></div>`}
function mediaFor(p){return String(p.area||'').toLowerCase().includes('cabo')?CABO:HERO}
function mediaMarkup(p){return `<img class="media-photo" src="${mediaFor(p)}" alt="Freies regionales Umgebungsbild" loading="lazy"><span class="media-shade"></span><span class="media-badge">Umgebungsbild · ${String(p.area||'').toLowerCase().includes('cabo')?'Cabo de Palos':'La Manga'}</span>`}
function verification(p){
  const trust=window.HOYWorksParity?.providerTrust?.(p);
  if(trust){
    const good=['LIVE_TODAY','HOY_VERIFIED','BUSINESS_CONFIRMED','COMMUNITY_CONFIRMED'].includes(trust.key);
    return `<span class="pill ${good?'good':'warn'}">${good?'✓ ':'! '}${esc(trust.label)}</span>`;
  }
  return p.verification==='source_checked'?'<span class="pill warn">! Quelle geprüft · nicht Betreiber-bestätigt</span>':p.verification==='directory_only'?'<span class="pill warn">! Verzeichnisfund</span>':'<span class="pill warn">Daten prüfen</span>';
}
function sponsorship(p){
  const state=window.HOYWorksParity?.sponsorshipState?.(p);
  return state?.eligible?`<span class="pill">${esc(state.label)}</span>`:'';
}
function serviceNames(p){return (p.cats||[]).slice(0,3).map(id=>cat(id)?.label||id).join(' · ')||'Leistungen werden bestätigt'}
function toast(msg){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),2200)}
function saveFavs(){localStorage.setItem('hoyworks:favs',JSON.stringify([...state.favorites]))}
function toggleFav(id){state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id);saveFavs();render();toast(state.favorites.has(id)?'Zu Favoriten hinzugefügt':'Aus Favoriten entfernt')}
function signedIn(){return !!state.user}
function authEmail(){return state.user?.email||''}

function bottom(){
  const items=[['home','Start',icons.home],['discover','Services',icons.compass],['request','Anfrage',icons.plus],['saved','Gemerkt',icons.heart],['partner','Betriebe',icons.user]];
  return items.map(([k,l,i])=>`<button class="${state.view===k?'active':''}" data-nav="${k}">${i}<small>${l}</small></button>`).join('');
}
function setBottom(){const b=$('#bottom');if(b)b.innerHTML=bottom()}
function cloudStrip(){const online=state.backend==='online';const error=state.backend==='error';return `<div class="trust-strip"><span>${online?`${state.providers.length} Anbieter · live aus HOY Works Supabase`:error?`${state.providers.length} recherchierte Fallback-Profile`:'HOY Works verbindet sich …'}</span><b class="cloud-state ${online?'online':error?'error':''}">${online?'CLOUD LIVE':error?'FALLBACK':'VERBINDET'}</b></div>`}

function card(p){return `<article class="card" data-open="${esc(p.id)}"><div class="card-art">${mediaMarkup(p)}<button class="heart ${state.favorites.has(p.id)?'active':''}" data-fav="${esc(p.id)}" aria-label="Merken">${icons.heart}</button></div><div class="card-body"><div class="card-commercial">${sponsorship(p)}</div><h3>${esc(p.name)}</h3><div class="meta">${esc(serviceNames(p))}<br>${esc(p.area||'Einsatzgebiet wird geprüft')}</div><div class="card-foot">${verification(p)}${(p.languages||[]).slice(0,2).map(l=>`<span class="pill">${esc(l)}</span>`).join('')}</div></div></article>`}
function listCard(p){return `<article class="list-card" data-open="${esc(p.id)}"><div class="list-art">${mediaMarkup(p)}</div><div>${sponsorship(p)}<h3>${esc(p.name)}</h3><p>${esc(p.area||'Einsatzgebiet wird geprüft')}</p><div class="service">${esc(serviceNames(p))}</div><div class="card-foot">${verification(p)}</div></div><button class="heart2" data-fav="${esc(p.id)}">${icons.heart}</button></article>`}
