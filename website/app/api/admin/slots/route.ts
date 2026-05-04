import { NextResponse } from "next/server";
import { upsertSlotCapacity } from "@/lib/reservationStore";

function isAuthorized(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return { ok: false, error: "ADMIN_PASSWORD belum diset di environment." };
  const got = req.headers.get("x-admin-password") || "";
  if (got !== expected) return { ok: false, error: "Unauthorized." };
  return { ok: true as const };
}

export async function PATCH(req: Request) {
  const auth = isAuthorized(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  try {
    const body = (await req.json()) as Record<string, unknown>;
    await upsertSlotCapacity({
      date: String(body.date ?? ""),
      time: String(body.time ?? ""),
      capacity: Number(body.capacity ?? 0),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Terjadi kesalahan.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
