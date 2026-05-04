"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setDone(true);
  };

  return (
    <section className="bg-[#1C1209] py-14 md:py-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-[#F5C87A] text-xs uppercase tracking-[0.35em] mb-4">Newsletter</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-2xl md:text-3xl mb-3">
            Jadilah yang pertama tahu.
          </h2>
          <p className="text-[#EDE0CC]/50 text-sm mb-6 md:mb-8 leading-relaxed">
            Menu musiman, event terbaru, dan cerita kecil dari dapur kami —
            langsung ke kotak masukmu.
          </p>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.form
                key="form"
                exit={{ opacity: 0 }}
                onSubmit={submit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@kamu.com"
                  className="flex-1 bg-[#2E1F14] border border-[#8B6344]/30 focus:border-[#8B6344] text-[#EDE0CC] placeholder-[#6B5744]/60 rounded-full px-5 py-3 text-sm outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#8B6344] hover:bg-[#C4775A] text-[#F7F0E3] px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-[background-color,scale] duration-300 active:scale-[0.96] whitespace-nowrap"
                >
                  Gabung
                </button>
              </motion.form>
            ) : (
              <motion.p
                key="thanks"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#F5C87A] font-[family-name:var(--font-playfair)] text-lg italic"
              >
                Sampai jumpa di inbox-mu ✓
              </motion.p>
            )}
          </AnimatePresence>
          <p className="text-[#EDE0CC]/25 text-xs mt-4">Tanpa spam. Bisa unsubscribe kapan saja.</p>
        </FadeIn>
      </div>
    </section>
  );
}
