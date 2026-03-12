export interface Lesson {
  id: string;
  title: string;
  videoId: string;
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
  price: number;
  category: string;
  lessons: Lesson[];
  rating: number;
  enrolled: number;
}

export const courses: Course[] = [
  // ===== FREE COURSES =====
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
    id: "git-github",
    title: "Git & GitHub Crash Course",
    description: "Learn version control with Git and GitHub. Master branching, merging, pull requests, and collaborative workflows.",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=340&fit=crop",
    instructor: "Arun Kumar",
    duration: "3h 00m",
    price: 0,
    category: "DevOps",
    rating: 4.7,
    enrolled: 2800,
    lessons: [
      { id: "l1", title: "Git Basics & Init", videoId: "RGOj5yH7evk", duration: "15:00" },
      { id: "l2", title: "Branching & Merging", videoId: "RGOj5yH7evk", duration: "18:00" },
      { id: "l3", title: "GitHub & Pull Requests", videoId: "RGOj5yH7evk", duration: "20:00" },
      { id: "l4", title: "Collaborative Workflows", videoId: "RGOj5yH7evk", duration: "16:00" },
    ],
  },
  {
    id: "c-programming",
    title: "C Programming Fundamentals",
    description: "Learn C from scratch — pointers, memory management, structures, and file I/O. Essential for systems programming.",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=600&h=340&fit=crop",
    instructor: "Deepak Nair",
    duration: "5h 45m",
    price: 0,
    category: "Programming",
    rating: 4.5,
    enrolled: 1900,
    lessons: [
      { id: "l1", title: "Introduction to C", videoId: "KJgsSFOSQv0", duration: "12:00" },
      { id: "l2", title: "Variables & Operators", videoId: "KJgsSFOSQv0", duration: "18:00" },
      { id: "l3", title: "Pointers & Memory", videoId: "KJgsSFOSQv0", duration: "25:00" },
      { id: "l4", title: "Structures & Files", videoId: "KJgsSFOSQv0", duration: "20:00" },
    ],
  },
  {
    id: "linux-basics",
    title: "Linux Command Line Basics",
    description: "Master the Linux terminal. Learn essential commands, file system navigation, permissions, shell scripting, and more.",
    thumbnail: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=340&fit=crop",
    instructor: "Kavitha Rao",
    duration: "3h 30m",
    price: 0,
    category: "DevOps",
    rating: 4.6,
    enrolled: 2100,
    lessons: [
      { id: "l1", title: "Terminal & Navigation", videoId: "ZtqBQ68cfJc", duration: "14:00" },
      { id: "l2", title: "File Operations", videoId: "ZtqBQ68cfJc", duration: "16:00" },
      { id: "l3", title: "Permissions & Users", videoId: "ZtqBQ68cfJc", duration: "18:00" },
      { id: "l4", title: "Shell Scripting Intro", videoId: "ZtqBQ68cfJc", duration: "20:00" },
    ],
  },
  // ===== PAID COURSES =====
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
  {
    id: "node-express",
    title: "Node.js & Express Backend",
    description: "Build scalable REST APIs with Node.js and Express. Covers middleware, authentication, databases, and deployment.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop",
    instructor: "Rohit Menon",
    duration: "7h 20m",
    price: 49,
    category: "Web Development",
    rating: 4.8,
    enrolled: 1750,
    lessons: [
      { id: "l1", title: "Node.js Basics", videoId: "Oe421EPjeBE", duration: "20:00" },
      { id: "l2", title: "Express & Routing", videoId: "Oe421EPjeBE", duration: "22:00" },
      { id: "l3", title: "Middleware & Auth", videoId: "Oe421EPjeBE", duration: "25:00" },
      { id: "l4", title: "Database Integration", videoId: "Oe421EPjeBE", duration: "28:00" },
      { id: "l5", title: "Deployment", videoId: "Oe421EPjeBE", duration: "18:00" },
    ],
  },
  {
    id: "machine-learning-intro",
    title: "Introduction to Machine Learning",
    description: "Understand ML concepts — regression, classification, clustering, neural networks. Hands-on with Python and scikit-learn.",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=340&fit=crop",
    instructor: "Dr. Lakshmi Iyer",
    duration: "9h 00m",
    price: 49,
    category: "Data Science",
    rating: 4.8,
    enrolled: 1320,
    lessons: [
      { id: "l1", title: "What is ML?", videoId: "ukzFI9rgwfU", duration: "15:00" },
      { id: "l2", title: "Linear Regression", videoId: "ukzFI9rgwfU", duration: "22:00" },
      { id: "l3", title: "Classification", videoId: "ukzFI9rgwfU", duration: "25:00" },
      { id: "l4", title: "Neural Networks Intro", videoId: "ukzFI9rgwfU", duration: "30:00" },
      { id: "l5", title: "Model Evaluation", videoId: "ukzFI9rgwfU", duration: "20:00" },
    ],
  },
  {
    id: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    description: "Learn ethical hacking basics, network security, cryptography, and penetration testing concepts for beginners.",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=340&fit=crop",
    instructor: "Arjun Desai",
    duration: "6h 30m",
    price: 49,
    category: "Computer Science",
    rating: 4.7,
    enrolled: 980,
    lessons: [
      { id: "l1", title: "Security Fundamentals", videoId: "z5nc9MDbvkw", duration: "18:00" },
      { id: "l2", title: "Network Security", videoId: "z5nc9MDbvkw", duration: "22:00" },
      { id: "l3", title: "Cryptography Basics", videoId: "z5nc9MDbvkw", duration: "20:00" },
      { id: "l4", title: "Ethical Hacking Intro", videoId: "z5nc9MDbvkw", duration: "25:00" },
    ],
  },
];

export const categories = ["All", "Web Development", "Programming", "Computer Science", "Design", "DevOps", "Data Science"];

export const freeCourses = courses.filter(c => c.price === 0);
export const paidCourses = courses.filter(c => c.price > 0);

export interface Note {
  id: string;
  title: string;
  description: string;
  courseId?: string;
  content: string;
}

export const notes: Note[] = [
  {
    id: "n1",
    title: "HTML & CSS Cheat Sheet",
    description: "Quick reference for HTML tags and CSS properties",
    courseId: "html-css-basics",
    content: `# HTML & CSS Cheat Sheet

## HTML5 Semantic Elements
- <header> - Page or section header
- <nav> - Navigation links
- <main> - Main content area
- <section> - Thematic grouping
- <article> - Independent content
- <aside> - Side content
- <footer> - Page or section footer

## Common HTML Tags
| Tag | Purpose |
|-----|---------|
| <h1>-<h6> | Headings |
| <p> | Paragraph |
| <a href=""> | Link |
| <img src="" alt=""> | Image |
| <ul>/<ol> | Lists |
| <div> | Division |
| <span> | Inline container |
| <form> | Form |
| <input> | Input field |
| <button> | Button |

## CSS Box Model
content → padding → border → margin

## CSS Flexbox
\`\`\`css
.container {
  display: flex;
  justify-content: center; /* main axis */
  align-items: center;     /* cross axis */
  flex-wrap: wrap;
  gap: 1rem;
}
\`\`\`

## CSS Grid
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
\`\`\`

## Responsive Design
\`\`\`css
@media (max-width: 768px) {
  .container { flex-direction: column; }
}
\`\`\`

## CSS Selectors
- element: p { }
- class: .classname { }
- id: #idname { }
- descendant: div p { }
- child: div > p { }
- pseudo: a:hover { }
`,
  },
  {
    id: "n2",
    title: "JavaScript ES6+ Notes",
    description: "Complete guide to modern JavaScript features",
    courseId: "javascript-essentials",
    content: `# JavaScript ES6+ Complete Notes

## Variables
\`\`\`js
let x = 10;       // block-scoped, reassignable
const y = 20;     // block-scoped, constant
// var is function-scoped (avoid)
\`\`\`

## Arrow Functions
\`\`\`js
const add = (a, b) => a + b;
const greet = name => \`Hello, \${name}!\`;
\`\`\`

## Destructuring
\`\`\`js
const { name, age } = person;
const [first, ...rest] = array;
\`\`\`

## Spread & Rest
\`\`\`js
const merged = { ...obj1, ...obj2 };
const copy = [...arr1, ...arr2];
\`\`\`

## Promises & Async/Await
\`\`\`js
async function fetchData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

## Array Methods
\`\`\`js
arr.map(x => x * 2)        // transform
arr.filter(x => x > 5)     // filter
arr.reduce((sum, x) => sum + x, 0) // reduce
arr.find(x => x.id === 1)  // find first match
arr.some(x => x > 10)      // any match?
arr.every(x => x > 0)      // all match?
\`\`\`

## DOM Manipulation
\`\`\`js
document.querySelector('.class');
element.addEventListener('click', handler);
element.classList.add('active');
element.textContent = 'Hello';
\`\`\`

## Modules
\`\`\`js
export const func = () => {};
export default MyComponent;
import { func } from './module';
\`\`\`
`,
  },
  {
    id: "n3",
    title: "React Hooks Summary",
    description: "All React hooks explained with examples",
    courseId: "react-masterclass",
    content: `# React Hooks Summary

## useState
\`\`\`jsx
const [count, setCount] = useState(0);
setCount(prev => prev + 1);
\`\`\`

## useEffect
\`\`\`jsx
useEffect(() => {
  // runs on mount + when deps change
  fetchData();
  return () => cleanup(); // cleanup on unmount
}, [dependency]);
\`\`\`

## useContext
\`\`\`jsx
const ThemeContext = createContext('light');
const theme = useContext(ThemeContext);
\`\`\`

## useRef
\`\`\`jsx
const inputRef = useRef(null);
inputRef.current.focus();
\`\`\`

## useMemo
\`\`\`jsx
const expensive = useMemo(() => computeValue(a, b), [a, b]);
\`\`\`

## useCallback
\`\`\`jsx
const handler = useCallback(() => {
  doSomething(a);
}, [a]);
\`\`\`

## useReducer
\`\`\`jsx
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'INCREMENT' });
\`\`\`

## Custom Hook Pattern
\`\`\`jsx
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) ?? initial
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
\`\`\`

## Rules of Hooks
1. Only call at the top level
2. Only call in React functions
3. Name custom hooks with "use" prefix
`,
  },
  {
    id: "n4",
    title: "Python Basics Reference",
    description: "Python syntax and data structures reference",
    courseId: "python-beginners",
    content: `# Python Basics Reference

## Data Types
\`\`\`python
x = 10          # int
y = 3.14        # float
name = "Hello"  # str
flag = True     # bool
items = [1,2,3] # list
data = {"a": 1} # dict
coords = (1,2)  # tuple
unique = {1,2}  # set
\`\`\`

## Control Flow
\`\`\`python
if x > 0:
    print("positive")
elif x == 0:
    print("zero")
else:
    print("negative")

for i in range(10):
    print(i)

while condition:
    do_something()
\`\`\`

## Functions
\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Lambda
square = lambda x: x ** 2
\`\`\`

## List Comprehensions
\`\`\`python
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
\`\`\`

## String Methods
\`\`\`python
s.upper()    s.lower()    s.strip()
s.split(",") s.replace("a", "b")
f"Name: {name}, Age: {age}"
\`\`\`

## File I/O
\`\`\`python
with open("file.txt", "r") as f:
    content = f.read()
    
with open("output.txt", "w") as f:
    f.write("Hello")
\`\`\`

## OOP
\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return f"{self.name} speaks"

class Dog(Animal):
    def speak(self):
        return f"{self.name} barks"
\`\`\`
`,
  },
  {
    id: "n5",
    title: "DSA Patterns Cheat Sheet",
    description: "Common patterns for solving algorithm problems",
    courseId: "data-structures",
    content: `# DSA Patterns Cheat Sheet

## Time Complexity Quick Ref
| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Hash lookup |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Array scan |
| O(n log n) | Linearithmic | Merge sort |
| O(n²) | Quadratic | Nested loops |

## Two Pointer Pattern
\`\`\`
Use when: sorted array, finding pairs
left = 0, right = n-1
while left < right:
    if arr[left] + arr[right] == target: found
    elif sum < target: left++
    else: right--
\`\`\`

## Sliding Window
\`\`\`
Use when: contiguous subarray/substring
Maintain window [left, right]
Expand right, shrink left when condition breaks
\`\`\`

## Binary Search
\`\`\`
Use when: sorted data, search space reduction
low, high = 0, n-1
mid = (low + high) // 2
Adjust low/high based on comparison
\`\`\`

## BFS (Breadth-First Search)
\`\`\`
Use when: shortest path, level-order
Queue-based, visit neighbors first
\`\`\`

## DFS (Depth-First Search)
\`\`\`
Use when: exploring all paths, backtracking
Stack/recursion, go deep first
\`\`\`

## Dynamic Programming
\`\`\`
Use when: overlapping subproblems, optimal substructure
1. Define state
2. Write recurrence relation
3. Base cases
4. Bottom-up or top-down with memoization
\`\`\`

## Common Patterns
- Prefix Sum: precompute cumulative sums
- Monotonic Stack: next greater/smaller element
- Union-Find: connected components
- Topological Sort: dependency ordering
`,
  },
  {
    id: "n6",
    title: "Git Commands Reference",
    description: "Essential Git commands for version control",
    courseId: "git-github",
    content: `# Git Commands Reference

## Setup
\`\`\`bash
git init                    # Initialize repo
git clone <url>             # Clone repo
git config --global user.name "Name"
git config --global user.email "email"
\`\`\`

## Basic Workflow
\`\`\`bash
git status                  # Check status
git add .                   # Stage all
git add <file>              # Stage specific
git commit -m "message"     # Commit
git push origin main        # Push
git pull origin main        # Pull
\`\`\`

## Branching
\`\`\`bash
git branch                  # List branches
git branch <name>           # Create branch
git checkout <name>         # Switch branch
git checkout -b <name>      # Create & switch
git merge <branch>          # Merge branch
git branch -d <name>        # Delete branch
\`\`\`

## Undoing Changes
\`\`\`bash
git reset HEAD <file>       # Unstage
git checkout -- <file>      # Discard changes
git revert <commit>         # Revert commit
git reset --hard <commit>   # Hard reset
\`\`\`

## Viewing History
\`\`\`bash
git log --oneline           # Compact log
git diff                    # Show changes
git blame <file>            # Line-by-line history
\`\`\`
`,
  },
];
