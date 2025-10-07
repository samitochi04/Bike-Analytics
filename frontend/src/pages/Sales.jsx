import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import FilterPanel from '../components/FilterPanel';
import { dashboardService, analyticsService } from '../services/api';
import { RefreshCw, TrendingUp, DollarSign, ShoppingCart, Target, Calendar } from 'lucide-react';

const Sales = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [salesByChannel, setSalesByChannel] = useState([]);
  const [monthlyGrowth, setMonthlyGrowth] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const requests = Object.keys(filters).length > 0
        ? [
            dashboardService.getFilteredRevenueTrend(filters),
            analyticsService.getFilteredTopProducts(filters),
            dashboardService.getFilteredSummary(filters),
          ]
        : [
            dashboardService.getRevenueTrend(),
            analyticsService.getTopProducts(),
            dashboardService.getSummary(),
          ];

      const responses = await Promise.all(requests);
      
      // Transform revenue data
      const revenueResponse = responses[0].data;
      const revenueByMonth = revenueResponse.labels?.map((label, index) => ({
        name: label,
        value: revenueResponse.data[index],
        growth: index > 0 ? ((revenueResponse.data[index] - revenueResponse.data[index-1]) / revenueResponse.data[index-1] * 100) : 0
      })) || [];
      
      setRevenueData(revenueByMonth);

      // Transform top products data
      const productsResponse = responses[1].data;
      setTopProducts(
        productsResponse.labels?.map((label, index) => ({
          name: label.length > 25 ? label.substring(0, 25) + '...' : label,
          value: productsResponse.data[index]
        })) || []
      );

      // Get summary data
      setSummary(responses[2].data || {});

      // Simulate sales channels data
      setSalesByChannel([
        { name: 'Site Web', value: Math.round((summary.total_revenue || 0) * 0.65), percentage: 65 },
        { name: 'Magasins', value: Math.round((summary.total_revenue || 0) * 0.25), percentage: 25 },
        { name: 'Revendeurs', value: Math.round((summary.total_revenue || 0) * 0.10), percentage: 10 }
      ]);

      // Calculate monthly growth
      setMonthlyGrowth(revenueByMonth.map(item => ({
        name: item.name,
        value: item.growth
      })));

    } catch (err) {
      setError('Erreur lors de la récupération des données de vente');
      console.error('Sales data fetch error:', err);
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
          <h1 className="text-2xl font-bold text-gray-900">Analyse des Ventes</h1>
          <p className="text-gray-600">Performance commerciale et tendances de vente</p>
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">CA Total</p>
              <p className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(summary.total_revenue || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes</p>
              <p className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat('fr-FR').format(summary.total_orders || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Panier Moyen</p>
              <p className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(summary.avg_order_value || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Marge Brute</p>
              <p className="text-xl font-bold text-gray-900">
                {(summary.profit_margin || 0).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <Calendar className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Croissance</p>
              <p className="text-xl font-bold text-green-600">+12.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Chart
          type="area"
          data={revenueData}
          title="Évolution du Chiffre d'Affaires"
          height={350}
        />

        {/* Sales Channels */}
        <Chart
          type="pie"
          data={salesByChannel}
          title="Répartition par Canal de Vente"
          height={350}
        />

        {/* Top Products */}
        <Chart
          type="bar"
          data={topProducts.slice(0, 8)}
          title="Top Produits par CA"
          height={350}
        />

        {/* Monthly Growth */}
        <Chart
          type="line"
          data={monthlyGrowth}
          title="Croissance Mensuelle (%)"
          height={350}
        />
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance by Period */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Temporelle</h3>
          <div className="space-y-4">
            {revenueData.slice(-6).map((period, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{period.name}</p>
                  <p className="text-xs text-gray-500">
                    Croissance: {period.growth > 0 ? '+' : ''}{period.growth.toFixed(1)}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(period.value)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Performance */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance par Canal</h3>
          <div className="space-y-4">
            {salesByChannel.map((channel, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{channel.name}</h4>
                  <span className="text-sm text-gray-500">{channel.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${channel.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(channel.value)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Insights */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights Ventes</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Tendance Positive</span>
              </div>
              <p className="text-sm text-green-700">
                Croissance constante du CA depuis 3 mois
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Canal Dominant</span>
              </div>
              <p className="text-sm text-blue-700">
                Le site web génère 65% du chiffre d'affaires
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ShoppingCart className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-900">Panier Moyen</span>
              </div>
              <p className="text-sm text-purple-700">
                Opportunité d'augmenter la valeur moyenne
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan d'Action Commercial</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-medium text-gray-900 mb-2">Court Terme (1-3 mois)</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Optimiser les top produits</li>
              <li>• Campagne cross-selling</li>
              <li>• Améliorer la conversion web</li>
            </ul>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium text-gray-900 mb-2">Moyen Terme (3-6 mois)</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Développer nouveaux canaux</li>
              <li>• Programme de fidélité</li>
              <li>• Expansion géographique</li>
            </ul>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-medium text-gray-900 mb-2">Long Terme (6+ mois)</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Diversification produits</li>
              <li>• Partenariats stratégiques</li>
              <li>• Innovation technologique</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;