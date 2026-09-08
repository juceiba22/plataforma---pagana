"use client";

import React, { useState } from "react";
import { Sparkles, ChevronRight, Image as ImageIcon } from "lucide-react";
import CharacterModal, { CharacterData } from "./CharacterModal";

export const SCRIPT_CHARACTERS: CharacterData[] = [
  {
    id: "nino-gabriel",
    name: "El Niño Gabriel",
    archetype: "Oráculo Digital • El Vidente",
    element: "Código 616 & El Secreto",
    performer: "Gabriel (Elenco Infantil / Central)",
    image: "",
    quote: "Yo soy el niño que despertó al demonio. No quise hacerlo. Fue un accidente con la tarjeta de crédito y el 616... Ahora el demonio juega con nosotros.",
    description: "El niño que conecta el mundo celeste con el averno digital de los videojuegos y los algoritmos. Custodia el secreto civilizatorio: 'Argentina es una civilización'.",
    psychomagicFunction: "Revelación del engaño del hombre-robot y consagración del destino de Argentum.",
    ritualMask: "Gafas de realidad y tarjeta de crédito en mano, túnica infantil en penumbra.",
    frequency: "616 Hz • Umbral de invocación de las nueve jerarquías infernales y celestes.",
  },
  {
    id: "la-madre",
    name: "La Madre (Doña Argentina)",
    archetype: "Matriarca Criolla • La Realidad",
    element: "Tierra & Fuego Doméstico",
    performer: "Flor Darío / Luciana",
    image: "",
    quote: "¡Gabriel, dejá de ver TikTok y ponete a estudiar! ¡Yo hago ravioles, ella hace ravioles! ¡Somos los Musicardi, una gran familia!",
    description: "Encarna la furia, el amor desbordado y la histeria cotidiana del hogar argentino. Arquetipo de la familia Musicardi: el puchero, la inflación y los chancletazos.",
    psychomagicFunction: "Catarsis del grotesco criollo y disolución de los rencores familiares.",
    ritualMask: "Delantal floreado, ruleros de alambre y chancleta sagrada.",
    frequency: "432 Hz • Pulso terrenal y corazón del hogar popular.",
  },
  {
    id: "el-colla",
    name: "El Colla / Sabio Andino",
    archetype: "Filósofo de la Puna • Espacio-Tiempo",
    element: "Masa, Energía & La Manzana",
    performer: "Darío / Tomi Mendieta",
    image: "",
    quote: "En el siglo XXI pasamos de la era del tiempo a la era del espacio-tiempo. La materia no existe: los átomos se mueven al mismo ritmo que el universo.",
    description: "El pensador del altiplano que abre el misterio del universo tras las cantoras. Muerde la manzana en el centro de la escena con serena sorna filosófica.",
    psychomagicFunction: "Apertura del portal metafísico y ruptura de la ilusión materialista.",
    ritualMask: "Gorro chullo andino, poncho de vicuña y mordisco de manzana ritual.",
    frequency: "528 Hz • Frecuencia de transmutación y resonancia cósmica.",
  },
  {
    id: "jose-mercado",
    name: "José Mercado",
    archetype: "El Titiritero Financiero • El Mercado",
    element: "Biyuya, Billetín & Morlacos",
    performer: "Tomás (Mendieta)",
    image: "",
    quote: "Yo soy José Mercado, el que decide a quién le llega la biyuya, la plata, la guita, la taka taka... Primo de Raúl Estado y socio de Javier Petróleo.",
    description: "La encarnación del capital financiero despiadado. Calcula todo en millones de euros y enfurece cuando se trata de pagar en pesos a los trabajadores populares.",
    psychomagicFunction: "Confrontación del poder económico y choque con la dignidad popular.",
    ritualMask: "Fajos de billetes falsos, reloj dorado gigante y sonrisa de tiburón.",
    frequency: "110 Hz • El pulso denso de la transacción y el morlaco.",
  },
  {
    id: "la-chola",
    name: "La Chola",
    archetype: "Danza Telúrica • Baila Zamba",
    element: "Zamba, Pañuelo & Tierra",
    performer: "Elenco Danza / Actriz",
    image: "",
    quote: "Con el pañuelo en el aire y la cadencia de la zamba, la tierra despierta el amor y la memoria viva que ningún algoritmo puede apagar.",
    description: "Baila zamba encarnando el latido del norte y la resistencia de la tierra. Con su danza sagrada y su pañuelo en vuelo, desafía el olvido y convoca el fuego del carnaval.",
    psychomagicFunction: "Sanación y elevación a través de la danza ritual y el compás de la zamba criolla.",
    ritualMask: "Pollera norteña tradicional, pañuelo de seda y flores en el cabello.",
    frequency: "432 Hz • Frecuencia telúrica de la zamba y el movimiento sagrado.",
  },
  {
    id: "la-tanguera",
    name: "La Tanguera",
    archetype: "Nostalgia Urbana • Compás Porteño",
    element: "Bandoneón, Asfalto & Corte",
    performer: "Actriz / Bailarina",
    image: "",
    quote: "El tango no es un lamento del pasado, es el abrazo urgente en medio de la tormenta porteña.",
    description: "La fuerza poética y nocturna de las calles de Buenos Aires. En su abrazo y en su taco sobre el escenario, dialoga con el bandoneón para desarmar la farsa y rescatar la voz de la ciudad.",
    psychomagicFunction: "Alquimia del desgarro urbano en belleza y dignidad escénica.",
    ritualMask: "Vestido de milonga con bordados carmesí, zapatos de tango y mirada penetrante.",
    frequency: "528 Hz • Resonancia del bandoneón y pasión del arrabal.",
  },
  {
    id: "la-sahumadora",
    name: "La Sahumadora",
    archetype: "Guardián del Humo Sagrado • Purificación",
    element: "Copla, Humo Sagrado & Resinas",
    performer: "Actriz / Sahumadora Ceremonial",
    image: "",
    quote: "Que el humo del copal y las hierbas serranas limpie el aire y abra el camino para que la verdad sea dicha en el altar.",
    description: "Portadora de la brasa y las hierbas sagradas que purifican el espacio escénico. Su presencia disipa las sombras y prepara el altar para la revelación primordial de Argentum.",
    psychomagicFunction: "Purificación energética del espacio escénico y consagración del rito.",
    ritualMask: "Sahumador de barro cocido con humo de copal y hierbas autóctonas, manto ceremonial.",
    frequency: "639 Hz • Armonización, limpieza sutil y apertura de portales.",
  },
  {
    id: "edwin-el-venezolano",
    name: "Edwin el Venezolano",
    archetype: "El Repartidor & Hermandad Latinoamericana",
    element: "La Moto, La Calle & El Trance",
    performer: "Edwin / Actor",
    image: "",
    quote: "Llegué en moto cruzando toda América para repartir en las noches de Buenos Aires. Entre el asfalto y las luces, encontré en la Fiesta Pagana una hermandad que no tiene fronteras.",
    description: "Representa al trabajador migrante y la fuerza viva que une a los pueblos de América Latina. Su presencia en la farsa mediática y en el ritual rompe la soledad del delivery urbano.",
    psychomagicFunction: "Integración de la hermandad latinoamericana y dignificación del trabajo popular.",
    ritualMask: "Casco de delivery con símbolos ancestrales y caja térmica iluminada.",
    frequency: "528 Hz • Frecuencia de unión, hermandad y pulso urbano.",
  },
  {
    id: "las-cantoras",
    name: "Las Cantoras del Origen",
    archetype: "Sirenas de la Patria • La Memoria Ancestral",
    element: "Voces en Penumbra & Cabello Largo",
    performer: "Cantora 1 & Cantora 2",
    image: "",
    quote: "Argentina, ¿qué pasa con tu voz? Argentina, ¿por qué tanto dolor? El tiempo pasa... el tiempo llega...",
    description: "Abren y cierran el ritual. Sus cabelleras eternas son sostenidas por un monje y un diablo andino en los extremos del escenario mientras la manzana reluce en el centro.",
    psychomagicFunction: "Apertura del dolor histórico y bendición lírica de la nación.",
    ritualMask: "Túnicas solemnes oscuras y cabellera que recorre el suelo escénico.",
    frequency: "852 Hz • Despertar espiritual y elevación de la voz colectiva.",
  },
];

export default function CharacterGrid() {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterData | null>(null);
  const [filter, setFilter] = useState<string>("todos");

  const filteredCharacters =
    filter === "todos"
      ? SCRIPT_CHARACTERS
      : SCRIPT_CHARACTERS.filter((c) =>
          c.element.toLowerCase().includes(filter.toLowerCase()) ||
          c.archetype.toLowerCase().includes(filter.toLowerCase()) ||
          c.name.toLowerCase().includes(filter.toLowerCase())
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
              <span>Dramatis Personae • Elenco Oficial del Guión</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#f7f4eb] uppercase font-bold tracking-tight">
              Personajes de la Obra
            </h2>
            <p className="font-jakarta text-sm sm:text-base text-[#dfbfbc] mt-2 max-w-2xl leading-relaxed">
              Las figuras que encarnan la farsa, el mito y el secreto de <em>Fiesta Pagana en Teatros</em>: desde el Niño Gabriel y el Colla hasta José Mercado, La Chola, La Tanguera, La Sahumadora y las cantoras del origen.
            </p>
          </div>

          {/* Filter badges */}
          <div className="flex flex-wrap gap-2 self-start md:self-auto">
            {["todos", "secreto", "tierra", "zamba", "mercado"].map((cat) => (
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

        {/* Characters Grid (Clean empty frame slots) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCharacters.map((char) => (
            <div
              key={char.id}
              onClick={() => setSelectedCharacter(char)}
              className="group relative rounded-2xl overflow-hidden bg-[#141419] border border-[#58413f]/40 hover:border-[#fabc4d]/50 transition-all duration-500 hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.8),0_0_24px_rgba(158,42,43,0.3)] cursor-pointer flex flex-col justify-between"
            >
              {/* Clean Empty Placeholder Frame */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0b0b0e] flex flex-col items-center justify-center p-6 border-b border-[#58413f]/30">
                <div className="w-16 h-16 rounded-2xl bg-[#141419] border border-[#58413f]/60 flex items-center justify-center text-[#fabc4d] group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <ImageIcon className="w-8 h-8 opacity-70 group-hover:opacity-100" />
                </div>
                <span className="font-jakarta text-[11px] text-[#dfbfbc] uppercase tracking-wider mt-3 font-semibold">
                  Espacio para Foto Oficial
                </span>

                <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-transparent to-transparent pointer-events-none"></div>

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
              <div className="p-6 space-y-3 relative bg-[#141419] flex-grow flex flex-col justify-between">
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
                    Personaje del Guión
                  </span>
                  <span className="text-[#fabc4d] font-semibold uppercase tracking-wider inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Ver Ficha <ChevronRight className="w-3.5 h-3.5" />
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
