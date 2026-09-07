"use client";

import React, { useState } from "react";
import { Calendar, MapPin, Clock, Ticket, ExternalLink, Sparkles } from "lucide-react";
import RitualModal from "./RitualModal";

export default function ScheduleSection() {
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);
  const [selectedInitialDate, setSelectedInitialDate] = useState<string>("26-sep");

  const dates = [
    {
      id: "26-sep",
      month: "SEPTIEMBRE",
      day: "26",
      weekday: "VIE",
      formatBadge: "Versión Teatral de la Fiesta Pagana",
      badgeColor: "secondary",
      venue: "Teatro El Deseo • Saavedra 569, Balvanera",
      details: "Duración 50 minutos • Obra ritual en espacio íntimo • Cupos limitados",
      capacityLabel: "Cupos Estrictamente Limitados",
      capacityColor: "text-[#efbf67]",
      price: "Alternativa Teatral",
      link: "https://www.alternativateatral.com/obra102861-fiesta-pagana-una-obra-para-rescatarnos-del-olvido",
    },
    {
      id: "06-nov",
      month: "NOVIEMBRE",
      day: "06",
      weekday: "JUE",
      formatBadge: "Evento Completo • Puesta Total & Fiesta",
      badgeColor: "primary",
      venue: "Teatro El Portal • Buenos Aires",
      details: "Payasos + Bandas en Vivo + Obra de Teatro + Fiesta con DJ",
      capacityLabel: "Entradas Disponibles",
      capacityColor: "text-[#fabc4d]",
      price: "$25.000 ARS",
      link: "https://www.alternativateatral.com/obra102861-fiesta-pagana-una-obra-para-rescatarnos-del-olvido",
    },
  ];

  return (
    <section id="fechas-boletos" className="w-full bg-[#131316] py-20 lg:py-32 relative overflow-hidden bg-noise">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fabc4d]/10 border border-[#fabc4d]/30 text-[#fabc4d] text-xs uppercase tracking-[0.2em] font-bold mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Convocatoria • Temporada Oficial</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#f7f4eb] uppercase font-bold tracking-tight">
            Próximas Fechas & Boletos
          </h2>
          <p className="font-jakarta text-sm sm:text-base text-[#dfbfbc] mt-2 leading-relaxed">
            Localidades oficiales a través de <strong>Alternativa Teatral</strong>. Capacidad estrictamente limitada por función.
          </p>
        </div>

        {/* Schedule Cards */}
        <div className="space-y-4">
          {dates.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#141419] border border-[#58413f]/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-[#fabc4d]/40 transition-all duration-300 shadow-md"
            >
              {/* Date Box & Info */}
              <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                {/* Visual Calendar Block */}
                <div className="flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-[#0b0b0e] border border-[#58413f]/40 text-center p-2 shrink-0">
                  <span className="font-jakarta text-[10px] uppercase text-[#fabc4d] font-bold tracking-wider">
                    {item.month.slice(0, 3)}
                  </span>
                  <span className="font-cinzel text-2xl font-bold text-[#f7f4eb] leading-none my-0.5">
                    {item.day}
                  </span>
                  <span className="font-jakarta text-[10px] text-[#dfbfbc] uppercase font-semibold">
                    {item.weekday}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] uppercase font-semibold ${
                        item.badgeColor === "primary"
                          ? "bg-[#9e2a2b]/30 text-[#ffb3ae] border border-[#9e2a2b]/50"
                          : "bg-[#bd8718]/20 text-[#efbf67] border border-[#bd8718]/40"
                      }`}
                    >
                      {item.formatBadge}
                    </span>
                    <span className="text-xs text-[#fabc4d] font-bold">
                      {item.price}
                    </span>
                  </div>

                  <h3 className="font-epilogue text-base sm:text-lg text-[#f7f4eb] font-bold">
                    {item.venue}
                  </h3>

                  <p className="font-jakarta text-xs text-[#dfbfbc]">
                    {item.details}
                  </p>
                </div>
              </div>

              {/* Capacity and Ticket Action */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#58413f]/20">
                <div className="text-left lg:text-right">
                  <span className="font-jakarta text-[11px] text-[#8a877e] block uppercase tracking-wider">
                    Capacidad
                  </span>
                  <span className={`font-jakarta text-xs font-bold ${item.capacityColor}`}>
                    {item.capacityLabel}
                  </span>
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-jakarta text-xs uppercase tracking-wider font-bold shadow-[0_0_16px_rgba(158,42,43,0.4)] transition-all border-t border-white/20"
                >
                  <Ticket className="w-3.5 h-3.5 text-[#fabc4d]" />
                  <span>Reservar en Alternativa</span>
                  <ExternalLink className="w-3 h-3 text-[#dfbfbc]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RitualModal
        isOpen={isRitualModalOpen}
        onClose={() => setIsRitualModalOpen(false)}
        initialDate={selectedInitialDate}
      />
    </section>
  );
}
