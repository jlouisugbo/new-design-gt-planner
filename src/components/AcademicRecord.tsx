import React, { useState } from 'react';
import { FileText, Plus, TrendingUp, Award, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CompletedCourse } from '../types';

export function AcademicRecord() {
  const { state, dispatch } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    courseId: '',
    code: '',
    title: '',
    credits: 3,
    grade: 'A',
    semester: 'Fall',
    year: new Date().getFullYear(),
    gpa: 4.0
  });

  const gradeToGPA = {
    'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0,
    'A-': 3.7, 'B+': 3.3, 'B-': 2.7, 'C+': 2.3, 'C-': 1.7, 'D+': 1.3, 'D-': 0.7
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const completedCourse: CompletedCourse = {
      ...newCourse,
      courseId: `completed-${Date.now()}`,
      gpa: gradeToGPA[newCourse.grade as keyof typeof gradeToGPA]
    };
    
    dispatch({ type: 'ADD_COMPLETED_COURSE', payload: completedCourse });
    setShowAddForm(false);
    setNewCourse({
      courseId: '',
      code: '',
      title: '',
      credits: 3,
      grade: 'A',
      semester: 'Fall',
      year: new Date().getFullYear(),
      gpa: 4.0
    });
  };

  const calculateGPA = () => {
    if (state.completedCourses.length === 0) return 0;
    const totalPoints = state.completedCourses.reduce((sum, course) => sum + (course.gpa * course.credits), 0);
    const totalCredits = state.completedCourses.reduce((sum, course) => sum + course.credits, 0);
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const groupedCourses = state.completedCourses.reduce((acc, course) => {
    const key = `${course.semester} ${course.year}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(course);
    return acc;
  }, {} as { [key: string]: CompletedCourse[] });

  const overallGPA = calculateGPA();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <FileText className="w-8 h-8 mr-3 text-gt-gold" />
          Academic Record
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gt-gold text-gt-navy rounded-lg hover:bg-yellow-500 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Academic Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall GPA</p>
              <p className="text-3xl font-bold text-green-600">{overallGPA.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Credits</p>
              <p className="text-3xl font-bold text-blue-600">
                {state.completedCourses.reduce((sum, course) => sum + course.credits, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Courses Taken</p>
              <p className="text-3xl font-bold text-purple-600">{state.completedCourses.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Semesters</p>
              <p className="text-3xl font-bold text-orange-600">{Object.keys(groupedCourses).length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Course History */}
      <div className="space-y-6">
        {Object.entries(groupedCourses)
          .sort(([a], [b]) => {
            const [aSem, aYear] = a.split(' ');
            const [bSem, bYear] = b.split(' ');
            if (aYear !== bYear) return parseInt(bYear) - parseInt(aYear);
            const semesterOrder = { 'Spring': 1, 'Summer': 2, 'Fall': 3 };
            return (semesterOrder[bSem as keyof typeof semesterOrder] || 0) - 
                   (semesterOrder[aSem as keyof typeof semesterOrder] || 0);
          })
          .map(([semester, courses]) => {
            const semesterGPA = courses.reduce((sum, course) => sum + (course.gpa * course.credits), 0) / 
                              courses.reduce((sum, course) => sum + course.credits, 0);
            const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

            return (
              <div key={semester} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{semester}</h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Semester GPA: <span className="font-medium">{semesterGPA.toFixed(2)}</span></p>
                    <p className="text-sm text-gray-600">Credits: <span className="font-medium">{totalCredits}</span></p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 text-sm font-medium text-gray-600">Course</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-600">Title</th>
                        <th className="text-center py-2 text-sm font-medium text-gray-600">Credits</th>
                        <th className="text-center py-2 text-sm font-medium text-gray-600">Grade</th>
                        <th className="text-center py-2 text-sm font-medium text-gray-600">GPA Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr key={course.courseId} className="border-b border-gray-100">
                          <td className="py-3 text-sm font-medium text-gray-900">{course.code}</td>
                          <td className="py-3 text-sm text-gray-600">{course.title}</td>
                          <td className="py-3 text-sm text-center text-gray-600">{course.credits}</td>
                          <td className="py-3 text-sm text-center">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              course.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                              course.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                              course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                              course.grade.startsWith('D') ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {course.grade}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-center text-gray-600">{course.gpa.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
      </div>

      {state.completedCourses.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No academic records yet</h3>
          <p className="text-gray-600">Start by adding your completed courses</p>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Completed Course</h3>
            
            <form onSubmit={handleAddCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                <input
                  type="text"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                  placeholder="e.g., CS 1301"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                  placeholder="e.g., Introduction to Computing"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                  <input
                    type="number"
                    value={newCourse.credits}
                    onChange={(e) => setNewCourse({...newCourse, credits: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                    min="1"
                    max="6"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <select
                    value={newCourse.grade}
                    onChange={(e) => setNewCourse({...newCourse, grade: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                  >
                    {Object.keys(gradeToGPA).map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <select
                    value={newCourse.semester}
                    onChange={(e) => setNewCourse({...newCourse, semester: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                  >
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={newCourse.year}
                    onChange={(e) => setNewCourse({...newCourse, year: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                    min="2020"
                    max="2030"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gt-gold text-gt-navy rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}