import React from 'react';

interface BookFiltersProps {
  filters: {
    subject: string;
    condition: string;
    type: string;
    maxDistance: number;
    maxPrice: number;
  };
  onFiltersChange: (filters: any) => void;
}

export default function BookFilters({ filters, onFiltersChange }: BookFiltersProps) {
  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English', 'History'];
  const conditions = ['excellent', 'good', 'fair'];
  const types = ['rent', 'sell', 'both'];

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <select
            value={filters.subject}
            onChange={(e) => updateFilter('subject', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
          <select
            value={filters.condition}
            onChange={(e) => updateFilter('condition', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Condition</option>
            {conditions.map(condition => (
              <option key={condition} value={condition}>
                {condition.charAt(0).toUpperCase() + condition.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={filters.type}
            onChange={(e) => updateFilter('type', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Rent or Buy</option>
            <option value="rent">Rent Only</option>
            <option value="sell">Buy Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distance: {filters.maxDistance}km
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={filters.maxDistance}
            onChange={(e) => updateFilter('maxDistance', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price: ₹{filters.maxPrice}
          </label>
          <input
            type="range"
            min="10"
            max="2000"
            step="10"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}