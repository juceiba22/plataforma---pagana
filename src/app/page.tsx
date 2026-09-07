import React from "react";
import HeroSection from "@/components/HeroSection";
import CharacterGrid from "@/components/CharacterGrid";
import SacredTextsSection from "@/components/SacredTextsSection";
import FormatSelector from "@/components/FormatSelector";
import ArtistsSection from "@/components/ArtistsSection";
import ReviewsSection from "@/components/ReviewsSection";
import ScheduleSection from "@/components/ScheduleSection";
import ManifestoSection from "@/components/ManifestoSection";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full bg-[#0b0b0e] text-[#f7f4eb] overflow-hidden">
      {/* 1. Monumental Hero Section with Cinzel Decorative Typography & Ambient Aura */}
      <HeroSection />

      {/* 2. Formatos Escénicos: Interactive Toggle (Formato Completo vs Versión Reducida) */}
      <FormatSelector />

      {/* 3. Grilla de Personajes del Ritual (Arquetipos Psicomágicos & Dossiers) */}
      <CharacterGrid />

      {/* 4. Sección de Textos Sagrados con Efecto de Velo / Desbloqueo Ritual */}
      <SacredTextsSection />

      {/* 5. Artistas Destacados & Alquimia Sonora (Ninio Ancestral & Olmo Masini) */}
      <ArtistsSection />

      {/* 6. Testimonios & Reseñas Teatrales (Alternativa Teatral 4.9/5) */}
      <ReviewsSection />

      {/* 7. Próximas Fechas & Boletos (Boletería Oficial) */}
      <ScheduleSection />

      {/* 8. Manifiesto de la Transmutación & Cierre Ceremonial */}
      <ManifestoSection />
    </div>
  );
}
