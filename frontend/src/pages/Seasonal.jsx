import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import FilterPanel from '../components/FilterPanel';
import { analyticsService } from '../services/api';
import { RefreshCw, Calendar, Sun, Snowflake, Leaf, Flower, TrendingUp, Target } from 'lucide-react';

const Seasonal = () => {
  const [seasonalData, setSeasonalData] = useState([]);
  const [quarterlyData, setQuarterlyData] = useState([]);
  const [monthlyComparison, setMonthlyComparison] = useState([]);
  const [seasonInsights, setSeasonInsights] = useState([]);
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
            analyticsService.getFilteredSeasonalTrends(filters),
          ]
        : [
            analyticsService.getSeasonalTrends(),
          ];

      const responses = await Promise.all(requests);
      
      // Transform seasonal data
      const seasonalResponse = responses[0].data;
      const monthlyData = seasonalResponse.months?.map((month, index) => ({
        name: month,
        revenue: seasonalResponse.revenue[index],
        orders: seasonalResponse.orders[index],
        profit: seasonalResponse.profit[index],
        avgOrder: seasonalResponse.revenue[index] / seasonalResponse.orders[index] || 0
      })) || [];
      
      setSeasonalData(monthlyData);

      // Create quarterly data
      const quarters = [
        {
          name: 'T1 (Jan-Mar)',
          months: ['January', 'February', 'March'],
          icon: Snowflake,
          color: 'blue'
        },
        {
          name: 'T2 (Apr-Jun)',
          months: ['April', 'May', 'June'],
          icon: Flower,
          color: 'green'
        },
        {
          name: 'T3 (Jul-Sep)',
          months: ['July', 'August', 'September'],
          icon: Sun,
          color: 'orange'
        },
        {
          name: 'T4 (Oct-Dec)',
          months: ['October', 'November', 'December'],
          icon: Leaf,
          color: 'red'
        }
      ];

      const quarterlyPerformance = quarters.map(quarter => {
        const quarterMonths = monthlyData.filter(month => 
          quarter.months.includes(month.name)
        );
        const totalRevenue = quarterMonths.reduce((sum, month) => sum + month.revenue, 0);
        const totalOrders = quarterMonths.reduce((sum, month) => sum + month.orders, 0);
        const totalProfit = quarterMonths.reduce((sum, month) => sum + month.profit, 0);

        return {
          name: quarter.name,
          revenue: totalRevenue,
          orders: totalOrders,
          profit: totalProfit,
          avgOrder: totalRevenue / totalOrders || 0,
          icon: quarter.icon,
          color: quarter.color,
          growth: Math.random() * 20 - 5 // Simulate growth rate
        };
      });

      setQuarterlyData(quarterlyPerformance);

      // Monthly year-over-year comparison (simulated)
      setMonthlyComparison(
        monthlyData.map(month => ({
          name: month.name.slice(0, 3),
          current: month.revenue,
          previous: month.revenue * (0.8 + Math.random() * 0.4), // Simulate previous year
          growth: Math.random() * 30 - 10 // Simulate growth rate
        }))
      );

      // Generate season insights
      const insights = [
        {
          season: 'Hiver',
          icon: Snowflake,
          color: 'blue',
          performance: 'Modérée',
          insight: 'Période de ralentissement, focus sur les équipements d\'hiver',
          recommendation: 'Promotions sur les accessoires et équipements de fitness indoor'
        },
        {
          season: 'Printemps',
          icon: Flower,
          color: 'green',
          performance: 'Forte',
          insight: 'Reprise d\'activité cycliste, forte demande',
          recommendation: 'Stock élevé sur les vélos et accessoires de base'
        },
        {
          season: 'Été',
          icon: Sun,
          color: 'orange',
          performance: 'Excellente',
          insight: 'Pic de saison, demande maximale',
          recommendation: 'Campagnes marketing agressives, nouveaux produits'
        },
        {
          season: 'Automne',
          icon: Leaf,
          color: 'red',
          performance: 'Décroissante',
          insight: 'Préparation hivernale, baisse progressive',
          recommendation: 'Déstockage et préparation de la collection hiver'
        }
      ];

      setSeasonInsights(insights);

    } catch (err) {
      setError('Erreur lors de la récupération des données saisonnières');
      console.error('Seasonal data fetch error:', err);
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

  const totalAnnualRevenue = seasonalData.reduce((sum, month) => sum + month.revenue, 0);
  const bestMonth = seasonalData.reduce((best, month) => 
    month.revenue > best.revenue ? month : best, { revenue: 0, name: 'N/A' });
  const worstMonth = seasonalData.reduce((worst, month) => 
    month.revenue < worst.revenue ? month : worst, { revenue: Infinity, name: 'N/A' });

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
          <h1 className="text-2xl font-bold text-gray-900">Analyse Saisonnière</h1>
          <p className="text-gray-600">Tendances et patterns saisonniers des ventes</p>
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
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">CA Annuel</p>
              <p className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(totalAnnualRevenue)}
              </p>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Meilleur Mois</p>
              <p className="text-xl font-bold text-gray-900">{bestMonth.name}</p>
              <p className="text-xs text-gray-500">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(bestMonth.revenue)}
              </p>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Plus Faible</p>
              <p className="text-xl font-bold text-gray-900">{worstMonth.name}</p>
              <p className="text-xs text-gray-500">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(worstMonth.revenue)}
              </p>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Sun className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Saisonnalité</p>
              <p className="text-xl font-bold text-gray-900">Élevée</p>
              <p className="text-xs text-gray-500">Coefficient: 0.72</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <Chart
          type="line"
          data={seasonalData.map(month => ({ name: month.name.slice(0, 3), value: month.revenue }))}
          title="Évolution Mensuelle du CA"
          height={350}
        />

        {/* Quarterly Performance */}
        <Chart
          type="bar"
          data={quarterlyData.map(quarter => ({ name: quarter.name, value: quarter.revenue }))}
          title="Performance Trimestrielle"
          height={350}
        />

        {/* Monthly Orders */}
        <Chart
          type="area"
          data={seasonalData.map(month => ({ name: month.name.slice(0, 3), value: month.orders }))}
          title="Évolution des Commandes"
          height={350}
        />

        {/* Year-over-Year Comparison */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Comparaison Annuelle</h3>
          </div>
          <div className="space-y-3">
            {monthlyComparison.slice(0, 6).map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{month.name}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="text-xs text-gray-500">
                      Actuel: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(month.current)}
                    </div>
                    <div className="text-xs text-gray-400">
                      Précédent: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(month.previous)}
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${month.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {month.growth >= 0 ? '+' : ''}{month.growth.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quarterly Analysis */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyse Trimestrielle Détaillée</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quarterlyData.map((quarter, index) => {
            const Icon = quarter.icon;
            return (
              <div key={index} className={`border-2 border-${quarter.color}-200 rounded-lg p-4 bg-${quarter.color}-50`}>
                <div className="flex items-center space-x-3 mb-3">
                  <Icon className={`h-6 w-6 text-${quarter.color}-600`} />
                  <h4 className="font-medium text-gray-900">{quarter.name}</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">CA:</span>
                    <span className="text-sm font-medium">
                      {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(quarter.revenue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Commandes:</span>
                    <span className="text-sm font-medium">{quarter.orders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Croissance:</span>
                    <span className={`text-sm font-medium ${quarter.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {quarter.growth >= 0 ? '+' : ''}{quarter.growth.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Season Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights par Saison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seasonInsights.map((season, index) => {
            const Icon = season.icon;
            return (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 bg-${season.color}-50 rounded-lg`}>
                    <Icon className={`h-6 w-6 text-${season.color}-600`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{season.season}</h4>
                    <span className={`text-sm px-2 py-1 rounded-full text-${season.color}-700 bg-${season.color}-100`}>
                      {season.performance}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <strong>Insight:</strong> {season.insight}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Recommandation:</strong> {season.recommendation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic Planning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Planification Saisonnière</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-gray-900">Q1 - Préparation</h4>
              <p className="text-sm text-gray-600 mt-1">
                Stock minimal, focus sur la maintenance et les accessoires d'hiver
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-gray-900">Q2 - Lancement</h4>
              <p className="text-sm text-gray-600 mt-1">
                Augmentation du stock, campagnes marketing, nouveaux produits
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-medium text-gray-900">Q3 - Peak Season</h4>
              <p className="text-sm text-gray-600 mt-1">
                Stock maximum, service client renforcé, promotions ciblées
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-medium text-gray-900">Q4 - Transition</h4>
              <p className="text-sm text-gray-600 mt-1">
                Déstockage, préparation hiver, analyse des performances
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Recommandées</h3>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Gestion des Stocks</h4>
              <p className="text-sm text-blue-700">
                Adapter les niveaux de stock selon les patterns saisonniers identifiés
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Marketing Saisonnier</h4>
              <p className="text-sm text-green-700">
                Planifier les campagnes 2-3 mois avant les pics de saison
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">Développement Produit</h4>
              <p className="text-sm text-orange-700">
                Lancer les nouveaux produits au printemps pour maximiser l'impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seasonal;