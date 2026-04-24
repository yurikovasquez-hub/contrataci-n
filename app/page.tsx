import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">NanaGo</h1>
        <p className="mt-2 text-gray-500">Cuidado infantil verificado en Lima</p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/familias"
          className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-700"
        >
          Soy familia →
        </Link>
        <Link
          href="/cuidadoras"
          className="rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
        >
          Soy cuidadora →
        </Link>
      </div>
    </main>
  );
}
