"use client";

import React from "react";
import { Search, Lightbulb, Flame, Sparkles, Hash, Users } from "lucide-react";

interface CommunitySidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTag: string;
  onTagSelect: (tag: string) => void;
}

export default function CommunitySidebar({
  searchQuery,
  onSearchChange,
  selectedTag,
  onTagSelect,
}: CommunitySidebarProps) {
  const tags = [
    { name: "Psicomagia", count: 18 },
    { name: "Ensayos", count: 12 },
    { name: "Logística", count: 9 },
    { name: "Sugerencias", count: 7 },
    { name: "Vestuario", count: 14 },
  ];

  const activeMembers = [
    {
      name: "Sofía Vallejos",
      role: "Elenco • Arquetipo Chamana",
      threads: "14 hilos",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB5Yd8HIqKoQPWg66F-LjEc4AB4k-T8hdWzPulSgnrvyrPMYhgGjqHszhZ1jk7sxSppovFHwkzIo73pzNuppD3yxseUFRraKaJLWqUMux0aBI6eP3e38KAzSw2GKVCTj7bkRDttyHeauQCFsLF-GsyK6T1PIvDVik0_ZrPE5ICeDADagQd0ztQqeDJjxULzKPj-tZsWr9BpaLYtMWPpJQyZdJgMJo6ct_n63AFu0duJVk833im70RI6qQ",
    },
    {
      name: "Ninio Ancestral",
      role: "Música • Percusión Ritual",
      threads: "11 hilos",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBVj7GofISQZAtH8x0EsK96uphpiYk0Lw5-gA_6qQ6e5wyW8tjEIrdlZ7fHLC9HyiVh9hMrrLf0bgmyXUubXUGKQaT4dJ_-mIvo4etpMX6cdT6GjQUxwPC2kahyoJwI1DdGqGLZDKLVBlPGlbe57Qt72g3n2u4AxpC8AU5FoOSWK4J8ekDiHQO8h0T-jZkRhBlmUhYcj4AUaacs2H3xMilHtQ0e9sU75Ue1wqTT3KOZFwBMkBYoAzAJ3A",
    },
    {
      name: "Martina Lazcano",
      role: "Dramaturgia • Dirección",
      threads: "9 hilos",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDCXlFEKB-Z9fTf_hDMCud8cO3-DCdWZsal-qD8xaQ-b27nX9LyNn58Rs-hXXvCPmdc4SzJLALTlMR3BMZgc7WaJS3gVobwtWqnO_lWK2yTJDVYueFdAdwqgmcqNOIQJrJuMLSNs3cfiMeKbXziK-LKwI7CUFEj5nJqJAvpFl_NScqVsbCuzP4nnNA6U1sS8Q1aF93Qt8A8Oen80W6xPE3f3MGu1Q0ATV6f86-w3ITL1nUdwJfvW1UbZg",
    },
    {
      name: "Ramiro Sombra",
      role: "Taller • Artefactos Escénicos",
      threads: "8 hilos",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbYsxkQtTMn8NerIwS_2-6Hol3w63px6gBI76UCt_qW7AkXMVjm9cCCRomNe4rcfYaHpdg0zjqJ8V1ndW7jjwp0DiRvRS-6FOwvvjMP4JTRXtCO2W2HPub93Tp411nmy7RY10NqLczpCi41XElwhSzsIXPGRiqJqPU4seAli1DMk6p-iJdedJTfliyet-GxswI0dwQ-yJBGn-teQzNodi3PKrGnqDsd1fU4EjVXBDlra8VLswV-Putiw",
    },
  ];

  return (
    <aside className="flex flex-col gap-6">
      {/* Search Bar */}
      <div className="bg-[#141419] border border-[#58413f]/40 p-5 rounded-2xl flex flex-col gap-3 shadow-md">
        <span className="font-jakarta text-xs uppercase tracking-wider text-[#efbf67] font-bold">
          Exploración
        </span>
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar ideas, símbolos o notas..."
            className="w-full bg-[#0b0b0e] text-[#f7f4eb] placeholder-[#8a877e] font-jakarta text-xs px-4 py-3 pl-10 rounded-xl border border-[#58413f] focus:outline-none focus:border-[#fabc4d]"
          />
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8a877e]" />
        </div>

        {/* Tags */}
        <div className="space-y-2 pt-2">
          <span className="font-jakarta text-[11px] uppercase tracking-widest text-[#dfbfbc] block font-semibold">
            Etiquetas Principales
          </span>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <button
                key={tag.name}
                onClick={() => onTagSelect(selectedTag === tag.name ? "todos" : tag.name)}
                className={`px-3 py-1 rounded-lg font-jakarta text-xs transition-all ${
                  selectedTag === tag.name
                    ? "bg-[#9e2a2b] text-[#f7f4eb] font-bold shadow-sm"
                    : "bg-[#0b0b0e] text-[#dfbfbc] hover:bg-[#1f1f22] hover:text-[#f7f4eb] border border-[#58413f]/30"
                }`}
              >
                #{tag.name} ({tag.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Círculo de Alquimia - Active Members */}
      <div className="bg-[#141419] border border-[#58413f]/40 p-5 rounded-2xl flex flex-col gap-4 shadow-md">
        <div className="flex items-center justify-between pb-2 border-b border-[#58413f]/30">
          <span className="font-jakarta text-xs uppercase tracking-wider text-[#fabc4d] font-bold">
            Círculo de Alquimia
          </span>
          <span className="text-[11px] text-[#8a877e]">Actividad Semanal</span>
        </div>

        <h3 className="font-cinzel text-base font-bold text-[#f7f4eb]">
          Miembros Más Activos
        </h3>

        <div className="space-y-3.5">
          {activeMembers.map((member, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-[#9e2a2b]"
                />
                <div className="flex flex-col">
                  <h5 className="font-jakarta text-xs font-bold text-[#f7f4eb] leading-tight">
                    {member.name}
                  </h5>
                  <span className="font-jakarta text-[10px] text-[#dfbfbc]">
                    {member.role}
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-[#bd8718]/20 text-[#fabc4d] font-jakarta text-[10px] font-bold border border-[#bd8718]/30">
                {member.threads}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Código de Convivencia */}
      <div className="bg-[#0b0b0e] border border-[#fabc4d]/30 p-5 rounded-2xl flex flex-col gap-2 shadow-md bg-noise">
        <div className="flex items-center gap-2 text-[#fabc4d]">
          <Lightbulb className="w-4 h-4" />
          <span className="font-jakarta text-xs uppercase font-bold tracking-wider">
            Código de Convivencia
          </span>
        </div>
        <p className="font-jakarta text-xs text-[#dfbfbc] leading-relaxed">
          Las propuestas vertidas en esta Ágora tienen valor dramatúrgico directo. Se promueve el disenso constructivo y el cuidado de los cuerpos que habitan la escena.
        </p>
      </div>
    </aside>
  );
}
