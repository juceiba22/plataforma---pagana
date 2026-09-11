import { NextResponse } from "next/server";
import { createMuxLiveStream } from "@/lib/mux";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const title = body?.title || "Fiesta Pagana - Transmisión en Directo";
    const subtitle = body?.subtitle || "";
    const category = body?.category || "ensayos";

    const { stream, error } = await createMuxLiveStream({ title, subtitle, category });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ stream, title, subtitle, category });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
