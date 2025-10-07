import React, { useState } from 'react';
import { Calendar, Filter, X } from 'lucide-react';

const FilterPanel = ({ filters, onFiltersChange, filterOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleMultiSelectChange = (key, value, checked) => {
    const currentValues = filters[key] || [];
    if (checked) {
      handleFilterChange(key, [...currentValues, value]);
    } else {
      handleFilterChange(key, currentValues.filter(v => v !== value));
    }
  };

  const clearFilters = () => {
    onFiltersChange({});
    setIsOpen(false);
  };

  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key] && (Array.isArray(filters[key]) ? filters[key].length > 0 : filters[key])
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
          hasActiveFilters 
            ? 'bg-primary-50 border-primary-200 text-primary-700' 
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {Object.keys(filters).filter(key => 
              filters[key] && (Array.isArray(filters[key]) ? filters[key].length > 0 : filters[key])
            ).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={filters.start_date || ''}
                    onChange={(e) => handleFilterChange('start_date', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="date"
                    value={filters.end_date || ''}
                    onChange={(e) => handleFilterChange('end_date', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Countries */}
              {filterOptions?.countries && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Countries
                  </label>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {filterOptions.countries.map(country => (
                      <label key={country} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={(filters.countries || []).includes(country)}
                          onChange={(e) => handleMultiSelectChange('countries', country, e.target.checked)}
                          className="mr-2 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{country}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Age Groups */}
              {filterOptions?.age_groups && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age Groups
                  </label>
                  <div className="space-y-1">
                    {filterOptions.age_groups.map(ageGroup => (
                      <label key={ageGroup} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={(filters.age_groups || []).includes(ageGroup)}
                          onChange={(e) => handleMultiSelectChange('age_groups', ageGroup, e.target.checked)}
                          className="mr-2 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{ageGroup}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Categories */}
              {filterOptions?.product_categories && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Categories
                  </label>
                  <div className="space-y-1">
                    {filterOptions.product_categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={(filters.product_categories || []).includes(category)}
                          onChange={(e) => handleMultiSelectChange('product_categories', category, e.target.checked)}
                          className="mr-2 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;