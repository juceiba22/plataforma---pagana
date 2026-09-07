"use client";

import React from "react";
import { Sparkles, Shield, Bell } from "lucide-react";

export default function PortalHeader() {
  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-20 bg-[#0e0e11]/90 backdrop-blur-md border-b border-[#58413f]/30 z-30 px-4 sm:px-8 flex items-center justify-between bg-noise">
      {/* Live status banner */}
      <div className="flex items-center gap-2.5 pl-12 lg:pl-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#9e2a2b] animate-pulse"></span>
        <span className="font-jakarta text-[11px] sm:text-xs text-[#dfbfbc] uppercase tracking-[0.16em] font-semibold">
          SALA VIRTUAL ACTIVA • TEMPORADA ENERO-MARZO
        </span>
      </div>

      {/* Right status & Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9e2a2b]/20 border border-[#9e2a2b] text-[#ffb3ae] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <span className="w-2 h-2 rounded-full bg-[#fabc4d] animate-pulse"></span>
          <span className="font-jakarta text-xs tracking-wider uppercase font-semibold text-[#ffdad7]">
            Modo Elenco Privilegiado
          </span>
        </div>

        <img
          alt="Profile"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-[#fabc4d]/50 shadow-[0_0_12px_rgba(250,188,77,0.3)]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4AxDnqmXvbMLeNcWb4KsMTGKpwwJfWzqcK39TJfLpkd9jPgElmdZOsH8KAUIyVUiPwl3SvwrL20QMmNZwpxGuXvm5JG45VJb75VRinFbHGzwjsOcnhQUpTBINvysbCEfien4VKhYAcAWuKt6sK3GSa28UpB3FSBhxEsHcv5AWjMQF-hhjvqKhxTFPVIGk-AdUBRRTvGSJ0loFb--BrrOIsZX5LqfJeReIvu2risbDyKwQKTWozzy__w"
        />
      </div>
    </header>
  );
}
