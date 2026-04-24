"use client";

import { useState } from "react";
import { HeroCuidadoras } from "@/components/cuidadoras/HeroCuidadoras";
import { PilaresCuidadoras } from "@/components/cuidadoras/PilaresCuidadoras";
import { CuandoRegistrarseCuidadoras } from "@/components/cuidadoras/CuandoRegistrarseCuidadoras";
import { TestimoniosCuidadoras } from "@/components/cuidadoras/TestimoniosCuidadoras";
import { QueIncluyeCuidadoras } from "@/components/cuidadoras/QueIncluyeCuidadoras";
import { PricingTiers, type PlanSlug } from "@/components/cuidadoras/PricingTiers";
import { LeadFormCuidadoras } from "@/components/cuidadoras/LeadFormCuidadoras";
import { CTAFinalCuidadoras } from "@/components/cuidadoras/CTAFinalCuidadoras";
import Link from "next/link";

export default function CuidadorasPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanSlug | null>(null);

  function handleSelectPlan(plan: PlanSlug) {
    setSelectedPlan(plan);
    setTimeout(() => {
      document.getElementById("formulario-cuidadora")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }

  return (
    <div className="min-h-screen">
      <HeroCuidadoras />
      <PilaresCuidadoras />
      <CuandoRegistrarseCuidadoras />
      <TestimoniosCuidadoras />
      <QueIncluyeCuidadoras />
      <div id="planes">
        <PricingTiers selectedPlan={selectedPlan} onSelectPlan={handleSelectPlan} />
      </div>
      {selectedPlan && <LeadFormCuidadoras selectedPlan={selectedPlan} />}
      <CTAFinalCuidadoras />
      <footer className="py-8 text-center text-xs text-gray-400">
        ¿Eres familia buscando cuidadora?{" "}
        <Link href="/familias" className="underline hover:text-gray-600">
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
