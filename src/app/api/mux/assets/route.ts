import { NextResponse } from "next/server";
import { listMuxRecordedAssets } from "@/lib/mux";

export async function GET() {
  try {
    const { assets, error } = await listMuxRecordedAssets();

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ assets });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
