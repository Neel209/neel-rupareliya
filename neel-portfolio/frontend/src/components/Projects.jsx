import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal, SectionTag } from "./Reveal";

const IMG = {
  a: "https://images.unsplash.com/photo-1646444254678-b937f153b221?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYWJzdHJhY3QlMjAzZCUyMG5lb24lMjBncmVlbiUyMGdlb21ldHJ5JTIwdGVjaG5vbG9neSUyMGN5YmVyfGVufDB8fHx8MTc5MjIyNDMzM3ww&ixlib=rb-4.1.0&q=85",
  b: "https://images.unsplash.com/photo-1648614593495-e0955bf287e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHszfHxkYXJrJTIwYWJzdHJhY3QlMjAzZCUyMG5lb24lMjBncmVlbiUyMGdlb21ldHJ5JTIwdGVjaG5vbG9neSUyMGN5YmVyfGVufDB8fHx8MTc5MjIyNDMzM3ww&ixlib=rb-4.1.0&q=85",
  c: "https://images.unsplash.com/photo-1645788437811-2ff9e2104423?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHw0fHxkYXJrJTIwYWJzdHJhY3QlMjAzZCUyMG5lb24lMjBncmVlbiUyMGdlb21ldHJ5JTIwdGVjaG5vbG9neSUyMGN5YmVyfGVufDB8fHx8MTc5MjIyNDMzM3ww&ixlib=rb-4.1.0&q=85",
};

const PROJECTS = [
  {
    testid: "project-card-trade-masters",
    span: "md:col-span-7",
    img: IMG.a,
    tag: "SaaS Platform",
    title: "Trade Masters",
    desc: "Algorithmic trading & subscription platform. Automated license provisioning, webhook-driven TradingView access control and usage analytics for thousands of daily trades.",
    stack: ["Flask", "MongoDB", "Webhooks", "Pine Script", "Redis"],
    metric: "10k+ trades/day",
  },
  {
    testid: "project-card-market-chart",
    span: "md:col-span-5",
    img: IMG.b,
    tag: "Automation Bot",
    title: "Market Chart Automation & Telegram Alerts",
    desc: "Headless chart-capture pipeline pushing real-time indicator snapshots and signals straight to Telegram channels.",
    stack: ["Python", "Selenium", "Telegram API", "Cron"],
    metric: "24/7 live",
  },
  {
    testid: "project-card-proof-ai",
    span: "md:col-span-5",
    img: IMG.c,
    tag: "AI Utility",
    title: "ProofAI",
    desc: "Document classification and verification pipeline that parses uploads, extracts fields and flags anomalies automatically.",
    stack: ["FastAPI", "Python", "OCR", "PostgreSQL"],
    metric: "90% manual work removed",
  },
  {
    testid: "project-card-kahanan-jewels",
    span: "md:col-span-7",
    img: IMG.a,
    tag: "E-Commerce",
    title: "Kahanan Jewels",
    desc: "Full-stack jewellery storefront with automated inventory sync, order lifecycle emails and a custom admin dashboard for catalogue management.",
    stack: ["React", "Flask", "MongoDB", "REST API"],
    metric: "100+ products automated",
  },
];

const TiltCard = ({ project, index }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 180, damping: 22 });
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 180, damping: 22 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    ref.current.style.setProperty("--sx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <Reveal delay={index * 0.08} className={project.span}>
      <motion.div
        ref={ref}
        data-testid={project.testid}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative h-full rounded-xl border border-emerald-500/20 bg-slate-950/70 backdrop-blur-xl overflow-hidden transition-colors duration-300 hover:border-emerald-500/50 [perspective:1000px]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{ background: "radial-gradient(340px circle at var(--sx, 50%) var(--sy, 50%), rgba(16,185,129,0.12), transparent 65%)" }}
        />
        <div className="relative h-40 overflow-hidden">
          <img
            src={project.img}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-transparent" />
          <span className="absolute top-4 left-4 font-mono-code text-[10px] tracking-widest uppercase text-emerald-300 bg-[#07090e]/80 border border-emerald-500/30 rounded px-2 py-1">
            {project.tag}
          </span>
          <span className="absolute top-4 right-4 font-mono-code text-[10px] font-semibold text-[#07090e] bg-emerald-400 rounded px-2 py-1">
            {project.metric}
          </span>
        </div>
        <div className="p-6">
          <h3 className="font-display font-bold text-xl text-slate-50">{project.title}</h3>
          <p className="mt-2 font-mono-code text-xs text-slate-400 leading-relaxed">{project.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="font-mono-code text-[10px] text-emerald-300/90 border border-emerald-500/25 rounded px-2 py-1 bg-emerald-500/5">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
};

export const Projects = () => (
  <section id="projects" className="py-24 lg:py-32 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto" data-testid="projects-section">
    <Reveal>
      <SectionTag>Featured Production</SectionTag>
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-50">
        Featured Platforms <span className="text-emerald-400">&amp; Software</span>
      </h2>
      <p className="mt-4 font-mono-code text-sm text-slate-400 max-w-2xl">
        Full-stack web applications, fintech platforms and browser automation pipelines built to last.
      </p>
    </Reveal>
    <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 [perspective:1400px]">
      {PROJECTS.map((p, i) => (
        <TiltCard key={p.testid} project={p} index={i} />
      ))}
    </div>
  </section>
);
