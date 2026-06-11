import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Partners from "./sections/Partners";
import About from "./sections/About";
import Gallery from "./sections/Gallery";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Partners />
      <About />
      <Gallery />
      <CTA />
      <Footer />
    </main>
  );
}
