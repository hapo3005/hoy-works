/* HOY Works 2.7 — multilingual property/maintenance providers */
(function(){
  const extraProviders=[
    {id:'la-manga-quality-homes',name:'La Manga Quality Homes',cats:['mantenimiento'],area:'La Manga Club',phone:'+34 968 138 866',languages:['DE','EN','ES'],summary:'Seit 1992 in La Manga Club: Property Management und Wartung für Immobilien; richtet sich ausdrücklich an englisch-, deutsch-, französisch- und spanischsprachige Kunden.',verification:'source_checked',website:'https://www.lamangaqualityhomes.com/',sourceUrl:'https://www.lamangaqualityhomes.com/'},
    {id:'phoenix-management-lmc',name:'Phoenix Management LMC',cats:['mantenimiento','manitas','jardineria','reformas','piscina','limpieza'],area:'La Manga Club',phone:'+34 608 152 965',languages:['EN'],summary:'Property Management mit Schlüsselverwaltung, Reparaturen und allgemeiner Wartung, Gartenpflege, Bau- und Renovierungsarbeiten, Poolreinigung sowie Reinigungs- und Wäscheservice.',verification:'source_checked',website:null,sourceUrl:'https://www.love-lamangaclub.es/accommodation-and-properties/'},
    {id:'la-manga-club-properties',name:'La Manga Club Properties',cats:['mantenimiento','reformas','limpieza'],area:'La Manga Club',phone:'+34 968 338 000',languages:['EN','ES'],summary:'Offizieller Property-Bereich von La Manga Club mit Projektmanagement sowie Leistungen rund um Renovierung, Dekoration, Housekeeping und laufende Immobilienbetreuung.',verification:'source_checked',website:'https://www.propertieslamangaclub.com/',sourceUrl:'https://www.propertieslamangaclub.com/en/la-manga-club-property-services'}
  ];
  for(const p of extraProviders){
    if(!fallbackProviders.some(x=>String(x.id)===String(p.id)))fallbackProviders.push(p);
    if(state.backend!=='online'&&!state.providers.some(x=>String(x.id)===String(p.id)))state.providers.push(p);
  }
})();
