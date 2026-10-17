import { useEffect, useRef, useState } from "react";
import { Reveal, SectionTag } from "./Reveal";
import { scrollToId } from "../utils/scroll";

const PROMPT = "neel@automation-core:~$";

const RESPONSES = {
  help: [
    "Available commands:",
    "  about          who is Neel?",
    "  skills         list the technical stack",
    "  projects       featured platforms & software",
    "  experience     work history",
    "  education      degrees & credentials",
    "  architecture   automation pipeline overview",
    "  contact        how to reach Neel",
    "  clear          wipe the console",
    "  sudo hire-neel initiate onboarding sequence",
  ],
  about: [
    "Neel Rupareliya — Python Developer × Automation Engineer",
    "Location: Gujarat, India (working worldwide)",
    "I build self-running backends, trading pipelines and browser bots",
    "that remove manual work entirely. MCA candidate.",
  ],
  skills: [
    "languages    Python · Pine Script · SQL · JavaScript",
    "backend      Flask · FastAPI · WebSockets · REST",
    "automation   Selenium · Webhooks · Cron · Telegram Bot API",
    "data         MongoDB · PostgreSQL · MySQL · Redis",
    "devops       Docker · Linux/VPS · Nginx · Git",
  ],
  projects: [
    "[1] Trade Masters ............ algo-trading SaaS · 10k+ trades/day",
    "[2] Chart Automation + Telegram Alerts ... 24/7 live signal bot",
    "[3] ProofAI .................. document classification pipeline",
    "[4] Kahanan Jewels ........... full-stack jewellery e-commerce",
    "type 'projects' section rendered above ↑ for full details",
  ],
  experience: [
    "Python Developer Intern — LiBest Solutions, Bhavnagar",
    "Nov 2023 → May 2024",
    "▸ production Flask apps · RBAC REST APIs · payment gateways",
    "▸ 10+ internal tools · CI/CD reviews · Agile sprints",
  ],
  education: [
    "MCA — Master of Computer Applications (pursuing)",
    "BCA — Bachelor of Computer Applications (2019 — 2022)",
  ],
  architecture: [
    "TradingView Indicator Access & Lifecycle pipeline:",
    "  Flask Billing API → Webhook Dispatcher",
    "    → Pine Script Server → Telegram Bot API",
    "fully automated: payment → license → provisioning → alerts",
  ],
  contact: [
    "email    neelrupareliya59@gmail.com",
    "phone    +91 81419 69437",
    "socials  GitHub · LinkedIn · Telegram",
    "or scroll down to the contact form →",
  ],
  whoami: ["neel — python developer × automation engineer. obviously."],
  "sudo hire-neel": [
    "[sudo] password for recruiter: ********",
    "[ACCESS GRANTED] initiating onboarding sequence...",
    "→ opening contact channel. scroll down and say hello.",
  ],
};

const WELCOME = [
  { type: "out", text: "NEEL.ENV interactive shell — v2.4.1" },
  { type: "out", text: "type 'help' to list available commands." },
];

const CHIPS = ["help", "about", "skills", "projects", "contact", "clear"];

export const TerminalCLI = () => {
  const [history, setHistory] = useState(WELCOME);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const focus = () => inputRef.current?.focus();
    window.addEventListener("focus-terminal", focus);
    return () => window.removeEventListener("focus-terminal", focus);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const echo = { type: "cmd", text: `${PROMPT} ${raw.trim()}` };
    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    const out = RESPONSES[cmd] || [`bash: ${cmd}: command not found — type 'help'`];
    setHistory((h) => [...h, echo, ...out.map((t) => ({ type: "out", text: t }))]);
    if (cmd === "sudo hire-neel") setTimeout(() => scrollToId("#contact"), 1200);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    }
  };

  return (
    <section id="terminal" className="py-24 lg:py-32 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto" data-testid="terminal-section">
      <Reveal>
        <SectionTag>Developer Playground</SectionTag>
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-50">
          Interactive Console <span className="text-emerald-400">CLI</span>
        </h2>
        <p className="mt-4 font-mono-code text-sm text-slate-400 max-w-2xl">
          Test commands or inspect projects and skill details directly from the console.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-12">
        <div
          className="relative rounded-xl border border-emerald-500/25 bg-[#05070b]/95 shadow-[0_0_60px_rgba(16,185,129,0.08)] overflow-hidden"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="terminal-scanline" />
          <div className="flex items-center gap-2 px-4 py-3 border-b border-emerald-500/10 bg-[#0d111a]">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-amber-500/70" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
            <span className="ml-3 font-mono-code text-xs text-slate-500">{PROMPT}</span>
          </div>

          <div ref={bodyRef} className="h-80 overflow-y-auto p-5 font-mono-code text-xs sm:text-sm leading-7" data-testid="terminal-output-container">
            {history.map((line, i) => (
              <pre
                key={i}
                className={`whitespace-pre-wrap ${line.type === "cmd" ? "text-slate-500" : line.text.startsWith("bash:") ? "text-red-400" : "text-emerald-300/90"}`}
              >
                {line.text}
              </pre>
            ))}
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-emerald-500 shrink-0">{PROMPT}</span>
              <input
                ref={inputRef}
                data-testid="terminal-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent outline-none border-none text-slate-100 caret-emerald-400 font-mono-code text-xs sm:text-sm"
                spellCheck={false}
                autoComplete="off"
                aria-label="terminal command input"
              />
              <span className="cursor-blink text-emerald-400">▊</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-emerald-500/10 bg-[#0d111a]">
            {CHIPS.map((c) => (
              <button
                key={c}
                data-testid={`terminal-chip-${c}`}
                onClick={(e) => {
                  e.stopPropagation();
                  run(c);
                  inputRef.current?.focus();
                }}
                className="font-mono-code text-[11px] text-emerald-300/80 border border-emerald-500/25 rounded px-3 py-1.5 hover:bg-emerald-500/10 hover:border-emerald-400/60 transition-colors duration-200"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};
