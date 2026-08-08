from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.settings import router as settings_router

# Database
from database.database import Base, engine

# Models
import models.user


# Routes
from routes.auth import router as auth_router
from routes.dashboard import router as dashboard_router

# ==========================================
# Create Database Tables
# ==========================================

Base.metadata.create_all(bind=engine)

# ==========================================
# FastAPI App
# ==========================================

app = FastAPI(
    title="Naval Combat Simulator API",
    version="1.0.0",
    description="Backend API for Naval Combat Simulator"
)

# ==========================================
# CORS
# ==========================================

origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# Include Routes
# ==========================================

app.include_router(auth_router)
app.include_router(dashboard_router)

# ==========================================
# Home Route
# ==========================================

@app.get("/")
def home():
    return {
        "status": "success",
        "message": "Naval Combat Simulator Backend Running"
    }

# ==========================================
# Health Check
# ==========================================

@app.get("/health")
def health():
    return {
        "status": "success",
        "server": "running"
    }