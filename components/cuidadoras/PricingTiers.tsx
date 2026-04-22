export type PlanSlug = 'Básico S/30' | 'Profesional S/60' | 'Premium S/90';

export const TIERS: { slug: PlanSlug; name: string; price: number; features: string[]; highlight?: boolean }[] = [
  {
    slug: 'Básico S/30',
    name: 'Plan Básico',
    price: 30,
    features: ['Perfil verificado publicado', 'Visible para familias en tu zona', 'Badge de formación técnica'],
  },
  {
    slug: 'Profesional S/60',
    name: 'Plan Profesional',
    price: 60,
    highlight: true,
    features: ['Todo lo del Plan Básico', 'Posicionamiento destacado en búsquedas', 'Badge de certificación verificada', 'Acceso a familias premium'],
  },
  {
    slug: 'Premium S/90',
    name: 'Plan Premium',
    price: 90,
    features: ['Todo lo del Plan Profesional', 'Prioridad en nuevas familias', 'Reseñas verificadas de empleadoras anteriores', 'Soporte prioritario'],
  },
];

interface PricingTiersProps {
  selectedPlan: PlanSlug | null;
  onSelectPlan: (plan: PlanSlug) => void;
}

export function PricingTiers({ selectedPlan, onSelectPlan }: PricingTiersProps) {
  return (
    <section className="mx-auto max-w-2xl px-6 py-8">
      <h2 className="mb-2 text-center text-xl font-bold text-gray-900">Elige tu plan</h2>
      <p className="mb-8 text-center text-sm text-gray-500">
        Reserva tu lugar ahora — lanzamos pronto.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {TIERS.map(tier => {
          const selected = selectedPlan === tier.slug;
          return (
            <button key={tier.slug} type="button" onClick={() => onSelectPlan(tier.slug)}
              className={`relative flex flex-col rounded-2xl border-2 p-6 text-left transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                ${tier.highlight
                  ? selected
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg'
                    : 'border-emerald-400 bg-emerald-50 hover:border-emerald-600'
                  : selected
                    ? 'border-gray-900 bg-gray-900 text-white shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-400'
                }`}>
              {tier.highlight && (
                <span className={`mb-3 inline-block self-start rounded-full px-2 py-0.5 text-xs font-semibold
                  ${selected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                  Más popular
                </span>
              )}
              <p className={`text-sm font-medium ${selected ? 'text-white/80' : 'text-gray-500'}`}>{tier.name}</p>
              <p className="mt-1 text-3xl font-bold">
                <span className="text-base font-normal">S/</span>{tier.price}
                <span className={`text-sm font-normal ${selected ? 'text-white/70' : 'text-gray-400'}`}>/mes</span>
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {tier.features.map(f => (
                  <li key={f} className={`flex items-start gap-2 text-xs ${selected ? 'text-white/90' : 'text-gray-600'}`}>
                    <span className="mt-0.5 shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
              <span className={`mt-5 block w-full rounded-lg py-2 text-center text-sm font-semibold transition
                ${selected
                  ? 'bg-white text-gray-900'
                  : tier.highlight
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                {selected ? 'Seleccionado ✓' : 'Seleccionar'}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
