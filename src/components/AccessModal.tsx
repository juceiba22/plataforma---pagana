"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Shield, KeyRound, UserCheck, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessModal({ isOpen, onClose }: AccessModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"passcode" | "request">("passcode");
  const [passcode, setPasscode] = useState("");
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    rol: "Actor / Performer",
    justificacion: "",
  });
  const [requestSent, setRequestSent] = useState(false);

  if (!isOpen) return null;

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passcode.toLowerCase().trim() === "fiestapagana" ||
      passcode.toLowerCase().trim() === "dionisio2025" ||
      passcode.toLowerCase().trim() === "ritual"
    ) {
      setStatusMessage({
        type: "success",
        text: "¡Credencial de Elenco validada! Redirigiendo a la Sala Privilegiada...",
      });
      setTimeout(() => {
        setStatusMessage(null);
        onClose();
        router.push("/portal");
      }, 1200);
    } else {
      setStatusMessage({
        type: "error",
        text: "Código no reconocido por el concilio sagrado. Intente con 'RITUAL' o solicite credencial.",
      });
    }
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      onClose();
    }, 2000);
  };

  const handleDirectAccess = () => {
    onClose();
    router.push("/portal");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#141419] border border-[#fabc4d]/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(158,42,43,0.4)] bg-noise text-[#f7f4eb] overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#9e2a2b]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#dfbfbc] hover:text-[#fabc4d] transition-colors p-1.5 rounded-lg bg-[#1f1f22]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#9e2a2b]/30 border border-[#9e2a2b] flex items-center justify-center text-[#fabc4d]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-xl font-bold uppercase tracking-wider text-[#f7f4eb]">
              Portal Elenco & Staff
            </h3>
            <p className="text-xs text-[#efbf67] font-jakarta tracking-wide">
              Acceso a guiones, partituras y zona de camarines digitales
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-[#0b0b0e] rounded-xl mb-6 border border-[#58413f]/40">
          <button
            onClick={() => {
              setActiveTab("passcode");
              setStatusMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "passcode"
                ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_12px_rgba(158,42,43,0.5)]"
                : "text-[#dfbfbc] hover:text-[#f7f4eb]"
            }`}
          >
            Código de Acceso
          </button>
          <button
            onClick={() => {
              setActiveTab("request");
              setStatusMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "request"
                ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_12px_rgba(158,42,43,0.5)]"
                : "text-[#dfbfbc] hover:text-[#f7f4eb]"
            }`}
          >
            Solicitar Credencial
          </button>
        </div>

        {/* Tab 1: Passcode */}
        {activeTab === "passcode" && (
          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#dfbfbc] font-semibold mb-2">
                Palabra Clave Ritual / Clave Secreta
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Ingrese clave (ej: RITUAL)"
                  className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-xl px-4 py-3 text-sm text-[#f7f4eb] placeholder-[#8a877e] focus:outline-none focus:border-[#fabc4d] focus:ring-1 focus:ring-[#fabc4d] transition-all"
                  autoFocus
                />
                <KeyRound className="w-4 h-4 text-[#8a877e] absolute right-4 top-3.5" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#8a877e] mt-2">
                <span>Pista de dirección: <strong className="text-[#fabc4d]">RITUAL</strong></span>
                <button
                  type="button"
                  onClick={handleDirectAccess}
                  className="text-[#efbf67] hover:text-[#fabc4d] transition-colors underline flex items-center gap-1"
                >
                  Entrar directo al Portal <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {statusMessage && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  statusMessage.type === "success"
                    ? "bg-emerald-950/60 border border-emerald-500/50 text-emerald-200"
                    : "bg-[#93000a]/30 border border-[#ffb4ab]/40 text-[#ffdad6]"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#ffb4ab]" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-semibold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(158,42,43,0.6)] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#fabc4d]" />
              Validar e Ingresar al Portal
            </button>
          </form>
        )}

        {/* Tab 2: Request access */}
        {activeTab === "request" && (
          <form onSubmit={handleRequestSubmit} className="space-y-3.5">
            {requestSent ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#fabc4d] mx-auto animate-bounce" />
                <h4 className="font-cinzel text-lg font-bold text-[#f7f4eb]">
                  Solicitud Enviada a Producción
                </h4>
                <p className="text-xs text-[#dfbfbc]">
                  Revisaremos tu postulación antes de la próxima luna nueva y recibirás tu contraseña vía correo electrónico.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                      Nombre Completo
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Tu nombre artístico o legal"
                      className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-lg px-3 py-2 text-xs text-[#f7f4eb] placeholder-[#8a877e] focus:outline-none focus:border-[#fabc4d]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="correo@ejemplo.com"
                      className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-lg px-3 py-2 text-xs text-[#f7f4eb] placeholder-[#8a877e] focus:outline-none focus:border-[#fabc4d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                    Rol Escénico / Profesión
                  </label>
                  <select
                    value={formData.rol}
                    onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-lg px-3 py-2 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                  >
                    <option value="Actor / Performer">Actor / Actriz / Performer</option>
                    <option value="Músico / Sonidista">Músico / Ensamble Sonoro</option>
                    <option value="Técnico / Iluminación">Técnico / Iluminador / Stage Manager</option>
                    <option value="Prensa / Crítica Teatral">Prensa / Crítica Especializada</option>
                    <option value="Investigador Psicomagia">Investigador Psicomagia / Antropología</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                    Motivo de la Solicitud
                  </label>
                  <textarea
                    rows={2}
                    value={formData.justificacion}
                    onChange={(e) => setFormData({ ...formData, justificacion: e.target.value })}
                    placeholder="Breve reseña o vínculo con el colectivo..."
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-lg px-3 py-2 text-xs text-[#f7f4eb] placeholder-[#8a877e] focus:outline-none focus:border-[#fabc4d]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#fabc4d] text-[#281900] font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(250,188,77,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  Enviar Solicitud a Curaduría
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
