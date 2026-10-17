import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToId, openResume } from "../utils/scroll";

const LINKS = [
  { label: "hero", id: "#top", testid: "nav-link-hero" },
  { label: "architecture", id: "#architecture", testid: "nav-link-architecture" },
  { label: "projects", id: "#projects", testid: "nav-link-projects" },
  { label: "skills", id: "#skills", testid: "nav-link-skills" },
  { label: "terminal", id: "#terminal", testid: "nav-link-terminal" },
  { label: "contact", id: "#contact", testid: "nav-link-contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
    <header className="fixed top-0 inset-x-0 z-50 border-b border-emerald-500/15 bg-[#07090e]/80 backdrop-blur-xl">
      <nav className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto h-16 flex items-center justify-between">
        <button data-testid="nav-brand-logo" onClick={() => go("#top")} className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-md border border-emerald-500/60 bg-emerald-500/10 flex items-center justify-center font-mono-code font-bold text-emerald-400 text-sm group-hover:bg-emerald-500/25 transition-colors">
            &gt;_
          </span>
          <span className="font-mono-code text-sm text-slate-200">
            neel<span className="text-emerald-400">.dev</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l.label}
              data-testid={l.testid}
              onClick={() => go(l.id)}
              className="font-mono-code text-xs text-slate-400 hover:text-emerald-300 px-3 py-2 rounded-md hover:bg-emerald-500/10 transition-colors duration-200"
            >
              <span className="text-emerald-600 mr-1">./</span>
              {l.label}
            </button>
          ))}
          <button
            data-testid="nav-resume-button"
            onClick={openResume}
            className="ml-3 inline-flex items-center gap-1.5 font-mono-code text-xs font-semibold text-[#07090e] bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-md transition-colors duration-200"
          >
            <Download size={13} />
            resume.pdf
          </button>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          className="md:hidden text-emerald-300 p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
    </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              data-testid="mobile-sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              key="sidebar"
              data-testid="mobile-sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-72 z-[70] md:hidden bg-[#0a0d14] border-l border-emerald-500/25 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono-code text-sm text-slate-200">
                  neel<span className="text-emerald-400">.dev</span>
                </span>
                <button
                  data-testid="mobile-sidebar-close"
                  onClick={() => setOpen(false)}
                  className="text-emerald-300 p-1.5 border border-emerald-500/30 rounded-md hover:bg-emerald-500/10"
                  aria-label="close menu"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {LINKS.map((l, i) => (
                  <motion.button
                    key={l.label}
                    data-testid={`${l.testid}-mobile`}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1 }}
                    onClick={() => go(l.id)}
                    className="text-left font-mono-code text-sm text-slate-300 hover:text-emerald-300 py-3 border-b border-emerald-500/10"
                  >
                    <span className="text-emerald-600 mr-2">./</span>
                    {l.label}
                  </motion.button>
                ))}
              </div>

              <motion.button
                data-testid="mobile-sidebar-resume"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setOpen(false);
                  openResume();
                }}
                className="mt-auto inline-flex items-center justify-center gap-2 font-mono-code text-sm font-semibold text-[#07090e] bg-emerald-500 hover:bg-emerald-400 px-4 py-3.5 rounded-md transition-colors"
              >
                <Download size={16} />
                resume.pdf
              </motion.button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
