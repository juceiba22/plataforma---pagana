"use client";

import React, { useState, useEffect } from "react";
import { Video, Download, Headphones, FileText, Sparkles, Flame, Check, Play, Film, Disc } from "lucide-react";

export interface VideoClass {
  id: string;
  category: "marechal" | "demonologia" | "comunicacion" | "luces";
  categoryLabel: string;
  duration: string;
  title: string;
  description: string;
  badgeBg: string;
  playbackId?: string;
  attachments: { name: string; type: "pdf" | "audio" | "image" }[];
}

export const SCRIPT_MASTERCLASSES: VideoClass[] = [
  {
    id: "1",
    category: "marechal",
    categoryLabel: "Dramaturgia & Mística",
    duration: "01:48:30",
    title: "La Batalla Celeste y Terrestre de Marechal",
    description:
      "Exploración de la poética mística de Leopoldo Marechal, la tensión entre lo divino y lo terrenal, el código 616 y la revelación del secreto de Argentum en el cuerpo del actor.",
    badgeBg: "bg-[#bd8718] text-[#281900]",
    playbackId: "DS00Spx1CV902MCtP7GsWm0147LnFiNo00k",
    attachments: [
      { name: "Guion_Batalla_Celeste_Marechal.pdf", type: "pdf" },
      { name: "Analisis_Metateatral_Argentum.pdf", type: "pdf" },
    ],
  },
  {
    id: "2",
    category: "demonologia",
    categoryLabel: "Mitología Criolla",
    duration: "02:15:10",
    title: "La Demonología Europea vs la Demonología Criolla",
    description:
      "El contraste entre el pacto notarial fáustico y el desborde carnavalesco de la Salamanca: por qué el hombre criollo libera el demonio antes de la Pascua y qué busca en esa libertad.",
    badgeBg: "bg-[#9e2a2b] text-[#f7f4eb]",
    playbackId: "DS00Spx1CV902MCtP7GsWm0147LnFiNo00k",
    attachments: [
      { name: "Bestiario_Salamanca_Carnaval.pdf", type: "pdf" },
      { name: "Canto_Coplas_del_Averno.wav", type: "audio" },
    ],
  },
  {
    id: "3",
    category: "comunicacion",
    categoryLabel: "Grotesco & Escena",
    duration: "01:35:45",
    title: "La Comunicación y las Escenas en Teatro",
    description:
      "Dinámicas de grotesco criollo en la familia Musicardi, el show televisivo de la libertad, la réplica obrera de Daiana y el pacto confidencial de Gabriel con la platea.",
    badgeBg: "bg-[#bd8718] text-[#281900]",
    playbackId: "DS00Spx1CV902MCtP7GsWm0147LnFiNo00k",
    attachments: [
      { name: "Manual_Grotesco_Musicardi.pdf", type: "pdf" },
      { name: "Partituras_Show_Televisivo.pdf", type: "pdf" },
    ],
  },
  {
    id: "4",
    category: "luces",
    categoryLabel: "Iluminación & Puesta",
    duration: "01:20:00",
    title: "La Técnica de Luces en Teatro",
    description:
      "Penumbras sobre la manzana oculta, cenitales exclusivos para Gabriel y la Madre, reflectores de show mediático para el Presentador y atmósfera de trance para la comparsa.",
    badgeBg: "bg-[#353438] text-[#f7f4eb]",
    playbackId: "DS00Spx1CV902MCtP7GsWm0147LnFiNo00k",
    attachments: [
      { name: "Planta_Luces_Manzana_Penumbras.pdf", type: "pdf" },
      { name: "Diagrama_Cenitales_Gabriel_Madre.png", type: "image" },
    ],
  },
];

export default function AcademyArchive() {
  const [filter, setFilter] = useState<string>("all");
  const [downloadedFile, setDownloadedFile] = useState<string | null>(null);
  const [selectedVideoModal, setSelectedVideoModal] = useState<VideoClass | null>(null);

  const filteredClasses =
    filter === "all"
      ? SCRIPT_MASTERCLASSES
      : SCRIPT_MASTERCLASSES.filter((c) => c.category === filter);

  const handleDownload = (name: string) => {
    setDownloadedFile(name);
    setTimeout(() => setDownloadedFile(null), 2000);
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Video className="w-4 h-4 text-[#fabc4d]" />
            <span className="font-jakarta text-xs text-[#efbf67] uppercase tracking-[0.2em] font-bold">
              Archivo MUX VOD • Grabaciones de Transmisiones
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-[#f7f4eb] tracking-tight font-bold">
            Biblioteca de Clases & Ensayos Grabados
          </h2>
          <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] mt-1 max-w-lg">
            Las emisiones y masterclasses grabadas en Mux quedan archivadas para repaso del elenco y consulta teórica de la comunidad.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none self-start md:self-auto">
          {[
            { id: "all", label: "Todas las Clases (4)" },
            { id: "marechal", label: "1. Batalla Celeste (Marechal)" },
            { id: "demonologia", label: "2. Demonología Criolla" },
            { id: "comunicacion", label: "3. Comunicación & Escenas" },
            { id: "luces", label: "4. Técnica de Luces" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilter(pill.id)}
              className={`px-4 py-2 rounded-full font-jakarta text-xs whitespace-nowrap transition-all ${
                filter === pill.id
                  ? "bg-[#9e2a2b] text-[#f7f4eb] font-bold shadow-[0_0_15px_rgba(158,42,43,0.5)]"
                  : "bg-[#141419] text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] border border-[#58413f]/40 font-semibold"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid (Clean frames with Mux VOD indicator and no mock images) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredClasses.map((item) => (
          <div
            key={item.id}
            className="flex flex-col rounded-2xl bg-[#141419] border border-[#58413f]/40 overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-xl group hover:border-[#fabc4d]/40"
          >
            {/* Clean Video Stage Card Header (Empty/Stylized without mock image) */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#09090c] flex flex-col items-center justify-center p-4 border-b border-[#58413f]/30">
              <div className="w-12 h-12 rounded-2xl bg-[#141419] border border-[#58413f] flex items-center justify-center text-[#fabc4d] group-hover:scale-110 transition-transform shadow-inner">
                <Film className="w-6 h-6 opacity-75 group-hover:opacity-100" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-transparent to-transparent pointer-events-none"></div>

              {/* Play Overlay Button */}
              <button
                onClick={() => setSelectedVideoModal(item)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 backdrop-blur-xs transition-opacity cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#9e2a2b] border border-[#fabc4d] flex items-center justify-center text-[#fabc4d] shadow-[0_0_15px_rgba(250,188,77,0.5)]">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </button>

              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#0b0b0e]/90 text-[#f7f4eb] font-jakarta text-[10px] backdrop-blur-md border border-[#58413f]/40">
                {item.duration}
              </span>

              <span
                className={`absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded font-jakarta text-[10px] font-bold uppercase ${item.badgeBg}`}
              >
                {item.categoryLabel}
              </span>
            </div>

            {/* Content info */}
            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
              <div>
                <h3 className="font-cinzel text-base font-bold text-[#f7f4eb] group-hover:text-[#fabc4d] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="font-jakarta text-xs text-[#dfbfbc] mt-2 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Downloadable Attachments */}
              <div className="p-3 rounded-xl bg-[#0b0b0e] border border-[#58413f]/30 flex flex-col gap-1.5">
                <span className="font-jakarta text-[10px] text-[#efbf67] font-bold uppercase tracking-wider flex items-center gap-1">
                  <FileText className="w-3 h-3 text-[#fabc4d]" />
                  Materiales del Guión
                </span>
                {item.attachments.map((att, i) => (
                  <button
                    key={i}
                    onClick={() => handleDownload(att.name)}
                    className="flex items-center justify-between p-1.5 rounded hover:bg-[#141419] text-[#dfbfbc] hover:text-[#f7f4eb] text-xs transition-colors text-left"
                  >
                    <span className="truncate pr-2 text-[11px] font-jakarta">{att.name}</span>
                    {downloadedFile === att.name ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : att.type === "audio" ? (
                      <Headphones className="w-3.5 h-3.5 text-[#ffb3ae] shrink-0" />
                    ) : (
                      <Download className="w-3.5 h-3.5 text-[#ffb3ae] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VOD Player Modal */}
      {selectedVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-[#141419] border border-[#fabc4d]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(158,42,43,0.6)] bg-noise text-[#f7f4eb]">
            <button
              onClick={() => setSelectedVideoModal(null)}
              className="absolute top-5 right-5 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-1.5 rounded-lg bg-[#1f1f22]"
            >
              ✕
            </button>

            <div className="mb-4">
              <span className="text-xs uppercase font-bold text-[#efbf67] font-jakarta">
                Grabación VOD MUX
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f7f4eb]">
                {selectedVideoModal.title}
              </h3>
            </div>

            <div className="relative aspect-video w-full rounded-xl bg-[#09090c] border border-[#58413f] flex flex-col items-center justify-center p-6 text-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[#9e2a2b]/40 border border-[#fabc4d] flex items-center justify-center text-[#fabc4d] mb-3 animate-pulse">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <p className="font-cinzel text-lg font-bold text-[#f7f4eb]">
                Reproducción de Masterclass Grabada
              </p>
              <span className="font-mono text-xs text-[#efbf67] mt-1">
                Mux Playback ID: {selectedVideoModal.playbackId}
              </span>
            </div>

            <p className="font-jakarta text-xs text-[#dfbfbc] leading-relaxed">
              {selectedVideoModal.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
