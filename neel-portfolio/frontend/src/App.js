import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { setLenis } from "@/utils/scroll";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProfileCard } from "@/components/ProfileCard";
import { Architecture } from "@/components/Architecture";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { TerminalCLI } from "@/components/TerminalCLI";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ResumeModal } from "@/components/ResumeModal";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    setLenis(lenis);
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div className="App bg-[#07090e] text-slate-100 min-h-screen">
      <div className="grain-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ProfileCard />
        <Architecture />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <TerminalCLI />
        <Contact />
      </main>
      <Footer />
      <ResumeModal />
      <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: "#0b0f18", border: "1px solid rgba(16,185,129,0.35)", color: "#e2e8f0" } }} />
    </div>
  );
}

export default App;
