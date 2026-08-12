/* HOY Works 2.15 — profile completeness and service-scope enrichment */
(function(){
  const patches={
    'igs-inmoglobal-solutions':{
      summary:'Reformen und Innenausbau aus Cartagena mit nachgewiesenem La-Manga-Projekt: Komplettreformen, Küchen und Bäder nach Maß, Innenraumgestaltung, maßgefertigte Möbel sowie Planung und Genehmigungsmanagement.',
      addCats:['carpinteria'],sourceUrl:'https://www.igs-ct.com/servicios/reformas-de-viviendas/'
    },
    'climafer':{
      summary:'Mobiler technischer Vor-Ort-Service für Haushaltsgeräte, Klimaanlagen, Heiztechnik, Boiler und Thermen. Die eigene Website nennt La Manga, Cartagena und San Javier ausdrücklich als bediente Gebiete; kein lokales Ladenlokal in La Manga.',
      area:'La Manga · Cartagena · San Javier',sourceUrl:'https://www.climafer.net/'
    },
    'la-manga-getaways':{
      summary:'Property Management im La Manga Club mit regelmäßigen Objektkontrollen, eigenem Housekeeping, allgemeiner Wartung, Renovierungs-/Dekorationsorganisation, Schlüsselservice und 24h-Callout.',
      addCats:['limpieza','reformas','pintura','manitas'],sourceUrl:'https://lamangagetaways.com/property-management/'
    },
    'mar-menor-management':{
      summary:'Seit über 20 Jahren Property Management im La Manga Club. Eigene Teams/Partner für Objektkontrollen, Reinigung/Wäsche, Wartung sowie Renovierungs- und Bauarbeiten; Projektbetreuung auch für abwesende Eigentümer.',
      addCats:['limpieza','reformas','manitas'],addLanguages:['ES'],sourceUrl:'https://marmenormanagement.com/management'
    },
    'prestige-real-estates-lmc':{
      summary:'Property Management im La Manga Club mit über 30 Jahren lokaler Erfahrung. Full-Service-Betreuung für Eigentümer inklusive laufender Maintenance, Reinigung, Schlüssel-/Gästebetreuung und Emergency Callouts.',
      addCats:['limpieza','manitas'],sourceUrl:'https://prestigerealestates.com/services/investment'
    },
    'piscinas-la-manga':{
      summary:'Familienbetrieb in La Manga mit rund 15 Jahren Poolerfahrung: regelmäßige Wartung und Wasseranalyse, Reinigung, Pumpen/Filter, Salzelektrolyse, Leckdiagnose, Reparaturen, Technikinstallation und Poolbau.',
      sourceUrl:'https://www.piscinaslamanga.com/quienes-somos/'
    },
    'reparacion-express-la-manga':{
      phone:'+34 868 810 558',
      summary:'24h-Hausservice-Netzwerk für La Manga. Die eigene La-Manga-Seite nennt Elektro, Sanitär, Rollläden, Elektrogeräte, Klima, Schlüsseldienst, Glas, Schreinerei, Reformen und Malerarbeiten; Leistungen werden als Vor-Ort-/Urgent-Service angeboten.',
      addCats:['electricidad','fontaneria','persianas','electrodomesticos','clima','cerrajeria','cristaleria','carpinteria','reformas','pintura'],
      sourceUrl:'https://lamanga.reparacion-express.com/condiciones.html'
    },
    'reformas-manga-decor':{
      phone:'+34 696 290 420',
      summary:'Familienbetrieb in La Manga, gegründet 2007, für Komplettreformen von Wohnungen, Communities und Lokalen. Eigene Leistungen umfassen Sanitär, Elektro, Malerarbeiten, Schreinerei/Küchen, Klima, Markisen sowie Innen- und Außenarbeiten.',
      addCats:['clima','toldos'],sourceUrl:'https://reformasmangadecor.com/'
    },
    'jardineros-murcia':{
      summary:'Garten- und Poolpflege mit eigener La-Manga-Abdeckung: laufende Gartenwartung, Schnitt- und Pflegearbeiten sowie separate Poolpflege für Ferienimmobilien und Außenanlagen in La Manga.'
    }
  };
  for(const collection of [fallbackProviders,state.providers]){
    for(const p of collection){
      const key=String(p.id||p.slug||'');
      const patch=patches[key];
      if(!patch)continue;
      if(patch.phone)p.phone=patch.phone;
      if(patch.summary)p.summary=patch.summary;
      if(patch.area)p.area=patch.area;
      if(patch.sourceUrl)p.sourceUrl=patch.sourceUrl;
      for(const id of patch.addCats||[]){if(!(p.cats||[]).includes(id))(p.cats||(p.cats=[])).push(id)}
      for(const lang of patch.addLanguages||[]){if(!(p.languages||[]).includes(lang))(p.languages||(p.languages=[])).push(lang)}
    }
  }
})();
