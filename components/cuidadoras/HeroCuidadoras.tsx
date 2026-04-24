export function HeroCuidadoras() {
  const waUrl =
    'https://wa.me/51933208395?text=Hola%2C%20quiero%20registrarme%20como%20cuidadora%20en%20NanaGo';

  return (
    <header>
      {/* Top bar */}
      <div className="bg-emerald-900 px-6 py-2 text-center text-xs text-emerald-200">
        📍 Miraflores · San Isidro · Surco &nbsp;|&nbsp;
        <a href={waUrl} className="underline hover:text-white">
          WhatsApp: +51 933 208 395
        </a>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
            Para técnicas en enfermería y cuidado infantil
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Tu certificación como ventaja —{' '}
            <span className="text-emerald-200">familias verificadas en tu zona te buscan.</span>
          </h1>
          <p className="mt-6 text-lg text-emerald-100">
            Deja de depender de recomendaciones. Publica tu perfil verificado y accede
            a familias activas en Miraflores, San Isidro y Surco que valoran tu formación.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={waUrl}
              className="rounded-xl bg-green-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-green-600"
            >
              💬 Consulta por WhatsApp
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
    </header>
  );
}
