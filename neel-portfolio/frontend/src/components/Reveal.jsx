import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 44 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SectionTag = ({ children }) => (
  <div className="font-mono-code text-xs text-emerald-400 tracking-[0.35em] uppercase mb-4">
    <span className="text-slate-600">{"// "}</span>
    {children}
  </div>
);
