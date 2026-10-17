import { Reveal, SectionTag } from "./Reveal";

const K = ({ c }) => <span className="text-emerald-400">{c}</span>;
const S = ({ c }) => <span className="text-amber-400">{c}</span>;
const F = ({ c }) => <span className="text-cyan-400">{c}</span>;
const C = ({ c }) => <span className="text-slate-600 italic">{c}</span>;
const P = ({ c }) => <span className="text-slate-300">{c}</span>;

export const ProfileCard = () => (
  <section className="py-24 lg:py-32 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto" data-testid="profile-section">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <Reveal>
        <SectionTag>Developer Profile</SectionTag>
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-50 leading-tight">
          Code that runs the business, <span className="text-emerald-400">not just the server.</span>
        </h2>
        <p className="mt-6 font-mono-code text-sm text-slate-400 leading-relaxed">
          I specialise in Python backends, browser automation, and SaaS pipelines —
          from TradingView indicator licensing systems to Telegram alert engines and
          document-classification platforms. Focused on building clean, practical and
          dependable software that removes manual work entirely.
        </p>
        <div className="mt-8 space-y-3 font-mono-code text-xs text-slate-500">
          <div><span className="text-emerald-500">▸</span> MCA — Master of Computer Applications</div>
          <div><span className="text-emerald-500">▸</span> Based in Gujarat, India · working worldwide</div>
          <div><span className="text-emerald-500">▸</span> Flask · FastAPI · Selenium · Pine Script · MongoDB</div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div
          className="rounded-xl border border-emerald-500/20 bg-[#0b0f18]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.07)] overflow-hidden"
          data-testid="developer-profile-card"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-emerald-500/10 bg-[#0d111a]">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-amber-500/70" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
            <span className="ml-3 font-mono-code text-xs text-slate-500">neel_profile.py</span>
            <span className="ml-auto font-mono-code text-[10px] text-emerald-500/70 border border-emerald-500/30 rounded px-2 py-0.5">Python 3.12</span>
          </div>
          <pre className="p-5 font-mono-code text-[11px] sm:text-xs leading-6 overflow-x-auto">
            <code>
<K c="class" /> <F c="DeveloperProfile" /><P c=":" />{"\n"}
{"    "}<K c="def" /> <F c="__init__" /><P c="(self):" />{"\n"}
{"        "}self.name = <S c='"Neel Rupareliya"' />{"\n"}
{"        "}self.role = <S c='"Python Developer × Automation Engineer"' />{"\n"}
{"        "}self.location = <S c='"Gujarat, India"' />{"\n"}
{"        "}self.stack = {"{"}{"\n"}
{"            "}<S c='"languages"' /><P c=":" /> [<S c='"Python"' />, <S c='"Pine Script"' />, <S c='"SQL"' />],{"\n"}
{"            "}<S c='"backend"' /><P c=":" /> [<S c='"Flask"' />, <S c='"FastAPI"' />, <S c='"WebSockets"' />],{"\n"}
{"            "}<S c='"automation"' /><P c=":" /> [<S c='"Selenium"' />, <S c='"Cron"' />, <S c='"Telegram API"' />],{"\n"}
{"            "}<S c='"data"' /><P c=":" /> [<S c='"MongoDB"' />, <S c='"PostgreSQL"' />, <S c='"Redis"' />],{"\n"}
{"        "}{"}"}{"\n"}
{"        "}self.status = <S c='"available_for_work"' />{"\n"}
{"\n"}
{"    "}<K c="def" /> <F c="deploy" /><P c="(self, idea):" />{"\n"}
{"        "}<K c="return" /> self.automate(idea, quality=<S c='"production"' />){"\n"}
{"\n"}
<C c="# executed output" />{"\n"}
<K c="print" /><P c="(" /><F c="DeveloperProfile" /><P c="().status)" />{"\n"}
<span className="text-emerald-500">{'>>>'} available_for_work</span>
            </code>
          </pre>
        </div>
      </Reveal>
    </div>
  </section>
);
