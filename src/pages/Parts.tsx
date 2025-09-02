import React, { useState } from 'react';
import { Search, ShoppingCart, Filter, Info } from 'lucide-react';
import { PrinterModel, Part } from '../types';
import { partsCatalog } from '../data/partsData';

interface PartsProps {
  selectedPrinter: PrinterModel | null;
}

const Parts: React.FC<PartsProps> = ({ selectedPrinter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'printheads',
    'filters',
    'pumps',
    'inks',
    'sensors',
    'belts',
  ];

  const filteredParts = partsCatalog.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         part.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         part.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    
    const matchesPrinter = !selectedPrinter || 
                          part.compatibility.includes('universal') ||
                          part.compatibility.includes(selectedPrinter.id);
    
    return matchesSearch && matchesCategory && matchesPrinter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Parts Catalog</h1>
        <p className="text-gray-600">
          Find and order genuine replacement parts for your industrial inkjet printer
        </p>
        {selectedPrinter && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-blue-600" />
              <span className="text-blue-800 font-medium">
                Showing parts compatible with {selectedPrinter.brand} {selectedPrinter.model}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search parts by name or part number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Parts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParts.map((part) => (
          <div
            key={part.id}
            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={part.image}
              alt={part.name}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  part.category === 'printheads' ? 'bg-red-100 text-red-700' :
                  part.category === 'filters' ? 'bg-blue-100 text-blue-700' :
                  part.category === 'pumps' ? 'bg-green-100 text-green-700' :
                  part.category === 'inks' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {part.category}
                </span>
                <span className="text-lg font-bold text-green-600">
                  ${part.price.toFixed(2)}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {part.name}
              </h3>
              
              <p className="text-sm text-gray-500 mb-2 font-mono">
                Part #: {part.partNumber}
              </p>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {part.description}
              </p>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Compatible with:</p>
                  <div className="flex flex-wrap gap-1">
                    {part.compatibility.slice(0, 3).map((model) => (
                      <span key={model} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {model === 'universal' ? 'All Models' : model}
                      </span>
                    ))}
                    {part.compatibility.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{part.compatibility.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredParts.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No parts found</h3>
          <p className="text-gray-600">Try adjusting your search terms or category filter</p>
        </div>
      )}
    </div>
  );
};

export default Parts;