export interface Lesson {
  id: string;
  title: string;
  videoId: string; // YouTube video ID
  duration: string;
  notes?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  price: number; // 0 = free
  category: string;
  lessons: Lesson[];
  rating: number;
  enrolled: number;
}

export const courses: Course[] = [
  {
    id: "html-css-basics",
    title: "HTML & CSS Fundamentals",
    description: "Master the building blocks of the web. Learn HTML5 semantic elements, CSS3 styling, Flexbox, Grid, and responsive design from scratch.",
    thumbnail: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=600&h=340&fit=crop",
    instructor: "Priya Sharma",
    duration: "4h 30m",
    price: 0,
    category: "Web Development",
    rating: 4.8,
    enrolled: 2340,
    lessons: [
      { id: "l1", title: "Introduction to HTML", videoId: "qz0aGYrrlhU", duration: "12:30" },
      { id: "l2", title: "HTML Elements & Tags", videoId: "qz0aGYrrlhU", duration: "18:45" },
      { id: "l3", title: "CSS Selectors & Properties", videoId: "qz0aGYrrlhU", duration: "20:10" },
      { id: "l4", title: "Flexbox Layout", videoId: "qz0aGYrrlhU", duration: "15:00" },
      { id: "l5", title: "CSS Grid", videoId: "qz0aGYrrlhU", duration: "22:00" },
    ],
  },
  {
    id: "javascript-essentials",
    title: "JavaScript Essentials",
    description: "Learn JavaScript from zero to hero. Covers variables, functions, DOM manipulation, async/await, and ES6+ features.",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=340&fit=crop",
    instructor: "Rahul Verma",
    duration: "6h 15m",
    price: 0,
    category: "Programming",
    rating: 4.7,
    enrolled: 3120,
    lessons: [
      { id: "l1", title: "Variables & Data Types", videoId: "W6NZfCO5SIk", duration: "14:20" },
      { id: "l2", title: "Functions & Scope", videoId: "W6NZfCO5SIk", duration: "19:30" },
      { id: "l3", title: "DOM Manipulation", videoId: "W6NZfCO5SIk", duration: "22:00" },
      { id: "l4", title: "Async JavaScript", videoId: "W6NZfCO5SIk", duration: "25:10" },
    ],
  },
  {
    id: "react-masterclass",
    title: "React.js Masterclass",
    description: "Build modern web apps with React. Learn components, hooks, state management, routing, and best practices.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop",
    instructor: "Ankit Patel",
    duration: "8h 45m",
    price: 49,
    category: "Web Development",
    rating: 4.9,
    enrolled: 1890,
    lessons: [
      { id: "l1", title: "React Fundamentals", videoId: "Ke90Tje7VS0", duration: "18:00" },
      { id: "l2", title: "Components & Props", videoId: "Ke90Tje7VS0", duration: "20:30" },
      { id: "l3", title: "Hooks Deep Dive", videoId: "Ke90Tje7VS0", duration: "25:00" },
      { id: "l4", title: "State Management", videoId: "Ke90Tje7VS0", duration: "22:15" },
      { id: "l5", title: "React Router", videoId: "Ke90Tje7VS0", duration: "16:40" },
      { id: "l6", title: "Building a Project", videoId: "Ke90Tje7VS0", duration: "30:00" },
    ],
  },
  {
    id: "python-beginners",
    title: "Python for Beginners",
    description: "Start your programming journey with Python. Learn syntax, data structures, OOP, and build real projects.",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=340&fit=crop",
    instructor: "Sneha Reddy",
    duration: "5h 20m",
    price: 0,
    category: "Programming",
    rating: 4.6,
    enrolled: 4500,
    lessons: [
      { id: "l1", title: "Python Setup & Basics", videoId: "kqtD5dpn9C8", duration: "10:00" },
      { id: "l2", title: "Data Types & Variables", videoId: "kqtD5dpn9C8", duration: "15:30" },
      { id: "l3", title: "Control Flow", videoId: "kqtD5dpn9C8", duration: "18:00" },
      { id: "l4", title: "Functions & Modules", videoId: "kqtD5dpn9C8", duration: "20:00" },
    ],
  },
  {
    id: "data-structures",
    title: "Data Structures & Algorithms",
    description: "Crack coding interviews with a deep understanding of arrays, linked lists, trees, graphs, sorting, and dynamic programming.",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=340&fit=crop",
    instructor: "Vikram Singh",
    duration: "10h 00m",
    price: 49,
    category: "Computer Science",
    rating: 4.9,
    enrolled: 2100,
    lessons: [
      { id: "l1", title: "Arrays & Strings", videoId: "8hly31xKli0", duration: "25:00" },
      { id: "l2", title: "Linked Lists", videoId: "8hly31xKli0", duration: "22:00" },
      { id: "l3", title: "Trees & BST", videoId: "8hly31xKli0", duration: "28:00" },
      { id: "l4", title: "Graphs", videoId: "8hly31xKli0", duration: "30:00" },
      { id: "l5", title: "Dynamic Programming", videoId: "8hly31xKli0", duration: "35:00" },
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Principles",
    description: "Learn design thinking, wireframing, prototyping, and create stunning user interfaces using Figma.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop",
    instructor: "Meera Joshi",
    duration: "3h 50m",
    price: 49,
    category: "Design",
    rating: 4.7,
    enrolled: 1560,
    lessons: [
      { id: "l1", title: "Design Thinking", videoId: "c9Wg6Cb_YlU", duration: "15:00" },
      { id: "l2", title: "Color Theory", videoId: "c9Wg6Cb_YlU", duration: "12:00" },
      { id: "l3", title: "Typography", videoId: "c9Wg6Cb_YlU", duration: "14:00" },
      { id: "l4", title: "Figma Basics", videoId: "c9Wg6Cb_YlU", duration: "20:00" },
    ],
  },
];

export const categories = ["All", "Web Development", "Programming", "Computer Science", "Design"];

export interface Note {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
}

export const notes: Note[] = [
  { id: "n1", title: "HTML & CSS Cheat Sheet", description: "Quick reference for HTML tags and CSS properties", downloadUrl: "#" },
  { id: "n2", title: "JavaScript ES6+ Notes", description: "Complete guide to modern JavaScript features", downloadUrl: "#" },
  { id: "n3", title: "React Hooks Summary", description: "All React hooks explained with examples", downloadUrl: "#" },
  { id: "n4", title: "Python Basics PDF", description: "Python syntax and data structures reference", downloadUrl: "#" },
  { id: "n5", title: "DSA Patterns", description: "Common patterns for solving algorithm problems", downloadUrl: "#" },
];
