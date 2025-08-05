import { Course, DegreeRequirement, UserData } from '../types';

export const sampleCourses: Course[] = [
  {
    id: 'cs1301',
    code: 'CS 1301',
    title: 'Introduction to Computing',
    credits: 3,
    description: 'Introduction to computing principles and programming.',
    prerequisites: [],
    college: 'College of Computing',
    department: 'Computer Science',
    level: 'undergraduate',
    semester: ['Fall', 'Spring', 'Summer']
  },
  {
    id: 'cs1331',
    code: 'CS 1331',
    title: 'Introduction to Object-Oriented Programming',
    credits: 3,
    description: 'Object-oriented programming using Java.',
    prerequisites: ['CS 1301'],
    college: 'College of Computing',
    department: 'Computer Science',
    level: 'undergraduate',
    semester: ['Fall', 'Spring']
  },
  {
    id: 'cs1332',
    code: 'CS 1332',
    title: 'Data Structures and Algorithms',
    credits: 3,
    description: 'Linear and non-linear data structures and algorithms.',
    prerequisites: ['CS 1331'],
    college: 'College of Computing',
    department: 'Computer Science',
    level: 'undergraduate',
    semester: ['Fall', 'Spring']
  },
  {
    id: 'math1551',
    code: 'MATH 1551',
    title: 'Differential Calculus',
    credits: 2,
    description: 'Differential calculus with applications.',
    prerequisites: [],
    college: 'College of Sciences',
    department: 'Mathematics',
    level: 'undergraduate',
    semester: ['Fall', 'Spring', 'Summer']
  },
  {
    id: 'math1552',
    code: 'MATH 1552',
    title: 'Integral Calculus',
    credits: 4,
    description: 'Integral calculus with applications.',
    prerequisites: ['MATH 1551'],
    college: 'College of Sciences',
    department: 'Mathematics',
    level: 'undergraduate',
    semester: ['Fall', 'Spring', 'Summer']
  },
  {
    id: 'phys2211',
    code: 'PHYS 2211',
    title: 'Introduction to Physics I',
    credits: 4,
    description: 'Mechanics, heat, and sound.',
    prerequisites: ['MATH 1551'],
    college: 'College of Sciences',
    department: 'Physics',
    level: 'undergraduate',
    semester: ['Fall', 'Spring']
  },
  {
    id: 'engl1101',
    code: 'ENGL 1101',
    title: 'English Composition I',
    credits: 3,
    description: 'Introduction to academic writing.',
    prerequisites: [],
    college: 'Ivan Allen College',
    department: 'English',
    level: 'undergraduate',
    semester: ['Fall', 'Spring', 'Summer']
  },
  {
    id: 'cs2340',
    code: 'CS 2340',
    title: 'Objects and Design',
    credits: 3,
    description: 'Object-oriented software development.',
    prerequisites: ['CS 1332'],
    college: 'College of Computing',
    department: 'Computer Science',
    level: 'undergraduate',
    semester: ['Fall', 'Spring']
  }
];

export const sampleRequirements: DegreeRequirement[] = [
  {
    id: 'core-math',
    name: 'Mathematics Core',
    type: 'core',
    creditsRequired: 12,
    creditsCompleted: 0,
    courses: ['MATH 1551', 'MATH 1552', 'MATH 2551', 'MATH 2552'],
    description: 'Required mathematics courses for all computing majors.'
  },
  {
    id: 'core-science',
    name: 'Science Core',
    type: 'core',
    creditsRequired: 12,
    creditsCompleted: 0,
    courses: ['PHYS 2211', 'PHYS 2212'],
    flexibleOptions: ['CHEM 1310', 'BIOL 1510', 'EAS 1600'],
    description: 'Required science courses including physics and additional lab sciences.'
  },
  {
    id: 'cs-foundation',
    name: 'Computer Science Foundation',
    type: 'major',
    creditsRequired: 15,
    creditsCompleted: 0,
    courses: ['CS 1301', 'CS 1331', 'CS 1332', 'CS 2340', 'CS 3510'],
    description: 'Foundational computer science courses.'
  },
  {
    id: 'thread-theory',
    name: 'Theory Thread',
    type: 'thread',
    creditsRequired: 18,
    creditsCompleted: 0,
    courses: ['CS 3510', 'CS 4540'],
    flexibleOptions: ['CS 4520', 'CS 4510', 'CS 6505', 'CS 6520'],
    description: 'Theoretical computer science specialization.'
  },
  {
    id: 'english-comp',
    name: 'English Composition',
    type: 'core',
    creditsRequired: 6,
    creditsCompleted: 0,
    courses: ['ENGL 1101', 'ENGL 1102'],
    description: 'Required English composition courses.'
  }
];

export const sampleUserData: UserData = {
  id: 'user123',
  name: 'Alex Johnson',
  email: 'ajohnson3@gatech.edu',
  major: 'Computer Science',
  threads: ['Theory', 'Intelligence'],
  minors: ['Mathematics'],
  expectedGraduation: 'Spring 2026',
  totalCredits: 126,
  completedCredits: 45,
  gpa: 3.67
};