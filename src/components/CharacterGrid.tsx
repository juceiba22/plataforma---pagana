"use client";

import React, { useState } from "react";
import { Sparkles, Eye, Flame, Music, Feather, Shield, ChevronRight } from "lucide-react";
import CharacterModal, { CharacterData } from "./CharacterModal";

export const SCRIPT_CHARACTERS: CharacterData[] = [
  {
    id: "nino-gabriel",
    name: "El Niño Gabriel",
    archetype: "Oráculo Digital • El Vidente",
    element: "Código 616 & El Secreto",
    performer: "Gabriel (Elenco Infantil / Central)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsflbwK8N7xrmAZNR5DO6vSuetzhGlCIVlIQBtWq0O-O9PxJwwZ_PEE1dm78WKiMqDXlkvuLxgMOIUNw0NKw7pS31nhFxYJVy-tA8TKYXve7xXX5W8pieSHDUlgJbXJ5D0KRnszl7yHyjCMVJ5npCO7MJ-1hZBMoFOFsqsJ-Munks8XbIULVaJq9rnQ5hChTUBsoL8S0m9PxlzfvpZagzEJth4lWZ63sGI7Er61SPegvWVWq0IJXBcOw",
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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDVK18okmiTLrsL4KN3z0AyZrWSIibc4NbnNq-p27AjRbrCsPzcEJ14SybTyhLe7CjC4PtWeB6xbVytQWskBfB9srNgcXp1coyoEmOkluJ805K4bhO8YG1zWJmRmCiejUZk1d-Jn0mnFVexBfjXDO2W4cd35KXNxagQ7Xg5wCxlEcgZgJdkD5KDcqMvfeEkA8MTAiH0pDipcWROEaDq0Etx_2A7QlnDBZimjpAGjuHqHJkhBjWj6-n9g",
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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCg_8fADmKyzMRR_mKHXuIaxrV69zviLZdeq3yKs8C8T6KExLZEebYSK-3FcuB78lQqCY7_XElf0PkhrC9ew9gYa2AP4ch_unLN6DgmNIK-fDzkKNvIHCZSyBAKMZ0fGJfwGe1o6ZXp0aRI46N68z24bqRqFjWMtslN8b1nD4uvqhka4Q6J1-LCddcgO-rZCCRout_blqth4Xk44gFPjBK1tam7VAJxwtAQF19DXOO1i60z97TGlRKWA",
    quote: "En el siglo XXI pasamos de la era del tiempo a la era del espacio-tiempo. La materia no existe: los átomos se mueven al mismo ritmo que el universo.",
    description: "El pensador del altiplano que abre el misterio del universo tras las cantoras. Muerde la manzana en el centro de la escena con serena sorna filosófica.",
    psychomagicFunction: "Apertura del portal metafísico y ruptura de la ilusión materialista.",
    ritualMask: "Gorro chullo andino, poncho de vicuña y mordisco de manzana ritual.",
    frequency: "528 Hz • Frecuencia de transmutación y resonancia cósmica.",
  },
  {
    id: "el-gaucho",
    name: "El Gaucho (Coya Leguizamón)",
    archetype: "El Filósofo del Monte & La Salamanca",
    element: "Coplas, Carnaval & Barro",
    performer: "Ulises / Aixa",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-vrWjlzCmj_urRsf4vgfYtqeWWbMxLFv0oQ2meaiWBMULKQQ_TkgHIK9RprNvc5Ba2mtBEShz-MZsS-johUxMLU-i9YLnLPLR-D5v2RvvG0JozUcq9whSEE2lbOEF8S2rpfsUTPq6ZsbPH0MYxlU-0223l7V8m2SgT6_cDtiMUpJMc0N3d2TAIorR1h26kXVBIWq5fO-DztgqMZtdN9LAgdzENUpq2n0mOxh3w-iZ2n4XaROaEAxDVQ",
    quote: "En el norte liberamos la Salamanca para que no ande suelta en tiempos donde no debe andar. ¿Acaso el hombre criollo no está buscando la libertad?",
    description: "Portador de la sabiduría telúrica. Explica por qué el hombre criollo desentierra el carnaval antes de la Pascua y cuestiona la libertad vacía del dogma europeo.",
    psychomagicFunction: "Reconciliación con la sombra criolla y el festejo sagrado de la tierra.",
    ritualMask: "Sombrero de gaucho de ala ancha, poncho al hombro y ramita de albahaca.",
    frequency: "396 Hz • Liberación de culpas importadas y arraigo a la tierra.",
  },
  {
    id: "el-periodista",
    name: "El Presentador de la Libertad",
    archetype: "Bufón Mediático • Showman",
    element: "Televisión & Gritos de Libertad",
    performer: "Martina / Actor Invitado",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4AxDnqmXvbMLeNcWb4KsMTGKpwwJfWzqcK39TJfLpkd9jPgElmdZOsH8KAUIyVUiPwl3SvwrL20QMmNZwpxGuXvm5JG45VJb75VRinFbHGzwjsOcnhQUpTBINvysbCEfien4VKhYAcAWuKt6sK3GSa28UpB3FSBhxEsHcv5AWjMQF-hhjvqKhxTFPVIGk-AdUBRRTvGSJ0loFb--BrrOIsZX5LqfJeReIvu2risbDyKwQKTWozzy__w",
    quote: "¡Viva la libertad carajo! Yo te libero de los municipios, de las familias, del pasado y de la ley de gravedad del comunista Newton.",
    description: "El conductor de un show televisivo grotesco que promete libertad absoluta a cambio de nada, hasta que la realidad económica de José Mercado lo pone en jaque.",
    psychomagicFunction: "Exorcismo de la farsa discursiva contemporánea mediante la sátira.",
    ritualMask: "Peluca platinada estrafalaria, saco brillante y micrófono dorado.",
    frequency: "741 Hz • Ruptura de espejismos y exposición de la comedia política.",
  },
  {
    id: "jose-mercado",
    name: "José Mercado",
    archetype: "El Titiritero Financiero • El Mercado",
    element: "Biyuya, Billetín & Morlacos",
    performer: "Tomás (Mendieta)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdZhLf6PlMIY9ZK_btiq1zbQVOBk5ksf-swM6hHa6CChNXkdnQ2P0yAQ3axzC6IxyxNRPD7q9HqLIVmHaD9Hu5ViFHedb06bt_j9NZIeqNJrGcXlW2_gifRnXHoFKtQsIxu-tliNBDsEf2EAcoO9O2j-DPwfgia0xnojZGBpimYith8kT949DGshHdvwoT1hWqetlZ5GHFFRnVMJvm-vODWCmqL5FvGZ7lY4DB-PTLKIWtBUl4etJB8A",
    quote: "Yo soy José Mercado, el que decide a quién le llega la biyuya, la plata, la guita, la taka taka... Primo de Raúl Estado y socio de Javier Petróleo.",
    description: "La encarnación del capital financiero despiadado. Calcula todo en millones de euros y enfurece cuando se trata de pagar en pesos a los trabajadores populares.",
    psychomagicFunction: "Confrontación del poder económico y choque con la dignidad popular.",
    ritualMask: "Fajos de billetes falsos, reloj dorado gigante y sonrisa de tiburón.",
    frequency: "110 Hz • El pulso denso de la transacción y el morlaco.",
  },
  {
    id: "daiana-matancera",
    name: "Daiana (La Matancera)",
    archetype: "La Clase Trabajadora • Futbolista",
    element: "Fábrica de Sueños & Pelota",
    performer: "Sofía V. / Actriz",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkj_mnBEhgY8r6ZIiSZ4SBc491464gDVPGv0QiuYlUGkq5cEIy_cdiFV5JEni2LTp04WEMnc9nHcSdzlF8SbjiF_pKwvLotKuzwRwRSzXb9egonyMFCV8HKtF3qoh9ETdAiUvhM_ii-IofswPq5FjpYDfKi-kMwKaTbnLam5KH0fDuRzQPSeeeWlemTSeY0wqSywbobnnOw9kvun63B1LeZixjNfmaAhVS4Spvo85T0fflWY28aq3rhm4fYxFIqcmjLt4",
    quote: "Trabajo en la Fábrica de Sueños de La Matanza. ¿De dónde salieron esos 22 pares de huevos? Salieron de una cachucha. ¡Sin cachucha no hay jugadores ni nada!",
    description: "Administrativa de fábrica de colchones y jugadora de cuatro en el fútbol femenino. Enfrenta a José Mercado con la verdad biológica y popular del trabajo.",
    psychomagicFunction: "Reivindicación de la fuerza femenina obrera y el derecho al goce.",
    ritualMask: "Camiseta de fútbol con franjas azules y doradas, botines embarrados.",
    frequency: "639 Hz • Fuerza colectiva, dignidad y pertenencia de barrio.",
  },
  {
    id: "juan-salteno",
    name: "Juan Salteño",
    archetype: "El Cantor Psicomágico • El Artista",
    element: "Guitarra, Zamba & Teatro",
    performer: "Juan / Ensamble Musical",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1X4p4gVHON_LlbC1QFQ3d27pnxEJbs7tF2KGI4VV-SBUn47FzGOCqtomDy-SGgOx8Dmd7j8TBGIuV4tnL6n7MDZiikPPFGzh466Tg8k4ki8ykpr3bfpa-Ru-02u9FD82pyUAsUx7lGim7ILc1evat2c_quVrS-rasO3HKlbuZTe342O3ZDp9c97yobHEvvEpoXvdwM21Qqh5XFOahiKhz_0ZT3KD4qqsimBEsVkJQ0e9TbZZWpTjEOiySeG",
    quote: "A mí me gustaría armar una gran compañía teatral para hacer actos psicomágicos a través de los símbolos... y cantar en Cosquín la Zamba para olvidar.",
    description: "El artista popular salteño que busca trascender la mera industria comercial del folclore para convertir su canto en medicina y memoria escénica.",
    psychomagicFunction: "Sanación del olvido a través de la Zamba y la poesía del norte.",
    ritualMask: "Poncho salteño rojo y negro, guitarra criolla de cedro.",
    frequency: "432 Hz • Armónicos de zamba y vidala andina.",
  },
  {
    id: "las-cantoras",
    name: "Las Cantoras del Origen",
    archetype: "Sirenas de la Patria • La Memoria Ancestral",
    element: "Voces en Penumbra & Cabello Largo",
    performer: "Cantora 1 & Cantora 2",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPStdwIZHlBiVIZjUR8gBS3kWa5k-4kQ1DSd-A53kwvwW76um7wYebIszzWgq_8Q1lB2eVnaAQddSqLEqD1fKBnw6LSuy-3MLZxgzy2hX1y5VANK6AxZeO4o8jctgBaJjoeSJx1pj-KNCnzC4bkzItMXfzB7pd_93bvLRhfK75jcTBQNr1fnP6GHTY_90dtVcZTenrkMJKi1VnMxwVk3-mt3gl61nqMmn6psjernnBSbgLMO-guFEyQg",
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
          c.archetype.toLowerCase().includes(filter.toLowerCase())
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
              Las figuras que encarnan la farsa, el mito y el secreto de <em>Fiesta Pagana en Teatros</em>: desde el niño que digitó el 616 hasta José Mercado y las cantoras del origen.
            </p>
          </div>

          {/* Filter badges */}
          <div className="flex flex-wrap gap-2 self-start md:self-auto">
            {["todos", "secreto", "tierra", "libertad", "mercado"].map((cat) => (
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
