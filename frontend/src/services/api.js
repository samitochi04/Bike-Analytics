import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// KPI Service
export const kpiService = {
  getMainKPIs: () => api.get('/api/kpi/main'),
  getFilteredKPIs: (filters) => api.post('/api/kpi/main', filters),
  getPerformanceMetrics: () => api.get('/api/kpi/performance'),
  getFilteredPerformanceMetrics: (filters) => api.post('/api/kpi/performance', filters),
};

// Dashboard Service
export const dashboardService = {
  getSummary: () => api.get('/api/dashboard/summary'),
  getFilteredSummary: (filters) => api.post('/api/dashboard/summary', filters),
  getRevenueTrend: () => api.get('/api/dashboard/revenue-trend'),
  getFilteredRevenueTrend: (filters) => api.post('/api/dashboard/revenue-trend', filters),
  getGeographicData: () => api.get('/api/dashboard/geographic'),
  getFilteredGeographicData: (filters) => api.post('/api/dashboard/geographic', filters),
  getAgeGroupData: () => api.get('/api/dashboard/age-groups'),
  getFilteredAgeGroupData: (filters) => api.post('/api/dashboard/age-groups', filters),
};

// Analytics Service
export const analyticsService = {
  getTopProducts: () => api.get('/api/analytics/products/top'),
  getFilteredTopProducts: (filters) => api.post('/api/analytics/products/top', filters),
  getSeasonalTrends: () => api.get('/api/analytics/seasonal'),
  getFilteredSeasonalTrends: (filters) => api.post('/api/analytics/seasonal', filters),
  getCustomerSegments: () => api.get('/api/analytics/customer-segments'),
  getFilteredCustomerSegments: (filters) => api.post('/api/analytics/customer-segments', filters),
  getFilterOptions: () => api.get('/api/analytics/filters/options'),
};

export default api;