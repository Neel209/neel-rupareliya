import { scrollToId } from "../utils/scroll";

export const Footer = () => (
  <footer className="border-t border-emerald-500/15 bg-[#05070b]" data-testid="footer">
    <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
      <button data-testid="footer-brand" onClick={() => scrollToId("#top")} className="flex items-center gap-2.5">
        <span className="w-7 h-7 rounded-md border border-emerald-500/60 bg-emerald-500/10 flex items-center justify-center font-mono-code font-bold text-emerald-400 text-xs">
          &gt;_
        </span>
        <span className="font-mono-code text-xs text-slate-400">
          Neel Rupareliya · Python Developer · Gujarat, India
        </span>
      </button>
      <div className="flex items-center gap-2 font-mono-code text-[11px] text-slate-500">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        all systems operational
      </div>
      <div className="font-mono-code text-[11px] text-slate-600">
        © 2026 — built with Python · React · MongoDB
      </div>
    </div>
  </footer>
);
