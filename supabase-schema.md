# NanaGo — Supabase Schema

Ejecutar en: **Supabase Dashboard → SQL Editor → New query**

---

## Enums

**`urgencia_tipo`** — opciones del formulario de familias

| Valor |
|-------|
| `Lo antes posible` |
| `En 1-2 semanas` |
| `En 1-3 meses` |
| `Solo explorando` |

**`plan_cuidadora`** — tiers de pricing de cuidadoras

| Valor |
|-------|
| `Básico S/30` |
| `Profesional S/60` |
| `Premium S/90` |

---

## Tablas

### `leads_familias`
Captura de demanda desde `/familias`.

| Columna | Tipo | Constraints |
|---------|------|-------------|
| `id` | `uuid` | PK, `gen_random_uuid()` |
| `nombre` | `text` | NOT NULL, 2–100 chars |
| `email` | `text` | NOT NULL, formato válido |
| `whatsapp` | `text` | NOT NULL, 9–15 dígitos |
| `urgencia` | `urgencia_tipo` | NOT NULL |
| `fuente` | `text` | NOT NULL, default `'landing-familias'` |
| `created_at` | `timestamptz` | NOT NULL, default `now()` |

Índices: `created_at desc`, `urgencia`, `email`

---

### `leads_cuidadoras`
Captura de WTP desde `/cuidadoras`.

| Columna | Tipo | Constraints |
|---------|------|-------------|
| `id` | `uuid` | PK, `gen_random_uuid()` |
| `nombre` | `text` | NOT NULL, 2–100 chars |
| `email` | `text` | NOT NULL, formato válido |
| `whatsapp` | `text` | NOT NULL, 9–15 dígitos |
| `plan` | `plan_cuidadora` | NOT NULL |
| `certificacion` | `text` | nullable |
| `fuente` | `text` | NOT NULL, default `'landing-cuidadoras'` |
| `created_at` | `timestamptz` | NOT NULL, default `now()` |

Índices: `created_at desc`, `plan`, `email`

---

## Row Level Security

| Tabla | Rol | Operación | Condición |
|-------|-----|-----------|-----------|
| `leads_familias` | `anon` | INSERT | `true` (browser sin auth) |
| `leads_familias` | `authenticated` | SELECT | `true` (dashboard / admin) |
| `leads_cuidadoras` | `anon` | INSERT | `true` |
| `leads_cuidadoras` | `authenticated` | SELECT | `true` |

---

## Vistas de análisis

### `resumen_familias`
Métricas para el kill criteria de `/familias` (objetivo: >150 leads, >40% urgencia alta).

| Columna | Descripción |
|---------|-------------|
| `total_leads` | Total de registros |
| `urgencia_alta` | Leads con "Lo antes posible" |
| `urgencia_media` | Leads con "En 1-2 semanas" |
| `urgencia_baja` | Leads con "En 1-3 meses" |
| `solo_explorando` | Leads con "Solo explorando" |
| `pct_urgencia_alta` | % del total con urgencia alta |

### `resumen_cuidadoras`
Métricas para el kill criteria de `/cuidadoras` (objetivo: >80 leads en planes S/60+).

| Columna | Descripción |
|---------|-------------|
| `total_leads` | Total de registros |
| `plan_basico` | Leads en Plan Básico S/30 |
| `plan_profesional` | Leads en Plan Profesional S/60 |
| `plan_premium` | Leads en Plan Premium S/90 |
| `leads_wtp_confirmado` | Leads en S/60 + S/90 combinados |

---

## Kill Criteria

| Página | Métrica | Confirmado | Negativo |
|--------|---------|------------|----------|
| `/familias` | Leads en 2 semanas | > 150 | < 50 |
| `/cuidadoras` | Leads en tier S/60 o S/90 | > 80 | 0 clicks en tiers pagos |

Consulta rápida para verificar:

```sql
select * from resumen_familias;
select * from resumen_cuidadoras;
```
