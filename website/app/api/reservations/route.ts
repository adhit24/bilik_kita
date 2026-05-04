import { NextResponse } from "next/server";
import {
  buildWhatsAppCustomerMessage,
  createReservation,
  listReservations,
} from "@/lib/reservationStore";

const BUSINESS_WA = "6282130728924";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const result = await createReservation({
      category: (body.category === "event" ? "event" : "cafe") as "cafe" | "event",
      eventTitle: body.eventTitle ? String(body.eventTitle) : undefined,
      name: String(body.name ?? ""),
      phone: String(body.phone ?? ""),
      email: body.email ? String(body.email) : undefined,
      date: String(body.date ?? ""),
      time: String(body.time ?? ""),
      pax: Number(body.pax ?? 0),
      notes: body.notes ? String(body.notes) : undefined,
      occasionType: body.occasionType ? (body.occasionType as any) : undefined,
      organizerName: body.organizerName ? String(body.organizerName) : undefined,
      budgetRange: body.budgetRange ? (body.budgetRange as any) : undefined,
      technicalNeeds: Array.isArray(body.technicalNeeds) ? body.technicalNeeds.map(String) : undefined,
      referralSource: body.referralSource ? (body.referralSource as any) : undefined,
    });

    const msg = buildWhatsAppCustomerMessage(result.reservation);
    const waLink = `https://wa.me/${BUSINESS_WA}?text=${encodeURIComponent(msg)}`;

    return NextResponse.json({
      reservation: result.reservation,
      waLink,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Terjadi kesalahan.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const phone = url.searchParams.get("phone") || "";
  const bookingId = url.searchParams.get("bookingId") || "";

  try {
    const q = bookingId || phone;
    const items = await listReservations(q ? { q } : undefined);
    return NextResponse.json({ reservations: items });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Terjadi kesalahan.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
