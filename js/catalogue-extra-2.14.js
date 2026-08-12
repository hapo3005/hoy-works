/* HOY Works 2.14 — specialist density + profile enrichment */
(function(){
  const additions=[
    {id:'tmm-control-integral-plagas',name:'TMM Control Integral de Plagas',cats:['plagas'],area:'La Manga · Cartagena · San Javier · Región de Murcia',phone:'+34 673 987 016',languages:['ES'],summary:'Professioneller Schädlingsservice für Wohnungen, Communities und Betriebe; La Manga del Mar Menor ist auf der eigenen Website ausdrücklich als Einsatzgebiet genannt.',verification:'source_checked',website:'https://controldeplagastmm.com/',sourceUrl:'https://controldeplagastmm.com/'},
    {id:'control-plagas-martinez',name:'Control de Plagas Martínez',cats:['plagas'],area:'La Manga · Cartagena · San Javier',phone:'+34 626 431 275',languages:['ES'],summary:'Schädlingsbekämpfung mit mehr als 27 Jahren Erfahrung; Desratización, Desinsectación und Desinfektion mit eigener Leistungsseite für La Manga del Mar Menor.',verification:'source_checked',website:'https://www.plagasmartinez.es/',sourceUrl:'https://www.plagasmartinez.es/control-plagas-la-manga-del-mar-menor.html'},
    {id:'trisolar-energia-solar',name:'TRISOLAR Energía Solar',cats:['solar'],area:'Región de Murcia · Cartagena · San Javier',phone:'+34 968 687 035',languages:['ES'],summary:'Solar-Fachbetrieb mit mehr als 20 Jahren Erfahrung für Photovoltaik, Solarthermie, Wartung und Ladepunkte; installiert laut eigener Website in der gesamten Región de Murcia.',verification:'source_checked',website:'https://www.trisolar.es/',sourceUrl:'https://www.trisolar.es/'},
    {id:'murcia-solar',name:'Murcia Solar',cats:['solar','electricidad'],area:'Región de Murcia · Cartagena · San Javier',phone:'+34 635 570 836',languages:['ES'],summary:'Solar- und Elektrofachbetrieb mit Tesla-Energy- und V2C-Zertifizierung; die eigene Website nennt mehr als 45 bediente Gemeinden in der gesamten Región de Murcia.',verification:'source_checked',website:'https://murciasolar.es/',sourceUrl:'https://murciasolar.es/'},
    {id:'cierramediterraneo-cerrajeros-la-manga',name:'CierraMediterráneo · Cerrajeros La Manga',cats:['cerrajeria'],area:'La Manga del Mar Menor',phone:'+34 968 297 296',languages:['ES'],summary:'Schlüsseldienst mit eigener Leistungsseite für La Manga del Mar Menor; Türöffnungen, Sicherheitszylinder, Garagen-/Schließtechnik und 24h-Service.',verification:'source_checked',website:'https://murciacerrajeros.com/la-manga-del-mar-menor/',sourceUrl:'https://murciacerrajeros.com/la-manga-del-mar-menor/'},
    {id:'ferreteria-nautica-zoko',name:'Ferretería & Náutica Zoko',cats:['cerrajeria'],area:'La Manga · Zoco km 4',phone:'+34 968 140 097',languages:['ES'],summary:'Lokale Ferretería in La Manga mit Cerrajería/Domótica, Schlüssel- und RFID/NFC-Duplikaten sowie Garagen-/Alarm-Fernbedienungen.',verification:'source_checked',website:'https://ferreteriazoko.com/',sourceUrl:'https://ferreteriazoko.com/ferreteria/'},
    {id:'iberbrit-legal',name:'Iberbrit Legal',cats:['gestiones','recht_steuern'],area:'La Manga · Cartagena',phone:'+34 968 337 392',languages:['EN','ES'],summary:'Steuer-, Rechts-, Buchhaltungs- und Unternehmensberatung mit eigener Niederlassung in La Manga; richtet sich auch an internationale und nicht in Spanien ansässige Mandanten.',verification:'source_checked',website:'https://www.iberbrit.com/',sourceUrl:'https://www.iberbrit.com/oficinas'}
  ];
  for(const p of additions){
    if(!fallbackProviders.some(x=>String(x.id)===p.id))fallbackProviders.push(p);
    if(state.backend!=='online'&&!state.providers.some(x=>String(x.id)===p.id))state.providers.push(p);
  }

  const patches={
    'la-manga-selector':{phone:'+34 968 563 540',summary:'Grupo local con sede en La Manga desde 1975; además de servicios inmobiliarios ofrece asesoría fiscal y contable y administración de comunidades.'},
    'reparamurcia':{phone:'+34 968 227 131'},
    'perez-gardens':{phone:'+34 626 728 581'},
    'aluglass-toldos':{languages:['DE','EN','ES']}
  };
  for(const collection of [fallbackProviders,state.providers]){
    for(const p of collection){
      const patch=patches[String(p.id)];
      if(!patch)continue;
      if(patch.phone)p.phone=patch.phone;
      if(patch.summary)p.summary=patch.summary;
      if(patch.languages)p.languages=[...patch.languages];
    }
  }
})();
