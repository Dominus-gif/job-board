-- Role-targeted email subscriptions for getremotejobsnow.com
-- Run this once in the Supabase SQL editor (or via `supabase db push`).
--
-- Model: exactly ONE row per email. `categories` is the current, de-duplicated
-- set of job categories the person is subscribed to; `history` is an append-only
-- log of every submission (category + timestamp) so earlier selections are kept
-- even as new roles are added.

create table if not exists public.role_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  categories  text[] not null default '{}',
  history     jsonb  not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Atomic upsert + merge. Called via PostgREST RPC: POST /rest/v1/rpc/subscribe_category
create or replace function public.subscribe_category(p_email text, p_category text)
returns public.role_subscribers
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email    text := lower(trim(p_email));
  v_category text := trim(p_category);
  v_entry    jsonb := jsonb_build_array(jsonb_build_object('category', v_category, 'at', now()));
  v_row      public.role_subscribers;
begin
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'invalid email';
  end if;
  if v_category is null or v_category = '' then
    raise exception 'category required';
  end if;

  insert into public.role_subscribers as s (email, categories, history)
  values (v_email, array[v_category], v_entry)
  on conflict (email) do update
    set categories = (
          -- keep every previously selected role, add the new one, de-duplicated
          select array(select distinct e from unnest(s.categories || excluded.categories) as e)
        ),
        history    = s.history || excluded.history,
        updated_at = now()
  returning * into v_row;

  return v_row;
end;
$$;

-- Lock the table down; all writes flow through the SECURITY DEFINER function.
alter table public.role_subscribers enable row level security;

-- Allow the RPC to be invoked. The server calls it with the service-role key
-- (which bypasses RLS anyway); granting anon/authenticated lets you also call it
-- straight from the browser with the anon key if you ever want to.
grant execute on function public.subscribe_category(text, text) to anon, authenticated, service_role;


-- ============================================================================
-- Retention, part 2: saved-search alerts + cross-device sync
-- Run this block in the Supabase SQL editor after the section above.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Saved searches
--
-- role_subscribers above only captures a BROAD category ("Backend"). This table
-- captures a specific query — "senior backend, Europe, $150k+, worldwide only" —
-- so alerts can match what the person actually searched for.
--
-- `params` is the normalised filter set (q, category, region, salary band,
-- scope, employment type, salary-disclosed-only). `fingerprint` is a stable
-- hash of those params so the same search from the same email is upserted
-- rather than duplicated.
-- ---------------------------------------------------------------------------
create table if not exists public.saved_searches (
  id           uuid primary key default gen_random_uuid(),
  email        text not null,
  label        text not null,
  params       jsonb not null default '{}'::jsonb,
  fingerprint  text not null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (email, fingerprint)
);

create index if not exists saved_searches_email_idx on public.saved_searches (email);

create or replace function public.subscribe_search(
  p_email       text,
  p_label       text,
  p_params      jsonb,
  p_fingerprint text
)
returns public.saved_searches
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(trim(p_email));
  v_row   public.saved_searches;
begin
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'invalid email';
  end if;
  if p_fingerprint is null or p_fingerprint = '' then
    raise exception 'fingerprint required';
  end if;

  -- Cap per email so one address can't fill the table.
  if (select count(*) from public.saved_searches where email = v_email) >= 25 then
    raise exception 'too many saved searches';
  end if;

  insert into public.saved_searches as s (email, label, params, fingerprint)
  values (v_email, left(coalesce(p_label, 'Saved search'), 200), coalesce(p_params, '{}'::jsonb), p_fingerprint)
  on conflict (email, fingerprint) do update
    set label = excluded.label,
        params = excluded.params,
        updated_at = now()
  returning * into v_row;

  return v_row;
end;
$$;

-- ---------------------------------------------------------------------------
-- 2. Cross-device sync buckets
--
-- Deliberately NOT accounts: no password, no email, no session. A bucket is a
-- random code the visitor copies to another device to carry their bookmarks and
-- saved searches across. That gives the cross-device persistence the retention
-- gap called for without standing up auth (and without an email provider, which
-- this app still doesn't have).
--
-- Trade-off, stated plainly: anyone holding the code can read that bucket, so
-- it must only ever hold non-sensitive data (job slugs and filter params).
-- Buckets expire so abandoned codes don't accumulate forever.
-- ---------------------------------------------------------------------------
create table if not exists public.sync_buckets (
  code        text primary key,
  payload     jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  expires_at  timestamptz not null default now() + interval '180 days'
);

create or replace function public.sync_push(p_code text, p_payload jsonb)
returns public.sync_buckets
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text := upper(trim(p_code));
  v_row  public.sync_buckets;
begin
  if v_code !~ '^[A-Z0-9]{8,12}$' then
    raise exception 'invalid code';
  end if;
  -- Guard against oversized payloads (bookmarks are trimmed job records).
  if pg_column_size(p_payload) > 512000 then
    raise exception 'payload too large';
  end if;

  insert into public.sync_buckets as b (code, payload)
  values (v_code, coalesce(p_payload, '{}'::jsonb))
  on conflict (code) do update
    set payload = excluded.payload,
        updated_at = now(),
        expires_at = now() + interval '180 days'
  returning * into v_row;

  return v_row;
end;
$$;

create or replace function public.sync_pull(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text := upper(trim(p_code));
  v_out  jsonb;
begin
  select payload into v_out
  from public.sync_buckets
  where code = v_code and expires_at > now();

  return coalesce(v_out, 'null'::jsonb);
end;
$$;
