"use client";

import React, { useState } from "react";
import {
  X,
  Radio,
  Sparkles,
  Check,
  Copy,
  Key,
  Layers,
  FileText,
  Loader2,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";

interface NewBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBroadcastCreated: (streamData: {
    streamKey: string;
    playbackId: string;
    title: string;
    subtitle: string;
    category: string;
  }) => void;
}

export default function NewBroadcastModal({
  isOpen,
  onClose,
  onBroadcastCreated,
}: NewBroadcastModalProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("ensayos");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Result state after creation
  const [createdStream, setCreatedStream] = useState<{
    streamKey: string;
    playbackId: string;
    title: string;
    subtitle: string;
    category: string;
  } | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedRtmp, setCopiedRtmp] = useState(false);

  const rtmpServerUrl = "rtmps://global-live.mux.com:443/app";

  if (!isOpen) return null;

  const copyToClipboard = (text: string, type: "rtmp" | "key") => {
    navigator.clipboard.writeText(text);
    if (type === "rtmp") {
      setCopiedRtmp(true);
      setTimeout(() => setCopiedRtmp(false), 2000);
    } else {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/mux/live-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          subtitle: subtitle.trim(),
          category,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "No se pudo crear la emisión en Mux");
      }

      const streamKey = data.stream?.stream_key || "";
      const playbackId = data.stream?.playback_ids?.[0]?.id || "";

      const createdObj = {
        streamKey,
        playbackId,
        title: title.trim(),
        subtitle: subtitle.trim(),
        category,
      };

      // Save to active stage config
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("pagana_live_stage_config");
        const parsed = stored ? JSON.parse(stored) : {};
        localStorage.setItem(
          "pagana_live_stage_config",
          JSON.stringify({
            ...parsed,
            muxStreamKey: streamKey,
            muxPlaybackId: playbackId,
            currentTitle: title.trim(),
            currentSubtitle: subtitle.trim(),
            currentCategory: category,
            broadcastMode: "mux",
          })
        );

        // Add to history list in localStorage
        const historyStored = localStorage.getItem("pagana_broadcast_history");
        const historyList = historyStored ? JSON.parse(historyStored) : [];
        const newHistoryItem = {
          id: data.stream?.id || Date.now().toString(),
          playback_id: playbackId,
          title: title.trim(),
          subtitle: subtitle.trim(),
          category,
          created_at: new Date().toISOString(),
          status: "ready",
          duration: 0,
        };
        localStorage.setItem(
          "pagana_broadcast_history",
          JSON.stringify([newHistoryItem, ...historyList])
        );

        window.dispatchEvent(
          new CustomEvent("pagana_stage_config_updated", {
            detail: {
              muxStreamKey: streamKey,
              muxPlaybackId: playbackId,
              currentTitle: title.trim(),
              currentSubtitle: subtitle.trim(),
              currentCategory: category,
              broadcastMode: "mux",
            },
          })
        );
        window.dispatchEvent(new CustomEvent("pagana_broadcast_history_updated"));
      }

      setCreatedStream(createdObj);
      onBroadcastCreated(createdObj);
    } catch (err: any) {
      setErrorMessage(err.message || "Error al conectar con Mux");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    setCreatedStream(null);
    setTitle("");
    setSubtitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#141419] border border-[#fabc4d]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(158,42,43,0.6)] bg-noise text-[#f7f4eb] max-h-[90vh] overflow-y-auto">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#9e2a2b]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={createdStream ? handleFinish : onClose}
          className="absolute top-5 right-5 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-1.5 rounded-lg bg-[#1f1f22]"
        >
          <X className="w-5 h-5" />
        </button>

        {!createdStream ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#9e2a2b]/30 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d]">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider text-[#f7f4eb]">
                  Nueva Emisión en Directo
                </h3>
                <p className="text-xs text-[#efbf67] font-jakarta">
                  Configura el título y descripción para que quede archivada en el historial
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab]/50 text-xs text-[#ffdad6] mb-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#fabc4d] uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Título de la Transmisión *
                </label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Ensayo General - Acto II: La Salamanca Criolla"
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                />
              </div>

              {/* Subtitle / Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#dfbfbc] uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#efbf67]" />
                  Subtítulo / Objetivos del Ensayo
                </label>
                <textarea
                  rows={3}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Ej. Puesta de luces cenitales, prueba de micrófonos y marcación de desplazamientos con todo el elenco."
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl p-3 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#efbf67] uppercase tracking-wider">
                  Categoría / Sección del Archivo
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                >
                  <option value="ensayos">Ensayos Generales</option>
                  <option value="puesta_en_escena">Puesta en Escena & Iluminación</option>
                  <option value="masterclass">Masterclasses & Dramaturgia</option>
                  <option value="musica">Música & Bandoneón</option>
                  <option value="ritual">Ritual & Trance</option>
                </select>
              </div>

              {/* VOD Notice */}
              <div className="p-3.5 rounded-xl bg-[#0b0b0e] border border-[#58413f]/40 text-[11px] text-[#dfbfbc] leading-relaxed flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#fabc4d] shrink-0 mt-0.5" />
                <span>
                  Al generar la emisión, Mux activará automáticamente la <strong>grabación VOD</strong>. Al terminar la transmisión en OBS, el video quedará registrado en el historial de la sala de streaming con este título y descripción.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#1f1f22] text-[#dfbfbc] text-xs font-bold font-jakarta hover:bg-[#28282d] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] text-xs font-bold uppercase tracking-wider font-jakarta shadow-[0_0_15px_rgba(158,42,43,0.5)] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generando en Mux...</span>
                    </>
                  ) : (
                    <>
                      <Radio className="w-4 h-4 text-[#fabc4d]" />
                      <span>Generar Transmisión</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Stream Created Success View */
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider text-[#f7f4eb]">
                  ¡Emisión Creada Exitosamente!
                </h3>
                <p className="text-xs text-emerald-400 font-jakarta">
                  Copia estas claves en OBS Studio o vMix para comenzar a emitir
                </p>
              </div>
            </div>

            {/* Broadcast Details Card */}
            <div className="p-4 rounded-xl bg-[#0b0b0e] border border-[#58413f]/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-cinzel font-bold text-sm text-[#f7f4eb]">
                  {createdStream.title}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#9e2a2b]/30 text-[#ffb3ae] text-[10px] font-bold uppercase">
                  {createdStream.category}
                </span>
              </div>
              {createdStream.subtitle && (
                <p className="text-xs text-[#dfbfbc] leading-relaxed">
                  {createdStream.subtitle}
                </p>
              )}
            </div>

            {/* Keys to copy */}
            <div className="space-y-3">
              {/* RTMP Server */}
              <div className="space-y-1">
                <label className="text-[11px] text-[#dfbfbc] font-semibold">
                  URL del Servidor RTMP (Mux)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={rtmpServerUrl}
                    className="flex-1 bg-[#0b0b0e] border border-[#58413f] rounded-lg px-3 py-2 text-xs font-mono text-[#f7f4eb] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(rtmpServerUrl, "rtmp")}
                    className="px-3 py-2 rounded-lg bg-[#1f1f22] border border-[#58413f] text-[#fabc4d] hover:bg-[#9e2a2b] hover:text-white transition-colors text-xs font-bold flex items-center gap-1"
                  >
                    {copiedRtmp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedRtmp ? "Copiado" : "Copiar"}</span>
                  </button>
                </div>
              </div>

              {/* Stream Key */}
              <div className="space-y-1">
                <label className="text-[11px] text-[#dfbfbc] font-semibold">
                  Clave de Emisión (Stream Key)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={createdStream.streamKey}
                    className="flex-1 bg-[#0b0b0e] border border-[#58413f] rounded-lg px-3 py-2 text-xs font-mono text-[#f7f4eb] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(createdStream.streamKey, "key")}
                    className="px-3 py-2 rounded-lg bg-[#1f1f22] border border-[#58413f] text-[#fabc4d] hover:bg-[#9e2a2b] hover:text-white transition-colors text-xs font-bold flex items-center gap-1"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey ? "Copiado" : "Copiar"}</span>
                  </button>
                </div>
              </div>

              {/* Playback ID */}
              <div className="space-y-1">
                <label className="text-[11px] text-[#dfbfbc] font-semibold">
                  Playback ID (Configurado automáticamente en la sala)
                </label>
                <input
                  type="text"
                  readOnly
                  value={createdStream.playbackId}
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-lg px-3 py-2 text-xs font-mono text-[#dfbfbc]"
                />
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase font-bold tracking-wider hover:brightness-110 shadow-lg flex items-center gap-1.5"
              >
                <span>Ir al Escenario de Transmisión</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
