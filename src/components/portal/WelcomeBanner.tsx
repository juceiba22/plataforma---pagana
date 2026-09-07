"use client";

import React from "react";
import { Users, Radio, MessageSquare, Quote, Sparkles } from "lucide-react";

interface WelcomeBannerProps {
  onOpenStreaming?: () => void;
  onOpenForums?: () => void;
}

export default function WelcomeBanner({ onOpenStreaming, onOpenForums }: WelcomeBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#141419] border border-[#58413f]/40 shadow-xl p-6 sm:p-8 bg-noise">
      {/* Background ambient lighting */}
      <div className="absolute -right-16 -top-16 w-96 h-96 bg-[#9e2a2b]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#fabc4d]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Left Column: Welcome manifesto and actions */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#9e2a2b]/30 border border-[#9e2a2b]/50 text-[#ffb3ae] font-jakarta text-[11px] uppercase tracking-widest font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ffb3ae] animate-ping"></span>
              Portal Exclusivo de Compañía
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#1f1f22] text-[#fabc4d] font-jakarta text-[11px] uppercase tracking-widest font-semibold border border-[#fabc4d]/30">
              <Users className="w-3.5 h-3.5" />
              Elenco Activo (24 Artistas en Escena)
            </span>

            <span className="text-[#a78a88] text-[11px] font-jakarta tracking-wider font-semibold uppercase">
              TEMP. VERANO // BUENOS AIRES
            </span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#f7f4eb] tracking-tight font-bold mt-1">
            Rito, Sudor y Catarsis Colectiva
          </h1>

          <p className="font-jakarta text-sm sm:text-base text-[#dfbfbc] leading-relaxed">
            Bienvenidxs al santuario de preparación de{" "}
            <span className="text-[#efbf67] font-semibold">Fiesta Pagana</span>. El fuego del foro requiere rigor, presencia física despojada y entrega total al dispositivo escénico.
          </p>

          {/* Quick Access Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#sala-streaming"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-jakarta text-xs tracking-wider uppercase font-bold transition-all duration-300 shadow-[0_0_20px_rgba(158,42,43,0.4)] border-t border-white/20"
            >
              <Radio className="w-4 h-4 text-[#fabc4d]" />
              Ingresar a Sala de Streaming
            </a>

            <a
              href="#foros-comunidad"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1f1f22] border border-[#58413f]/40 text-[#f7f4eb] hover:text-[#fabc4d] hover:border-[#fabc4d]/40 transition-all font-jakarta text-xs tracking-wider uppercase font-semibold"
            >
              <MessageSquare className="w-4 h-4 text-[#fabc4d]" />
              Ir a Foros de Debate
            </a>
          </div>
        </div>

        {/* Right Column: Director Note Card */}
        <div className="w-full lg:w-96 rounded-2xl bg-[#0b0b0e] border border-[#fabc4d]/30 p-5 shadow-xl flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img
              alt="Director General"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#9e2a2b] shadow-md"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4AxDnqmXvbMLeNcWb4KsMTGKpwwJfWzqcK39TJfLpkd9jPgElmdZOsH8KAUIyVUiPwl3SvwrL20QMmNZwpxGuXvm5JG45VJb75VRinFbHGzwjsOcnhQUpTBINvysbCEfien4VKhYAcAWuKt6sK3GSa28UpB3FSBhxEsHcv5AWjMQF-hhjvqKhxTFPVIGk-AdUBRRTvGSJ0loFb--BrrOIsZX5LqfJeReIvu2risbDyKwQKTWozzy__w"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-jakarta text-[10px] text-[#efbf67] uppercase tracking-wider font-bold">
                Palabra de Dirección
              </span>
              <span className="font-cinzel text-base text-[#f7f4eb] truncate font-bold">
                Lisandro Valenzuela
              </span>
              <span className="font-jakarta text-xs text-[#a78a88]">
                Puesta & Dramaturgia
              </span>
            </div>
          </div>

          <div className="relative bg-[#141419] p-4 rounded-xl border border-[#58413f]/30">
            <p className="font-jakarta text-xs text-[#dfbfbc] italic leading-relaxed">
              “Hoy no ensayamos teatro representativo; activamos psicomagia pura. Afinen el pulso del bombo legüero con la respiración del compañero.”
            </p>
            <span className="block text-right font-jakarta text-[10px] text-[#fabc4d] pt-2 tracking-widest uppercase font-semibold">
              09:30 AM • Sala Abasto
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
