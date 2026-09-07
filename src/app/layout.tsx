import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fiesta Pagana • Plataforma Teatral & Ritual",
  description:
    "Una liturgia nocturna donde la barrera entre escenario y platea se consume. Mitología porteña, máscaras arquetípicas, catarsis polifónica y celebración ritual.",
  keywords: [
    "Fiesta Pagana",
    "Teatro Ritual",
    "Psicomagia",
    "Buenos Aires",
    "Ninio Ancestral",
    "Olmo Masini",
    "Alternativa Teatral",
    "Teatro Foro",
  ],
  openGraph: {
    title: "Fiesta Pagana • Teatro Ritual • Buenos Aires",
    description: "Teatro foro • Bandas en vivo • Fiesta. Un evento psico-mágico.",
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
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
