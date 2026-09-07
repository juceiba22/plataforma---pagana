"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  Flame,
  Check,
  Package,
  Mic,
  UserCheck,
  UserX,
  Sparkles,
} from "lucide-react";

export default function ProductionAlertsAndAttendance() {
  const [selfConfirmed, setSelfConfirmed] = useState(false);

  const [roster, setRoster] = useState([
    {
      id: "1",
      name: "Mercedes 'Mecha' Aráoz",
      role: "Papel: Chamana Guaraní",
      status: "Confirmado",
    },
    {
      id: "2",
      name: "Olmo Masini",
      role: "Bandoneón & Live Loop",
      status: "Confirmado",
    },
    {
      id: "3",
      name: "Ninio Ancestral",
      role: "Percusión & Voces",
      status: "Confirmado",
    },
    {
      id: "4",
      name: "Lautaro Rivas",
      role: "Papel: El Pombero de Barro",
      status: "Pendiente",
    },
    {
      id: "5",
      name: "Camila Zaldívar",
      role: "Vestuario & Maquillaje",
      status: "Confirmado",
    },
    {
      id: "6",
      name: "Matías 'Tano' Rossi",
      role: "Operador de Luces & Niebla",
      status: "Pendiente",
    },
  ]);

  const toggleSelfStatus = () => {
    setSelfConfirmed(!selfConfirmed);
  };

  const presentCount = roster.filter((r) => r.status === "Confirmado").length + (selfConfirmed ? 1 : 0);
  const totalCount = 24;
  const quorumPercentage = ((21 + (selfConfirmed ? 1 : 0)) / totalCount) * 100;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Tablón de Alertas de Producción */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#ffb3ae] font-jakarta text-xs uppercase tracking-[0.18em] font-bold">
            <Bell className="w-4 h-4 text-[#fabc4d]" />
            <span>Tablón de Alertas & Producción</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#9e2a2b]/30 border border-[#9e2a2b] text-[#ffdad7] font-jakarta text-[10px] uppercase font-bold">
            3 URGENTES
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {/* Alerta 1 */}
          <div className="rounded-2xl bg-[#141419] border border-[#58413f]/40 p-4 sm:p-5 shadow-md flex items-start gap-4 hover:border-[#9e2a2b]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#9e2a2b] flex items-center justify-center text-[#f7f4eb] shrink-0 mt-0.5 shadow-md">
              <AlertTriangle className="w-5 h-5 text-[#fabc4d]" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-base font-bold text-[#f7f4eb]">
                  Aviso de Máscaras y Alergias
                </span>
                <span className="font-jakarta text-[10px] text-[#8a877e]">
                  Hace 25 min
                </span>
              </div>
              <p className="font-jakarta text-xs text-[#dfbfbc] leading-relaxed">
                El departamento de vestuario terminó el sellado de arcilla con cera virgen de abejas. Por favor, avisar a Romina si alguien presenta sensibilidad antes del ensayo general del miércoles.
              </p>
            </div>
          </div>

          {/* Alerta 2 */}
          <div className="rounded-2xl bg-[#141419] border border-[#58413f]/40 p-4 sm:p-5 shadow-md flex items-start gap-4 hover:border-[#bd8718]/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#bd8718] flex items-center justify-center text-[#281900] shrink-0 mt-0.5 shadow-md">
              <Package className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-base font-bold text-[#f7f4eb]">
                  Utilería Ritual: Banderines de la Difunta
                </span>
                <span className="font-jakarta text-[10px] text-[#8a877e]">
                  Hace 2 horas
                </span>
              </div>
              <p className="font-jakarta text-xs text-[#dfbfbc] leading-relaxed">
                Se sumaron 40 metros de cintas rojas para la escena del milagro colectivo. Cada intérprete debe buscar su faja numerada en el camarín 3.
              </p>
            </div>
          </div>

          {/* Alerta 3 */}
          <div className="rounded-2xl bg-[#141419] border border-[#58413f]/40 p-4 sm:p-5 shadow-md flex items-start gap-4 hover:border-[#58413f] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#2a2a2d] flex items-center justify-center text-[#efbf67] shrink-0 mt-0.5 shadow-md">
              <Mic className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-base font-bold text-[#f7f4eb]">
                  Chequeo de Voces & Calentamiento Corporal
                </span>
                <span className="font-jakarta text-[10px] text-[#8a877e]">
                  Ayer
                </span>
              </div>
              <p className="font-jakarta text-xs text-[#dfbfbc] leading-relaxed">
                Habrá 45 minutos de bioenergética vocal antes de que suban Olmo Masini y Ninio Ancestral a la tarima. Puntualidad excluyente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Confirmación de Asistencia de Elenco */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#fabc4d] font-jakarta text-xs uppercase tracking-[0.18em] font-bold">
            <UserCheck className="w-4 h-4" />
            <span>Confirmación de Asistencia</span>
          </div>
          <span className="font-jakarta text-xs text-[#dfbfbc] font-semibold">
            {selfConfirmed ? "22" : "21"} / 24 PRESENTES
          </span>
        </div>

        <div className="rounded-2xl bg-[#141419] border border-[#58413f]/40 p-5 shadow-lg flex flex-col gap-4">
          {/* Progress ring card */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#0b0b0e] border border-[#58413f]/40 gap-4">
            <div className="flex items-center gap-3.5">
              <svg className="w-12 h-12 shrink-0 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#2a2a2d]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                ></path>
                <path
                  className="text-[#fabc4d] transition-all duration-700"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={`${quorumPercentage.toFixed(1)}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>
              </svg>
              <div className="flex flex-col">
                <span className="font-cinzel text-base font-bold text-[#f7f4eb]">
                  {quorumPercentage.toFixed(1)}% Quórum
                </span>
                <span className="font-jakarta text-xs text-[#dfbfbc]">
                  Llamado general del Viernes
                </span>
              </div>
            </div>

            <button
              onClick={toggleSelfStatus}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-jakarta text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                selfConfirmed
                  ? "bg-[#bd8718] text-[#281900] shadow-[0_0_15px_rgba(250,188,77,0.4)]"
                  : "bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] shadow-[0_0_15px_rgba(158,42,43,0.4)]"
              }`}
            >
              {selfConfirmed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Asistencia Confirmada!</span>
                </>
              ) : (
                <span>Confirmar Mi Asistencia</span>
              )}
            </button>
          </div>

          {/* Roster List */}
          <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
            {roster.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0b0b0e] border border-[#58413f]/30 hover:border-[#58413f] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      member.status === "Confirmado"
                        ? "bg-[#fabc4d]"
                        : "bg-[#ffb4ab] animate-pulse"
                    }`}
                  ></span>
                  <div className="flex flex-col">
                    <span className="font-jakarta text-xs font-semibold text-[#f7f4eb]">
                      {member.name}
                    </span>
                    <span className="font-jakarta text-[11px] text-[#8a877e]">
                      {member.role}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded font-jakarta text-[10px] uppercase font-bold ${
                    member.status === "Confirmado"
                      ? "bg-[#bd8718]/20 text-[#fabc4d] border border-[#bd8718]/40"
                      : "bg-[#93000a]/30 text-[#ffb4ab] border border-[#93000a]/50"
                  }`}
                >
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
