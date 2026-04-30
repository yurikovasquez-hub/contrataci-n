-- ============================================================
-- NanaGo — Supabase Schema
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================

-- ──────────────────────────────────────────────
-- ENUMS
-- ──────────────────────────────────────────────

create type urgencia_tipo as enum (
  'Lo antes posible',
  'En 1-2 semanas',
  'En 1-3 meses',
  'Solo explorando'
);

create type plan_cuidadora as enum (
  'Básico S/30',
  'Profesional S/60',
  'Premium S/90'
);

-- ──────────────────────────────────────────────
-- TABLA: leads_familias
-- Captura de demanda desde /familias
-- ──────────────────────────────────────────────

create table leads_familias (
  id          uuid primary key default gen_random_uuid(),
  nombre      text not null check (char_length(nombre) >= 2 and char_length(nombre) <= 100),
  email       text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  whatsapp    text not null check (whatsapp ~ '^\d{9,15}$'),
  urgencia    urgencia_tipo not null,
  fuente      text not null default 'landing-familias',
  created_at  timestamptz not null default now()
);

-- Índices para filtros frecuentes en el dashboard
create index leads_familias_created_at_idx on leads_familias (created_at desc);
create index leads_familias_urgencia_idx   on leads_familias (urgencia);
create index leads_familias_email_idx      on leads_familias (email);

-- ──────────────────────────────────────────────
-- TABLA: leads_cuidadoras
-- Captura de WTP desde /cuidadoras
-- ──────────────────────────────────────────────

create table leads_cuidadoras (
  id             uuid primary key default gen_random_uuid(),
  nombre         text not null check (char_length(nombre) >= 2 and char_length(nombre) <= 100),
  email          text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  whatsapp       text not null check (whatsapp ~ '^\d{9,15}$'),
  plan           plan_cuidadora not null,
  certificacion  text,
  fuente         text not null default 'landing-cuidadoras',
  created_at     timestamptz not null default now()
);

-- Índices para filtros frecuentes en el dashboard
create index leads_cuidadoras_created_at_idx on leads_cuidadoras (created_at desc);
create index leads_cuidadoras_plan_idx       on leads_cuidadoras (plan);
create index leads_cuidadoras_email_idx      on leads_cuidadoras (email);

-- ──────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- Insert público (anon), SELECT solo autenticados
-- ──────────────────────────────────────────────

alter table leads_familias   enable row level security;
alter table leads_cuidadoras enable row level security;

-- Cualquiera puede insertar (llamada desde el browser sin auth)
create policy "insert_public_familias"
  on leads_familias for insert
  to anon
  with check (true);

create policy "insert_public_cuidadoras"
  on leads_cuidadoras for insert
  to anon
  with check (true);

-- Solo roles autenticados (dashboard / admin) pueden leer
create policy "select_authenticated_familias"
  on leads_familias for select
  to authenticated
  using (true);

create policy "select_authenticated_cuidadoras"
  on leads_cuidadoras for select
  to authenticated
  using (true);

-- ──────────────────────────────────────────────
-- VISTAS DE ANÁLISIS (métricas del kill criteria)
-- ──────────────────────────────────────────────

-- Total leads familias + desglose por urgencia
create view resumen_familias as
select
  count(*)                                                      as total_leads,
  count(*) filter (where urgencia = 'Lo antes posible')         as urgencia_alta,
  count(*) filter (where urgencia = 'En 1-2 semanas')          as urgencia_media,
  count(*) filter (where urgencia = 'En 1-3 meses')            as urgencia_baja,
  count(*) filter (where urgencia = 'Solo explorando')         as solo_explorando,
  round(
    count(*) filter (where urgencia = 'Lo antes posible') * 100.0 / nullif(count(*), 0),
    1
  )                                                             as pct_urgencia_alta
from leads_familias;

-- Total leads cuidadoras + desglose por plan (kill criteria: >80 en S/60+)
create view resumen_cuidadoras as
select
  count(*)                                                           as total_leads,
  count(*) filter (where plan = 'Básico S/30')                      as plan_basico,
  count(*) filter (where plan = 'Profesional S/60')                 as plan_profesional,
  count(*) filter (where plan = 'Premium S/90')                     as plan_premium,
  count(*) filter (where plan in ('Profesional S/60','Premium S/90')) as leads_wtp_confirmado
from leads_cuidadoras;
