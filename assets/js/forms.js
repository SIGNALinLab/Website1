const formEsc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const safeExternal=v=>{try{const u=new URL(String(v||''),location.href);return /^https?:$/.test(u.protocol)?u.href:''}catch{return''}};
function fallbackCard(card,html){card.classList.add('form-fallback');card.innerHTML=html}
async function submitSignalForm(form,c){
  const status=form.querySelector('[data-form-status]'),submit=form.querySelector('[type="submit"]');
  if(!c.appsScriptEndpoint){status.textContent='Submission is not configured. Please use the contact details on this site.';return}
  const fd=new FormData(form),payload={formType:form.dataset.signalForm};
  for(const [k,v] of fd.entries())payload[k]=String(v);
  submit.disabled=true;status.textContent='Submitting…';
  try{
    const r=await fetch(c.appsScriptEndpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
    const data=await r.json();
    if(!data.ok)throw Error(data.error||'Submission failed');
    form.reset();status.textContent='Thank you. Your submission has been received.';
  }catch(e){status.textContent='Submission could not be completed. Please try again later or contact the lab by email.'}
  finally{submit.disabled=false}
}
document.addEventListener('signal:ready',()=>{
  const c=SIGNAL.config||{};
  const appCard=document.querySelector('[data-application-card]');
  const contactCard=document.querySelector('[data-contact-card]');
  const external=safeExternal(c.googleFormUrl);
  if(appCard){
    if(c.applyMode==='external'&&external){
      fallbackCard(appCard,`<div class="fallback-icon" aria-hidden="true">↗</div><h2>Application form</h2><p>Applications are currently collected through the configured Google Form.</p><a class="btn btn-primary" href="${formEsc(external)}" target="_blank" rel="noopener">Open application form ↗</a>`);
    }else if(!c.appsScriptEndpoint){
      fallbackCard(appCard,`<div class="fallback-icon" aria-hidden="true">✉</div><h2>Application enquiries</h2><p>Native submission is not currently enabled. Please contact SIGNAL Lab directly at <a href="mailto:${formEsc(c.email||'')}">${formEsc(c.email||'the lab email')}</a>.</p>`);
    }
  }
  if(contactCard&&!c.appsScriptEndpoint){
    fallbackCard(contactCard,`<div class="fallback-icon" aria-hidden="true">✉</div><h2>Email enquiries</h2><p>The native contact form is not currently enabled. Please email <a href="mailto:${formEsc(c.email||'')}">${formEsc(c.email||'SIGNAL Lab')}</a>.</p>`);
  }
  document.querySelectorAll('form[data-signal-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();submitSignalForm(form,c)}));
});
