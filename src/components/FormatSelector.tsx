"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Flame, BookOpen, Clock, Music, Users, Ticket, ArrowRight, Shield, Theater, Lock } from "lucide-react";
import RitualModal from "./RitualModal";

export default function FormatSelector() {
  const [activeFormat, setActiveFormat] = useState<"obra-completa" | "guion-escenas">("obra-completa");
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);

  const PLAY_SCENES = [
    {
      number: "1",
      name: "El Lamento de las Cantoras & La Manzana",
      desc: "Las dos cantoras y sus largas cabelleras sostenidas por un monje y un diablo andino entonan: 'Argentina, ¿qué pasa con tu voz?'. La manzana reposa oculta en penumbras en el centro del altar.",
    },
    {
      number: "2",
      name: "La Búsqueda de la Verdad & El Espacio-Tiempo",
      desc: "Cuatro demonios avanzan en cuclillas. El Colla abre el portal de la física metafísica: E=mc², la materia no existe, y muerde la manzana de la discordia con sorna.",
    },
    {
      number: "3",
      name: "Gabriel y la Madre (El Código 616)",
      desc: "Gabriel confiesa al público cómo un error con la tarjeta de crédito y el código 616 despertó a las nueve jerarquías infernales. Su madre le exige dejar TikTok y hacer la tarea.",
    },
    {
      number: "4",
      name: "El Demonio Criollo & La Salamanca",
      desc: "El Gaucho explica por qué en nuestra tierra la Salamanca se libera en carnaval para no andar suelta el resto del año, buscando la verdadera libertad americana.",
    },
    {
      number: "5",
      name: "¡Viva la Libertad Carajo! (El Show de Televisión)",
      desc: "Farsa mediática: el Presentador reparte libertades ficticias a Daiana de La Matanza y a Edwin el Venezolano, mientras José Mercado impone el poder del dinero.",
    },
    {
      number: "6",
      name: "El Olvido de los Algoritmos & Celulares",
      desc: "'¿Alguien se acuerda del último reel que vio?'. El tiempo del teléfono es el tiempo del olvido: la dispersión de la atención y la desintegración del misterio.",
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
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeFormat === "guion-escenas"
                  ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_20px_rgba(158,42,43,0.6)]"
                  : "text-[#dfbfbc] hover:text-[#f7f4eb]"
              }`}
            >
              Las 10 Escenas del Guión
            </button>
          </div>
        </div>

        {/* VIEW 1: Obra Completa */}
        {activeFormat === "obra-completa" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-fadeIn">
            {/* Ceremonial Placard Frame */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm p-6 sm:p-8 rounded-2xl bg-[#141419] border border-[#fabc4d]/40 shadow-[0_0_40px_rgba(250,188,77,0.15)] bg-noise flex flex-col justify-between min-h-[380px]">
                <div className="flex items-center justify-between pb-4 border-b border-[#58413f]/30">
                  <span className="px-3 py-1 rounded bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase tracking-widest font-bold shadow-md">
                    Guión Oficial
                  </span>
                  <span className="font-mono text-xs text-[#ffb3ae]">10 Escenas</span>
                </div>

                <div className="py-8 text-center space-y-4 my-auto">
                  <div className="w-16 h-16 rounded-2xl bg-[#9e2a2b]/30 border border-[#fabc4d] text-[#fabc4d] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(158,42,43,0.5)]">
                    <Theater className="w-8 h-8" />
                  </div>
                  <h4 className="font-cinzel text-xl font-bold uppercase text-[#f7f4eb] tracking-wide">
                    Fiesta Pagana en Teatros
                  </h4>
                  <p className="font-jakarta text-xs text-[#dfbfbc] leading-relaxed italic">
                    "Argentina, ¿qué pasa con tu voz? Melodías que me cuentan quién sos."
                  </p>
                </div>

                <div className="pt-4 border-t border-[#58413f]/30 text-center">
                  <span className="font-jakarta text-[11px] uppercase tracking-widest text-[#efbf67] font-semibold block">
                    Grotesco, Mito, Bandoneón & Rock
                  </span>
                </div>
              </div>
            </div>

            {/* Details & Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[#fabc4d] mb-2">
                  <Flame className="w-4 h-4 text-[#fabc4d]" />
                  <span className="font-jakarta text-xs uppercase tracking-widest font-bold">
                    Experiencia Escénica Viva
                  </span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl text-[#f7f4eb] font-bold uppercase tracking-tight">
                  Argentina, ¿qué pasa con tu voz?
                </h3>
                <p className="font-jakarta text-sm sm:text-base text-[#dfbfbc] mt-2 leading-relaxed">
                  ¿Qué pasaría si se encontraran en un mismo mundo, lo grotesco de esperando la carroza, la cultura del norte argentino y los idearios de libertad anglosajones? Venite a la Fiesta Pagana, mi rey.
                </p>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#141419] border border-[#58413f]/40 space-y-1">
                  <Sparkles className="w-5 h-5 text-[#fabc4d] mb-1" />
                  <h5 className="font-jakarta text-xs font-bold text-[#f7f4eb] uppercase">
                    La Batalla Celeste & Terrestre
                  </h5>
                  <p className="text-xs text-[#dfbfbc]">
                    La lucha metafísica entre la carne, la culpa y la sabiduría del monte.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#141419] border border-[#58413f]/40 space-y-1">
                  <Theater className="w-5 h-5 text-[#ffb3ae] mb-1" />
                  <h5 className="font-jakarta text-xs font-bold text-[#f7f4eb] uppercase">
                    Farsa Televisiva & Teatro Foro
                  </h5>
                  <p className="text-xs text-[#dfbfbc]">
                    El público confronta a José Mercado y las trampas de la falsa libertad.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.alternativateatral.com/obra102861-fiesta-pagana-una-obra-para-rescatarnos-del-olvido"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(250,188,77,0.4)] hover:brightness-110 transition-all"
                >
                  <Ticket className="w-4 h-4" />
                  Conseguir Entradas en Alternativa Teatral
                </a>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Las 10 Escenas del Guión */}
        {activeFormat === "guion-escenas" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
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
                  Acceso Restringido • Área Técnica
                </span>
                <span className="px-2 py-0.5 rounded bg-[#9e2a2b] text-[#fabc4d] text-[10px] font-bold uppercase">
                  Sólo disponible para el staff
                </span>
              </div>
              <p className="text-xs text-[#dfbfbc] mt-0.5">
                Los guiones con acotaciones de dirección, diagramas lumínicos y partituras completas se gestionan en el Portal de Elenco.
              </p>
            </div>
          </div>

          <Link
            href="/portal"
            className="px-4 py-2 rounded-xl bg-[#1f1f22] hover:bg-[#28282d] border border-[#58413f] text-[#fabc4d] text-xs font-bold uppercase tracking-wider font-jakarta transition-all shrink-0 flex items-center gap-1.5"
          >
            <span>Ingresar al Portal de Staff</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <RitualModal isOpen={isRitualModalOpen} onClose={() => setIsRitualModalOpen(false)} />
    </section>
  );
}
