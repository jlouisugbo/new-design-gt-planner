export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  description: string;
  prerequisites: string[];
  college: string;
  department: string;
  level: 'undergraduate' | 'graduate';
  semester: string[];
}

export interface CompletedCourse {
  courseId: string;
  code: string;
  title: string;
  credits: number;
  grade: string;
  semester: string;
  year: number;
  gpa: number;
}

export interface DegreeRequirement {
  id: string;
  name: string;
  type: 'core' | 'major' | 'thread' | 'elective' | 'minor';
  creditsRequired: number;
  creditsCompleted: number;
  courses: string[];
  flexibleOptions?: string[];
  description: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  major: string;
  threads: string[];
  minors: string[];
  expectedGraduation: string;
  totalCredits: number;
  completedCredits: number;
  gpa: number;
}

export interface Semester {
  id: string;
  term: 'Fall' | 'Spring' | 'Summer';
  year: number;
  courses: Course[];
}