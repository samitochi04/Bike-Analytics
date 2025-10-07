import React from 'react';
import { 
  User, 
  Globe, 
  Github, 
  Linkedin, 
  ExternalLink,
  Code,
  Database,
  Server,
  Smartphone,
  BarChart3,
  Zap,
  Users,
  Building,
  Award,
  BookOpen
} from 'lucide-react';

const Settings = () => {
  const contactLinks = [
    {
      label: 'Portfolio',
      url: 'https://samuel.diversis.site/',
      icon: Globe,
      description: 'Mon site personnel avec mes projets et compétences'
    },
    {
      label: 'GitHub',
      url: 'https://github.com/samitochi04',
      icon: Github,
      description: 'Mes projets de développement et contributions open source'
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/samuel-fotso-6b9879253/',
      icon: Linkedin,
      description: 'Mon profil professionnel et réseau'
    }
  ];

  const technologies = [
    {
      category: 'Backend',
      icon: Server,
      tools: ['FastAPI', 'Python 3.13', 'Pandas', 'NumPy', 'Uvicorn']
    },
    {
      category: 'Frontend',
      icon: Smartphone,
      tools: ['React.js 18', 'Tailwind CSS', 'Recharts', 'Lucide Icons']
    },
    {
      category: 'Data Science',
      icon: BarChart3,
      tools: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter']
    },
    {
      category: 'Infrastructure',
      icon: Database,
      tools: ['CSV Processing', 'REST API', 'CORS', 'Hot Reload']
    }
  ];

  const projectFeatures = [
    {
      title: 'Analytics Avancées',
      description: 'Tableaux de bord interactifs avec métriques KPI en temps réel',
      icon: BarChart3
    },
    {
      title: 'Segmentation Client',
      description: 'Analyse comportementale et segmentation automatisée des clients',
      icon: Users
    },
    {
      title: 'Analyse Géographique',
      description: 'Cartographie des performances par région et opportunités d\'expansion',
      icon: Globe
    },
    {
      title: 'Prédictions Saisonnières',
      description: 'Modèles prédictifs pour optimiser les stocks et campagnes marketing',
      icon: Zap
    }
  ];

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Samuel FOTSO</h1>
        <p className="text-lg text-gray-600 mb-4">Data Scientist & Développeur Full-Stack</p>
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
          <Award className="h-5 w-5" />
          <span className="font-medium">Créateur de BikeAnalytics Dashboard</span>
        </div>
      </div>

      {/* Contact Links */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <ExternalLink className="h-6 w-6 mr-2 text-blue-600" />
          Mes Liens
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {link.label}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      <span>Lien externe</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {link.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Project Description */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <BookOpen className="h-6 w-6 mr-2 text-green-600" />
          À Propos de ce Projet
        </h2>
        <div className="prose max-w-none">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Contexte & Motivation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Suite à mon expérience enrichissante chez <strong>DS Exotiques</strong> (magasin d'articles exotiques) 
                  en tant que <strong>stagiaire Data Scientist</strong>, j'ai décidé de travailler sur un ensemble de données 
                  différent pour approfondir ma compréhension de l'analyse de données commerciales.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  Ce projet vise à démontrer comment l'analyse de données peut améliorer la <strong>satisfaction client</strong> 
                  et optimiser le <strong>retour sur investissement (ROI)</strong> d'une entreprise spécialisée dans le sport cycliste.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Objectifs Analytiques
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Identifier les patterns de comportement client</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Optimiser la segmentation et le ciblage</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Analyser les tendances saisonnières</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Évaluer les performances géographiques</span>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                Impact Business
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Amélioration de la satisfaction client</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Optimisation du ROI marketing</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Stratégies d'expansion géographique</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Prédictions et planification avancée</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Code className="h-6 w-6 mr-2 text-purple-600" />
          Architecture Technique
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{tech.category}</h3>
                </div>
                <div className="space-y-2">
                  {tech.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="flex items-center text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Server className="h-5 w-5 mr-2" />
            Architecture de l'Application
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Database className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Couche Data</h4>
              <p className="text-sm text-gray-600">
                Traitement CSV avec Pandas, calculs statistiques avancés
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Server className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">API Backend</h4>
              <p className="text-sm text-gray-600">
                FastAPI avec endpoints RESTful, documentation automatique
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Smartphone className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Interface Web</h4>
              <p className="text-sm text-gray-600">
                React.js responsive avec visualisations interactives
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Features */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Zap className="h-6 w-6 mr-2 text-orange-600" />
          Fonctionnalités Principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <Icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
          <Code className="h-4 w-4" />
          <span className="text-sm">Développé avec passion par Samuel FOTSO</span>
        </div>
        <p className="text-xs text-gray-500">
          BikeAnalytics Dashboard - Projet d'analyse de données et business intelligence
        </p>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <a 
            href="https://samuel.diversis.site/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
          >
            <Globe className="h-4 w-4" />
            <span>Portfolio</span>
          </a>
          <a 
            href="https://github.com/samitochi04" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 text-sm flex items-center space-x-1"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/samuel-fotso-6b9879253/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Settings;