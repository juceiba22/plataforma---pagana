"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  X,
  AlertCircle,
  Tag,
  Theater,
} from "lucide-react";

export interface RehearsalEvent {
  id: string;
  day: number;
  month: number; // 0-indexed (e.g. 8 for September)
  year: number;
  title: string;
  type: "Teatro-Foro" | "Pasada General" | "Ensayo de la Libertad" | "Técnico" | "Música";
  time: string;
  location: string;
  castInvited: string;
  objective: string;
  badgeColor: string;
}

const SCRIPT_REHEARSAL_EVENTS: RehearsalEvent[] = [
  {
    id: "1",
    day: 12,
    month: 8, // Septiembre
    year: 2026,
    title: "Escena 1 & 2: Las Cantoras, la Manzana y el Espacio-Tiempo",
    type: "Técnico",
    time: "19:00 - 22:30",
    location: "Sala Principal (Cámara Negra)",
    castInvited: "Cantora 1, Cantora 2, El Colla, Bombisto y Cuatro Demonios",
    objective:
      "Ajustar la atenuación de luces de las cantoras in crescendo hacia la manzana central. Coordinación del golpe seco de bombo con el monólogo de E=mc².",
    badgeColor: "bg-[#281900] text-[#fabc4d] border-[#fabc4d]/30",
  },
  {
    id: "2",
    day: 16,
    month: 8, // Septiembre
    year: 2026,
    title: "Escena 3: Gabriel y la Madre (Código 616 & TikTok)",
    type: "Teatro-Foro",
    time: "18:30 - 21:30",
    location: "Estudio B • Sala de Ensayos",
    castInvited: "El Niño Gabriel y La Madre",
    objective:
      "Trabajo de frente al público con luces exclusivas independientes. Ajustar el ritmo confidencial del relato de la tarjeta de crédito y la reacción de la madre.",
    badgeColor: "bg-[#9e2a2b] text-[#f7f4eb] border-[#ffb3ae]/40",
  },
  {
    id: "3",
    day: 20,
    month: 8, // Septiembre
    year: 2026,
    title: "Escena 5: ¡Viva la Libertad Carajo! & José Mercado",
    type: "Ensayo de la Libertad",
    time: "19:00 - 23:00",
    location: "Nave Experimental del Santuario",
    castInvited: "El Presentador, Daiana, José Mercado, Edwin, Juan Salteño y Todo el Elenco",
    objective:
      "Dinámica de show televisivo paródico. Transición del debate de Daiana (huevos vs cachucha) al contrapunto de José Mercado y el canto colectivo de la Zamba para olvidar.",
    badgeColor: "bg-[#78191b] text-[#ffdad6] border-[#ffb4ab]/40",
  },
  {
    id: "4",
    day: 24,
    month: 8, // Septiembre
    year: 2026,
    title: "Escena 8: Bloque Musical Musicardi & Terapia Nacional",
    type: "Música",
    time: "20:00 - 23:30",
    location: "Sala Principal con Ensamble",
    castInvited: "La Madre, Gabriel, Músicos (Redoblante, Bajo, Bandoneón) y Coro de Actores",
    objective:
      "Enlace del monólogo de los ravioles con la canción 'Nuestra Génesis'. Ajuste del falso disturbio de precios ('¡Tenemos que ir a terapia todo el país!').",
    badgeColor: "bg-[#bd8718] text-[#281900] border-[#fabc4d]/50",
  },
  {
    id: "5",
    day: 28,
    month: 8, // Septiembre
    year: 2026,
    title: "Escena 9 & 10: Pasada General: El Secreto de Argentum e Himno",
    type: "Pasada General",
    time: "18:00 - 23:30",
    location: "Espacio Callejón / Sala Teatral",
    castInvited: "Elenco Completo, Músicos, Dirección de Luces y Vestuario",
    objective:
      "Pasada general corrida de las 10 escenas del guión. Reparto de tarjetas del secreto ('Argentina es una civilización') y rezo en loop hasta el Himno Nacional.",
    badgeColor: "bg-[#9e2a2b] text-[#f7f4eb] border-[#ffb3ae]/40",
  },
];

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const DAYS_OF_WEEK = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function RehearsalCalendar() {
  const [currentMonth, setCurrentMonth] = useState(8); // Septiembre
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number>(20);
  const [events, setEvents] = useState<RehearsalEvent[]>(SCRIPT_REHEARSAL_EVENTS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for new rehearsal
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<RehearsalEvent["type"]>("Teatro-Foro");
  const [newDay, setNewDay] = useState<number>(selectedDay || 15);
  const [newTime, setNewTime] = useState("19:00 - 22:00");
  const [newLocation, setNewLocation] = useState("Sala Principal");
  const [newCastInvited, setNewCastInvited] = useState("Elenco Completo");
  const [newObjective, setNewObjective] = useState("");

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Calendar calculations
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    let badgeColor = "bg-[#9e2a2b] text-[#f7f4eb] border-[#ffb3ae]/40";
    if (newType === "Pasada General") badgeColor = "bg-[#bd8718] text-[#281900] border-[#fabc4d]/50";
    if (newType === "Ensayo de la Libertad") badgeColor = "bg-[#78191b] text-[#ffdad6] border-[#ffb4ab]/40";
    if (newType === "Técnico") badgeColor = "bg-[#281900] text-[#fabc4d] border-[#fabc4d]/30";

    const newEv: RehearsalEvent = {
      id: Date.now().toString(),
      day: Number(newDay),
      month: currentMonth,
      year: currentYear,
      title: newTitle,
      type: newType,
      time: newTime,
      location: newLocation,
      castInvited: newCastInvited,
      objective: newObjective || "Ensayo convocado para escenas del guión oficial.",
      badgeColor,
    };

    setEvents((prev) => [...prev, newEv]);
    setSelectedDay(Number(newDay));
    setIsAddModalOpen(false);
    setNewTitle("");
    setNewObjective("");
  };

  // Filter events for current month
  const monthEvents = events.filter(
    (ev) => ev.month === currentMonth && ev.year === currentYear
  );

  // Filter events for selected day
  const selectedDayEvents = monthEvents.filter((ev) => ev.day === selectedDay);

  return (
    <section id="cronograma-ensayos" className="flex flex-col gap-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#141419] border border-[#58413f]/40 shadow-xl bg-noise">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarIcon className="w-4 h-4 text-[#fabc4d]" />
            <span className="font-jakarta text-xs text-[#efbf67] uppercase tracking-[0.2em] font-bold">
              Montaje del Guión • Temporada de Teatros
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f7f4eb]">
            Cronograma de Ensayos por Escenas
          </h2>
          <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] mt-1 max-w-xl">
            Planificación de ensayos de las 10 escenas del guión: Las Cantoras, Gabriel y la Madre, ¡Viva la Libertad!, Los Musicardi y El Secreto de Argentum.
          </p>
        </div>

        <button
          onClick={() => {
            setNewDay(selectedDay || 15);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-jakarta text-xs uppercase font-bold tracking-wider shadow-[0_0_20px_rgba(158,42,43,0.5)] border-t border-white/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#fabc4d]" />
          <span>Agendar Nuevo Ensayo</span>
        </button>
      </div>

      {/* Main Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Interactive Calendar Grid */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#141419] border border-[#58413f]/40 shadow-xl flex flex-col justify-between bg-noise">
          {/* Month Navigator */}
          <div className="flex items-center justify-between pb-4 border-b border-[#58413f]/30">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xl font-bold text-[#f7f4eb]">
                {MONTH_NAMES[currentMonth]}
              </span>
              <span className="font-jakarta text-sm text-[#efbf67] font-semibold">
                {currentYear}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg bg-[#0b0b0e] border border-[#58413f]/40 text-[#dfbfbc] hover:text-[#fabc4d] hover:border-[#fabc4d]/40 transition-colors"
                aria-label="Mes Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg bg-[#0b0b0e] border border-[#58413f]/40 text-[#dfbfbc] hover:text-[#fabc4d] hover:border-[#fabc4d]/40 transition-colors"
                aria-label="Mes Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 text-center py-3">
            {DAYS_OF_WEEK.map((d, i) => (
              <span
                key={i}
                className="font-jakarta text-[11px] uppercase tracking-wider text-[#efbf67] font-bold"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7 gap-1.5 flex-grow">
            {/* Blank leading days */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="min-h-[52px] rounded-xl bg-transparent opacity-20 border border-transparent"
              ></div>
            ))}

            {/* Actual Month Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const hasEvents = monthEvents.filter((e) => e.day === dayNum);
              const isSelected = selectedDay === dayNum;

              return (
                <button
                  key={`day-${dayNum}`}
                  type="button"
                  onClick={() => setSelectedDay(dayNum)}
                  className={`min-h-[58px] p-1.5 rounded-xl border flex flex-col justify-between text-left transition-all relative ${
                    isSelected
                      ? "bg-[#9e2a2b]/30 border-[#fabc4d] shadow-[0_0_12px_rgba(250,188,77,0.3)]"
                      : hasEvents.length > 0
                      ? "bg-[#1f1f22] border-[#58413f] hover:border-[#fabc4d]/50"
                      : "bg-[#0e0e11]/60 border-[#58413f]/20 hover:bg-[#1f1f22] hover:border-[#58413f]/50"
                  }`}
                >
                  <span
                    className={`font-jakarta text-xs font-bold ${
                      isSelected
                        ? "text-[#fabc4d]"
                        : hasEvents.length > 0
                        ? "text-[#f7f4eb]"
                        : "text-[#8a877e]"
                    }`}
                  >
                    {dayNum}
                  </span>

                  {/* Event indicators dots */}
                  {hasEvents.length > 0 && (
                    <div className="flex flex-col gap-0.5 mt-1">
                      {hasEvents.slice(0, 2).map((ev, evIdx) => (
                        <div
                          key={evIdx}
                          className={`h-1.5 rounded-full ${
                            ev.type === "Teatro-Foro"
                              ? "bg-[#ffb3ae]"
                              : ev.type === "Pasada General"
                              ? "bg-[#fabc4d]"
                              : "bg-[#ffdad6]"
                          }`}
                          title={ev.title}
                        ></div>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Color Legend */}
          <div className="pt-4 mt-4 border-t border-[#58413f]/30 flex flex-wrap items-center gap-4 text-[11px] font-jakarta">
            <span className="flex items-center gap-1.5 text-[#dfbfbc]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffb3ae]"></span> Teatro-Foro
            </span>
            <span className="flex items-center gap-1.5 text-[#dfbfbc]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fabc4d]"></span> Pasada General
            </span>
            <span className="flex items-center gap-1.5 text-[#dfbfbc]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffdad6]"></span> Ensayo de la Libertad
            </span>
          </div>
        </div>

        {/* Right 5 Columns: Selected Day Rehearsals & Details */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-6 rounded-2xl bg-[#141419] border border-[#58413f]/40 shadow-xl flex flex-col flex-grow bg-noise">
            <div className="flex items-center justify-between pb-3 border-b border-[#58413f]/30">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#fabc4d]" />
                <h3 className="font-cinzel text-lg font-bold text-[#f7f4eb]">
                  Convocatorias: {selectedDay} de {MONTH_NAMES[currentMonth]}
                </h3>
              </div>
              <span className="font-jakarta text-xs text-[#efbf67] font-semibold">
                {selectedDayEvents.length} Convocado(s)
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-3 flex-grow overflow-y-auto max-h-[500px] pr-1">
              {selectedDayEvents.length === 0 ? (
                <div className="p-8 rounded-xl bg-[#0b0b0e] border border-[#58413f]/30 text-center flex flex-col items-center justify-center my-auto">
                  <Theater className="w-10 h-10 text-[#58413f] mb-2" />
                  <p className="font-cinzel text-sm text-[#dfbfbc] font-bold">
                    Día Libre de Ensayo
                  </p>
                  <p className="font-jakarta text-xs text-[#8a877e] mt-1 max-w-xs">
                    No hay escenas programadas para este día. Podés convocar a los actores con el botón de abajo.
                  </p>
                  <button
                    onClick={() => {
                      setNewDay(selectedDay);
                      setIsAddModalOpen(true);
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#1f1f22] border border-[#fabc4d]/40 text-[#fabc4d] font-jakarta text-xs font-bold hover:bg-[#9e2a2b] hover:text-[#f7f4eb] transition-all"
                  >
                    + Agendar para el Día {selectedDay}
                  </button>
                </div>
              ) : (
                selectedDayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-xl bg-[#0b0b0e] border border-[#58413f]/50 hover:border-[#fabc4d]/50 transition-all shadow-md flex flex-col gap-3 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded font-jakarta text-[10px] uppercase font-bold border ${ev.badgeColor}`}
                      >
                        {ev.type}
                      </span>
                      <span className="font-jakarta text-xs text-[#efbf67] font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {ev.time}
                      </span>
                    </div>

                    <h4 className="font-cinzel text-base font-bold text-[#f7f4eb] group-hover:text-[#fabc4d] transition-colors leading-snug">
                      {ev.title}
                    </h4>

                    <p className="font-jakarta text-xs text-[#dfbfbc] leading-relaxed">
                      {ev.objective}
                    </p>

                    <div className="pt-2 border-t border-[#58413f]/20 flex flex-col gap-1.5 font-jakarta text-xs text-[#8a877e]">
                      <div className="flex items-center gap-1.5 text-[#efbf67]">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#dfbfbc]">
                        <Users className="w-3.5 h-3.5 shrink-0 text-[#fabc4d]" />
                        <span className="truncate">{ev.castInvited}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: AGENDAR NUEVO ENSAYO */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#141419] border border-[#fabc4d]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(158,42,43,0.6)] bg-noise text-[#f7f4eb]">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-1.5 rounded-lg bg-[#1f1f22]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#9e2a2b]/30 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d]">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider text-[#f7f4eb]">
                  Agendar Ensayo en Calendario
                </h3>
                <p className="text-xs text-[#efbf67] font-jakarta">
                  Completá los datos de convocatoria para las escenas de Fiesta Pagana
                </p>
              </div>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#efbf67] uppercase">
                  Título de la Escena / Ensayo *
                </label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Escena 5: Daiana y José Mercado"
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#dfbfbc] uppercase">
                    Tipo de Ensayo
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                  >
                    <option value="Teatro-Foro">Ensayo Teatro-Foro</option>
                    <option value="Pasada General">Pasada General</option>
                    <option value="Ensayo de la Libertad">Ensayo de la Libertad</option>
                    <option value="Técnico">Técnico / Luces</option>
                    <option value="Música">Música & Coro</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#dfbfbc] uppercase">
                    Día del Mes ({MONTH_NAMES[currentMonth]})
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={daysInMonth}
                    value={newDay}
                    onChange={(e) => setNewDay(Number(e.target.value))}
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#dfbfbc] uppercase">
                    Horario
                  </label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="19:00 - 22:30"
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#dfbfbc] uppercase">
                    Sala / Ubicación
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Sala Principal (Cámara Negra)"
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#dfbfbc] uppercase">
                  Elenco Convocado
                </label>
                <input
                  type="text"
                  value={newCastInvited}
                  onChange={(e) => setNewCastInvited(e.target.value)}
                  placeholder="Gabriel, La Madre, José Mercado, Dirección"
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#dfbfbc] uppercase">
                  Objetivo Escénico
                </label>
                <textarea
                  rows={2}
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  placeholder="Objetivos dramatúrgicos, pies de entrada y marcaciones de dirección..."
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl p-3 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#1f1f22] text-[#dfbfbc] text-xs font-bold font-jakarta hover:bg-[#28282d] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] text-xs font-bold uppercase tracking-wider font-jakarta shadow-[0_0_15px_rgba(158,42,43,0.5)] transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 text-[#fabc4d]" />
                  <span>Guardar en Calendario</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
