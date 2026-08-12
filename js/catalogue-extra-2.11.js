/* HOY Works 2.11 — kitchens/carpentry + stronger property-management base */
(function(){
  const carpinteria={id:'carpinteria',label:'Küchen & Schreinerei',short:'Küchen',desc:'Küchenplanung, Möbel, Holzarbeiten, Montage',glyph:'▥'};
  if(!categories.some(x=>x.id===carpinteria.id))categories.push(carpinteria);

  const additions=[
    {id:'prestige-real-estates-lmc',name:'Prestige Real Estates',cats:['mantenimiento'],area:'La Manga Club',phone:'+34 633 517 449',languages:['EN'],summary:'Property Management im La Manga Club mit laufender Objektbetreuung und Maintenance für Eigentümer.',verification:'source_checked',website:'https://prestigerealestates.com/',sourceUrl:'https://prestigerealestates.com/'},
    {id:'marena-murray-property',name:'Marena Murray Property',cats:['mantenimiento','reformas','fontaneria','jardineria','piscina'],area:'La Manga Club',phone:'+34 968 175 087',languages:['EN','ES'],summary:'Property Management und Instandhaltung im La Manga Club mit regelmäßigen Objektkontrollen, Wartung sowie organisierten Bau-, Sanitär-, Garten- und Poolarbeiten.',verification:'source_checked',website:'https://www.marenamurrayproperty.com/',sourceUrl:'https://www.marenamurrayproperty.com/property-management/'},
    {id:'micasamo-property-management',name:'Micasamo Realty · Property Management',cats:['mantenimiento'],area:'La Manga Club',phone:'+34 868 481 607',languages:['EN'],summary:'Property Rentals & Management mit eigenem Standort im La Manga Club und separatem Management-/Notfallkontakt für Eigentümer und Ferienobjekte.',verification:'source_checked',website:'https://www.micasamo.com/',sourceUrl:'https://www.micasamo.com/'},
    {id:'alarcon-cocinas',name:'Alarcon Cocinas',cats:['carpinteria','reformas','electrodomesticos'],area:'Los Belones',phone:'+34 968 569 108',languages:['ES'],summary:'Küchen- und Badplanung in Los Belones mit 3D-Projektierung, Möbeln, Elektrogeräten und individuellen Küchenlösungen.',verification:'source_checked',website:'https://alarconcocinas.com/',sourceUrl:'https://alarconcocinas.com/'},
    {id:'cocinas-carpinteria-juan-huertas',name:'Cocinas y Carpintería Juan Huertas Andreu',cats:['carpinteria','reformas'],area:'Los Belones · Einsatzgebiet noch zu bestätigen',phone:'+34 689 054 737',languages:['ES'],summary:'Lokaler Küchen- und Schreinereibetrieb in Los Belones mit Maßplanung, Montage und Küchenprojekten.',verification:'directory_only',website:null,sourceUrl:'https://www.losbelones.com/sitios/cocinas-carpinteria-juan-huertas-andreu/'},
    {id:'fegapa-los-belones',name:'Fegapa',cats:['cristaleria'],area:'Los Belones · La Manga-Abdeckung noch zu bestätigen',phone:'+34 968 569 017',languages:['ES'],summary:'Carpintería de aluminio in Los Belones; öffentliches Regional-/Branchenprofil nennt Aluminiumarbeiten und lokalen Betrieb.',verification:'directory_only',website:null,sourceUrl:'https://www.paginasamarillas.es/f/los-belones/fegapa_013811765_000000001.html'}
  ];

  for(const p of additions){
    if(!fallbackProviders.some(x=>String(x.id)===p.id))fallbackProviders.push(p);
    if(state.backend!=='online'&&!state.providers.some(x=>String(x.id)===p.id))state.providers.push(p);
  }
})();
