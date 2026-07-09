import { Lesson } from '../types';

export const lesson1: Lesson = {
  id: 'lesson1',
  title: 'Getting Started with JavaScript',
  topics: [
    {
      id: 'what-is-js',
      title: 'What is JavaScript?',
      explanation: `JavaScript is the programming language of the web. While HTML gives a page its structure and CSS gives it style, JavaScript brings it to life with interactivity and logic.

**JavaScript can:**
- Respond to button clicks, form submissions, and key presses
- Update content on the page without reloading it
- Fetch data from servers and show it dynamically
- Build entire apps that run in the browser — like Gmail, Figma, or VS Code

JavaScript runs directly in every modern web browser — no installation required for the reader. It's also used on servers (Node.js), mobile apps (React Native), and desktop apps (Electron).

**Try it:** In the editor below, \`console.log()\` is your best friend — it prints values to the output pane so you can see what your code is doing.`,
      jsExample: `// JavaScript: language of the web
console.log("Hello, JavaScript!");

// Math works as expected
console.log(10 + 5);
console.log(100 / 4);

// Strings and numbers in one line
let name = "CodeCraft";
console.log("Welcome to " + name + " JS Course!");`,
      exercises: [
        {
          title: 'Your first console.log',
          description: 'Print your name to the output using console.log().',
          hint: 'Type: console.log("Your Name");',
        },
        {
          title: 'Print a calculation',
          description: 'Print the result of 8 × 7 using console.log().',
          hint: 'Type: console.log(8 * 7);',
        },
      ],
      quiz: [
        { question: 'What does JavaScript primarily do in a web page?', options: ['Define structure', 'Add interactivity and logic', 'Set visual styles', 'Manage the database'], correctIndex: 1, explanation: 'HTML structures, CSS styles, and JavaScript adds interactivity and logic.' },
        { question: 'Which function prints output to the browser console?', options: ['print()', 'echo()', 'console.log()', 'output()'], correctIndex: 2, explanation: 'console.log() is the standard way to print values in JavaScript.' },
        { question: 'Where does JavaScript run?', options: ['Only on servers', 'Only in Chrome', 'In all modern web browsers', 'Only on Windows'], correctIndex: 2, explanation: 'JavaScript runs natively in all modern browsers.' },
        { question: 'What is Node.js?', options: ['A CSS framework', 'JavaScript running on the server', 'A browser plugin', 'A JavaScript editor'], correctIndex: 1, explanation: 'Node.js lets JavaScript run outside the browser, on servers.' },
        { question: 'Which app is built with JavaScript?', options: ['Microsoft Word', 'Photoshop', 'VS Code', 'Excel'], correctIndex: 2, explanation: 'VS Code is built with Electron, which uses JavaScript.' },
        { question: 'JavaScript was originally created for?', options: ['Gaming', 'Making web pages interactive', 'Data science', 'Operating systems'], correctIndex: 1, explanation: 'Brendan Eich created JS in 1995 specifically for browser interactivity.' },
        { question: 'Which is NOT a use of JavaScript?', options: ['Mobile apps', 'Server-side code', 'Web interactivity', 'Compiling C++ programs'], correctIndex: 3, explanation: 'JavaScript cannot compile C++ programs.' },
        { question: 'What does console.log(2 + 2) output?', options: ['"2 + 2"', '22', '4', 'undefined'], correctIndex: 2, explanation: 'JavaScript evaluates 2 + 2 to 4 before logging.' },
        { question: 'What symbol starts a single-line comment in JS?', options: ['#', '--', '//', '/*'], correctIndex: 2, explanation: '// starts a single-line comment in JavaScript.' },
        { question: 'JavaScript is related to Java?', options: ['Yes, they are the same language', 'Yes, JS is a subset of Java', 'No, they share a name but are different languages', 'No, JS replaced Java'], correctIndex: 2, explanation: 'Despite the name, JavaScript and Java are very different languages.' },
        { question: 'What does "JS" stand for?', options: ['Java Server', 'JavaScript', 'Just Scripting', 'Java Syntax'], correctIndex: 1, explanation: 'JS is simply short for JavaScript.' },
        { question: 'Which company originally created JavaScript?', options: ['Google', 'Microsoft', 'Netscape', 'Apple'], correctIndex: 2, explanation: 'Netscape created JavaScript in 1995.' },
        { question: 'What can JavaScript NOT do on its own (without extensions)?', options: ['Manipulate HTML', 'Read files from your hard drive', 'Do math', 'Show alerts'], correctIndex: 1, explanation: 'For security, browser JS cannot read local files without special permissions.' },
        { question: 'What happens when a browser encounters a script tag with JavaScript?', options: ['It skips it', 'It executes the JavaScript code', 'It downloads it for later', 'It asks the user'], correctIndex: 1, explanation: 'Browsers execute JavaScript found in script tags.' },
        { question: 'Which of these is valid JavaScript?', options: ['say "hello"', 'print "hello"', 'console.log("hello")', 'echo "hello"'], correctIndex: 2, explanation: 'console.log() is valid JavaScript syntax.' },
        { question: 'JS code runs on the...', options: ['Web server only', 'Database', 'Client (browser)', 'Both client and server'], correctIndex: 3, explanation: 'With browsers and Node.js, JS can run both client-side and server-side.' },
        { question: 'What is ECMAScript?', options: ['A JS framework', 'The official standard specification for JavaScript', 'A JS library', 'A server runtime'], correctIndex: 1, explanation: 'ECMAScript (ES) is the official language standard that JavaScript implements.' },
        { question: 'console.log("5" + 5) outputs?', options: ['10', '"55"', 'Error', '55'], correctIndex: 1, explanation: 'When adding a string and number, JS converts the number to a string: "55".' },
        { question: 'Which is a valid comment?', options: ['// This is a comment', '## This is a comment', '-- This is a comment', '<! This is a comment >'], correctIndex: 0, explanation: '// starts a JavaScript comment.' },
        { question: 'What is Electron?', options: ['A JavaScript testing tool', 'A framework for building desktop apps with JS', 'A CSS preprocessor', 'A database'], correctIndex: 1, explanation: 'Electron lets you build desktop applications using JavaScript.' },
      ],
    },
    {
      id: 'variables',
      title: 'Variables: let, const, var',
      explanation: `Variables are named containers for storing data values. In modern JavaScript, you declare variables with **let** or **const**.

**let** — use when the value will change:
\`\`\`js
let score = 0;
score = 10; // allowed
\`\`\`

**const** — use when the value will NOT change:
\`\`\`js
const PI = 3.14159;
// PI = 3; // Error! Cannot reassign a const.
\`\`\`

**var** — the old way. Avoid it in modern code because it has confusing scoping rules. Always prefer \`let\` or \`const\`.

**Naming rules:**
- Can contain letters, digits, underscores, dollar signs
- Cannot start with a digit
- Case-sensitive: \`myVar\` ≠ \`myvar\`
- Use camelCase: \`firstName\`, \`totalScore\`

💡 **Best practice:** Default to \`const\`. Only use \`let\` when you know the value needs to change.`,
      jsExample: `// const — value won't change
const siteName = "CodeCraft";
const maxScore = 100;

// let — value will change
let currentScore = 0;
let playerName = "Alice";

console.log(siteName, "— player:", playerName);
console.log("Score:", currentScore, "/", maxScore);

// Update the let variable
currentScore = 42;
console.log("Updated score:", currentScore);

// Uncomment to see the error:
// maxScore = 200; // TypeError: Assignment to constant variable`,
      exercises: [
        {
          title: 'Declare a const',
          description: 'Create a constant called YOUR_NAME with your name and log it.',
          hint: 'const YOUR_NAME = "Alice"; console.log(YOUR_NAME);',
        },
        {
          title: 'Update a let variable',
          description: 'Create a variable called age, log it, then change it and log again.',
          hint: 'let age = 20; console.log(age); age = 21; console.log(age);',
        },
      ],
      quiz: [
        { question: 'Which keyword creates a variable that CANNOT be reassigned?', options: ['let', 'var', 'const', 'def'], correctIndex: 2, explanation: 'const declares a constant — it cannot be reassigned after creation.' },
        { question: 'Which is valid camelCase?', options: ['first_name', 'First Name', 'firstName', 'FIRSTNAME'], correctIndex: 2, explanation: 'camelCase starts lowercase and capitalizes each new word.' },
        { question: 'What happens when you try to reassign a const?', options: ['It silently fails', 'It logs a warning', 'It throws a TypeError', 'It works fine'], correctIndex: 2, explanation: 'Reassigning a const throws a TypeError at runtime.' },
        { question: 'Which variable name is INVALID?', options: ['_score', '$value', '2fast', 'myVar'], correctIndex: 2, explanation: 'Variable names cannot start with a digit.' },
        { question: 'What is the modern recommended alternative to var?', options: ['let and const', 'set and get', 'define', 'assign'], correctIndex: 0, explanation: 'let and const replaced var in modern JavaScript.' },
        { question: 'let x = 5; x = 10; Is this valid?', options: ['No, let cannot be reassigned', 'Yes, let can be reassigned', 'Only in strict mode', 'No, syntax error'], correctIndex: 1, explanation: 'let variables can be reassigned.' },
        { question: 'Which keyword was used in old JavaScript?', options: ['let', 'const', 'var', 'declare'], correctIndex: 2, explanation: 'var was the original variable declaration keyword.' },
        { question: 'Is myVar the same as myvar?', options: ['Yes, JS is case-insensitive', 'No, JS is case-sensitive', 'Only for const', 'Depends on the browser'], correctIndex: 1, explanation: 'JavaScript is case-sensitive, so myVar ≠ myvar.' },
        { question: 'Which is the best default to use?', options: ['var', 'let', 'const', 'All are equal'], correctIndex: 2, explanation: 'Default to const; switch to let only when the value needs to change.' },
        { question: 'What symbol can start a valid variable name?', options: ['2', '@', '$', '!'], correctIndex: 2, explanation: '$ and _ are the only special characters allowed at the start.' },
        { question: 'const arr = [1,2,3]; arr.push(4); Is this allowed?', options: ['No, const arrays are frozen', 'Yes, you can mutate the array contents', 'Only for numbers', 'Only in Node.js'], correctIndex: 1, explanation: 'const prevents reassignment, but you can still mutate the object/array contents.' },
        { question: 'let score; console.log(score); outputs?', options: ['null', '0', 'undefined', 'Error'], correctIndex: 2, explanation: 'Uninitialized let variables hold undefined.' },
        { question: 'Which is valid?', options: ['let 1name = "a"', 'let my-name = "a"', 'let my_name = "a"', 'let my name = "a"'], correctIndex: 2, explanation: 'Underscores are valid in variable names; hyphens and spaces are not.' },
        { question: 'How many values can a variable hold at once?', options: ['Unlimited', 'Two', 'One', 'Depends on type'], correctIndex: 2, explanation: 'A variable holds one value at a time (though that value can be complex like an array).' },
        { question: 'const x = 5; const x = 10; Is this valid?', options: ['Yes', 'No, you cannot redeclare const in the same scope', 'Only in functions', 'Yes in non-strict mode'], correctIndex: 1, explanation: 'You cannot redeclare a const (or let) in the same scope.' },
        { question: 'What is the value of an uninitialized var?', options: ['null', 'undefined', '0', 'NaN'], correctIndex: 1, explanation: 'Uninitialized variables (var, let) default to undefined.' },
        { question: 'let $price = 9.99; Is this valid?', options: ['No, $ cannot be used', 'Yes, $ is a valid character', 'Only in jQuery code', 'No, use quotes'], correctIndex: 1, explanation: '$ is a valid character in variable names.' },
        { question: 'Which statement about var is true?', options: ['It has block scope', 'It cannot be redeclared', 'It has function/global scope', 'It is identical to let'], correctIndex: 2, explanation: 'var is function-scoped, not block-scoped — a common source of bugs.' },
        { question: 'What does "declare a variable" mean?', options: ['Delete it', 'Create and name it', 'Print it', 'Copy it'], correctIndex: 1, explanation: 'Declaring a variable means creating it and giving it a name.' },
        { question: 'const obj = {}; obj.name = "Alice"; Is this allowed?', options: ['No, const objects are immutable', 'Yes, you can add properties', 'Only in strict mode', 'Only if using let for properties'], correctIndex: 1, explanation: 'const prevents reassigning the reference, but you can mutate the object\'s properties.' },
      ],
    },
    {
      id: 'data-types',
      title: 'Data Types',
      explanation: `JavaScript has **8 data types**. The most common ones you'll use daily are:

**Primitive types:**
- **string** — text in quotes: \`"hello"\`, \`'world'\`, \`` + '`template`' + `\`
- **number** — integers and decimals: \`42\`, \`3.14\`, \`-7\`
- **boolean** — true or false: \`true\`, \`false\`
- **undefined** — a variable that exists but has no value assigned
- **null** — intentionally empty / "no value"

**Complex type:**
- **object** — a collection of key-value pairs: \`{ name: "Alice", age: 30 }\`
- **array** — an ordered list (technically also an object): \`[1, 2, 3]\`

**Special:**
- **symbol** — unique identifiers (advanced)
- **bigint** — huge integers (advanced)

Use \`typeof\` to check what type a value is:
\`\`\`js
typeof "hello"  // "string"
typeof 42       // "number"
typeof true     // "boolean"
\`\`\``,
      jsExample: `// Primitive data types
let greeting = "Hello, World!";   // string
let age = 25;                      // number
let price = 9.99;                  // number (decimals too)
let isLoggedIn = true;             // boolean
let middleName = undefined;        // undefined (no value)
let selectedItem = null;           // null (intentionally empty)

// Check types with typeof
console.log(typeof greeting);      // "string"
console.log(typeof age);           // "number"
console.log(typeof isLoggedIn);    // "boolean"
console.log(typeof middleName);    // "undefined"
console.log(typeof null);          // "object" (quirk of JS!)

// Complex types
let user = { name: "Alice", score: 100 };
let colors = ["red", "green", "blue"];

console.log(typeof user);          // "object"
console.log(typeof colors);        // "object" (arrays are objects)`,
      exercises: [
        {
          title: 'Identify types',
          description: 'Create one variable of each type: string, number, boolean, and null. Log the typeof each.',
          hint: 'let name = "Alice"; let age = 25; let active = true; let nothing = null;',
        },
        {
          title: 'Spot the quirk',
          description: 'Log typeof null and typeof [] — notice the surprising results!',
          hint: 'console.log(typeof null); console.log(typeof []);',
        },
      ],
      quiz: [
        { question: 'What type is "JavaScript"?', options: ['number', 'boolean', 'string', 'undefined'], correctIndex: 2, explanation: 'Text in quotes is a string.' },
        { question: 'What type is 3.14?', options: ['float', 'integer', 'number', 'decimal'], correctIndex: 2, explanation: 'JavaScript has one number type that covers both integers and decimals.' },
        { question: 'What type is true?', options: ['string', 'boolean', 'number', 'bit'], correctIndex: 1, explanation: 'true and false are boolean values.' },
        { question: 'typeof null returns?', options: ['"null"', '"undefined"', '"object"', '"empty"'], correctIndex: 2, explanation: 'typeof null returns "object" — a well-known JS quirk.' },
        { question: 'What is undefined?', options: ['A variable with no value assigned', 'A deleted variable', 'An empty string', 'The number zero'], correctIndex: 0, explanation: 'undefined means a variable exists but has no assigned value.' },
        { question: 'What is the difference between undefined and null?', options: ['They are identical', 'undefined is automatic, null is intentional', 'null is automatic, undefined is intentional', 'null is a number'], correctIndex: 1, explanation: 'undefined happens automatically; null is set intentionally by the programmer.' },
        { question: 'What type is [1, 2, 3]?', options: ['array', 'list', 'object', 'tuple'], correctIndex: 2, explanation: 'typeof an array returns "object" since arrays are objects in JS.' },
        { question: 'How many primitive data types does JS have?', options: ['4', '5', '6', '7'], correctIndex: 3, explanation: 'JS has 7 primitives: string, number, bigint, boolean, undefined, symbol, null.' },
        { question: 'What operator checks a value\'s type?', options: ['typecheck', 'instanceof', 'typeof', 'datatype'], correctIndex: 2, explanation: 'The typeof operator returns the type of a value as a string.' },
        { question: 'typeof 42 returns?', options: ['"int"', '"integer"', '"number"', '"float"'], correctIndex: 2, explanation: 'Both integers and decimals have type "number" in JavaScript.' },
        { question: 'Which is a valid string?', options: ["'hello'", '"hello"', '`hello`', 'All of the above'], correctIndex: 3, explanation: 'JS supports single quotes, double quotes, and backtick template literals.' },
        { question: 'Is JavaScript dynamically typed?', options: ['No, you must declare types', 'Yes, types are determined at runtime', 'Only in strict mode', 'Only for primitives'], correctIndex: 1, explanation: 'JavaScript is dynamically typed — the type is determined when the code runs.' },
        { question: 'let x; typeof x returns?', options: ['"null"', '"empty"', '"undefined"', '"unknown"'], correctIndex: 2, explanation: 'An uninitialized variable has type undefined.' },
        { question: 'What is NaN?', options: ['A string type', 'Not a Number — a special number value', 'An error', 'An empty variable'], correctIndex: 1, explanation: 'NaN (Not a Number) is a special numeric value that results from invalid math.' },
        { question: 'typeof NaN returns?', options: ['"NaN"', '"undefined"', '"number"', '"error"'], correctIndex: 2, explanation: 'Despite meaning "Not a Number", NaN has type "number" — another JS quirk.' },
        { question: 'Which value is falsy?', options: ['1', '"false"', '[]', 'null'], correctIndex: 3, explanation: 'null, undefined, 0, "", NaN, and false are all falsy values.' },
        { question: 'What type is { name: "Alice" }?', options: ['dict', 'map', 'object', 'record'], correctIndex: 2, explanation: 'Curly-brace key-value pairs are objects in JavaScript.' },
        { question: 'Can a JS variable change type?', options: ['No, once set it is fixed', 'Yes, JS is dynamically typed', 'Only if using var', 'Only between number and string'], correctIndex: 1, explanation: 'In JS, a variable can hold any type at any time.' },
        { question: 'What is the BigInt type for?', options: ['Very large integers beyond Number limits', 'Floating point math', 'Binary data', 'Negative numbers'], correctIndex: 0, explanation: 'BigInt handles integers larger than Number.MAX_SAFE_INTEGER.' },
        { question: 'typeof true returns?', options: ['"1"', '"boolean"', '"bool"', '"true"'], correctIndex: 1, explanation: 'true and false have type "boolean".' },
      ],
    },
    {
      id: 'operators',
      title: 'Operators',
      explanation: `Operators perform actions on values. JavaScript has several categories:

**Arithmetic operators:** \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (remainder), \`**\` (exponent)

**Assignment operators:** \`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`
\`\`\`js
let x = 10;
x += 5;  // same as x = x + 5; → 15
x++;     // increment by 1
x--;     // decrement by 1
\`\`\`

**Comparison operators** (return true/false):
\`==\` (loose equal), \`===\` (strict equal), \`!=\`, \`!==\`, \`<\`, \`>\`, \`<=\`, \`>=\`

**Logical operators:**
\`&&\` (AND), \`||\` (OR), \`!\` (NOT)

**⚠️ Always use === over ==** — triple equals checks both value AND type, avoiding bugs:
\`\`\`js
"5" == 5   // true  (loose: converts types)
"5" === 5  // false (strict: different types)
\`\`\``,
      jsExample: `// Arithmetic
console.log(10 + 3);   // 13
console.log(10 - 3);   // 7
console.log(10 * 3);   // 30
console.log(10 / 3);   // 3.333...
console.log(10 % 3);   // 1 (remainder)
console.log(2 ** 8);   // 256 (2 to the power of 8)

// Assignment shorthand
let score = 100;
score += 50;   // 150
score -= 20;   // 130
score *= 2;    // 260
console.log("Score:", score);

// Comparison
console.log(5 === 5);    // true
console.log("5" === 5);  // false (different types!)
console.log("5" == 5);   // true (loose — avoid this)
console.log(10 > 3);     // true

// Logical
console.log(true && false);  // false
console.log(true || false);  // true
console.log(!true);          // false`,
      exercises: [
        {
          title: 'Remainder operator',
          description: 'Use % to check if 17 is even or odd. (Hint: even numbers have remainder 0 when divided by 2)',
          hint: 'console.log(17 % 2); // 1 means odd, 0 means even',
        },
        {
          title: 'Strict vs loose',
          description: 'Compare 0 == false and 0 === false and log both. Observe the difference.',
          hint: 'console.log(0 == false); console.log(0 === false);',
        },
      ],
      quiz: [
        { question: 'What does % do?', options: ['Percentage', 'Division', 'Remainder after division', 'Power'], correctIndex: 2, explanation: '% is the modulo/remainder operator: 10 % 3 = 1.' },
        { question: 'What does ** do?', options: ['Pointer', 'Exponentiation (power)', 'Bitwise AND', 'Double multiply'], correctIndex: 1, explanation: '2 ** 3 = 8 (2 to the power of 3).' },
        { question: 'x += 5 is the same as?', options: ['x = 5', 'x = x + 5', 'x + 5', 'x = x * 5'], correctIndex: 1, explanation: '+= is shorthand for adding to the current value.' },
        { question: 'Which is the strict equality operator?', options: ['==', '=', '===', '!=='], correctIndex: 2, explanation: '=== checks both value and type; == only checks value.' },
        { question: '"5" == 5 evaluates to?', options: ['false', 'true', 'TypeError', 'undefined'], correctIndex: 1, explanation: '== does type coercion, so "5" == 5 is true.' },
        { question: '"5" === 5 evaluates to?', options: ['true', 'false', 'TypeError', 'SyntaxError'], correctIndex: 1, explanation: '=== checks type too — string and number are different types.' },
        { question: 'true && false evaluates to?', options: ['true', 'false', 'undefined', 'null'], correctIndex: 1, explanation: 'AND requires both sides to be true.' },
        { question: 'true || false evaluates to?', options: ['false', 'true', 'null', 'undefined'], correctIndex: 1, explanation: 'OR requires at least one side to be true.' },
        { question: '!true evaluates to?', options: ['true', 'false', 'null', '0'], correctIndex: 1, explanation: '! is NOT — it inverts the boolean.' },
        { question: 'What does x++ do?', options: ['Multiply x by itself', 'Increment x by 1', 'Decrement x by 1', 'Double x'], correctIndex: 1, explanation: '++ is the increment operator — adds 1 to the variable.' },
        { question: '10 / 4 in JavaScript outputs?', options: ['2', '2.5', '3', '2r2'], correctIndex: 1, explanation: 'JS division returns a decimal: 10/4 = 2.5.' },
        { question: 'Which operator checks NOT equal (strict)?', options: ['!=', '!==', '<>', '=/='], correctIndex: 1, explanation: '!== is strict not-equal — checks both value and type.' },
        { question: '5 >= 5 evaluates to?', options: ['false', 'true', 'undefined', '0'], correctIndex: 1, explanation: '>= means greater than OR equal, so 5 >= 5 is true.' },
        { question: 'Which should you prefer?', options: ['== always', '=== always', 'Depends on situation', 'Use = for comparison'], correctIndex: 1, explanation: 'Always prefer === to avoid unexpected type coercion bugs.' },
        { question: 'let x = 5; x -= 2; x now equals?', options: ['3', '7', '10', '2'], correctIndex: 0, explanation: 'x -= 2 subtracts 2: 5 - 2 = 3.' },
        { question: '"hello" + "world" outputs?', options: ['Error', '"hello world"', '"helloworld"', 'hello+world'], correctIndex: 2, explanation: '+ concatenates strings without a space unless you add one.' },
        { question: '2 ** 10 equals?', options: ['20', '100', '1024', '512'], correctIndex: 2, explanation: '2 to the power of 10 is 1024.' },
        { question: 'false || true evaluates to?', options: ['false', 'true', 'undefined', 'null'], correctIndex: 1, explanation: 'OR returns true if at least one operand is true.' },
        { question: 'What does the = operator do?', options: ['Compare values', 'Assign a value', 'Check equality', 'Declare a variable'], correctIndex: 1, explanation: '= is the assignment operator — it sets a value.' },
        { question: '7 % 2 equals?', options: ['3', '3.5', '1', '0'], correctIndex: 2, explanation: '7 divided by 2 is 3 with remainder 1.' },
      ],
    },
    {
      id: 'strings',
      title: 'Working with Strings',
      explanation: `Strings are sequences of characters. JavaScript provides many powerful ways to work with them.

**Creating strings:**
\`\`\`js
let name = "Alice";
let greeting = 'Hello!';
let multiLine = \`Line 1
Line 2\`;
\`\`\`

**Template literals** (backtick strings) — the modern way to embed variables:
\`\`\`js
let age = 25;
console.log(\`My name is \${name} and I am \${age} years old.\`);
\`\`\`

**Useful string methods:**
| Method | What it does |
|--------|-------------|
| \`.length\` | Number of characters |
| \`.toUpperCase()\` | ALL CAPS |
| \`.toLowerCase()\` | all lowercase |
| \`.includes("text")\` | true/false: does it contain "text"? |
| \`.slice(start, end)\` | Extract part of string |
| \`.replace("old", "new")\` | Replace text |
| \`.trim()\` | Remove whitespace from ends |
| \`.split(",")\` | Split into array |`,
      jsExample: `const firstName = "Alice";
const lastName = "Johnson";

// Template literal — embed variables with \${}
const fullName = \`\${firstName} \${lastName}\`;
console.log(fullName);   // "Alice Johnson"

// String properties and methods
console.log(fullName.length);           // 13
console.log(fullName.toUpperCase());    // "ALICE JOHNSON"
console.log(fullName.toLowerCase());    // "alice johnson"
console.log(fullName.includes("Alice")); // true
console.log(fullName.slice(0, 5));      // "Alice"

// Useful operations
const sentence = "  Hello, World!  ";
console.log(sentence.trim());           // "Hello, World!"
console.log(sentence.replace("Hello", "Hi")); // "  Hi, World!  "

// Split into array
const csv = "red,green,blue";
console.log(csv.split(","));            // ["red","green","blue"]

// Repeat
console.log("⭐".repeat(5));           // ⭐⭐⭐⭐⭐`,
      exercises: [
        {
          title: 'Build a profile string',
          description: 'Create firstName and lastName variables, then log a full sentence like "Hello, Alice Johnson! You are 25 years old." using a template literal.',
          hint: 'const msg = `Hello, ${firstName} ${lastName}! You are ${age} years old.`;',
        },
        {
          title: 'String methods chain',
          description: 'Take the string "  javascript is fun  ", trim it and convert to uppercase in one line.',
          hint: 'console.log("  javascript is fun  ".trim().toUpperCase());',
        },
      ],
      quiz: [
        { question: 'What is a template literal?', options: ['A string in double quotes', 'A string wrapped in backticks that can embed variables', 'A multiline comment', 'A string library'], correctIndex: 1, explanation: 'Template literals use backticks and allow ${ } for embedded expressions.' },
        { question: '"hello".length returns?', options: ['4', '5', '6', 'undefined'], correctIndex: 1, explanation: '"hello" has 5 characters.' },
        { question: 'How do you embed a variable in a template literal?', options: ['#{var}', '${var}', '{{var}}', '(var)'], correctIndex: 1, explanation: 'Use ${variableName} inside backtick strings.' },
        { question: '"Hello".toUpperCase() returns?', options: ['"Hello"', '"HELLO"', '"hello"', '"hELLO"'], correctIndex: 1, explanation: 'toUpperCase() converts all characters to uppercase.' },
        { question: '"Hello World".includes("World") returns?', options: ['false', '"World"', 'true', 'undefined'], correctIndex: 2, explanation: 'includes() returns true if the substring is found.' },
        { question: '"abcdef".slice(2, 5) returns?', options: ['"abc"', '"cde"', '"def"', '"bcd"'], correctIndex: 1, explanation: 'slice(2,5) extracts index 2,3,4 → "cde".' },
        { question: '"  hello  ".trim() returns?', options: ['"hello"', '"  hello  "', '"hello  "', '"  hello"'], correctIndex: 0, explanation: 'trim() removes whitespace from both ends.' },
        { question: '"red,blue,green".split(",") returns?', options: ['["red blue green"]', '["red","blue","green"]', '"redbluegreen"', 'Error'], correctIndex: 1, explanation: 'split(",") splits on commas and returns an array.' },
        { question: '"hello".replace("hello", "hi") returns?', options: ['"hello"', '"hi"', '"hellohi"', 'Error'], correctIndex: 1, explanation: 'replace() replaces the first occurrence.' },
        { question: 'Which concatenates two strings?', options: ['Only + operator', 'Only template literals', 'Both + and template literals', 'concat() only'], correctIndex: 2, explanation: 'Both + and template literals can combine strings.' },
        { question: '"JavaScript"[0] returns?', options: ['"J"', '"JavaScript"', '"j"', 'undefined'], correctIndex: 0, explanation: 'Strings are zero-indexed, so [0] is the first character.' },
        { question: 'What is the index of the first character in a string?', options: ['1', '0', '-1', 'First'], correctIndex: 1, explanation: 'Strings (like arrays) are zero-indexed.' },
        { question: '"hello" + " " + "world" returns?', options: ['"hello world"', '"helloworld"', '"hello" "world"', 'Error'], correctIndex: 0, explanation: 'The + operator concatenates strings, including the space.' },
        { question: '"Hi".repeat(3) returns?', options: ['"Hi3"', '"HiHiHi"', '"Hi Hi Hi"', 'Error'], correctIndex: 1, explanation: 'repeat(n) returns the string repeated n times.' },
        { question: 'Which characters wrap a template literal?', options: ['Single quotes', 'Double quotes', 'Backticks', 'Square brackets'], correctIndex: 2, explanation: 'Template literals use backtick (`) characters.' },
        { question: '"HELLO".toLowerCase() returns?', options: ['"HELLO"', '"Hello"', '"hello"', '"hELLO"'], correctIndex: 2, explanation: 'toLowerCase() converts all characters to lowercase.' },
        { question: 'What does "hello".indexOf("l") return?', options: ['1', '2', '3', '-1'], correctIndex: 1, explanation: 'indexOf returns the first position of the character — "l" is at index 2. Wait — "hello": h(0),e(1),l(2) — so index 2.' },
        { question: 'Strings in JS are?', options: ['Mutable', 'Immutable', 'Nullable', 'Numeric'], correctIndex: 1, explanation: 'Strings are immutable — methods return new strings instead of modifying originals.' },
        { question: '"5" + 5 in JavaScript returns?', options: ['"55"', '10', 'Error', '55'], correctIndex: 0, explanation: 'When + has a string, it concatenates: "5" + 5 = "55".' },
        { question: 'How do you get the last character of a string "hello"?', options: ['"hello"[5]', '"hello"[-1]', '"hello"["hello".length - 1]', '"hello".last()'], correctIndex: 2, explanation: 'Use string[string.length - 1] to get the last character.' },
      ],
    },
    {
      id: 'type-conversion',
      title: 'Type Conversion',
      explanation: `JavaScript often needs to convert between types. This happens automatically (coercion) or explicitly (conversion).

**Explicit conversion (you control it):**
\`\`\`js
Number("42")      // 42
Number("hello")   // NaN (Not a Number)
String(100)       // "100"
Boolean(0)        // false
Boolean("hello")  // true
parseInt("42px")  // 42  — parses leading digits
parseFloat("3.5 cups") // 3.5
\`\`\`

**Implicit coercion (JS does it automatically — watch out!):**
\`\`\`js
"5" + 1    // "51"  (number becomes string)
"5" - 1    // 4     (string becomes number with -)
"5" * 2    // 10    (string becomes number)
true + 1   // 2     (true becomes 1)
\`\`\`

**Truthy vs Falsy:**
These values are **falsy**: \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`
Everything else is **truthy** (including \`[]\`, \`{}\`, \`"false"\`).`,
      jsExample: `// Explicit conversion
console.log(Number("42"));       // 42
console.log(Number("3.14"));     // 3.14
console.log(Number("abc"));      // NaN
console.log(Number(true));       // 1
console.log(Number(false));      // 0
console.log(Number(null));       // 0
console.log(Number(undefined));  // NaN

console.log(String(100));        // "100"
console.log(String(true));       // "true"
console.log(String(null));       // "null"

// parseInt and parseFloat
console.log(parseInt("42px"));   // 42 (stops at non-digit)
console.log(parseFloat("3.5 kg")); // 3.5

// Truthy/Falsy
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean("hello"));   // true
console.log(Boolean(42));        // true
console.log(Boolean([]));        // true (empty array is truthy!)`,
      exercises: [
        {
          title: 'Convert user input',
          description: 'Imagine a user typed "25" (as a string). Convert it to a number and multiply by 2.',
          hint: 'let input = "25"; let num = Number(input); console.log(num * 2);',
        },
        {
          title: 'Spot falsy values',
          description: 'Log Boolean() of these values: 0, "", null, "0", [], -1. Which are false?',
          hint: 'console.log(Boolean(0), Boolean(""), Boolean(null), Boolean("0"), Boolean([]), Boolean(-1));',
        },
      ],
      quiz: [
        { question: 'Number("42") returns?', options: ['"42"', '42', 'NaN', 'undefined'], correctIndex: 1, explanation: 'Number() converts a numeric string to a real number.' },
        { question: 'Number("hello") returns?', options: ['0', 'undefined', 'NaN', 'Error'], correctIndex: 2, explanation: 'Non-numeric strings become NaN (Not a Number).' },
        { question: 'Boolean(0) returns?', options: ['true', 'false', '0', 'null'], correctIndex: 1, explanation: '0 is a falsy value, so Boolean(0) is false.' },
        { question: 'Which value is TRUTHY?', options: ['0', '""', 'null', '"false"'], correctIndex: 3, explanation: '"false" is a non-empty string, which is truthy.' },
        { question: '"5" - 1 returns?', options: ['"51"', '4', '"4"', 'NaN'], correctIndex: 1, explanation: '- triggers numeric coercion: "5" becomes 5, then 5 - 1 = 4.' },
        { question: '"5" + 1 returns?', options: ['"51"', '6', '"6"', 'NaN'], correctIndex: 0, explanation: '+ with a string concatenates: "5" + "1" = "51".' },
        { question: 'parseInt("12.5abc") returns?', options: ['"12"', '12', '12.5', 'NaN'], correctIndex: 1, explanation: 'parseInt parses up to the first non-integer character: 12.' },
        { question: 'parseFloat("3.5kg") returns?', options: ['"3.5"', '3', '3.5', 'NaN'], correctIndex: 2, explanation: 'parseFloat extracts the floating-point number: 3.5.' },
        { question: 'Boolean([]) returns?', options: ['false', 'true', 'undefined', '0'], correctIndex: 1, explanation: 'Empty arrays are truthy in JavaScript — only certain specific values are falsy.' },
        { question: 'Number(true) returns?', options: ['true', 'NaN', '0', '1'], correctIndex: 3, explanation: 'true converts to 1, false converts to 0.' },
        { question: 'String(null) returns?', options: ['""', '"null"', 'null', 'undefined'], correctIndex: 1, explanation: 'String(null) produces the string "null".' },
        { question: 'Which are ALL falsy?', options: ['0, "", null, undefined, false, NaN', '0, "", null, undefined, false, NaN, []', '"", null, undefined', '0, false, null'], correctIndex: 0, explanation: 'The 6 falsy values: false, 0, "", null, undefined, NaN.' },
        { question: 'true + true in JS equals?', options: ['true', '"truetrue"', '2', '1'], correctIndex: 2, explanation: 'true coerces to 1, so true + true = 1 + 1 = 2.' },
        { question: 'Number(null) returns?', options: ['NaN', 'null', '0', 'undefined'], correctIndex: 2, explanation: 'Number(null) returns 0.' },
        { question: 'What is NaN?', options: ['A null value', 'Not a Number — result of invalid numeric operations', 'An error type', 'An undefined variable'], correctIndex: 1, explanation: 'NaN means the result of an operation that should produce a number but couldn\'t.' },
        { question: 'isNaN("hello") returns?', options: ['false', 'true', 'undefined', 'NaN'], correctIndex: 1, explanation: '"hello" cannot be converted to a valid number, so isNaN returns true.' },
        { question: 'What does implicit coercion mean?', options: ['Manually converting types', 'JavaScript automatically converts types', 'A strict type rule', 'Using Number() or String()'], correctIndex: 1, explanation: 'Implicit coercion is when JS automatically converts one type to another.' },
        { question: 'Boolean("") returns?', options: ['true', '"false"', 'false', '0'], correctIndex: 2, explanation: 'Empty string is falsy.' },
        { question: 'Number(undefined) returns?', options: ['0', 'undefined', 'null', 'NaN'], correctIndex: 3, explanation: 'Number(undefined) returns NaN.' },
        { question: '"10" * 2 returns?', options: ['"102"', '"20"', '20', 'NaN'], correctIndex: 2, explanation: '* triggers coercion, so "10" becomes 10, then 10 * 2 = 20.' },
      ],
    },
    {
      id: 'input-output',
      title: 'User Input & Output',
      explanation: `In a browser, you can interact with users through built-in dialog functions or by manipulating the DOM.

**Browser dialogs:**
\`\`\`js
alert("Hello!");          // Shows a popup message
let name = prompt("Your name?"); // Gets text input from user
let ok = confirm("Continue?");   // Returns true or false
\`\`\`

**Console output** (for development):
\`\`\`js
console.log("Info");
console.error("Error message");
console.warn("Warning");
console.table([{a:1}, {a:2}]);  // Formatted table
\`\`\`

**DOM output** (showing results in the page):
\`\`\`js
document.getElementById("output").textContent = "Hello!";
\`\`\`

💡 In this course's code editor, we use \`console.log()\` for output since it's safe and predictable. The \`alert\` and \`prompt\` functions can interrupt the page.`,
      jsExample: `// console methods — your debugging toolkit
console.log("Regular message");
console.error("Something went wrong!");
console.warn("Watch out for this...");

// Logging different types
console.log("Name:", "Alice");
console.log("Age:", 30);
console.log("Active:", true);
console.log("Scores:", [95, 87, 92]);
console.log("User:", { name: "Alice", score: 100 });

// console.table for arrays/objects (try it in browser dev tools!)
const students = [
  { name: "Alice", grade: "A" },
  { name: "Bob", grade: "B" },
];
console.log(JSON.stringify(students, null, 2));

// String formatting
let price = 9.99;
console.log(\`The price is $\${price}\`);`,
      exercises: [
        {
          title: 'Log a user profile',
          description: 'Create an object with name, age, and hobby. Log each property with a descriptive label.',
          hint: 'const user = {name: "Alice", age: 25, hobby: "coding"}; console.log("Name:", user.name);',
        },
        {
          title: 'Error vs warning',
          description: 'Log one console.error and one console.warn message to see the different styling.',
          hint: 'console.error("Something broke!"); console.warn("This is a warning.");',
        },
      ],
      quiz: [
        { question: 'What does alert() do?', options: ['Logs to console', 'Shows a browser popup', 'Throws an error', 'Stops code execution'], correctIndex: 1, explanation: 'alert() shows a modal popup with a message.' },
        { question: 'What does prompt() return?', options: ['undefined', 'A boolean', 'The string the user typed', 'An alert'], correctIndex: 2, explanation: 'prompt() returns the text the user entered (or null if cancelled).' },
        { question: 'What does confirm() return?', options: ['The text entered', 'true or false', 'null', 'undefined'], correctIndex: 1, explanation: 'confirm() returns true if OK was clicked, false if Cancel.' },
        { question: 'console.error() vs console.log():', options: ['They are identical', 'error() prints in red with a stack trace in DevTools', 'error() stops execution', 'error() is not valid'], correctIndex: 1, explanation: 'console.error shows a red error style in browser DevTools.' },
        { question: 'Which logs all properties of an object in a table?', options: ['console.log()', 'console.table()', 'console.grid()', 'console.object()'], correctIndex: 1, explanation: 'console.table() displays arrays/objects in a formatted table.' },
        { question: 'If user cancels prompt(), it returns?', options: ['""', 'undefined', 'null', 'false'], correctIndex: 2, explanation: 'prompt() returns null if the user cancels.' },
        { question: 'console.warn() shows in?', options: ['Red', 'Yellow/orange', 'Green', 'Blue'], correctIndex: 1, explanation: 'console.warn displays in yellow/orange in browser DevTools.' },
        { question: 'How do you output to the webpage (not console)?', options: ['console.show()', 'document.getElementById().textContent', 'page.write()', 'html.output()'], correctIndex: 1, explanation: 'You set an element\'s textContent or innerHTML to show output on the page.' },
        { question: 'What does console.log(typeof prompt()) return?', options: ['"string"', '"object"', '"function"', '"undefined"'], correctIndex: 0, explanation: 'prompt() returns a string (or null). typeof on a string is "string".' },
        { question: 'Which is best for development debugging?', options: ['alert()', 'confirm()', 'console.log()', 'document.write()'], correctIndex: 2, explanation: 'console.log() is the go-to debugging tool — non-intrusive and detailed.' },
        { question: 'alert() blocks code execution?', options: ['No, code continues in background', 'Yes, until the user dismisses it', 'Only in async code', 'Depends on browser'], correctIndex: 1, explanation: 'alert() is synchronous and blocking — code pauses until dismissed.' },
        { question: 'console.log(1, 2, 3) outputs?', options: ['"1,2,3"', '123', '1 2 3', '[1,2,3]'], correctIndex: 2, explanation: 'console.log with multiple args separates them with spaces.' },
        { question: 'Which console method clears the console?', options: ['console.empty()', 'console.reset()', 'console.clear()', 'console.delete()'], correctIndex: 2, explanation: 'console.clear() clears the console.' },
        { question: 'document.write() is generally?', options: ['The best output method', 'Recommended for production', 'Discouraged — can overwrite the whole page', 'Identical to console.log'], correctIndex: 2, explanation: 'document.write() after page load overwrites the entire page — generally avoid it.' },
        { question: 'How do you log an object as a readable JSON string?', options: ['console.log(obj.toString())', 'console.log(JSON.stringify(obj))', 'console.log(obj.print())', 'console.json(obj)'], correctIndex: 1, explanation: 'JSON.stringify converts an object to a readable JSON string.' },
        { question: 'What happens if you call alert() inside a loop 100 times?', options: ['Only the first shows', 'All 100 pop-ups appear one after another', 'An error is thrown', 'It is skipped after 10'], correctIndex: 1, explanation: 'Every call to alert() shows a popup — 100 calls = 100 popups.' },
        { question: 'console.log("Score:", 95) outputs?', options: ['"Score:95"', '"Score: 95"', 'Score: 95', '"Score:" 95'], correctIndex: 2, explanation: 'Multiple arguments are printed with a space between them.' },
        { question: 'Which method shows a yes/no dialog?', options: ['alert()', 'prompt()', 'confirm()', 'dialog()'], correctIndex: 2, explanation: 'confirm() shows OK/Cancel buttons and returns a boolean.' },
        { question: 'console.log is primarily used for?', options: ['Showing user messages', 'Debugging during development', 'Production error reporting', 'Styling output'], correctIndex: 1, explanation: 'console.log is a developer debugging tool, not for user-facing messages.' },
        { question: 'Which outputs a string representation of an object?', options: ['console.log(obj)', 'JSON.stringify(obj)', 'obj.toString()', 'All produce the same output'], correctIndex: 1, explanation: 'JSON.stringify gives a clean string; console.log may show [Object object] in some contexts.' },
      ],
    },
  ],
};
