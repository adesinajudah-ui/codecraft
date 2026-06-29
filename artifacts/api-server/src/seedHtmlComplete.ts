import { db } from "@workspace/db";
import {
  languagesTable,
  coursesTable,
  lessonsTable,
  quizzesTable,
  quizQuestionsTable,
} from "@workspace/db";
import { eq } from "drizzle-orm";

export async function seedHtmlCompleteCourse() {
  const [htmlLang] = await db
    .select()
    .from(languagesTable)
    .where(eq(languagesTable.slug, "html"))
    .limit(1);

  if (!htmlLang) throw new Error("HTML language not found. Run main seed first.");

  const existing = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.title, "HTML Lesson 1: Introduction to HTML"))
    .limit(1);

  if (existing.length > 0) {
    console.log("HTML Complete Course already seeded. Skipping.");
    return { message: "Already seeded" };
  }

  console.log("Seeding HTML Complete Course (8 lessons)...");

  // ── LESSON 1: Introduction to HTML ────────────────────────────────
  const [c1] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 1: Introduction to HTML",
    description: "Discover what HTML is, its history, and how it forms the backbone of every website on the internet.",
    level: "Beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c1.id,
    title: "Introduction to HTML",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My First HTML Page</title>
  </head>
  <body>

    <!-- This is a heading -->
    <h1>Hello, World!</h1>

    <!-- This is a paragraph -->
    <p>Welcome to CodeCraft. I am learning HTML today!</p>

    <!-- Try It Yourself:
         1. Change "Hello, World!" to your own name
         2. Update the paragraph with a fun fact about yourself
         3. Add a second paragraph below this one
         4. Click Run to see your changes!
    -->

  </body>
</html>`,
    content: `═══════════════════════════════════════════════
  LESSON 1 — INTRODUCTION TO HTML
═══════════════════════════════════════════════

🎯 LEARNING OBJECTIVES
━━━━━━━━━━━━━━━━━━━━━━
After completing this lesson, you will be able to:
  • Explain what HTML is and what the acronym stands for
  • Describe the role HTML plays in building websites
  • Identify HTML's relationship with CSS and JavaScript
  • Write and understand your very first HTML code
  • Recognize opening tags, closing tags, and self-closing tags

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT IS HTML?
─────────────
HTML stands for HyperText Markup Language. Let's unpack that:

  HyperText → Text that contains links to other pages (hyperlinks)
  Markup    → A system of labels/tags that describe content structure
  Language  → A defined set of rules for communicating with browsers

HTML is the standard language used to create and structure web pages.
Every single website you have ever visited — Google, YouTube, Amazon,
Wikipedia — is built on HTML at its foundation.

Real-World Analogy:
  Think of building a website like constructing a house:
  🏗️ HTML  →  The walls, floors, and structure (what exists)
  🎨 CSS   →  The paint, furniture, and decoration (how it looks)
  ⚡ JS    →  The electricity, plumbing, and systems (how it works)

You CANNOT build a website without HTML. It is the non-negotiable
foundation that everything else is built upon.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A BRIEF HISTORY OF HTML
───────────────────────
  1989 → Tim Berners-Lee invented the World Wide Web
  1991 → HTML 1.0 released (only 18 tags!)
  1995 → HTML 2.0: the first formal standard
  1997 → HTML 3.2 & 4.0: tables, forms, CSS support added
  2008 → HTML5 development begins
  2014 → HTML5 officially standardized ← the version we use today!

HTML5 introduced major improvements:
  ✓ Native video and audio (no plugins needed)
  ✓ Canvas element for graphics and games
  ✓ Semantic elements: <header>, <footer>, <article>, <nav>
  ✓ Geolocation and local storage APIs
  ✓ Better, more powerful form controls

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT HTML IS (AND WHAT IT IS NOT)
──────────────────────────────────
HTML IS:
  ✓ A markup language for structuring content
  ✓ The skeleton of every web page on the internet
  ✓ Made up of elements called "tags"
  ✓ Saved as plain text files with a .html extension
  ✓ Read and rendered by web browsers

HTML IS NOT:
  ✗ A programming language (no logic, conditions, or loops)
  ✗ A design tool (CSS handles appearance)
  ✗ Case-sensitive (but use lowercase by convention)
  ✗ A compiled language — browsers interpret it directly

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HOW A BROWSER READS YOUR HTML
──────────────────────────────
When you open a web page, this happens step by step:

  Step 1 → You type a URL (e.g., www.codecraft.io)
  Step 2 → Your browser sends a request to a server
  Step 3 → The server sends back an HTML file
  Step 4 → The browser PARSES (reads) the HTML top to bottom
  Step 5 → The browser RENDERS the page visually on screen

This process is called "parsing and rendering". Your browser is
essentially a translator — it converts your text tags into a
visual page that humans can read and interact with.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ANATOMY OF AN HTML TAG
───────────────────────
Most HTML tags come in pairs (opening + closing):

  <tagname> content here </tagname>
  ───────── ──────────── ──────────
  Opening    Your text   Closing tag
  tag        or content  (has a "/" before the name)

EXAMPLES:
  <h1>Welcome to HTML!</h1>
  <p>This is a paragraph of text.</p>
  <strong>This text is bold.</strong>

Some tags are self-closing (they contain no inner content):
  <br>    →  Line break
  <hr>    →  Horizontal dividing line
  <img>   →  Embeds an image
  <input> →  A form input field

IMPORTANT NOTES:
  ⚠️ Always close your tags! <p>text</p> — NOT just <p>text
  ⚠️ Use lowercase tag names: <p> not <P>
  ⚠️ Tags can be nested inside each other

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMMON BEGINNER MISTAKES
─────────────────────────
✗ Forgetting the closing tag:
    Wrong:  <p>Hello World
    Right:  <p>Hello World</p>

✗ Using uppercase tags:
    Wrong:  <H1>Title</H1>
    Right:  <h1>Title</h1>

✗ Mismatched tags:
    Wrong:  <p>Hello <strong>World</p></strong>
    Right:  <p>Hello <strong>World</strong></p>

✗ Thinking HTML is a programming language:
    HTML describes structure — it cannot calculate 2 + 2 or
    make decisions. That is what JavaScript is for.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 PRACTICE QUESTIONS
─────────────────────
1. What does the acronym HTML stand for?
   Answer: HyperText Markup Language

2. Who invented the World Wide Web and when?
   Answer: Tim Berners-Lee in 1989

3. What is the current version of HTML?
   Answer: HTML5 (standardized in 2014)

4. How does a closing tag differ from an opening tag?
   Answer: A closing tag has a forward slash before the name (</p>)

5. Name two things HTML is NOT:
   Answer: Not a programming language; not a design/styling tool

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💻 CODING EXERCISES
───────────────────
Exercise 1: Write HTML tags for the following:
  a) A heading saying "My First Website"    → <h1>My First Website</h1>
  b) A paragraph saying "I love coding!"   → <p>I love coding!</p>
  c) A line break                           → <br>

Exercise 2: Identify what each tag does:
  <h1>  → The most important heading on a page
  <p>   → A paragraph of text
  <br>  → A line break (moves text to the next line)
  <hr>  → A horizontal dividing line
  <img> → Embeds/displays an image

Exercise 3: Spot and fix the bugs:
  Bug 1: <h1>Welcome<h1>       Fix: <h1>Welcome</h1>
  Bug 2: <P>Hello</P>          Fix: <p>Hello</p>
  Bug 3: <p>Hi <b>there</p></b> Fix: <p>Hi <b>there</b></p>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔬 TRY IT YOURSELF
──────────────────
The code editor contains a basic HTML page. Try these challenges:
  1. Change "Hello, World!" to your own name
  2. Update the paragraph with a fun fact about yourself
  3. Add a SECOND paragraph below the first one
  4. Add a line break (<br>) between the two paragraphs
  5. Click ▶ Run to see your changes rendered live!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 LESSON SUMMARY
─────────────────
In this lesson you learned:
  ✓ HTML = HyperText Markup Language — the language of the web
  ✓ HTML is the structural foundation of EVERY website
  ✓ HTML is a markup language, NOT a programming language
  ✓ HTML uses tags: <tagname>content</tagname>
  ✓ Most tags come in pairs (opening + closing)
  ✓ Some tags are self-closing: <br>, <img>, <hr>, <input>
  ✓ Browsers parse HTML top-to-bottom and render it visually
  ✓ HTML works alongside CSS (styling) and JavaScript (behavior)

→ Next Lesson: How the Web Works`,
  });

  const [q1] = await db.insert(quizzesTable).values({ courseId: c1.id, title: "Introduction to HTML — Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q1.id, question: "What does HTML stand for?", options: ["Hyper Transfer Markup Language", "HyperText Markup Language", "Hyper Tool Modeling Language", "HyperText Making Language"], correctIndex: 1 },
    { quizId: q1.id, question: "Who invented the World Wide Web?", options: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Linus Torvalds"], correctIndex: 2 },
    { quizId: q1.id, question: "Which year was HTML5 officially standardized?", options: ["2008", "2010", "2012", "2014"], correctIndex: 3 },
    { quizId: q1.id, question: "What type of language is HTML?", options: ["Programming language", "Scripting language", "Markup language", "Compiled language"], correctIndex: 2 },
    { quizId: q1.id, question: "Which of the following is a self-closing HTML tag?", options: ["<p>", "<div>", "<br>", "<span>"], correctIndex: 2 },
    { quizId: q1.id, question: "What does a closing tag contain that an opening tag does not?", options: ["An exclamation mark", "A forward slash (/)", "A question mark", "A colon (:)"], correctIndex: 1 },
    { quizId: q1.id, question: "In web development, what is HTML responsible for?", options: ["Page styling and colors", "Programming logic and calculations", "Page structure and content", "Database management"], correctIndex: 2 },
    { quizId: q1.id, question: "What file extension do HTML files use?", options: [".htm or .html", ".css", ".js", ".txt"], correctIndex: 0 },
    { quizId: q1.id, question: "Which of these is a correct HTML tag?", options: ["<PARAGRAPH>", "<p>", "{paragraph}", "[p]"], correctIndex: 1 },
    { quizId: q1.id, question: "Which of the following best describes 'parsing' in the context of HTML?", options: ["Downloading an HTML file", "The browser reading and interpreting HTML code", "Converting HTML to JavaScript", "Saving an HTML file to disk"], correctIndex: 1 },
    { quizId: q1.id, question: "What role does CSS play alongside HTML?", options: ["It adds programming logic", "It handles databases", "It styles and designs the page", "It creates the page structure"], correctIndex: 2 },
    { quizId: q1.id, question: "What role does JavaScript play alongside HTML?", options: ["It adds structure and content", "It adds interactivity and behavior", "It styles colors and fonts", "It stores images"], correctIndex: 1 },
    { quizId: q1.id, question: "Which HTML version added native video and audio support?", options: ["HTML 2.0", "HTML 3.2", "HTML 4.0", "HTML5"], correctIndex: 3 },
    { quizId: q1.id, question: "Is HTML case-sensitive?", options: ["Yes, always uppercase", "Yes, always lowercase", "No, but lowercase is the convention", "Yes, both cases must match"], correctIndex: 2 },
    { quizId: q1.id, question: "Which of these correctly closes an opening <h1> tag?", options: ["<h1/>", "</h1>", "<\\h1>", "<<h1>>"], correctIndex: 1 },
    { quizId: q1.id, question: "What is the correct nesting order?", options: ["<p><b>text</p></b>", "<p><b>text</b></p>", "<b><p>text</b></p>", "<p>text<b></b></p>"], correctIndex: 1 },
    { quizId: q1.id, question: "Where does HTML content appear on a web page?", options: ["Inside the <head> section", "Inside the <body> section", "Inside the <style> section", "Inside the <script> section"], correctIndex: 1 },
    { quizId: q1.id, question: "Which analogy best describes HTML's role in a website?", options: ["The paint and decoration of a house", "The electricity and plumbing of a house", "The walls and structural foundation of a house", "The garden and landscaping of a house"], correctIndex: 2 },
    { quizId: q1.id, question: "HTML was originally created for what primary purpose?", options: ["Building mobile apps", "Sharing scientific documents on the web", "Creating video games", "Designing logos and graphics"], correctIndex: 1 },
    { quizId: q1.id, question: "Which statement about HTML is FALSE?", options: ["HTML uses tags to describe content", "HTML is interpreted by web browsers", "HTML can perform arithmetic calculations", "HTML files are plain text files"], correctIndex: 2 },
  ]);

  // ── LESSON 2: How the Web Works ───────────────────────────────────
  const [c2] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 2: How the Web Works",
    description: "Understand the journey of a web page from server to browser — clients, servers, HTTP, DNS, and rendering explained simply.",
    level: "Beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c2.id,
    title: "How the Web Works",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- The <head> sends information TO the browser (not visible) -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>How the Web Works — Demo</title>
    <meta name="description" content="A demo page explaining how websites work">
  </head>
  <body>

    <h1>How a Web Page Reaches You</h1>

    <h2>Step 1: You Type a URL</h2>
    <p>You type <strong>www.codecraft.io</strong> in your browser.</p>

    <h2>Step 2: DNS Lookup</h2>
    <p>DNS converts the domain name into an IP address like
    <strong>192.168.1.100</strong> so the browser knows
    where to send the request.</p>

    <h2>Step 3: HTTP Request</h2>
    <p>Your browser sends a <strong>GET request</strong> to the
    web server asking for the HTML file.</p>

    <h2>Step 4: Server Response</h2>
    <p>The server sends back the HTML file with a
    <strong>200 OK</strong> status code.</p>

    <h2>Step 5: Browser Renders the Page</h2>
    <p>The browser reads this HTML and displays it as the
    beautiful page you see right now!</p>

    <!-- Try It: Add another step describing what happens
         when you click a link on a page -->

  </body>
</html>`,
    content: `═══════════════════════════════════════════════
  LESSON 2 — HOW THE WEB WORKS
═══════════════════════════════════════════════

🎯 LEARNING OBJECTIVES
━━━━━━━━━━━━━━━━━━━━━━
After completing this lesson, you will be able to:
  • Explain the client-server model in simple terms
  • Describe what happens when you type a URL into a browser
  • Understand what HTTP and HTTPS are
  • Explain the role of DNS (Domain Name System)
  • Describe how browsers turn HTML into visible web pages

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE CLIENT-SERVER MODEL
───────────────────────
The web runs on a simple idea: clients ask for things, servers provide them.

  CLIENT (You)                    SERVER (Website host)
  ┌─────────────┐   Request  →   ┌──────────────────┐
  │  Browser    │ ─────────────→ │  Web Server      │
  │  (Chrome,   │                │  (stores your    │
  │  Firefox,   │ ←───────────── │  HTML, images,   │
  │  Safari)    │   Response     │  and files)      │
  └─────────────┘                └──────────────────┘

Client Examples: Web browsers, mobile apps, Postman
Server Examples: Apache, Nginx, Node.js servers

The client always initiates the conversation.
The server always responds (with data or an error).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT HAPPENS WHEN YOU TYPE A URL
──────────────────────────────────
Let's trace exactly what happens when you visit www.codecraft.io:

  Step 1: URL Parsing
    Your browser reads the URL:
    https://www.codecraft.io/learn
    │       │               │
    Protocol Domain name    Path/page

  Step 2: DNS Lookup (like a phone book for the internet)
    • Browser checks: "What IP address is codecraft.io?"
    • DNS server responds: "It's at 203.0.113.42"
    • Now the browser knows exactly where to send its request

  Step 3: TCP Connection
    Browser establishes a connection to the server
    (like picking up the phone before speaking)

  Step 4: HTTP Request
    Browser sends:  GET /learn HTTP/1.1
    Meaning: "Please give me the /learn page"

  Step 5: Server Response
    Server sends back:
    • Status code (200 OK = success, 404 = not found)
    • The HTML file content

  Step 6: Rendering
    Browser reads the HTML, downloads CSS/images/JS,
    and displays the finished page to you

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTP AND HTTPS EXPLAINED
─────────────────────────
HTTP = HyperText Transfer Protocol
HTTPS = HTTP + Secure (encrypted with TLS/SSL)

HTTP defines the rules for how clients and servers communicate:
  • GET    → Retrieve data (loading a page)
  • POST   → Send data (submitting a form)
  • PUT    → Update data
  • DELETE → Delete data

HTTP STATUS CODES (the server's response codes):
  ✓ 200 OK            → Everything worked perfectly
  ✓ 201 Created       → Resource was created (POST success)
  ↺ 301 Moved         → Page has permanently moved
  ↺ 302 Redirect      → Temporary redirect
  ✗ 400 Bad Request   → Your request had an error
  ✗ 401 Unauthorized  → You need to log in
  ✗ 403 Forbidden     → You don't have permission
  ✗ 404 Not Found     → Page doesn't exist
  ✗ 500 Server Error  → Something broke on the server

HTTPS is essential because:
  ✓ Encrypts data (passwords, credit cards are safe)
  ✓ Verifies the website is genuine (not fake)
  ✓ Required for modern browser features
  ✓ Boosts SEO ranking on Google

Look for the 🔒 padlock icon in your browser — that's HTTPS!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DNS — THE INTERNET'S PHONE BOOK
──────────────────────────────────
DNS (Domain Name System) translates human-readable domain names
into machine-readable IP addresses.

  You type:    www.google.com
  DNS returns: 142.250.80.46

Without DNS, you'd have to memorize IP addresses for every website!

HOW DNS LOOKUP WORKS:
  1. Browser checks its own cache (saved lookup)
  2. Checks your OS cache
  3. Asks your Internet Service Provider's DNS server
  4. If not found, asks root DNS servers
  5. Returns the IP address to your browser
  (This entire process takes milliseconds!)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HOW BROWSERS RENDER HTML
──────────────────────────
After receiving the HTML file, the browser does this:

  1. Parse HTML → builds the DOM (Document Object Model)
     DOM = a tree structure of all your HTML elements

  2. Parse CSS → builds the CSSOM (CSS Object Model)
     Determines styles for each element

  3. Combine DOM + CSSOM → Render Tree
     Only visible elements are included

  4. Layout → calculates the position/size of each element

  5. Paint → draws pixels on screen

  6. Composite → layers are combined into the final image

This whole process happens in milliseconds! Modern browsers
are incredibly fast at rendering even complex pages.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT NOTES
───────────────
💡 A URL has multiple parts:
   https://www.example.com:443/page?query=html#section
   │       │               │   │     │         │
   Protocol Subdomain.domain Port Path  Query  Anchor

💡 Static vs Dynamic websites:
   Static  → HTML files served exactly as stored (no database)
   Dynamic → Server generates HTML on demand (blogs, social media)

💡 Web hosting is just renting space on a server that is
   always online and accessible from anywhere in the world.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 PRACTICE QUESTIONS
─────────────────────
1. What is the role of a "client" on the web?
   Answer: It makes requests (e.g., a web browser asking for a page)

2. What does DNS do?
   Answer: Converts domain names (like google.com) to IP addresses

3. What does HTTP status code 404 mean?
   Answer: The requested page was not found on the server

4. What is the difference between HTTP and HTTPS?
   Answer: HTTPS is encrypted/secure; HTTP is not

5. What is the DOM?
   Answer: Document Object Model — the browser's tree representation of HTML

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💻 CODING EXERCISES
───────────────────
Exercise 1: Label these URL parts:
  https://blog.example.com/posts?tag=html
  Protocol: https
  Subdomain: blog
  Domain: example.com
  Path: /posts
  Query: ?tag=html

Exercise 2: What HTTP status code would you receive for each scenario?
  a) Page loads successfully          → 200 OK
  b) You mistype a page URL           → 404 Not Found
  c) A page permanently moved         → 301 Moved Permanently
  d) Server crashes                   → 500 Internal Server Error

Exercise 3: Put these steps in the correct order:
  [ ] Browser renders the page
  [ ] Browser sends HTTP GET request
  [1] User types URL in browser
  [ ] DNS looks up the IP address
  [ ] Server sends HTML response

  Answer: 1→DNS lookup → 3→HTTP GET → 4→Server response → 5→Render

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔬 TRY IT YOURSELF
──────────────────
The code editor shows an HTML page explaining web requests.
Try these challenges:
  1. Add a new <h2> section called "Step 6: Page Displayed!"
  2. Write a <p> describing what the user sees at the end
  3. Add a paragraph explaining what HTTPS means
  4. Click ▶ Run and read through the full page

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 LESSON SUMMARY
─────────────────
  ✓ The web uses a client-server model
  ✓ Clients (browsers) make requests; servers respond with files
  ✓ DNS converts domain names into IP addresses
  ✓ HTTP is the protocol for web communication
  ✓ HTTPS is the secure, encrypted version of HTTP
  ✓ Status codes (200, 404, 500) tell you the result of a request
  ✓ Browsers parse HTML → build DOM → render visible page
  ✓ The entire process happens in milliseconds

→ Next Lesson: HTML Document Structure`,
  });

  const [q2] = await db.insert(quizzesTable).values({ courseId: c2.id, title: "How the Web Works — Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q2.id, question: "In the client-server model, what is the 'client'?", options: ["The web server storing files", "The database holding content", "The browser or app making requests", "The internet service provider"], correctIndex: 2 },
    { quizId: q2.id, question: "What does DNS stand for?", options: ["Dynamic Network Service", "Domain Name System", "Data Naming Standard", "Digital Navigation Software"], correctIndex: 1 },
    { quizId: q2.id, question: "What does DNS do?", options: ["Stores your HTML files", "Converts domain names to IP addresses", "Encrypts your internet traffic", "Speeds up page loading"], correctIndex: 1 },
    { quizId: q2.id, question: "What HTTP status code means 'page not found'?", options: ["200", "301", "404", "500"], correctIndex: 2 },
    { quizId: q2.id, question: "What HTTP status code means 'request was successful'?", options: ["100", "200", "400", "404"], correctIndex: 1 },
    { quizId: q2.id, question: "What does HTTPS provide that HTTP does not?", options: ["Faster loading speeds", "Colourful pages", "Secure encrypted communication", "Offline access"], correctIndex: 2 },
    { quizId: q2.id, question: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "Hyper Transfer Text Protocol", "High Transfer Technology Protocol", "HyperText Tool Platform"], correctIndex: 0 },
    { quizId: q2.id, question: "Which HTTP method is used when a browser loads a web page?", options: ["POST", "PUT", "DELETE", "GET"], correctIndex: 3 },
    { quizId: q2.id, question: "What is the DOM?", options: ["A type of HTML tag", "Document Object Model — the browser's tree of HTML elements", "Domain Operations Manager", "A CSS property"], correctIndex: 1 },
    { quizId: q2.id, question: "What does a 500 status code indicate?", options: ["Success", "Page not found", "A server-side error occurred", "You are unauthorised"], correctIndex: 2 },
    { quizId: q2.id, question: "What does a web server do?", options: ["Browses the internet", "Stores and serves files to clients on request", "Runs JavaScript in your browser", "Manages DNS records"], correctIndex: 1 },
    { quizId: q2.id, question: "What is an IP address?", options: ["A type of HTML element", "A unique numerical address that identifies a device on the internet", "An image file format", "The name of a website"], correctIndex: 1 },
    { quizId: q2.id, question: "In a URL like https://blog.example.com/page, what is 'blog'?", options: ["The domain", "The protocol", "The subdomain", "The path"], correctIndex: 2 },
    { quizId: q2.id, question: "What is 'rendering' in the context of a browser?", options: ["Uploading files to a server", "Converting HTML code into a visible webpage", "Downloading images", "Compressing JavaScript"], correctIndex: 1 },
    { quizId: q2.id, question: "What does a 301 status code mean?", options: ["Page not found", "Server error", "Page has permanently moved", "Request successful"], correctIndex: 2 },
    { quizId: q2.id, question: "What does 'static website' mean?", options: ["A website that never changes its design", "HTML files served exactly as stored, with no server-side processing", "A website with no images", "A website using only black and white colors"], correctIndex: 1 },
    { quizId: q2.id, question: "How long does the DNS lookup process typically take?", options: ["Several minutes", "About 10 seconds", "Milliseconds", "About 1 minute"], correctIndex: 2 },
    { quizId: q2.id, question: "Which symbol visually indicates a website uses HTTPS in a browser?", options: ["A star ⭐", "A padlock 🔒", "An arrow →", "A globe 🌍"], correctIndex: 1 },
    { quizId: q2.id, question: "What is web hosting?", options: ["Designing a website's look", "Writing HTML and CSS code", "Renting space on a server that is always online and accessible", "Creating domain names"], correctIndex: 2 },
    { quizId: q2.id, question: "Which step comes FIRST in the web request process?", options: ["Server sends HTML response", "Browser renders the page", "User types a URL", "DNS lookup occurs"], correctIndex: 2 },
  ]);

  // ── LESSON 3: HTML Document Structure ─────────────────────────────
  const [c3] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 3: HTML Document Structure",
    description: "Master the essential structure every HTML document must have — DOCTYPE, html, head, and body explained for beginners.",
    level: "Beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c3.id,
    title: "HTML Document Structure",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">

  <head>
    <!-- Invisible information for browsers and search engines -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Learning HTML document structure at CodeCraft">
    <title>My HTML Page — CodeCraft</title>
  </head>

  <body>
    <!-- Everything visible goes inside <body> -->

    <header>
      <h1>Welcome to My Page</h1>
      <nav>
        <a href="#about">About</a> |
        <a href="#skills">Skills</a> |
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <main>
      <section id="about">
        <h2>About Me</h2>
        <p>I am learning HTML at CodeCraft!</p>
      </section>

      <section id="skills">
        <h2>My Skills</h2>
        <p>HTML, and soon CSS and JavaScript!</p>
      </section>
    </main>

    <footer>
      <p>&copy; 2025 My First Website</p>
    </footer>

  </body>
</html>`,
    content: `═══════════════════════════════════════════════
  LESSON 3 — HTML DOCUMENT STRUCTURE
═══════════════════════════════════════════════

🎯 LEARNING OBJECTIVES
━━━━━━━━━━━━━━━━━━━━━━
After completing this lesson, you will be able to:
  • Write a complete, valid HTML document from scratch
  • Explain the purpose of DOCTYPE, <html>, <head>, and <body>
  • Use essential <meta> tags correctly
  • Understand the difference between visible and invisible HTML
  • Build a proper page template to start any project

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE COMPLETE HTML DOCUMENT TEMPLATE
─────────────────────────────────────
Every HTML page you ever create should start with this structure:

  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Page Title Here</title>
    </head>
    <body>
      <!-- Your visible content goes here -->
    </body>
  </html>

This is the standard HTML5 boilerplate. Let's break down each part.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. <!DOCTYPE html>
──────────────────
The very first line of every HTML document.

  <!DOCTYPE html>

What it does:
  • Tells the browser: "This is an HTML5 document"
  • Triggers "standards mode" rendering (not quirks mode)
  • NOT an HTML tag — it's an instruction to the browser

Without DOCTYPE, browsers may render your page incorrectly!
It is NOT case-sensitive, but <!DOCTYPE html> is conventional.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2. THE <html> ELEMENT
──────────────────────
The root element that wraps your ENTIRE document.

  <html lang="en">
    ... everything else goes inside here ...
  </html>

  • It is the parent of ALL other elements
  • The lang attribute tells browsers and screen readers the language
  • lang="en" = English, lang="fr" = French, lang="es" = Spanish
  • Always include lang for accessibility!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3. THE <head> SECTION
──────────────────────
The head section is NOT visible on the page.
It contains metadata — information ABOUT the document.

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page Title</title>
  </head>

What goes inside <head>:
  <title>       → The tab title (required, important for SEO)
  <meta>        → Various metadata (charset, viewport, description)
  <link>        → Links to external CSS files
  <style>       → Internal CSS styles
  <script>      → JavaScript (usually at end of body instead)

ESSENTIAL META TAGS:

  charset="UTF-8"
  ───────────────
  <meta charset="UTF-8">
  • Tells the browser the character encoding to use
  • UTF-8 supports ALL characters: English, Chinese, Arabic, emoji 🎉
  • ALWAYS include this — put it as the very first <meta> tag

  viewport
  ────────
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  • Makes your page responsive on mobile phones and tablets
  • Without this, mobile browsers zoom out and show a tiny page
  • ALWAYS include for any modern website

  description
  ───────────
  <meta name="description" content="Your page description here">
  • The text shown in Google search results under your page title
  • Keep it 150-160 characters
  • Great for SEO

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4. THE <title> ELEMENT
───────────────────────
  <title>CodeCraft — Learn HTML</title>

  • Appears in the browser tab/window title bar
  • Appears as the clickable blue link in Google search results
  • Crucial for SEO — use 50-60 characters with keywords
  • Must be inside <head>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. THE <body> SECTION
──────────────────────
Everything VISIBLE on your web page goes inside <body>.

  <body>
    <h1>Hello World</h1>
    <p>This is what users see!</p>
  </body>

The body contains:
  ✓ Headings and text
  ✓ Images and videos
  ✓ Links and buttons
  ✓ Forms and inputs
  ✓ Navigation, headers, footers
  ✓ Everything users see and interact with

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

UNDERSTANDING INDENTATION
──────────────────────────
Proper indentation makes your HTML readable:

  HARD TO READ:
  <html><head><title>Test</title></head><body><h1>Hello</h1></body></html>

  EASY TO READ (properly indented):
  <html>
    <head>
      <title>Test</title>
    </head>
    <body>
      <h1>Hello</h1>
    </body>
  </html>

Rules:
  • Child elements are indented by 2 spaces (or 1 tab)
  • Closing tags align with their opening tags
  • Browsers ignore extra whitespace — it's just for YOU

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMMON BEGINNER MISTAKES
─────────────────────────
✗ Forgetting <!DOCTYPE html>:
    Causes browser to use quirks mode — inconsistent rendering

✗ Putting visible content in <head>:
    Content in <head> is invisible! Put it in <body>.

✗ Missing the lang attribute:
    <html> not <html lang="en"> — hurts accessibility

✗ Duplicate <title> tags:
    You should only have ONE <title> in <head>

✗ Forgetting charset meta tag:
    Special characters may display incorrectly (â€™ instead of ')

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 PRACTICE QUESTIONS
─────────────────────
1. What is the purpose of <!DOCTYPE html>?
   Answer: It declares the document as HTML5 to the browser

2. What type of content belongs in <head>?
   Answer: Metadata — information about the page (title, charset, links)

3. What meta tag makes a page mobile-responsive?
   Answer: <meta name="viewport" content="width=device-width, initial-scale=1.0">

4. Where does all visible page content go?
   Answer: Inside the <body> element

5. What does charset="UTF-8" do?
   Answer: Sets the character encoding to support all languages and emoji

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💻 CODING EXERCISES
───────────────────
Exercise 1: Identify which section each tag belongs in:
  <title>     → <head>
  <h1>        → <body>
  <meta>      → <head>
  <p>         → <body>
  <link>      → <head>
  <nav>       → <body>

Exercise 2: What is missing from this document?
  <html>
    <head>
      <title>My Page</title>
    </head>
    <body>
      <h1>Hello</h1>
    </body>
  </html>

  Missing:
  ① <!DOCTYPE html> at the top
  ② lang attribute on <html>
  ③ <meta charset="UTF-8">
  ④ <meta name="viewport" ...>

Exercise 3: Fix the structure:
  <!DOCTYPE html>
  <html>
  <body>
    <h1>Title</h1>
    <title>My Page</title>  ← WRONG: title must be in <head>
  </body>
  </html>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔬 TRY IT YOURSELF
──────────────────
The code editor has a complete HTML document. Try these:
  1. Change the <title> to your own page title
  2. Update the meta description with a sentence about yourself
  3. Add your own name in the <h1> heading
  4. Add a new <section> with a heading and paragraph
  5. Click ▶ Run to see your page!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 LESSON SUMMARY
─────────────────
  ✓ Every HTML page starts with <!DOCTYPE html>
  ✓ <html lang="en"> wraps the entire document
  ✓ <head> contains invisible metadata (title, charset, viewport)
  ✓ <body> contains everything the user sees
  ✓ charset="UTF-8" supports all languages and special characters
  ✓ The viewport meta tag makes pages mobile-responsive
  ✓ <title> appears in browser tabs and search engine results
  ✓ Proper indentation makes code easier to read and maintain

→ Next Lesson: Installing and Using VS Code`,
  });

  const [q3] = await db.insert(quizzesTable).values({ courseId: c3.id, title: "HTML Document Structure — Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q3.id, question: "Which declaration must appear on the very first line of an HTML document?", options: ["<html>", "<!DOCTYPE html>", "<head>", "<meta charset>"], correctIndex: 1 },
    { quizId: q3.id, question: "What is the purpose of <!DOCTYPE html>?", options: ["It adds a header to the page", "It links CSS to the HTML file", "It tells the browser this is an HTML5 document", "It creates the page title"], correctIndex: 2 },
    { quizId: q3.id, question: "Where should all visible page content be placed?", options: ["Inside <head>", "Inside <meta>", "Inside <body>", "Inside <title>"], correctIndex: 2 },
    { quizId: q3.id, question: "What is the purpose of the lang attribute in <html lang='en'>?", options: ["Sets the page color", "Tells the browser and screen readers the language of the page", "Links to a language file", "Translates the page automatically"], correctIndex: 1 },
    { quizId: q3.id, question: "What does <meta charset='UTF-8'> do?", options: ["Sets the page width", "Defines the character encoding to support all languages and symbols", "Links an external stylesheet", "Adds a page description"], correctIndex: 1 },
    { quizId: q3.id, question: "Which meta tag makes a website mobile-responsive?", options: ["<meta name='mobile'>", "<meta name='responsive'>", "<meta name='viewport' content='width=device-width, initial-scale=1.0'>", "<meta name='scale'>"], correctIndex: 2 },
    { quizId: q3.id, question: "Where does the <title> tag appear to users?", options: ["As a large heading on the page", "In the browser tab and search engine results", "As a popup message", "In the bottom footer of the page"], correctIndex: 1 },
    { quizId: q3.id, question: "Which section contains information ABOUT the page (metadata) rather than visible content?", options: ["<body>", "<footer>", "<head>", "<main>"], correctIndex: 2 },
    { quizId: q3.id, question: "What is the correct structure order for an HTML document?", options: ["<body>, <head>, <html>", "<!DOCTYPE html>, <html>, <head>, <body>", "<head>, <!DOCTYPE html>, <body>", "<html>, <!DOCTYPE html>, <body>"], correctIndex: 1 },
    { quizId: q3.id, question: "What is wrong with this tag: <html>content</html> (with no lang attribute)?", options: ["Nothing is wrong", "It is missing a closing tag", "It is missing the lang attribute for accessibility", "html is not a valid tag"], correctIndex: 2 },
    { quizId: q3.id, question: "Which element is the 'root' or parent of all other HTML elements?", options: ["<head>", "<body>", "<main>", "<html>"], correctIndex: 3 },
    { quizId: q3.id, question: "What should the meta description be used for?", options: ["Setting page width", "Showing a description in search engine results (150-160 characters)", "Adding internal CSS", "Defining JavaScript variables"], correctIndex: 1 },
    { quizId: q3.id, question: "Is content inside <head> visible on the web page?", options: ["Yes, always", "Only on mobile devices", "No, it is hidden metadata", "Only when CSS is disabled"], correctIndex: 2 },
    { quizId: q3.id, question: "What goes inside the <link> tag in the <head>?", options: ["Hyperlinks to other pages", "Images and media", "References to external CSS stylesheets", "JavaScript functions"], correctIndex: 2 },
    { quizId: q3.id, question: "What happens if you forget to include <!DOCTYPE html>?", options: ["The page won't load at all", "The browser may use quirks mode and render inconsistently", "The page shows a warning to users", "Images won't display"], correctIndex: 1 },
    { quizId: q3.id, question: "How many <title> elements should an HTML document have?", options: ["As many as needed", "Two: one in head and one in body", "Exactly one, inside <head>", "None — it is optional"], correctIndex: 2 },
    { quizId: q3.id, question: "What is the purpose of indentation in HTML?", options: ["It is required for the page to work", "It changes how the browser renders elements", "It makes code easier for humans to read and understand", "It adds spacing to the visible page"], correctIndex: 2 },
    { quizId: q3.id, question: "Where should <meta charset='UTF-8'> be placed for best practice?", options: ["At the very end of <body>", "As the first tag inside <head>", "Inside <html> before <head>", "After the <title> tag"], correctIndex: 1 },
    { quizId: q3.id, question: "What does the viewport meta tag's 'initial-scale=1.0' value do?", options: ["Sets the font size to 1px", "Sets the initial zoom level to 100% (no zoom)", "Makes the page 1 column wide", "Loads the page once only"], correctIndex: 1 },
    { quizId: q3.id, question: "Which of these tags does NOT belong inside <head>?", options: ["<title>", "<meta>", "<link>", "<p>"], correctIndex: 3 },
  ]);

  // ── LESSON 4: Installing and Using VS Code ─────────────────────────
  const [c4] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 4: Installing and Using VS Code",
    description: "Set up your professional coding environment with Visual Studio Code — the world's most popular code editor for web development.",
    level: "Beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c4.id,
    title: "Installing and Using VS Code",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My VS Code Project</title>
  </head>
  <body>

    <h1>Built with VS Code!</h1>

    <!-- Emmet shortcut: type 'p' then Tab to create a <p> tag -->
    <p>This file was created using Visual Studio Code,
    the world's most popular code editor.</p>

    <!-- Emmet shortcut: type 'ul>li*3' then Tab -->
    <ul>
      <li>VS Code has syntax highlighting</li>
      <li>It auto-closes HTML tags</li>
      <li>It has hundreds of useful extensions</li>
    </ul>

    <!-- Emmet shortcut: type 'a[href="#"]' then Tab -->
    <a href="https://code.visualstudio.com">Download VS Code Free</a>

    <!--
      VS Code Keyboard Shortcuts to Practice:
      Ctrl+S (Cmd+S)       → Save file
      Ctrl+Z (Cmd+Z)       → Undo
      Alt+Shift+F          → Format/indent your code
      Ctrl+/               → Comment/uncomment selected lines
      Ctrl+Space           → Trigger code suggestions
    -->

  </body>
</html>`,
    content: `═══════════════════════════════════════════════
  LESSON 4 — INSTALLING AND USING VS CODE
═══════════════════════════════════════════════

🎯 LEARNING OBJECTIVES
━━━━━━━━━━━━━━━━━━━━━━
After completing this lesson, you will be able to:
  • Explain why professional code editors are better than Notepad
  • Download and install Visual Studio Code
  • Navigate the VS Code interface confidently
  • Install essential HTML extensions
  • Create and save your first HTML file in VS Code
  • Use Emmet shortcuts to write HTML faster

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHY USE A CODE EDITOR?
───────────────────────
You CAN write HTML in Notepad — but professional developers
use code editors for very good reasons:

  NOTEPAD:               VS CODE:
  ─────────────────      ───────────────────────────────────
  Plain white text       Color-coded syntax highlighting
  No autocomplete        Intelligent code suggestions
  Easy to make errors    Catches errors as you type
  No extensions          500+ extensions available
  Hard to navigate       File tree, tabs, split screens
  No shortcuts           Powerful keyboard shortcuts
  Manual formatting      Auto-format with one keypress

VS Code (Visual Studio Code) is:
  ✓ FREE and open-source (made by Microsoft)
  ✓ The most popular code editor in the world (used by 73% of devs)
  ✓ Available on Windows, Mac, and Linux
  ✓ Lightweight yet incredibly powerful
  ✓ Perfect for beginners AND professional developers

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INSTALLING VS CODE
──────────────────
Step 1: Open your browser and go to:
        https://code.visualstudio.com

Step 2: Click the big blue "Download" button
        (It automatically detects your operating system)

Step 3: Run the downloaded installer
        • Windows: Run the .exe file, click Next through the wizard
        • Mac: Open the .dmg file, drag VS Code to Applications
        • Linux: Follow the instructions for your distro

Step 4: Open VS Code
        • Windows: Double-click the desktop icon or search "VS Code"
        • Mac: Open from Applications folder or Spotlight (Cmd+Space)
        • Linux: Run 'code' in the terminal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VS CODE INTERFACE OVERVIEW
───────────────────────────
When you first open VS Code, you'll see:

  ┌────────────────────────────────────────┐
  │ MENU BAR (File, Edit, View, etc.)      │
  ├──────────────────────────────────────────
  │ ACTIVITY │              │ MINIMAP      │
  │ BAR      │   EDITOR     │ (code        │
  │ (icons)  │   AREA       │  overview)   │
  │          │              │              │
  │ 📁 Files │              │              │
  │ 🔍 Search│              │              │
  │ 🔀 Git   │              │              │
  │ 🔌 Ext.  │──────────────│              │
  │          │   TERMINAL   │              │
  │          │   (bottom)   │              │
  └──────────────────────────────────────────

  Activity Bar: Quick access to files, search, extensions
  Explorer: Your project files and folders
  Editor: Where you write your code
  Terminal: Command line inside VS Code
  Status Bar: Information about your file (bottom strip)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATING YOUR FIRST HTML FILE
──────────────────────────────
Step 1: Open VS Code

Step 2: Create a new folder for your project
        File → Open Folder → Create New Folder → "my-website"

Step 3: Create a new file
        Click the New File icon in the Explorer panel
        OR: File → New File (Ctrl+N / Cmd+N)

Step 4: Name the file
        Type: index.html
        (index.html is the standard name for a home page)

Step 5: Start coding!
        The .html extension tells VS Code to enable HTML features

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EMMET — WRITE HTML IN SECONDS
──────────────────────────────
Emmet is a built-in VS Code feature that expands shorthand
into full HTML. Type the shorthand and press TAB:

  SHORTHAND     →  EXPANDS TO
  ──────────────────────────────────────────────
  !             →  Full HTML boilerplate (all 5 required lines!)
  h1            →  <h1></h1>
  p             →  <p></p>
  a             →  <a href=""></a>
  ul>li         →  <ul><li></li></ul>
  ul>li*3       →  <ul> with 3 <li> items
  div.container →  <div class="container"></div>
  div#header    →  <div id="header"></div>
  p.intro>em    →  <p class="intro"><em></em></p>

💡 Most useful shortcut for beginners:
   Type ! and press Tab in an empty .html file
   → Gets you the entire HTML5 boilerplate instantly!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ESSENTIAL VS CODE EXTENSIONS FOR HTML
──────────────────────────────────────
Install these by clicking the Extensions icon (🔌) or pressing
Ctrl+Shift+X (Cmd+Shift+X):

  1. "Prettier — Code formatter"
     Author: Prettier
     Purpose: Automatically formats and indents your code
     Usage: Right-click → Format Document, or save with auto-format

  2. "Live Server"
     Author: Ritwick Dey
     Purpose: Opens your HTML in the browser and auto-refreshes
              when you save — see changes instantly!
     Usage: Right-click your .html file → "Open with Live Server"

  3. "Auto Close Tag"
     Author: Jun Han
     Purpose: Automatically adds closing tags when you type an opening tag
     Example: Type <p> and </p> appears automatically!

  4. "Auto Rename Tag"
     Author: Jun Han
     Purpose: Renames matching closing tag when you rename opening tag

  5. "HTML CSS Support"
     Author: ecmel
     Purpose: Adds CSS class suggestions in HTML files

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ESSENTIAL KEYBOARD SHORTCUTS
──────────────────────────────
Shortcut              Action
─────────────────────────────────────────────
Ctrl+S / Cmd+S        Save the current file
Ctrl+Z / Cmd+Z        Undo last change
Ctrl+Y / Cmd+Shift+Z  Redo
Ctrl+/ / Cmd+/        Toggle line comment
Ctrl+Space            Show code suggestions
Alt+Shift+F           Format/auto-indent code
Ctrl+D / Cmd+D        Select next occurrence
Ctrl+P / Cmd+P        Quick file open
Ctrl+\` / Cmd+\`      Toggle terminal
Ctrl+Shift+P          Command palette (search any command)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VIEWING YOUR HTML IN A BROWSER
────────────────────────────────
Method 1: Simple (without Live Server):
  • Right-click your index.html file in VS Code Explorer
  • Click "Open with Live Server"
  OR
  • Find the file in your computer's file manager
  • Double-click the .html file → opens in your default browser

Method 2: With Live Server extension (recommended):
  • Right-click your .html file → "Open with Live Server"
  • The page auto-refreshes every time you save!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 PRACTICE QUESTIONS
─────────────────────
1. What company makes VS Code, and how much does it cost?
   Answer: Microsoft; it is completely free and open-source

2. What is the standard name for a website's home page file?
   Answer: index.html

3. What does the Live Server extension do?
   Answer: Opens your HTML in the browser and auto-refreshes on save

4. What Emmet shortcut generates the full HTML5 boilerplate?
   Answer: Type ! and press Tab

5. What keyboard shortcut saves a file in VS Code?
   Answer: Ctrl+S on Windows/Linux, Cmd+S on Mac

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💻 CODING EXERCISES
───────────────────
Exercise 1: Emmet Expansion — what does each produce?
  h2          → <h2></h2>
  ul>li*4     → <ul> with 4 <li> items
  a[href="#"] → <a href="#"></a>
  div.card     → <div class="card"></div>
  p#intro      → <p id="intro"></p>

Exercise 2: Keyboard shortcuts — what does each do?
  Ctrl+S       → Save the file
  Ctrl+Z       → Undo last action
  Alt+Shift+F  → Format / auto-indent code
  Ctrl+/       → Comment or uncomment selected code
  Ctrl+Space   → Show autocomplete suggestions

Exercise 3: True or False:
  VS Code is paid software.                → FALSE (it's free)
  Emmet is a built-in VS Code feature.    → TRUE
  index.html is the conventional name for a home page. → TRUE
  You need the internet to use VS Code.   → FALSE (works offline)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔬 TRY IT YOURSELF
──────────────────
The code editor shows an HTML file as if created in VS Code.
Try these challenges:
  1. Read through the Emmet shortcut comments
  2. Add a new <section> with a heading about your favourite hobby
  3. Add a <ol> (ordered list) with 3 items inside the section
  4. Try using the comment shortcut logic: <!-- your comment -->
  5. Click ▶ Run to preview the result

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 LESSON SUMMARY
─────────────────
  ✓ VS Code is the world's most popular free code editor
  ✓ It provides syntax highlighting, autocomplete, and error hints
  ✓ Download free at code.visualstudio.com
  ✓ index.html is the standard home page filename
  ✓ Emmet shorthand (! + Tab) generates HTML boilerplate instantly
  ✓ Live Server extension auto-refreshes the browser on file save
  ✓ Prettier extension automatically formats your code
  ✓ Ctrl+S / Cmd+S saves your file — use it constantly!

→ Next Lesson: HTML Elements`,
  });

  const [q4] = await db.insert(quizzesTable).values({ courseId: c4.id, title: "Installing and Using VS Code — Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q4.id, question: "VS Code is made by which company?", options: ["Google", "Apple", "Microsoft", "Mozilla"], correctIndex: 2 },
    { quizId: q4.id, question: "How much does VS Code cost?", options: ["$9.99/month", "$99 one-time", "It is completely free", "$4.99/month"], correctIndex: 2 },
    { quizId: q4.id, question: "What is the standard filename for a website's home page?", options: ["home.html", "main.html", "start.html", "index.html"], correctIndex: 3 },
    { quizId: q4.id, question: "What Emmet shortcut generates the full HTML5 boilerplate?", options: ["html + Tab", "! + Tab", "doc + Tab", "html5 + Tab"], correctIndex: 1 },
    { quizId: q4.id, question: "What does the Live Server VS Code extension do?", options: ["Uploads your site to the internet", "Auto-refreshes the browser when you save a file", "Speeds up VS Code", "Checks for spelling mistakes"], correctIndex: 1 },
    { quizId: q4.id, question: "What keyboard shortcut saves a file in VS Code on Windows?", options: ["Ctrl+W", "Ctrl+S", "Ctrl+D", "Ctrl+F"], correctIndex: 1 },
    { quizId: q4.id, question: "What does Alt+Shift+F do in VS Code?", options: ["Opens a new file", "Closes the current tab", "Auto-formats and indents your code", "Searches across files"], correctIndex: 2 },
    { quizId: q4.id, question: "What is Emmet?", options: ["A VS Code extension you must install separately", "A built-in shorthand expansion tool for writing HTML/CSS faster", "A type of HTML tag", "A browser developer tool"], correctIndex: 1 },
    { quizId: q4.id, question: "What does the Prettier extension do?", options: ["Makes text prettier with fonts", "Automatically formats and indents your code", "Generates HTML from descriptions", "Adds colour themes to VS Code"], correctIndex: 1 },
    { quizId: q4.id, question: "What Emmet shortcut produces <ul> with 3 <li> items?", options: ["ul-li*3", "ul>li>3", "ul>li*3", "ul+li*3"], correctIndex: 2 },
    { quizId: q4.id, question: "What keyboard shortcut toggles a comment in VS Code?", options: ["Ctrl+C", "Ctrl+M", "Ctrl+/", "Ctrl+K"], correctIndex: 2 },
    { quizId: q4.id, question: "What is syntax highlighting?", options: ["Making text bold in HTML", "Colour-coding different parts of code to make it easier to read", "A VS Code theme", "Highlighting text with the mouse"], correctIndex: 1 },
    { quizId: q4.id, question: "What percentage of developers use VS Code according to surveys?", options: ["About 20%", "About 40%", "About 55%", "About 73%"], correctIndex: 3 },
    { quizId: q4.id, question: "What does Ctrl+Space do in VS Code?", options: ["Saves the file", "Shows code autocomplete suggestions", "Opens the terminal", "Closes VS Code"], correctIndex: 1 },
    { quizId: q4.id, question: "What does the Auto Close Tag extension do?", options: ["Closes VS Code when done", "Automatically adds closing HTML tags when you type opening tags", "Removes unused tags", "Closes browser tabs"], correctIndex: 1 },
    { quizId: q4.id, question: "What does Ctrl+P (Cmd+P on Mac) do in VS Code?", options: ["Prints the file", "Pastes code", "Opens the quick file switcher", "Opens preferences"], correctIndex: 2 },
    { quizId: q4.id, question: "To see all VS Code commands, which shortcut do you use?", options: ["Ctrl+A", "Ctrl+Shift+P (Command Palette)", "Ctrl+F", "Ctrl+T"], correctIndex: 1 },
    { quizId: q4.id, question: "Where are VS Code extensions installed from?", options: ["The Microsoft website only", "The Extension Marketplace inside VS Code (Ctrl+Shift+X)", "A separate installer app", "You cannot install extensions in VS Code"], correctIndex: 1 },
    { quizId: q4.id, question: "What does the Emmet shortcut 'div.container' produce?", options: ["<div>container</div>", "<div id='container'></div>", "<div class='container'></div>", "<container></container>"], correctIndex: 2 },
    { quizId: q4.id, question: "Which of the following is NOT an advantage of VS Code over Notepad?", options: ["Syntax highlighting", "Auto-complete suggestions", "Automatically uploads to a web server", "Extension support"], correctIndex: 2 },
  ]);

  // ── LESSON 5: HTML Elements ────────────────────────────────────────
  const [c5] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 5: HTML Elements",
    description: "Deep-dive into HTML elements — the building blocks of every web page. Learn the difference between block and inline elements.",
    level: "Beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c5.id,
    title: "HTML Elements",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Elements Demo</title>
</head>
<body>

  <!-- BLOCK ELEMENTS (each starts on a new line) -->
  <h1>Block Element: Heading 1</h1>
  <h2>Block Element: Heading 2</h2>
  <p>Block Element: Paragraph — takes up its own full line.</p>
  <div>Block Element: Div — a generic container block.</div>

  <hr>

  <!-- INLINE ELEMENTS (flow within text) -->
  <p>
    This paragraph has <strong>bold text</strong>,
    <em>italic text</em>, a
    <a href="#">link</a>, and
    <span style="color: teal;">coloured span</span> — all inline!
  </p>

  <!-- SELF-CLOSING ELEMENTS -->
  <img src="https://placehold.co/200x100" alt="Placeholder image">
  <br>
  <hr>

  <!-- NESTED ELEMENTS -->
  <ul>
    <li>Item <strong>one</strong></li>
    <li>Item <em>two</em></li>
    <li>Item <a href="#">three</a></li>
  </ul>

  <!-- Try It: Add your own paragraph with at least
       one bold and one italic word inside it -->

</body>
</html>`,
    content: `═══════════════════════════════════════════════
  LESSON 5 — HTML ELEMENTS
═══════════════════════════════════════════════

🎯 LEARNING OBJECTIVES
━━━━━━━━━━━━━━━━━━━━━━
After completing this lesson, you will be able to:
  • Define what an HTML element is
  • Distinguish between opening tags, closing tags, and content
  • Identify the difference between block and inline elements
  • Understand nested (parent/child) element relationships
  • Recognize void (self-closing) elements
  • List the most common HTML elements and their purposes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT IS AN HTML ELEMENT?
─────────────────────────
An HTML element is everything from the opening tag to the closing tag,
INCLUDING the content in between:

  ┌──────────────────────────────────────────┐
  │  <p>   Hello, CodeCraft!   </p>          │
  │  ───   ─────────────────   ────          │
  │  Open   Content            Close         │
  │  tag                       tag           │
  └──────────────────────────────────────────┘

The ELEMENT = opening tag + content + closing tag

Multiple elements on a page:
  <h1>My Title</h1>       ← heading element
  <p>My paragraph.</p>    ← paragraph element
  <a href="#">Click</a>   ← anchor (link) element

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ELEMENT SYNTAX IN DETAIL
─────────────────────────
  <tagname attribute="value">Content here</tagname>

  Components:
  • < >          → Angle brackets surround all tags
  • tagname      → The element type (h1, p, div, span, etc.)
  • attribute    → Extra information added inside the opening tag
  • "value"      → The attribute's value (in quotes)
  • Content      → Text, other elements, or nothing (for void elements)
  • </tagname>   → Closing tag with forward slash

Example with all parts:
  <a href="https://codecraft.io" target="_blank">Learn HTML</a>
  ─ ─────────────────────────────────────────── ───────────  ────
  ↑ attribute name & value                       Content      ↑ Closing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BLOCK VS. INLINE ELEMENTS
──────────────────────────
This is one of the most important concepts in HTML!

BLOCK ELEMENTS:
  • Always start on a NEW LINE
  • Take up the FULL WIDTH available (left to right)
  • Stack vertically on the page
  • Can contain other block and inline elements

  Examples:   <h1> through <h6>
              <p> (paragraph)
              <div> (generic container)
              <ul>, <ol>, <li> (lists)
              <table>, <form>
              <header>, <footer>, <main>, <section>, <article>

  Visualization:
  ┌─────────────────────────────────────┐
  │ <h1> Heading                        │  ← full width
  ├─────────────────────────────────────┤
  │ <p> Paragraph                       │  ← full width
  ├─────────────────────────────────────┤
  │ <div> Another block                 │  ← full width
  └─────────────────────────────────────┘

INLINE ELEMENTS:
  • Do NOT start on a new line
  • Only take up as much width as their content needs
  • Flow within a line of text
  • Cannot contain block elements

  Examples:   <a> (links)
              <strong> (bold)
              <em> (italic)
              <span> (generic inline container)
              <img> (images — technically inline-block)
              <br> (line break)
              <code> (inline code)
              <mark> (highlight)

  Visualization:
  ┌─────────────────────────────────────────────────────┐
  │ This is text with <strong>bold</strong> and          │
  │ <em>italic</em> and a <a>link</a> all in one line   │
  └─────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VOID (SELF-CLOSING) ELEMENTS
──────────────────────────────
Some elements have NO content and NO closing tag:

  <br>    →  Line break (moves to next line)
  <hr>    →  Horizontal rule (a dividing line)
  <img>   →  Displays an image
  <input> →  A form input field
  <meta>  →  Metadata (in the head)
  <link>  →  Links external resources (CSS)

  ⚠️ You cannot put content between their tags.
  They are complete by themselves!

In HTML5: <br> and <br /> are BOTH valid. Most devs use <br>.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NESTED ELEMENTS (PARENT & CHILD)
──────────────────────────────────
Elements can be placed INSIDE other elements.
The outer element is the PARENT, the inner is the CHILD.

  <ul>                     ← Parent (ul)
    <li>                   ← Child of ul, Parent of strong
      <strong>HTML</strong>  ← Child of li, grandchild of ul
    </li>
    <li>CSS</li>           ← Child of ul
  </ul>

RULES FOR NESTING:
  ✓ Inline elements can be nested inside block elements
  ✓ Block elements can contain other block elements
  ✗ Inline elements should NOT contain block elements
  ✗ Tags must be closed in the correct order (last opened = first closed)

CORRECT nesting:   <p><strong>bold</strong> text</p>
WRONG nesting:     <strong><p>paragraph</p></strong>
WRONG order:       <p><strong>text</p></strong>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MOST COMMON HTML ELEMENTS REFERENCE
─────────────────────────────────────
STRUCTURE:
  <html>    Root element
  <head>    Page metadata
  <body>    Visible content
  <div>     Generic block container
  <span>    Generic inline container

HEADINGS:
  <h1> to <h6>  Headings (h1 = most important)

TEXT:
  <p>       Paragraph
  <strong>  Bold (with semantic importance)
  <em>      Italic (with emphasis)
  <br>      Line break
  <hr>      Horizontal rule

LINKS & MEDIA:
  <a>       Hyperlink (anchor)
  <img>     Image
  <video>   Video player
  <audio>   Audio player

LISTS:
  <ul>      Unordered (bulleted) list
  <ol>      Ordered (numbered) list
  <li>      List item
  <dl>      Description list

FORMS:
  <form>    Form container
  <input>   Input field
  <button>  Clickable button
  <label>   Input label
  <select>  Dropdown
  <textarea> Multi-line text input

SEMANTIC:
  <header>  Page/section header
  <nav>     Navigation links
  <main>    Main content
  <section> Thematic section
  <article> Self-contained article
  <aside>   Sidebar content
  <footer>  Page/section footer

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMMON BEGINNER MISTAKES
─────────────────────────
✗ Putting block elements inside inline elements:
    Wrong:  <span><p>text</p></span>
    Right:  <div><p>text</p></div>

✗ Crossing/overlapping tags:
    Wrong:  <b><i>text</b></i>
    Right:  <b><i>text</i></b>

✗ Not closing tags:
    Wrong:  <p>Hello<p>World
    Right:  <p>Hello</p><p>World</p>

✗ Trying to add a closing tag to a void element:
    Wrong:  <br></br>  or  <img src="x.jpg"></img>
    Right:  <br>       and  <img src="x.jpg">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 PRACTICE QUESTIONS
─────────────────────
1. What are the three parts of a normal HTML element?
   Answer: Opening tag, content, closing tag

2. Name three block-level elements:
   Answer: Any three of: h1-h6, p, div, ul, ol, table, header, footer, main, section, article

3. Name three inline elements:
   Answer: Any three of: a, strong, em, span, img, br, code, mark

4. What is a void element?
   Answer: An element with no content and no closing tag (e.g., <br>, <img>)

5. What is wrong with this nesting: <p><div>text</div></p>?
   Answer: A block element (<div>) cannot be placed inside an inline element context (<p>)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💻 CODING EXERCISES
───────────────────
Exercise 1: Classify each element as Block (B) or Inline (I):
  <h1>     → B
  <strong> → I
  <p>      → B
  <a>      → I
  <div>    → B
  <span>   → I
  <ul>     → B
  <em>     → I

Exercise 2: Fix the nesting errors:
  Error 1: <b><p>text</p></b>
  Fix:     <p><b>text</b></p>

  Error 2: <a>text<strong></a></strong>
  Fix:     <a><strong>text</strong></a>

  Error 3: <span><div>content</div></span>
  Fix:     <div><span>content</span></div>

Exercise 3: Write HTML for a navigation list:
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔬 TRY IT YOURSELF
──────────────────
The code editor shows block and inline elements in action.
Try these challenges:
  1. Add a new <section> block element below the list
  2. Inside the section, add a <p> with at least two inline elements
     (e.g., <strong>, <em>, or <a>)
  3. Add a horizontal rule <hr> between the sections
  4. Notice how block elements stack but inline elements flow
  5. Click ▶ Run to see the difference!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 LESSON SUMMARY
─────────────────
  ✓ An HTML element = opening tag + content + closing tag
  ✓ Block elements start on a new line and span full width
  ✓ Inline elements flow within text and only take content-width
  ✓ Void (self-closing) elements have no content: <br>, <img>, <hr>
  ✓ Elements can be nested — outer = parent, inner = child
  ✓ Tags must be properly nested: last opened = first closed
  ✓ Inline elements should not wrap block elements
  ✓ <div> is a generic block container; <span> is a generic inline one

→ Next Lesson: HTML Attributes`,
  });

  const [q5] = await db.insert(quizzesTable).values({ courseId: c5.id, title: "HTML Elements — Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q5.id, question: "What are the three parts of an HTML element (with content)?", options: ["Tag, value, style", "Opening tag, content, closing tag", "Element, attribute, value", "Start, middle, end"], correctIndex: 1 },
    { quizId: q5.id, question: "Which of these is a BLOCK-level element?", options: ["<span>", "<strong>", "<em>", "<p>"], correctIndex: 3 },
    { quizId: q5.id, question: "Which of these is an INLINE element?", options: ["<div>", "<h1>", "<strong>", "<section>"], correctIndex: 2 },
    { quizId: q5.id, question: "What is a void element?", options: ["An element with no CSS styling", "An element with no content and no closing tag", "An empty paragraph", "A hidden element"], correctIndex: 1 },
    { quizId: q5.id, question: "Which of these is a void element?", options: ["<p>", "<div>", "<br>", "<span>"], correctIndex: 2 },
    { quizId: q5.id, question: "Block elements always start on:", options: ["The same line as the previous element", "A new line", "The right side of the page", "The center of the page"], correctIndex: 1 },
    { quizId: q5.id, question: "Inline elements take up:", options: ["The full width of the browser window", "As much space as their content requires", "Exactly 50% of the container width", "A fixed 200px width"], correctIndex: 1 },
    { quizId: q5.id, question: "What is wrong with this HTML: <b><i>text</b></i>?", options: ["b and i cannot be used together", "The tags are overlapping (wrong closing order)", "b is not a valid HTML tag", "text must be capitalized"], correctIndex: 1 },
    { quizId: q5.id, question: "Which element is the generic BLOCK container?", options: ["<span>", "<article>", "<div>", "<section>"], correctIndex: 2 },
    { quizId: q5.id, question: "Which element is the generic INLINE container?", options: ["<div>", "<span>", "<p>", "<main>"], correctIndex: 1 },
    { quizId: q5.id, question: "In a parent-child nesting, which element is the 'parent'?", options: ["The innermost element", "The element with the most attributes", "The outermost/wrapping element", "The first element on the page"], correctIndex: 2 },
    { quizId: q5.id, question: "Which nesting is CORRECT?", options: ["<span><div>text</div></span>", "<p><div>text</div></p>", "<em><section>text</section></em>", "<p><strong>text</strong></p>"], correctIndex: 3 },
    { quizId: q5.id, question: "What does <hr> create?", options: ["A hard return (line break)", "A heading reference", "A horizontal dividing line", "A hidden row"], correctIndex: 2 },
    { quizId: q5.id, question: "Which element represents a thematic section of a page?", options: ["<span>", "<div>", "<section>", "<br>"], correctIndex: 2 },
    { quizId: q5.id, question: "How should a void element be written in HTML5?", options: ["<br></br>", "<br/>", "<br>", "Both <br> and <br/> are valid"], correctIndex: 3 },
    { quizId: q5.id, question: "Can block elements contain inline elements?", options: ["Never", "Only if they have a class attribute", "Yes, that is perfectly valid", "Only with CSS display:inline"], correctIndex: 2 },
    { quizId: q5.id, question: "What does an <article> element represent?", options: ["A list of articles", "A self-contained piece of content (like a blog post)", "An image caption", "An external link"], correctIndex: 1 },
    { quizId: q5.id, question: "Which of the following is NOT a semantic element?", options: ["<article>", "<nav>", "<div>", "<footer>"], correctIndex: 2 },
    { quizId: q5.id, question: "What is the purpose of the <aside> element?", options: ["Links to external pages", "The main page content", "Sidebar or supplementary content", "A footer section"], correctIndex: 2 },
    { quizId: q5.id, question: "In the element <a href='page.html'>Click</a>, what is 'Click'?", options: ["An attribute", "The element type", "The content of the element", "A CSS class"], correctIndex: 2 },
  ]);

  // ── LESSON 6: HTML Attributes ──────────────────────────────────────
  const [c6] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 6: HTML Attributes",
    description: "Learn how HTML attributes add extra information and power to your elements — from IDs and classes to custom data attributes.",
    level: "Beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c6.id,
    title: "HTML Attributes",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Attributes Demo</title>
</head>
<body>

  <!-- id attribute: unique identifier for ONE element -->
  <h1 id="page-title">HTML Attributes Demo</h1>

  <!-- class attribute: reusable label for multiple elements -->
  <p class="highlight">This paragraph has the 'highlight' class.</p>
  <p class="highlight">This one too — classes can be reused!</p>

  <!-- Multiple classes on one element -->
  <p class="highlight large-text">Two classes on one element.</p>

  <!-- style attribute: inline CSS (avoid in real projects!) -->
  <p style="color: teal; font-size: 18px;">Inline styled paragraph.</p>

  <!-- title attribute: tooltip on hover -->
  <p title="This tooltip appears on hover!">Hover over me!</p>

  <!-- href and target on anchor tags -->
  <a href="https://codecraft.io" target="_blank" rel="noopener">
    Visit CodeCraft (opens new tab)
  </a>

  <!-- src and alt on images -->
  <img src="https://placehold.co/300x150"
       alt="A placeholder image for demonstration"
       width="300"
       height="150">

  <!-- Boolean attribute: disabled -->
  <button disabled>I am disabled</button>
  <button>I am enabled</button>

  <!-- data-* custom attribute -->
  <div data-user-id="42" data-role="admin">
    Custom data attributes store extra info for JavaScript.
  </div>

</body>
</html>`,
    content: `═══════════════════════════════════════════════
  LESSON 6 — HTML ATTRIBUTES
═══════════════════════════════════════════════

🎯 LEARNING OBJECTIVES
━━━━━━━━━━━━━━━━━━━━━━
After completing this lesson, you will be able to:
  • Define what HTML attributes are and why they exist
  • Write attributes with correct syntax
  • Use the id, class, style, title, lang, and dir global attributes
  • Distinguish between required and optional attributes
  • Understand boolean attributes
  • Use custom data-* attributes
  • Apply the href, src, alt, target, and rel attributes correctly

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT ARE HTML ATTRIBUTES?
──────────────────────────
Attributes provide additional information or configuration for HTML
elements. They always appear inside the OPENING tag.

  Syntax:
  <tagname attribute="value">Content</tagname>

  Rules:
  • Attributes go inside the OPENING tag only
  • Written as: name="value" (name, equals sign, quoted value)
  • Multiple attributes are separated by spaces
  • Attribute names are lowercase (by convention)
  • Values are in double quotes (single quotes also work)

Example with multiple attributes:
  <a href="https://example.com" target="_blank" title="Visit Example">
    Click here
  </a>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GLOBAL ATTRIBUTES
──────────────────
These attributes work on ANY HTML element:

1. id — Unique Identifier
   ─────────────────────────
   <h1 id="main-heading">Welcome</h1>
   <div id="user-profile">...</div>

   • Must be UNIQUE on the entire page (only one element per id)
   • Used to target elements with CSS (#main-heading) and JavaScript
   • No spaces allowed in id values
   • Convention: use lowercase-with-hyphens (kebab-case)

2. class — Reusable Label
   ─────────────────────────
   <p class="intro">First paragraph</p>
   <p class="intro">Second paragraph</p>
   <p class="intro featured">Both classes!</p>

   • Can be reused on MANY elements (unlike id)
   • Multiple classes are separated by spaces
   • Used to apply CSS styles with the . selector (.intro { })
   • Convention: lowercase-with-hyphens

3. style — Inline CSS
   ─────────────────────
   <p style="color: blue; font-size: 18px;">Styled!</p>

   • Applies CSS directly to ONE element
   • Highest specificity (overrides most other styles)
   • ⚠️ Avoid in real projects — use external CSS instead!
   • Useful for quick testing

4. title — Tooltip
   ─────────────────
   <p title="Extra info on hover">Hover over me</p>
   <abbr title="HyperText Markup Language">HTML</abbr>

   • Shows as a browser tooltip when user hovers
   • Very useful for abbreviations and additional context

5. lang — Language
   ──────────────────
   <html lang="en">        ← Whole page is English
   <p lang="fr">Bonjour!</p>  ← This paragraph is French

   • Tells browsers and screen readers the language
   • Important for accessibility and proper pronunciation
   • Common values: "en", "fr", "es", "de", "zh", "ar"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ELEMENT-SPECIFIC ATTRIBUTES
─────────────────────────────

For <a> (links):
  href="url"      →  Where the link goes (required for linking!)
  target="_blank" →  Opens in a new tab
  rel="noopener"  →  Security attribute for _blank links
  download        →  Downloads the file instead of navigating

For <img> (images):
  src="url"       →  Image source path (REQUIRED)
  alt="text"      →  Alternative text if image fails to load (REQUIRED)
  width="300"     →  Width in pixels
  height="200"    →  Height in pixels
  loading="lazy"  →  Delays loading until image is visible

For <input> (forms):
  type="text"     →  Input type (text, email, password, checkbox, etc.)
  name="username" →  Form field name (used when submitting)
  placeholder="hint" → Greyed-out hint text
  required        →  Field must be filled in
  value="default" →  Pre-filled value

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BOOLEAN ATTRIBUTES
───────────────────
Boolean attributes don't need a value — their presence means TRUE.

  <button disabled>Can't click me!</button>
  <input required>
  <input checked>
  <video autoplay muted loop>
  <select multiple>

The following are ALL equivalent for disabled:
  disabled
  disabled=""
  disabled="disabled"
  disabled="true"   ← all mean the same thing!

To remove a boolean attribute = to set it to false.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOM DATA ATTRIBUTES (data-*)
──────────────────────────────────
You can store any custom data on HTML elements:

  <div data-user-id="42" data-role="admin">
    User profile
  </div>

  <button data-action="delete" data-item="photo-123">
    Delete
  </button>

  • Must start with "data-" followed by your chosen name
  • Can be accessed with JavaScript: element.dataset.userId
  • Invisible to users but readable by scripts
  • Great for storing extra state without hidden fields
  • Names: lowercase with hyphens (data-user-id not data-userId)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEST PRACTICES
──────────────
  ✓ Always quote attribute values: href="url" not href=url
  ✓ Use id for unique, single elements; class for reusable groups
  ✓ Always include alt on <img> (accessibility + SEO)
  ✓ Use rel="noopener noreferrer" with target="_blank" for security
  ✓ Use lowercase attribute names
  ✓ Don't use the style attribute in real projects (use CSS files)
  ✓ Use data-* attributes for custom data instead of made-up ones

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMMON BEGINNER MISTAKES
─────────────────────────
✗ Duplicating id values:
    Wrong: Two elements with id="header"
    Right: Each id must be unique on the page

✗ Putting attributes in closing tags:
    Wrong: </a href="#">
    Right: <a href="#">...</a>

✗ Forgetting alt on images:
    Wrong: <img src="photo.jpg">
    Right: <img src="photo.jpg" alt="Description of photo">

✗ Using spaces in attribute values without quotes:
    Wrong: class=big text
    Right: class="big text"

✗ Inventing attribute names (use data-* instead):
    Wrong: <div mydata="42">
    Right: <div data-mydata="42">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 PRACTICE QUESTIONS
─────────────────────
1. Where are attributes placed in an HTML element?
   Answer: Inside the opening tag only

2. What is the difference between id and class?
   Answer: id must be unique (one per page); class can be reused on many elements

3. What does the alt attribute on an <img> do?
   Answer: Provides alternative text for screen readers and when the image fails to load

4. What is a boolean attribute?
   Answer: An attribute whose presence means true (no value needed) e.g., disabled, required

5. What naming prefix do custom data attributes use?
   Answer: data-* (e.g., data-user-id="42")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💻 CODING EXERCISES
───────────────────
Exercise 1: Add attributes to make these correct:
  a) A link to google.com that opens in a new tab:
     <a href="https://google.com" target="_blank" rel="noopener">Google</a>

  b) An image with a source and description:
     <img src="profile.jpg" alt="Profile photo of John Doe" width="200">

  c) A required email input with placeholder:
     <input type="email" name="email" placeholder="your@email.com" required>

Exercise 2: What is wrong with each?
  a) <img src="photo.jpg">         → Missing alt attribute
  b) <a target="_blank">Visit</a>  → Missing href attribute
  c) <p id="box" id="main">        → Duplicate id on same element

Exercise 3: Write a button with custom data:
  <button
    data-product-id="789"
    data-action="add-to-cart"
    type="button">
    Add to Cart
  </button>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔬 TRY IT YOURSELF
──────────────────
The code editor demonstrates many different attributes.
Try these challenges:
  1. Change the id of the <h1> to "my-heading"
  2. Add a second class to the first <p> element (e.g., class="highlight bold")
  3. Add a title attribute to the image with a description
  4. Change the button from disabled to enabled (remove "disabled")
  5. Add your own data-* attribute to the <div> at the bottom
  6. Click ▶ Run to see the results!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 LESSON SUMMARY
─────────────────
  ✓ Attributes add extra info/config to HTML elements
  ✓ They go inside the opening tag: <tag attribute="value">
  ✓ id is unique per page; class can be reused on many elements
  ✓ style adds inline CSS (but prefer external CSS files)
  ✓ title shows a tooltip on hover
  ✓ Boolean attributes (disabled, required, checked) need no value
  ✓ alt is required on all images for accessibility
  ✓ target="_blank" opens links in new tabs (add rel="noopener"!)
  ✓ data-* attributes store custom data for JavaScript

→ Next Lesson: HTML Headings and Paragraphs`,
  });

  const [q6] = await db.insert(quizzesTable).values({ courseId: c6.id, title: "HTML Attributes — Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q6.id, question: "Where must HTML attributes always be placed?", options: ["In the closing tag", "In the content area", "In the opening tag", "In the <head> section"], correctIndex: 2 },
    { quizId: q6.id, question: "What is the correct syntax for an HTML attribute?", options: ["attribute:value", "attribute(value)", 'attribute="value"', "attribute[value]"], correctIndex: 2 },
    { quizId: q6.id, question: "What does the id attribute do?", options: ["Applies a style class", "Provides a unique identifier for one element on the page", "Links to an external file", "Sets the language of an element"], correctIndex: 1 },
    { quizId: q6.id, question: "Unlike id, how many elements can share the same class?", options: ["Only two", "Only one", "Up to ten", "As many as needed"], correctIndex: 3 },
    { quizId: q6.id, question: "What is REQUIRED to be included with every <img> tag?", options: ["width and height", "title attribute", "src and alt attributes", "class and id"], correctIndex: 2 },
    { quizId: q6.id, question: "What does target='_blank' do on a link?", options: ["Opens the link in the same tab", "Opens the link in a new browser tab/window", "Downloads the linked file", "Prevents the link from working"], correctIndex: 1 },
    { quizId: q6.id, question: "What security attribute should be added when using target='_blank'?", options: ['rel="noopener noreferrer"', 'secure="true"', 'safe="1"', 'type="safe"'], correctIndex: 0 },
    { quizId: q6.id, question: "What is a boolean attribute?", options: ["An attribute with a true/false value in quotes", "An attribute whose mere presence means true (no value needed)", "An attribute that accepts numbers only", "An attribute specific to forms"], correctIndex: 1 },
    { quizId: q6.id, question: "Which of these is a boolean attribute?", options: ["href", "src", "disabled", "class"], correctIndex: 2 },
    { quizId: q6.id, question: "What does the title attribute do?", options: ["Sets the page title in the tab", "Shows a tooltip when the user hovers over the element", "Defines the element's importance", "Links to a title page"], correctIndex: 1 },
    { quizId: q6.id, question: "What prefix must custom data attributes start with?", options: ["custom-", "my-", "data-", "attr-"], correctIndex: 2 },
    { quizId: q6.id, question: "How do you put two CSS classes on one element?", options: ["class='blue' class='large'", "class='blue; large'", "class='blue, large'", "class='blue large'"], correctIndex: 3 },
    { quizId: q6.id, question: "What does the alt attribute on an image do?", options: ["Aligns the image", "Sets alternate colours", "Provides descriptive text for accessibility and when image fails", "Sets the image format"], correctIndex: 2 },
    { quizId: q6.id, question: "Which attribute makes a form field mandatory?", options: ["mandatory", "required", "must-fill", "validate"], correctIndex: 1 },
    { quizId: q6.id, question: "What is the purpose of the style attribute?", options: ["Defines which CSS file to use", "Applies inline CSS styling directly to an element", "Sets the element's font family globally", "Links to a style template"], correctIndex: 1 },
    { quizId: q6.id, question: "What is wrong with this HTML: <div mycolor='blue'>?", options: ["div cannot have attributes", "mycolor is not a valid attribute (should use data-mycolor or style)", "The value needs no quotes", "Attribute names must be uppercase"], correctIndex: 1 },
    { quizId: q6.id, question: "Can an element have both an id and a class attribute?", options: ["No, only one identifier allowed", "Yes, an element can have both id and class", "Only block elements can have both", "Only if the values are different"], correctIndex: 1 },
    { quizId: q6.id, question: "The href attribute is required on which element?", options: ["<img>", "<p>", "<a>", "<div>"], correctIndex: 2 },
    { quizId: q6.id, question: "What does loading='lazy' do on an image?", options: ["Makes the image load slowly for effect", "Prevents the image from ever loading", "Delays loading until the image is about to be seen (performance)", "Loads the image multiple times"], correctIndex: 2 },
    { quizId: q6.id, question: "What is wrong with: <img src='pic.jpg' alt=''>?", options: ["Nothing — empty alt is valid for decorative images", "src must be a full URL", "alt must have at least 50 characters", "img cannot have both src and alt"], correctIndex: 0 },
  ]);

  // ── LESSON 7: HTML Headings and Paragraphs ────────────────────────
  const [c7] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 7: HTML Headings and Paragraphs",
    description: "Master HTML headings (h1-h6), paragraphs, line breaks, and text formatting to create well-structured, readable content.",
    level: "Beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c7.id,
    title: "HTML Headings and Paragraphs",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Headings and Paragraphs Demo</title>
</head>
<body>

  <!-- Six levels of headings — h1 is most important -->
  <h1>H1: Main Page Title (use only once per page)</h1>
  <h2>H2: Major Section Heading</h2>
  <h3>H3: Sub-section Heading</h3>
  <h4>H4: Sub-sub-section Heading</h4>
  <h5>H5: Minor Heading</h5>
  <h6>H6: Smallest Heading</h6>

  <hr>

  <!-- Paragraphs -->
  <p>
    This is a standard paragraph. The browser automatically
    adds space above and below each paragraph element.
    Even if you add extra spaces    or line breaks
    in your code, the browser ignores them.
  </p>

  <p>This is a second paragraph. Notice how the browser
  automatically puts spacing between paragraphs — no
  extra markup needed!</p>

  <!-- Forced line break inside a paragraph -->
  <p>
    Line one of a poem.<br>
    Line two of a poem.<br>
    Line three of a poem.
  </p>

  <!-- Horizontal rule (divider) -->
  <hr>

  <!-- Text formatting inside paragraphs -->
  <p>
    HTML has <strong>bold/important text</strong>,
    <em>italic/emphasised text</em>,
    <mark>highlighted text</mark>,
    <del>deleted/strikethrough text</del>,
    <ins>inserted/underlined text</ins>,
    <sub>subscript</sub> and <sup>superscript</sup>,
    and <code>inline code</code>.
  </p>

  <!-- The pre element preserves whitespace -->
  <pre>
    Name:  John Doe
    Age:   25
    City:  London
  </pre>

</body>
</html>`,
    content: `═══════════════════════════════════════════════
  LESSON 7 — HTML HEADINGS AND PARAGRAPHS
═══════════════════════════════════════════════

🎯 LEARNING OBJECTIVES
━━━━━━━━━━━━━━━━━━━━━━
After completing this lesson, you will be able to:
  • Use all six heading levels (h1–h6) correctly
  • Write paragraphs using the <p> element
  • Apply line breaks and horizontal rules
  • Use text formatting tags: strong, em, mark, del, ins, sub, sup, code
  • Understand how browsers handle whitespace in HTML
  • Apply heading hierarchy for accessibility and SEO

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTML HEADINGS (h1–h6)
───────────────────────
HTML provides SIX levels of headings. Think of them like a document
outline — from the main title down to the smallest sub-heading:

  <h1>Main Page Title</h1>      ← Most important, largest
  <h2>Section Heading</h2>      ← Second level
  <h3>Sub-section</h3>          ← Third level
  <h4>Sub-sub-section</h4>      ← Fourth level
  <h5>Minor heading</h5>        ← Fifth level
  <h6>Smallest heading</h6>     ← Least important, smallest

Visual Size Comparison:
  h1 → HUGE bold text
  h2 → Large bold text
  h3 → Medium bold text
  h4 → Normal bold text
  h5 → Small bold text
  h6 → Tiny bold text

HEADING RULES & BEST PRACTICES:
  ✓ Use ONLY ONE <h1> per page (the page's main title)
  ✓ Don't skip levels: h1 → h2 → h3 (not h1 → h4)
  ✓ Use headings for STRUCTURE, not for making text big
  ✓ Search engines give h1 the most SEO weight
  ✓ Screen readers use headings to navigate the page

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DOCUMENT OUTLINE EXAMPLE
──────────────────────────
A proper heading hierarchy might look like this:

  h1: "The Complete Guide to HTML"
    h2: "Chapter 1: Getting Started"
      h3: "What is HTML?"
      h3: "Why Learn HTML?"
    h2: "Chapter 2: HTML Elements"
      h3: "Block Elements"
        h4: "The Paragraph Element"
        h4: "The Div Element"
      h3: "Inline Elements"
    h2: "Chapter 3: Forms"

Never use headings purely for their visual size — use CSS for that!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE PARAGRAPH ELEMENT <p>
──────────────────────────
The <p> element is for blocks of text:

  <p>This is my first paragraph of text.</p>
  <p>This is my second paragraph.</p>

Key facts about <p>:
  • Block element — starts on a new line
  • Automatically adds margin above and below (browser default)
  • Browsers IGNORE extra spaces and line breaks inside <p>
  • Always wrap paragraph text in <p> tags

WHITESPACE IN HTML:
  This code:
    <p>Hello          World</p>
    <p>Hello
    World</p>

  Both render as: "Hello World" (multiple spaces become one)

  To force extra space: use &nbsp; (non-breaking space)
  To force line breaks: use <br>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LINE BREAKS AND HORIZONTAL RULES
──────────────────────────────────

<br> — Line Break
  <p>
    221B Baker Street,<br>
    London,<br>
    England.
  </p>

  • Forces text onto the NEXT line within the same block
  • Self-closing void element (no closing tag)
  • Use sparingly — don't use <br><br> to add space (use CSS margin)
  • Good use: addresses, poems, song lyrics

<hr> — Horizontal Rule
  <p>Chapter 1 content...</p>
  <hr>
  <p>Chapter 2 content...</p>

  • Draws a horizontal dividing line across the page
  • Self-closing void element
  • Used to separate sections visually
  • Can be styled with CSS (color, width, thickness)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEXT FORMATTING TAGS
──────────────────────
These inline elements format text inside paragraphs:

  TAG          OUTPUT           MEANING
  ──────────────────────────────────────────────────────
  <strong>     Bold text        Important/strong emphasis
  <em>         Italic text      Stressed emphasis
  <mark>       Highlighted      Highlighted/relevant text
  <del>        ~~Deleted~~      Deleted/removed text
  <ins>        Underlined       Inserted/added text
  <sub>        Subscript        H₂O (chemistry, math)
  <sup>        Superscript      E=mc² (powers, footnotes)
  <code>       Monospace        Inline code snippets
  <small>      Small text       Fine print, disclaimers
  <abbr>       Abbreviation     With tooltip via title attr
  <q>          "Quote"          Short inline quotation
  <cite>       Citation italic  References and citations

EXAMPLES:
  <p>Water is written as H<sub>2</sub>O in chemistry.</p>
  <p>Einstein's equation is E=mc<sup>2</sup>.</p>
  <p>Press <code>Ctrl+S</code> to save your file.</p>
  <p><abbr title="HyperText Markup Language">HTML</abbr> is great!</p>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE <pre> ELEMENT
──────────────────
<pre> (preformatted text) preserves ALL whitespace:

  <pre>
    Name:    Alice
    Age:     28
    City:    Paris
  </pre>

  Unlike <p>, <pre> shows every space and line break exactly
  as typed. Useful for:
  ✓ Displaying code samples (often paired with <code>)
  ✓ ASCII art
  ✓ Formatted data that needs exact spacing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEMANTIC vs. VISUAL FORMATTING
────────────────────────────────
Use semantic tags that carry MEANING:
  <strong> — semantically important (bold appearance)
  <em>     — semantically emphasised (italic appearance)

Avoid purely visual tags when meaning matters:
  <b>  — visually bold, but no semantic importance
  <i>  — visually italic, but no semantic emphasis

When to use <b> and <i>:
  <b> → Book titles, keywords, highlighted without importance
  <i> → Technical terms, foreign phrases, thoughts

Screen readers announce <strong> and <em> differently than
<b> and <i>. Use semantic tags for better accessibility.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMMON BEGINNER MISTAKES
─────────────────────────
✗ Using multiple <h1> tags:
    Only one h1 per page — it's the page's main title!

✗ Skipping heading levels:
    Wrong:  h1 → h3 → h5 (skips h2 and h4)
    Right:  h1 → h2 → h3 → h4

✗ Using headings just for size:
    Wrong:  <h3>Normal paragraph text</h3> (just for big text)
    Right:  <p style="font-size: 20px;">Normal text</p>
    (Better: Use CSS classes instead of inline styles)

✗ Using <br> for spacing instead of CSS:
    Wrong:  <br><br><br> between sections
    Right:  Add margin with CSS

✗ Not wrapping text in <p>:
    Wrong:  <body>Bare text without any tag</body>
    Right:  <body><p>Text wrapped in paragraph</p></body>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 PRACTICE QUESTIONS
─────────────────────
1. How many <h1> elements should a page have?
   Answer: Only one — it represents the main page title

2. What is the purpose of <br>?
   Answer: Forces a line break, moving subsequent text to the next line

3. What is the difference between <strong> and <b>?
   Answer: <strong> has semantic importance; <b> is purely visual bold

4. What does the <pre> element do?
   Answer: Displays text with all whitespace and line breaks preserved

5. What happens when you put multiple spaces in a <p> tag?
   Answer: Browsers collapse them to a single space

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💻 CODING EXERCISES
───────────────────
Exercise 1: Create a document outline using correct headings:
  <h1>My Portfolio</h1>
    <h2>About Me</h2>
      <h3>My Background</h3>
      <h3>My Education</h3>
    <h2>My Projects</h2>
      <h3>Project 1</h3>
      <h3>Project 2</h3>
    <h2>Contact Me</h2>

Exercise 2: Format this text correctly:
  "Water H2O boils at 100°C. Press Ctrl+S to save. Important!"
  
  <p>Water H<sub>2</sub>O boils at 100°C.
  Press <code>Ctrl+S</code> to save.
  <strong>Important!</strong></p>

Exercise 3: Write an address using line breaks:
  <address>
    <strong>CodeCraft HQ</strong><br>
    123 Coding Lane,<br>
    Silicon Valley,<br>
    CA 94025, USA
  </address>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔬 TRY IT YOURSELF
──────────────────
The code editor shows all heading levels and paragraph formatting.
Try these challenges:
  1. Write a structured article with h1, h2, h3, and paragraphs
  2. Add a poem using <p> with <br> for line breaks
  3. Add a chemical formula using <sub>: H<sub>2</sub>O
  4. Add a math formula using <sup>: E=mc<sup>2</sup>
  5. Add a code example using <code> inside a paragraph
  6. Click ▶ Run to see how it all looks!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 LESSON SUMMARY
─────────────────
  ✓ There are 6 heading levels: <h1> (largest) to <h6> (smallest)
  ✓ Use only ONE <h1> per page — it's the main title
  ✓ Don't skip heading levels — go h1 → h2 → h3 in order
  ✓ <p> creates paragraphs with automatic spacing
  ✓ Browsers collapse extra whitespace inside <p> to one space
  ✓ <br> forces a line break; <hr> draws a horizontal line
  ✓ <strong> = bold + important; <em> = italic + emphasis
  ✓ <sub> for subscript (H₂O); <sup> for superscript (E=mc²)
  ✓ <pre> preserves all whitespace exactly as typed
  ✓ Use CSS for spacing — not multiple <br> tags

→ Next Lesson: HTML Comments`,
  });

  const [q7] = await db.insert(quizzesTable).values({ courseId: c7.id, title: "HTML Headings and Paragraphs — Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q7.id, question: "How many heading levels does HTML provide?", options: ["3", "4", "5", "6"], correctIndex: 3 },
    { quizId: q7.id, question: "Which heading element is the most important and largest?", options: ["<h6>", "<h3>", "<h1>", "<heading>"], correctIndex: 2 },
    { quizId: q7.id, question: "How many <h1> elements should a page ideally have?", options: ["As many as needed", "One per section", "Only one total", "At least three"], correctIndex: 2 },
    { quizId: q7.id, question: "What does the <p> element create?", options: ["A clickable button", "A paragraph of text with automatic spacing", "A heading", "A list item"], correctIndex: 1 },
    { quizId: q7.id, question: "What does <br> do?", options: ["Creates a horizontal line", "Creates a block row", "Forces a line break within text", "Adds a border around an element"], correctIndex: 2 },
    { quizId: q7.id, question: "What does <hr> create?", options: ["A hyper reference", "A highlighted region", "A horizontal dividing line", "A hard reset on styles"], correctIndex: 2 },
    { quizId: q7.id, question: "What is the difference between <strong> and <b>?", options: ["They are identical in all ways", "<strong> has semantic importance; <b> is only visual", "<b> is for bold; <strong> is for underline", "<strong> works only in forms"], correctIndex: 1 },
    { quizId: q7.id, question: "What does <em> create?", options: ["Email link", "Italic text with semantic emphasis", "Enlarged text", "An embed element"], correctIndex: 1 },
    { quizId: q7.id, question: "What element would you use to display H₂O (water formula)?", options: ["H<low>2</low>O", "H<sub>2</sub>O", "H<small>2</small>O", "H<2>O"], correctIndex: 1 },
    { quizId: q7.id, question: "What element displays E=mc² (superscript)?", options: ["<super>", "<up>", "<sup>", "<raise>"], correctIndex: 2 },
    { quizId: q7.id, question: "What happens to extra spaces in a <p> element?", options: ["They are all preserved exactly", "They are removed completely", "They are collapsed to a single space", "They cause a browser error"], correctIndex: 2 },
    { quizId: q7.id, question: "What does the <pre> element do?", options: ["Creates a preview window", "Displays preformatted text preserving all whitespace", "Is a shorthand for <p> and <re>", "Creates a table"], correctIndex: 1 },
    { quizId: q7.id, question: "Which element is used to display inline code?", options: ["<program>", "<script>", "<code>", "<pre>"], correctIndex: 2 },
    { quizId: q7.id, question: "What is wrong with this heading structure: h1 → h3 → h5?", options: ["Nothing is wrong", "Heading levels are being skipped, which harms accessibility and SEO", "h5 is not a valid heading", "h3 should come after h5"], correctIndex: 1 },
    { quizId: q7.id, question: "What does <mark> do?", options: ["Creates a bullet point marker", "Highlights text with a yellow background", "Marks a heading as important", "Creates a bookmark anchor"], correctIndex: 1 },
    { quizId: q7.id, question: "What is the <del> element used for?", options: ["Deletes an element from the page", "Shows deleted or removed text with a strikethrough", "Removes an attribute", "Hides an element"], correctIndex: 1 },
    { quizId: q7.id, question: "Where should <br> be used appropriately?", options: ["Between every paragraph", "For all vertical spacing on a page", "For addresses, poems, and lyrics — not for general spacing", "To replace the <p> element"], correctIndex: 2 },
    { quizId: q7.id, question: "What does <abbr title='World Wide Web'>WWW</abbr> do?", options: ["Links to the WWW website", "Shows 'World Wide Web' as a tooltip when hovering over WWW", "Translates WWW into another language", "Creates a button labelled WWW"], correctIndex: 1 },
    { quizId: q7.id, question: "Which HTML entity creates a non-breaking space?", options: ["&space;", "&nbsp;", "&nbs;", "&break;"], correctIndex: 1 },
    { quizId: q7.id, question: "What is the purpose of using headings for document structure?", options: ["To make text look bigger", "To add color to sections", "To help users and screen readers navigate the page and improve SEO", "To create clickable buttons"], correctIndex: 2 },
  ]);

  // ── LESSON 8: HTML Comments ────────────────────────────────────────
  const [c8] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 8: HTML Comments",
    description: "Learn to write HTML comments — invisible notes in your code that help you stay organised and communicate with other developers.",
    level: "Beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c8.id,
    title: "HTML Comments",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Comments Demo</title>
  <!-- Author: Your Name | Date: 2025 | Version: 1.0 -->
</head>
<body>

  <!-- ==========================================
       MAIN NAVIGATION SECTION
       ========================================== -->
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <!-- TODO: Add contact page link when ready -->
  </nav>

  <!-- PAGE HEADER -->
  <header>
    <h1>Understanding HTML Comments</h1>
    <!-- Subtitle removed per client request — keep for reference:
    <p>The invisible notes in your code</p>
    -->
  </header>

  <!-- MAIN CONTENT -->
  <main>
    <section>
      <h2>What Are Comments?</h2>
      <!-- Good comment: explains WHY, not just what -->
      <!-- Using section here rather than div for better
           screen reader navigation and SEO semantics -->
      <p>Comments are notes that only developers see.
         They are invisible to website visitors.</p>
    </section>

    <!-- TEMPORARILY DISABLED FEATURE
    <section id="special-offer">
      <h2>Special Offer!</h2>
      <p>Coming soon...</p>
    </section>
    -->

  </main>

  <!-- FOOTER -->
  <footer>
    <p>&copy; 2025 CodeCraft</p>
    <!-- Do NOT remove this copyright line -->
  </footer>

</body>
</html>`,
    content: `═══════════════════════════════════════════════
  LESSON 8 — HTML COMMENTS
═══════════════════════════════════════════════

🎯 LEARNING OBJECTIVES
━━━━━━━━━━━━━━━━━━━━━━
After completing this lesson, you will be able to:
  • Explain what HTML comments are and why they are used
  • Write single-line and multi-line HTML comments
  • Use comments to document your code
  • Comment out code to disable it temporarily
  • Apply commenting best practices used by professionals
  • Understand what NOT to put in comments

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT ARE HTML COMMENTS?
────────────────────────
HTML comments are notes inside your HTML code that:
  ✓ Are completely INVISIBLE to website visitors
  ✓ Do NOT affect how the page looks or works
  ✓ Are visible in the page's source code (View Source)
  ✓ Are read only by developers, not browsers

Think of comments like sticky notes on your code — helpful
reminders and explanations for yourself and your teammates.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMMENT SYNTAX
───────────────
An HTML comment starts with <!-- and ends with -->

  <!-- This is a comment -->

  <!-- Everything between the arrows is ignored by the browser -->

  <!--
    This is a
    multi-line
    comment
  -->

IMPORTANT:
  • The opening marker is:  <!--
  • The closing marker is:  -->
  • Comments cannot be nested: <!-- outer <!-- inner --> -->
    (this would close at the first -->)
  • Comments can go ANYWHERE in the HTML (head or body)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SINGLE-LINE COMMENTS
──────────────────────
Perfect for short notes on one line:

  <!-- Navigation section -->
  <nav>...</nav>

  <h1>My Blog</h1> <!-- This heading appears only once -->

  <!-- TODO: Add mobile menu -->

  <!-- Author: Sarah | Last updated: 2025-01 -->

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MULTI-LINE COMMENTS
─────────────────────
Perfect for longer notes and section dividers:

  <!--
    This section contains the main product listing.
    Updated by: James (2025-03-15)
    Note: Each product card uses the .product-card class
    TODO: Add lazy loading once we have 50+ products
  -->

  <!-- ================================
       HEADER SECTION START
       ================================ -->
  <header>
    ...
  </header>
  <!-- ================================
       HEADER SECTION END
       ================================ -->

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMMENTING OUT CODE
────────────────────
One of the most useful features — disabling HTML temporarily
without deleting it:

  <!-- The contact form below is disabled until the backend is ready:
  <section id="contact">
    <h2>Contact Us</h2>
    <form>
      <input type="email" placeholder="Your email">
      <button>Send</button>
    </form>
  </section>
  -->

  This means:
  • The code is preserved (not lost)
  • It's invisible to users
  • You can re-enable it by removing the comment markers
  • Perfect for debugging: "comment out" a section to find problems

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GOOD USES FOR COMMENTS
────────────────────────
  ✓ Section labels: <!-- HEADER START -->
  ✓ TODO reminders: <!-- TODO: Replace with real data -->
  ✓ Explaining complex code: <!-- Using aside here for screen readers -->
  ✓ Author/date info: <!-- Author: Lee | v2.1 | 2025-01-10 -->
  ✓ Disabling code temporarily during development
  ✓ Notes for team members: <!-- Don't remove this — needed for analytics -->
  ✓ Separating major page sections visually

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT NOT TO PUT IN COMMENTS
─────────────────────────────
⚠️ Never put these in HTML comments:
  ✗ Passwords or API keys (comments are visible in source code!)
  ✗ Sensitive personal data
  ✗ Private business logic or unreleased feature details
  ✗ Insults or unprofessional content
  ✗ Comments that state the OBVIOUS:
      Bad:  <!-- This is a paragraph -->
            <p>Text here</p>
      The tag itself already says it's a paragraph!

  ✓ Comments should explain WHY something is done,
    not what it obviously IS.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CAN USERS SEE COMMENTS?
────────────────────────
Comments are NOT shown on the page, but they CAN be seen by:
  • Anyone using "View Page Source" (Ctrl+U in Chrome)
  • Browser developer tools (DevTools → Elements)
  • Anyone who downloads your HTML file

This is why you must NEVER put sensitive information in comments!
They feel invisible but are actually public to anyone who looks.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEST PRACTICES
──────────────
  ✓ Write comments that explain WHY, not WHAT:
      Bad:  <!-- paragraph -->  <p>Hello</p>
      Good: <!-- Greeting shown to returning users -->  <p>Hello</p>

  ✓ Keep comments concise and current
      Delete comments about old code that was removed

  ✓ Use a consistent style for section labels:
      <!-- ===== SECTION NAME ===== -->

  ✓ Add TODO comments for future tasks:
      <!-- TODO: Replace placeholder image with real one -->

  ✓ Add author/version info at the top of important files:
      <!-- Homepage | Author: Alex | Version: 3.2 | 2025-02 -->

  ✗ Don't over-comment obvious things
  ✗ Don't put secrets in comments
  ✗ Don't leave outdated, misleading comments

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMMENTS vs. OTHER LANGUAGES
──────────────────────────────
Different languages have different comment syntax:

  HTML:        <!-- This is a comment -->
  CSS:         /* This is a comment */
  JavaScript:  // Single line comment
               /* Multi-line comment */
  Python:      # This is a comment

Remember: HTML comment syntax ONLY works in .html files.
In a CSS file, you MUST use /* */ — not <!-- -->.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMMON BEGINNER MISTAKES
─────────────────────────
✗ Forgetting the exclamation mark:
    Wrong: <-- comment -->
    Right: <!-- comment -->

✗ Trying to nest comments:
    Wrong: <!-- outer <!-- inner --> -->
    Right: Use one flat comment only

✗ Putting CSS or JS comment syntax in HTML:
    Wrong: // This is a link
    Right: <!-- This is a link -->

✗ Leaving password or secret data in comments:
    Wrong: <!-- Admin password: P@ssw0rd123 -->
    NEVER DO THIS — it's visible in page source!

✗ Commenting obvious things:
    Bad: <!-- h1 heading below -->
         <h1>Title</h1>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 PRACTICE QUESTIONS
─────────────────────
1. What is the correct HTML comment syntax?
   Answer: <!-- your comment here -->

2. Are HTML comments visible to regular website visitors?
   Answer: No — they are invisible on the page, but visible in source code

3. Why should you never put a password in an HTML comment?
   Answer: Comments are visible to anyone who views the page source (Ctrl+U)

4. What is "commenting out" code?
   Answer: Wrapping code in comment tags to disable it temporarily without deleting it

5. What is the difference between a good and bad comment?
   Answer: Good comments explain WHY; bad comments state the obvious WHAT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💻 CODING EXERCISES
───────────────────
Exercise 1: Write a comment for each scenario:
  a) Labelling the footer section:
     <!-- FOOTER SECTION -->

  b) A reminder to add an image:
     <!-- TODO: Replace placeholder with hero image -->

  c) Disabling a button until JavaScript is ready:
     <!-- Button disabled until JS is wired:
     <button onclick="purchase()">Buy Now</button>
     -->

Exercise 2: Fix the comment errors:
  a) <-- Navigation section -->
     Fix: <!-- Navigation section -->

  b) <!-- This is <!-- nested --> -->
     Fix: <!-- This is not nested -->

  c) // This is my heading
     Fix: <!-- This is my heading -->

Exercise 3: Add professional comments to this HTML:
  Before:
    <header>...</header>
    <main>...</main>
    <footer>...</footer>

  After:
    <!-- ===========================
         SITE HEADER — Logo & Nav
         =========================== -->
    <header>...</header>

    <!-- MAIN CONTENT AREA -->
    <main>...</main>

    <!-- SITE FOOTER — Copyright & Links -->
    <footer>...</footer>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔬 TRY IT YOURSELF
──────────────────
The code editor is a fully commented HTML page. Try these:
  1. Read ALL the existing comments to understand the page structure
  2. Add your own comment explaining what the <nav> contains
  3. "Comment out" the <header> section to see it disappear
  4. Add a TODO comment in the <footer>
  5. Add author info in the <head>: <!-- Author: [Your Name] -->
  6. Click ▶ Run — notice: your comments are NOT visible in the output!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 LESSON SUMMARY
─────────────────
  ✓ HTML comments use <!-- --> syntax
  ✓ Comments are invisible on the page but visible in source code
  ✓ NEVER put passwords, secrets, or sensitive data in comments
  ✓ Good comments explain WHY — not the obvious WHAT
  ✓ Use comments to: label sections, leave TODO notes, disable code
  ✓ "Commenting out" code disables it without deleting it
  ✓ Comments can span multiple lines
  ✓ HTML comment syntax <!-- --> only works in HTML files

→ Congratulations! You have completed Lessons 1–8 of the HTML course!
  Continue to the next module to learn HTML Links, Images, and Lists.`,
  });

  const [q8] = await db.insert(quizzesTable).values({ courseId: c8.id, title: "HTML Comments — Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q8.id, question: "What is the correct syntax for an HTML comment?", options: ["// This is a comment", "/* This is a comment */", "<!-- This is a comment -->", "## This is a comment"], correctIndex: 2 },
    { quizId: q8.id, question: "Are HTML comments visible to regular website visitors?", options: ["Yes, always", "Only on mobile devices", "No, they are invisible on the page", "Only if the user zooms in"], correctIndex: 2 },
    { quizId: q8.id, question: "Can website visitors see HTML comments by viewing the page source?", options: ["No — comments are completely hidden", "Yes — they are visible in View Page Source (Ctrl+U)", "Only comments in the <head>", "Only multi-line comments"], correctIndex: 1 },
    { quizId: q8.id, question: "What does 'commenting out' code mean?", options: ["Deleting code permanently", "Uploading code to a comment section", "Wrapping code in comment tags to disable it temporarily", "Writing code in a different language"], correctIndex: 2 },
    { quizId: q8.id, question: "Which of these should you NEVER put in an HTML comment?", options: ["A TODO reminder", "A section label", "A password or API key", "An author name"], correctIndex: 2 },
    { quizId: q8.id, question: "What is the opening marker for an HTML comment?", options: ["<!-", "<!--", "/*", "//"], correctIndex: 1 },
    { quizId: q8.id, question: "What is the closing marker for an HTML comment?", options: ["->", "-->", "*/", "##"], correctIndex: 1 },
    { quizId: q8.id, question: "Which of these is a GOOD use of an HTML comment?", options: ["<!-- <p> tag below -->", "<!-- Password: abc123 -->", "<!-- TODO: Add real image when approved by designer -->", "<!-- Hello World -->"], correctIndex: 2 },
    { quizId: q8.id, question: "What is wrong with this comment: <-- Navigation -->?", options: ["Navigation is misspelled", "The exclamation mark is missing: <!-- Navigation -->", "Comments cannot label sections", "The comment is too short"], correctIndex: 1 },
    { quizId: q8.id, question: "Can HTML comments span multiple lines?", options: ["No — one line only", "Only in the <head>", "Yes — everything between <!-- and --> is a comment", "Only with a special attribute"], correctIndex: 2 },
    { quizId: q8.id, question: "What is the comment syntax in CSS (not HTML)?", options: ["<!-- comment -->", "// comment", "## comment", "/* comment */"], correctIndex: 3 },
    { quizId: q8.id, question: "What is the comment syntax in JavaScript?", options: ["<!-- comment -->", "// comment or /* comment */", "## comment", "** comment **"], correctIndex: 1 },
    { quizId: q8.id, question: "What happens to commented-out HTML?", options: ["It is deleted from the file", "It still runs but invisibly", "It is completely ignored by the browser", "It is sent to the server only"], correctIndex: 2 },
    { quizId: q8.id, question: "A good comment explains:", options: ["What the code obviously does", "Who wrote the company website", "WHY something is done (not just what it is)", "Nothing — comments are unnecessary"], correctIndex: 2 },
    { quizId: q8.id, question: "Can you nest comments inside comments in HTML?", options: ["Yes, unlimited nesting", "Yes, but only 2 levels deep", "No — nested comments break the outer comment", "Only in the <body>"], correctIndex: 2 },
    { quizId: q8.id, question: "Which keyboard shortcut comments/uncomments code in VS Code?", options: ["Ctrl+C", "Ctrl+M", "Ctrl+/", "Ctrl+K"], correctIndex: 2 },
    { quizId: q8.id, question: "What does a TODO comment indicate?", options: ["A completed task", "A future task that still needs to be done", "A deleted feature", "A test case"], correctIndex: 1 },
    { quizId: q8.id, question: "An HTML comment in the <head> section:", options: ["Causes an error", "Is displayed at the top of the page", "Is invisible like all other HTML comments", "Must be on one line only"], correctIndex: 2 },
    { quizId: q8.id, question: "Which of these is a BAD comment?", options: ["<!-- Added noopener for security on this external link -->", "<!-- TODO: Add mobile menu when design is approved -->", "<!-- <h1> heading tag below -->", "<!-- FOOTER — includes copyright and social links -->"], correctIndex: 2 },
    { quizId: q8.id, question: "If you use HTML comment syntax <!-- --> inside a .css file, what happens?", options: ["It works as a comment", "It is treated as CSS selector syntax", "It causes a CSS parse error or is ignored incorrectly", "Nothing — all comment syntax works everywhere"], correctIndex: 2 },
  ]);

  console.log("✅ HTML Complete Course seeded successfully!");
  console.log("   8 lesson-courses created");
  console.log("   8 detailed lessons (one per course)");
  console.log("   8 quizzes × 20 questions = 160 quiz questions");
  return { message: "HTML Complete Course seeded successfully — 8 lessons, 160 quiz questions" };
}
