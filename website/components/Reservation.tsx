"use client";

import { useEffect, useMemo, useState } from "react";
import FadeIn from "./FadeIn";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function fmt(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

// ── Types ────────────────────────────────────────────────────────────────────

type ReservationCategory = "cafe" | "event";
type PreOrderCat = "coffee" | "noncoffee" | "makanan" | "snack";

// ── Event options (ticketing) ─────────────────────────────────────────────────

type EventOption = {
  id: number;
  title: string;
  dateISO: string;
  dateLabel: string;
  time: string;
  status: "open" | "coming" | "full";
  capacity: number;
  remaining: number;
  priceNum?: number;
  tag: string;
  tagColor: string;
  img: string;
  desc: string;
};

const EVENT_OPTIONS: EventOption[] = [
  {
    id: 1, title: "Acoustic Night Vol.4",
    dateISO: "2025-05-17", dateLabel: "Sabtu, 17 Mei 2025",
    time: "19:00", status: "open",
    capacity: 40, remaining: 12,
    priceNum: 50000,
    tag: "Live Music", tagColor: "#C4775A",
    img: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&q=80",
    desc: "Malam musik akustik intim bersama musisi lokal pilihan Cirebon.",
  },
  {
    id: 2, title: "Workshop Kopi Dasar",
    dateISO: "2025-05-25", dateLabel: "Minggu, 25 Mei 2025",
    time: "10:00", status: "open",
    capacity: 15, remaining: 4,
    priceNum: 150000,
    tag: "Workshop", tagColor: "#7A8C6E",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
    desc: "Belajar brewing V60, AeroPress, dan French Press bersama head barista kami.",
  },
  {
    id: 3, title: "Community Gather #12",
    dateISO: "2025-06-07", dateLabel: "Sabtu, 7 Juni 2025",
    time: "16:00", status: "coming",
    capacity: 30, remaining: 30,
    tag: "Komunitas", tagColor: "#F5C87A",
    img: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=400&q=80",
    desc: "Sesi santai berbagi cerita, proyek, dan ide bersama komunitas kreatif kota.",
  },
  {
    id: 4, title: "Poetry & Prose Night",
    dateISO: "2025-06-14", dateLabel: "Sabtu, 14 Juni 2025",
    time: "19:30", status: "coming",
    capacity: 25, remaining: 25,
    priceNum: 0,
    tag: "Sastra", tagColor: "#8B6344",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    desc: "Open mic puisi dan prosa. Bawa tulisanmu atau datang untuk mendengarkan.",
  },
  {
    id: 5, title: "Jazz & Food Pairing",
    dateISO: "2025-06-21", dateLabel: "Sabtu, 21 Juni 2025",
    time: "19:00", status: "coming",
    capacity: 30, remaining: 30,
    priceNum: 175000,
    tag: "Live Music", tagColor: "#C4775A",
    img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
    desc: "Jazz live dengan menu food pairing 4 course yang dirancang khusus.",
  },
  {
    id: 6, title: "Workshop Sourdough & Kopi",
    dateISO: "2025-06-29", dateLabel: "Minggu, 29 Juni 2025",
    time: "09:00", status: "coming",
    capacity: 12, remaining: 12,
    priceNum: 200000,
    tag: "Workshop", tagColor: "#7A8C6E",
    img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&q=80",
    desc: "Buat adonan sourdough sendiri, lalu seduh kopi dengan teknik pour over.",
  },
];

// ── Pre-order menu (cafe reservation) ────────────────────────────────────────

const PRE_ORDER_MENU: { id: string; name: string; price: number; cat: PreOrderCat }[] = [
  { id: "c1", name: "Kopi Susu Gula Aren", price: 28000, cat: "coffee" },
  { id: "c3", name: "Cappuccino", price: 28000, cat: "coffee" },
  { id: "c4", name: "Kopi Hitam", price: 18000, cat: "coffee" },
  { id: "c5", name: "Espresso Tonic", price: 32000, cat: "coffee" },
  { id: "nc1", name: "Matcha Latte", price: 32000, cat: "noncoffee" },
  { id: "nc2", name: "Coklat Panas Java", price: 28000, cat: "noncoffee" },
  { id: "nc5", name: "Lychee Sparkling Tea", price: 25000, cat: "noncoffee" },
  { id: "m1", name: "Nasi Goreng Bilik", price: 35000, cat: "makanan" },
  { id: "m2", name: "Toast Alpukat & Telur", price: 45000, cat: "makanan" },
  { id: "m3", name: "Chicken Katsu Rice", price: 55000, cat: "makanan" },
  { id: "m4", name: "Mie Goreng Kampung", price: 32000, cat: "makanan" },
  { id: "m5", name: "Pasta Aglio Olio", price: 48000, cat: "makanan" },
  { id: "s1", name: "Banana Bread", price: 25000, cat: "snack" },
  { id: "s2", name: "French Fries", price: 22000, cat: "snack" },
  { id: "s3", name: "Pisang Goreng Keju", price: 22000, cat: "snack" },
  { id: "s4", name: "Bruschetta", price: 28000, cat: "snack" },
  { id: "s5", name: "Dimsum 6 pcs", price: 35000, cat: "snack" },
];

const PRE_ORDER_TABS: { val: PreOrderCat; label: string }[] = [
  { val: "coffee", label: "Coffee" },
  { val: "noncoffee", label: "Non Coffee" },
  { val: "makanan", label: "Makanan" },
  { val: "snack", label: "Snack" },
];

// ── Small icons ───────────────────────────────────────────────────────────────

function IcCalendar() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="shrink-0 opacity-60">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
    </svg>
  );
}
function IcClock() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="shrink-0 opacity-60">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" strokeLinecap="round" />
    </svg>
  );
}
function IcUsers() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="shrink-0 opacity-60">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
    </svg>
  );
}
function IcTicket() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="shrink-0 opacity-60">
      <path d="M2 9a3 3 0 000 6v2a2 2 0 002 2h16a2 2 0 002-2v-2a3 3 0 000-6V7a2 2 0 00-2-2H4a2 2 0 00-2 2v2z" />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Reservation() {
  const [category, setCategory] = useState<ReservationCategory>("cafe");
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [ticketQty, setTicketQty] = useState(1);
  const [preOrderTab, setPreOrderTab] = useState<PreOrderCat>("coffee");
  const [preOrder, setPreOrder] = useState<Record<string, number>>({});

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: todayISO(),
    time: "19:00",
    pax: 2,
    notes: "",
  });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    bookingId: string;
    category: ReservationCategory;
    date: string;
    time: string;
    eventTitle?: string;
    ticketQty?: number;
    totalPrice?: number;
    pax?: number;
    preOrderItems?: { name: string; qty: number; price: number }[];
    waLink: string;
  } | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const type = url.searchParams.get("type");
    const eventId = url.searchParams.get("eventId");
    if (type === "event") {
      setCategory("event");
      if (eventId) setSelectedEventId(Number(eventId));
    }
  }, []);

  const selectedEvent = useMemo(
    () => (selectedEventId ? EVENT_OPTIONS.find((e) => e.id === selectedEventId) || null : null),
    [selectedEventId],
  );

  const preOrderTotal = useMemo(() => {
    return Object.entries(preOrder).reduce((sum, [id, qty]) => {
      const item = PRE_ORDER_MENU.find((m) => m.id === id);
      return sum + (item ? item.price * qty : 0);
    }, 0);
  }, [preOrder]);

  const preOrderCount = useMemo(
    () => Object.values(preOrder).reduce((a, b) => a + b, 0),
    [preOrder],
  );

  const ticketTotal = useMemo(() => {
    if (!selectedEvent?.priceNum) return 0;
    return selectedEvent.priceNum * ticketQty;
  }, [selectedEvent, ticketQty]);

  const inputClass =
    "w-full bg-[#F7F0E3] border border-[#8B6344]/15 focus:border-[#8B6344] focus:ring-1 focus:ring-[#8B6344]/20 text-[#1C1209] placeholder-[#6B5744]/40 rounded-xl px-4 py-3 md:py-3.5 text-sm outline-none transition-all duration-200 font-[family-name:var(--font-dm-sans)]";

  function changePreOrder(id: string, delta: number) {
    setPreOrder((prev) => {
      const next = { ...prev };
      const cur = next[id] || 0;
      const updated = Math.max(0, cur + delta);
      if (updated === 0) delete next[id];
      else next[id] = updated;
      return next;
    });
  }

  function resetForm() {
    setCategory("cafe");
    setSelectedEventId(null);
    setTicketQty(1);
    setPreOrder({});
    setForm({ name: "", phone: "", email: "", date: todayISO(), time: "19:00", pax: 2, notes: "" });
    setError(null);
    setSuccess(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (category === "event" && !selectedEventId) return;
    setError(null);
    setSubmitLoading(true);

    try {
      const preOrderItems = Object.entries(preOrder)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => {
          const item = PRE_ORDER_MENU.find((m) => m.id === id)!;
          return { name: item.name, qty, price: item.price };
        });

      const payload =
        category === "event"
          ? {
              category: "event" as const,
              eventTitle: selectedEvent?.title || "",
              date: selectedEvent?.dateISO || form.date,
              time: selectedEvent?.time || form.time,
              ticketQty,
              totalPrice: ticketTotal,
              name: form.name,
              phone: form.phone,
              email: form.email || undefined,
              notes: form.notes || undefined,
            }
          : {
              category: "cafe" as const,
              name: form.name,
              phone: form.phone,
              date: form.date,
              time: form.time,
              pax: form.pax,
              notes: form.notes || undefined,
              preOrderItems: preOrderItems.length ? preOrderItems : undefined,
            };

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        reservation?: { bookingId: string; date: string; time: string; pax: number; status: string; category: string; eventTitle?: string };
        waLink?: string;
        error?: string;
      };
      if (!res.ok) throw new Error(json.error || "Gagal membuat reservasi.");

      const r = json.reservation!;
      const eventLine =
        category === "event"
          ? `%0AEvent: ${encodeURIComponent(selectedEvent?.title || "")}%0ATanggal: ${encodeURIComponent(selectedEvent?.dateLabel || r.date)}%0AJam: ${selectedEvent?.time || r.time} WIB%0AJumlah tiket: ${ticketQty}${ticketTotal ? `%0ATotal: ${fmt(ticketTotal)}` : ""}`
          : `%0ATanggal: ${r.date}%0AJam: ${r.time} WIB%0AJumlah orang: ${r.pax}${preOrderItems.length ? `%0APre-order: ${preOrderItems.map((i) => `${i.name} x${i.qty}`).join(", ")}` : ""}`;

      const waMsg = `Halo Bilik Kita! Saya ingin konfirmasi reservasi.%0ABooking ID: ${r.bookingId}%0ANama: ${form.name}%0AKategori: ${category === "event" ? "Event" : "Cafe & Resto"}${eventLine}`;

      setSuccess({
        bookingId: r.bookingId,
        category,
        date: category === "event" ? (selectedEvent?.dateLabel || r.date) : r.date,
        time: category === "event" ? `${selectedEvent?.time || r.time} WIB` : `${r.time} WIB`,
        eventTitle: selectedEvent?.title,
        ticketQty: category === "event" ? ticketQty : undefined,
        totalPrice: category === "event" && ticketTotal ? ticketTotal : undefined,
        pax: category === "cafe" ? r.pax : undefined,
        preOrderItems: preOrderItems.length ? preOrderItems : undefined,
        waLink: `https://wa.me/6282130728924?text=${waMsg}`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSubmitLoading(false);
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────

  if (success) {
    return (
      <section className="bg-[#2E1F14] py-16 md:py-36 relative overflow-hidden">
        <div className="grain absolute inset-0 pointer-events-none opacity-20" />
        <div className="max-w-lg mx-auto px-6 relative z-10">
          {success.category === "event" ? (
            /* ── Ticket confirmation ── */
            <div className="bg-[#EDE0CC]/5 border border-[#8B6344]/20 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-[#8B6344] px-6 py-5 flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white text-lg">✓</div>
                <div>
                  <p className="text-[#F7F0E3] font-semibold text-sm tracking-wide">Tiket Berhasil Dipesan!</p>
                  <p className="text-[#EDE0CC]/70 text-xs">Cek WhatsApp untuk konfirmasi</p>
                </div>
              </div>

              {/* Ticket body */}
              <div className="px-6 py-6 space-y-5">
                <div>
                  <p className="text-[#EDE0CC]/40 text-[10px] uppercase tracking-wider mb-1">Event</p>
                  <p className="text-[#F7F0E3] font-[family-name:var(--font-playfair)] text-xl leading-tight">
                    {success.eventTitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Tanggal", val: success.date, icon: <IcCalendar /> },
                    { label: "Jam", val: success.time, icon: <IcClock /> },
                  ].map((it) => (
                    <div key={it.label} className="rounded-xl border border-[#8B6344]/15 bg-[#1C1209]/25 px-4 py-3">
                      <div className="flex items-center gap-1.5 text-[#EDE0CC]/40 mb-1">
                        {it.icon}
                        <span className="text-[10px] uppercase tracking-wider">{it.label}</span>
                      </div>
                      <p className="text-[#EDE0CC] text-sm font-medium">{it.val}</p>
                    </div>
                  ))}
                </div>

                {/* Dashed divider (ticket tear) */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#2E1F14] -ml-8 shrink-0" />
                  <div className="flex-1 border-t-2 border-dashed border-[#8B6344]/20" />
                  <div className="w-4 h-4 rounded-full bg-[#2E1F14] -mr-8 shrink-0" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#EDE0CC]/55 flex items-center gap-1.5"><IcTicket />Jumlah Tiket</span>
                    <span className="text-[#EDE0CC]">{success.ticketQty} tiket</span>
                  </div>
                  {success.totalPrice ? (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#EDE0CC]/55">Total Pembayaran</span>
                      <span className="text-[#F5C87A] font-semibold">{fmt(success.totalPrice)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#EDE0CC]/55">Harga</span>
                      <span className="text-[#7A8C6E] text-xs">Free Entry</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#EDE0CC]/55">Booking ID</span>
                    <span className="text-[#F5C87A] font-mono font-medium">{success.bookingId}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-[#F5C87A]/8 border border-[#F5C87A]/15 px-4 py-3">
                  <p className="text-[#F5C87A] text-xs font-medium mb-1">⏰ Reminder Otomatis</p>
                  <p className="text-[#EDE0CC]/55 text-xs leading-relaxed">
                    Kirim konfirmasi via WhatsApp sekarang — tim kami akan mengirim reminder H-1 sebelum event berlangsung.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 space-y-3">
                <a
                  href={success.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3] py-3.5 rounded-xl font-medium tracking-wide transition-colors duration-300 text-sm"
                >
                  Konfirmasi via WhatsApp →
                </a>
                <button
                  onClick={resetForm}
                  className="w-full text-[#F5C87A] text-sm underline underline-offset-4 hover:text-[#F5C87A]/80 transition-colors"
                >
                  Pesan tiket lain
                </button>
              </div>
            </div>
          ) : (
            /* ── Cafe reservation confirmation ── */
            <div className="bg-[#EDE0CC]/5 backdrop-blur-sm border border-[#8B6344]/15 rounded-2xl p-6 md:p-10 text-center">
              <div className="w-14 h-14 bg-[#7A8C6E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">✓</span>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-2xl mb-2">
                Reservasi tercatat
              </h3>
              <p className="text-[#EDE0CC]/55 text-sm mb-6">
                Booking ID:{" "}
                <span className="text-[#F5C87A] font-medium font-mono">{success.bookingId}</span>
              </p>

              <div className="grid grid-cols-3 gap-3 text-left mb-6">
                {[
                  { label: "Tanggal", val: success.date },
                  { label: "Jam", val: success.time },
                  { label: "Orang", val: `${success.pax}` },
                ].map((it) => (
                  <div key={it.label} className="rounded-xl border border-[#8B6344]/15 bg-[#1C1209]/25 px-4 py-3">
                    <p className="text-[#EDE0CC]/40 text-[10px] uppercase tracking-wider">{it.label}</p>
                    <p className="text-[#EDE0CC] text-sm mt-0.5">{it.val}</p>
                  </div>
                ))}
              </div>

              {success.preOrderItems && success.preOrderItems.length > 0 && (
                <div className="text-left rounded-xl border border-[#8B6344]/15 bg-[#1C1209]/20 p-4 mb-6">
                  <p className="text-[#EDE0CC]/40 text-[10px] uppercase tracking-wider mb-3">Pre-order Menu</p>
                  <ul className="space-y-1.5">
                    {success.preOrderItems.map((item) => (
                      <li key={item.name} className="flex justify-between items-center text-sm">
                        <span className="text-[#EDE0CC]/70">
                          {item.name} <span className="text-[#EDE0CC]/40">×{item.qty}</span>
                        </span>
                        <span className="text-[#F5C87A]/80 text-xs">{fmt(item.price * item.qty)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-[#8B6344]/15 flex justify-between text-sm">
                    <span className="text-[#EDE0CC]/50">Estimasi total pre-order</span>
                    <span className="text-[#F5C87A] font-medium">
                      {fmt(success.preOrderItems.reduce((s, i) => s + i.price * i.qty, 0))}
                    </span>
                  </div>
                </div>
              )}

              <a
                href={success.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3] py-3.5 rounded-xl font-medium tracking-wide transition-colors duration-300 text-sm"
              >
                Kirim Konfirmasi via WhatsApp →
              </a>
              <button
                onClick={resetForm}
                className="mt-4 text-[#F5C87A] text-sm underline underline-offset-4 hover:text-[#F5C87A]/80 transition-colors"
              >
                Buat reservasi lain
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────

  const openEvents = EVENT_OPTIONS.filter((e) => e.status === "open");
  const comingEvents = EVENT_OPTIONS.filter((e) => e.status === "coming");

  return (
    <section id="reservation" className="bg-[#2E1F14] py-16 md:py-36 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-[#8B6344]/5 rounded-bl-[100px] pointer-events-none" />
      <div className="grain absolute inset-0 pointer-events-none opacity-20" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Left copy */}
          <FadeIn direction="left">
            <p className="text-[#F5C87A] text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4">Reservasi</p>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] leading-[1.15] mb-6"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              {category === "event" ? (
                <>Tiket sudah<br /><span className="italic text-[#F5C87A]">tersedia untukmu.</span></>
              ) : (
                <>Kami sudah<br /><span className="italic text-[#F5C87A]">menyiapkan mejamu.</span></>
              )}
            </h2>
            <span className="block w-12 h-0.5 bg-gradient-to-r from-[#8B6344] to-[#F5C87A] mb-8" />
            <p className="text-[#EDE0CC]/60 leading-relaxed mb-5 text-sm md:text-base">
              {category === "event"
                ? "Pilih event yang ingin kamu hadiri, pesan tiket langsung dari sini. Konfirmasi lewat WhatsApp, dan kami kirim reminder H-1."
                : "Reservasi meja dan langsung pre-order menu favoritmu. Datang, duduk, dan nikmati — tanpa antri, tanpa bingung."}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: "🕐", label: "Senin – Jumat", val: "08.00 – 22.00" },
                { icon: "🕐", label: "Sabtu – Minggu", val: "07.00 – 22.00" },
                { icon: "📍", label: "Lokasi", val: "Jl. Pangeran Cakrabuana No.200" },
                { icon: "📞", label: "WhatsApp", val: "082130728924" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-[#F7F0E3]/5 rounded-xl px-4 py-3 border border-[#8B6344]/10"
                >
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="text-[#EDE0CC]/40 text-[10px] uppercase tracking-wider">{item.label}</p>
                    <p className="text-[#EDE0CC] text-sm">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right form */}
          <FadeIn direction="right" delay={0.15}>
            <div className="bg-[#EDE0CC]/5 backdrop-blur-sm border border-[#8B6344]/15 rounded-2xl p-5 sm:p-6 md:p-8">
              <form onSubmit={submit} className="space-y-5">
                {/* Category toggle */}
                <div className="flex gap-2 p-1 bg-[#1C1209]/30 rounded-xl">
                  {(["cafe", "event"] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { setCategory(cat); setSelectedEventId(null); }}
                      className={[
                        "flex-1 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-300",
                        category === cat
                          ? "bg-[#8B6344] text-[#F7F0E3]"
                          : "text-[#EDE0CC]/50 hover:text-[#EDE0CC]",
                      ].join(" ")}
                    >
                      {cat === "cafe" ? "Cafe & Resto" : "Event"}
                    </button>
                  ))}
                </div>

                {/* ── EVENT: Ticketing UI ── */}
                {category === "event" && (
                  <>
                    <div>
                      <p className="text-[#EDE0CC]/50 text-[10px] mb-3 uppercase tracking-wider">
                        Pilih Event
                      </p>

                      {/* Open events */}
                      {openEvents.length > 0 && (
                        <div className="space-y-2 mb-3">
                          {openEvents.map((ev) => {
                            const isSelected = selectedEventId === ev.id;
                            const pct = Math.round(((ev.capacity - ev.remaining) / ev.capacity) * 100);
                            const hotSeat = ev.remaining <= 5;
                            return (
                              <button
                                key={ev.id}
                                type="button"
                                onClick={() => setSelectedEventId(ev.id)}
                                className={[
                                  "w-full text-left rounded-xl border transition-all duration-200 overflow-hidden",
                                  isSelected
                                    ? "border-[#8B6344] bg-[#8B6344]/12"
                                    : "border-[#8B6344]/15 bg-[#1C1209]/15 hover:border-[#8B6344]/40 hover:bg-[#1C1209]/25",
                                ].join(" ")}
                              >
                                <div className="flex items-start gap-3 p-3">
                                  {/* Thumbnail */}
                                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                                    <img src={ev.img} alt={ev.title} className="w-full h-full object-cover" />
                                  </div>
                                  {/* Info */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <p className="text-[#F7F0E3] text-sm font-medium leading-tight">{ev.title}</p>
                                      <div
                                        className={[
                                          "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                                          isSelected
                                            ? "border-[#F5C87A] bg-[#F5C87A]"
                                            : "border-[#8B6344]/40",
                                        ].join(" ")}
                                      >
                                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#2E1F14]" />}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span
                                        className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full text-[#F7F0E3]"
                                        style={{ backgroundColor: ev.tagColor }}
                                      >
                                        {ev.tag}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1.5 text-xs text-[#EDE0CC]/50">
                                      <span className="flex items-center gap-1"><IcCalendar />{ev.dateLabel}</span>
                                      <span className="flex items-center gap-1"><IcClock />{ev.time} WIB</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-1.5">
                                      {ev.priceNum ? (
                                        <span className="text-[#F5C87A] text-xs font-medium flex items-center gap-1">
                                          <IcTicket />{fmt(ev.priceNum)}/tiket
                                        </span>
                                      ) : (
                                        <span className="text-[#7A8C6E] text-xs">Free Entry</span>
                                      )}
                                      <span className={["text-[10px]", hotSeat ? "text-[#C4775A]" : "text-[#EDE0CC]/40"].join(" ")}>
                                        {hotSeat ? `⚡ ${ev.remaining} tiket tersisa` : `${ev.remaining} tersisa`}
                                      </span>
                                    </div>
                                    {/* Capacity bar */}
                                    <div className="mt-2 h-1 bg-[#8B6344]/20 rounded-full overflow-hidden">
                                      <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                          width: `${pct}%`,
                                          background: hotSeat
                                            ? "linear-gradient(90deg,#C4775A,#F5C87A)"
                                            : "linear-gradient(90deg,#8B6344,#F5C87A)",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Coming soon events (disabled) */}
                      {comingEvents.length > 0 && (
                        <div>
                          <p className="text-[#EDE0CC]/30 text-[10px] uppercase tracking-wider mb-2">
                            Coming Soon — Pendaftaran belum dibuka
                          </p>
                          <div className="space-y-1.5">
                            {comingEvents.map((ev) => (
                              <div
                                key={ev.id}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#8B6344]/8 bg-[#1C1209]/10 opacity-50"
                              >
                                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 grayscale">
                                  <img src={ev.img} alt={ev.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[#EDE0CC]/60 text-xs font-medium truncate">{ev.title}</p>
                                  <p className="text-[#EDE0CC]/35 text-[10px]">{ev.dateLabel} • {ev.time} WIB</p>
                                </div>
                                <span className="text-[9px] text-[#EDE0CC]/30 shrink-0">Segera</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Personal details — show when event selected */}
                    {selectedEvent && (
                      <>
                        <div className="rounded-xl bg-[#8B6344]/10 border border-[#8B6344]/25 px-4 py-3">
                          <p className="text-[#F5C87A] text-xs font-medium">
                            {selectedEvent.title}
                          </p>
                          <p className="text-[#EDE0CC]/55 text-xs mt-0.5">
                            {selectedEvent.dateLabel} • {selectedEvent.time} WIB
                          </p>
                          {selectedEvent.priceNum
                            ? <p className="text-[#EDE0CC]/50 text-xs mt-0.5">{fmt(selectedEvent.priceNum)} per tiket</p>
                            : <p className="text-[#7A8C6E] text-xs mt-0.5">Free Entry</p>
                          }
                        </div>

                        {/* Ticket quantity */}
                        <div>
                          <label className="block text-[#EDE0CC]/50 text-[10px] mb-2 uppercase tracking-wider">
                            Jumlah Tiket
                          </label>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setTicketQty((q) => Math.max(1, q - 1))}
                              className="w-10 h-10 rounded-full bg-[#1C1209]/30 border border-[#8B6344]/20 text-[#EDE0CC] hover:bg-[#8B6344]/20 transition-colors text-lg font-light flex items-center justify-center"
                            >
                              −
                            </button>
                            <span className="text-[#F7F0E3] text-xl font-semibold w-6 text-center">
                              {ticketQty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setTicketQty((q) => Math.min(Math.min(4, selectedEvent.remaining), q + 1))}
                              className="w-10 h-10 rounded-full bg-[#1C1209]/30 border border-[#8B6344]/20 text-[#EDE0CC] hover:bg-[#8B6344]/20 transition-colors text-lg font-light flex items-center justify-center"
                            >
                              +
                            </button>
                            {selectedEvent.priceNum ? (
                              <div className="ml-auto text-right">
                                <p className="text-[#EDE0CC]/40 text-[10px]">Total</p>
                                <p className="text-[#F5C87A] font-semibold">{fmt(ticketTotal)}</p>
                              </div>
                            ) : null}
                          </div>
                          <p className="text-[#EDE0CC]/30 text-[10px] mt-1.5">
                            Maks. 4 tiket per pemesanan
                          </p>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* ── CAFE: Date, time, pax ── */}
                {category === "cafe" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">Tanggal</label>
                        <input
                          type="date"
                          required
                          value={form.date}
                          onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                          className={inputClass}
                          min={todayISO()}
                        />
                      </div>
                      <div>
                        <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">Jam</label>
                        <input
                          type="time"
                          required
                          step={60}
                          value={form.time}
                          onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">Jumlah Orang</label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, pax: Math.max(1, p.pax - 1) }))}
                          className="w-10 h-10 rounded-full bg-[#1C1209]/30 border border-[#8B6344]/20 text-[#EDE0CC] hover:bg-[#8B6344]/20 transition-colors text-lg font-light flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="text-[#F7F0E3] text-xl font-semibold w-6 text-center flex items-center gap-1.5">
                          <IcUsers />{form.pax}
                        </span>
                        <button
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, pax: Math.min(20, p.pax + 1) }))}
                          className="w-10 h-10 rounded-full bg-[#1C1209]/30 border border-[#8B6344]/20 text-[#EDE0CC] hover:bg-[#8B6344]/20 transition-colors text-lg font-light flex items-center justify-center"
                        >
                          +
                        </button>
                        <span className="text-[#EDE0CC]/40 text-xs ml-1">orang</span>
                      </div>
                    </div>

                    {/* ── Pre-order menu ── */}
                    <div className="rounded-xl border border-[#8B6344]/20 bg-[#1C1209]/20 overflow-hidden">
                      <div className="px-4 pt-4 pb-3 border-b border-[#8B6344]/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[#EDE0CC]/70 text-sm font-medium">Pre-order Menu</p>
                            <p className="text-[#EDE0CC]/35 text-[10px] mt-0.5">Opsional — pesanan disiapkan saat kamu tiba</p>
                          </div>
                          {preOrderCount > 0 && (
                            <span className="text-[10px] bg-[#8B6344] text-[#F7F0E3] px-2.5 py-1 rounded-full font-medium">
                              {preOrderCount} item
                            </span>
                          )}
                        </div>

                        {/* Category tabs */}
                        <div className="flex gap-1.5 mt-3 overflow-x-auto hide-scrollbar">
                          {PRE_ORDER_TABS.map((tab) => {
                            const count = PRE_ORDER_MENU
                              .filter((m) => m.cat === tab.val)
                              .reduce((s, m) => s + (preOrder[m.id] || 0), 0);
                            return (
                              <button
                                key={tab.val}
                                type="button"
                                onClick={() => setPreOrderTab(tab.val)}
                                className={[
                                  "shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-medium tracking-wide border transition-all duration-200",
                                  preOrderTab === tab.val
                                    ? "bg-[#8B6344]/30 border-[#8B6344]/50 text-[#F5C87A]"
                                    : "border-[#8B6344]/15 text-[#EDE0CC]/40 hover:border-[#8B6344]/30 hover:text-[#EDE0CC]/60",
                                ].join(" ")}
                              >
                                {tab.label}
                                {count > 0 && (
                                  <span className="ml-1.5 bg-[#F5C87A] text-[#2E1F14] text-[9px] px-1.5 py-0.5 rounded-full">
                                    {count}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="divide-y divide-[#8B6344]/8 max-h-52 overflow-y-auto">
                        {PRE_ORDER_MENU.filter((m) => m.cat === preOrderTab).map((item) => {
                          const qty = preOrder[item.id] || 0;
                          return (
                            <div key={item.id} className="flex items-center justify-between px-4 py-2.5 gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-[#EDE0CC]/80 text-xs font-medium truncate">{item.name}</p>
                                <p className="text-[#F5C87A]/70 text-[10px]">{fmt(item.price)}</p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {qty > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => changePreOrder(item.id, -1)}
                                    className="w-7 h-7 rounded-full bg-[#8B6344]/20 border border-[#8B6344]/30 text-[#EDE0CC] hover:bg-[#8B6344]/40 transition-colors text-sm flex items-center justify-center"
                                  >
                                    −
                                  </button>
                                )}
                                {qty > 0 && (
                                  <span className="text-[#F7F0E3] text-xs w-4 text-center font-medium">{qty}</span>
                                )}
                                <button
                                  type="button"
                                  onClick={() => changePreOrder(item.id, 1)}
                                  className="w-7 h-7 rounded-full bg-[#8B6344]/20 border border-[#8B6344]/30 text-[#EDE0CC] hover:bg-[#8B6344]/40 transition-colors text-sm flex items-center justify-center"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Order summary */}
                      {preOrderCount > 0 && (
                        <div className="px-4 py-3 bg-[#8B6344]/8 border-t border-[#8B6344]/15">
                          <div className="space-y-1 mb-2">
                            {Object.entries(preOrder).map(([id, qty]) => {
                              const item = PRE_ORDER_MENU.find((m) => m.id === id);
                              if (!item || qty === 0) return null;
                              return (
                                <div key={id} className="flex justify-between text-[10px]">
                                  <span className="text-[#EDE0CC]/55">{item.name} ×{qty}</span>
                                  <span className="text-[#EDE0CC]/55">{fmt(item.price * qty)}</span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-[#8B6344]/15">
                            <span className="text-[#EDE0CC]/50 text-xs">Estimasi pre-order</span>
                            <span className="text-[#F5C87A] text-xs font-semibold">{fmt(preOrderTotal)}</span>
                          </div>
                          <p className="text-[#EDE0CC]/25 text-[9px] mt-1">
                            Pembayaran dilakukan di tempat
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* ── Common fields: Name, Phone, Email ── */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">Nama</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Nama lengkap"
                      className={inputClass}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="08xx-xxxx-xxxx"
                      className={inputClass}
                    />
                  </div>
                </div>

                {category === "event" && selectedEvent && (
                  <div>
                    <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">
                      Email <span className="text-[#EDE0CC]/25 normal-case">(untuk e-ticket)</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="email@kamu.com"
                      className={inputClass}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">
                    Catatan (opsional)
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                    placeholder={
                      category === "event"
                        ? "Permintaan khusus, dll."
                        : "Preferensi tempat duduk, alergi, dll."
                    }
                    rows={2}
                    className={inputClass + " resize-none"}
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-[#C4775A]/30 bg-[#C4775A]/10 px-4 py-3">
                    <p className="text-[#EDE0CC] text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    submitLoading ||
                    (category === "event" && !selectedEventId) ||
                    (category === "event" && selectedEventId !== null && !form.name) ||
                    (category === "cafe" && !form.name)
                  }
                  className={[
                    "w-full py-3.5 md:py-4 rounded-xl font-medium tracking-wide transition-colors duration-300 text-sm",
                    submitLoading ||
                    (category === "event" && !selectedEventId) ||
                    (category === "event" && selectedEventId !== null && !form.name) ||
                    (category === "cafe" && !form.name)
                      ? "bg-[#8B6344]/40 text-[#F7F0E3]/70 cursor-not-allowed"
                      : "bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3]",
                  ].join(" ")}
                >
                  {submitLoading
                    ? "Memproses…"
                    : category === "event"
                    ? "Pesan Tiket →"
                    : "Booking Sekarang →"}
                </button>
                <p className="text-center text-[#EDE0CC]/30 text-[10px]">
                  {category === "event"
                    ? "Konfirmasi via WhatsApp — kami kirim reminder H-1 event"
                    : "Konfirmasi via WhatsApp setelah submit"}
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
