# QA report

## Banner-palette restoration vet — 2026-08-23

The previous banner-color package unintentionally reconstructed parts of the website rather than modifying the last vetted interface in place. This release corrects that regression.

### Intentional visual change
- Every page banner now uses the homepage luminous palette: `#edf8ff`, `#ecfbf7`, `#f8fbff`, with blue `#2b6fbd` and cyan `#18b8b6` accents.
- Each page retains its page-specific scientific SVG motif.

### Restored vetted behavior
- Restored the Projects overview's free-standing/unboxed preview imagery and blue→cyan SIGNAL research rail, including the mobile vertical rail.
- Restored GPO (`#2B5F9E`) and SDP (`#245DD5`) project-type colors, red Demo labels, neutral technical-focus chips/metadata, semantic green/review-gold status treatments, and unboxed detailed demo media.
- Restored the Contact layout with verified broad Qassim University location, generated map embed, phone/email details, native-form markup, required privacy consent, and direct-email fallback while the endpoint is blank.
- Restored native Application form markup, external-form routing, and the permanent no-offer disclaimer.
- Restored full People/Equipment schema rendering and fail-closed verification-status logic.
- Restored canonical/social metadata configuration behavior, application-link routing, optional GoatCounter behavior, and homepage dataset-audit dating.
- Restored the production configuration values used by the prior vetted release.
- Hero motion is restrained and ambient; `prefers-reduced-motion` disables it.

### Accuracy safeguards
- No People or Equipment records are invented; both remain pending verification.
- The Airspace Security project does not expose an inferred technical scope while the source scope remains unresolved.
- The public publication dataset remains the audited 15-record dataset and does not claim exhaustive Scholar reconciliation.
- Native form writes remain restricted to the whitelisted Applications/Contact sheets with consent/email validation and spreadsheet-formula sanitation.

## Final regression validation
- Deterministic Chromium harness passed all 12 public pages at 1440×1000 and 390×844 with no horizontal overflow.
- All heroes reported the exact homepage palette while retaining page-specific hero-art classes/motifs.
- Normal-motion mode retained restrained ambient animation; `prefers-reduced-motion` computed to no hero animation.
- Projects overview restored free-standing media, GPO `#2B5F9E`, SDP `#245DD5`, horizontal desktop / vertical mobile research rail, and detailed semantic Demo/status/focus/metadata treatments.
- Apply external-mode fallback and permanent no-offer disclaimer passed; Contact email fallback, generated broad-location map URL, phone/email configuration, and two-column desktop layout passed.
- People/Equipment verification fallbacks and full schema renderers passed.
- Project titles/durations and published non-N/A amounts were checked against the supplied GPO/SDP source archive after whitespace normalization (13/13 checks passed).
- Apps Script persistence/security mock passed, including sheet routing, invalid email/consent/form-type rejection, and spreadsheet-formula neutralization.
- Both LaTeX templates compiled twice to one A4 page with no unresolved/overfull/underfull warnings and were visually rendered for inspection.
- Local HTTP smoke test passed 19/19 pages/core assets.
