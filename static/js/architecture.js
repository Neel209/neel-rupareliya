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

  // Initialize first node on load
  document.addEventListener('DOMContentLoaded', () => {
    selectArchNode('flask-api');
  });
})();
