const ITEMS = [
  "PYTHON AUTOMATION",
  "PINE SCRIPT WEBSOCKETS",
  "TELEGRAM BOT API",
  "FLASK BILLING PIPELINES",
  "ASYNC ARCHITECTURE",
  "TRADINGVIEW ALERTS",
  "BROWSER BOTS",
  "REST + FASTAPI",
];

const Row = () => (
  <div className="flex shrink-0 items-center">
    {ITEMS.map((item, i) => (
      <span key={i} className="flex items-center">
        <span className={`font-mono-code text-sm tracking-[0.25em] px-8 ${i % 2 === 0 ? "text-emerald-400" : "text-slate-500"}`}>
          {item}
        </span>
        <span className="text-emerald-600/60 text-xs">◆</span>
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <div
    className="relative border-y border-emerald-500/15 bg-[#0a0d14] py-5 overflow-hidden"
    data-testid="editorial-marquee"
  >
    <div className="flex w-max animate-marquee">
      <Row />
      <Row />
    </div>
  </div>
);
