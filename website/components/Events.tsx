"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import FadeIn from "./FadeIn";

export interface EventData {
  id: number;
  date: string;
  dateShort: string;
  month: string;
  time: string;
  title: string;
  desc: string;
  longDesc?: string;
  img: string;
  tag: string;
  tagColor: string;
  status: "open" | "coming" | "full";
  capacity: number;
  registered: number;
  price?: string;
  performer?: string;
  featured?: boolean;
}

const events: EventData[] = [
  {
    id: 1,
    date: "Sabtu, 17 Mei 2025",
    dateShort: "17",
    month: "Mei",
    time: "19:00 WIB",
    title: "Acoustic Night Vol.4",
    desc: "Malam musik akustik dengan penampilan musisi lokal pilihan. Duduk, dengarkan, nikmati.",
    longDesc:
      "Nikmati alunan gitar akustik dan vokal merdu dari musisi-musisi terpilih Cirebon. Suasana intim dengan pencahayaan lilin, kopi spesial, dan makanan yang disiapkan khusus untuk malam ini. Limited seating untuk pengalaman terbaik.",
    img: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1200&q=85",
    tag: "Live Music",
    tagColor: "#C4775A",
    status: "open",
    capacity: 40,
    registered: 28,
    price: "Rp 50.000",
    performer: "Acoustic Duo Cirebon",
    featured: true,
  },
  {
    id: 2,
    date: "Minggu, 25 Mei 2025",
    dateShort: "25",
    month: "Mei",
    time: "10:00 WIB",
    title: "Workshop Kopi Dasar",
    desc: "Belajar brewing methods dari barista kami. Dari pour over hingga AeroPress — untuk pemula.",
    longDesc:
      "Workshop interaktif selama 2 jam bersama head barista kami. Kamu akan belajar teknik V60 pour over, AeroPress, dan French Press. Termasuk biji kopi pilihan untuk dibawa pulang dan sertifikat keikutsertaan.",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85",
    tag: "Workshop",
    tagColor: "#7A8C6E",
    status: "open",
    capacity: 15,
    registered: 11,
    price: "Rp 150.000",
  },
  {
    id: 3,
    date: "Sabtu, 7 Juni 2025",
    dateShort: "07",
    month: "Jun",
    time: "16:00 WIB",
    title: "Community Gather #12",
    desc: "Sesi santai berbagi cerita, proyek, dan ide bersama komunitas kreatif kota.",
    longDesc:
      "Ruang terbuka untuk bercerita, berbagi proyek, atau sekadar mendengarkan. Dari desainer, musisi, penulis, hingga siapa saja yang punya cerita. Free entry, cukup pesan minuman favoritmu.",
    img: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=900&q=85",
    tag: "Komunitas",
    tagColor: "#F5C87A",
    status: "coming",
    capacity: 30,
    registered: 0,
  },
  {
    id: 4,
    date: "Sabtu, 14 Juni 2025",
    dateShort: "14",
    month: "Jun",
    time: "19:30 WIB",
    title: "Poetry & Prose Night",
    desc: "Malam puisi dan cerita pendek. Bawa tulisanmu, atau datang untuk mendengarkan.",
    longDesc:
      "Panggung terbuka untuk pembacaan puisi dan prosa. Open mic format — siapa saja boleh tampil. Diiringi musik ambient yang dipersiapkan khusus. Bawa tulisanmu, atau cukup datang untuk merasakan kata-kata.",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=85",
    tag: "Sastra",
    tagColor: "#8B6344",
    status: "coming",
    capacity: 25,
    registered: 0,
    price: "Free Entry",
  },
  {
    id: 5,
    date: "Sabtu, 21 Juni 2025",
    dateShort: "21",
    month: "Jun",
    time: "19:00 WIB",
    title: "Jazz & Food Pairing",
    desc: "Kolaborasi jazz live dengan menu spesial yang dirancang untuk melengkapi setiap nada.",
    longDesc:
      "Malam jazz dengan trio musisi pilihan, diiringi menu food pairing 4 course yang dirancang khusus oleh chef kami. Setiap hidangan dipilih untuk melengkapi nada dan mood dari musik yang dimainkan.",
    img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=900&q=85",
    tag: "Live Music",
    tagColor: "#C4775A",
    status: "coming",
    capacity: 30,
    registered: 0,
    price: "Rp 175.000",
    performer: "Cirebon Jazz Trio",
  },
  {
    id: 6,
    date: "Minggu, 29 Juni 2025",
    dateShort: "29",
    month: "Jun",
    time: "09:00 WIB",
    title: "Workshop Sourdough & Kopi",
    desc: "Dua hal terbaik di pagi hari — roti yang diuleni dengan tangan, kopi yang diseduh pelan.",
    longDesc:
      "Sesi pagi yang menyenangkan bersama baker dan barista kami. Kamu akan membuat adonan sourdough sendiri, belajar cara fermentasi yang benar, dan menyeduh kopi dengan teknik pour over. Semua hasilnya kamu bawa pulang.",
    img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=900&q=85",
    tag: "Workshop",
    tagColor: "#7A8C6E",
    status: "coming",
    capacity: 12,
    registered: 0,
    price: "Rp 200.000",
  },
];

const TABS = ["Semua", "Live Music", "Workshop", "Komunitas", "Sastra"];

/* ─── Icon helpers ─────────────────────────────────────────────────── */
function IcCalendar() {
  return (
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="shrink-0 opacity-60">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
    </svg>
  );
}
function IcClock() {
  return (
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="shrink-0 opacity-60">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" strokeLinecap="round" />
    </svg>
  );
}
function IcTicket() {
  return (
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="shrink-0 opacity-60">
      <path d="M2 9a3 3 0 000 6v2a2 2 0 002 2h16a2 2 0 002-2v-2a3 3 0 000-6V7a2 2 0 00-2-2H4a2 2 0 00-2 2v2z" />
    </svg>
  );
}

/* ─── Status badge ──────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: EventData["status"] }) {
  const map = {
    open: { label: "Daftar Terbuka", cls: "badge-live" },
    coming: { label: "Coming Soon", cls: "badge-coming" },
    full: { label: "Penuh", cls: "badge-full" },
  };
  const { label, cls } = map[status];
  return (
    <span className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full font-medium inline-flex items-center gap-1.5 ${cls}`}>
      {status === "open" && <span className="w-1.5 h-1.5 bg-white rounded-full dot-live shrink-0" />}
      {label}
    </span>
  );
}

/* ─── Animated capacity bar ─────────────────────────────────────────── */
function CapacityBar({ capacity, registered }: { capacity: number; registered: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const pct = Math.round((registered / capacity) * 100);
  const hot = pct > 80;
  return (
    <div ref={ref} className="mt-3">
      <div className="flex justify-between text-[10px] text-[#EDE0CC]/50 mb-1.5">
        <span>{registered} / {capacity} peserta</span>
        <span className={hot ? "text-[#C4775A]" : "text-[#F5C87A]/80"}>{pct}% terisi</span>
      </div>
      <div className="w-full h-1.5 bg-[#8B6344]/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          className="h-full rounded-full"
          style={{
            background: hot
              ? "linear-gradient(90deg, #C4775A, #F5C87A)"
              : "linear-gradient(90deg, #8B6344, #F5C87A)",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Filter tab bar ────────────────────────────────────────────────── */
function FilterTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (t: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
      {TABS.map((tab) => {
        const isActive = active === tab;
        return (
          <motion.button
            key={tab}
            onClick={() => onChange(tab)}
            layout
            whileTap={{ scale: 0.95 }}
            className={`relative shrink-0 px-5 py-2.5 rounded-full text-xs font-medium tracking-wide border transition-colors duration-300 ${
              isActive
                ? "bg-[#8B6344] border-[#8B6344] text-[#F7F0E3]"
                : "border-[#8B6344]/25 text-[#EDE0CC]/55 hover:border-[#8B6344]/50 hover:text-[#EDE0CC]/90"
            }`}
          >
            {tab}
          </motion.button>
        );
      })}
    </div>
  );
}

/* ─── Featured event card (cinematic full-width) ────────────────────── */
function FeaturedCard({
  event,
  onDetail,
  onBook,
}: {
  event: EventData;
  onDetail: () => void;
  onBook: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group mb-6 md:mb-8"
      onClick={onDetail}
    >
      {/* Background image */}
      <div className="relative aspect-[16/9] md:aspect-[21/8] overflow-hidden">
        <motion.img
          src={event.img}
          alt={event.title}
          className="w-full h-full object-cover warm-image"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1209]/95 via-[#1C1209]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1209]/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(139,99,68,0.15),transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end md:items-center p-5 sm:p-8 md:p-12 lg:p-16">
        <div className="max-w-xl w-full">
          {/* Top label */}
          <div className="hidden md:flex items-center gap-2 mb-5">
            <span className="w-5 h-px bg-[#F5C87A]/60" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#F5C87A]/70">Event Pilihan</span>
          </div>

          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
            <span
              className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full font-medium text-[#F7F0E3]"
              style={{ backgroundColor: event.tagColor }}
            >
              {event.tag}
            </span>
            <StatusBadge status={event.status} />
            {event.performer && (
              <span className="hidden sm:inline text-[10px] text-[#F5C87A]/70 px-3 py-1 rounded-full border border-[#F5C87A]/20">
                🎵 {event.performer}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] leading-[1.1] mb-3"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)" }}
          >
            {event.title}
          </h3>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-[#EDE0CC]/65 mb-4">
            <span className="flex items-center gap-1.5"><IcCalendar />{event.date}</span>
            <span className="flex items-center gap-1.5"><IcClock />{event.time}</span>
            {event.price && <span className="flex items-center gap-1.5"><IcTicket />{event.price}</span>}
          </div>

          {/* Long desc — desktop only */}
          <p className="hidden md:block text-[#EDE0CC]/55 text-sm leading-relaxed mb-5 max-w-md">
            {event.desc}
          </p>

          {/* Capacity — desktop only */}
          {event.status === "open" && (
            <div className="hidden md:block mb-6 max-w-xs">
              <CapacityBar capacity={event.capacity} registered={event.registered} />
            </div>
          )}

          {/* CTAs */}
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {event.status === "open" ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={onBook}
                className="bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3] px-6 md:px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-colors duration-300 pulse-glow"
              >
                Daftar Sekarang →
              </motion.button>
            ) : (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                href={`https://wa.me/6282130728924?text=${encodeURIComponent(
                  `Halo, saya tertarik dengan event "${event.title}" tanggal ${event.date}. Bisa info lebih lanjut?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#7A8C6E]/80 hover:bg-[#7A8C6E] text-[#F7F0E3] px-6 md:px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-colors duration-300"
              >
                Tanya Info
              </motion.a>
            )}
            <button
              onClick={onDetail}
              className="border border-[#EDE0CC]/20 hover:border-[#F5C87A] text-[#EDE0CC]/65 hover:text-[#F5C87A] px-6 py-3 rounded-full text-sm font-medium tracking-wide backdrop-blur-sm transition-all duration-300"
            >
              Detail Event
            </button>
          </div>
        </div>
      </div>

      {/* Date badge — top right */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-[#2E1F14]/80 backdrop-blur-sm border border-[#8B6344]/30 rounded-xl px-4 py-3 text-center shadow-lg">
        <span className="block font-[family-name:var(--font-playfair)] text-[#F5C87A] text-3xl md:text-4xl leading-none font-semibold">
          {event.dateShort}
        </span>
        <span className="block text-[#EDE0CC]/50 text-[10px] uppercase tracking-widest mt-1">
          {event.month}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Small event card ──────────────────────────────────────────────── */
function EventCard({
  event,
  index,
  onDetail,
  onBook,
}: {
  event: EventData;
  index: number;
  onDetail: () => void;
  onBook: () => void;
}) {
  return (
    <FadeIn delay={index * 0.07}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={onDetail}
        className="bg-[#F7F0E3]/5 border border-[#8B6344]/15 rounded-2xl overflow-hidden hover:border-[#8B6344]/40 transition-colors duration-500 group cursor-pointer flex flex-col h-full"
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <img
            src={event.img}
            alt={event.title}
            className="w-full h-full object-cover warm-image transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1209]/85 via-[#1C1209]/10 to-transparent" />

          {/* Date badge */}
          <div className="absolute top-3 right-3 bg-[#1C1209]/75 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-center">
            <span className="block font-[family-name:var(--font-playfair)] text-[#F5C87A] text-lg leading-none font-semibold">
              {event.dateShort}
            </span>
            <span className="block text-[#EDE0CC]/55 text-[9px] uppercase tracking-wider mt-0.5">
              {event.month}
            </span>
          </div>

          {/* Category tag */}
          <span
            className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full font-medium text-[#F7F0E3]"
            style={{ backgroundColor: event.tagColor }}
          >
            {event.tag}
          </span>

          {/* Status at bottom-left */}
          <div className="absolute bottom-3 left-3">
            <StatusBadge status={event.status} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2 text-[#EDE0CC]/40 text-xs">
            <span>{event.time}</span>
            {event.price && (
              <>
                <span>·</span>
                <span className="text-[#F5C87A]/75">{event.price}</span>
              </>
            )}
          </div>
          <h3 className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-base md:text-lg mb-2 leading-tight">
            {event.title}
          </h3>
          <p className="text-[#EDE0CC]/50 text-sm leading-relaxed line-clamp-2 flex-1">
            {event.desc}
          </p>

          {event.status === "open" && (
            <CapacityBar capacity={event.capacity} registered={event.registered} />
          )}

          {/* Footer row */}
          <div
            className="mt-4 flex items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[#F5C87A]/55 text-xs group-hover:text-[#F5C87A] transition-colors duration-200">
              Lihat detail →
            </span>
            {event.status === "open" && (
              <button
                onClick={onBook}
                className="bg-[#8B6344]/20 hover:bg-[#8B6344] text-[#F5C87A] hover:text-[#F7F0E3] text-xs px-3.5 py-1.5 rounded-full border border-[#8B6344]/35 hover:border-transparent transition-all duration-200"
              >
                Daftar
              </button>
            )}
            {event.status === "coming" && (
              <a
                href={`https://wa.me/6282130728924?text=${encodeURIComponent(
                  `Halo, saya ingin notifikasi untuk event "${event.title}" tanggal ${event.date}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EDE0CC]/35 hover:text-[#F5C87A] text-xs transition-colors duration-200"
              >
                Notifikasi →
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

/* ─── Event detail modal ────────────────────────────────────────────── */
function EventModal({
  event,
  onClose,
  onBook,
}: {
  event: EventData;
  onClose: () => void;
  onBook: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] bg-[#1C1209]/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0 }}
        className="bg-[#2E1F14] rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          <img
            src={event.img}
            alt={event.title}
            className="w-full h-full object-cover warm-image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E1F14] via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-[#1C1209]/70 backdrop-blur rounded-full flex items-center justify-center text-[#EDE0CC]/80 hover:text-[#F7F0E3] hover:bg-[#1C1209] transition-colors"
            aria-label="Tutup"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          {/* Overlay badges */}
          <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
            <span
              className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-medium text-[#F7F0E3]"
              style={{ backgroundColor: event.tagColor }}
            >
              {event.tag}
            </span>
            <StatusBadge status={event.status} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-2xl leading-tight">
            {event.title}
          </h3>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-[#EDE0CC]/65">
            <span className="flex items-center gap-1.5"><IcCalendar />{event.date}</span>
            <span className="flex items-center gap-1.5"><IcClock />{event.time}</span>
            {event.price && (
              <span className="flex items-center gap-1.5"><IcTicket />{event.price}</span>
            )}
          </div>

          {event.performer && (
            <p className="text-[#F5C87A] text-sm font-medium">🎵 {event.performer}</p>
          )}

          <p className="text-[#EDE0CC]/65 text-sm leading-relaxed">
            {event.longDesc || event.desc}
          </p>

          {event.status === "open" && (
            <CapacityBar capacity={event.capacity} registered={event.registered} />
          )}

          {/* Action buttons */}
          <div className="pt-2 flex gap-3">
            {event.status === "open" ? (
              <button
                onClick={onBook}
                className="flex-1 bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3] py-3.5 rounded-xl font-medium tracking-wide transition-colors duration-300 text-sm"
              >
                Daftar Sekarang →
              </button>
            ) : event.status === "coming" ? (
              <a
                href={`https://wa.me/6282130728924?text=${encodeURIComponent(
                  `Halo, saya tertarik dengan event "${event.title}" tanggal ${event.date}. Bisa info lebih lanjut?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#7A8C6E] hover:bg-[#8fa07f] text-[#F7F0E3] py-3.5 rounded-xl font-medium tracking-wide transition-colors duration-300 text-sm text-center"
              >
                Tanya & Notifikasi
              </a>
            ) : (
              <div className="flex-1 bg-[#6B5744]/40 text-[#EDE0CC]/40 py-3.5 rounded-xl font-medium tracking-wide text-sm text-center cursor-not-allowed">
                Event Sudah Penuh
              </div>
            )}
            <button
              onClick={onClose}
              className="px-5 py-3.5 rounded-xl border border-[#8B6344]/30 text-[#EDE0CC]/55 hover:text-[#EDE0CC] hover:border-[#8B6344] transition-colors text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main section ──────────────────────────────────────────────────── */
export default function Events() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const filtered =
    activeTab === "Semua" ? events : events.filter((e) => e.tag === activeTab);

  const featuredEvent = filtered.find((e) => e.featured) ?? filtered[0];
  const gridEvents = filtered.filter((e) => e !== featuredEvent);

  const handleBook = (event: EventData) => {
    setSelectedEvent(null);
    window.location.href = `/reservasi?type=event&eventId=${encodeURIComponent(String(event.id))}`;
  };

  return (
    <>
      <section
        id="events"
        className="bg-[#2E1F14] py-16 md:py-36 relative overflow-hidden"
      >
        {/* Grain */}
        <div className="grain absolute inset-0 pointer-events-none opacity-25" />
        {/* Ambient warm glow */}
        <div className="ambient-glow absolute inset-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* ── Header ── */}
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
            <div>
              <p className="text-[#F5C87A] text-[10px] md:text-xs uppercase tracking-[0.45em] mb-4">
                Event &amp; Momen
              </p>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] leading-[1.15]"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Ruang yang selalu punya
                <br />
                <span className="italic text-[#F5C87A]">cerita baru.</span>
              </h2>
              <p className="text-[#EDE0CC]/45 text-sm mt-4 max-w-md">
                Acoustic nights, workshop kopi, gathering komunitas — tempat di
                mana momen dibuat, bukan hanya terjadi.
              </p>
            </div>

            <a
              href={`https://wa.me/6282130728924?text=${encodeURIComponent(
                "Halo, saya ingin menanyakan soal event di Bilik Kita."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#8B6344]/35 hover:border-[#F5C87A] text-[#EDE0CC]/65 hover:text-[#F5C87A] px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 shrink-0"
            >
              Tanyakan soal event
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </FadeIn>

          {/* ── Filter tabs ── */}
          <FadeIn delay={0.1} className="mb-8 md:mb-12">
            <FilterTabs active={activeTab} onChange={setActiveTab} />
          </FadeIn>

          {/* ── Content area (animated on tab change) ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {filtered.length === 0 ? (
                <div className="text-center py-24 text-[#EDE0CC]/35">
                  <p className="font-[family-name:var(--font-playfair)] text-xl mb-2">
                    Belum ada event untuk kategori ini.
                  </p>
                  <p className="text-sm">Pantau terus — event baru segera hadir.</p>
                </div>
              ) : (
                <>
                  {/* Featured event */}
                  {featuredEvent && (
                    <FeaturedCard
                      event={featuredEvent}
                      onDetail={() => setSelectedEvent(featuredEvent)}
                      onBook={() => handleBook(featuredEvent)}
                    />
                  )}

                  {/* Grid of remaining events */}
                  {gridEvents.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                      {gridEvents.map((ev, i) => (
                        <EventCard
                          key={ev.id}
                          event={ev}
                          index={i}
                          onDetail={() => setSelectedEvent(ev)}
                          onBook={() => handleBook(ev)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── Private event CTA ── */}
          <FadeIn delay={0.2} className="mt-12 md:mt-20">
            <div className="relative bg-gradient-to-r from-[#8B6344]/12 via-[#C4775A]/8 to-[#F5C87A]/5 border border-[#8B6344]/20 rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
              {/* Ambient decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F5C87A]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <p className="text-[#F5C87A] text-[10px] uppercase tracking-[0.4em] mb-3">Private Event</p>
                <h3 className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-xl md:text-2xl mb-2">
                  Punya acara private?
                </h3>
                <p className="text-[#EDE0CC]/50 text-sm max-w-md leading-relaxed">
                  Ulang tahun, gathering kantor, photoshoot, pop-up market — kami
                  siapkan ruang khusus untukmu. Kapasitas hingga 80 orang.
                </p>
              </div>

              <a
                href={`https://wa.me/6282130728924?text=${encodeURIComponent(
                  "Halo, saya ingin mendiskusikan private event di Bilik Kita."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto shrink-0 bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3] px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 active:scale-[0.96] relative z-10 text-center"
              >
                Diskusikan bersama kami
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Event detail modal ── */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onBook={() => handleBook(selectedEvent)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
