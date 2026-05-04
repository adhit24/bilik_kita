"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

const reviews = [
  {
    id: 1,
    name: "Anisa R.",
    role: "Pelanggan Setia",
    quote:
      "Setiap Sabtu pagi, saya selalu ke sini. Bukan karena kopi terbaiknya — tapi karena tidak ada tempat lain yang bikin saya pengen duduk lebih lama dari yang direncanakan.",
    location: "Jakarta",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=100&q=80",
    stars: 5,
  },
  {
    id: 2,
    name: "Dimas P.",
    role: "Fotografer",
    quote:
      "Lighting-nya natural dan konsisten. Saya udah photoshoot di sini tiga kali — hasilnya selalu hangat. Dan toast alpukatnya selalu enak. Deal sempurna.",
    location: "Bandung",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    stars: 5,
  },
  {
    id: 3,
    name: "Maya & Keluarga",
    role: "Pengunjung Weekend",
    quote:
      "Susah cari kafe yang nyaman buat anak sekaligus bikin orang tua ngerasa relax. Bilik Kita entah gimana caranya berhasil. Kami selalu balik.",
    location: "Depok",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    stars: 5,
  },
  {
    id: 4,
    name: "Rifaldi S.",
    role: "Remote Worker",
    quote:
      "Work from cafe yang benar-benar bikin produktif. Wifi stabil, soket listrik ada, kopi enak — dan suasananya bikin gak pengen tutup laptop.",
    location: "Yogyakarta",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    stars: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? reviews.length - 1 : a - 1));
  const next = () => setActive((a) => (a === reviews.length - 1 ? 0 : a + 1));

  return (
    <section className="bg-[#2E1F14] py-14 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn className="text-center mb-10 md:mb-16">
          <p className="text-[#F5C87A] text-xs uppercase tracking-[0.35em] mb-4">Yang Mereka Rasakan</p>
          <h2
            className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Bukan sekadar
            <span className="italic text-[#F5C87A]"> ulasan.</span>
          </h2>
        </FadeIn>

        {/* Main testimonial */}
        <div className="relative min-h-[320px] sm:min-h-[280px] flex items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)", transition: { duration: 0.15, ease: "easeIn" } }}
              transition={{ type: "spring", duration: 0.4, bounce: 0 }}
              className="text-center px-4 md:px-16"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: reviews[active].stars }).map((_, i) => (
                  <span key={i} className="text-[#F5C87A] text-lg">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-base md:text-2xl leading-relaxed italic mb-6 md:mb-8">
                "{reviews[active].quote}"
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={reviews[active].img}
                  alt={reviews[active].name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#8B6344]/40 outline outline-1 -outline-offset-1 outline-white/10"
                />
                <div className="text-left">
                  <p className="text-[#EDE0CC] font-medium text-sm">{reviews[active].name}</p>
                  <p className="text-[#EDE0CC]/40 text-xs">{reviews[active].role} · {reviews[active].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8 md:mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-[#8B6344]/40 hover:border-[#F5C87A] text-[#EDE0CC]/60 hover:text-[#F5C87A] flex items-center justify-center transition-[border-color,color,scale] duration-200 active:scale-[0.96]"
            aria-label="Sebelumnya"
          >
            ←
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-[width,background-color] duration-300"
                style={{
                  width: i === active ? "24px" : "8px",
                  height: "8px",
                  backgroundColor: i === active ? "#F5C87A" : "#8B6344",
                }}
                aria-label={`Ulasan ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-[#8B6344]/40 hover:border-[#F5C87A] text-[#EDE0CC]/60 hover:text-[#F5C87A] flex items-center justify-center transition-[border-color,color,scale] duration-200 active:scale-[0.96]"
            aria-label="Berikutnya"
          >
            →
          </button>
        </div>

        {/* Metrics */}
        <FadeIn delay={0.2} className="grid grid-cols-3 gap-2 md:gap-8 mt-12 md:mt-20 pt-10 md:pt-16 border-t border-[#8B6344]/20">
          {[
            { num: "4.9", label: "Rating Google", sub: "dari 200+ ulasan" },
            { num: "3K+", label: "Tamu Puas", sub: "setiap bulannya" },
            { num: "95%", label: "Repeat Visit", sub: "pelanggan kembali" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-[family-name:var(--font-playfair)] text-[#F5C87A] text-xl md:text-4xl font-semibold mb-1 tabular-nums">
                {stat.num}
              </p>
              <p className="text-[#EDE0CC] text-xs md:text-sm">{stat.label}</p>
              <p className="text-[#EDE0CC]/40 text-xs mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
