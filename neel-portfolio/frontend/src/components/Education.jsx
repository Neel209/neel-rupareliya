import { GraduationCap, BadgeCheck } from "lucide-react";
import { Reveal, SectionTag } from "./Reveal";

const DEGREES = [
  {
    title: "Master of Computer Applications (MCA)",
    status: "Pursuing",
    focus: "Advanced Software Engineering · Distributed Systems · Database Architecture",
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    status: "2019 — 2022",
    focus: "Programming Fundamentals · OOP · Web Technologies · Database Systems",
  },
];

export const Education = () => (
  <section id="education" className="py-24 lg:py-32 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto" data-testid="education-section">
    <Reveal>
      <SectionTag>Academic Foundation</SectionTag>
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-50">
        Degrees <span className="text-emerald-400">&amp; Credentials</span>
      </h2>
    </Reveal>

    <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {DEGREES.map((d, i) => (
        <Reveal key={d.title} delay={i * 0.1}>
          <div className="h-full rounded-xl border border-emerald-500/20 bg-slate-950/70 backdrop-blur-xl p-6 lg:p-8 hover:border-emerald-500/50 transition-colors duration-300">
            <div className="flex items-start justify-between gap-4">
              <GraduationCap size={26} className="text-emerald-400 shrink-0" />
              <span className="inline-flex items-center gap-1.5 font-mono-code text-[10px] tracking-widest text-emerald-300 border border-emerald-500/30 rounded-full px-3 py-1">
                <BadgeCheck size={12} />
                {d.status}
              </span>
            </div>
            <h3 className="mt-5 font-display font-bold text-xl text-slate-50">{d.title}</h3>
            <p className="mt-3 font-mono-code text-xs text-slate-400 leading-relaxed">{d.focus}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);
