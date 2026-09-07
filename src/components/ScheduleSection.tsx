"use client";

import React, { useState } from "react";
import { Calendar, MapPin, Clock, Ticket, AlertTriangle, ArrowRight } from "lucide-react";
import RitualModal from "./RitualModal";

export default function ScheduleSection() {
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);
  const [selectedInitialDate, setSelectedInitialDate] = useState<string>("19-abr");

  const openBooking = (dateId: string) => {
    setSelectedInitialDate(dateId);
    setIsRitualModalOpen(true);
  };

  const dates = [
    {
      id: "19-abr",
      month: "ABRIL",
      day: "19",
      weekday: "SÁB",
      formatBadge: "Formato Completo (Ritual Integral)",
      badgeColor: "primary",
      venue: "Galpón de Guevara • Chacarita, Buenos Aires",
      details: "21:00 hs • Bandas: Olmo Masini + Ninio Ancestral + Fiesta",
      capacityLabel: "Últimos 28 lugares",
      capacityColor: "text-[#efbf67]",
    },
    {
      id: "26-abr",
      month: "ABRIL",
      day: "26",
      weekday: "SÁB",
      formatBadge: "Formato Completo (Ritual Integral)",
      badgeColor: "primary",
      venue: "Galpón de Guevara • Chacarita, Buenos Aires",
      details: "21:00 hs • Acto Psicomágico + Artistas Invitados + DJ Set",
      capacityLabel: "Disponible",
      capacityColor: "text-[#fabc4d]",
    },
    {
      id: "08-may",
      month: "MAYO",
      day: "08",
      weekday: "JUE",
      formatBadge: "Versión Reducida (Para rescatarnos del olvido)",
      badgeColor: "secondary",
      venue: "Espacio Callejón • Almagro, Buenos Aires",
      details: "20:30 hs • Obra de Cámara • 75 min sin fiesta posterior",
      capacityLabel: "Sala Íntima (60 butacas)",
      capacityColor: "text-[#fabc4d]",
    },
  ];

  return (
    <section id="fechas-boletos" className="w-full bg-[#131316] py-20 lg:py-32 relative overflow-hidden bg-noise">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fabc4d]/10 border border-[#fabc4d]/30 text-[#fabc4d] text-xs uppercase tracking-[0.2em] font-bold mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Convocatoria • Temporada 2025</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#f7f4eb] uppercase font-bold tracking-tight">
            Próximas Fechas & Boletos
          </h2>
          <p className="font-jakarta text-sm sm:text-base text-[#dfbfbc] mt-2 leading-relaxed">
            Capacidad estrictamente limitada por función debido a la disposición ceremonial del espacio. Recomendamos reservar anticipadamente.
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
                    {item.month}
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
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] uppercase font-semibold ${
                      item.badgeColor === "primary"
                        ? "bg-[#9e2a2b]/30 text-[#ffb3ae] border border-[#9e2a2b]/50"
                        : "bg-[#bd8718]/20 text-[#efbf67] border border-[#bd8718]/40"
                    }`}
                  >
                    {item.formatBadge}
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

                <button
                  onClick={() => openBooking(item.id)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-jakarta text-xs uppercase tracking-wider font-bold shadow-[0_0_16px_rgba(158,42,43,0.4)] transition-all border-t border-white/20"
                >
                  <Ticket className="w-3.5 h-3.5 text-[#fabc4d]" />
                  <span>Reservar en Alternativa</span>
                </button>
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
