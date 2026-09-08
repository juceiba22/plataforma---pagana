import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StreamingForum from "@/components/comunidad/StreamingForum";
import ActorGate from "@/components/ActorGate";

export const metadata: Metadata = {
  title: "Ágora & Foro de Actores • Fiesta Pagana",
  description:
    "Foro de debate interno y análisis escénico sobre las transmisiones, ensayos y clases de Fiesta Pagana.",
};

export default function CommunityPage() {
  return (
    <div className="flex flex-col w-full bg-[#0b0b0e] text-[#f7f4eb] overflow-hidden min-h-screen bg-noise">
      {/* Platform Public Navbar */}
      <Navbar />

      {/* Main Streaming Forum Content Gated for Actors */}
      <main className="flex-grow pt-28 pb-16">
        <ActorGate
          sectionTitle="Esta sección está restringida exclusivamente al staff de actores"
          sectionSubtitle="El Ágora de Foros y debates escénicos es un espacio de intercambio reservado exclusivamente para el staff de actores, artistas y equipo técnico de Fiesta Pagana."
        >
          <StreamingForum />
        </ActorGate>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
