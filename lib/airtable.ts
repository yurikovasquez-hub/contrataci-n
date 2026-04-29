import { getSupabase } from './supabase';

export class AirtableError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'AirtableError';
  }
}

function toAirtableError(err: unknown): never {
  let msg = 'unknown';
  if (err instanceof Error) msg = err.message;
  else if (err && typeof err === 'object' && 'message' in err) msg = String((err as { message: unknown }).message);
  else msg = String(err);
  console.error('[Supabase error]', err);
  throw new AirtableError(0, msg);
}

export async function submitFamiliaLead(data: {
  nombre: string;
  email: string;
  whatsapp: string;
  urgencia: string;
}): Promise<void> {
  try {
    const { error } = await getSupabase().from('leads_familias').insert({
      nombre:   data.nombre,
      email:    data.email,
      whatsapp: data.whatsapp,
      urgencia: data.urgencia,
    });
    if (error) toAirtableError(error);
  } catch (err) {
    if (err instanceof AirtableError) throw err;
    toAirtableError(err);
  }
}

export async function submitCuidadoraLead(data: {
  nombre: string;
  email: string;
  whatsapp: string;
  plan: string;
  certificacion?: string;
}): Promise<void> {
  try {
    const { error } = await getSupabase().from('leads_cuidadoras').insert({
      nombre:        data.nombre,
      email:         data.email,
      whatsapp:      data.whatsapp,
      plan:          data.plan,
      certificacion: data.certificacion?.trim() || null,
    });
    if (error) toAirtableError(error);
  } catch (err) {
    if (err instanceof AirtableError) throw err;
    toAirtableError(err);
  }
}

export function deriveErrorMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  console.error('[deriveErrorMessage]', msg);
  if (msg.includes('Invalid API key') || msg.includes('apikey') || msg.includes('JWT'))
    return 'Error de configuración: API key inválida. Verifica las variables de entorno en Vercel.';
  if (msg.includes('not set'))
    return 'Error de configuración: variable de entorno faltante.';
  if (msg.includes('timeout'))
    return 'Tiempo agotado. Verifica tu conexión e intenta de nuevo.';
  if (msg.includes('violates') || msg.includes('invalid input'))
    return 'Datos inválidos. Intenta de nuevo.';
  if (msg.includes('permission') || msg.includes('policy'))
    return 'Sin permisos. Verifica las políticas RLS en Supabase.';
  return `Error: ${msg}`;
}
