import React from "react";
import Link from "next/link";
import { Sparkles, MapPin, Mail, Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0e0e11] border-t border-[#58413f]/40 relative overflow-hidden bg-noise">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-40 bg-[#9e2a2b]/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-40 bg-[#fabc4d]/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#58413f]/30">
          {/* Brand & Subtitle */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#9e2a2b]/30 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d]">
                <span className="font-cinzel text-lg font-bold">FP</span>
              </div>
              <span className="font-cinzel text-xl text-[#f7f4eb] tracking-widest uppercase font-bold">
                Fiesta Pagana
              </span>
            </div>
            <p className="font-jakarta text-xs uppercase tracking-[0.18em] text-[#fabc4d] font-semibold">
              Teatro foro • Bandoneón & Bombo Legüero • Grotesco Criollo & Rock
            </p>
            <p className="font-jakarta text-sm text-[#dfbfbc] max-w-md leading-relaxed">
              Una liturgia escénica donde la Argentina se mira al espejo
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1f1f22] border border-[#58413f]/50 text-xs text-[#efbf67]">
              <Flame className="w-3.5 h-3.5 text-[#fabc4d]" />
              <span>Temporada 2025 • Teatro El Deseo & Teatro El Portal</span>
            </div>
          </div>

          {/* Nav Links: Entradas & Registro */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-jakarta text-xs text-[#f7f4eb] uppercase tracking-widest block font-bold">
              Entradas & Acceso
            </span>
            <ul className="space-y-2 text-sm text-[#dfbfbc]">
              <li>
                <a
                  href="https://www.alternativateatral.com/obra102861-fiesta-pagana-una-obra-para-rescatarnos-del-olvido"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fabc4d] transition-colors underline decoration-[#58413f] flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#fabc4d]" />
                  Alternativa Teatral • Boletería
                </a>
              </li>
              <li>
                <a href="#fechas-boletos" className="hover:text-[#fabc4d] transition-colors">
                  Agenda de Funciones
                </a>
              </li>
              <li>
                <a href="#formatos-escenicos" className="hover:text-[#fabc4d] transition-colors">
                  La Puesta en Escena
                </a>
              </li>
              <li>
                <a href="#textos-sagrados" className="hover:text-[#fabc4d] transition-colors">
                  Textos Sagrados & Monólogos
                </a>
              </li>
            </ul>
          </div>

          {/* Compañía & Contacto */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-jakarta text-xs text-[#f7f4eb] uppercase tracking-widest block font-bold">
              Compañía & Contacto
            </span>
            <div className="space-y-2 text-sm text-[#dfbfbc]">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#efbf67] shrink-0" />
                <span>Teatro El Deseo / Teatro El Portal • CABA</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#efbf67] shrink-0" />
                <span>contacto@fiestapagana.ar</span>
              </p>
              <div className="pt-2">
                <span className="text-xs uppercase tracking-wider text-[#efbf67] block font-semibold">
                  Dirección Artística
                </span>
                <span className="text-xs text-[#c8c4b8]">
                  Colectivo Fiesta Pagana & Curaduría Psicomágica
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-[#dfbfbc]/80">
          <p>© 2025 Compañía Escénica Fiesta Pagana. Todos los derechos reservados bajo licencia ritual.</p>
          <div className="flex items-center gap-6">
            <a href="#textos-sagrados" className="text-[#efbf67] hover:text-[#fabc4d] transition-colors uppercase tracking-widest font-semibold">
              Textos & Monólogos
            </a>
            <a href="#personajes-ritual" className="hover:text-[#f7f4eb] transition-colors uppercase tracking-widest font-semibold">
              Personajes
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
