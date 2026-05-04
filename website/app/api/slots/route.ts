import { NextResponse } from "next/server";
import { listSlots } from "@/lib/reservationStore";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const date = url.searchParams.get("date") || new Date().toISOString().slice(0, 10);

  try {
    const slots = await listSlots(date);
    return NextResponse.json({ date, slots });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Terjadi kesalahan.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
