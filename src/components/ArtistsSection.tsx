"use client";

import React from "react";
import { Sparkles, Music, Disc3, Radio, Flame, ExternalLink, AudioWaveform } from "lucide-react";

export default function ArtistsSection() {
  return (
    <section className="w-full bg-[#131316] py-20 lg:py-32 relative overflow-hidden bg-noise">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fabc4d]/10 border border-[#fabc4d]/30 text-[#fabc4d] text-xs uppercase tracking-[0.2em] font-bold mb-3">
            <Radio className="w-3.5 h-3.5" />
            <span>Música & Alquimia Sonora</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#f7f4eb] uppercase font-bold tracking-tight">
            Artistas & Ensamble Escénico
          </h2>
          <p className="font-jakarta text-sm sm:text-base text-[#dfbfbc] mt-2 leading-relaxed">
            Compositores e intérpretes que tejen la atmósfera del guión a través del folclore del norte, el bandoneón procesado y el rock nacional.
          </p>
        </div>

        {/* Artists 2-Col Grid (Clean acoustic stage cards without mock images) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Artist 1: Ninio Ancestral */}
          <div className="group relative rounded-2xl overflow-hidden bg-[#141419] border border-[#58413f]/40 hover:border-[#fabc4d]/50 transition-all duration-500 shadow-xl flex flex-col justify-between p-6 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb3ae] animate-ping"></span>
                  <span className="font-jakarta text-xs text-[#ffb3ae] uppercase tracking-widest font-semibold">
                    Canto de Trance & Cajas Copleras
                  </span>
                </div>
                <span className="px-3 py-1 rounded bg-[#0b0b0e] text-[#fabc4d] font-jakarta text-xs uppercase tracking-wider font-bold border border-[#fabc4d]/30">
                  Folclore & Puna
                </span>
              </div>

              <div className="py-4">
                <h3 className="font-cinzel text-2xl sm:text-3xl text-[#f7f4eb] font-bold uppercase tracking-wide group-hover:text-[#fabc4d] transition-colors">
                  Ninio Ancestral
                </h3>
                <p className="font-jakarta text-xs text-[#efbf67] mt-1 font-medium">
                  Coplas de la Puna & Bombo Legüero
                </p>
              </div>

              <p className="font-jakarta text-sm text-[#dfbfbc] leading-relaxed">
                Propuesta telúrica que encarna el canto de la comparsa en la Escena 7 (<em>"Somos los indios del norte, no nos vamos a olvidar"</em>). Su ensamble fusiona cajas copleras, charango distorsionado y bombos legüeros con pulsaciones rituales.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-[#58413f]/30 flex items-center justify-between text-[#fabc4d] text-xs uppercase font-semibold">
              <span className="font-jakarta tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                Percusión & Canto Andino
              </span>
              <Music className="w-4 h-4" />
            </div>
          </div>

          {/* Artist 2: Olmo Masini */}
          <div className="group relative rounded-2xl overflow-hidden bg-[#141419] border border-[#58413f]/40 hover:border-[#fabc4d]/50 transition-all duration-500 shadow-xl flex flex-col justify-between p-6 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fabc4d] animate-ping"></span>
                  <span className="font-jakarta text-xs text-[#fabc4d] uppercase tracking-widest font-semibold">
                    Dirección Musical
                  </span>
                </div>
                <span className="px-3 py-1 rounded bg-[#0b0b0e] text-[#fabc4d] font-jakarta text-xs uppercase tracking-wider font-bold border border-[#fabc4d]/30">
                  Bandoneón Experimental
                </span>
              </div>

              <div className="py-4">
                <h3 className="font-cinzel text-2xl sm:text-3xl text-[#f7f4eb] font-bold uppercase tracking-wide group-hover:text-[#fabc4d] transition-colors">
                  Olmo Masini
                </h3>
                <p className="font-jakarta text-xs text-[#efbf67] mt-1 font-medium">
                  Fuelle Ritual & Drones Electroacústicos
                </p>
              </div>

              <p className="font-jakarta text-sm text-[#dfbfbc] leading-relaxed">
                Compositor del espacio sonoro del guión. A través de pedales de reverberación cavernosa y modulaciones microtonales, su bandoneón acompaña el lamento inicial de las Cantoras, el bloque de los Musicardi y la elevación final de Argentum.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-[#58413f]/30 flex items-center justify-between text-[#fabc4d] text-xs uppercase font-semibold">
              <span className="font-jakarta tracking-wider flex items-center gap-1.5">
                <Disc3 className="w-4 h-4" />
                Fuelle & Paisaje Sonoro
              </span>
              <Music className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
