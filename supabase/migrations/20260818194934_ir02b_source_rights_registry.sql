-- IR-02B Source & Data Rights Clearance
-- Production migration version: 20260818194934
-- Applied to HOY Works on 2026-08-18.

create schema if not exists private;

create table if not exists private.source_rights_registry (
  host text primary key,
  source_class text not null default 'UNREVIEWED',
  rights_status text not null default 'REVIEW_REQUIRED' check (rights_status in ('GREEN','AMBER','RED','REVIEW_REQUIRED')),
  use_as_lead boolean not null default true,
  factual_verification_allowed boolean not null default false,
  persistent_copy_allowed boolean not null default false,
  public_reuse_allowed boolean not null default false,
  derivative_use_allowed boolean not null default false,
  commercial_use_allowed boolean not null default false,
  automated_collection_allowed boolean not null default false,
  attribution_required boolean not null default false,
  replacement_required boolean not null default false,
  transferability text not null default 'UNKNOWN' check (transferability in ('YES','YES_WITH_CONDITIONS','NO','UNKNOWN')),
  legal_review_status text not null default 'PENDING',
  terms_reference text,
  terms_checked_at date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table private.source_rights_registry enable row level security;
revoke all on private.source_rights_registry from public, anon, authenticated;
grant usage on schema private to service_role;
grant select on private.source_rights_registry to service_role;

create or replace view private.source_usage_inventory as
with src as (
  select 'providers'::text as source_table, public_source_url as source_url
  from public.providers
  where public_source_url is not null and btrim(public_source_url) <> ''
  union all
  select 'source_provenance', source_url
  from public.source_provenance
  where source_url is not null and btrim(source_url) <> ''
), norm as (
  select source_table,
         lower(regexp_replace(regexp_replace(source_url,'^https?://',''),'[/].*$','')) as host
  from src
)
select host,
       count(*)::bigint as ref_count,
       array_agg(distinct source_table order by source_table) as contexts
from norm
where host <> ''
group by host;

revoke all on private.source_usage_inventory from public, anon, authenticated;
grant select on private.source_usage_inventory to service_role;

insert into private.source_rights_registry(host)
select host from private.source_usage_inventory
on conflict(host) do nothing;

update private.source_rights_registry r set
  source_class='FIRST_PARTY_BUSINESS_REFERENCE', rights_status='AMBER', use_as_lead=true,
  factual_verification_allowed=true, persistent_copy_allowed=false, public_reuse_allowed=false,
  derivative_use_allowed=false, commercial_use_allowed=false, automated_collection_allowed=false,
  replacement_required=false, transferability='UNKNOWN', legal_review_status='BUSINESS_TERMS_REQUIRED',
  notes='First-party business source: limited factual verification allowed operationally; broader content/data/media rights require operator terms or explicit licence.'
where r.host in (
  select distinct lower(regexp_replace(regexp_replace(source_url,'^https?://',''),'[/].*$',''))
  from public.source_provenance
  where source_type='business_website' and source_url is not null and btrim(source_url)<>''
);

update private.source_rights_registry r set
  source_class='DIRECTORY_UNREVIEWED', rights_status='REVIEW_REQUIRED', use_as_lead=true,
  factual_verification_allowed=false, persistent_copy_allowed=false, public_reuse_allowed=false,
  derivative_use_allowed=false, commercial_use_allowed=false, automated_collection_allowed=false,
  replacement_required=true, transferability='UNKNOWN', legal_review_status='DIRECT_TERMS_REVIEW_REQUIRED',
  notes='Directory lead only. Re-source material facts from first-party/operator/HOY evidence before treating as a transferable data asset.'
where r.host in (
  select distinct lower(regexp_replace(regexp_replace(source_url,'^https?://',''),'[/].*$',''))
  from public.source_provenance
  where source_type='directory' and source_url is not null and btrim(source_url)<>''
);
