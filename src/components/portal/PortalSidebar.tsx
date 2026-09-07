"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Theater,
  BookOpen,
  Video,
  Calendar,
  FileText,
  MessagesSquare,
  ArrowLeft,
  Shield,
  Menu,
  X,
  Sparkles,
  Layers,
} from "lucide-react";

export default function PortalSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      label: "Panel de Elenco",
      href: "/portal",
      icon: <Theater className="w-5 h-5" />,
      active: pathname === "/portal",
    },
    {
      label: "Sala de Streaming",
      href: "/streaming",
      icon: <Video className="w-5 h-5" />,
      active: pathname === "/streaming",
    },
    {
      label: "Ágora & Comunidad",
      href: "/comunidad",
      icon: <MessagesSquare className="w-5 h-5" />,
      active: pathname === "/comunidad",
    },
    {
      label: "Cuaderno de Dirección",
      href: "/portal#cuaderno-direccion",
      icon: <BookOpen className="w-5 h-5" />,
      active: false,
    },
    {
      label: "Cronograma de Ensayos",
      href: "/portal#cronograma-ensayos",
      icon: <Calendar className="w-5 h-5" />,
      active: false,
    },
    {
      label: "Partituras & Textos",
      href: "/portal#partituras-textos",
      icon: <FileText className="w-5 h-5" />,
      active: false,
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl bg-[#141419] border border-[#fabc4d]/40 text-[#fabc4d] shadow-lg"
          aria-label="Toggle Portal Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar container */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-[#0e0e11] border-r border-[#58413f]/30 z-40 flex flex-col justify-between pt-6 pb-6 bg-noise transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-6 px-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 px-2 group">
            <div className="w-9 h-9 rounded-lg bg-[#9e2a2b]/20 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d] shadow-[0_0_12px_rgba(158,42,43,0.4)] group-hover:scale-105 transition-transform">
              <span className="font-cinzel text-lg font-bold">FP</span>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-base text-[#f7f4eb] font-bold tracking-wider uppercase">
                Fiesta Pagana
              </span>
              <span className="font-jakarta text-[10px] text-[#efbf67] tracking-widest uppercase opacity-75">
                Compañía Escénica
              </span>
            </div>
          </Link>

          {/* Sub-header badge */}
          <div className="p-3 rounded-xl bg-[#141419] border border-[#58413f]/40">
            <span className="font-jakarta text-[10px] text-[#dfbfbc] uppercase tracking-widest block font-medium">
              Santuario Actoral
            </span>
            <span className="font-jakarta text-xs text-[#ffb3ae] font-semibold">
              Dirección & Cuaderno de Ensayo
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-jakarta text-xs uppercase tracking-wider font-semibold transition-all ${
                  item.active
                    ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_14px_rgba(158,42,43,0.4)] border-t border-white/20"
                    : "text-[#dfbfbc] hover:bg-[#1f1f22] hover:text-[#f7f4eb]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Profile & Return to public site */}
        <div className="px-4 space-y-4">
          <div className="p-3 rounded-xl bg-[#141419]/80 border border-[#58413f]/30 flex items-center gap-3">
            <img
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover ring-1 ring-[#fabc4d]/50"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4AxDnqmXvbMLeNcWb4KsMTGKpwwJfWzqcK39TJfLpkd9jPgElmdZOsH8KAUIyVUiPwl3SvwrL20QMmNZwpxGuXvm5JG45VJb75VRinFbHGzwjsOcnhQUpTBINvysbCEfien4VKhYAcAWuKt6sK3GSa28UpB3FSBhxEsHcv5AWjMQF-hhjvqKhxTFPVIGk-AdUBRRTvGSJ0loFb--BrrOIsZX5LqfJeReIvu2risbDyKwQKTWozzy__w"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-jakarta text-xs text-[#f7f4eb] truncate font-semibold">
                Dirección General
              </span>
              <span className="font-jakarta text-[10px] text-[#efbf67] truncate">
                Staff Activo • Sesión Protegida
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#1f1f22] border border-[#58413f]/40 font-jakarta text-xs uppercase tracking-wider text-[#dfbfbc] hover:text-[#fabc4d] hover:border-[#fabc4d]/40 transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Sitio Público</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
        ></div>
      )}
    </>
  );
}
