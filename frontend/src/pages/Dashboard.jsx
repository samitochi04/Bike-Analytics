import React, { useState, useEffect } from 'react';
import KPICard from '../components/KPICard';
import Chart from '../components/Chart';
import FilterPanel from '../components/FilterPanel';
import { kpiService, dashboardService, analyticsService } from '../services/api';
import { RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [kpis, setKpis] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [geographicData, setGeographicData] = useState([]);
  const [ageGroupData, setAgeGroupData] = useState([]);
  const [seasonalData, setSeasonalData] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const requests = Object.keys(filters).length > 0
        ? [
            kpiService.getFilteredKPIs(filters),
            dashboardService.getFilteredRevenueTrend(filters),
            dashboardService.getFilteredGeographicData(filters),
            dashboardService.getFilteredAgeGroupData(filters),
            analyticsService.getFilteredSeasonalTrends(filters),
          ]
        : [
            kpiService.getMainKPIs(),
            dashboardService.getRevenueTrend(),
            dashboardService.getGeographicData(),
            dashboardService.getAgeGroupData(),
            analyticsService.getSeasonalTrends(),
          ];

      const responses = await Promise.all(requests);
      
      setKpis(responses[0].data);
      
      // Transform revenue data for chart
      const revenueResponse = responses[1].data;
      setRevenueData(
        revenueResponse.labels?.map((label, index) => ({
          name: label,
          value: revenueResponse.data[index]
        })) || []
      );

      // Transform geographic data for chart
      const geoResponse = responses[2].data;
      setGeographicData(
        geoResponse.countries?.map((country, index) => ({
          name: country,
          value: geoResponse.revenue[index]
        })) || []
      );

      // Transform age group data for chart
      const ageResponse = responses[3].data;
      setAgeGroupData(
        ageResponse.age_groups?.map((group, index) => ({
          name: group,
          value: ageResponse.revenue[index]
        })) || []
      );

      // Transform seasonal data for chart
      const seasonalResponse = responses[4].data;
      setSeasonalData(
        seasonalResponse.months?.map((month, index) => ({
          name: month.slice(0, 3), // Abbreviate month names
          value: seasonalResponse.revenue[index]
        })) || []
      );

    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const response = await analyticsService.getFilterOptions();
      setFilterOptions(response.data);
    } catch (err) {
      console.error('Filter options fetch error:', err);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    fetchData();
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button onClick={handleRefresh} className="mt-2 text-red-600 hover:text-red-800">
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord</h1>
          <p className="text-gray-600">Vue d'ensemble des performances de votre entreprise de vélos</p>
        </div>
        <div className="flex items-center space-x-4">
          <FilterPanel 
            filters={filters}
            onFiltersChange={handleFiltersChange}
            filterOptions={filterOptions}
          />
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualiser</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <KPICard key={index} kpi={kpi} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Chart
          type="area"
          data={revenueData}
          title="Évolution du Chiffre d'Affaires"
          height={300}
        />

        {/* Geographic Performance */}
        <Chart
          type="bar"
          data={geographicData}
          title="Chiffre d'Affaires par Pays"
          height={300}
        />

        {/* Age Group Analysis */}
        <Chart
          type="pie"
          data={ageGroupData}
          title="Chiffre d'Affaires par Tranche d'Âge"
          height={300}
        />

        {/* Seasonal Trends */}
        <Chart
          type="line"
          data={seasonalData}
          title="Tendances Saisonnières"
          height={300}
        />
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights Clés</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Croissance du chiffre d'affaires à la hausse</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Performance solide sur les marchés clés</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Tendances saisonnières identifiées</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Marchés Principaux</h3>
          <div className="space-y-2">
            {geographicData.slice(0, 3).map((country, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{country.name}</span>
                <span className="text-sm text-gray-600">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(country.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé des Performances</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Pays</span>
              <span className="text-sm font-medium text-gray-900">
                {geographicData.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Points de Données</span>
              <span className="text-sm font-medium text-gray-900">
                {revenueData.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Segments d'Âge</span>
              <span className="text-sm font-medium text-gray-900">
                {ageGroupData.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;