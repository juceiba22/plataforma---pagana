"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import {
  fetchHostedBroadcastVideos,
  deleteHostedBroadcastVideo,
  BroadcastVideo,
  formatBytes,
} from "@/lib/videoStorage";
import UploadBroadcastModal from "./UploadBroadcastModal";
import { useAuth } from "@/context/AuthContext";

export default function AcademyArchive() {
  const { isAdmin } = useAuth();

  const [videos, setVideos] = useState<BroadcastVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [downloadedFile, setDownloadedFile] = useState<string | null>(null);
  const [selectedVideoModal, setSelectedVideoModal] = useState<BroadcastVideo | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadVideos = async () => {
    setIsLoading(true);
    const data = await fetchHostedBroadcastVideos();
    setVideos(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadVideos();

    // Listen for upload events from LiveStagePlayer or other components
    const handleNewVideo = () => {
      loadVideos();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("pagana_video_uploaded", handleNewVideo);
      return () => {
        window.removeEventListener("pagana_video_uploaded", handleNewVideo);
      };
    }
  }, []);

  const handleDeleteVideo = async (id: string, storagePath?: string) => {
    if (!window.confirm("¿Seguro que deseas eliminar este video alojado en Supabase?")) return;
    setDeletingId(id);
    const res = await deleteHostedBroadcastVideo(id, storagePath);
    setDeletingId(null);
    if (res.success) {
      setVideos((prev) => prev.filter((v) => v.id !== id));
      if (selectedVideoModal?.id === id) {
        setSelectedVideoModal(null);
      }
    }
  };

  const filteredVideos =
    filter === "all"
      ? videos
      : videos.filter((c) => c.category === filter);

  return (
    <section className="flex flex-col gap-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HardDrive className="w-4 h-4 text-[#fabc4d]" />
            <span className="font-jakarta text-xs text-[#efbf67] uppercase tracking-[0.2em] font-bold">
              Supabase Storage Bucket • Grabaciones Alojadas
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-[#f7f4eb] tracking-tight font-bold">
            Biblioteca de Transmisiones & Ensayos
          </h2>
          <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] mt-1 max-w-xl">
            Cada emisión y ensayo queda guardado en el storage bucket de Supabase y accesible para repaso del elenco dentro de la plataforma.
          </p>
        </div>

        {/* Action button to upload directly to Supabase */}
        {isAdmin && (
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase font-bold tracking-wider hover:brightness-110 shadow-[0_0_15px_rgba(250,188,77,0.35)] transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Alojar Video en Supabase</span>
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "all", label: `Todos los Videos (${videos.length})` },
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

      {/* Video Grid */}
      {filteredVideos.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#141419] border border-[#58413f]/40 text-center space-y-3">
          <Film className="w-12 h-12 text-[#efbf67] mx-auto opacity-60" />
          <h3 className="font-cinzel text-lg font-bold text-[#f7f4eb]">
            No hay videos en esta categoría
          </h3>
          <p className="text-xs text-[#dfbfbc] max-w-sm mx-auto">
            Podés alojar la primera transmisión grabada haciendo clic en "Alojar Video en Supabase".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-2xl bg-[#141419] border border-[#58413f]/40 overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-xl group hover:border-[#fabc4d]/40"
            >
              {/* Video Stage Frame Preview */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#09090c] flex flex-col items-center justify-center p-4 border-b border-[#58413f]/30">
                <div className="w-14 h-14 rounded-2xl bg-[#141419] border border-[#58413f] flex items-center justify-center text-[#fabc4d] group-hover:scale-110 transition-transform shadow-inner">
                  <Film className="w-7 h-7 opacity-75 group-hover:opacity-100" />
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
                  {item.duration || formatBytes(item.file_size)}
                </span>

                <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded font-jakarta text-[10px] font-bold uppercase bg-[#9e2a2b]/80 text-[#ffdad7] border border-[#ffb3ae]/30">
                  {item.category_label || item.category}
                </span>

                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#bd8718]/20 text-[#fabc4d] font-jakarta text-[9px] font-bold uppercase tracking-wider border border-[#bd8718]/40 flex items-center gap-1">
                  <HardDrive className="w-2.5 h-2.5" /> Supabase
                </span>
              </div>

              {/* Content Info */}
              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 className="font-cinzel text-base font-bold text-[#f7f4eb] group-hover:text-[#fabc4d] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-jakarta text-xs text-[#dfbfbc] mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
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
                      <Play className="w-3 h-3 fill-current" /> Ver Video
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteVideo(item.id, item.storage_path)}
                        disabled={deletingId === item.id}
                        className="p-1 text-[#dfbfbc] hover:text-[#ffb4ab] transition-colors"
                        title="Eliminar de Supabase"
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

      {/* HTML5 In-Platform Video Player Modal */}
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
                  {selectedVideoModal.category_label || selectedVideoModal.category}
                </span>
                <span className="text-xs text-[#efbf67] font-mono">
                  Alojado en Supabase Storage
                </span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-[#f7f4eb]">
                {selectedVideoModal.title}
              </h3>
            </div>

            {/* Video Player Canvas */}
            <div className="relative aspect-video w-full rounded-xl bg-black border border-[#58413f] overflow-hidden mb-4 shadow-2xl">
              <video
                controls
                autoPlay
                playsInline
                src={selectedVideoModal.video_url}
                className="w-full h-full object-contain"
              >
                Tu navegador no soporta el tag de video.
              </video>
            </div>

            {/* Video Information & Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0b0b0e] border border-[#58413f]/40 text-xs">
              <div>
                <p className="text-[#dfbfbc] font-jakarta leading-relaxed">
                  {selectedVideoModal.description}
                </p>
                <div className="flex items-center gap-4 mt-2 text-[#8a877e] font-jakarta text-[11px]">
                  <span>Grabado por: <strong className="text-[#f7f4eb]">{selectedVideoModal.recorded_by || "Dirección"}</strong></span>
                  <span>Fecha: {new Date(selectedVideoModal.created_at).toLocaleString()}</span>
                  {selectedVideoModal.file_size && (
                    <span>Tamaño: {formatBytes(selectedVideoModal.file_size)}</span>
                  )}
                </div>
              </div>

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
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      <UploadBroadcastModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onVideoUploaded={(newVideo) => {
          setVideos((prev) => [newVideo, ...prev]);
        }}
      />
    </section>
  );
}

