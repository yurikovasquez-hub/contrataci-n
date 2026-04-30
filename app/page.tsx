import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/4546199/4546199-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div>
          <Image
            src="/logo-nanago.png"
            alt="NanaGo"
            width={180}
            height={180}
            className="mx-auto drop-shadow-lg rounded-full"
            priority
          />
          <p className="mt-3 text-lg text-white/90 font-medium drop-shadow">
            Cuidado infantil verificado en Lima
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/familias"
            className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-700 shadow-lg"
          >
            Soy familia →
          </Link>
          <Link
            href="/cuidadoras"
            className="rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700 shadow-lg"
          >
            Soy cuidadora →
          </Link>
        </div>
      </div>
    </main>
  );
}
