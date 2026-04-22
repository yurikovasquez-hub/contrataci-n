export function SuccessMessage({
  nombre,
  plan,
  variant,
}: {
  nombre: string;
  plan?: string;
  variant: 'familias' | 'cuidadoras';
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
        ✓
      </div>
      <div>
        <p className="text-xl font-semibold text-gray-900">
          {variant === 'familias'
            ? `Perfecto, ${nombre}.`
            : `Perfecto, ${nombre}.`}
        </p>
        <p className="mt-1 text-gray-500">
          {variant === 'familias'
            ? 'Te avisamos cuando abramos en tu zona.'
            : `Tu lugar en el ${plan} está reservado. Te contactamos al lanzar.`}
        </p>
      </div>
    </div>
  );
}
