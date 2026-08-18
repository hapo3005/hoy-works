# HOY Works — Gastro Parity Gate v1.0

HOY Works may only claim vertical parity with HOY Gastro when the following product, trust, privacy and QA contracts are evidenced. This is a release contract, not a claim that every production/legal gate is already complete.

## Product truth and matching

- Truth value and verification state are separate.
- Canonical fact values support `yes`, `no`, `partial`, `unknown`, `not_applicable` and `temporarily_unavailable`.
- Only `hoy_verified`, `business_confirmed` and `community_confirmed` can create a confirmed MUST match or mismatch.
- Research/source-checked and directory evidence remain useful discovery evidence but are not represented as operator confirmation.
- MUST / PREFER / IGNORE is supported, including numeric `gte` / `lte` comparisons.
- A confirmed failed MUST excludes the provider. An unresolved MUST stays a possible match and is explicitly marked as requiring confirmation.
- PREFER may influence organic ranking but can never rescue a failed MUST.

## HOY NOW / availability

- Live availability is provider-controlled.
- A live state is current only when it has a confirmation timestamp and a future expiry.
- Expired availability falls back to unknown / confirmation required.
- A currently confirmed `unavailable` state excludes the provider for urgent `now` / `today` requests.
- Stale availability is never presented as current.

## Trust and source semantics

- `source_checked` means HOY has checked a public source; it does **not** mean the provider confirmed the data.
- HOY Verified, Business Confirmed, Community Confirmed, researched/external and unknown states remain visibly distinct.
- Suppressed, conflicted or safety-blocked providers are not eligible for organic matching.

## Commercial integrity

- Commercial placement is evaluated outside the organic HOY Match formula.
- Sponsorship never changes score or organic rank.
- A paid placement is eligible only when active, approved and explicitly disclosure-enabled.
- Eligible paid placement is labelled `Anzeige`.
- Suppressed providers cannot be commercially promoted.

## Privacy

- Raw request descriptions, precise coordinates and provider contact drafts are not persisted in browser `localStorage` by the 2.18 parity runtime.
- Low-risk request structure may survive only in session storage for the current browser session.
- The historical local request fallback is disabled outside QA; a backend/privacy gate failure must not silently downgrade to persistent local personal-data storage.
- Production collection of work requests and provider applications remains governed by the separate IR-02D pre-live database gates in Works PR #2.

## Source rights and legal boundary

- This parity slice does not reclassify source rights or claim that researched data is proprietary.
- Works PR #2 remains the source-rights/privacy production gate.
- No provider outreach, production DDL, privacy-law clearance or live commercial launch is authorized by this parity PR.

## QA gate

Before merge/release:

1. `npm run qa:static` passes.
2. `npm run qa:unit` passes.
3. Desktop Chromium, Mobile Chrome and Mobile WebKit browser smoke tests pass.
4. Dependency pinning remains exact and reproducible.
5. No known release failure is waived without an explicit documented exception.
6. Production/Supabase changes remain behind their dedicated release and privacy gates.

## Status semantics

`PARITY_CODE_COMPLETE` means the cross-vertical product contracts and automated source-level QA exist. It does **not** mean production rollout, legal clearance, all first-party confirmations, source-rights replacement or real-market proof are finished.
