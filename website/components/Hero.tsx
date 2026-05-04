"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";

const heroImages = [
  "/bg-ambience.png",
  "/bg-indoor.png",
  "/bg-outdoor.png",
];

const upcomingEvents = [
  { tag: "Live Music", title: "Acoustic Night Vol.4", date: "17 Mei" },
  { tag: "Workshop", title: "Workshop Kopi Dasar", date: "25 Mei" },
  { tag: "Komunitas", title: "Community Gather #12", date: "7 Jun" },
  { tag: "Sastra", title: "Poetry & Prose Night", date: "14 Jun" },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.9, bounce: 0 },
  },
};

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [eventIdx, setEventIdx] = useState(0);

  /* Parallax on scroll */
  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.22}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Auto-rotate hero background */
  useEffect(() => {
    const t = setInterval(() => setCurrentImg((p) => (p + 1) % heroImages.length), 6000);
    return () => clearInterval(t);
  }, []);

  /* Rotate event ticker */
  useEffect(() => {
    const t = setInterval(() => setEventIdx((p) => (p + 1) % upcomingEvents.length), 3500);
    return () => clearInterval(t);
  }, []);

  const ev = upcomingEvents[eventIdx];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background carousel ── */}
      <div ref={parallaxRef} className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${heroImages[currentImg]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </AnimatePresence>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1209]/80 via-[#2E1F14]/40 to-[#1C1209]/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B6344]/12 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#1C1209_100%)] opacity-45" />
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 text-center px-5 sm:px-6 max-w-4xl mx-auto pb-16 md:pb-0"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={item} className="flex justify-center mb-6">
          <img
            src="/logo-remove.png"
            alt="Bilik Kita"
            className="w-20 h-20 md:w-28 md:h-28 object-contain opacity-85"
          />
        </motion.div>

        {/* Event ticker pill */}
        <motion.div variants={item} className="flex justify-center mb-6">
          <a
            href="#events"
            className="inline-flex items-center gap-2.5 bg-[#1C1209]/60 backdrop-blur-md border border-[#8B6344]/30 hover:border-[#F5C87A]/50 px-4 py-2 rounded-full transition-all duration-300 group"
          >
            <span className="w-1.5 h-1.5 bg-[#F5C87A] rounded-full dot-live shrink-0" />
            <AnimatePresence mode="wait">
              <motion.span
                key={eventIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-[11px] text-[#EDE0CC]/80 font-[family-name:var(--font-dm-sans)] whitespace-nowrap"
              >
                <span className="text-[#F5C87A] font-medium">{ev.tag}</span>
                {" · "}
                {ev.title}
                {" — "}
                {ev.date}
              </motion.span>
            </AnimatePresence>
            <svg
              width="10"
              height="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="text-[#EDE0CC]/40 group-hover:text-[#F5C87A] transition-colors shrink-0"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        <motion.p
          variants={item}
          className="text-[#F5C87A] text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4 md:mb-5 font-[family-name:var(--font-dm-sans)]"
        >
          Cafe &amp; Eatery · Cirebon
        </motion.p>

        <motion.h1
          variants={item}
          className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] leading-[1.08] mb-5 md:mb-7"
          style={{ fontSize: "clamp(2.8rem, 7.5vw, 5.8rem)" }}
        >
          Tempat untuk
          <br />
          <span className="italic text-shimmer">kembali.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-[#EDE0CC]/60 text-sm md:text-lg max-w-lg mx-auto mb-8 md:mb-12 leading-relaxed font-[family-name:var(--font-dm-sans)]"
        >
          Ruang hangat yang mengingatmu — lewat kopi yang diseduh pelan,
          makanan dari bahan yang kami pilih sendiri, dan kursi yang menunggumu.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
        >
          <a
            href="/reservasi"
            className="hidden md:inline-flex items-center justify-center gap-2 bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3] px-9 py-4 rounded-full font-medium tracking-wide transition-all duration-300 active:scale-[0.96] text-sm pulse-glow"
          >
            Pesan Meja
          </a>
          <a
            href={`https://wa.me/6282130728924?text=${encodeURIComponent(
              "Halo Bilik Kita! Saya mau tanya dan pesan tempat."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden flex items-center justify-center bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3] px-9 py-4 rounded-full font-medium tracking-wide transition-all duration-300 active:scale-[0.96] text-sm pulse-glow"
          >
            Chat &amp; Reservasi
          </a>
          <a
            href="#events"
            className="flex items-center justify-center border border-[#EDE0CC]/25 hover:border-[#F5C87A] text-[#EDE0CC]/75 hover:text-[#F5C87A] px-9 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 backdrop-blur-sm"
          >
            Lihat Event →
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          className="hidden md:flex mt-20 flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-14 bg-gradient-to-b from-transparent via-[#F5C87A]/40 to-[#F5C87A]"
          />
          <span className="text-[#F5C87A]/35 text-[10px] uppercase tracking-[0.35em]">scroll</span>
        </motion.div>
      </motion.div>

      {/* Image indicator dots */}
      <div className="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImg(i)}
            className="transition-all duration-500 rounded-full"
            style={{
              width: i === currentImg ? "24px" : "6px",
              height: "6px",
              backgroundColor: i === currentImg ? "#F5C87A" : "rgba(139,99,68,0.5)",
            }}
            aria-label={`Gambar ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
