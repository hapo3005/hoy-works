const HERO='https://commons.wikimedia.org/wiki/Special:FilePath/La_Manga_y_el_Mar_Menor.jpg?width=1600';
const CABO='https://commons.wikimedia.org/wiki/Special:Redirect/file/Cabo%20de%20Palos1.jpg?width=960';

const categories=[
  {id:'reformas',label:'Reformen',short:'Reformen',desc:'Wohnung, Bad, Küche, Renovierung',glyph:'▦'},
  {id:'fontaneria',label:'Sanitär',short:'Sanitär',desc:'Wasser, Leitungen, Armaturen, Lecks',glyph:'◒'},
  {id:'electricidad',label:'Elektro',short:'Elektro',desc:'Strom, Sicherungen, Installationen',glyph:'ϟ'},
  {id:'clima',label:'Klima',short:'Klima',desc:'Klimaanlage, Wartung, Reparatur',glyph:'❄'},
  {id:'piscina',label:'Pool',short:'Pool',desc:'Pflege, Wasser, Pumpen, Reparaturen',glyph:'≈'},
  {id:'limpieza',label:'Reinigung',short:'Reinigung',desc:'Wohnung, Community, Übergabe',glyph:'✦'},
  {id:'cerrajeria',label:'Schlüssel',short:'Schlüssel',desc:'Türöffnung, Schloss, Sicherheit',glyph:'⌑'},
  {id:'mantenimiento',label:'Objektservice',short:'Objektservice',desc:'Ferienimmobilie, Kontrolle, Betreuung',glyph:'⌂'}
];

const fallbackProviders=[
  {id:'decor-aroca',name:'Decor Aroca',cats:['reformas','fontaneria','electricidad','clima'],area:'La Manga · km 13,5',phone:'+34 628 004 004',languages:['ES'],summary:'Reformen, Malerarbeiten, Sanitär, Elektro, Klima und Tischlerarbeiten.',verification:'source_checked',website:'https://www.decoraroca.com/',sourceUrl:'https://www.decoraroca.com/'},
  {id:'manga-decor',name:'Reformas Manga Decor',cats:['reformas','fontaneria','electricidad','clima'],area:'La Manga del Mar Menor',phone:null,languages:['ES'],summary:'Komplettreformen, Maurer-, Sanitär-, Elektro-, Maler-, Klima- und Schreinerarbeiten.',verification:'source_checked',website:'https://reformasmangadecor.com/',sourceUrl:'https://reformasmangadecor.com/'},
  {id:'piscinas-la-manga',name:'Piscinas La Manga',cats:['piscina'],area:'Gran Vía de La Manga',phone:'+34 722 34 43 67',languages:['ES'],summary:'Poolpflege, Reparaturen, Filtration, Wasserbehandlung, Pumpen und Motoren.',verification:'source_checked',website:'https://www.piscinaslamanga.com/',sourceUrl:'https://www.piscinaslamanga.com/'},
  {id:'lomar',name:'LOMAR',cats:['reformas'],area:'La Manga · Cartagena · San Javier',phone:'+34 650 70 92 70',languages:['ES'],summary:'Badmodernisierung, Duschabtrennungen, Möbel, Armaturen und Montage.',verification:'source_checked',website:'https://lomar.es/',sourceUrl:'https://lomar.es/'},
  {id:'mar-menor-management',name:'Mar Menor Management',cats:['mantenimiento'],area:'La Manga Club / Cartagena',phone:'+34 968 17 56 12',languages:['EN'],summary:'Property Management und Objektwartung im Raum La Manga Club.',verification:'source_checked',website:'https://marmenormanagement.com/',sourceUrl:'https://marmenormanagement.com/'},
  {id:'kaiser-clima',name:'Kaiser Clima',cats:['clima'],area:'La Manga · Cartagena · San Javier',phone:'+34 649 990 443',languages:['ES'],summary:'Installation, Reparatur und Wartung von Klimaanlagen; Servicegebiet umfasst ausdrücklich La Manga.',verification:'source_checked',website:'https://www.kaiserclima.com/',sourceUrl:'https://www.kaiserclima.com/'},
  {id:'fontaneria-lopez-espin',name:'Fontanería López Espín',cats:['fontaneria','clima'],area:'La Manga · Cartagena · San Javier',phone:'+34 629 169 895',languages:['ES'],summary:'Sanitärinstallationen und Reparaturen sowie Heizungs- und Klimasysteme in der Region Murcia.',verification:'source_checked',website:'https://lopezespin.es/',sourceUrl:'https://lopezespin.es/'},
  {id:'cerrajeros-la-manga',name:'Cerrajeros La Manga',cats:['cerrajeria'],area:'La Manga del Mar Menor',phone:'+34 688 911 157',languages:['ES'],summary:'Türöffnungen, Schlösser, Schließzylinder und automatische Türen; Website nennt La Manga als Hauptgebiet.',verification:'source_checked',website:'https://cerrajeroslamanga.com/',sourceUrl:'https://cerrajeroslamanga.com/'},
  {id:'clinstar-services',name:'Clinstar Services',cats:['limpieza','reformas'],area:'La Manga · km 14',phone:'+34 630 549 303',languages:['ES'],summary:'Reinigung von Wohnungen und Eigentümergemeinschaften sowie Renovierung von Apartments.',verification:'source_checked',website:'https://www.clinstarservices.es/',sourceUrl:'https://www.clinstarservices.es/'},
  {id:'servinmosol',name:'Servinmosol',cats:['limpieza','mantenimiento','reformas','piscina'],area:'La Manga del Mar Menor',phone:'+34 968 184 734',languages:['ES'],summary:'Reinigung, Objektservice, Reformen und technischer Poolservice mit ausgewiesener La-Manga-Abdeckung.',verification:'source_checked',website:'https://www.servinmosol.com/',sourceUrl:'https://www.servinmosol.com/zona/servicio-de-limpieza-la-manga-del-mar-menor/'}
];

const icons={
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"/></svg>',
  compass:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6z"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>',
  bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  wrench:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4l-3 3-3-3 3-3Z"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 18 6-6-6-6"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 18-6-6 6-6"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9Z"/></svg>',
  globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
  camera:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h4l2-2h4l2 2h4v12H4z"/><circle cx="12" cy="13" r="3"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m5 12 4 4L19 6"/></svg>'
};

const $=s=>document.querySelector(s);
const esc=(s='')=>String(s).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
const dateDE=v=>{try{return new Intl.DateTimeFormat('de-DE',{day:'2-digit',month:'2-digit',year:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(v))}catch{return ''}};

function blankRequest(){return {step:1,category:null,urgency:'soon',location:'La Manga del Mar Menor',language:'DE',description:'',latitude:null,longitude:null,locationAccuracy:null,locationSource:'manual',municipality:null,municipalityCode:null,locality:null,zoneSource:null,zoneVerifiedAt:null}}
function loadDraft(){try{return {...blankRequest(),...JSON.parse(localStorage.getItem('hoyworks:request-draft')||'null')}}catch{return blankRequest()}}
function saveDraft(){const x={...state.request};delete x.step;localStorage.setItem('hoyworks:request-draft',JSON.stringify(x))}
function clearDraft(){localStorage.removeItem('hoyworks:request-draft')}

const PROVIDER_DRAFT_KEY='hoyworks:provider-onboarding-v2';
function blankProviderDraft(){return {step:1,provider_id:null,business_name:'',contact_name:'',role_title:'',business_email:'',authorized_attested:false,phone:'',website_url:'',coverage_text:'',service_ids:[],languages:['ES'],notes:''}}
function loadProviderDraft(){try{return {...blankProviderDraft(),...JSON.parse(localStorage.getItem(PROVIDER_DRAFT_KEY)||'null')}}catch{return blankProviderDraft()}}
function saveProviderDraft(){localStorage.setItem(PROVIDER_DRAFT_KEY,JSON.stringify(state.providerDraft))}
function clearProviderDraft(){localStorage.removeItem(PROVIDER_DRAFT_KEY)}

const state={
  view:'home',providers:[...fallbackProviders],query:'',filter:'all',backend:'connecting',user:null,
  favorites:new Set(JSON.parse(localStorage.getItem('hoyworks:favs')||'[]')),
  request:loadDraft(),requestPhotos:[],myRequests:[],myMatches:[],lastLiveRequest:null,
  providerContext:null,providerBusy:false,locationBusy:false,providerDraft:loadProviderDraft()
};

