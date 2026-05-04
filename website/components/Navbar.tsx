"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Tentang", href: "/#about" },
  { label: "Menu", href: "/#menu" },
  { label: "Event", href: "/#events" },
  { label: "Reservasi", href: "/reservasi" },
  { label: "Lokasi", href: "/#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#2E1F14]/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3"
          >
            <img
              src="/logo.png"
              alt="Logo Bilik Kita Cafe & Resto"
              className="w-9 h-9 rounded-full object-cover ring-1 ring-[#F5C87A]/30"
              loading="eager"
              decoding="async"
            />
            <span className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-lg md:text-xl font-semibold tracking-wide">
              <span className="sm:hidden">Bilik Kita</span>
              <span className="hidden sm:inline">Bilik Kita Cafe &amp; Resto</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[#EDE0CC]/80 hover:text-[#F5C87A] text-sm tracking-wide transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#F5C87A] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/reservasi"
              className="bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3] text-sm px-5 py-2.5 rounded-full transition-[background-color,scale] duration-300 active:scale-[0.96] font-medium tracking-wide"
            >
              Reservasi
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-3 -mr-1"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-[#EDE0CC] transition-[transform,opacity] duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#EDE0CC] transition-[transform,opacity] duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#EDE0CC] transition-[transform,opacity] duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#2E1F14] flex flex-col items-center justify-center gap-10"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMenuOpen(false)}
                className="font-[family-name:var(--font-playfair)] text-[#EDE0CC] text-3xl hover:text-[#F5C87A] transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href={`https://wa.me/6282130728924?text=${encodeURIComponent("Halo Bilik Kita Cafe & Resto! Saya mau tanya dan pesan tempat.")}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              onClick={() => setMenuOpen(false)}
              className="mt-4 bg-[#8B6344] text-[#F7F0E3] text-lg px-8 py-3 rounded-full"
            >
              Chat WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
