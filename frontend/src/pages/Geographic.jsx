import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import FilterPanel from '../components/FilterPanel';
import { dashboardService, analyticsService } from '../services/api';
import { RefreshCw, Globe, MapPin, TrendingUp, Users, Target } from 'lucide-react';

const Geographic = () => {
  const [geographicData, setGeographicData] = useState([]);
  const [countryPerformance, setCountryPerformance] = useState([]);
  const [regionGrowth, setRegionGrowth] = useState([]);
  const [marketPenetration, setMarketPenetration] = useState([]);
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
            dashboardService.getFilteredGeographicData(filters),
          ]
        : [
            dashboardService.getGeographicData(),
          ];

      const responses = await Promise.all(requests);
      
      // Transform geographic data
      const geoResponse = responses[0].data;
      const geoData = geoResponse.countries?.map((country, index) => ({
        name: country,
        revenue: geoResponse.revenue[index],
        profit: geoResponse.profit[index],
        orders: geoResponse.orders[index],
        avgOrder: geoResponse.revenue[index] / geoResponse.orders[index] || 0
      })) || [];
      
      setGeographicData(geoData);

      // Create country performance data
      setCountryPerformance(
        geoData.map(country => ({
          name: country.name,
          value: country.revenue
        }))
      );

      // Simulate region growth data
      const regions = [
        { name: 'Amérique du Nord', growth: 15.2, countries: ['Canada', 'United States'] },
        { name: 'Europe', growth: 8.7, countries: ['Germany', 'France', 'United Kingdom'] },
        { name: 'Océanie', growth: 12.1, countries: ['Australia'] }
      ];

      setRegionGrowth(regions.map(region => ({
        name: region.name,
        value: region.growth,
        countries: region.countries.length
      })));

      // Market penetration simulation
      setMarketPenetration(
        geoData.map(country => ({
          name: country.name,
          value: Math.min(100, (country.orders / 1000) * 100), // Simulate penetration rate
          potential: Math.random() * 50 + 25 // Simulate growth potential
        }))
      );

    } catch (err) {
      setError('Erreur lors de la récupération des données géographiques');
      console.error('Geographic data fetch error:', err);
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

  const totalRevenue = geographicData.reduce((sum, country) => sum + country.revenue, 0);
  const totalOrders = geographicData.reduce((sum, country) => sum + country.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders || 0;

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
          <h1 className="text-2xl font-bold text-gray-900">Analyse Géographique</h1>
          <p className="text-gray-600">Performance par région et opportunités de marché</p>
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
            <div className="p-2 bg-blue-50 rounded-lg">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pays Actifs</p>
              <p className="text-xl font-bold text-gray-900">{geographicData.length}</p>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">CA Global</p>
              <p className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(totalRevenue)}
              </p>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes</p>
              <p className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat('fr-FR').format(totalOrders)}
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
              <p className="text-sm font-medium text-gray-600">Panier Moyen</p>
              <p className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(avgOrderValue)}
              </p>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <MapPin className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Top Marché</p>
              <p className="text-xl font-bold text-gray-900">
                {geographicData.length > 0 ? geographicData.sort((a, b) => b.revenue - a.revenue)[0]?.name : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Country */}
        <Chart
          type="bar"
          data={countryPerformance}
          title="Chiffre d'Affaires par Pays"
          height={350}
        />

        {/* Market Share */}
        <Chart
          type="pie"
          data={countryPerformance}
          title="Répartition du Marché"
          height={350}
        />

        {/* Regional Growth */}
        <Chart
          type="bar"
          data={regionGrowth}
          title="Croissance par Région (%)"
          height={350}
        />

        {/* Market Penetration */}
        <Chart
          type="bar"
          data={marketPenetration}
          title="Taux de Pénétration du Marché (%)"
          height={350}
        />
      </div>

      {/* Detailed Country Analysis */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Détaillée par Pays</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pays
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chiffre d'Affaires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bénéfices
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commandes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Panier Moyen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Part de Marché
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {geographicData
                .sort((a, b) => b.revenue - a.revenue)
                .map((country, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{country.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(country.revenue)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(country.profit)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Intl.NumberFormat('fr-FR').format(country.orders)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(country.avgOrder)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900">
                        {((country.revenue / totalRevenue) * 100).toFixed(1)}%
                      </div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(country.revenue / totalRevenue) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Insights and Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights Régionaux</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Marché Dominant</span>
              </div>
              <p className="text-sm text-blue-700">
                L'Amérique du Nord représente le plus gros marché
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Croissance Europe</span>
              </div>
              <p className="text-sm text-green-700">
                Forte croissance en Europe, notamment en Allemagne
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-900">Océanie Émergente</span>
              </div>
              <p className="text-sm text-purple-700">
                L'Australie montre un potentiel de croissance élevé
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Opportunités d'Expansion</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-medium text-gray-900">Marchés Émergents</h4>
              <p className="text-sm text-gray-600">
                Potentiel inexploité en Asie et Amérique du Sud
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-gray-900">Renforcement Europe</h4>
              <p className="text-sm text-gray-600">
                Augmenter la présence en Europe de l'Est
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-gray-900">Diversification</h4>
              <p className="text-sm text-gray-600">
                Réduire la dépendance au marché nord-américain
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Recommandées</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <p className="text-sm font-medium text-blue-900">Étude de Marché Asie</p>
              <p className="text-xs text-blue-700">Analyser le potentiel des marchés asiatiques</p>
            </button>
            <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <p className="text-sm font-medium text-green-900">Partenariat Local</p>
              <p className="text-xs text-green-700">Établir des partenariats en Europe de l'Est</p>
            </button>
            <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <p className="text-sm font-medium text-purple-900">Marketing Localisé</p>
              <p className="text-xs text-purple-700">Adapter les campagnes par région</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Geographic;