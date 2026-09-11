"use client";

import React, { useState } from "react";
import {
  X,
  Sliders,
  Video,
  Volume2,
  Sparkles,
  Check,
  Copy,
  Key,
  Globe,
  Radio,
  ExternalLink,
} from "lucide-react";

interface StageSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  muxStreamKey: string;
  setMuxStreamKey: (key: string) => void;
  muxPlaybackId: string;
  setMuxPlaybackId: (id: string) => void;
  meetUrl: string;
  setMeetUrl: (url: string) => void;
  broadcastMode: "mux" | "meet";
  setBroadcastMode: (mode: "mux" | "meet") => void;
}

export default function StageSettingsModal({
  isOpen,
  onClose,
  muxStreamKey,
  setMuxStreamKey,
  muxPlaybackId,
  setMuxPlaybackId,
  meetUrl,
  setMeetUrl,
  broadcastMode,
  setBroadcastMode,
}: StageSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<"broadcast" | "audio" | "camera">("broadcast");
  const [saved, setSaved] = useState(false);
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "pagana_live_stage_config",
        JSON.stringify({
          muxStreamKey: muxStreamKey.trim(),
          muxPlaybackId: muxPlaybackId.trim(),
          meetUrl: meetUrl.trim(),
          broadcastMode,
        })
      );
      window.dispatchEvent(
        new CustomEvent("pagana_stage_config_updated", {
          detail: { muxStreamKey, muxPlaybackId, meetUrl, broadcastMode },
        })
      );
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#141419] border border-[#fabc4d]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(158,42,43,0.6)] bg-noise text-[#f7f4eb] max-h-[90vh] overflow-y-auto">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#9e2a2b]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-1.5 rounded-lg bg-[#1f1f22]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#9e2a2b]/30 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d]">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider text-[#f7f4eb]">
              Configuración de Transmisión & OBS / Meet
            </h3>
            <p className="text-xs text-[#efbf67] font-jakarta">
              Ajustes de servidor MUX para OBS Studio y enlace embebido de Google Meet
            </p>
          </div>
        </div>

        {/* Instruction Info Banner */}
        <div className="p-3.5 rounded-xl bg-[#9e2a2b]/20 border border-[#fabc4d]/30 text-xs text-[#dfbfbc] mb-5 leading-relaxed">
          <span className="text-[#fabc4d] font-bold block mb-1">🔑 Claves de Transmisión Reales:</span>
          Para generar claves de emisión automáticamente con 1 clic, añade <code className="bg-[#0b0b0e] px-1 py-0.5 rounded text-[#fabc4d]">MUX_TOKEN_ID</code> y <code className="bg-[#0b0b0e] px-1 py-0.5 rounded text-[#fabc4d]">MUX_TOKEN_SECRET</code> en tus variables de entorno. De lo contrario, puedes pegar directamente aquí tu <strong>Clave de Emisión</strong> y <strong>Playback ID</strong> obtenidos de Mux u OBS y hacer clic en <em>Aplicar a Producción</em>.
        </div>

        {/* Settings Navigation Tabs */}
        <div className="flex border-b border-[#58413f]/40 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("broadcast")}
            className={`pb-2.5 px-4 font-jakarta text-xs uppercase font-bold tracking-wider transition-all border-b-2 ${
              activeTab === "broadcast"
                ? "border-[#fabc4d] text-[#fabc4d]"
                : "border-transparent text-[#dfbfbc] hover:text-[#f7f4eb]"
            }`}
          >
            Servidor & OBS / Meet
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("audio")}
            className={`pb-2.5 px-4 font-jakarta text-xs uppercase font-bold tracking-wider transition-all border-b-2 ${
              activeTab === "audio"
                ? "border-[#fabc4d] text-[#fabc4d]"
                : "border-transparent text-[#dfbfbc] hover:text-[#f7f4eb]"
            }`}
          >
            Audio & Latencia
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {activeTab === "broadcast" && (
            <>
              {/* Broadcast Source Selector */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider text-[#fabc4d] font-bold">
                  Modo de Transmisión en Vivo
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBroadcastMode("mux")}
                    className={`p-3.5 rounded-xl border flex flex-col items-start gap-1 transition-all ${
                      broadcastMode === "mux"
                        ? "bg-[#9e2a2b]/40 border-[#fabc4d] text-[#f7f4eb] shadow-[0_0_15px_rgba(250,188,77,0.3)]"
                        : "bg-[#0b0b0e] border-[#58413f]/40 text-[#dfbfbc] hover:text-[#f7f4eb]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-[#fabc4d]" />
                      <span className="font-bold text-xs">OBS - Mux Live (RTMP)</span>
                    </div>
                    <span className="text-[10px] text-[#dfbfbc] text-left">
                      Transmisión HD profesional desde OBS con servidor y clave de emisión.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBroadcastMode("meet")}
                    className={`p-3.5 rounded-xl border flex flex-col items-start gap-1 transition-all ${
                      broadcastMode === "meet"
                        ? "bg-[#9e2a2b]/40 border-[#fabc4d] text-[#f7f4eb] shadow-[0_0_15px_rgba(250,188,77,0.3)]"
                        : "bg-[#0b0b0e] border-[#58413f]/40 text-[#dfbfbc] hover:text-[#f7f4eb]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#efbf67]" />
                      <span className="font-bold text-xs">Google Meet Embebido</span>
                    </div>
                    <span className="text-[10px] text-[#dfbfbc] text-left">
                      Sala de videoconferencia interactiva con audio bidireccional y cámara.
                    </span>
                  </button>
                </div>
              </div>

              {/* MUX OBS Details */}
              {broadcastMode === "mux" ? (
                <div className="space-y-4 p-4 rounded-xl bg-[#0b0b0e] border border-[#58413f]/50">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#efbf67] uppercase tracking-wider">
                    <Key className="w-3.5 h-3.5 text-[#fabc4d]" />
                    <span>Datos de Conexión para OBS Studio</span>
                  </div>

                  {/* RTMP URL */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-[#dfbfbc] font-semibold">
                      URL del Servidor RTMP (Mux)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={rtmpServerUrl}
                        className="flex-1 bg-[#141419] border border-[#58413f] rounded-lg px-3 py-2 text-xs font-mono text-[#f7f4eb] focus:outline-none"
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
                      Clave de Emisión (Stream Key de Mux)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={muxStreamKey}
                        onChange={(e) => setMuxStreamKey(e.target.value)}
                        placeholder="Ej. live_stream_key_98a72b0c1e..."
                        className="flex-1 bg-[#141419] border border-[#58413f] rounded-lg px-3 py-2 text-xs font-mono text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                      />
                      <button
                        type="button"
                        onClick={() => copyToClipboard(muxStreamKey, "key")}
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
                      Mux Playback ID (Para reproducir en vivo en la plataforma)
                    </label>
                    <input
                      type="text"
                      value={muxPlaybackId}
                      onChange={(e) => setMuxPlaybackId(e.target.value)}
                      placeholder="Ej. DS00Spx1CV902MCtP7GsWm0147LnFiNo00k"
                      className="w-full bg-[#141419] border border-[#58413f] rounded-lg px-3 py-2 text-xs font-mono text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                    />
                  </div>
                </div>
              ) : (
                /* Google Meet Details */
                <div className="space-y-4 p-4 rounded-xl bg-[#0b0b0e] border border-[#58413f]/50">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#efbf67] uppercase tracking-wider">
                    <Globe className="w-3.5 h-3.5 text-[#fabc4d]" />
                    <span>Enlace a Google Meet</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#dfbfbc] font-semibold">
                      URL de la Reunión de Google Meet
                    </label>
                    <input
                      type="url"
                      value={meetUrl}
                      onChange={(e) => setMeetUrl(e.target.value)}
                      placeholder="https://meet.google.com/abc-defg-hij"
                      className="w-full bg-[#141419] border border-[#58413f] rounded-lg px-3 py-2 text-xs font-mono text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                    />
                  </div>

                  <p className="text-[11px] text-[#8a877e] leading-relaxed">
                    Al ingresar el link, los espectadores y actores podrán ingresar directamente a la sala de Meet embebida o abrirla en una pestaña dedicada.
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === "audio" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider text-[#efbf67] font-bold flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" />
                  Perfil de Audio para Transmisión
                </label>
                <select className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]">
                  <option value="low-latency">Baja Latencia (Streaming Teatral y Voz)</option>
                  <option value="stereo-hq">Música y Ensamble Acústico (Estéreo 320kbps)</option>
                  <option value="multi-track">Multipista MUX Broadcast (96kHz 24-bit)</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-[#0b0b0e] border border-[#58413f]/40 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#f7f4eb] block">
                    Cancelación de Eco de Sala
                  </span>
                  <span className="text-[11px] text-[#8a877e]">
                    Optimiza la captura de instrumentos y respiraciones rituales
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#9e2a2b]/30 text-[#ffb3ae] text-xs font-bold border border-[#9e2a2b]">
                  Activado
                </span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#1f1f22] text-[#dfbfbc] text-xs font-bold font-jakarta hover:bg-[#28282d] transition-colors"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] text-xs font-bold uppercase tracking-wider font-jakarta shadow-[0_0_15px_rgba(158,42,43,0.5)] transition-all flex items-center gap-2"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Configuración Guardada</span>
                </>
              ) : (
                <span>Aplicar a Producción</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
