"use client";

import React, { useState } from "react";
import { X, Download, FileText, Music, Play, Pause, ExternalLink, Sparkles, Check, Flame, MessageSquare, Image as ImageIcon } from "lucide-react";

export interface DepartmentData {
  id: string;
  areaNumber: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  files: { name: string; type: string; size: string; href?: string }[];
  keyGuidelines: string[];
  channelLink: string;
  galleryImages?: { caption: string; url: string }[];
}

interface DepartmentModalProps {
  department: DepartmentData | null;
  onClose: () => void;
}

export default function DepartmentModal({ department, onClose }: DepartmentModalProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [downloadedFile, setDownloadedFile] = useState<string | null>(null);

  if (!department) return null;

  const handleDownload = (fileName: string) => {
    setDownloadedFile(fileName);
    setTimeout(() => setDownloadedFile(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#141419] border border-[#fabc4d]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(158,42,43,0.5)] bg-noise text-[#f7f4eb] overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#9e2a2b]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-1.5 rounded-lg bg-[#1f1f22]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#9e2a2b]/30 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d]">
            {department.icon}
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-[#efbf67] font-bold">
              {department.areaNumber} • Mesa de Coordinación
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold uppercase text-[#f7f4eb]">
              {department.title}
            </h3>
          </div>
        </div>

        {/* Body Description */}
        <p className="text-sm text-[#dfbfbc] leading-relaxed mb-6 font-jakarta">
          {department.description}
        </p>

        {/* Key Guidelines / Pautas */}
        <div className="mb-6 space-y-2">
          <h4 className="text-xs uppercase tracking-wider text-[#fabc4d] font-bold flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" />
            Pautas Clave del Departamento
          </h4>
          <div className="p-4 rounded-xl bg-[#0b0b0e] border border-[#58413f]/40 space-y-2">
            {department.keyGuidelines.map((guideline, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#dfbfbc]">
                <span className="text-[#fabc4d] font-bold">•</span>
                <span>{guideline}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stems Player if Music Department */}
        {department.id === "musica" && (
          <div className="mb-6 p-4 rounded-xl bg-[#0e0e11] border border-[#fabc4d]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#fabc4d] font-bold flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" />
                Preescucha de Stem en Vivo
              </span>
              <span className="text-[10px] text-[#efbf67] bg-[#704f00]/30 px-2 py-0.5 rounded border border-[#704f00]">
                128 BPM • Sol Menor
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-10 h-10 rounded-lg bg-[#9e2a2b] text-[#f7f4eb] flex items-center justify-center hover:bg-[#c1383a] shadow-[0_0_15px_rgba(158,42,43,0.5)] transition-all"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div className="flex-grow space-y-1">
                <div className="flex justify-between text-xs text-[#f7f4eb]">
                  <span>Chacarera_Trance_BPM128.wav</span>
                  <span className="text-[#8a877e]">{isPlayingAudio ? "01:24 / 04:12" : "00:00 / 04:12"}</span>
                </div>
                <div className="w-full h-1.5 bg-[#1f1f22] rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-[#fabc4d] transition-all duration-300 ${
                      isPlayingAudio ? "w-1/3 animate-pulse" : "w-0"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Files & Repositories */}
        <div className="mb-6 space-y-2">
          <h4 className="text-xs uppercase tracking-wider text-[#efbf67] font-bold">
            Archivos & Planos Descargables
          </h4>
          <div className="space-y-2">
            {department.files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0b0b0e] border border-[#58413f]/40 hover:border-[#58413f]"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#fabc4d]" />
                  <div>
                    <span className="text-xs font-semibold text-[#f7f4eb] block">
                      {file.name}
                    </span>
                    <span className="text-[10px] text-[#8a877e]">
                      {file.type} • {file.size}
                    </span>
                  </div>
                </div>
                {file.href ? (
                  <a
                    href={file.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f1f22] hover:bg-[#2a2a2d] border border-[#58413f] text-xs text-[#dfbfbc] hover:text-[#f7f4eb] transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#fabc4d]" />
                    <span>Abrir</span>
                  </a>
                ) : (
                  <button
                    onClick={() => handleDownload(file.name)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f1f22] hover:bg-[#2a2a2d] border border-[#58413f] text-xs text-[#dfbfbc] hover:text-[#f7f4eb] transition-all"
                  >
                    {downloadedFile === file.name ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Descargado</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-[#fabc4d]" />
                        <span>Descargar</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action footer */}
        <div className="pt-4 border-t border-[#58413f]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={department.channelLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#fabc4d] text-[#281900] font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(250,188,77,0.4)] hover:brightness-110 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Canal de Chat {department.title.split("&")[0]}</span>
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1f1f22] hover:bg-[#2a2a2d] text-[#dfbfbc] hover:text-[#f7f4eb] text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            Cerrar Mesa
          </button>
        </div>
      </div>
    </div>
  );
}
