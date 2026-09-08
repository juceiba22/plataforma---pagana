"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Lock,
  Sparkles,
  UserCheck,
  Shield,
  KeyRound,
  CheckCircle2,
  Theater,
  Music,
  Wrench,
  ArrowLeft,
  ChevronRight,
  LogIn,
  AlertCircle,
  Ticket,
} from "lucide-react";

interface ActorGateProps {
  children: React.ReactNode;
  sectionTitle?: string;
  sectionSubtitle?: string;
}

type RoleType = "actor" | "artista" | "tecnico";

export default function ActorGate({
  children,
  sectionTitle = "Esta sección está restringida exclusivamente al staff de actores",
  sectionSubtitle = "El Portal de Elenco, la Sala de Streaming y el Ágora de Foros son recintos de trabajo, ensayo y debate exclusivos para el equipo actoral, artístico y técnico de Fiesta Pagana.",
}: ActorGateProps) {
  const {
    user,
    profile,
    role,
    isAdmin,
    isStaff,
    isLoading,
    signInWithGoogle,
    requestStaffAccess,
  } = useAuth();

  const [bypassPasscode, setBypassPasscode] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  // Selected role tab for submission
  const [selectedRoleType, setSelectedRoleType] = useState<RoleType | null>(null);
  const [requestRoleTitle, setRequestRoleTitle] = useState("Actor / Actriz / Performer");
  const [requestNote, setRequestNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPasscodeForm, setShowPasscodeForm] = useState(false);

  // Allow access if staff/admin or passcode verified
  const hasAccess = isStaff || isAdmin || bypassPasscode;

  const handleSelectRole = (type: RoleType) => {
    setSelectedRoleType(type);
    setFormError(null);
    if (type === "actor") {
      setRequestRoleTitle("Actor / Actriz / Performer");
    } else if (type === "artista") {
      setRequestRoleTitle("Artista Escénico / Músico / Performer");
    } else if (type === "tecnico") {
      setRequestRoleTitle("Técnico / Iluminación / Sonido / Escenario");
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      // Prompt Google Sign-in if visitor is not logged in
      const res = await signInWithGoogle();
      if (res.error) {
        setFormError("Error al conectar con Google. Por favor, intenta de nuevo.");
      }
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    const res = await requestStaffAccess(requestRoleTitle, requestNote);
    setIsSubmitting(false);

    if (res.success) {
      setRequestSuccess(true);
    } else {
      setFormError(res.error || "No se pudo registrar la solicitud. Intenta nuevamente.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#0b0b0e] text-[#f7f4eb]">
        <div className="w-12 h-12 border-2 border-[#fabc4d] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-cinzel text-xs tracking-widest uppercase text-[#efbf67]">
          Verificando credenciales de elenco...
        </p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center px-4 py-16 bg-[#0b0b0e] text-[#f7f4eb] bg-noise">
        <div className="relative w-full max-w-3xl bg-[#141419] border border-[#fabc4d]/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(158,42,43,0.35)] bg-noise text-center overflow-hidden">
          {/* Ambient Glow Aura */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#9e2a2b]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fabc4d]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Restricted Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9e2a2b]/25 border border-[#9e2a2b] text-[#ffb3ae] text-xs uppercase tracking-[0.18em] font-bold mb-4 shadow-[0_0_15px_rgba(158,42,43,0.3)]">
            <Shield className="w-4 h-4 text-[#fabc4d]" />
            <span>Acceso Exclusivo de Elenco</span>
          </div>

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#9e2a2b]/30 border border-[#fabc4d] flex items-center justify-center text-[#fabc4d] mx-auto mb-5 shadow-[0_0_25px_rgba(250,188,77,0.3)]">
            <Lock className="w-8 h-8 text-[#fabc4d]" />
          </div>

          {/* Mandatory Clear Header Cartel */}
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#f7f4eb] mb-3 leading-tight">
            Esta sección está restringida exclusivamente al staff de actores
          </h2>

          <p className="text-xs sm:text-sm text-[#dfbfbc] leading-relaxed mb-8 max-w-xl mx-auto font-jakarta">
            {sectionSubtitle}
          </p>

          {/* ============================================================ */}
          {/* 3 Prominent Buttons: Postulación por tipo de rol */}
          {/* ============================================================ */}
          <div className="mb-8">
            <div className="text-xs uppercase tracking-widest text-[#efbf67] font-bold mb-3">
              ¿Querés sumarte a la compañía Fiesta Pagana?
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {/* Botón 1: Me quiero sumar como actor */}
              <button
                type="button"
                onClick={() => handleSelectRole("actor")}
                className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 group ${
                  selectedRoleType === "actor"
                    ? "bg-[#fabc4d] text-[#281900] border-[#fabc4d] shadow-[0_0_25px_rgba(250,188,77,0.5)] scale-[1.02]"
                    : "bg-[#1c1a20] border-[#58413f]/60 hover:border-[#fabc4d]/70 text-[#f7f4eb] hover:bg-[#25232a]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    selectedRoleType === "actor"
                      ? "bg-[#281900]/15 text-[#281900]"
                      : "bg-[#9e2a2b]/30 text-[#fabc4d] group-hover:bg-[#9e2a2b]/50"
                  }`}
                >
                  <Theater className="w-5 h-5" />
                </div>
                <span className="font-cinzel text-xs uppercase font-bold tracking-wider leading-snug">
                  Me quiero sumar como actor
                </span>
                <span
                  className={`text-[10px] ${
                    selectedRoleType === "actor" ? "text-[#3f2b09]" : "text-[#dfbfbc]"
                  }`}
                >
                  Actuación & Personajes
                </span>
              </button>

              {/* Botón 2: Me quiero sumar como artista */}
              <button
                type="button"
                onClick={() => handleSelectRole("artista")}
                className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 group ${
                  selectedRoleType === "artista"
                    ? "bg-[#fabc4d] text-[#281900] border-[#fabc4d] shadow-[0_0_25px_rgba(250,188,77,0.5)] scale-[1.02]"
                    : "bg-[#1c1a20] border-[#58413f]/60 hover:border-[#fabc4d]/70 text-[#f7f4eb] hover:bg-[#25232a]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    selectedRoleType === "artista"
                      ? "bg-[#281900]/15 text-[#281900]"
                      : "bg-[#9e2a2b]/30 text-[#fabc4d] group-hover:bg-[#9e2a2b]/50"
                  }`}
                >
                  <Music className="w-5 h-5" />
                </div>
                <span className="font-cinzel text-xs uppercase font-bold tracking-wider leading-snug">
                  Me quiero sumar como artista
                </span>
                <span
                  className={`text-[10px] ${
                    selectedRoleType === "artista" ? "text-[#3f2b09]" : "text-[#dfbfbc]"
                  }`}
                >
                  Músicos, Danza & Performance
                </span>
              </button>

              {/* Botón 3: Me quiero sumar como técnico */}
              <button
                type="button"
                onClick={() => handleSelectRole("tecnico")}
                className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 group ${
                  selectedRoleType === "tecnico"
                    ? "bg-[#fabc4d] text-[#281900] border-[#fabc4d] shadow-[0_0_25px_rgba(250,188,77,0.5)] scale-[1.02]"
                    : "bg-[#1c1a20] border-[#58413f]/60 hover:border-[#fabc4d]/70 text-[#f7f4eb] hover:bg-[#25232a]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    selectedRoleType === "tecnico"
                      ? "bg-[#281900]/15 text-[#281900]"
                      : "bg-[#9e2a2b]/30 text-[#fabc4d] group-hover:bg-[#9e2a2b]/50"
                  }`}
                >
                  <Wrench className="w-5 h-5" />
                </div>
                <span className="font-cinzel text-xs uppercase font-bold tracking-wider leading-snug">
                  Me quiero sumar como técnico
                </span>
                <span
                  className={`text-[10px] ${
                    selectedRoleType === "tecnico" ? "text-[#3f2b09]" : "text-[#dfbfbc]"
                  }`}
                >
                  Luces, Sonido & Montaje
                </span>
              </button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* Formulario de Postulación desplegado según rol seleccionado */}
          {/* ============================================================ */}
          {selectedRoleType && (
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#0e0e11] border border-[#fabc4d]/40 text-left space-y-4 max-w-xl mx-auto shadow-xl animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#58413f]/40 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#fabc4d]" />
                  <span className="font-cinzel text-sm font-bold uppercase tracking-wider text-[#f7f4eb]">
                    Postulación: {requestRoleTitle}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRoleType(null)}
                  className="text-xs text-[#dfbfbc] hover:text-[#fabc4d]"
                >
                  ✕ Cerrar
                </button>
              </div>

              {profile?.status === "pending_staff_approval" || requestSuccess ? (
                <div className="p-4 rounded-xl bg-[#fabc4d]/10 border border-[#fabc4d]/40 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#fabc4d] mx-auto animate-pulse" />
                  <div className="font-cinzel text-sm font-bold text-[#f7f4eb] uppercase tracking-wider">
                    ¡Solicitud de Staff Enviada!
                  </div>
                  <p className="text-xs text-[#dfbfbc]">
                    Tu postulación como{" "}
                    <strong>{profile?.staff_request_role || requestRoleTitle}</strong> fue recibida por la
                    Dirección General de Fiesta Pagana. Serás notificado y dado de alta una vez revisada.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-3.5">
                  {!user ? (
                    <div className="p-3.5 rounded-xl bg-[#9e2a2b]/20 border border-[#9e2a2b] text-xs text-[#ffdad7] space-y-2.5">
                      <p className="font-semibold">
                        Paso 1: Para formalizar tu postulación, iniciá sesión con tu cuenta de Google.
                      </p>
                      <button
                        type="button"
                        onClick={() => signInWithGoogle()}
                        className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                        <span>Conectar con Google para postularme</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs text-[#efbf67] bg-[#1c1a20] p-2.5 rounded-lg border border-[#58413f]">
                      Postulación registrada para: <strong>{user.email}</strong> ({profile?.full_name || "Usuario"})
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                      Categoría de Convocatoria
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={requestRoleTitle}
                      className="w-full bg-[#141419] border border-[#58413f] rounded-lg px-3 py-2 text-xs text-[#fabc4d] font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                      Detalle de experiencia o personaje de interés (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={requestNote}
                      onChange={(e) => setRequestNote(e.target.value)}
                      placeholder="Ej: Formación actoral / Instrumento / Especialidad técnica..."
                      className="w-full bg-[#141419] border border-[#58413f] rounded-lg px-3 py-2 text-xs text-[#f7f4eb] placeholder-[#8a877e] focus:border-[#fabc4d] focus:outline-none"
                    />
                  </div>

                  {formError && (
                    <div className="p-2.5 rounded-lg bg-[#93000a]/30 border border-[#ffb4ab]/40 text-[#ffdad6] text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !user}
                    className="w-full py-3 rounded-xl bg-[#fabc4d] hover:brightness-110 disabled:opacity-50 text-[#281900] font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(250,188,77,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    {isSubmitting ? "Enviando Solicitud..." : "Enviar Postulación a Dirección"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* Zona de Ingreso para Actores Ya Registrados */}
          {/* ============================================================ */}
          <div className="pt-6 border-t border-[#58413f]/40 max-w-xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {!user ? (
                <button
                  type="button"
                  onClick={() => signInWithGoogle()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1f1f22] border border-[#58413f] hover:border-[#fabc4d] text-xs font-semibold uppercase tracking-wider text-[#dfbfbc] hover:text-[#f7f4eb] transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#fabc4d]" />
                  <span>¿Ya sos del elenco? Ingresar con Google</span>
                </button>
              ) : (
                <div className="text-xs text-[#dfbfbc]">
                  Sesión activa: <strong className="text-[#f7f4eb]">{user.email}</strong> (Rol actual: {profile?.role || "Público"})
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowPasscodeForm(!showPasscodeForm)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/5 text-[11px] uppercase tracking-wider text-[#8a877e] hover:text-[#efbf67] transition-all"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Clave de Ensayo</span>
              </button>
            </div>

            {/* Quick rehearsal pass code form */}
            {showPasscodeForm && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const code = passcodeInput.toLowerCase().trim();
                  if (
                    code === "fiestapagana" ||
                    code === "dionisio2025" ||
                    code === "ritual" ||
                    code === "elenco"
                  ) {
                    setBypassPasscode(true);
                  } else {
                    setPasscodeError(true);
                  }
                }}
                className="pt-2 animate-fadeIn"
              >
                <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                  <input
                    type="password"
                    placeholder="Clave de ensayo..."
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value);
                      setPasscodeError(false);
                    }}
                    className="bg-[#0e0e11] border border-[#58413f] rounded-lg px-3 py-1.5 text-xs text-[#f7f4eb] focus:border-[#fabc4d] focus:outline-none w-44"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] text-xs font-semibold uppercase tracking-wider shadow-md"
                  >
                    Validar
                  </button>
                </div>
                {passcodeError && (
                  <span className="text-[10px] text-[#ffb4ab] mt-1.5 block">
                    Clave no válida. Contactá a la producción.
                  </span>
                )}
              </form>
            )}

            {/* Volver a la Landing Page Pública & Entradas */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#dfbfbc] hover:text-[#fabc4d] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a la Página Principal (Apta para Todo Público)</span>
              </Link>

              <a
                href="https://www.alternativateatral.com/obra102861-fiesta-pagana-una-obra-para-rescatarnos-del-olvido"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fabc4d]/10 border border-[#fabc4d]/40 text-[11px] font-bold uppercase tracking-wider text-[#fabc4d] hover:bg-[#fabc4d]/20 transition-colors"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Comprar Entradas</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
