export function CTAFinalFamilias() {
  const waUrl =
    'https://wa.me/51933208395?text=Hola%2C%20quiero%20encontrar%20una%20cuidadora%20verificada%20para%20mi%20hijo';

  return (
    <section className="bg-indigo-700 px-6 py-16 text-center text-white">
      <div className="mx-auto max-w-xl">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Agenda hoy tu cuidadora verificada para tu hijo
        </h2>
        <p className="mt-4 text-indigo-200">
          Lanzamos pronto en Lima moderna. Sé de las primeras familias en acceder.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={waUrl}
            className="rounded-xl bg-green-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-green-600"
          >
            💬 ¿Tienes dudas? Escríbenos por WhatsApp
          </a>
          <a
            href="#formulario"
            className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/20"
          >
            Reservar acceso anticipado
          </a>
        </div>
      </div>
    </section>
  );
}
