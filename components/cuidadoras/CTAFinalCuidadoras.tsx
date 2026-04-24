export function CTAFinalCuidadoras() {
  const waUrl =
    'https://wa.me/51933208395?text=Hola%2C%20quiero%20registrarme%20como%20cuidadora%20en%20PROYECTO';

  return (
    <section className="bg-emerald-700 px-6 py-16 text-center text-white">
      <div className="mx-auto max-w-xl">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Registra hoy tu perfil verificado y accede a familias que te buscan
        </h2>
        <p className="mt-4 text-emerald-200">
          Lanzamos pronto en Lima moderna. Sé de las primeras cuidadoras en aparecer.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={waUrl}
            className="rounded-xl bg-green-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-green-600"
          >
            💬 ¿Tienes dudas? Escríbenos por WhatsApp
          </a>
          <a
            href="#planes"
            className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/20"
          >
            Ver planes y registrarme
          </a>
        </div>
      </div>
    </section>
  );
}
