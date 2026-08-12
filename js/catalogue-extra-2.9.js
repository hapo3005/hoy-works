/* HOY Works 2.9 — thin-category enrichment */
(function(){
  const additions=[
    {id:'habitat-proyectos',name:'Habitat Proyectos',cats:['reformas','mantenimiento'],area:'La Manga · Cabo de Palos · La Manga Club',phone:'+34 621 058 898',languages:['ES'],summary:'Construcción, rehabilitación y mantenimiento de viviendas y locales; trayectoria y proyectos en La Manga Club, La Manga und Cabo de Palos.',verification:'source_checked',website:'https://habitatproyectos.es/',sourceUrl:'https://habitatproyectos.es/'},
    {id:'cerramientos-costa-calida',name:'Cerramientos Costa Cálida',cats:['cristaleria','toldos'],area:'La Manga · Gran Vía km 1',phone:'+34 968 563 142',languages:['ES'],summary:'Cerramientos integrales direkt in La Manga: Glas, Aluminium, Dächer, Markisen, Stores und Vorhänge.',verification:'source_checked',website:'https://cerramientoscostacalidasl.es/',sourceUrl:'https://cerramientoscostacalidasl.es/nosotros/'},
    {id:'aluglass-toldos',name:'Aluglass Toldos',cats:['cristaleria','toldos'],area:'La Manga · Cartagena · Mar Menor',phone:null,languages:['ES'],summary:'Aluminium-/Glasabschlüsse, Glasvorhänge, Dächer, Markisen und bioklimatische Pergolen mit ausdrücklicher La-Manga-Abdeckung.',verification:'source_checked',website:'https://www.aluglasstoldos.com/',sourceUrl:'https://www.aluglasstoldos.com/'},
    {id:'cerrajeros-jogamar',name:'Cerrajeros Jogamar',cats:['cerrajeria'],area:'La Manga · Cabo de Palos · Cartagena · Los Belones',phone:'+34 638 257 810',languages:['ES'],summary:'24h-Schlüsseldienst mit ausdrücklicher Küstenabdeckung; Türöffnungen, Schlösser und Services für Ferienwohnungen.',verification:'source_checked',website:'https://jogamar.com/',sourceUrl:'https://jogamar.com/'},
    {id:'la-manga-builders',name:'La Manga Builders',cats:['solar','reformas'],area:'La Manga Club',phone:'+34 616 345 493',languages:['EN'],summary:'Bau-/Reformbetrieb im La Manga Club mit eigenem Solarservice für PV, Batteriespeicher, Netzanschluss und Genehmigungen.',verification:'source_checked',website:'https://lamangabuilders.com/',sourceUrl:'https://lamangabuilders.com/solar-panel-installation/'}
  ];
  for(const p of additions){
    if(!fallbackProviders.some(x=>String(x.id)===p.id))fallbackProviders.push(p);
    if(state.backend!=='online'&&!state.providers.some(x=>String(x.id)===p.id))state.providers.push(p);
  }
  const patches={
    'resort-sales-management':{addCats:['manitas','pintura','reformas']},
    'key-care-property-management':{addCats:['manitas','fontaneria','electricidad','pintura','electrodomesticos']}
  };
  for(const collection of [fallbackProviders,state.providers]){
    for(const p of collection){
      const patch=patches[String(p.id)];if(!patch)continue;
      for(const id of patch.addCats||[]){if(!(p.cats||[]).includes(id))(p.cats||(p.cats=[])).push(id)}
    }
  }
})();
