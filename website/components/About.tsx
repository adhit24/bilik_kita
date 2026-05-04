"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section id="about" className="bg-[#EDE0CC] py-16 md:py-36 overflow-hidden relative">
      {/* Subtle grain */}
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-20 items-center relative z-10">
        {/* Image — dual stack */}
        <FadeIn direction="left" className="relative">
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src="/bg-indoor.png"
                alt="Interior Bilik Kita — ruang hangat dengan bata ekspos dan pencahayaan lembut"
                className="w-full h-full object-cover warm-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E1F14]/40 to-transparent" />
            </div>

            {/* Floating secondary image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-8 -right-6 w-[45%] rounded-xl overflow-hidden shadow-2xl border-4 border-[#EDE0CC]"
            >
              <img
                src="/bg-outdoor.png"
                alt="Area outdoor Bilik Kita — taman teduh dengan kursi kayu"
                className="w-full aspect-square object-cover warm-image"
              />
            </motion.div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -top-4 -left-4 bg-[#2E1F14] text-[#F7F0E3] rounded-xl p-4 shadow-2xl"
            >
              <p className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-semibold text-[#F5C87A] tabular-nums">
                5+
              </p>
              <p className="text-[10px] text-[#EDE0CC]/60 mt-0.5 tracking-wide">
                Tahun bersama<br />komunitas
              </p>
            </motion.div>
          </div>
        </FadeIn>

        {/* Text */}
        <FadeIn direction="right" delay={0.15}>
          <p className="text-[#8B6344] text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-dm-sans)]">
            Tentang Kami
          </p>
          <h2
            className="font-[family-name:var(--font-playfair)] text-[#1C1209] leading-[1.15] mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Bukan sekadar
            <br />
            <span className="italic text-[#8B6344]">kafe.</span>
          </h2>
          <span className="divider-warm mb-8 block" />
          
          <p className="text-[#6B5744] leading-relaxed mb-5 text-base md:text-lg">
            Di antara rumah dan pekerjaan, ada tempat di mana waktu terasa seperti
            milikmu lagi. Kami membangun itu dari nol — sebuah{" "}
            <em className="text-[#8B6344] not-italic font-medium">&quot;tempat ketiga&quot;</em>{" "}
            yang selalu menunggumu kembali.
          </p>

          <div className="hidden md:block space-y-4">
            <p className="text-[#6B5744] leading-relaxed">
              Setiap sudut kami rancang, setiap bahan kami pilih, setiap tamu kami
              sambut dengan satu tujuan: kamu merasa diterima sebelum memesan apapun.
            </p>
            <p className="text-[#6B5744] leading-relaxed">
              &quot;Bilik&quot; adalah ruang. &quot;Kita&quot; adalah kamu — yang sudah jadi bagian dari
              tempat ini sejak pertama kali duduk.
            </p>
          </div>

          {/* Mobile accordion */}
          <details className="md:hidden rounded-2xl border border-[#8B6344]/15 bg-[#F7F0E3] overflow-hidden mb-8">
            <summary className="list-none cursor-pointer px-5 py-4 flex items-center justify-between text-sm font-medium text-[#1C1209]">
              Baca cerita lengkap
              <span className="text-[#8B6344]/40 text-xs">tap</span>
            </summary>
            <div className="px-5 pb-5 space-y-3">
              <p className="text-[#6B5744] leading-relaxed text-sm">
                Setiap sudut kami rancang, setiap bahan kami pilih, setiap tamu kami
                sambut dengan satu tujuan: kamu merasa diterima sebelum memesan apapun.
              </p>
              <p className="text-[#6B5744] leading-relaxed text-sm">
                &quot;Bilik&quot; adalah ruang. &quot;Kita&quot; adalah kamu — yang sudah jadi bagian
                dari tempat ini sejak pertama kali duduk.
              </p>
            </div>
          </details>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 md:mt-10 mb-8">
            {["Live Music", "Workshop", "Gathering", "Private Event", "Family Friendly"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-[#8B6344]/20 text-[#8B6344] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href="/reservasi"
            className="hidden md:inline-flex items-center gap-2 bg-[#2E1F14] hover:bg-[#8B6344] text-[#F7F0E3] px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 active:scale-[0.96]"
          >
            Kunjungi Kami
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="https://maps.app.goo.gl/rbrKaKU9C7HVNFeH9"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden inline-flex items-center gap-2 bg-[#2E1F14] hover:bg-[#8B6344] text-[#F7F0E3] px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 active:scale-[0.96]"
          >
            Buka Lokasi
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
