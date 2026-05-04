"use client";

import { useEffect, useMemo, useState } from "react";
import FadeIn from "./FadeIn";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

type ReservationCategory = "cafe" | "event";

type OccasionType = "birthday" | "anniversary" | "corporate" | "workshop" | "community" | "gathering" | "other";
type BudgetRange = "under500" | "500to1000" | "1000to2000" | "above2000";
type ReferralSource = "instagram" | "google" | "tiktok" | "recommendation" | "walkin" | "other";

const TECHNICAL_NEEDS_OPTIONS = [
  { value: "sound_system", label: "Sound System" },
  { value: "projector", label: "Proyektor / Layar" },
  { value: "decoration", label: "Dekorasi" },
  { value: "catering_custom", label: "Catering Custom" },
  { value: "photo_area", label: "Photo Area / Backdrop" },
  { value: "live_music", label: "Live Music" },
];

type EventOption = {
  id: number;
  title: string;
  dateISO: string;
  time: string;
  label: string;
};

const EVENT_OPTIONS: EventOption[] = [
  { id: 1, title: "Acoustic Night Vol.4", dateISO: "2025-05-17", time: "19:00", label: "Acoustic Night Vol.4 • 17 Mei • 19:00" },
  { id: 2, title: "Workshop Kopi Dasar", dateISO: "2025-05-25", time: "10:00", label: "Workshop Kopi Dasar • 25 Mei • 10:00" },
  { id: 3, title: "Community Gather #12", dateISO: "2025-06-07", time: "16:00", label: "Community Gather #12 • 7 Jun • 16:00" },
  { id: 4, title: "Poetry & Prose Night", dateISO: "2025-06-14", time: "19:30", label: "Poetry & Prose Night • 14 Jun • 19:30" },
  { id: 5, title: "Jazz & Food Pairing", dateISO: "2025-06-21", time: "19:00", label: "Jazz & Food Pairing • 21 Jun • 19:00" },
  { id: 6, title: "Workshop Sourdough & Kopi", dateISO: "2025-06-29", time: "09:00", label: "Workshop Sourdough & Kopi • 29 Jun • 09:00" },
];

export default function Reservation() {
  const [form, setForm] = useState({
    category: "cafe" as ReservationCategory,
    eventId: "",
    name: "",
    phone: "",
    email: "",
    date: todayISO(),
    time: "19:00",
    pax: 2,
    notes: "",
    occasionType: "" as OccasionType | "",
    organizerName: "",
    budgetRange: "" as BudgetRange | "",
    technicalNeeds: [] as string[],
    referralSource: "" as ReferralSource | "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    reservation: { bookingId: string; date: string; time: string; pax: number; status: string; category: ReservationCategory; eventTitle?: string };
    waLink: string;
  } | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const type = url.searchParams.get("type");
    const eventId = url.searchParams.get("eventId");
    if (type === "event") {
      setForm((p) => ({ ...p, category: "event", eventId: eventId || p.eventId }));
    }
  }, []);

  const selectedEvent = useMemo(() => {
    const id = Number(form.eventId);
    if (!Number.isFinite(id) || id <= 0) return null;
    return EVENT_OPTIONS.find((e) => e.id === id) || null;
  }, [form.eventId]);

  const inputClass =
    "w-full bg-[#F7F0E3] border border-[#8B6344]/15 focus:border-[#8B6344] focus:ring-1 focus:ring-[#8B6344]/20 text-[#1C1209] placeholder-[#6B5744]/40 rounded-xl px-4 py-3 md:py-3.5 text-sm outline-none transition-all duration-200 font-[family-name:var(--font-dm-sans)]";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitLoading(true);
    try {
      const payload =
        form.category === "event"
          ? {
              category: "event" as const,
              eventTitle: selectedEvent?.title || "",
              name: form.name,
              phone: form.phone,
              email: form.email || undefined,
              date: selectedEvent?.dateISO || form.date,
              time: selectedEvent?.time || form.time,
              pax: form.pax,
              notes: form.notes || undefined,
              occasionType: form.occasionType || undefined,
              organizerName: form.organizerName || undefined,
              budgetRange: form.budgetRange || undefined,
              technicalNeeds: form.technicalNeeds.length ? form.technicalNeeds : undefined,
              referralSource: form.referralSource || undefined,
            }
          : {
              category: "cafe" as const,
              name: form.name,
              phone: form.phone,
              date: form.date,
              time: form.time,
              pax: form.pax,
              notes: form.notes || undefined,
            };

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as any;
      if (!res.ok) throw new Error(json.error || "Gagal membuat reservasi.");
      setSuccess(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (success) {
    return (
      <section id="reservation" className="bg-[#2E1F14] py-16 md:py-36 relative overflow-hidden">
        <div className="grain absolute inset-0 pointer-events-none opacity-20" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="bg-[#EDE0CC]/5 backdrop-blur-sm border border-[#8B6344]/15 rounded-2xl p-6 md:p-10 text-center">
            <div className="w-14 h-14 bg-[#7A8C6E] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">✓</span>
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-2xl mb-2">
              Reservasi tercatat
            </h3>
            <p className="text-[#EDE0CC]/55 text-sm mb-6">
              Booking ID kamu:{" "}
              <span className="text-[#F5C87A] font-medium">{success.reservation.bookingId}</span>
            </p>

            <div className="grid grid-cols-3 gap-3 text-left mb-6">
              {[
                { label: "Tanggal", val: success.reservation.date },
                { label: "Jam", val: `${success.reservation.time} WIB` },
                { label: "Orang", val: `${success.reservation.pax}` },
              ].map((it) => (
                <div key={it.label} className="rounded-xl border border-[#8B6344]/15 bg-[#1C1209]/25 px-4 py-3">
                  <p className="text-[#EDE0CC]/40 text-[10px] uppercase tracking-wider">{it.label}</p>
                  <p className="text-[#EDE0CC] text-sm mt-0.5">{it.val}</p>
                </div>
              ))}
            </div>

            {success.reservation.category === "event" && success.reservation.eventTitle && (
              <p className="text-[#EDE0CC]/55 text-sm mb-6">
                Event: <span className="text-[#F5C87A] font-medium">{success.reservation.eventTitle}</span>
              </p>
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
              onClick={() => {
                setSuccess(null);
                setError(null);
                setForm({ category: "cafe", eventId: "", name: "", phone: "", email: "", date: todayISO(), time: "19:00", pax: 2, notes: "", occasionType: "", organizerName: "", budgetRange: "", technicalNeeds: [], referralSource: "" });
              }}
              className="mt-4 text-[#F5C87A] text-sm underline underline-offset-4 hover:text-[#F5C87A]/80 transition-colors"
            >
              Buat reservasi lain
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservation" className="bg-[#2E1F14] py-16 md:py-36 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-[#8B6344]/5 rounded-bl-[100px] pointer-events-none" />
      <div className="grain absolute inset-0 pointer-events-none opacity-20" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Left: copy */}
          <FadeIn direction="left">
            <p className="text-[#F5C87A] text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4">Reservasi</p>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] leading-[1.15] mb-6"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Kami sudah
              <br />
              <span className="italic text-[#F5C87A]">menyiapkan mejamu.</span>
            </h2>
            <span className="block w-12 h-0.5 bg-gradient-to-r from-[#8B6344] to-[#F5C87A] mb-8" />
            <p className="text-[#EDE0CC]/60 leading-relaxed mb-5 text-sm md:text-base">
              Pilih kategori reservasi: cafe & resto, atau event yang akan datang. Tentukan jam sesuai kebutuhanmu.
            </p>

            {/* Info cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:mt-8">
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

            <div className="hidden md:block mt-10 rounded-2xl overflow-hidden aspect-[16/9] bg-[#F7F0E3]/5 border border-[#8B6344]/10" />
          </FadeIn>

          {/* Right: form */}
          <FadeIn direction="right" delay={0.15}>
            <div className="bg-[#EDE0CC]/5 backdrop-blur-sm border border-[#8B6344]/15 rounded-2xl p-5 sm:p-6 md:p-8">
              <form onSubmit={submit} className="space-y-4">
                <div className="flex gap-2 p-1 bg-[#1C1209]/30 rounded-xl">
                  {[
                    { val: "cafe" as const, label: "Cafe & Resto" },
                    { val: "event" as const, label: "Event" },
                  ].map((t) => (
                    <button
                      key={t.val}
                      type="button"
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          category: t.val,
                          eventId: t.val === "event" ? p.eventId : "",
                        }))
                      }
                      className={[
                        "flex-1 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-300",
                        form.category === t.val
                          ? "bg-[#8B6344] text-[#F7F0E3]"
                          : "text-[#EDE0CC]/50 hover:text-[#EDE0CC]",
                      ].join(" ")}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {form.category === "event" && (
                  <>
                    {/* Pilih event */}
                    <div>
                      <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">Pilih Event</label>
                      <select
                        value={form.eventId}
                        onChange={(e) => setForm((p) => ({ ...p, eventId: e.target.value }))}
                        className={inputClass}
                        required
                      >
                        <option value="">Pilih event</option>
                        {EVENT_OPTIONS.map((ev) => (
                          <option key={ev.id} value={String(ev.id)}>
                            {ev.label}
                          </option>
                        ))}
                      </select>
                      {selectedEvent && (
                        <div className="mt-3 rounded-xl border border-[#8B6344]/15 bg-[#1C1209]/20 p-4">
                          <p className="text-[#F7F0E3] text-sm font-medium">{selectedEvent.title}</p>
                          <p className="text-[#EDE0CC]/50 text-xs mt-1">
                            {selectedEvent.dateISO} • {selectedEvent.time} WIB
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Tipe acara */}
                    <div>
                      <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">Tipe Acara</label>
                      <select
                        value={form.occasionType}
                        onChange={(e) => setForm((p) => ({ ...p, occasionType: e.target.value as OccasionType | "" }))}
                        className={inputClass}
                      >
                        <option value="">Pilih tipe acara (opsional)</option>
                        <option value="birthday">Ulang Tahun</option>
                        <option value="anniversary">Anniversari</option>
                        <option value="corporate">Corporate / Bisnis</option>
                        <option value="workshop">Workshop</option>
                        <option value="community">Komunitas</option>
                        <option value="gathering">Gathering</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>

                    {/* Nama organisasi — muncul jika corporate/komunitas */}
                    {(form.occasionType === "corporate" || form.occasionType === "community" || form.occasionType === "gathering") && (
                      <div>
                        <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">Nama Organisasi / Komunitas</label>
                        <input
                          value={form.organizerName}
                          onChange={(e) => setForm((p) => ({ ...p, organizerName: e.target.value }))}
                          placeholder="Nama perusahaan atau komunitas"
                          className={inputClass}
                        />
                      </div>
                    )}

                    {/* Kebutuhan teknis */}
                    <div>
                      <label className="block text-[#EDE0CC]/50 text-[10px] mb-2 uppercase tracking-wider">Kebutuhan Teknis (opsional)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {TECHNICAL_NEEDS_OPTIONS.map((opt) => {
                          const checked = form.technicalNeeds.includes(opt.value);
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() =>
                                setForm((p) => ({
                                  ...p,
                                  technicalNeeds: checked
                                    ? p.technicalNeeds.filter((v) => v !== opt.value)
                                    : [...p.technicalNeeds, opt.value],
                                }))
                              }
                              className={[
                                "text-left px-3 py-2 rounded-lg text-xs border transition-all duration-200",
                                checked
                                  ? "bg-[#8B6344]/20 border-[#8B6344]/50 text-[#F5C87A]"
                                  : "bg-[#1C1209]/20 border-[#8B6344]/15 text-[#EDE0CC]/50 hover:border-[#8B6344]/30 hover:text-[#EDE0CC]/70",
                              ].join(" ")}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget range */}
                    <div>
                      <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">Estimasi Anggaran (opsional)</label>
                      <select
                        value={form.budgetRange}
                        onChange={(e) => setForm((p) => ({ ...p, budgetRange: e.target.value as BudgetRange | "" }))}
                        className={inputClass}
                      >
                        <option value="">Pilih range anggaran</option>
                        <option value="under500">Di bawah Rp 500.000</option>
                        <option value="500to1000">Rp 500.000 – 1.000.000</option>
                        <option value="1000to2000">Rp 1.000.000 – 2.000.000</option>
                        <option value="above2000">Di atas Rp 2.000.000</option>
                      </select>
                    </div>

                    {/* Referral source */}
                    <div>
                      <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">Tahu Bilik Kita dari mana?</label>
                      <select
                        value={form.referralSource}
                        onChange={(e) => setForm((p) => ({ ...p, referralSource: e.target.value as ReferralSource | "" }))}
                        className={inputClass}
                      >
                        <option value="">Pilih sumber (opsional)</option>
                        <option value="instagram">Instagram</option>
                        <option value="google">Google / Maps</option>
                        <option value="tiktok">TikTok</option>
                        <option value="recommendation">Rekomendasi teman</option>
                        <option value="walkin">Pernah datang langsung</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">Nama</label>
                    <input
                      name="name"
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
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="08xx-xxxx-xxxx"
                      className={inputClass}
                    />
                  </div>
                </div>

                {form.category === "cafe" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">Tanggal</label>
                      <input
                        name="date"
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
                        name="time"
                        type="time"
                        required
                        step={60}
                        value={form.time}
                        onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">
                    {form.category === "event" ? "Jumlah Peserta" : "Jumlah Orang"}
                  </label>
                  <select
                    name="pax"
                    value={String(form.pax)}
                    onChange={(e) => setForm((p) => ({ ...p, pax: Number(e.target.value) }))}
                    className={inputClass}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                      <option key={n} value={n}>
                        {n} orang
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#EDE0CC]/50 text-[10px] mb-1.5 uppercase tracking-wider">Catatan (opsional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                    placeholder="Preferensi tempat duduk, alergi, dll."
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
                  disabled={submitLoading || (form.category === "event" && !form.eventId)}
                  className={[
                    "w-full py-3.5 md:py-4 rounded-xl font-medium tracking-wide transition-colors duration-300 text-sm",
                    submitLoading || (form.category === "event" && !form.eventId)
                      ? "bg-[#8B6344]/40 text-[#F7F0E3]/70 cursor-not-allowed"
                      : "bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3]",
                  ].join(" ")}
                >
                  {submitLoading ? "Memproses…" : "Booking Sekarang →"}
                </button>
                <p className="text-center text-[#EDE0CC]/30 text-[10px]">
                  Setelah submit, kamu bisa kirim konfirmasi via WhatsApp
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
