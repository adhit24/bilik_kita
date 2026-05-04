import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AtmosphereGallery from "@/components/AtmosphereGallery";
import Experience from "@/components/Experience";
import MenuHighlight from "@/components/MenuHighlight";
import Events from "@/components/Events";
import Testimonials from "@/components/Testimonials";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBookingBar from "@/components/MobileBookingBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <AtmosphereGallery />
        <Experience />
        <MenuHighlight />
        <Events />
        <Testimonials />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBookingBar />
    </>
  );
}
