import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bilik Kita Cafe & Resto — Tempatmu Pulang",
  description:
    "Cafe & resto dengan suasana hangat, makanan yang dibuat dengan penuh perhatian, dan ruang untuk berkumpul. Bukan sekadar kafe.",
  keywords: ["bilik kita", "cafe", "resto", "cirebon", "talun", "reservasi"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
