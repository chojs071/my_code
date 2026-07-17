import { InterviewQuestion } from '@/types';

export const interviewData: InterviewQuestion[] = [
  {
    id: '1',
    question: 'Explain the difference between controlled and uncontrolled components in React.',
    category: 'React',
    difficulty: 'easy',
    hint: 'Think about who manages the form state.',
  },
  {
    id: '2',
    question: 'How does React reconciliation work? Explain the diffing algorithm.',
    category: 'React',
    difficulty: 'hard',
    hint: 'Consider how React updates the DOM efficiently.',
  },
  {
    id: '3',
    question: 'Describe the concept of closures in JavaScript. Provide a practical example.',
    category: 'JavaScript',
    difficulty: 'medium',
    hint: 'A closure gives you access to an outer function\'s scope from an inner function.',
  },
  {
    id: '4',
    question: 'What are CSS specificity rules and how do you calculate them?',
    category: 'CSS',
    difficulty: 'easy',
    hint: 'Inline styles, IDs, classes, and elements have different weights.',
  },
  {
    id: '5',
    question: 'Explain TypeScript utility types like Partial, Pick, Omit, and Record.',
    category: 'TypeScript',
    difficulty: 'medium',
    hint: 'These are mapped types that transform existing types.',
  },
  {
    id: '6',
    question: 'Describe the event loop in JavaScript. How do microtasks and macrotasks differ?',
    category: 'JavaScript',
    difficulty: 'hard',
    hint: 'Promises use microtasks, setTimeout uses macrotasks.',
  },
  {
    id: '7',
    question: 'What is the Virtual DOM and how does it improve performance?',
    category: 'React',
    difficulty: 'medium',
    hint: 'It is a lightweight representation of the real DOM.',
  },
  {
    id: '8',
    question: 'Explain the difference between nullish coalescing (??) and logical OR (||) operators.',
    category: 'JavaScript',
    difficulty: 'easy',
    hint: 'Consider how they handle falsy values like empty strings and zero.',
  },
];
