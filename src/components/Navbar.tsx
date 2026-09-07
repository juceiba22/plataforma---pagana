"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Shield, User, Menu, X, Ticket, LogIn, Crown, UserCheck } from "lucide-react";
import AccessModal from "./AccessModal";
import RitualModal from "./RitualModal";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, profile, role, isAdmin, isStaff, isPublic } = useAuth();

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
              className="px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22]"
            >
              Experiencia & Obra
            </Link>
            <Link
              href="/portal"
              className="px-3.5 py-2 text-xs uppercase tracking-wider font-semibold text-[#dfbfbc] hover:text-[#f7f4eb] hover:bg-[#1f1f22] transition-colors rounded-lg flex items-center gap-1.5"
            >
              <span>Portal Elenco</span>
              {isAdmin ? (
                <span className="px-1.5 py-0.2 text-[9px] rounded bg-[#9e2a2b] text-[#fabc4d] font-bold">ADMIN</span>
              ) : isStaff ? (
                <span className="w-1.5 h-1.5 rounded-full bg-[#fabc4d] animate-pulse"></span>
              ) : null}
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

          {/* Right Actions: Auth Status & Ticket Button */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* User status button / Access trigger */}
            {user ? (
              <button
                onClick={() => setIsAccessModalOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c1a20] border border-[#58413f] hover:border-[#fabc4d] transition-all text-xs text-[#f7f4eb]"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name || "Avatar"}
                    className="w-5 h-5 rounded-full object-cover border border-[#fabc4d]"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#9e2a2b]/30 flex items-center justify-center text-[#fabc4d] text-[10px] font-bold">
                    {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline font-medium text-xs max-w-[100px] truncate">
                  {profile?.full_name || user.email?.split("@")[0]}
                </span>
                {isAdmin && (
                  <span className="px-1.5 py-0.5 rounded bg-[#9e2a2b] text-[#fabc4d] text-[9px] font-bold uppercase tracking-wider">
                    Admin
                  </span>
                )}
                {role === "staff" && (
                  <span className="px-1.5 py-0.5 rounded bg-[#fabc4d]/20 text-[#fabc4d] text-[9px] font-bold uppercase tracking-wider">
                    Staff
                  </span>
                )}
                {isPublic && (
                  <span className="hidden md:inline px-1.5 py-0.5 rounded bg-white/10 text-[#dfbfbc] text-[9px] font-bold uppercase tracking-wider">
                    Público
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={() => setIsAccessModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f1f22] border border-[#58413f]/60 hover:border-[#fabc4d]/60 text-[#dfbfbc] hover:text-[#f7f4eb] transition-all text-xs font-semibold uppercase tracking-wider"
              >
                <LogIn className="w-3.5 h-3.5 text-[#fabc4d]" />
                <span className="hidden sm:inline">Ingresar / Elenco</span>
                <span className="sm:hidden">Ingreso</span>
              </button>
            )}

            {/* Ritual Pass / Tickets */}
            <button
              onClick={() => setIsRitualModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg bg-[#fabc4d] text-[#281900] font-jakarta text-xs uppercase tracking-wider font-bold shadow-[0_0_16px_rgba(250,188,77,0.4)] hover:brightness-110 hover:shadow-[0_0_24px_rgba(250,188,77,0.6)] transition-all"
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
              {isAdmin ? (
                <span className="px-1.5 py-0.5 rounded bg-[#9e2a2b] text-[#fabc4d] text-[10px] font-bold">ADMIN</span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#fabc4d]"></span>
              )}
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
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccessModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#9e2a2b]/20 border border-[#9e2a2b] text-[#ffdad7] text-xs uppercase font-semibold"
              >
                <Shield className="w-4 h-4 text-[#fabc4d]" />
                {user ? `Sesión: ${profile?.full_name || user.email}` : "Ingreso Elenco / Google"}
              </button>
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
