# Publication audit / reconciliation report

Audit date: **2026-08-19**

The supplied Google Scholar profile returned a rate-limit response during automated access. Following the owner brief, this repository does **not** fabricate missing publications. The seeded dataset uses records cross-checked against publisher pages, DOI metadata, PubMed, Springer, DBLP, arXiv/DataCite, or ORCID-visible metadata.

## Seed records requiring final Scholar comparison

- [ ] Confirm that every entry in `assets/data/publications.json` appears on the supplied Scholar profile or is otherwise intentionally included.
- [ ] Compare the Scholar profile total against the dataset total. ORCID-visible search metadata indicated more works than the current seed list, so the dataset should be treated as **reconciliation pending**, not complete.
- [ ] Resolve DOI for the 2017 IJCB paper “In defense of low-level structural features and SVMs…” (DBLP record verified, DOI not captured by automated retrieval).
- [ ] Confirm final issue year for the Parkinson’s disease paper associated with DOI `10.1016/j.compbiomed.2025.111126`; some discovery surfaces may display online-first vs. issue-year differences.
- [ ] Verify author-string diacritics and ordering against final publisher records.
- [ ] Add any Scholar works not present here only after authoritative metadata verification.
- [ ] Do not add live citation counts unless an update process and visible “last updated” date are implemented.
