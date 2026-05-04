import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MenuPage from "@/components/MenuPage";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Menu — Bilik Kita Cafe & Resto",
  description: "Lihat lengkap menu kopi, minuman, makanan, dan snack Bilik Kita. Tersedia promo dan paket spesial.",
};

export default function MenuRoute() {
  return (
    <>
      <Navbar />
      <main>
        <MenuPage />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
