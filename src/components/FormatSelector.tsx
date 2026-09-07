"use client";

import React, { useState } from "react";
import { Sparkles, Flame, BookOpen, Clock, Music, Users, Ticket, ArrowRight, Shield } from "lucide-react";
import RitualModal from "./RitualModal";

export default function FormatSelector() {
  const [activeFormat, setActiveFormat] = useState<"completo" | "reducido">("completo");
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);

  return (
    <section id="formatos-escenicos" className="w-full bg-[#0b0b0e] py-20 lg:py-32 relative overflow-hidden bg-noise">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & Toggle Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-jakarta text-xs uppercase tracking-[0.2em] text-[#ffb3ae] font-bold block mb-2">
              Dispositivos Escénicos
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#f7f4eb] uppercase font-bold tracking-tight">
              Elige el Calibre de Tu Experiencia
            </h2>
          </div>

          {/* Format Switcher Buttons */}
          <div className="inline-flex p-1 bg-[#141419] rounded-xl self-start md:self-auto border border-[#58413f]/40">
            <button
              onClick={() => setActiveFormat("completo")}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeFormat === "completo"
                  ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_20px_rgba(158,42,43,0.6)]"
                  : "text-[#dfbfbc] hover:text-[#f7f4eb]"
              }`}
            >
              Formato Completo (Ritual)
            </button>
            <button
              onClick={() => setActiveFormat("reducido")}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeFormat === "reducido"
                  ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_20px_rgba(158,42,43,0.6)]"
                  : "text-[#dfbfbc] hover:text-[#f7f4eb]"
              }`}
            >
              Versión Reducida (Teatro)
            </button>
          </div>
        </div>

        {/* VIEW 1: Formato Completo (Ritual Integral) */}
        {activeFormat === "completo" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-fadeIn">
            {/* Ceremonial Flyer Display */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm p-3 rounded-2xl bg-[#141419] border border-[#fabc4d]/40 shadow-[0_0_40px_rgba(250,188,77,0.15)] bg-noise group">
                <div className="absolute -top-3 -left-3 px-3 py-1 rounded bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase tracking-widest font-bold z-20 shadow-lg">
                  Oficial MMXXV
                </div>
                <div className="overflow-hidden rounded-xl">
                  <img
                    alt="Flyer Fiesta Pagana Ritual Integral"
                    className="w-full h-auto rounded-xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkj_mnBEhgY8r6ZIiSZ4SBc491464gDVPGv0QiuYlUGkq5cEIy_cdiFV5JEni2LTp04WEMnc9nHcSdzlF8SbjiF_pKwvLotKuzwRwRSzXb9egonyMFCV8HKtF3qoh9ETdAiUvhM_ii-IofswPq5FjpYDfKi-kMwKaTbnLam5KH0fDuRzQPSeeeWlemTSeY0wqSywbobnnOw9kvun63B1LeZixjNfmaAhVS4Spvo85T0fflWY28aq3rhm4fYxFIqcmjLt4"
                  />
                </div>
                <div className="p-3 text-center">
                  <span className="font-jakarta text-xs uppercase tracking-widest text-[#efbf67] font-semibold block">
                    Liturgia Completa • 4 Fases • 5 Horas
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
                    Ritual Nocturno Integral
                  </span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl text-[#f7f4eb] font-bold uppercase tracking-tight">
                  Invocación, Concierto & Celebración Colectiva
                </h3>
                <p className="font-jakarta text-sm text-[#dfbfbc] mt-2 leading-relaxed">
                  El despliegue absoluto de Fiesta Pagana. Una velada transgresora diseñada en cuatro momentos correlativos donde el espectador es iniciado, desafiado, conmovido y liberado en la danza.
                </p>
              </div>

              {/* Step Progression / Itinerary */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#141419] border border-[#58413f]/40 hover:border-[#fabc4d]/30 transition-colors flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#9e2a2b] text-[#f7f4eb] font-bold flex items-center justify-center font-cinzel text-sm">
                    I
                  </span>
                  <div>
                    <h4 className="font-epilogue text-sm sm:text-base text-[#f7f4eb] font-semibold">
                      Rito Inicial: Máscaras & Clowns Trágicos
                    </h4>
                    <p className="font-jakarta text-xs text-[#dfbfbc] mt-1 leading-relaxed">
                      Recepción ceremonial inmersiva. Seres enmascarados despojan a los asistentes de sus roles cotidianos a través de juegos psicomágicos de silencio y mirada directa.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#141419] border border-[#58413f]/40 hover:border-[#fabc4d]/30 transition-colors flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#bd8718] text-[#281900] font-bold flex items-center justify-center font-cinzel text-sm">
                    II
                  </span>
                  <div>
                    <h4 className="font-epilogue text-sm sm:text-base text-[#f7f4eb] font-semibold">
                      Doble Ensamble Musical en Vivo
                    </h4>
                    <p className="font-jakarta text-xs text-[#dfbfbc] mt-1 leading-relaxed">
                      Actuaciones estelares de Olmo Masini con su bandoneón procesado y Ninio Ancestral fusionando coplas del norte con pulsos electrónicos contemporáneos.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#141419] border border-[#58413f]/40 hover:border-[#fabc4d]/30 transition-colors flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#9e2a2b] text-[#f7f4eb] font-bold flex items-center justify-center font-cinzel text-sm">
                    III
                  </span>
                  <div>
                    <h4 className="font-epilogue text-sm sm:text-base text-[#f7f4eb] font-semibold">
                      Teatro Foro: Intervención Activa
                    </h4>
                    <p className="font-jakarta text-xs text-[#dfbfbc] mt-1 leading-relaxed">
                      La escena se detiene ante el conflicto. El público ingresa al espacio actoral para transformar el destino de los personajes y confrontar los mandatos del olvido.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#141419] border border-[#58413f]/40 hover:border-[#fabc4d]/30 transition-colors flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#bd8718] text-[#281900] font-bold flex items-center justify-center font-cinzel text-sm">
                    IV
                  </span>
                  <div>
                    <h4 className="font-epilogue text-sm sm:text-base text-[#f7f4eb] font-semibold">
                      Fiesta Final con DJ Set
                    </h4>
                    <p className="font-jakarta text-xs text-[#dfbfbc] mt-1 leading-relaxed">
                      Desintegración de la solemnidad. Pistas tribales, cumbia psicodélica, sintetizadores oscuros y baile desatado en comunión con el elenco hasta entrada la madrugada.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsRitualModalOpen(true)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(250,188,77,0.4)] hover:brightness-110 transition-all"
                >
                  <Ticket className="w-4 h-4" />
                  Asegurar Experiencia Integral en Galpón de Guevara
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Versión Reducida (Obra de Teatro de Cámara) */}
        {activeFormat === "reducido" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-fadeIn">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#efbf67]">
                <BookOpen className="w-4 h-4" />
                <span className="font-jakarta text-xs uppercase tracking-widest font-bold">
                  Temporada de Cámara • Espacio Callejón
                </span>
              </div>
              <h3 className="font-cinzel text-3xl sm:text-4xl text-[#f7f4eb] font-bold uppercase tracking-tight">
                Para Rescatarnos del Olvido
              </h3>
              <p className="font-epilogue text-base sm:text-lg text-[#efbf67] font-light">
                Dramaturgia de cámara sobre el duelo, la memoria y la mitología criolla
              </p>
              <p className="font-jakarta text-sm text-[#dfbfbc] leading-relaxed">
                Una versión depurada y concentrada para salas teatrales tradicionales. La dramaturgia profundiza en la cosmogonía argentina y la técnica psicomágica sin el componente festivo bailable posterior. Un viaje lírico de 75 minutos a oscuras, atravesado por arquetipos del campo, espectros familiares y cánticos chamánicos.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#141419] border border-[#58413f]/40 space-y-1">
                  <Sparkles className="w-5 h-5 text-[#ffb3ae] mb-1" />
                  <h5 className="font-jakarta text-xs font-bold text-[#f7f4eb] uppercase">
                    Psicomagia Activa
                  </h5>
                  <p className="text-xs text-[#dfbfbc]">
                    Acciones físicas que disuelven nudos ancestrales y memorias heredadas.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#141419] border border-[#58413f]/40 space-y-1">
                  <Shield className="w-5 h-5 text-[#fabc4d] mb-1" />
                  <h5 className="font-jakarta text-xs font-bold text-[#f7f4eb] uppercase">
                    Mitología Criolla
                  </h5>
                  <p className="text-xs text-[#dfbfbc]">
                    Arquetipos del payador espectral, el lobisón y la Salamanca nocturna.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center">
                <button
                  onClick={() => setIsRitualModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#9e2a2b] text-[#f7f4eb] font-jakarta text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(158,42,43,0.5)] hover:bg-[#c1383a] transition-all"
                >
                  <Ticket className="w-4 h-4 text-[#fabc4d]" />
                  Reservar en Espacio Callejón
                </button>
                <div className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#141419] border border-[#58413f]/40 text-xs text-[#dfbfbc]">
                  <span className="w-2 h-2 rounded-full bg-[#fabc4d] mr-2"></span>
                  Funciones los Jueves 20:30 hs
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl bg-[#141419] border border-[#fabc4d]/30 p-6 sm:p-8 shadow-2xl bg-noise space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#58413f]/30">
                  <span className="font-jakarta text-xs uppercase tracking-widest text-[#dfbfbc]">
                    Ficha Técnica Destacada
                  </span>
                  <span className="font-jakarta text-xs text-[#ffb3ae] uppercase font-bold bg-[#9e2a2b]/30 px-2.5 py-1 rounded border border-[#9e2a2b]">
                    75 Minutos de Cámara
                  </span>
                </div>

                <blockquote className="font-jakarta text-base italic text-[#efbf67] border-l-2 border-[#fabc4d] pl-4 py-1 leading-relaxed">
                  "No venimos a contar un cuento sobre el pasado, sino a exhumar las palabras vivas que dejamos pudrir bajo el asfalto de la ciudad."
                </blockquote>

                <div className="space-y-3 text-xs text-[#dfbfbc]">
                  <p>
                    <strong className="text-[#f7f4eb]">Dramaturgia & Puesta:</strong> Colectivo Escénico Fiesta Pagana
                  </p>
                  <p>
                    <strong className="text-[#f7f4eb]">Espacio Sonoro:</strong> Bandoneón electroacústico & caja bagualera
                  </p>
                  <p>
                    <strong className="text-[#f7f4eb]">Diseño de Iluminación:</strong> Claroscuros teatrales al sodio
                  </p>
                  <p>
                    <strong className="text-[#f7f4eb]">Disposición:</strong> Escenario circular 360° en penumbra
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <RitualModal isOpen={isRitualModalOpen} onClose={() => setIsRitualModalOpen(false)} />
    </section>
  );
}
