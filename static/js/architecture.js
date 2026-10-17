/**
 * System Architecture Interactive Controller & Pipeline Simulator
 * Integrates the 4-node TradingView Indicator Lifecycle Pipeline and Live Interactive Simulators
 */

(function () {
  // 1. Four Core Architecture Nodes Data
  const ARCH_NODES = {
    'flask-api': {
      title: 'Flask Billing API',
      role: 'Payments + Key Issuance',
      badge: 'API Gateway',
      status: 'Active · Primary Node',
      metric: '99.9% uptime',
      desc: 'Handles subscription checkout via Stripe/Razorpay, generates cryptographically signed license keys, and persists customer state in MongoDB Atlas. Exposes secure RESTful endpoints for plan activation, renewal, and revocation.',
      details: [
        'JWT token validation & webhook payload encryption',
        'Dynamic GST & coupon redemption engine',
        'Automatic 7-day trial provisioning with status webhooks'
      ]
    },
    'webhook-dispatcher': {
      title: 'Webhook Dispatcher',
      role: 'Event Router & Fan-out',
      badge: 'Event Hub',
      status: 'Active · Queue Worker',
      metric: '<200ms routing',
      desc: 'Receives TradingView alert webhooks and payment gateway events, verifies HMAC-SHA256 signatures, and fans events out to the correct downstream worker with automatic backoff retry logic.',
      details: [
        'Idempotent message handling with Redis deduplication',
        'Dead-letter queue on network threshold exceptions',
        'High-concurrency async dispatching'
      ]
    },
    'pinescript-server': {
      title: 'Pine Script Server',
      role: 'Indicator Access Control',
      badge: 'Core Service',
      status: 'Active · TradingView Bridge',
      metric: 'Auto-Provisioned',
      desc: 'Manages invite-only TradingView indicator access per customer license key. Dynamically whitelists, verifies, and expires Pine Script access on the TradingView broker side according to subscription state.',
      details: [
        'Automated invite-only script authorization',
        'Real-time access revocation upon subscription lapse',
        'Zero manual intervention for indicator management'
      ]
    },
    'telegram-bot': {
      title: 'Telegram Bot API',
      role: 'Alerts + User Commands',
      badge: 'Broadcast Node',
      status: 'Active · 24/7 Worker',
      metric: '24/7 live',
      desc: 'Delivers real-time algorithmic market alerts to private subscriber channels and lets users query their own subscription status, request renewal links, and inspect account status via bot commands.',
      details: [
        'Instant multi-channel chart & signal push notifications',
        'Self-service user commands (/status, /renew, /signals)',
        'Automated channel member kicks upon expiry'
      ]
    }
  };

  // Node Selection Handler
  window.selectArchNode = function (nodeId) {
    const nodeData = ARCH_NODES[nodeId];
    if (!nodeData) return;

    // Update active button state
    document.querySelectorAll('.arch-node-btn').forEach(btn => {
      const isCurrent = btn.dataset.nodeId === nodeId;
      if (isCurrent) {
        btn.classList.add('border-emerald-500', 'bg-emerald-500/10', 'shadow-[0_0_20px_rgba(16,185,129,0.2)]');
        btn.classList.remove('border-slate-800', 'bg-slate-900/60');
      } else {
        btn.classList.remove('border-emerald-500', 'bg-emerald-500/10', 'shadow-[0_0_20px_rgba(16,185,129,0.2)]');
        btn.classList.add('border-slate-800', 'bg-slate-900/60');
      }
    });

    // Update inspector view
    const titleEl = document.getElementById('archInspectorTitle');
    const roleEl = document.getElementById('archInspectorRole');
    const badgeEl = document.getElementById('archInspectorBadge');
    const metricEl = document.getElementById('archInspectorMetric');
    const descEl = document.getElementById('archInspectorDesc');
    const listEl = document.getElementById('archInspectorList');

    if (titleEl) titleEl.textContent = nodeData.title;
    if (roleEl) roleEl.textContent = nodeData.role;
    if (badgeEl) badgeEl.textContent = nodeData.badge;
    if (metricEl) metricEl.textContent = nodeData.metric;
    if (descEl) descEl.textContent = nodeData.desc;

    if (listEl) {
      listEl.innerHTML = nodeData.details.map(d => `
        <li class="flex items-center gap-2 text-slate-300 font-mono text-xs">
          <span class="text-emerald-400">▸</span>
          <span>${d}</span>
        </li>
      `).join('');
    }
  };

  // 2. Interactive Simulator Tabs (Pipeline vs Failover vs Bot)
  window.switchArchTab = function (tabId) {
    document.querySelectorAll('.arch-tab-btn').forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('bg-emerald-500', 'text-[#07090e]');
        btn.classList.remove('bg-slate-900', 'text-slate-400');
      } else {
        btn.classList.remove('bg-emerald-500', 'text-[#07090e]');
        btn.classList.add('bg-slate-900', 'text-slate-400');
      }
    });

    document.querySelectorAll('.arch-tab-content').forEach(content => {
      content.classList.toggle('hidden', content.dataset.tab !== tabId);
    });
  };

  // 3. Database Failover Simulation Runner
  window.runFailoverSim = function () {
    const log = document.getElementById('failoverSimLog');
    const btn = document.getElementById('failoverSimBtn');
    const mongoStatus = document.getElementById('simMongoStatus');
    const sqliteStatus = document.getElementById('simSqliteStatus');
    const circuitBadge = document.getElementById('simCircuitBadge');

    if (!log) return;
    if (btn) btn.disabled = true;

    log.innerHTML = `<div class="text-amber-400">&gt; Initiating simulated database failover test...</div>`;

    setTimeout(() => {
      log.innerHTML += `<div class="text-slate-400">[0.10s] Simulating MongoDB Atlas latency spike (>500ms timeout)...</div>`;
      if (mongoStatus) {
        mongoStatus.className = 'w-2 h-2 rounded-full bg-red-400 animate-ping';
      }
      if (circuitBadge) {
        circuitBadge.textContent = 'CIRCUIT OPEN';
        circuitBadge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40';
      }
    }, 400);

    setTimeout(() => {
      log.innerHTML += `<div class="text-yellow-400">[0.25s] Circuit tripped! Auto-diverting transactions to Local SQLite Standby.</div>`;
      if (sqliteStatus) {
        sqliteStatus.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
      }
    }, 900);

    setTimeout(() => {
      log.innerHTML += `<div class="text-emerald-400">[0.42s] Write buffer committed to local SQLite engine. 0 transactions dropped.</div>`;
      log.innerHTML += `<div class="text-cyan-400 font-bold mt-1">&gt; Failover successful: 100% availability preserved.</div>`;
      if (btn) btn.disabled = false;
    }, 1500);
  };

  // 4. Headless Market Bot Simulation Runner
  window.runBotSim = function () {
    const log = document.getElementById('botSimLog');
    const btn = document.getElementById('botSimBtn');
    if (!log) return;
    if (btn) btn.disabled = true;

    log.innerHTML = `<div class="text-amber-400">&gt; Spawning stealth Playwright Chromium instance...</div>`;

    setTimeout(() => {
      log.innerHTML += `<div class="text-slate-400">[0.20s] Checking NSE Holiday Calendar API: Trading Day verified.</div>`;
    }, 350);

    setTimeout(() => {
      log.innerHTML += `<div class="text-slate-400">[0.65s] Injecting EMA 20/50 & RSI indicators into headless chart viewport.</div>`;
    }, 750);

    setTimeout(() => {
      log.innerHTML += `<div class="text-slate-400">[1.10s] High-resolution chart snapshot generated (1920x1080).</div>`;
    }, 1200);

    setTimeout(() => {
      log.innerHTML += `<div class="text-emerald-400 font-bold">[1.60s] Broadcast dispatched to Telegram VIP channel. Done!</div>`;
      if (btn) btn.disabled = false;
    }, 1700);
  };

  // Initialize first node on load
  document.addEventListener('DOMContentLoaded', () => {
    selectArchNode('flask-api');
  });
})();
