-- 1. Create Table (if not exists)
create table if not exists public.news (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    slug text not null,
    title text not null,
    url text not null unique,
    source text,
    region text,
    sector text,
    tags text[],
    summary text,
    importance text default 'neutral',
    published_at timestamp with time zone
);

-- 2. Add Dedupe & Content Columns (Idempotent)
-- These commands will simply skip if the columns already exist
alter table public.news add column if not exists hash text;
alter table public.news add column if not exists content text;
alter table public.news add column if not exists ai_generated boolean default false;

-- 3. Add Constraints (Safe update via DO block)
do $$
begin
    -- Ensure Hash Unique Key exists
    if not exists (select 1 from pg_constraint where conname = 'news_hash_key') then
        alter table public.news add constraint news_hash_key unique (hash);
    end if;
    -- URL unique key is usually created by table definition, but just in case
    if not exists (select 1 from pg_constraint where conname = 'news_url_key') then
        alter table public.news add constraint news_url_key unique (url);
    end if;
end $$;

-- 4. Policies (Drop & Recreate to avoid "already exists" error)
alter table public.news enable row level security;

drop policy if exists "Allow public read access" on public.news;
create policy "Allow public read access"
on public.news for select to anon using (true);

drop policy if exists "Block anon writes" on public.news;
create policy "Block anon writes"
on public.news for insert to anon with check (false);
