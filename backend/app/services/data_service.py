import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
import os

class DataService:
    def __init__(self):
        self.df = None
        self.load_data()
    
    def load_data(self):
        """Load the CSV data"""
        try:
            # Look for the CSV file in the data directory or root
            csv_path = None
            possible_paths = [
                'data/bike sport company.csv',
                '../bike sport company.csv',
                '../../bike sport company.csv',
                os.path.join(os.path.dirname(__file__), '../../data/bike sport company.csv')
            ]
            
            for path in possible_paths:
                abs_path = os.path.abspath(path)
                if os.path.exists(abs_path):
                    csv_path = abs_path
                    break
            
            if csv_path:
                self.df = pd.read_csv(csv_path)
                self.df['Date'] = pd.to_datetime(self.df['Date'])
                print(f"Data loaded successfully from {csv_path}")
                print(f"Dataset shape: {self.df.shape}")
            else:
                print("CSV file not found. Creating sample data.")
                self.create_sample_data()
                
        except Exception as e:
            print(f"Error loading data: {e}")
            self.create_sample_data()
    
    def create_sample_data(self):
        """Create sample data if CSV not found"""
        # This creates a minimal dataset structure for testing
        dates = pd.date_range('2013-01-01', '2016-12-31', freq='D')
        sample_data = []
        
        countries = ['Canada', 'Australia', 'United States', 'Germany', 'France', 'United Kingdom']
        age_groups = ['Youth (<25)', 'Young Adults (25-34)', 'Adults (35-64)', 'Seniors (64+)']
        genders = ['M', 'F']
        categories = ['Accessories', 'Bikes', 'Clothing']
        
        for i in range(1000):  # Create 1000 sample records
            date = np.random.choice(dates)
            sample_data.append({
                'Date': date,
                'Day': date.day,
                'Month': date.strftime('%B'),
                'Year': date.year,
                'Customer_Age': np.random.randint(16, 85),
                'Age_Group': np.random.choice(age_groups),
                'Customer_Gender': np.random.choice(genders),
                'Country': np.random.choice(countries),
                'State': 'Sample State',
                'Product_Category': np.random.choice(categories),
                'Sub_Category': 'Sample Sub Category',
                'Product': 'Sample Product',
                'Order_Quantity': np.random.randint(1, 30),
                'Unit_Cost': np.random.uniform(20, 100),
                'Unit_Price': np.random.uniform(50, 200),
                'Profit': 0,  # Will calculate
                'Cost': 0,    # Will calculate
                'Revenue': 0  # Will calculate
            })
        
        self.df = pd.DataFrame(sample_data)
        # Calculate derived fields
        self.df['Cost'] = self.df['Order_Quantity'] * self.df['Unit_Cost']
        self.df['Revenue'] = self.df['Order_Quantity'] * self.df['Unit_Price']
        self.df['Profit'] = self.df['Revenue'] - self.df['Cost']
    
    def get_filtered_data(self, filters: Dict = None) -> pd.DataFrame:
        """Apply filters to the dataset"""
        filtered_df = self.df.copy()
        
        if filters:
            if filters.get('start_date'):
                start_date = pd.to_datetime(filters['start_date'])
                filtered_df = filtered_df[filtered_df['Date'] >= start_date]
            
            if filters.get('end_date'):
                end_date = pd.to_datetime(filters['end_date'])
                filtered_df = filtered_df[filtered_df['Date'] <= end_date]
            
            if filters.get('countries'):
                filtered_df = filtered_df[filtered_df['Country'].isin(filters['countries'])]
            
            if filters.get('age_groups'):
                filtered_df = filtered_df[filtered_df['Age_Group'].isin(filters['age_groups'])]
            
            if filters.get('product_categories'):
                filtered_df = filtered_df[filtered_df['Product_Category'].isin(filters['product_categories'])]
        
        return filtered_df
    
    def get_summary_stats(self, filters: Dict = None) -> Dict:
        """Get summary statistics"""
        df = self.get_filtered_data(filters)
        
        return {
            'total_revenue': float(df['Revenue'].sum()),
            'total_profit': float(df['Profit'].sum()),
            'total_orders': int(df.shape[0]),
            'avg_order_value': float(df['Revenue'].mean()),
            'total_customers': int(df.groupby(['Customer_Age', 'Customer_Gender', 'Country'])['Date'].count().shape[0]),
            'profit_margin': float((df['Profit'].sum() / df['Revenue'].sum()) * 100) if df['Revenue'].sum() > 0 else 0
        }
    
    def get_revenue_by_month(self, filters: Dict = None) -> Dict:
        """Get revenue trend by month"""
        df = self.get_filtered_data(filters)
        monthly_revenue = df.groupby(df['Date'].dt.to_period('M'))['Revenue'].sum()
        
        return {
            'labels': [str(period) for period in monthly_revenue.index],
            'data': monthly_revenue.values.tolist()
        }
    
    def get_top_products(self, filters: Dict = None, limit: int = 10) -> Dict:
        """Get top products by revenue"""
        df = self.get_filtered_data(filters)
        top_products = df.groupby('Product')['Revenue'].sum().sort_values(ascending=False).head(limit)
        
        return {
            'labels': top_products.index.tolist(),
            'data': top_products.values.tolist()
        }
    
    def get_geographic_performance(self, filters: Dict = None) -> Dict:
        """Get performance by geographic region"""
        df = self.get_filtered_data(filters)
        geo_performance = df.groupby('Country').agg({
            'Revenue': 'sum',
            'Profit': 'sum',
            'Order_Quantity': 'sum'
        }).round(2)
        
        return {
            'countries': geo_performance.index.tolist(),
            'revenue': geo_performance['Revenue'].tolist(),
            'profit': geo_performance['Profit'].tolist(),
            'orders': geo_performance['Order_Quantity'].tolist()
        }
    
    def get_age_group_analysis(self, filters: Dict = None) -> Dict:
        """Analyze customer behavior by age group"""
        df = self.get_filtered_data(filters)
        age_analysis = df.groupby('Age_Group').agg({
            'Revenue': 'sum',
            'Profit': 'sum',
            'Customer_Age': 'count',
            'Order_Quantity': 'mean'
        }).round(2)
        
        return {
            'age_groups': age_analysis.index.tolist(),
            'revenue': age_analysis['Revenue'].tolist(),
            'profit': age_analysis['Profit'].tolist(),
            'customer_count': age_analysis['Customer_Age'].tolist(),
            'avg_order_quantity': age_analysis['Order_Quantity'].tolist()
        }
    
    def get_seasonal_trends(self, filters: Dict = None) -> Dict:
        """Analyze seasonal purchasing patterns"""
        df = self.get_filtered_data(filters)
        seasonal_data = df.groupby('Month').agg({
            'Revenue': 'sum',
            'Order_Quantity': 'sum',
            'Profit': 'sum'
        }).round(2)
        
        # Order months correctly
        month_order = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December']
        seasonal_data = seasonal_data.reindex([m for m in month_order if m in seasonal_data.index])
        
        return {
            'months': seasonal_data.index.tolist(),
            'revenue': seasonal_data['Revenue'].tolist(),
            'orders': seasonal_data['Order_Quantity'].tolist(),
            'profit': seasonal_data['Profit'].tolist()
        }
    
    def get_customer_segmentation(self, filters: Dict = None) -> Dict:
        """Customer segmentation analysis"""
        df = self.get_filtered_data(filters)
        
        # Create customer lifetime value
        customer_data = df.groupby(['Customer_Age', 'Customer_Gender', 'Country']).agg({
            'Revenue': 'sum',
            'Profit': 'sum',
            'Date': 'count',
            'Order_Quantity': 'sum'
        }).rename(columns={'Date': 'Order_Count'})
        
        # Segment customers by value
        customer_data['CLV'] = customer_data['Revenue']
        customer_data['Segment'] = pd.cut(customer_data['CLV'], 
                                        bins=[0, 500, 1500, float('inf')], 
                                        labels=['Low Value', 'Medium Value', 'High Value'])
        
        segment_summary = customer_data.groupby('Segment').agg({
            'Revenue': 'sum',
            'Profit': 'sum',
            'Order_Count': 'sum',
            'CLV': 'count'
        }).rename(columns={'CLV': 'Customer_Count'})
        
        return {
            'segments': segment_summary.index.tolist(),
            'revenue': segment_summary['Revenue'].tolist(),
            'profit': segment_summary['Profit'].tolist(),
            'customer_count': segment_summary['Customer_Count'].tolist(),
            'order_count': segment_summary['Order_Count'].tolist()
        }

# Global instance
data_service = DataService()