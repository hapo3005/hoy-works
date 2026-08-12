/* HOY Works 2.10 — German-language coverage + administration/translation */
(function(){
  const gestiones={id:'gestiones',label:'Behörden & Übersetzung',short:'Behördenhilfe',desc:'NIE, Notar, Dokumente, Behörden, Übersetzung',glyph:'§'};
  if(!categories.some(x=>x.id===gestiones.id))categories.push(gestiones);

  const additions=[
    {id:'agencia-mkn',name:'Agencia MKN',cats:['gestiones'],area:'Cabo de Palos · Cartagena · La Manga',phone:'+34 634 73 79 49',languages:['DE','EN','ES'],summary:'Lokale Begleitung für Ausländer: Behördenwege, NIE, Notar, Dokumente sowie Übersetzung und Dolmetschen auf Deutsch, Englisch und Spanisch.',verification:'source_checked',website:'https://www.agenciamkn.com/',sourceUrl:'https://www.agenciamkn.com/servicios'},
    {id:'euroinvest-la-manga',name:'Euroinvest La Manga',cats:['gestiones'],area:'Playa Paraíso · La Manga · Cartagena',phone:'+34 649 401 373',languages:['DE','EN','ES'],summary:'Internationaler Multiservice für Ausländer mit administrativer, steuerlicher und bürokratischer Unterstützung sowie Übersetzung Deutsch–Englisch–Spanisch.',verification:'source_checked',website:'https://euroinvestlamanga.es/',sourceUrl:'https://euroinvestlamanga.es/nosotros/'},
    {id:'la-manga-selector',name:'Grupo Selector · La Manga Selector',cats:['gestiones'],area:'La Manga del Mar Menor',phone:null,languages:['ES'],summary:'Seit 1975 in La Manga tätiger Immobilien- und Servicebetrieb mit steuerlicher Beratung, Verwaltung von Eigentümergemeinschaften und Unterstützung bei immobilienbezogenen Formalitäten.',verification:'source_checked',website:'https://www.lamangaselector.com/',sourceUrl:'https://www.lamangaselector.com/'},
    {id:'arena-inn-la-manga',name:'Arena Inn La Manga',cats:['mantenimiento','limpieza'],area:'La Manga · Cabo de Palos',phone:'+34 968 14 07 81',languages:['ES'],summary:'Eigentümer- und Ferienwohnungsservice mit Mietverwaltung, Reinigung, Wäscherei, laufender Instandhaltung und Koordination lokaler Fachbetriebe.',verification:'source_checked',website:'https://www.arenainnalquilerlamanga.com/',sourceUrl:'https://www.arenainnalquilerlamanga.com/acceso-propietario/'}
  ];
  for(const p of additions){
    if(!fallbackProviders.some(x=>String(x.id)===p.id))fallbackProviders.push(p);
    if(state.backend!=='online'&&!state.providers.some(x=>String(x.id)===p.id))state.providers.push(p);
  }

  const builderCats=['reformas','solar','mantenimiento','fontaneria','electricidad','clima','pintura','piscina','manitas'];
  for(const collection of [fallbackProviders,state.providers]){
    const p=collection.find(x=>String(x.id)==='la-manga-builders'||String(x.name)==='La Manga Builders');
    if(!p)continue;
    p.languages=['DE','EN','ES'];
    p.summary='Mehrsprachige Bau-, Renovierungs- und Wartungsspezialisten im La Manga Club: Reformen, Sanitär, Elektro, Klima, Malerarbeiten, Pool, Solar, Wartung und Notfallreparaturen.';
    p.sourceUrl='https://lamangabuilders.com/service-areas-murcia-region/';
    for(const id of builderCats){if(!(p.cats||[]).includes(id))(p.cats||(p.cats=[])).push(id)}
  }
})();
