from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import date

class SalesData(BaseModel):
    date: date
    day: int
    month: str
    year: int
    customer_age: int
    age_group: str
    customer_gender: str
    country: str
    state: str
    product_category: str
    sub_category: str
    product: str
    order_quantity: int
    unit_cost: float
    unit_price: float
    profit: float
    cost: float
    revenue: float

class KPIResponse(BaseModel):
    name: str
    value: float
    change: Optional[float] = None
    trend: Optional[str] = None
    format_type: str = "number"  # number, currency, percentage

class ChartData(BaseModel):
    labels: List[str]
    datasets: List[Dict[str, Any]]

class DashboardResponse(BaseModel):
    kpis: List[KPIResponse]
    charts: Dict[str, Any]
    summary: Dict[str, Any]

class FilterRequest(BaseModel):
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    countries: Optional[List[str]] = None
    age_groups: Optional[List[str]] = None
    product_categories: Optional[List[str]] = None