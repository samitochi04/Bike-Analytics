from fastapi import APIRouter, HTTPException
from app.services.kpi_service import kpi_service
from app.models.schemas import FilterRequest, KPIResponse
from typing import List

router = APIRouter()

@router.get("/main", response_model=List[KPIResponse])
async def get_main_kpis():
    """Get main KPIs for the dashboard"""
    try:
        kpis = kpi_service.calculate_main_kpis()
        return kpis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/main", response_model=List[KPIResponse])
async def get_filtered_kpis(filters: FilterRequest):
    """Get main KPIs with filters applied"""
    try:
        filter_dict = filters.dict(exclude_none=True)
        kpis = kpi_service.calculate_main_kpis(filter_dict)
        return kpis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/performance")
async def get_performance_metrics():
    """Get detailed performance metrics"""
    try:
        metrics = kpi_service.get_performance_metrics()
        return metrics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/performance")
async def get_filtered_performance_metrics(filters: FilterRequest):
    """Get performance metrics with filters applied"""
    try:
        filter_dict = filters.dict(exclude_none=True)
        metrics = kpi_service.get_performance_metrics(filter_dict)
        return metrics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))