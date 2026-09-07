"use client";

import React, { useState } from "react";
import { X, Calendar, MapPin, Clock, Ticket, Check, ExternalLink, Flame, ShieldAlert } from "lucide-react";

interface RitualModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: string;
}

export default function RitualModal({ isOpen, onClose, initialDate }: RitualModalProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate || "19-abr");
  const [ticketCount, setTicketCount] = useState(2);
  const [tier, setTier] = useState<"integral" | "camara">("integral");
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const datesInfo = [
    {
      id: "19-abr",
      day: "19",
      month: "ABRIL",
      weekday: "SÁB",
      time: "21:00 hs",
      venue: "Galpón de Guevara (Chacarita)",
      type: "Formato Completo • Ritual & Fiesta",
      available: 28,
      price: "$12.000 ARS",
    },
    {
      id: "26-abr",
      day: "26",
      month: "ABRIL",
      weekday: "SÁB",
      time: "21:00 hs",
      venue: "Galpón de Guevara (Chacarita)",
      type: "Formato Completo • Ritual & Fiesta",
      available: 45,
      price: "$12.000 ARS",
    },
    {
      id: "08-may",
      day: "08",
      month: "MAYO",
      weekday: "JUE",
      time: "20:30 hs",
      venue: "Espacio Callejón (Almagro)",
      type: "Versión Reducida • Obra de Cámara",
      available: 16,
      price: "$9.500 ARS",
    },
  ];

  const currentSelection = datesInfo.find((d) => d.id === selectedDate) || datesInfo[0];

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      // Direct to Alternativa Teatral
      window.open("https://www.alternativateatral.com", "_blank");
      setConfirmed(false);
      onClose();
    }, 1800);
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
              Reserva de Pase Ceremonial
            </h3>
            <p className="text-xs text-[#efbf67] font-jakarta tracking-wide">
              Boletería Oficial integrada con Alternativa Teatral
            </p>
          </div>
        </div>

        {confirmed ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#9e2a2b]/40 border border-[#fabc4d] text-[#fabc4d] flex items-center justify-center mx-auto animate-pulse">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-cinzel text-2xl font-bold text-[#f7f4eb]">
              Iniciando Transacción Segura
            </h4>
            <p className="text-sm text-[#dfbfbc] max-w-sm mx-auto">
              Te estamos redirigiendo a la plataforma oficial de Alternativa Teatral para emitir tus credenciales con código QR nominativo.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirmReservation} className="space-y-6">
            {/* Step 1: Select Date */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#fabc4d] font-bold mb-3 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                1. Selecciona la Fecha del Trance
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {datesInfo.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedDate(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
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
                    <p className="text-[11px] text-[#dfbfbc] line-clamp-1">{item.venue}</p>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="text-[#efbf67] font-semibold">{item.price}</span>
                      <span className="text-[#ffb3ae]">{item.available} cupos</span>
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

            {/* Ritual Protocol Warning */}
            <div className="p-3 rounded-xl bg-[#1f1f22]/60 border border-[#58413f]/30 flex items-start gap-2 text-[11px] text-[#dfbfbc]">
              <Flame className="w-4 h-4 text-[#fabc4d] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#f7f4eb]">Protocolo Inmersivo:</strong> Se solicita puntualidad estricta. Una vez iniciado el rito de apertura y entrega de máscaras, no se permitirá el ingreso a la sala.
              </span>
            </div>

            {/* Action button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-bold text-xs uppercase tracking-widest shadow-[0_0_24px_rgba(158,42,43,0.6)] transition-all flex items-center justify-center gap-2 border-t border-white/20"
            >
              <span>Continuar en Alternativa Teatral</span>
              <ExternalLink className="w-4 h-4 text-[#fabc4d]" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
