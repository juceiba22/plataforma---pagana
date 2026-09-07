import React from "react";
import HeroSection from "@/components/HeroSection";
import FormatSelector from "@/components/FormatSelector";
import CharacterGrid from "@/components/CharacterGrid";
import SacredTextsSection from "@/components/SacredTextsSection";
import ScheduleSection from "@/components/ScheduleSection";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full bg-[#0b0b0e] text-[#f7f4eb] overflow-hidden">
      {/* 1. Monumental Hero Section */}
      <HeroSection />

      {/* 2. Formatos Escénicos: La Puesta en Escena & 10 Escenas del Guión */}
      <FormatSelector />

      {/* 3. Grilla de Personajes de la Obra */}
      <CharacterGrid />

      {/* 4. Sección de Textos Sagrados & Monólogos Clave */}
      <SacredTextsSection />

      {/* 5. Próximas Fechas & Boletos (Alternativa Teatral) */}
      <ScheduleSection />
    </div>
  );
}
