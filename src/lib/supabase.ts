import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tjvjymmirgnbyijqzgwm.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdmp5bW1pcmduYnlpanF6Z3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MTAwODYsImV4cCI6MjEwNDM4NjA4Nn0.8se465z8HLRaa2avdR-LjmXLnfxqUXObTmqHPTbliJM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const BUCKET_NAME =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "fiesta-pagana";

/**
 * Upload a file directly to Supabase Storage
 */
export async function uploadImageToSupabase(
  file: File,
  folder: string = "elenco"
): Promise<{ url: string | null; error: string | null }> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Supabase Storage upload error:", error);
      return { url: null, error: error.message };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

    return { url: publicUrl, error: null };
  } catch (err: any) {
    console.error("Upload error:", err);
    return { url: null, error: err.message || "Error al subir imagen" };
  }
}
