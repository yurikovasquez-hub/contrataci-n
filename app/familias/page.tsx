import { HeroFamilias } from "@/components/familias/HeroFamilias";
import { PilaresFamilias } from "@/components/familias/PilaresFamilias";
import { CuandoUsarFamilias } from "@/components/familias/CuandoUsarFamilias";
import { TestimoniosFamilias } from "@/components/familias/TestimoniosFamilias";
import { QueIncluyeFamilias } from "@/components/familias/QueIncluyeFamilias";
import { LeadFormFamilias } from "@/components/familias/LeadFormFamilias";
import { CTAFinalFamilias } from "@/components/familias/CTAFinalFamilias";
import Link from "next/link";

export const metadata = {
  title: "NanaGo para Familias — Cuidadoras verificadas en 48h",
  description:
    "Encuentra cuidadoras con antecedentes verificados y certificación técnica en Miraflores, San Isidro y Surco.",
};

export default function FamiliasPage() {
  return (
    <div className="min-h-screen">
      <HeroFamilias />
      <PilaresFamilias />
      <CuandoUsarFamilias />
      <TestimoniosFamilias />
      <QueIncluyeFamilias />
      <div id="formulario">
        <LeadFormFamilias />
      </div>
      <CTAFinalFamilias />
      <footer className="py-8 text-center text-xs text-gray-400">
        ¿Eres cuidadora?{" "}
        <Link href="/cuidadoras" className="underline hover:text-gray-600">
          Regístrate aquí
        </Link>
        {" · "}
        <Link href="/privacidad" className="underline hover:text-gray-600">
          Política de privacidad
        </Link>
      </footer>
    </div>
  );
}
