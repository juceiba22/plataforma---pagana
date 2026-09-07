import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StreamingForum from "@/components/comunidad/StreamingForum";

export const metadata: Metadata = {
  title: "Ágora & Foro de Transmisiones • Fiesta Pagana",
  description:
    "Foro de debate y análisis escénico sobre las transmisiones, ensayos y clases de Fiesta Pagana.",
};

export default function CommunityPage() {
  return (
    <div className="flex flex-col w-full bg-[#0b0b0e] text-[#f7f4eb] overflow-hidden min-h-screen bg-noise">
      {/* Platform Public Navbar */}
      <Navbar />

      {/* Main Streaming Forum Content */}
      <main className="flex-grow pt-28 pb-16">
        <StreamingForum />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
