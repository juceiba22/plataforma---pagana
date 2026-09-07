"use client";

import React, { useState } from "react";
import {
  Theater,
  BookOpen,
  Music,
  Lightbulb,
  FileText,
  Sparkles,
  Eye,
  Edit,
  Headphones,
  Download,
  Flame,
  Radio,
} from "lucide-react";
import DepartmentModal, { DepartmentData } from "./DepartmentModal";

const DEPARTMENTS: DepartmentData[] = [
  {
    id: "vestuario",
    areaNumber: "Área 01",
    title: "Vestuario, Máscaras & Atuendos",
    description:
      "Catálogo de máscaras ceremoniales de barro y plumas. Fichas de encarnación para arquetipos: El Familiar, La Viuda Negra y Las Chamanas del Delta.",
    icon: <Theater className="w-6 h-6" />,
    accentColor: "primary",
    files: [
      { name: "Catalogo_Mascaras_v4.pdf", type: "PDF", size: "14.2 MB" },
      { name: "Guia_Limpieza_Textiles.pdf", type: "PDF", size: "2.1 MB" },
    ],
    keyGuidelines: [
      "Las máscaras de arcilla deben acondicionarse con aceite de almendras tras cada pasada.",
      "El vestuario del Pombero de Barro requiere 15 minutos de secado al sol antes de escena.",
      "Ajustar visión periférica en penumbra con linternas rojas.",
    ],
    channelLink: "#chat-vestuario",
  },
  {
    id: "dramaturgia",
    areaNumber: "Área 02",
    title: "Dramaturgia & Teatro-Foro",
    description:
      "Pautas de improvisación guiada con el público. Disparadores psicomágicos de Jodorowsky adaptados a la mitología pampeana y conurbana.",
    icon: <BookOpen className="w-6 h-6" />,
    accentColor: "secondary",
    files: [
      { name: "Guion_Dinamico_Teatro_Foro_MMXXV.pdf", type: "PDF", size: "5.8 MB" },
      { name: "Disparadores_Psicomagicos_Abasto.pdf", type: "PDF", size: "1.4 MB" },
    ],
    keyGuidelines: [
      "Ruptura inmersiva de la cuarta pared programada en el minuto 42.",
      "Desarme del opresor mediante intervención de coplas y canon vocal.",
      "Si el espectador propone un giro imprevisto, aceptar la ofrenda y conducirla al rito.",
    ],
    channelLink: "#chat-dramaturgia",
  },
  {
    id: "musica",
    areaNumber: "Área 03",
    title: "Música & Sonido",
    description:
      "Stems de respaldo, partituras de bandoneón en Sol menor y la lista de transición folclórica-electrónica para el DJ Set del desenlace festivo.",
    icon: <Music className="w-6 h-6" />,
    accentColor: "tertiary",
    files: [
      { name: "Chacarera_Trance_BPM128.wav", type: "WAV", size: "48.5 MB" },
      { name: "Duelo_Bandoneon_Olmo.mp3", type: "MP3", size: "9.2 MB" },
      { name: "Partitura_Bandoneon_SolMenor.pdf", type: "PDF", size: "3.4 MB" },
    ],
    keyGuidelines: [
      "Monitoreo in-ear para Olmo Masini en canal 3 (reverberación al 65%).",
      "El bombo legüero de Ninio Ancestral ingresa en el compás 64 de la invocación.",
      "Transición fluida a 128 BPM en el inicio del baile dionisíaco.",
    ],
    channelLink: "#chat-musica",
  },
  {
    id: "tecnica",
    areaNumber: "Área 04",
    title: "Técnica & Luces",
    description:
      "Rider de iluminación teatral con 16 canales DMX. Esquemas espaciales de luminarias cenitales rojas y humos fríos para el rito de fuego.",
    icon: <Lightbulb className="w-6 h-6" />,
    accentColor: "charcoal",
    files: [
      { name: "Plano_Parrilla_Teatral.dwg", type: "CAD", size: "22.0 MB" },
      { name: "Patch_DMX_Show_2025.xml", type: "XML", size: "540 KB" },
      { name: "Rider_Tecnico_Galpon_Guevara.pdf", type: "PDF", size: "4.8 MB" },
    ],
    keyGuidelines: [
      "Canal DMX 07 asignado a estroboscópica ámbar para el clímax del rito.",
      "Máquinas de humo a base de agua: disparo en 15% continuo durante toda la función.",
      "Mantener luz de seguridad en pasillos laterales para circulación del público.",
    ],
    channelLink: "#chat-tecnica",
  },
];

export default function DepartmentWorkspaces() {
  const [selectedDept, setSelectedDept] = useState<DepartmentData | null>(null);

  return (
    <section id="partituras-textos" className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col">
        <span className="font-jakarta text-xs uppercase tracking-[0.18em] text-[#fabc4d] font-bold">
          Grimorio & Logística de Producción
        </span>
        <h2 className="font-cinzel text-2xl sm:text-3xl text-[#f7f4eb] tracking-tight font-bold">
          Mesas de Trabajo por Departamentos
        </h2>
      </div>

      {/* Grid of 4 Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {DEPARTMENTS.map((dept) => (
          <div
            key={dept.id}
            className="flex flex-col justify-between rounded-2xl bg-[#141419] border border-[#58413f]/40 p-6 shadow-lg hover:shadow-2xl hover:border-[#fabc4d]/50 transition-all duration-300 group"
          >
            <div className="flex flex-col gap-3">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#9e2a2b]/20 border border-[#9e2a2b]/50 flex items-center justify-center text-[#fabc4d] group-hover:scale-105 transition-transform shadow-md">
                {dept.icon}
              </div>

              <div>
                <span className="font-jakarta text-[10px] text-[#8a877e] uppercase tracking-widest font-semibold">
                  {dept.areaNumber}
                </span>
                <h3 className="font-cinzel text-lg font-bold text-[#f7f4eb] group-hover:text-[#fabc4d] transition-colors leading-snug">
                  {dept.title}
                </h3>
              </div>

              <p className="font-jakarta text-xs text-[#dfbfbc] leading-relaxed">
                {dept.description}
              </p>

              {/* Resource preview box */}
              <div className="p-3 rounded-xl bg-[#0b0b0e] border border-[#58413f]/30 space-y-1.5">
                <span className="font-jakarta text-[10px] text-[#fabc4d] uppercase font-bold block">
                  Archivos & Pistas:
                </span>
                <ul className="text-xs text-[#dfbfbc] space-y-1">
                  {dept.files.slice(0, 2).map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5 truncate text-[11px]">
                      <FileText className="w-3.5 h-3.5 text-[#ffb3ae] shrink-0" />
                      <span className="truncate">{f.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Trigger */}
            <button
              onClick={() => setSelectedDept(dept)}
              className="w-full mt-5 py-2.5 rounded-xl bg-[#1f1f22] group-hover:bg-[#9e2a2b] group-hover:text-[#f7f4eb] text-[#f7f4eb] font-jakarta text-xs uppercase tracking-wider font-semibold border border-[#58413f]/50 group-hover:border-transparent transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {dept.id === "vestuario" && <Eye className="w-3.5 h-3.5" />}
              {dept.id === "dramaturgia" && <Edit className="w-3.5 h-3.5" />}
              {dept.id === "musica" && <Headphones className="w-3.5 h-3.5" />}
              {dept.id === "tecnica" && <Download className="w-3.5 h-3.5" />}
              <span>
                {dept.id === "vestuario"
                  ? "Abrir Catálogo"
                  : dept.id === "dramaturgia"
                  ? "Leer Guion Dinámico"
                  : dept.id === "musica"
                  ? "Reproducir Stems"
                  : "Descargar Rider"}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Department Detail Modal */}
      <DepartmentModal
        department={selectedDept}
        onClose={() => setSelectedDept(null)}
      />
    </section>
  );
}
