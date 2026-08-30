const contentEsc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const contentSafeUrl=value=>{try{const raw=String(value||'').trim();if(!raw)return'';const u=new URL(raw,location.href);return /^https?:$/.test(u.protocol)?u.href:''}catch{return''}};
const contentSafeEmail=value=>{const email=String(value||'').trim();return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?email:''};
const asArray=value=>Array.isArray(value)?value:(value==null||value===''?[]:[value]);
const titleCase=s=>String(s||'').replace(/[-_]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase());

// Legacy schema labels retained for compatibility: Principal Investigator / Leadership; Current Students; Collaborators; Alumni.
const PEOPLE_GROUPS=[
  ['faculty','Faculty','Lab leadership, faculty expertise, and research direction.'],
  ['graduate','Current Graduate Students','Current master’s students at SIGNAL Lab.'],
  ['undergraduate','Current Undergraduate Students','Current B.Sc. students completing senior design work at SIGNAL Lab.'],
  ['alumni','Alumni','SIGNAL Lab alumni. Recommendation downloads are placeholders until final approved files are linked.']
];
function peopleGroupKey(value){
  const s=String(value||'').toLowerCase();
  if(/alumn/.test(s))return'alumni';
  if(/undergrad|b\.s\. student|senior design/.test(s))return'undergraduate';
  if(/graduate|master|phd|student/.test(s))return'graduate';
  if(/principal|pi|lead|faculty|researcher|postdoc/.test(s))return'faculty';
  if(/collaborat|partner/.test(s))return'faculty';
  return'faculty';
}
function profileInitials(name){
  const bits=String(name||'').replace(/^(Dr\.|Eng\.)\s*/i,'').trim().split(/\s+/).filter(Boolean);
  return bits.slice(0,2).map(x=>x.charAt(0).toUpperCase()).join('')||'SL';
}
function safePortraitPosition(value){
  const v=String(value||'').trim();
  return /^(?:center|top|bottom|left|right|\d{1,3}%)(?:\s+(?:center|top|bottom|left|right|\d{1,3}%))?$/.test(v)?v:'center 20%';
}
function profileIcon(kind,group=''){
  const recommendationAsset=['graduate','undergraduate','alumni'].includes(group)?`assets/images/recommendation-icon-${group}.png`:'assets/images/recommendation-icon.png';
  const icons={
    email:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>',
    cv:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.25" fill="currentColor"/><path d="M12 1.75a10.25 10.25 0 0 1 0 20.5Z" fill="#fff" opacity=".30"/><text x="12" y="14.75" text-anchor="middle" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="8.2" font-weight="700" letter-spacing="-.35">CV</text></svg>',
    scholar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.92a1 1 0 0 0-.02-1.84l-8.57-3.9a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.84l8.58 3.9a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16c0 1.66 2.69 3 6 3s6-1.34 6-3v-3.5"/></svg>',
    link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></svg>',
    recommendation:`<img src="${recommendationAsset}" alt="" style="display:block;width:100%;height:100%;object-fit:contain;border-radius:50%">`
  };
  return `<span class="profile-action-icon" aria-hidden="true">${icons[kind]||icons.link}</span>`;
}
function profileLinks(p){
  const links=[];
  const scholar=contentSafeUrl(p.scholar);if(scholar)links.push(`<a class="profile-action profile-action--quiet" href="${contentEsc(scholar)}" target="_blank" rel="noopener">${profileIcon('scholar')}<span>Google Scholar</span></a>`);
  [['ORCID',p.orcid],['Personal page',p.personalPage]].forEach(([label,value])=>{const url=contentSafeUrl(value);if(url)links.push(`<a class="profile-action profile-action--quiet" href="${contentEsc(url)}" target="_blank" rel="noopener">${profileIcon('link')}<span>${contentEsc(label)}</span></a>`)});
  const project=contentSafeUrl(p.projectUrl);if(project)links.push(`<a class="profile-action profile-action--quiet" href="${contentEsc(project)}" target="_blank" rel="noopener">${profileIcon('link')}<span>Project</span></a>`);
  asArray(p.projects).forEach(item=>{
    const obj=typeof item==='string'?{label:'Project',url:item}:item||{};
    const url=contentSafeUrl(obj.url);if(url)links.push(`<a class="profile-action profile-action--quiet" href="${contentEsc(url)}" target="_blank" rel="noopener">${profileIcon('link')}<span>${contentEsc(obj.label||'Project')}</span></a>`);
  });
  return links.join('');
}
function mediaDocumentControl(value,label,kind,demo=false){
  const raw=String(value||'').trim();const url=contentSafeUrl(raw);if(!url)return'';
  const local=!/^https?:\/\//i.test(raw);
  const attrs=local?` download="${contentEsc(raw.split('/').pop()||label)}"`:' target="_blank" rel="noopener"';
  const accessible=label+(demo?' (demo)':'');
  if(kind==='cv')return `<a class="profile-media-cv-icon${demo?' is-demo':''}" href="${contentEsc(url)}"${attrs} aria-label="${contentEsc(accessible)}" title="${contentEsc(accessible)}">${profileIcon('cv')}</a>`;
  return `<a class="profile-media-control profile-media-control--${contentEsc(kind)}${demo?' is-demo':''}" href="${contentEsc(url)}"${attrs} aria-label="${contentEsc(accessible)}" title="${contentEsc(accessible)}">${profileIcon(kind)}<span class="profile-media-control-copy"><span class="profile-media-control-label">${contentEsc(label)}</span>${demo?'<span class="profile-media-control-note">Demo</span>':''}</span></a>`;
}
// Legacy QA marker retained for the recommendation feature: profile-recommendation
function mediaRecommendationControl(p,group){
  const rec=p.recommendation||{};
  const raw=typeof rec==='string'?rec:rec.url;
  const url=contentSafeUrl(raw);if(!url)return'';
  const label=(typeof rec==='object'&&rec.label)||'Recommendation';
  const filename=(typeof rec==='object'&&rec.download)||String(raw||'').split('/').pop()||'recommendation.pdf';
  const isDemo=/\(demo\)/i.test(String(label));
  return `<a class="profile-media-recommendation-icon${isDemo?' is-demo':''}" href="${contentEsc(url)}" download="${contentEsc(filename)}" aria-label="Download ${contentEsc(label)} for ${contentEsc(p.name)}" title="${contentEsc(label)}">${profileIcon('recommendation',group)}</a>`;
}
function profileMediaRail(p,group,portraitHtml){
  const email=group==='alumni'?'':contentSafeEmail(p.email);
  const cv=mediaDocumentControl(p.cv,'CV','cv',p.cvDemo===true);
  const recommendation=(group==='graduate'||group==='undergraduate'||group==='alumni')?mediaRecommendationControl(p,group):'';
  const actions=(cv||recommendation)?`<div class="profile-media-actions">${cv}${recommendation}</div>`:'';
  const emailHtml=email?(()=>{const at=email.indexOf('@');const display=at>0?`${contentEsc(email.slice(0,at+1))}<wbr>${contentEsc(email.slice(at+1))}`:contentEsc(email);return `<a class="profile-media-email" href="mailto:${contentEsc(email)}"><span class="profile-media-email-text">${display}</span>${profileIcon('email')}</a>`})():'';
  return `<div class="profile-media">${portraitHtml}${(emailHtml||actions)?`<div class="profile-media-meta">${emailHtml}${actions}</div>`:''}</div>`;
}
function profileDetail(label,value){return value?`<p class="profile-detail"><strong>${contentEsc(label)}</strong><span>${contentEsc(value)}</span></p>`:''}
function personCard(p,group){
  const portrait=contentSafeUrl(p.portrait);
  const interests=asArray(p.researchInterests||p.interests).filter(Boolean);
  const links=profileLinks(p);
  const role=p.role?`<p class="profile-role">${contentEsc(p.role)}</p>`:'';
  const draft=p.draft===true?'<span class="profile-draft-badge">Draft details</span>':'';
  const portraitHtml=portrait
    ?`<figure class="profile-portrait"><img src="${contentEsc(portrait)}" alt="${contentEsc(p.portraitAlt||p.name||'SIGNAL Lab member')}" style="object-position:${contentEsc(safePortraitPosition(p.portraitPosition))}" loading="lazy"></figure>`
    :`<div class="profile-portrait profile-portrait--placeholder" role="img" aria-label="Portrait placeholder for ${contentEsc(p.name)}"><span>${contentEsc(profileInitials(p.name))}</span><small>Photo to be added</small></div>`;
  const mediaRail=profileMediaRail(p,group,portraitHtml);
  return `<article class="card profile-card profile-card--${contentEsc(group)}">
    ${mediaRail}
    <div class="profile-card-body">
      <div class="profile-card-kicker"><span>${contentEsc(group==='faculty'?'Lab leadership':group==='graduate'?'Graduate student':group==='undergraduate'?'Undergraduate student':'SIGNAL Lab alumnus')}</span>${draft}</div>
      <h3>${contentEsc(p.name)}</h3>
      ${role}
      ${p.affiliation?`<p class="profile-affiliation">${contentEsc(p.affiliation)}</p>`:''}
      <div class="profile-details">
        ${profileDetail('Education',p.education)}
        ${profileDetail('Expertise',p.expertise)}
        ${profileDetail(group==='faculty'?'Research':group==='alumni'?'Profile':'Current work',p.currentWork||p.bio)}
        ${profileDetail('Academic roles',p.academicRoles)}
        ${profileDetail('Publications',p.publications)}
        ${profileDetail('Recognition',p.recognition)}
        ${p.highlights?profileDetail('Highlights',p.highlights):''}
      </div>
      ${interests.length?`<div class="profile-interests" aria-label="Research interests">${interests.map(x=>`<span class="chip">${contentEsc(x)}</span>`).join('')}</div>`:''}
      ${links?`<div class="profile-actions">${links}</div>`:''}
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
  records.forEach(p=>{if(p&&p.name&&p.published!==false){const key=peopleGroupKey(p.group||p.category||p.role);if(groups[key])groups[key].push(p)}});
  const sections=PEOPLE_GROUPS.filter(([k])=>groups[k].length).map(([k,label,description],index)=>`<section id="${contentEsc(k)}" class="people-group people-group--${contentEsc(k)}">
    <div class="people-section-head">
      <div><div class="eyebrow">${contentEsc(index===0?'Lab leadership':k==='graduate'?'Graduate study':k==='undergraduate'?'Undergraduate study':'Lab network')}</div><h2>${contentEsc(label)}</h2><p>${contentEsc(description)}</p></div>
      <span class="people-count" aria-label="${groups[k].length} ${groups[k].length===1?'profile':'profiles'}">${groups[k].length.toString().padStart(2,'0')}</span>
    </div>
    <div class="profile-grid people-profile-grid people-profile-grid--${contentEsc(k)}">${groups[k].map(x=>personCard(x,k)).join('')}</div>
  </section>`).join('');
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
