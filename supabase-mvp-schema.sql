-- ============================================================
-- NanaGo — MVP Schema
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- Requiere que supabase-schema.sql ya esté ejecutado
-- ============================================================

-- ──────────────────────────────────────────────
-- TABLA: profiles
-- Una fila por cada usuario registrado (auth.users)
-- ──────────────────────────────────────────────

create table if not exists profiles (
  id                 uuid primary key references auth.users(id) on delete cascade,
  role               text not null default 'familia' check (role in ('familia', 'admin')),
  nombre             text,
  telefono           text,
  perfiles_este_mes  int not null default 0,
  mes_actual         text, -- 'YYYY-MM', para resetear contador mensual
  created_at         timestamptz not null default now()
);

-- Auto-crear profile al registrarse
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, role, nombre)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'familia'),
    new.raw_user_meta_data->>'nombre'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- RLS
alter table profiles enable row level security;

create policy "users read own profile"
  on profiles for select to authenticated
  using (auth.uid() = id);

create policy "users update own profile"
  on profiles for update to authenticated
  using (auth.uid() = id);

-- ──────────────────────────────────────────────
-- TABLA: cuidadoras
-- Gestionada por el equipo (admin panel)
-- ──────────────────────────────────────────────

create table if not exists cuidadoras (
  id               uuid primary key default gen_random_uuid(),
  nombre           text not null,
  foto_url         text,
  zona             text not null,
  disponibilidad   text not null default 'Inmediata'
                     check (disponibilidad in ('Inmediata', 'En 1 semana', 'En 2 semanas')),
  certificacion    text,
  descripcion      text,
  experiencia_anos int,
  activa           boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table cuidadoras enable row level security;

create policy "authenticated read active cuidadoras"
  on cuidadoras for select to authenticated
  using (activa = true);

-- ──────────────────────────────────────────────
-- TABLA: solicitudes_perfil
-- Familias solicitan ver perfiles (máx 3/mes)
-- ──────────────────────────────────────────────

create table if not exists solicitudes_perfil (
  id           uuid primary key default gen_random_uuid(),
  familia_id   uuid not null references profiles(id) on delete cascade,
  cuidadora_id uuid not null references cuidadoras(id) on delete cascade,
  estado       text not null default 'pendiente'
                 check (estado in ('pendiente', 'enviado', 'rechazado')),
  created_at   timestamptz not null default now()
);

alter table solicitudes_perfil enable row level security;

create policy "familias read own solicitudes"
  on solicitudes_perfil for select to authenticated
  using (auth.uid() = familia_id);

create policy "familias insert solicitudes"
  on solicitudes_perfil for insert to authenticated
  with check (auth.uid() = familia_id);

-- ──────────────────────────────────────────────
-- TABLA: matches
-- Registrado manualmente por el admin
-- Fee = 50% del salario acordado
-- ──────────────────────────────────────────────

create table if not exists matches (
  id                       uuid primary key default gen_random_uuid(),
  familia_id               uuid not null references profiles(id),
  cuidadora_id             uuid not null references cuidadoras(id),
  salario_acordado         numeric(10,2) not null,
  fee_monto                numeric(10,2) generated always as (salario_acordado * 0.5) stored,
  estado                   text not null default 'pendiente_pago'
                             check (estado in ('pendiente_pago', 'pagado', 'cancelado')),
  stripe_payment_intent_id text,
  created_at               timestamptz not null default now()
);

alter table matches enable row level security;

create policy "familias read own matches"
  on matches for select to authenticated
  using (auth.uid() = familia_id);

-- ──────────────────────────────────────────────
-- TABLA: suscripciones
-- Familias S/200/mes · Cuidadoras S/30-90/mes
-- ──────────────────────────────────────────────

create table if not exists suscripciones (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null references profiles(id),
  tipo                   text not null check (tipo in ('familia', 'cuidadora')),
  stripe_customer_id     text,
  stripe_subscription_id text,
  estado                 text not null default 'pendiente'
                           check (estado in ('activa', 'cancelada', 'vencida', 'pendiente')),
  periodo_inicio         timestamptz,
  periodo_fin            timestamptz,
  created_at             timestamptz not null default now()
);

alter table suscripciones enable row level security;

create policy "users read own suscripcion"
  on suscripciones for select to authenticated
  using (auth.uid() = user_id);

-- ──────────────────────────────────────────────
-- ÍNDICES
-- ──────────────────────────────────────────────

create index if not exists cuidadoras_zona_idx        on cuidadoras (zona);
create index if not exists cuidadoras_activa_idx      on cuidadoras (activa);
create index if not exists solicitudes_familia_idx    on solicitudes_perfil (familia_id);
create index if not exists matches_familia_idx        on matches (familia_id);
create index if not exists suscripciones_user_idx     on suscripciones (user_id);
