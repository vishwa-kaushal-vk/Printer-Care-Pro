import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Printer, Home, HelpCircle, Book, Play, Wrench, Phone, Calendar } from 'lucide-react';
import { PrinterModel } from '../types';

interface NavbarProps {
  selectedPrinter: PrinterModel | null;
}

const Navbar: React.FC<NavbarProps> = ({ selectedPrinter }) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Troubleshooting', href: '/troubleshooting', icon: HelpCircle },
    { name: 'Knowledge Base', href: '/knowledge-base', icon: Book },
    { name: 'Video Library', href: '/videos', icon: Play },
    { name: 'Parts Catalog', href: '/parts', icon: Wrench },
    { name: 'Maintenance', href: '/maintenance', icon: Calendar },
    { name: 'Support', href: '/support', icon: Phone },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Printer className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PrinterCare Pro</span>
            </Link>
            {selectedPrinter && (
              <div className="ml-6 pl-6 border-l border-gray-300">
                <span className="text-sm text-gray-500">Current Printer:</span>
                <div className="text-sm font-medium text-gray-900">
                  {selectedPrinter.brand} {selectedPrinter.model}
                </div>
              </div>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <IconComponent className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;