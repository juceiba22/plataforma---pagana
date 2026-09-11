export interface MuxLiveStream {
  id: string;
  status: "idle" | "active" | "disabled";
  stream_key: string;
  playback_ids: { id: string; policy: string }[];
  rtmp_url: string;
  created_at: string;
  recent_asset_ids?: string[];
}

export interface MuxAsset {
  id: string;
  playback_id: string;
  status: "ready" | "preparing" | "errored";
  duration: number;
  created_at: string;
  title: string;
  aspect_ratio?: string;
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
export async function createMuxLiveStream(title: string = "Fiesta Pagana Live Broadcast"): Promise<{
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
          passthrough: title,
        },
        reconnect_window: 60,
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      return { stream: null, error: errData?.error?.message || "Error creating Mux live stream" };
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
    const res = await fetch(`${MUX_API_BASE}/assets?limit=25`, {
      headers: {
        Authorization: auth,
      },
    });

    if (!res.ok) {
      return { assets: [], error: "No se pudieron obtener los assets de Mux" };
    }

    const json = await res.json();
    const assets: MuxAsset[] = (json.data || []).map((a: any) => ({
      id: a.id,
      playback_id: a.playback_ids?.[0]?.id || "",
      status: a.status,
      duration: a.duration || 0,
      created_at: new Date(Number(a.created_at) * 1000).toISOString(),
      title: a.passthrough || "Grabación de Transmisión",
      aspect_ratio: a.aspect_ratio,
    }));

    return { assets, error: null };
  } catch (err: any) {
    return { assets: [], error: err.message };
  }
}
