const contentEsc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const contentSafeUrl=value=>{try{const raw=String(value||'').trim();if(!raw)return'';const u=new URL(raw,location.href);return /^https?:$/.test(u.protocol)?u.href:''}catch{return''}};
const contentSafeEmail=value=>{const email=String(value||'').trim();return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?email:''};
const asArray=value=>Array.isArray(value)?value:(value==null||value===''?[]:[value]);
const titleCase=s=>String(s||'').replace(/[-_]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase());

const PEOPLE_GROUPS=[
  ['leadership','Principal Investigator / Leadership'],
  ['faculty','Faculty / Researchers'],
  ['students','Current Students'],
  ['collaborators','Collaborators'],
  ['alumni','Alumni']
];
function peopleGroupKey(value){
  const s=String(value||'').toLowerCase();
  if(/principal|pi|lead/.test(s))return'leadership';
  if(/faculty|researcher|postdoc/.test(s))return'faculty';
  if(/student|undergrad|graduate|senior design/.test(s))return'students';
  if(/collaborat|partner/.test(s))return'collaborators';
  if(/alumn/.test(s))return'alumni';
  return'faculty';
}
function profileLinks(p){
  const links=[];
  const email=contentSafeEmail(p.email);
  if(email)links.push(`<a href="mailto:${contentEsc(email)}">Email</a>`);
  [['Scholar',p.scholar],['ORCID',p.orcid],['Personal page',p.personalPage]].forEach(([label,value])=>{
    const url=contentSafeUrl(value);if(url)links.push(`<a href="${contentEsc(url)}" target="_blank" rel="noopener">${label} ↗</a>`);
  });
  return links.length?`<div class="profile-links">${links.join('')}</div>`:'';
}
function recommendationControl(p){
  const rec=p.recommendation||{};
  const url=contentSafeUrl(typeof rec==='string'?rec:rec.url);
  if(!url)return'';
  const label=contentEsc((typeof rec==='object'&&rec.label)||'Recommendation');
  return `<a class="profile-recommendation" href="${contentEsc(url)}" target="_blank" rel="noopener" aria-label="${label} document for ${contentEsc(p.name)}"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 12h6M9 16h6"/></svg></span>${label}</a>`;
}
function personCard(p){
  const portrait=contentSafeUrl(p.portrait);
  const interests=asArray(p.researchInterests||p.interests).filter(Boolean);
  return `<article class="card profile-card">
    ${portrait?`<figure class="profile-portrait"><img src="${contentEsc(portrait)}" alt="${contentEsc(p.portraitAlt||p.name||'SIGNAL Lab member')}" loading="lazy"></figure>`:''}
    <div class="profile-card-body">
      <h3>${contentEsc(p.name)}</h3>
      ${p.role?`<p class="profile-role">${contentEsc(p.role)}</p>`:''}
      ${p.bio?`<p class="profile-bio">${contentEsc(p.bio)}</p>`:''}
      ${interests.length?`<div class="profile-interests" aria-label="Research interests">${interests.map(x=>`<span class="chip">${contentEsc(x)}</span>`).join('')}</div>`:''}
      ${profileLinks(p)}
      ${peopleGroupKey(p.group||p.category||p.role)==='alumni'?recommendationControl(p):''}
    </div>
  </article>`;
}
function publicationBlockedStatus(status){
  const s=String(status||'').trim().toLowerCase();
  if(!s)return false;
  return s==='pending'||
    /\b(draft|example|unverified)\b/.test(s)||
    /\bpending\s+(verification|review|confirmation)\b/.test(s)||
    /\b(verification|review|confirmation)\s+(pending|required)\b/.test(s)||
    /\b(needs?|requires?|awaiting)\s+(?:owner\s+)?(verification|review|confirmation)\b/.test(s)||
    /\bowner\b.*\b(review|input|required|confirmation)\b/.test(s)||
    /\bverify\s+before\b/.test(s);
}
function datasetPending(status){return publicationBlockedStatus(status)}
function renderPeople(records,status){
  const host=document.querySelector('#people-list');
  if(datasetPending(status)||!records.length){host.innerHTML='<div class="notice info">The research-community roster is currently being finalized. Profiles will appear here once confirmed.</div>';return;}
  const groups={};PEOPLE_GROUPS.forEach(([k])=>groups[k]=[]);
  records.forEach(p=>{if(p&&p.name&&p.published!==false)groups[peopleGroupKey(p.group||p.category||p.role)].push(p)});
  const sections=PEOPLE_GROUPS.filter(([k])=>groups[k].length).map(([k,label])=>`<section class="people-group"><div class="section-head compact-head"><div class="eyebrow">${contentEsc(label)}</div><h2>${contentEsc(label)}</h2></div><div class="profile-grid">${groups[k].map(personCard).join('')}</div></section>`).join('');
  host.innerHTML=sections||'<div class="notice info">The research-community roster is currently being finalized. Profiles will appear here once confirmed.</div>';
}

function equipmentPublishable(x){return !!(x&&x.name)&&!publicationBlockedStatus(x.status)&&x.published!==false}
function specHtml(spec){
  if(Array.isArray(spec))return spec.length?`<ul class="equipment-specs">${spec.map(x=>`<li>${contentEsc(x)}</li>`).join('')}</ul>`:'';
  if(spec&&typeof spec==='object')return `<dl class="equipment-specs equipment-specs-dl">${Object.entries(spec).map(([k,v])=>`<div><dt>${contentEsc(titleCase(k))}</dt><dd>${contentEsc(v)}</dd></div>`).join('')}</dl>`;
  return spec?`<p class="equipment-specs">${contentEsc(spec)}</p>`:'';
}
function equipmentCard(x){
  const projects=asArray(x.supportedProjects||x.projects).filter(Boolean);
  const details=[
    ['Manufacturer',x.manufacturer],['Model',x.model],['Quantity',x.quantity],['Location',x.location],
    ['Availability / access',x.availability||x.accessPolicy],['Responsible contact',x.responsibleContact||x.contact],['Last verified',x.lastVerified||x.lastVerificationDate]
  ].filter(([,v])=>v!==undefined&&v!==null&&String(v).trim()!=='');
  return `<article class="card equipment-card">
    <div class="equipment-card-head">${x.status?`<span class="badge">${contentEsc(x.status)}</span>`:''}${x.category?`<span class="equipment-category">${contentEsc(x.category)}</span>`:''}</div>
    <h3>${contentEsc(x.name)}</h3>
    ${details.length?`<dl class="equipment-details">${details.map(([k,v])=>`<div><dt>${contentEsc(k)}</dt><dd>${contentEsc(v)}</dd></div>`).join('')}</dl>`:''}
    ${specHtml(x.specifications||x.specs)}
    ${projects.length?`<div class="equipment-projects"><strong>Supported projects</strong><div class="chip-row">${projects.map(v=>`<span class="chip">${contentEsc(v)}</span>`).join('')}</div></div>`:''}
  </article>`;
}
function renderEquipment(records,status){
  const host=document.querySelector('#equipment-list');
  const safe=datasetPending(status)?[]:records.filter(equipmentPublishable);
  if(!safe.length){host.innerHTML='<div class="notice info">The equipment inventory is currently being verified and will be published once confirmed.</div>';return;}
  const categories=[...new Set(safe.map(x=>String(x.category||'Other').trim()||'Other'))];
  host.innerHTML=categories.map(category=>`<section class="equipment-group"><div class="section-head compact-head"><div class="eyebrow">Laboratory infrastructure</div><h2>${contentEsc(category)}</h2></div><div class="equipment-grid">${safe.filter(x=>(String(x.category||'Other').trim()||'Other')===category).map(equipmentCard).join('')}</div></section>`).join('');
}

document.addEventListener('signal:ready',async()=>{
  const page=document.body.dataset.page;
  if(page==='people'){
    const d=await(await fetch('assets/data/people.json')).json();
    renderPeople(Array.isArray(d.records)?d.records:[],d.status);
  }
  if(page==='equipment'){
    const d=await(await fetch('assets/data/equipment.json')).json();
    renderEquipment(Array.isArray(d.records)?d.records:[],d.status);
  }
});
