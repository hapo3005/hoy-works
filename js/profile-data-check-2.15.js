/* HOY Works 2.15 — transparent provider data completeness */
(function(){
  if(window.__hoyWorksProfileDataCheck215)return;
  window.__hoyWorksProfileDataCheck215=true;
  const baseOpenDetail=openDetail;
  const labels={DE:'Deutsch',EN:'English',ES:'Español'};

  openDetail=function(id){
    baseOpenDetail(id);
    const p=state.providers.find(x=>String(x.id)===String(id));
    const body=document.querySelector('#detail .detail-body');
    if(!p||!body)return;

    const areaOk=Boolean(p.area)&&!String(p.area).toLowerCase().includes('wird geprüft');
    const checks=[
      ['Quelle',p.verification==='source_checked',p.verification==='source_checked'?'Unternehmensquelle geprüft':p.verification==='directory_only'?'Nur Verzeichnisquelle':'Noch offen'],
      ['Leistung',Boolean((p.cats||[]).length),(p.cats||[]).length?`${(p.cats||[]).length} Bereich${(p.cats||[]).length===1?'':'e'}`:'Noch offen'],
      ['Sprache',Boolean((p.languages||[]).length),(p.languages||[]).length?(p.languages||[]).map(l=>labels[l]||l).join(' · '):'Noch offen'],
      ['Gebiet',areaOk,areaOk?p.area:'Noch zu bestätigen'],
      ['Kontakt',Boolean(p.phone||p.website),p.phone?'Telefon vorhanden':p.website?'Website vorhanden':'Noch kein direkter Kontakt']
    ];
    const complete=checks.filter(x=>x[1]).length;
    const block=document.createElement('div');
    block.className='provider-fit-card provider-data-check';
    block.innerHTML=`<div class="provider-fit-top"><div><small>HOY DATENCHECK</small><b>${complete}/${checks.length} Basisangaben vorhanden</b></div><span class="${complete===checks.length?'fit-good':'fit-neutral'}">${complete===checks.length?'✓ vollständig':'prüfen'}</span></div><div class="provider-fit-grid">${checks.map(([label,ok,text])=>`<div><small>${esc(label.toUpperCase())}</small><strong>${ok?'✓ ':''}${esc(text)}</strong></div>`).join('')}</div><p>Dieser Check bewertet veröffentlichte Stammdaten. Er ist keine Aussage über HOY-Partnerschaft, Arbeitsqualität oder heutige Verfügbarkeit.</p>`;
    const existing=body.querySelector('.provider-fit-card');
    if(existing)existing.insertAdjacentElement('afterend',block);else body.prepend(block);
  };
})();
