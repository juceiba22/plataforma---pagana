"use client";

import React from "react";
import { Star, MessageSquareQuote, Award } from "lucide-react";

export default function ReviewsSection() {
  const reviews = [
    {
      id: "1",
      quote:
        "Una experiencia desgarradora e inolvidable. El ingreso con las máscaras desarma cualquier cinismo de espectador moderno. Hacía años que no sentía una catarsis colectiva tan visceral en el circuito off de Buenos Aires.",
      author: "Mariana Sanguinetti",
      role: "Crítica Escénica Independiente",
      initial: "M",
      rating: 5,
      accent: "primary",
    },
    {
      id: "2",
      quote:
        "El teatro foro te arrastra sin darte cuenta: de pronto estás en medio de la escena discutiendo con los actores. Y el pase al recital de Ninio Ancestral y la fiesta final es una genialidad dionisíaca.",
      author: "Gonzalo Berrotarán",
      role: "Espectador verificado en Alternativa",
      initial: "G",
      rating: 5,
      accent: "secondary",
    },
    {
      id: "3",
      quote:
        "El bandoneón de Olmo Masini te hiela la sangre al comienzo y luego te hace danzar en trance pagano. Una propuesta revolucionaria para el teatro porteño que reinventa la noche cultural.",
      author: "Revista El Fuelle Oculto",
      role: "Buenos Aires Under & Escena Viva",
      initial: "C",
      rating: 5,
      accent: "tertiary",
    },
  ];

  return (
    <section className="w-full bg-[#0b0b0e] py-20 lg:py-32 relative overflow-hidden bg-noise">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-jakarta text-xs uppercase tracking-[0.2em] text-[#ffb3ae] font-bold block mb-2">
              Testimonios de la Platea
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#f7f4eb] uppercase font-bold tracking-tight">
              Reseñas & Críticas Teatrales
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141419] border border-[#fabc4d]/40 text-[#fabc4d] font-jakarta text-xs uppercase tracking-wider font-bold">
            <Award className="w-4 h-4 text-[#fabc4d]" />
            <span>4.9 / 5 en Alternativa Teatral</span>
          </div>
        </div>

        {/* 3 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#141419] border border-[#58413f]/40 flex flex-col justify-between shadow-lg hover:border-[#fabc4d]/30 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex text-[#fabc4d] gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#fabc4d]" />
                  ))}
                </div>
                <p className="font-jakarta text-sm text-[#f7f4eb] italic leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#58413f]/20 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-cinzel text-base ${
                    rev.accent === "primary"
                      ? "bg-[#9e2a2b] text-[#f7f4eb]"
                      : rev.accent === "secondary"
                      ? "bg-[#bd8718] text-[#281900]"
                      : "bg-[#2a2a2d] text-[#fabc4d]"
                  }`}
                >
                  {rev.initial}
                </div>
                <div>
                  <span className="font-jakarta text-xs font-bold text-[#f7f4eb] block">
                    {rev.author}
                  </span>
                  <span className="font-jakarta text-[11px] text-[#dfbfbc]">
                    {rev.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
