"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Shield,
  KeyRound,
  UserCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  User,
  LogOut,
  Mail,
  Theater,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "google" | "request" | "passcode";
}

export default function AccessModal({ isOpen, onClose, defaultTab = "google" }: AccessModalProps) {
  const router = useRouter();
  const {
    user,
    profile,
    role,
    isAdmin,
    isStaff,
    isPublic,
    signInWithGoogle,
    signOut,
    requestStaffAccess,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"google" | "request" | "passcode">(defaultTab);
  const [passcode, setPasscode] = useState("");
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const [staffRole, setStaffRole] = useState("Actor / Performer");
  const [staffNote, setStaffNote] = useState("");

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setStatusMessage(null);
    const { error } = await signInWithGoogle();
    setIsSubmitting(false);
    if (error) {
      setStatusMessage({
        type: "error",
        text: error.message || "Error al conectar con Google. Por favor, intenta de nuevo.",
      });
    }
  };

  const handleStaffRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setStatusMessage({
        type: "error",
        text: "Iniciá sesión con tu cuenta de Google primero para enviar tu solicitud de Elenco.",
      });
      return;
    }

    setIsSubmitting(true);
    const result = await requestStaffAccess(staffRole, staffNote);
    setIsSubmitting(false);

    if (result.success) {
      setRequestSent(true);
      setTimeout(() => {
        setRequestSent(false);
        onClose();
      }, 2500);
    } else {
      setStatusMessage({
        type: "error",
        text: result.error || "No se pudo procesar la solicitud.",
      });
    }
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passcode.toLowerCase().trim() === "fiestapagana" ||
      passcode.toLowerCase().trim() === "dionisio2025" ||
      passcode.toLowerCase().trim() === "ritual"
    ) {
      setStatusMessage({
        type: "success",
        text: "¡Código ceremonial verificado! Redirigiendo...",
      });
      setTimeout(() => {
        setStatusMessage(null);
        onClose();
        router.push("/portal");
      }, 1000);
    } else {
      setStatusMessage({
        type: "error",
        text: "Código no reconocido. Usa tu cuenta de Google o solicita credencial de Elenco.",
      });
    }
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
              Acceso a Fiesta Pagana
            </h3>
            <p className="text-xs text-[#efbf67] font-jakarta tracking-wide">
              Comunidad, Elenco & Dirección General
            </p>
          </div>
        </div>

        {/* Active User Banner if logged in */}
        {user ? (
          <div className="mb-6 p-4 rounded-xl bg-[#1c1a20] border border-[#58413f]/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name || "Usuario"}
                    className="w-10 h-10 rounded-full border border-[#fabc4d]/50 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#9e2a2b]/30 border border-[#fabc4d]/40 flex items-center justify-center text-[#fabc4d]">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-[#f7f4eb] flex items-center gap-2">
                    <span>{profile?.full_name || user.email?.split("@")[0]}</span>
                    {isAdmin && (
                      <span className="px-2 py-0.5 rounded-full bg-[#9e2a2b] text-[#fabc4d] text-[10px] font-bold border border-[#fabc4d]/40 uppercase">
                        Admin
                      </span>
                    )}
                    {role === "staff" && (
                      <span className="px-2 py-0.5 rounded-full bg-[#fabc4d]/20 text-[#fabc4d] text-[10px] font-bold border border-[#fabc4d]/40 uppercase">
                        Staff
                      </span>
                    )}
                    {isPublic && (
                      <span className="px-2 py-0.5 rounded-full bg-[#2a2930] text-[#dfbfbc] text-[10px] font-bold border border-white/10 uppercase">
                        Público
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#8a877e]">{user.email}</div>
                </div>
              </div>

              <button
                onClick={async () => {
                  await signOut();
                  setStatusMessage(null);
                }}
                className="text-xs text-[#dfbfbc] hover:text-[#ffb3ae] p-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1"
                title="Cerrar Sesión"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>

            {/* Status explanation */}
            {isAdmin && (
              <div className="text-xs text-emerald-400 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-500/30 flex items-center justify-between">
                <span>Tenés privilegios de <strong>Dirección General</strong>.</span>
                <button
                  onClick={() => {
                    onClose();
                    router.push("/portal");
                  }}
                  className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-semibold uppercase text-[11px]"
                >
                  Ir al Portal →
                </button>
              </div>
            )}

            {role === "staff" && (
              <div className="text-xs text-[#fabc4d] bg-[#fabc4d]/10 p-2.5 rounded-lg border border-[#fabc4d]/30 flex items-center justify-between">
                <span>Tenés acceso autorizado como <strong>{profile?.department || "Elenco"}</strong>.</span>
                <button
                  onClick={() => {
                    onClose();
                    router.push("/portal");
                  }}
                  className="px-2.5 py-1 rounded bg-[#fabc4d]/20 text-[#fabc4d] hover:bg-[#fabc4d]/30 font-semibold uppercase text-[11px]"
                >
                  Ir al Portal →
                </button>
              </div>
            )}

            {isPublic && profile?.status === "pending_staff_approval" && (
              <div className="text-xs text-[#efbf67] bg-[#fabc4d]/10 p-2.5 rounded-lg border border-[#fabc4d]/40">
                <div className="font-semibold flex items-center gap-1.5 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5" /> Solicitud enviada a Dirección
                </div>
                <span>
                  Postulación como <strong>{profile.staff_request_role}</strong> en revisión por los administradores.
                </span>
              </div>
            )}

            {isPublic && profile?.status !== "pending_staff_approval" && (
              <div className="text-xs text-[#dfbfbc] bg-white/5 p-2.5 rounded-lg border border-white/10 flex items-center justify-between">
                <span>¿Sos actor, músico o técnico de la obra?</span>
                <button
                  onClick={() => setActiveTab("request")}
                  className="px-2.5 py-1 rounded bg-[#9e2a2b] text-[#f7f4eb] hover:bg-[#c1383a] font-semibold text-[11px] uppercase tracking-wider"
                >
                  Pedir Alta Elenco
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Tabs for logged-out visitors */
          <div className="flex gap-2 p-1 bg-[#0b0b0e] rounded-xl mb-6 border border-[#58413f]/40">
            <button
              onClick={() => {
                setActiveTab("google");
                setStatusMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === "google"
                  ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_12px_rgba(158,42,43,0.5)]"
                  : "text-[#dfbfbc] hover:text-[#f7f4eb]"
              }`}
            >
              Google Login
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
              Alta de Elenco
            </button>
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
              Clave
            </button>
          </div>
        )}

        {/* Tab 1: Google Login (When not logged in) */}
        {!user && activeTab === "google" && (
          <div className="space-y-4">
            <p className="text-xs text-[#dfbfbc] leading-relaxed">
              Iniciá sesión con tu cuenta de Google para participar en los debates del Ágora, acceder a las transmisiones en vivo o solicitar acceso al Portal de Elenco.
            </p>

            <button
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-3 active:scale-[0.99]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continuar con Google</span>
            </button>

            <div className="text-center text-[11px] text-[#8a877e] pt-2">
              Los administradores y el elenco autorizado accederán automáticamente a sus privilegios.
            </div>
          </div>
        )}

        {/* Tab 2: Staff join request */}
        {activeTab === "request" && (
          <form onSubmit={handleStaffRequest} className="space-y-3.5">
            {requestSent ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#fabc4d] mx-auto animate-bounce" />
                <h4 className="font-cinzel text-lg font-bold text-[#f7f4eb]">
                  Solicitud Enviada a Dirección
                </h4>
                <p className="text-xs text-[#dfbfbc]">
                  Los administradores de Fiesta Pagana revisarán tu solicitud para darte de alta en el elenco.
                </p>
              </div>
            ) : (
              <>
                {!user && (
                  <div className="p-3 rounded-xl bg-[#9e2a2b]/20 border border-[#9e2a2b] text-xs text-[#ffdad7] space-y-2">
                    <p className="font-semibold">Paso 1: Iniciá sesión con Google para identificar tu solicitud</p>
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full py-2 px-3 rounded-lg bg-white text-neutral-900 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" /> Conectar con Google
                    </button>
                  </div>
                )}

                {user && (
                  <div className="text-xs text-[#efbf67] bg-[#1c1a20] p-2.5 rounded-lg border border-[#58413f]">
                    Solicitud para: <strong>{user.email}</strong> ({profile?.full_name || "Usuario"})
                  </div>
                )}

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                    Rol en la Obra / Departamento
                  </label>
                  <select
                    value={staffRole}
                    onChange={(e) => setStaffRole(e.target.value)}
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-lg px-3 py-2 text-xs text-[#f7f4eb] focus:outline-none focus:border-[#fabc4d]"
                  >
                    <option value="Actor / Actriz / Performer">Actor / Actriz / Performer</option>
                    <option value="Músico / Ensamble Sonoro">Músico / Ensamble Sonoro</option>
                    <option value="Técnico / Iluminación / Sonido">Técnico / Iluminación / Sonido</option>
                    <option value="Vestuario / Caracterización">Vestuario / Caracterización</option>
                    <option value="Dramaturgia / Teatro Foro">Dramaturgia / Teatro Foro</option>
                    <option value="Producción & Logística">Producción & Logística</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                    Nota o Personaje Asignado (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={staffNote}
                    onChange={(e) => setStaffNote(e.target.value)}
                    placeholder="Ej: Interpreto al personaje Argentum / Técnico de luces..."
                    className="w-full bg-[#0b0b0e] border border-[#58413f] rounded-lg px-3 py-2 text-xs text-[#f7f4eb] placeholder-[#8a877e] focus:outline-none focus:border-[#fabc4d]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !user}
                  className="w-full py-2.5 rounded-xl bg-[#fabc4d] disabled:opacity-50 text-[#281900] font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(250,188,77,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  {isSubmitting ? "Enviando..." : "Enviar Solicitud a los Administradores"}
                </button>
              </>
            )}
          </form>
        )}

        {/* Tab 3: Passcode (Ceremonial bypass) */}
        {activeTab === "passcode" && (
          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#dfbfbc] font-semibold mb-2">
                Palabra Clave Ritual
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
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] font-semibold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(158,42,43,0.6)] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#fabc4d]" />
              Validar Clave
            </button>
          </form>
        )}

        {/* Feedback messages */}
        {statusMessage && (
          <div
            className={`mt-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
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
      </div>
    </div>
  );
}
