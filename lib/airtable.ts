import { getSupabase } from './supabase';

export class AirtableError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'AirtableError';
  }
}

export async function submitFamiliaLead(data: {
  nombre: string;
  email: string;
  whatsapp: string;
  urgencia: string;
}): Promise<void> {
  const { error } = await getSupabase().from('leads_familias').insert({
    nombre:   data.nombre,
    email:    data.email,
    whatsapp: data.whatsapp,
    urgencia: data.urgencia,
  });
  if (error) throw new AirtableError(0, error.message);
}

export async function submitCuidadoraLead(data: {
  nombre: string;
  email: string;
  whatsapp: string;
  plan: string;
  certificacion?: string;
}): Promise<void> {
  const { error } = await getSupabase().from('leads_cuidadoras').insert({
    nombre:        data.nombre,
    email:         data.email,
    whatsapp:      data.whatsapp,
    plan:          data.plan,
    certificacion: data.certificacion?.trim() || null,
  });
  if (error) throw new AirtableError(0, error.message);
}

export function deriveErrorMessage(err: unknown): string {
  if (err instanceof AirtableError) {
    if (err.message.includes('timeout'))  return 'Tiempo agotado. Verifica tu conexión e intenta de nuevo.';
    if (err.message.includes('network'))  return 'Sin conexión. Verifica tu internet e intenta de nuevo.';
    if (err.message.includes('violates')) return 'Datos inválidos. Intenta de nuevo.';
    return 'Error temporal. Intenta de nuevo en un momento.';
  }
  return 'Error inesperado. Intenta de nuevo.';
}
