const TESTIMONIOS = [
  {
    nombre: 'Rosa H.',
    distrito: 'Surco',
    texto:
      'Antes conseguía trabajo solo por recomendaciones. Con NanaGo mi certificación habla por mí y las familias llegan a mí, no al revés.',
  },
  {
    nombre: 'Milagros C.',
    distrito: 'Miraflores',
    texto:
      'En dos semanas ya tenía entrevistas con familias que buscan exactamente mi perfil. Nunca había tenido un proceso tan claro y formal.',
  },
  {
    nombre: 'Sandra P.',
    distrito: 'San Isidro',
    texto:
      'Lo que más valoro es que las familias ya llegan sabiendo lo que ofrezco. No tengo que explicar todo desde cero en cada entrevista.',
  },
  {
    nombre: 'Carmen L.',
    distrito: 'Surco',
    texto:
      'Por fin tengo un historial profesional verificado. Las reseñas de mis empleadoras anteriores me abrieron puertas que antes ni imaginaba.',
  },
];

export function TestimoniosCuidadoras() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Lo que dicen las cuidadoras
        </p>
        <h2 className="mb-10 text-center text-2xl font-bold text-gray-900">
          Técnicas de Lima moderna ya usan NanaGo
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {TESTIMONIOS.map((t) => (
            <div
              key={t.nombre}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm"
            >
              <div className="mb-3 flex gap-0.5 text-yellow-400">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <p className="mb-4 text-sm text-gray-600">"{t.texto}"</p>
              <p className="text-xs font-semibold text-gray-900">
                {t.nombre} —{' '}
                <span className="font-normal text-gray-500">{t.distrito}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
