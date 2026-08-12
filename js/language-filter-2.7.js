/* HOY Works 2.7 — language-first discovery */
(function(){
  if(window.__hoyWorksLanguageFilter27)return;
  window.__hoyWorksLanguageFilter27=true;
  state.languageFilter=state.languageFilter||'all';

  const languageLabel={all:'Alle Sprachen',DE:'Deutsch',EN:'English',ES:'Español'};
  const baseFiltered=filtered;
  const baseDiscover=discover;
  const baseHome=home;

  filtered=function(){
    const list=baseFiltered();
    if(state.languageFilter==='all')return list;
    return list.filter(p=>(p.languages||[]).includes(state.languageFilter));
  };

  discover=function(){
    const html=baseDiscover();
    const controls=`<div class="language-filterline"><span>SPRACHE</span>${['all','DE','EN','ES'].map(l=>`<button class="${state.languageFilter===l?'active':''}" data-language-filter="${l}">${languageLabel[l]}</button>`).join('')}</div>`;
    return html.replace('<div class="list">',controls+'<div class="list">');
  };

  home=function(){
    const original=state.providers;
    const preferred=state.request?.language||'DE';
    state.providers=[...original].sort((a,b)=>Number((b.languages||[]).includes(preferred))-Number((a.languages||[]).includes(preferred)));
    const html=baseHome();
    state.providers=original;
    const hint=`<div class="language-hint"><div><small>DEINE ANFRAGESPRACHE</small><b>${languageLabel[preferred]||preferred}</b></div><button data-language-shortcut="${preferred}">Anbieter auf ${languageLabel[preferred]||preferred} ansehen ›</button></div>`;
    return html.replace('<div class="trust-strip">',hint+'<div class="trust-strip">');
  };

  document.addEventListener('click',e=>{
    const f=e.target.closest('[data-language-filter]');
    if(f){state.languageFilter=f.dataset.languageFilter||'all';render();return}
    const shortcut=e.target.closest('[data-language-shortcut]');
    if(shortcut){state.languageFilter=shortcut.dataset.languageShortcut||'all';state.view='discover';render();return}
  });
})();
