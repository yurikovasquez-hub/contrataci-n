"use client";

import { useState } from "react";
import { HeroCuidadoras } from "@/components/cuidadoras/HeroCuidadoras";
import { ValuePropsCuidadoras } from "@/components/cuidadoras/ValuePropsCuidadoras";
import { PricingTiers, type PlanSlug } from "@/components/cuidadoras/PricingTiers";
import { LeadFormCuidadoras } from "@/components/cuidadoras/LeadFormCuidadoras";
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
      <ValuePropsCuidadoras />
      <PricingTiers selectedPlan={selectedPlan} onSelectPlan={handleSelectPlan} />
      {selectedPlan && <LeadFormCuidadoras selectedPlan={selectedPlan} />}
      <footer className="py-8 text-center text-xs text-gray-400">
        ¿Eres familia buscando cuidadora?{" "}
        <Link href="/familias" className="underline hover:text-gray-600">
          Regístrate aquí
        </Link>
      </footer>
    </div>
  );
}
