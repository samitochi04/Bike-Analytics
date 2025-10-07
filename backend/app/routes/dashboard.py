from fastapi import APIRouter, HTTPException
from app.services.data_service import data_service
from app.models.schemas import FilterRequest
from typing import Dict, Any

router = APIRouter()

@router.get("/summary")
async def get_dashboard_summary():
    """Get dashboard summary data"""
    try:
        summary = data_service.get_summary_stats()
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/summary")
async def get_filtered_dashboard_summary(filters: FilterRequest):
    """Get dashboard summary with filters"""
    try:
        filter_dict = filters.dict(exclude_none=True)
        summary = data_service.get_summary_stats(filter_dict)
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/revenue-trend")
async def get_revenue_trend():
    """Get revenue trend by month"""
    try:
        trend = data_service.get_revenue_by_month()
        return trend
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/revenue-trend")
async def get_filtered_revenue_trend(filters: FilterRequest):
    """Get revenue trend with filters"""
    try:
        filter_dict = filters.dict(exclude_none=True)
        trend = data_service.get_revenue_by_month(filter_dict)
        return trend
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/geographic")
async def get_geographic_data():
    """Get geographic performance data"""
    try:
        geo_data = data_service.get_geographic_performance()
        return geo_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/geographic")
async def get_filtered_geographic_data(filters: FilterRequest):
    """Get geographic performance with filters"""
    try:
        filter_dict = filters.dict(exclude_none=True)
        geo_data = data_service.get_geographic_performance(filter_dict)
        return geo_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/age-groups")
async def get_age_group_data():
    """Get age group analysis"""
    try:
        age_data = data_service.get_age_group_analysis()
        return age_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/age-groups")
async def get_filtered_age_group_data(filters: FilterRequest):
    """Get age group analysis with filters"""
    try:
        filter_dict = filters.dict(exclude_none=True)
        age_data = data_service.get_age_group_analysis(filter_dict)
        return age_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))