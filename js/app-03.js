function parityRows(providers,request={}){
  if(!window.HOYWorksParity?.rankProviders)return (providers||[]).map((provider,index)=>({provider,eligible:true,score:null,organicRank:index+1}));
  return window.HOYWorksParity.rankProviders(providers,request);
}
function parityProviders(providers,request={}){return parityRows(providers,request).map(row=>row.provider)}

function home(){
  const featured=parityProviders(state.providers,state.request).slice(0,4);
  return `<section>
    <div class="hero" style="background-image:url('${HERO}')">
      <div class="hero-top">${brand()}<button class="bell" data-nav="partner">${icons.bell}</button></div>
      <div class="hero-copy"><h1>Was heute<br>erledigt wird.</h1><p>Finde die richtige lokale Hilfe in La Manga.</p></div>
      <div class="search-box">
        <button class="search-row" data-request-jump="3">${icons.pin}<div><small>Wo?</small><strong>${esc(state.request.municipality?`${state.request.location} · ${state.request.municipality}`:state.request.location)}</strong></div>${icons.chev}</button>
        <button class="search-row" data-request-jump="1">${icons.wrench}<div><small>Was?</small><strong>${state.request.category?esc(cat(state.request.category)?.label):'Problem oder Leistung auswählen'}</strong></div>${icons.chev}</button>
        <button class="search-row" data-request-jump="2">${icons.clock}<div><small>Wann?</small><strong>${esc(urgency(state.request.urgency))}</strong></div>${icons.chev}</button>
        <button class="go" data-start-request>Passende Hilfe finden</button>
      </div>
    </div>
    <div class="quick"><button class="active" data-filter-home="all">${icons.wrench}Alle Services</button>${categories.slice(0,5).map(c=>`<button data-filter-home="${c.id}"><span>${c.glyph}</span>${c.short}</button>`).join('')}</div>
    ${cloudStrip()}
    <div class="section"><div class="section-head"><h2>Passende Anbieter</h2><button data-nav="discover">Alle anzeigen ›</button></div><div class="cards">${featured.map(card).join('')}</div></div>
    <div class="editorial"><div class="eyebrow">HOY MATCH</div><h2>Problem statt Branchenbuch.</h2><p>Du beschreibst Aufgabe, Ort, Zeitpunkt und Sprache. HOY filtert fachliche, regionale und bestätigte Live-Signale getrennt. Unbekannte Muss-Merkmale bleiben „Bestätigung nötig“ statt künstlich positiv zu werden.</p><button data-start-request>Anfrage starten</button></div>
    <div class="source">Öffentliche Anbieterprofile sind keine automatische HOY-Partnerschaft. Quellenstatus, bestätigte Einsatzgebiete und Live-Verfügbarkeit werden getrennt behandelt. Bezahlte Platzierung verändert den organischen HOY-Match nicht. Regionale Bilder sind als Umgebungsbilder gekennzeichnet.</div>
  </section>`;
}

function filtered(){
  const q=state.query.trim().toLowerCase();
  const base=state.providers.filter(p=>(state.filter==='all'||(p.cats||[]).includes(state.filter))&&(!q||[p.name,p.area,p.summary,serviceNames(p)].join(' ').toLowerCase().includes(q)));
  const request={...state.request,category:state.filter==='all'?(state.request.category||null):state.filter};
  return parityProviders(base,request);
}
function discover(){
  const list=filtered();
  return `<section><div class="head"><div class="head-top">${brand()}<button class="round" data-start-request>${icons.plus}</button></div><h1>Services.</h1><p>Lokale Anbieter rund um La Manga, Cabo de Palos und Umgebung – organisch nach HOY Match sortiert, mit getrenntem Quellen-, Vertrauens- und Live-Status.</p><div class="searchline"><input id="q" placeholder="Anbieter, Leistung oder Ort …" value="${esc(state.query)}"><button data-search>${icons.compass}</button></div></div>${cloudStrip()}<div class="filterline"><button class="${state.filter==='all'?'active':''}" data-filter="all">Alle</button>${categories.map(c=>`<button class="${state.filter===c.id?'active':''}" data-filter="${c.id}">${c.label}</button>`).join('')}</div><div class="list">${list.map(listCard).join('')||'<div class="empty"><h2>Nichts gefunden.</h2><p>Ändere Suche oder Filter.</p></div>'}</div></section>`;
}
function saved(){
  const list=state.providers.filter(p=>state.favorites.has(p.id));
  return `<section><div class="head"><div class="eyebrow">GEMERKT</div><h1>Deine Anbieter.</h1><p>Alles, was du für später speichern möchtest.</p></div>${list.length?`<div class="list">${list.map(listCard).join('')}</div>`:`<div class="empty">${icons.heart}<h2>Noch nichts gespeichert.</h2><p>Tippe bei einem Anbieter auf das Herz.</p><button data-nav="discover">Services entdecken</button></div>`}</section>`;
}

function matchesForRequest(id){return state.myMatches.filter(m=>String(m.request_id)===String(id) && m.is_eligible)}
function requestCard(r){
  const matches=matchesForRequest(r.id);const zone=r.municipality||r.locality||'Gebiet wird geprüft';
  return `<article class="request-card"><div class="request-card-top"><div><div class="eyebrow">${esc(r.public_ref||'HOY WORKS')}</div><h3>${esc(cat(r.service_id)?.label||r.service_id)}</h3></div><span class="status-badge status-${esc(r.status)}">${esc(statusText(r.status))}</span></div><p>${esc(r.description)}</p><div class="request-meta"><span>${icons.pin}${esc(zone)}</span><span>${icons.clock}${esc(urgency(r.urgency))}</span><span>${icons.camera}${Number(r.photo_count||0)} Foto${Number(r.photo_count||0)===1?'':'s'}</span></div><div class="match-summary"><b>${matches.length?`${matches.length} passende Anbieter`:'Matching läuft / wird geprüft'}</b>${matches.slice(0,3).map(m=>`<span>${esc(m.providers?.name||'Anbieter')} · ${Math.round(Number(m.score||0))}%</span>`).join('')}</div>${!['done','cancelled','expired'].includes(r.status)?`<label class="photo-add"><input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple data-photo-request="${esc(r.id)}"><span>${icons.camera} Private Fotos hinzufügen</span></label>`:''}<button class="request-more" data-request-detail="${esc(r.id)}">Anfrage öffnen</button></article>`;
}
