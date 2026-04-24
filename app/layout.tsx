import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { MetaPixelProvider } from "@/components/shared/MetaPixelProvider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NanaGo — Cuidado infantil verificado en Lima",
  description:
    "Conectamos familias con cuidadoras verificadas y capacitadas en Miraflores, San Isidro y Surco.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
  return (
    <html lang="es">
      <body className={`${geist.className} bg-gray-50 antialiased`}>
        {pixelId && <MetaPixelProvider pixelId={pixelId} />}
        {children}
      </body>
    </html>
  );
}
