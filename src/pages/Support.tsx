import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, Clock, Users, FileText } from 'lucide-react';

const Support: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    printerModel: '',
    priority: 'medium',
    subject: '',
    description: '',
  });

  const contactMethods = [
    {
      id: 'phone',
      title: 'Phone Support',
      subtitle: 'Talk to our experts now',
      icon: Phone,
      details: '1-800-PRINTER (1-800-774-6837)',
      hours: 'Mon-Fri: 7 AM - 7 PM EST',
      description: 'Get immediate help from our technical support team.',
      color: 'bg-green-500',
    },
    {
      id: 'chat',
      title: 'Live Chat',
      subtitle: 'Chat with support agents',
      icon: MessageCircle,
      details: 'Average response: 2 minutes',
      hours: 'Mon-Fri: 8 AM - 6 PM EST',
      description: 'Quick answers to common questions and technical issues.',
      color: 'bg-blue-500',
    },
    {
      id: 'email',
      title: 'Email Support',
      subtitle: 'Detailed technical assistance',
      icon: Mail,
      details: 'support@printercare.com',
      hours: 'Response within 4 hours',
      description: 'Send detailed descriptions with photos and attachments.',
      color: 'bg-purple-500',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support ticket submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Technical Support</h1>
        <p className="text-gray-600">
          Get expert help from our technical support team
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {contactMethods.map((method) => {
          const IconComponent = method.icon;
          return (
            <div
              key={method.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedContact(method.id)}
            >
              <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mb-4`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{method.subtitle}</p>
              <div className="space-y-2 text-sm">
                <div className="font-medium text-gray-900">{method.details}</div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{method.hours}</span>
                </div>
                <p className="text-gray-600">{method.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Support Ticket Form */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <div className="flex items-center space-x-2 mb-6">
          <FileText className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Submit a Support Ticket</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Printer Model
              </label>
              <input
                type="text"
                value={formData.printerModel}
                onChange={(e) => setFormData({ ...formData, printerModel: e.target.value })}
                placeholder="e.g., Videojet 1580"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low - General inquiry</option>
              <option value="medium">Medium - Non-critical issue</option>
              <option value="high">High - Production impacted</option>
              <option value="critical">Critical - Production stopped</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief description of the issue"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Description *
            </label>
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Please provide as much detail as possible about the issue, including any error codes, when it started, and what troubleshooting steps you've already tried."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <FileText className="h-5 w-5" />
              <span>Submit Ticket</span>
            </button>
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>

      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">50+</div>
          <div className="text-gray-600">Technical Experts</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <Clock className="h-8 w-8 text-green-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">{'< 2 hrs'}</div>
          <div className="text-gray-600">Average Response Time</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <FileText className="h-8 w-8 text-purple-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">98%</div>
          <div className="text-gray-600">Issue Resolution Rate</div>
        </div>
      </div>
    </div>
  );
};

export default Support;