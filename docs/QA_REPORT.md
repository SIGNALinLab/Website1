# QA report

Banner change: every non-home page now uses the exact homepage banner palette while retaining its page-specific illustration.

## Banner palette unification — 2026-08-23
- All non-home page banners now inherit the exact homepage luminous palette: `#edf8ff`, `#ecfbf7`, `#f8fbff`, with blue `#2b6fbd` and cyan `#18b8b6` accents.
- Page-specific SVG motifs, motion, layout, spacing, typography, and content remain distinct and unchanged in purpose.
- A computed-style browser harness verified identical banner variables/backgrounds on all 12 pages at 1440 px and 390 px, with no horizontal overflow.
