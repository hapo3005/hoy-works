# HOY Works — IR-02B Source Rights Status

**Audit date:** 2026-08-18  
**Status:** operational registry deployed; legal/business clearance ongoing

## Live source profile

The HOY Works source inventory currently resolves to:

- **84 distinct source hosts**
- **178 current source references**
- **81 hosts / 171 references: AMBER** — predominantly first-party business websites used for limited factual research/provenance
- **3 hosts / 7 references: REVIEW_REQUIRED** — directory sources requiring direct terms review or replacement

Directory review/replacement queue:

- `www.love-lamangaclub.es`
- `www.losbelones.com`
- `www.paginasamarillas.es`

## Policy

First-party business websites are not treated as proprietary HOY content. They may support limited factual verification, but broader copying, media/content reuse, automation, sublicensing and exit transferability require an explicit legal/contractual basis.

Directory-sourced facts remain `REVIEW_REQUIRED` and should be re-sourced from operator first-party evidence, direct Business Confirmation or another cleared source before being counted as transferable HOY data.

## Technical control

Production migration `20260818194934_ir02b_source_rights_registry` created:

- `private.source_rights_registry`
- `private.source_usage_inventory`

The registry is internal-only and records per-host rights/use/transferability state. New unreviewed hosts fail closed to `REVIEW_REQUIRED`.

## Investor claim boundary

Defensible:

> HOY Works has a predominantly first-party-source research catalogue with explicit provenance and an internal rights-clearance layer.

Not yet defensible:

> All provider website content belongs to HOY or is freely transferable.

## Next clearance step

Convert important provider facts from AMBER reference evidence into **Business Confirmed** data under HOY Business Terms that explicitly cover storage, normalization, display, analytics and change-of-control/transferability where appropriate.
