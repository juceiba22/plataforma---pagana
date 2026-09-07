"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Shield, User, Menu, X, Ticket } from "lucide-react";
import AccessModal from "./AccessModal";
import RitualModal from "./RitualModal";

export default function Navbar() {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e0e11]/90 backdrop-blur-md border-b border-[#58413f]/40 bg-noise transition-all duration-300">
        <div className="h-20 max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#9e2a2b]/20 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d] shadow-[0_0_15px_rgba(158,42,43,0.4)] group-hover:scale-105 transition-transform">
              <span className="font-cinzel text-xl font-bold">FP</span>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl text-[#f7f4eb] tracking-widest uppercase font-bold group-hover:text-[#fabc4d] transition-colors">
                Fiesta Pagana
              </span>
              <span className="font-jakarta text-[10px] sm:text-xs text-[#efbf67] tracking-widest uppercase opacity-80 font-medium">
                Teatro Ritual • Buenos Aires
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <Link
              href="/"
              className="px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_14px_rgba(158,42,43,0.5)] border-t border-white/20"
            >
              Experiencia & Obra
            </Link>
            <Link
              href="/portal"
              className="px-3.5 py-2 text-xs uppercase tracking-wider font-semibold text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] transition-colors rounded-lg flex items-center gap-1.5"
            >
              <span>Portal Elenco</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fabc4d] animate-pulse"></span>
            </Link>
            <Link
              href="/streaming"
              className="px-3.5 py-2 text-xs uppercase tracking-wider font-semibold text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] transition-colors rounded-lg flex items-center gap-1.5"
            >
              <span>Sala de Streaming</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb3ae]"></span>
            </Link>
            <Link
              href="/comunidad"
              className="px-3.5 py-2 text-xs uppercase tracking-wider font-semibold text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] transition-colors rounded-lg flex items-center gap-1.5"
            >
              <span>Ágora & Foros</span>
            </Link>
            <a
              href="/#personajes-ritual"
              className="px-3 py-2 text-xs uppercase tracking-wider font-semibold text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] transition-colors rounded-lg"
            >
              Personajes
            </a>
            <a
              href="/#fechas-boletos"
              className="px-3 py-2 text-xs uppercase tracking-wider font-semibold text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] transition-colors rounded-lg"
            >
              Fechas
            </a>
          </nav>

          {/* Right Action & Privileged Badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/portal"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9e2a2b]/20 border border-[#9e2a2b]/80 text-[#ffb3ae] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-[#9e2a2b]/30 transition-all text-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#fabc4d] animate-pulse"></span>
              <span className="tracking-wider uppercase font-semibold text-[#ffdad7] font-jakarta">
                Modo Elenco Privilegiado
              </span>
            </Link>

            <button
              onClick={() => setIsRitualModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase tracking-wider font-bold shadow-[0_0_16px_rgba(250,188,77,0.4)] hover:brightness-110 hover:shadow-[0_0_24px_rgba(250,188,77,0.6)] transition-all"
            >
              <Ticket className="w-4 h-4" />
              <span className="hidden xs:inline">Pase Ritual</span>
              <span className="xs:hidden">Entradas</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22]"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#58413f]/40 bg-[#0e0e11] px-4 py-4 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm uppercase tracking-wider font-semibold rounded-lg bg-[#9e2a2b] text-[#f7f4eb]"
            >
              Experiencia & Obra
            </Link>
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left px-3 py-2 text-sm uppercase tracking-wider font-semibold text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] rounded-lg flex items-center justify-between"
            >
              <span>Portal Elenco & Staff</span>
              <span className="w-2 h-2 rounded-full bg-[#fabc4d]"></span>
            </Link>
            <Link
              href="/streaming"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left px-3 py-2 text-sm uppercase tracking-wider font-semibold text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] rounded-lg flex items-center justify-between"
            >
              <span>Sala de Streaming & Laboratorio</span>
              <span className="w-2 h-2 rounded-full bg-[#ffb3ae]"></span>
            </Link>
            <Link
              href="/comunidad"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left px-3 py-2 text-sm uppercase tracking-wider font-semibold text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] rounded-lg flex items-center justify-between"
            >
              <span>Ágora de Comunidad & Foros</span>
              <span className="w-2 h-2 rounded-full bg-[#fabc4d]"></span>
            </Link>
            <a
              href="/#personajes-ritual"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm uppercase tracking-wider font-semibold text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] rounded-lg"
            >
              Personajes del Ritual
            </a>
            <a
              href="/#fechas-boletos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm uppercase tracking-wider font-semibold text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] rounded-lg"
            >
              Próximas Fechas & Boletos
            </a>
            <div className="pt-2 border-t border-[#58413f]/20">
              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#9e2a2b]/20 border border-[#9e2a2b] text-[#ffdad7] text-xs uppercase font-semibold"
              >
                <Shield className="w-4 h-4 text-[#fabc4d]" />
                Acceso Elenco Privilegiado
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <AccessModal isOpen={isAccessModalOpen} onClose={() => setIsAccessModalOpen(false)} />
      <RitualModal isOpen={isRitualModalOpen} onClose={() => setIsRitualModalOpen(false)} />
    </>
  );
}
