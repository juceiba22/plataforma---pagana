"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  Video,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  HardDrive,
  Film,
  FileVideo,
} from "lucide-react";
import {
  uploadBroadcastVideoToSupabase,
  BroadcastVideo,
  formatBytes,
} from "@/lib/videoStorage";
import { useAuth } from "@/context/AuthContext";

interface UploadBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoUploaded: (newVideo: BroadcastVideo) => void;
}

export default function UploadBroadcastModal({
  isOpen,
  onClose,
  onVideoUploaded,
}: UploadBroadcastModalProps) {
  const { user, profile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<BroadcastVideo["category"]>("ensayos");
  const [duration, setDuration] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!title) {
        // Auto-fill title from filename
        const base = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
        setTitle(base.charAt(0).toUpperCase() + base.slice(1));
      }
      setErrorMessage(null);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage("Por favor selecciona un archivo de video para alojar en Supabase.");
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    const { video, error } = await uploadBroadcastVideoToSupabase(selectedFile, {
      title: title.trim() || selectedFile.name,
      description: description.trim() || "Transmisión grabada y alojada en Supabase Storage.",
      category,
      recordedBy: profile?.full_name || user?.email || "Dirección de Transmisión",
      duration: duration.trim() || "Grabación Completa",
    });

    setIsUploading(false);

    if (error || !video) {
      setErrorMessage(error || "Ocurrió un error al subir el video al storage.");
    } else {
      setUploadSuccess(true);
      onVideoUploaded(video);
      setTimeout(() => {
        setUploadSuccess(false);
        setSelectedFile(null);
        setTitle("");
        setDescription("");
        setDuration("");
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#141419] border border-[#fabc4d]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(158,42,43,0.5)] bg-noise text-[#f7f4eb] max-h-[90vh] overflow-y-auto">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#9e2a2b]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isUploading}
          className="absolute top-5 right-5 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-1.5 rounded-lg bg-[#1f1f22]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#9e2a2b]/30 border border-[#fabc4d]/50 flex items-center justify-center text-[#fabc4d] shadow-[0_0_15px_rgba(250,188,77,0.3)]">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider text-[#f7f4eb]">
              Alojar Transmisión en Supabase
            </h3>
            <p className="text-xs text-[#efbf67] font-jakarta">
              Almacenamiento persistente en Supabase Storage Bucket para consulta del elenco
            </p>
          </div>
        </div>

        {uploadSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#fabc4d] mx-auto animate-bounce" />
            <h4 className="font-cinzel text-lg font-bold text-[#f7f4eb]">
              ¡Video Alojado con Éxito!
            </h4>
            <p className="text-xs text-[#dfbfbc]">
              El video de la transmisión quedó guardado en Supabase Storage y disponible en la plataforma.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* File Dropzone */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1.5">
                Archivo de Video (.mp4, .webm, .mov, .mkv)
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-2 ${
                  selectedFile
                    ? "border-[#fabc4d] bg-[#fabc4d]/10"
                    : "border-[#58413f] hover:border-[#fabc4d]/60 bg-[#0b0b0e] hover:bg-[#121217]"
                }`}
              >
                {selectedFile ? (
                  <>
                    <FileVideo className="w-10 h-10 text-[#fabc4d]" />
                    <span className="font-jakarta text-xs text-[#f7f4eb] font-bold break-all">
                      {selectedFile.name}
                    </span>
                    <span className="text-[11px] text-[#efbf67]">
                      {formatBytes(selectedFile.size)} • Listo para subir a Supabase
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-[#dfbfbc] opacity-75" />
                    <span className="font-jakarta text-xs text-[#f7f4eb] font-semibold">
                      Haz clic para seleccionar el video grabado
                    </span>
                    <span className="text-[10px] text-[#8a877e]">
                      Se guardará automáticamente en el bucket fiesta-pagana/transmisiones
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Video Title */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                Título de la Transmisión / Ensayo
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Ensayo de Escena 7 • La Farsa de José Mercado"
                className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-lg px-3.5 py-2.5 text-xs text-[#f7f4eb] placeholder-[#8a877e] focus:border-[#fabc4d] focus:outline-none"
              />
            </div>

            {/* Category & Duration Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                  Categoría
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-lg px-3 py-2.5 text-xs text-[#f7f4eb] focus:border-[#fabc4d] focus:outline-none"
                >
                  <option value="ensayos">Ensayo General</option>
                  <option value="puesta_en_escena">Puesta en Escena</option>
                  <option value="masterclass">Masterclass & Teórica</option>
                  <option value="musica">Ensamble Sonoro & Bandoneón</option>
                  <option value="ritual">Ritual & Trance</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                  Duración aproximada (Opcional)
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Ej: 01:45:00"
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-lg px-3 py-2.5 text-xs text-[#f7f4eb] placeholder-[#8a877e] focus:border-[#fabc4d] focus:outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                Detalle y notas escénicas
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Observaciones de dirección, personajes involucrados o puntos clave del ensayo..."
                className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-lg px-3 py-2 text-xs text-[#f7f4eb] placeholder-[#8a877e] focus:border-[#fabc4d] focus:outline-none"
              />
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab]/40 text-[#ffdad6] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isUploading}
                className="px-4 py-2.5 rounded-xl bg-[#1f1f22] text-[#dfbfbc] hover:text-[#f7f4eb] text-xs font-bold font-jakarta transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isUploading || !selectedFile}
                className="px-6 py-2.5 rounded-xl bg-[#fabc4d] hover:brightness-110 disabled:opacity-50 text-[#281900] font-jakarta text-xs uppercase font-bold tracking-wider shadow-[0_0_15px_rgba(250,188,77,0.4)] transition-all flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Subiendo a Supabase...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Guardar en Storage</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
