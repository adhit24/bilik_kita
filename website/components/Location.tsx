import FadeIn from "./FadeIn";

const hours = [
  { day: "Senin – Jumat", time: "08.00 – 22.00" },
  { day: "Sabtu", time: "07.00 – 22.00" },
  { day: "Minggu", time: "07.00 – 21.00" },
];

export default function Location() {
  const waLink = `https://wa.me/6282130728924?text=${encodeURIComponent("Halo Bilik Kita! Saya ingin bertanya.")}`;
  const mapsLink = "https://maps.app.goo.gl/rbrKaKU9C7HVNFeH9";
  const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    "6GV5+C6 Wanasaba Kidul, Kabupaten Cirebon, Jawa Barat"
  )}&output=embed`;

  return (
    <section id="location" className="bg-[#EDE0CC] py-14 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-10 md:mb-16">
          <p className="text-[#8B6344] text-xs uppercase tracking-[0.35em] mb-4">Temukan Kami</p>
          <h2
            className="font-[family-name:var(--font-playfair)] text-[#1C1209] leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Kami sudah di sini,
            <br />
            <span className="italic text-[#8B6344]">menunggumu.</span>
          </h2>
        </FadeIn>

        <div className="md:hidden">
          <FadeIn>
            {/* Map embed on mobile */}
            <div className="rounded-2xl overflow-hidden shadow-md mb-4" style={{ aspectRatio: "16/9" }}>
              <iframe
                src={mapsEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Lokasi Bilik Kita"
              />
            </div>

            <div className="rounded-2xl bg-[#F7F0E3] border border-[#8B6344]/20 p-5">
              <p className="text-[#1C1209] font-[family-name:var(--font-playfair)] font-medium mb-1">Bilik Kita Cafe &amp; Resto</p>
              <p className="text-[#6B5744] text-sm leading-relaxed">
                Jl. Pangeran Cakrabuana No.200, Wanasaba Kidul, Kec. Talun,
                Kabupaten Cirebon, Jawa Barat 45171
              </p>

              {/* Hours */}
              <div className="mt-4 space-y-1.5 pb-4 border-b border-[#8B6344]/10">
                {[
                  { day: "Senin – Jumat", time: "08.00 – 22.00" },
                  { day: "Sabtu", time: "07.00 – 22.00" },
                  { day: "Minggu", time: "07.00 – 21.00" },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between text-xs">
                    <span className="text-[#6B5744]">{h.day}</span>
                    <span className="text-[#1C1209] font-medium tabular-nums">{h.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-[#2E1F14] hover:bg-[#8B6344] text-[#F7F0E3] px-4 py-3 rounded-xl transition-colors duration-300 text-sm font-medium"
                >
                  Google Maps
                </a>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center border border-[#8B6344]/30 hover:border-[#8B6344] text-[#1C1209] px-4 py-3 rounded-xl transition-colors duration-300 text-sm font-medium"
                >
                  WhatsApp
                </a>
              </div>

              <a
                href="https://www.instagram.com/bilikkita.eatery/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center text-[#8B6344] hover:text-[#C4775A] text-sm font-medium transition-colors"
              >
                @bilikkita.eatery
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          {/* Map */}
          <FadeIn direction="left" className="order-2 md:order-1">
            <details className="md:hidden rounded-2xl border border-[#8B6344]/20 bg-[#F7F0E3] overflow-hidden">
              <summary className="list-none cursor-pointer px-5 py-4 flex items-center justify-between text-sm font-medium text-[#1C1209]">
                Lihat peta
                <span className="text-[#8B6344]/60 text-xs">tap</span>
              </summary>
              <div className="rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
                <iframe
                  src={mapsEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="Lokasi Bilik Kita"
                />
              </div>
            </details>

            <div className="hidden md:block rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
              <iframe
                src={mapsEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Lokasi Bilik Kita"
              />
            </div>
          </FadeIn>

          {/* Info */}
          <FadeIn direction="right" delay={0.15} className="order-1 md:order-2">
            <div className="space-y-6 md:space-y-8">
              {/* Address */}
              <div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[#1C1209] text-xl mb-3">Alamat</h3>
                <p className="text-[#6B5744] leading-relaxed">
                  Jl. Pangeran Cakrabuana No.200,<br />
                  Wanasaba Kidul, Kec. Talun,<br />
                  Kabupaten Cirebon, Jawa Barat 45171
                </p>
                <p className="text-[#8B6344]/60 text-xs mt-2">
                  Plus Code: 6GV5+C6 Wanasaba Kidul, Kabupaten Cirebon, Jawa Barat
                </p>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#8B6344] hover:text-[#C4775A] text-sm font-medium mt-3 transition-colors group"
                >
                  Buka di Google Maps
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="group-hover:translate-x-0.5 transition-transform">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              {/* Hours */}
              <div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[#1C1209] text-xl mb-3">Jam Buka</h3>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between text-sm border-b border-[#8B6344]/10 pb-2">
                      <span className="text-[#6B5744]">{h.day}</span>
                      <span className="text-[#1C1209] font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[#8B6344]/60 text-xs mt-3">* Jam buka dapat berubah di hari libur nasional</p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[#1C1209] text-xl mb-3">Hubungi Kami</h3>
                <div className="space-y-3">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#2E1F14] hover:bg-[#8B6344] text-[#F7F0E3] px-5 py-3 md:py-3.5 rounded-xl transition-colors duration-300 text-sm font-medium"
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat via WhatsApp
                  </a>
                  <a
                    href="https://www.instagram.com/bilikkita.eatery/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 border border-[#8B6344]/30 hover:border-[#8B6344] text-[#6B5744] hover:text-[#1C1209] px-5 py-3 md:py-3.5 rounded-xl transition-colors duration-300 text-sm font-medium"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                    @bilikkita.eatery di Instagram
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
