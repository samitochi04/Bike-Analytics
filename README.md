# Bike Analytics Dashboard

A comprehensive data science analysis dashboard for bike sport company data, featuring real-time KPIs, interactive visualizations, and business intelligence insights.

## 🏗️ Architecture

- **Backend**: FastAPI (Python) - RESTful API with data processing and analytics
- **Frontend**: React.js with Tailwind CSS v3 - Interactive dashboard interface
- **Data Processing**: Pandas, NumPy, Scikit-learn for statistical analysis
- **Visualization**: Recharts for interactive charts and graphs

## 📊 Business Scenarios & KPIs

### Key Performance Indicators
1. **Customer Lifetime Value & Retention Analysis**
2. **Geographic Market Performance**
3. **Age Group Purchasing Behavior**
4. **Seasonal Sales Trends**
5. **Product Category Performance**
6. **Profit Margin Optimization**

### Dashboard Features
- Real-time KPI cards with trend indicators
- Revenue trends and forecasting
- Customer segmentation analysis
- Geographic performance mapping
- Seasonal purchasing patterns
- Product category insights
- Advanced filtering and date range selection

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Place your CSV file in the `data/` directory:
```bash
cp "bike sport company.csv" data/
```

5. Start the FastAPI server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The dashboard will be available at `http://localhost:3000`

## 📁 Project Structure

```
bike-analytics-dashboard/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   │   └── schemas.py
│   │   ├── routes/
│   │   │   ├── analytics.py
│   │   │   ├── dashboard.py
│   │   │   └── kpi.py
│   │   └── services/
│   │       ├── data_service.py
│   │       └── kpi_service.py
│   ├── data/
│   │   └── bike sport company.csv
│   ├── main.py
│   ├── requirements.txt
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chart.jsx
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── KPICard.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── .gitignore
└── README.md
```

## 🔌 API Endpoints

### KPI Endpoints
- `GET /api/kpi/main` - Get main KPIs
- `POST /api/kpi/main` - Get filtered KPIs
- `GET /api/kpi/performance` - Get performance metrics

### Dashboard Endpoints
- `GET /api/dashboard/summary` - Get dashboard summary
- `GET /api/dashboard/revenue-trend` - Get revenue trends
- `GET /api/dashboard/geographic` - Get geographic data
- `GET /api/dashboard/age-groups` - Get age group analysis

### Analytics Endpoints
- `GET /api/analytics/products/top` - Get top products
- `GET /api/analytics/seasonal` - Get seasonal trends
- `GET /api/analytics/customer-segments` - Get customer segments
- `GET /api/analytics/filters/options` - Get filter options

## 🎨 Design Features

The dashboard follows modern UI/UX principles:
- Clean, professional layout matching the provided design
- Responsive design for all screen sizes
- Interactive charts and visualizations
- Real-time data filtering
- Intuitive navigation sidebar
- Color-coded KPI indicators
- Smooth transitions and animations

## 🚀 Deployment

### Backend Deployment (Coolify VPS)
1. Push backend code to GitHub repository
2. Set up Python environment on your VPS
3. Install dependencies and configure environment variables
4. Run the FastAPI application with a production WSGI server

### Frontend Deployment (Coolify VPS)
1. Push frontend code to GitHub repository
2. Build the React application: `npm run build`
3. Serve the built files using a web server (nginx, Apache, etc.)
4. Configure API endpoint URLs for production

## 📈 Business Intelligence Insights

The dashboard provides actionable insights for:
- **Revenue Optimization**: Identify high-performing products and markets
- **Customer Retention**: Analyze customer behavior patterns
- **Market Expansion**: Discover untapped geographic opportunities
- **Seasonal Planning**: Optimize inventory based on seasonal trends
- **Profit Maximization**: Monitor profit margins across different segments

## 🛠️ Technologies Used

### Backend
- FastAPI - Modern, fast web framework for building APIs
- Pandas - Data manipulation and analysis
- NumPy - Numerical computing
- Pydantic - Data validation using Python type annotations
- Uvicorn - ASGI server implementation

### Frontend
- React.js - JavaScript library for building user interfaces
- Tailwind CSS v3 - Utility-first CSS framework
- Recharts - Composable charting library built on React components
- Axios - Promise-based HTTP client
- Lucide React - Beautiful & consistent icon toolkit

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue on the GitHub repository.