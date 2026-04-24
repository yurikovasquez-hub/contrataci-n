const CASOS = [
  { icon: '🎓', label: 'Acabas de certificarte y buscas tu primer empleo formal' },
  { icon: '🔄', label: 'Quieres cambiar de empleadora y no sabes cómo conseguir referencias' },
  { icon: '💰', label: 'Buscas ingresos recurrentes y estables cada mes' },
  { icon: '📍', label: 'Vives en Surco, Miraflores o San Isidro y quieres trabajar cerca' },
  { icon: '⭐', label: 'Tienes experiencia pero no un perfil profesional que la respalde' },
  { icon: '🤝', label: 'Quieres familias que valoren y paguen bien tu certificación' },
];

export function CuandoRegistrarseCuidadoras() {
  return (
    <section className="bg-emerald-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
          ¿Cuándo registrarte en NanaGo?
        </h2>
        <p className="mb-10 text-center text-gray-500">
          Si te identificas con alguna de estas situaciones, NanaGo es para ti.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {CASOS.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-3 rounded-xl bg-white px-4 py-4 shadow-sm"
            >
              <span className="text-2xl">{c.icon}</span>
              <p className="text-sm font-medium text-gray-800">{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
