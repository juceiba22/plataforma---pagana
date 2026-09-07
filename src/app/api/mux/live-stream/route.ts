import { NextResponse } from "next/server";
import { createMuxLiveStream } from "@/lib/mux";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const title = body?.title || "Fiesta Pagana Live Broadcast";

    const { stream, error } = await createMuxLiveStream(title);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ stream });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
