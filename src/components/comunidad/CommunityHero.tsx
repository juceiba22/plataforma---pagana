"use client";

import React from "react";
import { MessageSquarePlus, MessageCircle, Shield, Sparkles } from "lucide-react";

interface CommunityHeroProps {
  onOpenNewThread: () => void;
}

export default function CommunityHero({ onOpenNewThread }: CommunityHeroProps) {
  return (
    <div className="relative w-full overflow-hidden bg-[#0e0e11] py-12 lg:py-16 bg-noise border-b border-[#58413f]/30">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#9e2a2b]/20 blur-3xl"></div>
      <div className="pointer-events-none absolute left-10 bottom-0 h-64 w-64 rounded-full bg-[#bd8718]/10 blur-2xl"></div>

      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-6">
        {/* Top Confidentiality & Live status */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#fabc4d] animate-pulse"></span>
            <span className="font-jakarta text-xs text-[#efbf67] uppercase tracking-[0.2em] font-bold">
              Canales Vivos • Cónclave Interno
            </span>
          </div>

          <span className="font-jakarta text-[11px] text-[#dfbfbc] px-3 py-1 rounded-full bg-[#141419] border border-[#58413f]/50 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#ffb3ae]" />
            <span>Protocolo de Confidencialidad Nivel II</span>
          </span>
        </div>

        {/* Headline & CTAs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-2 max-w-3xl">
            <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl text-[#f7f4eb] tracking-tight font-extrabold leading-tight">
              Ágora Psicomágica
            </h1>
            <p className="font-epilogue text-lg sm:text-xl text-[#dfbfbc] font-light">
              Espacio de Debate, Catarsis y Conexión Operativa de la Compañía.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenNewThread}
              className="flex items-center gap-2 bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] px-6 py-3 rounded-xl shadow-xl shadow-[#9e2a2b]/20 transition-all font-jakarta text-xs uppercase font-bold tracking-wider border-t border-white/20"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#fabc4d]" />
              <span>Nuevo Hilo Ritual</span>
            </button>

            <a
              href="#canales-whatsapp"
              className="flex items-center gap-2 bg-[#141419] hover:bg-[#1f1f22] text-[#fabc4d] border border-[#58413f]/50 px-5 py-3 rounded-xl transition-colors font-jakarta text-xs uppercase font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Canales WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
