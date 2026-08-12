/* HOY Works 2.13 — kitchen/carpentry depth + German property support */
(function(){
  const additions=[
    {id:'murcia-villas',name:'Murcia Villas · Property Management',cats:['mantenimiento'],area:'La Manga Club',phone:'+34 630 877 887',languages:['DE','EN','ES'],summary:'Internationaler Immobilien- und Property-Management-Anbieter mit La-Manga-Club-Bezug; die eigene Unternehmensseite nennt mehrsprachigen Support auf Deutsch, Englisch und Spanisch sowie Management für Ferien- und Langzeitvermietung.',verification:'source_checked',website:'https://www.murciavillas.com/',sourceUrl:'https://www.murciavillas.com/en/company-history'},
    {id:'carpintero-cartagena',name:'Carpintero Cartagena',cats:['carpinteria'],area:'Cartagena · San Javier',phone:'+34 747 611 400',languages:['ES'],summary:'Carpintería und maßgefertigte Küchen für Cartagena und umliegende Gemeinden; die eigene Website nennt San Javier ausdrücklich als Einsatzgebiet und bietet Planung, Fertigung und Montage von Küchenmöbeln nach Maß.',verification:'source_checked',website:'https://carpinterocartagena.es/',sourceUrl:'https://carpinterocartagena.es/cocinas-a-medida/'},
    {id:'carpinteria-antonio-samper',name:'Carpintería Antonio Samper',cats:['carpinteria'],area:'Cartagena · San Javier · San Pedro del Pinatar',phone:'+34 606 648 178',languages:['ES'],summary:'Familienbetrieb für maßgefertigte Küchen, Schränke, Türen und Möbel; die eigene Website weist Servicebereiche in Cartagena und San Javier aus.',verification:'source_checked',website:'https://www.carpinteriantoniosamper.es/',sourceUrl:'https://www.carpinteriantoniosamper.es/'}
  ];
  for(const p of additions){
    if(!fallbackProviders.some(x=>String(x.id)===p.id))fallbackProviders.push(p);
    if(state.backend!=='online'&&!state.providers.some(x=>String(x.id)===p.id))state.providers.push(p);
  }
})();
