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
  Loader2,
  CloudUpload,
} from "lucide-react";
import { uploadImageToSupabase } from "@/lib/supabase";

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
    name: "Gabriel (Actor Central)",
    characterName: "El Niño Gabriel",
    characterTitle: "El que despertó al demonio con el código 616",
    archetype: "Oráculo Digital & Vidente",
    bio: "Digitó el código 616 en la tarjeta de crédito de sus padres jugando videojuegos. Custodio del secreto primordial: 'Argentina es una civilización'. Enfrenta al hombre-robot algorítmico.",
    photoUrl: "",
    scenes: ["Escena 3: Gabriel y la Madre", "Escena 6: El Olvido", "Escena 9: El Secreto de Argentum"],
    roleColor: "border-[#fabc4d] text-[#fabc4d]",
  },
  {
    id: "2",
    name: "Flor Darío / Luciana",
    characterName: "La Madre (Doña Argentina)",
    characterTitle: "Matriarca del Grotesco & La Familia Musicardi",
    archetype: "Tierra & Realidad Cotidiana",
    bio: "Exige que Gabriel deje TikTok y haga la tarea sin ChatGPT. Encarna la histeria del hogar argentino: '¡Yo hago ravioles, ella hace ravioles! ¡Somos los Musicardi, una gran familia!'.",
    photoUrl: "",
    scenes: ["Escena 3: Gabriel y la Madre", "Escena 8: Bloque Musical Musicardi"],
    roleColor: "border-[#ffb3ae] text-[#ffb3ae]",
  },
  {
    id: "3",
    name: "Darío / Tomi Mendieta",
    characterName: "El Colla / Sabio Andino",
    characterTitle: "Filósofo del Espacio-Tiempo & La Manzana",
    archetype: "Sabiduría Andina",
    bio: "Abre la metafísica tras las cantoras: en el siglo XXI pasamos a la era del espacio-tiempo, la materia no existe (E=mc²). Muerde la manzana de la discordia en el centro del altar.",
    photoUrl: "",
    scenes: ["Escena 2: La Búsqueda de la Verdad", "Escena 7: La Comparsa"],
    roleColor: "border-[#efbf67] text-[#efbf67]",
  },
  {
    id: "4",
    name: "Tomás (Mendieta)",
    characterName: "José Mercado",
    characterTitle: "El Titiritero de la Biyuya & El Billetín",
    archetype: "El Mercado Financiero",
    bio: "Decide quién cobra y quién no. Factura 700 millones de euros en la Champions pero ofrece un millón de pesos para el fútbol femenino. Primo de Raúl Estado y socio de Javier Petróleo.",
    photoUrl: "",
    scenes: ["Escena 5: ¡Viva la Libertad Carajo!"],
    roleColor: "border-[#9e2a2b] text-[#ffb3ae]",
  },
  {
    id: "5",
    name: "Ulises / Aixa (Danza)",
    characterName: "La Chola",
    characterTitle: "Danza Sagrada & Baila Zamba",
    archetype: "Danza Telúrica",
    bio: "Baila zamba encarnando el latido del norte y la memoria viva de la tierra. Con su pañuelo en vuelo y su movimiento ceremonial, convoca la energía del festejo y la resistencia popular.",
    photoUrl: "",
    scenes: ["Escena 4: El Demonio Criollo", "Escena 7: La Comparsa"],
    roleColor: "border-[#fabc4d] text-[#fabc4d]",
  },
  {
    id: "6",
    name: "Martina Larrea",
    characterName: "La Tanguera",
    characterTitle: "Nostalgia Urbana & Compás Porteño",
    archetype: "El Arrabal & La Resistencia",
    bio: "La fuerza poética y nocturna de Buenos Aires. En su abrazo y en su taco sobre el escenario, dialoga con el bandoneón para desarmar la farsa y rescatar la voz de la ciudad.",
    photoUrl: "",
    scenes: ["Escena 5: ¡Viva la Libertad Carajo!", "Escena 8: El Bloque Porteño"],
    roleColor: "border-[#ffb3ae] text-[#ffb3ae]",
  },
  {
    id: "7",
    name: "Sofía Valenzuela",
    characterName: "La Sahumadora",
    characterTitle: "Guardián del Humo Sagrado & Purificación",
    archetype: "Fuego & Resinas Sagradas",
    bio: "Portadora de la brasa y las hierbas sagradas que purifican el espacio escénico. Disipa las sombras y prepara el altar para la revelación primordial de Argentum.",
    photoUrl: "",
    scenes: ["Escena 1: Apertura Ritual", "Escena 9: El Secreto de Argentum"],
    roleColor: "border-[#fabc4d] text-[#fabc4d]",
  },
  {
    id: "8",
    name: "Edwin (Actor / Performer)",
    characterName: "Edwin el Venezolano",
    characterTitle: "El Repartidor & La Hermandad Latinoamericana",
    archetype: "El Migrante & La Calle",
    bio: "Llegó en moto cruzando toda América para repartir en las noches de Buenos Aires. En la farsa mediática y en el ritual rompe la soledad del delivery urbano aportando el pulso y la hermandad latinoamericana.",
    photoUrl: "",
    scenes: ["Escena 5: ¡Viva la Libertad Carajo!", "Escena 7: La Comparsa", "Escena 10: Himno"],
    roleColor: "border-[#efbf67] text-[#efbf67]",
  },
  {
    id: "9",
    name: "Cantora 1 & Cantora 2",
    characterName: "Las Cantoras del Origen",
    characterTitle: "Voces de la Patria & Cabelleras Eternas",
    archetype: "Sirenas Ancestrales",
    bio: "Ubicadas en los extremos del escenario con cabello largo sostenido por un monje y un diablo norteño. Abren y cierran el ritual: 'Argentina, ¿qué pasa con tu voz?'.",
    photoUrl: "",
    scenes: ["Escena 1: Las Cantoras & La Manzana", "Escena 7: Coplas del Olvido", "Escena 10: Himno"],
    roleColor: "border-[#bd8718] text-[#fabc4d]",
  },
];

export default function CastCardsGrid() {
  const [cast, setCast] = useState<CastMember[]>(INITIAL_CAST);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Upload modal state
  const [targetMemberId, setTargetMemberId] = useState<string | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingToSupabase, setIsUploadingToSupabase] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New Actor form state
  const [newActorName, setNewActorName] = useState("");
  const [newCharName, setNewCharName] = useState("");
  const [newCharTitle, setNewCharTitle] = useState("");
  const [newArchetype, setNewArchetype] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newScenes, setNewScenes] = useState("Escena 1, Escena 5");

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadError(null);
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
    setSelectedFile(null);
    setUploadError(null);
    setIsUploadModalOpen(true);
  };

  const saveUploadedPhoto = async () => {
    if (!targetMemberId) return;

    if (selectedFile) {
      setIsUploadingToSupabase(true);
      setUploadError(null);
      const { url, error } = await uploadImageToSupabase(selectedFile, "elenco");
      setIsUploadingToSupabase(false);

      if (error) {
        setUploadError(`Error de subida a Supabase: ${error}`);
        return;
      }

      if (url) {
        setCast((prev) =>
          prev.map((m) => (m.id === targetMemberId ? { ...m, photoUrl: url } : m))
        );
      }
    } else if (uploadedImagePreview) {
      setCast((prev) =>
        prev.map((m) =>
          m.id === targetMemberId ? { ...m, photoUrl: uploadedImagePreview } : m
        )
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
      characterTitle: newCharTitle || "Personaje de Fiesta Pagana",
      archetype: newArchetype || "Dionisíaco / Criollo",
      bio: newBio || "Ficha actoral adaptada al guión oficial.",
      photoUrl: "",
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
              Directorio & Galería Oficial de la Obra
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f7f4eb]">
            Panel de Elenco • Fichas de Personaje
          </h2>
          <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] mt-1 max-w-xl">
            Espacios listos para la carga de fotografías mediante <strong>Supabase Storage</strong>. Hacé clic en cualquier tarjeta para subir la foto oficial de cada actor.
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

      {/* Grid of Actor / Character Cards (Empty slot frames ready for Supabase upload) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cast.map((member) => (
          <div
            key={member.id}
            className="group relative flex flex-col rounded-2xl bg-[#141419] border border-[#58413f]/40 overflow-hidden shadow-xl hover:border-[#fabc4d]/60 transition-all duration-300 hover:-translate-y-1 bg-noise"
          >
            {/* Empty or Loaded Photo Slot Container */}
            <div className="relative w-full aspect-[4/3] bg-[#0b0b0e] overflow-hidden border-b border-[#58413f]/30">
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={member.characterName}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                /* Empty Placeholder Slot Frame */
                <div
                  onClick={() => openUploadModal(member.id)}
                  className="w-full h-full flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-[#58413f]/50 hover:border-[#fabc4d]/70 transition-colors cursor-pointer bg-[#0e0e11]/80 group/slot"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#141419] border border-[#58413f]/60 flex items-center justify-center text-[#dfbfbc] group-hover/slot:text-[#fabc4d] group-hover/slot:border-[#fabc4d] transition-colors mb-2.5 shadow-inner">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="font-jakarta text-xs font-semibold text-[#f7f4eb] block">
                    Espacio para Foto del Actor
                  </span>
                  <span className="font-jakarta text-[11px] text-[#efbf67] mt-1 flex items-center gap-1 font-medium">
                    <CloudUpload className="w-3 h-3" /> Cargar en Supabase Storage
                  </span>
                </div>
              )}

              {/* Atmospheric Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-transparent to-black/30 pointer-events-none"></div>

              {/* Badges on top */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded-md bg-[#0b0b0e]/85 backdrop-blur-md text-[#fabc4d] font-jakarta text-[11px] font-bold uppercase tracking-wider border border-[#fabc4d]/30 pointer-events-auto">
                  {member.archetype}
                </span>

                <button
                  onClick={(e) => handleDeleteMember(member.id, e)}
                  title="Eliminar del Panel"
                  className="p-1.5 rounded-lg bg-[#0b0b0e]/85 text-[#dfbfbc] hover:text-[#ffb4ab] border border-[#58413f]/40 hover:bg-[#9e2a2b] transition-colors pointer-events-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Photo Upload Overlay Button on Hover */}
              {member.photoUrl && (
                <button
                  onClick={() => openUploadModal(member.id)}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-xs text-[#f7f4eb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-[#9e2a2b]/80 border border-[#fabc4d] flex items-center justify-center text-[#fabc4d] shadow-[0_0_20px_rgba(250,188,77,0.5)]">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="font-jakarta text-xs uppercase tracking-wider font-bold text-[#f7f4eb] bg-[#0b0b0e]/90 px-3 py-1 rounded-full border border-white/20">
                    Cambiar Foto (Supabase)
                  </span>
                </button>
              )}
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
                    <span>{member.photoUrl ? "Cambiar Foto" : "Cargar Foto en Supabase"}</span>
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

      {/* MODAL: CARGAR FOTO DIRECTAMENTE A SUPABASE STORAGE */}
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
                <CloudUpload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider text-[#f7f4eb]">
                  Subir Foto a Supabase Storage
                </h3>
                <p className="text-xs text-[#efbf67] font-jakarta">
                  Bucket: <code className="bg-[#0b0b0e] px-1.5 py-0.5 rounded text-[#fabc4d]">fiesta-pagana/elenco</code>
                </p>
              </div>
            </div>

            {uploadError && (
              <div className="p-3 mb-4 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab] text-xs text-[#ffdad6]">
                {uploadError}
              </div>
            )}

            {/* Preview Box */}
            <div className="relative w-full h-56 rounded-xl bg-[#0b0b0e] border-2 border-dashed border-[#58413f] flex flex-col items-center justify-center overflow-hidden mb-5 group">
              {uploadedImagePreview ? (
                <>
                  <img
                    src={uploadedImagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-[#9e2a2b] text-xs font-bold font-jakarta text-[#f7f4eb]"
                    >
                      Elegir Otro Archivo
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
                    Hacé clic acá para seleccionar una foto de tu equipo
                  </span>
                  <span className="font-jakarta text-[11px] text-[#8a877e]">
                    JPG, PNG, WEBP, GIF (Se almacena en Supabase Storage)
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
                disabled={isUploadingToSupabase || !uploadedImagePreview}
                onClick={saveUploadedPhoto}
                className="px-6 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] disabled:opacity-50 text-[#f7f4eb] text-xs font-bold uppercase tracking-wider font-jakarta shadow-[0_0_15px_rgba(158,42,43,0.5)] transition-all flex items-center gap-2"
              >
                {isUploadingToSupabase ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#fabc4d]" />
                    <span>Guardando en Supabase...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-[#fabc4d]" />
                    <span>Guardar Imagen</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: AGREGAR NUEVO ACTOR */}
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
                  Registrá un nuevo actor con su personaje correspondiente del guión
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
                    placeholder="Ej. Martina Larrea"
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
                    placeholder="Ej. Edwin (El Repartidor)"
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
                    placeholder="Ej. El Repartidor Hermano de las Hallacas"
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
                    placeholder="Ej. Migrante, Obrero, Chamánico"
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
                  placeholder="Descripción del personaje según el guión teatral..."
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
                  placeholder="Escena 5: ¡Viva la Libertad!, Escena 8: Musicardi"
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
