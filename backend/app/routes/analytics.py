from fastapi import APIRouter, HTTPException
from app.services.data_service import data_service
from app.models.schemas import FilterRequest

router = APIRouter()

@router.get("/products/top")
async def get_top_products():
    """Get top products by revenue"""
    try:
        products = data_service.get_top_products()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/products/top")
async def get_filtered_top_products(filters: FilterRequest):
    """Get top products with filters"""
    try:
        filter_dict = filters.dict(exclude_none=True)
        products = data_service.get_top_products(filter_dict)
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/seasonal")
async def get_seasonal_trends():
    """Get seasonal purchasing trends"""
    try:
        seasonal = data_service.get_seasonal_trends()
        return seasonal
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/seasonal")
async def get_filtered_seasonal_trends(filters: FilterRequest):
    """Get seasonal trends with filters"""
    try:
        filter_dict = filters.dict(exclude_none=True)
        seasonal = data_service.get_seasonal_trends(filter_dict)
        return seasonal
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/customer-segments")
async def get_customer_segmentation():
    """Get customer segmentation analysis"""
    try:
        segments = data_service.get_customer_segmentation()
        return segments
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/customer-segments")
async def get_filtered_customer_segmentation(filters: FilterRequest):
    """Get customer segmentation with filters"""
    try:
        filter_dict = filters.dict(exclude_none=True)
        segments = data_service.get_customer_segmentation(filter_dict)
        return segments
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/filters/options")
async def get_filter_options():
    """Get available filter options"""
    try:
        if data_service.df is None:
            return {"countries": [], "age_groups": [], "product_categories": []}
        
        return {
            "countries": sorted(data_service.df['Country'].unique().tolist()),
            "age_groups": sorted(data_service.df['Age_Group'].unique().tolist()),
            "product_categories": sorted(data_service.df['Product_Category'].unique().tolist()),
            "date_range": {
                "min_date": data_service.df['Date'].min().strftime('%Y-%m-%d'),
                "max_date": data_service.df['Date'].max().strftime('%Y-%m-%d')
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))