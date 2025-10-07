import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const Chart = ({ type, data, title, height = 300 }) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(value)} />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} />
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(value)} />
            <Area type="monotone" dataKey="value" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('en-US').format(value)} />
            <Legend />
            <Bar dataKey="value" fill="#0ea5e9" />
          </BarChart>
        );
      
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => new Intl.NumberFormat('en-US').format(value)} />
          </PieChart>
        );
      
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="card">
      {title && (
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;