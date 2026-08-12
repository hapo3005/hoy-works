/* HOY Works 2.6 — 50-provider milestone + solar category */
(function(){
  const extraCategories=[
    {id:'solar',label:'Solar & Energie',short:'Solar',desc:'Photovoltaik, Strom, Speicher, Energie',glyph:'☼'}
  ];
  for(const c of extraCategories){if(!categories.some(x=>x.id===c.id))categories.push(c)}

  const extraProviders=[
    {id:'cabo-hispania',name:'Cabo Hispania',cats:['reformas'],area:'Cabo de Palos',phone:'+34 670 612 974',languages:['ES'],summary:'Technischer und baulicher Komplettservice in Cabo de Palos: Planung, Genehmigungen und schlüsselfertige Reformen aus einer Hand.',verification:'source_checked',website:'https://www.cabohispania.com/',sourceUrl:'https://www.cabohispania.com/'},
    {id:'climafer',name:'Climafer',cats:['clima'],area:'La Manga del Mar Menor',phone:null,languages:['ES'],summary:'Technischer Klimaanlagenservice mit eigener Leistungsseite für La Manga del Mar Menor und Vor-Ort-Reparaturen.',verification:'source_checked',website:'https://www.climafer.net/',sourceUrl:'https://www.climafer.net/aire-acondicionado/aire-acondicionado-la-manga-del-mar-menor/'},
    {id:'limpiezas-venus',name:'Limpiezas Venus',cats:['limpieza','mantenimiento','jardineria','piscina','plagas'],area:'La Manga · Cartagena',phone:'+34 968 124 314',languages:['ES'],summary:'Reinigungs- und Wartungsunternehmen mit La-Manga-Abdeckung sowie Garten-, Pool- und Schädlingsservices.',verification:'source_checked',website:'https://www.limpiezasvenus.com/',sourceUrl:'https://www.limpiezasvenus.com/'},
    {id:'ros-jardineria',name:'Ros Jardinería y Servicios',cats:['jardineria','piscina'],area:'La Manga · Mar Menor · Cartagena · San Javier',phone:'+34 620 309 057',languages:['ES'],summary:'Garten- und Poolpflege für Privatkunden, Gemeinschaften und Unternehmen; Einsatzgebiet umfasst ausdrücklich La Manga.',verification:'source_checked',website:'https://rosjardineria.com/',sourceUrl:'https://rosjardineria.com/'},
    {id:'blue-water-la-manga-club',name:'Blue Water Cleaning & Services La Manga Club',cats:['limpieza','mantenimiento','jardineria','piscina','fontaneria','electricidad'],area:'La Manga Club',phone:'+34 640 145 345',languages:['ES'],summary:'Lokaler Reinigungs- und Wartungsdienst mit Garten-, Pool-, Fassaden-, Sanitär- und Elektro-Kleinservice.',verification:'source_checked',website:'https://www.bluewaterlmc.es/',sourceUrl:'https://www.bluewaterlmc.es/es/'},
    {id:'grupo-luna',name:'Grupo Luna / Luna Renovables',cats:['electricidad','solar'],area:'El Algar · La Manga · Cartagena',phone:'+34 968 135 390',languages:['ES'],summary:'Elektrotechnik- und Energieunternehmen an der Autovía El Algar–La Manga mit elektrischen Anlagen und erneuerbaren Energien.',verification:'source_checked',website:'https://grupo-luna.es/',sourceUrl:'https://grupo-luna.es/'},
    {id:'voltiva-energy',name:'Voltiva Energy',cats:['solar'],area:'La Manga · Cartagena',phone:null,languages:['ES'],summary:'Photovoltaik-Installateur für Cartagena und Umgebung; die eigene Projektübersicht zeigt eine konkrete Anlage in La Manga.',verification:'source_checked',website:'https://voltiva.energy/',sourceUrl:'https://voltiva.energy/instaladores-de-placas-solares-en-cartagena/'}
  ];
  for(const p of extraProviders){
    if(!fallbackProviders.some(x=>String(x.id)===String(p.id)))fallbackProviders.push(p);
    if(state.backend!=='online'&&!state.providers.some(x=>String(x.id)===String(p.id)))state.providers.push(p);
  }

  const teodo=fallbackProviders.find(p=>String(p.id)==='teodoreformas');
  if(teodo&&!teodo.cats.includes('jardineria'))teodo.cats.push('jardineria');
})();
