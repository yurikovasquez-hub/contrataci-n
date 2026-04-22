import { HeroFamilias } from "@/components/familias/HeroFamilias";
import { ValuePropsFamilias } from "@/components/familias/ValuePropsFamilias";
import { LeadFormFamilias } from "@/components/familias/LeadFormFamilias";
import Link from "next/link";

export const metadata = {
  title: "PROYECTO para Familias — Cuidadoras verificadas en 48h",
  description:
    "Encuentra cuidadoras con antecedentes verificados y certificación técnica en Miraflores, San Isidro y Surco.",
};

export default function FamiliasPage() {
  return (
    <div className="min-h-screen">
      <HeroFamilias />
      <ValuePropsFamilias />
      <LeadFormFamilias />
      <footer className="py-8 text-center text-xs text-gray-400">
        ¿Eres cuidadora?{" "}
        <Link href="/cuidadoras" className="underline hover:text-gray-600">
          Regístrate aquí
        </Link>
      </footer>
    </div>
  );
}
