/* HOY Works 2.12 — legal/tax + Montemares property management + kitchen depth */
(function(){
  const legal={id:'recht_steuern',label:'Recht & Steuern',short:'Recht',desc:'Immobilienrecht, NIE, Erbschaft, Steuern, Aufenthalt',glyph:'§'};
  if(!categories.some(x=>x.id===legal.id))categories.push(legal);

  const additions=[
    {id:'consulta-legal-catharina-lessing',name:'Consulta Legal · Catharina Lessing',cats:['recht_steuern'],area:'La Manga · Cartagena · San Javier · Los Alcázares',phone:'+34 686 881 760',languages:['DE','EN','ES'],summary:'Deutsch-spanische Rechtsanwältin für Immobilienkauf, Erbrecht, Miet- und Wohnungseigentumsrecht, Steuerberatung, NIE und internationale Verfahren in La Manga und der Region Murcia.',verification:'source_checked',website:'https://consulta-legal.com/',sourceUrl:'https://consulta-legal.com/rechtsanwaeltin'},
    {id:'msb-morenilla-abogados',name:'MSB Morenilla Abogados',cats:['recht_steuern'],area:'La Manga Club',phone:'+34 968 175 146',languages:['EN','ES'],summary:'Kanzlei mit Büro im La Manga Club für Immobilienrecht, Steuern, Zivilverfahren und Kaufabwicklung; englischsprachige Beratung ist öffentlich belegt.',verification:'source_checked',website:'https://msb.es/',sourceUrl:'https://msb.es/'},
    {id:'legal-matters-lmc',name:'Legal Matters LMC',cats:['recht_steuern'],area:'La Manga Club',phone:'+34 968 175 571',languages:['EN','ES'],summary:'Kanzlei im La Manga Club für Immobilienübertragungen, Steuern, Erbschaften, NIE, Aufenthaltsfragen und Zivilverfahren.',verification:'source_checked',website:'https://legalmatters.es/',sourceUrl:'https://legalmatters.es/en/'},
    {id:'heniam-associates',name:'Heniam & Associates',cats:['recht_steuern'],area:'Los Belones · La Manga Club · Costa Cálida',phone:'+34 868 707 917',languages:['EN','ES'],summary:'Bilinguale Kanzlei in Los Belones für Immobilienkäufe, Einwanderung, Visa, Steuern, Community-Verwaltung und weitere rechtliche Angelegenheiten für internationale Kunden.',verification:'source_checked',website:'https://heniam.es/',sourceUrl:'https://heniam.es/conveyancing-in-murcia/'},
    {id:'montemares-golf-property-management',name:'Montemares Golf · Property Management',cats:['mantenimiento','reformas'],area:'La Manga Club',phone:'+34 609 490 994',languages:['EN','ES'],summary:'Property Management, Instandhaltung und Projekt-/Renovierungsleistungen im La Manga Club; der Anbieter beschreibt mehr als 20 Jahre Erfahrung und umfangreiche Bauprojekte im Resort.',verification:'source_checked',website:'https://www.montemaresgolf.com/',sourceUrl:'https://www.montemaresgolf.com/about-us.html'},
    {id:'bricolaje-profesional-murcia',name:'Bricolaje Profesional',cats:['carpinteria','reformas'],area:'La Manga · Cabo de Palos · Costa de Murcia',phone:'+34 685 665 759',languages:['ES'],summary:'Maßgefertigte Küchen mit 3D-Planung, lokaler Fertigung und kompletter Installation; La Manga und Cabo de Palos werden ausdrücklich als Einsatzgebiet genannt.',verification:'source_checked',website:'https://bricolajeprofesional.es/',sourceUrl:'https://bricolajeprofesional.es/cocinas-a-medida-murcia/'}
  ];

  for(const p of additions){
    if(!fallbackProviders.some(x=>String(x.id)===p.id))fallbackProviders.push(p);
    if(state.backend!=='online'&&!state.providers.some(x=>String(x.id)===p.id))state.providers.push(p);
  }
})();
