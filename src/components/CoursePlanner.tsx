import React, { useState } from 'react';
import { Calendar, Plus, BookOpen, Clock, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';

export function CoursePlanner() {
  const { state, dispatch } = useApp();
  const [draggedCourse, setDraggedCourse] = useState<Course | null>(null);

  const currentYear = new Date().getFullYear();
  const semesters = [];
  
  // Generate next 4 years of semesters
  for (let year = currentYear; year < currentYear + 4; year++) {
    semesters.push(
      { id: `fall-${year}`, term: 'Fall', year, courses: state.plannedCourses[`fall-${year}`] || [] },
      { id: `spring-${year + 1}`, term: 'Spring', year: year + 1, courses: state.plannedCourses[`spring-${year + 1}`] || [] },
      { id: `summer-${year + 1}`, term: 'Summer', year: year + 1, courses: state.plannedCourses[`summer-${year + 1}`] || [] }
    );
  }

  const handleDragStart = (e: React.DragEvent, course: Course) => {
    setDraggedCourse(course);
    e.dataTransfer.setData('text/plain', course.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, semesterId: string) => {
    e.preventDefault();
    if (draggedCourse) {
      dispatch({ type: 'PLAN_COURSE', payload: { semesterId, course: draggedCourse } });
      setDraggedCourse(null);
    }
  };

  const removeCourse = (semesterId: string, courseId: string) => {
    dispatch({ type: 'REMOVE_PLANNED_COURSE', payload: { semesterId, courseId } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Calendar className="w-8 h-8 mr-3 text-gt-gold" />
          Course Planner
        </h1>
        <div className="text-right">
          <p className="text-sm text-gray-600">Academic Years {currentYear}-{currentYear + 4}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Course Bank */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-gt-gold" />
              Available Courses
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {state.courses.map((course) => (
                <div
                  key={course.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, course)}
                  className="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors border-l-4 border-gt-gold"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{course.code}</p>
                    <span className="text-xs bg-gt-navy text-white px-2 py-1 rounded">
                      {course.credits}h
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{course.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Semester Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {semesters.map((semester) => (
              <div
                key={semester.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 min-h-48"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, semester.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    {semester.term} {semester.year}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {semester.courses.reduce((total, course) => total + course.credits, 0)}h
                    </span>
                  </div>
                </div>

                <div 
                  className={`space-y-2 min-h-32 p-2 rounded-lg border-2 border-dashed transition-colors ${
                    draggedCourse ? 'border-gt-gold bg-gt-gold/5' : 'border-gray-200'
                  }`}
                >
                  {semester.courses.length === 0 ? (
                    <div className="flex items-center justify-center h-32 text-gray-400">
                      <div className="text-center">
                        <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Drop courses here</p>
                      </div>
                    </div>
                  ) : (
                    semester.courses.map((course) => (
                      <div
                        key={course.id}
                        className="p-3 bg-gt-navy text-white rounded-lg group relative"
                      >
                        <button
                          onClick={() => removeCourse(semester.id, course.id)}
                          className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{course.code}</p>
                          <span className="text-xs bg-gt-gold text-gt-navy px-2 py-1 rounded">
                            {course.credits}h
                          </span>
                        </div>
                        <p className="text-sm text-gray-200 mt-1 line-clamp-1">{course.title}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Semester Summary */}
                {semester.courses.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Total Credits:</span>
                      <span className="font-medium text-gray-900">
                        {semester.courses.reduce((total, course) => total + course.credits, 0)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Planning Tips */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Planning Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Credit Load</p>
            <p>Aim for 12-18 credits per semester. Consider course difficulty when planning.</p>
          </div>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Prerequisites</p>
            <p>Check course prerequisites before planning. Some courses have strict sequences.</p>
          </div>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Balance</p>
            <p>Mix difficult courses with easier ones to maintain a manageable workload.</p>
          </div>
        </div>
      </div>
    </div>
  );
}