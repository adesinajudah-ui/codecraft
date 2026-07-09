import { Lesson } from '../types';

export const lesson5: Lesson = {
  id: 'lesson5',
  title: 'JavaScript in Practice',
  topics: [
    {
      id: 'array-methods-advanced',
      title: 'Advanced Array Methods',
      explanation: `Beyond map/filter/reduce, JavaScript arrays have powerful methods for every use case.

**Transformation:**
\`\`\`js
arr.flat(depth)          // flatten nested arrays
arr.flatMap(fn)          // map then flatten
arr.from(iterable)       // create array from iterable
Array.from({length:5}, (_,i) => i) // [0,1,2,3,4]
\`\`\`

**Search:**
\`\`\`js
arr.find(fn)             // first matching element
arr.findIndex(fn)        // index of first match
arr.some(fn)             // true if any match
arr.every(fn)            // true if all match
\`\`\`

**Sorting:**
\`\`\`js
arr.sort((a, b) => a - b)  // ascending numbers
arr.sort((a, b) => b - a)  // descending
arr.sort((a, b) => a.name.localeCompare(b.name)) // by string
\`\`\`

**Grouping (ES2024):**
\`\`\`js
Object.groupBy(users, u => u.role)
\`\`\`

**Key patterns:**
\`\`\`js
// Deduplicate
[...new Set(arr)]

// Chunk array into groups of n
const chunk = (arr, n) => 
  Array.from({length: Math.ceil(arr.length/n)}, (_, i) => arr.slice(i*n, i*n+n));

// Zip two arrays
const zip = (a, b) => a.map((v, i) => [v, b[i]]);
\`\`\``,
      jsExample: `const students = [
  { name: "Alice", grade: 92, subject: "Math" },
  { name: "Bob", grade: 78, subject: "Science" },
  { name: "Carol", grade: 85, subject: "Math" },
  { name: "Dave", grade: 95, subject: "Science" },
  { name: "Eve", grade: 67, subject: "Math" },
];

// Sort by grade descending
const ranked = [...students].sort((a, b) => b.grade - a.grade);
console.log("Top student:", ranked[0].name); // Dave

// Find first with grade < 80
const struggling = students.find(s => s.grade < 80);
console.log("Needs help:", struggling?.name); // Bob

// Check if everyone passed (>= 60)
console.log("All pass:", students.every(s => s.grade >= 60)); // true

// Any A grade (>= 90)?
console.log("Has A grade:", students.some(s => s.grade >= 90)); // true

// Average grade
const avg = students.reduce((sum, s) => sum + s.grade, 0) / students.length;
console.log("Average:", avg.toFixed(1));

// Group by subject
const bySubject = students.reduce((groups, s) => {
  const key = s.subject;
  groups[key] = groups[key] || [];
  groups[key].push(s.name);
  return groups;
}, {});
console.log("Math students:", bySubject.Math);

// Flatten nested data
const matrix = [[1,2,3],[4,5,6],[7,8,9]];
console.log("Flat:", matrix.flat());

// Generate sequence
const sequence = Array.from({length: 10}, (_, i) => (i + 1) * 2);
console.log("Evens:", sequence); // [2,4,6,...,20]`,
      exercises: [
        {
          title: 'Leaderboard',
          description: 'Given a scores array [{name, score}], sort by score descending and log the top 3 names with their ranks.',
          hint: 'const top3 = scores.sort((a,b) => b.score - a.score).slice(0,3); top3.forEach((s,i) => console.log(`#${i+1}: ${s.name}`));',
        },
        {
          title: 'Statistics',
          description: 'Given an array of numbers, use reduce to compute min, max, sum, and average all in one pass.',
          hint: 'const stats = nums.reduce((acc, n) => ({ min: Math.min(acc.min,n), max: Math.max(acc.max,n), sum: acc.sum+n, count: acc.count+1 }), {min:Infinity,max:-Infinity,sum:0,count:0});',
        },
      ],
      quiz: [
        { question: '[[1,2],[3,4]].flat() returns?', options: ['[[1,2],[3,4]]', '[1,2,3,4]', '[1,[2,3],4]', 'Error'], correctIndex: 1, explanation: 'flat() flattens one level: [[1,2],[3,4]] → [1,2,3,4].' },
        { question: 'flatMap(fn) is equivalent to?', options: ['.flat()', '.map(fn).flat(1)', '.filter(fn)', '.reduce(fn)'], correctIndex: 1, explanation: 'flatMap maps then flattens one level.' },
        { question: '[1,2,2,3,3].filter((v,i,a) => a.indexOf(v)===i) returns?', options: ['[1,2,3]', '[2,3]', '[1,2,2,3,3]', 'Error'], correctIndex: 0, explanation: 'This is a deduplication pattern — only keeps first occurrence of each value.' },
        { question: '[...new Set([1,2,2,3])] returns?', options: ['[1,2,3]', '[1,2,2,3]', 'Set{1,2,3}', 'Error'], correctIndex: 0, explanation: 'Set removes duplicates; spread converts back to array.' },
        { question: 'arr.findIndex(fn) returns?', options: ['The matching element', 'The index of the first match, or -1', 'true/false', 'All matching indices'], correctIndex: 1, explanation: 'findIndex returns the index of the first matching element, or -1.' },
        { question: 'arr.every(n => n > 0) on [1,2,-3] returns?', options: ['true', 'false', 'undefined', 'Error'], correctIndex: 1, explanation: '-3 > 0 is false, so every() returns false.' },
        { question: 'arr.some(n => n > 10) on [1,5,15] returns?', options: ['false', 'true', 'undefined', '15'], correctIndex: 1, explanation: '15 > 10 is true, so some() returns true.' },
        { question: 'arr.sort() without comparator sorts?', options: ['By number value', 'Lexicographically as strings', 'By insertion order', 'Randomly'], correctIndex: 1, explanation: 'Default sort converts to strings — [10,2,1] becomes [1,10,2].' },
        { question: 'arr.sort((a,b) => a-b) sorts?', options: ['Descending', 'Ascending numerically', 'By string', 'Randomly'], correctIndex: 1, explanation: 'a-b returns negative when a < b, putting a first — ascending order.' },
        { question: 'Array.from("hello") returns?', options: ['["hello"]', '["h","e","l","l","o"]', 'Error', '"hello"'], correctIndex: 1, explanation: 'Array.from converts an iterable like a string to an array of characters.' },
        { question: 'Array.from({length:3}, (_,i)=>i*2) returns?', options: ['[0,1,2]', '[0,2,4]', '[2,4,6]', '[1,2,3]'], correctIndex: 1, explanation: 'The factory function is called with (undefined, index): i*2 gives [0,2,4].' },
        { question: 'Which method does NOT return a new array?', options: ['map', 'filter', 'forEach', 'flatMap'], correctIndex: 2, explanation: 'forEach always returns undefined — it is for side effects only.' },
        { question: 'What does reduce\'s accumulator do?', options: ['Tracks the current index', 'Carries the accumulated result between iterations', 'Filters elements', 'Stores the last element'], correctIndex: 1, explanation: 'The accumulator holds the running result passed from one iteration to the next.' },
        { question: 'arr.includes(NaN) can find NaN?', options: ['No, NaN !== NaN', 'Yes, includes uses SameValueZero', 'Only with === check', 'Only with indexOf'], correctIndex: 1, explanation: 'includes() uses SameValueZero, which treats NaN as equal to NaN.' },
        { question: 'arr.indexOf(NaN) returns?', options: ['0', '-1 (indexOf uses strict equality, NaN !== NaN)', 'The index', 'Error'], correctIndex: 1, explanation: 'indexOf uses ===; since NaN !== NaN, it always returns -1.' },
        { question: 'Chunk [1,2,3,4,5] into pairs — result?', options: ['[[1,2],[3,4],[5]]', '[[1],[2],[3],[4],[5]]', '[[1,2,3],[4,5]]', '[[1,2,3,4,5]]'], correctIndex: 0, explanation: 'Chunking by 2: [[1,2],[3,4],[5]] — last chunk may be shorter.' },
        { question: 'arr.reduceRight() vs arr.reduce():', options: ['Identical', 'reduceRight processes from right to left', 'reduceRight returns a reversed array', 'reduceRight is async'], correctIndex: 1, explanation: 'reduceRight iterates from the last element to the first.' },
        { question: 'To sort objects by a string property:', options: ['arr.sort()', 'arr.sort((a,b) => a.name - b.name)', 'arr.sort((a,b) => a.name.localeCompare(b.name))', 'arr.sort((a,b) => a.name > b.name)'], correctIndex: 2, explanation: 'localeCompare is correct for string comparison — the minus operator would give NaN.' },
        { question: 'What is a stable sort?', options: ['A sort that never throws', 'A sort that preserves relative order of equal elements', 'A sort with no comparator', 'A numeric sort'], correctIndex: 1, explanation: 'Stable sort preserves the original order of elements that compare as equal.' },
        { question: 'Array.isArray([]) returns?', options: ['false', 'true', '"array"', 'typeof []'], correctIndex: 1, explanation: 'Array.isArray() is the reliable way to check if something is an array.' },
      ],
    },
    {
      id: 'generators-iterators',
      title: 'Generators & Iterators',
      explanation: `**Iterators** define a sequence — any object with a \`next()\` method returning \`{value, done}\`.

**Generators** are special functions that can pause (yield) and resume — perfect for lazy sequences, infinite data, or custom iteration.

\`\`\`js
function* counter(start = 0) {
  while (true) {
    yield start++;  // pauses here each time
  }
}

const c = counter(1);
c.next(); // { value: 1, done: false }
c.next(); // { value: 2, done: false }
\`\`\`

**Finite generator:**
\`\`\`js
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}
// Use with for...of:
for (const n of range(0, 10, 2)) {
  console.log(n); // 0, 2, 4, 6, 8
}
\`\`\`

**Generator delegation with yield*:**
\`\`\`js
function* combined() {
  yield* range(0, 3);
  yield* range(10, 13);
}
// yields 0, 1, 2, 10, 11, 12
\`\`\`

Generators enable **lazy evaluation** — values are computed only when requested.`,
      jsExample: `// Infinite ID generator
function* idGenerator(prefix = "item") {
  let id = 1;
  while (true) {
    yield \`\${prefix}-\${String(id++).padStart(3, "0")}\`;
  }
}

const ids = idGenerator("user");
console.log(ids.next().value); // "user-001"
console.log(ids.next().value); // "user-002"
console.log(ids.next().value); // "user-003"

// Range generator
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

// Use with for...of
const evens = [];
for (const n of range(2, 12, 2)) {
  evens.push(n);
}
console.log("Evens:", evens); // [2,4,6,8,10]

// Spread a generator
console.log([...range(1, 6)]); // [1,2,3,4,5]

// Fibonacci generator (infinite)
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
const first10 = Array.from({length: 10}, () => fib.next().value);
console.log("Fibonacci:", first10);`,
      exercises: [
        {
          title: 'Prime number generator',
          description: 'Write a generator that yields the first N prime numbers. Use it to get the first 10 primes.',
          hint: 'function* primes() { ... yield n if n is prime; } const p = primes(); const first10 = Array.from({length:10}, () => p.next().value);',
        },
        {
          title: 'Custom range',
          description: 'Create a range generator that takes (start, end, step) and yields values. Test with range(0, 1, 0.1) for a decimal sequence.',
          hint: 'function* range(start, end, step=1) { for(let i=start; i<end; i+=step) yield +i.toFixed(10); }',
        },
      ],
      quiz: [
        { question: 'What keyword defines a generator function?', options: ['async function', 'function*', 'generator function', 'yield function'], correctIndex: 1, explanation: 'function* (with asterisk) creates a generator function.' },
        { question: 'What does yield do?', options: ['Returns from the function permanently', 'Pauses the generator and returns a value', 'Throws an error', 'Ends the generator'], correctIndex: 1, explanation: 'yield pauses execution, returning the value, until next() is called again.' },
        { question: 'generator.next() returns?', options: ['The yielded value', '{ value, done }', 'A Promise', 'undefined'], correctIndex: 1, explanation: 'next() returns an object with the yielded value and a done boolean.' },
        { question: 'When is done: true?', options: ['After first yield', 'When the generator function returns', 'After 10 next() calls', 'Never'], correctIndex: 1, explanation: 'done becomes true when the generator function body completes (reaches return or end).' },
        { question: 'Can you iterate a generator with for...of?', options: ['No', 'Yes', 'Only finite generators', 'Only in ES2018+'], correctIndex: 1, explanation: 'Generators implement the iterable protocol and work with for...of.' },
        { question: 'What is lazy evaluation?', options: ['Slow computation', 'Computing values only when needed', 'Caching all values', 'Async computation'], correctIndex: 1, explanation: 'Generators are lazy — they compute values only when next() is called.' },
        { question: 'yield* otherGenerator does?', options: ['Skips the other generator', 'Delegates to and yields all values from another generator', 'Creates a copy', 'Runs both simultaneously'], correctIndex: 1, explanation: 'yield* delegates to another iterable/generator.' },
        { question: 'Can an infinite generator cause memory issues?', options: ['Yes, always', 'No, generators are lazy — values are not all stored at once', 'Only with numbers', 'Only with objects'], correctIndex: 1, explanation: 'Generators produce values on demand without storing all at once.' },
        { question: '[...range(1,4)] where range is a generator returns?', options: ['Error', '[1,2,3]', '[1,2,3,4]', 'A generator object'], correctIndex: 1, explanation: 'Spread collects all yielded values from the generator.' },
        { question: 'What is an iterator protocol?', options: ['An HTTP protocol', 'An object with a next() method returning {value, done}', 'A for loop type', 'A generator keyword'], correctIndex: 1, explanation: 'The iterator protocol defines objects with next() → {value, done}.' },
        { question: 'An iterable has which method?', options: ['[Symbol.next]()', '[Symbol.iterator]()', '.iterate()', '.forEach()'], correctIndex: 1, explanation: '[Symbol.iterator]() returns an iterator — arrays, strings, Maps, Sets all implement this.' },
        { question: 'Generators can receive values via?', options: ['yield', 'next(value)', 'return(value)', 'Both B and C'], correctIndex: 3, explanation: 'next(value) sends a value into the generator (as the result of yield); return() terminates it.' },
        { question: 'What does generator.return(val) do?', options: ['Yields val', 'Terminates the generator and returns {value: val, done: true}', 'Restarts the generator', 'Sets the initial value'], correctIndex: 1, explanation: 'return() forces the generator to finish with the given value.' },
        { question: 'Async generators use?', options: ['async function*', 'function* async', 'async yield*', 'Promise.generator'], correctIndex: 0, explanation: 'async function* creates an async generator that works with for await...of.' },
        { question: 'for await...of is used with?', options: ['Regular generators', 'Async generators and async iterables', 'Promises only', 'Arrays only'], correctIndex: 1, explanation: 'for await...of iterates over async iterables and async generators.' },
        { question: 'Which built-in uses the iterator protocol?', options: ['typeof', 'parseInt', 'for...of', 'typeof'], correctIndex: 2, explanation: 'for...of uses the iterator protocol — it works with any iterable.' },
        { question: 'Generators vs async/await — generators came?', options: ['After async/await', 'Before async/await and were used to implement async patterns', 'At the same time', 'Generators replace async/await'], correctIndex: 1, explanation: 'Generators (ES2015) predated async/await (ES2017) and were used for async patterns with co.' },
        { question: 'function* f() { return 42; } — what does f().next() return?', options: ['42', '{ value: 42, done: true }', '{ value: 42, done: false }', 'undefined'], correctIndex: 1, explanation: 'return in a generator gives {value: returnValue, done: true}.' },
        { question: 'Can you use yield outside a generator?', options: ['Yes', 'No — SyntaxError', 'Only in async functions', 'Only inside loops'], correctIndex: 1, explanation: 'yield can only be used inside a generator function body.' },
        { question: 'What is a major use case for generators?', options: ['DOM manipulation', 'Infinite sequences and custom iteration without precomputing all values', 'String formatting', 'HTTP requests'], correctIndex: 1, explanation: 'Generators excel at lazy sequences, custom iterators, and infinite data streams.' },
      ],
    },
    {
      id: 'design-patterns',
      title: 'Design Patterns in JavaScript',
      explanation: `**Design patterns** are proven solutions to common programming problems.

**Singleton** — ensure only one instance:
\`\`\`js
const AppState = (() => {
  let instance;
  return {
    getInstance: () => instance || (instance = { count: 0 })
  };
})();
\`\`\`

**Observer / PubSub** — subscribe to events:
\`\`\`js
class EventEmitter {
  #events = {};
  on(event, fn) { (this.#events[event] ||= []).push(fn); }
  emit(event, data) { (this.#events[event] || []).forEach(fn => fn(data)); }
  off(event, fn) { this.#events[event] = this.#events[event]?.filter(f => f !== fn); }
}
\`\`\`

**Factory** — create objects without specifying exact class:
\`\`\`js
function createAnimal(type) {
  const types = { dog: Dog, cat: Cat, bird: Bird };
  return new (types[type] || Animal)();
}
\`\`\`

**Decorator** — add behavior without modifying original:
\`\`\`js
function withTimestamp(fn) {
  return (...args) => ({ result: fn(...args), timestamp: Date.now() });
}
\`\`\`

**Strategy** — swap algorithms at runtime:
\`\`\`js
const sorters = {
  bubble: arr => bubbleSort([...arr]),
  quick: arr => quickSort([...arr]),
};
\`\`\``,
      jsExample: `// Observer / PubSub pattern
class EventEmitter {
  #events = {};
  
  on(event, listener) {
    if (!this.#events[event]) this.#events[event] = [];
    this.#events[event].push(listener);
    return this; // enable chaining
  }
  
  emit(event, data) {
    (this.#events[event] || []).forEach(fn => fn(data));
    return this;
  }
  
  off(event, listener) {
    this.#events[event] = (this.#events[event] || []).filter(fn => fn !== listener);
    return this;
  }
  
  once(event, listener) {
    const wrapper = (data) => { listener(data); this.off(event, wrapper); };
    return this.on(event, wrapper);
  }
}

// Usage
const emitter = new EventEmitter();

emitter.on("login", user => console.log(\`User logged in: \${user.name}\`));
emitter.on("login", user => console.log(\`Sending welcome email to: \${user.email}\`));

emitter.once("firstVisit", () => console.log("Welcome! First time here!"));

emitter.emit("login", { name: "Alice", email: "alice@example.com" });
emitter.emit("firstVisit");
emitter.emit("firstVisit"); // once — does nothing now

console.log("---");

// Strategy pattern
const validators = {
  email: v => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v),
  minLength: min => v => v.length >= min,
  maxLength: max => v => v.length <= max,
  numeric: v => /^\\d+$/.test(v),
};

function validate(value, rules) {
  return rules.every(rule => rule(value));
}

console.log(validate("alice@ex.com", [validators.email]));
console.log(validate("hi", [validators.minLength(5)]));
console.log(validate("alice@ex.com", [validators.email, validators.maxLength(50)]));`,
      exercises: [
        {
          title: 'Build a simple store (Observer)',
          description: 'Create a State class that holds a value. It should have subscribe(fn), setState(val), and getState() methods. Subscribers should be called on every setState.',
          hint: 'class State { #value; #subs = []; setState(v) { this.#value = v; this.#subs.forEach(fn => fn(v)); } }',
        },
        {
          title: 'Plugin factory',
          description: 'Write a createPlugin(type) factory that returns different plugin objects ("logger", "analytics", "auth") each with an init() and destroy() method.',
          hint: 'function createPlugin(type) { const plugins = { logger: { init() { console.log("Logger init"); }, destroy() {...} }, ... }; return plugins[type]; }',
        },
      ],
      quiz: [
        { question: 'What is a design pattern?', options: ['A CSS layout technique', 'A proven reusable solution to a common programming problem', 'A type of variable', 'A JavaScript keyword'], correctIndex: 1, explanation: 'Design patterns are proven, reusable solutions to recurring programming problems.' },
        { question: 'The Singleton pattern ensures?', options: ['Many instances', 'Exactly one instance of a class', 'Fast creation', 'Private methods'], correctIndex: 1, explanation: 'Singleton restricts instantiation to a single object.' },
        { question: 'The Observer pattern involves?', options: ['One object controlling many', 'Subjects that notify subscribers on state change', 'Factory function', 'Recursive calls'], correctIndex: 1, explanation: 'Observer: subjects notify all registered observers when state changes.' },
        { question: 'PubSub stands for?', options: ['Public/Subject', 'Publish/Subscribe', 'Push/Submit', 'Process/Synchronize'], correctIndex: 1, explanation: 'PubSub (Publish-Subscribe) is a messaging pattern where publishers emit events and subscribers listen.' },
        { question: 'The Factory pattern does?', options: ['Merges objects', 'Creates objects without specifying exact class', 'Singleton pattern', 'Implements inheritance'], correctIndex: 1, explanation: 'Factory abstracts object creation, decoupling the caller from specific classes.' },
        { question: 'The Decorator pattern?', options: ['Creates subclasses', 'Wraps a function/object to add behavior without changing original', 'Replaces a function', 'Creates new instances'], correctIndex: 1, explanation: 'Decorators add functionality by wrapping — not modifying — the original.' },
        { question: 'The Strategy pattern allows?', options: ['Creating many instances', 'Swapping algorithms at runtime behind a common interface', 'Event handling', 'Lazy loading'], correctIndex: 1, explanation: 'Strategy defines a family of algorithms and makes them interchangeable.' },
        { question: 'IIFE stands for?', options: ['Immediately Invoked Function Expression', 'Internal Interface For Events', 'Iterable If Function Exists', 'Inherited Interface'], correctIndex: 0, explanation: 'IIFE: (() => { ... })() — runs immediately after definition.' },
        { question: 'What is the Module pattern?', options: ['ES6 import/export', 'Using IIFE to create private scope and public interface', 'A design library', 'Only for Node.js'], correctIndex: 1, explanation: 'The module pattern uses IIFEs to encapsulate private state and expose a public API.' },
        { question: 'The Proxy pattern?', options: ['Creates copies', 'Controls access to another object', 'Singleton variant', 'Async wrapper'], correctIndex: 1, explanation: 'Proxy intercepts operations (get, set) on an object.' },
        { question: 'JavaScript\'s Proxy object implements?', options: ['Singleton pattern', 'The Proxy design pattern natively', 'Factory pattern', 'Observer pattern'], correctIndex: 1, explanation: 'JS Proxy is a native implementation of the Proxy/interceptor pattern.' },
        { question: 'Command pattern?', options: ['Directly calls functions', 'Encapsulates operations as objects (with execute/undo)', 'Factory for commands', 'Async pattern'], correctIndex: 1, explanation: 'Command wraps operations as objects — enables undo/redo, queuing, and logging.' },
        { question: 'What is the DRY principle?', options: ['Delete Redundant Yield', 'Don\'t Repeat Yourself — avoid code duplication', 'Dynamic Runtime Yielding', 'Declarative Rendering Yield'], correctIndex: 1, explanation: 'DRY: Don\'t Repeat Yourself — each piece of knowledge should exist once.' },
        { question: 'SOLID principles — S stands for?', options: ['Simple', 'Single Responsibility Principle', 'Static', 'Singleton'], correctIndex: 1, explanation: 'S = Single Responsibility: a class/function should have one reason to change.' },
        { question: 'What is separation of concerns?', options: ['One file for all code', 'Dividing code into distinct sections, each handling one concern', 'Design patterns only', 'CSS modules'], correctIndex: 1, explanation: 'Separation of concerns keeps different responsibilities in separate, focused modules.' },
        { question: 'Mixin pattern?', options: ['Single inheritance', 'Adding methods from multiple source objects to a class', 'Private methods', 'Factory pattern'], correctIndex: 1, explanation: 'Mixins add methods from multiple sources — a way to compose behavior without inheritance.' },
        { question: 'What is tight coupling?', options: ['Fast code', 'Components heavily dependent on each other\'s implementation details', 'Good design', 'Strong typing'], correctIndex: 1, explanation: 'Tight coupling makes components hard to change or test independently.' },
        { question: 'Dependency injection means?', options: ['Importing modules', 'Providing dependencies from outside rather than creating them internally', 'Singleton services', 'Factory methods'], correctIndex: 1, explanation: 'DI passes dependencies in (constructor params, arguments) rather than hardcoding them.' },
        { question: 'The Mediator pattern?', options: ['Direct communication between objects', 'A central object that manages communication between other objects', 'Factory with state', 'Event bubbling'], correctIndex: 1, explanation: 'Mediator centralizes communication — reduces direct dependencies between components.' },
        { question: 'Which pattern does React\'s useState hook most resemble?', options: ['Singleton', 'Factory', 'Observer (state notifies component to re-render)', 'Proxy'], correctIndex: 2, explanation: 'useState/state management resembles Observer — state changes trigger subscriber re-renders.' },
      ],
    },
    {
      id: 'performance-best-practices',
      title: 'Performance & Best Practices',
      explanation: `Writing fast, clean JavaScript is a skill. Here are the most impactful principles:

**Code quality:**
- Use \`const\` by default, \`let\` when needed, never \`var\`
- Always use strict equality (\`===\`)
- Handle errors — wrap I/O and parsing in try/catch
- Write pure functions where possible
- Keep functions small and focused (Single Responsibility)

**Performance:**
\`\`\`js
// Debouncing — rate-limit rapid events (search input, resize)
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Throttling — limit to once per period
function throttle(fn, limit) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn(...args);
    }
  };
}
\`\`\`

**Memory:**
- Remove event listeners when components unmount
- Avoid memory leaks with closures holding large data
- Use WeakMap/WeakSet for caches keyed by objects

**Async best practices:**
- Never \`.catch()\` silently — always handle or log
- Use \`Promise.all\` for concurrent operations
- Avoid blocking the event loop with heavy synchronous code`,
      jsExample: `// Debounce — great for search inputs
function debounce(fn, delay = 300) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const handleSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 300);

// Simulate rapid typing
handleSearch("j");
handleSearch("ja");
handleSearch("jav");
handleSearch("java"); // Only this fires (after 300ms)

// Throttle — great for scroll events
function throttle(fn, limit = 100) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

// Measure performance
function measureTime(fn, label = "Operation") {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(\`\${label}: \${(end - start).toFixed(3)}ms\`);
  return result;
}

// Compare two approaches
measureTime(() => {
  let sum = 0;
  for (let i = 0; i < 100000; i++) sum += i;
  return sum;
}, "For loop sum");

measureTime(() => {
  return Array.from({length: 100000}, (_, i) => i).reduce((a,b) => a+b, 0);
}, "Array reduce sum");

console.log("✅ Best practices applied!");`,
      exercises: [
        {
          title: 'Implement debounce',
          description: 'Write a debounce function that delays calling fn by ms milliseconds. Reset the timer on each call. Test by simulating rapid calls.',
          hint: 'function debounce(fn, ms) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); }; }',
        },
        {
          title: 'Measure and compare',
          description: 'Wrap two approaches of computing [0..99] sum in measureTime(). Compare: 1) for loop accumulation, 2) Array.from + reduce.',
          hint: 'function measureTime(fn) { const t = performance.now(); const r = fn(); console.log(performance.now()-t+"ms"); return r; }',
        },
      ],
      quiz: [
        { question: 'What is debouncing?', options: ['Running a function immediately', 'Delaying a function call until after a pause in rapid invocations', 'Limiting calls to once per period', 'Cancelling a function'], correctIndex: 1, explanation: 'Debounce waits until invocations stop (after the delay) before calling the function.' },
        { question: 'What is throttling?', options: ['Delaying all calls', 'Limiting function calls to at most once per time period', 'Caching results', 'Debounce variant'], correctIndex: 1, explanation: 'Throttle ensures the function fires at most once per specified time period.' },
        { question: 'Which is better for search input: debounce or throttle?', options: ['Throttle', 'Debounce', 'Both equally', 'Neither'], correctIndex: 1, explanation: 'Debounce waits until typing stops — ideal for search to avoid querying on every keystroke.' },
        { question: 'Which is better for scroll events: debounce or throttle?', options: ['Debounce', 'Throttle', 'Neither', 'Both'], correctIndex: 1, explanation: 'Throttle fires regularly during scroll — debounce would only fire after scrolling stops.' },
        { question: 'performance.now() returns?', options: ['Date string', 'Unix timestamp in seconds', 'High-resolution timestamp in ms', 'Page load time'], correctIndex: 2, explanation: 'performance.now() returns a high-resolution timestamp in milliseconds.' },
        { question: 'What is a memory leak?', options: ['Too many variables', 'Memory that is allocated but never freed, growing over time', 'A slow function', 'An async error'], correctIndex: 1, explanation: 'Memory leaks occur when allocated memory can\'t be garbage collected — e.g., unreleased listeners.' },
        { question: 'WeakMap vs Map for caching objects:', options: ['WeakMap is faster', 'WeakMap allows keys to be garbage collected when not referenced elsewhere', 'Map has WeakRef', 'No difference'], correctIndex: 1, explanation: 'WeakMap holds weak references — keys can be GC\'d, preventing memory leaks.' },
        { question: 'What is the event loop?', options: ['A for loop for events', 'The mechanism enabling JS to handle async operations in a single thread', 'A browser API', 'A React concept'], correctIndex: 1, explanation: 'The event loop processes the callback queue, enabling non-blocking async behavior.' },
        { question: 'Blocking the event loop means?', options: ['Too many events', 'Long synchronous code prevents the browser from responding', 'Infinite recursion', 'A memory leak'], correctIndex: 1, explanation: 'Heavy sync code blocks the event loop — the UI freezes until it finishes.' },
        { question: 'requestAnimationFrame is used for?', options: ['HTTP requests', 'Animations synchronized with the browser\'s refresh rate', 'Timer replacement', 'Event handling'], correctIndex: 1, explanation: 'rAF fires before each paint — ideal for smooth 60fps animations.' },
        { question: 'What is tree-shaking?', options: ['Removing branches from objects', 'Bundlers removing unused code from the bundle', 'Array optimization', 'CSS pruning'], correctIndex: 1, explanation: 'Tree-shaking eliminates unused exports/code from production bundles.' },
        { question: 'Code splitting does?', options: ['Splits files into smaller pieces loaded on demand', 'Removes comments', 'Minifies JS', 'Polyfills ES6'], correctIndex: 0, explanation: 'Code splitting breaks a bundle into smaller chunks loaded as needed, improving initial load time.' },
        { question: 'What is minification?', options: ['Adding more features', 'Removing whitespace/comments and shortening names to reduce file size', 'Splitting files', 'Compressing images'], correctIndex: 1, explanation: 'Minification reduces file size without changing functionality.' },
        { question: 'The DRY principle helps with?', options: ['Performance', 'Maintainability — reducing duplication makes changes easier', 'Memory', 'Async code'], correctIndex: 1, explanation: 'DRY reduces duplication — if logic exists once, you only update one place.' },
        { question: 'Why avoid deeply nested callbacks?', options: ['Performance', 'Readability — callback hell is hard to read, debug, and maintain', 'Memory usage', 'Browser compat'], correctIndex: 1, explanation: 'Deeply nested callbacks are hard to follow — Promises and async/await solve this.' },
        { question: 'Strict mode ("use strict") does?', options: ['Slows down code', 'Enables stricter parsing — catches common mistakes like using undeclared variables', 'Removes console.log', 'Enables ES6'], correctIndex: 1, explanation: 'Strict mode helps catch bugs by disallowing certain unsafe behaviors.' },
        { question: 'What is the principle of least privilege?', options: ['Using fewest features', 'Giving code only the permissions it needs and no more', 'Minimal dependencies', 'Using let instead of const'], correctIndex: 1, explanation: 'Least privilege limits what code can access — reduces security risk.' },
        { question: 'Which causes a memory leak?', options: ['Using const', 'Adding event listeners without removing them on cleanup', 'Using arrow functions', 'Async/await'], correctIndex: 1, explanation: 'Event listeners hold references — not removing them keeps DOM elements and closures in memory.' },
        { question: 'JSON.stringify with a replacer does?', options: ['Validates JSON', 'Filters or transforms the output', 'Formats with indentation', 'Parses JSON'], correctIndex: 1, explanation: 'The replacer function/array controls which properties are included in the output.' },
        { question: 'What is progressive enhancement?', options: ['Adding features for new browsers only', 'Building a base that works everywhere, then enhancing for capable browsers', 'Using only CSS3', 'Loading scripts lazily'], correctIndex: 1, explanation: 'Progressive enhancement starts with a solid base and layers on enhancements for capable browsers.' },
      ],
    },
    {
      id: 'mini-project',
      title: 'Mini Project: Build a Task Manager',
      explanation: `Let's apply everything you've learned to build a complete **Task Manager** with:

1. **Data modeling** — Task objects with id, title, status, priority, createdAt
2. **CRUD operations** — Create, Read, Update, Delete tasks
3. **Filtering & sorting** — Filter by status, sort by priority or date
4. **Statistics** — Count tasks by status
5. **Data persistence** — Serialize to/from JSON
6. **Error handling** — Validate inputs, throw meaningful errors

This brings together: classes, arrays, objects, destructuring, functional methods, generators (for IDs), error handling, and JSON.

**Architecture:**
\`\`\`
TaskManager class
├── #tasks: Task[]
├── #idGenerator: Generator
├── add(title, priority) → Task
├── complete(id) → Task
├── delete(id) → boolean
├── filter({ status?, priority? }) → Task[]
├── sortBy(field) → Task[]
├── stats() → { total, completed, pending }
└── serialize/deserialize: JSON
\`\`\``,
      jsExample: `// Complete Task Manager — applies all JS concepts

function* idGenerator() {
  let n = 1;
  while (true) yield \`task-\${String(n++).padStart(4,"0")}\`;
}

class TaskManager {
  #tasks = [];
  #ids = idGenerator();
  
  add(title, priority = "medium") {
    if (!title?.trim()) throw new Error("Title is required");
    if (!["low","medium","high"].includes(priority)) {
      throw new Error(\`Invalid priority: \${priority}\`);
    }
    
    const task = {
      id: this.#ids.next().value,
      title: title.trim(),
      priority,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    
    this.#tasks.push(task);
    return task;
  }
  
  complete(id) {
    const task = this.#tasks.find(t => t.id === id);
    if (!task) throw new Error(\`Task not found: \${id}\`);
    task.status = "completed";
    task.completedAt = new Date().toISOString();
    return task;
  }
  
  delete(id) {
    const idx = this.#tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.#tasks.splice(idx, 1);
    return true;
  }
  
  filter({ status, priority } = {}) {
    return this.#tasks.filter(t => 
      (!status || t.status === status) &&
      (!priority || t.priority === priority)
    );
  }
  
  sortBy(field = "createdAt") {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...this.#tasks].sort((a, b) => {
      if (field === "priority") return priorityOrder[a.priority] - priorityOrder[b.priority];
      return a[field] < b[field] ? -1 : 1;
    });
  }
  
  stats() {
    return this.#tasks.reduce((acc, t) => {
      acc.total++;
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, { total: 0 });
  }
  
  serialize() { return JSON.stringify(this.#tasks, null, 2); }
}

// Demo
const manager = new TaskManager();

manager.add("Learn JavaScript", "high");
manager.add("Build a project", "high");
manager.add("Read docs", "medium");
manager.add("Write tests", "medium");
manager.add("Update README", "low");

const task1Id = manager.filter({ priority: "high" })[0].id;
manager.complete(task1Id);

console.log("=== Stats ===");
console.log(manager.stats());

console.log("\\n=== High Priority ===");
manager.filter({ priority: "high" }).forEach(t => 
  console.log(\`[\${t.status}] \${t.title}\`)
);

console.log("\\n=== Sorted by Priority ===");
manager.sortBy("priority").forEach(t =>
  console.log(\`[\${t.priority.padEnd(6)}] \${t.title}\`)
);

console.log("\\n=== Serialized (first 200 chars) ===");
console.log(manager.serialize().slice(0, 200) + "...");`,
      exercises: [
        {
          title: 'Add an update method',
          description: 'Add an update(id, changes) method to TaskManager that merges changes into the task and returns the updated task. Validate that only allowed fields can be updated.',
          hint: 'update(id, changes) { const task = this.#tasks.find(t=>t.id===id); if(!task) throw new Error("Not found"); const allowed = ["title","priority","status"]; Object.keys(changes).forEach(k => { if(allowed.includes(k)) task[k] = changes[k]; }); return task; }',
        },
        {
          title: 'Add searching',
          description: 'Add a search(query) method that returns tasks whose title contains the query string (case-insensitive).',
          hint: 'search(query) { const q = query.toLowerCase(); return this.#tasks.filter(t => t.title.toLowerCase().includes(q)); }',
        },
      ],
      quiz: [
        { question: 'Which class feature hides internal task data from outside code?', options: ['static', 'extends', 'Private fields (#tasks)', 'constructor'], correctIndex: 2, explanation: 'Private class fields (#) are inaccessible from outside the class.' },
        { question: 'The idGenerator is a generator because?', options: ['It creates objects', 'It uses function* and yield to produce sequential IDs', 'It uses async', 'It is a factory'], correctIndex: 1, explanation: 'function* with yield produces an infinite sequence of unique IDs on demand.' },
        { question: 'Why use this.#tasks.find() instead of a loop?', options: ['Slower', 'More concise, declarative, and readable', 'find() is faster always', 'find() mutates'], correctIndex: 1, explanation: 'find() is declarative — it expresses intent clearly without manual loop logic.' },
        { question: 'Why does sortBy() use [...this.#tasks] instead of this.#tasks?', options: ['To make it faster', 'To avoid mutating the original array', 'find() requires it', 'Private field access'], correctIndex: 1, explanation: 'Spread creates a copy — sortBy() returns sorted copy without modifying the source.' },
        { question: 'The stats() method uses reduce to?', options: ['Filter tasks', 'Accumulate a count object in one pass over the array', 'Sort tasks', 'Find tasks'], correctIndex: 1, explanation: 'reduce builds the stats object incrementally without multiple passes.' },
        { question: 'Why validate inputs in add()?', options: ['Required by JS', 'To catch errors early with clear messages rather than silent bugs', 'For performance', 'Required for classes'], correctIndex: 1, explanation: 'Input validation gives clear, early errors — better than silent failures later.' },
        { question: 'serialize() uses JSON.stringify to?', options: ['Delete tasks', 'Convert tasks to a JSON string for storage or transfer', 'Validate tasks', 'Sort tasks'], correctIndex: 1, explanation: 'JSON.stringify converts the task array to a portable string format.' },
        { question: 'In filter(), (!status || t.status === status) means?', options: ['Always filter by status', 'If status is not provided, include all; otherwise filter', 'Exclude completed', 'Or condition error'], correctIndex: 1, explanation: 'If status is falsy (not provided), the || short-circuits to true — no filter applied.' },
        { question: 'The priorityOrder object in sortBy() enables?', options: ['String sorting', 'Numeric comparison of priority levels (high < medium < low)', 'Alphabetic sort', 'Date sort'], correctIndex: 1, explanation: 'Converting priority strings to numbers enables correct numeric sorting.' },
        { question: 'This project demonstrates which key principle?', options: ['Global state', 'Everything in one function', 'Encapsulation, composition, and separation of concerns', 'No error handling needed'], correctIndex: 2, explanation: 'TaskManager encapsulates data, composes array methods, and separates concerns cleanly.' },
        { question: 'What does ?. (optional chaining) do in title?.trim()?', options: ['Trims always', 'Calls trim() only if title is not null/undefined', 'Makes trim async', 'Is invalid syntax'], correctIndex: 1, explanation: 'Optional chaining safely calls .trim() — returns undefined if title is null/undefined.' },
        { question: 'Why use splice() to delete instead of filter()?', options: ['splice() is cleaner', 'splice() modifies in place (no new array needed for deletion)', 'filter() does not delete', 'splice() is faster'], correctIndex: 1, explanation: 'splice() mutates the array in place — appropriate here since we manage the array ourselves.' },
        { question: 'The padding in idGenerator (padStart) ensures?', options: ['Shorter IDs', 'Consistent width IDs: task-0001 vs task-0042', 'Alphabetic sort', 'Faster lookup'], correctIndex: 1, explanation: 'padStart ensures all IDs are the same length for consistent formatting.' },
        { question: 'What is the benefit of returning task from add() and complete()?', options: ['Required for classes', 'Allows the caller to use the task immediately without a separate lookup', 'Better performance', 'JSON requirement'], correctIndex: 1, explanation: 'Returning the object after creation/update is a common fluent API pattern.' },
        { question: 'Which JavaScript concept does reduce() in stats() demonstrate?', options: ['Closure', 'Accumulator pattern — accumulating an object in one pass', 'Memoization', 'Currying'], correctIndex: 1, explanation: 'The accumulator (acc) builds up the result object across all iterations.' },
        { question: 'Why is the filter method\'s parameter destructured ({ status, priority } = {})?', options: ['Syntax error otherwise', 'Allows calling filter() with no args, or with partial options', 'Required for private fields', 'Performance'], correctIndex: 1, explanation: '= {} provides a default empty object so filter() works with zero arguments.' },
        { question: 'What does .trim() do on task title?', options: ['Shortens the title', 'Removes leading and trailing whitespace', 'Converts to uppercase', 'Removes special chars'], correctIndex: 1, explanation: 'trim() removes leading and trailing whitespace — prevents " " being a valid title.' },
        { question: 'The createdAt: new Date().toISOString() stores?', options: ['Current date as number', 'ISO 8601 date string like "2024-01-15T10:30:00.000Z"', 'Unix timestamp', 'Day of week'], correctIndex: 1, explanation: 'ISO 8601 strings are portable, sortable, and universally understood.' },
        { question: 'What is CRUD?', options: ['A CSS pattern', 'Create, Read, Update, Delete — core data operations', 'A testing framework', 'A design pattern'], correctIndex: 1, explanation: 'CRUD represents the four fundamental data operations every app needs.' },
        { question: 'The project could be extended by adding?', options: ['Nothing — it is complete', 'localStorage persistence, due dates, tags, sorting by multiple fields, undo', 'Only a UI', 'A database only'], correctIndex: 1, explanation: 'The clean architecture makes it easy to add features like persistence, due dates, and tags.' },
      ],
    },
  ],
};
