const CASOS = [
  { icon: '👶', label: 'Primera cuidadora para recién nacido' },
  { icon: '🚨', label: 'Reemplazo urgente sin aviso previo' },
  { icon: '💼', label: 'Cobertura diaria mientras trabajas' },
  { icon: '✈️', label: 'Salidas o viajes de fin de semana' },
  { icon: '🌟', label: 'Niños con necesidades especiales' },
  { icon: '🏥', label: 'Apoyo post-hospitalización' },
];

export function CuandoUsarFamilias() {
  return (
    <section className="bg-indigo-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
          ¿Cuándo contactar a PROYECTO?
        </h2>
        <p className="mb-10 text-center text-gray-500">
          Nuestra red cubre todas las situaciones en las que tu hijo necesita un cuidado confiable.
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
