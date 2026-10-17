import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { ArrowDownRight, TerminalSquare, Download } from "lucide-react";
import { HeroCanvas } from "./HeroCanvas";
import { scrollToId, openResume } from "../utils/scroll";

const Counter = ({ to, suffix = "", testid }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} data-testid={testid} className="font-display text-3xl sm:text-4xl font-extrabold text-emerald-400 glow-text">
      {val}
      {suffix}
    </span>
  );
};

const MaskedLine = ({ children, delay }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

const STATS = [
  { to: 4, suffix: "+", label: "Years Experience", testid: "stats-counter-years" },
  { to: 40, suffix: "%", label: "Automation Boost", testid: "stats-counter-boost" },
  { to: 100, suffix: "+", label: "Projects Shipped", testid: "stats-counter-projects" },
];

export const Hero = () => (
  <section id="top" className="relative min-h-screen flex items-center grid-bg overflow-hidden" data-testid="hero-section">
    <HeroCanvas />
    <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#07090e] via-[#07090e]/70 to-transparent pointer-events-none" />
    <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto pt-28 pb-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 rounded-full px-4 py-1.5 mb-8"
        data-testid="hero-status-badge"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono-code text-[11px] tracking-widest text-emerald-300 uppercase">
          Status: Available for Automation &amp; Architecture Work
        </span>
      </motion.div>

      <div className="font-mono-code text-emerald-500/80 text-sm mb-3">
        <MaskedLine delay={0.25}>{"~$ whoami"}</MaskedLine>
      </div>

      <h1 className="font-display font-extrabold tracking-tight text-4xl sm:text-7xl lg:text-8xl leading-[0.95] text-slate-50 break-words">
        <MaskedLine delay={0.35}>NEEL</MaskedLine>
        <MaskedLine delay={0.5}>
          <span className="text-emerald-400 glow-text">RUPARELIYA</span>
        </MaskedLine>
      </h1>

      <div className="mt-6 text-base md:text-lg text-slate-400 max-w-xl font-mono-code">
        <MaskedLine delay={0.7}>
          Python Developer <span className="text-emerald-500">×</span> Automation Engineer
        </MaskedLine>
        <MaskedLine delay={0.85}>
          <span className="text-slate-500 text-sm">
            Building self-running backends, trading pipelines &amp; browser bots that work while you sleep.
          </span>
        </MaskedLine>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.7 }}
        className="mt-10 flex flex-wrap items-center gap-4"
      >
        <button
          data-testid="hero-cta-terminal"
          onClick={() => {
            scrollToId("#terminal");
            setTimeout(() => window.dispatchEvent(new Event("focus-terminal")), 900);
          }}
          className="group inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#07090e] font-mono-code font-semibold text-sm px-6 py-3.5 rounded-md transition-colors duration-300"
        >
          <TerminalSquare size={17} className="transition-transform duration-300 group-hover:rotate-6" />
          Explore CLI Terminal
        </button>
        <button
          data-testid="hero-cta-contact"
          onClick={() => scrollToId("#contact")}
          className="group inline-flex items-center gap-2 border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-500/10 text-emerald-300 font-mono-code text-sm px-6 py-3.5 rounded-md transition-colors duration-300"
        >
          Initiate Project
          <ArrowDownRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
        </button>
        <button
          data-testid="hero-cta-resume"
          onClick={openResume}
          className="group inline-flex items-center gap-2 border border-slate-700 hover:border-emerald-400 text-slate-300 hover:text-emerald-300 font-mono-code text-sm px-6 py-3.5 rounded-md transition-colors duration-300"
        >
          Resume
          <Download size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.25, duration: 0.8 }}
        className="mt-16 grid grid-cols-3 gap-6 max-w-lg"
      >
        {STATS.map((s) => (
          <div key={s.testid}>
            <Counter to={s.to} suffix={s.suffix} testid={s.testid} />
            <div className="font-mono-code text-[11px] text-slate-500 mt-1 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);
