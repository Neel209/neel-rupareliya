import { Reveal, SectionTag } from "./Reveal";

const GROUPS = [
  {
    title: "Languages",
    items: ["Python", "Pine Script", "SQL", "JavaScript (ES6+)", "HTML5 / CSS3"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["Flask", "FastAPI", "Selenium", "PyTest", "Pandas", "WebSockets", "RESTful APIs", "Chart.js"],
  },
  {
    title: "Databases & Storage",
    items: ["MongoDB Atlas", "MySQL", "PostgreSQL", "Redis (Cache & Queues)", "SQLite", "Database Schema Design"],
  },
  {
    title: "Automation & DevOps",
    items: ["Selenium Browser Automation", "Webhook Listeners", "Cron / Task Scheduling", "Docker", "Telegram Bot API", "Linux / VPS & Bash"],
  },
  {
    title: "Developer Tools",
    items: ["VS Code", "Postman", "Git & GitHub", "Jira", "Nginx", "CI/CD Workflows"],
  },
];

export const Skills = () => (
  <section id="skills" className="py-24 lg:py-32 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto" data-testid="skills-section">
    <Reveal>
      <SectionTag>Stack Inventory</SectionTag>
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-50">
        Technical Skills <span className="text-emerald-400">&amp; Stack</span>
      </h2>
      <p className="mt-4 font-mono-code text-sm text-slate-400 max-w-2xl">
        A battle-tested toolbelt for backend, browser automation and database-heavy API development.
      </p>
    </Reveal>

    <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {GROUPS.map((g, gi) => (
        <Reveal key={g.title} delay={gi * 0.07}>
          <div className="h-full rounded-xl border border-emerald-500/20 bg-slate-950/70 backdrop-blur-xl p-6 hover:border-emerald-500/50 transition-colors duration-300">
            <div className="font-mono-code text-[10px] text-slate-600 mb-1">dir_{String(gi + 1).padStart(2, "0")}/</div>
            <h3 className="font-display font-bold text-lg text-emerald-400 mb-4">{g.title}</h3>
            <ul className="space-y-2.5">
              {g.items.map((item, i) => (
                <li key={item} className="font-mono-code text-xs text-slate-300 flex items-center gap-3">
                  <span className="text-slate-600 text-[10px] w-5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-emerald-600">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);
