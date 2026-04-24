const AIRTABLE_API = 'https://api.airtable.com/v0';

export class AirtableError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'AirtableError';
  }
}

async function postToAirtable(
  tableName: 'Leads Familias' | 'Leads Cuidadoras',
  fields: Record<string, string>
): Promise<void> {
  const token = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN;
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
  if (!token) throw new AirtableError(0, 'NEXT_PUBLIC_AIRTABLE_TOKEN is not set');
  if (!baseId) throw new AirtableError(0, 'NEXT_PUBLIC_AIRTABLE_BASE_ID is not set');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const url = `${AIRTABLE_API}/${baseId}/${encodeURIComponent(tableName)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
      signal: controller.signal,
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new AirtableError(
        response.status,
        (body as { error?: { message?: string } })?.error?.message ?? 'Unknown error'
      );
    }
  } catch (err) {
    if (err instanceof AirtableError) throw err;
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new AirtableError(0, 'timeout');
    }
    throw new AirtableError(0, 'network');
  } finally {
    clearTimeout(timeout);
  }
}

export async function submitFamiliaLead(data: {
  nombre: string;
  email: string;
  whatsapp: string;
  urgencia: string;
}): Promise<void> {
  await postToAirtable('Leads Familias', {
    Nombre: data.nombre,
    Email: data.email,
    WhatsApp: data.whatsapp,
    Urgencia: data.urgencia,
    Fuente: 'landing-familias',
    Fecha: new Date().toISOString().split('T')[0],
  });
}

export async function submitCuidadoraLead(data: {
  nombre: string;
  email: string;
  whatsapp: string;
  plan: string;
  certificacion?: string;
}): Promise<void> {
  const fields: Record<string, string> = {
    Nombre: data.nombre,
    Email: data.email,
    WhatsApp: data.whatsapp,
    Plan: data.plan,
    Fuente: 'landing-cuidadoras',
    Fecha: new Date().toISOString().split('T')[0],
  };
  if (data.certificacion?.trim()) {
    fields['Certificación'] = data.certificacion.trim();
  }
  await postToAirtable('Leads Cuidadoras', fields);
}

export function deriveErrorMessage(err: unknown): string {
  if (err instanceof AirtableError) {
    if (err.status === 429) return 'Demasiados intentos. Espera unos segundos e intenta de nuevo.';
    if (err.status === 401 || err.status === 403) return 'Error de configuración. Contáctanos.';
    if (err.status === 422) return 'Datos inválidos. Intenta de nuevo.';
    if (err.status === 0 && err.message === 'timeout') return 'Tiempo agotado. Verifica tu conexión e intenta de nuevo.';
    if (err.status === 0) return 'Sin conexión. Verifica tu internet e intenta de nuevo.';
    return 'Error temporal. Intenta de nuevo en un momento.';
  }
  return 'Error inesperado. Intenta de nuevo.';
}
