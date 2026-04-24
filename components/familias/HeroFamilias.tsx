import Image from 'next/image';

export function HeroFamilias() {
  const waUrl =
    'https://wa.me/51933208395?text=Hola%2C%20quiero%20encontrar%20una%20cuidadora%20verificada%20para%20mi%20hijo';

  return (
    <header>
      {/* Top bar */}
      <div className="bg-indigo-900 px-6 py-2 text-center text-xs text-indigo-200">
        📍 Miraflores · San Isidro · Surco &nbsp;|&nbsp;
        <a href={waUrl} className="underline hover:text-white">
          WhatsApp: +51 933 208 395
        </a>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <Image
            src="/logo-nanago.png"
            alt="NanaGo"
            width={120}
            height={120}
            className="mx-auto mb-4"
            priority
          />
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
            Cuidado infantil verificado en Lima
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Cuidadoras verificadas para tu bebé —{' '}
            <span className="text-indigo-200">en 48 horas, no en semanas.</span>
          </h1>
          <p className="mt-6 text-lg text-indigo-100">
            Deja de buscar por WhatsApp. Recibe perfiles con antecedentes penales
            verificados, certificación técnica y reseñas reales de madres en tu zona.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={waUrl}
              className="rounded-xl bg-green-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-green-600"
            >
              💬 Agenda por WhatsApp
            </a>
            <a
              href="#formulario"
              className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/20"
            >
              Reserva acceso anticipado
            </a>
          </div>
        </div>
      </section>
    </header>
  );
}
