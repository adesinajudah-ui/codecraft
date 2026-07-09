import { Lesson } from '../types';

export const lesson4: Lesson = {
  id: 'lesson4',
  title: 'Modern JavaScript (ES6+)',
  topics: [
    {
      id: 'destructuring',
      title: 'Destructuring & Spread',
      explanation: `**Destructuring** lets you unpack values from arrays or objects into named variables — cleaner than manually accessing each property.

**Array destructuring:**
\`\`\`js
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

// Skip elements
const [a, , b] = [1, 2, 3]; // a=1, b=3

// Default values
const [x = 0, y = 0] = [10]; // x=10, y=0
\`\`\`

**Object destructuring:**
\`\`\`js
const { name, age, city = "Unknown" } = user;

// Rename while destructuring
const { name: userName } = user;

// Nested
const { address: { street } } = user;
\`\`\`

**Spread operator (\`...\`):**
\`\`\`js
// Copy arrays
const copy = [...original];

// Merge
const merged = [...arr1, ...arr2];

// Spread into function
Math.max(...[1, 2, 3]);

// Copy and update objects
const updated = { ...user, age: 31 };
\`\`\`

**Rest parameter** — collect remaining args:
\`\`\`js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
\`\`\``,
      jsExample: `// Array destructuring
const rgb = [255, 128, 0];
const [red, green, blue] = rgb;
console.log(\`rgb(\${red}, \${green}, \${blue})\`);

// Rest in destructuring
const [first, ...others] = [1, 2, 3, 4, 5];
console.log("First:", first);       // 1
console.log("Others:", others);     // [2,3,4,5]

// Object destructuring
const user = { name: "Alice", age: 30, role: "admin" };
const { name, age, role } = user;
console.log(\`\${name} (\${age}) - \${role}\`);

// Rename during destructuring
const { name: userName, age: userAge } = user;
console.log(userName, userAge);

// Default values
const { city = "New York", country = "US" } = user;
console.log(city, country);  // Uses defaults

// Spread — merge arrays
const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];
const all = [...nums1, ...nums2];
console.log(all); // [1,2,3,4,5,6]

// Spread — update object immutably
const updated = { ...user, age: 31, city: "Paris" };
console.log("Original age:", user.age);   // 30
console.log("Updated age:", updated.age); // 31

// Rest parameters
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15`,
      exercises: [
        {
          title: 'Swap variables',
          description: 'Use array destructuring to swap the values of two variables without a temp variable: let a = 1, b = 2; — swap so a=2, b=1.',
          hint: 'let a = 1, b = 2; [a, b] = [b, a]; console.log(a, b);',
        },
        {
          title: 'Merge and deduplicate',
          description: 'Merge [1,2,3] and [2,3,4,5] using spread, then use Set to deduplicate the result.',
          hint: 'const merged = [...arr1, ...arr2]; const unique = [...new Set(merged)];',
        },
      ],
      quiz: [
        { question: 'const [a, b] = [10, 20]; b equals?', options: ['10', '20', 'undefined', 'Error'], correctIndex: 1, explanation: 'b gets the second element: 20.' },
        { question: 'const { x } = { x: 5, y: 6 }; x equals?', options: ['{ x: 5 }', '5', '{ x: 5, y: 6 }', 'undefined'], correctIndex: 1, explanation: 'Object destructuring extracts x=5.' },
        { question: 'const [a, , b] = [1, 2, 3]; b equals?', options: ['1', '2', '3', 'undefined'], correctIndex: 2, explanation: 'The comma skips element 2; b gets element 3.' },
        { question: 'const { name: n } = { name: "Alice" }; n equals?', options: ['{ name: "Alice" }', '"name"', '"Alice"', 'undefined'], correctIndex: 2, explanation: 'Renaming destructuring: n gets the value "Alice".' },
        { question: '[...arr1, ...arr2] creates?', options: ['Nested array', 'Merged array', 'Error', 'Object'], correctIndex: 1, explanation: 'Spread merges both arrays into one.' },
        { question: 'Math.max(...[3,1,4,1,5,9]) returns?', options: ['3', '[3,1,4]', '9', 'Error'], correctIndex: 2, explanation: 'Spread passes array elements as individual arguments to Math.max.' },
        { question: 'function f(...args) {} — args is?', options: ['undefined', 'The first argument', 'An array of all arguments', 'A string'], correctIndex: 2, explanation: 'Rest parameter ...args collects all arguments into an array.' },
        { question: 'const { a = 10 } = {}; a equals?', options: ['undefined', '10', '{}', 'Error'], correctIndex: 1, explanation: 'Default value 10 is used when the property is absent.' },
        { question: 'const copy = [...arr]; Is copy a new array?', options: ['No, same reference', 'Yes, a shallow copy', 'Yes, a deep clone', 'No, it is an object'], correctIndex: 1, explanation: 'Spread creates a shallow copy — a new array with the same top-level elements.' },
        { question: 'const { a: { b } } = { a: { b: 42 } }; b equals?', options: ['{ b: 42 }', '42', 'undefined', 'Error'], correctIndex: 1, explanation: 'Nested destructuring extracts b from the nested object: 42.' },
        { question: 'const [a, b, ...rest] = [1,2,3,4]; rest equals?', options: ['[3]', '[3,4]', '[1,2]', 'undefined'], correctIndex: 1, explanation: 'Rest collects remaining elements: [3, 4].' },
        { question: 'Spread in function call: fn(...[1,2,3]) is equivalent to?', options: ['fn([1,2,3])', 'fn(1,2,3)', 'fn(1)(2)(3)', 'fn("1,2,3")'], correctIndex: 1, explanation: 'Spread expands the array into individual arguments.' },
        { question: 'const { ...rest } = { a:1, b:2, c:3 }; rest equals?', options: ['{}', '{ a:1, b:2, c:3 }', 'undefined', 'Error'], correctIndex: 1, explanation: 'Object rest collects all remaining properties.' },
        { question: 'Can you destructure function parameters?', options: ['No', 'Yes: function f({ name, age }) {}', 'Only arrays', 'Only in arrow functions'], correctIndex: 1, explanation: 'Parameter destructuring is very common: function f({ name, age }) {}.' },
        { question: 'const [a=5] = [undefined]; a equals?', options: ['undefined', '5', 'null', 'Error'], correctIndex: 1, explanation: 'Default values trigger on undefined: a = 5.' },
        { question: 'Shallow copy means?', options: ['Full recursive clone', 'Top-level properties copied; nested objects are shared', 'Empty copy', 'Reference copy'], correctIndex: 1, explanation: 'Shallow copy duplicates the top level but nested objects remain shared references.' },
        { question: 'Which is NOT a valid use of ...?', options: ['Spread array into function args', 'Rest in function params', 'Copy object', 'Multiply numbers'], correctIndex: 3, explanation: '... is not a multiplication operator.' },
        { question: '[...[1,2],...[3,4]].length equals?', options: ['2', '4', '[[1,2],[3,4]]', 'Error'], correctIndex: 1, explanation: 'Both arrays are spread and merged: [1,2,3,4] with length 4.' },
        { question: 'When destructuring, what happens to properties not mentioned?', options: ['They cause an error', 'They are ignored', 'They become undefined', 'They are deleted from the original'], correctIndex: 1, explanation: 'Only named properties are extracted; others are simply ignored.' },
        { question: 'const { a, ...b } = { a:1, c:2, d:3 }; b equals?', options: ['{ a:1 }', '{ c:2, d:3 }', '[2,3]', 'undefined'], correctIndex: 1, explanation: 'Object rest collects everything except the explicitly destructured a.' },
      ],
    },
    {
      id: 'classes',
      title: 'Classes & OOP',
      explanation: `ES6 **classes** are a clean syntax for object-oriented programming — creating templates (blueprints) for objects.

\`\`\`js
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }
  
  speak() {
    return \`\${this.name} says \${this.sound}!\`;
  }
  
  static create(name, sound) {
    return new Animal(name, sound);
  }
}

const dog = new Animal("Rex", "woof");
console.log(dog.speak()); // "Rex says woof!"
\`\`\`

**Inheritance (extends):**
\`\`\`js
class Dog extends Animal {
  constructor(name) {
    super(name, "woof"); // call parent constructor
  }
  
  fetch() {
    return \`\${this.name} fetches the ball!\`;
  }
}
\`\`\`

**Private fields (modern JS):**
\`\`\`js
class BankAccount {
  #balance = 0; // private — can't be accessed outside
  
  deposit(amount) { this.#balance += amount; }
  getBalance() { return this.#balance; }
}
\`\`\`

**Key concepts:**
- \`constructor\` — runs when you do \`new ClassName()\`
- \`this\` — refers to the current instance
- \`static\` — belongs to the class, not instances
- \`extends\` — inherit from another class
- \`super\` — call the parent class constructor/method`,
      jsExample: `class Shape {
  constructor(color = "black") {
    this.color = color;
  }
  
  describe() {
    return \`A \${this.color} shape\`;
  }
  
  static defaultColor() {
    return "black";
  }
}

class Circle extends Shape {
  #radius;  // private field
  
  constructor(radius, color) {
    super(color);       // call Shape constructor
    this.#radius = radius;
  }
  
  get radius() { return this.#radius; }
  
  area() {
    return (Math.PI * this.#radius ** 2).toFixed(2);
  }
  
  describe() {
    return \`\${super.describe()}, circle with radius \${this.#radius}\`;
  }
}

class Rectangle extends Shape {
  constructor(width, height, color) {
    super(color);
    this.width = width;
    this.height = height;
  }
  area() { return this.width * this.height; }
}

const c = new Circle(5, "red");
console.log(c.describe());   // "A red shape, circle with radius 5"
console.log("Area:", c.area());  // "78.54"

const r = new Rectangle(4, 6, "blue");
console.log(r.describe());   // "A blue shape"
console.log("Area:", r.area()); // 24

console.log(Shape.defaultColor()); // "black" (static)
console.log(c instanceof Circle);  // true
console.log(c instanceof Shape);   // true`,
      exercises: [
        {
          title: 'Create a Person class',
          description: 'Create a Person class with name and age. Add a greet() method that returns "Hi, I\'m Alice (30)". Create 2 instances.',
          hint: 'class Person { constructor(name, age) {...} greet() { return `Hi, I\'m ${this.name} (${this.age})`; } }',
        },
        {
          title: 'Extend the class',
          description: 'Create an Employee class that extends Person, adds a jobTitle property, and overrides greet() to include the job title.',
          hint: 'class Employee extends Person { constructor(name, age, jobTitle) { super(name, age); this.jobTitle = jobTitle; } }',
        },
      ],
      quiz: [
        { question: 'What does the constructor method do?', options: ['Destroys the instance', 'Runs when a new instance is created with new', 'Defines static methods', 'Exports the class'], correctIndex: 1, explanation: 'constructor() runs automatically when you create a new instance with new.' },
        { question: 'What does extends do?', options: ['Creates a copy of a class', 'Creates a class that inherits from another', 'Adds static methods', 'Makes methods private'], correctIndex: 1, explanation: 'extends sets up inheritance from a parent class.' },
        { question: 'What does super() do?', options: ['Creates a new class', 'Calls the parent class constructor', 'Destroys the parent', 'Makes a static copy'], correctIndex: 1, explanation: 'super() calls the parent class constructor — required before using this in a subclass.' },
        { question: 'A static method is called on?', options: ['An instance', 'The class itself', 'window', 'Both'], correctIndex: 1, explanation: 'Static methods are called on the class: ClassName.method(), not on instances.' },
        { question: 'instanceof checks?', options: ['Type of primitive', 'Whether an object is an instance of a class', 'Object equality', 'typeof result'], correctIndex: 1, explanation: 'instanceof returns true if the object is an instance of the class.' },
        { question: 'Private fields use what prefix?', options: ['_', '__', '#', '@'], correctIndex: 2, explanation: '# makes a field private in modern JavaScript.' },
        { question: 'What is "this" inside a class method?', options: ['The class itself', 'The current instance', 'undefined', 'window'], correctIndex: 1, explanation: 'Inside a regular method, this refers to the instance.' },
        { question: 'Getters use which keyword?', options: ['function', 'get', 'return', 'property'], correctIndex: 1, explanation: 'get methodName() { return ... } defines a getter property.' },
        { question: 'Can a class have multiple constructors?', options: ['Yes', 'No, only one constructor per class', 'Only with inheritance', 'Up to 3'], correctIndex: 1, explanation: 'A class can only have one constructor.' },
        { question: 'class vs prototype: classes are?', options: ['Completely different from prototypes', 'Syntactic sugar over prototype-based inheritance', 'Faster than prototypes', 'ES5 only'], correctIndex: 1, explanation: 'JS classes are syntactic sugar — under the hood, they use prototype-based inheritance.' },
        { question: 'What is encapsulation?', options: ['Combining many classes', 'Hiding internal data and exposing only a controlled interface', 'Inheriting from multiple classes', 'Creating static methods'], correctIndex: 1, explanation: 'Encapsulation hides implementation details — private fields help achieve this.' },
        { question: 'What is polymorphism?', options: ['Multiple inheritance', 'Different classes responding to the same method in different ways', 'Private methods', 'Static classes'], correctIndex: 1, explanation: 'Polymorphism means different objects respond to the same interface differently.' },
        { question: 'To access a parent method in a subclass:', options: ['parent.method()', 'super.method()', 'this.parent.method()', 'base.method()'], correctIndex: 1, explanation: 'super.method() calls the parent class\'s version of the method.' },
        { question: 'class methods defined inside the class body are stored on?', options: ['The instance', 'The prototype', 'A static object', 'The constructor'], correctIndex: 1, explanation: 'Class methods go on the prototype, shared across all instances.' },
        { question: 'new ClassName() without arguments works if?', options: ['Always', 'Constructor has no required params or all have defaults', 'Never — args required', 'Only for empty classes'], correctIndex: 1, explanation: 'If the constructor has no required parameters, you can call new ClassName().' },
        { question: 'What is abstraction in OOP?', options: ['Hiding all implementation', 'Exposing only relevant details and hiding complexity', 'Making all methods private', 'Static-only classes'], correctIndex: 1, explanation: 'Abstraction shows relevant interface while hiding unnecessary implementation details.' },
        { question: 'Can you extend built-in classes like Array?', options: ['No', 'Yes: class MyArray extends Array {}', 'Only in Node.js', 'Only with Object'], correctIndex: 1, explanation: 'You can extend built-in classes in ES6+.' },
        { question: 'Object.create(proto) creates?', options: ['A class', 'An object with proto as its prototype', 'A copy of proto', 'A function'], correctIndex: 1, explanation: 'Object.create() creates a new object with the specified prototype.' },
        { question: 'class syntax requires?', options: ['Semicolons after methods', 'new keyword to instantiate', 'return in constructor', 'Explicit prototype assignment'], correctIndex: 1, explanation: 'You must use new to create class instances.' },
        { question: 'toString() in a class?', options: ['Is illegal', 'Can be overridden to customize string representation', 'Only works with numbers', 'Requires calling super.toString()'], correctIndex: 1, explanation: 'Overriding toString() lets you control how the object appears as a string.' },
      ],
    },
    {
      id: 'modules',
      title: 'Modules: import & export',
      explanation: `Modules let you split code across multiple files, keeping your codebase organized.

**Named exports:**
\`\`\`js
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }
\`\`\`

**Default export** (one per file):
\`\`\`js
// greet.js
export default function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

**Importing:**
\`\`\`js
// Named imports
import { add, multiply } from "./math.js";

// Rename during import
import { add as sum } from "./math.js";

// Import all
import * as math from "./math.js";
math.add(1, 2);

// Default import (any name you like)
import greet from "./greet.js";

// Mix
import greet, { PI } from "./combined.js";
\`\`\`

**Module benefits:**
- Encapsulation — each file has its own scope
- Reusability — share code between files
- Maintainability — organized, focused files
- Tree-shaking — bundlers drop unused exports`,
      jsExample: `// Simulating modules with objects in this editor
// (In real projects, you'd use separate .js files with import/export)

// ---- math.js ----
const mathModule = (() => {
  const PI = 3.14159;
  
  function add(a, b) { return a + b; }
  function subtract(a, b) { return a - b; }
  function multiply(a, b) { return a * b; }
  function circle(radius) {
    return { area: PI * radius ** 2, circumference: 2 * PI * radius };
  }
  
  return { PI, add, subtract, multiply, circle };
})();

// ---- utils.js ----
const utilsModule = (() => {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function clamp(n, min, max) {
    return Math.min(Math.max(n, min), max);
  }
  return { capitalize, clamp };
})();

// ---- main.js (using the modules) ----
const { add, multiply, circle, PI } = mathModule;
const { capitalize, clamp } = utilsModule;

console.log("PI:", PI);
console.log("Add:", add(3, 4));
console.log("Multiply:", multiply(6, 7));

const c = circle(5);
console.log(\`Circle area: \${c.area.toFixed(2)}\`);

console.log(capitalize("hello world"));
console.log(clamp(150, 0, 100)); // Clamped to 100`,
      exercises: [
        {
          title: 'Mini module pattern',
          description: 'Create a "stringUtils" module object with methods: reverse(str), isPalindrome(str), and wordCount(str). Test each.',
          hint: 'const stringUtils = { reverse: s => s.split("").reverse().join(""), isPalindrome: s => s === s.split("").reverse().join(""), ... };',
        },
        {
          title: 'Calculator module',
          description: 'Create a calculator module with add, subtract, multiply, divide (throws on /0). Test all operations.',
          hint: 'const calc = { add: (a,b) => a+b, divide: (a,b) => { if(b===0) throw new Error("div by zero"); return a/b; } };',
        },
      ],
      quiz: [
        { question: 'What is a module?', options: ['A class method', 'A separate file with its own scope that can export/import values', 'A global variable', 'A type of loop'], correctIndex: 1, explanation: 'Modules are files with their own scope that explicitly export and import values.' },
        { question: 'How many default exports can a module have?', options: ['Unlimited', '2', '1', '0'], correctIndex: 2, explanation: 'A module can have exactly one default export.' },
        { question: 'How many named exports can a module have?', options: ['1', 'Unlimited', '10', '3'], correctIndex: 1, explanation: 'You can have as many named exports as you need.' },
        { question: 'import * as math from "./math.js" — how do you use add()?', options: ['add()', 'math.add()', 'math::add()', 'import.add()'], correctIndex: 1, explanation: 'Namespace import: prefix with the alias — math.add().' },
        { question: 'Default imports can be named?', options: ['No, must use exact export name', 'Yes, any name you choose', 'Only same as function name', 'Only in TypeScript'], correctIndex: 1, explanation: 'Default imports can use any name: import myFunc from "./file.js".' },
        { question: 'What is tree-shaking?', options: ['Removing comments', 'Bundlers removing unused exported code', 'Sorting imports alphabetically', 'Minifying module names'], correctIndex: 1, explanation: 'Tree-shaking eliminates unused exports from the final bundle.' },
        { question: 'import { add as plus } from "./math.js" — how to use?', options: ['add(1,2)', 'plus(1,2)', 'math.add(1,2)', 'add.plus(1,2)'], correctIndex: 1, explanation: 'The as keyword renames the import — use the new name plus().' },
        { question: 'Modules have?', options: ['Global scope', 'Their own scope (not global)', 'Function scope only', 'No scope'], correctIndex: 1, explanation: 'Each module has its own scope — variables don\'t leak to global.' },
        { question: 'Dynamic import() returns?', options: ['The module directly', 'A Promise resolving to the module', 'undefined', 'A callback'], correctIndex: 1, explanation: 'import("./module.js") is async and returns a Promise.' },
        { question: 'export default class MyClass {} — how to import?', options: ['import { MyClass }', 'import MyClass', 'import { default: MyClass }', 'import as MyClass'], correctIndex: 1, explanation: 'Default exports are imported without curly braces, any name.' },
        { question: 'Re-exporting: export { add } from "./math.js" does?', options: ['Imports add locally', 'Exports add from the current module without importing it', 'Creates a copy of add', 'Error'], correctIndex: 1, explanation: 'Re-exporting passes through exports without needing to use them locally.' },
        { question: 'Are module imports hoisted?', options: ['No', 'Yes — imports are hoisted to the top of the file', 'Only named imports', 'Only default imports'], correctIndex: 1, explanation: 'Module imports are hoisted and resolved before code runs.' },
        { question: 'Can modules have circular dependencies?', options: ['No — error', 'Yes, but can cause issues and is generally avoided', 'Yes, no problems', 'Only in Node.js'], correctIndex: 1, explanation: 'Circular dependencies are technically possible but cause hard-to-debug issues.' },
        { question: 'CommonJS (require/module.exports) vs ES Modules:', options: ['They are identical', 'CommonJS is synchronous (Node); ES Modules are the modern standard', 'ES Modules are for Node only', 'CommonJS is newer'], correctIndex: 1, explanation: 'CommonJS (require) was Node\'s original system; ES Modules (import/export) is the modern standard.' },
        { question: 'What does export { a, b, c } do?', options: ['Imports a, b, c', 'Exports a, b, c as named exports', 'Creates a namespace', 'Removes a, b, c from scope'], correctIndex: 1, explanation: 'export {} exports multiple named bindings at once.' },
        { question: 'type="module" on a script tag does?', options: ['Makes the script async', 'Enables ES Module syntax in the browser', 'Defers execution', 'Both A and C'], correctIndex: 1, explanation: 'type="module" enables import/export in browser scripts (also defers them).' },
        { question: 'Module files in Node.js use extension?', options: ['.mod', '.module', '.mjs or .js (with type:module in package.json)', '.jsm'], correctIndex: 2, explanation: '.mjs or .js with "type":"module" in package.json enables ES Modules in Node.' },
        { question: 'Side-effect import: import "./styles.css" — what does it do?', options: ['Error', 'Imports the file for its side effects (no bindings)', 'Imports all exports', 'Converts CSS to JS'], correctIndex: 1, explanation: 'Side-effect imports run the module without importing any specific exports.' },
        { question: 'Which is a valid named export?', options: ['export default const x = 1', 'export const x = 1', 'module.exports = x', 'exports.x = 1 (CommonJS, not ES Module)'], correctIndex: 1, explanation: 'export const x = 1 is valid ES Module named export syntax.' },
        { question: 'What problem do modules solve?', options: ['Slow JavaScript', 'Global scope pollution and code organization', 'Async operations', 'Type checking'], correctIndex: 1, explanation: 'Modules solve global scope pollution and improve code organization.' },
      ],
    },
    {
      id: 'local-storage',
      title: 'Local Storage & Data Persistence',
      explanation: `**localStorage** lets you save data in the browser that persists across page reloads and browser restarts.

\`\`\`js
// Save data (strings only — use JSON for objects)
localStorage.setItem("username", "Alice");
localStorage.setItem("settings", JSON.stringify({ theme: "dark" }));

// Read data
const name = localStorage.getItem("username"); // "Alice"
const settings = JSON.parse(localStorage.getItem("settings"));

// Delete one item
localStorage.removeItem("username");

// Delete everything
localStorage.clear();

// Check if a key exists
if (localStorage.getItem("token") !== null) { ... }
\`\`\`

**sessionStorage** — same API, but data is cleared when the tab is closed.

**Comparison:**
| | localStorage | sessionStorage | cookies |
|--|--|--|--|
| Expires | Never | Tab close | Set expiry |
| Capacity | ~5MB | ~5MB | ~4KB |
| Sent to server | No | No | Yes |

**Always try/catch** — localStorage can throw if storage is full or in private mode.`,
      jsExample: `// Simulating localStorage with a Map (same API)
const storage = new Map();
const localStorageMock = {
  setItem: (k, v) => storage.set(k, String(v)),
  getItem: (k) => storage.has(k) ? storage.get(k) : null,
  removeItem: (k) => storage.delete(k),
  clear: () => storage.clear(),
};

// Save a user object
const user = { name: "Alice", score: 9800, level: 12 };
localStorageMock.setItem("user", JSON.stringify(user));
localStorageMock.setItem("theme", "dark");
localStorageMock.setItem("lastLogin", new Date().toISOString());

// Read back
const savedUser = JSON.parse(localStorageMock.getItem("user"));
console.log("User:", savedUser.name, "Score:", savedUser.score);
console.log("Theme:", localStorageMock.getItem("theme"));

// Check key existence
const token = localStorageMock.getItem("token");
console.log("Token exists:", token !== null); // false

// Update
savedUser.score += 100;
localStorageMock.setItem("user", JSON.stringify(savedUser));
const updated = JSON.parse(localStorageMock.getItem("user"));
console.log("Updated score:", updated.score);

// Remove
localStorageMock.removeItem("lastLogin");
console.log("After remove:", localStorageMock.getItem("lastLogin")); // null`,
      exercises: [
        {
          title: 'Build a preferences store',
          description: 'Simulate saving/loading user preferences (theme, fontSize, language) to localStorage using JSON.stringify/parse.',
          hint: 'const prefs = { theme: "dark", fontSize: 16, language: "en" }; localStorage.setItem("prefs", JSON.stringify(prefs));',
        },
        {
          title: 'Score persistence',
          description: 'Write functions saveScore(score) and loadScore() using localStorage. If no score saved, return 0.',
          hint: 'function loadScore() { const s = localStorage.getItem("score"); return s ? Number(s) : 0; }',
        },
      ],
      quiz: [
        { question: 'localStorage.setItem("key", value) — value must be?', options: ['An object', 'A string (use JSON.stringify for objects)', 'A number', 'Any type'], correctIndex: 1, explanation: 'localStorage only stores strings. Use JSON.stringify for objects.' },
        { question: 'localStorage.getItem("missing") returns?', options: ['undefined', 'null', '""', 'Error'], correctIndex: 1, explanation: 'getItem returns null for keys that don\'t exist.' },
        { question: 'How do you save an object to localStorage?', options: ['localStorage.setItem("k", object)', 'localStorage.setItem("k", JSON.stringify(object))', 'localStorage.saveObject("k", object)', 'object.save("k")'], correctIndex: 1, explanation: 'Stringify the object first, then parse it back when reading.' },
        { question: 'sessionStorage differs from localStorage how?', options: ['Smaller capacity', 'Clears when the tab/session closes', 'Not available in browsers', 'Requires a server'], correctIndex: 1, explanation: 'sessionStorage is cleared when the browser tab is closed.' },
        { question: 'localStorage.clear() does?', options: ['Clears one item', 'Removes all items from localStorage', 'Refreshes the page', 'Clears session too'], correctIndex: 1, explanation: 'clear() removes all key-value pairs from localStorage.' },
        { question: 'What is the typical localStorage size limit?', options: ['100KB', '1MB', '5MB', '50MB'], correctIndex: 2, explanation: 'Most browsers allow ~5MB per origin for localStorage.' },
        { question: 'Is localStorage sent to the server automatically?', options: ['Yes, with every request', 'No, it stays in the browser', 'Only with fetch', 'Only cookies are sent'], correctIndex: 1, explanation: 'localStorage is only accessible client-side — unlike cookies, it\'s never sent automatically.' },
        { question: 'Cookies vs localStorage — cookies are?', options: ['Larger', 'Sent to server with HTTP requests', 'Never expire', 'Client-only'], correctIndex: 1, explanation: 'Cookies are sent with every HTTP request — useful for server sessions.' },
        { question: 'localStorage is shared between?', options: ['All websites', 'All tabs of the same origin', 'All users of the browser', 'No tabs'], correctIndex: 1, explanation: 'localStorage is scoped to the origin (protocol + domain + port).' },
        { question: 'Why should you wrap localStorage in try/catch?', options: ['It may be slow', 'It throws in private/incognito mode or when storage is full', 'It is async', 'Browser compatibility'], correctIndex: 1, explanation: 'localStorage can throw SecurityError in private mode or when quota is exceeded.' },
        { question: 'How do you count localStorage items?', options: ['localStorage.length', 'localStorage.size', 'localStorage.count()', 'Object.keys(localStorage).count'], correctIndex: 0, explanation: 'localStorage.length gives the number of stored items.' },
        { question: 'localStorage.key(0) returns?', options: ['The first value', 'The first key name', 'null', 'Error'], correctIndex: 1, explanation: 'key(n) returns the nth key name.' },
        { question: 'JSON.parse(localStorage.getItem("missing")) throws?', options: ['Always', 'Yes — JSON.parse(null) throws SyntaxError', 'No, returns null', 'Only sometimes'], correctIndex: 1, explanation: 'JSON.parse(null) throws — always check if getItem returns null first.' },
        { question: 'What type does localStorage.getItem() always return?', options: ['object', 'string or null', 'any', 'undefined or string'], correctIndex: 1, explanation: 'getItem always returns a string if the key exists, or null if not.' },
        { question: 'Which is more secure for sensitive data?', options: ['localStorage', 'sessionStorage', 'Neither — use httpOnly cookies for sensitive data', 'IndexedDB'], correctIndex: 2, explanation: 'localStorage/sessionStorage are accessible to JS — httpOnly cookies are not, safer for tokens.' },
        { question: 'localStorage persists across?', options: ['Only the current tab', 'Only the current session', 'Browser restarts and tab closes', 'Only 24 hours'], correctIndex: 2, explanation: 'localStorage persists until explicitly cleared — survives browser restarts.' },
        { question: 'IndexedDB vs localStorage:', options: ['Same thing', 'IndexedDB supports structured data, larger capacity, and is async', 'localStorage is newer', 'IndexedDB is cookies-based'], correctIndex: 1, explanation: 'IndexedDB is a full browser database with async API and large storage capacity.' },
        { question: 'To iterate all localStorage keys:', options: ['localStorage.forEach()', 'for (let i=0; i < localStorage.length; i++) localStorage.key(i)', 'Object.keys(localStorage)', 'Both B and C'], correctIndex: 3, explanation: 'Both for+key(i) and Object.keys(localStorage) work for iteration.' },
        { question: 'localStorage.setItem("count", 5) — getItem returns?', options: ['5 (number)', '"5" (string)', 'null', 'Error'], correctIndex: 1, explanation: 'localStorage stores 5 as "5" — always a string.' },
        { question: 'Which storage is best for large structured app data?', options: ['localStorage', 'sessionStorage', 'Cookies', 'IndexedDB'], correctIndex: 3, explanation: 'IndexedDB handles large, structured data with transactions and async queries.' },
      ],
    },
    {
      id: 'higher-order-functions',
      title: 'Higher-Order Functions & Functional JS',
      explanation: `**Higher-order functions** accept functions as arguments or return functions. They're a core feature of functional programming in JavaScript.

**Functions as values:**
\`\`\`js
const double = n => n * 2;
const square = n => n * n;

function applyToAll(arr, fn) {
  return arr.map(fn);
}
applyToAll([1,2,3], double);  // [2,4,6]
applyToAll([1,2,3], square);  // [1,4,9]
\`\`\`

**Currying** — breaking a multi-argument function into a chain of single-argument functions:
\`\`\`js
const add = a => b => a + b;
const add5 = add(5); // returns fn that adds 5
add5(3); // 8
\`\`\`

**Composition** — combining functions:
\`\`\`js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
\`\`\`

**Memoization** — caching expensive function results:
\`\`\`js
function memoize(fn) {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    return (cache[key] = fn(...args));
  };
}
\`\`\``,
      jsExample: `// Higher-order functions
function withLogging(fn) {
  return function(...args) {
    console.log(\`Calling \${fn.name} with:\`, args);
    const result = fn(...args);
    console.log(\`Result:\`, result);
    return result;
  };
}

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(3, 4);

// Currying
const multiply = a => b => a * b;
const triple = multiply(3);
const double = multiply(2);
console.log(triple(5)); // 15
console.log(double(7)); // 14

// Pipe — left-to-right composition
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const process = pipe(
  x => x * 2,         // double
  x => x + 10,        // add 10
  x => x.toFixed(2),  // format
);
console.log(process(5)); // "20.00"

// Memoization
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("Cache hit!");
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const slowSquare = n => { return n * n; };
const fastSquare = memoize(slowSquare);
console.log(fastSquare(7));  // 49
console.log(fastSquare(7));  // 49 (cache hit!)
console.log(fastSquare(8));  // 64`,
      exercises: [
        {
          title: 'Create a once() function',
          description: 'Write a once(fn) higher-order function that returns a new function that only calls fn on the first invocation. Subsequent calls return the first result.',
          hint: 'function once(fn) { let called = false, result; return (...args) => { if (!called) { called = true; result = fn(...args); } return result; }; }',
        },
        {
          title: 'Curry an add3 function',
          description: 'Create a curried add3(a)(b)(c) function that adds three numbers. Call it both fully curried and partially applied.',
          hint: 'const add3 = a => b => c => a + b + c; const add5 = add3(2)(3); console.log(add5(10));',
        },
      ],
      quiz: [
        { question: 'What is a higher-order function?', options: ['A fast function', 'A function that takes/returns another function', 'A function with many parameters', 'An async function'], correctIndex: 1, explanation: 'HOFs accept functions as arguments or return functions.' },
        { question: 'Array.map() is a higher-order function because?', options: ['It is fast', 'It takes a callback function as an argument', 'It returns an array', 'It modifies the original'], correctIndex: 1, explanation: 'map() takes a function and applies it to each element.' },
        { question: 'What is currying?', options: ['Composing functions', 'Transforming f(a,b) into f(a)(b)', 'Memoizing a function', 'Partially applying defaults'], correctIndex: 1, explanation: 'Currying transforms a multi-arg function into a chain of single-arg functions.' },
        { question: 'const add = a => b => a + b; add(3)(4) returns?', options: ['a => a + 3', '7', 'Error', '34'], correctIndex: 1, explanation: 'add(3) returns b => 3 + b; calling that with 4 gives 7.' },
        { question: 'Function composition combines functions:', options: ['Side by side', 'The output of one becomes the input of the next', 'In parallel', 'Randomly'], correctIndex: 1, explanation: 'Composition chains functions: compose(f, g)(x) = f(g(x)).' },
        { question: 'What is a closure?', options: ['A function that closes over its outer scope variables', 'A class with private members', 'An immediately invoked function', 'A function with no return'], correctIndex: 0, explanation: 'Closures remember their outer scope variables even after the outer function returns.' },
        { question: 'Memoization trades?', options: ['Speed for accuracy', 'Memory for speed (caches results)', 'Complexity for simplicity', 'Space for correctness'], correctIndex: 1, explanation: 'Memoization stores results to avoid recomputation — trades memory for speed.' },
        { question: 'Partial application vs currying:', options: ['Identical', 'Partial application fixes some args; currying transforms to chain of 1-arg fns', 'Currying fixes args; partial transforms signature', 'No difference in practice'], correctIndex: 1, explanation: 'Partial application pre-fills some arguments; currying always produces 1-arg chains.' },
        { question: 'What does Array.reduce(fn, init) do?', options: ['Filters an array', 'Transforms each element', 'Accumulates all elements into one value', 'Finds an element'], correctIndex: 2, explanation: 'reduce() folds all elements into a single accumulated value.' },
        { question: 'Pure functions always?', options: ['Return undefined', 'Return the same output for the same input, no side effects', 'Use global variables', 'Are async'], correctIndex: 1, explanation: 'Pure functions: same input → same output, no side effects.' },
        { question: 'What is a side effect?', options: ['A fast function', 'Anything a function does beyond returning a value (logging, mutation, etc.)', 'An error', 'A default parameter'], correctIndex: 1, explanation: 'Side effects include I/O, mutation, network calls — anything beyond the return value.' },
        { question: 'Immutability means?', options: ['Variables cannot be declared', 'Data is not changed after creation; modifications create new copies', 'Functions cannot be changed', 'All const variables'], correctIndex: 1, explanation: 'Immutability avoids mutating data — create new values instead of modifying existing ones.' },
        { question: 'Which is NOT a functional programming principle?', options: ['Pure functions', 'Immutability', 'Shared mutable state', 'Function composition'], correctIndex: 2, explanation: 'Functional programming avoids shared mutable state.' },
        { question: 'Array.flatMap(fn) is equivalent to?', options: ['.map(fn)', '.flat()', '.map(fn).flat(1)', '.filter(fn)'], correctIndex: 2, explanation: 'flatMap maps and then flattens one level deep.' },
        { question: 'const double = fn => x => fn(x) * 2; — what does double do?', options: ['Doubles a number', 'Wraps a function, doubling its result', 'Returns a function', 'Both B and C'], correctIndex: 3, explanation: 'double is a HOF that takes fn and returns a new function doubling fn\'s output.' },
        { question: 'Which method is best for transforming an array without mutation?', options: ['forEach', 'map', 'push', 'splice'], correctIndex: 1, explanation: 'map() returns a new array without modifying the original.' },
        { question: 'Function composition is associative: f∘(g∘h) === (f∘g)∘h?', options: ['False', 'True', 'Only for pure functions', 'Only for numbers'], correctIndex: 1, explanation: 'Function composition is associative — grouping doesn\'t change the result.' },
        { question: 'Lazy evaluation means?', options: ['Slow functions', 'Deferring computation until the result is needed', 'Memoizing everything', 'Using generators'], correctIndex: 1, explanation: 'Lazy evaluation delays computation — generators enable lazy sequences in JS.' },
        { question: 'What is a thunk?', options: ['A type of callback', 'A function that delays computation by wrapping a value', 'An arrow function', 'A curried function'], correctIndex: 1, explanation: 'A thunk is () => value — delays evaluation until called.' },
        { question: 'Array.filter followed by .map is equivalent to?', options: ['.reduce() with conditional push', '.flatMap()', '.forEach()', '.some()'], correctIndex: 0, explanation: 'A single reduce can filter and transform in one pass, avoiding creating an intermediate array.' },
      ],
    },
    {
      id: 'regex',
      title: 'Regular Expressions',
      explanation: `**Regular expressions (regex)** are patterns for matching, searching, and replacing text.

**Creating regex:**
\`\`\`js
const pattern = /hello/;        // literal
const dynamic = new RegExp("hello"); // constructor
\`\`\`

**Flags:**
- \`i\` — case insensitive
- \`g\` — global (find all matches)
- \`m\` — multiline
- \`s\` — dot matches newlines

**Core methods:**
\`\`\`js
/pattern/.test("string")     // true/false
"string".match(/pattern/g)   // array of matches
"string".replace(/old/g, "new")
"string".split(/delimiter/)
\`\`\`

**Common patterns:**
| Pattern | Matches |
|---------|---------|
| \`\\d\` | digit (0-9) |
| \`\\w\` | word char (a-z, A-Z, 0-9, _) |
| \`\\s\` | whitespace |
| \`.\` | any char except newline |
| \`^\` | start of string |
| \`$\` | end of string |
| \`*\` | 0 or more |
| \`+\` | 1 or more |
| \`?\` | 0 or 1 (optional) |
| \`{n,m}\` | between n and m |
| \`[abc]\` | any of a, b, c |`,
      jsExample: `// Test if a pattern matches
console.log(/\\d+/.test("abc123"));      // true (has digits)
console.log(/^\\d+$/.test("12345"));    // true (only digits)
console.log(/^\\d+$/.test("123ab"));    // false

// Email validation (simplified)
const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
console.log(emailRegex.test("user@example.com"));  // true
console.log(emailRegex.test("not-an-email"));       // false

// Find all matches
const text = "Call 555-1234 or 555-5678 for info";
const phones = text.match(/\\d{3}-\\d{4}/g);
console.log("Phones:", phones); // ["555-1234", "555-5678"]

// Replace with regex
const messy = "  hello   world  ";
console.log(messy.replace(/\\s+/g, " ").trim()); // "hello world"

// Capture groups
const date = "2024-01-15";
const match = date.match(/(\\d{4})-(\\d{2})-(\\d{2})/);
if (match) {
  const [, year, month, day] = match;
  console.log(\`Year: \${year}, Month: \${month}, Day: \${day}\`);
}

// Extract all words
const sentence = "The quick brown fox";
const words = sentence.match(/\\w+/g);
console.log(words); // ["The","quick","brown","fox"]`,
      exercises: [
        {
          title: 'Validate a username',
          description: 'Write a regex that validates a username: 3-16 characters, only letters, numbers, and underscores.',
          hint: 'const usernameRegex = /^\\w{3,16}$/; console.log(usernameRegex.test("alice_123"));',
        },
        {
          title: 'Extract hashtags',
          description: 'Given the string "I love #JavaScript and #coding!", extract all hashtags into an array.',
          hint: 'const tags = str.match(/#\\w+/g);',
        },
      ],
      quiz: [
        { question: 'What does /pattern/.test("string") return?', options: ['The match', 'true or false', 'The index', 'An array'], correctIndex: 1, explanation: 'test() returns a boolean — true if the pattern matches.' },
        { question: 'What does the g flag do?', options: ['Case insensitive', 'Global — finds all matches', 'Multiline', 'Greedy matching'], correctIndex: 1, explanation: 'g flag makes match/replace find all occurrences, not just the first.' },
        { question: '\\d matches?', options: ['Any character', 'Whitespace', 'Any digit 0-9', 'A dot'], correctIndex: 2, explanation: '\\d is shorthand for [0-9] — matches digits.' },
        { question: '\\w matches?', options: ['Whitespace', 'Word characters: letters, digits, underscore', 'Only words', 'HTML tags'], correctIndex: 1, explanation: '\\w matches [a-zA-Z0-9_].' },
        { question: '^ in a regex means?', options: ['Not', 'Start of string', 'End of string', 'Any character'], correctIndex: 1, explanation: '^ anchors the pattern to the start of the string.' },
        { question: '$ in a regex means?', options: ['Dollar sign', 'End of string', 'Start of string', 'Optional'], correctIndex: 1, explanation: '$ anchors the pattern to the end of the string.' },
        { question: '/\\d+/ matches?', options: ['One digit', 'Zero or more digits', 'One or more digits', 'Exactly two digits'], correctIndex: 2, explanation: '+ means one or more of the preceding pattern.' },
        { question: 'The i flag makes a regex?', options: ['Global', 'Multiline', 'Case insensitive', 'Lazy'], correctIndex: 2, explanation: 'i flag = case insensitive matching.' },
        { question: '"hello world".replace(/\\s/g, "_") returns?', options: ['"hello_world"', '"hello world"', '"hello__world"', 'Error'], correctIndex: 0, explanation: '\\s matches whitespace; g replaces all occurrences → "hello_world".' },
        { question: 'Capture groups use?', options: ['[]', '{}', '()', '<>'], correctIndex: 2, explanation: 'Parentheses () create capture groups.' },
        { question: '/^[0-9]{4}$/.test("2024") returns?', options: ['false', 'true', 'Error', '"2024"'], correctIndex: 1, explanation: 'Exactly 4 digits, anchored start to end — "2024" matches.' },
        { question: 'What does ? mean in regex?', options: ['One or more', 'Zero or more', 'Zero or one (optional)', 'Any character'], correctIndex: 2, explanation: '? makes the preceding element optional (0 or 1 occurrences).' },
        { question: 'What does . match in regex?', options: ['A literal dot', 'Any character except newline', 'A digit', 'Whitespace'], correctIndex: 1, explanation: '. matches any single character except newline (use \\. to match a literal dot).' },
        { question: '"abc123".match(/\\d+/) returns?', options: ['true', '["123"]', '"123"', '3'], correctIndex: 1, explanation: 'match() returns an array of matches: ["123"].' },
        { question: '[a-z] matches?', options: ['Only "a", "z"', 'Any lowercase letter a through z', 'Any character', 'Array'], correctIndex: 1, explanation: '[a-z] is a character class matching any lowercase letter.' },
        { question: 'Greedy vs lazy quantifiers: + vs +?', options: ['No difference', 'Greedy (+) matches as much as possible; lazy (+?) as little', 'Lazy is faster', 'Greedy is for strings'], correctIndex: 1, explanation: 'Greedy quantifiers match as much as possible; lazy (+?) match as little as possible.' },
        { question: 'new RegExp("\\\\d+") creates?', options: ['Error', 'A regex matching one or more digits', 'A regex matching backslash-d', 'A string'], correctIndex: 1, explanation: 'In RegExp constructor strings, \\\\ becomes \\, so "\\\\d" = \\d in the pattern.' },
        { question: 'What is a non-capturing group?', options: ['[]', '(?:...)', '(.*?)', '(?=...)'], correctIndex: 1, explanation: '(?:...) groups without creating a capture — useful for alternation.' },
        { question: 'Lookahead (?=...) checks?', options: ['What came before', 'What comes after without consuming', 'Case insensitivity', 'Greedy mode'], correctIndex: 1, explanation: 'Positive lookahead asserts what follows the current position without consuming characters.' },
        { question: '"color colour".match(/colou?r/g) returns?', options: ['["color"]', '["colour"]', '["color","colour"]', 'null'], correctIndex: 2, explanation: 'u? makes "u" optional — matches both "color" and "colour".' },
      ],
    },
  ],
};
