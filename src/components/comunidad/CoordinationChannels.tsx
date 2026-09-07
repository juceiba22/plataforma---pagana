"use client";

import React from "react";
import { Users, Music, Theater, Brain, ArrowUpRight, MessageCircle, QrCode } from "lucide-react";

export default function CoordinationChannels() {
  const channels = [
    {
      id: "general",
      category: "General",
      categoryColor: "bg-[#9e2a2b]/30 text-[#ffb3ae] border-[#9e2a2b]/40",
      icon: <Users className="w-5 h-5 text-[#fabc4d]" />,
      title: "Compañía • General",
      description: "Elenco completo, dramaturgia, producción ejecutiva y llamados de sala general.",
      link: "https://chat.whatsapp.com/",
    },
    {
      id: "sonoro",
      category: "Sonoro",
      categoryColor: "bg-[#bd8718]/30 text-[#fabc4d] border-[#bd8718]/40",
      icon: <Music className="w-5 h-5 text-[#fabc4d]" />,
      title: "Músicos & Bandas",
      description: "Ninio Ancestral, Olmo Masini, sets rituales de DJ y acoples de sonido electroacústico.",
      link: "https://chat.whatsapp.com/",
    },
    {
      id: "taller",
      category: "Taller",
      categoryColor: "bg-[#9e2a2b]/30 text-[#ffb3ae] border-[#9e2a2b]/40",
      icon: <Theater className="w-5 h-5 text-[#fabc4d]" />,
      title: "Máscaras & Vestuario",
      description: "Artesanía de arcilla, resinas, confección textil, maquillaje ritual y mantenimiento.",
      link: "https://chat.whatsapp.com/",
    },
    {
      id: "dramaturgia",
      category: "Dramaturgia",
      categoryColor: "bg-[#704f00]/40 text-[#efbf67] border-[#704f00]",
      icon: <Brain className="w-5 h-5 text-[#fabc4d]" />,
      title: "Teatro-Foro & Rito",
      description: "Guiones de improvisación, mediación de catarsis y contención de espectadores en sala.",
      link: "https://chat.whatsapp.com/",
    },
  ];

  return (
    <section id="canales-whatsapp" className="w-full bg-[#131316] py-14 lg:py-20 bg-noise border-b border-[#58413f]/30">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-jakarta text-xs uppercase tracking-[0.2em] text-[#fabc4d] font-bold block mb-1">
              Comisiones Activas
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-[#f7f4eb] tracking-tight font-bold">
              Canales de Coordinación Directa
            </h2>
          </div>
          <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] max-w-md leading-relaxed">
            Escaneá el glifo QR o conectá directo vía enlace encriptado para acceder al flujo de ensayos y avisos urgentes.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {channels.map((chan) => (
            <div
              key={chan.id}
              className="bg-[#141419] border border-[#58413f]/40 p-6 rounded-2xl flex flex-col justify-between gap-5 shadow-lg hover:border-[#fabc4d]/50 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded border font-jakarta text-[10px] uppercase font-bold ${chan.categoryColor}`}
                  >
                    {chan.category}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#0b0b0e] flex items-center justify-center border border-[#58413f]/40 group-hover:border-[#fabc4d]/40 transition-colors">
                    {chan.icon}
                  </div>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-[#f7f4eb] group-hover:text-[#fabc4d] transition-colors">
                  {chan.title}
                </h3>

                <p className="font-jakarta text-xs text-[#dfbfbc] leading-relaxed">
                  {chan.description}
                </p>
              </div>

              {/* QR Glyph Visual */}
              <div className="flex flex-col items-center gap-4 pt-2">
                <div className="p-3 bg-[#0e0e11] rounded-xl border border-[#58413f]/40 shadow-inner group-hover:border-[#fabc4d]/40 transition-colors">
                  <svg className="w-28 h-28 text-[#f7f4eb]" fill="currentColor" viewBox="0 0 100 100">
                    <path d="M10 10h30v30h-30z M15 15v20h20v-20z M60 10h30v30h-30z M65 15v20h20v-20z M10 60h30v30h-30z M15 65v20h20v-20z M22 22h6v6h-6z M72 22h6v6h-6z M22 72h6v6h-6z M45 10h10v10h-10z M45 35h10v15h-10z M10 45h20v10h-20z M35 45h15v10h-15z M60 45h15v10h-15z M80 45h10v20h-10z M55 60h20v10h-20z M45 75h10v15h-10z M60 80h10v10h-10z M75 75h15v15h-15z"></path>
                  </svg>
                </div>

                <a
                  href={chan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-[#bd8718] hover:bg-[#fabc4d] text-[#281900] py-2.5 rounded-xl font-jakarta text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(250,188,77,0.3)] flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Unirse al Grupo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
