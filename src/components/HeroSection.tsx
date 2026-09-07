"use client";

import React, { useState } from "react";
import { Sparkles, Ticket, BookOpen, Flame } from "lucide-react";
import RitualModal from "./RitualModal";

export default function HeroSection() {
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#0e0e11] -mt-20 pt-36 sm:pt-44 pb-20 lg:pb-32 bg-noise">
      {/* Dynamic Ambient Background Aura */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[70rem] h-[35rem] rounded-full bg-[#9e2a2b] blur-[150px] mix-blend-screen opacity-50"></div>
        <div className="absolute -bottom-10 right-10 w-96 h-96 rounded-full bg-[#bd8718] blur-[130px] mix-blend-screen opacity-40"></div>
        <div className="absolute top-1/3 left-10 w-80 h-80 rounded-full bg-[#e5a93c] blur-[120px] mix-blend-screen opacity-20"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Ritual Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1f1f22]/90 border border-[#fabc4d]/40 text-[#fabc4d] shadow-[0_0_20px_rgba(250,188,77,0.25)] mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-[#fabc4d]" />
            <span className="font-jakarta text-xs uppercase tracking-[0.2em] font-bold">
              OBRA TEATRAL RITUAL & FARSA FILOSÓFICA • BUENOS AIRES
            </span>
            <Sparkles className="w-4 h-4 text-[#fabc4d]" />
          </div>

          {/* Monumental Hero Headline */}
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-wider text-[#f7f4eb] mb-5 drop-shadow-[0_4px_35px_rgba(158,42,43,0.7)] leading-[1.05] font-extrabold">
            Fiesta Pagana en Teatros
          </h1>

          {/* Subtitle with Crimson Dots */}
          <p className="font-jakarta text-xs sm:text-sm md:text-base text-[#ffb3ae] font-semibold tracking-wider uppercase max-w-xl mb-6">
            Teatro foro <span className="text-[#fabc4d] font-bold mx-1.5">•</span> Bandoneón & Bombo Legüero{" "}
            <span className="text-[#fabc4d] font-bold mx-1.5">•</span> Grotesco Criollo & Rock
          </p>

          {/* Core Descriptive Text */}
          <p className="font-jakarta text-base sm:text-lg md:text-xl text-[#dfbfbc] max-w-2xl mb-10 leading-relaxed font-normal">
            Un acto escénico en donde la Argentina se mira al espejo: la manzana en el centro del altar, el niño que digitó el código 616, el show televisivo de la libertad, el reclamo de la Salamanca criolla y la revelación del secreto primordial de <em>Argentum</em>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <a
              href="https://www.alternativateatral.com/obra102861-fiesta-pagana-una-obra-para-rescatarnos-del-olvido"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#9e2a2b] text-[#f7f4eb] font-jakarta text-xs uppercase tracking-[0.18em] font-bold shadow-[0_0_30px_rgba(158,42,43,0.7)] hover:bg-[#c1383a] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border-t border-white/25"
            >
              <Ticket className="w-4 h-4 text-[#fabc4d]" />
              Conseguir Entradas
            </a>

            <a
              href="#textos-sagrados"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#1f1f22]/90 border border-[#fabc4d]/30 text-[#fabc4d] hover:bg-[#2a2a2d] hover:text-[#f7f4eb] font-jakarta text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              <BookOpen className="w-4 h-4 text-[#fabc4d]" />
              El Secreto de Argentum
            </a>
          </div>

          {/* Script Quote Pill */}
          <div className="mt-8 flex items-center gap-2 text-xs text-[#dfbfbc] bg-[#141419]/80 px-4 py-2 rounded-full border border-[#58413f]/40">
            <Flame className="w-3.5 h-3.5 text-[#fabc4d]" />
            <span className="font-jakarta text-[11px] tracking-wide">
              "Hazte de plata y espeja el oro de las alturas y verdaderamente serás un argentino."
            </span>
          </div>
        </div>

        {/* Quick Metrics Ribbon */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-[#141419]/80 border border-[#58413f]/40 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col items-center justify-center p-3 text-center border-r border-[#58413f]/20 last:border-none">
            <span className="font-jakarta text-[10px] sm:text-xs uppercase tracking-widest text-[#dfbfbc] font-medium">
              Estructura
            </span>
            <span className="font-epilogue text-sm sm:text-base md:text-lg text-[#f7f4eb] font-semibold mt-1">
              10 Escenas & Himno
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 text-center border-r border-[#58413f]/20 last:border-none">
            <span className="font-jakarta text-[10px] sm:text-xs uppercase tracking-widest text-[#dfbfbc] font-medium">
              Universo Dramático
            </span>
            <span className="font-epilogue text-sm sm:text-base md:text-lg text-[#efbf67] font-semibold mt-1">
              Grotesco, Mito & Farsa
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 text-center border-r border-[#58413f]/20 last:border-none">
            <span className="font-jakarta text-[10px] sm:text-xs uppercase tracking-widest text-[#dfbfbc] font-medium">
              Música Escénica
            </span>
            <span className="font-epilogue text-sm sm:text-base md:text-lg text-[#f7f4eb] font-semibold mt-1">
              Bandoneón, Coplas & Rock
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 text-center">
            <span className="font-jakarta text-[10px] sm:text-xs uppercase tracking-widest text-[#dfbfbc] font-medium">
              Boletería
            </span>
            <span className="font-epilogue text-sm sm:text-base md:text-lg text-[#ffb3ae] font-semibold mt-1">
              Alternativa Teatral
            </span>
          </div>
        </div>
      </div>

      {/* Ticketing Modal */}
      <RitualModal isOpen={isRitualModalOpen} onClose={() => setIsRitualModalOpen(false)} />
    </section>
  );
}
