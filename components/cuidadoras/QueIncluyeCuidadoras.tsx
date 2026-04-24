const ITEMS = [
  {
    icon: '📸',
    title: 'Perfil completo con foto y experiencia',
    description: 'Las familias ven quién eres y qué ofreces antes de contactarte.',
  },
  {
    icon: '🎓',
    title: 'Badge de certificación verificada',
    description: 'Tu formación técnica validada y visible en tu perfil público.',
  },
  {
    icon: '🔍',
    title: 'Verificación de antecedentes penales',
    description: 'Sello que aumenta tu credibilidad y filtra familias serias.',
  },
  {
    icon: '⭐',
    title: 'Reseñas verificadas de empleadoras',
    description: 'Solo opinan familias que realmente te contrataron.',
  },
  {
    icon: '📍',
    title: 'Visibilidad en tu zona',
    description: 'Apareces primero ante familias de tu distrito o cercanas.',
  },
  {
    icon: '🤝',
    title: 'Acompañamiento en el match',
    description: 'Soporte si algo no funciona en las primeras semanas con la familia.',
  },
];

export function QueIncluyeCuidadoras() {
  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center text-2xl font-bold text-gray-900">
          ¿Qué incluye tu perfil en NanaGo?
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                {item.icon}
              </span>
              <div>
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="mt-0.5 text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
