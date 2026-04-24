import { ValuePropItem } from '@/components/shared/ValuePropItem';

const PROPS = [
  {
    icon: '🔍',
    title: 'Antecedentes verificados + certificación técnica',
    description: 'Cada cuidadora pasa por verificación de antecedentes penales y validación de su formación técnica.',
  },
  {
    icon: '⚡',
    title: 'Disponibilidad en 48 horas',
    description: 'No 3-4 semanas de búsqueda. Candidatas listas para entrevistar el mismo día.',
  },
  {
    icon: '⭐',
    title: 'Reseñas reales de madres en tu zona',
    description: 'Opiniones de madres de Surco, Miraflores y San Isidro — con nombre, distrito y edad del hijo.',
  },
];

export function ValuePropsFamilias() {
  return (
    <section className="mx-auto max-w-lg px-6 py-12">
      <h2 className="mb-8 text-center text-lg font-semibold text-gray-700">
        ¿Por qué NanaGo?
      </h2>
      <div className="flex flex-col gap-6">
        {PROPS.map(p => (
          <ValuePropItem key={p.title} icon={p.icon} title={p.title} description={p.description} />
        ))}
      </div>
    </section>
  );
}
