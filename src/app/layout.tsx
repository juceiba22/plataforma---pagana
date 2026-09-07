import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Fiesta Pagana en Teatros • Obra Ritual & Farsa Filosófica",
  description:
    "Una experiencia escénica donde la Argentina se mira al espejo: la batalla celeste y terrestre, el mito criollo de la Salamanca, el show de la libertad y la profecía de Argentum.",
  keywords: [
    "Fiesta Pagana en Teatros",
    "Teatro Ritual",
    "Argentina es una Civilización",
    "Argentum",
    "La Salamanca",
    "Gabriel y el Demonio",
    "José Mercado",
    "Teatro Argentino",
    "Grotesco Criollo",
    "Marechal",
  ],
  openGraph: {
    title: "Fiesta Pagana en Teatros • Obra Ritual & Farsa Argentina",
    description:
      "¿Qué pasa con tu voz, Argentina? Una obra de teatro ritual, farsa política y drama mitológico sobre el destino y la identidad americana.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className="bg-[#0b0b0e] text-[#f7f4eb] font-jakarta antialiased selection:bg-[#9e2a2b] selection:text-[#ffdad7] bg-noise min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
