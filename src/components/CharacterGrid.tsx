"use client";

import React, { useState } from "react";
import { Sparkles, Eye, Flame, Music, Feather, Shield, ChevronRight } from "lucide-react";
import CharacterModal, { CharacterData } from "./CharacterModal";

const RITUAL_CHARACTERS: CharacterData[] = [
  {
    id: "guia-psicomagico",
    name: "El Guía Psicomágico",
    archetype: "Chamán Urbano • Iniciador",
    element: "Fuego & Alquimia",
    performer: "Facundo Luna",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1X4p4gVHON_LlbC1QFQ3d27pnxEJbs7tF2KGI4VV-SBUn47FzGOCqtomDy-SGgOx8Dmd7j8TBGIuV4tnL6n7MDZiikPPFGzh466Tg8k4ki8ykpr3bfpa-Ru-02u9FD82pyUAsUx7lGim7ILc1evat2c_quVrS-rasO3HKlbuZTe342O3ZDp9c97yobHEvvEpoXvdwM21Qqh5XFOahiKhz_0ZT3KD4qqsimBEsVkJQ0e9TbZZWpTjEOiySeG",
    quote: "Quien entra a este círculo debe dejar el nombre civil en la puerta. Aquí somos lo que arde.",
    description: "El maestro de ceremonias que orquesta el despojo de los roles cotidianos. Mediante actos psicomágicos basados en el espejo y el fuego, conduce a la platea a través de los cuatro umbrales del rito.",
    psychomagicFunction: "Disolución del ego espectador e iniciación en el coro sagrado.",
    ritualMask: "Máscara de cuero curtido con aplicaciones de obsidiana y cenizas de quebracho.",
    frequency: "528 Hz • Frecuencia de transmutación y apertura del trance.",
  },
  {
    id: "cantora-trance",
    name: "La Cantora del Trance",
    archetype: "Sirena de la Pampa • Sanadora",
    element: "Voz & Aire Sagrado",
    performer: "Lucía Villafañe",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPStdwIZHlBiVIZjUR8gBS3kWa5k-4kQ1DSd-A53kwvwW76um7wYebIszzWgq_8Q1lB2eVnaAQddSqLEqD1fKBnw6LSuy-3MLZxgzy2hX1y5VANK6AxZeO4o8jctgBaJjoeSJx1pj-KNCnzC4bkzItMXfzB7pd_93bvLRhfK75jcTBQNr1fnP6GHTY_90dtVcZTenrkMJKi1VnMxwVk3-mt3gl61nqMmn6psjernnBSbgLMO-guFEyQg",
    quote: "La copla no se canta con la garganta, sino con los huesos de los que ya no están.",
    description: "Portadora del canto ancestral de caja y grito vidalero. Su voz atraviesa el silencio para despertar las memorias reprimidas del público y tender el puente lírico hacia la fiesta.",
    psychomagicFunction: "Catarsis emocional polifónica y sanación de duelos heredados.",
    ritualMask: "Velo de seda teñida en carmesí con bordados en hilo de oro.",
    frequency: "432 Hz • Afinación natural de armónicos telúricos.",
  },
  {
    id: "fuelle-umbral",
    name: "El Fuelle del Umbral",
    archetype: "Olmo Masini • Espectro Tanguero",
    element: "Fuelle & Drones",
    performer: "Olmo Masini",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_qI7wedtuzwUDFiPl0orwr1kuI7zetAzNC4vUNZlGkt9Tub8--Vn4OWLXFAQc7he0atj5wnrWbBo2AjV4tB5lt0FWv4Ey_r_NXlnRBpYjjajSp2V00is96CEUHbaF1U4LHtqVk-hacpWkUuZAF2yn3UzPnSDOgzrmSacnxK5m-j6rwE0aPpkjnQijhyoq4xd1aMJR47dnzQLn7_FRBysFR4_No0owzJicgrxgZ7uqt_kt7u-t9eLOIA",
    quote: "El bandoneón es una bestia que respira dolor antiguo para transformarlo en baile.",
    description: "Compositor y ejecutante del bandoneón procesado. Genera capas de reverberación cavernosa que sumergen el galpón en una atmósfera entre el arrabal espectral y la liturgia cósmica.",
    psychomagicFunction: "Apertura de portales acústicos y modulación del tiempo escénico.",
    ritualMask: "Antifaz de bronce envejecido con pátina verde y relieves barrocos.",
    frequency: "110 Hz / 220 Hz • Resonancia cavernosa y pulso bajo.",
  },
  {
    id: "enmascarado-salamanca",
    name: "El Trickster de la Salamanca",
    archetype: "Dionisio Criollo • Desestabilizador",
    element: "Sombra & Pulso Tribal",
    performer: "Matías Gorosito",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4AxDnqmXvbMLeNcWb4KsMTGKpwwJfWzqcK39TJfLpkd9jPgElmdZOsH8KAUIyVUiPwl3SvwrL20QMmNZwpxGuXvm5JG45VJb75VRinFbHGzwjsOcnhQUpTBINvysbCEfien4VKhYAcAWuKt6sK3GSa28UpB3FSBhxEsHcv5AWjMQF-hhjvqKhxTFPVIGk-AdUBRRTvGSJ0loFb--BrrOIsZX5LqfJeReIvu2risbDyKwQKTWozzy__w",
    quote: "Toda ley que no pueda bailar en el fuego merece ser quebrantada esta misma noche.",
    description: "El personaje clownesco y trágico que irrumpe en las butacas para quebrar la solemnidad. Incita al espectador a intervenir en el teatro foro y comanda la transición a la danza desenfrenada.",
    psychomagicFunction: "Liberación de represiones morales y detonación del éxtasis colectivo.",
    ritualMask: "Máscara de diablo norteño con cuernos de madera y espejos incrustados.",
    frequency: "639 Hz • Frecuencia de conexión comunitaria y desinhibición.",
  },
  {
    id: "guardiana-fuego",
    name: "La Guardiana del Fuego",
    archetype: "Custodia de los Textos Sagrados",
    element: "Llama Sagrada & Tierra",
    performer: "Mariángeles Solís",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkj_mnBEhgY8r6ZIiSZ4SBc491464gDVPGv0QiuYlUGkq5cEIy_cdiFV5JEni2LTp04WEMnc9nHcSdzlF8SbjiF_pKwvLotKuzwRwRSzXb9egonyMFCV8HKtF3qoh9ETdAiUvhM_ii-IofswPq5FjpYDfKi-kMwKaTbnLam5KH0fDuRzQPSeeeWlemTSeY0wqSywbobnnOw9kvun63B1LeZixjNfmaAhVS4Spvo85T0fflWY28aq3rhm4fYxFIqcmjLt4",
    quote: "Quien custodia la brasa nunca teme a la noche más larga del año.",
    description: "Encargada de velar y desvelar los textos sagrados durante el rito. Administra los sahumerios, las hierbas aromáticas de la sierra y los manuscritos que sellan el pacto con el público.",
    psychomagicFunction: "Preservación del espacio sagrado y consagración de los votos del público.",
    ritualMask: "Tocado de plumas oscuras y corona de espinas de calafate.",
    frequency: "741 Hz • Despertar de la intuición y purificación del recinto.",
  },
  {
    id: "payador-tragico",
    name: "El Payador del Olvido",
    archetype: "Poeta Espectral • La Memoria",
    element: "Palabra & Cuerda",
    performer: "Esteban Carballo",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4AxDnqmXvbMLeNcWb4KsMTGKpwwJfWzqcK39TJfLpkd9jPgElmdZOsH8KAUIyVUiPwl3SvwrL20QMmNZwpxGuXvm5JG45VJb75VRinFbHGzwjsOcnhQUpTBINvysbCEfien4VKhYAcAWuKt6sK3GSa28UpB3FSBhxEsHcv5AWjMQF-hhjvqKhxTFPVIGk-AdUBRRTvGSJ0loFb--BrrOIsZX5LqfJeReIvu2risbDyKwQKTWozzy__w",
    quote: "En la noche pampeana, quien no canta su pena se vuelve sombra entre las sombras.",
    description: "Un payador errante condenado a desafiar a la Muerte en un contrapunto interminable de décimas improvisadas sobre guitarra con cuerdas de tripa afinadas en re menor.",
    psychomagicFunction: "Exhumación de testimonios olvidados y duelo colectivo con los ancestros.",
    ritualMask: "Velo negro de encaje antiguo que oculta su rostro de payador espectral.",
    frequency: "396 Hz • Liberación de culpas y ataduras kármicas.",
  },
];

export default function CharacterGrid() {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterData | null>(null);
  const [filter, setFilter] = useState<string>("todos");

  const filteredCharacters =
    filter === "todos"
      ? RITUAL_CHARACTERS
      : RITUAL_CHARACTERS.filter((c) =>
          c.element.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <section id="personajes-ritual" className="w-full bg-[#0e0e11] py-20 lg:py-32 relative overflow-hidden bg-noise">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#9e2a2b]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#fabc4d]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9e2a2b]/20 border border-[#9e2a2b]/60 text-[#ffb3ae] text-xs uppercase tracking-[0.2em] font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#fabc4d]" />
              <span>Dramatis Personae</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#f7f4eb] uppercase font-bold tracking-tight">
              Personajes del Ritual
            </h2>
            <p className="font-jakarta text-sm sm:text-base text-[#dfbfbc] mt-2 max-w-2xl leading-relaxed">
              Arquetipos psicomágicos encarnados que guían la ceremonia. Cada figura custodia una frecuencia, una máscara litúrgica y un umbral de transformación.
            </p>
          </div>

          {/* Filter badges */}
          <div className="flex flex-wrap gap-2 self-start md:self-auto">
            {["todos", "fuego", "fuelle", "canto", "sombra"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs uppercase font-semibold tracking-wider transition-all ${
                  filter === cat
                    ? "bg-[#fabc4d] text-[#281900] shadow-[0_0_12px_rgba(250,188,77,0.4)]"
                    : "bg-[#1f1f22] text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#2a2a2d]"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCharacters.map((char) => (
            <div
              key={char.id}
              onClick={() => setSelectedCharacter(char)}
              className="group relative rounded-2xl overflow-hidden bg-[#141419] border border-[#58413f]/40 hover:border-[#fabc4d]/50 transition-all duration-500 hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.8),0_0_24px_rgba(158,42,43,0.3)] cursor-pointer flex flex-col justify-between"
            >
              {/* Image with top rim highlight */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#0b0b0e]">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter saturate-90 group-hover:saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-[#141419]/40 to-transparent"></div>

                {/* Archetype badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#0b0b0e]/85 backdrop-blur-md text-[#fabc4d] text-[11px] uppercase tracking-wider font-bold border border-[#fabc4d]/30">
                  {char.archetype.split("•")[0]}
                </div>

                {/* Element pill */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#9e2a2b]/80 backdrop-blur-md text-[#ffdad7] text-[10px] uppercase tracking-wider font-semibold border border-[#ffb3ae]/30">
                  {char.element}
                </div>
              </div>

              {/* Card info */}
              <div className="p-6 space-y-3 relative -mt-6 bg-[#141419] flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#f7f4eb] group-hover:text-[#fabc4d] transition-colors">
                    {char.name}
                  </h3>
                  <blockquote className="mt-2 text-xs italic text-[#efbf67] line-clamp-2 leading-relaxed">
                    "{char.quote}"
                  </blockquote>
                  <p className="mt-3 text-xs text-[#dfbfbc] line-clamp-2 leading-relaxed">
                    {char.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#58413f]/30 flex items-center justify-between text-xs">
                  <span className="text-[#8a877e] font-jakarta">
                    Intérprete: <strong className="text-[#f7f4eb]">{char.performer}</strong>
                  </span>
                  <span className="text-[#fabc4d] font-semibold uppercase tracking-wider inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explorar <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Character Dossier Modal */}
      <CharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </section>
  );
}
