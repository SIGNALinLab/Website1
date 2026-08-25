const SIGNAL={config:null};
const ICONS={medical:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 3h8v5h5v8h-5v5H8v-5H3V8h5z"/></svg>',shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l7 3v5c0 4.7-2.7 8-7 10-4.3-2-7-5.3-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>',education:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-5 9 5-9 5z"/><path d="M7 12v5c3 2 7 2 10 0v-5"/></svg>',energy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L5 14h6l-1 8 9-13h-6z"/></svg>',play:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5z"/></svg>',ai:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/></svg>'};
function icon(n){return ICONS[n]||ICONS.ai}
function escGlobal(s){return String(s??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]))}
async function loadConfig(){try{SIGNAL.config=await(await fetch('assets/data/config.json')).json()}catch(e){SIGNAL.config={siteName:'SIGNAL Lab',expandedName:'Signal Intelligence for Global Automation and Learning Laboratory',slogan:'We Decode Signals to Empower the Future'}}return SIGNAL.config}
function validGoatCounterCode(value){return /^[a-z0-9][a-z0-9-]*$/i.test(String(value||''))}
function goatCounterPath(){return window.location.pathname||'/'}
async function loadVisitorCount(code){
  const el=document.querySelector('#visitor-counter');
  if(!el)return;
  try{
    const path=goatCounterPath();
    const url=`https://${code}.goatcounter.com/counter/${encodeURIComponent(path)}.json`;
    const r=await fetch(url,{mode:'cors',credentials:'omit'});
    if(!r.ok)throw new Error('Visitor count unavailable');
    const data=await r.json();
    if(!data||typeof data.count!=='string'||!data.count.trim())throw new Error('Visitor count unavailable');
    el.textContent=`Visits: ${data.count.trim()}`;
    el.hidden=false;
  }catch(e){el.hidden=true}
}
function initGoatCounter(c){
  const code=String(c.goatCounterCode||'').trim();
  if(!validGoatCounterCode(code))return;
  if(c.visitorCounterEnabled)loadVisitorCount(code);
  if(!c.analyticsEnabled||document.querySelector('#goatcounter-script'))return;
  const script=document.createElement('script');
  script.id='goatcounter-script';
  script.async=true;
  script.src='https://gc.zgo.at/count.js';
  script.setAttribute('data-goatcounter',`https://${code}.goatcounter.com/count`);
  script.setAttribute('data-goatcounter-settings',JSON.stringify({path:goatCounterPath()}));
  document.head.appendChild(script);
}

function renderHeader(){
  const page=document.body.dataset.page||'';
  const currentProjects=['projects','gpo','sdps'].includes(page);
  const currentAdmissions=['admissions','apply'].includes(page);
  document.querySelector('#site-header').innerHTML=`<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="header-signal" aria-hidden="true"></div><div class="container nav-wrap"><a class="brand" href="index.html"><span class="brand-symbol"><img src="assets/brand/symbol.svg" alt=""></span><span class="brand-copy"><strong>SIGNAL Lab</strong><small>Qassim University · College of Engineering</small></span></a><button class="nav-toggle" aria-expanded="false" aria-controls="site-nav"><span class="nav-toggle-lines" aria-hidden="true"></span><span class="sr-only">Menu</span></button><nav id="site-nav" class="site-nav" aria-label="Primary"><ul><li><a href="index.html" ${page==='home'?'aria-current="page"':''}>Home</a></li><li><a href="projects.html" ${currentProjects?'aria-current="page"':''}>Research &amp; Projects</a></li><li><a href="publications.html" ${page==='publications'?'aria-current="page"':''}>Publications</a></li><li><a href="people.html" ${page==='people'?'aria-current="page"':''}>People</a></li><li><a href="news.html" ${page==='news'?'aria-current="page"':''}>News</a></li><li><a href="seminars.html" ${page==='seminars'?'aria-current="page"':''}>Seminars &amp; Events</a></li><li><a href="courses.html" ${page==='courses'?'aria-current="page"':''}>Courses</a></li><li><a href="equipment.html" ${page==='equipment'?'aria-current="page"':''}>Equipment</a></li><li><a href="admissions.html" ${currentAdmissions?'aria-current="page"':''}>Admissions &amp; Aid</a></li><li><a href="contact.html" ${page==='contact'?'aria-current="page"':''}>Contact</a></li></ul></nav></div></header>`;
  const b=document.querySelector('.nav-toggle'),n=document.querySelector('#site-nav');
  b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',String(o))});
}

function renderFooter(c){
  const counter=c.visitorCounterEnabled&&validGoatCounterCode(c.goatCounterCode)?'<div id="visitor-counter" class="counter" aria-label="Visitor count" aria-live="polite" hidden></div>':'';
  const siteName=escGlobal(c.siteName||'SIGNAL Lab'),expandedName=escGlobal(c.expandedName||''),slogan=escGlobal(c.slogan||''),affiliation=escGlobal(c.affiliation||'Qassim University');
  document.querySelector('#site-footer').innerHTML=`<footer class="site-footer"><div class="footer-signal" aria-hidden="true"></div><div class="container"><div class="footer-grid"><div class="footer-intro"><div class="footer-logo"><span class="footer-symbol"><img src="assets/brand/symbol.svg" alt=""></span><div><strong>${siteName}</strong><div>${expandedName}</div></div></div><p class="footer-slogan">${slogan}</p>${counter}</div><div class="footer-links"><strong>Research</strong><p><a href="publications.html">Publications</a><br><a href="projects.html">Research &amp; Projects</a><br><a href="gpo-projects.html">GPO Projects</a><br><a href="sdps.html">Senior Design Projects</a></p></div><div class="footer-links"><strong>Lab</strong><p><a href="people.html">People</a><br><a href="admissions.html">Admissions &amp; Aid</a><br><a href="equipment.html">Equipment</a><br><a href="contact.html">Contact</a><br><a href="verify.html">Verify a recommendation</a></p></div></div><div class="fine"><span>© ${new Date().getFullYear()} SIGNAL Lab.</span><span>${affiliation}</span></div></div></footer>`;
}

const HERO_ART={
  home:`<svg viewBox="0 0 520 330" role="presentation"><g class="art-grid" opacity=".28"><path d="M45 62H475M45 122H475M45 182H475M45 242H475M105 34V292M185 34V292M265 34V292M345 34V292M425 34V292"/></g><path class="art-trace trace-slow" d="M32 203C80 203 87 118 132 118s52 116 100 116 56-152 105-152 55 118 92 118c30 0 43-42 65-42"/><path class="art-trace trace-fast" d="M36 234c48 0 70-41 104-41 43 0 56 56 94 56 49 0 64-92 112-92 38 0 52 55 112 55" opacity=".42"/><g class="nodes"><circle class="pulse" cx="132" cy="118" r="8"/><circle cx="232" cy="234" r="6"/><circle class="pulse delay" cx="337" cy="82" r="9"/><circle cx="429" cy="200" r="6"/></g><g class="orbit float"><ellipse cx="350" cy="164" rx="112" ry="112"/><ellipse cx="350" cy="164" rx="72" ry="72"/><circle cx="444" cy="105" r="7" class="accent-dot"/></g></svg>`,
  publications:`<svg viewBox="0 0 430 300" role="presentation"><g class="paper paper-back float"><rect x="104" y="58" width="210" height="168" rx="18"/><path d="M135 101h109M135 126h143M135 151h126M135 176h84"/></g><g class="paper paper-front"><rect x="72" y="78" width="218" height="170" rx="18"/><path d="M103 115h94M103 142h147M103 169h126M103 196h146"/><path class="accent-stroke" d="M231 78v44h59"/></g><g class="citation float-reverse"><circle cx="334" cy="196" r="43"/><path d="M318 187h13v15h-13zM339 187h13v15h-13z"/><path d="M321 202c0 12-4 19-12 24M342 202c0 12-4 19-12 24"/></g></svg>`,
  projects:`<svg viewBox="0 0 440 300" role="presentation"><path class="network-line" d="M62 188L156 93l107 61 112-76M62 188l108 44 93-78 112 45"/><g class="project-node"><rect x="40" y="164" width="46" height="46" rx="12"/><rect x="135" y="70" width="46" height="46" rx="12"/><rect x="241" y="132" width="46" height="46" rx="12"/><rect x="352" y="56" width="46" height="46" rx="12"/><rect x="148" y="210" width="46" height="46" rx="12"/><rect x="352" y="177" width="46" height="46" rx="12"/></g><circle class="pulse" cx="263" cy="154" r="15"/><path class="art-trace trace-fast" d="M48 264c60-29 94-11 132-46 39-36 59-78 103-78 48 0 57 36 111 11"/></svg>`,
  gpo:`<svg viewBox="0 0 430 300" role="presentation"><g class="radar float-reverse"><circle cx="220" cy="154" r="104"/><circle cx="220" cy="154" r="70"/><circle cx="220" cy="154" r="36"/><path d="M220 50v208M116 154h208"/><path class="radar-sweep" d="M220 154L301 87A104 104 0 0 1 323 154Z"/></g><path class="track trace-slow" d="M82 228c46-21 70-61 105-70 40-11 69 21 101 5 29-14 35-57 67-81"/><circle class="pulse" cx="187" cy="158" r="8"/><circle cx="355" cy="82" r="8" class="accent-dot"/></svg>`,
  sdps:`<svg viewBox="0 0 430 300" role="presentation"><g class="blueprint"><path d="M69 62h292v176H69z"/><path d="M104 101h64v48h-64zM249 94h72v61h-72zM153 185h110v28H153z"/><path class="circuit" d="M168 125h50v-55M218 125h31M285 155v30h-22M153 199H95v-34M321 124h33"/></g><g class="nodes"><circle cx="218" cy="70" r="7"/><circle class="pulse" cx="95" cy="165" r="7"/><circle cx="354" cy="124" r="7"/><circle class="pulse delay" cx="263" cy="185" r="7"/></g><path class="art-trace trace-fast" d="M89 256h68l23-18 33 32 31-23 28 9h72"/></svg>`,
  people:`<svg viewBox="0 0 430 300" role="presentation"><g class="people-lines"><path d="M215 88L113 173M215 88l102 85M113 173l102 55 102-55M215 228V88"/></g><g class="person person-main"><circle cx="215" cy="72" r="28"/><path d="M170 132c12-34 77-34 90 0"/></g><g class="person float"><circle cx="111" cy="158" r="23"/><path d="M76 208c10-28 60-28 70 0"/></g><g class="person float-reverse"><circle cx="319" cy="158" r="23"/><path d="M284 208c10-28 60-28 70 0"/></g><g class="nodes"><circle class="pulse" cx="215" cy="228" r="9"/></g></svg>`,
  admissions:`<svg viewBox="0 0 430 300" role="presentation"><path class="pathway" d="M62 226h77v-48h75v-50h75V80h76"/><g class="step-node"><circle cx="139" cy="178" r="10"/><circle cx="214" cy="128" r="10"/><circle cx="289" cy="80" r="10"/></g><path class="arrow float" d="M341 58l39 22-39 22M379 80h-70"/><path class="art-trace trace-slow" d="M54 248c50 10 83-12 115-30 40-23 72-23 112-13 37 9 65 4 97-21"/></svg>`,
  apply:`<svg viewBox="0 0 430 300" role="presentation"><g class="form-sheet"><rect x="91" y="48" width="226" height="210" rx="20"/><path d="M128 94h105M128 132h151M128 170h151M128 208h101"/><rect x="262" y="82" width="24" height="24" rx="6"/><rect x="262" y="120" width="24" height="24" rx="6"/><rect x="262" y="158" width="24" height="24" rx="6"/></g><path class="check accent-stroke" d="M267 131l7 7 18-22"/><path class="check accent-stroke" d="M267 169l7 7 18-22"/><circle class="pulse" cx="319" cy="224" r="22"/><path class="check light-check" d="M309 224l7 7 14-17"/></svg>`,
  equipment:`<svg viewBox="0 0 430 300" role="presentation"><g class="scope"><rect x="61" y="62" width="310" height="178" rx="22"/><rect x="91" y="91" width="212" height="118" rx="12"/><path class="scope-grid" d="M91 120h212M91 150h212M91 180h212M126 91v118M161 91v118M196 91v118M231 91v118M266 91v118"/><path class="art-trace trace-fast" d="M96 162h28l17-36 24 65 27-55 26 39 26-73 26 60h28"/><circle cx="336" cy="112" r="12"/><circle cx="336" cy="154" r="12"/><circle class="pulse" cx="336" cy="196" r="12"/></g></svg>`,
  news:`<svg viewBox="0 0 430 300" role="presentation"><g class="paper paper-front"><rect x="72" y="62" width="278" height="186" rx="20"/><path d="M108 103h94M108 132h202M108 161h202M108 190h122"/><rect x="252" y="96" width="58" height="58" rx="12"/></g><path class="art-trace trace-fast" d="M92 226c48-25 71 10 112-18 36-25 45-68 89-68 28 0 45 18 65 4"/><circle class="pulse" cx="293" cy="125" r="9"/></svg>`,
  seminars:`<svg viewBox="0 0 430 300" role="presentation"><g class="signal-waves float-reverse"><path d="M247 119c33 13 50 36 51 69M257 85c52 19 79 56 80 103M270 53c70 25 105 74 107 135"/></g><path class="art-trace trace-slow" d="M63 190h45l22-54 31 106 33-85 31 33h45"/><g class="person person-main"><circle cx="135" cy="88" r="25"/><path d="M94 143c12-31 70-31 82 0"/></g><circle class="pulse" cx="247" cy="188" r="9"/></svg>`,
  courses:`<svg viewBox="0 0 430 300" role="presentation"><g class="paper paper-front"><rect x="81" y="55" width="244" height="198" rx="20"/><path d="M118 99h121M118 132h168M118 165h168M118 198h115"/></g><path class="circuit" d="M252 99h48v-31M286 165h50v37h-31"/><g class="nodes"><circle class="pulse" cx="300" cy="68" r="8"/><circle cx="336" cy="202" r="8"/></g><path class="accent-stroke" d="M119 219l15 15 28-36"/></svg>`,
  contact:`<svg viewBox="0 0 430 300" role="presentation"><g class="envelope"><rect x="76" y="91" width="216" height="142" rx="18"/><path d="M89 110l95 75 95-75"/><path d="M89 218l72-61M279 218l-71-61"/></g><g class="signal-waves float-reverse"><path d="M302 128c28 12 42 31 43 60M309 96c45 18 69 50 70 92M317 67c62 23 94 67 96 121"/><circle class="pulse" cx="303" cy="188" r="8"/></g></svg>`,
  verify:`<svg viewBox="0 0 430 300" role="presentation"><g class="verify-doc"><rect x="86" y="52" width="216" height="204" rx="20"/><path d="M120 98h103M120 132h143M120 166h105"/><path class="scan" d="M106 74h31M106 74v31M282 74h-31M282 74v31M106 234h31M106 234v-31M282 234h-31M282 234v-31"/></g><g class="seal float"><circle cx="312" cy="202" r="49"/><path class="check accent-stroke" d="M290 202l15 15 30-38"/></g></svg>`,
  '404':`<svg viewBox="0 0 430 300" role="presentation"><path class="art-trace" d="M49 160h67l31-61 45 125 39-79"/><path class="art-trace broken" d="M280 160h102"/><circle cx="253" cy="160" r="9" class="accent-dot pulse"/><circle cx="280" cy="160" r="9" class="accent-dot"/><path class="disconnect" d="M251 126l33 68M284 126l-33 68"/></svg>`
};

function heroKind(page){return HERO_ART[page]?page:(page==='admissions'?'admissions':'home')}
function enhanceHero(){
  const hero=document.querySelector('.hero,.page-hero');
  if(!hero||hero.dataset.enhanced==='true')return;
  hero.dataset.enhanced='true';
  const container=hero.querySelector(':scope > .container');
  if(!container)return;
  const copy=document.createElement('div'); copy.className='hero-copy';
  [...container.childNodes].forEach(node=>copy.appendChild(node));
  const page=document.body.dataset.page||'home';
  const art=document.createElement('div'); art.className=`hero-art hero-art-${heroKind(page)}`; art.setAttribute('aria-hidden','true'); art.innerHTML=HERO_ART[heroKind(page)]||HERO_ART.home;
  container.append(copy,art);
}

function applyConfig(c){
  document.querySelectorAll('[data-config]').forEach(el=>{const k=el.dataset.config;if(c[k])el.textContent=c[k]});
  document.querySelectorAll('[data-email-link]').forEach(el=>{if(c.email){el.href='mailto:'+c.email;el.textContent=c.email}});
  document.querySelectorAll('[data-apply-link]').forEach(el=>{
    if(String(c.applyMode||'native').toLowerCase()==='external'&&/^https?:\/\//i.test(String(c.googleFormUrl||''))){
      el.href=c.googleFormUrl;el.target='_blank';el.rel='noopener';
    }else{el.href='apply.html';el.removeAttribute('target');el.removeAttribute('rel')}
  });
  document.querySelectorAll('[data-map-embed]').forEach(el=>{
    if(c.location){el.src='https://www.google.com/maps?q='+encodeURIComponent(c.location)+'&output=embed'}
  });
  if(/^https?:\/\//i.test(String(c.canonicalBaseUrl||''))){
    const base=String(c.canonicalBaseUrl).replace(/\/*$/,'/')
    const file=(location.pathname.split('/').filter(Boolean).pop()||'index.html');
    const canonical=new URL(file,base).href;
    let link=document.querySelector('link[rel="canonical"]');
    if(!link){link=document.createElement('link');link.rel='canonical';document.head.appendChild(link)}
    link.href=canonical;
    let ogUrl=document.querySelector('meta[property="og:url"]');
    if(!ogUrl){ogUrl=document.createElement('meta');ogUrl.setAttribute('property','og:url');document.head.appendChild(ogUrl)}
    ogUrl.content=canonical;
    const ogImage=document.querySelector('meta[property="og:image"]');
    if(ogImage&&ogImage.content&&!/^https?:\/\//i.test(ogImage.content)){ogImage.content=new URL(ogImage.content,base).href}
    if(ogImage&&ogImage.content){let twImage=document.querySelector('meta[name="twitter:image"]');if(!twImage){twImage=document.createElement('meta');twImage.name='twitter:image';document.head.appendChild(twImage)}twImage.content=ogImage.content}
  }
}

document.addEventListener('DOMContentLoaded',async()=>{const c=await loadConfig();renderHeader();renderFooter(c);applyConfig(c);enhanceHero();initGoatCounter(c);document.dispatchEvent(new CustomEvent('signal:ready',{detail:c}))});
