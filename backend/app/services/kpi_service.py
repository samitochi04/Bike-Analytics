from app.services.data_service import data_service
from app.models.schemas import KPIResponse
from typing import List, Dict
import pandas as pd

class KPIService:
    def __init__(self):
        self.data_service = data_service
    
    def calculate_main_kpis(self, filters: Dict = None) -> List[KPIResponse]:
        """Calculate main KPIs for the dashboard"""
        df = self.data_service.get_filtered_data(filters)
        
        # Get comparison data (previous period)
        prev_filters = self._get_previous_period_filters(filters)
        prev_df = self.data_service.get_filtered_data(prev_filters)
        
        kpis = []
        
        # Total Revenue
        current_revenue = df['Revenue'].sum()
        prev_revenue = prev_df['Revenue'].sum()
        revenue_change = ((current_revenue - prev_revenue) / prev_revenue * 100) if prev_revenue > 0 else 0
        
        kpis.append(KPIResponse(
            name="Total Revenue",
            value=current_revenue,
            change=revenue_change,
            trend="up" if revenue_change > 0 else "down",
            format_type="currency"
        ))
        
        # Total Profit
        current_profit = df['Profit'].sum()
        prev_profit = prev_df['Profit'].sum()
        profit_change = ((current_profit - prev_profit) / prev_profit * 100) if prev_profit > 0 else 0
        
        kpis.append(KPIResponse(
            name="Total Profit",
            value=current_profit,
            change=profit_change,
            trend="up" if profit_change > 0 else "down",
            format_type="currency"
        ))
        
        # Orders Count
        current_orders = len(df)
        prev_orders = len(prev_df)
        orders_change = ((current_orders - prev_orders) / prev_orders * 100) if prev_orders > 0 else 0
        
        kpis.append(KPIResponse(
            name="Total Orders",
            value=current_orders,
            change=orders_change,
            trend="up" if orders_change > 0 else "down",
            format_type="number"
        ))
        
        # Average Order Value
        current_aov = df['Revenue'].mean()
        prev_aov = prev_df['Revenue'].mean()
        aov_change = ((current_aov - prev_aov) / prev_aov * 100) if prev_aov > 0 else 0
        
        kpis.append(KPIResponse(
            name="Avg Order Value",
            value=current_aov,
            change=aov_change,
            trend="up" if aov_change > 0 else "down",
            format_type="currency"
        ))
        
        # Profit Margin
        profit_margin = (current_profit / current_revenue * 100) if current_revenue > 0 else 0
        prev_profit_margin = (prev_profit / prev_revenue * 100) if prev_revenue > 0 else 0
        margin_change = profit_margin - prev_profit_margin
        
        kpis.append(KPIResponse(
            name="Profit Margin",
            value=profit_margin,
            change=margin_change,
            trend="up" if margin_change > 0 else "down",
            format_type="percentage"
        ))
        
        # Customer Satisfaction Score (simulated based on repeat customers)
        customer_satisfaction = self._calculate_customer_satisfaction(df)
        prev_satisfaction = self._calculate_customer_satisfaction(prev_df)
        satisfaction_change = customer_satisfaction - prev_satisfaction
        
        kpis.append(KPIResponse(
            name="Customer Satisfaction",
            value=customer_satisfaction,
            change=satisfaction_change,
            trend="up" if satisfaction_change > 0 else "down",
            format_type="percentage"
        ))
        
        return kpis
    
    def _get_previous_period_filters(self, filters: Dict = None) -> Dict:
        """Get filters for the previous period for comparison"""
        if not filters:
            filters = {}
        
        prev_filters = filters.copy()
        
        # If date range is specified, shift it back by the same duration
        if filters.get('start_date') and filters.get('end_date'):
            start_date = pd.to_datetime(filters['start_date'])
            end_date = pd.to_datetime(filters['end_date'])
            duration = end_date - start_date
            
            prev_filters['start_date'] = (start_date - duration).strftime('%Y-%m-%d')
            prev_filters['end_date'] = (end_date - duration).strftime('%Y-%m-%d')
        else:
            # Default to previous year comparison
            current_year = pd.Timestamp.now().year
            prev_filters['start_date'] = f'{current_year-1}-01-01'
            prev_filters['end_date'] = f'{current_year-1}-12-31'
        
        return prev_filters
    
    def _calculate_customer_satisfaction(self, df: pd.DataFrame) -> float:
        """Calculate customer satisfaction score based on business metrics"""
        if df.empty:
            return 0.0
        
        # Simulate customer satisfaction based on:
        # 1. Repeat purchase rate
        # 2. Average order value
        # 3. Profit margin per customer
        
        customers = df.groupby(['Customer_Age', 'Customer_Gender', 'Country']).size()
        repeat_customers = (customers > 1).sum()
        total_customers = len(customers)
        repeat_rate = (repeat_customers / total_customers) if total_customers > 0 else 0
        
        # Normalize metrics to 0-100 scale
        satisfaction_score = min(100, (repeat_rate * 80) + 20)  # Base 20% + up to 80% based on repeat rate
        
        return round(satisfaction_score, 1)
    
    def get_performance_metrics(self, filters: Dict = None) -> Dict:
        """Get detailed performance metrics"""
        df = self.data_service.get_filtered_data(filters)
        
        return {
            "conversion_metrics": {
                "total_visitors": len(df) * 3,  # Simulated: assuming 3 visitors per order
                "total_orders": len(df),
                "conversion_rate": 33.3  # Simulated conversion rate
            },
            "financial_metrics": {
                "revenue_per_customer": df.groupby(['Customer_Age', 'Customer_Gender', 'Country'])['Revenue'].sum().mean(),
                "profit_per_order": df['Profit'].mean(),
                "cost_per_acquisition": df['Cost'].mean() * 0.1  # Simulated CPA
            },
            "operational_metrics": {
                "avg_order_processing_time": 2.5,  # Simulated in days
                "inventory_turnover": 8.3,  # Simulated
                "return_rate": 5.2  # Simulated percentage
            }
        }

# Global instance
kpi_service = KPIService()