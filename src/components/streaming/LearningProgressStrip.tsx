"use client";

import React from "react";
import { Award, Sparkles, Flame, CheckCircle2 } from "lucide-react";

export default function LearningProgressStrip() {
  return (
    <section className="p-6 sm:p-8 rounded-2xl bg-[#141419] border border-[#fabc4d]/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 bg-noise">
      <div className="flex flex-col gap-2 max-w-xl">
        <div className="flex items-center gap-1.5 text-[#fabc4d] font-jakarta text-xs uppercase tracking-[0.18em] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bitácora de Asistencia y Estudio</span>
        </div>
        <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f7f4eb]">
          Tu Nivel de Canalización Escénica
        </h3>
        <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] leading-relaxed">
          Has completado <strong className="text-[#f7f4eb]">18 de las 24 transmisiones</strong> de la temporada de verano. Tu presencia en la sala virtual suma directamente al registro oficial de asistencia del elenco.
        </p>
      </div>

      <div className="flex items-center gap-8 sm:gap-10 flex-wrap justify-center">
        {/* Circular Progress Indicator SVG */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#2a2a2d]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              ></path>
              <path
                className="text-[#fabc4d]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="75, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              ></path>
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-cinzel text-lg font-bold text-[#f7f4eb]">75%</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-sm font-bold text-[#f7f4eb]">
              Módulo Avanzado
            </span>
            <span className="font-jakarta text-xs text-[#dfbfbc]">
              6 horas restantes
            </span>
          </div>
        </div>

        <div className="h-12 w-px bg-[#58413f]/40 hidden md:block"></div>

        {/* Company Certification */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#9e2a2b]/20 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d] shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-sm font-bold text-[#f7f4eb]">
              Certificación de Compañía
            </span>
            <span className="font-jakarta text-xs text-[#fabc4d] font-semibold">
              Acreditación Febrero 2025
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
