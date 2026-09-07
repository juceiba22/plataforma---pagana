"use client";

import React, { useState } from "react";
import { Camera, Sparkles, Eye, X, Heart, MessageSquare } from "lucide-react";

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  author: string;
  category: string;
  likes: number;
}

export default function CommunityGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    "1": 42,
    "2": 38,
    "3": 56,
    "4": 29,
  });

  const galleryItems: GalleryItem[] = [
    {
      id: "1",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDCg_8fADmKyzMRR_mKHXuIaxrV69zviLZdeq3yKs8C8T6KExLZEebYSK-3FcuB78lQqCY7_XElf0PkhrC9ew9gYa2AP4ch_unLN6DgmNIK-fDzkKNvIHCZSyBAKMZ0fGJfwGe1o6ZXp0aRI46N68z24bqRqFjWMtslN8b1nD4uvqhka4Q6J1-LCddcgO-rZCCRout_blqth4Xk44gFPjBK1tam7VAJxwtAQF19DXOO1i60z97TGlRKWA",
      title: "Máscaras de Arcilla en Fraguado",
      author: "Ramiro Sombra • Taller",
      category: "Máscaras",
      likes: 42,
    },
    {
      id: "2",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB-vrWjlzCmj_urRsf4vgfYtqeWWbMxLFv0oQ2meaiWBMULKQQ_TkgHIK9RprNvc5Ba2mtBEShz-MZsS-johUxMLU-i9YLnLPLR-D5v2RvvG0JozUcq9whSEE2lbOEF8S2rpfsUTPq6ZsbPH0MYxlU-0223l7V8m2SgT6_cDtiMUpJMc0N3d2TAIorR1h26kXVBIWq5fO-DztgqMZtdN9LAgdzENUpq2n0mOxh3w-iZ2n4XaROaEAxDVQ",
      title: "Ensayo a Oscuras en Espacio Callejón",
      author: "Lisandro Valenzuela • Dirección",
      category: "Ensayos",
      likes: 38,
    },
    {
      id: "3",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAkj_mnBEhgY8r6ZIiSZ4SBc491464gDVPGv0QiuYlUGkq5cEIy_cdiFV5JEni2LTp04WEMnc9nHcSdzlF8SbjiF_pKwvLotKuzwRwRSzXb9egonyMFCV8HKtF3qoh9ETdAiUvhM_ii-IofswPq5FjpYDfKi-kMwKaTbnLam5KH0fDuRzQPSeeeWlemTSeY0wqSywbobnnOw9kvun63B1LeZixjNfmaAhVS4Spvo85T0fflWY28aq3rhm4fYxFIqcmjLt4",
      title: "Liturgia de Cintas Rojas & Fuego",
      author: "Camila Zaldívar • Elenco",
      category: "Ritual",
      likes: 56,
    },
    {
      id: "4",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBDVK18okmiTLrsL4KN3z0AyZrWSIibc4NbnNq-p27AjRbrCsPzcEJ14SybTyhLe7CjC4PtWeB6xbVytQWskBfB9srNgcXp1coyoEmOkluJ805K4bhO8YG1zWJmRmCiejUZk1d-Jn0mnFVexBfjXDO2W4cd35KXNxagQ7Xg5wCxlEcgZgJdkD5KDcqMvfeEkA8MTAiH0pDipcWROEaDq0Etx_2A7QlnDBZimjpAGjuHqHJkhBjWj6-n9g",
      title: "Pigmentos Rituales en Camarines",
      author: "Sofía Vallejos • Elenco",
      category: "Maquillaje",
      likes: 29,
    },
  ];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <section className="w-full bg-[#0b0b0e] py-14 lg:py-20 bg-noise border-t border-[#58413f]/30">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Camera className="w-4 h-4 text-[#fabc4d]" />
              <span className="font-jakarta text-xs text-[#efbf67] uppercase tracking-[0.2em] font-bold">
                Bitácora Visual & Catarsis Colectiva
              </span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-[#f7f4eb] tracking-tight font-bold">
              Mapeo de Aportes & Galería
            </h2>
          </div>
          <p className="font-jakarta text-xs sm:text-sm text-[#dfbfbc] max-w-md leading-relaxed">
            Registros fotográficos, bocetos de escenografía, máscaras y momentos compartidos por el elenco y la audiencia.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#141419] border border-[#58413f]/40 hover:border-[#fabc4d]/50 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0b0b0e]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter saturate-90 group-hover:saturate-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-transparent to-transparent"></div>

                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#0b0b0e]/80 text-[#fabc4d] font-jakarta text-[10px] font-bold uppercase backdrop-blur-sm border border-[#fabc4d]/30">
                  {item.category}
                </span>

                <button
                  onClick={(e) => handleLike(item.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-[#0b0b0e]/80 text-[#ffb3ae] hover:text-[#fabc4d] backdrop-blur-sm transition-transform active:scale-125 border border-[#58413f]/40 flex items-center gap-1 text-[11px]"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#9e2a2b] text-[#9e2a2b]" />
                  <span>{likes[item.id] || item.likes}</span>
                </button>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#f7f4eb] group-hover:text-[#fabc4d] transition-colors leading-snug">
                  {item.title}
                </h4>
                <span className="font-jakarta text-[11px] text-[#dfbfbc] block">
                  {item.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-[#141419] border border-[#fabc4d]/40 rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-[#dfbfbc] hover:text-[#fabc4d] border border-[#58413f]"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full max-h-[70vh] object-cover"
            />

            <div className="p-6 flex items-center justify-between bg-[#141419]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#fabc4d] bg-[#0b0b0e] px-2 py-0.5 rounded border border-[#58413f]/40">
                  {selectedImage.category}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-[#f7f4eb] mt-1">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-[#dfbfbc]">{selectedImage.author}</p>
              </div>

              <button
                onClick={(e) => handleLike(selectedImage.id, e)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9e2a2b] text-[#f7f4eb] text-xs font-bold uppercase transition-all"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{likes[selectedImage.id] || selectedImage.likes} Likes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
