
import { toast } from 'sonner';

// Define types for our data models
export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  courseId: string;
  courseName: string;
}

export interface Module {
  id: string;
  name: string;
  code: string;
  description: string;
}

// For demo purposes, we'll use mock data
const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Binary Search Tree Implementation',
    description: 'Implement a binary search tree with insertion, deletion, and traversal methods. Include detailed comments explaining your logic and time complexity analysis.',
    dueDate: '2023-11-15T23:59:00',
    courseId: 'DSA101',
    courseName: 'Data Structures & Algorithms'
  },
  {
    id: '2',
    title: 'Hash Table Collision Resolution',
    description: 'Compare and implement two different collision resolution strategies for hash tables. Analyze the performance implications of each approach.',
    dueDate: '2023-11-20T23:59:00',
    courseId: 'DSA101',
    courseName: 'Data Structures & Algorithms'
  },
  {
    id: '3',
    title: 'Class Inheritance & Polymorphism',
    description: 'Design a class hierarchy that demonstrates inheritance and polymorphism principles. Create at least three classes with appropriate method overriding.',
    dueDate: '2023-11-18T23:59:00',
    courseId: 'OOP202',
    courseName: 'Object-Oriented Programming'
  },
  {
    id: '4',
    title: 'Design Patterns Implementation',
    description: 'Implement a solution using at least two design patterns (e.g., Singleton, Factory, Observer). Explain why these patterns are appropriate for your solution.',
    dueDate: '2023-11-25T23:59:00',
    courseId: 'OOP202',
    courseName: 'Object-Oriented Programming'
  }
];

const mockModules: Module[] = [
  {
    id: 'DSA101',
    name: 'Data Structures & Algorithms',
    code: 'DSA101',
    description: 'An introduction to fundamental data structures and algorithms, including arrays, linked lists, trees, graphs, searching, and sorting techniques.'
  },
  {
    id: 'OOP202',
    name: 'Object-Oriented Programming',
    code: 'OOP202',
    description: 'Advanced object-oriented programming concepts including inheritance, polymorphism, encapsulation, and design patterns.'
  }
];

// In a real app, these functions would make API calls to the Moodle server
// For now, we'll simulate API behavior with mock data and delays

export const moodleApi = {
  getUpcomingAssignments: async (token: string): Promise<Assignment[]> => {
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate error occasionally
      if (Math.random() < 0.05) {
        throw new Error('Network error');
      }
      
      return mockAssignments;
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
      toast.error('Failed to load assignments. Please try again.');
      return [];
    }
  },
  
  getModules: async (token: string): Promise<Module[]> => {
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      return mockModules;
    } catch (error) {
      console.error('Failed to fetch modules:', error);
      toast.error('Failed to load modules. Please try again.');
      return [];
    }
  },
  
  getModuleById: async (token: string, moduleId: string): Promise<Module | null> => {
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const module = mockModules.find(m => m.id === moduleId);
      
      if (!module) {
        throw new Error(`Module with ID ${moduleId} not found`);
      }
      
      return module;
    } catch (error) {
      console.error('Failed to fetch module details:', error);
      toast.error('Failed to load module details. Please try again.');
      return null;
    }
  }
};
