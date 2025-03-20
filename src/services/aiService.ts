
import { toast } from 'sonner';

export const aiService = {
  explainAssignment: async (assignmentTitle: string, assignmentDescription: string): Promise<string> => {
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would call an LLM API
      // For now, we'll return pre-written explanations based on the assignment title
      
      if (assignmentTitle.includes('Binary Search Tree')) {
        return `
### Assignment Breakdown: Binary Search Tree Implementation

**Core Requirements:**
1. Implement a fully functional Binary Search Tree (BST) class
2. Include methods for insertion, deletion, and traversal
3. Add detailed comments explaining your logic
4. Analyze time complexity for each operation

**Getting Started:**
First, understand the BST properties - for any node, all values in the left subtree are smaller, and all values in the right subtree are larger.

**Implementation Steps:**
1. Create a Node class with value, left, and right pointers
2. Implement the BST class with insert(), delete(), and traversal methods (inorder, preorder, postorder)
3. Test with various cases including empty trees, single nodes, and balanced/unbalanced trees
4. Document your code thoroughly with comments explaining your approach

**Common Pitfalls:**
- Handling edge cases like deleting the root node
- Maintaining BST properties after deletion (finding successor/predecessor)
- Proper error handling for invalid inputs

**Time Complexity Analysis:**
For a balanced BST: insertion, deletion, and search are O(log n)
For an unbalanced BST: worst case becomes O(n)

Good luck with your implementation!
        `;
      } else if (assignmentTitle.includes('Hash Table')) {
        return `
### Assignment Breakdown: Hash Table Collision Resolution

**Core Requirements:**
1. Implement a hash table with two different collision resolution strategies
2. Compare performance characteristics of each approach
3. Analyze and document your findings

**Recommended Collision Resolution Strategies:**
1. **Chaining** - Store colliding elements in linked lists at each bucket
2. **Open Addressing** - Use probing techniques (linear, quadratic, or double hashing)

**Implementation Steps:**
1. Create a base HashTable class with core functionality
2. Extend it to implement each collision resolution strategy
3. Implement standard operations: insert, search, delete
4. Develop test cases that specifically create collisions
5. Measure and compare performance metrics

**Analysis Points to Cover:**
- Memory usage differences
- Performance with varying load factors
- Behavior with poor hash functions
- Best/worst case scenarios for each approach

**Additional Tips:**
- Use a simple but effective hash function
- Test with different data distributions
- Consider implementation complexity in your analysis

This assignment will give you valuable insights into hash table design decisions!
        `;
      } else if (assignmentTitle.includes('Class Inheritance')) {
        return `
### Assignment Breakdown: Class Inheritance & Polymorphism

**Core Requirements:**
1. Design a class hierarchy with at least 3 related classes
2. Demonstrate inheritance relationships
3. Implement polymorphism through method overriding
4. Show proper use of OOP principles

**Suggested Approach:**
Consider creating a base class with common attributes and methods, then extend it with specialized subclasses. For example:
- Vehicle (base) → Car, Motorcycle, Truck (derived)
- Shape (base) → Circle, Rectangle, Triangle (derived)
- Employee (base) → Manager, Developer, Designer (derived)

**Implementation Steps:**
1. Define your base class with appropriate attributes and methods
2. Create subclasses that extend the base class
3. Override methods in subclasses to demonstrate polymorphism
4. Implement a client class that uses these objects polymorphically

**Key OOP Concepts to Demonstrate:**
- Inheritance (is-a relationship)
- Encapsulation (private fields, public interfaces)
- Polymorphism (same method name, different implementations)
- Abstract methods/classes if applicable

**Testing Your Implementation:**
Create instances of each class and show how polymorphic behavior works when calling the same method on different object types.

This assignment will strengthen your understanding of core OOP principles!
        `;
      } else if (assignmentTitle.includes('Design Patterns')) {
        return `
### Assignment Breakdown: Design Patterns Implementation

**Core Requirements:**
1. Implement at least two design patterns
2. Explain why these patterns are appropriate for your solution
3. Demonstrate the benefits they provide

**Recommended Design Patterns to Consider:**
- **Creational**: Singleton, Factory Method, Builder
- **Structural**: Adapter, Decorator, Composite
- **Behavioral**: Observer, Strategy, Command

**Implementation Steps:**
1. Choose a problem domain that can benefit from design patterns
2. Select appropriate patterns that address specific challenges in your domain
3. Implement a solution that incorporates these patterns
4. Document where and why each pattern is used

**Documentation Points to Include:**
- Problem statement and why traditional approaches fall short
- How each pattern solves a specific aspect of the problem
- Alternatives considered and why they were rejected
- Benefits gained (maintainability, flexibility, etc.)

**Example Scenario:**
For a simple document editor:
- Factory Method pattern for creating different document types
- Observer pattern for updating multiple views when the document changes

This assignment will help you recognize situations where design patterns provide elegant solutions to common problems!
        `;
      } else {
        return `
### Assignment Breakdown

I've analyzed your assignment and here are the key points to focus on:

**Core Requirements:**
- Understand the problem statement thoroughly
- Plan your approach before implementation
- Break down the task into smaller components
- Test your solution with various inputs

**Getting Started:**
1. Review related course materials and examples
2. Sketch a high-level design
3. Identify potential challenges

**Implementation Tips:**
- Start with a simple working version, then refine
- Add meaningful comments explaining your logic
- Consider edge cases in your solution
- Test thoroughly with different inputs

**Common Pitfalls to Avoid:**
- Missing edge cases
- Insufficient testing
- Poor documentation
- Overcomplicating the solution

Good luck with your assignment! Remember that clear, maintainable code is often better than overly clever solutions.
        `;
      }
    } catch (error) {
      console.error('Failed to get AI explanation:', error);
      toast.error('Failed to generate explanation. Please try again.');
      return 'Unable to generate explanation at this time. Please try again later.';
    }
  },
  
  generateModuleRoadmap: async (moduleDescription: string, moduleName: string): Promise<Array<{ week: number; topic: string; description: string }>> => {
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // In a real app, this would call an LLM API
      // For now, we'll return pre-written roadmaps based on the module name
      
      if (moduleName.includes('Data Structures')) {
        return [
          {
            week: 1,
            topic: 'Arrays & Lists',
            description: 'Introduction to arrays and dynamic lists. Implementation of vector operations and basic algorithms.'
          },
          {
            week: 2,
            topic: 'Linked Lists',
            description: 'Singly and doubly linked lists. Implementation of insertion, deletion, and traversal operations.'
          },
          {
            week: 3,
            topic: 'Stacks & Queues',
            description: 'Stack and queue data structures. LIFO and FIFO principles, implementation, and applications.'
          },
          {
            week: 4,
            topic: 'Trees: Binary & Search Trees',
            description: 'Tree structures, binary trees, and binary search trees. Implementation and tree traversal algorithms.'
          },
          {
            week: 5,
            topic: 'Balanced Trees',
            description: 'AVL trees and Red-Black trees. Self-balancing mechanisms and operations.'
          },
          {
            week: 6,
            topic: 'Hash Tables',
            description: 'Hashing functions, collision resolution strategies, and hash table operations.'
          },
          {
            week: 7,
            topic: 'Heaps & Priority Queues',
            description: 'Heap data structure, min/max heaps, and priority queue implementation.'
          },
          {
            week: 8,
            topic: 'Graphs: Representation',
            description: 'Graph theory basics, adjacency matrices, adjacency lists, and graph representations.'
          },
          {
            week: 9,
            topic: 'Graphs: Traversals',
            description: 'BFS, DFS, and applications of graph traversal algorithms.'
          },
          {
            week: 10,
            topic: 'Sorting Algorithms',
            description: 'Comparison-based and non-comparison sorting algorithms. Analysis of time and space complexity.'
          },
          {
            week: 11,
            topic: 'Searching Algorithms',
            description: 'Linear search, binary search, and advanced searching techniques.'
          },
          {
            week: 12,
            topic: 'Advanced Topics & Review',
            description: 'Trie structures, union-find, and comprehensive review of course material.'
          }
        ];
      } else if (moduleName.includes('Object-Oriented')) {
        return [
          {
            week: 1,
            topic: 'OOP Fundamentals',
            description: 'Introduction to object-oriented programming paradigm. Objects, classes, and abstraction concepts.'
          },
          {
            week: 2,
            topic: 'Encapsulation & Access Control',
            description: 'Data hiding, access modifiers, getters, setters, and proper encapsulation techniques.'
          },
          {
            week: 3,
            topic: 'Inheritance Basics',
            description: 'Class inheritance, extending classes, and method overriding fundamentals.'
          },
          {
            week: 4,
            topic: 'Polymorphism',
            description: 'Runtime polymorphism, method overriding, and interface implementation.'
          },
          {
            week: 5,
            topic: 'Abstract Classes & Interfaces',
            description: 'Abstract methods, abstract classes, interfaces, and their applications.'
          },
          {
            week: 6,
            topic: 'Composition vs Inheritance',
            description: 'Composition relationships, aggregation, and alternatives to inheritance.'
          },
          {
            week: 7,
            topic: 'Design Principles: SOLID',
            description: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles.'
          },
          {
            week: 8,
            topic: 'Creational Design Patterns',
            description: 'Singleton, Factory, Abstract Factory, Builder, and Prototype patterns.'
          },
          {
            week: 9,
            topic: 'Structural Design Patterns',
            description: 'Adapter, Bridge, Composite, Decorator, Facade, Flyweight, and Proxy patterns.'
          },
          {
            week: 10,
            topic: 'Behavioral Design Patterns',
            description: 'Command, Iterator, Observer, Strategy, Template Method, and Visitor patterns.'
          },
          {
            week: 11,
            topic: 'Exception Handling & Reflection',
            description: 'Proper exception handling techniques and reflection for dynamic object manipulation.'
          },
          {
            week: 12,
            topic: 'Advanced OOP & Project Work',
            description: 'Advanced OOP techniques, design best practices, and final project implementation.'
          }
        ];
      } else {
        // Generic roadmap for any course
        return [
          {
            week: 1,
            topic: 'Introduction to the Subject',
            description: 'Overview of key concepts and foundational principles.'
          },
          {
            week: 2,
            topic: 'Core Principles',
            description: 'Fundamental theories and their applications.'
          },
          {
            week: 3,
            topic: 'Basic Implementation',
            description: 'Hands-on application of basic concepts.'
          },
          {
            week: 4,
            topic: 'Intermediate Concepts',
            description: 'Building on foundational knowledge with more complex ideas.'
          },
          {
            week: 5,
            topic: 'Practical Applications',
            description: 'Real-world scenarios and problem-solving techniques.'
          },
          {
            week: 6,
            topic: 'Advanced Theory',
            description: 'Deeper exploration of theoretical frameworks.'
          },
          {
            week: 7,
            topic: 'Case Studies',
            description: 'Analysis of relevant examples and implementations.'
          },
          {
            week: 8,
            topic: 'Integration Techniques',
            description: 'Combining different aspects of the subject effectively.'
          },
          {
            week: 9,
            topic: 'Best Practices',
            description: 'Industry standards and recommended approaches.'
          },
          {
            week: 10,
            topic: 'Advanced Applications',
            description: 'Complex implementations and specialized techniques.'
          },
          {
            week: 11,
            topic: 'Current Trends',
            description: 'Recent developments and future directions in the field.'
          },
          {
            week: 12,
            topic: 'Review & Project Work',
            description: 'Comprehensive review and final project implementation.'
          }
        ];
      }
    } catch (error) {
      console.error('Failed to generate module roadmap:', error);
      toast.error('Failed to generate module roadmap. Please try again.');
      return [];
    }
  }
};
