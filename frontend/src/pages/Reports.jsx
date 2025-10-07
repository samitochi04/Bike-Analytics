import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import { analyticsService } from '../services/api';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  MapPin, 
  Sun,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Printer
} from 'lucide-react';

const Reports = () => {
  const [reportData, setReportData] = useState({
    summary: {},
    performance: [],
    recommendations: [],
    alerts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState('summary');

  const fetchReportData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate comprehensive report data
      const summary = {
        totalRevenue: 2847500,
        totalOrders: 8642,
        totalCustomers: 1892,
        avgOrderValue: 329.5,
        topProduct: 'VTT Giant Defy',
        topCountry: 'France',
        bestMonth: 'Juillet',
        growthRate: 15.3,
        profitMargin: 23.7,
        customerSatisfaction: 4.2
      };

      const performance = [
        {
          category: 'Revenus',
          current: 2847500,
          target: 3000000,
          progress: (2847500 / 3000000) * 100,
          status: 'En cours',
          trend: 'up'
        },
        {
          category: 'Commandes',
          current: 8642,
          target: 10000,
          progress: (8642 / 10000) * 100,
          status: 'En cours',
          trend: 'up'
        },
        {
          category: 'Nouveaux Clients',
          current: 1892,
          target: 2500,
          progress: (1892 / 2500) * 100,
          status: 'Attention',
          trend: 'down'
        },
        {
          category: 'Satisfaction Client',
          current: 4.2,
          target: 4.5,
          progress: (4.2 / 4.5) * 100,
          status: 'Bien',
          trend: 'up'
        }
      ];

      const recommendations = [
        {
          priority: 'Haute',
          category: 'Marketing',
          title: 'Renforcer l\'acquisition client',
          description: 'Les nouveaux clients sont en dessous de l\'objectif. Recommandation d\'intensifier les campagnes digitales.',
          impact: 'Fort',
          effort: 'Moyen',
          timeline: '3 mois'
        },
        {
          priority: 'Moyenne',
          category: 'Produits',
          title: 'Développer la gamme accessoires',
          description: 'Les accessoires représentent seulement 15% du CA avec une marge supérieure.',
          impact: 'Moyen',
          effort: 'Faible',
          timeline: '2 mois'
        },
        {
          priority: 'Haute',
          category: 'Géographie',
          title: 'Expansion internationale',
          description: 'L\'Allemagne et l\'Italie montrent un potentiel inexploité.',
          impact: 'Fort',
          effort: 'Élevé',
          timeline: '6 mois'
        },
        {
          priority: 'Faible',
          category: 'Saisonnier',
          title: 'Optimiser la période hivernale',
          description: 'Développer l\'offre indoor et maintenance pour maintenir l\'activité.',
          impact: 'Faible',
          effort: 'Moyen',
          timeline: '4 mois'
        }
      ];

      const alerts = [
        {
          type: 'warning',
          title: 'Stock faible',
          message: 'Le produit "VTT Giant Defy" atteint un niveau de stock critique',
          date: new Date().toLocaleDateString('fr-FR')
        },
        {
          type: 'success',
          title: 'Objectif atteint',
          message: 'L\'objectif mensuel de juillet a été dépassé de 12%',
          date: new Date().toLocaleDateString('fr-FR')
        },
        {
          type: 'info',
          title: 'Nouveau marché',
          message: 'Augmentation de 25% des commandes depuis l\'Espagne',
          date: new Date().toLocaleDateString('fr-FR')
        }
      ];

      setReportData({
        summary,
        performance,
        recommendations,
        alerts
      });

    } catch (err) {
      setError('Erreur lors de la génération du rapport');
      console.error('Report data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const reportTypes = [
    { id: 'summary', name: 'Résumé Exécutif', icon: FileText },
    { id: 'performance', name: 'Performance', icon: TrendingUp },
    { id: 'recommendations', name: 'Recommandations', icon: CheckCircle },
    { id: 'alerts', name: 'Alertes', icon: AlertCircle }
  ];

  const handleExport = (format) => {
    // Simulate export functionality
    alert(`Export en ${format} en cours de développement`);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Génération du rapport...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  const { summary, performance, recommendations, alerts } = reportData;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rapports & Analytics</h1>
          <p className="text-gray-600">Rapport complet des performances et analyses</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Printer className="h-4 w-4" />
            <span>Imprimer</span>
          </button>
          <div className="relative">
            <select
              onChange={(e) => handleExport(e.target.value)}
              className="appearance-none bg-blue-600 text-white px-4 py-2 pr-8 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>Exporter</option>
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
              <option value="CSV">CSV</option>
            </select>
            <Download className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-white border border-gray-200 rounded-lg p-1">
        <nav className="flex space-x-1">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedReport === type.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{type.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Report Content */}
      {selectedReport === 'summary' && (
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé Exécutif</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Ce rapport présente une analyse complète des performances commerciales de l'entreprise 
                pour la période analysée. Les résultats montrent une croissance positive avec des 
                opportunités d'amélioration identifiées.
              </p>
              
              <h4 className="text-md font-semibold text-gray-900 mb-2">Points Clés</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Chiffre d'affaires total: <strong>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(summary.totalRevenue)}</strong></li>
                <li>Nombre total de commandes: <strong>{summary.totalOrders?.toLocaleString('fr-FR')}</strong></li>
                <li>Panier moyen: <strong>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(summary.avgOrderValue)}</strong></li>
                <li>Croissance: <strong>+{summary.growthRate}%</strong> par rapport à la période précédente</li>
                <li>Marge bénéficiaire: <strong>{summary.profitMargin}%</strong></li>
              </ul>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="metric-card bg-blue-50 border-blue-200">
              <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
              <p className="text-sm text-blue-600 font-medium">Chiffre d'Affaires</p>
              <p className="text-2xl font-bold text-blue-900">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(summary.totalRevenue)}
              </p>
            </div>
            
            <div className="metric-card bg-green-50 border-green-200">
              <ShoppingCart className="h-8 w-8 text-green-600 mb-2" />
              <p className="text-sm text-green-600 font-medium">Commandes</p>
              <p className="text-2xl font-bold text-green-900">{summary.totalOrders?.toLocaleString('fr-FR')}</p>
            </div>
            
            <div className="metric-card bg-purple-50 border-purple-200">
              <Users className="h-8 w-8 text-purple-600 mb-2" />
              <p className="text-sm text-purple-600 font-medium">Clients</p>
              <p className="text-2xl font-bold text-purple-900">{summary.totalCustomers?.toLocaleString('fr-FR')}</p>
            </div>
            
            <div className="metric-card bg-orange-50 border-orange-200">
              <Calendar className="h-8 w-8 text-orange-600 mb-2" />
              <p className="text-sm text-orange-600 font-medium">Croissance</p>
              <p className="text-2xl font-bold text-orange-900">+{summary.growthRate}%</p>
            </div>
          </div>

          {/* Top Performers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <h4 className="font-semibold text-gray-900 mb-3">Top Produit</h4>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{summary.topProduct}</p>
                  <p className="text-sm text-gray-500">Produit le plus vendu</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h4 className="font-semibold text-gray-900 mb-3">Top Pays</h4>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{summary.topCountry}</p>
                  <p className="text-sm text-gray-500">Marché principal</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h4 className="font-semibold text-gray-900 mb-3">Meilleure Période</h4>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Sun className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{summary.bestMonth}</p>
                  <p className="text-sm text-gray-500">Pic de performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedReport === 'performance' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suivi des Objectifs</h3>
            <div className="space-y-6">
              {performance.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{item.category}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Bien' ? 'bg-green-100 text-green-800' :
                      item.status === 'Attention' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {typeof item.current === 'number' && item.current > 1000 
                        ? item.current.toLocaleString('fr-FR') 
                        : item.current}
                      {' / '}
                      {typeof item.target === 'number' && item.target > 1000 
                        ? item.target.toLocaleString('fr-FR') 
                        : item.target}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {item.progress.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.progress >= 90 ? 'bg-green-500' :
                        item.progress >= 70 ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.min(item.progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedReport === 'recommendations' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommandations Stratégiques</h3>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rec.priority === 'Haute' ? 'bg-red-100 text-red-800' :
                          rec.priority === 'Moyenne' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {rec.priority}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {rec.category}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div>Impact: <span className="font-medium">{rec.impact}</span></div>
                    <div>Effort: <span className="font-medium">{rec.effort}</span></div>
                    <div>Délai: <span className="font-medium">{rec.timeline}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedReport === 'alerts' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertes & Notifications</h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className={`border-l-4 p-4 rounded-r-lg ${
                  alert.type === 'warning' ? 'border-yellow-400 bg-yellow-50' :
                  alert.type === 'success' ? 'border-green-400 bg-green-50' :
                  'border-blue-400 bg-blue-50'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${
                      alert.type === 'warning' ? 'bg-yellow-100' :
                      alert.type === 'success' ? 'bg-green-100' :
                      'bg-blue-100'
                    }`}>
                      {alert.type === 'warning' ? (
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      ) : alert.type === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <ExternalLink className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        alert.type === 'warning' ? 'text-yellow-800' :
                        alert.type === 'success' ? 'text-green-800' :
                        'text-blue-800'
                      }`}>
                        {alert.title}
                      </h4>
                      <p className={`text-sm mt-1 ${
                        alert.type === 'warning' ? 'text-yellow-700' :
                        alert.type === 'success' ? 'text-green-700' :
                        'text-blue-700'
                      }`}>
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">{alert.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Report Footer */}
      <div className="card bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              Rapport généré le {new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Données analysées: {summary.totalOrders?.toLocaleString('fr-FR')} commandes sur 12 mois
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Bike Sport Company</p>
            <p className="text-xs text-gray-500">Dashboard Analytics v2.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;