"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  UserCheck,
  UserX,
  Sparkles,
  Users,
  CheckCircle,
  AlertCircle,
  Crown,
  Clock,
  RefreshCw,
} from "lucide-react";
import { useAuth, PaganaProfile, PaganaRole } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

export default function StaffApprovalPanel() {
  const { isAdmin, approveStaffMember } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<PaganaProfile[]>([]);
  const [allProfiles, setAllProfiles] = useState<PaganaProfile[]>([]);
  const [activeTab, setActiveTab] = useState<"pending" | "all">("pending");
  const [isLoading, setIsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("pagana_profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setAllProfiles(data as PaganaProfile[]);
        setPendingUsers(
          (data as PaganaProfile[]).filter((u) => u.status === "pending_staff_approval")
        );
      }
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  if (!isAdmin) return null;

  const handleApprove = async (
    userId: string,
    roleToAssign: PaganaRole = "staff",
    department: string = "Elenco"
  ) => {
    const result = await approveStaffMember(userId, roleToAssign, department);
    if (result.success) {
      setActionMessage({
        type: "success",
        text: `Usuario dado de alta exitosamente como ${roleToAssign.toUpperCase()} (${department}).`,
      });
      await loadUsers();
    } else {
      setActionMessage({
        type: "error",
        text: result.error || "Error al actualizar rol.",
      });
    }
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleReject = async (userId: string) => {
    try {
      await supabase
        .from("pagana_profiles")
        .update({
          status: "active",
          role: "public",
          staff_request_role: null,
          staff_request_note: null,
        })
        .eq("id", userId);

      setActionMessage({
        type: "success",
        text: "Solicitud desestimada. El usuario permanece con rol Público.",
      });
      await loadUsers();
    } catch (err: any) {
      setActionMessage({
        type: "error",
        text: err.message || "Error al desestimar.",
      });
    }
    setTimeout(() => setActionMessage(null), 4000);
  };

  return (
    <div className="bg-[#141419] border border-[#fabc4d]/40 rounded-2xl p-5 sm:p-6 mb-8 shadow-[0_0_30px_rgba(250,188,77,0.15)] bg-noise relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#9e2a2b]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#58413f]/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#9e2a2b]/30 border border-[#fabc4d] flex items-center justify-center text-[#fabc4d]">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-cinzel text-lg sm:text-xl font-bold uppercase tracking-wider text-[#f7f4eb]">
                Panel de Dirección • Alta de Staff & Elenco
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#9e2a2b] text-[#fabc4d] text-[10px] font-bold uppercase">
                Admin
              </span>
            </div>
            <p className="text-xs text-[#efbf67]">
              Aprobación de actores, músicos y equipo técnico que se loguean en la plataforma.
            </p>
          </div>
        </div>

        <button
          onClick={loadUsers}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f1f22] border border-[#58413f] hover:border-[#fabc4d] text-[#dfbfbc] hover:text-[#f7f4eb] text-xs font-semibold transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#fabc4d]" : ""}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Action status message */}
      {actionMessage && (
        <div
          className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
            actionMessage.type === "success"
              ? "bg-emerald-950/60 border border-emerald-500/50 text-emerald-200"
              : "bg-[#93000a]/30 border border-[#ffb4ab]/40 text-[#ffdad6]"
          }`}
        >
          {actionMessage.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-[#ffb4ab]" />
          )}
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === "pending"
              ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_15px_rgba(158,42,43,0.5)] border border-white/10"
              : "bg-[#1f1f22] text-[#dfbfbc] hover:text-[#f7f4eb] border border-[#58413f]/40"
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-[#fabc4d]" />
          <span>Solicitudes Pendientes</span>
          {pendingUsers.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-[#fabc4d] text-[#281900] text-[10px] font-bold">
              {pendingUsers.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === "all"
              ? "bg-[#9e2a2b] text-[#f7f4eb] shadow-[0_0_15px_rgba(158,42,43,0.5)] border border-white/10"
              : "bg-[#1f1f22] text-[#dfbfbc] hover:text-[#f7f4eb] border border-[#58413f]/40"
          }`}
        >
          <Users className="w-3.5 h-3.5 text-[#efbf67]" />
          <span>Todos los Usuarios ({allProfiles.length})</span>
        </button>
      </div>

      {/* Tab 1: Pending Requests */}
      {activeTab === "pending" && (
        <div className="space-y-3">
          {pendingUsers.length === 0 ? (
            <div className="py-8 text-center bg-[#0e0e11] rounded-xl border border-[#58413f]/40 text-xs text-[#8a877e]">
              No hay solicitudes pendientes de alta en este momento. Cuando un actor o integrante del staff se loguee y solicite unirse, aparecerá aquí para ser aprobado.
            </div>
          ) : (
            pendingUsers.map((userReq) => (
              <div
                key={userReq.id}
                className="bg-[#0e0e11] border border-[#58413f] hover:border-[#fabc4d]/60 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-start gap-3.5">
                  {userReq.avatar_url ? (
                    <img
                      src={userReq.avatar_url}
                      alt={userReq.full_name || "Usuario"}
                      className="w-11 h-11 rounded-full object-cover border border-[#fabc4d]/50 shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#9e2a2b]/30 border border-[#fabc4d]/40 flex items-center justify-center text-[#fabc4d] font-bold shrink-0">
                      {userReq.full_name?.charAt(0) || userReq.email?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-sm text-[#f7f4eb]">
                        {userReq.full_name || userReq.email.split("@")[0]}
                      </h4>
                      <span className="text-xs text-[#efbf67] bg-[#fabc4d]/10 px-2 py-0.5 rounded border border-[#fabc4d]/30 font-medium">
                        Solicita: {userReq.staff_request_role || "Staff"}
                      </span>
                    </div>

                    <div className="text-xs text-[#8a877e] mt-0.5">{userReq.email}</div>

                    {userReq.staff_request_note && (
                      <div className="mt-2 text-xs text-[#dfbfbc] bg-[#141419] p-2 rounded-lg border border-[#58413f]/40">
                        <span className="text-[#fabc4d] font-semibold">Nota:</span> &ldquo;{userReq.staff_request_note}&rdquo;
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                  <button
                    onClick={() =>
                      handleApprove(
                        userReq.id,
                        "staff",
                        userReq.staff_request_role?.includes("Músico")
                          ? "Música & Sonido"
                          : userReq.staff_request_role?.includes("Técnico")
                          ? "Iluminación & Técnica"
                          : userReq.staff_request_role?.includes("Vestuario")
                          ? "Vestuario"
                          : "Elenco"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#fabc4d] text-[#281900] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_12px_rgba(250,188,77,0.3)] transition-all"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Dar de Alta en Staff</span>
                  </button>

                  <button
                    onClick={() => handleReject(userReq.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1f1f22] hover:bg-[#9e2a2b]/20 text-[#dfbfbc] hover:text-[#ffb3ae] text-xs font-semibold transition-all border border-[#58413f]"
                    title="Desestimar solicitud"
                  >
                    <UserX className="w-3.5 h-3.5" />
                    <span>Rechazar</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: All Profiles */}
      {activeTab === "all" && (
        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {allProfiles.map((p) => (
            <div
              key={p.id}
              className="bg-[#0e0e11] border border-[#58413f]/60 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                {p.avatar_url ? (
                  <img
                    src={p.avatar_url}
                    alt={p.full_name || ""}
                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 font-bold">
                    {p.full_name?.charAt(0) || p.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#f7f4eb]">
                      {p.full_name || p.email.split("@")[0]}
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${
                        p.role === "admin"
                          ? "bg-[#9e2a2b] text-[#fabc4d]"
                          : p.role === "staff"
                          ? "bg-[#fabc4d]/20 text-[#fabc4d]"
                          : "bg-white/10 text-[#dfbfbc]"
                      }`}
                    >
                      {p.role}
                    </span>
                  </div>
                  <span className="text-[#8a877e] text-[11px]">{p.email} • {p.department || "Sin Dpto"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {p.role !== "admin" && (
                  <select
                    value={p.role}
                    onChange={(e) => handleApprove(p.id, e.target.value as PaganaRole, p.department || "Elenco")}
                    className="bg-[#141419] border border-[#58413f] text-[#dfbfbc] rounded-lg px-2 py-1 text-xs focus:border-[#fabc4d]"
                  >
                    <option value="public">Público</option>
                    <option value="staff">Staff / Elenco</option>
                    <option value="admin">Administrador</option>
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
