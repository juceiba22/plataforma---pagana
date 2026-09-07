import React from "react";
import Link from "next/link";
import { Sparkles, Compass, MapPin, Mail, Flame, ScrollText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0e0e11] border-t border-[#58413f]/40 relative overflow-hidden bg-noise">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-40 bg-[#9e2a2b]/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-40 bg-[#fabc4d]/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#58413f]/30">
          {/* Brand & Manifesto quote */}
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
              DRAMATURGIA DE LA TRANSMUTACIÓN NOCTURNA
            </p>
            <p className="font-jakarta text-sm text-[#dfbfbc] max-w-md leading-relaxed">
              Un territorio escénico donde la realidad se desvanece en rito. Actos psicomágicos, ensamble polifónico y catarsis colectiva en el circuito subterráneo de Buenos Aires.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1f1f22] border border-[#58413f]/50 text-xs text-[#efbf67]">
              <Flame className="w-3.5 h-3.5 text-[#fabc4d]" />
              <span>Temporada MMXXV • Galpón de Guevara & Espacio Callejón</span>
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
                  href="https://www.alternativateatral.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fabc4d] transition-colors underline decoration-[#58413f] flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#fabc4d]" />
                  Alternativa Teatral • Localidades
                </a>
              </li>
              <li>
                <a href="#fechas-boletos" className="hover:text-[#fabc4d] transition-colors">
                  Agenda de Funciones
                </a>
              </li>
              <li>
                <a href="#formatos-escenicos" className="hover:text-[#fabc4d] transition-colors">
                  Dispositivos: Completo vs Reducido
                </a>
              </li>
              <li>
                <a href="#textos-sagrados" className="hover:text-[#fabc4d] transition-colors">
                  Protocolo de Ingreso & Velo
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
                <span>Espacio Callejón / Galpón de Guevara • CABA</span>
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
            <a href="#manifiesto-ritual" className="text-[#efbf67] hover:text-[#fabc4d] transition-colors uppercase tracking-widest font-semibold">
              Manifiesto Teatral
            </a>
            <a href="#personajes-ritual" className="hover:text-[#f7f4eb] transition-colors uppercase tracking-widest font-semibold">
              Ficha Técnica
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
