"use client";

import React, { useState } from "react";
import { Sparkles, Flame, Eye, EyeOff, Lock, Unlock, Copy, Check, Feather, BookOpen, Scroll } from "lucide-react";

interface SacredManuscript {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  author: string;
  excerpt: string;
  sacredPassage: string[];
  ritualInstruction: string;
}

const SACRED_TEXTS: SacredManuscript[] = [
  {
    id: "liturgia-noche",
    number: "I",
    title: "Liturgia de la Noche Sin Tiempo",
    subtitle: "Invocación inicial y quebrantamiento del reloj civil",
    author: "El Guía Psicomágico & Ensamble Sagrado",
    excerpt: "Nadie que cruce el umbral conservará las horas que marca la ciudad. Aquí el tiempo no transcurre: se quema en el fogón central.",
    sacredPassage: [
      "Pronunciamos la primera palabra que deshace el calendario. Que caigan los títulos de propiedad, los relojes de pulsera, las urgencias inventadas por la prisa.",
      "Entregamos la carne a la percusión del bombo legüero; dejamos que el bandoneón corte el aire como un cuchillo de agua bendita.",
      "Si el miedo asoma, míralo a los ojos y pídele que baile. Nada de lo que sangra puede quedar fuera de la consagración.",
    ],
    ritualInstruction: "Debe ser recitado al unísono por todos los asistentes sosteniendo la máscara a la altura del pecho antes del primer acorde.",
  },
  {
    id: "tratado-puertas",
    number: "II",
    title: "Tratado Psicomágico de las Cuatro Puertas",
    subtitle: "Las fases de la transmutación teatral en el Galpón",
    author: "Colectivo Escénico Fiesta Pagana",
    excerpt: "La primera puerta despoja; la segunda convoca; la tercera confronta; la cuarta libera en la comunión del baile.",
    sacredPassage: [
      "Puerta del Silencio: Se ingresa en penumbra. El espectador intercambia una mirada sin palabras con un clown de rostro pálido.",
      "Puerta del Fuelle: Olmo Masini despierta los fantasmas del Río de la Plata a través de un lamento disonante de bandoneón procesado.",
      "Puerta del Foro: El conflicto escénico se detiene. Se invita al iniciado a irrumpir en escena y torcer el destino de los personajes trágicos.",
      "Puerta del Festejo: Se desmorona el decorado. Comienza la fiesta donde el sudor común purifica cualquier herida previa.",
    ],
    ritualInstruction: "Cada puerta requiere una ofrenda simbólica: una verdad no dicha, un paso de danza o una carcajada colectiva.",
  },
  {
    id: "juramento-sin-rostro",
    number: "III",
    title: "El Juramento de los Sin Rostro",
    subtitle: "Pacto de fraternidad e inmunidad teatral",
    author: "La Guardiana del Fuego",
    excerpt: "Bajo la máscara todos somos reyes y mendigos; nadie juzgará el llanto ni censurará la risa.",
    sacredPassage: [
      "Juro por la noche porteña no revelar la identidad de quien lloró a mi lado en la oscuridad del galpón.",
      "Juro no mirar con ojos de juez a quien dejó caer sus defensas para cantar con voz desgarrada.",
      "Lo que ocurre en la Fiesta Pagana pertenece al fuego y a la ceniza; vuelve al mundo profano únicamente transmutado en coraje.",
    ],
    ritualInstruction: "Se sella pasando la mano por el humo del sahumerio de quebracho y romero bendito.",
  },
  {
    id: "canto-duende",
    number: "IV",
    title: "Canto de Invocación al Duende Porteño",
    subtitle: "Coplas para despertar la raíz telúrica y pagana",
    author: "Ninio Ancestral & La Cantora del Trance",
    excerpt: "Bajo el asfalto de Corrientes late una quebrada milenaria; bajo el tango brilla un aquelarre que no ha muerto.",
    sacredPassage: [
      "Vidalita de la sombra, llévate mi desazón; que en el medio de la pista va a nacer un nuevo sol.",
      "No hay demonio que resista cuando canta la hermandad; que revienten los cerrojos de la vieja soledad.",
      "Venga el vino, venga el bombo, venga el santo pecador; que esta noche en Chacarita somos todos un clamor.",
    ],
    ritualInstruction: "Entonar con percusión en el pecho a compás de chacarera trunca acelerada.",
  },
];

export default function SacredTextsSection() {
  const [isVeilUnlocked, setIsVeilUnlocked] = useState(false);
  const [activeTextId, setActiveTextId] = useState("liturgia-noche");
  const [copied, setCopied] = useState(false);

  const activeManuscript = SACRED_TEXTS.find((t) => t.id === activeTextId) || SACRED_TEXTS[0];

  const handleCopy = () => {
    const fullText = `${activeManuscript.title}\n${activeManuscript.subtitle}\n\n${activeManuscript.sacredPassage.join("\n\n")}\n\nInstrucción: ${activeManuscript.ritualInstruction}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="textos-sagrados" className="w-full bg-[#131316] py-20 lg:py-32 relative overflow-hidden bg-noise">
      {/* Background glowing altars */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[50rem] h-[25rem] bg-[#9e2a2b]/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#fabc4d]/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fabc4d]/10 border border-[#fabc4d]/30 text-[#fabc4d] text-xs uppercase tracking-[0.2em] font-bold mb-4">
            <Scroll className="w-3.5 h-3.5" />
            <span>Manuscritos & Liturgia Secreta</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#f7f4eb] uppercase font-bold tracking-tight">
            Textos Sagrados del Ritual
          </h2>
          <p className="font-jakarta text-sm sm:text-base text-[#dfbfbc] mt-3 leading-relaxed">
            Las escrituras y tratados psicomágicos que rigen cada acto escénico. El conocimiento iniciático permanece bajo el Velo del Silencio hasta que el visitante consagre su pacto.
          </p>

          {/* Interactive Veil Toggle Button */}
          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={() => setIsVeilUnlocked(!isVeilUnlocked)}
              className={`inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-jakarta text-xs uppercase tracking-[0.16em] font-bold transition-all duration-500 ${
                isVeilUnlocked
                  ? "bg-[#fabc4d] text-[#281900] shadow-[0_0_25px_rgba(250,188,77,0.6)] hover:brightness-110"
                  : "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_30px_rgba(158,42,43,0.7)] hover:bg-[#c1383a] border border-white/20"
              }`}
            >
              {isVeilUnlocked ? (
                <>
                  <Eye className="w-4 h-4 text-[#281900]" />
                  <span>Velo Quebrantado • Ocultar de Nuevo</span>
                  <Unlock className="w-4 h-4 text-[#281900]" />
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 text-[#fabc4d] animate-pulse" />
                  <span>Quebrantar el Velo del Silencio</span>
                  <Lock className="w-4 h-4 text-[#ffdad7]" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sacred Texts Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Manuscript Index */}
          <div className="lg:col-span-4 space-y-3">
            <span className="font-jakarta text-xs uppercase tracking-widest text-[#efbf67] font-bold block px-2">
              Índice Litúrgico
            </span>
            {SACRED_TEXTS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTextId(item.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 relative overflow-hidden ${
                  activeTextId === item.id
                    ? "bg-[#1f1f22] border-[#fabc4d] shadow-[0_0_20px_rgba(250,188,77,0.2)]"
                    : "bg-[#141419] border-[#58413f]/40 hover:border-[#58413f] hover:bg-[#1b1b1e]"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-cinzel text-sm font-bold shrink-0 ${
                    activeTextId === item.id
                      ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_10px_rgba(158,42,43,0.5)]"
                      : "bg-[#0b0b0e] text-[#efbf67]"
                  }`}
                >
                  {item.number}
                </span>
                <div className="space-y-1">
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#f7f4eb] leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#dfbfbc] line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Parchment / Altar Display */}
          <div className="lg:col-span-8 relative">
            <div className="relative rounded-2xl bg-[#0e0e11] border border-[#fabc4d]/30 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-noise overflow-hidden">
              {/* Top Parchment Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#58413f]/40">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs text-[#fabc4d] font-bold uppercase tracking-wider">
                    <Feather className="w-3.5 h-3.5" />
                    <span>Tratado {activeManuscript.number} • {activeManuscript.author}</span>
                  </div>
                  <h3 className="font-cinzel text-xl sm:text-3xl font-bold uppercase text-[#f7f4eb]">
                    {activeManuscript.title}
                  </h3>
                </div>

                {isVeilUnlocked && (
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f1f22] hover:bg-[#2a2a2d] border border-[#58413f] text-xs text-[#dfbfbc] hover:text-[#f7f4eb] transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#fabc4d]" />
                        <span>Copiar Pasaje</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Manuscript Text Container with Veil State */}
              <div className="py-8 relative min-h-[300px] flex flex-col justify-center">
                {/* When VEIL is ACTIVE (Locked) */}
                {!isVeilUnlocked && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-[#0e0e11]/80 backdrop-blur-md rounded-xl border border-[#9e2a2b]/40">
                    <div className="w-14 h-14 rounded-full bg-[#9e2a2b]/30 border border-[#fabc4d] text-[#fabc4d] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(158,42,43,0.6)] animate-pulse">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="font-cinzel text-lg sm:text-xl font-bold uppercase tracking-wide text-[#f7f4eb] mb-2">
                      Velo de Secreto Iniciático
                    </h4>
                    <p className="text-xs sm:text-sm text-[#dfbfbc] max-w-md mb-6 leading-relaxed">
                      Este manuscrito contiene los pasajes y cánticos exactos que se consagran durante la función. Haz clic abajo para romper el velo y acceder al texto completo.
                    </p>
                    <button
                      onClick={() => setIsVeilUnlocked(true)}
                      className="px-6 py-3 rounded-xl bg-[#fabc4d] text-[#281900] font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(250,188,77,0.5)] hover:brightness-110 transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Quebrantar Velo y Revelar
                    </button>
                  </div>
                )}

                {/* The Manuscript Content (Blurred or Crisp) */}
                <div
                  className={`space-y-6 transition-all duration-700 ${
                    isVeilUnlocked ? "veil-unlocked opacity-100" : "veil-blur opacity-30 select-none"
                  }`}
                >
                  <blockquote className="italic text-base sm:text-lg text-[#efbf67] font-light border-l-2 border-[#fabc4d] pl-4 py-1 leading-relaxed">
                    "{activeManuscript.excerpt}"
                  </blockquote>

                  <div className="space-y-4 text-sm sm:text-base text-[#f7f4eb] leading-relaxed font-jakarta">
                    {activeManuscript.sacredPassage.map((paragraph, idx) => (
                      <p key={idx} className="tracking-wide">
                        <span className="text-[#fabc4d] font-cinzel font-bold mr-2">§{idx + 1}</span>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Liturgical instruction box */}
                  <div className="p-4 rounded-xl bg-[#141419] border border-[#58413f]/40 flex items-start gap-3 mt-6">
                    <Flame className="w-5 h-5 text-[#fabc4d] shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs">
                      <span className="font-bold uppercase tracking-wider text-[#fabc4d] block">
                        Instrucción Psicomágica
                      </span>
                      <p className="text-[#dfbfbc] leading-relaxed">
                        {activeManuscript.ritualInstruction}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
