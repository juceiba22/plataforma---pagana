"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Lock, Sparkles, UserCheck, Shield, KeyRound, CheckCircle2 } from "lucide-react";
import AccessModal from "./AccessModal";

interface ActorGateProps {
  children: React.ReactNode;
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export default function ActorGate({
  children,
  sectionTitle = "Recinto Reservado para Actores & Elenco",
  sectionSubtitle = "Este espacio es de acceso exclusivo para el elenco, músicos, cuerpo de baile y equipo técnico de Fiesta Pagana.",
}: ActorGateProps) {
  const { user, profile, role, isAdmin, isStaff, isLoading, signInWithGoogle, requestStaffAccess } =
    useAuth();

  const [bypassPasscode, setBypassPasscode] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  // Staff request form state
  const [requestedRole, setRequestedRole] = useState("Actor / Actriz / Performer");
  const [requestNote, setRequestNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Allow access if staff/admin or passcode verified
  const hasAccess = isStaff || isAdmin || bypassPasscode;

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
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#0b0b0e] text-[#f7f4eb] bg-noise">
        <div className="relative w-full max-w-xl bg-[#141419] border border-[#fabc4d]/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(158,42,43,0.3)] bg-noise text-center overflow-hidden">
          {/* Ambient light */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#9e2a2b]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#9e2a2b]/30 border border-[#fabc4d] flex items-center justify-center text-[#fabc4d] mx-auto mb-6 shadow-[0_0_20px_rgba(250,188,77,0.3)]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9e2a2b]/20 border border-[#9e2a2b] text-[#ffb3ae] text-xs uppercase tracking-widest font-bold mb-3">
            <Shield className="w-3.5 h-3.5 text-[#fabc4d]" />
            <span>Exclusivo para Elenco</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#f7f4eb] mb-2">
            {sectionTitle}
          </h2>

          <p className="text-xs sm:text-sm text-[#dfbfbc] leading-relaxed mb-8 max-w-md mx-auto">
            {sectionSubtitle}
          </p>

          {!user ? (
            /* Logged out visitor */
            <div className="space-y-4">
              <button
                onClick={() => signInWithGoogle()}
                className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all flex items-center justify-center gap-3 active:scale-[0.99]"
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
                <span>Ingresar como Actor / Elenco con Google</span>
              </button>

              <div className="text-[11px] text-[#8a877e]">
                Los actores autorizados y directores acceden automáticamente al iniciar sesión.
              </div>
            </div>
          ) : (
            /* Logged in as Public - request staff status */
            <div className="bg-[#0e0e11] border border-[#58413f] rounded-2xl p-5 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-[#58413f]/40 pb-3">
                <div>
                  <div className="text-xs text-[#8a877e]">Sesión iniciada como:</div>
                  <div className="text-sm font-semibold text-[#f7f4eb]">{user.email}</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-white/10 text-[#dfbfbc] text-[10px] font-bold uppercase tracking-wider">
                  Rol: Público
                </span>
              </div>

              {profile?.status === "pending_staff_approval" || requestSuccess ? (
                <div className="p-4 rounded-xl bg-[#fabc4d]/10 border border-[#fabc4d]/40 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#fabc4d] mx-auto animate-pulse" />
                  <div className="font-cinzel text-sm font-bold text-[#f7f4eb] uppercase tracking-wider">
                    Solicitud de Actor en Revisión
                  </div>
                  <p className="text-xs text-[#dfbfbc]">
                    Tu solicitud para ingresar como <strong>{profile?.staff_request_role || requestedRole}</strong> fue enviada a la Dirección General.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    const res = await requestStaffAccess(requestedRole, requestNote);
                    setIsSubmitting(false);
                    if (res.success) {
                      setRequestSuccess(true);
                    }
                  }}
                  className="space-y-3"
                >
                  <div className="text-xs text-[#efbf67] font-semibold">
                    ¿Sos actor, performer o parte del equipo artístico? Solicitá tu alta de elenco:
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                      Personaje / Rol en la Obra
                    </label>
                    <select
                      value={requestedRole}
                      onChange={(e) => setRequestedRole(e.target.value)}
                      className="w-full bg-[#141419] border border-[#58413f] rounded-lg px-3 py-2 text-xs text-[#f7f4eb] focus:border-[#fabc4d]"
                    >
                      <option value="Actor / Actriz / Performer">Actor / Actriz / Performer</option>
                      <option value="Bailarina / Cuerpo de Baile">Bailarina / Cuerpo de Baile (Chola / Tanguera)</option>
                      <option value="Músico / Ensamble Sonoro">Músico / Ensamble Sonoro</option>
                      <option value="Sahumadora / Ritual">Sahumadora / Ritual</option>
                      <option value="Técnico / Escenografía / Luces">Técnico / Escenografía / Luces</option>
                      <option value="Dramaturgia / Dirección">Dramaturgia / Dirección</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#dfbfbc] font-semibold mb-1">
                      Nombre de Personaje o Detalle
                    </label>
                    <input
                      type="text"
                      value={requestNote}
                      onChange={(e) => setRequestNote(e.target.value)}
                      placeholder="Ej: Personaje La Chola / Gabriel / José Mercado..."
                      className="w-full bg-[#141419] border border-[#58413f] rounded-lg px-3 py-2 text-xs text-[#f7f4eb] placeholder-[#8a877e] focus:border-[#fabc4d]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-xl bg-[#fabc4d] hover:brightness-110 text-[#281900] font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(250,188,77,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    {isSubmitting ? "Enviando Solicitud..." : "Enviar Solicitud de Elenco"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Quick pass bypass for actors testing */}
          <div className="mt-8 pt-4 border-t border-[#58413f]/30">
            <span className="text-[11px] text-[#8a877e] block mb-2">
              ¿Tenés la clave de ensayo de la producción?
            </span>
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
              className="flex items-center justify-center gap-2 max-w-xs mx-auto"
            >
              <input
                type="password"
                placeholder="Clave de ensayo..."
                value={passcodeInput}
                onChange={(e) => {
                  setPasscodeInput(e.target.value);
                  setPasscodeError(false);
                }}
                className="bg-[#0e0e11] border border-[#58413f] rounded-lg px-3 py-1.5 text-xs text-[#f7f4eb] focus:border-[#fabc4d] w-40"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-lg bg-[#9e2a2b] hover:bg-[#c1383a] text-[#f7f4eb] text-xs font-semibold uppercase tracking-wider shadow-md"
              >
                Validar
              </button>
            </form>
            {passcodeError && (
              <span className="text-[10px] text-[#ffb4ab] mt-1.5 block">
                Clave no válida. Contactá a la producción.
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
