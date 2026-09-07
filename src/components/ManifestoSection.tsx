"use client";

import React, { useState } from "react";
import { Sparkles, Flame, Ticket, Play, Quote } from "lucide-react";
import RitualModal from "./RitualModal";

export default function ManifestoSection() {
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);

  return (
    <section id="manifiesto-ritual" className="w-full bg-[#0b0b0e] py-20 lg:py-28 relative overflow-hidden bg-noise">
      {/* Background ambient center spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[25rem] bg-[#9e2a2b]/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-[#141419] border border-[#fabc4d]/40 p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-[0_0_50px_rgba(0,0,0,0.9)] bg-noise overflow-hidden">
          {/* Top gold icon */}
          <div className="w-14 h-14 rounded-full bg-[#9e2a2b]/30 border border-[#fabc4d] text-[#fabc4d] flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(250,188,77,0.3)]">
            <Flame className="w-7 h-7" />
          </div>

          <span className="font-jakarta text-xs uppercase tracking-[0.22em] text-[#fabc4d] font-bold block mb-3">
            El Fuego Sagrado • Compromiso Escénico
          </span>

          <h3 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl uppercase font-bold text-[#f7f4eb] mb-6 leading-tight">
            El Manifiesto de la Transmutación
          </h3>

          <blockquote className="font-jakarta text-base sm:text-xl text-[#efbf67] italic leading-relaxed max-w-2xl mx-auto mb-8 font-light">
            "No acudimos a la sala para olvidar la realidad, sino para encender en ella un fuego sagrado que consuma nuestras armaduras. El teatro es la fiesta donde lo profano y lo sagrado vuelven a estrecharse las manos."
          </blockquote>

          <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] max-w-xl mx-auto mb-8 leading-relaxed">
            Una propuesta escénica nacida del colectivo independiente de Buenos Aires que une psicomagia jodorowskiana, folclore experimental y teatro de la liberación.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsRitualModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase tracking-[0.16em] font-bold shadow-[0_0_24px_rgba(250,188,77,0.5)] hover:brightness-110 transition-all"
            >
              <Ticket className="w-4 h-4" />
              Adquirir Pase Ritual MMXXV
            </button>
          </div>
        </div>
      </div>

      <RitualModal isOpen={isRitualModalOpen} onClose={() => setIsRitualModalOpen(false)} />
    </section>
  );
}
