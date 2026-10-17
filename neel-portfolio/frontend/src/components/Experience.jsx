import { Briefcase } from "lucide-react";
import { Reveal, SectionTag } from "./Reveal";

const ACHIEVEMENTS = [
  "Developed and maintained multiple production Python/Flask applications serving live client operations across diverse domains.",
  "Architected modular REST APIs with role-based access control (RBAC), secure session handling and encrypted payload verification.",
  "Built backend integrations for payment gateways, automated webhook pipelines, and scheduled cron jobs.",
  "Delivered 10+ internal development tools (Admin Consoles, Custom Dashboards) that improved team delivery speed.",
  "Collaborated closely in Agile sprint planning, CI/CD code reviews, and issue tracking using Git, GitHub and Jira.",
];

const TAGS = ["Python", "Flask", "MySQL", "MongoDB", "REST APIs", "RBAC", "Git", "Jira", "Cron"];

export const Experience = () => (
  <section id="experience" className="py-24 lg:py-32 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto" data-testid="experience-section">
    <Reveal>
      <SectionTag>Track Record</SectionTag>
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-50">
        Work <span className="text-emerald-400">Experience</span>
      </h2>
    </Reveal>

    <Reveal delay={0.15} className="mt-14">
      <div className="relative pl-8 lg:pl-12 border-l border-emerald-500/25">
        <span className="absolute -left-[7px] top-2 w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.8)]" />
        <div className="rounded-xl border border-emerald-500/20 bg-slate-950/70 backdrop-blur-xl p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <Briefcase size={18} className="text-emerald-400" />
            <h3 className="font-display font-bold text-xl text-slate-50">Python Developer Intern</h3>
            <span className="ml-auto font-mono-code text-[10px] tracking-widest text-emerald-300 border border-emerald-500/30 rounded-full px-3 py-1">
              Nov 2023 — May 2024
            </span>
          </div>
          <div className="font-mono-code text-xs text-slate-500 mb-5">LiBest Solutions · Bhavnagar, India</div>
          <ul className="space-y-3">
            {ACHIEVEMENTS.map((a, i) => (
              <li key={i} className="font-mono-code text-xs sm:text-sm text-slate-300 leading-relaxed flex gap-3">
                <span className="text-emerald-500 shrink-0">▸</span>
                {a}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <span key={t} className="font-mono-code text-[10px] text-emerald-300/90 border border-emerald-500/25 rounded px-2 py-1 bg-emerald-500/5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);
