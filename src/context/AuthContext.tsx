"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type PaganaRole = "admin" | "staff" | "public";

export interface PaganaProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: PaganaRole;
  department: string | null;
  status: "active" | "pending_staff_approval";
  staff_request_role?: string | null;
  staff_request_note?: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: PaganaProfile | null;
  role: PaganaRole | null;
  isAdmin: boolean;
  isStaff: boolean;
  isPublic: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  requestStaffAccess: (requestedRole: string, note: string) => Promise<{ success: boolean; error: string | null }>;
  approveStaffMember: (targetUserId: string, newRole: PaganaRole, department?: string) => Promise<{ success: boolean; error: string | null }>;
  fetchPendingStaffRequests: () => Promise<PaganaProfile[]>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<PaganaProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProfile = async (userId: string, userEmail?: string): Promise<PaganaProfile | null> => {
    try {
      const { data, error } = await supabase
        .from("pagana_profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching pagana profile:", error);
        return null;
      }

      if (data) {
        return data as PaganaProfile;
      }

      // If record doesn't exist yet, insert fallback
      const isAdminEmail =
        userEmail &&
        ["ninioancestral@gmail.com", "memesdecoloniales@gmail.com"].includes(
          userEmail.toLowerCase()
        );

      const newProfile: Partial<PaganaProfile> = {
        id: userId,
        email: userEmail || "",
        role: isAdminEmail ? "admin" : "public",
        department: isAdminEmail ? "Dirección General" : "Comunidad",
        status: "active",
      };

      const { data: insertedData, error: insertError } = await supabase
        .from("pagana_profiles")
        .insert(newProfile)
        .select()
        .single();

      if (insertError) {
        console.error("Error creating fallback profile:", insertError);
        return null;
      }

      return insertedData as PaganaProfile;
    } catch (err) {
      console.error("fetchProfile exception:", err);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (!user) {
      setProfile(null);
      return;
    }
    const prof = await fetchProfile(user.id, user.email);
    setProfile(prof);
  };

  useEffect(() => {
    let isMounted = true;

    // 1. Initial Session Check
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user && isMounted) {
          setUser(session.user);
          const prof = await fetchProfile(session.user.id, session.user.email);
          if (isMounted) setProfile(prof);
        } else if (isMounted) {
          setUser(null);
          setProfile(null);
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initializeAuth();

    // 2. Auth State Listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      if (session?.user) {
        setUser(session.user);
        const prof = await fetchProfile(session.user.id, session.user.email);
        if (isMounted) {
          setProfile(prof);
          setIsLoading(false);
        }
      } else {
        setUser(null);
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/portal`
          : undefined;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      return { error };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const requestStaffAccess = async (
    requestedRole: string,
    note: string
  ): Promise<{ success: boolean; error: string | null }> => {
    if (!user) {
      return { success: false, error: "Debes iniciar sesión con Google para solicitar unirte al Staff." };
    }

    try {
      const { data, error } = await supabase.rpc("request_staff_access", {
        requested_role: requestedRole,
        request_note: note,
      });

      if (error) {
        // Fallback direct update if RPC fails
        const { error: updateError } = await supabase
          .from("pagana_profiles")
          .update({
            status: "pending_staff_approval",
            staff_request_role: requestedRole,
            staff_request_note: note,
          })
          .eq("id", user.id);

        if (updateError) {
          return { success: false, error: updateError.message };
        }
      }

      await refreshProfile();
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message || "Error al enviar solicitud" };
    }
  };

  const approveStaffMember = async (
    targetUserId: string,
    newRole: PaganaRole,
    department: string = "Elenco"
  ): Promise<{ success: boolean; error: string | null }> => {
    try {
      const { data, error } = await supabase.rpc("set_user_pagana_role", {
        target_user_id: targetUserId,
        new_role: newRole,
        new_department: department,
      });

      if (error) {
        // Fallback update
        const { error: updateError } = await supabase
          .from("pagana_profiles")
          .update({
            role: newRole,
            department: department,
            status: "active",
          })
          .eq("id", targetUserId);

        if (updateError) {
          return { success: false, error: updateError.message };
        }
      }

      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message || "Error al actualizar rol" };
    }
  };

  const fetchPendingStaffRequests = async (): Promise<PaganaProfile[]> => {
    try {
      const { data, error } = await supabase
        .from("pagana_profiles")
        .select("*")
        .eq("status", "pending_staff_approval")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching pending staff:", error);
        return [];
      }

      return (data || []) as PaganaProfile[];
    } catch (err) {
      console.error("fetchPendingStaffRequests error:", err);
      return [];
    }
  };

  const role = profile?.role || (user ? "public" : null);
  const isAdmin = role === "admin";
  const isStaff = role === "staff" || role === "admin";
  const isPublic = role === "public";

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role,
        isAdmin,
        isStaff,
        isPublic,
        isLoading,
        signInWithGoogle,
        signOut,
        requestStaffAccess,
        approveStaffMember,
        fetchPendingStaffRequests,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
