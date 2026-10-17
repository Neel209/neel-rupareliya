# Neel Rupareliya — Python Developer & Automation Engineer Portfolio

A state-of-the-art developer portfolio and systems engineering showcase built with **Python 3.14, Flask, Three.js & Lenis**. Designed to highlight advanced capabilities in scalable backend engineering, browser automation pipelines (Playwright), FinTech SaaS architecture, and zero-downtime hybrid database failovers.

---

## 🌟 Key Highlights & Next-Level Design Features

- **Three.js Interactive 3D CyberCore**: Real-time rotating wireframe icosahedron, glowing green emissive core, orbital cyan torus ring, and a 700-particle spherical starfield reacting smoothly to cursor coordinates.
- **Avant-Garde Dark Aesthetics**: Curated Neo-Brutalist & Signal Cyber palette (`#07090E`, `#10B981`, `#06B6D4`, `#F59E0B`), Syne display typography, Fira Code monospace, film grain overlay, and emerald glowing text.
- **Editorial Marquee Strip**: Infinite kinetic drift banner showcasing core specializations with pause-on-hover physics.
- **Developer Profile IDE Card (`neel_profile.py`)**: Realistic macOS code window with syntax-highlighted Python class and live executed output.
- **Automated Workflow & Architecture Pipeline**:
  - **4-Node Interactive Flow**: `Flask Billing API` ➔ `Webhook Dispatcher` ➔ `Pine Script Server` ➔ `Telegram Bot API` with animated SVG dashed flow connectors and live clickable inspection.
  - **Trade Masters Hybrid DB Failover**: Live interactive circuit breaker simulation comparing primary MongoDB Atlas vs. automated local SQLite fallback with zero dropped transactions.
  - **Headless Market Chart Automation**: Live simulation of scheduled GitHub Actions cron, NSE Holiday Calendar API filter, stealth Playwright Chromium crawler, and Telegram broadcast.
- **Bento-Style Featured Projects Grid**:
  - Asymmetric 3D tilt hover physics (`perspective: 1000px`, dynamic `rotateX` / `rotateY`).
  - **Trade Masters** (`trademasters.co.in`): FinTech subscription SaaS & automated Pine Script indicator provisioning.
  - **Market Chart Automation Bot** (`github.com/Neel209/Telegram_automation`): Playwright stealth crawler & Telegram alerts (24/7 live).
  - **ProofAI** (`proofai-app.4born.com`): Multi-modal AI vs Human classification engine.
  - **Kahanan Jewels** (`kahaanjewels.com`): E-commerce optimization & automated WinSCP cron synchronization.
- **Interactive Developer Terminal (NEEL.ENV CLI)**:
  - Full CLI emulator supporting interactive commands: `help`, `about`, `skills`, `projects`, `architecture`, `experience`, `education`, `contact`, `failover-test`, `run-bot`, `sudo hire-neel`, and `clear`.
  - Command history navigation (Up/Down arrow keys), quick-action chips, and scanline overlay.
- **Dedicated Official Resume & Dynamic PDF Generator**:
  - Direct routing to a standalone, print-optimized official resume page (`/resume`).
  - Server-side PDF generation via **FPDF2** streaming dynamic vector resume (`GET /api/resume`).
  - ATS-friendly typography, clean grid layout, and instant print stylesheet (`@media print`).
- **Live Flask Backend APIs**:
  - `GET /api/status`: Real-time system health telemetry and node statistics.
  - `GET /api/resume`: Instant resume PDF download.
  - `POST /api/terminal`: Command processor for CLI console.
  - `POST /api/contact`: Form submission handling with JSON validation and toast feedback.
  - `GET /api/contact/messages`: Retrieve submitted messages list.

---

## 🚀 Quickstart & Local Setup

### 1. Requirements
- Python 3.10+ (Tested on Python 3.14)
- Flask 3.0+
- FPDF2 2.7+

### 2. Run the Application
```bash
# Optional: create a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
python3 app.py
```

Open your browser at:
👉 **[http://127.0.0.1:5050](http://127.0.0.1:5050)**

To change port:
```bash
PORT=8080 python3 app.py
```

---

## 📁 Repository Structure

```
Neel_Portfolio/
├── app.py                     # Flask server with core routes, telemetry & FPDF2 PDF resume builder
├── requirements.txt           # Python dependencies (Flask, fpdf2, gunicorn)
├── Procfile                   # Cloud platform deployment entrypoint (gunicorn app:app)
├── .gitignore                 # Standard Python/IDE/OS ignore rules
├── neel-portfolio/            # Design source package & reference assets
├── static/
│   ├── css/
│   │   ├── style.css          # Design system, film grain, grid-bg, marquee, 3D tilt styles
│   │   └── terminal.css       # CLI console styling, scanline sweep & syntax highlighting
│   ├── js/
│   │   ├── canvas-bg.js       # Three.js 3D CyberCore hero canvas & particle field
│   │   ├── terminal.js        # Interactive developer terminal engine with command chips
│   │   ├── architecture.js    # 4-Node pipeline inspector & live interactive simulators
│   │   └── main.js            # Lenis smooth scroll, 3D tilt cards, numerical counters, toast engine
│   └── images/
│       ├── avatar.jpg         # High-tech developer portrait
│       ├── trademasters.jpg   # Trade Masters FinTech platform preview
│       ├── automation.jpg     # Automation & crawler pipeline preview
│       └── proofai.jpg        # ProofAI detection interface preview
├── templates/
│   ├── base.html              # Base layout, Syne/Fira fonts, advanced mobile drawer, footer
│   ├── index.html             # Hero (3D), Marquee, Code Card, Architecture, Bento Projects, Terminal, Contact
│   └── resume.html            # Official print-ready resume page with direct PDF download
└── Neel_Rupareliya_ATS_Resume.html # Original resume source file
```

---

## 📬 Contact & Verification

- **Email**: [neelrupareliya59@gmail.com](mailto:neelrupareliya59@gmail.com) | [neelrupareliya09@gmail.com](mailto:neelrupareliya09@gmail.com)
- **Phone**: [+91 84697 90287](tel:+918469790287)
- **LinkedIn**: [linkedin.com/in/neelrupareliya](https://www.linkedin.com/in/neelrupareliya)
- **GitHub**: [github.com/Neel209](https://github.com/Neel209)
