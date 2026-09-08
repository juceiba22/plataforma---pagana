"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  BookOpen,
  Clock,
  Music,
  Users,
  Ticket,
  ArrowRight,
  Shield,
  Theater,
  Lock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Video,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import RitualModal from "./RitualModal";
import AccessModal from "./AccessModal";
import { useAuth } from "@/context/AuthContext";

interface VideoModalState {
  isOpen: boolean;
  title: string;
  subtitle: string;
  theme: string;
}

export default function FormatSelector() {
  const [activeFormat, setActiveFormat] = useState<"obra-completa" | "guion-escenas">("obra-completa");
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  // Video popup modals state
  const [videoModal, setVideoModal] = useState<VideoModalState>({
    isOpen: false,
    title: "",
    subtitle: "",
    theme: "",
  });

  // 1:1 Square Video Player State
  const [isPlayingSquareVideo, setIsPlayingSquareVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const squareVideoRef = useRef<HTMLVideoElement | null>(null);

  // Actor lock state for 10 scenes
  const { isStaff, isAdmin, user } = useAuth();
  const [actorPasscode, setActorPasscode] = useState("");
  const [isActorUnlocked, setIsActorUnlocked] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);

  const isActorAuthorized = isStaff || isAdmin || isActorUnlocked;

  const handleUnlockWithPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const code = actorPasscode.toLowerCase().trim();
    if (
      code === "fiestapagana" ||
      code === "dionisio2025" ||
      code === "ritual" ||
      code === "elenco"
    ) {
      setIsActorUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const togglePlaySquareVideo = () => {
    if (squareVideoRef.current) {
      if (isPlayingSquareVideo) {
        squareVideoRef.current.pause();
        setIsPlayingSquareVideo(false);
      } else {
        squareVideoRef.current.play().catch(() => {});
        setIsPlayingSquareVideo(true);
      }
    } else {
      setIsPlayingSquareVideo(!isPlayingSquareVideo);
    }
  };

  const openVideoModal = (title: string, subtitle: string, theme: string) => {
    setVideoModal({
      isOpen: true,
      title,
      subtitle,
      theme,
    });
  };

  const PLAY_SCENES = [
    {
      number: "1",
      name: "La Sahumadora & El Lamento de las Cantoras",
      desc: "La Sahumadora purifica el espacio ceremonial con hierbas y resinas sagradas. Las dos cantoras y sus largas cabelleras entonan: 'Argentina, ¿qué pasa con tu voz?'. La manzana reposa en el centro del altar.",
    },
    {
      number: "2",
      name: "La Búsqueda de la Verdad & El Espacio-Tiempo",
      desc: "Cuatro demonios avanzan en cuclillas. El Colla abre el portal de la física metafísica: E=mc², la materia no existe, y muerde la manzana de la discordia con sorna filosófica.",
    },
    {
      number: "3",
      name: "Gabriel y la Madre (El Código 616)",
      desc: "Gabriel confiesa al público cómo un error con la tarjeta de crédito y el código 616 despertó a las nueve jerarquías infernales. Su madre le exige dejar TikTok y hacer la tarea.",
    },
    {
      number: "4",
      name: "La Chola, El Demonio Criollo & La Salamanca",
      desc: "La Chola baila zamba con pañuelo en mano y explica por qué en nuestra tierra la Salamanca se libera en carnaval para no andar suelta el resto del año, buscando la verdadera libertad americana.",
    },
    {
      number: "5",
      name: "¡Viva la Libertad Carajo! (El Show de Televisión & La Tanguera)",
      desc: "Farsa mediática: La Tanguera y Edwin el Venezolano irrumpen en escena mientras José Mercado impone el poder despiadado del dinero y la biyuya.",
    },
    {
      number: "6",
      name: "El Olvido de los Algoritmos & Celulares",
      desc: "'¿Alguien se acuerda del último reel que vio?'. El tiempo del teléfono es el tiempo del olvido: la dispersión de la atención y la desintegración del misterio humano.",
    },
    {
      number: "7",
      name: "La Cantora y la Comparsa del Norte",
      desc: "'Somos los indios del norte, no nos vamos a olvidar, que la tierra es la mamita y arriba el Padre Sol'. Danza ritual con bombos y coplas de resistencia.",
    },
    {
      number: "8",
      name: "Génesis Popular & Los Musicardi",
      desc: "Grotesco criollo y catarsis: el puchero, los ravioles, el karma político argentino (FMI, hiperinflación) y el grito de: '¡Tenemos que ir a terapia todo el país!'.",
    },
    {
      number: "9",
      name: "El Secreto de Argentum",
      desc: "Gabriel revela el destino de nuestra tierra: 'Argentina es una civilización'. Rezo colectivo: 'Hazte de plata y espeja el oro de las alturas'.",
    },
    {
      number: "10",
      name: "Apoteosis Final & Himno Nacional",
      desc: "Clímax ceremonial donde todo el ensamble, elenco y público entonan el Himno Nacional Argentino en una versión sagrada y pagana.",
    },
  ];

  return (
    <section id="formatos-escenicos" className="w-full bg-[#0b0b0e] py-20 lg:py-32 relative overflow-hidden bg-noise">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & Toggle Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-jakarta text-xs uppercase tracking-[0.2em] text-[#ffb3ae] font-bold block mb-2">
              Estructura Dramatúrgica
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#f7f4eb] uppercase font-bold tracking-tight">
              La Puesta en Escena
            </h2>
          </div>

          {/* Format Switcher Buttons */}
          <div className="inline-flex p-1 bg-[#141419] rounded-xl self-start md:self-auto border border-[#58413f]/40">
            <button
              onClick={() => setActiveFormat("obra-completa")}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeFormat === "obra-completa"
                  ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_20px_rgba(158,42,43,0.6)]"
                  : "text-[#dfbfbc] hover:text-[#f7f4eb]"
              }`}
            >
              Obra en Teatros (Puesta Total)
            </button>
            <button
              onClick={() => setActiveFormat("guion-escenas")}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeFormat === "guion-escenas"
                  ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_20px_rgba(158,42,43,0.6)]"
                  : "text-[#dfbfbc] hover:text-[#f7f4eb]"
              }`}
            >
              {!isActorAuthorized && <Lock className="w-3.5 h-3.5 text-[#fabc4d]" />}
              <span>Las 10 Escenas del Guión</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: Obra Completa */}
        {activeFormat === "obra-completa" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-fadeIn">
            {/* 1:1 Square Video Container ("Fiesta Pagana en Teatros") */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-square rounded-2xl bg-[#141419] border-2 border-[#fabc4d]/50 shadow-[0_0_40px_rgba(250,188,77,0.2)] bg-noise overflow-hidden group flex flex-col justify-between p-6 sm:p-7">
                {/* Background Ambient Glow & Video / Visual Slot */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#9e2a2b]/30 via-[#141419] to-[#0e0e11] pointer-events-none" />

                {/* Optional HTML5 Video element if video URL is present */}
                <video
                  ref={squareVideoRef}
                  loop
                  playsInline
                  muted={isMuted}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    isPlayingSquareVideo ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  src=""
                />

                {/* Square Card Top Header */}
                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#58413f]/40">
                  <span className="px-3 py-1 rounded bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase tracking-widest font-bold shadow-md">
                    Video 1:1
                  </span>
                  <span className="font-mono text-xs text-[#ffb3ae] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#fabc4d] animate-pulse"></span>
                    Teatro Ritual
                  </span>
                </div>

                {/* Center Content / Video Play Trigger */}
                <div className="relative z-10 py-6 text-center space-y-4 my-auto">
                  <button
                    onClick={togglePlaySquareVideo}
                    className="w-20 h-20 rounded-2xl bg-[#9e2a2b]/60 hover:bg-[#9e2a2b] border-2 border-[#fabc4d] text-[#fabc4d] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(158,42,43,0.8)] group-hover:scale-105 transition-all cursor-pointer"
                    aria-label={isPlayingSquareVideo ? "Pausar Video" : "Reproducir Video"}
                  >
                    {isPlayingSquareVideo ? (
                      <Pause className="w-9 h-9 fill-[#fabc4d] text-[#fabc4d]" />
                    ) : (
                      <Play className="w-9 h-9 fill-[#fabc4d] text-[#fabc4d] ml-1" />
                    )}
                  </button>

                  <div>
                    <h4 className="font-cinzel text-xl sm:text-2xl font-bold uppercase text-[#f7f4eb] tracking-wider drop-shadow-md">
                      Fiesta Pagana en Teatros
                    </h4>
                    <p className="font-jakarta text-xs text-[#dfbfbc] leading-relaxed italic mt-1.5">
                      "Melodías que me cuentan quién sos"
                    </p>
                  </div>
                </div>

                {/* Square Card Bottom Footer */}
                <div className="relative z-10 pt-3 border-t border-[#58413f]/40 flex items-center justify-between">
                  <span className="font-jakarta text-[11px] uppercase tracking-widest text-[#efbf67] font-semibold">
                    Registro Escénico Oficial
                  </span>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-lg bg-[#0b0b0e]/80 text-[#dfbfbc] hover:text-[#fabc4d] border border-[#58413f]/50 transition-colors"
                    title={isMuted ? "Activar Audio" : "Silenciar Audio"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Details, Title & 2 Interactive Video Buttons */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[#fabc4d] mb-3">
                  <Flame className="w-4 h-4 text-[#fabc4d]" />
                  <span className="font-jakarta text-xs uppercase tracking-widest font-bold">
                    Experiencia Escénica Viva
                  </span>
                </div>
                <h3 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#f7f4eb] font-bold uppercase tracking-tight leading-tight">
                  Argentina, ¿qué pasa con tu voz?
                </h3>
              </div>

              {/* The 2 Interactive Buttons replacing Farsa Televisiva & Teatro Foro */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Button 1: La Batalla celeste & terrestre */}
                <button
                  onClick={() =>
                    openVideoModal(
                      "La Batalla Celeste & Terrestre",
                      "La confrontación metafísica entre la materia y el espíritu en el teatro ritual.",
                      "celeste"
                    )
                  }
                  className="group relative p-5 rounded-2xl bg-[#141419] border-2 border-[#58413f]/60 hover:border-[#fabc4d] transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,188,77,0.25)] text-left flex flex-col justify-between min-h-[140px] cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#9e2a2b]/30 border border-[#fabc4d] flex items-center justify-center text-[#fabc4d] group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(158,42,43,0.4)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#fabc4d]/15 text-[#fabc4d] border border-[#fabc4d]/30 text-[10px] uppercase tracking-wider font-bold">
                      Ver Video
                    </span>
                  </div>
                  <div>
                    <h5 className="font-cinzel text-base sm:text-lg font-bold text-[#f7f4eb] group-hover:text-[#fabc4d] transition-colors uppercase">
                      La Batalla celeste & terrestre
                    </h5>
                    <p className="text-xs text-[#dfbfbc] mt-1 line-clamp-1">
                      Misterio primordial, Leopoldo Marechal y la física cuántica.
                    </p>
                  </div>
                </button>

                {/* Button 2: Yo te otorgo la libertad */}
                <button
                  onClick={() =>
                    openVideoModal(
                      "Yo te otorgo la libertad",
                      "La farsa de la falsa libertad contemporánea y la catarsis colectiva.",
                      "libertad"
                    )
                  }
                  className="group relative p-5 rounded-2xl bg-[#141419] border-2 border-[#58413f]/60 hover:border-[#ffb3ae] transition-all duration-300 hover:shadow-[0_0_30px_rgba(158,42,43,0.35)] text-left flex flex-col justify-between min-h-[140px] cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#9e2a2b]/30 border border-[#ffb3ae] flex items-center justify-center text-[#ffb3ae] group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(158,42,43,0.4)]">
                      <Theater className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#9e2a2b]/40 text-[#ffb3ae] border border-[#ffb3ae]/30 text-[10px] uppercase tracking-wider font-bold">
                      Ver Video
                    </span>
                  </div>
                  <div>
                    <h5 className="font-cinzel text-base sm:text-lg font-bold text-[#f7f4eb] group-hover:text-[#ffb3ae] transition-colors uppercase">
                      Yo te otorgo la libertad
                    </h5>
                    <p className="text-xs text-[#dfbfbc] mt-1 line-clamp-1">
                      La farsa televisiva, José Mercado y la búsqueda de la libertad real.
                    </p>
                  </div>
                </button>
              </div>

              {/* Tickets CTA */}
              <div className="pt-2">
                <a
                  href="https://www.alternativateatral.com/obra102861-fiesta-pagana-una-obra-para-rescatarnos-del-olvido"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(250,188,77,0.4)] hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Ticket className="w-4 h-4 text-[#281900]" />
                  <span>Conseguir Entradas en Alternativa Teatral</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Las 10 Escenas del Guión (Gated for Actors Only) */}
        {activeFormat === "guion-escenas" && (
          <div>
            {!isActorAuthorized ? (
              /* Actor Lock Gatekeeper Card */
              <div className="p-8 sm:p-12 rounded-3xl bg-[#141419] border-2 border-[#9e2a2b]/60 shadow-[0_0_50px_rgba(158,42,43,0.3)] bg-noise text-center max-w-2xl mx-auto space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-[#9e2a2b]/30 border border-[#fabc4d] flex items-center justify-center text-[#fabc4d] mx-auto shadow-[0_0_25px_rgba(250,188,77,0.3)]">
                  <Lock className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9e2a2b]/30 text-[#ffb3ae] text-xs font-bold uppercase tracking-widest border border-[#9e2a2b]">
                    <Shield className="w-3.5 h-3.5 text-[#fabc4d]" />
                    <span>Exclusivo para Actores & Elenco</span>
                  </div>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase text-[#f7f4eb]">
                    Guión Técnico Reservado
                  </h3>
                  <p className="text-xs sm:text-sm text-[#dfbfbc] max-w-md mx-auto leading-relaxed">
                    El desglose dramatúrgico de las 10 escenas, partituras y acotaciones está protegido. Si formás parte del elenco, ingresá con tu cuenta autorizada o validá la clave de ensayo.
                  </p>
                </div>

                {/* Unlock actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                  <button
                    onClick={() => setIsAccessModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#fabc4d] text-[#281900] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(250,188,77,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>Ingresar como Actor</span>
                  </button>

                  <form onSubmit={handleUnlockWithPasscode} className="w-full sm:w-auto flex items-center gap-2">
                    <input
                      type="password"
                      placeholder="Clave de ensayo..."
                      value={actorPasscode}
                      onChange={(e) => {
                        setActorPasscode(e.target.value);
                        setPasscodeError(false);
                      }}
                      className="bg-[#0b0b0e] border border-[#58413f] rounded-xl px-3 py-2.5 text-xs text-[#f7f4eb] focus:border-[#fabc4d] w-full sm:w-36"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
                    >
                      Desbloquear
                    </button>
                  </form>
                </div>

                {passcodeError && (
                  <p className="text-xs text-[#ffb4ab]">
                    Clave de ensayo no válida. Consulta con la producción o dirección.
                  </p>
                )}
              </div>
            ) : (
              /* Unlocked 10 Scenes for Actors */
              <div className="space-y-6 animate-fadeIn">
                <div className="p-3.5 rounded-xl bg-[#9e2a2b]/20 border border-[#9e2a2b] flex items-center justify-between text-xs text-[#ffdad7]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#fabc4d]" />
                    <span>Acceso habilitado como <strong>Elenco / Actor Autorizado</strong></span>
                  </div>
                  <Link
                    href="/portal"
                    className="text-[#fabc4d] font-bold hover:underline uppercase text-[11px]"
                  >
                    Ir al Portal de Ensayos →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PLAY_SCENES.map((scene) => (
                    <div
                      key={scene.number}
                      className="p-5 rounded-2xl bg-[#141419] border border-[#58413f]/40 hover:border-[#fabc4d]/40 transition-all flex gap-4 items-start"
                    >
                      <span className="w-9 h-9 rounded-xl bg-[#9e2a2b] text-[#f7f4eb] font-cinzel text-sm font-bold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(158,42,43,0.5)]">
                        {scene.number}
                      </span>
                      <div className="space-y-1">
                        <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#f7f4eb]">
                          Escena {scene.number}: {scene.name}
                        </h4>
                        <p className="font-jakarta text-xs text-[#dfbfbc] leading-relaxed">
                          {scene.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Staff Only Restricted Notice Banner */}
        <div className="mt-12 p-4 rounded-2xl bg-[#141419] border border-[#9e2a2b]/40 flex flex-col sm:flex-row items-center justify-between gap-4 bg-noise">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#9e2a2b]/20 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d] shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ffb3ae] font-jakarta">
                  Acceso Restringido • Sala de Actores & Elenco
                </span>
                <span className="px-2 py-0.5 rounded bg-[#9e2a2b] text-[#fabc4d] text-[10px] font-bold uppercase">
                  Sólo para Actores
                </span>
              </div>
              <p className="text-xs text-[#dfbfbc] mt-0.5">
                Las acotaciones de dirección, diagramas lumínicos y cronogramas completos se gestionan en el Portal de Elenco.
              </p>
            </div>
          </div>

          <Link
            href="/portal"
            className="px-4 py-2 rounded-xl bg-[#1f1f22] hover:bg-[#28282d] border border-[#58413f] text-[#fabc4d] text-xs font-bold uppercase tracking-wider font-jakarta transition-all shrink-0 flex items-center gap-1.5"
          >
            <span>Ingresar al Portal de Actores</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* POPUP MODAL: PRÓXIMAMENTE VIDEO MODAL */}
      {videoModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#141419] border-2 border-[#fabc4d]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(158,42,43,0.6)] bg-noise text-[#f7f4eb] overflow-hidden">
            <button
              onClick={() => setVideoModal({ ...videoModal, isOpen: false })}
              className="absolute top-5 right-5 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-2 rounded-xl bg-[#1f1f22]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9e2a2b]/30 text-[#fabc4d] border border-[#fabc4d]/40 text-xs font-bold uppercase tracking-widest">
                <Video className="w-3.5 h-3.5" />
                <span>Próximamente • Video en Producción</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase text-[#f7f4eb]">
                {videoModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#dfbfbc]">
                {videoModal.subtitle}
              </p>
            </div>

            {/* Video Player Placeholder Box */}
            <div className="relative w-full aspect-video rounded-2xl bg-[#0b0b0e] border-2 border-dashed border-[#58413f] flex flex-col items-center justify-center p-6 text-center overflow-hidden mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-[#0b0b0e]/70 to-transparent pointer-events-none" />

              <div className="relative z-10 w-16 h-16 rounded-full bg-[#9e2a2b]/40 border-2 border-[#fabc4d] flex items-center justify-center text-[#fabc4d] mb-4 shadow-[0_0_30px_rgba(250,188,77,0.4)] animate-pulse">
                <Play className="w-8 h-8 fill-[#fabc4d] ml-1" />
              </div>

              <span className="relative z-10 font-cinzel text-lg font-bold text-[#f7f4eb] uppercase tracking-wider">
                Próximamente
              </span>
              <p className="relative z-10 text-xs text-[#efbf67] max-w-sm mt-1">
                El material audiovisual y registro de este fragmento escénico se encuentra en fase de edición y será publicado a la brevedad.
              </p>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] text-[#8a877e]">
                Fiesta Pagana en Teatros • Buenos Aires
              </span>
              <button
                onClick={() => setVideoModal({ ...videoModal, isOpen: false })}
                className="px-6 py-2.5 rounded-xl bg-[#fabc4d] text-[#281900] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      <RitualModal isOpen={isRitualModalOpen} onClose={() => setIsRitualModalOpen(false)} />
      <AccessModal isOpen={isAccessModalOpen} onClose={() => setIsAccessModalOpen(false)} />
    </section>
  );
}
