(function(){
  const KEY='hoyworks:v1.1:requests';
  const STATUS={open:'Offen',accepted:'Angenommen',question:'Rückfrage',quoted:'Angebot gesendet',scheduled:'Termin vereinbart',done:'Erledigt'};

  function read(){
    try{return JSON.parse(localStorage.getItem(KEY)||'[]');}catch{return [];}
  }
  function write(rows){localStorage.setItem(KEY,JSON.stringify(rows));return rows;}
  function id(){return 'HW-'+new Date().toISOString().slice(2,10).replaceAll('-','')+'-'+Math.random().toString(36).slice(2,6).toUpperCase();}
  function normalize(payload){
    const now=new Date().toISOString();
    return {
      id:id(),created_at:now,updated_at:now,status:'open',assigned_provider_id:null,
      category:payload.category||null,urgency:payload.urgency||'soon',location:payload.location||'',zone:payload.zone||'auto',
      language:payload.language||'DE',description:payload.description||'',photo_count:Array.isArray(payload.photos)?payload.photos.length:0,
      source:'consumer_v1_1',events:[{at:now,type:'created',label:'Anfrage erstellt'}]
    };
  }
  function create(payload){const rows=read();const row=normalize(payload);rows.unshift(row);write(rows);return row;}
  function list(){return read().sort((a,b)=>String(b.updated_at).localeCompare(String(a.updated_at)));}
  function get(requestId){return read().find(r=>r.id===requestId)||null;}
  function update(requestId,patch,eventLabel){
    const rows=read();const i=rows.findIndex(r=>r.id===requestId);if(i<0)return null;
    const now=new Date().toISOString();rows[i]={...rows[i],...patch,updated_at:now};
    rows[i].events=[...(rows[i].events||[]),{at:now,type:patch.status||'updated',label:eventLabel||'Anfrage aktualisiert'}];
    write(rows);return rows[i];
  }
  function accept(requestId,providerId='demo-provider'){
    return update(requestId,{status:'accepted',assigned_provider_id:providerId},'Vom Betrieb angenommen');
  }
  function setStatus(requestId,status){
    if(!STATUS[status])return null;return update(requestId,{status},STATUS[status]);
  }
  function seed(){
    const rows=read();if(rows.length)return rows;
    const samples=[
      {category:'clima',urgency:'today',location:'La Manga del Mar Menor · km 9',zone:'auto',language:'DE',description:'Klimaanlage läuft, kühlt aber kaum. Bitte möglichst heute prüfen.',photos:[]},
      {category:'fontaneria',urgency:'soon',location:'Cabo de Palos',zone:'auto',language:'EN',description:'Slow leak below kitchen sink. Access possible in the afternoon.',photos:[]},
      {category:'mantenimiento',urgency:'plan',location:'La Manga · Ferienwohnung',zone:'auto',language:'ES',description:'Revisión del apartamento y entrega de llaves antes de la próxima llegada.',photos:[]}
    ];
    write(samples.map(normalize));return read();
  }
  window.HOYWorksStore={create,list,get,update,accept,setStatus,seed,statusLabels:STATUS};
})();
