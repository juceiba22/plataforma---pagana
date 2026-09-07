"use client";

import React, { useState } from "react";
import {
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Flame,
  Settings,
  Bookmark,
  Share2,
  Eye,
  Theater,
  Check,
  Radio,
  Globe,
  ExternalLink,
  Copy,
} from "lucide-react";
import StageSettingsModal from "./StageSettingsModal";

export default function LiveStagePlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isBroadcasting, setIsBroadcasting] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(85);
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [resolution, setResolution] = useState("1080p");
  const [viewerCount, setViewerCount] = useState(64);

  // Streaming & Production State (Mux & Google Meet)
  const [broadcastMode, setBroadcastMode] = useState<"mux" | "meet">("mux");
  const [muxStreamKey, setMuxStreamKey] = useState("live_mux_prod_fiesta_pagana_98b3");
  const [muxPlaybackId, setMuxPlaybackId] = useState("DS00Spx1CV902MCtP7GsWm0147LnFiNo00k");
  const [meetUrl, setMeetUrl] = useState("https://meet.google.com/fp-teatro-ritual");

  const toggleBroadcast = () => {
    setIsBroadcasting(!isBroadcasting);
    if (!isBroadcasting) {
      setViewerCount((prev) => prev + 1);
    }
  };

  const handleSaveClass = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Top Broadcast Cockpit Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffb3ae] animate-ping"></span>
              <span className="font-jakarta text-xs text-[#ffb3ae] uppercase tracking-[0.2em] font-bold">
                {broadcastMode === "mux" ? "Cámara Negra • Emisión OBS MUX" : "Sala en Vivo • Google Meet"}
              </span>
            </div>
            <h1 className="font-cinzel text-3xl sm:text-4xl text-[#f7f4eb] tracking-tight font-bold">
              Sala de Transmisión & Laboratorio
            </h1>
          </div>

          {/* Broadcast Mode Selector & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Switch between OBS-Mux & Meet */}
            <div className="flex items-center p-1 rounded-xl bg-[#141419] border border-[#58413f]/50">
              <button
                onClick={() => setBroadcastMode("mux")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-jakarta font-bold transition-all ${
                  broadcastMode === "mux"
                    ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_10px_rgba(158,42,43,0.5)]"
                    : "text-[#dfbfbc] hover:text-[#f7f4eb]"
                }`}
              >
                <Radio className="w-3.5 h-3.5 text-[#fabc4d]" />
                <span>OBS (Mux)</span>
              </button>
              <button
                onClick={() => setBroadcastMode("meet")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-jakarta font-bold transition-all ${
                  broadcastMode === "meet"
                    ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_10px_rgba(158,42,43,0.5)]"
                    : "text-[#dfbfbc] hover:text-[#f7f4eb]"
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-[#efbf67]" />
                <span>Google Meet</span>
              </button>
            </div>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141419] border border-[#58413f]/50 text-[#dfbfbc] hover:text-[#f7f4eb] hover:border-[#fabc4d]/40 font-jakarta text-xs font-semibold transition-all"
            >
              <Settings className="w-4 h-4 text-[#fabc4d]" />
              <span>Configurar OBS / Meet</span>
            </button>
          </div>
        </div>

        {/* Video Canvas Container (16:9 Aspect Ratio) */}
        <div className="relative w-full aspect-video rounded-2xl bg-[#0e0e11] overflow-hidden shadow-2xl border border-[#58413f]/40 group flex flex-col justify-between">
          {broadcastMode === "meet" ? (
            /* Google Meet Embed / Launch Screen */
            <div className="absolute inset-0 bg-[#0e0e11] flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#9e2a2b]/30 border border-[#fabc4d] flex items-center justify-center text-[#fabc4d] mb-4 shadow-[0_0_30px_rgba(250,188,77,0.4)]">
                <Globe className="w-8 h-8" />
              </div>

              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f7f4eb] mb-2">
                Sala Interactiva de Google Meet
              </h2>
              <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] max-w-md mb-6 leading-relaxed">
                Sesión abierta para actores, músicos y directores. Podés unirte directamente con cámara y micrófono habilitados.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase font-bold tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(250,188,77,0.4)] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Unirse al Google Meet</span>
                </a>

                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="px-5 py-3 rounded-xl bg-[#1f1f22] border border-[#58413f] text-[#dfbfbc] hover:text-[#f7f4eb] font-jakarta text-xs font-bold transition-colors"
                >
                  Cambiar Enlace de Meet
                </button>
              </div>

              <div className="mt-8 px-4 py-2 rounded-lg bg-[#141419] border border-[#58413f]/40 font-mono text-xs text-[#efbf67]">
                Enlace Actual: {meetUrl}
              </div>
            </div>
          ) : (
            /* Mux / OBS Live Feed Screen */
            <>
              {/* Live Feed Simulated Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-vrWjlzCmj_urRsf4vgfYtqeWWbMxLFv0oQ2meaiWBMULKQQ_TkgHIK9RprNvc5Ba2mtBEShz-MZsS-johUxMLU-i9YLnLPLR-D5v2RvvG0JozUcq9whSEE2lbOEF8S2rpfsUTPq6ZsbPH0MYxlU-0223l7V8m2SgT6_cDtiMUpJMc0N3d2TAIorR1h26kXVBIWq5fO-DztgqMZtdN9LAgdzENUpq2n0mOxh3w-iZ2n4XaROaEAxDVQ')`,
                }}
              ></div>

              {/* Gradients & Scrim Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/25 to-[#0e0e11]/70 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e11]/60 via-transparent to-[#0e0e11]/40 pointer-events-none"></div>

              {/* Top Overlays Bar */}
              <div className="relative z-20 p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#9e2a2b] text-[#f7f4eb] font-jakarta text-[11px] uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(158,42,43,0.8)] border-t border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    OBS • MUX LIVE
                  </span>

                  <span className="px-3 py-1 rounded-md bg-[#141419]/80 backdrop-blur-md text-[#efbf67] font-jakarta text-[11px] font-semibold tracking-wider border border-[#58413f]/40">
                    1080p60 • RTMP FEED
                  </span>

                  <span className="px-3 py-1 rounded-md bg-[#141419]/80 backdrop-blur-md text-[#dfbfbc] font-jakarta text-[11px] flex items-center gap-1.5 border border-[#58413f]/40">
                    <Eye className="w-3.5 h-3.5 text-[#fabc4d]" />
                    <span>{viewerCount} espectadores</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2 rounded-lg bg-[#141419]/80 text-[#dfbfbc] hover:text-[#f7f4eb] border border-[#58413f]/40 hover:bg-[#9e2a2b] transition-colors"
                    title="Configuración de Servidor MUX"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Center Stage Focus Info */}
              <div className="relative z-10 mx-auto flex flex-col items-center justify-center text-center px-4 max-w-xl pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-[#9e2a2b]/50 border border-[#fabc4d]/40 backdrop-blur-md flex items-center justify-center text-[#fabc4d] mb-3 shadow-[0_0_25px_rgba(158,42,43,0.6)] animate-pulse">
                  <Sparkles className="w-7 h-7" />
                </div>
                <p className="font-jakarta text-xs text-[#fabc4d] uppercase tracking-[0.2em] font-bold">
                  Transmisión en Producción
                </p>
                <h2 className="font-cinzel text-xl sm:text-2xl lg:text-3xl text-[#f7f4eb] font-bold mt-1 drop-shadow-lg">
                  La Batalla Celeste y Terrestre de Marechal
                </h2>
              </div>

              {/* Player Controls Dock */}
              <div className="relative z-20 p-4 sm:p-5 bg-gradient-to-t from-[#0e0e11] to-transparent flex flex-col gap-2">
                {/* Timeline Scrub bar */}
                <div className="w-full h-1.5 bg-[#2a2a2d] rounded-full cursor-pointer relative group/timeline">
                  <div className="h-full bg-[#9e2a2b] rounded-full w-[84%] relative">
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#fabc4d] opacity-0 group-hover/timeline:opacity-100 transition-opacity shadow-md"></span>
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between text-[#f7f4eb] pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 text-[#f7f4eb] hover:text-[#fabc4d] transition-colors"
                      aria-label="Play/Pause"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1.5 text-[#f7f4eb] hover:text-[#fabc4d] transition-colors"
                        aria-label="Mute/Unmute"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-[#ffb4ab]" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          setVolume(Number(e.target.value));
                          setIsMuted(false);
                        }}
                        className="w-16 sm:w-20 h-1 bg-[#2a2a2d] accent-[#fabc4d] rounded cursor-pointer"
                      />
                    </div>

                    <span className="font-jakarta text-xs text-[#dfbfbc]">
                      01:32:10 / <strong className="text-[#ffb3ae]">DIRECTO MUX</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#dfbfbc]">
                      <span className="hidden sm:inline">Calidad:</span>
                      <select
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        className="bg-[#141419] text-[#f7f4eb] border border-[#58413f] text-xs py-1 px-2 rounded-lg outline-none cursor-pointer"
                      >
                        <option value="1080p">1080p60 (Pro OBS)</option>
                        <option value="720p">720p HD</option>
                        <option value="480p">480p</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setIsSettingsOpen(true)}
                      className="p-1.5 text-[#f7f4eb] hover:text-[#fabc4d] transition-colors"
                      title="Configuración de Mux"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Instructor Dossier Strip */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#141419] border border-[#58413f]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 bg-noise">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                alt="Director Escénico"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#fabc4d]/50 shadow-[0_0_16px_rgba(250,188,77,0.3)]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4AxDnqmXvbMLeNcWb4KsMTGKpwwJfWzqcK39TJfLpkd9jPgElmdZOsH8KAUIyVUiPwl3SvwrL20QMmNZwpxGuXvm5JG45VJb75VRinFbHGzwjsOcnhQUpTBINvysbCEfien4VKhYAcAWuKt6sK3GSa28UpB3FSBhxEsHcv5AWjMQF-hhjvqKhxTFPVIGk-AdUBRRTvGSJ0loFb--BrrOIsZX5LqfJeReIvu2risbDyKwQKTWozzy__w"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#fabc4d] flex items-center justify-center text-[#281900] text-xs font-bold shadow-md">
                ★
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#f7f4eb]">
                  Valentin Ramos Cárdenas
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#bd8718]/20 border border-[#bd8718]/40 text-[#fabc4d] font-jakarta text-[10px] uppercase font-bold">
                  Director General
                </span>
              </div>
              <p className="font-jakarta text-xs text-[#dfbfbc] mt-0.5 max-w-lg">
                Dramaturgia mística y escenificación épica en Fiesta Pagana.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            <button
              onClick={handleSaveClass}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-jakarta uppercase font-semibold tracking-wider transition-all ${
                isSaved
                  ? "bg-[#9e2a2b] border-[#ffb3ae] text-[#f7f4eb]"
                  : "bg-[#1f1f22] border-[#58413f] text-[#dfbfbc] hover:text-[#f7f4eb]"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-[#fabc4d]" />
              <span>{isSaved ? "Clase Guardada" : "Guardar Clase"}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase font-bold tracking-wider hover:brightness-110 shadow-[0_0_15px_rgba(250,188,77,0.35)] transition-all"
            >
              {isShared ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#281900]" />
                  <span>Enlace Copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#281900]" />
                  <span>Compartir</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <StageSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        muxStreamKey={muxStreamKey}
        setMuxStreamKey={setMuxStreamKey}
        muxPlaybackId={muxPlaybackId}
        setMuxPlaybackId={setMuxPlaybackId}
        meetUrl={meetUrl}
        setMeetUrl={setMeetUrl}
        broadcastMode={broadcastMode}
        setBroadcastMode={setBroadcastMode}
      />
    </>
  );
}
