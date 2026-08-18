create schema if not exists private;

create table if not exists private.privacy_launch_gates (
  feature_code text primary key,
  status text not null default 'blocked' check (status in ('blocked','approved','retired')),
  privacy_notice_version text,
  legal_basis_approved_at timestamptz,
  retention_approved_at timestamptz,
  recipients_approved_at timestamptz,
  transfer_reviewed_at timestamptz,
  dpia_screened_at timestamptz,
  counsel_reviewed_at timestamptz,
  counsel_reference text,
  approved_at timestamptz,
  notes text,
  updated_at timestamptz not null default now(),
  constraint privacy_feature_approval_requires_clearance check (
    status <> 'approved' or (
      nullif(btrim(privacy_notice_version),'') is not null and
      legal_basis_approved_at is not null and
      retention_approved_at is not null and
      recipients_approved_at is not null and
      transfer_reviewed_at is not null and
      dpia_screened_at is not null and
      counsel_reviewed_at is not null and
      nullif(btrim(counsel_reference),'') is not null and
      approved_at is not null
    )
  )
);

insert into private.privacy_launch_gates(feature_code,status,notes) values
('work_requests','blocked','Customer request flow can contain customer identity, precise location, language and free text. P0 privacy clearance required before live collection.'),
('provider_applications','blocked','Provider application flow can contain professional/personal contact data. Privacy notice, legal basis, retention and transfer review required before live collection.')
on conflict (feature_code) do nothing;

alter table private.privacy_launch_gates enable row level security;
revoke all on table private.privacy_launch_gates from public, anon, authenticated;
drop policy if exists deny_client_privacy_launch_gates on private.privacy_launch_gates;
create policy deny_client_privacy_launch_gates on private.privacy_launch_gates for all to anon, authenticated using (false) with check (false);

create or replace function private.enforce_privacy_launch_gate()
returns trigger
language plpgsql
security definer
set search_path=private,public,pg_temp
as $$
declare
  v_code text := TG_TABLE_NAME;
  v_status text;
begin
  select status into v_status from private.privacy_launch_gates where feature_code=v_code;
  if coalesce(v_status,'blocked') <> 'approved' then
    raise exception 'privacy_launch_gate_blocked:%', v_code using errcode='42501';
  end if;
  return new;
end;
$$;
revoke all on function private.enforce_privacy_launch_gate() from public, anon, authenticated;

drop trigger if exists trg_privacy_gate_work_requests on public.work_requests;
create trigger trg_privacy_gate_work_requests
before insert or update on public.work_requests
for each row execute function private.enforce_privacy_launch_gate();

drop trigger if exists trg_privacy_gate_provider_applications on public.provider_applications;
create trigger trg_privacy_gate_provider_applications
before insert or update on public.provider_applications
for each row execute function private.enforce_privacy_launch_gate();

comment on table private.privacy_launch_gates is 'HOY Works pre-live privacy clearance gates. Personal-data-heavy flows remain blocked until documented legal/privacy clearance.';
