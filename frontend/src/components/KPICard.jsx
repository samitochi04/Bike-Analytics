import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Target,
  Percent
} from 'lucide-react';

const KPICard = ({ kpi }) => {
  const getIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'total revenue':
        return DollarSign;
      case 'total profit':
        return TrendingUp;
      case 'total orders':
        return ShoppingCart;
      case 'avg order value':
        return BarChart3;
      case 'profit margin':
        return Percent;
      case 'customer satisfaction':
        return Target;
      default:
        return Users;
    }
  };

  const formatValue = (value, formatType) => {
    switch (formatType) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'number':
        return new Intl.NumberFormat('en-US').format(Math.round(value));
      default:
        return value.toString();
    }
  };

  const Icon = getIcon(kpi.name);
  const isPositive = kpi.change > 0;

  return (
    <div className="kpi-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{kpi.name}</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatValue(kpi.value, kpi.format_type)}
            </p>
          </div>
        </div>
        {kpi.change !== undefined && (
          <div className={`flex items-center space-x-1 ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {Math.abs(kpi.change).toFixed(1)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;