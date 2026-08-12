async function initCloud(){
  try{
    if(!window.HOYWorksBackend)throw new Error('Supabase client unavailable');
    const rows=await window.HOYWorksBackend.listProviders();if(rows.length)state.providers=rows.map(p=>({...p,cats:p.cats||[]}));
    const session=await window.HOYWorksBackend.getSession();state.user=session?.user||null;state.backend='online';
    if(state.user)await refreshMyArea();render();await resumeAfterAuth();
  }catch(err){console.warn(err);state.backend='error';state.providers=[...fallbackProviders];render()}
}

function navigate(v){state.view=v;render();$('#view')?.scrollTo({top:0,behavior:'instant'})}

