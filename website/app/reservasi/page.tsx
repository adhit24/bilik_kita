import Navbar from "@/components/Navbar";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ReservasiPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Reservation />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
