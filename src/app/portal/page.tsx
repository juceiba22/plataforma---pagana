import React from "react";
import type { Metadata } from "next";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalHeader from "@/components/portal/PortalHeader";
import CastCardsGrid from "@/components/portal/CastCardsGrid";
import RehearsalCalendar from "@/components/portal/RehearsalCalendar";

export const metadata: Metadata = {
  title: "Panel de Elenco & Cronograma • Fiesta Pagana",
  description:
    "Fichas de presentación de actores y personajes, gestor de fotos de elenco y calendario interactivo de ensayos de Fiesta Pagana.",
};

export default function PortalPage() {
  return (
    <div className="flex w-full min-h-screen bg-[#0b0b0e] text-[#f7f4eb] bg-noise">
      {/* Lateral Navigation Sidebar */}
      <PortalSidebar />

      {/* Main Portal View Area */}
      <div className="w-full lg:pl-72 flex flex-col min-h-screen">
        {/* Fixed Top Status Header */}
        <PortalHeader />

        {/* Dynamic Portal Main Content */}
        <main className="flex-grow pt-24 px-4 sm:px-8 lg:px-10 pb-16 space-y-12">
          {/* 1. Panel de Elenco & Tarjetas de Presentación / Personaje con Carga de Fotos */}
          <CastCardsGrid />

          {/* 2. Cronograma de Ensayos (Calendario Interactivo para Llenar) */}
          <RehearsalCalendar />
        </main>
      </div>
    </div>
  );
}
