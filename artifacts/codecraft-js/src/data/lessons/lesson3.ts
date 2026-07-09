import { Lesson } from '../types';

export const lesson3: Lesson = {
  id: 'lesson3',
  title: 'The DOM & Events',
  topics: [
    {
      id: 'dom-intro',
      title: 'What is the DOM?',
      explanation: `The **Document Object Model (DOM)** is the browser's representation of your HTML page as a tree of objects that JavaScript can read and modify.

When the browser loads HTML like this:
\`\`\`html
<h1 id="title">Hello</h1>
<p class="intro">Welcome!</p>
\`\`\`

It creates a tree:
- \`document\` → \`<html>\` → \`<body>\` → \`<h1>\`, \`<p>\`

JavaScript can then:
\`\`\`js
// Select elements
const title = document.getElementById("title");
const intro = document.querySelector(".intro");

// Read content
console.log(title.textContent); // "Hello"

// Modify content
title.textContent = "JavaScript is fun!";
title.style.color = "teal";
\`\`\`

**Key DOM selection methods:**
| Method | Selects |
|--------|---------|
| \`getElementById("id")\` | One element by ID |
| \`querySelector("css")\` | First match of CSS selector |
| \`querySelectorAll("css")\` | All matches (NodeList) |
| \`getElementsByClassName("cls")\` | All with class |
| \`getElementsByTagName("tag")\` | All with tag name |`,
      jsExample: `// In this editor, we simulate DOM output with console.log
// In a real browser, you'd do:
// const el = document.getElementById("myDiv");
// el.textContent = "Hello!";

// Let's demonstrate DOM concepts with logging:

// Simulating what DOM manipulation does:
const pageTitle = "CodeCraft JavaScript";
const subtitle = "Learn JS the right way";

// "Rendering" to the output:
console.log("=== Page ===");
console.log("Title:", pageTitle);
console.log("Subtitle:", subtitle);

// DOM tree traversal concepts
const structure = {
  html: {
    head: { title: pageTitle },
    body: {
      h1: pageTitle,
      p: subtitle,
      ul: ["Lesson 1", "Lesson 2", "Lesson 3"]
    }
  }
};

// Walk the body's list
structure.html.body.ul.forEach((item, i) => {
  console.log(\`  li[\${i}]: \${item}\`);
});`,
      exercises: [
        {
          title: 'DOM selection quiz',
          description: 'Log which method you would use to: 1) select by ID, 2) select all paragraphs, 3) select the first .card element.',
          hint: 'console.log("By ID: getElementById"); console.log("All p: querySelectorAll"); ...',
        },
        {
          title: 'Simulate a DOM update',
          description: 'Create an object representing a page element with text, color, and classList. Log the "before" and "after" state after updating the text.',
          hint: 'const el = {text: "Hello", color: "black"}; el.text = "World"; console.log(el);',
        },
      ],
      quiz: [
        { question: 'What does DOM stand for?', options: ['Document Object Model', 'Data Object Management', 'Design Object Module', 'Dynamic Output Mode'], correctIndex: 0, explanation: 'DOM = Document Object Model — the browser\'s JS-readable representation of the HTML page.' },
        { question: 'Which method selects an element by its ID?', options: ['querySelector("#id")', 'getElementById("id")', 'getElement("id")', 'selectById("id")'], correctIndex: 1, explanation: 'getElementById() selects one element with the given ID.' },
        { question: 'querySelector() returns?', options: ['All matching elements', 'The first matching element', 'An array of elements', 'The document'], correctIndex: 1, explanation: 'querySelector() returns the first element matching the CSS selector.' },
        { question: 'querySelectorAll() returns?', options: ['A single element', 'An array', 'A NodeList (array-like)', 'undefined'], correctIndex: 2, explanation: 'querySelectorAll() returns a static NodeList of all matching elements.' },
        { question: 'How do you change an element\'s text content?', options: ['el.innerHTML', 'el.textContent = "new text"', 'el.value = "text"', 'el.write("text")'], correctIndex: 1, explanation: 'el.textContent sets the text content of an element.' },
        { question: 'What is the root of the DOM tree?', options: ['window', 'html', 'document', 'body'], correctIndex: 2, explanation: 'document is the entry point to the DOM tree.' },
        { question: 'How do you change an element\'s CSS with JavaScript?', options: ['el.css.color = "red"', 'el.style.color = "red"', 'el.setStyle("color", "red")', 'el.setAttribute(style, "color:red")'], correctIndex: 1, explanation: 'el.style.propertyName accesses inline styles.' },
        { question: 'innerHTML vs textContent?', options: ['They are identical', 'innerHTML parses HTML; textContent treats everything as text', 'textContent parses HTML', 'innerHTML is faster'], correctIndex: 1, explanation: 'innerHTML can set HTML content; textContent is safer (no XSS risk) for plain text.' },
        { question: 'What does document.createElement("div") do?', options: ['Selects a div', 'Creates a new div element (not yet in the DOM)', 'Removes a div', 'Clones a div'], correctIndex: 1, explanation: 'createElement creates a new element that you can then insert into the DOM.' },
        { question: 'How do you add an element to the DOM?', options: ['document.add(el)', 'parent.appendChild(el)', 'el.insert()', 'document.push(el)'], correctIndex: 1, explanation: 'appendChild() adds an element as the last child of a parent.' },
        { question: 'el.getAttribute("href") gets?', options: ['The element\'s tag', 'The value of the href attribute', 'The element\'s text', 'A CSS property'], correctIndex: 1, explanation: 'getAttribute() reads the value of an HTML attribute.' },
        { question: 'el.classList.add("active") does?', options: ['Removes the active class', 'Adds the active class to the element', 'Toggles the class', 'Replaces all classes'], correctIndex: 1, explanation: 'classList.add() adds a class without removing existing ones.' },
        { question: 'el.classList.toggle("open") does?', options: ['Adds "open" always', 'Removes "open" always', 'Adds "open" if absent, removes if present', 'Errors if class missing'], correctIndex: 2, explanation: 'toggle() adds the class if missing, removes it if present.' },
        { question: 'How do you remove an element from the DOM?', options: ['el.remove()', 'el.delete()', 'document.remove(el)', 'el.destroy()'], correctIndex: 0, explanation: 'el.remove() removes the element from the DOM.' },
        { question: 'document.body refers to?', options: ['The <head> element', 'The <html> element', 'The <body> element', 'The root document'], correctIndex: 2, explanation: 'document.body is a shortcut to the <body> element.' },
        { question: 'el.parentElement returns?', options: ['The element\'s next sibling', 'The element\'s parent in the DOM', 'The document', 'All ancestors'], correctIndex: 1, explanation: 'parentElement gives the direct parent element.' },
        { question: 'el.children returns?', options: ['An array of text nodes', 'An HTMLCollection of child elements', 'null', 'The first child only'], correctIndex: 1, explanation: 'el.children returns a live HTMLCollection of child elements.' },
        { question: 'What risk does innerHTML pose?', options: ['Slow performance', 'XSS (Cross-Site Scripting) attacks if user data is inserted', 'Can only handle numbers', 'Breaks the DOM tree'], correctIndex: 1, explanation: 'innerHTML can execute scripts — never set it with untrusted user data.' },
        { question: 'el.dataset.userId accesses?', options: ['The element\'s ID attribute', 'data-user-id attribute', 'A JavaScript property', 'A CSS variable'], correctIndex: 1, explanation: 'dataset provides access to data-* attributes.' },
        { question: 'Which property gives an element\'s current width in pixels?', options: ['el.width', 'el.style.width', 'el.offsetWidth', 'el.clientWidth'], correctIndex: 2, explanation: 'offsetWidth returns the element\'s layout width including borders.' },
      ],
    },
    {
      id: 'events',
      title: 'Events & Event Listeners',
      explanation: `Events are things that happen in the browser — clicks, key presses, form submissions, mouse movements.

**Adding an event listener:**
\`\`\`js
const button = document.querySelector("button");
button.addEventListener("click", function() {
  console.log("Button clicked!");
});
\`\`\`

**The Event object** — passed automatically to your handler:
\`\`\`js
button.addEventListener("click", (event) => {
  console.log("Clicked at:", event.clientX, event.clientY);
  console.log("Target:", event.target);
});
\`\`\`

**Common events:**
| Event | When it fires |
|-------|--------------|
| \`click\` | Mouse click |
| \`dblclick\` | Double click |
| \`keydown\` | Key pressed |
| \`keyup\` | Key released |
| \`submit\` | Form submitted |
| \`input\` | Input value changes |
| \`change\` | Input loses focus after change |
| \`mouseover\` | Mouse enters element |
| \`load\` | Page/image loaded |
| \`DOMContentLoaded\` | DOM ready |

**Event delegation** — attach one listener to a parent instead of many to children:
\`\`\`js
list.addEventListener("click", (e) => {
  if (e.target.matches("li")) { ... }
});
\`\`\``,
      jsExample: `// In the browser you'd use addEventListener.
// Here we simulate the event flow:

function simulateClick(buttonName) {
  console.log(\`[\${buttonName}] was clicked!\`);
  return { type: "click", target: buttonName, timestamp: Date.now() };
}

function simulateInput(fieldName, value) {
  console.log(\`[\${fieldName}] input changed to: "\${value}"\`);
}

function simulateSubmit(formData) {
  // preventDefault would normally stop page reload
  console.log("Form submitted with:", formData);
  if (!formData.email) {
    console.error("Validation: email is required");
    return false;
  }
  console.log("✅ Form is valid — would send to server");
  return true;
}

// Simulate user interactions:
simulateClick("Login Button");
simulateInput("Email", "user@example.com");
simulateInput("Password", "••••••••");
simulateSubmit({ email: "user@example.com", password: "secret" });
simulateSubmit({ email: "", password: "secret" });`,
      exercises: [
        {
          title: 'Event handler simulation',
          description: 'Write a function that simulates 3 different events: a click, a keypress, and a form submit. Log descriptive messages for each.',
          hint: 'function onClick() {...} function onKeypress(key) {...} function onSubmit(data) {...}',
        },
        {
          title: 'Validation logic',
          description: 'Write a validateEmail(email) function that returns true if the email contains "@" and ".", false otherwise.',
          hint: 'const validateEmail = email => email.includes("@") && email.includes(".");',
        },
      ],
      quiz: [
        { question: 'Which method attaches an event listener?', options: ['el.onClick()', 'el.addEvent()', 'el.addEventListener()', 'el.on()'], correctIndex: 2, explanation: 'addEventListener() is the standard way to attach events.' },
        { question: 'What does event.preventDefault() do?', options: ['Stops the event from firing', 'Prevents the default browser behavior (e.g., form submission, link navigation)', 'Removes the event listener', 'Stops bubbling'], correctIndex: 1, explanation: 'preventDefault() stops the browser\'s default action for that event.' },
        { question: 'What does event.stopPropagation() do?', options: ['Cancels the event', 'Stops the event from bubbling up the DOM', 'Prevents default behavior', 'Removes the listener'], correctIndex: 1, explanation: 'stopPropagation() prevents the event from bubbling to parent elements.' },
        { question: 'What is event bubbling?', options: ['An event firing multiple times', 'An event propagating up from the target to ancestors', 'An event that only fires on parents', 'A type of click event'], correctIndex: 1, explanation: 'Bubbling means events propagate upward from the target element to its ancestors.' },
        { question: 'event.target refers to?', options: ['The element that has the listener', 'The element that triggered the event', 'The document', 'The window'], correctIndex: 1, explanation: 'event.target is the element that actually triggered the event.' },
        { question: 'event.currentTarget refers to?', options: ['The element that triggered the event', 'The element with the event listener attached', 'The parent element', 'window'], correctIndex: 1, explanation: 'currentTarget is always the element with the listener.' },
        { question: 'What is event delegation?', options: ['Removing listeners from children', 'Attaching one listener to a parent to handle events from its children', 'Blocking certain events', 'Auto-creating event listeners'], correctIndex: 1, explanation: 'Event delegation uses bubbling to handle child events from a single parent listener.' },
        { question: 'Which event fires when a form is submitted?', options: ['"click"', '"submit"', '"send"', '"form"'], correctIndex: 1, explanation: 'The "submit" event fires when a form is submitted.' },
        { question: '"input" event vs "change" event:', options: ['They are identical', '"input" fires on every keystroke; "change" fires when focus is lost after a change', '"change" fires immediately; "input" after blur', 'Both fire once on submit'], correctIndex: 1, explanation: '"input" fires immediately on each change; "change" fires when the user leaves the field.' },
        { question: 'Which event fires when the DOM is ready?', options: ['"load"', '"ready"', '"DOMContentLoaded"', '"start"'], correctIndex: 2, explanation: 'DOMContentLoaded fires when the HTML is parsed (before images/styles).' },
        { question: 'How do you remove an event listener?', options: ['el.removeEvent()', 'el.removeEventListener(type, fn)', 'el.offEvent()', 'el.detachEvent()'], correctIndex: 1, explanation: 'removeEventListener() removes a previously added listener.' },
        { question: 'el.addEventListener("click", fn) — fn is called?', options: ['Immediately', 'On every click', 'Once, then removed', 'Only on first click'], correctIndex: 1, explanation: 'addEventListener runs the callback on every occurrence of the event.' },
        { question: 'To fire only once, use?', options: ['el.addEventOnce()', 'el.addEventListener("click", fn, { once: true })', 'el.onceClick(fn)', 'removeEventListener after first call manually'], correctIndex: 1, explanation: 'The { once: true } option automatically removes the listener after the first fire.' },
        { question: 'What does event.key return for a keyboard event?', options: ['The key code number', 'The actual key name (e.g., "Enter", "a")', 'The character code', 'The element value'], correctIndex: 1, explanation: 'event.key returns the name of the pressed key.' },
        { question: 'Which event fires when the mouse enters an element?', options: ['"mouseenter"', '"mousein"', '"mouseon"', '"hover"'], correctIndex: 0, explanation: '"mouseenter" fires when the mouse enters the element.' },
        { question: 'What is a passive event listener?', options: ['A listener that fires only once', 'A listener that never calls preventDefault — improves scroll performance', 'A listener attached to window', 'A listener with no callback'], correctIndex: 1, explanation: 'Passive listeners tell the browser you won\'t call preventDefault — enables scroll optimizations.' },
        { question: 'window.addEventListener("load", fn) fires when?', options: ['DOM is parsed', 'All resources (images, stylesheets) are fully loaded', 'First user interaction', 'Script is parsed'], correctIndex: 1, explanation: '"load" fires only after all resources including images are fully loaded.' },
        { question: 'How do you get the value of an input field?', options: ['input.text', 'input.value', 'input.getAttribute("value")', 'input.textContent'], correctIndex: 1, explanation: 'input.value gives the current value of an input element.' },
        { question: 'Which event type best fits "user pressed Escape key"?', options: ['"keypress"', '"keydown"', '"keyup"', '"escape"'], correctIndex: 1, explanation: '"keydown" fires as soon as the key is pressed, before it\'s released.' },
        { question: 'Can one element have multiple event listeners for the same event?', options: ['No, only one per event type', 'Yes, multiple listeners can be added', 'Only with once: true', 'Only in strict mode'], correctIndex: 1, explanation: 'Multiple listeners can be added for the same event type on the same element.' },
      ],
    },
    {
      id: 'error-handling',
      title: 'Error Handling',
      explanation: `Errors are inevitable — the key is handling them gracefully so your app doesn't crash.

**try / catch / finally:**
\`\`\`js
try {
  // code that might fail
  const data = JSON.parse(inputString);
} catch (error) {
  // runs if try block throws
  console.error("Parse failed:", error.message);
} finally {
  // always runs (cleanup)
  console.log("Done");
}
\`\`\`

**Error types:**
- **SyntaxError** — invalid JS syntax
- **ReferenceError** — using an undeclared variable
- **TypeError** — wrong type (calling non-function, etc.)
- **RangeError** — value out of allowed range

**Throwing custom errors:**
\`\`\`js
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
\`\`\`

**Error object properties:** \`.name\`, \`.message\`, \`.stack\``,
      jsExample: `// Basic try/catch
function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("Invalid JSON:", e.message);
    return null;
  }
}

console.log(parseJSON('{"name":"Alice"}'));  // {name: "Alice"}
console.log(parseJSON("not valid json"));    // null (caught)

// Custom error throwing
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Arguments must be numbers");
  }
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

try {
  console.log(divide(10, 2));   // 5
  console.log(divide(10, 0));   // throws
} catch (e) {
  console.error(\`\${e.name}: \${e.message}\`);
}

// finally always runs
function fetchData(url) {
  try {
    if (!url) throw new Error("URL required");
    console.log("Fetching:", url);
    return { data: "success" };
  } catch (e) {
    console.error("Fetch failed:", e.message);
    return null;
  } finally {
    console.log("Fetch attempt complete (finally)");
  }
}

fetchData("https://api.example.com");
fetchData("");`,
      exercises: [
        {
          title: 'Safe division',
          description: 'Write a safeDivide(a, b) function that returns the result or throws if b is 0. Wrap the call in try/catch.',
          hint: 'function safeDivide(a, b) { if (b === 0) throw new Error("zero"); return a/b; }',
        },
        {
          title: 'JSON validator',
          description: 'Write a function that tries to parse a JSON string, returns the object on success or an error message string on failure.',
          hint: 'function parseOrError(str) { try { return JSON.parse(str); } catch (e) { return "Error: " + e.message; } }',
        },
      ],
      quiz: [
        { question: 'What does try/catch do?', options: ['Runs code twice', 'Tries code; catches errors if they occur', 'Catches only network errors', 'A loop construct'], correctIndex: 1, explanation: 'try runs the code; catch runs if an error is thrown.' },
        { question: 'When does finally run?', options: ['Only when there is no error', 'Only when there is an error', 'Always, regardless of error', 'Never'], correctIndex: 2, explanation: 'finally always runs — it\'s used for cleanup.' },
        { question: 'What is a TypeError?', options: ['A syntax mistake', 'An error from using a value of the wrong type', 'An undefined variable', 'A network error'], correctIndex: 1, explanation: 'TypeError occurs when an operation is applied to an incompatible type.' },
        { question: 'What is a ReferenceError?', options: ['Calling a wrong function', 'Accessing a variable that is not declared', 'Wrong JSON format', 'Division by zero'], correctIndex: 1, explanation: 'ReferenceError occurs when you access an undeclared variable.' },
        { question: 'throw new Error("message") does?', options: ['Logs an error', 'Creates and throws an Error object, stopping execution', 'Catches an error', 'Warns the user'], correctIndex: 1, explanation: 'throw stops execution and propagates the error up the call stack.' },
        { question: 'error.message contains?', options: ['The stack trace', 'The error type', 'The descriptive error message', 'The line number'], correctIndex: 2, explanation: 'error.message is the human-readable description of the error.' },
        { question: 'Can you throw any value, not just Error objects?', options: ['No, only Error instances', 'Yes, you can throw strings, numbers, objects', 'Only in async code', 'Only in strict mode'], correctIndex: 1, explanation: 'You can throw any value, but Error objects (with .message, .stack) are recommended.' },
        { question: 'What happens if an error is not caught?', options: ['Code continues', 'JS logs it and continues', 'The program crashes / unhandled exception', 'It becomes null'], correctIndex: 2, explanation: 'Uncaught errors crash the script and appear in the console.' },
        { question: 'JSON.parse("invalid") throws?', options: ['TypeError', 'SyntaxError', 'RangeError', 'ReferenceError'], correctIndex: 1, explanation: 'JSON.parse throws a SyntaxError when given invalid JSON.' },
        { question: 'null.property throws?', options: ['ReferenceError', 'TypeError', 'SyntaxError', 'RangeError'], correctIndex: 1, explanation: 'Accessing a property on null throws TypeError: Cannot read properties of null.' },
        { question: 'new Array(-1) throws?', options: ['TypeError', 'SyntaxError', 'RangeError', 'Error'], correctIndex: 2, explanation: 'RangeError occurs when a value is outside the allowed range, like negative array length.' },
        { question: 'How do you create a custom error class?', options: ['function MyError(msg) {}', 'class MyError extends Error {}', 'throw { type: "MyError" }', 'Error.create("MyError")'], correctIndex: 1, explanation: 'Extend the Error class to create custom error types.' },
        { question: 'error.name for new TypeError("") returns?', options: ['"Error"', '"TypeError"', '"error"', '"type"'], correctIndex: 1, explanation: 'error.name returns the error type name: "TypeError".' },
        { question: 'Does catch block run if try completes without error?', options: ['Yes', 'No', 'Only if return is used', 'Depends on finally'], correctIndex: 1, explanation: 'catch only runs if the try block throws an error.' },
        { question: 'What does error.stack contain?', options: ['The file size', 'A stack trace showing where the error occurred', 'The error code', 'Network status'], correctIndex: 1, explanation: 'error.stack is a string showing the call stack at the time of the error.' },
        { question: 'Nested try/catch: inner catch can rethrow with?', options: ['throw e', 're-throw e', 'propagate e', 'return e'], correctIndex: 0, explanation: 'Use throw e inside catch to rethrow the error to an outer try/catch.' },
        { question: 'Which is best practice for error messages?', options: ['Generic messages like "Error"', 'Descriptive messages with context', 'No messages', 'Error codes only'], correctIndex: 1, explanation: 'Descriptive error messages help with debugging.' },
        { question: 'window.onerror catches?', options: ['Promise rejections', 'Synchronous uncaught errors globally', 'All errors', 'Only syntax errors'], correctIndex: 1, explanation: 'window.onerror is a global handler for uncaught synchronous errors.' },
        { question: 'unhandledrejection event catches?', options: ['Synchronous errors', 'Uncaught Promise rejections', 'Network errors', 'TypeError only'], correctIndex: 1, explanation: 'unhandledrejection fires when a Promise rejection is not caught.' },
        { question: 'Optional chaining user?.profile?.name avoids?', options: ['TypeError when user or profile is null/undefined', 'Syntax errors', 'Async errors', 'Reference errors'], correctIndex: 0, explanation: 'Optional chaining (?.) safely accesses properties on potentially null/undefined values.' },
      ],
    },
    {
      id: 'promises-async',
      title: 'Promises & Async/Await',
      explanation: `JavaScript is **asynchronous** — it can start a long operation (like fetching data) and keep running other code while waiting.

**Callback (old way):**
\`\`\`js
fetchData(url, function(error, data) {
  if (error) { ... }
  else { ... }
});
\`\`\`

**Promise (modern):**
\`\`\`js
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

A Promise has 3 states: **pending**, **fulfilled**, **rejected**

**Async/Await (cleanest way):**
\`\`\`js
async function getData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

- \`async\` makes a function return a Promise
- \`await\` pauses until the Promise resolves
- Use try/catch with async/await for error handling`,
      jsExample: `// Creating a Promise
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(\`Done after \${ms}ms\`), ms);
  });
}

// Using .then()
delay(100).then(msg => console.log(msg));

// Async/await — cleaner
async function runTasks() {
  console.log("Starting...");
  
  const result1 = await delay(50);
  console.log("Task 1:", result1);
  
  const result2 = await delay(50);
  console.log("Task 2:", result2);
  
  return "All tasks complete";
}

runTasks().then(final => console.log(final));

// Promise that can reject
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (id <= 0) reject(new Error("Invalid ID"));
    else resolve({ id, name: "Alice" });
  });
}

async function main() {
  try {
    const user = await fetchUser(1);
    console.log("User:", user.name);
    
    await fetchUser(-1); // This rejects
  } catch (e) {
    console.error("Caught:", e.message);
  }
}

main();`,
      exercises: [
        {
          title: 'Create a promise',
          description: 'Write a Promise that resolves with "success" after a short delay and log the result with .then().',
          hint: 'const p = new Promise(resolve => setTimeout(() => resolve("success"), 100)); p.then(console.log);',
        },
        {
          title: 'Async function',
          description: 'Write an async function that awaits a Promise returning a number, doubles it, and returns the result.',
          hint: 'async function doubleAsync() { const n = await Promise.resolve(21); return n * 2; } doubleAsync().then(console.log);',
        },
      ],
      quiz: [
        { question: 'What are the 3 states of a Promise?', options: ['start, run, end', 'pending, fulfilled, rejected', 'waiting, done, error', 'new, active, closed'], correctIndex: 1, explanation: 'Promises are pending (waiting), fulfilled (resolved with value), or rejected (failed).' },
        { question: 'What does await do?', options: ['Creates a Promise', 'Pauses async function execution until the Promise resolves', 'Rejects a Promise', 'Creates a new thread'], correctIndex: 1, explanation: 'await pauses the async function until the Promise settles.' },
        { question: 'async functions always return?', options: ['undefined', 'A string', 'A Promise', 'A callback'], correctIndex: 2, explanation: 'async functions always return a Promise, even if you return a plain value.' },
        { question: '.catch() handles?', options: ['Fulfilled promises', 'Rejected promises / errors', 'Pending promises', 'All promises'], correctIndex: 1, explanation: '.catch() handles rejected Promises.' },
        { question: '.then() runs when?', options: ['Promise is rejected', 'Promise is fulfilled', 'Promise is pending', 'Always'], correctIndex: 1, explanation: '.then() runs when the Promise resolves successfully.' },
        { question: 'Promise.all([p1, p2]) resolves when?', options: ['Either p1 or p2 resolves', 'Both p1 and p2 resolve', 'p1 resolves first', 'p2 resolves first'], correctIndex: 1, explanation: 'Promise.all() resolves when ALL promises in the array resolve.' },
        { question: 'Promise.race([p1, p2]) resolves when?', options: ['Both resolve', 'The last one resolves', 'The first one to settle (resolve or reject)', 'p1 always'], correctIndex: 2, explanation: 'Promise.race() settles as soon as the first promise settles.' },
        { question: 'Where do you handle errors in async/await?', options: ['.catch()', 'try/catch block', 'onerror handler', 'Both A and B work'], correctIndex: 3, explanation: 'You can use either .catch() on the returned Promise, or try/catch inside the async function.' },
        { question: 'What is callback hell?', options: ['Too many promises', 'Deeply nested callbacks making code hard to read', 'An error type', 'Synchronous code problems'], correctIndex: 1, explanation: 'Callback hell is deeply nested callbacks — Promises and async/await solve this.' },
        { question: 'Promise.resolve(42) creates?', options: ['A rejected promise with 42', 'A pending promise', 'An already-fulfilled promise with value 42', 'A new Promise object'], correctIndex: 2, explanation: 'Promise.resolve(value) creates an immediately resolved Promise.' },
        { question: 'Can you use await outside an async function?', options: ['Yes, always', 'No, await requires async context', 'Only at the top level in modules', 'Only in Node.js'], correctIndex: 2, explanation: 'await requires async context — in modules you can use top-level await.' },
        { question: 'new Promise((resolve, reject) => reject("error")) — state?', options: ['fulfilled', 'pending', 'rejected', 'Error thrown'], correctIndex: 2, explanation: 'Calling reject() immediately puts the Promise in a rejected state.' },
        { question: 'What does Promise.allSettled() do?', options: ['Fails if any promise fails', 'Waits for all to settle regardless of outcome', 'Same as Promise.all', 'Cancels others on first failure'], correctIndex: 1, explanation: 'allSettled() waits for all and gives results (fulfilled or rejected) for each.' },
        { question: 'async function f() { return 42; } f() returns?', options: ['42', 'A Promise resolving to 42', 'undefined', 'A callback'], correctIndex: 1, explanation: 'async functions always return a Promise — here resolving to 42.' },
        { question: 'The fetch() API returns?', options: ['A string', 'The response body directly', 'A Promise', 'undefined'], correctIndex: 2, explanation: 'fetch() returns a Promise that resolves to the Response object.' },
        { question: 'response.json() returns?', options: ['A JSON string', 'A Promise resolving to the parsed object', 'The raw text', 'undefined'], correctIndex: 1, explanation: 'response.json() is also async — it returns a Promise.' },
        { question: 'setTimeout is?', options: ['Synchronous', 'Asynchronous — the callback runs after the delay', 'Blocking', 'A Promise'], correctIndex: 1, explanation: 'setTimeout is asynchronous — it schedules the callback without blocking.' },
        { question: 'What is the event loop?', options: ['A for loop for events', 'The mechanism that handles async callbacks in JS\'s single thread', 'A DOM event system', 'A React concept'], correctIndex: 1, explanation: 'The event loop processes the callback queue, enabling JS\'s asynchronous behavior.' },
        { question: 'microtask vs macrotask — Promise callbacks are?', options: ['Macrotasks', 'Microtasks (higher priority)', 'Neither', 'Same as setTimeout'], correctIndex: 1, explanation: 'Promise callbacks are microtasks and run before the next macrotask (like setTimeout).' },
        { question: 'How do you run Promises in parallel (not sequentially)?', options: ['Two consecutive awaits', 'Promise.all([p1, p2])', 'await p1; await p2;', 'Both A and C — sequential'], correctIndex: 1, explanation: 'Promise.all() runs promises in parallel; sequential awaits run one after another.' },
      ],
    },
    {
      id: 'fetch-api',
      title: 'Fetch API & Working with Data',
      explanation: `The **Fetch API** lets you make HTTP requests to get or send data to servers.

**Basic GET request:**
\`\`\`js
async function getUser(id) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`);
  
  if (!response.ok) {
    throw new Error(\`HTTP error: \${response.status}\`);
  }
  
  const data = await response.json();
  return data;
}
\`\`\`

**POST request (send data):**
\`\`\`js
const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice", age: 30 })
});
\`\`\`

**JSON:**
\`\`\`js
JSON.stringify(obj)  // JS object → JSON string
JSON.parse(str)      // JSON string → JS object
\`\`\`

**Working with data patterns:**
- Always check \`response.ok\` before using the data
- Always \`await\` both the fetch and \`response.json()\`
- Wrap in try/catch for network errors`,
      jsExample: `// We'll simulate fetch with local data in this editor
// (real fetch would call an actual API)

// JSON conversion
const user = { name: "Alice", age: 30, skills: ["JS", "CSS"] };
const jsonString = JSON.stringify(user);
console.log("JSON string:", jsonString);

const parsed = JSON.parse(jsonString);
console.log("Parsed back:", parsed.name);

// Pretty-print JSON
console.log(JSON.stringify(user, null, 2));

// Simulate fetch with a mock function
async function mockFetch(url) {
  const db = {
    "/users/1": { id: 1, name: "Alice", email: "alice@example.com" },
    "/users/2": { id: 2, name: "Bob", email: "bob@example.com" },
    "/posts":   [{ id: 1, title: "Hello JS" }, { id: 2, title: "Async Tips" }]
  };
  
  const data = db[url];
  if (!data) throw new Error(\`404: Not found — \${url}\`);
  return data;
}

async function main() {
  try {
    const user = await mockFetch("/users/1");
    console.log("User:", user.name, "-", user.email);
    
    const posts = await mockFetch("/posts");
    posts.forEach(p => console.log("Post:", p.title));
    
    await mockFetch("/missing"); // throws 404
  } catch (e) {
    console.error("Error:", e.message);
  }
}

main();`,
      exercises: [
        {
          title: 'JSON round-trip',
          description: 'Create an object with 3 properties, stringify it, parse it back, and verify the values match.',
          hint: 'const obj = {...}; const str = JSON.stringify(obj); const back = JSON.parse(str); console.log(obj.name === back.name);',
        },
        {
          title: 'Async data pipeline',
          description: 'Write an async function that: 1) gets a number from a Promise, 2) doubles it, 3) formats it as "$XX.XX". Log the final result.',
          hint: 'async function pipeline() { const n = await Promise.resolve(5); const doubled = n * 2; console.log(`$${doubled.toFixed(2)}`); }',
        },
      ],
      quiz: [
        { question: 'What does fetch() return?', options: ['The response body', 'A Promise resolving to a Response object', 'A JSON object', 'undefined'], correctIndex: 1, explanation: 'fetch() returns a Promise. You must await it and then call .json() etc.' },
        { question: 'How do you check if a fetch was successful?', options: ['Check response.data', 'Check response.ok (true for 200-299)', 'Check response.status === "ok"', 'No check needed'], correctIndex: 1, explanation: 'response.ok is true for HTTP 2xx status codes.' },
        { question: 'JSON.stringify() converts?', options: ['JSON string to JS object', 'JS object/value to JSON string', 'JSON to XML', 'String to array'], correctIndex: 1, explanation: 'JSON.stringify() serializes a JS value to a JSON string.' },
        { question: 'JSON.parse() converts?', options: ['JS object to JSON', 'JSON string to JS object', 'Array to JSON', 'String to number'], correctIndex: 1, explanation: 'JSON.parse() deserializes a JSON string back to a JS value.' },
        { question: 'How do you send JSON data with fetch?', options: ['fetch(url, { data: obj })', 'fetch(url, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(obj) })', 'fetch(url, obj)', 'fetch.post(url, obj)'], correctIndex: 1, explanation: 'Set method, Content-Type header, and JSON.stringify the body.' },
        { question: 'What HTTP method does fetch() use by default?', options: ['POST', 'PUT', 'GET', 'PATCH'], correctIndex: 2, explanation: 'fetch() defaults to GET requests.' },
        { question: 'response.json() returns?', options: ['A JSON string', 'A Promise resolving to parsed JSON', 'The HTTP status', 'undefined'], correctIndex: 1, explanation: 'response.json() is async and returns a Promise of the parsed body.' },
        { question: 'Which HTTP status means "Not Found"?', options: ['200', '201', '404', '500'], correctIndex: 2, explanation: '404 means the resource was not found.' },
        { question: 'CORS stands for?', options: ['Cross-Origin Resource Sharing', 'Client-Oriented Request System', 'Cached Object Resource Service', 'Cross-Object Resource Sync'], correctIndex: 0, explanation: 'CORS controls which origins can access a server\'s resources.' },
        { question: 'REST API uses which data format most commonly?', options: ['XML', 'CSV', 'JSON', 'YAML'], correctIndex: 2, explanation: 'Most modern REST APIs use JSON for request and response bodies.' },
        { question: 'Which header is needed for JSON POST requests?', options: ['"Accept: application/json"', '"Content-Type: application/json"', '"Authorization: json"', '"Type: json"'], correctIndex: 1, explanation: '"Content-Type: application/json" tells the server the body format.' },
        { question: 'What is an API key?', options: ['A password for your database', 'A credential that identifies your app to an API', 'A JSON key', 'A DOM attribute'], correctIndex: 1, explanation: 'API keys authenticate requests to protect API access.' },
        { question: 'fetch() fails (rejects) when?', options: ['HTTP 404', 'HTTP 500', 'Network error (no connection)', 'Any non-200 status'], correctIndex: 2, explanation: 'fetch() only rejects on network failure — HTTP errors still resolve (check response.ok).' },
        { question: 'What does HTTP status 201 mean?', options: ['OK', 'Created', 'Unauthorized', 'No Content'], correctIndex: 1, explanation: '201 Created means the request was successful and a resource was created.' },
        { question: 'JSON cannot represent?', options: ['Strings', 'Numbers', 'Undefined values', 'Arrays'], correctIndex: 2, explanation: 'JSON has no undefined — properties with undefined values are omitted by JSON.stringify.' },
        { question: 'What is a query parameter?', options: ['A database column', 'Key-value pairs appended to a URL after ?', 'A POST body field', 'An HTTP header'], correctIndex: 1, explanation: 'Query parameters: ?key=value&key2=value2 — passed in the URL.' },
        { question: 'AbortController with fetch allows?', options: ['Speeding up requests', 'Cancelling a fetch request', 'Caching responses', 'Batching requests'], correctIndex: 1, explanation: 'AbortController lets you cancel in-flight fetch requests.' },
        { question: 'response.text() vs response.json():', options: ['Identical', 'text() returns the raw string; json() parses it', 'json() returns raw text', 'Only json() is async'], correctIndex: 1, explanation: 'text() gives raw response text; json() parses it as JSON.' },
        { question: 'What is rate limiting in APIs?', options: ['Slowing down your code', 'Restricting how many requests you can make per period', 'Caching API calls', 'Prioritizing certain requests'], correctIndex: 1, explanation: 'Rate limiting prevents API abuse by capping requests per timeframe.' },
        { question: 'How do you send auth tokens with fetch?', options: ['As a query param only', 'In the Authorization header', 'In the URL', 'In the cookies always'], correctIndex: 1, explanation: 'Authorization: Bearer <token> header is the standard way to send auth tokens.' },
      ],
    },
  ],
};
