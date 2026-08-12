/* HOY Works 2.8 — content enrichment + La Manga Getaways */
(function(){
  const getaways={id:'la-manga-getaways',name:'La Manga Getaways',cats:['mantenimiento'],area:'La Manga Club',phone:'+34 868 086 990',languages:['EN'],summary:'Property Management im La Manga Club mit regelmäßigen Objektkontrollen und individueller Betreuung für Ferienimmobilien.',verification:'source_checked',website:'https://lamangagetaways.com/',sourceUrl:'https://lamangagetaways.com/property-management/'};
  if(!fallbackProviders.some(x=>String(x.id)===getaways.id))fallbackProviders.push(getaways);
  if(state.backend!=='online'&&!state.providers.some(x=>String(x.id)===getaways.id))state.providers.push(getaways);

  const patches={
    'el-fontanero-cartagena':{phone:'+34 634 295 743',summary:'Lokaler Sanitärservice für Cartagena und La Manga: Leckagen, Verstopfungen, Installationen, Thermen/Boiler, Armaturen und Inspektionen; betreut ausdrücklich auch Zweitwohnungen in La Manga.'},
    'miranda-jardineria':{phone:'+34 630 198 339',summary:'Seit 1985 in La Manga Club: Gartenpflege, Schnitt, Rasen, Landschaftsgestaltung, Pflanzungen, Bewässerung sowie laufende Pflege von Communities; arbeitet auch in Cabo de Palos und La Manga.'},
    'voltiva-energy':{phone:'+34 868 952 028',summary:'Murcianischer Energieanbieter mit Photovoltaik-/Eigenverbrauchslösungen und Ladeinfrastruktur; öffentlich dokumentierte Projekte und Service in der Region Murcia.'},
    'climafer':{summary:'Technischer Vor-Ort-Service in Murcia für Klimaanlagen, Heiztechnik und Haushaltsgeräte; die eigene Website nennt La Manga del Mar Menor ausdrücklich als bedientes Gebiet.',addCats:['electrodomesticos']}
  };
  for(const collection of [fallbackProviders,state.providers]){
    for(const p of collection){
      const patch=patches[String(p.id)];if(!patch)continue;
      if(patch.phone)p.phone=patch.phone;
      if(patch.summary)p.summary=patch.summary;
      for(const id of patch.addCats||[]){if(!(p.cats||[]).includes(id))(p.cats||(p.cats=[])).push(id)}
    }
  }
})();
