import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { NameScroll } from "@/components/NameScroll";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <NameScroll />
      <About />
      <Skills />
      {/* Projects and Experience to be added */}
      <Contact />
      <Footer />
    </main>
  );
}
