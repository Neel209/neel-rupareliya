import os
import io
import time
from datetime import datetime
from flask import Flask, render_template, request, jsonify, send_file, send_from_directory
from fpdf import FPDF

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'neel-portfolio-super-secret-key-2026')

# Profile Data Model based on Resume & Design Guidelines
PORTFOLIO_DATA = {
    "name": "Neel Rupareliya",
    "role": "Python Developer × Automation Engineer",
    "sub_role": "Backend & Automation Engineer",
    "location": "Gujarat, India (Remote Worldwide)",
    "email": "neelrupareliya59@gmail.com",
    "secondary_email": "neelrupareliya09@gmail.com",
    "phone": "+91 84697 90287",
    "secondary_phone": "+91 8469790287",
    "phone_display": "+91 8469790287",
    "linkedin": "https://www.linkedin.com/in/neelrupareliya",
    "github": "https://github.com/Neel209",
    "telegram": "https://t.me/neelrupareliya",
    "summary": "Python developer specialising in web backends, browser automation, and SaaS pipelines. Experienced in Python, Flask, FastAPI, Playwright/Selenium, Pine Script, and database architectures (MongoDB Atlas, MySQL, Redis, SQLite). Focused on building clean, practical, and dependable software that removes manual work entirely.",
    "stats": [
        {"value": "5+", "suffix": "+", "label": "Core Projects Built", "sub": "Production & SaaS"},
        {"value": "40%", "suffix": "%", "label": "Query Load Reduction", "sub": "Database caching"},
        {"value": "99%+", "suffix": "%+", "label": "Service Uptime", "sub": "Fail-safe architecture"},
        {"value": "MCA", "suffix": "", "label": "Postgrad Studies", "sub": "Advanced Systems"}
    ],
    "skills": {
        "Languages": [
            {"name": "Python", "level": "95%", "featured": True},
            {"name": "Pine Script", "level": "85%", "featured": True},
            {"name": "SQL", "level": "90%", "featured": True},
            {"name": "JavaScript (ES6+)", "level": "85%", "featured": True},
            {"name": "HTML5 / CSS3", "level": "92%", "featured": False}
        ],
        "Frameworks & Libraries": [
            {"name": "Flask", "level": "95%", "featured": True},
            {"name": "FastAPI", "level": "90%", "featured": True},
            {"name": "Playwright / Selenium", "level": "94%", "featured": True},
            {"name": "WebSockets", "level": "85%", "featured": False},
            {"name": "RESTful APIs", "level": "95%", "featured": True},
            {"name": "Pandas / PyTest", "level": "88%", "featured": False}
        ],
        "Databases & Storage": [
            {"name": "MongoDB Atlas", "level": "92%", "featured": True},
            {"name": "PostgreSQL", "level": "88%", "featured": True},
            {"name": "Redis (Cache & Queues)", "level": "86%", "featured": True},
            {"name": "MySQL", "level": "88%", "featured": False},
            {"name": "SQLite (Local Failover)", "level": "90%", "featured": True}
        ],
        "Automation & DevOps": [
            {"name": "Browser Automation Bots", "level": "95%", "featured": True},
            {"name": "Webhook Listeners & Dispatch", "level": "92%", "featured": True},
            {"name": "Telegram Bot API", "level": "94%", "featured": True},
            {"name": "Cron / Task Scheduling", "level": "90%", "featured": True},
            {"name": "Docker & Linux / VPS", "level": "86%", "featured": True}
        ],
        "Developer Tools": [
            {"name": "VS Code & Cursor AI", "level": "95%", "featured": True},
            {"name": "Git & GitHub Actions", "level": "92%", "featured": True},
            {"name": "Postman & API Testing", "level": "90%", "featured": True},
            {"name": "Jira & CI/CD Pipelines", "level": "88%", "featured": False}
        ]
    },
    "projects": [
        {
            "id": "trade-masters",
            "testid": "project-card-trade-masters",
            "title": "Trade Masters",
            "tag": "SaaS Platform",
            "badge": "Full-Stack FinTech",
            "tagline": "Algorithmic Trading & FinTech Subscription Platform",
            "metric": "Automated Indicator Provisioning",
            "role": "Solo Developer",
            "live_url": "https://trademasters.co.in",
            "github_url": None,
            "image": "/static/images/trademasters.jpg",
            "bg_cyber": "https://images.unsplash.com/photo-1646444254678-b937f153b221?crop=entropy&cs=srgb&fm=jpg&q=85",
            "span": "lg:col-span-7",
            "stack": ["Flask", "MongoDB Atlas", "Webhooks", "Pine Script", "Redis", "WebSockets"],
            "desc": "Algorithmic trading & subscription platform. Automated license provisioning, webhook-driven TradingView access control, dynamic GST billing, and zero-downtime database failover architecture.",
            "highlights": [
                "Built an end-to-end algorithmic trading subscription SaaS using Python, Flask, and MongoDB Atlas.",
                "Engineered automated TradingView indicator provisioning, dynamically whitelisting or revoking Pine Script access based on user subscription lifecycle.",
                "Implemented recurring subscription billing workflows with coupon redemption, dynamic GST calculation, and automatic 7-day trials.",
                "Integrated multi-source financial RSS feeds to parse and categorize live market sentiment across Equities, Forex, and Crypto.",
                "Developed front-end visualizers paired with automated Telegram community access management."
            ]
        },
        {
            "id": "chart-automation",
            "testid": "project-card-market-chart",
            "title": "Market Chart Automation & Telegram Alerts",
            "tag": "Automation Bot",
            "badge": "Automation Bot",
            "tagline": "Automated Technical Chart Capture & Scheduled Alerts",
            "metric": "24/7 live",
            "role": "Lead Developer",
            "live_url": None,
            "github_url": "https://github.com/Neel209/Telegram_automation",
            "image": "/static/images/automation.jpg",
            "bg_cyber": "https://images.unsplash.com/photo-1648614593495-e0955bf287e5?crop=entropy&cs=srgb&fm=jpg&q=85",
            "span": "lg:col-span-5",
            "stack": ["Python", "Playwright", "Selenium", "Telegram API", "GitHub Actions", "Cron"],
            "desc": "Headless chart-capture pipeline that captures multi-asset technical charts (NSE Indices, Commodities, Forex) and broadcasts indicator snapshots directly to Telegram channels 24/7.",
            "highlights": [
                "Built an automated market intelligence pipeline that captures multi-asset technical charts and posts them directly to Telegram channels.",
                "Configured headless Playwright/Chromium with persistent session cookies, anti-bot settings, and automated chart indicator setup.",
                "Integrated the NSE Holiday Calendar API to automatically skip non-trading days and weekends in IST timezone.",
                "Deployed scheduled executions using GitHub Actions with encrypted secret management."
            ]
        },
        {
            "id": "proofai",
            "testid": "project-card-proof-ai",
            "title": "ProofAI",
            "tag": "AI Utility",
            "badge": "AI Web App",
            "tagline": "AI vs Human Content Classification Web Application",
            "metric": "90% manual work removed",
            "role": "Backend Developer",
            "live_url": "https://proofai-app.4born.com",
            "github_url": None,
            "image": "/static/images/proofai.jpg",
            "bg_cyber": "https://images.unsplash.com/photo-1645788437811-2ff9e2104423?crop=entropy&cs=srgb&fm=jpg&q=85",
            "span": "lg:col-span-5",
            "stack": ["FastAPI", "Python", "OCR", "MySQL", "LLM APIs", "PostgreSQL"],
            "desc": "Document classification and verification pipeline that parses uploads, extracts fields, and flags anomalies automatically using language model evaluations.",
            "highlights": [
                "Built backend services to classify whether text or documents are AI-generated or human-authored using language model evaluations.",
                "Designed Flask & FastAPI REST endpoints supporting file uploads, background processing, and confidence scoring.",
                "Created normalized database schemas with indexed queries for audit logs and rapid scan history retrieval."
            ]
        },
        {
            "id": "kahaan-jewels",
            "testid": "project-card-kahanan-jewels",
            "title": "Kahanan Jewels",
            "tag": "E-Commerce",
            "badge": "Backend & Optimization",
            "tagline": "E-Commerce Platform & Catalog Asset Synchronization",
            "metric": "100+ products automated",
            "role": "Backend Developer",
            "live_url": "https://kahaanjewels.com",
            "github_url": None,
            "image": None,
            "bg_cyber": "https://images.unsplash.com/photo-1646444254678-b937f153b221?crop=entropy&cs=srgb&fm=jpg&q=85",
            "span": "lg:col-span-7",
            "stack": ["Python", "Flask", "MongoDB", "MySQL", "WinSCP Scripting", "Cron Jobs"],
            "desc": "Full-stack jewellery storefront with automated inventory sync, order lifecycle emails, and a session caching architecture that reduced database queries by 40%.",
            "highlights": [
                "Implemented a session-based recently-viewed caching system that reduced database queries by approximately 40%.",
                "Wrote automated Python WinSCP scripts running on scheduled cron jobs to synchronize product media to remote FTP storage.",
                "Improved supplier catalog ingestion with retry logic, pagination, and reliable error handling."
            ]
        }
    ],
    "experience": [
        {
            "title": "Python Developer Intern",
            "company": "4born Solutions / LiBest Solutions",
            "period": "Nov 2023 – May 2024",
            "location": "Bhavnagar, India",
            "type": "Full-Stack Backend & Automation",
            "bullets": [
                "Developed and maintained multiple production Python/Flask applications serving live client operations across diverse domains.",
                "Architected modular RESTful APIs with role-based access control (RBAC), secure session handling, and encrypted payload verification.",
                "Built backend integrations for payment gateways, automated webhook pipelines, and scheduled cron jobs.",
                "Delivered 10+ internal development tools (Admin Consoles, Custom Dashboards) that improved team delivery speed.",
                "Collaborated closely in Agile sprint planning, CI/CD code reviews, and issue tracking using Git, GitHub, and Jira."
            ],
            "tech": ["Python", "Flask", "MySQL", "MongoDB", "REST APIs", "RBAC", "Git", "Jira", "Cron"]
        }
    ],
    "education": [
        {
            "degree": "Master of Computer Applications (MCA)",
            "institution": "Maharaja Krushnakumarsinhji Bhavnagar University",
            "location": "Bhavnagar, India",
            "period": "Pursuing",
            "status": "Pursuing",
            "focus": "Advanced Software Engineering, Distributed Systems, Database Architectures"
        },
        {
            "degree": "Bachelor of Computer Applications (BCA)",
            "institution": "The Maharaja Sayajirao University of Baroda",
            "location": "Vadodara, India",
            "period": "2019 – 2022 / 2022 – 2025",
            "status": "Completed (CGPA: 7.3)",
            "focus": "Programming Fundamentals, Data Structures, OOP, Web Technologies, Database Systems"
        }
    ]
}

# Contact submissions storage (in-memory demonstration log)
CONTACT_MESSAGES = []


# =========================================================================
# PDF Resume Generator (FPDF2)
# =========================================================================
class ResumePDF(FPDF):
    def header(self):
        self.set_fill_color(7, 9, 14)
        self.rect(0, 0, 210, 297, "F")


def _sec(pdf, title):
    pdf.ln(4)
    pdf.set_font("helvetica", "B", 12)
    pdf.set_text_color(16, 185, 129)
    pdf.cell(0, 7, title, new_x="LMARGIN", new_y="NEXT")
    pdf.set_draw_color(16, 185, 129)
    pdf.set_line_width(0.4)
    pdf.line(14, pdf.get_y(), 196, pdf.get_y())
    pdf.ln(2.5)


def _line(pdf, text, bold=False, size=9.5, color=(203, 213, 225)):
    pdf.set_font("helvetica", "B" if bold else "", size)
    pdf.set_text_color(*color)
    pdf.multi_cell(0, 5, text, new_x="LMARGIN", new_y="NEXT")


def build_resume_pdf() -> bytes:
    pdf = ResumePDF()
    pdf.set_margins(14, 14, 14)
    pdf.set_auto_page_break(auto=True, margin=16)
    pdf.add_page()

    pdf.set_font("helvetica", "B", 24)
    pdf.set_text_color(16, 185, 129)
    pdf.cell(0, 11, "NEEL RUPARELIYA", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("helvetica", "", 11)
    pdf.set_text_color(248, 250, 252)
    pdf.cell(0, 6, "Python Developer x Automation Engineer", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("helvetica", "", 9)
    pdf.set_text_color(148, 163, 184)
    pdf.cell(0, 5, f"{PORTFOLIO_DATA['email']}  |  {PORTFOLIO_DATA['phone']}  |  {PORTFOLIO_DATA['location']}",
            new_x="LMARGIN", new_y="NEXT")

    _sec(pdf, "SUMMARY")
    _line(pdf, "Python developer specialising in web backends, browser automation, and SaaS pipelines. "
               "Experienced in Python, Flask, FastAPI, Playwright/Selenium, Pine Script and database architectures "
               "(MongoDB, MySQL, PostgreSQL, Redis). Focused on building clean, practical, and dependable software "
               "that removes manual work entirely.")

    _sec(pdf, "EXPERIENCE")
    _line(pdf, "Python Developer Intern - LiBest Solutions / 4born Solutions, Bhavnagar, India", bold=True, size=10.5, color=(248, 250, 252))
    _line(pdf, "Nov 2023 - May 2024", size=8.5, color=(16, 185, 129))
    for b in [
        "Developed and maintained multiple production Python/Flask applications serving live client operations.",
        "Architected modular REST APIs with role-based access control (RBAC), secure session handling, and encrypted payload verification.",
        "Built backend integrations for payment gateways, automated webhook pipelines, and scheduled cron jobs.",
        "Delivered 10+ internal development tools (admin consoles, custom dashboards) improving team delivery speed.",
        "Collaborated in Agile sprint planning, CI/CD code reviews, and issue tracking using Git, GitHub, and Jira.",
    ]:
        _line(pdf, f"  >>  {b}")

    _sec(pdf, "FEATURED PROJECTS")
    for title, desc in [
        ("Trade Masters", "Algorithmic trading & subscription platform - automated TradingView license provisioning, webhook-driven access control, zero-downtime database failover."),
        ("Market Chart Automation & Telegram Alerts", "Headless chart-capture pipeline pushing real-time indicator snapshots and signals to Telegram, 24/7."),
        ("ProofAI", "Document classification and verification pipeline - parses uploads, extracts fields, flags anomalies automatically."),
        ("Kahanan Jewels", "Full-stack jewellery e-commerce with automated inventory sync, order lifecycle emails, and session query reduction."),
    ]:
        _line(pdf, title, bold=True, size=10, color=(248, 250, 252))
        _line(pdf, f"  {desc}")

    _sec(pdf, "TECHNICAL SKILLS")
    for group, items in [
        ("Languages", "Python, Pine Script, SQL, JavaScript (ES6+), HTML5/CSS3"),
        ("Frameworks & Libraries", "Flask, FastAPI, Playwright, Selenium, PyTest, Pandas, WebSockets, RESTful APIs"),
        ("Databases & Storage", "MongoDB Atlas, MySQL, PostgreSQL, Redis, SQLite"),
        ("Automation & DevOps", "Selenium/Playwright, Webhooks, Cron scheduling, Docker, Telegram Bot API, Linux/VPS"),
        ("Developer Tools", "VS Code, Postman, Git & GitHub, Jira, CI/CD workflows"),
    ]:
        _line(pdf, f"{group}:  {items}")

    _sec(pdf, "EDUCATION")
    _line(pdf, "Master of Computer Applications (MCA) - Pursuing", bold=True, size=10, color=(248, 250, 252))
    _line(pdf, "  Advanced Software Engineering - Distributed Systems - Database Architecture")
    _line(pdf, "Bachelor of Computer Applications (BCA) - Completed (CGPA 7.3)", bold=True, size=10, color=(248, 250, 252))
    _line(pdf, "  Programming Fundamentals - OOP - Web Technologies - Database Systems")

    return bytes(pdf.output())


# =========================================================================
# Web Routes
# =========================================================================
@app.route('/')
def index():
    return render_template('index.html', data=PORTFOLIO_DATA, current_year=datetime.now().year)

@app.route('/resume')
def resume():
    return render_template('resume.html', data=PORTFOLIO_DATA)

@app.route('/api/resume')
def download_resume():
    pdf_bytes = build_resume_pdf()
    buf = io.BytesIO(pdf_bytes)
    buf.seek(0)
    return send_file(
        buf,
        mimetype="application/pdf",
        as_attachment=True,
        download_name="Neel_Rupareliya_Resume.pdf"
    )

@app.route('/api/status')
def api_status():
    return jsonify({
        "status": "operational",
        "developer": PORTFOLIO_DATA["name"],
        "node": "neel-core-mca-v2.4",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "uptime": "99.98%",
        "services": {
            "flask_api": "active",
            "hybrid_failover_engine": "healthy (MongoDB Atlas primary, SQLite standby)",
            "playwright_bot_worker": "idle (awaiting scheduled cron trigger)",
            "telegram_bridge": "connected",
            "pinescript_server": "operational"
        }
    })

@app.route('/api/contact', methods=['POST'])
def api_contact():
    payload = request.get_json(silent=True) or request.form.to_dict()
    name = (payload.get('name') or '').strip()
    email = (payload.get('email') or '').strip()
    subject = (payload.get('subject') or 'General Inquiry').strip()
    message = (payload.get('message') or '').strip()

    if not name or not email or not message:
        return jsonify({
            "status": "error",
            "message": "Please provide your name, a valid email, and your message."
        }), 400

    msg_obj = {
        "name": name,
        "email": email,
        "subject": subject,
        "message": message,
        "received_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    }
    CONTACT_MESSAGES.append(msg_obj)

    return jsonify({
        "status": "success",
        "message": f"Message transmitted successfully! Expect a reply within 24h at {email}.",
        "data": msg_obj
    })

@app.route('/api/contact/messages', methods=['GET'])
def get_contact_messages():
    return jsonify({"messages": list(reversed(CONTACT_MESSAGES))})

@app.route('/api/terminal', methods=['POST'])
def api_terminal():
    data = request.get_json(silent=True) or {}
    command = (data.get('command') or '').strip().lower()
    
    if not command:
        return jsonify({"output": ""})

    tokens = command.split()
    cmd = tokens[0]

    if cmd == 'help':
        output = """<div class="space-y-1 font-mono text-xs">
  <div class="text-emerald-400 font-bold border-b border-emerald-500/20 pb-1">AVAILABLE COMMANDS:</div>
  <div><span class="text-emerald-400 font-semibold">about</span> &mdash; who is Neel?</div>
  <div><span class="text-emerald-400 font-semibold">skills</span> &mdash; list the technical stack & toolbelt</div>
  <div><span class="text-emerald-400 font-semibold">projects</span> &mdash; featured production platforms & SaaS</div>
  <div><span class="text-emerald-400 font-semibold">architecture</span> &mdash; automated pipeline overview</div>
  <div><span class="text-emerald-400 font-semibold">experience</span> &mdash; professional work history</div>
  <div><span class="text-emerald-400 font-semibold">education</span> &mdash; MCA & BCA credentials</div>
  <div><span class="text-emerald-400 font-semibold">contact</span> &mdash; communication channels & socials</div>
  <div><span class="text-emerald-400 font-semibold">sudo hire-neel</span> &mdash; initiate developer onboarding sequence</div>
  <div><span class="text-emerald-400 font-semibold">failover-test</span> &mdash; simulate MongoDB to SQLite circuit break</div>
  <div><span class="text-emerald-400 font-semibold">run-bot</span> &mdash; trigger headless chart scraper routine</div>
  <div><span class="text-emerald-400 font-semibold">clear</span> &mdash; wipe the terminal screen</div>
</div>"""
    elif cmd in ['about', 'whoami']:
        output = f"""<div class="space-y-1.5 font-mono text-xs">
  <div><span class="text-emerald-400 font-bold">{PORTFOLIO_DATA['name']}</span> &mdash; {PORTFOLIO_DATA['role']}</div>
  <div class="text-slate-400">Location: {PORTFOLIO_DATA['location']}</div>
  <div class="text-slate-300 leading-relaxed pt-1">{PORTFOLIO_DATA['summary']}</div>
  <div class="text-emerald-400/80 text-[11px] pt-1">&gt; Status: Available for Automation & Architecture Work</div>
</div>"""
    elif cmd == 'skills':
        output = """<div class="space-y-1.5 font-mono text-xs">
  <div class="text-emerald-400 font-bold border-b border-emerald-500/20 pb-1">TECHNICAL STACK MATRIX:</div>
  <div><span class="text-cyan-400 font-semibold">Languages:</span> Python, Pine Script, SQL, JavaScript (ES6+), HTML5/CSS3</div>
  <div><span class="text-cyan-400 font-semibold">Frameworks:</span> Flask, FastAPI, Playwright, Selenium, PyTest, Pandas, WebSockets</div>
  <div><span class="text-cyan-400 font-semibold">Databases:</span> MongoDB Atlas, PostgreSQL, Redis, MySQL, SQLite Failover</div>
  <div><span class="text-cyan-400 font-semibold">Automation:</span> Selenium/Playwright bots, Webhooks, Telegram API, Cron Jobs, Docker</div>
  <div><span class="text-cyan-400 font-semibold">Developer Tools:</span> VS Code, Cursor AI, Git, GitHub Actions, Linux/VPS, Postman</div>
</div>"""
    elif cmd == 'projects':
        output = """<div class="space-y-2 font-mono text-xs">
  <div class="text-emerald-400 font-bold border-b border-emerald-500/20 pb-1">PRODUCTION SOFTWARE & PIPELINES:</div>
  <div>
    <span class="text-emerald-400 font-semibold">[1] Trade Masters</span> (trademasters.co.in) &bull; <span class="text-cyan-400">Automated Provisioning</span><br>
    <span class="text-slate-300">Algo-trading SaaS platform with automated TradingView indicator provisioning & recurring billing.</span>
  </div>
  <div>
    <span class="text-emerald-400 font-semibold">[2] Market Chart Automation & Telegram Alerts</span> &bull; <span class="text-cyan-400">24/7 live</span><br>
    <span class="text-slate-300">Headless Playwright crawler capturing indicators and streaming signals straight to Telegram.</span>
  </div>
  <div>
    <span class="text-emerald-400 font-semibold">[3] ProofAI</span> (proofai-app.4born.com) &bull; <span class="text-cyan-400">90% manual work removed</span><br>
    <span class="text-slate-300">Document classification and verification pipeline with multi-modal language evaluations.</span>
  </div>
  <div>
    <span class="text-emerald-400 font-semibold">[4] Kahanan Jewels</span> (kahaanjewels.com) &bull; <span class="text-cyan-400">100+ products automated</span><br>
    <span class="text-slate-300">Full-stack jewellery storefront with automated inventory sync & 40% DB query reduction.</span>
  </div>
</div>"""
    elif cmd == 'architecture':
        output = """<div class="space-y-1.5 font-mono text-xs">
  <div class="text-emerald-400 font-bold border-b border-emerald-500/20 pb-1">AUTOMATED WORKFLOW ARCHITECTURE:</div>
  <div class="text-slate-200">TradingView Indicator Access & Lifecycle Management Pipeline:</div>
  <div class="text-emerald-300 pl-2">
    [Flask Billing API] &rarr; [Webhook Dispatcher] &rarr; [Pine Script Server] &rarr; [Telegram Bot API]
  </div>
  <div class="text-slate-400 text-[11px] leading-relaxed pt-1">
    Fully automated from Stripe/Razorpay payment event to invite-only Pine Script key provisioning and instant Telegram alert dispatch.
  </div>
</div>"""
    elif cmd == 'experience':
        output = """<div class="space-y-1.5 font-mono text-xs">
  <div class="text-emerald-400 font-bold border-b border-emerald-500/20 pb-1">WORK EXPERIENCE:</div>
  <div><span class="text-emerald-400 font-semibold">Python Developer Intern</span> &bull; LiBest Solutions / 4born Solutions</div>
  <div class="text-slate-400 text-[11px]">Nov 2023 &ndash; May 2024 &bull; Bhavnagar, India</div>
  <div class="text-slate-300 text-[11px] leading-relaxed pt-1">
    &bull; Developed and deployed production Python/Flask applications for live client operations.<br>
    &bull; Architected modular REST APIs with RBAC and encrypted payload verification.<br>
    &bull; Built backend payment gateways, automated webhook pipelines, and scheduled cron jobs.
  </div>
</div>"""
    elif cmd == 'education':
        output = """<div class="space-y-1.5 font-mono text-xs">
  <div class="text-emerald-400 font-bold border-b border-emerald-500/20 pb-1">DEGREES & CREDENTIALS:</div>
  <div><span class="text-emerald-400 font-semibold">Master of Computer Applications (MCA)</span> &bull; MK Bhavnagar University</div>
  <div class="text-slate-400 text-[11px]">Status: Pursuing &bull; Focus: Advanced Software Engineering, Distributed Systems</div>
  <div class="pt-1"><span class="text-emerald-400 font-semibold">Bachelor of Computer Applications (BCA)</span> &bull; MSU Baroda</div>
  <div class="text-slate-400 text-[11px]">Status: Completed (CGPA: 7.3) &bull; Focus: Programming Core, Web Tech, Database Systems</div>
</div>"""
    elif cmd == 'contact':
        output = f"""<div class="space-y-1.5 font-mono text-xs">
  <div class="text-emerald-400 font-bold border-b border-emerald-500/20 pb-1">COMMUNICATION CHANNELS:</div>
  <div><span class="text-slate-400">Email:</span> <a href="mailto:{PORTFOLIO_DATA['email']}" class="text-emerald-400 hover:underline">{PORTFOLIO_DATA['email']}</a></div>
  <div><span class="text-slate-400">Phone:</span> <a href="tel:{PORTFOLIO_DATA['phone']}" class="text-emerald-400 hover:underline">{PORTFOLIO_DATA['phone']}</a></div>
  <div><span class="text-slate-400">LinkedIn:</span> <a href="{PORTFOLIO_DATA['linkedin']}" target="_blank" class="text-emerald-400 hover:underline">linkedin.com/in/neelrupareliya</a></div>
  <div><span class="text-slate-400">GitHub:</span> <a href="{PORTFOLIO_DATA['github']}" target="_blank" class="text-emerald-400 hover:underline">github.com/Neel209</a></div>
  <div><span class="text-slate-400">Telegram:</span> <a href="{PORTFOLIO_DATA['telegram']}" target="_blank" class="text-emerald-400 hover:underline">t.me/neelrupareliya</a></div>
</div>"""
    elif command in ['sudo hire-neel', 'hire-neel']:
        output = """<div class="space-y-1 font-mono text-xs">
  <div class="text-amber-400">[sudo] password for recruiter: ********</div>
  <div class="text-emerald-400 font-bold">[ACCESS GRANTED] Initiating onboarding sequence...</div>
  <div class="text-slate-300">&rarr; Role matched: Python Developer & Automation Engineer.</div>
  <div class="text-slate-300">&rarr; Direct reachout: neelrupareliya59@gmail.com / +91 81419 69437.</div>
  <div class="text-cyan-400">&rarr; Opening contact channel below. Scroll down and transmit your brief!</div>
</div>"""
    elif cmd in ['run-bot', 'bot', 'playwright']:
        output = """<div class="space-y-1 font-mono text-xs">
  <div class="text-amber-400 font-semibold">[AUTOMATION TEST] Running Playwright stealth market bot...</div>
  <div class="text-slate-300">[0.00s] Initialized headless Chromium instance with stealth cookie context.</div>
  <div class="text-slate-300">[0.18s] Queried NSE Holiday Calendar API: Trading Day confirmed (IST).</div>
  <div class="text-slate-300">[0.54s] Injected custom indicators and rendered multi-timeframe charts.</div>
  <div class="text-slate-300">[1.12s] Captured 1920x1080 technical chart screenshot buffer.</div>
  <div class="text-slate-300">[1.85s] Dispatched signal broadcast to Telegram private channel.</div>
  <div class="text-emerald-400 font-bold pt-1">&#10004; Automation pipeline completed with zero errors.</div>
</div>"""
    elif cmd in ['failover-test', 'failover']:
        output = """<div class="space-y-1 font-mono text-xs">
  <div class="text-amber-400 font-semibold">[FAILOVER TEST] Triggering circuit breaker test...</div>
  <div class="text-slate-300">[0.00s] Simulating MongoDB Atlas connection timeout (500ms threshold).</div>
  <div class="text-red-400">[0.02s] Primary cluster unreachable &rarr; Health monitor tripped circuit.</div>
  <div class="text-yellow-400">[0.05s] Routing transaction pipeline to Local SQLite WAL backup engine.</div>
  <div class="text-slate-300">[0.09s] Fallback writes acknowledged: 0 dropped transactions.</div>
  <div class="text-emerald-400 font-bold pt-1">&#10004; Zero downtime verified. Recovery synchronization queued.</div>
</div>"""
    else:
        output = f"""Command not recognized: '{command}'. Type <span class="text-emerald-400 font-semibold">'help'</span> for available commands."""

    return jsonify({"output": output})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5050))
    print(f"🚀 Neel Rupareliya Portfolio running at http://127.0.0.1:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
