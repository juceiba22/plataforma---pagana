"use client";

import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import {
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
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
  PlusCircle,
  Loader2,
  Disc,
  Shield,
  Lock,
  Upload,
  HardDrive,
  Maximize2,
  RefreshCw,
  Signal,
  AlertCircle,
} from "lucide-react";
import StageSettingsModal from "./StageSettingsModal";
import UploadBroadcastModal from "./UploadBroadcastModal";
import { useAuth } from "@/context/AuthContext";

export default function LiveStagePlayer() {
  const { user, profile, role, isAdmin, isStaff } = useAuth();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(90);
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [viewerCount, setViewerCount] = useState(64);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Live Stream state
  const [isStreamLive, setIsStreamLive] = useState(false);
  const [isLoadingStream, setIsLoadingStream] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);

  // Mux & Google Meet Streaming State
  const [broadcastMode, setBroadcastMode] = useState<"mux" | "meet">("mux");
  const [muxStreamKey, setMuxStreamKey] = useState("");
  const [muxPlaybackId, setMuxPlaybackId] = useState("");
  const [meetUrl, setMeetUrl] = useState("https://meet.google.com/fp-teatro-ritual");
  const [isCreatingMuxStream, setIsCreatingMuxStream] = useState(false);
  const [streamCreatedAlert, setStreamCreatedAlert] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  // Read saved config
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("pagana_live_stage_config");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.muxStreamKey) setMuxStreamKey(parsed.muxStreamKey);
          if (parsed.muxPlaybackId) setMuxPlaybackId(parsed.muxPlaybackId);
          if (parsed.meetUrl) setMeetUrl(parsed.meetUrl);
          if (parsed.broadcastMode) setBroadcastMode(parsed.broadcastMode);
        }
      } catch (e) {
        console.warn("Could not read stream config from localStorage", e);
      }

      const handleConfigUpdate = (e: any) => {
        if (e.detail) {
          if (e.detail.muxStreamKey !== undefined) setMuxStreamKey(e.detail.muxStreamKey);
          if (e.detail.muxPlaybackId !== undefined) setMuxPlaybackId(e.detail.muxPlaybackId);
          if (e.detail.meetUrl !== undefined) setMeetUrl(e.detail.meetUrl);
          if (e.detail.broadcastMode !== undefined) setBroadcastMode(e.detail.broadcastMode);
        }
      };

      window.addEventListener("pagana_stage_config_updated", handleConfigUpdate);
      return () => {
        window.removeEventListener("pagana_stage_config_updated", handleConfigUpdate);
      };
    }
  }, []);

  // Initialize and attach HLS stream
  useEffect(() => {
    if (broadcastMode !== "mux" || !muxPlaybackId) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      setIsStreamLive(false);
      setIsLoadingStream(false);
      return;
    }

    const streamUrl = `https://stream.mux.com/${muxPlaybackId}.m3u8`;
    const video = videoRef.current;
    if (!video) return;

    setIsLoadingStream(true);
    setStreamError(null);

    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 60,
        manifestLoadingTimeOut: 10000,
        manifestLoadingMaxRetry: 5,
      });

      hlsRef.current = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsStreamLive(true);
        setIsLoadingStream(false);
        setStreamError(null);
        video.play().catch(() => {
          // Autoplay restriction fallback
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setIsStreamLive(false);
              setIsLoadingStream(false);
              setStreamError("En espera de señal desde OBS o reconectando...");
              setTimeout(() => {
                if (hlsRef.current) {
                  hls.startLoad();
                }
              }, 4000);
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native Safari / iOS HLS
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        setIsStreamLive(true);
        setIsLoadingStream(false);
        setStreamError(null);
        video.play().catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
      });
      video.addEventListener("error", () => {
        setIsStreamLive(false);
        setIsLoadingStream(false);
        setStreamError("En espera de señal desde OBS...");
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [muxPlaybackId, broadcastMode]);

  // Handle Play/Pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Handle Mute/Unmute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Handle Volume
  const handleVolumeChange = (newVol: number) => {
    const video = videoRef.current;
    setVolume(newVol);
    if (video) {
      video.volume = newVol / 100;
      if (newVol > 0 && isMuted) {
        video.muted = false;
        setIsMuted(false);
      }
    }
  };

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleCreateNewMuxStream = async () => {
    if (!isAdmin) return;
    setIsCreatingMuxStream(true);
    setApiErrorMessage(null);
    try {
      const res = await fetch("/api/mux/live-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Fiesta Pagana - Transmisión en Directo" }),
      });
      const data = await res.json();
      if (data?.stream) {
        const newKey = data.stream.stream_key || "";
        const newPlayback = data.stream.playback_ids?.[0]?.id || "";
        setMuxStreamKey(newKey);
        setMuxPlaybackId(newPlayback);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "pagana_live_stage_config",
            JSON.stringify({
              muxStreamKey: newKey,
              muxPlaybackId: newPlayback,
              meetUrl,
              broadcastMode: "mux",
            })
          );
        }
        setStreamCreatedAlert(true);
        setTimeout(() => setStreamCreatedAlert(false), 4000);
      } else if (data?.error) {
        setApiErrorMessage(data.error);
      }
    } catch (err: any) {
      setApiErrorMessage(err.message || "Error al conectar con la API de Mux");
    } finally {
      setIsCreatingMuxStream(false);
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
                {broadcastMode === "mux"
                  ? "Cámara Negra • Emisión OBS - MUX (Grabación VOD Activa)"
                  : "Sala en Vivo • Google Meet"}
              </span>
            </div>
            <h1 className="font-cinzel text-3xl sm:text-4xl text-[#f7f4eb] tracking-tight font-bold">
              Sala de Transmisión & Laboratorio
            </h1>
          </div>

          {/* Controls: Admin vs Viewer */}
          <div className="flex flex-wrap items-center gap-3">
            {isAdmin ? (
              <>
                {/* Admin Mode Selector: OBS vs Meet */}
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

                {/* Upload & Host in Supabase Storage */}
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-jakarta text-xs font-bold transition-all shadow-[0_0_15px_rgba(158,42,43,0.4)] border-t border-white/20"
                >
                  <HardDrive className="w-3.5 h-3.5 text-[#fabc4d]" />
                  <span>Alojar Video en Supabase</span>
                </button>

                {/* Create new live stream on Mux (Admin only) */}
                <button
                  onClick={handleCreateNewMuxStream}
                  disabled={isCreatingMuxStream}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#fabc4d] text-[#281900] hover:brightness-110 font-jakarta text-xs font-bold transition-all shadow-[0_0_15px_rgba(250,188,77,0.3)]"
                >
                  {isCreatingMuxStream ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <PlusCircle className="w-3.5 h-3.5" />
                  )}
                  <span>{isCreatingMuxStream ? "Generando..." : "Nueva Emisión MUX"}</span>
                </button>

                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141419] border border-[#58413f]/50 text-[#dfbfbc] hover:text-[#f7f4eb] hover:border-[#fabc4d]/40 font-jakarta text-xs font-semibold transition-all"
                >
                  <Settings className="w-4 h-4 text-[#fabc4d]" />
                  <span>Ajustes OBS / Meet</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141419] border border-[#58413f]/40 text-xs text-[#dfbfbc]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Modo Espectador • Transmisión Activa</span>
              </div>
            )}
          </div>
        </div>

        {apiErrorMessage && (
          <div className="p-4 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab]/50 text-xs text-[#ffdad6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ffb4ab] shrink-0"></span>
              <span>{apiErrorMessage}</span>
            </div>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#fabc4d] text-[#281900] font-bold text-xs shrink-0 hover:brightness-110 uppercase"
            >
              Abrir Ajustes OBS
            </button>
          </div>
        )}

        {streamCreatedAlert && (
          <div className="p-3.5 rounded-xl bg-[#9e2a2b]/30 border border-[#fabc4d] text-xs text-[#f7f4eb] flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-2 font-jakarta">
              <Check className="w-4 h-4 text-emerald-400" />
              Nueva transmisión MUX configurada con grabación automática de VOD.
            </span>
            <span className="font-mono text-[#efbf67]">Stream Key & Playback ID actualizados</span>
          </div>
        )}

        {/* Video Canvas Container (16:9 Aspect Ratio) */}
        <div
          ref={containerRef}
          className="relative w-full aspect-video rounded-2xl bg-black overflow-hidden shadow-2xl border border-[#58413f]/40 group flex flex-col justify-between"
        >
          {broadcastMode === "meet" ? (
            /* Google Meet Mode */
            <div className="absolute inset-0 bg-[#0e0e11] flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#9e2a2b]/30 border border-[#fabc4d] flex items-center justify-center text-[#fabc4d] mb-4 shadow-[0_0_30px_rgba(250,188,77,0.4)]">
                <Globe className="w-8 h-8" />
              </div>

              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f7f4eb] mb-2">
                Sala Interactiva de Google Meet
              </h2>
              <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] max-w-md mb-6 leading-relaxed">
                Sesión en vivo para actores, músicos y directores. Podés ingresar con cámara y micrófono habilitados.
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

                {isAdmin && (
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="px-5 py-3 rounded-xl bg-[#1f1f22] border border-[#58413f] text-[#dfbfbc] hover:text-[#f7f4eb] font-jakarta text-xs font-bold transition-colors"
                  >
                    Cambiar Enlace de Meet
                  </button>
                )}
              </div>

              <div className="mt-8 px-4 py-2 rounded-lg bg-[#141419] border border-[#58413f]/40 font-mono text-xs text-[#efbf67]">
                Enlace Actual: {meetUrl}
              </div>
            </div>
          ) : (
            /* Mux Live Stream Stage Canvas */
            <>
              {/* Actual HTML5 / HLS Video Element */}
              <video
                ref={videoRef}
                playsInline
                autoPlay
                className={`w-full h-full object-contain bg-black transition-opacity duration-500 ${
                  isStreamLive ? "opacity-100" : "opacity-0"
                }`}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Standby / Waiting Screen if Stream is not yet live */}
              {!isStreamLive && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-[#141419]/90 to-[#0e0e11] flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(158,42,43,0.25)_0%,transparent_70%)] pointer-events-none"></div>

                  <div className="relative w-16 h-16 rounded-full bg-[#9e2a2b]/30 border border-[#fabc4d]/60 backdrop-blur-md flex items-center justify-center text-[#fabc4d] mb-4 shadow-[0_0_30px_rgba(158,42,43,0.7)] animate-pulse">
                    <Radio className="w-8 h-8" />
                  </div>

                  <span className="font-jakarta text-xs text-[#fabc4d] uppercase tracking-[0.25em] font-bold mb-1">
                    Cámara Negra • Mux Live Stream
                  </span>

                  <h2 className="font-cinzel text-xl sm:text-2xl lg:text-3xl text-[#f7f4eb] font-bold drop-shadow-lg">
                    {muxPlaybackId ? "En espera de señal desde OBS" : "Transmisión Pendiente de Inicio"}
                  </h2>

                  <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] max-w-md mt-2 leading-relaxed">
                    {muxPlaybackId
                      ? "El servidor está listo. En cuanto comience la emisión en OBS Studio o vMix, el reproductor transmitirá en vivo automáticamente."
                      : "Genera una nueva emisión en los controles superiores para obtener tu clave de OBS."}
                  </p>

                  {muxPlaybackId && (
                    <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0b0b0e]/90 border border-[#58413f]/50 font-mono text-xs text-[#efbf67]">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                      <span>Playback ID: {muxPlaybackId}</span>
                    </div>
                  )}

                  {isAdmin && (
                    <div className="mt-5 flex items-center gap-3">
                      <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="px-4 py-2 rounded-xl bg-[#fabc4d] text-[#281900] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg"
                      >
                        Ver Claves de OBS
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Top Overlays Bar */}
              <div className="absolute top-0 inset-x-0 z-20 p-4 sm:p-5 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-auto">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[#f7f4eb] font-jakarta text-[11px] uppercase tracking-widest font-bold border-t border-white/20 ${
                      isStreamLive
                        ? "bg-[#9e2a2b] shadow-[0_0_15px_rgba(158,42,43,0.8)]"
                        : "bg-[#2a2a2d] text-[#dfbfbc]"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isStreamLive ? "bg-white animate-pulse" : "bg-amber-400"
                      }`}
                    ></span>
                    {isStreamLive ? "OBS • EN VIVO" : "OBS • STANDBY"}
                  </span>

                  <span className="px-3 py-1 rounded-md bg-[#141419]/85 backdrop-blur-md text-[#dfbfbc] font-jakarta text-[11px] flex items-center gap-1.5 border border-[#58413f]/40">
                    <Disc className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                    <span>Grabación VOD Automática</span>
                  </span>

                  <span className="px-3 py-1 rounded-md bg-[#141419]/85 backdrop-blur-md text-[#dfbfbc] font-jakarta text-[11px] flex items-center gap-1.5 border border-[#58413f]/40">
                    <Eye className="w-3.5 h-3.5 text-[#fabc4d]" />
                    <span>{viewerCount} en sala</span>
                  </span>
                </div>

                {isAdmin && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsSettingsOpen(true)}
                      className="p-2 rounded-lg bg-[#141419]/80 text-[#dfbfbc] hover:text-[#f7f4eb] border border-[#58413f]/40 hover:bg-[#9e2a2b] transition-colors"
                      title="Configuración de Servidor MUX"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Player Controls Dock */}
              <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2 pointer-events-auto">
                <div className="flex items-center justify-between text-[#f7f4eb] pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 text-[#f7f4eb] hover:text-[#fabc4d] transition-colors"
                      aria-label="Play/Pause"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleMute}
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
                        onChange={(e) => handleVolumeChange(Number(e.target.value))}
                        className="w-16 sm:w-20 h-1 bg-[#2a2a2d] accent-[#fabc4d] rounded cursor-pointer"
                      />
                    </div>

                    <span className="font-jakarta text-xs text-[#dfbfbc]">
                      {isStreamLive ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          TRANSMISIÓN EN DIRECTO
                        </span>
                      ) : (
                        <span>Mux Live Ingest</span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors"
                      title="Pantalla Completa"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="p-1.5 text-[#f7f4eb] hover:text-[#fabc4d] transition-colors"
                        title="Configuración de Mux"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Instructor & Transmission Dossier Strip */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#141419] border border-[#58413f]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 bg-noise">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#9e2a2b]/30 border border-[#fabc4d] flex items-center justify-center text-[#fabc4d] shadow-[0_0_15px_rgba(250,188,77,0.3)] shrink-0">
              <Theater className="w-7 h-7" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#f7f4eb]">
                  Dirección Escénica & Transmisión
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#bd8718]/20 border border-[#bd8718]/40 text-[#fabc4d] font-jakarta text-[10px] uppercase font-bold">
                  Mux Production VOD
                </span>
              </div>
              <p className="font-jakarta text-xs text-[#dfbfbc] mt-0.5 max-w-lg">
                Señal de video transmitida por OBS vía RTMP y archivada automáticamente en los servidores de Mux para reproducción bajo demanda.
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

      <UploadBroadcastModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onVideoUploaded={(newVideo) => {
          // Trigger custom event or notification
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("pagana_video_uploaded", { detail: newVideo }));
          }
        }}
      />
    </>
  );
}
