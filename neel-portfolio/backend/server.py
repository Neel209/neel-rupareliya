from fastapi import FastAPI, APIRouter
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import io
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from fpdf import FPDF


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@api_router.get("/")
async def root():
    return {"message": "Neel Rupareliya Portfolio API — online"}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    msg = ContactMessage(**input.model_dump())
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg


@api_router.get("/contact/messages", response_model=List[ContactMessage])
async def get_contact_messages():
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


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
    pdf.cell(0, 5, "neelrupareliya59@gmail.com  |  +91 81419 69437  |  Gujarat, India (remote worldwide)",
            new_x="LMARGIN", new_y="NEXT")

    _sec(pdf, "SUMMARY")
    _line(pdf, "Python developer specialising in web backends, browser automation and SaaS pipelines. "
               "Experienced in Python, Flask, FastAPI, Selenium, Pine Script and database architectures "
               "(MongoDB, MySQL, Redis). Focused on building clean, practical and dependable software "
               "that removes manual work entirely.")

    _sec(pdf, "EXPERIENCE")
    _line(pdf, "Python Developer Intern - LiBest Solutions, Bhavnagar, India", bold=True, size=10.5, color=(248, 250, 252))
    _line(pdf, "Nov 2023 - May 2024", size=8.5, color=(16, 185, 129))
    for b in [
        "Developed and maintained multiple production Python/Flask applications serving live client operations.",
        "Architected modular REST APIs with role-based access control (RBAC), secure session handling and encrypted payload verification.",
        "Built backend integrations for payment gateways, automated webhook pipelines and scheduled cron jobs.",
        "Delivered 10+ internal development tools (admin consoles, custom dashboards) improving team delivery speed.",
        "Collaborated in Agile sprint planning, CI/CD code reviews and issue tracking using Git, GitHub and Jira.",
    ]:
        _line(pdf, f"  >>  {b}")

    _sec(pdf, "FEATURED PROJECTS")
    for title, desc in [
        ("Trade Masters", "FinTech subscription platform - automated TradingView license provisioning, webhook-driven access control and fail-safe database architecture."),
        ("Market Chart Automation & Telegram Alerts", "Headless chart-capture pipeline pushing real-time indicator snapshots and signals to Telegram, 24/7."),
        ("ProofAI", "Document classification and verification pipeline - parses uploads, extracts fields, flags anomalies automatically."),
        ("Kahanan Jewels", "Full-stack jewellery e-commerce with automated inventory sync, order lifecycle emails and custom admin dashboard."),
    ]:
        _line(pdf, title, bold=True, size=10, color=(248, 250, 252))
        _line(pdf, f"  {desc}")

    _sec(pdf, "TECHNICAL SKILLS")
    for group, items in [
        ("Languages", "Python, Pine Script, SQL, JavaScript (ES6+), HTML5/CSS3"),
        ("Frameworks & Libraries", "Flask, FastAPI, Selenium, PyTest, Pandas, WebSockets, RESTful APIs"),
        ("Databases & Storage", "MongoDB Atlas, MySQL, PostgreSQL, Redis, SQLite"),
        ("Automation & DevOps", "Selenium, Webhooks, Cron scheduling, Docker, Telegram Bot API, Linux/VPS, Nginx"),
        ("Developer Tools", "VS Code, Postman, Git & GitHub, Jira, CI/CD workflows"),
    ]:
        _line(pdf, f"{group}:  {items}")

    _sec(pdf, "EDUCATION")
    _line(pdf, "Master of Computer Applications (MCA) - Pursuing", bold=True, size=10, color=(248, 250, 252))
    _line(pdf, "  Advanced Software Engineering - Distributed Systems - Database Architecture")
    _line(pdf, "Bachelor of Computer Applications (BCA) - 2019 to 2022", bold=True, size=10, color=(248, 250, 252))
    _line(pdf, "  Programming Fundamentals - OOP - Web Technologies - Database Systems")

    return bytes(pdf.output())


@api_router.get("/resume")
async def download_resume():
    buf = io.BytesIO(build_resume_pdf())
    return StreamingResponse(
        buf,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=Neel_Rupareliya_Resume.pdf"},
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
