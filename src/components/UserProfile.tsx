import React, { useState } from 'react';
import { User, Settings, BookOpen, Award, Calendar, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function UserProfile() {
  const { state, dispatch } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(state.user);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_USER', payload: formData });
    setIsEditing(false);
  };

  const majors = ['Computer Science', 'Computer Engineering', 'Electrical Engineering', 'Industrial Engineering'];
  const threads = ['Theory', 'Intelligence', 'Systems & Architecture', 'People', 'Media', 'Modeling & Simulation', 'Information Internetworks', 'Devices'];
  const minors = ['Mathematics', 'Physics', 'Business', 'Psychology', 'Economics', 'Music Technology'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <User className="w-8 h-8 mr-3 text-gt-gold" />
          User Profile
        </h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-gt-navy text-white rounded-lg hover:bg-blue-900 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gt-gold rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gt-navy" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{state.user.name}</h2>
            <p className="text-gt-navy font-medium">{state.user.major}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{state.user.email}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Expected Graduation</p>
            <p className="text-lg font-semibold text-gt-navy">{state.user.expectedGraduation}</p>
          </div>
        </div>
      </div>

      {isEditing ? (
        /* Edit Form */
        <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Edit Profile Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
              <select
                value={formData.major}
                onChange={(e) => setFormData({...formData, major: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
              >
                {majors.map(major => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Graduation</label>
              <input
                type="text"
                value={formData.expectedGraduation}
                onChange={(e) => setFormData({...formData, expectedGraduation: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                placeholder="e.g., Spring 2026"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Threads</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {threads.map(thread => (
                <label key={thread} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.threads.includes(thread)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({...formData, threads: [...formData.threads, thread]});
                      } else {
                        setFormData({...formData, threads: formData.threads.filter(t => t !== thread)});
                      }
                    }}
                    className="rounded border-gray-300 text-gt-gold focus:ring-gt-gold"
                  />
                  <span className="text-sm text-gray-700">{thread}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Minors</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {minors.map(minor => (
                <label key={minor} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.minors.includes(minor)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({...formData, minors: [...formData.minors, minor]});
                      } else {
                        setFormData({...formData, minors: formData.minors.filter(m => m !== minor)});
                      }
                    }}
                    className="rounded border-gray-300 text-gt-gold focus:ring-gt-gold"
                  />
                  <span className="text-sm text-gray-700">{minor}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 mt-8">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gt-gold text-gt-navy rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        /* View Mode */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Academic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-gt-gold" />
              Academic Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Major</p>
                <p className="text-lg text-gray-900">{state.user.major}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Threads</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {state.user.threads.map(thread => (
                    <span key={thread} className="px-3 py-1 bg-gt-navy text-white text-sm rounded-full">
                      {thread}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Minors</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {state.user.minors.map(minor => (
                    <span key={minor} className="px-3 py-1 bg-gt-gold text-gt-navy text-sm rounded-full">
                      {minor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-gt-gold" />
              Academic Progress
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Overall GPA</span>
                <span className="text-lg font-bold text-green-600">{state.user.gpa}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Credits Completed</span>
                <span className="text-lg font-bold text-blue-600">
                  {state.user.completedCredits}/{state.user.totalCredits}
                </span>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Degree Progress</span>
                  <span>{((state.user.completedCredits / state.user.totalCredits) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gt-gold h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(state.user.completedCredits / state.user.totalCredits) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-gt-gold" />
          Account Settings
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">FERPA Compliance</p>
              <p className="text-sm text-gray-600">All academic data is handled in accordance with FERPA regulations</p>
            </div>
            <span className="text-green-600 text-sm font-medium">Active</span>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Data Export</p>
              <p className="text-sm text-gray-600">Download your academic planning data</p>
            </div>
            <button className="text-gt-navy text-sm font-medium hover:text-blue-800">
              Export Data
            </button>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Account Security</p>
              <p className="text-sm text-gray-600">Manage your account security settings</p>
            </div>
            <button className="text-gt-navy text-sm font-medium hover:text-blue-800">
              Security Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}