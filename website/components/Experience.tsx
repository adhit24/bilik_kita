"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const cards = [
  {
    id: "makan",
    label: "Makan",
    title: "Rasa yang\njujur.",
    desc: "Setiap hidangan dibuat dari bahan pilihan dengan resep yang pernah dimasak di dapur rumah.",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    accent: "#C4775A",
  },
  {
    id: "ngobrol",
    label: "Ngobrol",
    title: "Waktu\ntanpa tergesa.",
    desc: "Duduk selama yang kamu mau. Isi ulang kopimu. Kursinya tidak kemana-mana.",
    img: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=80",
    accent: "#7A8C6E",
  },
  {
    id: "event",
    label: "Event",
    title: "Ruang untuk\nberkumpul.",
    desc: "Dari intimate gathering hingga workshop kecil — kami menyiapkan ruang, kamu bawa ceritanya.",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    accent: "#8B6344",
  },
  {
    id: "keluarga",
    label: "Keluarga",
    title: "Semua\nditerima di sini.",
    desc: "Kafe yang cukup tenang untuk orang tua, cukup hangat untuk anak-anak, cukup luas untuk semua.",
    img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&q=80",
    accent: "#F5C87A",
  },
];

export default function Experience() {
  return (
    <section className="bg-[#2E1F14] py-14 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-10 md:mb-16">
          <p className="text-[#F5C87A] text-xs uppercase tracking-[0.35em] mb-4">
            Pengalaman
          </p>
          <h2
            className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Empat cara untuk
            <span className="italic text-[#F5C87A]"> menikmati</span> Bilik Kita
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {cards.map((card, i) => (
            <FadeIn key={card.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer exp-card"
              >
                {/* Background image */}
                <img
                  src={card.img}
                  alt={card.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] outline outline-1 -outline-offset-1 outline-black/10"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1209]/90 via-[#1C1209]/30 to-transparent" />

                {/* Label chip */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 rounded-full font-medium"
                    style={{ backgroundColor: card.accent + "33", color: card.accent, border: `1px solid ${card.accent}55` }}
                  >
                    {card.label}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3
                    className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-sm md:text-xl leading-snug mb-2 md:mb-3"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {card.title}
                  </h3>
                  {/* Mobile: always visible. Desktop: hover-reveal */}
                  <div className="grid transition-[grid-template-rows] duration-300 ease-out grid-rows-[1fr] md:grid-rows-[0fr] group-hover:grid-rows-[1fr]">
                    <p className="min-h-0 overflow-hidden text-[#EDE0CC]/70 text-xs md:text-sm leading-relaxed opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3 md:line-clamp-none">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
