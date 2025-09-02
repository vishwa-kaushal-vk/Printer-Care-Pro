import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { PrinterModel, TroubleshootingStep } from '../types';
import { troubleshootingSteps } from '../data/troubleshootingData';

interface TroubleshootingProps {
  selectedPrinter: PrinterModel | null;
}

const Troubleshooting: React.FC<TroubleshootingProps> = ({ selectedPrinter }) => {
  const [currentStepId, setCurrentStepId] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);

  if (!selectedPrinter) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Please Select Your Printer Model
        </h2>
        <p className="text-gray-600 mb-6">
          To provide accurate troubleshooting steps, we need to know which printer model you're working with.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Go Back and Select Printer
        </a>
      </div>
    );
  }

  const currentStep = troubleshootingSteps.find(step => step.id === currentStepId);

  const handleAnswer = (nextStepId?: string, solution?: string) => {
    if (nextStepId) {
      setHistory([...history, currentStepId]);
      setCurrentStepId(nextStepId);
    } else if (solution) {
      // Handle solution display
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      const previousStepId = history[history.length - 1];
      setCurrentStepId(previousStepId);
      setHistory(history.slice(0, -1));
    }
  };

  const restart = () => {
    setCurrentStepId('start');
    setHistory([]);
  };

  if (!currentStep) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Troubleshooting Complete
          </h2>
          <p className="text-green-700 mb-6">
            You've completed the troubleshooting process. If the issue persists, please contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={restart}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Over
            </button>
            <a
              href="/support"
              className="px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Troubleshooting Guide</h1>
          {history.length > 0 && (
            <button
              onClick={goBack}
              className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>
          )}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="font-medium text-blue-800">
              {selectedPrinter.brand} {selectedPrinter.model}
            </span>
          </div>
        </div>
      </div>

      {/* Current Step */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentStep.question}
        </h2>
        
        <div className="space-y-4">
          {currentStep.answers.map((answer, index) => (
            <div key={index}>
              <button
                onClick={() => handleAnswer(answer.nextStepId, answer.solution)}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{answer.text}</p>
                    {answer.action && (
                      <p className="text-sm text-gray-600 mt-1">{answer.action}</p>
                    )}
                    {answer.solution && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 font-medium">Solution:</p>
                        <p className="text-green-700 mt-1">{answer.solution}</p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <button
            onClick={restart}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Start over with a different issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Troubleshooting;