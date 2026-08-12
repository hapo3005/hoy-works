/* HOY Works 2.5 — regional services: pest control, awnings, painting */
(function(){
  const extraCategories=[
    {id:'plagas',label:'Schädlingsbekämpfung',short:'Schädlinge',desc:'Kakerlaken, Wespen, Ameisen, Nager, Desinfektion',glyph:'⊘'},
    {id:'toldos',label:'Markisen & Sonnenschutz',short:'Markisen',desc:'Markisen, Pergolen, Sonnenschutz, Montage',glyph:'◫'},
    {id:'pintura',label:'Malerarbeiten',short:'Maler',desc:'Innen, außen, Fassade, Renovierung',glyph:'◩'}
  ];
  for(const c of extraCategories){if(!categories.some(x=>x.id===c.id))categories.push(c)}

  const extraProviders=[
    {id:'iberplagas',name:'Iberplagas',cats:['plagas'],area:'La Manga · Cabo de Palos · Cartagena · San Javier',phone:'+34 685 152 725',languages:['ES'],summary:'Zertifizierter Schädlingsbekämpfungs- und Desinfektionsdienst mit eigener Leistungsseite für La Manga.',verification:'source_checked',website:'https://www.iberplagas.es/',sourceUrl:'https://www.iberplagas.es/control-de-plagas-en-la-manga-del-mar-menor'},
    {id:'campos-serrano-biologos',name:'Campos Serrano Biólogos',cats:['plagas'],area:'La Manga · Cabo de Palos · Mar Menor',phone:'+34 655 662 555',languages:['ES'],summary:'Schädlingsbekämpfung für La Manga, Cabo de Palos und weitere Orte des südlichen Mar Menor.',verification:'source_checked',website:'https://csbiologos.com/',sourceUrl:'https://csbiologos.com/control-de-plagas-en-la-manga-mar-menor/'},
    {id:'toldhogar',name:'Toldhogar',cats:['toldos','persianas'],area:'La Manga · Cartagena · Los Alcázares · San Javier',phone:'+34 636 656 108',languages:['ES'],summary:'Hersteller und Installateur für Markisen, Pergolen und Sonnenschutz mit ausdrücklicher La-Manga-Abdeckung.',verification:'source_checked',website:'https://www.toldoscartagena.com/',sourceUrl:'https://www.toldoscartagena.com/empresa-de-toldos.html'},
    {id:'toldos-zaplana',name:'Toldos y Cerrajería Zaplana',cats:['toldos','persianas'],area:'La Manga · Cartagena',phone:'+34 619 663 315',languages:['ES'],summary:'Hersteller für Markisen, Rollläden und Sonnenschutz; La Manga ist auf der eigenen Website Teil des Einsatzgebiets.',verification:'source_checked',website:'https://toldoszaplana.com/',sourceUrl:'https://toldoszaplana.com/contacto.html'},
    {id:'tecnitoldo',name:'Tecnitoldo',cats:['toldos'],area:'La Manga · Cabo de Palos · Cartagena · San Javier',phone:'+34 968 180 843',languages:['ES'],summary:'Markisen- und Pergolenanbieter mit ausdrücklich genannter Abdeckung von La Manga und Cabo de Palos.',verification:'source_checked',website:'https://tecnitoldo.es/',sourceUrl:'https://tecnitoldo.es/toldos-en-cartagena/'},
    {id:'pintores-cartagena',name:'Pintores Cartagena',cats:['pintura'],area:'La Manga · Cartagena · San Javier',phone:'+34 664 465 420',languages:['ES'],summary:'Malerbetrieb für Innen-, Außen-, Fassaden- und Renovierungsarbeiten mit La Manga als ausgewiesenem Arbeitsgebiet.',verification:'source_checked',website:'https://pintorescartagena.com/',sourceUrl:'https://pintorescartagena.com/'},
    {id:'pintores-cartago',name:'Pintores Cartago',cats:['pintura','reformas'],area:'La Manga · Cabo de Palos · Cartagena · San Javier',phone:'+34 620 096 957',languages:['ES','EN'],summary:'Maler- und Reformunternehmen aus Cartagena mit ausdrücklicher La-Manga-Abdeckung und eigener englischer Leistungsseite.',verification:'source_checked',website:'https://pintorescartago.com/',sourceUrl:'https://pintorescartago.com/servicios/pintores-cartagena/'},
    {id:'perez-gardens',name:'Pérez Gardens',cats:['jardineria','piscina'],area:'La Manga · Cartagena · Mar Menor',phone:null,languages:['ES'],summary:'Garten- und Poolpflege im Raum Cartagena, La Manga und Mar Menor; eigene Leistungsseite für Poolwartung.',verification:'source_checked',website:'https://jardineroperezgardens.es/',sourceUrl:'https://jardineroperezgardens.es/mantenimiento-de-piscinas/'}
  ];
  for(const p of extraProviders){
    if(!fallbackProviders.some(x=>String(x.id)===String(p.id)))fallbackProviders.push(p);
    if(state.backend!=='online'&&!state.providers.some(x=>String(x.id)===String(p.id)))state.providers.push(p);
  }
})();
