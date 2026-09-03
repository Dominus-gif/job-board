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
