import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

import { GlobalScene } from "@/components/three/GlobalScene";

export default function Home() {
  return (
    <>
      <GlobalScene />
      <main className="relative z-10 min-h-screen text-foreground selection:bg-primary/30 pointer-events-none [&>*]:pointer-events-auto">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
