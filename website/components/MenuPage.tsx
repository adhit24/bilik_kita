"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

type Tab = "semua" | "coffee" | "noncoffee" | "makanan" | "snack" | "promo";
type MenuCat = "coffee" | "noncoffee" | "makanan" | "snack";

type MenuItem = {
  id: string;
  cat: MenuCat;
  name: string;
  desc: string;
  price: number;
  img: string;
  tag?: string;
  tagColor?: string;
  hot?: boolean;
};

type PromoItem = {
  id: string;
  name: string;
  desc: string;
  includes: string[];
  originalPrice: number;
  price: number;
  img: string;
  validNote?: string;
  tagColor: string;
};

const MENU: MenuItem[] = [
  // ── COFFEE ──
  {
    id: "c1", cat: "coffee", name: "Kopi Susu Gula Aren",
    desc: "Espresso, susu segar, gula aren asli Sulawesi. Segar, manis, pas.",
    price: 28000,
    img: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&q=80",
    tag: "Best Seller", tagColor: "#C4775A", hot: true,
  },
  {
    id: "c3", cat: "coffee", name: "Cappuccino",
    desc: "Espresso, steamed milk, foam sempurna. Klasik yang tidak pernah salah.",
    price: 28000,
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
  },
  {
    id: "c4", cat: "coffee", name: "Espresso Tonic",
    desc: "Shot espresso di atas air tonik dingin. Pahit, segar, berkelas.",
    price: 32000,
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    tag: "Signature", tagColor: "#8B6344",
  },
  {
    id: "c5", cat: "coffee", name: "Kopi Hitam",
    desc: "Robusta lokal, kuat dan jujur. Untuk hari yang butuh fokus.",
    price: 18000,
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80",
  },
  {
    id: "c6", cat: "coffee", name: "Cold Brew",
    desc: "Terendam 12 jam dalam air dingin. Smooth, less acidic, kafein lebih kuat.",
    price: 32000,
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80",
  },
  {
    id: "c7", cat: "coffee", name: "Kopi Pandan Latte",
    desc: "Espresso bertemu pandan segar — aroma Nusantara dalam secangkir.",
    price: 30000,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    tag: "New", tagColor: "#F5C87A",
  },
  // ── NON COFFEE ──
  {
    id: "nc1", cat: "noncoffee", name: "Matcha Latte",
    desc: "Matcha Uji grade, susu oat, sedikit madu. Earthy, creamy, menenangkan.",
    price: 32000,
    img: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=600&q=80",
    tag: "Favorit", tagColor: "#7A8C6E", hot: true,
  },
  {
    id: "nc2", cat: "noncoffee", name: "Coklat Panas Java",
    desc: "Coklat dari biji kakao Java. Kaya, gelap, tanpa rasa artificial.",
    price: 28000,
    img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&q=80",
  },
  {
    id: "nc3", cat: "noncoffee", name: "Lychee Sparkling Tea",
    desc: "Teh hijau, lychee, air soda. Ringan dan sangat menyegarkan.",
    price: 25000,
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
  },
  {
    id: "nc5", cat: "noncoffee", name: "Oreo Milkshake",
    desc: "Milkshake tebal, remahan oreo, whipped cream. Untuk mood yang butuh manis.",
    price: 35000,
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80",
  },
  {
    id: "nc7", cat: "noncoffee", name: "Lemon Ginger Cooler",
    desc: "Perasan lemon, jahe segar, madu, air soda dingin. Segar dan menyehatkan.",
    price: 25000,
    img: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=600&q=80",
  },
  // ── MAKANAN ──
  {
    id: "m1", cat: "makanan", name: "Nasi Goreng Bilik",
    desc: "Nasi goreng ayam, telur ceplok, kerupuk, acar. Resep dapur sendiri.",
    price: 35000,
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
    tag: "Best Seller", tagColor: "#C4775A", hot: true,
  },
  {
    id: "m2", cat: "makanan", name: "Toast Alpukat & Telur",
    desc: "Sourdough panggang, alpukat segar, telur poached, fleur de sel.",
    price: 45000,
    img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80",
    tag: "Chef's Pick", tagColor: "#7A8C6E",
  },
  {
    id: "m3", cat: "makanan", name: "Chicken Katsu Rice",
    desc: "Ayam katsu crispy, nasi putih, saus katsu homemade, salad segar.",
    price: 55000,
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
  },
  {
    id: "m4", cat: "makanan", name: "Mie Goreng Kampung",
    desc: "Mie kuning, ayam suwir, sayuran segar, bumbu rempah khas.",
    price: 32000,
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
  },
  {
    id: "m5", cat: "makanan", name: "Nasi Bakar Tongkol",
    desc: "Nasi dibungkus daun pisang, isian ikan tongkol, kemangi, dan tempe.",
    price: 40000,
    img: "https://images.unsplash.com/photo-1512058556646-c4da40fba323?w=600&q=80",
  },
  {
    id: "m6", cat: "makanan", name: "Pasta Aglio Olio",
    desc: "Spaghetti, bawang putih, chili flake, parmesan, olive oil premium.",
    price: 48000,
    img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80",
  },
  // ── SNACK ──
  {
    id: "s1", cat: "snack", name: "Banana Bread",
    desc: "Dipanggang tiap pagi. Hangat, lembut, aroma kayu manis yang pas.",
    price: 25000,
    img: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=80",
    tag: "Pagi Hari", tagColor: "#8B6344",
  },
  {
    id: "s2", cat: "snack", name: "French Fries",
    desc: "Kentang goreng garing, pilihan saus: keju cheddar atau BBQ.",
    price: 22000,
    img: "https://images.unsplash.com/photo-1576107232684-1279f57f29fc?w=600&q=80",
  },
  {
    id: "s3", cat: "snack", name: "Bruschetta",
    desc: "Roti ciabatta panggang, tomat segar, basil, parmesan, olive oil.",
    price: 28000,
    img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80",
  },
  {
    id: "s4", cat: "snack", name: "Pisang Goreng Keju",
    desc: "Pisang raja, adonan renyah, keju cheddar meleleh di atasnya.",
    price: 22000,
    img: "https://images.unsplash.com/photo-1574484284002-952d92a03a05?w=600&q=80",
  },
  {
    id: "s5", cat: "snack", name: "Dimsum 6 pcs",
    desc: "Dimsum udang & ayam kukus, disajikan dengan saus pedas manis.",
    price: 35000,
    img: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=600&q=80",
  },
  {
    id: "s6", cat: "snack", name: "Roti Bakar Selai",
    desc: "Roti tebal panggang. Pilih selai: strawberry, kacang, atau coklat.",
    price: 20000,
    img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80",
  },
];

const PROMOS: PromoItem[] = [
  {
    id: "p1", name: "Paket Ngopi Pagi",
    desc: "Mulai pagi dengan tenang — satu kopi pilihan dan toast alpukat yang hangat.",
    includes: ["1 Kopi Pilihan (Coffee)", "1 Toast Alpukat & Telur"],
    originalPrice: 80000, price: 65000,
    img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&q=80",
    validNote: "Berlaku 07.00 – 11.00 WIB",
    tagColor: "#8B6344",
  },
  {
    id: "p2", name: "Paket Makan Siang",
    desc: "Satu menu makan favorit, lengkap dengan minuman pilihan. Semua yang dibutuhkan.",
    includes: ["1 Menu Makanan Pilihan", "1 Minuman Non-Coffee"],
    originalPrice: 62000, price: 50000,
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    validNote: "Berlaku 11.00 – 15.00 WIB",
    tagColor: "#7A8C6E",
  },
  {
    id: "p3", name: "Paket Happy Hour",
    desc: "Dua kopi susu gula aren dan dua banana bread. Waktu terbaik untuk ngobrol.",
    includes: ["2 Kopi Susu Gula Aren", "2 Banana Bread"],
    originalPrice: 106000, price: 90000,
    img: "https://images.unsplash.com/photo-1455619452474-d2be8b1b70cd?w=600&q=80",
    validNote: "Berlaku 14.00 – 17.00 WIB",
    tagColor: "#C4775A",
  },
  {
    id: "p4", name: "Paket Meeting",
    desc: "Empat kopi pilihan dan empat snack. Cocok untuk meeting produktif 2 jam.",
    includes: ["4 Kopi Pilihan", "4 Snack Pilihan", "Meja prioritas 2 jam"],
    originalPrice: 260000, price: 210000,
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    tagColor: "#7A8C6E",
  },
  {
    id: "p5", name: "Paket Date Night",
    desc: "Momen yang layak dikenang — dua menu makanan, dua minuman, satu dessert.",
    includes: ["2 Main Course Pilihan", "2 Minuman Pilihan", "1 Banana Bread (Dessert)"],
    originalPrice: 216000, price: 175000,
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    validNote: "Min. 2 orang, berlaku makan malam",
    tagColor: "#C4775A",
  },
];

const TABS: { val: Tab; label: string; emoji: string; count?: number }[] = [
  { val: "semua", label: "Semua", emoji: "✦" },
  { val: "coffee", label: "Coffee", emoji: "☕", count: MENU.filter((m) => m.cat === "coffee").length },
  { val: "noncoffee", label: "Non Coffee", emoji: "🍵", count: MENU.filter((m) => m.cat === "noncoffee").length },
  { val: "makanan", label: "Makanan", emoji: "🍽", count: MENU.filter((m) => m.cat === "makanan").length },
  { val: "snack", label: "Snack", emoji: "🍌", count: MENU.filter((m) => m.cat === "snack").length },
  { val: "promo", label: "Promo & Paket", emoji: "✨" },
];

function fmt(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <FadeIn delay={index * 0.04}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="group bg-[#F7F0E3] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-[box-shadow] duration-300 h-full flex flex-col"
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
          {item.tag && (
            <span
              className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full font-medium text-[#F7F0E3]"
              style={{ backgroundColor: item.tagColor }}
            >
              {item.tag}
            </span>
          )}
          {item.hot && (
            <span className="absolute top-3 right-3 text-[10px] bg-[#2E1F14]/65 backdrop-blur-sm text-[#F5C87A] px-2 py-1 rounded-full">
              🔥 Populer
            </span>
          )}
        </div>
        <div className="p-4 md:p-5 flex flex-col flex-1">
          <h3 className="font-[family-name:var(--font-playfair)] text-[#1C1209] text-base md:text-lg mb-1.5 leading-tight">
            {item.name}
          </h3>
          <p className="text-[#6B5744] text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
            {item.desc}
          </p>
          <span className="font-semibold text-[#8B6344] text-sm">{fmt(item.price)}</span>
        </div>
      </motion.div>
    </FadeIn>
  );
}

function PromoCard({ promo, index }: { promo: PromoItem; index: number }) {
  const saved = promo.originalPrice - promo.price;
  return (
    <FadeIn delay={index * 0.07}>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3 }}
        className="group bg-[#2E1F14] rounded-2xl overflow-hidden border border-[#8B6344]/20 hover:border-[#8B6344]/50 transition-colors duration-300 flex flex-col md:flex-row h-full"
      >
        <div className="relative md:w-52 shrink-0" style={{ aspectRatio: "16/9" }}>
          <img
            src={promo.img}
            alt={promo.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#2E1F14]/80 via-[#2E1F14]/20 to-transparent" />
          <div
            className="absolute top-3 left-3 w-2 h-2 rounded-full ring-2 ring-white/20"
            style={{ backgroundColor: promo.tagColor }}
          />
        </div>
        <div className="p-5 flex flex-col justify-between flex-1">
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-lg mb-1.5 leading-tight">
              {promo.name}
            </h3>
            <p className="text-[#EDE0CC]/55 text-sm leading-relaxed mb-3">{promo.desc}</p>
            <ul className="space-y-1 mb-3">
              {promo.includes.map((inc, i) => (
                <li key={i} className="flex items-center gap-2 text-[#EDE0CC]/70 text-xs">
                  <span className="w-1 h-1 rounded-full bg-[#F5C87A]/60 shrink-0" />
                  {inc}
                </li>
              ))}
            </ul>
            {promo.validNote && (
              <p className="text-[#F5C87A]/60 text-[10px] uppercase tracking-wider">{promo.validNote}</p>
            )}
          </div>
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <span className="text-[#EDE0CC]/35 text-sm line-through">{fmt(promo.originalPrice)}</span>
            <span className="font-semibold text-[#F5C87A] text-lg">{fmt(promo.price)}</span>
            <span className="ml-auto text-[10px] bg-[#7A8C6E]/20 border border-[#7A8C6E]/30 text-[#7A8C6E] px-2.5 py-1 rounded-full whitespace-nowrap">
              Hemat {fmt(saved)}
            </span>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<Tab>("semua");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (activeTab === "promo") return [];
    const base = activeTab === "semua" ? MENU : MENU.filter((i) => i.cat === activeTab);
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter((i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q));
  }, [activeTab, search]);

  const showPromo = activeTab === "promo" || activeTab === "semua";

  return (
    <div className="min-h-screen bg-[#EDE0CC]">
      {/* Hero */}
      <section className="bg-[#2E1F14] pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[35%] h-full bg-[#8B6344]/5 rounded-bl-[80px] pointer-events-none" />
        <div className="grain absolute inset-0 pointer-events-none opacity-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn>
            <p className="text-[#F5C87A] text-[10px] uppercase tracking-[0.4em] mb-4">
              Bilik Kita Cafe &amp; Resto
            </p>
            <h1
              className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] leading-[1.1] mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Menu kami,{" "}
              <span className="italic text-[#F5C87A]">untuk harimu.</span>
            </h1>
            <p className="text-[#EDE0CC]/55 text-sm md:text-base max-w-xl leading-relaxed mb-8">
              Dari kopi yang diseduh pelan hingga makanan yang disiapkan dengan niat —
              semuanya dari bahan yang kami pilih sendiri.
            </p>
            <a
              href="/reservasi"
              className="inline-flex items-center gap-2 bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3] px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-colors duration-300"
            >
              Reservasi &amp; Pre-order →
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Sticky tab + search bar */}
      <div className="sticky top-[64px] z-30 bg-[#EDE0CC]/95 backdrop-blur-sm border-b border-[#8B6344]/15 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab.val}
                onClick={() => { setActiveTab(tab.val); setSearch(""); }}
                className={[
                  "shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wide border transition-all duration-200",
                  activeTab === tab.val
                    ? "bg-[#8B6344] border-[#8B6344] text-[#F7F0E3]"
                    : "border-[#8B6344]/25 text-[#6B5744] hover:border-[#8B6344]/50 hover:bg-[#8B6344]/5",
                ].join(" ")}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
                {tab.count && activeTab !== tab.val && (
                  <span className="text-[#8B6344]/50 text-[10px]">({tab.count})</span>
                )}
              </button>
            ))}
          </div>

          {activeTab !== "promo" && (
            <div className="relative shrink-0">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari menu..."
                className="bg-[#F7F0E3] border border-[#8B6344]/20 focus:border-[#8B6344] text-[#1C1209] placeholder-[#6B5744]/40 rounded-full px-4 pl-9 py-2 text-sm outline-none transition-all w-44 sm:w-52 font-[family-name:var(--font-dm-sans)]"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B6344]/50"
                width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        <AnimatePresence mode="wait">
          {activeTab !== "promo" && (
            <motion.div
              key={activeTab + search}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.28 }}
            >
              {filtered.length === 0 ? (
                <div className="text-center py-24 text-[#6B5744]/50">
                  <p className="font-[family-name:var(--font-playfair)] text-2xl mb-2">
                    Tidak ditemukan.
                  </p>
                  <p className="text-sm">Coba kata kunci lain.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                  {filtered.map((item, i) => (
                    <MenuCard key={item.id} item={item} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Promo & Paket section */}
        {showPromo && (
          <div className={activeTab !== "promo" ? "mt-16 md:mt-20" : ""}>
            <FadeIn>
              <div className="flex items-end gap-4 mb-8 md:mb-10">
                <div>
                  {activeTab === "semua" && (
                    <p className="text-[#8B6344] text-xs uppercase tracking-[0.35em] mb-1">
                      Spesial
                    </p>
                  )}
                  <h2 className="font-[family-name:var(--font-playfair)] text-[#1C1209] text-2xl md:text-3xl">
                    {activeTab === "promo" ? "Promo & Paket Spesial" : "Promo & Paket"}
                  </h2>
                  {activeTab === "promo" && (
                    <p className="text-[#6B5744] text-sm mt-2 max-w-xl">
                      Kombinasi menu terbaik dengan harga lebih hemat.
                      Bisa langsung dipilih saat reservasi meja.
                    </p>
                  )}
                </div>
                {activeTab === "semua" && <span className="flex-1 h-px bg-[#8B6344]/15 mb-1" />}
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {PROMOS.map((promo, i) => (
                <PromoCard key={promo.id} promo={promo} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA bottom */}
      <section className="bg-[#2E1F14] py-14 md:py-20 relative overflow-hidden">
        <div className="grain absolute inset-0 pointer-events-none opacity-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <p className="text-[#F5C87A] text-[10px] uppercase tracking-[0.4em] mb-4">
              Meja Menunggumu
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-2xl md:text-3xl mb-4">
              Pesan tempat,{" "}
              <span className="italic text-[#F5C87A]">sekarang juga.</span>
            </h2>
            <p className="text-[#EDE0CC]/50 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Reservasi meja dan pre-order menu favoritmu sebelum datang.
              Tanpa antri, tanpa bingung.
            </p>
            <a
              href="/reservasi"
              className="inline-flex items-center gap-2 bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3] px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-colors duration-300"
            >
              Reservasi Sekarang →
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
