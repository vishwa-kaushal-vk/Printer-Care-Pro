import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, AlertTriangle, Plus } from 'lucide-react';
import { format, addDays, isAfter, isBefore } from 'date-fns';
import { PrinterModel, MaintenanceTask } from '../types';
import { maintenanceTasks } from '../data/maintenanceData';

interface MaintenanceProps {
  selectedPrinter: PrinterModel | null;
}

const Maintenance: React.FC<MaintenanceProps> = ({ selectedPrinter }) => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [showAddTask, setShowAddTask] = useState(false);

  const markComplete = (taskId: string) => {
    setCompletedTasks(new Set([...completedTasks, taskId]));
  };

  const getTaskStatus = (task: MaintenanceTask) => {
    if (completedTasks.has(task.id)) return 'completed';
    
    const today = new Date();
    const dueDate = new Date(task.nextDue);
    const warningDate = addDays(dueDate, -7);
    
    if (isBefore(today, warningDate)) return 'upcoming';
    if (isBefore(today, dueDate)) return 'due-soon';
    return 'overdue';
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { 
          color: 'bg-green-100 border-green-300 text-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      case 'overdue':
        return { 
          color: 'bg-red-100 border-red-300 text-red-800',
          icon: AlertTriangle,
          iconColor: 'text-red-600'
        };
      case 'due-soon':
        return { 
          color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
          icon: Clock,
          iconColor: 'text-yellow-600'
        };
      default:
        return { 
          color: 'bg-gray-100 border-gray-300 text-gray-800',
          icon: Calendar,
          iconColor: 'text-gray-600'
        };
    }
  };

  const groupedTasks = {
    daily: maintenanceTasks.filter(task => task.frequency === 'daily'),
    weekly: maintenanceTasks.filter(task => task.frequency === 'weekly'),
    monthly: maintenanceTasks.filter(task => task.frequency === 'monthly'),
    quarterly: maintenanceTasks.filter(task => task.frequency === 'quarterly'),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Maintenance Schedule</h1>
            <p className="text-gray-600">
              Keep your printer running smoothly with regular maintenance
            </p>
          </div>
          <button
            onClick={() => setShowAddTask(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Custom Task</span>
          </button>
        </div>
        
        {selectedPrinter && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <span className="text-blue-800 font-medium">
              Maintenance schedule for {selectedPrinter.brand} {selectedPrinter.model}
            </span>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(groupedTasks).map(([frequency, tasks]) => {
          const overdueTasks = tasks.filter(task => getTaskStatus(task) === 'overdue').length;
          const dueSoonTasks = tasks.filter(task => getTaskStatus(task) === 'due-soon').length;
          
          return (
            <div key={frequency} className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 capitalize mb-2">{frequency}</h3>
              <div className="text-2xl font-bold text-gray-900">{tasks.length}</div>
              <div className="text-sm text-gray-600">total tasks</div>
              {(overdueTasks > 0 || dueSoonTasks > 0) && (
                <div className="mt-2 space-y-1">
                  {overdueTasks > 0 && (
                    <div className="text-xs text-red-600">{overdueTasks} overdue</div>
                  )}
                  {dueSoonTasks > 0 && (
                    <div className="text-xs text-yellow-600">{dueSoonTasks} due soon</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Maintenance Tasks */}
      <div className="space-y-8">
        {Object.entries(groupedTasks).map(([frequency, tasks]) => (
          <div key={frequency}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
              {frequency} Tasks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map((task) => {
                const status = getTaskStatus(task);
                const config = getStatusConfig(status);
                const IconComponent = config.icon;
                
                return (
                  <div
                    key={task.id}
                    className={`border-2 rounded-lg p-6 ${config.color} transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <IconComponent className={`h-5 w-5 ${config.iconColor}`} />
                        <h3 className="font-semibold text-gray-900">{task.name}</h3>
                      </div>
                      <span className="text-xs px-2 py-1 bg-white rounded font-medium capitalize">
                        {status.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4">{task.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <div className="text-gray-600">Next due: {format(new Date(task.nextDue), 'MMM dd, yyyy')}</div>
                        {task.lastCompleted && (
                          <div className="text-gray-500">
                            Last: {format(new Date(task.lastCompleted), 'MMM dd, yyyy')}
                          </div>
                        )}
                      </div>
                      
                      {!completedTasks.has(task.id) && (
                        <button
                          onClick={() => markComplete(task.id)}
                          className="bg-white text-gray-700 px-3 py-1 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maintenance;