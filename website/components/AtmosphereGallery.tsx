"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=85",
    caption: "Tenang",
    alt: "Suasana dalam ruangan Bilik Kita",
    featured: true,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=85",
    caption: "Hangat",
    alt: "Secangkir kopi Bilik Kita",
    featured: false,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=85",
    caption: "Bersama",
    alt: "Tamu berkumpul bersama",
    featured: false,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=85",
    caption: "Lambat",
    alt: "Proses menyeduh kopi",
    featured: false,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85",
    caption: "Lezat",
    alt: "Hidangan spesial Bilik Kita",
    featured: false,
  },
];

/* Marquee ticker words — brand mood + identity */
const tickerWords = [
  "Hangat", "·", "Intim", "·", "Slow Living", "·",
  "Kopi", "·", "Nostalgia", "·", "Tempat Pulang", "·",
  "Live Music", "·", "Ngobrol Lama", "·", "Bilik Kita", "·",
  "Akar", "·", "Kebersamaan", "·", "Cirebon", "·",
  "Hujan + Kopi", "·", "Lupa Waktu", "·",
];
const doubled = [...tickerWords, ...tickerWords];

function PhotoCard({
  photo,
  index,
  className = "",
}: {
  photo: (typeof photos)[0];
  index: number;
  className?: string;
}) {
  return (
    <FadeIn
      delay={index * 0.08}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
    >
      <motion.img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-full object-cover warm-image outline outline-1 -outline-offset-1 outline-black/10"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1209]/65 via-transparent to-transparent" />

      {/* Caption — always visible on mobile, hover-reveal on desktop */}
      <div className="absolute bottom-3 left-3 md:hidden">
        <span className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-sm italic tracking-wide drop-shadow-md">
          {photo.caption}
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="hidden md:absolute md:inset-0 md:flex md:items-center md:justify-center"
      >
        <div className="bg-[#2E1F14]/75 backdrop-blur-sm px-5 py-2.5 rounded-full">
          <span className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-base italic tracking-wide">
            {photo.caption}
          </span>
        </div>
      </motion.div>
    </FadeIn>
  );
}

export default function AtmosphereGallery() {
  return (
    <section className="bg-[#EDE0CC] py-14 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <p className="text-[#8B6344] text-xs uppercase tracking-[0.35em] mb-3">Suasana</p>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#1C1209] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Sebelum datang,
              <br />
              <span className="italic text-[#8B6344]">rasakan dulu.</span>
            </h2>
          </div>
          <p className="text-[#6B5744] text-sm max-w-[28ch] leading-relaxed">
            Setiap sudut dirancang agar kamu betah — dan selalu ingin kembali.
          </p>
        </FadeIn>

        {/* Desktop editorial grid */}
        <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-3" style={{ height: "520px" }}>
          <PhotoCard photo={photos[0]} index={0} className="col-span-1 row-span-2" />
          <PhotoCard photo={photos[1]} index={1} />
          <PhotoCard photo={photos[2]} index={2} />
          <PhotoCard photo={photos[3]} index={3} />
          <PhotoCard photo={photos[4]} index={4} />
        </div>

        {/* Mobile grid */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {photos.map((photo, i) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={i}
              className={i === 0 ? "col-span-2 aspect-video" : "aspect-[4/3]"}
            />
          ))}
        </div>

        <FadeIn delay={0.5} className="flex justify-center mt-4">
          <p className="text-[#8B6344]/40 text-[10px] tracking-widest uppercase">
            <span className="md:hidden">tap untuk merasakan</span>
            <span className="hidden md:inline">arahkan kursor untuk merasakan</span>
          </p>
        </FadeIn>
      </div>

      {/* ── Brand mood marquee ticker ── */}
      <div className="mt-10 md:mt-14 relative w-full overflow-hidden border-t border-b border-[#8B6344]/15 py-3.5 bg-[#EDE0CC]">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#EDE0CC] to-transparent pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#EDE0CC] to-transparent pointer-events-none" />

        <div className="animate-marquee">
          {doubled.map((word, i) => (
            <span key={i} className={`px-4 text-sm font-[family-name:var(--font-dm-sans)] whitespace-nowrap ${
              word === "·"
                ? "text-[#8B6344]/30"
                : i % (tickerWords.length * 2) < tickerWords.length
                ? "text-[#6B5744]/60"
                : "text-[#8B6344]/75 font-medium"
            }`}>
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
