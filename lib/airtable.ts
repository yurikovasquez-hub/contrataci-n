import { getSupabase } from './supabase';

export class AirtableError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'AirtableError';
  }
}

function extractMessage(err: unknown): string {
  if (!err) return 'unknown error';
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message;
  try {
    const obj = err as Record<string, unknown>;
    if (typeof obj.message === 'string') return obj.message;
    return JSON.stringify(err);
  } catch {
    return 'unknown error';
  }
}

function toAirtableError(err: unknown): never {
  const msg = extractMessage(err);
  console.error('[Supabase error]', JSON.stringify(err));
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
  const msg = extractMessage(err);
  console.error('[deriveErrorMessage]', msg);
  if (msg.includes('Invalid API key') || msg.includes('apikey') || msg.includes('JWT'))
    return 'Error de configuración: API key inválida.';
  if (msg.includes('not set') || msg.includes('supabaseUrl') || msg.includes('supabaseKey'))
    return 'Error de configuración: variable de entorno faltante.';
  if (msg.includes('violates') || msg.includes('invalid input'))
    return 'Datos inválidos. Intenta de nuevo.';
  if (msg.includes('permission') || msg.includes('policy') || msg.includes('RLS'))
    return 'Sin permisos. Verifica las políticas RLS en Supabase.';
  if (msg.includes('timeout') || msg.includes('network'))
    return 'Sin conexión. Verifica tu internet e intenta de nuevo.';
  return `Error: ${msg}`;
}
