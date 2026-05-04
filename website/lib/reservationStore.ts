import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type OccasionType =
  | "birthday"
  | "anniversary"
  | "corporate"
  | "workshop"
  | "community"
  | "gathering"
  | "other";

export type BudgetRange =
  | "under500"
  | "500to1000"
  | "1000to2000"
  | "above2000";

export type ReferralSource =
  | "instagram"
  | "google"
  | "tiktok"
  | "recommendation"
  | "walkin"
  | "other";

export interface ReservationRecord {
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
  // CRM fields — event only
  occasionType?: OccasionType;
  organizerName?: string;
  budgetRange?: BudgetRange;
  technicalNeeds?: string[];
  referralSource?: ReferralSource;
}

export interface SlotView {
  date: string;
  time: string;
  capacity: number;
  lockLimit: number;
  bookedCount: number;
  fillPct: number;
  status: "open" | "hampir" | "locked" | "full";
}

interface StoreShape {
  version: number;
  slots: Record<string, Record<string, { capacity: number }>>;
  reservations: ReservationRecord[];
}

const DEFAULT_TIMES = [
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

const DEFAULT_CAPACITY = 20;
const LOCK_THRESHOLD = 0.7;

const STORE_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(STORE_DIR, "reservations.json");
const MEMORY_STORE_KEY = "__bilik_kita_reservations_store__";

function getMemoryStore() {
  const g = globalThis as unknown as Record<string, StoreShape | undefined>;
  if (!g[MEMORY_STORE_KEY]) g[MEMORY_STORE_KEY] = { version: 1, slots: {}, reservations: [] };
  return g[MEMORY_STORE_KEY]!;
}

function normalizePhone(raw: string) {
  const digits = raw.replace(/[^0-9]/g, "");
  if (!digits) return "";
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

function isValidDateISO(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function isValidTimeHHMM(time: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function lockLimit(capacity: number) {
  return Math.max(1, Math.floor(capacity * LOCK_THRESHOLD));
}

function computeStatus(booked: number, capacity: number) {
  const pct = capacity <= 0 ? 100 : Math.round((booked / capacity) * 100);
  const limit = lockLimit(capacity);

  if (booked >= capacity) return { status: "full" as const, fillPct: pct, lockLimit: limit };
  if (booked >= limit) return { status: "locked" as const, fillPct: pct, lockLimit: limit };
  if (booked >= Math.ceil(capacity * 0.5)) return { status: "hampir" as const, fillPct: pct, lockLimit: limit };
  return { status: "open" as const, fillPct: pct, lockLimit: limit };
}

function getMutex() {
  const key = "__bilik_kita_reservation_mutex__";
  const g = globalThis as unknown as Record<string, Promise<void> | undefined>;
  if (!g[key]) g[key] = Promise.resolve();
  return {
    async run<T>(fn: () => Promise<T>) {
      const prev = g[key]!;
      let release!: () => void;
      const next = new Promise<void>((r) => (release = r));
      g[key] = prev.then(() => next);
      await prev;
      try {
        return await fn();
      } finally {
        release();
      }
    },
  };
}

async function readStore(): Promise<StoreShape> {
  if (process.env.VERCEL) return getMemoryStore();
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as StoreShape;
    if (!parsed || typeof parsed !== "object") throw new Error("Invalid store");
    if (!parsed.slots) parsed.slots = {};
    if (!parsed.reservations) parsed.reservations = [];
    return parsed;
  } catch {
    return getMemoryStore();
  }
}

async function writeStore(store: StoreShape) {
  if (process.env.VERCEL) {
    const g = globalThis as unknown as Record<string, StoreShape | undefined>;
    g[MEMORY_STORE_KEY] = store;
    return;
  }
  await fs.mkdir(STORE_DIR, { recursive: true });
  try {
    await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch {
    const g = globalThis as unknown as Record<string, StoreShape | undefined>;
    g[MEMORY_STORE_KEY] = store;
  }
}

function ensureSlotsForDate(store: StoreShape, date: string) {
  if (!store.slots[date]) store.slots[date] = {};
  for (const t of DEFAULT_TIMES) {
    if (!store.slots[date][t]) store.slots[date][t] = { capacity: DEFAULT_CAPACITY };
  }
}

function bookedCountFor(store: StoreShape, date: string, time: string) {
  return store.reservations
    .filter((r) => r.date === date && r.time === time && r.status !== "cancelled")
    .reduce((sum, r) => sum + (Number.isFinite(r.pax) ? r.pax : 0), 0);
}

function makeBookingId(date: string) {
  const compact = date.replaceAll("-", "");
  const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();
  return `BK-${compact}-${suffix}`;
}

export async function listSlots(date: string): Promise<SlotView[]> {
  if (!isValidDateISO(date)) throw new Error("Tanggal tidak valid.");
  const mutex = getMutex();
  return mutex.run(async () => {
    const store = await readStore();
    ensureSlotsForDate(store, date);
    await writeStore(store);

    const byTime = store.slots[date];
    return Object.keys(byTime)
      .sort()
      .map((time) => {
        const capacity = byTime[time].capacity;
        const booked = bookedCountFor(store, date, time);
        const meta = computeStatus(booked, capacity);
        return {
          date,
          time,
          capacity,
          lockLimit: meta.lockLimit,
          bookedCount: booked,
          fillPct: meta.fillPct,
          status: meta.status,
        };
      });
  });
}

export async function createReservation(input: {
  category: "cafe" | "event";
  eventTitle?: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  pax: number;
  notes?: string;
  occasionType?: OccasionType;
  organizerName?: string;
  budgetRange?: BudgetRange;
  technicalNeeds?: string[];
  referralSource?: ReferralSource;
}) {
  const date = input.date;
  const time = input.time;
  const name = input.name.trim();
  const phone = normalizePhone(input.phone);
  const email = input.email?.trim() || undefined;
  const pax = Number(input.pax);
  const notes = input.notes?.trim() || undefined;
  const category = input.category;
  const eventTitle = input.eventTitle?.trim() || undefined;
  const occasionType = input.occasionType || undefined;
  const organizerName = input.organizerName?.trim() || undefined;
  const budgetRange = input.budgetRange || undefined;
  const technicalNeeds = input.technicalNeeds?.length ? input.technicalNeeds : undefined;
  const referralSource = input.referralSource || undefined;

  if (!name) throw new Error("Nama wajib diisi.");
  if (!phone || !/^62\d{9,14}$/.test(phone)) throw new Error("Nomor WhatsApp tidak valid. Gunakan format 08xx atau +62.");
  if (!isValidDateISO(date)) throw new Error("Tanggal tidak valid.");
  if (date < todayISO()) throw new Error("Tanggal tidak boleh di masa lalu.");
  if (!isValidTimeHHMM(time)) throw new Error("Jam tidak valid. Gunakan format HH:MM.");
  if (!Number.isFinite(pax) || pax < 1 || pax > 12) throw new Error("Jumlah orang tidak valid.");
  if (category !== "cafe" && category !== "event") throw new Error("Kategori reservasi tidak valid.");
  if (category === "event" && !eventTitle) throw new Error("Event wajib dipilih.");

  const mutex = getMutex();
  return mutex.run(async () => {
    const store = await readStore();

    const now = new Date().toISOString();
    const record: ReservationRecord = {
      id: crypto.randomUUID(),
      bookingId: makeBookingId(date),
      category,
      eventTitle,
      name,
      phone,
      email,
      date,
      time,
      pax,
      status: "pending",
      notes,
      createdAt: now,
      occasionType,
      organizerName,
      budgetRange,
      technicalNeeds,
      referralSource,
    };

    store.reservations.push(record);

    await writeStore(store);

    const final = store.reservations.find((r) => r.id === record.id)!;
    return {
      reservation: final,
    };
  });
}

export async function listReservations(filter?: { date?: string; status?: ReservationStatus; q?: string }) {
  const mutex = getMutex();
  return mutex.run(async () => {
    const store = await readStore();
    let items = [...store.reservations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    if (filter?.date && isValidDateISO(filter.date)) {
      items = items.filter((r) => r.date === filter.date);
    }
    if (filter?.status) {
      items = items.filter((r) => r.status === filter.status);
    }
    if (filter?.q) {
      const q = filter.q.toLowerCase();
      items = items.filter((r) => r.name.toLowerCase().includes(q) || r.phone.includes(q) || r.bookingId.toLowerCase().includes(q));
    }

    return items;
  });
}

export async function updateReservationStatus(id: string, status: ReservationStatus) {
  const mutex = getMutex();
  return mutex.run(async () => {
    const store = await readStore();
    const idx = store.reservations.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error("Reservasi tidak ditemukan.");
    store.reservations[idx] = { ...store.reservations[idx], status };
    await writeStore(store);
    return store.reservations[idx];
  });
}

export async function upsertSlotCapacity(input: { date: string; time: string; capacity: number }) {
  if (!isValidDateISO(input.date)) throw new Error("Tanggal tidak valid.");
  if (!DEFAULT_TIMES.includes(input.time)) throw new Error("Jam/slot tidak valid.");
  const capacity = Number(input.capacity);
  if (!Number.isFinite(capacity) || capacity < 1 || capacity > 200) throw new Error("Kapasitas tidak valid.");

  const mutex = getMutex();
  return mutex.run(async () => {
    const store = await readStore();
    ensureSlotsForDate(store, input.date);
    store.slots[input.date][input.time] = { capacity };
    await writeStore(store);
    return true;
  });
}

const OCCASION_LABELS: Record<string, string> = {
  birthday: "Ulang Tahun",
  anniversary: "Anniversari",
  corporate: "Corporate / Bisnis",
  workshop: "Workshop",
  community: "Komunitas",
  gathering: "Gathering",
  other: "Lainnya",
};

const BUDGET_LABELS: Record<string, string> = {
  under500: "< Rp 500rb",
  "500to1000": "Rp 500rb – 1jt",
  "1000to2000": "Rp 1jt – 2jt",
  above2000: "> Rp 2jt",
};

export function buildWhatsAppCustomerMessage(r: ReservationRecord) {
  const dateLabel = r.date;
  const timeLabel = `${r.time} WIB`;
  const status = r.status.toUpperCase();
  const header =
    r.category === "event"
      ? `Reservasi event: *${r.eventTitle || "-"}*`
      : "Reservasi cafe & resto";
  const lines = [
    `Halo ${r.name}!`,
    ``,
    `Reservasi kamu di *Bilik Kita Cafe & Resto* sudah tercatat.`,
    ``,
    `🧾 Booking ID: *${r.bookingId}*`,
    `🏷️ ${header}`,
    `📅 Tanggal: ${dateLabel}`,
    `🕐 Jam: ${timeLabel}`,
    `👥 Peserta: ${r.pax} orang`,
    `📋 Status: *${status}*`,
  ];
  if (r.category === "event") {
    if (r.occasionType) lines.push(`🎉 Tipe acara: ${OCCASION_LABELS[r.occasionType] || r.occasionType}`);
    if (r.organizerName) lines.push(`🏢 Organisasi: ${r.organizerName}`);
    if (r.technicalNeeds?.length) lines.push(`🔧 Kebutuhan: ${r.technicalNeeds.join(", ")}`);
  }
  if (r.notes) lines.push(`📝 Catatan: ${r.notes}`);
  lines.push("", "Tim kami akan menghubungi kamu untuk konfirmasi lebih lanjut.");
  lines.push("Sampai ketemu di Bilik Kita! ☕");
  return lines.join("\n");
}

export function buildWhatsAppAdminMessage(r: ReservationRecord) {
  const dateLabel = r.date;
  const timeLabel = `${r.time} WIB`;
  const header =
    r.category === "event"
      ? `Event: ${r.eventTitle || "-"}`
      : "Cafe & Resto";
  const lines = [
    `*Booking Baru — Bilik Kita*`,
    ``,
    `🧾 ${r.bookingId}`,
    `🏷️ ${header}`,
    `👤 ${r.name}`,
    `📱 ${r.phone}`,
    `📅 ${dateLabel} • ${timeLabel}`,
    `👥 ${r.pax} orang`,
  ];
  if (r.category === "event") {
    if (r.occasionType) lines.push(`🎉 ${OCCASION_LABELS[r.occasionType] || r.occasionType}`);
    if (r.organizerName) lines.push(`🏢 ${r.organizerName}`);
    if (r.budgetRange) lines.push(`💰 Budget: ${BUDGET_LABELS[r.budgetRange] || r.budgetRange}`);
    if (r.technicalNeeds?.length) lines.push(`🔧 ${r.technicalNeeds.join(", ")}`);
    if (r.referralSource) lines.push(`📣 Via: ${r.referralSource}`);
  }
  if (r.notes) lines.push(`📝 ${r.notes}`);
  return lines.join("\n");
}
