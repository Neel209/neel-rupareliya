import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Radio, FileCode2, Send } from "lucide-react";
import { Reveal, SectionTag } from "./Reveal";

const NODES = [
  {
    id: "flask-api",
    testid: "arch-node-flask-api",
    icon: Server,
    title: "Flask Billing API",
    sub: "Payments + Key Issuance",
    desc: "Handles subscription checkout, generates license keys, and persists customer state in MongoDB. Exposes REST endpoints for plan activation, renewal and revocation.",
    metric: "99.9% uptime",
  },
  {
    id: "webhook-dispatcher",
    testid: "arch-node-webhook-dispatcher",
    icon: Radio,
    title: "Webhook Dispatcher",
    sub: "Event Router",
    desc: "Receives TradingView and payment gateway webhooks, verifies signatures, and fans events out to the correct downstream worker with retry logic.",
    metric: "<200ms routing",
  },
  {
    id: "pinescript-server",
    testid: "arch-node-pinescript-server",
    icon: FileCode2,
    title: "Pine Script Server",
    sub: "Indicator Access Control",
    desc: "Manages invite-only TradingView indicator access per license key — grants, validates and expires subscriptions automatically on the TradingView side.",
    metric: "10k+ trades/day",
  },
  {
    id: "telegram-bot",
    testid: "arch-node-telegram-bot",
    icon: Send,
    title: "Telegram Bot API",
    sub: "Alerts + User Commands",
    desc: "Delivers real-time market alerts and lets users manage their own subscription via bot commands — no dashboard required.",
    metric: "24/7 live",
  },
];

const FlowLine = () => (
  <svg className="hidden lg:block flex-1 min-w-8 h-2 self-center" preserveAspectRatio="none" viewBox="0 0 100 8">
    <line x1="0" y1="4" x2="100" y2="4" stroke="#10b981" strokeWidth="2" className="flow-line" opacity="0.7" />
  </svg>
);

export const Architecture = () => {
  const [active, setActive] = useState(NODES[0]);

  return (
    <section id="architecture" className="py-24 lg:py-32 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto" data-testid="architecture-section">
      <Reveal>
        <SectionTag>System Architecture</SectionTag>
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-50">
          Automated Workflows <span className="text-emerald-400">&amp; Architecture</span>
        </h2>
        <p className="mt-4 font-mono-code text-sm text-slate-400 max-w-2xl">
          TradingView Indicator Access &amp; Lifecycle Management — a fully automated
          pipeline from payment to license provisioning. Click a node to inspect it.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-14">
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0">
          {NODES.map((node, i) => (
            <div key={node.id} className="contents">
              <button
                data-testid={node.testid}
                onClick={() => setActive(node)}
                className={`node-pulse text-left flex-1 rounded-xl border p-5 transition-colors duration-300 backdrop-blur-xl ${
                  active.id === node.id
                    ? "border-emerald-400/70 bg-emerald-500/10"
                    : "border-emerald-500/20 bg-slate-950/70 hover:border-emerald-500/50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <node.icon size={20} className="text-emerald-400" />
                  <span className="font-mono-code text-[9px] tracking-widest text-emerald-400 border border-emerald-500/40 rounded-full px-2 py-0.5">LIVE</span>
                </div>
                <div className="font-mono-code font-semibold text-sm text-slate-100">{node.title}</div>
                <div className="font-mono-code text-[11px] text-slate-500 mt-1">{node.sub}</div>
                <div className="font-mono-code text-[10px] text-slate-600 mt-3">node_{String(i + 1).padStart(2, "0")}</div>
              </button>
              {i < NODES.length - 1 && <FlowLine key={`line-${i}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-6 rounded-xl border border-emerald-500/20 bg-[#0b0f18]/80 p-6 lg:p-8"
            data-testid="arch-node-detail"
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="font-mono-code text-xs text-emerald-500">$ inspect {active.id}</span>
              <span className="font-mono-code text-[10px] text-[#07090e] bg-emerald-400 rounded px-2 py-0.5 font-semibold">{active.metric}</span>
            </div>
            <p className="font-mono-code text-sm text-slate-300 leading-relaxed">{active.desc}</p>
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </section>
  );
};
