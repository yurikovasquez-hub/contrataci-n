const TESTIMONIOS = [
  {
    nombre: 'Carla M.',
    distrito: 'Surco',
    texto:
      'Encontré a nuestra cuidadora en menos de 24 horas. El proceso fue transparente y los antecedentes verificados me dieron una tranquilidad que nunca tuve buscando por WhatsApp.',
  },
  {
    nombre: 'Valeria T.',
    distrito: 'Miraflores',
    texto:
      'Lo que más valoro es que los antecedentes son reales y verificados. Por fin puedo irme al trabajo sin esa angustia de no saber quién está con mi hijo.',
  },
  {
    nombre: 'Andrea L.',
    distrito: 'San Isidro',
    texto:
      'Nunca pensé que fuera tan rápido y confiable. Las reseñas de otras madres del mismo distrito me ayudaron a decidirme de inmediato.',
  },
  {
    nombre: 'Paola V.',
    distrito: 'Surco',
    texto:
      'El perfil llegó con todo: certificación, foto, experiencia y reseñas. No tuve que preguntar nada extra. Simplemente elegí y coordiné.',
  },
];

export function TestimoniosFamilias() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Lo que dicen las familias
        </p>
        <h2 className="mb-10 text-center text-2xl font-bold text-gray-900">
          Madres de Lima moderna ya confían en NanaGo
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
