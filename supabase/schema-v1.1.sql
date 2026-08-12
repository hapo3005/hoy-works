-- HOY Works V1.1 — DRAFT SCHEMA, intentionally not a migration file.
-- Deploy only to a dedicated HOY Works Supabase project after review.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  preferred_language text not null default 'ES' check (preferred_language in ('DE','EN','ES')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  summary text,
  phone text,
  source_status text not null default 'unverified' check (source_status in ('unverified','directory_only','source_checked','business_verified','hoy_verified')),
  partnership_status text not null default 'none' check (partnership_status in ('none','invited','active','paused','terminated')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.provider_members (
  provider_id uuid not null references public.providers(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  member_role text not null default 'operator' check (member_role in ('owner','admin','operator')),
  created_at timestamptz not null default now(),
  primary key (provider_id,user_id)
);

create table if not exists public.services (
  id text primary key,
  label_de text not null,
  label_en text not null,
  label_es text not null
);

create table if not exists public.provider_services (
  provider_id uuid not null references public.providers(id) on delete cascade,
  service_id text not null references public.services(id) on delete cascade,
  primary key (provider_id,service_id)
);

create table if not exists public.provider_languages (
  provider_id uuid not null references public.providers(id) on delete cascade,
  language text not null check (language in ('DE','EN','ES')),
  primary key (provider_id,language)
);

create table if not exists public.provider_coverage (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  coverage_type text not null check (coverage_type in ('municipality','locality','radius','custom_polygon','manual_review')),
  municipality text,
  locality text,
  center_lat double precision,
  center_lng double precision,
  radius_km numeric(8,2),
  polygon_geojson jsonb,
  is_verified boolean not null default false,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.work_requests (
  id uuid primary key default gen_random_uuid(),
  public_ref text not null unique,
  customer_id uuid not null references auth.users(id) on delete cascade,
  service_id text not null references public.services(id),
  urgency text not null check (urgency in ('now','today','soon','plan')),
  status text not null default 'open' check (status in ('open','accepted','question','quoted','scheduled','done','cancelled','expired')),
  location_text text not null,
  latitude double precision,
  longitude double precision,
  municipality text,
  locality text,
  preferred_language text not null check (preferred_language in ('DE','EN','ES')),
  description text not null,
  assigned_provider_id uuid references public.providers(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists work_requests_status_idx on public.work_requests(status,created_at desc);
create index if not exists work_requests_service_idx on public.work_requests(service_id,created_at desc);

create table if not exists public.request_photos (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.work_requests(id) on delete cascade,
  object_path text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.request_matches (
  request_id uuid not null references public.work_requests(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete cascade,
  score numeric(5,2),
  reasons jsonb not null default '[]'::jsonb,
  is_eligible boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (request_id,provider_id)
);

create table if not exists public.request_events (
  id bigint generated always as identity primary key,
  request_id uuid not null references public.work_requests(id) on delete cascade,
  actor_user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.source_provenance (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  source_url text,
  source_type text not null check (source_type in ('business_website','directory','business_profile','manual','provider_submission')),
  checked_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.providers enable row level security;
alter table public.provider_members enable row level security;
alter table public.services enable row level security;
alter table public.provider_services enable row level security;
alter table public.provider_languages enable row level security;
alter table public.provider_coverage enable row level security;
alter table public.work_requests enable row level security;
alter table public.request_photos enable row level security;
alter table public.request_matches enable row level security;
alter table public.request_events enable row level security;
alter table public.source_provenance enable row level security;

create policy "profile owner read" on public.profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "profile owner update" on public.profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "profile owner insert" on public.profiles for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "active providers public read" on public.providers for select to anon, authenticated using (is_active = true);
create policy "services public read" on public.services for select to anon, authenticated using (true);
create policy "provider services public read" on public.provider_services for select to anon, authenticated using (true);
create policy "provider languages public read" on public.provider_languages for select to anon, authenticated using (true);
create policy "verified coverage public read" on public.provider_coverage for select to anon, authenticated using (is_verified = true);

create policy "members see membership" on public.provider_members for select to authenticated using ((select auth.uid()) = user_id);

create policy "customer creates request" on public.work_requests for insert to authenticated with check ((select auth.uid()) = customer_id);
create policy "customer sees own request" on public.work_requests for select to authenticated using ((select auth.uid()) = customer_id);
create policy "customer updates own open request" on public.work_requests for update to authenticated using ((select auth.uid()) = customer_id) with check ((select auth.uid()) = customer_id);

-- Providers read full request rows only after assignment.
-- Pre-acceptance lead delivery should be implemented through a reviewed server/Edge Function path
-- so contact details and private request data are not accidentally exposed by a broad SELECT policy.
create policy "assigned provider member sees request" on public.work_requests for select to authenticated using (
  exists (
    select 1 from public.provider_members pm
    where pm.user_id = (select auth.uid())
      and pm.provider_id = work_requests.assigned_provider_id
  )
);

create policy "customer sees own matches" on public.request_matches for select to authenticated using (
  exists (select 1 from public.work_requests wr where wr.id = request_matches.request_id and wr.customer_id = (select auth.uid()))
);
create policy "provider member sees own matches" on public.request_matches for select to authenticated using (
  exists (select 1 from public.provider_members pm where pm.provider_id = request_matches.provider_id and pm.user_id = (select auth.uid()))
);

create policy "customer sees request photos metadata" on public.request_photos for select to authenticated using (
  exists (select 1 from public.work_requests wr where wr.id=request_photos.request_id and wr.customer_id=(select auth.uid()))
);
create policy "customer inserts request photos metadata" on public.request_photos for insert to authenticated with check (
  exists (select 1 from public.work_requests wr where wr.id=request_photos.request_id and wr.customer_id=(select auth.uid()))
);

create policy "request participants see events" on public.request_events for select to authenticated using (
  exists (
    select 1 from public.work_requests wr
    where wr.id=request_events.request_id
      and (
        wr.customer_id=(select auth.uid())
        or exists (select 1 from public.provider_members pm where pm.user_id=(select auth.uid()) and pm.provider_id=wr.assigned_provider_id)
      )
  )
);

-- Minimum Data API grants. RLS still controls rows.
grant select on public.providers, public.services, public.provider_services, public.provider_languages, public.provider_coverage to anon;
grant select, insert, update on public.profiles, public.work_requests to authenticated;
grant select on public.providers, public.services, public.provider_services, public.provider_languages, public.provider_coverage, public.provider_members, public.request_matches, public.request_events to authenticated;
grant select, insert on public.request_photos to authenticated;

insert into public.services(id,label_de,label_en,label_es) values
('reformas','Reformen','Renovations','Reformas'),
('fontaneria','Sanitär','Plumbing','Fontanería'),
('electricidad','Elektro','Electrical','Electricidad'),
('clima','Klima','Air conditioning','Climatización'),
('piscina','Pool','Pool','Piscina'),
('limpieza','Reinigung','Cleaning','Limpieza'),
('cerrajeria','Schlüssel / Schloss','Locksmith','Cerrajería'),
('mantenimiento','Objektservice','Property service','Mantenimiento')
on conflict (id) do update set label_de=excluded.label_de,label_en=excluded.label_en,label_es=excluded.label_es;
