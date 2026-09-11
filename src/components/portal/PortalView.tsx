"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalHeader from "@/components/portal/PortalHeader";
import CastCardsGrid from "@/components/portal/CastCardsGrid";
import RehearsalCalendar from "@/components/portal/RehearsalCalendar";
import DepartmentWorkspaces from "@/components/portal/DepartmentWorkspaces";
import StaffApprovalPanel from "@/components/portal/StaffApprovalPanel";
import ActorGate from "@/components/ActorGate";
import AccessModal from "@/components/AccessModal";

export default function PortalView() {
  const { isAdmin } = useAuth();
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  return (
    <ActorGate
      sectionTitle="Esta sección está restringida exclusivamente al staff de actores"
      sectionSubtitle="El Portal de Elenco contiene el cronograma confidencial de ensayos, fichas de personajes, mesas de dirección y partituras reservados para el elenco y producción de Fiesta Pagana."
    >
      <div className="flex w-full min-h-screen bg-[#0b0b0e] text-[#f7f4eb] bg-noise">
        {/* Lateral Navigation Sidebar */}
        <PortalSidebar />

        {/* Main Portal View Area */}
        <div className="w-full lg:pl-72 flex flex-col min-h-screen">
          {/* Fixed Top Status Header */}
          <PortalHeader />

          {/* Dynamic Portal Main Content */}
          <main className="flex-grow pt-24 px-4 sm:px-8 lg:px-10 pb-16 space-y-10">
            {/* 1. Admin Staff Approval Panel (Only shown to Admin users) */}
            {isAdmin && <StaffApprovalPanel />}

            {/* 2. Panel de Elenco & Tarjetas de Presentación / Personaje con Carga de Fotos */}
            <CastCardsGrid />

            {/* 3. Cronograma de Ensayos (Calendario Interactivo para Llenar) */}
            <RehearsalCalendar />

            {/* 4. Mesas de Trabajo por Departamento (Vestuario, Dramaturgia, Música, Técnica & Luces) */}
            <DepartmentWorkspaces />
          </main>
        </div>

        <AccessModal isOpen={isAccessModalOpen} onClose={() => setIsAccessModalOpen(false)} />
      </div>
    </ActorGate>
  );
}
