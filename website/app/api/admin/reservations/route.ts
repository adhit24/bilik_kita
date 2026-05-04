import { NextResponse } from "next/server";
import { listReservations, updateReservationStatus } from "@/lib/reservationStore";

function isAuthorized(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return { ok: false, error: "ADMIN_PASSWORD belum diset di environment." };
  const got = req.headers.get("x-admin-password") || "";
  if (got !== expected) return { ok: false, error: "Unauthorized." };
  return { ok: true as const };
}

export async function GET(req: Request) {
  const auth = isAuthorized(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  const url = new URL(req.url);
  const date = url.searchParams.get("date") || undefined;
  const status = (url.searchParams.get("status") || undefined) as
    | "pending"
    | "confirmed"
    | "cancelled"
    | "completed"
    | undefined;
  const q = url.searchParams.get("q") || undefined;

  try {
    const items = await listReservations({ date, status, q });
    return NextResponse.json({ reservations: items });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Terjadi kesalahan.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  const auth = isAuthorized(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const id = String(body.id ?? "");
    const status = String(body.status ?? "") as "pending" | "confirmed" | "cancelled" | "completed";
    if (!id) return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return NextResponse.json({ error: "Status tidak valid." }, { status: 400 });
    }
    const updated = await updateReservationStatus(id, status);
    return NextResponse.json({ reservation: updated });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Terjadi kesalahan.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
