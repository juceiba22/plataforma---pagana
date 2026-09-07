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

const SCRIPT_SACRED_TEXTS: SacredManuscript[] = [
  {
    id: "secreto-argentum",
    number: "I",
    title: "El Secreto de Argentum: Argentina es una Civilización",
    subtitle: "El rezo primordial y el destino del nombre nacional",
    author: "El Niño Gabriel & Elenco Sagrado (Escena 9)",
    excerpt: "Hazte de plata y espeja el oro que se da en las alturas y verdaderamente serás un argentino. Al recibir un nombre se recibe un destino.",
    sacredPassage: [
      "Yo tengo el secreto. Yo sé por qué todos los argentinos están peleados y unos se cuerean con otros: pasa en toda familia. Pero no se los puedo decir porque hay ochenta micrófonos grabando.",
      "Todos estos artilugios que está haciendo el mundo moderno es para que nos olvidemos quiénes somos. Para que nos creamos reemplazables, replicables, editables, o que creamos que somos un holograma.",
      "Tenemos que recordarnos quiénes somos porque el nombre de nuestra Patria viene de Argentum: 'Hazte de plata y espeja el oro que se da en las alturas y verdaderamente serás un argentino'.",
    ],
    ritualInstruction: "Los actores reparten tarjetas al oído del público que rezan 'Argentina es una civilización' y entonan el rezo en loop circular.",
  },
  {
    id: "biblia-hombre-robot",
    number: "II",
    title: "La Falsa Biblia del Hombre Robot & El Demonio Algorítmico",
    subtitle: "La advertencia contra el vaciamiento del misterio humano",
    author: "El Niño Gabriel (Escena 9: El Secreto)",
    excerpt: "El robot es un demonio disimulado: está vacío, no tiene tiempo, ni atención, ni misterio primordial. Come nuestra vida en forma de beats y vomita respuestas huecas.",
    sacredPassage: [
      "Estamos en la empresa civilizatoria de construir al hombre robot. Estamos escribiendo una nueva biblia que dice: 'Hagamos un robot a nuestra imagen y semejanza'.",
      "Y ciñendo los laureles robados de una musa, los amamantó en sus pechos agrios de algoritmos. El hombre que construye robots necesita primero ser un robot él mismo: podarse y desvestirse de todo su misterio primordial.",
      "Nos maravillan con el aparato que come nuestra vida en forma de beats y nos vomita respuestas huecas para que olvidemos el fuego y la verdad.",
    ],
    ritualInstruction: "Pronunciar de frente a la platea bajo luz cenital cortante, exhibiendo la tarjeta de crédito y la falsa biblia digital.",
  },
  {
    id: "salamanca-criolla",
    number: "III",
    title: "Tratado de la Salamanca & La Sabiduría Criolla",
    subtitle: "Por qué desenterramos el carnaval y liberamos al demonio",
    author: "El Gaucho / Coya Leguizamón (Escena 4)",
    excerpt: "El hombre criollo hace de su casi ignorancia de las leyes del centro europeo una sabiduría única e irrepetible.",
    sacredPassage: [
      "En el norte argentino, y en todo el continente americano, tenemos una concepción diferente del demonio. La Salamanca justamente es liberada para que no ande suelta en tiempos donde no debe andar.",
      "El hombre criollo es más inocente y suelta a la Salamanca con pretensiones de divertimento. Antes de la Pascua liberamos el demonio por las dudas: desenterramos el carnaval, lo bailamos y después lo enterramos para volver a los deberes.",
      "¿Acaso el hombre criollo no se hace las mismas grandes preguntas universales de los filósofos? ¿Acaso cuando libera esa Salamanca todos los veranos no está buscando la verdadera libertad?",
    ],
    ritualInstruction: "Entonar con poncho al hombro y bombo legüero al fondo, precediendo la farsa del show televisivo.",
  },
  {
    id: "los-musicardi",
    number: "IV",
    title: "Génesis Popular & La Gran Familia Argentina",
    subtitle: "El grotesco familiar, el karma político y la terapia colectiva",
    author: "La Madre & La Comparsa del Norte (Escenas 7 y 8)",
    excerpt: "¡Somos hermanos, carajo! ¡Somos los Musicardi! ¡Una gran familia de apellido Argentina! Me parece que tenemos que ir a terapia... ¡pero todo el país!",
    sacredPassage: [
      "Somos los indios del norte, no nos vamos a olvidar: con la garganta del Inca hoy venimo' a cantar que la tierra es la mamita y arriba el Padre Sol.",
      "¡Yo hago puchero, ella hace puchero! ¡Yo hago ravioles, ella hace ravioles! Ante la desgracia, ante la muerte, la familia tiene que ser un bloque de dignidad. No importan los rencores: en este momento somos una gran familia de apellido Argentina.",
      "Hace cuánto tiempo venimos repitiendo la historia como un karma familiar: el dólar, la hiperinflación, los buitres del FMI... Los conservadores dicen que el rock ya se murió, pero está renaciendo siempre como nosotros.",
    ],
    ritualInstruction: "Coro polifónico con redoblante, bajo y bandoneón, que desemboca en falso disturbio de precios y abrazo catártico colectivo.",
  },
];

export default function SacredTextsSection() {
  const [isVeilUnlocked, setIsVeilUnlocked] = useState(false);
  const [activeTextId, setActiveTextId] = useState("secreto-argentum");
  const [copied, setCopied] = useState(false);

  const activeManuscript = SCRIPT_SACRED_TEXTS.find((t) => t.id === activeTextId) || SCRIPT_SACRED_TEXTS[0];

  const handleCopy = () => {
    const fullText = `${activeManuscript.title}\n${activeManuscript.subtitle}\n\n${activeManuscript.sacredPassage.join("\n\n")}\n\nInstrucción Escénica: ${activeManuscript.ritualInstruction}`;
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
            <span>Manuscritos & Pasajes del Guión</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#f7f4eb] uppercase font-bold tracking-tight">
            Textos Sagrados & Monólogos Clave
          </h2>
          <p className="font-jakarta text-sm sm:text-base text-[#dfbfbc] mt-3 leading-relaxed">
            Las doctrinas, monólogos y revelaciones que articulan <em>Fiesta Pagana en Teatros</em>: desde la profecía de Argentum hasta el grotesco de los Musicardi y la Salamanca criolla.
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
                  <span>Quebrantar el Velo del Silencio & Revelar Textos</span>
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
              Índice de Pasajes Dramáticos
            </span>
            {SCRIPT_SACRED_TEXTS.map((item) => (
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

          {/* Right Column: Parchment Display */}
          <div className="lg:col-span-8 relative">
            <div className="relative rounded-2xl bg-[#0e0e11] border border-[#fabc4d]/30 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-noise overflow-hidden">
              {/* Top Parchment Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#58413f]/40">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs text-[#fabc4d] font-bold uppercase tracking-wider">
                    <Feather className="w-3.5 h-3.5" />
                    <span>Pasaje {activeManuscript.number} • {activeManuscript.author}</span>
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
                      El Velo del Silencio
                    </h4>
                    <p className="text-xs sm:text-sm text-[#dfbfbc] max-w-md mb-6 leading-relaxed">
                      Este manuscrito contiene los pasajes del guión teatral original. Haz clic abajo para levantar el velo y acceder a las líneas sagradas.
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
                        Instrucción Escénica del Guión
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
