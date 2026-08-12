/* HOY Works 2.16 — language audit + remaining contact quality */
(function(){
  const patches={
    'aluglass-toldos':{
      phone:'+34 622 846 869',
      sourceUrl:'https://www.aluglasstoldos.com/contacto'
    },
    'morelliere':{
      addLanguages:['EN'],
      sourceUrl:'https://www.morelliere.es/en/'
    },
    'servinmosol':{
      addLanguages:['EN'],
      addCats:['jardineria','electricidad','fontaneria','pintura'],
      summary:'Mehr als 20 Jahre umfassende Wartungs-, Renovierungs- und Gartendienstleistungen in Murcia/Alicante. Eigene spanische und englische La-Manga-Seiten belegen u. a. Garten, Pool, Reinigung, Elektro, Sanitär, Malerarbeiten und Bau-/Reformarbeiten.',
      sourceUrl:'https://www.servinmosol.com/en/'
    },
    'phoenix-management-lmc':{
      sourceUrl:'https://www.love-lamangaclub.es/accommodation-and-properties/'
    }
  };
  for(const collection of [fallbackProviders,state.providers]){
    for(const p of collection){
      const key=String(p.id||p.slug||'');
      const patch=patches[key];
      if(!patch)continue;
      if(patch.phone)p.phone=patch.phone;
      if(patch.summary)p.summary=patch.summary;
      if(patch.sourceUrl)p.sourceUrl=patch.sourceUrl;
      for(const id of patch.addCats||[]){if(!(p.cats||[]).includes(id))(p.cats||(p.cats=[])).push(id)}
      for(const lang of patch.addLanguages||[]){if(!(p.languages||[]).includes(lang))(p.languages||(p.languages=[])).push(lang)}
    }
  }
})();
