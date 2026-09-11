export interface MuxLiveStream {
  id: string;
  status: "idle" | "active" | "disabled";
  stream_key: string;
  playback_ids: { id: string; policy: string }[];
  rtmp_url: string;
  created_at: string;
  recent_asset_ids?: string[];
  title?: string;
  subtitle?: string;
  category?: string;
}

export interface MuxAsset {
  id: string;
  playback_id: string;
  status: "ready" | "preparing" | "errored";
  duration: number;
  created_at: string;
  title: string;
  subtitle?: string;
  category?: string;
  aspect_ratio?: string;
}

export interface CreateStreamOptions {
  title: string;
  subtitle?: string;
  category?: string;
}

const MUX_API_BASE = "https://api.mux.com/video/v1";

/**
 * Returns Mux Basic Auth header if env tokens are configured
 */
function getMuxAuthHeader() {
  const tokenId = process.env.MUX_TOKEN_ID;
  const tokenSecret = process.env.MUX_TOKEN_SECRET;

  if (!tokenId || !tokenSecret) return null;
  const credentials = Buffer.from(`${tokenId}:${tokenSecret}`).toString("base64");
  return `Basic ${credentials}`;
}

/**
 * Create a new live stream on Mux with automatic VOD recording
 */
export async function createMuxLiveStream(options: CreateStreamOptions | string = "Fiesta Pagana Live Broadcast"): Promise<{
  stream: MuxLiveStream | null;
  error: string | null;
}> {
  const auth = getMuxAuthHeader();

  if (!auth) {
    return {
      stream: null,
      error:
        "Faltan configurar MUX_TOKEN_ID y MUX_TOKEN_SECRET en las variables de entorno (.env.local o Vercel). Puedes generarlas en dashboard.mux.com/settings/access-tokens o ingresar tus claves de OBS manualmente.",
    };
  }

  const title = typeof options === "string" ? options : options.title || "Fiesta Pagana - Transmisión en Directo";
  const subtitle = typeof options === "object" ? options.subtitle || "" : "";
  const category = typeof options === "object" ? options.category || "ensayos" : "ensayos";

  const passthroughPayload = JSON.stringify({
    title,
    subtitle,
    category,
    created_at: new Date().toISOString(),
  });

  try {
    const res = await fetch(`${MUX_API_BASE}/live-streams`, {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playback_policy: ["public"],
        new_asset_settings: {
          playback_policy: ["public"],
        },
        passthrough: passthroughPayload,
        reconnect_window: 60,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      const muxMessage =
        (Array.isArray(errData?.error?.messages) ? errData.error.messages.join(". ") : null) ||
        errData?.error?.message ||
        errData?.message ||
        (errData ? JSON.stringify(errData) : `HTTP ${res.status}: ${res.statusText}`);
      return { stream: null, error: `Mux API Error (${res.status}): ${muxMessage}` };
    }

    const json = await res.json();
    const data = json.data;

    return {
      stream: {
        id: data.id,
        status: data.status,
        stream_key: data.stream_key,
        playback_ids: data.playback_ids || [],
        rtmp_url: "rtmps://global-live.mux.com:443/app",
        created_at: data.created_at,
        recent_asset_ids: data.recent_asset_ids,
        title,
        subtitle,
        category,
      },
      error: null,
    };
  } catch (err: any) {
    return { stream: null, error: err.message };
  }
}

/**
 * List recorded VOD assets from Mux
 */
export async function listMuxRecordedAssets(): Promise<{
  assets: MuxAsset[];
  error: string | null;
}> {
  const auth = getMuxAuthHeader();

  if (!auth) {
    return {
      assets: [],
      error: null,
    };
  }

  try {
    const res = await fetch(`${MUX_API_BASE}/assets?limit=30`, {
      headers: {
        Authorization: auth,
      },
    });

    if (!res.ok) {
      return { assets: [], error: "No se pudieron obtener los assets de Mux" };
    }

    const json = await res.json();
    const assets: MuxAsset[] = (json.data || []).map((a: any) => {
      let title = "Transmisión en Diferido";
      let subtitle = "";
      let category = "ensayos";

      if (a.passthrough) {
        try {
          const parsed = JSON.parse(a.passthrough);
          if (parsed.title) title = parsed.title;
          if (parsed.subtitle) subtitle = parsed.subtitle;
          if (parsed.category) category = parsed.category;
        } catch {
          title = a.passthrough;
        }
      }

      return {
        id: a.id,
        playback_id: a.playback_ids?.[0]?.id || "",
        status: a.status,
        duration: a.duration || 0,
        created_at: new Date(Number(a.created_at) * 1000).toISOString(),
        title,
        subtitle,
        category,
        aspect_ratio: a.aspect_ratio,
      };
    });

    return { assets, error: null };
  } catch (err: any) {
    return { assets: [], error: err.message };
  }
}
