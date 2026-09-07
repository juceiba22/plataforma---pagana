"use client";

import React, { useState } from "react";
import { Video, Download, Headphones, FileText, Sparkles, Flame, Check, Play } from "lucide-react";

export interface VideoClass {
  id: string;
  category: "marechal" | "demonologia" | "comunicacion" | "luces";
  categoryLabel: string;
  duration: string;
  title: string;
  description: string;
  thumbnail: string;
  badgeBg: string;
  attachments: { name: string; type: "pdf" | "audio" | "image" }[];
}

export const ACADEMY_CLASSES: VideoClass[] = [
  {
    id: "1",
    category: "marechal",
    categoryLabel: "Dramaturgia Mística",
    duration: "01:48:30",
    title: "La Batalla Celeste y Terrestre de Marechal",
    description:
      "Exploración de la poética trascendental de Leopoldo Marechal, la lucha metafísica del ser y su traducción al cuerpo del actor en la escena ritual.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsflbwK8N7xrmAZNR5DO6vSuetzhGlCIVlIQBtWq0O-O9PxJwwZ_PEE1dm78WKiMqDXlkvuLxgMOIUNw0NKw7pS31nhFxYJVy-tA8TKYXve7xXX5W8pieSHDUlgJbXJ5D0KRnszl7yHyjCMVJ5npCO7MJ-1hZBMoFOFsqsJ-Munks8XbIULVaJq9rnQ5hChTUBsoL8S0m9PxlzfvpZagzEJth4lWZ63sGI7Er61SPegvWVWq0IJXBcOw",
    badgeBg: "bg-[#bd8718] text-[#281900]",
    attachments: [
      { name: "Guion_Batalla_Celeste_Marechal.pdf", type: "pdf" },
      { name: "Analisis_Metateatral_Marechal.pdf", type: "pdf" },
    ],
  },
  {
    id: "2",
    category: "demonologia",
    categoryLabel: "Mitología Criolla",
    duration: "02:15:10",
    title: "La Demonología Europea vs la Demonología Criolla",
    description:
      "Contraste entre el canon fáustico medieval y los arquetipos populares del monte: el Mandinga, la Salamanca, el Pombero y el pacto de sangre en la Puna.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-vrWjlzCmj_urRsf4vgfYtqeWWbMxLFv0oQ2meaiWBMULKQQ_TkgHIK9RprNvc5Ba2mtBEShz-MZsS-johUxMLU-i9YLnLPLR-D5v2RvvG0JozUcq9whSEE2lbOEF8S2rpfsUTPq6ZsbPH0MYxlU-0223l7V8m2SgT6_cDtiMUpJMc0N3d2TAIorR1h26kXVBIWq5fO-DztgqMZtdN9LAgdzENUpq2n0mOxh3w-iZ2n4XaROaEAxDVQ",
    badgeBg: "bg-[#9e2a2b] text-[#f7f4eb]",
    attachments: [
      { name: "Bestiario_Mandinga_Salamanca.pdf", type: "pdf" },
      { name: "Canto_Coplas_del_Averno.wav", type: "audio" },
    ],
  },
  {
    id: "3",
    category: "comunicacion",
    categoryLabel: "Dinámicas Escénicas",
    duration: "01:35:45",
    title: "La Comunicación y las Escenas en Teatro",
    description:
      "La escucha profunda, la triangulación de miradas y los subtextos corporales en la ruptura de la cuarta pared durante las intervenciones colectivas.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCg_8fADmKyzMRR_mKHXuIaxrV69zviLZdeq3yKs8C8T6KExLZEebYSK-3FcuB78lQqCY7_XElf0PkhrC9ew9gYa2AP4ch_unLN6DgmNIK-fDzkKNvIHCZSyBAKMZ0fGJfwGe1o6ZXp0aRI46N68z24bqRqFjWMtslN8b1nD4uvqhka4Q6J1-LCddcgO-rZCCRout_blqth4Xk44gFPjBK1tam7VAJxwtAQF19DXOO1i60z97TGlRKWA",
    badgeBg: "bg-[#bd8718] text-[#281900]",
    attachments: [
      { name: "Manual_Escucha_Activa_Teatral.pdf", type: "pdf" },
      { name: "Partituras_Corporales_NoVerbales.pdf", type: "pdf" },
    ],
  },
  {
    id: "4",
    category: "luces",
    categoryLabel: "Técnica & Claroscuro",
    duration: "01:20:00",
    title: "La Técnica de Luces en Teatro",
    description:
      "Diseño de claroscuro expresionista, ángulos cenitales, gobos de penumbra y atmósfera psicomágica para generar espacios sagrados con reflectores cálidos.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdZhLf6PlMIY9ZK_btiq1zbQVOBk5ksf-swM6hHa6CChNXkdnQ2P0yAQ3axzC6IxyxNRPD7q9HqLIVmHaD9Hu5ViFHedb06bt_j9NZIeqNJrGcXlW2_gifRnXHoFKtQsIxu-tliNBDsEf2EAcoO9O2j-DPwfgia0xnojZGBpimYith8kT949DGshHdvwoT1hWqetlZ5GHFFRnVMJvm-vODWCmqL5FvGZ7lY4DB-PTLKIWtBUl4etJB8A",
    badgeBg: "bg-[#353438] text-[#f7f4eb]",
    attachments: [
      { name: "Planta_Luces_DobleFiltro.pdf", type: "pdf" },
      { name: "Diagrama_Gobos_Claroscuro.png", type: "image" },
    ],
  },
];

export default function AcademyArchive() {
  const [filter, setFilter] = useState<string>("all");
  const [downloadedFile, setDownloadedFile] = useState<string | null>(null);

  const filteredClasses =
    filter === "all"
      ? ACADEMY_CLASSES
      : ACADEMY_CLASSES.filter((c) => c.category === filter);

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
              Archivo de Transmisiones & Masterclasses
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-[#f7f4eb] tracking-tight font-bold">
            Biblioteca de Clases & Ensayos
          </h2>
          <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] mt-1 max-w-lg">
            Accedé a los registros grabados en vivo de las masterclasses teóricas, dramaturgia y técnicas escénicas.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none self-start md:self-auto">
          {[
            { id: "all", label: "Todas las Clases (4)" },
            { id: "marechal", label: "1. Batalla Celeste (Marechal)" },
            { id: "demonologia", label: "2. Demonología Criolla" },
            { id: "comunicacion", label: "3. Comunicación en Teatro" },
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

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredClasses.map((item) => (
          <div
            key={item.id}
            className="flex flex-col rounded-2xl bg-[#141419] border border-[#58413f]/40 overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-xl group hover:border-[#fabc4d]/40"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#0b0b0e]">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${item.thumbnail}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-transparent to-transparent"></div>

              {/* Play Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-xs transition-opacity">
                <div className="w-12 h-12 rounded-full bg-[#9e2a2b] border border-[#fabc4d] flex items-center justify-center text-[#fabc4d] shadow-[0_0_15px_rgba(250,188,77,0.5)]">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#0b0b0e]/80 text-[#f7f4eb] font-jakarta text-[10px] backdrop-blur-md border border-[#58413f]/40">
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
                  Materiales Descargables
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
    </section>
  );
}
