import { supabase, BUCKET_NAME } from "./supabase";

export interface BroadcastVideo {
  id: string;
  title: string;
  description: string;
  category: "ensayos" | "masterclass" | "puesta_en_escena" | "musica" | "ritual";
  category_label?: string;
  video_url: string;
  storage_path?: string;
  duration?: string;
  file_size?: number;
  created_at: string;
  recorded_by?: string;
  thumbnail_url?: string;
}

const LOCAL_STORAGE_KEY = "pagana_hosted_videos";

const INITIAL_HOSTED_VIDEOS: BroadcastVideo[] = [
  {
    id: "init-1",
    title: "Ensayo General de Puesta en Escena • Escenas 1 a 5",
    description: "Registro audiovisual del ensayo en penumbras. Monólogos de Gabriel, La Madre y entrada del Niño con el código 616.",
    category: "ensayos",
    category_label: "Ensayo General",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "01:45:20",
    file_size: 450000000,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    recorded_by: "Dirección General",
  },
  {
    id: "init-2",
    title: "Masterclass: Leopoldo Marechal y la Batalla Celeste",
    description: "Análisis hermenéutico y trabajo corporal sobre la poética de Marechal, el grotesco criollo y el secreto de Argentum.",
    category: "masterclass",
    category_label: "Masterclass & Teórica",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "02:10:15",
    file_size: 580000000,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    recorded_by: "Curaduría Psicomágica",
  },
];

/**
 * Format bytes to readable string (e.g. 45.2 MB)
 */
export function formatBytes(bytes?: number): string {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Uploads a video file directly to Supabase Storage in 'transmisiones/' folder
 */
export async function uploadBroadcastVideoToSupabase(
  file: File,
  metadata: {
    title: string;
    description: string;
    category: BroadcastVideo["category"];
    recordedBy?: string;
    duration?: string;
  }
): Promise<{ video: BroadcastVideo | null; error: string | null }> {
  try {
    const fileExt = file.name.split(".").pop() || "mp4";
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `transmisiones/${Date.now()}-${cleanName}`;

    // 1. Upload file to Supabase Storage bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type || "video/mp4",
      });

    if (uploadError) {
      console.error("Supabase Storage video upload error:", uploadError);
      return { video: null, error: uploadError.message };
    }

    // 2. Get the public URL for video playback
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

    // 3. Prepare video metadata object
    const newVideo: BroadcastVideo = {
      id: `vid_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: metadata.title || file.name,
      description: metadata.description || "Transmisión grabada y alojada en Supabase Storage.",
      category: metadata.category || "ensayos",
      category_label: getCategoryLabel(metadata.category),
      video_url: publicUrl,
      storage_path: filePath,
      file_size: file.size,
      duration: metadata.duration || "Grabación Completa",
      created_at: new Date().toISOString(),
      recorded_by: metadata.recordedBy || "Dirección de Transmisión",
    };

    // 4. Persist record to Supabase Database (with local storage fallback)
    try {
      const { error: dbError } = await supabase
        .from("pagana_broadcast_videos")
        .insert([newVideo]);

      if (dbError) {
        console.warn("DB insert fallback to localStorage:", dbError.message);
      }
    } catch (e) {
      console.warn("Database table not present, saving to local state fallback", e);
    }

    // Save to localStorage cache as well for instant UI responsiveness
    saveToLocalCache(newVideo);

    return { video: newVideo, error: null };
  } catch (err: any) {
    console.error("uploadBroadcastVideoToSupabase exception:", err);
    return { video: null, error: err.message || "Error al subir video a Supabase Storage" };
  }
}

/**
 * Fetches all hosted broadcast videos from Supabase table or local cache
 */
export async function fetchHostedBroadcastVideos(): Promise<BroadcastVideo[]> {
  try {
    // 1. Try fetching from Supabase Database
    const { data, error } = await supabase
      .from("pagana_broadcast_videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      const dbVideos: BroadcastVideo[] = data.map((item: any) => ({
        ...item,
        category_label: getCategoryLabel(item.category),
      }));
      // Merge with any offline local cache
      const cached = getLocalCache();
      const mergedMap = new Map<string, BroadcastVideo>();
      INITIAL_HOSTED_VIDEOS.forEach((v) => mergedMap.set(v.id, v));
      cached.forEach((v) => mergedMap.set(v.id, v));
      dbVideos.forEach((v) => mergedMap.set(v.id, v));
      return Array.from(mergedMap.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  } catch (err) {
    console.warn("Error fetching broadcast videos from DB, using cache fallback", err);
  }

  // 2. Fallback to storage listing & local cache
  const cached = getLocalCache();
  if (cached.length > 0) {
    return cached;
  }

  return INITIAL_HOSTED_VIDEOS;
}

/**
 * Delete a broadcast video from Supabase Storage and DB
 */
export async function deleteHostedBroadcastVideo(
  id: string,
  storagePath?: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    if (storagePath) {
      await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
    }

    try {
      await supabase.from("pagana_broadcast_videos").delete().eq("id", id);
    } catch (e) {
      // Ignored if table not created
    }

    removeFromLocalCache(id);
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err.message || "Error al eliminar video" };
  }
}

function getCategoryLabel(cat: string): string {
  switch (cat) {
    case "ensayos":
      return "Ensayo General";
    case "masterclass":
      return "Masterclass & Teórica";
    case "puesta_en_escena":
      return "Puesta en Escena";
    case "musica":
      return "Ensamble Sonoro";
    case "ritual":
      return "Ritual & Trance";
    default:
      return "Transmisión";
  }
}

function getLocalCache(): BroadcastVideo[] {
  if (typeof window === "undefined") return INITIAL_HOSTED_VIDEOS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return INITIAL_HOSTED_VIDEOS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_HOSTED_VIDEOS;
  } catch {
    return INITIAL_HOSTED_VIDEOS;
  }
}

function saveToLocalCache(video: BroadcastVideo) {
  if (typeof window === "undefined") return;
  try {
    const current = getLocalCache();
    const updated = [video, ...current.filter((v) => v.id !== video.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Error writing video to localStorage:", e);
  }
}

function removeFromLocalCache(id: string) {
  if (typeof window === "undefined") return;
  try {
    const current = getLocalCache();
    const updated = current.filter((v) => v.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Error removing video from localStorage:", e);
  }
}