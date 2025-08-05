import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Course, CompletedCourse, DegreeRequirement, UserData } from '../types';
import { sampleCourses, sampleRequirements, sampleUserData } from '../data/sampleData';

interface AppState {
  user: UserData;
  courses: Course[];
  completedCourses: CompletedCourse[];
  degreeRequirements: DegreeRequirement[];
  plannedCourses: { [semesterId: string]: Course[] };
}

type AppAction = 
  | { type: 'ADD_COMPLETED_COURSE'; payload: CompletedCourse }
  | { type: 'UPDATE_USER'; payload: Partial<UserData> }
  | { type: 'PLAN_COURSE'; payload: { semesterId: string; course: Course } }
  | { type: 'REMOVE_PLANNED_COURSE'; payload: { semesterId: string; courseId: string } };

const initialState: AppState = {
  user: sampleUserData,
  courses: sampleCourses,
  completedCourses: [],
  degreeRequirements: sampleRequirements,
  plannedCourses: {}
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_COMPLETED_COURSE':
      return {
        ...state,
        completedCourses: [...state.completedCourses, action.payload]
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    case 'PLAN_COURSE':
      const { semesterId, course } = action.payload;
      return {
        ...state,
        plannedCourses: {
          ...state.plannedCourses,
          [semesterId]: [...(state.plannedCourses[semesterId] || []), course]
        }
      };
    case 'REMOVE_PLANNED_COURSE':
      const { semesterId: semId, courseId } = action.payload;
      return {
        ...state,
        plannedCourses: {
          ...state.plannedCourses,
          [semId]: (state.plannedCourses[semId] || []).filter(c => c.id !== courseId)
        }
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}