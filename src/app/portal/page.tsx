import React from "react";
import type { Metadata } from "next";
import PortalView from "@/components/portal/PortalView";

export const metadata: Metadata = {
  title: "Panel de Elenco & Cronograma • Fiesta Pagana",
  description:
    "Fichas de presentación de actores y personajes, gestor de fotos de elenco y calendario interactivo de ensayos de Fiesta Pagana.",
};

export default function PortalPage() {
  return <PortalView />;
}
