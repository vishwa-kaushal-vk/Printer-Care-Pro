import React, { useState } from 'react';
import { Search, Book, Clock, Tag } from 'lucide-react';
import { Article } from '../types';
import { knowledgeBaseArticles } from '../data/knowledgeBaseData';

const KnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'troubleshooting',
    'maintenance',
    'installation',
    'parts',
    'error-codes',
  ];

  const filteredArticles = knowledgeBaseArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Knowledge Base</h1>
        <p className="text-gray-600">
          Comprehensive guides, troubleshooting articles, and technical documentation
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <Book className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                article.category === 'troubleshooting' ? 'bg-red-100 text-red-700' :
                article.category === 'maintenance' ? 'bg-green-100 text-green-700' :
                article.category === 'installation' ? 'bg-blue-100 text-blue-700' :
                article.category === 'parts' ? 'bg-purple-100 text-purple-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {article.category}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
              {article.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {article.content.substring(0, 150)}...
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{article.lastUpdated}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Tag className="h-4 w-4" />
                <span>{article.tags.length} tags</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {article.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <Book className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">Try adjusting your search terms or category filter</p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;