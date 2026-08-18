# HOY Works — IR-02D Privacy Pre-Live Gate

**Audit date:** 2026-08-18  
**Status:** LIVE FAIL-CLOSED / NOT CLEARED FOR PERSONAL-DATA FLOWS

## Verified baseline

At audit time the Works project contains:

- 0 Auth users
- 0 profiles
- 0 provider members
- 0 provider applications
- 0 work requests

The `work_requests` schema is capable of storing identity-linked workflow data, location text, latitude/longitude, municipality/locality, preferred language, free-text service description and provider assignment. Provider applications can also contain professional/personal contact information.

## Implemented production gate

Migration:

`20260818205607_ir02d_works_privacy_pre_live_gate`

Internal table:

`private.privacy_launch_gates`

Current feature states:

- `work_requests` → `blocked`
- `provider_applications` → `blocked`

Each feature can become `approved` only after all required evidence exists:

- active/final Privacy Notice version reference;
- legal-basis approval;
- retention approval;
- recipients/disclosure approval;
- international-transfer review;
- DPIA screening;
- counsel review/reference;
- explicit approval timestamp.

A database check constraint prevents incomplete approval.

## Data-plane enforcement

Two production triggers are active:

- `trg_privacy_gate_work_requests`
- `trg_privacy_gate_provider_applications`

Until the applicable gate is approved, inserts/updates are rejected with a privacy launch-gate error.

This is intentional: the feature must not start collecting personal data merely because UI/backend code becomes reachable before Privacy/Legal clearance.

## Negative test

An attempt to set the incomplete `work_requests` gate to `approved` was rejected by PostgreSQL. Both gates remained `blocked`.

## Security verification

Supabase Security Advisor after deployment: **0 findings**.

The privacy registry is private, RLS-enabled, has no client grants, and includes an explicit deny policy for `anon` and `authenticated`.

## Required P0 before approval

1. final HOY legal entity/controller identity;
2. final DE/ES Privacy Notice for Works scope;
3. legal basis per data flow;
4. location-minimization policy (including coordinate precision); 
5. free-text sensitive-data warning/filter strategy;
6. retention/deletion rules;
7. provider-recipient disclosure rules;
8. vendor/subprocessor/international-transfer review;
9. data-subject-rights workflow;
10. incident/breach workflow;
11. DPIA screening and DPIA if required;
12. counsel sign-off;
13. application/UI tests proving the gate and privacy presentation.

## Claim boundary

**Defensible:** HOY Works currently prevents the audited personal-data-heavy customer/provider flows from going live before privacy clearance.

**Not defensible:** HOY Works is fully privacy-law-cleared, has an active final Privacy Notice, or is ready to process customer work-request personal data.
