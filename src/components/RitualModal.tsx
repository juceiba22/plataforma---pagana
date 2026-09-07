"use client";

import React, { useState } from "react";
import { X, Calendar, MapPin, Clock, Ticket, Check, ExternalLink, Flame } from "lucide-react";

interface RitualModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: string;
}

export default function RitualModal({ isOpen, onClose, initialDate }: RitualModalProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate || "26-sep");
  const [ticketCount, setTicketCount] = useState(2);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const datesInfo = [
    {
      id: "26-sep",
      day: "26",
      month: "SEPTIEMBRE",
      weekday: "VIE",
      time: "21:00 hs",
      venue: "Teatro El Deseo (Saavedra 569, Balvanera)",
      type: "Versión Teatral de la Fiesta Pagana",
      details: "Duración 50 minutos • Cupos limitados",
      available: "Últimos lugares",
      price: "Alternativa Teatral",
      link: "https://www.alternativateatral.com/obra102861-fiesta-pagana-una-obra-para-rescatarnos-del-olvido",
    },
    {
      id: "06-nov",
      day: "06",
      month: "NOVIEMBRE",
      weekday: "JUE",
      time: "20:30 hs",
      venue: "Teatro El Portal (Buenos Aires)",
      type: "Evento Completo • Puesta Total & Fiesta",
      details: "Payasos + Bandas en Vivo + Obra + Fiesta con DJ",
      available: "Disponible",
      price: "$25.000 ARS",
      link: "https://www.alternativateatral.com/obra102861-fiesta-pagana-una-obra-para-rescatarnos-del-olvido",
    },
  ];

  const currentSelection = datesInfo.find((d) => d.id === selectedDate) || datesInfo[0];

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      // Direct to Alternativa Teatral official listing
      window.open(currentSelection.link, "_blank");
      setConfirmed(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#141419] border border-[#fabc4d]/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(158,42,43,0.5)] bg-noise text-[#f7f4eb] overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#9e2a2b]/25 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-1.5 rounded-lg bg-[#1f1f22]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#9e2a2b]/30 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d]">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider text-[#f7f4eb]">
              Reserva de Entradas Oficiales
            </h3>
            <p className="text-xs text-[#efbf67] font-jakarta tracking-wide">
              Boletería integrada con Alternativa Teatral
            </p>
          </div>
        </div>

        {confirmed ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#9e2a2b]/40 border border-[#fabc4d] text-[#fabc4d] flex items-center justify-center mx-auto animate-pulse">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-cinzel text-2xl font-bold text-[#f7f4eb]">
              Redirigiendo a Alternativa Teatral
            </h4>
            <p className="text-sm text-[#dfbfbc] max-w-sm mx-auto">
              Te estamos conectando con la boletería oficial de la obra en Alternativa Teatral para emitir tus localidades.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirmReservation} className="space-y-6">
            {/* Step 1: Select Date */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#fabc4d] font-bold mb-3 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                1. Selecciona la Función
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {datesInfo.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedDate(item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative ${
                      selectedDate === item.id
                        ? "bg-[#9e2a2b]/30 border-[#fabc4d] shadow-[0_0_15px_rgba(250,188,77,0.3)]"
                        : "bg-[#0e0e11] border-[#58413f]/40 hover:border-[#58413f]"
                    }`}
                  >
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-cinzel text-lg font-bold text-[#f7f4eb]">
                        {item.day} {item.month.slice(0, 3)}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#fabc4d] bg-[#2a2a2d] px-1.5 py-0.5 rounded">
                        {item.weekday}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#f7f4eb]">{item.type}</p>
                    <p className="text-[11px] text-[#dfbfbc] line-clamp-1 mt-0.5">{item.venue}</p>
                    <div className="mt-2.5 flex items-center justify-between text-[11px]">
                      <span className="text-[#fabc4d] font-bold">{item.price}</span>
                      <span className="text-[#ffb3ae] text-[10px]">{item.available}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Date Summary */}
            <div className="p-4 rounded-xl bg-[#0b0b0e] border border-[#58413f]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#efbf67] font-semibold">
                  {currentSelection.type}
                </span>
                <span className="text-xs text-[#ffdad7] bg-[#9e2a2b]/30 px-2 py-0.5 rounded border border-[#9e2a2b]">
                  {currentSelection.time}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#dfbfbc]">
                <MapPin className="w-3.5 h-3.5 text-[#fabc4d]" />
                <span>{currentSelection.venue}</span>
              </div>
              <p className="text-[11px] text-[#8a877e]">{currentSelection.details}</p>
            </div>

            {/* Step 2: Number of Tickets */}
            <div className="flex items-center justify-between bg-[#0e0e11] p-3 rounded-xl border border-[#58413f]/40">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#f7f4eb]">
                Cantidad de Pases
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  className="w-8 h-8 rounded-lg bg-[#1f1f22] border border-[#58413f] text-[#f7f4eb] flex items-center justify-center font-bold hover:bg-[#353438]"
                >
                  -
                </button>
                <span className="font-cinzel text-base font-bold text-[#fabc4d] w-6 text-center">
                  {ticketCount}
                </span>
                <button
                  type="button"
                  onClick={() => setTicketCount(Math.min(8, ticketCount + 1))}
                  className="w-8 h-8 rounded-lg bg-[#1f1f22] border border-[#58413f] text-[#f7f4eb] flex items-center justify-center font-bold hover:bg-[#353438]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-bold text-xs uppercase tracking-widest shadow-[0_0_24px_rgba(158,42,43,0.6)] transition-all flex items-center justify-center gap-2 border-t border-white/20"
            >
              <span>Ir a Alternativa Teatral</span>
              <ExternalLink className="w-4 h-4 text-[#fabc4d]" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
