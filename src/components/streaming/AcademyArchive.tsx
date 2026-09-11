"use client";

import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import {
  Video,
  Download,
  Headphones,
  FileText,
  Sparkles,
  Flame,
  Check,
  Play,
  Film,
  Disc,
  HardDrive,
  Upload,
  Trash2,
  ExternalLink,
  Calendar,
  User,
  Clock,
  Radio,
  Layers,
  Search,
  Maximize2,
} from "lucide-react";
import {
  fetchHostedBroadcastVideos,
  deleteHostedBroadcastVideo,
  BroadcastVideo,
  formatBytes,
} from "@/lib/videoStorage";
import UploadBroadcastModal from "./UploadBroadcastModal";
import NewBroadcastModal from "./NewBroadcastModal";
import { useAuth } from "@/context/AuthContext";

export interface UnifiedArchiveItem {
  id: string;
  source: "mux" | "supabase";
  title: string;
  subtitle?: string;
  category: string;
  category_label?: string;
  video_url?: string;
  playback_id?: string;
  duration?: string | number;
  created_at: string;
  recorded_by?: string;
  file_size?: number;
  storage_path?: string;
}

export default function AcademyArchive() {
  const { isAdmin } = useAuth();

  const [items, setItems] = useState<UnifiedArchiveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoModal, setSelectedVideoModal] = useState<UnifiedArchiveItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNewBroadcastOpen, setIsNewBroadcastOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Modal Video Player Ref & HLS
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalHlsRef = useRef<Hls | null>(null);

  const loadAllArchiveItems = async () => {
    setIsLoading(true);

    try {
      // 1. Fetch Supabase storage videos
      const supabaseVideos = await fetchHostedBroadcastVideos();
      const mappedSupabase: UnifiedArchiveItem[] = supabaseVideos.map((v) => ({
        id: `supabase-${v.id}`,
        source: "supabase",
        title: v.title,
        subtitle: v.description,
        category: v.category,
        category_label: v.category_label || v.category,
        video_url: v.video_url,
        duration: v.duration,
        created_at: v.created_at,
        recorded_by: v.recorded_by,
        file_size: v.file_size,
        storage_path: v.storage_path,
      }));

      // 2. Fetch Mux recorded assets from API
      let mappedMux: UnifiedArchiveItem[] = [];
      try {
        const res = await fetch("/api/mux/assets");
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.assets)) {
            mappedMux = json.assets.map((a: any) => ({
              id: `mux-${a.id}`,
              source: "mux",
              title: a.title || "Transmisión en Directo Grabada",
              subtitle: a.subtitle || "Grabación automática de Mux VOD del ensayo en vivo",
              category: a.category || "ensayos",
              category_label: "Mux VOD Grabado",
              playback_id: a.playback_id,
              duration: a.duration ? `${Math.round(a.duration / 60)} min` : "En vivo",
              created_at: a.created_at || new Date().toISOString(),
              recorded_by: "Mux Live Stage",
            }));
          }
        }
      } catch (e) {
        console.warn("Could not fetch Mux assets", e);
      }

      // 3. Fetch local history items
      let mappedLocal: UnifiedArchiveItem[] = [];
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("pagana_broadcast_history");
          if (stored) {
            const list = JSON.parse(stored);
            if (Array.isArray(list)) {
              mappedLocal = list
                .filter(
                  (l: any) =>
                    !mappedMux.some((m) => m.playback_id === l.playback_id)
                )
                .map((l: any) => ({
                  id: `local-${l.id || l.playback_id}`,
                  source: "mux",
                  title: l.title || "Emisión Registrada",
                  subtitle: l.subtitle || "Transmisión grabada de la sala de streaming",
                  category: l.category || "ensayos",
                  category_label: "Mux Transmisión",
                  playback_id: l.playback_id,
                  duration: l.duration ? `${l.duration} min` : "En diferido",
                  created_at: l.created_at || new Date().toISOString(),
                  recorded_by: "Dirección Escénica",
                }));
            }
          }
        } catch (e) {
          console.warn("Could not read local broadcast history", e);
        }
      }

      // Merge and sort newest first
      const combined = [...mappedMux, ...mappedLocal, ...mappedSupabase].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setItems(combined);
    } catch (err) {
      console.error("Error loading archive items:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllArchiveItems();

    const handleRefresh = () => {
      loadAllArchiveItems();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("pagana_video_uploaded", handleRefresh);
      window.addEventListener("pagana_broadcast_history_updated", handleRefresh);
      return () => {
        window.removeEventListener("pagana_video_uploaded", handleRefresh);
        window.removeEventListener("pagana_broadcast_history_updated", handleRefresh);
      };
    }
  }, []);

  // Modal Video HLS Attacher
  useEffect(() => {
    if (!selectedVideoModal) {
      if (modalHlsRef.current) {
        modalHlsRef.current.destroy();
        modalHlsRef.current = null;
      }
      return;
    }

    if (selectedVideoModal.source === "mux" && selectedVideoModal.playback_id) {
      const video = modalVideoRef.current;
      if (!video) return;

      const streamUrl = `https://stream.mux.com/${selectedVideoModal.playback_id}.m3u8`;

      if (Hls.isSupported()) {
        if (modalHlsRef.current) modalHlsRef.current.destroy();
        const hls = new Hls({ enableWorker: true });
        modalHlsRef.current = hls;
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = streamUrl;
        video.play().catch(() => {});
      }
    }

    return () => {
      if (modalHlsRef.current) {
        modalHlsRef.current.destroy();
        modalHlsRef.current = null;
      }
    };
  }, [selectedVideoModal]);

  const handleDeleteVideo = async (item: UnifiedArchiveItem) => {
    if (item.source === "supabase") {
      if (!window.confirm(`¿Seguro que deseas eliminar "${item.title}" de Supabase?`))
        return;
      const rawId = item.id.replace("supabase-", "");
      setDeletingId(item.id);
      const res = await deleteHostedBroadcastVideo(rawId, item.storage_path);
      setDeletingId(null);
      if (res.success) {
        setItems((prev) => prev.filter((v) => v.id !== item.id));
        if (selectedVideoModal?.id === item.id) setSelectedVideoModal(null);
      }
    } else {
      // Local or Mux history removal
      if (!window.confirm(`¿Quitar "${item.title}" del historial local?`)) return;
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("pagana_broadcast_history");
        if (stored) {
          const list = JSON.parse(stored);
          const updated = list.filter(
            (l: any) =>
              `local-${l.id || l.playback_id}` !== item.id &&
              l.playback_id !== item.playback_id
          );
          localStorage.setItem("pagana_broadcast_history", JSON.stringify(updated));
        }
      }
      setItems((prev) => prev.filter((v) => v.id !== item.id));
      if (selectedVideoModal?.id === item.id) setSelectedVideoModal(null);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = filter === "all" || item.category === filter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subtitle &&
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="flex flex-col gap-6">
      {/* Header & Action Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-4 h-4 text-[#fabc4d]" />
            <span className="font-jakarta text-xs text-[#efbf67] uppercase tracking-[0.2em] font-bold">
              Historial de Emisiones & Grabaciones VOD
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-[#f7f4eb] tracking-tight font-bold">
            Historial de Transmisiones & Ensayos en Diferido
          </h2>
          <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] mt-1 max-w-xl">
            Explora las transmisiones emitidas por Mux y los videos alojados en Supabase. Cada ensayo queda archivado para repaso del elenco.
          </p>
        </div>

        {/* Action buttons for Director/Admin */}
        {isAdmin && (
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => setIsNewBroadcastOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-jakarta text-xs uppercase font-bold tracking-wider shadow-[0_0_15px_rgba(158,42,43,0.5)] border-t border-white/20 transition-all"
            >
              <Radio className="w-4 h-4 text-[#fabc4d]" />
              <span>Nueva Emisión Titulada</span>
            </button>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase font-bold tracking-wider hover:brightness-110 shadow-[0_0_15px_rgba(250,188,77,0.35)] transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Alojar Video Supabase</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter Navigation & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "all", label: `Todo el Historial (${items.length})` },
            { id: "ensayos", label: "Ensayos Generales" },
            { id: "puesta_en_escena", label: "Puesta en Escena" },
            { id: "masterclass", label: "Masterclasses" },
            { id: "musica", label: "Música & Bandoneón" },
            { id: "ritual", label: "Ritual & Trance" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilter(pill.id)}
              className={`px-4 py-2 rounded-full font-jakarta text-xs whitespace-nowrap transition-all ${
                filter === pill.id
                  ? "bg-[#9e2a2b] text-[#f7f4eb] font-bold shadow-[0_0_15px_rgba(158,42,43,0.5)]"
                  : "bg-[#141419] text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] border border-[#58413f]/40 font-semibold"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative shrink-0 sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en el historial..."
            className="w-full bg-[#141419] border border-[#58413f]/50 rounded-xl py-2 pl-9 pr-4 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d] transition-all"
          />
          <Search className="w-3.5 h-3.5 text-[#dfbfbc] absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Unified Video Grid */}
      {isLoading ? (
        <div className="p-16 rounded-2xl bg-[#141419] border border-[#58413f]/40 text-center space-y-3">
          <Disc className="w-10 h-10 text-[#fabc4d] mx-auto animate-spin" />
          <p className="font-cinzel text-sm text-[#dfbfbc]">
            Cargando historial de emisiones y grabaciones...
          </p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#141419] border border-[#58413f]/40 text-center space-y-3">
          <Film className="w-12 h-12 text-[#efbf67] mx-auto opacity-60" />
          <h3 className="font-cinzel text-lg font-bold text-[#f7f4eb]">
            No hay transmisiones en esta categoría
          </h3>
          <p className="text-xs text-[#dfbfbc] max-w-sm mx-auto">
            Puedes iniciar una nueva transmisión con título y subtítulo o subir un video grabado.
          </p>
          {isAdmin && (
            <button
              onClick={() => setIsNewBroadcastOpen(true)}
              className="mt-3 px-5 py-2.5 rounded-xl bg-[#9e2a2b] text-[#f7f4eb] font-jakarta text-xs font-bold uppercase tracking-wider"
            >
              Crear Nueva Emisión
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-2xl bg-[#141419] border border-[#58413f]/40 overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-xl group hover:border-[#fabc4d]/40"
            >
              {/* Video Stage Frame Preview */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#09090c] flex flex-col items-center justify-center p-4 border-b border-[#58413f]/30">
                <div className="w-14 h-14 rounded-2xl bg-[#141419] border border-[#58413f] flex items-center justify-center text-[#fabc4d] group-hover:scale-110 transition-transform shadow-inner">
                  {item.source === "mux" ? (
                    <Radio className="w-7 h-7 text-[#ffb3ae] group-hover:text-[#fabc4d]" />
                  ) : (
                    <Film className="w-7 h-7 opacity-75 group-hover:opacity-100" />
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-transparent to-transparent pointer-events-none"></div>

                {/* Play Overlay Button */}
                <button
                  onClick={() => setSelectedVideoModal(item)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-[#9e2a2b] border border-[#fabc4d] flex items-center justify-center text-[#fabc4d] shadow-[0_0_20px_rgba(250,188,77,0.6)]">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </button>

                {/* Duration & Size Badges */}
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded bg-[#0b0b0e]/90 text-[#f7f4eb] font-jakarta text-[10px] backdrop-blur-md border border-[#58413f]/40 font-mono">
                  {item.duration ||
                    (item.file_size ? formatBytes(item.file_size) : "VOD")}
                </span>

                <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded font-jakarta text-[10px] font-bold uppercase bg-[#9e2a2b]/80 text-[#ffdad7] border border-[#ffb3ae]/30">
                  {item.category_label || item.category}
                </span>

                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#bd8718]/20 text-[#fabc4d] font-jakarta text-[9px] font-bold uppercase tracking-wider border border-[#bd8718]/40 flex items-center gap-1">
                  {item.source === "mux" ? (
                    <>
                      <Disc className="w-2.5 h-2.5 text-emerald-400" /> Mux VOD
                    </>
                  ) : (
                    <>
                      <HardDrive className="w-2.5 h-2.5" /> Supabase
                    </>
                  )}
                </span>
              </div>

              {/* Content Info */}
              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 className="font-cinzel text-base font-bold text-[#f7f4eb] group-hover:text-[#fabc4d] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="font-jakarta text-xs text-[#dfbfbc] mt-2 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                {/* Metadata details strip */}
                <div className="pt-3 border-t border-[#58413f]/30 flex items-center justify-between text-xs text-[#8a877e]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#efbf67]" />
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedVideoModal(item)}
                      className="text-[#fabc4d] font-bold uppercase text-[11px] hover:underline flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-current" /> Ver en Diferido
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteVideo(item)}
                        disabled={deletingId === item.id}
                        className="p-1 text-[#dfbfbc] hover:text-[#ffb4ab] transition-colors"
                        title="Eliminar del historial"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* On-Demand Player Modal (Plays both Mux HLS and Supabase MP4) */}
      {selectedVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#141419] border border-[#fabc4d]/40 rounded-2xl p-4 sm:p-6 shadow-[0_0_60px_rgba(158,42,43,0.7)] bg-noise text-[#f7f4eb] max-h-[95vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideoModal(null)}
              className="absolute top-4 right-4 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-2 rounded-xl bg-[#1f1f22] z-20"
            >
              ✕
            </button>

            <div className="mb-3 pr-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-[#9e2a2b] text-[#f7f4eb] font-jakarta text-[10px] font-bold uppercase tracking-wider">
                  {selectedVideoModal.category_label ||
                    selectedVideoModal.category}
                </span>
                <span className="text-xs text-[#efbf67] font-mono">
                  {selectedVideoModal.source === "mux"
                    ? "Grabación en Servidor Mux VOD"
                    : "Alojado en Supabase Storage"}
                </span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-[#f7f4eb]">
                {selectedVideoModal.title}
              </h3>
            </div>

            {/* Video Player Canvas */}
            <div className="relative aspect-video w-full rounded-xl bg-black border border-[#58413f] overflow-hidden mb-4 shadow-2xl">
              {selectedVideoModal.source === "mux" &&
              selectedVideoModal.playback_id ? (
                <video
                  ref={modalVideoRef}
                  controls
                  playsInline
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <video
                  controls
                  autoPlay
                  playsInline
                  src={selectedVideoModal.video_url}
                  className="w-full h-full object-contain"
                >
                  Tu navegador no soporta el tag de video.
                </video>
              )}
            </div>

            {/* Video Information & Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0b0b0e] border border-[#58413f]/40 text-xs">
              <div>
                {selectedVideoModal.subtitle && (
                  <p className="text-[#dfbfbc] font-jakarta leading-relaxed">
                    {selectedVideoModal.subtitle}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-2 text-[#8a877e] font-jakarta text-[11px]">
                  <span>
                    Grabado por:{" "}
                    <strong className="text-[#f7f4eb]">
                      {selectedVideoModal.recorded_by || "Dirección Escénica"}
                    </strong>
                  </span>
                  <span>
                    Fecha:{" "}
                    {new Date(selectedVideoModal.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              {selectedVideoModal.video_url && (
                <a
                  href={selectedVideoModal.video_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-jakarta text-xs uppercase font-bold tracking-wider shadow-md transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar Archivo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal (Supabase Storage) */}
      <UploadBroadcastModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onVideoUploaded={() => {
          loadAllArchiveItems();
        }}
      />

      {/* New Titled Broadcast Modal (Mux Live Stream) */}
      <NewBroadcastModal
        isOpen={isNewBroadcastOpen}
        onClose={() => setIsNewBroadcastOpen(false)}
        onBroadcastCreated={() => {
          loadAllArchiveItems();
        }}
      />
    </section>
  );
}
