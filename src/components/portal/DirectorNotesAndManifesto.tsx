"use client";

import React, { useState } from "react";
import { BookOpen, Download, FileText, Sparkles, Shield, User, ChevronRight, Check } from "lucide-react";

export default function DirectorNotesAndManifesto() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [notebookOpen, setNotebookOpen] = useState(false);

  const staffDirectory = [
    {
      name: "Lisandro Valenzuela",
      role: "Dirección General & Puesta en Escena",
      badge: "Curaduría",
      contact: "lisandro@fiestapagana.ar",
      status: "Activo",
    },
    {
      name: "Olmo Masini",
      role: "Dirección Musical & Bandoneón",
      badge: "Música",
      contact: "olmo@fiestapagana.ar",
      status: "Activo",
    },
    {
      name: "Romina Guastavino",
      role: "Jefa de Vestuario & Máscaras de Barro",
      badge: "Vestuario",
      contact: "romina@fiestapagana.ar",
      status: "Activo",
    },
    {
      name: "Esteban Carballo",
      role: "Coordinación Teatro-Foro & Asistencia",
      badge: "Dramaturgia",
      contact: "esteban@fiestapagana.ar",
      status: "Activo",
    },
  ];

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Guía de Invocación Rápida & Cuaderno de Dirección Banner */}
      <section
        id="cuaderno-direccion"
        className="rounded-2xl bg-[#141419] border border-[#fabc4d]/30 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 bg-noise"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#9e2a2b]/20 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d] shrink-0 shadow-lg">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="font-jakarta text-xs uppercase tracking-widest text-[#fabc4d] font-bold">
              Guía Litúrgica & Devoluciones
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f7f4eb]">
              Manifiesto Psicomágico & Devoluciones de Ensayo
            </h4>
            <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] mt-1 leading-relaxed">
              Las devoluciones del director tras la última función privada ya están cargadas en el panel para su análisis antes de la pasada general.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => setNotebookOpen(!notebookOpen)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#1f1f22] hover:bg-[#2a2a2d] text-[#f7f4eb] border border-[#58413f] text-center font-jakarta text-xs uppercase tracking-wider font-semibold transition-all"
          >
            {notebookOpen ? "Ocultar Cuaderno" : "Ver Cuaderno de Dirección"}
          </button>

          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] text-center font-jakarta text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(158,42,43,0.4)] flex items-center justify-center gap-2"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span className="text-emerald-300">Textos Descargados</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#fabc4d]" />
                <span>Descargar Textos</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Notebook Expansion Drawer */}
      {notebookOpen && (
        <div className="p-6 rounded-2xl bg-[#0e0e11] border border-[#fabc4d]/40 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#58413f]/30">
            <h5 className="font-cinzel text-lg font-bold text-[#fabc4d] uppercase">
              Anotaciones de Dirección • Puesta en Escena
            </h5>
            <span className="text-xs text-[#efbf67] bg-[#704f00]/30 px-2 py-0.5 rounded border border-[#704f00]">
              Última actualización: 02:40 AM
            </span>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-[#dfbfbc] leading-relaxed">
            <p>
              <strong className="text-[#f7f4eb]">1. El Despojo Inicial:</strong> Los clowns deben sostener la mirada fija un 30% más de tiempo antes de entregar la primera máscara. Evitar cualquier gesto cómico complaciente; la seriedad del clown es trágica.
            </p>
            <p>
              <strong className="text-[#f7f4eb]">2. Entrada del Fuelle:</strong> Olmo Masini marcará el primer crescendo con el bombo de pie. La platea debe sentir el bajo en el esternón antes de que se encienda la luz cenital roja.
            </p>
            <p>
              <strong className="text-[#f7f4eb]">3. Protocolo de Seguridad en Foro:</strong> Si una intervención del público eleva el tono emocional, los dos escoltas enmascarados deben cerrar el semicírculo suavemente con ramas de sauce para contener el espacio.
            </p>
          </div>
        </div>
      )}

      {/* Staff Directory */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#efbf67] font-jakarta text-xs uppercase tracking-[0.18em] font-bold">
            <Shield className="w-4 h-4" />
            <span>Directorio Operativo del Staff & Roles</span>
          </div>
          <span className="text-xs text-[#8a877e]">Accesos Protegidos • Temporada 2025</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {staffDirectory.map((staff, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-[#141419] border border-[#58413f]/40 flex flex-col justify-between gap-3 shadow-md hover:border-[#fabc4d]/40 transition-colors"
            >
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#fabc4d] bg-[#0b0b0e] px-2 py-0.5 rounded border border-[#58413f]/40 inline-block mb-1">
                  {staff.badge}
                </span>
                <h5 className="font-cinzel text-base font-bold text-[#f7f4eb]">
                  {staff.name}
                </h5>
                <p className="text-xs text-[#dfbfbc] leading-tight">
                  {staff.role}
                </p>
              </div>

              <div className="pt-2 border-t border-[#58413f]/20 flex items-center justify-between text-[11px]">
                <span className="text-[#8a877e] truncate">{staff.contact}</span>
                <span className="text-emerald-400 font-semibold">• {staff.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
