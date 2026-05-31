create extension if not exists "pgcrypto";

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null,
  created_at timestamptz not null default now()
);

insert into public.courses (
  title,
  progress,
  icon_name
)
values
  (
    'Data Science',
    34,
    'BrainCircuit'
  ),
  (
    'Backend Java',
    18,
    'Server'
  ),
  (
    'Full Stack',
    52,
    'Layers'
  ),
  (
    'CS Essentials',
    71,
    'BookOpen'
  )
on conflict do nothing;
