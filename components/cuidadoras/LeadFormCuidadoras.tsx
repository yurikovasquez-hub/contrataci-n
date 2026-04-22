'use client';

import { useRef, useState } from 'react';
import { FormField } from '@/components/shared/FormField';
import { SuccessMessage } from '@/components/shared/SuccessMessage';
import { submitCuidadoraLead, deriveErrorMessage } from '@/lib/airtable';
import { trackCuidadoraLead } from '@/lib/meta-pixel';
import type { PlanSlug } from './PricingTiers';
import { TIERS } from './PricingTiers';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

function validate(f: { nombre: string; email: string; whatsapp: string }) {
  const errors: Record<string, string> = {};
  if (!f.nombre.trim() || f.nombre.trim().length < 2) errors.nombre = 'Ingresa tu nombre';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errors.email = 'Ingresa un email válido';
  const digits = f.whatsapp.replace(/[\s\-()+]/g, '');
  if (!/^\d{9,}$/.test(digits)) errors.whatsapp = 'Ingresa un número de WhatsApp válido';
  return errors;
}

export function LeadFormCuidadoras({ selectedPlan }: { selectedPlan: PlanSlug }) {
  const [state, setState] = useState<FormState>('idle');
  const [fields, setFields] = useState({ nombre: '', email: '', whatsapp: '', certificacion: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState('');
  const submitting = useRef(false);

  const tierPrice = TIERS.find(t => t.slug === selectedPlan)?.price ?? 60;

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
      await submitCuidadoraLead({ ...fields, plan: selectedPlan });
      trackCuidadoraLead(tierPrice as 30 | 60 | 90);
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
      <div className="mx-auto max-w-lg px-6 pb-16">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <SuccessMessage nombre={fields.nombre} plan={selectedPlan} variant="cuidadoras" />
        </div>
      </div>
    );
  }

  return (
    <section id="formulario-cuidadora" className="mx-auto max-w-lg scroll-mt-8 px-6 pb-16">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="mb-1 text-xl font-bold text-gray-900">Reserva tu lugar</h2>
        <p className="mb-6 text-sm text-gray-500">
          Plan seleccionado: <span className="font-semibold text-emerald-700">{selectedPlan}</span>
        </p>

        {state === 'error' && (
          <div role="alert" aria-live="polite"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <FormField id="c-nombre" label="Nombre" type="text" value={fields.nombre}
            onChange={set('nombre')} required placeholder="Tu nombre completo"
            error={errors.nombre} disabled={state === 'submitting'} />
          <FormField id="c-email" label="Email" type="email" value={fields.email}
            onChange={set('email')} required placeholder="tu@email.com"
            error={errors.email} disabled={state === 'submitting'} />
          <FormField id="c-whatsapp" label="WhatsApp" type="tel" value={fields.whatsapp}
            onChange={set('whatsapp')} required placeholder="987 654 321"
            error={errors.whatsapp} disabled={state === 'submitting'} />
          <FormField id="c-cert" label="Certificación / formación (opcional)" type="text"
            value={fields.certificacion} onChange={set('certificacion')}
            placeholder="Ej: Técnica en Enfermería — SENCICO 2012"
            disabled={state === 'submitting'} />

          <button type="submit" disabled={state === 'submitting'}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
            {state === 'submitting' ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                Enviando...
              </>
            ) : `Reservar mi lugar en ${selectedPlan}`}
          </button>
        </form>
      </div>
    </section>
  );
}
