"use client";

import React from "react";
import { X, Sparkles, Flame, Music, Feather, Shield, Eye, Image as ImageIcon } from "lucide-react";

export interface CharacterData {
  id: string;
  name: string;
  archetype: string;
  element: string;
  performer: string;
  image?: string;
  quote: string;
  description: string;
  psychomagicFunction: string;
  ritualMask: string;
  frequency: string;
}

interface CharacterModalProps {
  character: CharacterData | null;
  onClose: () => void;
}

export default function CharacterModal({ character, onClose }: CharacterModalProps) {
  if (!character) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#141419] border border-[#fabc4d]/30 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(158,42,43,0.5)] bg-noise text-[#f7f4eb] max-h-[92vh] overflow-y-auto">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#9e2a2b]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-2 rounded-full bg-black/60 backdrop-blur-md border border-[#58413f]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header (Clean stylized banner without mock image) */}
        <div className="relative h-48 sm:h-56 w-full bg-gradient-to-b from-[#1f1f22] to-[#141419] flex flex-col justify-end p-6 border-b border-[#58413f]/40">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#9e2a2b]/80 border border-[#9e2a2b] text-[#ffdad7] text-[11px] uppercase tracking-wider font-semibold mb-2">
                <Sparkles className="w-3 h-3 text-[#fabc4d]" />
                <span>{character.archetype}</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#f7f4eb] drop-shadow-md">
                {character.name}
              </h3>
            </div>
            <span className="text-xs uppercase tracking-widest text-[#efbf67] font-semibold bg-[#0e0e11]/80 px-3 py-1 rounded-full border border-[#fabc4d]/30">
              {character.element}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Sacred Quote */}
          <blockquote className="p-4 rounded-xl bg-[#0b0b0e] border-l-4 border-[#fabc4d] italic text-sm sm:text-base text-[#efbf67] leading-relaxed">
            "{character.quote}"
          </blockquote>

          {/* Lore & Description */}
          <div className="space-y-2">
            <h4 className="font-jakarta text-xs uppercase tracking-widest text-[#fabc4d] font-bold">
              Mitología & Dramaturgia
            </h4>
            <p className="text-sm text-[#dfbfbc] leading-relaxed">
              {character.description}
            </p>
          </div>

          {/* Dossier Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#0e0e11] border border-[#58413f]/40 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#fabc4d] font-semibold uppercase">
                <Flame className="w-3.5 h-3.5" />
                Función Psicomágica
              </div>
              <p className="text-xs text-[#f7f4eb]">
                {character.psychomagicFunction}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0e0e11] border border-[#58413f]/40 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#efbf67] font-semibold uppercase">
                <Eye className="w-3.5 h-3.5" />
                Máscara & Atuendo Ritual
              </div>
              <p className="text-xs text-[#f7f4eb]">
                {character.ritualMask}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0e0e11] border border-[#58413f]/40 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#ffb3ae] font-semibold uppercase">
                <Music className="w-3.5 h-3.5" />
                Afinación & Frecuencia
              </div>
              <p className="text-xs text-[#f7f4eb]">
                {character.frequency}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0e0e11] border border-[#58413f]/40 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#dfbfbc] font-semibold uppercase">
                <Feather className="w-3.5 h-3.5" />
                Intérprete / Performer
              </div>
              <p className="text-xs text-[#f7f4eb]">
                {character.performer}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#1f1f22] hover:bg-[#2a2a2d] text-[#f7f4eb] font-semibold text-xs uppercase tracking-widest border border-[#58413f] transition-colors"
            >
              Cerrar Ficha del Personaje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
