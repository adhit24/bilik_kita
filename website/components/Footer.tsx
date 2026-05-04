export default function Footer() {
  const year = new Date().getFullYear();
  const waLink = `https://wa.me/6282130728924?text=${encodeURIComponent(
    "Halo Bilik Kita! Saya ingin bertanya."
  )}`;

  return (
    <footer className="bg-[#1C1209] border-t border-[#8B6344]/15 relative overflow-hidden">
      {/* Warm ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-[#8B6344]/40 to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 md:pt-16 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 pb-10 md:pb-14 border-b border-[#8B6344]/12">

          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo.png"
                alt="Logo Bilik Kita"
                className="w-10 h-10 rounded-full object-cover ring-1 ring-[#F5C87A]/25 shrink-0"
                loading="lazy"
              />
              <div>
                <p className="font-[family-name:var(--font-playfair)] text-[#F7F0E3] text-base leading-tight">
                  Bilik Kita
                </p>
                <p className="text-[#EDE0CC]/35 text-xs">Cafe &amp; Eatery</p>
              </div>
            </div>

            <p className="text-[#EDE0CC]/50 text-sm leading-relaxed mb-6 max-w-[26ch]">
              Tempat untuk kembali — ruang hangat yang mengingatmu di Cirebon.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/bilikkita.eatery/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[#8B6344]/30 hover:border-[#F5C87A] flex items-center justify-center text-[#EDE0CC]/45 hover:text-[#F5C87A] transition-all duration-200"
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-[#8B6344]/30 hover:border-[#F5C87A] flex items-center justify-center text-[#EDE0CC]/45 hover:text-[#F5C87A] transition-all duration-200"
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://maps.app.goo.gl/rbrKaKU9C7HVNFeH9"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
                className="w-9 h-9 rounded-full border border-[#8B6344]/30 hover:border-[#F5C87A] flex items-center justify-center text-[#EDE0CC]/45 hover:text-[#F5C87A] transition-all duration-200"
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="text-[#F5C87A] text-[10px] uppercase tracking-[0.4em] mb-5">Menu</p>
            <ul className="space-y-3">
              {[
                { label: "Tentang Kami", href: "/#about" },
                { label: "Suasana", href: "/#about" },
                { label: "Menu Kami", href: "/#menu" },
                { label: "Event & Momen", href: "/#events" },
                { label: "Reservasi", href: "/reservasi" },
                { label: "Lokasi", href: "/#location" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[#EDE0CC]/50 hover:text-[#EDE0CC] text-sm transition-colors duration-200 hover:translate-x-0.5 inline-block"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact + Hours */}
          <div>
            <p className="text-[#F5C87A] text-[10px] uppercase tracking-[0.4em] mb-5">Info</p>

            {/* Address */}
            <div className="mb-6">
              <p className="text-[#EDE0CC]/35 text-[10px] uppercase tracking-wider mb-2">Alamat</p>
              <a
                href="https://maps.app.goo.gl/rbrKaKU9C7HVNFeH9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EDE0CC]/60 text-sm leading-relaxed hover:text-[#EDE0CC] transition-colors duration-200"
              >
                Jl. Pangeran Cakrabuana No.200,<br />
                Wanasaba Kidul, Kec. Talun,<br />
                Kabupaten Cirebon 45171
              </a>
            </div>

            {/* Hours */}
            <div className="mb-6">
              <p className="text-[#EDE0CC]/35 text-[10px] uppercase tracking-wider mb-2">Jam Buka</p>
              <div className="space-y-1.5">
                {[
                  { day: "Senin – Jumat", time: "08.00 – 22.00" },
                  { day: "Sabtu", time: "07.00 – 22.00" },
                  { day: "Minggu", time: "07.00 – 21.00" },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <span className="text-[#EDE0CC]/45">{h.day}</span>
                    <span className="text-[#EDE0CC]/75 tabular-nums">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#EDE0CC]/55 hover:text-[#F5C87A] text-sm transition-colors duration-200"
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              082130728924
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#EDE0CC]/25 text-xs">
            © {year} Bilik Kita Cafe &amp; Eatery — Cirebon
          </p>
          <p className="text-[#EDE0CC]/20 text-xs italic font-[family-name:var(--font-playfair)]">
            "A room that remembers you."
          </p>
        </div>
      </div>
    </footer>
  );
}
