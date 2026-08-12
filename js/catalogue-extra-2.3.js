/* HOY Works 2.3 — additional service categories + source-checked provider fallback */
(function(){
  const extraCategories=[
    {id:'jardineria',label:'Garten & Außenbereich',short:'Garten',desc:'Gartenpflege, Schnitt, Rasen, Außenflächen',glyph:'♧'},
    {id:'persianas',label:'Rollläden & Moskitonetze',short:'Rollläden',desc:'Rollläden, Moskitonetze, Reparatur, Montage',glyph:'▤'},
    {id:'cristaleria',label:'Glas & Alu',short:'Glas & Alu',desc:'Verglasung, Fenster, Aluminium, Abschlüsse',glyph:'◇'},
    {id:'electrodomesticos',label:'Elektrogeräte',short:'Elektrogeräte',desc:'Waschmaschine, Kühlschrank, Herd, Reparatur',glyph:'▣'}
  ];
  for(const c of extraCategories){if(!categories.some(x=>x.id===c.id))categories.push(c)}

  const extraProviders=[
    {id:'francisco-madrid-constructora-reformas',name:'Francisco Madrid Constructora y Reformas',cats:['reformas','mantenimiento','fontaneria','electricidad'],area:'La Manga · Cartagena',phone:'+34 652 912 310',languages:['ES','EN'],summary:'Bau, Komplettreformen und Wartung; die offizielle Website nennt Cartagena und La Manga ausdrücklich als Einsatzgebiete.',verification:'source_checked',website:'https://grupofm.es/',sourceUrl:'https://grupofm.es/'},
    {id:'teodoreformas',name:'TeodoReformas',cats:['reformas','mantenimiento','piscina'],area:'La Manga · Cartagena · San Javier',phone:'+34 675 46 17 76',languages:['ES'],summary:'Reformen und Instandhaltung seit 2016; die Unternehmensseite nennt La Manga und weitere Küstenorte und beschreibt auch Poolwartung.',verification:'source_checked',website:'https://teodoreformas.com/',sourceUrl:'https://teodoreformas.com/'},
    {id:'jardineros-murcia',name:'Jardineros Murcia',cats:['jardineria','piscina'],area:'La Manga del Mar Menor',phone:'+34 611 39 51 31',languages:['ES'],summary:'Garten- und Poolpflege mit eigenen Leistungsseiten für La Manga.',verification:'source_checked',website:'https://jardinerosmurcia.com/',sourceUrl:'https://jardinerosmurcia.com/jardineros-la-manga-mantenimiento-jardines/'},
    {id:'caliplant-jardineria',name:'Caliplant Jardinería',cats:['jardineria'],area:'La Manga Club',phone:'+34 611 143 259',languages:['ES'],summary:'Planung und Pflege von Grünflächen für Privatkunden, Unternehmen und Communities; Standort in La Manga Club.',verification:'source_checked',website:'https://web.caliplantjardineria.com/',sourceUrl:'https://web.caliplantjardineria.com/'},
    {id:'miranda-jardineria',name:'Miranda Jardinería',cats:['jardineria'],area:'La Manga Club · Cabo de Palos · La Manga',phone:null,languages:['ES'],summary:'Jardinería und Landschaftsbau seit 1985 in La Manga Club; Wartung auch in Cabo de Palos und La Manga.',verification:'source_checked',website:'https://www.mirandajardineria.es/',sourceUrl:'https://www.mirandajardineria.es/'},
    {id:'persianas-la-manga',name:'Persianas La Manga',cats:['persianas'],area:'Cabo de Palos · La Manga · Cartagena',phone:'+34 655 409 831',languages:['ES'],summary:'Reparatur und Installation von Rollläden und Moskitonetzen; Sitz in Cabo de Palos, Service auch in La Manga und Umgebung.',verification:'source_checked',website:'https://www.persianaslamanga.com/',sourceUrl:'https://www.persianaslamanga.com/'},
    {id:'cristaleria-la-manga',name:'Cristalería La Manga',cats:['cristaleria'],area:'La Manga · Cartagena',phone:'+34 652 407 047',languages:['ES'],summary:'Maßglas, Aluminium, Verglasungen und Reparaturen für Wohnungen, Communities und Gewerbe in La Manga und Cartagena.',verification:'source_checked',website:'https://cristalerialamanga.es/',sourceUrl:'https://cristalerialamanga.es/'},
    {id:'alumavel-murcia',name:'Alumavel Murcia',cats:['cristaleria'],area:'La Manga · Cartagena',phone:'+34 611 089 549',languages:['ES'],summary:'Aluminium- und Glasabschlüsse, Fenster, Glasvorhänge und Terrassenlösungen; die Murcia-Seite nennt La Manga ausdrücklich.',verification:'source_checked',website:'https://www.alumavel.com/donde-trabajamos/murcia/',sourceUrl:'https://www.alumavel.com/donde-trabajamos/murcia/'},
    {id:'murtecnoservice',name:'MurTecnoService',cats:['electrodomesticos'],area:'La Manga · Cartagena',phone:'+34 968 297 296',languages:['ES'],summary:'Reparatur und Wartung von Haushaltsgeräten; die Anbieterwebsite nennt Cartagena und La Manga als Einsatzgebiet.',verification:'source_checked',website:'https://murciareparacionelectrodomesticos.com/',sourceUrl:'https://murciareparacionelectrodomesticos.com/cartagena/'},
    {id:'servi-mundo-cerrajero',name:'SERVI-MUNDO Cerrajero',cats:['cerrajeria'],area:'Cabo de Palos',phone:'+34 696 41 05 05',languages:['ES'],summary:'Schlüsseldienst mit öffentlichem Geschäftsprofil in Cabo de Palos.',verification:'directory_only',website:null,sourceUrl:null}
  ];
  for(const p of extraProviders){
    if(!fallbackProviders.some(x=>String(x.id)===String(p.id)))fallbackProviders.push(p);
    if(state.backend!=='online'&&!state.providers.some(x=>String(x.id)===String(p.id)))state.providers.push(p);
  }
})();
