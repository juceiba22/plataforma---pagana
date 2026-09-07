"use client";

import React from "react";
import { Sparkles, Music, Disc3, Radio, Flame, ExternalLink } from "lucide-react";

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
            Artistas Destacados
          </h2>
          <p className="font-jakarta text-sm sm:text-base text-[#dfbfbc] mt-2 leading-relaxed">
            Compositores e intérpretes que tejen el tapiz místico de cada función a través del folclore oscuro y la pulsación contemporánea.
          </p>
        </div>

        {/* Artists 2-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Artist 1: Ninio Ancestral */}
          <div className="group relative rounded-2xl overflow-hidden bg-[#141419] border border-[#58413f]/40 hover:border-[#fabc4d]/50 transition-all duration-500 shadow-xl flex flex-col justify-between">
            <div className="relative h-80 w-full overflow-hidden bg-[#0b0b0e]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter saturate-90 group-hover:saturate-105"
                alt="Ninio Ancestral - Folclore y beat urbano"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPStdwIZHlBiVIZjUR8gBS3kWa5k-4kQ1DSd-A53kwvwW76um7wYebIszzWgq_8Q1lB2eVnaAQddSqLEqD1fKBnw6LSuy-3MLZxgzy2hX1y5VANK6AxZeO4o8jctgBaJjoeSJx1pj-KNCnzC4bkzItMXfzB7pd_93bvLRhfK75jcTBQNr1fnP6GHTY_90dtVcZTenrkMJKi1VnMxwVk3-mt3gl61nqMmn6psjernnBSbgLMO-guFEyQg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-[#141419]/40 to-transparent"></div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded bg-[#0b0b0e]/85 backdrop-blur-sm text-[#fabc4d] font-jakarta text-xs uppercase tracking-wider font-bold border border-[#fabc4d]/30">
                Folclore • Beat Urbano
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 relative -mt-8 bg-[#141419]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffb3ae] animate-ping"></span>
                <span className="font-jakarta text-xs text-[#ffb3ae] uppercase tracking-widest font-semibold">
                  Residencia 2025
                </span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl text-[#f7f4eb] font-bold uppercase tracking-wide group-hover:text-[#fabc4d] transition-colors">
                Ninio Ancestral
              </h3>

              <p className="font-jakarta text-sm text-[#dfbfbc] leading-relaxed">
                Propuesta telúrica nacida en las quebradas andinas y procesada en las cavernas electrónicas de Buenos Aires. Su ensamble entrelaza cajas copleras, charango distorsionado y bombos legüeros con arpegios de sintetizador análogo, induciendo un trance comunal irresistible.
              </p>

              <div className="pt-4 border-t border-[#58413f]/30 flex items-center justify-between text-[#fabc4d] text-xs uppercase font-semibold">
                <span className="font-jakarta tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  Canto de Transe & Percusión
                </span>
                <Music className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Artist 2: Olmo Masini */}
          <div className="group relative rounded-2xl overflow-hidden bg-[#141419] border border-[#58413f]/40 hover:border-[#fabc4d]/50 transition-all duration-500 shadow-xl flex flex-col justify-between">
            <div className="relative h-80 w-full overflow-hidden bg-[#0b0b0e]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter saturate-90 group-hover:saturate-105"
                alt="Olmo Masini - Bandoneón Experimental"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_qI7wedtuzwUDFiPl0orwr1kuI7zetAzNC4vUNZlGkt9Tub8--Vn4OWLXFAQc7he0atj5wnrWbBo2AjV4tB5lt0FWv4Ey_r_NXlnRBpYjjajSp2V00is96CEUHbaF1U4LHtqVk-hacpWkUuZAF2yn3UzPnSDOgzrmSacnxK5m-j6rwE0aPpkjnQijhyoq4xd1aMJR47dnzQLn7_FRBysFR4_No0owzJicgrxgZ7uqt_kt7u-t9eLOIA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-[#141419]/40 to-transparent"></div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded bg-[#0b0b0e]/85 backdrop-blur-sm text-[#fabc4d] font-jakarta text-xs uppercase tracking-wider font-bold border border-[#fabc4d]/30">
                Bandoneón Experimental
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 relative -mt-8 bg-[#141419]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#fabc4d] animate-ping"></span>
                <span className="font-jakarta text-xs text-[#fabc4d] uppercase tracking-widest font-semibold">
                  Director Musical
                </span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl text-[#f7f4eb] font-bold uppercase tracking-wide group-hover:text-[#fabc4d] transition-colors">
                Olmo Masini
              </h3>

              <p className="font-jakarta text-sm text-[#dfbfbc] leading-relaxed">
                Virtuoso del fuelle rioplatense que reimagina el tango arrabalero como una invocación pagana. A través de pedales de reverberación cavernosa y modulaciones microtonales, su bandoneón respira como una criatura viva que guía la transición dramatúrgica del drama a la fiesta.
              </p>

              <div className="pt-4 border-t border-[#58413f]/30 flex items-center justify-between text-[#fabc4d] text-xs uppercase font-semibold">
                <span className="font-jakarta tracking-wider flex items-center gap-1.5">
                  <Disc3 className="w-4 h-4" />
                  Fuelle Ritual & Drones
                </span>
                <Music className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
