const PILARES = [
  {
    icon: '🏅',
    title: 'Perfil verificado que habla por ti',
    description:
      'Tu certificación técnica, experiencia y antecedentes verificados visibles desde el primer clic — sin depender de recomendaciones informales.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Cartera de familias activa e ingresos recurrentes',
    description:
      'Conecta con familias de Lima moderna que valoran tu formación y buscan una relación estable a largo plazo.',
  },
  {
    icon: '📋',
    title: 'Historial profesional que crece contigo',
    description:
      'Cada contrato suma reseñas verificadas a tu perfil. Deja de empezar desde cero con cada nueva empleadora.',
  },
];

export function PilaresCuidadoras() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900">
          ¿Por qué cuidadoras eligen PROYECTO?
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {PILARES.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm"
            >
              <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
                {p.icon}
              </span>
              <h3 className="mb-2 font-bold text-gray-900">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
