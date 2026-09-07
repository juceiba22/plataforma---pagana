"use client";

import React, { useState, useRef } from "react";
import {
  UserPlus,
  Upload,
  Camera,
  Sparkles,
  Edit3,
  Trash2,
  Check,
  X,
  Image as ImageIcon,
  Shield,
  Layers,
} from "lucide-react";

export interface CastMember {
  id: string;
  name: string;
  characterName: string;
  characterTitle: string;
  archetype: string;
  bio: string;
  photoUrl: string;
  scenes: string[];
  roleColor: string;
}

const INITIAL_CAST: CastMember[] = [
  {
    id: "1",
    name: "Sofía Valenzuela",
    characterName: "La Curandera de las Sombras",
    characterTitle: "Guardiana del Fuego y Ritos Ancestrales",
    archetype: "Chamánica / Psicomágica",
    bio: "Canalizadora del trance en el Acto I. Encargada de abrir el círculo sagrado y el cántico inicial de la tierra.",
    photoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsflbwK8N7xrmAZNR5DO6vSuetzhGlCIVlIQBtWq0O-O9PxJwwZ_PEE1dm78WKiMqDXlkvuLxgMOIUNw0NKw7pS31nhFxYJVy-tA8TKYXve7xXX5W8pieSHDUlgJbXJ5D0KRnszl7yHyjCMVJ5npCO7MJ-1hZBMoFOFsqsJ-Munks8XbIULVaJq9rnQ5hChTUBsoL8S0m9PxlzfvpZagzEJth4lWZ63sGI7Er61SPegvWVWq0IJXBcOw",
    scenes: ["Acto I: La Invocación", "Acto III: El Juicio del Fuego"],
    roleColor: "border-[#fabc4d] text-[#fabc4d]",
  },
  {
    id: "2",
    name: "Nahuel Terrada",
    characterName: "El Cazador de la Niebla",
    characterTitle: "El Forastero en Tierras Paganas",
    archetype: "Héroe Trágico / Rebelde",
    bio: "Representa el choque entre la razón urbana y el desborde dionisíaco del monte. Portador del arco y la máscara de cuero.",
    photoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-vrWjlzCmj_urRsf4vgfYtqeWWbMxLFv0oQ2meaiWBMULKQQ_TkgHIK9RprNvc5Ba2mtBEShz-MZsS-johUxMLU-i9YLnLPLR-D5v2RvvG0JozUcq9whSEE2lbOEF8S2rpfsUTPq6ZsbPH0MYxlU-0223l7V8m2SgT6_cDtiMUpJMc0N3d2TAIorR1h26kXVBIWq5fO-DztgqMZtdN9LAgdzENUpq2n0mOxh3w-iZ2n4XaROaEAxDVQ",
    scenes: ["Acto II: El Encuentro en la Salamanca", "Acto IV: La Pasada General"],
    roleColor: "border-[#ffb3ae] text-[#ffb3ae]",
  },
  {
    id: "3",
    name: "Martina Larrea",
    characterName: "La Niña Vidente",
    characterTitle: "Oráculo de la Puna & Voces Ocultas",
    archetype: "Inocencia & Revelación",
    bio: "Portadora de los textos sagrados y acotaciones del más allá. Encarna la clarividencia en medio del aquelarre.",
    photoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCg_8fADmKyzMRR_mKHXuIaxrV69zviLZdeq3yKs8C8T6KExLZEebYSK-3FcuB78lQqCY7_XElf0PkhrC9ew9gYa2AP4ch_unLN6DgmNIK-fDzkKNvIHCZSyBAKMZ0fGJfwGe1o6ZXp0aRI46N68z24bqRqFjWMtslN8b1nD4uvqhka4Q6J1-LCddcgO-rZCCRout_blqth4Xk44gFPjBK1tam7VAJxwtAQF19DXOO1i60z97TGlRKWA",
    scenes: ["Acto I: Prólogo", "Acto II: Danza de los Susurros"],
    roleColor: "border-[#efbf67] text-[#efbf67]",
  },
  {
    id: "4",
    name: "Esteban Quiroga",
    characterName: "El Mandinga de las Penumbras",
    characterTitle: "Encarnación de la Tentación Criolla",
    archetype: "Sombra / Bufón Sagrado",
    bio: "Figura catalizadora del conflicto moral. Domina el claroscuro y los diálogos con el público en el teatro-foro.",
    photoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdZhLf6PlMIY9ZK_btiq1zbQVOBk5ksf-swM6hHa6CChNXkdnQ2P0yAQ3axzC6IxyxNRPD7q9HqLIVmHaD9Hu5ViFHedb06bt_j9NZIeqNJrGcXlW2_gifRnXHoFKtQsIxu-tliNBDsEf2EAcoO9O2j-DPwfgia0xnojZGBpimYith8kT949DGshHdvwoT1hWqetlZ5GHFFRnVMJvm-vODWCmqL5FvGZ7lY4DB-PTLKIWtBUl4etJB8A",
    scenes: ["Acto II: El Pacto", "Acto III: Juicio Colectivo"],
    roleColor: "border-[#9e2a2b] text-[#ffb3ae]",
  },
  {
    id: "5",
    name: "Camila Benítez",
    characterName: "La Tejedora del Tiempo",
    characterTitle: "Guardiana del Manifiesto Textil",
    archetype: "Matriarca / Destino",
    bio: "Manipula los hilos del telar escénico conectando los cuerpos de los oficiantes con el altar central.",
    photoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDVK18okmiTLrsL4KN3z0AyZrWSIibc4NbnNq-p27AjRbrCsPzcEJ14SybTyhLe7CjC4PtWeB6xbVytQWskBfB9srNgcXp1coyoEmOkluJ805K4bhO8YG1zWJmRmCiejUZk1d-Jn0mnFVexBfjXDO2W4cd35KXNxagQ7Xg5wCxlEcgZgJdkD5KDcqMvfeEkA8MTAiH0pDipcWROEaDq0Etx_2A7QlnDBZimjpAGjuHqHJkhBjWj6-n9g",
    scenes: ["Acto I: El Telar", "Acto IV: Apoteosis Final"],
    roleColor: "border-[#fabc4d] text-[#fabc4d]",
  },
  {
    id: "6",
    name: "Valentin Ramos C.",
    characterName: "El Oficiante Mayor",
    characterTitle: "Dirección Escénica & Guía del Ritual",
    archetype: "Hierofante / Guía",
    bio: "Dirección y conducción del ensamble. Marca el pulso de las campanas y la ruptura de la cuarta pared.",
    photoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4AxDnqmXvbMLeNcWb4KsMTGKpwwJfWzqcK39TJfLpkd9jPgElmdZOsH8KAUIyVUiPwl3SvwrL20QMmNZwpxGuXvm5JG45VJb75VRinFbHGzwjsOcnhQUpTBINvysbCEfien4VKhYAcAWuKt6sK3GSa28UpB3FSBhxEsHcv5AWjMQF-hhjvqKhxTFPVIGk-AdUBRRTvGSJ0loFb--BrrOIsZX5LqfJeReIvu2risbDyKwQKTWozzy__w",
    scenes: ["Todas las Escenas", "Apertura y Cierre"],
    roleColor: "border-[#fabc4d] text-[#fabc4d]",
  },
];

export default function CastCardsGrid() {
  const [cast, setCast] = useState<CastMember[]>(INITIAL_CAST);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Upload modal state
  const [targetMemberId, setTargetMemberId] = useState<string | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string>("");
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New Actor form state
  const [newActorName, setNewActorName] = useState("");
  const [newCharName, setNewCharName] = useState("");
  const [newCharTitle, setNewCharTitle] = useState("");
  const [newArchetype, setNewArchetype] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newScenes, setNewScenes] = useState("Acto I, Acto II");

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openUploadModal = (memberId: string) => {
    setTargetMemberId(memberId);
    const member = cast.find((m) => m.id === memberId);
    setUploadedImagePreview(member ? member.photoUrl : "");
    setCustomPhotoUrl("");
    setIsUploadModalOpen(true);
  };

  const saveUploadedPhoto = () => {
    const finalUrl = customPhotoUrl.trim() || uploadedImagePreview;
    if (targetMemberId && finalUrl) {
      setCast((prev) =>
        prev.map((m) => (m.id === targetMemberId ? { ...m, photoUrl: finalUrl } : m))
      );
    }
    setIsUploadModalOpen(false);
    setTargetMemberId(null);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActorName || !newCharName) return;

    const newMember: CastMember = {
      id: Date.now().toString(),
      name: newActorName,
      characterName: newCharName,
      characterTitle: newCharTitle || "Personaje del Ritual",
      archetype: newArchetype || "Dionisíaco",
      bio: newBio || "Ficha actoral en proceso de construcción dramatúrgica.",
      photoUrl:
        newPhotoUrl.trim() ||
        uploadedImagePreview ||
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCsflbwK8N7xrmAZNR5DO6vSuetzhGlCIVlIQBtWq0O-O9PxJwwZ_PEE1dm78WKiMqDXlkvuLxgMOIUNw0NKw7pS31nhFxYJVy-tA8TKYXve7xXX5W8pieSHDUlgJbXJ5D0KRnszl7yHyjCMVJ5npCO7MJ-1hZBMoFOFsqsJ-Munks8XbIULVaJq9rnQ5hChTUBsoL8S0m9PxlzfvpZagzEJth4lWZ63sGI7Er61SPegvWVWq0IJXBcOw",
      scenes: newScenes.split(",").map((s) => s.trim()),
      roleColor: "border-[#fabc4d] text-[#fabc4d]",
    };

    setCast((prev) => [...prev, newMember]);
    setIsAddModalOpen(false);
    setNewActorName("");
    setNewCharName("");
    setNewCharTitle("");
    setNewArchetype("");
    setNewBio("");
    setNewPhotoUrl("");
    setUploadedImagePreview("");
  };

  const handleDeleteMember = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCast((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Top Banner & Action Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#141419] border border-[#58413f]/40 shadow-xl bg-noise">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#fabc4d]" />
            <span className="font-jakarta text-xs text-[#efbf67] uppercase tracking-[0.2em] font-bold">
              Directorio & Galería Oficial
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f7f4eb]">
            Panel de Elenco & Fichas de Personaje
          </h2>
          <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] mt-1 max-w-xl">
            Tarjetas de presentación de actores y personajes del ritual. Podés hacer clic en cada foto para actualizarla o cargar una nueva desde tu equipo.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-jakarta text-xs uppercase font-bold tracking-wider shadow-[0_0_20px_rgba(158,42,43,0.5)] border-t border-white/20 transition-all"
          >
            <UserPlus className="w-4 h-4 text-[#fabc4d]" />
            <span>Agregar Actor / Personaje</span>
          </button>
        </div>
      </div>

      {/* Grid of Actor / Character Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cast.map((member) => (
          <div
            key={member.id}
            className="group relative flex flex-col rounded-2xl bg-[#141419] border border-[#58413f]/40 overflow-hidden shadow-xl hover:border-[#fabc4d]/60 transition-all duration-300 hover:-translate-y-1 bg-noise"
          >
            {/* Photo Container with direct hover upload overlay */}
            <div className="relative w-full aspect-[4/3] bg-[#0b0b0e] overflow-hidden">
              <img
                src={member.photoUrl}
                alt={member.characterName}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />

              {/* Atmospheric Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-transparent to-black/40 pointer-events-none"></div>

              {/* Badges on top */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-3 py-1 rounded-md bg-[#0b0b0e]/80 backdrop-blur-md text-[#fabc4d] font-jakarta text-[11px] font-bold uppercase tracking-wider border border-[#fabc4d]/30">
                  {member.archetype}
                </span>

                <button
                  onClick={(e) => handleDeleteMember(member.id, e)}
                  title="Eliminar del Panel"
                  className="p-1.5 rounded-lg bg-[#0b0b0e]/80 text-[#dfbfbc] hover:text-[#ffb4ab] border border-[#58413f]/40 hover:bg-[#9e2a2b] transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Photo Upload Overlay Button on Hover */}
              <button
                onClick={() => openUploadModal(member.id)}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-xs text-[#f7f4eb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#9e2a2b]/80 border border-[#fabc4d] flex items-center justify-center text-[#fabc4d] shadow-[0_0_20px_rgba(250,188,77,0.5)]">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="font-jakarta text-xs uppercase tracking-wider font-bold text-[#f7f4eb] bg-[#0b0b0e]/80 px-3 py-1 rounded-full border border-white/20">
                  Cambiar / Cargar Foto
                </span>
              </button>
            </div>

            {/* Character & Actor Dossier */}
            <div className="p-6 flex flex-col flex-grow justify-between gap-4">
              <div>
                {/* Character Name & Real Actor Name */}
                <div className="flex items-baseline justify-between gap-2 border-b border-[#58413f]/30 pb-3">
                  <div>
                    <span className="font-jakarta text-[10px] text-[#efbf67] uppercase tracking-widest font-semibold block">
                      Personaje
                    </span>
                    <h3 className="font-cinzel text-xl font-bold text-[#f7f4eb] group-hover:text-[#fabc4d] transition-colors">
                      {member.characterName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-jakarta text-[10px] text-[#dfbfbc] uppercase tracking-widest block">
                      Actor / Actriz
                    </span>
                    <span className="font-jakarta text-xs text-[#ffb3ae] font-bold">
                      {member.name}
                    </span>
                  </div>
                </div>

                <p className="font-jakarta text-xs text-[#fabc4d] italic mt-2.5">
                  "{member.characterTitle}"
                </p>

                <p className="font-jakarta text-xs text-[#dfbfbc] mt-2 line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Scene Assignments & Action */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {member.scenes.map((scene, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#0b0b0e] border border-[#58413f]/40 font-jakarta text-[10px] text-[#dfbfbc]"
                    >
                      {scene}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => openUploadModal(member.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#1f1f22] hover:bg-[#28282d] border border-[#58413f]/50 text-[#f7f4eb] font-jakarta text-xs font-semibold transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#fabc4d]" />
                    <span>Cargar Foto</span>
                  </button>

                  <button
                    onClick={() => openUploadModal(member.id)}
                    className="p-2.5 rounded-xl bg-[#1f1f22] border border-[#58413f]/50 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors"
                    title="Editar Ficha"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL 1: CARGAR / ACTUALIZAR FOTO */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#141419] border border-[#fabc4d]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(158,42,43,0.6)] bg-noise text-[#f7f4eb]">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-5 right-5 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-1.5 rounded-lg bg-[#1f1f22]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#9e2a2b]/30 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider text-[#f7f4eb]">
                  Cargar Foto de Actor / Personaje
                </h3>
                <p className="text-xs text-[#efbf67] font-jakarta">
                  Seleccioná una imagen desde tu dispositivo o ingresá un enlace web
                </p>
              </div>
            </div>

            {/* Preview Box */}
            <div className="relative w-full h-56 rounded-xl bg-[#0b0b0e] border-2 border-dashed border-[#58413f] flex flex-col items-center justify-center overflow-hidden mb-5 group">
              {uploadedImagePreview || customPhotoUrl ? (
                <>
                  <img
                    src={customPhotoUrl || uploadedImagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-[#9e2a2b] text-xs font-bold font-jakarta text-[#f7f4eb]"
                    >
                      Seleccionar Otra Imagen
                    </button>
                  </div>
                </>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 cursor-pointer text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-4 text-center"
                >
                  <Upload className="w-8 h-8 text-[#fabc4d]" />
                  <span className="font-jakarta text-xs font-semibold">
                    Hacé clic acá para seleccionar una foto de tu computadora
                  </span>
                  <span className="font-jakarta text-[11px] text-[#8a877e]">
                    Soporta JPG, PNG, WEBP (Max 10MB)
                  </span>
                </div>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Alternative: URL Input */}
            <div className="space-y-2 mb-6">
              <label className="block text-xs uppercase tracking-wider text-[#efbf67] font-bold">
                O ingresá la URL directa de la imagen:
              </label>
              <input
                type="url"
                value={customPhotoUrl}
                onChange={(e) => {
                  setCustomPhotoUrl(e.target.value);
                  setUploadedImagePreview(e.target.value);
                }}
                placeholder="https://ejemplo.com/foto-personaje.jpg"
                className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#1f1f22] text-[#dfbfbc] text-xs font-bold font-jakarta hover:bg-[#28282d] transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={saveUploadedPhoto}
                className="px-6 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] text-xs font-bold uppercase tracking-wider font-jakarta shadow-[0_0_15px_rgba(158,42,43,0.5)] transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-[#fabc4d]" />
                <span>Guardar Foto</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: AGREGAR NUEVO ACTOR / PERSONAJE */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#141419] border border-[#fabc4d]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(158,42,43,0.6)] bg-noise text-[#f7f4eb] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-1.5 rounded-lg bg-[#1f1f22]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#9e2a2b]/30 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d]">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider text-[#f7f4eb]">
                  Nueva Ficha de Elenco
                </h3>
                <p className="text-xs text-[#efbf67] font-jakarta">
                  Registrá un nuevo actor con su personaje correspondiente y fotografía
                </p>
              </div>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#efbf67] uppercase">
                    Nombre del Actor / Actriz *
                  </label>
                  <input
                    required
                    type="text"
                    value={newActorName}
                    onChange={(e) => setNewActorName(e.target.value)}
                    placeholder="Ej. Martín Fierro"
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#fabc4d] uppercase">
                    Nombre del Personaje *
                  </label>
                  <input
                    required
                    type="text"
                    value={newCharName}
                    onChange={(e) => setNewCharName(e.target.value)}
                    placeholder="Ej. El Payador Místico"
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#dfbfbc] uppercase">
                    Título / Rango del Personaje
                  </label>
                  <input
                    type="text"
                    value={newCharTitle}
                    onChange={(e) => setNewCharTitle(e.target.value)}
                    placeholder="Ej. Oráculo de las Pampas"
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#dfbfbc] uppercase">
                    Arquetipo
                  </label>
                  <input
                    type="text"
                    value={newArchetype}
                    onChange={(e) => setNewArchetype(e.target.value)}
                    placeholder="Ej. Chamánico, Rebelde, Sombra"
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#dfbfbc] uppercase">
                  Biografía & Función Escénica
                </label>
                <textarea
                  rows={3}
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  placeholder="Descripción de la intervención psicomágica y requerimientos corporales..."
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl p-3 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#dfbfbc] uppercase">
                  Escenas Convocadas (separadas por coma)
                </label>
                <input
                  type="text"
                  value={newScenes}
                  onChange={(e) => setNewScenes(e.target.value)}
                  placeholder="Acto I: Invocación, Acto III: Juicio"
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#fabc4d] uppercase">
                  URL de la Foto o Imagen
                </label>
                <input
                  type="url"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-2.5 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#1f1f22] text-[#dfbfbc] text-xs font-bold font-jakarta hover:bg-[#28282d] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] text-xs font-bold uppercase tracking-wider font-jakarta shadow-[0_0_15px_rgba(158,42,43,0.5)] transition-all flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4 text-[#fabc4d]" />
                  <span>Registrar en Elenco</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
