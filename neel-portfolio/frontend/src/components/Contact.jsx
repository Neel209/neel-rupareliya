import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Copy } from "lucide-react";
import { Reveal, SectionTag } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SOCIALS = [
  { icon: Github, label: "GitHub", testid: "social-github" },
  { icon: Linkedin, label: "LinkedIn", testid: "social-linkedin" },
  { icon: Send, label: "Telegram", testid: "social-telegram" },
];

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message transmitted — expect a reply within 24h.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Transmission failed — try again or email directly.");
    } finally {
      setSending(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText("neelrupareliya59@gmail.com");
    toast.success("Email copied to clipboard.");
  };

  const inputCls =
    "w-full bg-[#0b0f18] border border-emerald-500/20 rounded-md px-4 py-3 font-mono-code text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-emerald-400/70 focus:ring-1 focus:ring-emerald-500/30 transition-colors duration-200";

  return (
    <section id="contact" className="py-24 lg:py-32 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto" data-testid="contact-section">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <Reveal>
          <SectionTag>Get in Touch</SectionTag>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-50 leading-tight">
            Let&apos;s Build Something <span className="text-emerald-400 glow-text">Exceptional</span>
          </h2>
          <p className="mt-5 font-mono-code text-sm text-slate-400 leading-relaxed max-w-md">
            Available for Python backend development, browser automation pipelines
            and full-stack projects. Reach out directly or drop a message.
          </p>

          <div className="mt-10 space-y-5 font-mono-code text-sm">
            <div className="flex items-center gap-4 text-slate-300">
              <Mail size={18} className="text-emerald-400 shrink-0" />
              <span>neelrupareliya59@gmail.com</span>
              <button
                data-testid="contact-email-copy"
                onClick={copyEmail}
                className="ml-1 inline-flex items-center gap-1 text-[10px] text-emerald-300 border border-emerald-500/30 rounded px-2 py-1 hover:bg-emerald-500/10 transition-colors"
              >
                <Copy size={11} /> Copy
              </button>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <Phone size={18} className="text-emerald-400 shrink-0" />
              <span>+91 81419 69437</span>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <MapPin size={18} className="text-emerald-400 shrink-0" />
              <span>Gujarat, India — remote worldwide</span>
            </div>
          </div>

          <div className="mt-10 flex gap-3">
            {SOCIALS.map((s) => (
              <button
                key={s.label}
                data-testid={s.testid}
                aria-label={s.label}
                className="w-11 h-11 rounded-md border border-emerald-500/25 bg-slate-950/70 flex items-center justify-center text-emerald-300 hover:bg-emerald-500/15 hover:border-emerald-400/60 hover:-translate-y-0.5 transition-all duration-300"
              >
                <s.icon size={18} />
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={submit}
            className="rounded-xl border border-emerald-500/20 bg-slate-950/70 backdrop-blur-xl p-6 lg:p-8 space-y-5"
            data-testid="contact-form"
          >
            <div className="font-mono-code text-xs text-slate-500 mb-1">
              <span className="text-emerald-500">$</span> ./send_message.sh --priority high
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                data-testid="contact-form-name"
                required
                value={form.name}
                onChange={set("name")}
                placeholder="Your Name *"
                className={inputCls}
              />
              <input
                data-testid="contact-form-email"
                required
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="Your Email *"
                className={inputCls}
              />
            </div>
            <input
              data-testid="contact-form-subject"
              value={form.subject}
              onChange={set("subject")}
              placeholder="Subject — Project or Opportunity"
              className={inputCls}
            />
            <textarea
              data-testid="contact-form-message"
              required
              rows={5}
              value={form.message}
              onChange={set("message")}
              placeholder="Message — tell me about your project or requirements... *"
              className={`${inputCls} resize-none`}
            />
            <button
              data-testid="contact-form-submit"
              type="submit"
              disabled={sending}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-[#07090e] font-mono-code font-semibold text-sm px-6 py-3.5 rounded-md transition-colors duration-300"
            >
              <Send size={16} />
              {sending ? "Transmitting..." : "Send Message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
