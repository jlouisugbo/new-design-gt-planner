import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Clock, MapPin, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';

export function CourseDiscovery() {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCredits, setSelectedCredits] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const colleges = [...new Set(state.courses.map(course => course.college))];
  const levels = ['undergraduate', 'graduate'];
  const creditOptions = ['1', '2', '3', '4', '6+'];

  const filteredCourses = useMemo(() => {
    return state.courses.filter(course => {
      const matchesSearch = course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCollege = !selectedCollege || course.college === selectedCollege;
      const matchesLevel = !selectedLevel || course.level === selectedLevel;
      const matchesCredits = !selectedCredits || 
                           (selectedCredits === '6+' ? course.credits >= 6 : course.credits.toString() === selectedCredits);
      
      return matchesSearch && matchesCollege && matchesLevel && matchesCredits;
    });
  }, [state.courses, searchTerm, selectedCollege, selectedLevel, selectedCredits]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCollege('');
    setSelectedLevel('');
    setSelectedCredits('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Search className="w-8 h-8 mr-3 text-gt-gold" />
          Course Discovery
        </h1>
        <div className="text-right">
          <p className="text-sm text-gray-600">{filteredCourses.length} courses found</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses by code, title, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
            />
          </div>
          
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                >
                  <option value="">All Colleges</option>
                  {colleges.map(college => (
                    <option key={college} value={college}>{college}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                >
                  <option value="">All Levels</option>
                  {levels.map(level => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Credits</label>
                <select
                  value={selectedCredits}
                  onChange={(e) => setSelectedCredits(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                >
                  <option value="">All Credits</option>
                  {creditOptions.map(credit => (
                    <option key={credit} value={credit}>{credit} credit{credit !== '1' ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-gt-navy border border-gt-navy rounded-lg hover:bg-gt-navy hover:text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Course Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{course.code}</h3>
                  <span className="px-2 py-1 bg-gt-gold text-gt-navy text-xs font-medium rounded">
                    {course.credits} credits
                  </span>
                </div>
                <h4 className="text-md font-medium text-gray-700 mb-2">{course.title}</h4>
              </div>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-gt-gold transition-colors">
                <Star className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{course.college}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Available: {course.semester.join(', ')}</span>
              </div>

              {course.prerequisites.length > 0 && (
                <div className="text-sm">
                  <span className="text-gray-700 font-medium">Prerequisites: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {course.prerequisites.map((prereq) => (
                      <span key={prereq} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                course.level === 'undergraduate' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </span>
              
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm text-gt-navy border border-gt-navy rounded hover:bg-gt-navy hover:text-white transition-colors">
                  View Details
                </button>
                <button className="px-3 py-1 text-sm bg-gt-gold text-gt-navy rounded hover:bg-yellow-500 transition-colors">
                  Add to Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
}