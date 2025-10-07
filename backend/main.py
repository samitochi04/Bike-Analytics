from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import analytics, dashboard, kpi
import uvicorn

app = FastAPI(
    title="Bike Company Analytics API",
    description="Data analytics API for bike sport company",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "*"],  # React dev servers
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(kpi.router, prefix="/api/kpi", tags=["kpi"])

@app.get("/")
def read_root():
    return {"message": "Bike Company Analytics API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)