import { ValuePropItem } from '@/components/shared/ValuePropItem';

const PROPS = [
  {
    icon: '🏅',
    title: 'Perfil verificado que habla por ti',
    description: 'Tu certificación y experiencia visibles desde el primer clic — sin depender de recomendaciones.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Cartera de familias activa, ingresos recurrentes',
    description: 'Conecta con familias que valoran tu formación y buscan una relación estable.',
  },
  {
    icon: '📋',
    title: 'Formaliza tu trabajo',
    description: 'Historial profesional verificado que crece con cada contrato. Deja de empezar desde cero.',
  },
];

export function ValuePropsCuidadoras() {
  return (
    <section className="mx-auto max-w-lg px-6 py-12">
      <h2 className="mb-8 text-center text-lg font-semibold text-gray-700">
        ¿Por qué PROYECTO para cuidadoras?
      </h2>
      <div className="flex flex-col gap-6">
        {PROPS.map(p => (
          <ValuePropItem key={p.title} icon={p.icon} title={p.title} description={p.description} />
        ))}
      </div>
    </section>
  );
}
