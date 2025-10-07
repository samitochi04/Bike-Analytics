import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import FilterPanel from '../components/FilterPanel';
import { analyticsService } from '../services/api';
import { RefreshCw, TrendingUp, Package, Users, Target } from 'lucide-react';

const Analytics = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [customerSegments, setCustomerSegments] = useState([]);
  const [seasonalTrends, setSeasonalTrends] = useState([]);
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
            analyticsService.getFilteredTopProducts(filters),
            analyticsService.getFilteredCustomerSegments(filters),
            analyticsService.getFilteredSeasonalTrends(filters),
          ]
        : [
            analyticsService.getTopProducts(),
            analyticsService.getCustomerSegments(),
            analyticsService.getSeasonalTrends(),
          ];

      const responses = await Promise.all(requests);
      
      // Transform top products data
      const productsResponse = responses[0].data;
      setTopProducts(
        productsResponse.labels?.map((label, index) => ({
          name: label.length > 20 ? label.substring(0, 20) + '...' : label,
          value: productsResponse.data[index]
        })) || []
      );

      // Transform customer segments data
      const segmentsResponse = responses[1].data;
      setCustomerSegments(
        segmentsResponse.segments?.map((segment, index) => ({
          name: segment,
          value: segmentsResponse.revenue[index],
          customers: segmentsResponse.customer_count[index]
        })) || []
      );

      // Transform seasonal trends data
      const seasonalResponse = responses[2].data;
      setSeasonalTrends(
        seasonalResponse.months?.map((month, index) => ({
          name: month,
          revenue: seasonalResponse.revenue[index],
          orders: seasonalResponse.orders[index],
          profit: seasonalResponse.profit[index]
        })) || []
      );

    } catch (err) {
      setError('Erreur lors de la récupération des données analytiques');
      console.error('Analytics data fetch error:', err);
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
            Réessayer
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
          <h1 className="text-2xl font-bold text-gray-900">Analyses Avancées</h1>
          <p className="text-gray-600">Analyses détaillées des produits, clients et tendances</p>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Produits Analysés</p>
              <p className="text-2xl font-bold text-gray-900">{topProducts.length}</p>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Segments Clients</p>
              <p className="text-2xl font-bold text-gray-900">{customerSegments.length}</p>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Mois Analysés</p>
              <p className="text-2xl font-bold text-gray-900">{seasonalTrends.length}</p>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Insights Générés</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Chart
          type="bar"
          data={topProducts.slice(0, 10)}
          title="Top 10 des Produits par Chiffre d'Affaires"
          height={400}
        />

        {/* Customer Segments */}
        <Chart
          type="pie"
          data={customerSegments}
          title="Segmentation des Clients par Valeur"
          height={400}
        />
      </div>

      {/* Seasonal Analysis */}
      <div className="grid grid-cols-1 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Analyse Saisonnière Complète</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Chiffre d'Affaires</h4>
              <Chart
                type="line"
                data={seasonalTrends.map(item => ({ name: item.name, value: item.revenue }))}
                height={200}
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Nombre de Commandes</h4>
              <Chart
                type="line"
                data={seasonalTrends.map(item => ({ name: item.name, value: item.orders }))}
                height={200}
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Bénéfices</h4>
              <Chart
                type="line"
                data={seasonalTrends.map(item => ({ name: item.name, value: item.profit }))}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights Produits</h3>
          <div className="space-y-3">
            {topProducts.slice(0, 5).map((product, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">Rang #{index + 1}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.value)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommandations</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Optimisation du Catalogue</p>
                <p className="text-xs text-gray-600">Concentrez-vous sur les produits les plus performants</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Stratégie Saisonnière</p>
                <p className="text-xs text-gray-600">Adaptez votre stock selon les tendances saisonnières</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Segmentation Client</p>
                <p className="text-xs text-gray-600">Personnalisez votre approche par segment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;