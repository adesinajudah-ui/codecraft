import { Lesson } from '../types';

export const lesson2: Lesson = {
  id: 'lesson2',
  title: 'Control Flow',
  topics: [
    {
      id: 'if-else',
      title: 'if / else / else if',
      explanation: `Conditional statements let your program make decisions based on conditions.

**Basic if statement:**
\`\`\`js
if (condition) {
  // runs if condition is true
}
\`\`\`

**if / else:**
\`\`\`js
if (score >= 90) {
  console.log("A grade");
} else {
  console.log("Not A grade");
}
\`\`\`

**if / else if / else:**
\`\`\`js
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "F";
}
\`\`\`

**Ternary operator** — one-liner for simple conditions:
\`\`\`js
let result = age >= 18 ? "adult" : "minor";
\`\`\``,
      jsExample: `const score = 85;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}
console.log("Grade:", grade); // B

// Ternary operator
const age = 20;
const status = age >= 18 ? "adult" : "minor";
console.log(status); // adult

// Nested conditions
const isMember = true;
const hasCredits = true;

if (isMember) {
  if (hasCredits) {
    console.log("Access granted");
  } else {
    console.log("No credits remaining");
  }
} else {
  console.log("Not a member");
}`,
      exercises: [
        {
          title: 'Temperature check',
          description: 'Write an if/else that logs "hot" if temp > 30, "warm" if > 20, "cold" otherwise.',
          hint: 'const temp = 25; if (temp > 30) {...} else if (temp > 20) {...} else {...}',
        },
        {
          title: 'Ternary shorthand',
          description: 'Use a ternary to check if a number is even or odd. Log "even" or "odd".',
          hint: 'const n = 7; console.log(n % 2 === 0 ? "even" : "odd");',
        },
      ],
      quiz: [
        { question: 'What does an if statement require?', options: ['A variable', 'A condition that evaluates to true/false', 'A loop', 'A function'], correctIndex: 1, explanation: 'if evaluates a condition and runs the block only if it is truthy.' },
        { question: 'else runs when?', options: ['Always', 'When the if condition is true', 'When the if condition is false', 'Never'], correctIndex: 2, explanation: 'else runs when the preceding if condition is false.' },
        { question: 'How many else if branches can you have?', options: ['Only 1', 'Maximum 3', 'Unlimited', 'Maximum 10'], correctIndex: 2, explanation: 'You can chain as many else if branches as needed.' },
        { question: 'What is the ternary operator?', options: ['condition ? trueValue : falseValue', 'if(cond) ? a : b', 'cond ?? a : b', 'cond -> a : b'], correctIndex: 0, explanation: 'The ternary is condition ? valueIfTrue : valueIfFalse.' },
        { question: 'if (0) { ... } runs the block?', options: ['Yes', 'No, 0 is falsy', 'Only in strict mode', 'Depends on browser'], correctIndex: 1, explanation: '0 is falsy, so if (0) never runs.' },
        { question: 'if ("") runs?', options: ['Yes, strings are truthy', 'No, empty string is falsy', 'Yes, if not null', 'Only in ES6+'], correctIndex: 1, explanation: 'Empty string is falsy.' },
        { question: 'if (1 === 1) runs?', options: ['No', 'Yes', 'Only in strict mode', 'TypeError'], correctIndex: 1, explanation: '1 === 1 is true, so the block runs.' },
        { question: 'Ternary: 5 > 3 ? "yes" : "no" returns?', options: ['"no"', '"yes"', 'true', 'Error'], correctIndex: 1, explanation: '5 > 3 is true, so the ternary returns "yes".' },
        { question: 'Can you use if without else?', options: ['No, else is required', 'Yes, else is optional', 'Only in functions', 'Only with else if'], correctIndex: 1, explanation: 'else is always optional.' },
        { question: 'Which checks if x is between 1 and 10 inclusive?', options: ['x > 1 && x < 10', 'x >= 1 && x <= 10', 'x > 0 && x < 11', 'x === 1-10'], correctIndex: 1, explanation: 'Use >= and <= for inclusive range checks.' },
        { question: 'if (null) {} runs?', options: ['Yes', 'No, null is falsy', 'Error', 'undefined'], correctIndex: 1, explanation: 'null is falsy.' },
        { question: 'if ([] ) {} runs?', options: ['No, empty array is falsy', 'Yes, [] is truthy', 'Error', 'undefined'], correctIndex: 1, explanation: 'Empty arrays are truthy in JavaScript.' },
        { question: 'What does else if do?', options: ['Checks another condition if the first was false', 'Runs after all conditions', 'Is required after if', 'Loops the condition'], correctIndex: 0, explanation: 'else if checks another condition only when previous conditions were false.' },
        { question: 'Which logical operator means "AND"?', options: ['||', '&&', '!', '??'], correctIndex: 1, explanation: '&& is the AND operator — both sides must be true.' },
        { question: 'a > 5 || b > 5 is true when?', options: ['Both a and b > 5', 'Neither a nor b > 5', 'At least one is > 5', 'Always'], correctIndex: 2, explanation: 'OR (||) is true if at least one condition is true.' },
        { question: 'const x = true ? 1 : 2; x equals?', options: ['2', '1', 'true', 'Error'], correctIndex: 1, explanation: 'true ? 1 : 2 → returns 1 since the condition is true.' },
        { question: '!(true) returns?', options: ['true', 'false', '1', '0'], correctIndex: 1, explanation: '! negates: !true = false.' },
        { question: 'if (x = 5) runs (note: = not ==)?', options: ['Yes, assignment returns the value 5 which is truthy', 'No, syntax error', 'Only if x was already 5', 'No, always false'], correctIndex: 0, explanation: 'Single = is assignment. It returns 5, which is truthy. This is a common bug — always use === in conditions.' },
        { question: 'Short-circuit: false && doSomething() — does doSomething run?', options: ['Yes', 'No, && short-circuits on false', 'Only sometimes', 'Error'], correctIndex: 1, explanation: 'With &&, if the left side is false, the right side is never evaluated.' },
        { question: 'Short-circuit: true || doSomething() — does doSomething run?', options: ['Yes', 'No, || short-circuits on true', 'Only sometimes', 'Error'], correctIndex: 1, explanation: 'With ||, if the left side is true, the right side is never evaluated.' },
      ],
    },
    {
      id: 'switch',
      title: 'Switch Statements',
      explanation: `A switch statement compares a value against multiple cases — cleaner than long if/else chains when checking one variable against many values.

\`\`\`js
switch (day) {
  case "Monday":
    console.log("Start of week");
    break;
  case "Friday":
    console.log("Almost weekend!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Midweek");
}
\`\`\`

**Key rules:**
- Each case needs a \`break\` statement — without it, execution "falls through" to the next case
- \`default\` handles any value not matched (like \`else\`)
- switch uses **strict equality** (===) for comparison
- Multiple cases can share the same code block (stacking cases)`,
      jsExample: `const day = "Saturday";

switch (day) {
  case "Monday":
    console.log("Back to work...");
    break;
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
    console.log("Midweek grind");
    break;
  case "Friday":
    console.log("TGIF!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend! 🎉");
    break;
  default:
    console.log("Unknown day");
}

// Switch with numbers
const season = 3;
let seasonName;
switch (season) {
  case 1: seasonName = "Winter"; break;
  case 2: seasonName = "Spring"; break;
  case 3: seasonName = "Summer"; break;
  case 4: seasonName = "Fall"; break;
  default: seasonName = "Unknown";
}
console.log("Season:", seasonName);`,
      exercises: [
        {
          title: 'Traffic light switch',
          description: 'Write a switch for colors "red", "yellow", "green" logging what to do at a traffic light.',
          hint: 'const color = "green"; switch(color) { case "red": console.log("Stop"); break; ... }',
        },
        {
          title: 'Fall-through demo',
          description: 'Create a switch without break statements to observe fall-through behavior.',
          hint: 'switch(1) { case 1: console.log("one"); case 2: console.log("two"); case 3: console.log("three"); }',
        },
      ],
      quiz: [
        { question: 'What happens without a break in a switch case?', options: ['The switch ends', 'Execution falls through to the next case', 'An error is thrown', 'The default runs'], correctIndex: 1, explanation: 'Without break, execution continues into the next case (fall-through).' },
        { question: 'What does the default case in a switch do?', options: ['Runs first', 'Runs when no cases match', 'Is required', 'Throws an error'], correctIndex: 1, explanation: 'default runs when none of the case values matched.' },
        { question: 'Switch uses which comparison?', options: ['== (loose)', '=== (strict)', '= (assignment)', '!= (not equal)'], correctIndex: 1, explanation: 'Switch uses strict equality (===) when comparing values.' },
        { question: 'switch ("5") vs case 5: — does it match?', options: ['Yes, loose comparison', 'No, strict comparison — "5" !== 5', 'Depends on browser', 'Error'], correctIndex: 1, explanation: 'switch uses ===, so string "5" does not match number 5.' },
        { question: 'Can multiple cases share the same block?', options: ['No, each case needs unique code', 'Yes, by stacking cases without break', 'Only in ES6', 'Only for strings'], correctIndex: 1, explanation: 'You can stack cases (case "a": case "b": code; break) to share blocks.' },
        { question: 'Is the default case required?', options: ['Yes', 'No, it is optional', 'Only if using strings', 'Only in strict mode'], correctIndex: 1, explanation: 'default is optional, like else.' },
        { question: 'Where should break be placed?', options: ['At the start of each case', 'At the end of each case block', 'After default only', 'Before each case'], correctIndex: 1, explanation: 'break goes at the end of each case to stop fall-through.' },
        { question: 'When is switch better than if/else?', options: ['Always', 'When checking one variable against many specific values', 'For range comparisons', 'Never'], correctIndex: 1, explanation: 'switch is cleaner when comparing one value against many discrete options.' },
        { question: 'switch (x) { case 1: case 2: console.log("low"); } — when does "low" print?', options: ['Only when x is 1', 'Only when x is 2', 'When x is 1 or 2', 'Never'], correctIndex: 2, explanation: 'Stacked cases without break between them share the same block.' },
        { question: 'Can switch evaluate expressions?', options: ['No, only variables', 'Yes, it evaluates the expression in the parentheses', 'Only numbers', 'Only strings'], correctIndex: 1, explanation: 'switch can evaluate any expression: switch (x + 1) or switch (x > 5).' },
        { question: 'What is fall-through?', options: ['The switch resetting', 'Execution continuing past a case without break', 'An error type', 'Jumping to default'], correctIndex: 1, explanation: 'Fall-through is when execution continues into the next case without stopping.' },
        { question: 'Can you use return instead of break in a function switch?', options: ['No', 'Yes, return exits the whole function', 'Only for void functions', 'Only in ES6'], correctIndex: 1, explanation: 'return exits the function, so no break is needed.' },
        { question: 'switch (true) { case x > 5: ... } — is this valid?', options: ['No, switch only works with static values', 'Yes, you can use expressions in cases', 'Only in TypeScript', 'Syntax error'], correctIndex: 1, explanation: 'switch(true) with expression cases is a valid pattern for range checks.' },
        { question: 'Does switch work with strings?', options: ['No, only numbers', 'Yes', 'Only in ES6+', 'Only lowercase strings'], correctIndex: 1, explanation: 'switch works with any value type that supports === comparison.' },
        { question: 'What happens if you put default first?', options: ['Error', 'It works, but default still only runs if no case matches (unless fall-through)', 'default always runs when first', 'Syntax error'], correctIndex: 1, explanation: 'default can be anywhere; it still only executes when no case matches (unless fall-through).' },
        { question: 'switch vs if/else — which is faster?', options: ['switch is always faster', 'if/else is always faster', 'Roughly similar in modern engines', 'Depends on the number of cases'], correctIndex: 2, explanation: 'Modern JS engines optimize both similarly; readability matters more than speed here.' },
        { question: 'Can you declare variables inside a switch case?', options: ['No', 'Yes, but you should use block scope with {}', 'Only with var', 'Only outside all cases'], correctIndex: 1, explanation: 'Use curly braces {} in each case to properly scope let/const declarations.' },
        { question: 'switch (typeof x) is valid?', options: ['No', 'Yes, typeof returns a string that switch can match', 'Only if x is a number', 'Error'], correctIndex: 1, explanation: 'typeof returns a string like "string", "number", which switch can match.' },
        { question: 'What if the switch expression is undefined?', options: ['Error', 'case undefined: matches it', 'default runs', 'Both B and C — default if no undefined case'], correctIndex: 3, explanation: 'switch tries to match undefined; if no case matches undefined, default runs.' },
        { question: 'Which is cleaner for many discrete value checks?', options: ['Long if/else chain', 'switch statement', 'Nested ternaries', 'Multiple functions'], correctIndex: 1, explanation: 'switch is generally more readable than long if/else chains for discrete values.' },
      ],
    },
    {
      id: 'loops',
      title: 'Loops: for, while, do-while',
      explanation: `Loops repeat a block of code — essential for processing lists, repeating actions, and automating tasks.

**for loop** — when you know how many times to repeat:
\`\`\`js
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}
\`\`\`
Parts: **initialization**; **condition** (keep looping while true); **update** (runs after each iteration)

**while loop** — repeat while a condition is true:
\`\`\`js
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}
\`\`\`

**do-while loop** — always runs at least once:
\`\`\`js
do {
  // runs at least once
} while (condition);
\`\`\`

**for...of** — iterate over array elements:
\`\`\`js
for (const item of array) { ... }
\`\`\`

**for...in** — iterate over object keys:
\`\`\`js
for (const key in object) { ... }
\`\`\``,
      jsExample: `// Classic for loop
for (let i = 1; i <= 5; i++) {
  console.log(\`Step \${i}\`);
}

// while loop
let countdown = 5;
while (countdown > 0) {
  console.log(\`Countdown: \${countdown}\`);
  countdown--;
}
console.log("Liftoff! 🚀");

// for...of — iterate array
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log("Fruit:", fruit);
}

// for...in — iterate object keys
const user = { name: "Alice", age: 30, role: "admin" };
for (const key in user) {
  console.log(\`\${key}: \${user[key]}\`);
}

// Accumulation pattern
let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
console.log("Sum 1-10:", sum); // 55`,
      exercises: [
        {
          title: 'Multiplication table',
          description: 'Use a for loop to print the 7 times table from 7×1 to 7×10.',
          hint: 'for (let i = 1; i <= 10; i++) { console.log(`7 × ${i} = ${7 * i}`); }',
        },
        {
          title: 'Loop an array',
          description: 'Create an array of 5 city names and use for...of to log each one.',
          hint: 'const cities = ["London","Paris","Tokyo",...]; for (const city of cities) { console.log(city); }',
        },
      ],
      quiz: [
        { question: 'What are the 3 parts of a for loop?', options: ['start, step, end', 'init; condition; update', 'var; while; inc', 'declare; check; execute'], correctIndex: 1, explanation: 'for (initialization; condition; update) { ... }' },
        { question: 'for (let i = 0; i < 3; i++) runs how many times?', options: ['2', '3', '4', '0'], correctIndex: 1, explanation: 'i goes 0, 1, 2 (stops when i reaches 3) — 3 iterations.' },
        { question: 'What is an infinite loop?', options: ['A loop that runs 1000 times', 'A loop whose condition never becomes false', 'A nested loop', 'A for...in loop'], correctIndex: 1, explanation: 'An infinite loop runs forever because the condition is always true.' },
        { question: 'while (true) { ... } without a break creates?', options: ['An error', 'An infinite loop', 'Runs once', 'A for loop'], correctIndex: 1, explanation: 'while(true) loops forever unless break is used inside.' },
        { question: 'do { ... } while (false) runs how many times?', options: ['0', '1', 'Infinite', 'Error'], correctIndex: 1, explanation: 'do-while always runs at least once, then checks the condition.' },
        { question: 'for...of iterates over?', options: ['Object keys', 'Array/iterable values', 'Numbers', 'Functions'], correctIndex: 1, explanation: 'for...of gives you each value in an iterable like an array or string.' },
        { question: 'for...in iterates over?', options: ['Array elements', 'Object keys', 'Object values', 'String characters'], correctIndex: 1, explanation: 'for...in gives you the keys (property names) of an object.' },
        { question: 'What does break do inside a loop?', options: ['Skips current iteration', 'Exits the loop entirely', 'Restarts the loop', 'Throws an error'], correctIndex: 1, explanation: 'break immediately exits the enclosing loop.' },
        { question: 'What does continue do inside a loop?', options: ['Exits the loop', 'Skips the rest of the current iteration and moves to the next', 'Restarts from the beginning', 'Throws an error'], correctIndex: 1, explanation: 'continue skips the current iteration and jumps to the next one.' },
        { question: 'for (let i = 10; i > 0; i -= 2) runs how many times?', options: ['4', '5', '6', '10'], correctIndex: 1, explanation: 'i: 10, 8, 6, 4, 2 — 5 iterations.' },
        { question: 'Which loop is best when you don\'t know how many iterations you need?', options: ['for loop', 'while loop', 'do-while loop', 'for...of loop'], correctIndex: 1, explanation: 'while is ideal when the number of iterations is unknown.' },
        { question: 'let i = 0; while (i < 5) { i++; } — i after the loop?', options: ['4', '5', '6', '0'], correctIndex: 1, explanation: 'i is 5 after the loop (loop stops when i reaches 5).' },
        { question: 'Can you nest loops?', options: ['No', 'Yes', 'Only in functions', 'Only 2 levels deep'], correctIndex: 1, explanation: 'Loops can be nested — the inner loop runs fully for each iteration of the outer.' },
        { question: 'The update in a for loop runs?', options: ['Before the first iteration', 'After each iteration', 'Before each condition check', 'Only once'], correctIndex: 1, explanation: 'The update (i++) runs at the end of each iteration.' },
        { question: 'for (const x of "hello") logs?', options: ['h, e, l, l, o', '"hello"', '5', 'Error'], correctIndex: 0, explanation: 'for...of on a string iterates character by character.' },
        { question: 'Which is safest to avoid modifying while iterating?', options: ['for loop with index', 'for...of on a copy', 'while loop', 'All are equally safe'], correctIndex: 1, explanation: 'Modifying an array while iterating can cause bugs — iterating over a copy is safest.' },
        { question: 'for (let i = 0; i < arr.length; i++) — how should you access each element?', options: ['arr(i)', 'arr[i]', 'arr.get(i)', 'arr.item(i)'], correctIndex: 1, explanation: 'Use arr[i] to access array elements by index.' },
        { question: 'sum = 0; for (let i = 1; i <= 4; i++) sum += i; sum equals?', options: ['6', '10', '4', '8'], correctIndex: 1, explanation: '1+2+3+4 = 10.' },
        { question: 'Which loop tests condition BEFORE executing?', options: ['do-while', 'for and while', 'Only while', 'None'], correctIndex: 1, explanation: 'for and while test the condition before each iteration; do-while tests after.' },
        { question: 'What is the common naming convention for a loop counter variable?', options: ['x', 'i', 'count', 'n'], correctIndex: 1, explanation: '"i" (for "index" or "iteration") is the most common loop counter name.' },
      ],
    },
    {
      id: 'functions',
      title: 'Functions',
      explanation: `Functions are reusable blocks of code. You define them once and call them many times — the foundation of clean, organized code.

**Function declaration:**
\`\`\`js
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Alice"));
\`\`\`

**Function expression:**
\`\`\`js
const greet = function(name) {
  return "Hello, " + name + "!";
};
\`\`\`

**Arrow function (modern, concise):**
\`\`\`js
const greet = (name) => "Hello, " + name + "!";
// One parameter? Parens optional:
const double = n => n * 2;
// Multi-line needs curly braces and return:
const add = (a, b) => {
  const result = a + b;
  return result;
};
\`\`\`

**Parameters vs Arguments:** parameters are the names in the definition; arguments are the values passed when calling.

**Default parameters:**
\`\`\`js
function greet(name = "World") {
  return \`Hello, \${name}!\`;
}
\`\`\``,
      jsExample: `// Function declaration
function add(a, b) {
  return a + b;
}
console.log(add(3, 4));   // 7
console.log(add(10, 20)); // 30

// Default parameters
function greet(name = "World") {
  return \`Hello, \${name}!\`;
}
console.log(greet());         // Hello, World!
console.log(greet("Alice"));  // Hello, Alice!

// Arrow functions
const square = n => n * n;
const multiply = (a, b) => a * b;
console.log(square(5));        // 25
console.log(multiply(3, 7));   // 21

// Functions can call other functions
function hypotenuse(a, b) {
  return Math.sqrt(square(a) + square(b));
}
console.log(hypotenuse(3, 4)); // 5

// Returning multiple values (as an object)
function minMax(arr) {
  return { min: Math.min(...arr), max: Math.max(...arr) };
}
const { min, max } = minMax([3, 1, 7, 2, 9]);
console.log("Min:", min, "Max:", max);`,
      exercises: [
        {
          title: 'Temperature converter',
          description: 'Write a function celsiusToFahrenheit(c) that returns the Fahrenheit equivalent. Formula: (c × 9/5) + 32',
          hint: 'const celsiusToFahrenheit = c => (c * 9/5) + 32;',
        },
        {
          title: 'isEven function',
          description: 'Write an arrow function isEven(n) that returns true if n is even, false otherwise.',
          hint: 'const isEven = n => n % 2 === 0;',
        },
      ],
      quiz: [
        { question: 'What does a function return if no return statement?', options: ['0', 'null', 'undefined', 'Error'], correctIndex: 2, explanation: 'Functions without a return statement return undefined.' },
        { question: 'What is the difference between a parameter and an argument?', options: ['They are the same', 'Parameter is the definition name; argument is the value passed', 'Argument is in the definition; parameter is the value', 'None'], correctIndex: 1, explanation: 'Parameters are in the function definition; arguments are the actual values passed.' },
        { question: 'Arrow function with one line body:', options: ['Needs return and {}', 'Implicitly returns the expression without {}', 'Always returns undefined', 'Needs a semicolon inside'], correctIndex: 1, explanation: 'Single-expression arrow functions have an implicit return.' },
        { question: 'What is a default parameter?', options: ['A required parameter', 'A parameter with a fallback value if not provided', 'The first parameter', 'A global variable'], correctIndex: 1, explanation: 'Default parameters provide a fallback value when the argument is omitted.' },
        { question: 'function f(x) { return x * 2; } f(5) returns?', options: ['5', '10', 'undefined', 'Error'], correctIndex: 1, explanation: '5 * 2 = 10.' },
        { question: 'const double = n => n * 2; double(6) returns?', options: ['6', '12', 'n * 2', 'undefined'], correctIndex: 1, explanation: 'Arrow function returns n * 2 = 6 * 2 = 12.' },
        { question: 'Can functions be stored in variables?', options: ['No', 'Yes — function expressions', 'Only arrow functions', 'Only in ES6'], correctIndex: 1, explanation: 'Functions are first-class values in JavaScript and can be stored in variables.' },
        { question: 'What is hoisting in functions?', options: ['Function declarations are available before their definition', 'Arrow functions are faster', 'Functions auto-run on page load', 'Returning values automatically'], correctIndex: 0, explanation: 'Function declarations are hoisted — you can call them before they appear in code.' },
        { question: 'Are function expressions hoisted?', options: ['Yes, fully', 'No, they are not hoisted', 'Only the declaration', 'Only in strict mode'], correctIndex: 1, explanation: 'Function expressions (const f = function...) are not hoisted.' },
        { question: 'What is a pure function?', options: ['Uses no variables', 'Returns the same output for the same input, no side effects', 'A function with no parameters', 'A built-in function'], correctIndex: 1, explanation: 'Pure functions are predictable: same input always gives same output.' },
        { question: 'Can a function return another function?', options: ['No', 'Yes — this is called a higher-order function', 'Only in classes', 'Only with arrow functions'], correctIndex: 1, explanation: 'Functions can return other functions — enabling closures and HOFs.' },
        { question: 'How many values can a function return?', options: ['Unlimited', 'Only 1 (use object/array to return multiple)', 'Up to 3', 'None'], correctIndex: 1, explanation: 'return can return one value; use an object or array to return multiples.' },
        { question: 'What is a callback function?', options: ['A function that calls itself', 'A function passed as an argument to another function', 'A function that returns nothing', 'An async function'], correctIndex: 1, explanation: 'Callbacks are functions passed as arguments, to be called later.' },
        { question: 'const f = () => {}; f() returns?', options: ['null', '{}', 'undefined', 'Error'], correctIndex: 2, explanation: 'Arrow function with empty body and no return returns undefined.' },
        { question: 'function f(a, b = 10) {} f(5) — b is?', options: ['undefined', '0', '10', 'Error'], correctIndex: 2, explanation: 'b uses its default value 10 when not provided.' },
        { question: 'What is recursion?', options: ['A loop inside a function', 'A function calling itself', 'A function with no return', 'A nested function'], correctIndex: 1, explanation: 'Recursion is when a function calls itself to solve a problem.' },
        { question: 'What is the rest parameter (...args)?', options: ['Spreads an array', 'Collects all remaining arguments into an array', 'Returns all arguments', 'Declares optional params'], correctIndex: 1, explanation: '...args collects extra arguments into an array.' },
        { question: 'Arrow functions have their own "this"?', options: ['Yes', 'No, they inherit "this" from the enclosing scope', 'Only in classes', 'Only in strict mode'], correctIndex: 1, explanation: 'Arrow functions do not have their own "this" — they inherit it lexically.' },
        { question: 'function f() {} typeof f returns?', options: ['"object"', '"undefined"', '"function"', '"code"'], correctIndex: 2, explanation: 'typeof a function returns "function".' },
        { question: 'What is a closure?', options: ['A function with no parameters', 'A function that remembers its outer scope even after the outer function has returned', 'A private class method', 'A type of loop'], correctIndex: 1, explanation: 'Closures capture variables from their outer scope.' },
      ],
    },
    {
      id: 'scope',
      title: 'Scope & Hoisting',
      explanation: `**Scope** determines where a variable is accessible in your code.

**Global scope** — declared outside any function/block; accessible everywhere:
\`\`\`js
const globalName = "Alice"; // Accessible anywhere
\`\`\`

**Function scope** — variables inside a function are only accessible inside that function:
\`\`\`js
function greet() {
  const msg = "Hello"; // only inside greet
}
\`\`\`

**Block scope** — \`let\` and \`const\` are only accessible inside their block \`{}\`:
\`\`\`js
if (true) {
  let x = 10; // only inside this if block
}
// x is not accessible here
\`\`\`

**var is NOT block-scoped** — it leaks out of blocks (but not functions):
\`\`\`js
if (true) {
  var y = 20; // leaks out!
}
console.log(y); // 20 — this works (and is confusing)
\`\`\`

**Hoisting** — \`var\` declarations and function declarations are moved to the top of their scope. \`let\`/\`const\` are NOT initialized before their declaration.`,
      jsExample: `// Global vs local scope
const globalMsg = "I'm global";

function demo() {
  const localMsg = "I'm local";
  console.log(globalMsg);  // Works! global is accessible
  console.log(localMsg);   // Works!
}
demo();
// console.log(localMsg); // Error: localMsg is not defined

// Block scope with let
{
  let blockVar = "inside block";
  console.log(blockVar); // Works
}
// console.log(blockVar); // Error: blockVar is not defined

// var leaks from blocks (but not functions)
if (true) {
  var leaked = "I leaked";
}
console.log(leaked); // "I leaked" — var ignores blocks

// Hoisting example
console.log(hoistedFn()); // Works! Function declarations are hoisted
function hoistedFn() { return "I am hoisted!"; }

// let/const are NOT accessible before declaration (Temporal Dead Zone)
// console.log(x); // ReferenceError
// let x = 5;`,
      exercises: [
        {
          title: 'Spot the scope error',
          description: 'Try to access a let variable declared inside an if block from outside it. What error do you see?',
          hint: 'if (true) { let x = 10; } console.log(x); // Should throw ReferenceError',
        },
        {
          title: 'Hoisting demo',
          description: 'Call a function before it is declared — does it work? Now try the same with a const arrow function.',
          hint: 'console.log(add(1,2)); function add(a,b){return a+b;} — then try with const add = ...',
        },
      ],
      quiz: [
        { question: 'What is scope?', options: ['The size of a variable', 'The region of code where a variable is accessible', 'The type of a variable', 'The lifespan of a function'], correctIndex: 1, explanation: 'Scope defines where in the code a variable can be accessed.' },
        { question: 'Which has block scope?', options: ['var', 'let and const', 'function declarations', 'All of the above'], correctIndex: 1, explanation: 'Only let and const are block-scoped.' },
        { question: 'var inside a block is accessible?', options: ['Only inside the block', 'Outside the block (but not outside a function)', 'Globally always', 'Nowhere outside'], correctIndex: 1, explanation: 'var is function-scoped, not block-scoped, so it leaks out of blocks.' },
        { question: 'What is hoisting?', options: ['Removing variables', 'Moving declarations to the top of their scope at runtime', 'Copying variables', 'Calling functions'], correctIndex: 1, explanation: 'Hoisting moves var declarations and function declarations to the top of their scope.' },
        { question: 'Are let/const hoisted?', options: ['No', 'Yes, but not initialized (Temporal Dead Zone)', 'Yes, and initialized to undefined', 'Yes, and initialized to null'], correctIndex: 1, explanation: 'let/const are technically hoisted but not initialized — accessing them before declaration throws a ReferenceError.' },
        { question: 'What is the Temporal Dead Zone?', options: ['A debug tool', 'The period between when let/const is hoisted and when it is initialized', 'A deleted variable', 'A closed scope'], correctIndex: 1, explanation: 'The TDZ is the period where let/const is hoisted but not yet initialized.' },
        { question: 'Can inner functions access outer function variables?', options: ['No', 'Yes — this is closure', 'Only with global variables', 'Only in strict mode'], correctIndex: 1, explanation: 'Inner functions can access variables in their outer scope — forming closures.' },
        { question: 'What is a closure?', options: ['A closed loop', 'A function that captures its outer scope variables', 'A private class', 'A block of code'], correctIndex: 1, explanation: 'Closures let functions remember and access variables from their creation scope.' },
        { question: 'function f() { var x = 1; } console.log(x) — result?', options: ['1', 'undefined', 'ReferenceError', 'null'], correctIndex: 2, explanation: 'var is function-scoped — x is not accessible outside f().' },
        { question: 'What is global scope?', options: ['Inside a function', 'Inside a block', 'Accessible everywhere in the program', 'Only in modules'], correctIndex: 2, explanation: 'Global scope means the variable is accessible from anywhere.' },
        { question: 'Calling a function declaration before it is defined:', options: ['Throws an error', 'Works due to hoisting', 'Returns undefined', 'Only works in non-strict mode'], correctIndex: 1, explanation: 'Function declarations are fully hoisted and can be called before their position.' },
        { question: 'Calling a const arrow function before it is defined:', options: ['Works due to hoisting', 'Throws a ReferenceError', 'Returns undefined', 'Only in strict mode'], correctIndex: 1, explanation: 'const is not initialized before its declaration — accessing it throws ReferenceError.' },
        { question: 'let x = 1; function f() { let x = 2; return x; } f() returns?', options: ['1', '2', 'Error', 'undefined'], correctIndex: 1, explanation: 'The inner x shadows the outer x inside f().' },
        { question: 'What is variable shadowing?', options: ['Deleting a variable', 'A local variable with the same name as an outer variable', 'A global variable', 'A const inside let'], correctIndex: 1, explanation: 'Shadowing occurs when an inner scope declares a variable with the same name as an outer one.' },
        { question: 'How do you avoid polluting global scope?', options: ['Use only var', 'Wrap code in functions or modules', 'Declare everything at the top', 'Use only numbers'], correctIndex: 1, explanation: 'Modules and functions create their own scope, keeping globals clean.' },
        { question: 'In a browser, the global object is?', options: ['global', 'window', 'document', 'this'], correctIndex: 1, explanation: 'In browsers, the global object is window.' },
        { question: 'In Node.js, the global object is?', options: ['window', 'browser', 'global', 'process'], correctIndex: 2, explanation: 'In Node.js, the global object is called global.' },
        { question: 'for (let i = 0; i < 3; i++) {} — i after loop?', options: ['3', 'undefined', 'ReferenceError (not accessible)', '0'], correctIndex: 2, explanation: 'let in a for loop is block-scoped to the loop; not accessible after.' },
        { question: 'for (var i = 0; i < 3; i++) {} — i after loop?', options: ['ReferenceError', 'undefined', '3', '0'], correctIndex: 2, explanation: 'var leaks out of the for block — i is 3 after the loop.' },
        { question: 'What is the best practice regarding global variables?', options: ['Use as many as needed', 'Avoid them; prefer local or module scope', 'They are required for large apps', 'Use var for globals'], correctIndex: 1, explanation: 'Too many globals cause naming conflicts and make code hard to debug.' },
      ],
    },
    {
      id: 'arrays',
      title: 'Arrays',
      explanation: `Arrays store ordered lists of values. Each item has an index starting at 0.

\`\`\`js
const fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // "apple"
console.log(fruits.length); // 3
\`\`\`

**Essential array methods:**
| Method | What it does |
|--------|-------------|
| \`.push(x)\` | Add x to the end |
| \`.pop()\` | Remove and return last item |
| \`.shift()\` | Remove and return first item |
| \`.unshift(x)\` | Add x to the beginning |
| \`.splice(i, n)\` | Remove n items at index i |
| \`.slice(start, end)\` | Copy a portion |
| \`.indexOf(x)\` | Find index of x (-1 if not found) |
| \`.includes(x)\` | true if x is in array |
| \`.join(sep)\` | Convert to string |
| \`.reverse()\` | Reverse in place |
| \`.sort()\` | Sort in place |

**Functional methods (return new arrays):**
- \`.map(fn)\` — transform each element
- \`.filter(fn)\` — keep elements where fn returns true
- \`.find(fn)\` — first element where fn returns true
- \`.reduce(fn, init)\` — accumulate to single value`,
      jsExample: `const scores = [85, 92, 78, 95, 67];

// Access and properties
console.log(scores[0]);       // 85
console.log(scores.length);   // 5

// Modify
scores.push(88);              // Add to end
console.log(scores);

// Functional methods — don't mutate the original
const passing = scores.filter(s => s >= 80);
console.log("Passing:", passing); // [85, 92, 95, 88]

const doubled = scores.map(s => s * 2);
console.log("Doubled:", doubled);

const total = scores.reduce((acc, s) => acc + s, 0);
console.log("Total:", total);
console.log("Average:", (total / scores.length).toFixed(1));

// Find
const highScore = scores.find(s => s > 90);
console.log("First 90+:", highScore); // 92

// Check membership
console.log(scores.includes(78)); // true
console.log(scores.indexOf(95));  // 3`,
      exercises: [
        {
          title: 'Filter and map',
          description: 'Given [1,2,3,4,5,6,7,8,9,10], filter out even numbers, then map them to their squares.',
          hint: 'const evens = nums.filter(n => n % 2 === 0); const squares = evens.map(n => n*n);',
        },
        {
          title: 'Find the total',
          description: 'Use reduce to sum [10, 20, 30, 40, 50] and log the result.',
          hint: 'const sum = [10,20,30,40,50].reduce((acc, n) => acc + n, 0);',
        },
      ],
      quiz: [
        { question: 'const arr = [1,2,3]; arr[1] returns?', options: ['1', '2', '3', 'undefined'], correctIndex: 1, explanation: 'Arrays are 0-indexed, so [1] is the second element: 2.' },
        { question: 'What does push() do?', options: ['Remove last item', 'Add item to end', 'Add item to start', 'Remove first item'], correctIndex: 1, explanation: 'push() adds one or more items to the end of an array.' },
        { question: 'What does pop() do?', options: ['Add to end', 'Remove and return last item', 'Remove first item', 'Add to start'], correctIndex: 1, explanation: 'pop() removes and returns the last element.' },
        { question: 'What does shift() do?', options: ['Add to start', 'Remove last', 'Remove and return first item', 'Sort the array'], correctIndex: 2, explanation: 'shift() removes and returns the first element.' },
        { question: '.filter() returns?', options: ['A single value', 'A new array with elements that pass the test', 'The original array modified', 'A boolean'], correctIndex: 1, explanation: 'filter() returns a new array with elements where the callback returns true.' },
        { question: '.map() returns?', options: ['The original array', 'A new array with transformed elements', 'A single value', 'undefined'], correctIndex: 1, explanation: 'map() returns a new array with each element transformed by the callback.' },
        { question: '.reduce() returns?', options: ['An array', 'A single accumulated value', 'The last element', 'undefined'], correctIndex: 1, explanation: 'reduce() accumulates all elements into a single value.' },
        { question: '[1,2,3].includes(2) returns?', options: ['1', 'false', 'true', '2'], correctIndex: 2, explanation: 'includes() checks if the value exists in the array.' },
        { question: '[1,2,3].indexOf(3) returns?', options: ['1', '2', '3', '-1'], correctIndex: 1, explanation: '3 is at index 2 (0-indexed).' },
        { question: '.sort() without a comparator sorts?', options: ['By number value', 'As strings (lexicographically)', 'Randomly', 'By insertion order'], correctIndex: 1, explanation: 'Default sort() converts to strings and sorts lexicographically — "10" < "2".' },
        { question: '[1,2,3].join("-") returns?', options: ['"1,2,3"', '"1-2-3"', '[1,2,3]', '"123"'], correctIndex: 1, explanation: 'join("-") combines elements with - as separator.' },
        { question: 'What does slice(1, 3) do on [a,b,c,d]?', options: ['Returns [a,b,c]', 'Returns [b,c]', 'Returns [c,d]', 'Returns [a,b]'], correctIndex: 1, explanation: 'slice(1,3) extracts indices 1 and 2 → [b, c].' },
        { question: '.find() returns?', options: ['All matching elements', 'The index of the first match', 'The first element where callback returns true', 'A boolean'], correctIndex: 2, explanation: 'find() returns the first element that satisfies the callback.' },
        { question: '.some() returns true when?', options: ['All elements pass the test', 'At least one element passes the test', 'No elements pass the test', 'The array is not empty'], correctIndex: 1, explanation: 'some() returns true if at least one element passes the callback test.' },
        { question: '.every() returns true when?', options: ['At least one passes', 'All elements pass the test', 'The array is empty', 'The callback is truthy'], correctIndex: 1, explanation: 'every() returns true only when ALL elements pass the callback test.' },
        { question: 'const [a, b] = [1, 2]; a equals?', options: ['[1,2]', '1', '2', 'undefined'], correctIndex: 1, explanation: 'Destructuring assigns 1 to a and 2 to b.' },
        { question: '[...arr1, ...arr2] creates?', options: ['An error', 'A new array combining both', 'Nested arrays', 'A string'], correctIndex: 1, explanation: 'The spread operator ... expands arrays; combining them creates a new merged array.' },
        { question: 'What does flat() do?', options: ['Sorts an array', 'Flattens nested arrays', 'Removes duplicates', 'Reverses an array'], correctIndex: 1, explanation: 'flat() flattens nested arrays by one level (or more with flat(depth)).' },
        { question: 'Array.from("hello") creates?', options: ['["hello"]', '["h","e","l","l","o"]', 'Error', '"hello"'], correctIndex: 1, explanation: 'Array.from converts an iterable (like a string) to an array.' },
        { question: '[1,2,3].length returns?', options: ['2', '3', '4', '0'], correctIndex: 1, explanation: 'length is the number of elements in the array.' },
      ],
    },
    {
      id: 'objects',
      title: 'Objects',
      explanation: `Objects store data as key-value pairs. They're how JavaScript represents real-world entities.

\`\`\`js
const user = {
  name: "Alice",
  age: 30,
  isAdmin: false,
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
};
\`\`\`

**Accessing properties:**
\`\`\`js
user.name        // dot notation
user["name"]     // bracket notation (use when key is dynamic)
\`\`\`

**Modifying:**
\`\`\`js
user.age = 31;          // update
user.email = "a@b.com"; // add new property
delete user.isAdmin;    // remove
\`\`\`

**Destructuring:**
\`\`\`js
const { name, age } = user;
\`\`\`

**Spread to copy:**
\`\`\`js
const updated = { ...user, age: 31 };
\`\`\`

**Object.keys() / .values() / .entries():**
\`\`\`js
Object.keys(user)    // ["name", "age", ...]
Object.values(user)  // ["Alice", 30, ...]
Object.entries(user) // [["name","Alice"], ...]
\`\`\``,
      jsExample: `const car = {
  make: "Toyota",
  model: "Camry",
  year: 2022,
  isElectric: false,
  start() {
    return \`\${this.make} \${this.model} started!\`;
  }
};

// Access
console.log(car.make);         // "Toyota"
console.log(car["model"]);     // "Camry"
console.log(car.start());      // "Toyota Camry started!"

// Add / update / delete
car.color = "blue";
car.year = 2023;
delete car.isElectric;
console.log(car);

// Destructuring
const { make, model, year } = car;
console.log(\`\${year} \${make} \${model}\`);

// Object.keys, values, entries
console.log(Object.keys(car));
console.log(Object.values(car));

// Spread to make a copy with changes
const newCar = { ...car, color: "red" };
console.log("Original color:", car.color);
console.log("New car color:", newCar.color);`,
      exercises: [
        {
          title: 'Create a book object',
          description: 'Create a book object with title, author, pages, and a method getSummary() that returns a string.',
          hint: 'const book = { title: "...", author: "...", pages: 300, getSummary() { return `${this.title} by ${this.author}`; } };',
        },
        {
          title: 'Destructure and spread',
          description: 'Destructure the first and last name from { first: "Alice", last: "Smith", age: 25 } and create a copy with age updated to 26.',
          hint: 'const { first, last } = person; const updated = { ...person, age: 26 };',
        },
      ],
      quiz: [
        { question: 'How do you access a property in an object?', options: ['obj->prop', 'obj::prop', 'obj.prop or obj["prop"]', 'obj(prop)'], correctIndex: 2, explanation: 'Dot notation (obj.prop) or bracket notation (obj["prop"]) both work.' },
        { question: 'When should you use bracket notation?', options: ['Always', 'When the key is dynamic or contains special characters', 'Only for arrays', 'Only in loops'], correctIndex: 1, explanation: 'Use brackets when the key is stored in a variable or contains spaces/special chars.' },
        { question: 'How do you add a new property to an existing object?', options: ['obj.add("key", val)', 'obj.newKey = value', 'obj.push(value)', 'Object.add(obj, key, val)'], correctIndex: 1, explanation: 'Simply assign to a new key: obj.newKey = value.' },
        { question: 'How do you delete an object property?', options: ['obj.key = null', 'remove obj.key', 'delete obj.key', 'obj.key.remove()'], correctIndex: 2, explanation: 'The delete operator removes a property from an object.' },
        { question: 'const { name } = user; — what is this?', options: ['Creating a new object', 'Object destructuring', 'Spreading an object', 'A function call'], correctIndex: 1, explanation: 'Destructuring extracts specific properties into variables.' },
        { question: 'Object.keys(obj) returns?', options: ['An array of values', 'An array of [key, value] pairs', 'An array of property names', 'The object itself'], correctIndex: 2, explanation: 'Object.keys() returns an array of the object\'s own property names.' },
        { question: '{ ...obj } creates?', options: ['A reference to obj', 'A shallow copy of obj', 'A deep clone', 'An array from obj'], correctIndex: 1, explanation: 'Spread creates a shallow copy — nested objects are still references.' },
        { question: 'What does "this" refer to inside an object method?', options: ['The global window', 'The function itself', 'The object the method belongs to', 'undefined'], correctIndex: 2, explanation: 'Inside a regular method, "this" refers to the object.' },
        { question: 'Object.entries(obj) returns?', options: ['Only keys', 'Only values', 'Array of [key, value] pairs', 'A string'], correctIndex: 2, explanation: 'Object.entries() returns [[key1, val1], [key2, val2], ...].' },
        { question: 'Can object values be functions?', options: ['No', 'Yes — they become methods', 'Only in classes', 'Only with special syntax'], correctIndex: 1, explanation: 'Functions as object values are called methods.' },
        { question: 'How do you check if an object has a key?', options: ['"key" in obj', 'obj.hasKey("key")', 'obj.includes("key")', 'obj["key"] !== null'], correctIndex: 0, explanation: 'The in operator checks if a key exists in an object.' },
        { question: '{ a: 1, b: 2 } === { a: 1, b: 2 } returns?', options: ['true', 'false — objects compare by reference', 'TypeError', '1'], correctIndex: 1, explanation: 'Objects are compared by reference, not value. Two separate objects are never ===.' },
        { question: 'What is a shallow copy?', options: ['A full deep clone', 'A copy where nested objects are still shared references', 'A copy that only copies methods', 'An empty copy'], correctIndex: 1, explanation: 'Shallow copies copy the top-level properties but share nested object references.' },
        { question: 'const obj = {}; obj.x = 5; Is this allowed with const?', options: ['No, const is immutable', 'Yes, you can mutate const object properties', 'Only in strict mode', 'Only if x was declared first'], correctIndex: 1, explanation: 'const prevents reassigning the binding, not mutating the object\'s contents.' },
        { question: 'What is JSON?', options: ['JavaScript Object Notation — a text format for data', 'A JS library', 'A type of database', 'A CSS format'], correctIndex: 0, explanation: 'JSON is a text-based data format based on JS object syntax.' },
        { question: 'Object.freeze(obj) does?', options: ['Deletes the object', 'Prevents any modifications to the object', 'Makes a copy', 'Converts to JSON'], correctIndex: 1, explanation: 'Object.freeze() makes an object immutable — no adds, deletes, or updates.' },
        { question: 'Shorthand property: const name = "Al"; const obj = { name }; — obj.name is?', options: ['undefined', '"Al"', '"name"', 'Error'], correctIndex: 1, explanation: '{ name } is shorthand for { name: name } — the value is "Al".' },
        { question: 'Computed property: const key = "age"; const obj = { [key]: 25 }; obj.age is?', options: ['undefined', 'Error', '25', '"age"'], correctIndex: 2, explanation: 'Computed properties [key] use the variable\'s value as the key name.' },
        { question: 'How do you iterate over object entries?', options: ['for...of', 'for...in', 'Object.entries() with for...of', 'Both B and C'], correctIndex: 3, explanation: 'for...in iterates keys; Object.entries() + for...of iterates [key, value] pairs.' },
        { question: 'What is a POJO?', options: ['A JavaScript error', 'Plain Old JavaScript Object — a simple {} object', 'A class instance', 'A function that returns an object'], correctIndex: 1, explanation: 'POJO means a simple object literal {}, not a class instance.' },
      ],
    },
  ],
};
