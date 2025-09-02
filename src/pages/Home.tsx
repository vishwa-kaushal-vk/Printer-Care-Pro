import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Printer, AlertTriangle, Book, Play, Wrench } from 'lucide-react';
import PrinterSelector from '../components/PrinterSelector';
import { PrinterModel } from '../types';

interface HomeProps {
  selectedPrinter: PrinterModel | null;
  setSelectedPrinter: (printer: PrinterModel | null) => void;
}

const Home: React.FC<HomeProps> = ({ selectedPrinter, setSelectedPrinter }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const quickActions = [
    {
      title: 'Start Troubleshooting',
      description: 'Get step-by-step help with printer issues',
      icon: AlertTriangle,
      href: '/troubleshooting',
      color: 'bg-red-500 hover:bg-red-600',
    },
    {
      title: 'Knowledge Base',
      description: 'Browse our comprehensive guides and solutions',
      icon: Book,
      href: '/knowledge-base',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step repair and maintenance videos',
      icon: Play,
      href: '/videos',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Parts Catalog',
      description: 'Find and order replacement parts',
      icon: Wrench,
      href: '/parts',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  const commonIssues = [
    { title: 'Print Quality Issues', count: 127 },
    { title: 'Ink System Problems', count: 89 },
    { title: 'Head Cleaning Procedures', count: 56 },
    { title: 'Error Code Resolution', count: 78 },
    { title: 'Maintenance Schedules', count: 43 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Industrial Printer Support Center
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Get instant help with troubleshooting, maintenance, and repairs for your industrial inkjet printers
        </p>
        
        {/* Quick Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for solutions, error codes, parts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Printer Selection */}
      <div className="mb-12">
        <PrinterSelector 
          selectedPrinter={selectedPrinter} 
          onSelectPrinter={setSelectedPrinter} 
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={action.title}
                to={action.href}
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Common Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Common Issues</h2>
          <div className="bg-white rounded-xl shadow-md border border-gray-200">
            {commonIssues.map((issue, index) => (
              <div 
                key={issue.title} 
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  index !== commonIssues.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{issue.title}</span>
                  <span className="text-sm text-gray-500">{issue.count} articles</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Need Help?</h2>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="text-center">
              <Printer className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can't find what you're looking for?
              </h3>
              <p className="text-gray-600 mb-6">
                Our technical support team is here to help you get your printer back up and running.
              </p>
              <Link
                to="/support"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;