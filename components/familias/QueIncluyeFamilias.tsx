const ITEMS = [
  {
    icon: '📋',
    title: 'Verificación de antecedentes penales',
    description: 'Consulta oficial antes de que aparezca en la plataforma.',
  },
  {
    icon: '🎓',
    title: 'Validación de certificación técnica',
    description: 'Confirmamos que su formación en cuidado infantil es real y vigente.',
  },
  {
    icon: '🗣️',
    title: 'Reseñas verificadas de madres',
    description: 'Solo pueden opinar familias que contrataron a esa cuidadora.',
  },
  {
    icon: '📸',
    title: 'Perfil completo con foto y experiencia',
    description: 'Ves con quién vas a confiar a tu hijo antes de la entrevista.',
  },
  {
    icon: '🤝',
    title: 'Acompañamiento post-match',
    description: 'Soporte directo si algo no funciona en las primeras semanas.',
  },
];

export function QueIncluyeFamilias() {
  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center text-2xl font-bold text-gray-900">
          ¿Qué incluye el servicio?
        </h2>
        <div className="flex flex-col gap-5">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xl">
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
