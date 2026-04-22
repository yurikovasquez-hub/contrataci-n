'use client';

import { useRef, useState } from 'react';
import { FormField } from '@/components/shared/FormField';
import { SuccessMessage } from '@/components/shared/SuccessMessage';
import { submitFamiliaLead, deriveErrorMessage } from '@/lib/airtable';
import { trackFamiliasLead } from '@/lib/meta-pixel';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const URGENCIA_OPTIONS = [
  { value: 'Lo antes posible', label: 'Lo antes posible (urgencia alta)' },
  { value: 'En 1-2 semanas', label: 'En 1-2 semanas' },
  { value: 'En 1-3 meses', label: 'En 1-3 meses' },
  { value: 'Solo explorando', label: 'Solo estoy explorando' },
];

function validate(f: { nombre: string; email: string; whatsapp: string; urgencia: string }) {
  const errors: Record<string, string> = {};
  if (!f.nombre.trim() || f.nombre.trim().length < 2) errors.nombre = 'Ingresa tu nombre';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errors.email = 'Ingresa un email válido';
  const digits = f.whatsapp.replace(/[\s\-()+]/g, '');
  if (!/^\d{9,}$/.test(digits)) errors.whatsapp = 'Ingresa un número de WhatsApp válido';
  if (!f.urgencia) errors.urgencia = 'Selecciona cuándo necesitas cobertura';
  return errors;
}

export function LeadFormFamilias() {
  const [state, setState] = useState<FormState>('idle');
  const [fields, setFields] = useState({ nombre: '', email: '', whatsapp: '', urgencia: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState('');
  const submitting = useRef(false);

  function set(key: string) {
    return (val: string) => {
      setFields(f => ({ ...f, [key]: val }));
      if (state === 'error') setState('idle');
      if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting.current) return;
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    submitting.current = true;
    setState('submitting');
    try {
      await submitFamiliaLead(fields);
      trackFamiliasLead();
      setState('success');
    } catch (err) {
      setErrorMsg(deriveErrorMessage(err));
      setState('error');
    } finally {
      submitting.current = false;
    }
  }

  if (state === 'success') {
    return (
      <div className="mx-auto max-w-lg px-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <SuccessMessage nombre={fields.nombre} variant="familias" />
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-lg px-6 pb-16">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="mb-1 text-xl font-bold text-gray-900">Reserva tu acceso anticipado</h2>
        <p className="mb-6 text-sm text-gray-500">
          Lanzamos pronto en Lima moderna. Sé de las primeras en acceder.
        </p>

        {state === 'error' && (
          <div role="alert" aria-live="polite"
            className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <FormField id="nombre" label="Nombre" type="text" value={fields.nombre}
            onChange={set('nombre')} required placeholder="Tu nombre"
            error={errors.nombre} disabled={state === 'submitting'} />
          <FormField id="email" label="Email" type="email" value={fields.email}
            onChange={set('email')} required placeholder="tu@email.com"
            error={errors.email} disabled={state === 'submitting'} />
          <FormField id="whatsapp" label="WhatsApp" type="tel" value={fields.whatsapp}
            onChange={set('whatsapp')} required placeholder="987 654 321"
            error={errors.whatsapp} disabled={state === 'submitting'} />
          <FormField id="urgencia" label="¿Cuándo necesitas cobertura?" type="select"
            value={fields.urgencia} onChange={set('urgencia')} required
            options={URGENCIA_OPTIONS} error={errors.urgencia}
            disabled={state === 'submitting'} />

          <button type="submit" disabled={state === 'submitting'}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            {state === 'submitting' ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                Enviando...
              </>
            ) : 'Quiero ser de las primeras en acceder'}
          </button>
        </form>
      </div>
    </section>
  );
}
