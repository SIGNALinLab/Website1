# Projects migration report

Migration date: **2026-08-20**

## Source pages supplied

- `SIGNAL Lab - GPO Projects.html`
- `SIGNAL Lab - SDPs.html`

## Resulting website structure

- `projects.html` — portfolio overview
- `gpo-projects.html` — 3 migrated GPO records
- `sdps.html` — 2 migrated senior-design records
- `assets/data/projects.json` — single editable project data source
- `assets/images/projects/` — migrated project images and animated demos

## GPO records migrated

1. Design & Analysis of JPDAF Tracker with AI-Enabled Maneuvering Models
2. AI-Driven Airspace Security
3. Vehicle Access Automation

## SDP records migrated

1. Design and Implementation of a Novel and Robust Automated Attendance System
2. Design and Implementation of a Robust Anti-Spoofing System for Vehicle Gate Access Using Recent Artificial Intelligence Techniques

## Owner-review item

The supplied GPO HTML gives **AI-Driven Airspace Security** the same technical description used for the JPDAF tracker project. The website preserves that source text in `projects.json` and shows an owner-review note instead of inventing a replacement.

## Additional links

The report/presentation/GitHub/YouTube links were migrated from the SDP source HTML. Two publication links were added from the existing website publication dataset and are marked in the JSON so they can be removed if strict source-page parity is preferred.
