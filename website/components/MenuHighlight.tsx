"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const menuItems = [
  {
    id: 1,
    category: "Signature",
    name: "Kopi Pagi",
    desc: "Single origin Flores, diseduh pelan. Untuk hari yang belum buru-buru.",
    price: "Rp 38.000",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    tag: "Best Seller",
    tagColor: "#C4775A",
  },
  {
    id: 2,
    category: "Makanan",
    name: "Toast Alpukat & Telur",
    desc: "Roti sourdough panggang, alpukat segar, telur poached, dan fleur de sel.",
    price: "Rp 55.000",
    img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80",
    tag: "Chef's Pick",
    tagColor: "#7A8C6E",
  },
  {
    id: 3,
    category: "Minuman",
    name: "Es Susu Gula Aren",
    desc: "Susu segar lokal, gula aren asli dari Sulawesi, es batu batu — dingin yang pas.",
    price: "Rp 32.000",
    img: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&q=80",
    tag: "Favorit",
    tagColor: "#F5C87A",
  },
  {
    id: 4,
    category: "Cemilan",
    name: "Banana Bread",
    desc: "Dipanggang tiap pagi. Hangat, lembut, dan aroma kayu manis yang pas.",
    price: "Rp 28.000",
    img: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=80",
    tag: "Pagi Hari",
    tagColor: "#8B6344",
  },
];

export default function MenuHighlight() {
  return (
    <section id="menu" className="bg-[#EDE0CC] py-14 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16 gap-6">
          <div>
            <p className="text-[#8B6344] text-xs uppercase tracking-[0.35em] mb-4">Menu Kami</p>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#1C1209] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Dari bahan yang
              <br />
              <span className="italic text-[#8B6344]">kami pilih sendiri.</span>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#8B6344] hover:text-[#C4775A] text-sm font-medium transition-colors group"
          >
            Lihat Menu Lengkap
            <svg
              width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {menuItems.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group bg-[#F7F0E3] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-[box-shadow] duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] outline outline-1 -outline-offset-1 outline-black/10"
                  />
                  {/* Tag */}
                  <span
                    className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full font-medium text-[#F7F0E3]"
                    style={{ backgroundColor: item.tagColor }}
                  >
                    {item.tag}
                  </span>
                  {/* Category */}
                  <span className="absolute top-3 right-3 text-[10px] text-[#EDE0CC]/90 bg-[#2E1F14]/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 md:p-5">
                  <h3 className="font-[family-name:var(--font-playfair)] text-[#1C1209] text-base md:text-lg mb-2">
                    {item.name}
                  </h3>
                  <p className="text-[#6B5744] text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2 sm:line-clamp-none">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#8B6344] text-sm">{item.price}</span>
                    <span className="text-[#8B6344]/50 text-xs">—</span>
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
