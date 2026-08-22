# QA report

Run date: **2026-08-20**

## Requested refinement checks

- Projects remains a direct navigation link to `projects.html`; no Projects dropdown was reintroduced.
- Project/GIF media preserves full source content with `object-fit: contain` while a blurred same-image backdrop fills otherwise empty bands.
- Detailed project media now uses a fixed 16:10 presentation frame sized independently of long project text, preventing vertically stretched figure areas.
- Recognition images use natural aspect ratio and responsive sizing rather than fixed width/height distortion.
- Project resources use distinct icons for report/document, presentation, GitHub, YouTube, and publication links.
- YouTube and GitHub resources use recognizable brand-style marks and differentiated icon treatments.

## Validation

- JSON validation: PASS.
- JavaScript syntax: PASS.
- Static local-link/media checks: PASS.
- Project record count: 3 GPO + 2 SDP: PASS.
- Local HTTP smoke test for Projects/GPO/SDP and changed assets: PASS.
- Inline browser rendering harness: PASS — project media computed `object-fit: contain`; SDP resource icons rendered for all 10 resource links; recognition image rendered without fixed-dimension distortion.

The sandbox administrator blocks Chromium from navigating directly to localhost, so the visual check used the generated HTML/CSS/JS/data in an inline browser harness while the HTTP server was tested separately.
