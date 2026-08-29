function escHtml(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function safeHttpUrl(value){try{const u=new URL(value,location.href);return /^https?:$/.test(u.protocol)?u.href:''}catch{return''}}
function prepareUnavailableForm(form,kind,c){
  if(kind==='application'){
    const mode=String(c.applyMode||'native').toLowerCase();
    const url=safeHttpUrl(c.googleFormUrl||'');
    if(mode==='external'){
      form.setAttribute('aria-label','Application options');
      form.classList.add('form-fallback');
      form.innerHTML=url?`<h2>Application form</h2><p class="muted">Online applications are handled through the lab’s external application form.</p><a class="btn btn-primary" href="${escHtml(url)}" target="_blank" rel="noopener">Open application form ↗</a>`:`<h2>Application enquiries</h2><p class="muted">The external application form is currently unavailable. Please contact the lab using the email on the Contact page.</p><a class="btn btn-outline" href="contact.html">Contact SIGNAL Lab</a>`;
      return true;
    }
    if(c.appsScriptEndpoint)return false;
    form.setAttribute('aria-label','Application options');
    form.classList.add('form-fallback');
    form.innerHTML=`<h2>Application enquiries</h2><p class="muted">Native online application submission is currently unavailable. Please contact the lab using the email on the Contact page.</p><a class="btn btn-outline" href="contact.html">Contact SIGNAL Lab</a>`;
    return true;
  }
  if(c.appsScriptEndpoint)return false;
  if(kind==='contact'){
    const email=String(c.email||'').trim();
    form.setAttribute('aria-label','Contact options');
    form.classList.add('form-fallback');
    form.innerHTML=`<h2>Email enquiries</h2><p class="muted">Online contact-form submission is currently unavailable.${email?` Please email <a href="mailto:${escHtml(email)}">${escHtml(email)}</a>.`:' Please use the laboratory contact details on this page.'}</p>`;
    return true;
  }
  return false;
}
async function submitSignalForm(form,kind){const c=SIGNAL.config||{},s=form.querySelector('.form-status');if(!c.appsScriptEndpoint){if(s){s.textContent='Online submission through this page is currently unavailable. Please use the lab email shown on the Contact page.';s.className='form-status notice info'}return}const fd=new FormData(form),p={formType:kind};for(const[k,v]of fd.entries())p[k]=String(v).replace(/^[=+\-@]/,"' $&");try{const r=await fetch(c.appsScriptEndpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(p)}),o=await r.json();if(!o.ok)throw Error();form.reset();s.textContent='Submission received.';s.className='form-status notice';}catch(e){s.textContent='Submission could not be completed. Please contact the lab by email.';s.className='form-status notice danger'}}
document.addEventListener('signal:ready',()=>document.querySelectorAll('form[data-signal-form]').forEach(f=>{const kind=f.dataset.signalForm,c=SIGNAL.config||{};const status=f.querySelector('.form-status');if(status){status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true')}if(prepareUnavailableForm(f,kind,c))return;f.addEventListener('submit',e=>{e.preventDefault();submitSignalForm(f,kind)})}));
