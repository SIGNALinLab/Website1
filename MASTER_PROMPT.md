# SIGNAL Lab Professional Website — Master Build Prompt

Act as a senior **web designer, front-end engineer, academic information architect, research-communications specialist, accessibility reviewer, technical editor, and GitHub Pages deployment engineer**.

Your task is to build, migrate, audit, and polish a complete professional website for:

**SIGNAL Lab — Signal Intelligence for Global Automation and Learning Laboratory**

The finished website must be suitable for a serious university engineering/research laboratory and must be deployable directly through **GitHub Pages**.

## 1. Source material

Use the existing SIGNAL Lab Google Sites website as migration input:

`https://sites.google.com/view/signallab`

Use the following Google Scholar profile as the canonical publication target for Abdulaziz Alorf:

`https://scholar.google.com/citations?user=2u1wBJoAAAAJ&hl=en`

Important owner instructions:

- The official slogan is complete and must not be rewritten:
  **“We Decode Signals to Empower the Future.”**
- Existing **Projects** information is complete. Preserve its factual content.
- Existing **Staff/People** information is complete except for the alumni recommendation-document functionality described below.
- Improve layout, usability, visual presentation, organization, accessibility, and maintainability without casually rewriting verified factual information.

Remove all unrelated inherited template material such as charity/donation sections, church language, lorem ipsum, fake testimonials, fake addresses, and irrelevant blog content.

## 2. Identity and research positioning

The laboratory name is:

**SIGNAL Lab**

Expanded name:

**Signal Intelligence for Global Automation and Learning Laboratory**

Official slogan:

**We Decode Signals to Empower the Future**

Preserve the established core interests:

- Signal and image processing and machine learning
- Intelligent systems
- Communication systems
- Computer vision
- Engineering applications of artificial intelligence

Position the lab visually and editorially as a modern academic engineering laboratory working at the intersection of **signals, sensing, machine intelligence, automation, vision, communications, and real-world engineering applications**.

Do not make unsupported claims such as “world-leading,” “internationally renowned,” “state-of-the-art equipment,” or “industry-leading.”

## 3. Design direction

Create a distinctive, restrained, premium academic identity rather than a generic corporate/SaaS template.

Use a design language based on:

- scientific precision;
- signal waveforms;
- connected intelligence;
- sensing and computation;
- global/orbital geometry;
- engineering grids and data;
- generous whitespace;
- strong typography;
- subtle motion only where useful.

Suggested primary palette:

- SIGNAL Navy: `#0B1736`
- Signal Cyan: `#20D6D2`
- Intelligence Blue: `#3F7CFF`
- Research Gold: `#D8A439`
- Slate: `#49617C`

Maintain excellent contrast and accessibility.

## 4. Logo system

Create or use a professional SIGNAL Lab identity based on this concept:

**An S-shaped signal waveform passing through intelligence/data nodes inside a global/orbital arc.**

The mark should suggest:

**Sensing → Signal Intelligence → Learning → Automation → Global Impact**

Avoid clichéd brain graphics, generic circuit-board logos, military-style insignia, and excessively complex marks.

Produce:

- vector SVG master;
- horizontal SVG wordmark;
- standalone symbol;
- monochrome version;
- transparent PNG at 512 px;
- transparent PNG at 1024 px;
- transparent PNG at 2048 px;
- transparent PNG at 4096 px;
- large horizontal PNG;
- WebP;
- favicon/ICO.

The horizontal identity should include:

**SIGNAL Lab**

**SIGNAL INTELLIGENCE FOR GLOBAL AUTOMATION AND LEARNING**

and the slogan:

**We Decode Signals to Empower the Future**

Maintain aspect ratio and adequate clear space.

## 5. Technical architecture

Prefer a static, maintainable architecture that works reliably on GitHub Pages.

Unless an existing repository already uses another justified stack, use:

- semantic HTML5;
- modern CSS;
- small vanilla JavaScript modules;
- JSON/Markdown/YAML for factual content;
- no private server;
- no exposed credentials;
- no unnecessary framework or build pipeline.

The site must work when deployed to a GitHub Pages project path and not assume it is hosted at `/`.

Include `.nojekyll`.

Keep configuration such as domain, email, map location, analytics, form endpoints, and social links in one configuration file.

## 6. Responsive design and accessibility

Support approximately 320 px mobile through large desktop monitors.

Implement:

- semantic landmarks;
- proper heading hierarchy;
- keyboard-accessible navigation;
- skip-to-content;
- visible focus state;
- accessible icons;
- descriptive alt text;
- labelled form fields;
- responsive menus;
- sufficient color contrast;
- reduced-motion support;
- no hover-only essential functionality.

Target WCAG-conscious implementation.

## 7. Home page

Build a professional research-lab homepage with:

- SIGNAL Lab identity;
- complete official slogan;
- expanded laboratory name;
- concise mission;
- principal research interests;
- research-domain cards;
- verified/current lab metrics;
- featured projects/publications;
- factual events/news only;
- links to Publications and Projects;
- “Explore Research” CTA;
- “Join SIGNAL Lab” CTA.

Organize research into application-oriented families such as:

**SIGNAL in Medicine**

**SIGNAL in Defense & Security**

**SIGNAL in Education**

**SIGNAL in Energy & Sustainability**

**SIGNAL in AI & Optimization**

Give each category a coherent representative vector icon.

Do not imply military sponsorship, classified work, clinical approval, or institutional endorsement unless supported by evidence.

## 8. Publications page

Populate publications associated with Abdulaziz Alorf's supplied Google Scholar profile.

If Scholar blocks automated access or rate-limits the request:

1. Do not fabricate or guess publications.
2. Cross-check titles and metadata against primary or authoritative bibliographic sources such as publisher pages, Crossref, ORCID, PubMed, DBLP, IEEE, Springer, Elsevier, MDPI, or similar.
3. Flag unresolved records.
4. Create an owner-facing publication reconciliation checklist.

For each publication store, where available:

- title;
- complete author list;
- year;
- venue;
- type;
- DOI;
- publisher/publication link;
- primary application category;
- optional featured flag.

Categorize primarily into:

### SIGNAL in Medicine

Examples include EEG, neuroimaging, fMRI, medical imaging, disease classification, Alzheimer’s, Parkinson’s, sleep analysis, and related biomedical signal/image research.

### SIGNAL in Defense & Security

Examples include biometrics, face attributes, secure/gate access, anti-spoofing, vehicle/license-plate recognition, terrain/autonomy, and security-oriented sensing.

### SIGNAL in Education

Examples include automated attendance, intelligent classrooms, educational automation, and learning technologies.

### SIGNAL in Energy & Sustainability

Examples include smart grids, solar forecasting, energy scheduling, renewable-energy prediction, and edge-cloud energy applications.

### SIGNAL in AI & Optimization

Examples include metaheuristics, general machine-learning methodology, optimization, signal/image algorithms, and enabling AI research.

Provide:

- category-filter buttons;
- category icons;
- keyword search;
- publication count after filtering;
- year;
- publication type;
- venue;
- DOI;
- external-link control.

In every author list, visually **bold Abdulaziz Alorf**, including harmless variants such as “Abdulaziz A. Alorf,” while otherwise preserving the official author string.

Do not publish live citation numbers unless a reliable update process and visible “last updated” date are provided.

## 9. Projects page

The owner states the Projects information is complete.

Therefore:

- preserve project names and factual descriptions;
- do not invent additional projects;
- do not rewrite technical claims merely for marketing;
- improve presentation and information hierarchy only.

Where factual information exists, support:

- project title;
- status;
- team;
- project lead;
- objective;
- technical description;
- outcomes;
- technologies;
- images/video;
- publications;
- GitHub/code;
- datasets;
- collaborators;
- sponsors/funding where verified.

If the source Projects page cannot be extracted automatically, create the data schema/layout but clearly mark it for migration rather than manufacturing content.

## 10. People / Staff / Alumni

Preserve the complete existing Staff information.

Organize appropriately into:

- Principal Investigator / Leadership;
- Faculty/Researchers;
- Current Students;
- Collaborators, if applicable;
- Alumni.

For each profile support:

- portrait;
- full name;
- role;
- concise bio;
- research interests;
- email;
- Scholar/ORCID/personal page where applicable.

### Alumni recommendation control

Under the photograph/profile links of **every alumnus**, add a small accessible recommendation-document control containing:

- representative download/document icon;
- visible text such as “Recommendation”;
- accessible label;
- PDF/download link when available.

Store recommendation files under an organized path such as:

`assets/recommendations/`

Do not make a broken link when no document is available.

If no recommendation exists yet, display a disabled state or hide the public control.

Consider whether signed recommendations should be public at all. Prefer a secure document host plus public verification metadata when confidentiality is important.

## 11. Admissions & Aid

Completely replace unrelated donation/template content.

This page concerns **participation in SIGNAL Lab**, not formal admission to Qassim University.

State this distinction clearly.

### Undergraduate / Senior Design

Create editable baseline guidance such as:

- enrolled in a relevant engineering/computing discipline;
- appropriate project-specific prerequisites;
- programming or technical skills as appropriate;
- signals/systems, probability, electronics, communications, computer vision, or ML preparation depending on project;
- short CV;
- unofficial transcript;
- areas of interest;
- relevant technical skills;
- senior-design/project preference;
- expected weekly availability.

Expected lab practices can include:

- consistent weekly work;
- scheduled project meetings;
- Git/version control;
- experiment documentation;
- reproducibility;
- technical writing;
- appropriate laboratory safety;
- privacy/confidentiality;
- responsible AI/research ethics.

### Graduate research

State that formal university/program admission is separate.

Suggested application materials:

- CV;
- transcript;
- concise research statement;
- research-area preference;
- representative publications/code/projects if available;
- proposed or expected research timeline.

Expected research practices can include:

- literature review;
- reproducible implementation;
- experiment/data management;
- regular research meetings;
- publication-quality technical writing;
- ethics/IRB/data approval where required;
- safe handling of biomedical, biometric, confidential, or human-subject data.

Do not guarantee funding.

Use wording such as:

“Funding, assistantships, or project support depend on available projects, budgets, eligibility, and formal university approval and are not guaranteed unless explicitly confirmed in writing.”

### Application button

Add a prominent application icon/button.

Allow two configurable modes:

1. open a Google Form; or
2. use a native `apply.html` form.

The native form should be able to submit to the supplied Google Apps Script endpoint and store results in Google Sheets.

Include privacy/consent language.

State clearly that submitting the form is not an offer of admission, funding, employment, or supervision.

## 12. Equipment page

Create a new Equipment page.

Suggested categories include:

- GPU/compute servers;
- workstations;
- storage/NAS;
- edge-AI computing;
- embedded systems;
- RGB/machine-vision cameras;
- depth/stereo cameras;
- sensing platforms;
- software-defined radios;
- communication/networking devices;
- electronics/prototyping equipment.

For each item allow:

- equipment name;
- category;
- manufacturer/model;
- quantity;
- important specifications;
- status;
- location;
- availability/access policy;
- responsible contact;
- supported projects;
- last verification date.

Until actual inventory is provided, clearly label items as:

**Draft / example — verify before publication**

Never fabricate specific GPUs, servers, cameras, quantities, or ownership claims.

## 13. Contact page

Build a professional Contact page with:

- SIGNAL Lab identity;
- verified institutional affiliation;
- official email;
- optional phone if verified;
- physical location;
- Google Maps embed;
- contact form.

If the exact room is unknown, point the map to the broader verified College of Engineering/Qassim University location and label the room/building as needing confirmation.

The contact form should contain:

- name;
- email;
- subject;
- message;
- privacy/consent text;
- submit state;
- success state;
- error state.

Support Google Sheets through Google Apps Script or another suitable static-site form service.

Do not put service credentials or API secrets in the GitHub repository.

Include spam/rate-limit/CAPTCHA recommendations for a production deployment.

## 14. Visitor counter and analytics

Add a small visible visitor counter in the footer or another unobtrusive location.

Prefer a privacy-conscious service such as GoatCounter.

Make analytics optional through the central configuration.

If analytics is unconfigured or unavailable, the rest of the website must continue working.

Avoid invasive tracking, advertising trackers, or unnecessary cookies.

## 15. Recommendation validation

Create a public verification page such as:

`verify.html?id=SIG-REC-YYYY-NNN`

A recommendation letter QR code should point to this page.

The page may show safe validation data such as:

- validation status;
- reference ID;
- applicant name, if appropriate;
- issue date;
- document type;
- issuer;
- valid / revoked / not found state.

Do **not** expose:

- confidential recommendation prose;
- grades unless explicitly authorized;
- transcript data;
- national ID;
- private phone number;
- applicant private address;
- other sensitive information.

Include a demonstration validation record for development but require its removal before production launch.

Design the system so the static JSON record can later be replaced with a stronger institutional/database/cryptographic validation system without redesigning the public page.

## 16. Recommendation-letter template

Create a professional LaTeX recommendation template inspired by the website.

It must contain:

- SIGNAL Lab horizontal logo;
- complete slogan;
- expanded laboratory identity;
- university/college affiliation;
- editable date;
- editable reference ID;
- applicant name;
- applicant role/context;
- recipient/employer;
- professional recommendation body;
- recommender name/title;
- official email;
- lab website;
- signature area;
- page numbering;
- QR code;
- human-readable validation URL.

Keep editable variables together near the top.

The QR code should point to a URL like:

`https://YOUR-DOMAIN/verify.html?id=SIG-REC-YYYY-NNN`

Make clear that the QR validates the document record, not the confidential recommendation body.

## 17. Official-letter template

Create a second professional LaTeX template for official SIGNAL Lab correspondence.

Include:

- same logo system;
- same slogan;
- same design language;
- reference number;
- date;
- recipient name;
- recipient title;
- recipient organization;
- subject;
- formal body;
- signatory name/title/email;
- lab website;
- institutional footer;
- page numbering.

Use editable commands/variables at the beginning of the file.

Maintain restrained academic typography suitable for printing and PDF distribution.

## 18. Forms / Google Sheets integration

Provide an Apps Script backend suitable for a static GitHub Pages site.

Create separate spreadsheet tabs such as:

- `Applications`
- `Contact`

Sanitize spreadsheet-formula prefixes.

Restrict writes to the explicitly permitted sheets.

Do not accept arbitrary target sheet names.

Document deployment:

- create Google Sheet;
- open Apps Script;
- paste backend;
- initialize sheets;
- deploy web app;
- select institutionally acceptable permissions;
- place endpoint in site configuration;
- submit test entries.

Warn the administrator that a public endpoint can receive spam and should be protected appropriately for production use.

## 19. Recommendation privacy

Do not assume signed recommendations should be committed to a public GitHub repository.

Support both:

- public PDF download when intentionally approved;
- external/private document storage with a public validation record.

The public validation system should be useful without publishing confidential recommendation content.

## 20. SEO and web quality

Implement:

- unique page titles;
- useful meta descriptions;
- configurable canonical URL;
- Open Graph metadata;
- Twitter/social metadata;
- favicon;
- robots file;
- sitemap template;
- descriptive link text;
- clean URLs where GitHub Pages permits;
- structured data only when verified.

Optimize large images.

Lazy-load noncritical imagery.

Avoid unnecessary layout shift.

## 21. Security and privacy

Never put any of the following in the repository:

- passwords;
- private API keys;
- service-account files;
- confidential student data;
- private recommendation text;
- restricted datasets;
- secrets/tokens.

Use `rel="noopener"` for external links.

Sanitize or escape dynamic content.

Treat form data and recommendation records as potentially sensitive.

## 22. Content-quality rules

Use concise, credible academic language.

Avoid exaggerated marketing claims.

Do not invent:

- faculty;
- student names;
- grants;
- awards;
- sponsors;
- degrees;
- room numbers;
- equipment models;
- funding;
- university rules;
- publication titles;
- DOI values;
- citation counts.

Use “Defense & Security” accurately and without implying classified work, government affiliation, or military sponsorship.

For biomedical publications, do not imply that a research classifier is an approved diagnostic device.

Date-stamp metrics that may change.

## 23. Repository structure

Provide a clean repository approximately along these lines:

```
/
├── index.html
├── publications.html
├── projects.html
├── people.html
├── admissions.html
├── apply.html
├── equipment.html
├── contact.html
├── verify.html
├── 404.html
├── .nojekyll
├── README.md
├── MASTER_PROMPT.md
├── assets/
│   ├── brand/
│   ├── css/
│   ├── js/
│   ├── data/
│   ├── images/
│   └── recommendations/
├── backend/
│   └── google-apps-script/
├── templates/
│   ├── recommendation-letter.tex
│   └── official-letter.tex
└── docs/

```

Put factual lists in data files rather than hardcoding the same information in multiple pages.

## 24. Documentation

Provide a README explaining:

- how to run locally;
- how to publish with GitHub Pages;
- where configuration lives;
- where publications are edited;
- where projects are edited;
- where people are edited;
- how recommendation links work;
- how verification records work;
- how equipment is edited;
- how Google Sheets forms are configured;
- how GoatCounter is configured;
- how to configure the final domain;
- how to replace draft placeholders.

Also provide:

- deployment checklist;
- content migration checklist;
- publication audit/reconciliation checklist.

## 25. Acceptance tests

Before declaring the website complete:

1. Run every page through a local HTTP server.
2. Confirm all important pages return successfully.
3. Validate JavaScript syntax.
4. Validate JSON.
5. Check local links/assets for broken references.
6. Test desktop layout.
7. Test mobile layout.
8. Test keyboard navigation.
9. Confirm publication filters work.
10. Confirm publication search works.
11. Confirm **Abdulaziz Alorf** is bolded in publication author lists.
12. Confirm category icons render.
13. Confirm forms fail gracefully before configuration.
14. Confirm form submission after the endpoint is configured.
15. Confirm analytics failure cannot break the site.
16. Confirm alumnus recommendation links cannot silently point to nonexistent files.
17. Confirm the demonstration recommendation-validation record works.
18. Confirm no confidential recommendation is exposed by the validation page.
19. Confirm no secrets are committed.
20. Perform a final factual audit and explicitly report everything requiring owner verification.

## 26. Final response requirements

At completion, provide:

- the complete GitHub-ready repository;
- all logo assets;
- the publication dataset;
- the Google Sheets backend;
- recommendation validation functionality;
- recommendation LaTeX template;
- official-letter LaTeX template;
- README;
- deployment checklist;
- migration checklist;
- publication reconciliation report.

Also give the owner a concise list of remaining factual items that require confirmation before public launch.

Do not claim completion of content that could not be verified or migrated.

Prioritize **accuracy, maintainability, privacy, accessibility, academic credibility, and visual coherence** over flashy effects.