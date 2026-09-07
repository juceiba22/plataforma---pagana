"use client";

import React, { useState } from "react";
import { Clock, MapPin, Users, Flame, Sparkles, Filter } from "lucide-react";

export default function RehearsalSchedule() {
  const [filter, setFilter] = useState<string>("todos");

  const scheduleItems = [
    {
      id: "1",
      dayTime: "LUNES 18:00 HS",
      callTime: "Call-Time 17:30",
      title: "Ensayo Teatro-Foro",
      description: "Exploración de catarsis comunitaria y activación de opresiones colectivas con el público en el círculo de sal.",
      location: "Espacio Callejón Cero",
      target: "Todos lxs actores",
      category: "obligatorio",
      accent: "primary",
    },
    {
      id: "2",
      dayTime: "MIÉRCOLES 15:00 HS",
      callTime: "Prueba Viva",
      title: "Vestuarios & Máscaras",
      description: "Calce final del Pombero, La Telesita y máscaras de arcilla de la Quebrada. Ajuste de visión periférica en escena.",
      location: "Taller Textil Subterráneo",
      target: "12 Personajes",
      category: "obligatorio",
      accent: "secondary",
    },
    {
      id: "3",
      dayTime: "VIERNES 20:30 HS",
      callTime: "Ensayo General",
      title: "Pasada Bandas en Vivo",
      description: "Ensamble con Olmo Masini (bandoneón experimental) y Ninio Ancestral (bombos y sintes sub-bajos). Entrada a pista.",
      location: "Nave Central Sonorizada",
      target: "Músicos + Cuerpo de Baile",
      category: "bandas",
      accent: "tertiary",
    },
    {
      id: "4",
      dayTime: "SÁBADO 16:00 HS",
      callTime: "Call-Time Rígido",
      title: "Llamado a Sala Completo",
      description: "Alineación lumínica de penumbras, vaporizadores de copal y chequeo técnico de micrófonos corbateros.",
      location: "Platea & Escenario Mayor",
      target: "Staff Técnico + Elenco",
      category: "tecnica",
      accent: "error",
    },
  ];

  const filteredItems =
    filter === "todos"
      ? scheduleItems
      : scheduleItems.filter((item) => item.category === filter);

  return (
    <section id="cronograma-ensayos" className="flex flex-col gap-4">
      {/* Header & Legend */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#fabc4d] font-jakarta text-xs uppercase tracking-[0.18em] font-bold mb-1">
            <Clock className="w-3.5 h-3.5 text-[#fabc4d]" />
            <span>Itinerario Psicomágico Semanal</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl text-[#f7f4eb] tracking-tight font-bold">
            Cronograma de Ensayos & Montaje
          </h2>
        </div>

        {/* Legend / Filter tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-jakarta">
          <button
            onClick={() => setFilter("todos")}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === "todos"
                ? "bg-[#fabc4d] text-[#281900] font-bold"
                : "bg-[#141419] text-[#dfbfbc] hover:text-[#f7f4eb] border border-[#58413f]/40"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("obligatorio")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              filter === "obligatorio"
                ? "bg-[#9e2a2b] text-[#f7f4eb] font-bold"
                : "bg-[#141419] text-[#dfbfbc] hover:text-[#f7f4eb] border border-[#58413f]/40"
            }`}
          >
            <span className="w-2 h-2 rounded-sm bg-[#9e2a2b]"></span> Obligatorio
          </button>
          <button
            onClick={() => setFilter("bandas")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              filter === "bandas"
                ? "bg-[#bd8718] text-[#281900] font-bold"
                : "bg-[#141419] text-[#dfbfbc] hover:text-[#f7f4eb] border border-[#58413f]/40"
            }`}
          >
            <span className="w-2 h-2 rounded-sm bg-[#bd8718]"></span> Bandas & DJ
          </button>
          <button
            onClick={() => setFilter("tecnica")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              filter === "tecnica"
                ? "bg-[#353438] text-[#f7f4eb] font-bold"
                : "bg-[#141419] text-[#dfbfbc] hover:text-[#f7f4eb] border border-[#58413f]/40"
            }`}
          >
            <span className="w-2 h-2 rounded-sm bg-[#353438]"></span> Técnica & Luces
          </button>
        </div>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="relative flex flex-col justify-between rounded-2xl bg-[#141419] border border-[#58413f]/40 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#fabc4d]/40 group"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span
                  className={`font-jakarta text-[11px] font-bold tracking-widest uppercase ${
                    item.accent === "primary"
                      ? "text-[#ffb3ae]"
                      : item.accent === "secondary"
                      ? "text-[#fabc4d]"
                      : item.accent === "tertiary"
                      ? "text-[#efbf67]"
                      : "text-[#ffb4ab]"
                  }`}
                >
                  {item.dayTime}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#1f1f22] text-[#ffdad7] font-jakarta text-[10px] uppercase font-semibold border border-[#58413f]/30">
                  {item.callTime}
                </span>
              </div>

              <h3 className="font-cinzel text-lg font-bold text-[#f7f4eb] group-hover:text-[#fabc4d] transition-colors mt-1">
                {item.title}
              </h3>

              <p className="font-jakarta text-xs text-[#dfbfbc] line-clamp-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom ribbon */}
            <div className="mt-5 pt-3 bg-[#0b0b0e] -mx-5 -mb-5 p-4 rounded-b-2xl border-t border-[#58413f]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[#efbf67] font-jakarta text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-[#fabc4d] shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>
              <span className="text-[#8a877e] font-jakarta text-[10px] uppercase font-semibold">
                {item.target}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
