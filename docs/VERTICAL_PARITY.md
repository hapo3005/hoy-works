# HOY Works — Gastro Parity Gate v1.0

HOY Works may only claim vertical parity with HOY Gastro when the following product, trust, privacy and QA contracts are evidenced. Since Works 2.18.1, cross-vertical truth semantics are owned by **HOY Platform Core v1.0** (`HOY-PC-1.0`); the Works adapter owns only domain translation and Works-specific organic scoring.

## Platform Core boundary

- `platform-core.lock.json` pins an immutable Platform Core source commit and Git blob SHA.
- `vendor/hoy-platform-core-v1.js` is generated/runtime material, not a second source of truth.
- `npm run platform:check` fails if the local vendor copy differs from the pinned core blob.
- `npm run platform:sync` retrieves the exact pinned source and validates its Git blob SHA before writing it.
- `js/parity-core-2.18.js` must delegate confirmation, freshness, MUST/PREFER/IGNORE, safety and sponsorship semantics to `HOYPlatformCore`.
- The Works adapter may translate fields and calculate service/location/language/availability weights, but may not weaken a Platform Core hard gate.

## Product truth and matching

- Truth value and verification state are separate.
- Canonical fact values support `yes`, `no`, `partial`, `unknown`, `not_applicable` and `temporarily_unavailable`.
- Only `hoy_verified`, `business_confirmed` and `community_confirmed` can create a confirmed MUST match or mismatch.
- Research/source-checked and directory evidence remain useful discovery evidence but are not represented as operator confirmation.
- MUST / PREFER / IGNORE is supported, including numeric `gte` / `lte` comparisons.
- A confirmed `no`, `partial`, `not_applicable` or `temporarily_unavailable` does not satisfy a default `MUST=yes` requirement.
- Missing, unknown, stale, disputed or externally unverified evidence yields `NEEDS_CONFIRMATION`, not an invented match or mismatch.
- PREFER may influence organic ranking but can never rescue a failed MUST.

## HOY NOW / availability

- Live availability is provider-controlled.
- A live state is current only when it has a confirmation timestamp and a future expiry.
- Expired availability falls back to unknown / confirmation required.
- A currently confirmed `unavailable` state excludes the provider for urgent `now` / `today` requests.
- Stale availability is never presented as current.

## Trust and source semantics

- `source_checked` means HOY has checked a public source; it does **not** mean the provider confirmed the data.
- `source_checked_at` is propagated into the client trust contract.
- Research older than 180 days, or research without a usable check timestamp, degrades to `STALE / Bestätigung erforderlich`.
- HOY Verified, Business Confirmed, Community Confirmed, researched/external, stale and unknown states remain visibly distinct.
- Suppressed, conflicted or safety-blocked providers are not eligible for organic matching.

## Commercial integrity

- Commercial placement is evaluated by HOY Platform Core outside the organic HOY Match formula.
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

1. `npm run platform:check` passes.
2. `npm run qa:static` passes and proves the adapter has not reimplemented Platform Core truth semantics.
3. `npm run qa:unit` passes.
4. Desktop Chromium, Mobile Chrome and Mobile WebKit browser smoke tests pass.
5. Dependency and Platform Core pins remain exact and reproducible.
6. No known release failure is waived without an explicit documented exception.
7. Production/Supabase changes remain behind their dedicated release and privacy gates.

## Status semantics

`PARITY_CODE_COMPLETE` means the cross-vertical product contracts and automated source-level QA exist and Works consumes the pinned HOY Platform Core. It does **not** mean production rollout, legal clearance, all first-party confirmations, source-rights replacement or real-market proof are finished.
