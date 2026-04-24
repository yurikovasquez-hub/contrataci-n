const PILARES = [
  {
    icon: '🔍',
    title: 'Verificación rigurosa',
    description:
      'Cada cuidadora pasa por verificación de antecedentes penales, validación de su certificación técnica y entrevista personal antes de aparecer en la plataforma.',
  },
  {
    icon: '⚡',
    title: 'Disponibilidad real en 48 h',
    description:
      'No 3–4 semanas de búsqueda incierta. Candidatas listas para entrevistar el mismo día, con agenda flexible para tu horario.',
  },
  {
    icon: '🤝',
    title: 'Red de confianza comprobada',
    description:
      'Reseñas verificadas de madres de Surco, Miraflores y San Isidro — con nombre, distrito y edad del hijo. Sin perfiles anónimos.',
  },
];

export function PilaresFamilias() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900">
          ¿Por qué las familias eligen PROYECTO?
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {PILARES.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm"
            >
              <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-2xl">
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
