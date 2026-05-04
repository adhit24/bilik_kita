"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed";

type ReservationRecord = {
  id: string;
  bookingId: string;
  category: "cafe" | "event";
  eventTitle?: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  pax: number;
  status: ReservationStatus;
  notes?: string;
  createdAt: string;
  // CRM fields
  occasionType?: string;
  organizerName?: string;
  budgetRange?: string;
  technicalNeeds?: string[];
  referralSource?: string;
};

const OCCASION_LABELS: Record<string, string> = {
  birthday: "Ulang Tahun",
  anniversary: "Anniversari",
  corporate: "Corporate",
  workshop: "Workshop",
  community: "Komunitas",
  gathering: "Gathering",
  other: "Lainnya",
};

const BUDGET_LABELS: Record<string, string> = {
  under500: "< Rp 500rb",
  "500to1000": "Rp 500rb–1jt",
  "1000to2000": "Rp 1jt–2jt",
  above2000: "> Rp 2jt",
};

const REFERRAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  google: "Google/Maps",
  tiktok: "TikTok",
  recommendation: "Rekomendasi",
  walkin: "Walk-in",
  other: "Lainnya",
};

const TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);

  const [filterDate, setFilterDate] = useState(todayISO());
  const [filterStatus, setFilterStatus] = useState<ReservationStatus | "all">("all");
  const [filterCategory, setFilterCategory] = useState<"all" | "cafe" | "event">("all");
  const [q, setQ] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [slotDate, setSlotDate] = useState(todayISO());
  const [slotTime, setSlotTime] = useState(TIMES[0]);
  const [slotCapacity, setSlotCapacity] = useState(20);
  const [slotSaving, setSlotSaving] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("bilik_kita_admin_password");
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  const headers = useMemo(() => {
    return { "x-admin-password": password };
  }, [password]);

  const load = useCallback(async () => {
    if (!authed) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filterDate) params.set("date", filterDate);
      if (filterStatus !== "all") params.set("status", filterStatus);
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch(`/api/admin/reservations?${params.toString()}`, {
        headers,
        cache: "no-store",
      });
      const json = (await res.json()) as { reservations?: ReservationRecord[]; error?: string };
      if (!res.ok) throw new Error(json.error || "Gagal memuat reservasi.");
      setReservations(json.reservations || []);
    } catch (e) {
      setReservations([]);
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }, [authed, filterDate, filterStatus, headers, q]);

  useEffect(() => {
    void load();
  }, [load]);

  const updateStatus = async (id: string, status: ReservationStatus) => {
    setError(null);
    try {
      const res = await fetch("/api/admin/reservations", {
        method: "PATCH",
        headers: { ...headers, "content-type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const json = (await res.json()) as { reservation?: ReservationRecord; error?: string };
      if (!res.ok) throw new Error(json.error || "Gagal update status.");
      setReservations((prev) => prev.map((r) => (r.id === id ? (json.reservation as ReservationRecord) : r)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    }
  };

  const saveCapacity = async () => {
    setSlotSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/slots", {
        method: "PATCH",
        headers: { ...headers, "content-type": "application/json" },
        body: JSON.stringify({ date: slotDate, time: slotTime, capacity: slotCapacity }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan kapasitas.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setSlotSaving(false);
    }
  };

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#EDE0CC] px-6 py-16">
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl bg-[#F7F0E3] border border-[#8B6344]/20 p-6">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo.png"
                alt="Logo Bilik Kita Cafe & Resto"
                className="w-10 h-10 rounded-full object-cover ring-1 ring-[#8B6344]/25"
                loading="lazy"
                decoding="async"
              />
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-playfair)] text-[#1C1209] text-lg leading-tight truncate">
                  Admin Reservasi
                </p>
                <p className="text-[#6B5744] text-xs truncate">Bilik Kita Cafe & Resto</p>
              </div>
            </div>

            <label className="block text-[#6B5744] text-xs mb-2">Password Admin</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[#8B6344]/20 px-4 py-3 text-sm outline-none focus:border-[#8B6344]"
              placeholder="Masukkan password"
            />
            <button
              onClick={() => {
                sessionStorage.setItem("bilik_kita_admin_password", password);
                setAuthed(true);
              }}
              className="mt-4 w-full rounded-xl bg-[#2E1F14] hover:bg-[#8B6344] text-[#F7F0E3] py-3 text-sm font-medium transition-colors"
            >
              Masuk
            </button>
            <p className="mt-3 text-[#6B5744] text-xs">
              Jika muncul error “ADMIN_PASSWORD belum diset”, set environment variable ADMIN_PASSWORD di server.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EDE0CC] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo Bilik Kita Cafe & Resto"
              className="w-10 h-10 rounded-full object-cover ring-1 ring-[#8B6344]/25"
              loading="lazy"
              decoding="async"
            />
            <div>
              <h1 className="font-[family-name:var(--font-playfair)] text-[#1C1209] text-2xl leading-tight">
                Dashboard Reservasi
              </h1>
              <p className="text-[#6B5744] text-sm">Bilik Kita Cafe & Resto</p>
            </div>
          </div>

          <button
            onClick={() => {
              sessionStorage.removeItem("bilik_kita_admin_password");
              setAuthed(false);
              setReservations([]);
            }}
            className="self-start md:self-auto text-[#6B5744] hover:text-[#1C1209] text-sm underline underline-offset-4"
          >
            Keluar
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl bg-[#F7F0E3] border border-[#8B6344]/20 p-5 md:col-span-2">
            <div className="flex flex-col md:flex-row gap-3 md:items-end flex-wrap">
              <div className="flex-1 min-w-[160px]">
                <label className="block text-[#6B5744] text-xs mb-2">Cari</label>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full rounded-xl border border-[#8B6344]/20 px-4 py-3 text-sm outline-none focus:border-[#8B6344]"
                  placeholder="Nama / WA / Booking ID"
                />
              </div>
              <div>
                <label className="block text-[#6B5744] text-xs mb-2">Tanggal</label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full rounded-xl border border-[#8B6344]/20 px-4 py-3 text-sm outline-none focus:border-[#8B6344]"
                />
              </div>
              <div>
                <label className="block text-[#6B5744] text-xs mb-2">Kategori</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="w-full rounded-xl border border-[#8B6344]/20 px-4 py-3 text-sm outline-none focus:border-[#8B6344]"
                >
                  <option value="all">Semua</option>
                  <option value="cafe">Cafe & Resto</option>
                  <option value="event">Event</option>
                </select>
              </div>
              <div>
                <label className="block text-[#6B5744] text-xs mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="w-full rounded-xl border border-[#8B6344]/20 px-4 py-3 text-sm outline-none focus:border-[#8B6344]"
                >
                  <option value="all">Semua</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button
                onClick={load}
                className="rounded-xl bg-[#2E1F14] hover:bg-[#8B6344] text-[#F7F0E3] px-4 py-3 text-sm font-medium transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-[#F7F0E3] border border-[#8B6344]/20 p-5">
            <p className="text-[#6B5744] text-xs mb-3 uppercase tracking-wider">Kapasitas Slot</p>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={slotDate}
                onChange={(e) => setSlotDate(e.target.value)}
                className="w-full rounded-xl border border-[#8B6344]/20 px-3 py-2.5 text-sm outline-none focus:border-[#8B6344]"
              />
              <select
                value={slotTime}
                onChange={(e) => setSlotTime(e.target.value)}
                className="w-full rounded-xl border border-[#8B6344]/20 px-3 py-2.5 text-sm outline-none focus:border-[#8B6344]"
              >
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={slotCapacity}
                onChange={(e) => setSlotCapacity(Number(e.target.value))}
                className="w-full rounded-xl border border-[#8B6344]/20 px-3 py-2.5 text-sm outline-none focus:border-[#8B6344]"
                min={1}
                max={200}
              />
              <button
                onClick={saveCapacity}
                disabled={slotSaving}
                className={[
                  "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  slotSaving ? "bg-[#8B6344]/40 text-[#F7F0E3]/70" : "bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3]",
                ].join(" ")}
              >
                {slotSaving ? "Menyimpan…" : "Simpan"}
              </button>
            </div>
            <p className="mt-3 text-[#6B5744] text-xs">
              Online lock otomatis di 70% dari kapasitas.
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl bg-[#C4775A]/10 border border-[#C4775A]/25 px-5 py-4 mb-6">
            <p className="text-[#1C1209] text-sm">{error}</p>
          </div>
        )}

        <div className="rounded-2xl bg-[#F7F0E3] border border-[#8B6344]/20 overflow-hidden">
          <div className="px-5 py-4 border-b border-[#8B6344]/15 flex items-center justify-between">
            <p className="text-[#1C1209] text-sm font-medium">
              Reservasi {loading ? "(memuat…)" : `(${reservations.filter((r) => filterCategory === "all" || r.category === filterCategory).length})`}
            </p>
            {filterCategory === "event" && (
              <span className="text-[10px] uppercase tracking-wider text-[#8B6344] bg-[#8B6344]/10 px-2 py-1 rounded-full">
                Klik baris untuk detail CRM
              </span>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm">
              <thead>
                <tr className="text-left text-[#6B5744]">
                  <th className="px-5 py-3 font-medium">Booking</th>
                  <th className="px-5 py-3 font-medium">Kategori</th>
                  <th className="px-5 py-3 font-medium">Nama</th>
                  <th className="px-5 py-3 font-medium">WA</th>
                  <th className="px-5 py-3 font-medium">Tanggal</th>
                  <th className="px-5 py-3 font-medium">Jam</th>
                  <th className="px-5 py-3 font-medium">Pax</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {reservations
                  .filter((r) => filterCategory === "all" || r.category === filterCategory)
                  .map((r) => {
                    const isExpanded = expandedId === r.id;
                    const waFollowUp = `https://wa.me/${r.phone}?text=${encodeURIComponent(`Halo ${r.name}! Kami dari Bilik Kita ingin konfirmasi reservasi kamu untuk *${r.category === "event" ? r.eventTitle || "event" : "Cafe & Resto"}* pada *${r.date}* pukul *${r.time} WIB*. Apakah kamu masih hadir? 😊`)}`;
                    return (
                      <>
                        <tr
                          key={r.id}
                          onClick={() => r.category === "event" ? setExpandedId(isExpanded ? null : r.id) : undefined}
                          className={[
                            "border-t border-[#8B6344]/10 transition-colors",
                            r.category === "event" ? "cursor-pointer hover:bg-[#8B6344]/5" : "",
                          ].join(" ")}
                        >
                          <td className="px-5 py-3 font-medium text-[#1C1209]">
                            <div className="flex items-center gap-1.5">
                              {r.category === "event" && (
                                <span className="text-[#8B6344] text-[10px]">{isExpanded ? "▼" : "▶"}</span>
                              )}
                              {r.bookingId}
                            </div>
                          </td>
                          <td className="px-5 py-3 text-[#1C1209]">
                            {r.category === "event" ? (
                              <span className="inline-flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C87A] inline-block" />
                                {r.eventTitle || "Event"}
                              </span>
                            ) : "Cafe & Resto"}
                          </td>
                          <td className="px-5 py-3 text-[#1C1209]">{r.name}</td>
                          <td className="px-5 py-3 text-[#1C1209]">
                            <a
                              href={waFollowUp}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="underline underline-offset-2 hover:text-[#8B6344] transition-colors"
                            >
                              {r.phone}
                            </a>
                          </td>
                          <td className="px-5 py-3 text-[#1C1209]">{r.date}</td>
                          <td className="px-5 py-3 text-[#1C1209]">{r.time}</td>
                          <td className="px-5 py-3 text-[#1C1209]">{r.pax}</td>
                          <td className="px-5 py-3">
                            <span className={[
                              "inline-block px-2 py-0.5 rounded-full text-[11px] font-medium",
                              r.status === "confirmed" ? "bg-[#7A8C6E]/15 text-[#4a6741]" :
                              r.status === "completed" ? "bg-[#7A8C6E]/30 text-[#3a5431]" :
                              r.status === "cancelled" ? "bg-[#C4775A]/15 text-[#a04832]" :
                              "bg-[#F5C87A]/20 text-[#8B6344]",
                            ].join(" ")}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => updateStatus(r.id, "confirmed")}
                                className="px-3 py-1.5 rounded-lg border border-[#8B6344]/25 hover:border-[#8B6344] text-[#1C1209] text-xs"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => updateStatus(r.id, "completed")}
                                className="px-3 py-1.5 rounded-lg border border-[#7A8C6E]/30 hover:border-[#7A8C6E] text-[#1C1209] text-xs"
                              >
                                Done
                              </button>
                              <button
                                onClick={() => updateStatus(r.id, "cancelled")}
                                className="px-3 py-1.5 rounded-lg border border-[#C4775A]/30 hover:border-[#C4775A] text-[#1C1209] text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* CRM detail row — hanya untuk event */}
                        {r.category === "event" && isExpanded && (
                          <tr key={`${r.id}-detail`} className="bg-[#F5C87A]/5 border-t border-[#8B6344]/10">
                            <td colSpan={9} className="px-8 py-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                <div>
                                  <p className="text-[#6B5744] uppercase tracking-wider mb-1">Tipe Acara</p>
                                  <p className="text-[#1C1209] font-medium">{OCCASION_LABELS[r.occasionType || ""] || "—"}</p>
                                </div>
                                <div>
                                  <p className="text-[#6B5744] uppercase tracking-wider mb-1">Organisasi</p>
                                  <p className="text-[#1C1209] font-medium">{r.organizerName || "—"}</p>
                                </div>
                                <div>
                                  <p className="text-[#6B5744] uppercase tracking-wider mb-1">Estimasi Budget</p>
                                  <p className="text-[#1C1209] font-medium">{BUDGET_LABELS[r.budgetRange || ""] || "—"}</p>
                                </div>
                                <div>
                                  <p className="text-[#6B5744] uppercase tracking-wider mb-1">Sumber</p>
                                  <p className="text-[#1C1209] font-medium">{REFERRAL_LABELS[r.referralSource || ""] || "—"}</p>
                                </div>
                                {r.technicalNeeds?.length ? (
                                  <div className="col-span-2">
                                    <p className="text-[#6B5744] uppercase tracking-wider mb-1">Kebutuhan Teknis</p>
                                    <p className="text-[#1C1209] font-medium">{r.technicalNeeds.join(", ")}</p>
                                  </div>
                                ) : null}
                                {r.notes ? (
                                  <div className="col-span-2">
                                    <p className="text-[#6B5744] uppercase tracking-wider mb-1">Catatan</p>
                                    <p className="text-[#1C1209] font-medium">{r.notes}</p>
                                  </div>
                                ) : null}
                                <div className="col-span-2 md:col-span-4 pt-2 border-t border-[#8B6344]/10">
                                  <a
                                    href={waFollowUp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-[#1a7a44] text-xs font-medium hover:bg-[#25D366]/20 transition-colors"
                                  >
                                    <span>💬</span> Kirim Follow-up WhatsApp
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                {!loading && reservations.filter((r) => filterCategory === "all" || r.category === filterCategory).length === 0 && (
                  <tr>
                    <td className="px-5 py-10 text-center text-[#6B5744]" colSpan={9}>
                      Belum ada reservasi untuk filter ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
