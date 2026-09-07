"use client";

import React, { useState } from "react";
import { X, Sparkles, Flame, Check } from "lucide-react";

interface NewThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newThread: {
    title: string;
    tag: string;
    description: string;
    author: string;
  }) => void;
}

export default function NewThreadModal({ isOpen, onClose, onSubmit }: NewThreadModalProps) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("Psicomagia");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("Elenco Staff");
  const [published, setPublished] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setPublished(true);
    setTimeout(() => {
      onSubmit({
        title: title.trim(),
        tag,
        description: description.trim(),
        author: author.trim() || "Staff Activo",
      });
      setPublished(false);
      setTitle("");
      setDescription("");
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#141419] border border-[#fabc4d]/40 max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(158,42,43,0.5)] bg-noise text-[#f7f4eb] flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#58413f]/30">
          <div>
            <span className="font-jakarta text-xs uppercase tracking-widest text-[#fabc4d] font-bold">
              Apertura Dialéctica
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f7f4eb]">
              Crear Nuevo Hilo de Debate
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1f1f22] text-[#dfbfbc] hover:text-[#fabc4d] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {published ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#9e2a2b]/30 border border-[#fabc4d] text-[#fabc4d] flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="font-cinzel text-xl font-bold text-[#f7f4eb]">
              Hilo Consagrado en el Ágora
            </h4>
            <p className="text-xs text-[#dfbfbc]">
              Tu propuesta ha sido distribuida a las comisiones escénicas correspondientes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="font-jakarta text-xs uppercase tracking-wider text-[#dfbfbc] font-bold block">
                Título del Hilo / Proposición
              </label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Dinámica de canto unísono con el público en el clímax final..."
                className="w-full bg-[#0b0b0e] text-[#f7f4eb] placeholder-[#8a877e] font-jakarta text-xs sm:text-sm px-4 py-3 rounded-xl border border-[#58413f] focus:outline-none focus:border-[#fabc4d] transition-all"
              />
            </div>

            {/* Department / Tag selection */}
            <div className="space-y-1.5">
              <label className="font-jakarta text-xs uppercase tracking-wider text-[#dfbfbc] font-bold block">
                Departamento / Etiqueta Ritual
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "Psicomagia", color: "peer-checked:bg-[#9e2a2b]" },
                  { id: "Logística", color: "peer-checked:bg-[#bd8718]" },
                  { id: "Ensayos", color: "peer-checked:bg-[#704f00]" },
                  { id: "Sugerencias", color: "peer-checked:bg-[#353438]" },
                ].map((item) => (
                  <label key={item.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="tag"
                      value={item.id}
                      checked={tag === item.id}
                      onChange={(e) => setTag(e.target.value)}
                      className="peer sr-only"
                    />
                    <div
                      className={`p-2.5 text-center rounded-xl bg-[#0b0b0e] border border-[#58413f]/40 font-jakarta text-xs uppercase font-semibold transition-all text-[#dfbfbc] peer-checked:text-[#f7f4eb] peer-checked:border-[#fabc4d] ${item.color}`}
                    >
                      {item.id}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="space-y-1.5">
              <label className="font-jakarta text-xs uppercase tracking-wider text-[#dfbfbc] font-bold block">
                Nombre de Quien Propone
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Tu nombre o seudónimo escénico"
                className="w-full bg-[#0b0b0e] text-[#f7f4eb] placeholder-[#8a877e] font-jakarta text-xs px-4 py-2.5 rounded-xl border border-[#58413f] focus:outline-none focus:border-[#fabc4d]"
              />
            </div>

            {/* Description / Content */}
            <div className="space-y-1.5">
              <label className="font-jakarta text-xs uppercase tracking-wider text-[#dfbfbc] font-bold block">
                Desarrollo Teatral & Justificación
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escribí el planteo dramatúrgico, dudas escénicas o detalles logísticos requeridos..."
                className="w-full bg-[#0b0b0e] text-[#f7f4eb] placeholder-[#8a877e] font-jakarta text-xs sm:text-sm p-4 rounded-xl border border-[#58413f] focus:outline-none focus:border-[#fabc4d] resize-none"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#58413f]/30">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-jakarta uppercase font-semibold text-[#dfbfbc] hover:text-[#f7f4eb] transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-jakarta text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(158,42,43,0.5)] transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#fabc4d]" />
                Publicar Hilo en Ágora
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
