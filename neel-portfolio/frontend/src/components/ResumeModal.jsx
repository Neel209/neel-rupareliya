import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SECTIONS = [
  {
    title: "Summary",
    body: "Python developer specialising in web backends, browser automation and SaaS pipelines — Flask, FastAPI, Selenium, Pine Script, MongoDB. I build software that removes manual work entirely.",
  },
  {
    title: "Experience",
    body: "Python Developer Intern — LiBest Solutions, Bhavnagar (Nov 2023 – May 2024). Production Flask apps, RBAC REST APIs, payment gateway + webhook pipelines, 10+ internal tools.",
  },
  {
    title: "Featured Projects",
    body: "Trade Masters (algo-trading SaaS, 10k+ trades/day) · Market Chart Automation + Telegram Alerts (24/7 live) · ProofAI (document classification) · Kahanan Jewels (e-commerce).",
  },
  {
    title: "Technical Skills",
    body: "Python · Pine Script · SQL · JavaScript · Flask · FastAPI · Selenium · MongoDB · PostgreSQL · Redis · Docker · Linux/VPS · Telegram Bot API",
  },
  {
    title: "Education",
    body: "MCA — Master of Computer Applications (pursuing) · BCA — Bachelor of Computer Applications (2019–2022).",
  },
];

export const ResumeModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener("open-resume", on);
    return () => window.removeEventListener("open-resume", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="resume-backdrop"
            data-testid="resume-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-md"
          />
          <motion.div
            key="resume-doc"
            data-testid="resume-modal"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[6vh] bottom-[6vh] sm:inset-x-0 sm:mx-auto sm:max-w-2xl z-[90] overflow-hidden rounded-xl border border-emerald-500/30 bg-[#0a0d14] shadow-[0_0_80px_rgba(16,185,129,0.15)] flex flex-col"
          >
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-emerald-500/15 bg-[#0d111a] shrink-0">
              <FileText size={16} className="text-emerald-400" />
              <span className="font-mono-code text-xs text-slate-400">Neel_Rupareliya_Resume.pdf</span>
              <span className="ml-2 font-mono-code text-[10px] text-emerald-400 border border-emerald-500/30 rounded px-2 py-0.5">generated live</span>
              <button
                data-testid="resume-modal-close"
                onClick={() => setOpen(false)}
                className="ml-auto text-slate-400 hover:text-emerald-300 p-1.5 border border-emerald-500/20 rounded-md hover:bg-emerald-500/10 transition-colors"
                aria-label="close resume preview"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-400 glow-text">NEEL RUPARELIYA</h3>
              <div className="font-mono-code text-sm text-slate-200 mt-1">Python Developer × Automation Engineer</div>
              <div className="font-mono-code text-[11px] text-slate-500 mt-1.5">
                neelrupareliya59@gmail.com · +91 81419 69437 · Gujarat, India
              </div>
              {SECTIONS.map((s) => (
                <div key={s.title} className="mt-6">
                  <div className="font-mono-code text-xs font-semibold tracking-[0.25em] uppercase text-emerald-400 border-b border-emerald-500/25 pb-1.5 mb-2.5">
                    {s.title}
                  </div>
                  <p className="font-mono-code text-xs text-slate-300 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-emerald-500/15 bg-[#0d111a] shrink-0">
              <a
                data-testid="resume-download-button"
                href={`${API}/resume`}
                download="Neel_Rupareliya_Resume.pdf"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#07090e] font-mono-code font-semibold text-sm px-6 py-3.5 rounded-md transition-colors duration-300"
              >
                <Download size={16} />
                Download PDF — generated by the backend
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
