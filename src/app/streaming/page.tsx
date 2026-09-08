import React from "react";
import type { Metadata } from "next";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalHeader from "@/components/portal/PortalHeader";
import LiveStagePlayer from "@/components/streaming/LiveStagePlayer";
import AgoraChat from "@/components/streaming/AgoraChat";
import AcademyArchive from "@/components/streaming/AcademyArchive";
import LearningProgressStrip from "@/components/streaming/LearningProgressStrip";
import ActorGate from "@/components/ActorGate";

export const metadata: Metadata = {
  title: "Sala de Actores & Streaming • Fiesta Pagana",
  description:
    "Transmisiones en vivo, masterclasses de iluminación y psicomagia, ágora del elenco y biblioteca de ensayos de Fiesta Pagana.",
};

export default function StreamingPage() {
  return (
    <ActorGate
      sectionTitle="Esta sección está restringida exclusivamente al staff de actores"
      sectionSubtitle="Este recinto contiene los ensayos en streaming en vivo, clases maestras y archivo de video reservado exclusivamente para los actores, artistas y equipo técnico de Fiesta Pagana."
    >
      <div className="flex w-full min-h-screen bg-[#0b0b0e] text-[#f7f4eb] bg-noise">
        {/* Lateral Navigation Sidebar */}
        <PortalSidebar />

        {/* Main Streaming Area */}
        <div className="w-full lg:pl-72 flex flex-col min-h-screen">
          {/* Top Status Header */}
          <PortalHeader />

          {/* Dynamic Streaming & Laboratory Content */}
          <main className="flex-grow pt-24 px-4 sm:px-8 lg:px-10 pb-16 space-y-12">
            {/* Dynamic Ritual Backdrop */}
            <div className="relative w-full">
              <div className="absolute -top-32 right-1/4 w-[36rem] h-[36rem] bg-[#9e2a2b]/15 rounded-full blur-[140px] pointer-events-none"></div>
              <div className="absolute top-96 left-10 w-96 h-96 bg-[#bd8718]/10 rounded-full blur-[120px] pointer-events-none"></div>

              {/* 1. Live Stage Grid (Player + Live Chat Module) */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left 8 Cols: Video Player & Instructor Dossier */}
                <div className="xl:col-span-8">
                  <LiveStagePlayer />
                </div>

                {/* Right 4 Cols: Live Agora Chat */}
                <div className="xl:col-span-4">
                  <AgoraChat />
                </div>
              </div>
            </div>

            {/* 2. On-Demand Academy & Rehearsal Archive Section */}
            <AcademyArchive />

            {/* 3. Theatrical Learning Progress & Sacred Statistics Strip */}
            <LearningProgressStrip />
          </main>
        </div>
      </div>
    </ActorGate>
  );
}
