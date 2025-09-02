import React, { useState } from 'react';
import { Check, ChevronDown, Printer } from 'lucide-react';
import { PrinterModel } from '../types';
import { printerModels } from '../data/printerModels';

interface PrinterSelectorProps {
  selectedPrinter: PrinterModel | null;
  onSelectPrinter: (printer: PrinterModel | null) => void;
}

const PrinterSelector: React.FC<PrinterSelectorProps> = ({ selectedPrinter, onSelectPrinter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrinters = printerModels.filter(printer =>
    `${printer.brand} ${printer.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (printer: PrinterModel) => {
    onSelectPrinter(printer);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="max-w-md mx-auto">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Your Printer Model
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors hover:bg-gray-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Printer className="h-5 w-5 text-gray-400" />
              <span className={selectedPrinter ? 'text-gray-900' : 'text-gray-500'}>
                {selectedPrinter ? `${selectedPrinter.brand} ${selectedPrinter.model}` : 'Choose a printer model...'}
              </span>
            </div>
            <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="p-2">
              <input
                type="text"
                placeholder="Search printers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="max-h-60 overflow-auto">
              {filteredPrinters.map((printer) => (
                <button
                  key={printer.id}
                  onClick={() => handleSelect(printer)}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {printer.brand} {printer.model}
                    </div>
                    <div className="text-sm text-gray-500">{printer.series}</div>
                  </div>
                  {selectedPrinter?.id === printer.id && (
                    <Check className="h-5 w-5 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrinterSelector;