import React from 'react';
import { 
  GraduationCap, 
  TrendingUp, 
  Calendar, 
  Target,
  Clock,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Dashboard() {
  const { state } = useApp();
  const { user, degreeRequirements, completedCourses } = state;

  const progressPercentage = (user.completedCredits / user.totalCredits) * 100;
  const remainingCredits = user.totalCredits - user.completedCredits;
  
  const completedRequirements = degreeRequirements.filter(req => 
    req.creditsCompleted >= req.creditsRequired
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Academic Dashboard</h1>
        <div className="text-right">
          <p className="text-sm text-gray-600">Expected Graduation</p>
          <p className="text-lg font-semibold text-gt-navy">{user.expectedGraduation}</p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Progress</p>
              <p className="text-3xl font-bold text-gt-navy">{progressPercentage.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-gt-gold/10 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-gt-gold" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gt-gold h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current GPA</p>
              <p className="text-3xl font-bold text-green-600">{user.gpa}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Based on {completedCourses.length} completed courses</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Credits Remaining</p>
              <p className="text-3xl font-bold text-blue-600">{remainingCredits}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{user.completedCredits} of {user.totalCredits} completed</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Requirements Met</p>
              <p className="text-3xl font-bold text-purple-600">
                {completedRequirements}/{degreeRequirements.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Degree requirements completed</p>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-gt-gold" />
            Upcoming Milestones
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Fall 2024 Registration</p>
                <p className="text-sm text-gray-600">Priority registration opens</p>
              </div>
              <span className="text-sm text-orange-600 font-medium">Mar 15</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Thread Declaration</p>
                <p className="text-sm text-gray-600">Declare second thread</p>
              </div>
              <span className="text-sm text-blue-600 font-medium">Apr 1</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900">Summer Internship</p>
                <p className="text-sm text-gray-600">Application deadline</p>
              </div>
              <span className="text-sm text-green-600 font-medium">Feb 28</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-gt-gold" />
            Academic Achievements
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-green-800">Dean's List</p>
                <p className="text-sm text-green-600">Spring 2023</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-medium text-blue-800">Theory Thread Progress</p>
                <p className="text-sm text-blue-600">75% Complete</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div>
                <p className="font-medium text-purple-800">Math Minor</p>
                <p className="text-sm text-purple-600">50% Complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}