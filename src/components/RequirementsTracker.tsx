import React from 'react';
import { CheckSquare, Target, Award, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function RequirementsTracker() {
  const { state } = useApp();
  const { degreeRequirements } = state;

  const getRequirementProgress = (requirement: any) => {
    const percentage = (requirement.creditsCompleted / requirement.creditsRequired) * 100;
    return Math.min(percentage, 100);
  };

  const getRequirementStatus = (requirement: any) => {
    const percentage = getRequirementProgress(requirement);
    if (percentage >= 100) return { status: 'completed', color: 'green' };
    if (percentage >= 50) return { status: 'in-progress', color: 'blue' };
    return { status: 'not-started', color: 'gray' };
  };

  const groupedRequirements = degreeRequirements.reduce((acc, req) => {
    if (!acc[req.type]) acc[req.type] = [];
    acc[req.type].push(req);
    return acc;
  }, {} as { [key: string]: typeof degreeRequirements });

  const typeLabels = {
    core: 'Core Requirements',
    major: 'Major Requirements',
    thread: 'Thread Requirements',
    elective: 'Electives',
    minor: 'Minor Requirements'
  };

  const typeIcons = {
    core: Target,
    major: BookOpen,
    thread: Award,
    elective: CheckSquare,
    minor: Award
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <CheckSquare className="w-8 h-8 mr-3 text-gt-gold" />
          Degree Requirements
        </h1>
        <div className="text-right">
          <p className="text-sm text-gray-600">Computer Science • Theory & Intelligence Threads</p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(typeLabels).map(([type, label]) => {
            const requirements = groupedRequirements[type] || [];
            const totalRequired = requirements.reduce((sum, req) => sum + req.creditsRequired, 0);
            const totalCompleted = requirements.reduce((sum, req) => sum + req.creditsCompleted, 0);
            const percentage = totalRequired > 0 ? (totalCompleted / totalRequired) * 100 : 0;
            
            return (
              <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{label}</h4>
                <div className="w-16 h-16 mx-auto mb-2 relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#B3A369"
                      strokeWidth="2"
                      strokeDasharray={`${percentage}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-900">{Math.round(percentage)}%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">{totalCompleted}/{totalRequired} credits</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Requirements */}
      <div className="space-y-6">
        {Object.entries(groupedRequirements).map(([type, requirements]) => {
          const Icon = typeIcons[type as keyof typeof typeIcons];
          
          return (
            <div key={type} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon className="w-5 h-5 mr-2 text-gt-gold" />
                {typeLabels[type as keyof typeof typeLabels]}
              </h3>
              
              <div className="space-y-4">
                {requirements.map((requirement) => {
                  const progress = getRequirementProgress(requirement);
                  const { status, color } = getRequirementStatus(requirement);
                  
                  return (
                    <div key={requirement.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{requirement.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{requirement.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            status === 'completed' ? 'bg-green-100 text-green-800' :
                            status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {status === 'completed' ? 'Complete' :
                             status === 'in-progress' ? 'In Progress' :
                             'Not Started'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{requirement.creditsCompleted}/{requirement.creditsRequired} credits</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              color === 'green' ? 'bg-green-500' :
                              color === 'blue' ? 'bg-blue-500' :
                              'bg-gray-400'
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Required Courses */}
                      {requirement.courses.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Required Courses:</p>
                          <div className="flex flex-wrap gap-2">
                            {requirement.courses.map((courseCode) => (
                              <span key={courseCode} className="px-2 py-1 bg-gt-navy text-white text-xs rounded">
                                {courseCode}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Flexible Options */}
                      {requirement.flexibleOptions && requirement.flexibleOptions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Additional Options:</p>
                          <div className="flex flex-wrap gap-2">
                            {requirement.flexibleOptions.map((courseCode) => (
                              <span key={courseCode} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                                {courseCode}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}