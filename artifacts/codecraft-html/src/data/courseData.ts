export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface Exercise {
  title: string;
  description: string;
  hint: string;
}

export interface Topic {
  id: string;
  title: string;
  explanation: string;
  codeExample: string;
  exercises: Exercise[];
  quiz: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  topics: Topic[];
}

export const courseData: Lesson[] = [
  // ===========================
  // LESSON 1 – HTML Basics
  // ===========================
  {
    id: "lesson-1",
    title: "Lesson 1 – HTML Basics",
    topics: [
      {
        id: "topic-1-1",
        title: "Introduction to HTML",
        explanation: `HTML stands for HyperText Markup Language. Before we break that down, let's understand what "markup" actually means. Markup is the act of annotating text with tags — special labels that tell a browser how to interpret and display that content. When you write HTML, you are not programming logic or calculations; you are describing structure.

Think of HTML like the blueprint of a house. The blueprint shows where the walls go, where the windows are, and how many rooms there are. It does not define the paint color (that is CSS) or how the lights switch on automatically (that is JavaScript). HTML is purely structural — it tells the browser what content exists and in what order.

Every single webpage you have ever visited is built on top of HTML. It is the foundation layer of the entire web. Even highly interactive apps built with React or Angular still output HTML at the end of the day.

HTML is not a programming language. There are no variables, no loops, no conditional statements. It is a markup language — a set of rules for annotating text so that browsers can understand it. This makes HTML one of the most beginner-friendly starting points in web development.

When a browser receives an HTML file from a server, it reads it from top to bottom and builds what is called the Document Object Model (DOM) — a tree-like representation of your page. The browser then paints that tree onto the screen as a visual webpage.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta information lives here -->
    <meta charset="UTF-8" />
    <title>My First HTML Page</title>
  </head>
  <body>
    <!-- Visible content lives here -->
    <h1>Welcome to HTML</h1>
    <p>HTML is the building block of every webpage.</p>
    <p>It gives content structure and meaning.</p>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Edit the Heading",
            description: "Change the h1 text from 'Welcome to HTML' to your own name followed by 'learns HTML'. For example: 'Alex learns HTML'.",
            hint: "The h1 tag looks like this: <h1>text goes here</h1>. Replace the text between the opening and closing tags."
          },
          {
            title: "Exercise 2 – Add a Third Paragraph",
            description: "Add a third paragraph below the existing two. Write something you are excited to learn in HTML.",
            hint: "Use the <p> tag: <p>Your text here</p>. Place it after the last closing </p> but before </body>."
          },
          {
            title: "Exercise 3 – Change the Page Title",
            description: "Change the page title (the text inside the <title> tag in the <head>) to 'My HTML Journey'. Notice where this text appears in the browser.",
            hint: "The <title> tag is inside <head>. Its content shows in the browser tab, not on the page itself."
          }
        ],
        quiz: [
          { question: "What does HTML stand for?", options: ["HyperText Machine Language", "HyperText Markup Language", "Hyper Transfer Markup Language", "HighText Machine Language"], correctIndex: 1, explanation: "HTML stands for HyperText Markup Language. 'HyperText' refers to text with links, and 'Markup' refers to the tag-based annotation system." },
          { question: "Is HTML a programming language?", options: ["Yes, it has loops and variables", "Yes, it compiles to machine code", "No, it is a markup language", "No, it is a styling language"], correctIndex: 2, explanation: "HTML is a markup language, not a programming language. It has no logic, loops, or variables — it only describes the structure of content." },
          { question: "What is the main purpose of HTML?", options: ["To style web pages with colors", "To add interactivity with events", "To structure and organize content", "To connect databases to web pages"], correctIndex: 2, explanation: "HTML's main purpose is to structure and organize web content. CSS handles styling, and JavaScript handles interactivity." },
          { question: "What analogy best describes the role of HTML in web development?", options: ["The paint on the walls of a house", "The electrical wiring of a house", "The blueprint or skeleton of a house", "The furniture inside a house"], correctIndex: 2, explanation: "HTML is like the blueprint or skeleton — it defines structure and layout. CSS is the paint (styling), and JavaScript is the wiring (interactivity)." },
          { question: "What does a browser build from an HTML file?", options: ["A JavaScript object", "A CSS stylesheet", "A Document Object Model (DOM)", "A database table"], correctIndex: 2, explanation: "When a browser reads HTML, it builds the Document Object Model (DOM) — a tree-like structure representing all the elements on the page." },
          { question: "Which of the following is NOT a feature of HTML?", options: ["Defining headings", "Adding paragraphs", "Creating variables", "Inserting images"], correctIndex: 2, explanation: "HTML cannot create variables — that is a programming concept. HTML structures content using tags like headings, paragraphs, and images." },
          { question: "What layer of web development does HTML represent?", options: ["The styling layer", "The logic layer", "The database layer", "The structure layer"], correctIndex: 3, explanation: "HTML represents the structure layer of web development. CSS adds styling, and JavaScript adds behavior and logic." },
          { question: "What does 'HyperText' in HTML refer to?", options: ["Text displayed in large fonts", "Text that links to other documents or pages", "Text with special formatting", "Text that runs code when clicked"], correctIndex: 1, explanation: "HyperText refers to text that contains links (hyperlinks) to other documents. This linking capability is fundamental to how the web works." },
          { question: "Which tag marks the root of an HTML document?", options: ["<head>", "<body>", "<html>", "<root>"], correctIndex: 2, explanation: "The <html> tag is the root element of every HTML document. All other elements are nested inside it." },
          { question: "Where does the visible content of a webpage go?", options: ["Inside the <head> tag", "Inside the <html> tag", "Inside the <title> tag", "Inside the <body> tag"], correctIndex: 3, explanation: "Visible content — text, images, buttons — goes inside the <body> tag. The <head> contains metadata like the page title and stylesheets." },
          { question: "What type of file extension do HTML files use?", options: [".htm or .html", ".css or .style", ".js or .script", ".txt or .doc"], correctIndex: 0, explanation: "HTML files use the .html extension (and sometimes .htm, a shorter legacy version). Both work the same way in browsers." },
          { question: "What happens when a browser reads an HTML file from top to bottom?", options: ["It executes JavaScript logic", "It builds the Document Object Model (DOM)", "It applies CSS styles", "It sends data to a database"], correctIndex: 1, explanation: "Browsers parse HTML from top to bottom and construct the DOM, which is then rendered visually on the screen." },
          { question: "Which of these technologies adds interactivity to a webpage?", options: ["HTML", "CSS", "JavaScript", "HTTP"], correctIndex: 2, explanation: "JavaScript adds interactivity — click handlers, animations, dynamic content. HTML structures content, and CSS styles it." },
          { question: "Can a webpage exist with only HTML and no CSS or JavaScript?", options: ["No, CSS is always required", "No, JavaScript is always required", "Yes, but it will be unstyled and static", "Yes, and it will look the same as with CSS"], correctIndex: 2, explanation: "Yes! A plain HTML file is a valid webpage. It will look unstyled (browser defaults only) and have no interactivity, but it works." },
          { question: "What is the correct way to think of HTML tags?", options: ["Commands that run when clicked", "Labels that describe what content is", "Styles that change how text looks", "Functions that return values"], correctIndex: 1, explanation: "HTML tags are descriptive labels. <h1> means 'this is a top-level heading', <p> means 'this is a paragraph'. They describe content, not behavior." },
          { question: "Which came first historically?", options: ["CSS", "JavaScript", "HTML", "They were all invented at the same time"], correctIndex: 2, explanation: "HTML was invented by Tim Berners-Lee in 1991 and came first. CSS was introduced in 1996, and JavaScript in 1995 — but HTML laid the foundation." },
          { question: "What does a browser use HTML for?", options: ["Running server-side code", "Storing user data permanently", "Rendering a visual webpage for the user", "Encrypting data transfers"], correctIndex: 2, explanation: "A browser uses HTML to render the visual webpage that users see and interact with. The browser reads HTML and paints it on screen." },
          { question: "HTML is considered which type of language?", options: ["Compiled language", "Interpreted programming language", "Markup language", "Query language"], correctIndex: 2, explanation: "HTML is a markup language — it uses tags to annotate and describe content. Unlike programming languages, it has no execution flow or logic." },
          { question: "What does it mean that HTML has 'tags'?", options: ["Special keywords that execute server code", "Wrapped labels like <p> and </p> that describe content", "Shorthand notation for CSS rules", "Variables that store data in memory"], correctIndex: 1, explanation: "HTML tags are paired labels like <p>...</p> that wrap content and tell the browser what that content represents — a paragraph, heading, image, etc." },
          { question: "Which of the following is a valid reason to learn HTML first?", options: ["HTML is the hardest web technology so getting it done first helps", "HTML is purely logic-based which makes it easy for programmers", "HTML is the structural foundation of all web pages", "HTML generates server-side content automatically"], correctIndex: 2, explanation: "HTML is the foundation layer of the web. Before you can style with CSS or add logic with JavaScript, you need HTML to define the structure of your content." }
        ]
      },
      {
        id: "topic-1-2",
        title: "How the Web Works",
        explanation: `Every time you type a URL into your browser and press Enter, a complex sequence of events unfolds in milliseconds. Understanding this process helps you become a better web developer because you understand where your HTML files live, how they travel to users, and what happens before anyone sees your page.

First, your browser performs a DNS lookup. DNS stands for Domain Name System — it is essentially the internet's phone book. When you type "google.com", your browser asks a DNS server to translate that human-readable name into an IP address like 142.250.80.46. IP addresses are how computers actually find each other on the network.

Once the browser has the IP address, it sends an HTTP (or HTTPS) request to that server. HTTP stands for HyperText Transfer Protocol — it is the set of rules that govern how data travels between clients (browsers) and servers. HTTPS is the secure, encrypted version.

The server receives the request, processes it, and sends back an HTTP response containing your HTML file. The browser receives this response, reads the HTML from top to bottom, builds the DOM, downloads any referenced CSS and JavaScript files, and then renders the page visually.

This entire round trip — from your keyboard press to the rendered page — typically happens in under one second. Understanding this flow explains why file paths matter, why slow servers create slow websites, and why caching exists.`,
        codeExample: `<!-- This page demonstrates a simple web page that a server would send back -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About the Web</title>
  </head>
  <body>
    <h1>How Your Browser Gets This Page</h1>
    <ol>
      <li>You type a URL into the address bar</li>
      <li>DNS translates the domain to an IP address</li>
      <li>Your browser sends an HTTP request to the server</li>
      <li>The server sends back this HTML file</li>
      <li>Your browser renders it — and here you are!</li>
    </ol>
    <p>The client is your browser. The server is a computer somewhere in the world storing this file.</p>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Add a Step to the List",
            description: "The ordered list shows the web request cycle. Add one more step at the end: 'The browser downloads CSS and JS files referenced in the HTML'.",
            hint: "Add a new <li> element at the end of the <ol> list, just before the closing </ol> tag."
          },
          {
            title: "Exercise 2 – Explain HTTPS",
            description: "Add a new paragraph below the existing paragraph that explains in one sentence what HTTPS means and how it differs from HTTP.",
            hint: "Use a <p> tag. HTTPS is the encrypted, secure version of HTTP."
          },
          {
            title: "Exercise 3 – Create a Client vs Server Comparison",
            description: "Add two paragraphs: one explaining what a 'client' is in web terms, and one explaining what a 'server' is. Use clear, simple language.",
            hint: "A client is typically the user's browser. A server is a computer that stores and sends files when requested."
          }
        ],
        quiz: [
          { question: "What does DNS stand for?", options: ["Domain Node System", "Domain Name System", "Data Network Service", "Dynamic Naming Sequence"], correctIndex: 1, explanation: "DNS stands for Domain Name System. It translates human-readable domain names like 'google.com' into numeric IP addresses that computers use to communicate." },
          { question: "What is the role of DNS when you visit a website?", options: ["It encrypts your connection", "It translates domain names to IP addresses", "It stores your HTML files", "It speeds up your internet connection"], correctIndex: 1, explanation: "DNS acts like the internet's phone book, converting a domain name (e.g., 'example.com') into an IP address (e.g., '93.184.216.34') so your browser can find the right server." },
          { question: "What does HTTP stand for?", options: ["High Transfer Text Protocol", "HyperText Transfer Protocol", "Hyper Text Transmission Process", "HyperText Trusted Pathway"], correctIndex: 1, explanation: "HTTP stands for HyperText Transfer Protocol — the set of rules that govern data exchange between browsers (clients) and web servers." },
          { question: "What is the difference between HTTP and HTTPS?", options: ["HTTPS is faster but less compatible", "HTTPS is the secure, encrypted version of HTTP", "HTTP is more modern than HTTPS", "There is no practical difference"], correctIndex: 1, explanation: "HTTPS (HyperText Transfer Protocol Secure) encrypts data transmitted between the client and server using SSL/TLS. This protects sensitive data from being intercepted." },
          { question: "In web terminology, what is a 'client'?", options: ["A paying customer of a website", "The server that stores website files", "The browser or device requesting a webpage", "A type of database"], correctIndex: 2, explanation: "In web development, the 'client' refers to the user's browser or device that requests and displays web pages. The server responds to client requests." },
          { question: "What is a web server?", options: ["A special kind of browser", "A computer that stores and serves files over the internet", "A type of programming language", "An internet service provider"], correctIndex: 1, explanation: "A web server is a computer (often running software like Apache or Nginx) that stores files and responds to HTTP requests by sending those files back to clients." },
          { question: "What does an IP address look like?", options: ["A domain name like 'example.com'", "A string of numbers like 192.168.0.1", "A file path like /home/user/file", "A port number like :3000"], correctIndex: 1, explanation: "An IP address is a numerical identifier for a device on a network, such as 192.168.0.1 (IPv4) or longer addresses in IPv6 format." },
          { question: "What is the correct order of steps when you visit a URL?", options: ["Server sends HTML → DNS lookup → Browser renders", "DNS lookup → HTTP request → Server sends HTML → Browser renders", "Browser renders → DNS lookup → HTTP request", "HTTP request → Browser renders → DNS lookup"], correctIndex: 1, explanation: "The correct order is: DNS lookup (find the IP) → HTTP request (ask the server) → Server sends HTML → Browser renders the page." },
          { question: "What type of data does an HTTP response typically contain when you request a webpage?", options: ["Binary machine code", "A compiled program", "An HTML file (and references to CSS/JS)", "A database record"], correctIndex: 2, explanation: "When you request a webpage, the server's HTTP response contains an HTML file. The browser then parses that HTML and downloads referenced CSS, JavaScript, and image files." },
          { question: "Why does HTTPS matter for websites that handle user data?", options: ["It makes pages load faster", "It prevents the page from crashing", "It encrypts data so it cannot be intercepted by third parties", "It automatically saves user passwords"], correctIndex: 2, explanation: "HTTPS encrypts the connection between client and server, protecting sensitive data like passwords, credit card numbers, and personal information from being intercepted." },
          { question: "What does the browser do with the HTML file it receives from the server?", options: ["Sends it to another server for processing", "Executes it as a program", "Parses it and renders it visually on screen", "Stores it permanently in a database"], correctIndex: 2, explanation: "The browser parses the HTML file, builds the DOM tree, downloads referenced assets (CSS, JS, images), and renders everything visually on screen." },
          { question: "What is 'rendering' in the context of web browsers?", options: ["Compressing files for faster transfer", "Converting HTML/CSS into a visual display on screen", "Encrypting data before transmission", "Caching files for future requests"], correctIndex: 1, explanation: "Rendering is the process of taking HTML and CSS code and painting it visually on the user's screen — converting code into what you actually see in the browser window." },
          { question: "Which port does HTTP typically use?", options: ["Port 22", "Port 443", "Port 80", "Port 3000"], correctIndex: 2, explanation: "HTTP typically communicates over port 80. HTTPS uses port 443. These are standard defaults — you usually don't see them in URLs because browsers assume them automatically." },
          { question: "What does 'URL' stand for?", options: ["Universal Request Line", "Uniform Resource Locator", "User Request Language", "Universal Rendering Location"], correctIndex: 1, explanation: "URL stands for Uniform Resource Locator — essentially the address of a resource (webpage, image, file) on the internet." },
          { question: "What is 'caching' in web development?", options: ["Deleting old files from the server", "Storing copies of files locally to avoid re-downloading them", "Encrypting sensitive data in transit", "Running code on the server before sending it"], correctIndex: 1, explanation: "Caching stores copies of files (HTML, CSS, images) locally in the browser or on intermediate servers. This speeds up repeat visits by avoiding unnecessary downloads." },
          { question: "Which part of a URL specifies the protocol being used?", options: ["The path (e.g., /about)", "The domain (e.g., google.com)", "The scheme (e.g., https://)", "The query string (e.g., ?id=1)"], correctIndex: 2, explanation: "The scheme/protocol part of a URL appears before '://' — for example, 'https://' tells the browser to use HTTPS, 'ftp://' for file transfer, etc." },
          { question: "When a server cannot find the requested file, what HTTP status code does it return?", options: ["200 (OK)", "301 (Moved)", "404 (Not Found)", "500 (Server Error)"], correctIndex: 2, explanation: "HTTP 404 means 'Not Found' — the server received the request but could not find the requested resource. You have likely seen '404 pages' on websites." },
          { question: "What initiates the web request cycle?", options: ["The server pinging the client", "The browser automatically checking for updates", "The user entering a URL and pressing Enter", "A DNS server sending a file push"], correctIndex: 2, explanation: "The cycle begins when the user (client) types a URL and presses Enter. The browser then initiates the DNS lookup and HTTP request sequence." },
          { question: "What is the purpose of the viewport meta tag seen in HTML?", options: ["It sets the page's background color", "It controls how the page scales on mobile devices", "It specifies the server's IP address", "It defines the page's main heading"], correctIndex: 1, explanation: "The viewport meta tag (<meta name='viewport' content='width=device-width, initial-scale=1.0'>) controls how a page is sized and scaled on mobile screens." },
          { question: "What technology handles secure key exchange in HTTPS connections?", options: ["DNS", "DOM", "SSL/TLS", "HTTP/2"], correctIndex: 2, explanation: "SSL (Secure Sockets Layer) and its successor TLS (Transport Layer Security) handle the encryption and key exchange that makes HTTPS connections secure." }
        ]
      },
      {
        id: "topic-1-3",
        title: "HTML Document Structure",
        explanation: `Every valid HTML document follows a specific structure. Think of it as the grammar of HTML — just like every English sentence needs a subject and verb, every HTML file needs certain parts in the right places.

The very first line of any HTML file should be the DOCTYPE declaration: <!DOCTYPE html>. This tells the browser that the document is written in HTML5 (the modern standard). Without it, browsers may fall back to "quirks mode" — an older compatibility mode that renders pages differently.

Next comes the <html> element — the root container that wraps everything else. Inside it are exactly two children: <head> and <body>. These are the two fundamental sections of every HTML document.

The <head> element is invisible to the user. It holds metadata — information about the page rather than content for the page. Common head elements include: the <title> tag (sets the browser tab name), <meta charset="UTF-8"> (ensures text displays correctly in all languages), <meta name="viewport"> (controls mobile rendering), and links to CSS stylesheets.

The <body> element is where all visible content lives. Everything the user actually sees — headings, text, images, buttons, forms — goes inside <body>.

Understanding this structure is critical because misplacing elements (like putting a paragraph in the head) will cause browsers to behave unpredictably. Always keep structure clean and intentional.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">

  <head>
    <!-- Metadata: not visible to users -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="A page about HTML structure" />
    <title>HTML Document Structure</title>
    <!-- You would link CSS stylesheets here too -->
  </head>

  <body>
    <!-- Everything here is visible to the user -->
    <h1>This is the Main Heading</h1>
    <p>This is a paragraph in the body section.</p>
    <p>The body is where all your visible content lives.</p>
  </body>

</html>`,
        exercises: [
          {
            title: "Exercise 1 – Add a Description Meta Tag",
            description: "Add a meta tag for the page description that says 'Learning about HTML document structure'. This helps search engines understand your page.",
            hint: "Use: <meta name='description' content='Your description here' /> inside the <head> section."
          },
          {
            title: "Exercise 2 – Add More Body Content",
            description: "Add a second heading (h2) that says 'Why Structure Matters' and write a paragraph below it explaining that proper HTML structure helps browsers and screen readers understand your content.",
            hint: "h2 tags work just like h1 but are for secondary headings. Place them inside <body>."
          },
          {
            title: "Exercise 3 – Fix the Broken Structure",
            description: "Create a new HTML document but intentionally put a <p> tag inside the <head>. Then fix it by moving it to the correct location in <body>. Notice how browsers handle misplaced elements.",
            hint: "The <head> should only contain metadata. User-visible content like paragraphs belongs in <body>."
          }
        ],
        quiz: [
          { question: "What is the purpose of the <!DOCTYPE html> declaration?", options: ["It creates the page's main heading", "It tells the browser to render the page in HTML5 mode", "It imports CSS stylesheets", "It defines the page's language"], correctIndex: 1, explanation: "<!DOCTYPE html> tells the browser this document uses HTML5. Without it, browsers may enter 'quirks mode', causing inconsistent rendering across browsers." },
          { question: "Which element is the root of every HTML document?", options: ["<head>", "<body>", "<html>", "<document>"], correctIndex: 2, explanation: "The <html> element is the root — it wraps everything. The <head> and <body> are its two direct children." },
          { question: "What goes inside the <head> element?", options: ["Visible content like paragraphs and images", "JavaScript logic and loops", "Metadata like the title, charset, and stylesheets", "Navigation links and buttons"], correctIndex: 2, explanation: "The <head> contains metadata — information about the document, not for display. This includes the <title>, charset declarations, viewport settings, and CSS links." },
          { question: "What goes inside the <body> element?", options: ["Metadata and page titles", "CSS stylesheets and fonts", "All visible page content (text, images, links)", "Server-side scripts only"], correctIndex: 2, explanation: "The <body> contains everything the user sees — headings, paragraphs, images, buttons, forms, etc. Metadata belongs in <head>, not <body>." },
          { question: "What does the charset meta tag <meta charset='UTF-8'> do?", options: ["Sets the page's default font size", "Controls how fast the page loads", "Ensures the browser correctly displays characters from all languages", "Links the HTML file to a CSS file"], correctIndex: 2, explanation: "UTF-8 is a character encoding that supports nearly every character from every language. Setting it prevents garbled text (mojibake) for special characters." },
          { question: "What does the <title> tag control?", options: ["The main heading visible on the page", "The text shown in the browser's tab or window title bar", "The page's background color", "The size of the body content"], correctIndex: 1, explanation: "The <title> tag content appears in the browser tab, bookmarks, and search engine results. It is NOT displayed on the page itself." },
          { question: "Where should the viewport meta tag be placed?", options: ["In the <body> tag", "In the <html> tag", "Inside the <head> tag", "After the closing </html> tag"], correctIndex: 2, explanation: "Meta tags, including the viewport meta tag, belong inside <head>. They provide metadata and configuration information about the document." },
          { question: "What is 'quirks mode' in browsers?", options: ["A mode that makes pages load faster", "A compatibility mode browsers use when DOCTYPE is missing, causing inconsistent rendering", "A debugging feature for developers", "A way browsers display pages with errors"], correctIndex: 1, explanation: "Quirks mode is a compatibility mode browsers enter when the DOCTYPE is missing. It tries to imitate old browsers and can cause inconsistent, unpredictable page rendering." },
          { question: "How many direct children does the <html> element have in a proper document?", options: ["One (body only)", "Three (head, body, and title)", "Two (head and body)", "Four (head, body, header, footer)"], correctIndex: 2, explanation: "A proper HTML document has exactly two direct children of <html>: <head> (for metadata) and <body> (for content)." },
          { question: "What does lang='en' on the <html> tag do?", options: ["Sets the page text direction to left-to-right", "Declares that the page content is written in English", "Makes the page translate automatically", "Links to an English dictionary API"], correctIndex: 1, explanation: "The lang attribute declares the primary language of the page (e.g., 'en' for English, 'fr' for French). This helps screen readers pronounce text correctly and assists search engines." },
          { question: "Can you place a <p> tag inside <head>?", options: ["Yes, and it will display at the top of the page", "Yes, but only if it is the first element", "No, <head> is only for metadata", "No, p tags are not allowed in any document"], correctIndex: 2, explanation: "The <head> section is strictly for metadata — not visible content. Placing a <p> tag there is invalid HTML. Browsers may move it to <body> automatically, but this is unpredictable." },
          { question: "What is the correct order of elements in a well-structured HTML file?", options: ["<body> then <head> then <html>", "<!DOCTYPE html> then <html> then <head> then <body>", "<html> then <!DOCTYPE html> then <head>", "Just <body> with nested <head> inside it"], correctIndex: 1, explanation: "The correct order is: <!DOCTYPE html> first (at the very top), then <html>, then <head>, then <body>. This structure is required for valid HTML5 documents." },
          { question: "Which meta tag helps your page look correct on mobile phones?", options: ["<meta name='mobile' content='true'>", "<meta name='screen' content='mobile'>", "<meta name='viewport' content='width=device-width, initial-scale=1.0'>", "<meta charset='mobile-UTF8'>"], correctIndex: 2, explanation: "The viewport meta tag tells the browser to use the device's actual width for rendering and set initial zoom to 1.0 — essential for responsive mobile pages." },
          { question: "What happens if you omit the <!DOCTYPE html> declaration?", options: ["The page will not load at all", "Browsers may enter quirks mode and render inconsistently", "The page will automatically use XHTML instead", "Nothing changes — it is purely optional"], correctIndex: 1, explanation: "Omitting DOCTYPE can cause browsers to enter quirks mode — an old compatibility mode that may render your page differently in each browser, causing layout bugs." },
          { question: "What does <meta name='description' content='...'> do?", options: ["Sets the page's main visible headline", "Provides a page summary for search engine results", "Controls the page's font size", "Adds a copyright notice to the footer"], correctIndex: 1, explanation: "The description meta tag provides a summary of the page's content. Search engines like Google often display this text under the page title in search results." },
          { question: "Can a valid HTML document exist without a <head> section?", options: ["Yes, it will still work in most browsers", "No, the <head> section is strictly required", "Only if the page has no CSS", "Only if the page has no JavaScript"], correctIndex: 0, explanation: "Technically browsers will still render a page without an explicit <head> tag, but it is strongly recommended. Without it, browsers assume an implicit empty head section." },
          { question: "What does a well-structured HTML document help with?", options: ["Running faster JavaScript", "Making CSS load before HTML", "Accessibility, SEO, and consistent browser rendering", "Reducing server response times"], correctIndex: 2, explanation: "Proper HTML structure aids accessibility (screen readers understand the content), SEO (search engines index it better), and ensures consistent rendering across all browsers." },
          { question: "What would happen if you placed your CSS <link> tag inside <body> instead of <head>?", options: ["The CSS would not be applied at all", "Browsers would ignore the link tag", "The page may show unstyled content briefly before styles load", "CSS would apply immediately with no issues"], correctIndex: 2, explanation: "Placing CSS links in <body> can cause FOUC (Flash of Unstyled Content) — the user briefly sees plain HTML before styles kick in. Always put CSS links in <head>." },
          { question: "What is the purpose of the <html lang='en'> attribute specifically for screen readers?", options: ["It translates the page into different languages automatically", "It helps screen readers pronounce and read the text correctly for the specified language", "It sets the text direction only", "It changes the character encoding for screen readers"], correctIndex: 1, explanation: "Screen readers use the lang attribute to know which language rules and pronunciations to apply when reading the page aloud for visually impaired users." },
          { question: "In HTML5, is it valid to write <!DOCTYPE HTML> with uppercase HTML?", options: ["No, it must be lowercase html", "Yes, the DOCTYPE declaration is case-insensitive", "Only on specific operating systems", "Only if combined with an XML declaration"], correctIndex: 1, explanation: "The DOCTYPE declaration is case-insensitive in HTML5. <!DOCTYPE html>, <!DOCTYPE HTML>, and <!DocType Html> are all valid. Lowercase is the modern convention." }
        ]
      },
      {
        id: "topic-1-4",
        title: "Installing VS Code",
        explanation: `Before you can write HTML files that live on your computer (rather than in an online editor), you need a code editor. While you could technically use Notepad or TextEdit, professional developers use dedicated code editors because they make writing code dramatically easier and less error-prone.

Visual Studio Code (commonly called VS Code) is the most popular code editor in the world, free to download, and made by Microsoft. It works on Windows, Mac, and Linux. Here is why developers love it: syntax highlighting (different parts of your code show in different colors, making it easy to read), autocomplete (it suggests tag names as you type), error detection (it underlines problems in your code), and an enormous library of extensions.

To install VS Code, visit code.visualstudio.com and click the download button for your operating system. Run the installer and follow the prompts. The process takes about two minutes.

Once installed, the two most important extensions to install immediately are Live Server and Prettier. Live Server (by Ritwick Dey) launches a local web server and automatically refreshes your browser whenever you save your HTML file — so you see changes instantly without manually refreshing. Prettier (by Prettier) automatically formats your code on save, keeping it clean and consistent.

To install extensions, click the Extensions icon in the left sidebar (it looks like four squares), search for the extension name, and click Install.`,
        codeExample: `<!-- After installing VS Code and Live Server, you can write this file -->
<!-- Save it as index.html, then right-click the file and choose "Open with Live Server" -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My VS Code Project</title>
  </head>
  <body>
    <h1>VS Code is amazing!</h1>
    <p>I installed VS Code and the Live Server extension.</p>
    <p>Now my browser updates every time I save this file.</p>
    <p>Try editing this text and pressing Ctrl+S (or Cmd+S on Mac).</p>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Update the VS Code Page",
            description: "Change the h1 to say 'My Development Setup' and update the paragraphs to describe what you installed and why you chose it.",
            hint: "Edit the text content between the opening and closing tags. Keep the tags themselves — just change what is inside them."
          },
          {
            title: "Exercise 2 – Add an Extension List",
            description: "Add an unordered list (<ul>) below the paragraphs that lists at least 3 VS Code extensions useful for HTML development. Include Live Server and Prettier plus one more of your choice.",
            hint: "An unordered list looks like: <ul><li>Item 1</li><li>Item 2</li></ul>"
          },
          {
            title: "Exercise 3 – Write Setup Instructions",
            description: "Create a small instructional page using an ordered list (<ol>) with numbered steps for installing VS Code. Make the title 'How to Set Up Your HTML Environment'.",
            hint: "Use <ol> for ordered (numbered) lists. Each step goes in its own <li> tag."
          }
        ],
        quiz: [
          { question: "What is VS Code?", options: ["A programming language for web development", "A browser made by Microsoft", "A free code editor made by Microsoft", "A command-line interface tool"], correctIndex: 2, explanation: "VS Code (Visual Studio Code) is a free, open-source code editor created by Microsoft. It is widely used for web development and supports dozens of programming languages." },
          { question: "Where do you download VS Code?", options: ["github.com/microsoft/vscode", "code.visualstudio.com", "microsoft.com/downloads/vscode", "visualstudio.com/community"], correctIndex: 1, explanation: "VS Code is downloaded from code.visualstudio.com. The site automatically detects your operating system and offers the right installer." },
          { question: "What does the Live Server extension do?", options: ["Uploads your files to the internet automatically", "Refreshes your browser automatically when you save an HTML file", "Provides free web hosting for your projects", "Converts HTML to CSS automatically"], correctIndex: 1, explanation: "Live Server launches a local development server and watches your files. When you save any changes to your HTML or CSS, it automatically refreshes the browser so you see updates instantly." },
          { question: "What does syntax highlighting do in a code editor?", options: ["Runs your code in the browser", "Colors different parts of your code to make it more readable", "Checks your code for security vulnerabilities", "Converts your HTML to a PDF"], correctIndex: 1, explanation: "Syntax highlighting colors different parts of your code — tags in one color, attributes in another, values in another. This dramatically improves readability and helps spot mistakes." },
          { question: "What is Prettier used for in VS Code?", options: ["Running code in the terminal", "Automatically formatting your code to keep it clean and consistent", "Downloading packages from npm", "Compiling TypeScript to JavaScript"], correctIndex: 1, explanation: "Prettier is a code formatter — it automatically re-formats your code on save to follow consistent spacing, indentation, and style conventions." },
          { question: "On which operating systems does VS Code work?", options: ["Windows only", "Mac and Linux only", "Windows, Mac, and Linux", "Windows and Mac only"], correctIndex: 2, explanation: "VS Code is cross-platform and works on Windows, macOS, and Linux. This is one reason it is so widely adopted across the developer community." },
          { question: "How do you install extensions in VS Code?", options: ["Download them from Microsoft's website manually", "Type a command in the terminal", "Click the Extensions icon in the sidebar and search for the extension", "Edit the settings.json file directly"], correctIndex: 2, explanation: "In VS Code, click the Extensions icon (four squares) in the left sidebar, search for an extension by name, and click Install. It is quick and built directly into the editor." },
          { question: "What keyboard shortcut saves a file in VS Code on Windows?", options: ["Ctrl+X", "Ctrl+P", "Ctrl+S", "Alt+S"], correctIndex: 2, explanation: "Ctrl+S saves the current file in VS Code on Windows (Cmd+S on Mac). With Live Server, saving also triggers an automatic browser refresh." },
          { question: "What advantage does code autocomplete provide?", options: ["It writes entire programs automatically", "It suggests tag names, attributes, and values as you type, reducing errors", "It translates code between languages", "It tests your code for bugs automatically"], correctIndex: 1, explanation: "Autocomplete (also called IntelliSense in VS Code) suggests completions as you type — so you can type '<p' and press Tab to get '<p></p>'. This speeds up coding and reduces typos." },
          { question: "What is a 'local development server' like Live Server?", options: ["A server hosted on the internet for public access", "A server running on your own computer for development purposes", "A server that manages your database", "A server that tracks your code changes in Git"], correctIndex: 1, explanation: "A local development server runs on your own machine and serves your files through a local URL like http://127.0.0.1:5500. It simulates a real web server without going online." },
          { question: "Why is it better to use VS Code than Notepad for HTML development?", options: ["Notepad cannot save .html files", "VS Code provides syntax highlighting, autocomplete, error detection, and extensions", "VS Code compiles HTML faster than Notepad", "Notepad does not support the UTF-8 encoding"], correctIndex: 1, explanation: "VS Code is purpose-built for coding with features Notepad lacks: syntax highlighting, autocomplete, extension support, integrated terminal, Git integration, and much more." },
          { question: "What does it mean when VS Code underlines part of your code in red?", options: ["That section of code is excellent and highlighted for reference", "VS Code detected a potential error or problem in that code", "The code will execute faster than the rest", "It means that line has a comment"], correctIndex: 1, explanation: "Red underlines in VS Code indicate errors or problems detected by the editor — syntax errors, unknown attributes, or type mismatches. These help you catch bugs before testing in a browser." },
          { question: "What is the shortcut to open the Extensions panel in VS Code?", options: ["Ctrl+Shift+P", "Ctrl+Shift+X", "Ctrl+Shift+E", "Ctrl+B"], correctIndex: 1, explanation: "Ctrl+Shift+X (Cmd+Shift+X on Mac) opens the Extensions panel in VS Code. You can also click the four-square icon in the left sidebar." },
          { question: "What is the keyboard shortcut for Prettier to format your document in VS Code?", options: ["Ctrl+F", "Ctrl+Shift+I (or Alt+Shift+F on Windows)", "Ctrl+D", "F5"], correctIndex: 1, explanation: "Shift+Alt+F (Windows) or Shift+Option+F (Mac) formats the current document using Prettier. You can also configure Prettier to format automatically on every save." },
          { question: "What file extension should you use when saving HTML files?", options: [".txt", ".webpage", ".html or .htm", ".htext"], correctIndex: 2, explanation: "HTML files should be saved with the .html extension (or .htm, which is legacy). The .html extension tells both your operating system and VS Code how to handle the file." },
          { question: "What is the recommended name for your project's main HTML file?", options: ["main.html", "page.html", "index.html", "home.html"], correctIndex: 2, explanation: "By convention, the main/home page of a website is named index.html. Web servers automatically serve index.html when a directory is requested without specifying a filename." },
          { question: "Can you use an online editor like CodePen instead of VS Code?", options: ["No, online editors do not support HTML", "Yes, online editors work great for learning and quick experiments", "Yes, but only for CSS, not HTML", "No, online editors are only for JavaScript"], correctIndex: 1, explanation: "Online editors like CodePen and JSFiddle are excellent for learning and experimenting. For building real projects with multiple files, VS Code is more appropriate." },
          { question: "What does the integrated terminal in VS Code allow you to do?", options: ["Edit HTML files with a visual drag-and-drop editor", "Run command-line instructions without leaving VS Code", "Preview your webpage in a built-in browser", "Upload files to a web server"], correctIndex: 1, explanation: "VS Code's integrated terminal lets you run shell commands (like npm install, git commands, etc.) without switching to a separate terminal application — everything in one window." },
          { question: "What does the 'Format on Save' setting in VS Code do?", options: ["Saves a backup copy before saving the main file", "Automatically formats your code with Prettier every time you save", "Converts your HTML to CSS on save", "Uploads the file to GitHub on save"], correctIndex: 1, explanation: "Enabling 'Format on Save' in VS Code settings means your code formatter (like Prettier) runs automatically every time you press Ctrl+S, keeping your code consistently formatted." },
          { question: "What is the purpose of using an extension like HTML Snippets in VS Code?", options: ["To create database connections from HTML", "To add quick shortcut snippets for common HTML code patterns", "To run HTML in the terminal", "To debug JavaScript inside HTML files"], correctIndex: 1, explanation: "HTML Snippets extensions provide shortcut keys for common HTML patterns. For example, typing 'link' and pressing Tab might expand to a full <link> tag with all its common attributes." }
        ]
      },
      {
        id: "topic-1-5",
        title: "HTML Editors",
        explanation: `An HTML editor is any tool used to write and edit HTML code. Editors range from completely basic text editors to sophisticated IDEs (Integrated Development Environments) with real-time preview capabilities.

Understanding your options helps you pick the right tool for each situation. There is no single "best" editor — it depends on what you are doing.

VS Code is the most popular choice today. It is free, extensible, and has an enormous community. For beginners and professionals alike, it strikes the perfect balance between simplicity and power.

Sublime Text is fast and elegant, famous for its "multiple cursors" feature that lets you edit many lines at once. It is not fully free (it has a purchase prompt but no enforced limit), and it has fewer built-in features than VS Code.

Notepad++ is a Windows-only editor. It is lightweight, fast, and a step up from plain Notepad. Many developers start here before discovering VS Code.

Online editors are browser-based tools — no installation required. CodePen is perfect for HTML/CSS/JavaScript experiments and sharing your work. JSFiddle is similar, great for quick testing. Replit lets you build full projects in the browser. These are excellent for learning and sharing demos, but less practical for large multi-file projects.

The recommendation for beginners: start with an online editor to experiment, then move to VS Code for real projects. You will not need to switch again — VS Code grows with you.`,
        codeExample: `<!-- Different editors will display this the same way -->
<!-- The editor you use is about YOUR experience, not the output -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Choosing an HTML Editor</title>
  </head>
  <body>
    <h1>HTML Editor Comparison</h1>

    <h2>VS Code</h2>
    <p>Free, powerful, and extensible. Best choice for most developers.</p>

    <h2>Sublime Text</h2>
    <p>Fast and elegant with great multi-cursor support.</p>

    <h2>Online Editors (CodePen, JSFiddle)</h2>
    <p>No installation needed. Perfect for learning and sharing experiments.</p>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Add More Editors",
            description: "The page lists three editors. Add two more sections: one for Notepad++ and one for Replit. Write a short description for each.",
            hint: "Follow the same pattern: use <h2> for the editor name and <p> for the description."
          },
          {
            title: "Exercise 2 – Add a Recommendation",
            description: "At the end of the page, add a section with an h2 heading called 'Our Recommendation' and write 2 sentences explaining which editor a beginner should start with and why.",
            hint: "Use <h2> for the heading and <p> for the paragraph below it. Be specific about why VS Code or an online editor might be best for a beginner."
          },
          {
            title: "Exercise 3 – Build a Feature Table",
            description: "Create an HTML table that compares three editors across three features: Free, Windows Support, Mac Support. Use Yes/No values in the cells.",
            hint: "Use <table>, <tr>, <th> (for headers), and <td> (for data cells). You will learn more about tables in Lesson 4."
          }
        ],
        quiz: [
          { question: "What is an HTML editor?", options: ["A browser plugin that styles HTML automatically", "A tool used to write and edit HTML code", "A server that hosts HTML files", "A program that converts HTML to PDF"], correctIndex: 1, explanation: "An HTML editor is any software used to write and edit HTML code. Editors range from simple text editors to full IDEs with debugging and preview capabilities." },
          { question: "Which editor is currently the most popular in the web development community?", options: ["Notepad++", "Sublime Text", "Atom", "VS Code"], correctIndex: 3, explanation: "VS Code (Visual Studio Code) is currently the most widely used code editor globally, according to multiple developer surveys including Stack Overflow's annual survey." },
          { question: "What makes CodePen useful for beginners?", options: ["It compiles HTML to JavaScript automatically", "It hosts your site for free on a real domain", "It is a browser-based editor with instant preview — no installation needed", "It replaces VS Code for professional work"], correctIndex: 2, explanation: "CodePen runs entirely in the browser, so beginners can experiment with HTML, CSS, and JavaScript instantly without installing anything. Results are visible in real-time." },
          { question: "What does Sublime Text's 'multiple cursors' feature do?", options: ["Opens multiple browser tabs at once", "Allows you to edit multiple places in a file simultaneously with one keyboard", "Creates multiple versions of the same file", "Runs multiple code files at the same time"], correctIndex: 1, explanation: "Sublime Text's multiple cursors feature lets you place several cursors in a document at once, allowing you to type or edit in many places simultaneously — a powerful productivity feature." },
          { question: "What operating system is Notepad++ designed for?", options: ["macOS only", "Linux only", "Windows only", "All operating systems"], correctIndex: 2, explanation: "Notepad++ is a Windows-only text editor. It is free, fast, and better than the built-in Notepad, but lacks the cross-platform support and features of VS Code." },
          { question: "What is an IDE?", options: ["An internet database interface", "An Integrated Development Environment — a complete coding tool with editor, debugger, and terminal", "A type of HTML tag", "An image delivery extension"], correctIndex: 1, explanation: "IDE stands for Integrated Development Environment. It combines a code editor, debugger, terminal, and other tools in one application. VS Code is considered a lightweight IDE." },
          { question: "For a large project with 20+ files, which type of editor is more practical?", options: ["An online editor like CodePen", "A local editor like VS Code", "A word processor like Microsoft Word", "The browser's built-in developer tools"], correctIndex: 1, explanation: "Large multi-file projects need a local editor like VS Code. Online editors like CodePen are designed for single-file experiments and do not handle complex project structures well." },
          { question: "Which online platform allows you to build full projects in the browser without installing anything?", options: ["GitHub Pages", "Replit", "Heroku", "Netlify"], correctIndex: 1, explanation: "Replit is a browser-based IDE that lets you build full projects with multiple files, install packages, and even run server code — all without installing anything locally." },
          { question: "What feature does VS Code have that makes finding errors easier?", options: ["It tests your HTML in 10 different browsers", "It underlines code problems and highlights errors in real-time", "It rewrites your code to fix errors automatically", "It runs your HTML through an HTML validator API"], correctIndex: 1, explanation: "VS Code uses linting and language servers to detect errors in real-time, underlinig problems as you type. This helps catch mistakes before running or testing the code." },
          { question: "What is JSFiddle mainly used for?", options: ["Managing Git repositories online", "Full-stack project development in the browser", "Quick HTML/CSS/JavaScript experiments and sharing", "Compiling JavaScript to native apps"], correctIndex: 2, explanation: "JSFiddle is a lightweight online editor for experimenting with and sharing HTML, CSS, and JavaScript snippets. It is popular for demonstrating code examples in tutorials and forums." },
          { question: "Does the choice of HTML editor affect how your webpage looks in the browser?", options: ["Yes, different editors produce different HTML outputs", "Yes, editors with built-in CSS frameworks change the page appearance", "No, the editor is only your writing tool — the output HTML is what matters", "Only if you use online editors"], correctIndex: 2, explanation: "The editor you use has no effect on how the final HTML renders in a browser. Editors are just tools for writing code. The HTML you produce is the same regardless of which editor you use." },
          { question: "What is the main advantage of using an online editor for learning HTML?", options: ["Online editors are faster than local editors", "You can see your output instantly without installing any software", "Online editors have better autocomplete than VS Code", "They automatically host your project online"], correctIndex: 1, explanation: "Online editors let you start coding immediately — no downloads, no setup. For learning, this lowers the barrier to entry significantly. You can focus on HTML concepts rather than tool setup." },
          { question: "What does Prettier (a VS Code extension) specifically improve?", options: ["Page load speed", "Code readability and consistency by auto-formatting on save", "Browser compatibility of your HTML", "Security of your web application"], correctIndex: 1, explanation: "Prettier is a code formatter — it enforces consistent style (indentation, quote style, line breaks) automatically. This makes your code more readable and reduces style debates in teams." },
          { question: "Which of the following is NOT a code editor?", options: ["VS Code", "Sublime Text", "Notepad++", "Google Chrome"], correctIndex: 3, explanation: "Google Chrome is a web browser, not a code editor. While Chrome has developer tools built in, it is used for running and inspecting web pages, not for writing HTML code." },
          { question: "Why might a developer use Atom editor?", options: ["Atom is the only editor that supports JavaScript", "Atom is cross-platform, open-source, and highly customizable", "Atom has the best performance of all editors", "Atom was created by Microsoft for enterprise use"], correctIndex: 1, explanation: "Atom (created by GitHub) is a cross-platform, open-source editor known for its flexibility and customization through packages. Note: GitHub archived Atom in 2022; VS Code is its practical successor." },
          { question: "What does 'open source' mean when describing VS Code or Atom?", options: ["The software is stored in an open file system", "The source code is publicly available and anyone can contribute or inspect it", "The software is only for open web standards", "The editor opens all file formats automatically"], correctIndex: 1, explanation: "Open source means the source code is publicly available. Anyone can view, modify, or contribute to the codebase. VS Code is open source on GitHub, which helps it improve rapidly with community contributions." },
          { question: "What should a complete beginner use when starting to learn HTML?", options: ["A complex IDE with a debugger and profiler", "A browser-based editor like CodePen or Replit to avoid setup friction", "Only VS Code with 20+ extensions installed first", "A command-line text editor like Vim or Emacs"], correctIndex: 1, explanation: "Beginners should minimize setup friction. Browser-based editors like CodePen or Replit let you start coding HTML immediately — no installation, no configuration. Once comfortable, move to VS Code." },
          { question: "What extension in VS Code helps you open your HTML file in the browser with live reloading?", options: ["Prettier", "ESLint", "Live Server", "IntelliSense"], correctIndex: 2, explanation: "Live Server (by Ritwick Dey) launches a local server from VS Code and automatically refreshes your browser whenever you save changes — essential for efficient HTML development." },
          { question: "What is the keyboard shortcut to open VS Code's command palette?", options: ["Ctrl+Shift+P", "Ctrl+Shift+X", "Ctrl+Alt+C", "F1 only"], correctIndex: 0, explanation: "Ctrl+Shift+P (Cmd+Shift+P on Mac) opens the Command Palette in VS Code — a searchable list of all commands and actions. It is one of the most powerful productivity features in VS Code." },
          { question: "Why do most professional developers prefer a dedicated code editor over plain Notepad?", options: ["Plain Notepad cannot save text files", "Dedicated editors provide syntax highlighting, error detection, and productivity features that plain text editors lack", "Plain Notepad does not support ASCII characters", "Dedicated editors run faster on hardware than Notepad"], correctIndex: 1, explanation: "Dedicated code editors have features specifically designed for coding: syntax highlighting, autocomplete, error linting, extension support, multi-file management, and integrated terminals. Notepad has none of these." }
        ]
      },
      {
        id: "topic-1-6",
        title: "Your First HTML Page",
        explanation: `Everything you have learned so far comes together in this moment: writing your first real HTML page from scratch. This is a milestone. Even the most experienced web developers remember the first time their code appeared as a real webpage in a browser.

Here is your process: Open VS Code, create a new file, and save it as index.html. VS Code will immediately recognize it as an HTML file and activate syntax highlighting. Then type the full boilerplate structure — or if you installed VS Code with the HTML extension, type an exclamation mark and press Tab for an instant skeleton.

The boilerplate includes: the DOCTYPE declaration, the html element with a lang attribute, the head section with charset and viewport meta tags plus a title, and the body section where your content will live.

Inside the body, add a heading using h1 and a paragraph using p. Save the file with Ctrl+S. If you have Live Server installed, right-click the file in the VS Code sidebar and choose "Open with Live Server". Your browser will open and show your page.

Change something — maybe the heading text. Hit save. Watch the browser update automatically. That live feedback loop is one of the most satisfying parts of web development.

Congratulations: you are now a web developer. From this simple foundation of structure and a working editor, every website ever built begins. What you create next is only limited by your imagination and how much you keep learning.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First HTML Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my very first HTML webpage.</p>
    <p>I built this by writing HTML from scratch.</p>

    <h2>What I learned today:</h2>
    <ul>
      <li>HTML stands for HyperText Markup Language</li>
      <li>Every HTML file has a head and a body</li>
      <li>The body holds all visible content</li>
    </ul>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Personalize Your First Page",
            description: "Change the h1 to say 'Welcome to [Your Name]'s Page!' and update the paragraphs to be about yourself — maybe your hobbies, what you want to build, or why you are learning HTML.",
            hint: "Edit the text between the tags. Do not change the tags themselves, just the content inside them."
          },
          {
            title: "Exercise 2 – Expand Your Learning List",
            description: "Add at least 3 more items to the unordered list of things you learned today. Try to write them in your own words.",
            hint: "Each list item uses <li>Your item here</li> inside the <ul>...</ul> block."
          },
          {
            title: "Exercise 3 – Create a Second Section",
            description: "Add a new section after the list with an h2 heading called 'My Goals' and a paragraph describing what you want to create with HTML by the end of this course.",
            hint: "Use <h2>My Goals</h2> followed by <p>Your goal text here</p> before the </body> tag."
          }
        ],
        quiz: [
          { question: "What is the conventional name for a website's main HTML file?", options: ["main.html", "home.html", "index.html", "start.html"], correctIndex: 2, explanation: "By convention, the main page is called index.html. Web servers automatically serve this file when a directory is requested. This convention exists across virtually all web servers." },
          { question: "In VS Code, what happens when you type '!' and press Tab in an HTML file?", options: ["VS Code inserts a comment", "VS Code generates the full HTML boilerplate instantly", "VS Code switches to dark mode", "VS Code opens the browser"], correctIndex: 1, explanation: "VS Code (with Emmet built in) expands '!' into a complete HTML boilerplate — DOCTYPE, html, head with charset and viewport, and body tags. This is called an Emmet abbreviation." },
          { question: "How do you open a file with Live Server in VS Code?", options: ["Press F12", "Right-click the file in the sidebar and choose 'Open with Live Server'", "Type 'liveserver' in the terminal", "Double-click the HTML file in Windows Explorer"], correctIndex: 1, explanation: "To launch Live Server, right-click your HTML file in VS Code's Explorer sidebar and choose 'Open with Live Server'. You can also click 'Go Live' in the bottom status bar." },
          { question: "What does 'Hello, World!' traditionally represent in programming?", options: ["A standard first security test", "The simplest possible working program — a beginner's first milestone", "A required phrase in all HTML documents", "An international standard greeting for web pages"], correctIndex: 1, explanation: "'Hello, World!' is a tradition in programming — the simplest program that produces visible output. Writing it is a first milestone that signals you have a working development setup." },
          { question: "After making a change to your HTML file, how do you see the update in Live Server?", options: ["You must close and reopen the browser", "You must restart VS Code", "Just save the file with Ctrl+S — Live Server refreshes automatically", "You must click a Refresh button in VS Code"], correctIndex: 2, explanation: "With Live Server running, saving your file (Ctrl+S) is all that is needed. Live Server detects the save and instantly refreshes the browser — no manual action required." },
          { question: "What is the minimum content required for a valid HTML5 page?", options: ["Just a DOCTYPE declaration", "DOCTYPE, html, head with charset, and body with at least one element", "DOCTYPE, html element, and a body element", "DOCTYPE, html, head, title, and body"], correctIndex: 2, explanation: "The minimum valid HTML5 structure is: <!DOCTYPE html>, <html>, and <body>. The <head> is highly recommended but technically browsers will still render without it." },
          { question: "Where in VS Code should you save an HTML file?", options: ["In the VS Code installation folder", "Anywhere on your computer — but organized in a project folder is best practice", "Only on the Desktop", "In the browser's download folder"], correctIndex: 1, explanation: "You can save HTML files anywhere. Best practice is to create a dedicated project folder and keep all related files (HTML, CSS, images) organized inside it." },
          { question: "What file extension must your file have for VS Code to recognize it as HTML?", options: [".text", ".web", ".html or .htm", ".code"], correctIndex: 2, explanation: "The .html extension (or .htm) tells VS Code and browsers that the file contains HTML. VS Code uses the extension to activate HTML syntax highlighting and Emmet shortcuts." },
          { question: "What is Emmet in VS Code?", options: ["A debugging tool for JavaScript errors", "A built-in shorthand system for quickly generating HTML and CSS code", "A version control plugin", "A code formatter similar to Prettier"], correctIndex: 1, explanation: "Emmet is a built-in VS Code tool that expands shorthand abbreviations into full HTML/CSS. Type 'ul>li*3' and press Tab to get a <ul> with 3 <li> items instantly." },
          { question: "What is a 'live feedback loop' in web development?", options: ["Receiving code reviews from senior developers in real-time", "The cycle of edit → save → see changes in the browser immediately", "A debugging technique for catching JavaScript errors", "Automated testing that runs after each save"], correctIndex: 1, explanation: "The live feedback loop is the edit-save-see cycle. With Live Server, you edit HTML → save → browser updates immediately. This tight loop makes learning faster and more enjoyable." },
          { question: "What happens if you open your HTML file by double-clicking it in your file manager?", options: ["It opens in VS Code automatically", "It opens in your default browser using the file:// protocol", "It throws an error because it needs a server", "It opens as a text file in Notepad"], correctIndex: 1, explanation: "Double-clicking an HTML file opens it in your default browser using the file:// protocol. This works for static pages but lacks Live Server's auto-refresh. Some features (like fetch()) also behave differently." },
          { question: "What is the difference between file:// and http:// when viewing your HTML page?", options: ["file:// is encrypted; http:// is not", "file:// loads from your local disk; http:// loads from a server (even a local one)", "file:// is faster than http:// for all file types", "There is no practical difference for HTML files"], correctIndex: 1, explanation: "file:// loads files directly from your disk, bypassing server features. http:// (even locally via Live Server) simulates a real web server. Some browser security features and APIs only work over http://." },
          { question: "Why is it important to save your HTML file before viewing it in the browser?", options: ["Browsers refuse to load unsaved files", "The browser reads the saved file from disk — unsaved changes are not on disk yet", "VS Code automatically closes unsaved files", "Unsaved files use a different file format"], correctIndex: 1, explanation: "The browser reads your file from disk. If you have unsaved changes in VS Code, the browser still shows the last saved version. Always save (Ctrl+S) before checking your browser." },
          { question: "What is the best way to organize your HTML project files?", options: ["Put all files in the root C:/ drive directory", "Keep all files on the Desktop for easy access", "Create a dedicated project folder with organized subfolders for css/, images/, etc.", "Let VS Code automatically organize files"], correctIndex: 2, explanation: "Organized project structure is a professional habit. Create a project folder, and inside it keep index.html at the root, and organize assets into subfolders like css/, images/, js/." },
          { question: "What does the progress of learning HTML look like after writing your first page?", options: ["You have learned everything — HTML is complete", "You have learned the foundation — structure, tags, and the editing workflow that all future learning builds on", "You need to immediately learn CSS before continuing with HTML", "You should switch to a framework like React before writing more HTML"], correctIndex: 1, explanation: "Your first HTML page establishes the foundation: you understand structure, the editing workflow, and how browsers render your code. Every advanced HTML topic builds on this base." },
          { question: "What is the Emmet shortcut to create a paragraph tag in VS Code?", options: ["<p> + Tab", "p + Tab then type content", "Type 'paragraph' and press Enter", "Use the Insert menu"], correctIndex: 1, explanation: "In VS Code, typing 'p' and pressing Tab (while in an HTML file) expands to <p></p> using Emmet. The cursor is placed between the tags so you can type your content immediately." },
          { question: "What should you do if your changes are not appearing in the browser?", options: ["Restart your computer", "Make sure the file is saved (Ctrl+S) and check that Live Server is running", "Reinstall VS Code", "Clear the HTML file and start again"], correctIndex: 1, explanation: "If browser changes are not appearing, first check that you saved the file (unsaved files have a dot on the tab in VS Code). Also verify Live Server is active (check the status bar for 'Port: 5500')." },
          { question: "What is a 'boilerplate' in HTML development?", options: ["Decorative HTML template with built-in colors and fonts", "The essential template structure every HTML file should start with", "A library of pre-built components for buttons and forms", "A type of outdated HTML 4 specification"], correctIndex: 1, explanation: "An HTML boilerplate is the standard starter template every HTML page needs: DOCTYPE, html, head (with meta tags and title), and body. It is the minimum valid structure to build upon." },
          { question: "Can you have two h1 elements on one page?", options: ["No, the browser will crash", "No, HTML prohibits more than one h1", "Yes, but best practice says use only one h1 per page for semantic clarity and SEO", "Yes, and it improves SEO to have multiple h1s"], correctIndex: 2, explanation: "Technically, HTML5 allows multiple h1 elements (in different sections). However, best practice for SEO and accessibility is to use only one h1 per page — the main page title — and use h2-h6 for subheadings." },
          { question: "After completing your first HTML page, what is the most important next step?", options: ["Deploy it to the internet immediately", "Switch to JavaScript before learning more HTML", "Keep experimenting — try adding more tags, change content, break things and fix them", "Memorize all 100+ HTML tags before continuing"], correctIndex: 2, explanation: "The fastest way to learn HTML is to experiment: add new tags, see what breaks, fix it, try something new. Active experimentation with immediate visual feedback is far more effective than memorization." }
        ]
      }
    ]
  },

  // ===========================
  // LESSON 2 – HTML Elements & Tags
  // ===========================
  {
    id: "lesson-2",
    title: "Lesson 2 – HTML Elements & Tags",
    topics: [
      {
        id: "topic-2-1",
        title: "HTML Tags & Syntax",
        explanation: `HTML is made up of elements, and elements are made up of tags. Understanding the syntax rules of HTML tags is fundamental — it is the grammar of the language.

A tag consists of angle brackets surrounding a keyword. Most elements have an opening tag and a closing tag, with content in between. The opening tag is <tagname> and the closing tag is </tagname> — notice the forward slash. The content between them is what the browser displays or uses.

For example: <p>This is a paragraph.</p> — the browser displays "This is a paragraph." as a block of text.

Some elements are self-closing — they have no content and no closing tag. Examples include <br> (line break), <img> (image), and <meta>. In HTML5, you can write them as <br> or <br/> — both are valid.

Nesting means placing elements inside other elements. This is how complex page structures are built. Nesting must be done properly — elements must close in the reverse order they were opened. <p><strong>Bold text</strong></p> is correct. <p><strong>Wrong</p></strong> is invalid.

HTML is case-insensitive — <P> and <p> both work. However, lowercase is the modern convention and what all developers use. Using uppercase tags signals outdated HTML practices.

Whitespace (spaces, line breaks) between tags is mostly ignored by browsers. Multiple spaces collapse into one. Actual line breaks in your HTML do not create line breaks in the output — use <br> for that.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Tags and Syntax</title>
  </head>
  <body>

    <!-- Opening and closing tags with content -->
    <h1>This heading uses opening and closing tags</h1>
    <p>This paragraph has text content between the tags.</p>

    <!-- Nested elements: strong is inside p -->
    <p>This text has a <strong>bold word</strong> inside it.</p>

    <!-- Self-closing tags (no content, no closing tag) -->
    <br />
    <hr />

    <!-- Nesting must be done in the correct order -->
    <p>
      <em><strong>Both bold and italic</strong></em>
    </p>

  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Practice Nesting",
            description: "Create a paragraph that contains the word 'important' in bold AND italic at the same time. Hint: nest <strong> inside <em> or vice versa.",
            hint: "You can nest <strong><em>text</em></strong> or <em><strong>text</strong></em>. Both produce bold italic text."
          },
          {
            title: "Exercise 2 – Fix the Broken Nesting",
            description: "The following code has incorrect nesting: <p><strong>Hello</p></strong>. Rewrite it with correct nesting. Remember: elements must close in reverse order.",
            hint: "The closing </p> comes after </strong>. Correct order: <p><strong>Hello</strong></p>"
          },
          {
            title: "Exercise 3 – Self-Closing Tag Experiment",
            description: "Add three <br> tags between two paragraphs to create extra vertical space between them. Then add an <hr> tag to create a horizontal dividing line.",
            hint: "Self-closing tags like <br> and <hr> do not need a closing tag. Just place them where you want the break or line."
          }
        ],
        quiz: [
          { question: "What is the correct syntax for a closing HTML tag?", options: ["<tagname>", "<tagname/>", "</tagname>", "(tagname)"], correctIndex: 2, explanation: "Closing tags use a forward slash before the tag name: </tagname>. For example, a paragraph opened with <p> is closed with </p>." },
          { question: "Which of these is a self-closing HTML tag?", options: ["<p>", "<div>", "<img>", "<span>"], correctIndex: 2, explanation: "<img> is a self-closing (void) element — it has no content and no closing tag. Other self-closing tags include <br>, <hr>, <input>, <meta>, and <link>." },
          { question: "What is 'nesting' in HTML?", options: ["Placing elements inside other elements", "Linking one HTML file to another", "Writing tags in uppercase", "Removing closing tags to save space"], correctIndex: 0, explanation: "Nesting means placing HTML elements inside other elements. For example, <strong> inside <p>. Proper nesting follows a strict rule: elements must close in the reverse order they were opened." },
          { question: "Which of the following shows CORRECT nesting?", options: ["<p><strong>text</p></strong>", "<strong><p>text</p></strong>", "<p><strong>text</strong></p>", "<p>text<strong></p></strong>"], correctIndex: 2, explanation: "<p><strong>text</strong></p> is correct — the inner element (strong) closes before the outer element (p). The other options have tags crossing incorrectly." },
          { question: "Is HTML case-sensitive?", options: ["Yes, all tags must be lowercase", "Yes, all tags must be uppercase", "No, HTML is case-insensitive, but lowercase is convention", "Yes, but only for attribute names"], correctIndex: 2, explanation: "HTML is case-insensitive — <P> and <p> work the same. However, modern convention is to use all lowercase, as it is cleaner, consistent, and expected by linting tools." },
          { question: "What happens to multiple spaces in HTML content?", options: ["They each create a visible space", "They are all converted to a single space", "They cause a browser error", "They create a new paragraph each"], correctIndex: 1, explanation: "HTML collapses multiple consecutive spaces into a single space. If you need multiple spaces, use &nbsp; (non-breaking space) or control spacing with CSS." },
          { question: "Does a line break in your HTML code create a visible line break on the page?", options: ["Yes, every new line in HTML creates a new line in the browser", "No, only the <br> tag creates a visible line break", "Only if the line starts with a dash", "Yes, if you have 2 or more consecutive blank lines"], correctIndex: 1, explanation: "Line breaks in your HTML source code are treated as whitespace and collapsed into a single space. To create a visible line break in the browser, you must use the <br> tag." },
          { question: "What does the <hr> tag create?", options: ["A hyperlink reference", "A horizontal rule (dividing line) across the page", "A header element", "A high-resolution image placeholder"], correctIndex: 1, explanation: "<hr> creates a horizontal rule — a visual dividing line across the page. It is a self-closing element often used to separate content sections." },
          { question: "What is an HTML element?", options: ["Just the opening tag of a structure", "The opening tag + content + closing tag together", "Only the content between two tags", "A CSS rule applied to a tag"], correctIndex: 1, explanation: "An HTML element consists of the opening tag, the content between the tags, and the closing tag together. For example: <p>Hello</p> is a complete element." },
          { question: "What does it mean for an element to have 'no content'?", options: ["The element's tag is empty with no attributes", "The element carries no visible or structural content — it is void", "The element has been hidden with CSS", "The element has only whitespace between its tags"], correctIndex: 1, explanation: "Void (self-closing) elements like <br>, <img>, <input> carry no content between an open and close tag — they represent something that does not wrap content." },
          { question: "In HTML5, which format for self-closing tags is valid?", options: ["Only <br> (without slash)", "Only <br/> (with slash)", "Both <br> and <br/> are valid", "Self-closing tags must always use <br></br>"], correctIndex: 2, explanation: "In HTML5, both <br> and <br/> are valid for void elements. The slash was required in XHTML but is optional in HTML5. Most developers omit it in HTML5 for brevity." },
          { question: "What is the role of angle brackets (< >) in HTML?", options: ["They indicate comments in HTML", "They contain tag names to identify HTML elements", "They are used for mathematical operations", "They mark the start of CSS rules"], correctIndex: 1, explanation: "Angle brackets surround tag names to identify them as HTML markup: <tagname>. They tell the browser 'this is a tag, not regular text content'." },
          { question: "Which of these tags wraps content and has both opening and closing tags?", options: ["<br>", "<img>", "<meta>", "<p>"], correctIndex: 3, explanation: "<p> is a normal element with both opening (<p>) and closing (</p>) tags that wrap content. <br>, <img>, and <meta> are void (self-closing) elements with no closing tag." },
          { question: "What does the term 'parent element' mean in HTML?", options: ["The <html> element specifically", "An element that contains another element inside it", "The most recently added element", "An element with the most attributes"], correctIndex: 1, explanation: "A parent element is any element that contains another element (child) inside it. For example, in <ul><li>item</li></ul>, the <ul> is the parent and <li> is the child." },
          { question: "What is the 'content' of an HTML element?", options: ["The tag name itself", "Anything placed between the opening and closing tags", "The element's CSS styles", "The element's JavaScript handlers"], correctIndex: 1, explanation: "The content of an HTML element is everything between its opening and closing tags — this can be text, other elements, or both." },
          { question: "What makes HTML forgiving compared to most programming languages?", options: ["HTML never has syntax errors", "Browsers try to fix and render broken or invalid HTML rather than refusing to display it", "HTML has automatic spell checking", "HTML runs without a browser"], correctIndex: 1, explanation: "Browsers are very forgiving of invalid HTML — they attempt to repair and render even broken markup. While this means pages 'work' with errors, it can cause unpredictable behavior and should not be relied on." },
          { question: "What is an attribute in an HTML tag?", options: ["A CSS class applied to the element", "Extra information provided inside the opening tag: name='value'", "A child element nested inside the tag", "A JavaScript function attached to the element"], correctIndex: 1, explanation: "Attributes provide extra information about an element inside its opening tag: <a href='https://example.com'>. They follow the pattern name='value'." },
          { question: "Can HTML elements have multiple attributes?", options: ["No, each element can only have one attribute", "Yes, multiple attributes can be placed in the opening tag, space-separated", "Only if they are listed in a specific order", "Only self-closing elements can have multiple attributes"], correctIndex: 1, explanation: "Yes, elements can have multiple attributes: <img src='photo.jpg' alt='A photo' width='200'>. Attributes are space-separated within the opening tag and order usually does not matter." },
          { question: "What tag creates a line break without starting a new paragraph?", options: ["<lb>", "<nl>", "<br>", "<newline>"], correctIndex: 2, explanation: "<br> creates a line break — the content after it starts on a new line within the same block. Unlike <p>, it does not add paragraph spacing above or below." },
          { question: "Which HTML element contains all other elements on the page?", options: ["<body>", "<main>", "<html>", "<div>"], correctIndex: 2, explanation: "The <html> element is the root — it contains everything. Inside <html> are <head> and <body>. <body> holds visible content, but <html> is the true outermost wrapper." }
        ]
      },
      {
        id: "topic-2-2",
        title: "Headings (h1–h6)",
        explanation: `HTML provides six levels of headings — h1 through h6 — for organizing content hierarchically. Understanding when and how to use each level is important both for visual presentation and for the semantic meaning they carry.

The h1 element represents the top-level title of a page — the single most important heading. Think of it like the title of a book. There should be only one h1 per page. Search engines like Google give special weight to text inside h1, making it critical for SEO (Search Engine Optimization).

h2 elements are major section headings — like chapter titles. h3 is a subheading within a section. h4, h5, and h6 go deeper, though they are rarely used in practice. Most pages only need h1 through h3.

The hierarchy matters for two reasons. First, semantics — headings communicate the structure and outline of your content to search engines, screen readers, and other automated tools. Second, accessibility — screen reader users often navigate pages by jumping between headings. A properly nested heading hierarchy helps them understand the page structure.

Browsers apply default styling to headings (h1 is largest, h6 is smallest), but these sizes can be overridden entirely with CSS. The visual size should not be your reason for choosing a heading level — choose based on the content hierarchy.

Never skip heading levels (e.g., going from h1 directly to h4) just for styling purposes. That breaks the semantic outline of your page.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Heading Levels</title>
  </head>
  <body>

    <!-- One h1: the page title -->
    <h1>The Complete Guide to HTML</h1>

    <!-- h2: major sections -->
    <h2>Chapter 1: Getting Started</h2>
    <p>Introduction to HTML basics...</p>

      <!-- h3: subsections within a chapter -->
      <h3>1.1 What is HTML?</h3>
      <p>HTML stands for HyperText Markup Language...</p>

      <h3>1.2 Document Structure</h3>
      <p>Every HTML document has a head and body...</p>

    <h2>Chapter 2: HTML Elements</h2>
    <p>Learning about the building blocks...</p>

      <h3>2.1 Tags and Syntax</h3>
      <p>Tags are the backbone of HTML...</p>

  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Create a Proper Heading Hierarchy",
            description: "Create a page about 'My Favorite Recipes' with one h1 (the page title), two h2 sections (Breakfast and Dinner), and two h3 recipe names under each h2.",
            hint: "Remember: only one h1 per page. h2s are sections, h3s are items within each section."
          },
          {
            title: "Exercise 2 – Fix the Heading Hierarchy",
            description: "Fix this broken heading structure: h1 → h4 → h2 → h5. Rewrite it as a proper h1 → h2 → h3 hierarchy without skipping levels.",
            hint: "Headings should flow: h1 > h2 > h3 > h4. Never jump from h1 directly to h3 or h4 for styling purposes."
          },
          {
            title: "Exercise 3 – Outline a Blog Post",
            description: "Build the heading skeleton for a blog post titled 'How to Learn Programming'. Include the post title as h1, three major points as h2, and two supporting sub-points under each h2 as h3.",
            hint: "This structure: h1 > h2 > h3 > h3 > h2 > h3 > h3 is valid. Add brief placeholder paragraphs under each heading."
          }
        ],
        quiz: [
          { question: "How many h1 elements should a typical webpage have?", options: ["As many as needed for visual sizing", "Exactly zero — h1 is deprecated", "Only one, representing the main page title", "Up to three for optimal SEO"], correctIndex: 2, explanation: "Best practice is one h1 per page — the single most important heading representing the page's main topic. Multiple h1s confuse search engines and screen readers." },
          { question: "What does the 'h' in h1-h6 stand for?", options: ["Highlighted", "Hidden", "Heading", "Horizontal"], correctIndex: 2, explanation: "The 'h' in h1-h6 stands for 'heading'. These are heading elements that provide hierarchical structure to content." },
          { question: "Which heading tag has the largest default browser size?", options: ["h6", "h1", "h3", "They are all the same size by default"], correctIndex: 1, explanation: "h1 has the largest default font size in browsers (typically 2em or 32px). Font size decreases from h1 to h6, with h6 being the smallest heading." },
          { question: "Can you use CSS to make an h3 appear visually larger than an h1?", options: ["No, heading sizes are fixed by HTML", "Yes, CSS can override the default heading styles completely", "Only if the h3 appears before the h1", "Only with JavaScript"], correctIndex: 1, explanation: "CSS has complete control over the appearance of heading elements. You can make h3 as large, colorful, or styled as you want regardless of its semantic level." },
          { question: "Why should you NOT skip heading levels (e.g., h1 to h4)?", options: ["Because browsers will not render skipped headings", "Because it breaks the semantic outline that screen readers and search engines use", "Because skipping levels is a syntax error", "Because CSS cannot style non-sequential headings"], correctIndex: 1, explanation: "Skipping heading levels breaks the document outline. Screen readers use headings to help users navigate. Search engines use hierarchy to understand content importance. Skipping levels confuses both." },
          { question: "What is the primary difference between choosing an h2 vs an h3?", options: ["h2 is bigger so it looks better for important content", "h2 represents a higher-level section than h3 in the content hierarchy", "h3 loads faster than h2", "h2 can contain images but h3 cannot"], correctIndex: 1, explanation: "The choice between h2 and h3 is about content hierarchy, not appearance. h2 is a major section heading; h3 is a subsection within that h2 section. Choose based on structure, not size." },
          { question: "What is the SEO benefit of using headings correctly?", options: ["Headings have no effect on SEO", "Search engines give special weight to heading text, especially h1, to determine page topic", "Using more headings always improves SEO ranking", "Search engines only read h6 elements for metadata"], correctIndex: 1, explanation: "Search engines like Google analyze heading hierarchy to understand what a page is about. h1 carries the most weight. Properly structured headings with relevant keywords improve search visibility." },
          { question: "How do screen reader users often navigate long pages?", options: ["By reading every word from top to bottom", "By jumping between heading elements using keyboard shortcuts", "By skipping all text and only reading links", "Screen readers cannot navigate HTML pages"], correctIndex: 1, explanation: "Screen reader users can press keyboard shortcuts to jump between headings (like 'H' in NVDA). A well-structured heading hierarchy allows them to quickly navigate to the section they need." },
          { question: "What happens visually when you use h4, h5, or h6?", options: ["They display the same size as h3", "They display progressively smaller than h3, with h6 being the smallest", "They display as bold text with no size change", "They are hidden by default"], correctIndex: 1, explanation: "h4, h5, and h6 display progressively smaller than h1-h3. h6 is typically smaller than the default body text size. These deeper levels are rarely needed in practice." },
          { question: "If you need a very large font size for decorative text (not a structural heading), what should you use?", options: ["Use h1 even if it is not the main heading", "Use CSS to style a <p> or <span> with the desired size", "Use h2 and remove the semantic styling", "Use a <big> tag"], correctIndex: 1, explanation: "For purely decorative large text that is not a structural heading, use a <p>, <span>, or <div> and apply CSS font-size. Do not misuse heading tags for visual effect — it harms accessibility and SEO." },
          { question: "Can headings contain inline elements like <strong> or <em>?", options: ["No, headings can only contain plain text", "Yes, inline elements can be nested inside headings", "Only <em> is allowed inside headings", "Only if CSS display is changed first"], correctIndex: 1, explanation: "Headings can contain inline elements. For example: <h1>Welcome to <em>CodeCraft</em></h1> is valid. The inline element does not change the heading's structural role." },
          { question: "What does a page's 'heading outline' mean?", options: ["The visual border around each heading", "The hierarchical list of headings that define the page's content structure", "The CSS margin and padding applied to headings", "The URL structure of the website"], correctIndex: 1, explanation: "A heading outline is the nested structure formed by all the headings on a page — like a table of contents. h1 > h2s > h3s, etc. Tools and screen readers use this outline to understand page structure." },
          { question: "What is wrong with using h1 for every heading on a page to 'make everything big'?", options: ["Browsers will reject multiple h1 tags", "It destroys the semantic hierarchy needed by search engines, screen readers, and automated tools", "h1 only makes text slightly larger than h2", "CSS cannot style multiple h1 elements on one page"], correctIndex: 1, explanation: "Using h1 for everything obliterates the hierarchical structure. Search engines cannot determine content importance. Screen reader users cannot navigate the page structure. Always use headings semantically." },
          { question: "How is h1 different from the <title> tag?", options: ["They are identical — both set the page's main title", "h1 appears on the page; <title> appears in the browser tab and search results", "<title> appears on the page; h1 appears in the browser tab", "h1 is for images only; <title> is for text"], correctIndex: 1, explanation: "h1 is the main visible heading on the page. The <title> tag (in <head>) appears in the browser tab, bookmarks, and search engine results — it is never visible on the page itself." },
          { question: "What is the correct semantic use of h2 elements?", options: ["Only one h2 is allowed per page", "h2 elements mark major sections of a page, and multiple h2s are expected", "h2 should only be used inside the <header> element", "h2 is only valid inside the <nav> element"], correctIndex: 1, explanation: "A page can and usually should have multiple h2 elements — one for each major section. h2 elements create the top-level sections under the single h1." },
          { question: "What is the relationship between h3 and h2 in a properly structured document?", options: ["h3 is always inside the <head>, h2 is always in <body>", "h3 represents a subsection within the h2 section that precedes it", "h3 and h2 are interchangeable and have the same semantic meaning", "h3 is specifically for dates and h2 is for names"], correctIndex: 1, explanation: "In a proper heading hierarchy, h3 appears inside (or after) an h2 and represents a subsection of that h2 section. The nesting is conceptual, not literal — they don't need to be inside each other in HTML." },
          { question: "In what scenario might you legitimately use h4 or h5?", options: ["When you want smaller text that matches a specific font size", "In complex documents like academic papers, legal documents, or documentation with deep nested sections", "h4 and h5 are never needed in modern HTML", "When the page uses a dark background color"], correctIndex: 1, explanation: "h4 and h5 are useful in complex, deeply structured documents — technical documentation, long-form content, reference manuals — where multiple levels of sub-sections are genuinely needed." },
          { question: "What browser default styling does h1 typically have?", options: ["No styling — it appears identical to body text", "Larger font size and bold weight compared to body text", "A colored background and underline", "Center-aligned text with a border"], correctIndex: 1, explanation: "Browsers style h1 with a larger font size (typically 2em) and bold weight by default. These are just browser defaults — CSS can override any of these properties." },
          { question: "Can heading tags be used inside a <li> element?", options: ["No, headings cannot be nested inside any other element", "Yes, headings can appear inside list items", "Only h6 can be used inside list items", "Only if the list is ordered (<ol>)"], correctIndex: 1, explanation: "Yes, heading tags can be nested inside list items. This is sometimes used for structured navigation menus or content lists where each list item has a heading and supporting text." },
          { question: "What attribute can you add to headings to create a link target (anchor)?", options: ["name='heading-id'", "id='unique-name'", "class='anchor'", "href='#heading'"], correctIndex: 1, explanation: "Adding an id attribute to a heading (e.g., <h2 id='section-2'>) creates an anchor point. You can then link directly to it with <a href='#section-2'>. This is how table of contents links work." }
        ]
      },
      {
        id: "topic-2-3",
        title: "Paragraphs & Line Breaks",
        explanation: `Text is the most fundamental type of content on the web, and HTML provides two key elements for controlling how text flows: paragraphs and line breaks.

The paragraph element, <p>, is a block-level element. Block-level means it takes up the full width available and starts on a new line, automatically adding whitespace (margin) above and below it. Browsers apply this default spacing to create visual separation between paragraphs — you do not need to add blank lines manually.

When you want to write multiple paragraphs, use separate <p> tags for each one. Do not try to create multiple paragraphs by pressing Enter repeatedly in your HTML code — browsers collapse all whitespace.

The line break element, <br>, is a self-closing element that forces a single line break within the current block. Unlike <p>, it does not add extra spacing — it simply moves the next content to the next line. Think of <br> like pressing Shift+Enter in a word processor versus Enter (which starts a new paragraph).

When should you use each? Use <p> for actual paragraphs — distinct blocks of related text. Use <br> sparingly: inside addresses, poetry, or anywhere you need a line break without starting a new paragraph block.

A common beginner mistake is using <br><br> to fake paragraph spacing. This is poor practice. Use proper <p> tags and control spacing with CSS.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Paragraphs and Line Breaks</title>
  </head>
  <body>

    <h1>Writing Text in HTML</h1>

    <!-- Each <p> creates a separate paragraph with automatic spacing -->
    <p>This is the first paragraph. Browsers add space before and after it automatically.</p>
    <p>This is the second paragraph. Notice the gap between the paragraphs.</p>

    <!-- <br> for line breaks within a block (like an address) -->
    <p>
      John Smith<br />
      123 Web Street<br />
      San Francisco, CA 94102
    </p>

    <!-- Poetry or verse - use <br> for line breaks -->
    <p>
      Roses are red,<br />
      Violets are blue,<br />
      HTML is fun,<br />
      And so are you!
    </p>

  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Write Three Paragraphs",
            description: "Write three separate paragraphs about your three favorite things (hobbies, foods, places — your choice). Use a <p> tag for each one. Do not use <br> between them.",
            hint: "Three separate <p>...</p> elements will automatically have spacing between them. No need for extra line breaks."
          },
          {
            title: "Exercise 2 – Format an Address",
            description: "Create a paragraph that formats your (real or fictional) mailing address using <br> tags. Include: your name, street address, city/state/zip, and country.",
            hint: "Use one <p> tag with <br> after each line except the last one: <p>Name<br>Street<br>City</p>"
          },
          {
            title: "Exercise 3 – Write a Poem",
            description: "Write a short 4-line poem (original or a known verse) inside a single <p> tag using <br> to create line breaks between each line. Add a heading above it.",
            hint: "Use <br> after each poem line except the last. The whole poem lives inside one <p> tag."
          }
        ],
        quiz: [
          { question: "What type of element is <p>?", options: ["Inline element", "Self-closing element", "Block-level element", "Void element"], correctIndex: 2, explanation: "<p> is a block-level element — it takes up the full available width and starts on a new line, with automatic margin above and below." },
          { question: "What does a browser automatically add above and below a <p> element?", options: ["A horizontal border line", "Margin (spacing)", "A background color", "A bullet point"], correctIndex: 1, explanation: "Browsers add default top and bottom margin to <p> elements, creating visual spacing between paragraphs. This can be overridden with CSS." },
          { question: "What is the <br> element used for?", options: ["Creating bold text", "Starting a new paragraph with extra spacing", "Forcing a line break without starting a new paragraph", "Breaking out of a container element"], correctIndex: 2, explanation: "<br> creates a line break — content after it continues on the next line within the same block element. It does not add paragraph spacing." },
          { question: "Which approach is correct for writing two separate paragraphs?", options: ["<p>First paragraph<br><br>Second paragraph</p>", "<p>First paragraph</p><p>Second paragraph</p>", "<p>First paragraph</p><br><p>Second paragraph</p>", "Writing them on separate lines without any tags"], correctIndex: 1, explanation: "Use separate <p> tags for each paragraph: <p>First</p><p>Second</p>. Using <br><br> fakes paragraph spacing but lacks semantic meaning and proper spacing." },
          { question: "What is a good use case for <br>?", options: ["Separating paragraphs of body text", "Formatting a mailing address within a single paragraph", "Creating horizontal spacing between inline elements", "Adding a border between sections"], correctIndex: 1, explanation: "Good use cases for <br> include: mailing addresses, poetry, song lyrics, or any content where you need line breaks within a single block without starting a new paragraph." },
          { question: "What happens if you press Enter multiple times in your HTML code between content?", options: ["Multiple blank lines appear in the browser", "Only one space appears in the browser", "A new paragraph is created automatically", "The content is hidden"], correctIndex: 1, explanation: "HTML collapses all whitespace (spaces, tabs, newlines) into a single space. Multiple Enter presses in your source code create no visible difference in the browser output." },
          { question: "Is <br> a self-closing element?", options: ["No, it requires </br> to close", "No, it needs a wrapping element", "Yes, it is a void/self-closing element", "Only in XHTML, not HTML5"], correctIndex: 2, explanation: "<br> is a void element — it has no content and no closing tag. In HTML5, both <br> and <br/> are valid." },
          { question: "What does 'block-level' mean for elements like <p>?", options: ["The element blocks JavaScript from running", "The element takes the full width and starts on a new line", "The element cannot be styled with CSS", "The element is hidden by default"], correctIndex: 1, explanation: "Block-level elements like <p>, <div>, and <h1> take up the full available horizontal width and always start on a new line, stacking vertically." },
          { question: "Which is better practice for separating paragraphs?", options: ["<br><br> between text blocks", "Pressing Enter twice in the source code", "Using separate <p> tags for each paragraph", "Using a <hr> tag between each paragraph"], correctIndex: 2, explanation: "Using proper <p> tags is best practice. Each <p> is semantically a paragraph, gets correct accessibility treatment, and allows CSS to control spacing properly." },
          { question: "What is the default margin added by browsers to paragraph elements?", options: ["No margin — paragraphs are flush against each other", "A top and bottom margin (usually 1em)", "A left and right margin only", "A fixed 20px margin on all sides"], correctIndex: 1, explanation: "Most browsers add a top and bottom margin of approximately 1em to <p> elements. This can be overridden with CSS: p { margin: 0; }" },
          { question: "Can you nest a <p> inside another <p>?", options: ["Yes, nested paragraphs are valid HTML", "Yes, but only one level deep", "No, <p> cannot contain block-level elements including other <p> tags", "Only in HTML4, not HTML5"], correctIndex: 2, explanation: "<p> cannot contain block-level elements — including other <p> tags. The HTML spec prohibits this. Browsers may handle it, but the result is invalid and unpredictable." },
          { question: "What would <br><br><br> create in the browser?", options: ["Three new paragraphs", "Three blank lines of vertical space", "Three horizontal dividers", "A single line break"], correctIndex: 1, explanation: "Three <br> tags create three line breaks, resulting in approximately three lines of vertical space. This is considered poor practice — use CSS margins/padding instead for spacing." },
          { question: "What tag is semantically appropriate for a block of quoted text?", options: ["<p>", "<q>", "<blockquote>", "<cite>"], correctIndex: 2, explanation: "<blockquote> is the semantic tag for a block quotation — a longer quote from another source. <q> is for short inline quotes. Both are more semantically meaningful than just <p>." },
          { question: "How does the browser know where one paragraph ends and another begins?", options: ["By counting the number of words", "By detecting double line breaks in the source", "By the opening and closing <p> tags", "By the font size changes between paragraphs"], correctIndex: 2, explanation: "The browser uses the <p> and </p> tags to identify where each paragraph starts and ends. It is not based on word count or whitespace in the source code." },
          { question: "What is the purpose of wrapping text in <p> instead of just writing it in <body>?", options: ["Browsers reject text directly in <body>", "The <p> tag gives the text semantic meaning as a paragraph and proper default spacing", "Text without <p> is invisible", "Only <p> text can be styled with CSS"], correctIndex: 1, explanation: "Wrapping text in <p> gives it semantic meaning (this is a paragraph) and applies browser default margins. While text works in <body> without <p>, it lacks structure, spacing, and semantic value." },
          { question: "What does 'whitespace collapse' mean in HTML?", options: ["Images are compressed automatically", "Multiple spaces, tabs, and newlines in HTML source are rendered as a single space", "Text is made invisible when there is too much whitespace", "HTML files are compressed to reduce file size"], correctIndex: 1, explanation: "HTML whitespace collapse means multiple consecutive spaces, tabs, or line breaks in source code are rendered as a single space in the browser. This is why you need <br> for intentional line breaks." },
          { question: "When would you use <p> instead of <br> inside an address block?", options: ["Never — addresses should always use only <br>", "When you want to start a completely new, visually separate paragraph of text after the address", "When the address has more than 3 lines", "When the page uses a CSS grid layout"], correctIndex: 1, explanation: "Use <br> within an address to separate lines within one block. Use a new <p> if you want a completely separate paragraph with its own spacing after the address." },
          { question: "What is the HTML entity &nbsp; and how does it relate to paragraphs?", options: ["It creates a new paragraph", "It is a non-breaking space character — a space that does not collapse", "It is a line break alternative to <br>", "It applies no-break styling to paragraphs"], correctIndex: 1, explanation: "&nbsp; is a non-breaking space HTML entity. Unlike regular spaces (which collapse), &nbsp; creates a visible space character. It is sometimes used for minimal extra spacing, though CSS is preferred." },
          { question: "Can <br> be used outside of a <p> element?", options: ["No, <br> is only valid inside <p> tags", "Yes, <br> can be used inside most elements where text appears", "Only inside heading tags", "Only inside table cells"], correctIndex: 1, explanation: "<br> can be used inside most text-containing elements — <p>, <li>, <td>, <h1>, etc. It simply creates a line break wherever it appears in flowing text." },
          { question: "What does 'phrasing content' mean in HTML5 terminology?", options: ["Content that includes audio phrases", "Inline content like text, <strong>, <em>, <a> that flows within text", "Block-level content like <p> and <div>", "Metadata stored in the <head>"], correctIndex: 1, explanation: "Phrasing content (formerly called 'inline content') includes elements that flow within text — <strong>, <em>, <a>, <span>, <br>, etc. Block elements like <p> and <div> are not phrasing content." }
        ]
      },
      {
        id: "topic-2-4",
        title: "Text Formatting Tags",
        explanation: `HTML provides several tags specifically designed for formatting text inline — meaning they apply to text within a paragraph or heading without creating a new block.

The most important distinction is semantic vs presentational formatting. Semantic tags convey meaning: <strong> means the text is of strong importance (browsers render it bold by default, but its purpose is importance). <em> means emphasis (browsers render it italic by default). These semantic tags help screen readers, search engines, and other tools understand that certain text is more significant.

Presentational tags, by contrast, only describe appearance. <b> makes text visually bold with no added meaning. <i> makes text visually italic with no emphasis. <u> underlines text. While valid, they are less preferred than their semantic equivalents.

Additional formatting tags: <mark> highlights text with a yellow background (like a marker). <small> makes text slightly smaller. <del> shows deleted text (with a strikethrough). <ins> shows inserted text (underlined, often used alongside <del>). <sup> creates superscript text (like exponents: x²). <sub> creates subscript text (like chemical formulas: H₂O).

The golden rule: use semantic tags when the formatting carries meaning, and use CSS for purely visual styling.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Text Formatting</title>
  </head>
  <body>
    <h1>Text Formatting in HTML</h1>

    <!-- Semantic emphasis -->
    <p>This is <strong>very important</strong> information.</p>
    <p>This word is <em>emphasized</em> for clarity.</p>

    <!-- Other semantic tags -->
    <p>The price was <del>$99</del> <ins>$49</ins> — sale!</p>
    <p>Water formula: H<sub>2</sub>O</p>
    <p>Square: x<sup>2</sup></p>
    <p><mark>This text is highlighted</mark> for attention.</p>
    <p><small>Fine print goes here.</small></p>

    <!-- Presentational (visual only) -->
    <p>This is <b>bold</b> and this is <i>italic</i>.</p>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Apply Semantic Formatting",
            description: "Write a paragraph about staying hydrated. Use <strong> to emphasize 'drink at least 8 glasses of water daily' and <em> to emphasize the word 'essential'. Make sure the emphasis feels natural.",
            hint: "Wrap the important phrase with <strong>...</strong> and the word 'essential' with <em>...</em> inside your paragraph."
          },
          {
            title: "Exercise 2 – Price Tag with Strikethrough",
            description: "Create a product listing showing an original price of $199 crossed out and a sale price of $99 shown as new. Use <del> for the old price and <ins> for the new price.",
            hint: "Use: <del>$199</del> <ins>$99</ins> inside a paragraph. You can add text like 'Was:' and 'Now:' around them."
          },
          {
            title: "Exercise 3 – Scientific Notation",
            description: "Write a paragraph that includes: the chemical formula for carbon dioxide (CO₂) using <sub>, the speed of light (3×10⁸ m/s) using <sup>, and highlight the key fact using <mark>.",
            hint: "Use <sub>2</sub> for subscript and <sup>8</sup> for superscript. Wrap with <mark> for highlighting."
          }
        ],
        quiz: [
          { question: "What is the semantic difference between <strong> and <b>?", options: ["There is no difference — they render identically", "<strong> means strong importance; <b> is purely visual bold with no extra meaning", "<b> is for headings; <strong> is for paragraphs", "<strong> is deprecated; always use <b>"], correctIndex: 1, explanation: "<strong> communicates that the text has strong importance — screen readers may read it with emphasis. <b> makes text bold visually but carries no semantic meaning. Use <strong> for meaningful emphasis." },
          { question: "What is the semantic difference between <em> and <i>?", options: ["<em> is for italic in lists; <i> is for body text", "<em> means emphasis with meaning; <i> is italic for presentational purposes only", "<i> is semantic; <em> is presentational", "They are identical in all ways"], correctIndex: 1, explanation: "<em> signals stressed emphasis — 'I love *this*!' — and screen readers may inflect their voice. <i> makes text italic for purely visual reasons (like book titles or technical terms) with no emphasis meaning." },
          { question: "What does the <mark> tag do?", options: ["Creates a bookmark in the page", "Highlights text with a yellow background by default", "Makes text bold and marked as important", "Adds a checkmark icon beside text"], correctIndex: 1, explanation: "<mark> highlights text — browsers show it with a yellow background by default. It is used to indicate text that is particularly relevant, like search results highlighting matching terms." },
          { question: "What does the <del> tag visually represent?", options: ["Deleted files in the browser", "Text with a strikethrough — indicating it was removed", "Text that is colored red", "Text in a smaller font size"], correctIndex: 1, explanation: "<del> shows deleted or removed text with a strikethrough line. It is often used alongside <ins> to show document revisions — what was removed and what was added." },
          { question: "What does the <sup> tag create?", options: ["Superscript text — small text above the baseline (like exponents)", "Subscript text — small text below the baseline", "A superimposed overlay on text", "Extra-large text"], correctIndex: 0, explanation: "<sup> creates superscript text — small text raised above the normal text baseline. It is used for mathematical exponents (x²), footnote references, and similar notation." },
          { question: "What does H<sub>2</sub>O look like in the browser?", options: ["H2O in normal text", "H₂O with the 2 slightly below the baseline", "H²O with the 2 slightly above the baseline", "H<sub>2</sub>O as literal text"], correctIndex: 1, explanation: "Using <sub> renders the 2 as subscript — slightly below and smaller than the surrounding text. This is the standard way to format chemical formulas in HTML." },
          { question: "Is using <b> for bold text wrong in HTML5?", options: ["Yes, <b> is deprecated and invalid", "No, <b> is valid but should be used for stylistic bold with no semantic importance", "Yes, always use CSS instead of any HTML formatting tags", "No, <b> and <strong> are interchangeable in HTML5"], correctIndex: 1, explanation: "<b> is valid in HTML5 but should be used when bold is needed for stylistic reasons (not for emphasis). For emphasis or importance, use <strong> which carries semantic meaning." },
          { question: "What does <ins> indicate about the wrapped text?", options: ["Text that has been inserted as a new addition to the document", "Text that should be read by screen readers as 'inserted'", "Text that links to an external resource", "Text that is inside a text input field"], correctIndex: 0, explanation: "<ins> marks text as an insertion — content that was added to the document. It is typically displayed with an underline. Often used with <del> to show tracked changes." },
          { question: "What is 'inline formatting' in HTML?", options: ["Formatting that applies to an entire page", "Formatting that applies to specific text within a line without creating a new block", "CSS that is written in the HTML file", "Formatting that only works inside tables"], correctIndex: 1, explanation: "Inline formatting applies to text within a paragraph or heading without starting a new block. Tags like <strong>, <em>, <mark>, <sup> are all inline — they affect specific text without disrupting the surrounding flow." },
          { question: "What does <small> do to text?", options: ["Hides the text completely", "Makes the text slightly smaller than surrounding text", "Makes the text the smallest possible size", "Creates a caption below an image"], correctIndex: 1, explanation: "<small> renders text at a smaller font size than the surrounding content. It is semantically for fine print, disclaimers, copyright notices, or side comments." },
          { question: "Why is it better to use <strong> than to add CSS bold to a <span>?", options: ["<strong> renders faster than CSS", "<strong> carries semantic meaning that CSS cannot convey — it signals importance to screen readers and search engines", "<span> cannot be styled with CSS font-weight", "<strong> is required by the HTML5 specification"], correctIndex: 1, explanation: "Semantic tags like <strong> communicate meaning beyond appearance. A screen reader can announce 'important text' for <strong>, while a visually-styled <span> just looks bold — the meaning is lost." },
          { question: "What is the appropriate use of the <i> tag in HTML5?", options: ["Italic text that means something is emphasized", "Technical terms, taxonomic names, thoughts, or text in another language — italic for idiomatic reasons", "All italic text, replacing <em>", "Highlighted code inside paragraphs"], correctIndex: 1, explanation: "In HTML5, <i> is appropriate for text in a different voice or mood — technical terms, foreign phrases, taxonomic names, thoughts. Not for emphasis (use <em>) or decorative italic (use CSS)." },
          { question: "If a user is using a screen reader and encounters <em>great</em>, what might happen?", options: ["The screen reader skips the word", "The screen reader may emphasize or inflect its voice on the word 'great'", "The screen reader reads '<em>great</em>' literally including the tags", "The screen reader converts the word to an audio file"], correctIndex: 1, explanation: "Screen readers may respond to <em> by inflecting their voice — speaking the emphasized word with different stress or tone. This conveys the emphasis aurally to visually impaired users." },
          { question: "Which tag would you use to display the registered trademark symbol ® as superscript?", options: ["<sup>®</sup>", "<reg>®</reg>", "<tm>®</tm>", "<small>®</small>"], correctIndex: 0, explanation: "Wrapping ® (or &reg;) in <sup> makes it appear as superscript — the standard typographic treatment for trademark symbols. Example: Company Name<sup>®</sup>" },
          { question: "What does using semantic formatting tags help with?", options: ["Faster page loading speeds", "Smaller HTML file sizes", "Accessibility, SEO, and machine-readable document structure", "CSS compatibility across browsers"], correctIndex: 2, explanation: "Semantic formatting tags (<strong>, <em>, <mark>, <del>) improve accessibility (screen readers understand emphasis), SEO (search engines weight important text), and make documents machine-readable." },
          { question: "Can you combine multiple formatting tags on the same text?", options: ["No, only one formatting tag per text node is allowed", "Yes, you can nest them: <strong><em>bold and italic</em></strong>", "Only if they are on separate lines in the HTML", "Only two maximum can be combined"], correctIndex: 1, explanation: "Yes! You can nest formatting tags: <strong><em>bold and italic</em></strong> makes text both bold and italic. Nest them correctly (close in reverse order)." },
          { question: "What is the CSS property equivalent to what <strong> visually does by default?", options: ["font-style: italic", "font-weight: bold", "text-decoration: underline", "font-variant: small-caps"], correctIndex: 1, explanation: "<strong> defaults to font-weight: bold in browsers. However, the key difference is semantic: <strong> also conveys importance, while CSS font-weight: bold is purely visual." },
          { question: "What is the CSS property equivalent to what <em> visually does by default?", options: ["font-weight: bold", "text-decoration: underline", "font-style: italic", "text-transform: uppercase"], correctIndex: 2, explanation: "<em> defaults to font-style: italic in browsers. Like <strong> vs <b>, the semantic distinction is that <em> conveys emphasis while CSS italic is purely visual." },
          { question: "When should you use CSS for text styling instead of HTML formatting tags?", options: ["Never — always use HTML tags for styling", "When the styling is purely decorative and carries no semantic meaning", "Only when the text is inside a table", "When the page has more than 100 elements"], correctIndex: 1, explanation: "Use CSS for purely decorative text styles — changing color, font family, letter spacing, etc. Use HTML tags (<strong>, <em>) when the formatting carries meaning beyond appearance." },
          { question: "What HTML tag marks text that should be highlighted, like search terms matched in results?", options: ["<highlight>", "<search>", "<mark>", "<result>"], correctIndex: 2, explanation: "<mark> is specifically designed for highlighted text — semantically, text that is relevant to the user's current context, like search terms highlighted in results. Browsers show it with a yellow background by default." }
        ]
      },
      {
        id: "topic-2-5",
        title: "Comments in HTML",
        explanation: `Comments are pieces of text inside your HTML that browsers completely ignore when rendering the page. They are invisible to end users but visible to anyone reading the source code.

The syntax for an HTML comment is: <!-- your comment here -->. Everything between the opening <!-- and closing --> is a comment.

Why are comments useful? First, documentation: you can explain what a section of code does, why you made a particular decision, or note that a section is incomplete. This helps your future self and any teammates reading your code.

Second, organization: in long HTML files, comments act like headers in an outline: <!-- HEADER --> ... <!-- NAVIGATION --> ... <!-- MAIN CONTENT --> ... making large files much easier to navigate.

Third, temporary code disabling: if you want to test what a page looks like without a specific element, you can wrap it in a comment instead of deleting it. This is called "commenting out" code.

Comments should be used thoughtfully. Do not put sensitive information in HTML comments — they are visible in the page source (which anyone can view with right-click → View Page Source). Do not use comments to explain things that are obvious from the code itself — only add them when they provide genuine insight.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Comments</title>
  </head>
  <body>

    <!-- ======================== -->
    <!-- PAGE HEADER SECTION     -->
    <!-- ======================== -->
    <h1>Welcome to My Website</h1>

    <!-- Main navigation - TODO: add dropdown in v2 -->
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>

    <!-- This paragraph is temporarily disabled for testing -->
    <!--
    <p>This content is commented out and won't appear on the page.</p>
    -->

    <!-- Copyright year: update this each January -->
    <footer>
      <p>© 2024 My Website</p>
    </footer>

  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Organize with Comments",
            description: "Take the boilerplate HTML page and add comment labels before each main section: HEADER, NAVIGATION, MAIN CONTENT, and FOOTER. Use comments like <!-- HEADER --> to mark where each section begins.",
            hint: "Place comments directly above the element they describe. Example: <!-- HEADER --> immediately before the <header> or <h1>."
          },
          {
            title: "Exercise 2 – Comment Out an Element",
            description: "Add two paragraphs to your page, then comment out the second one so it does not appear in the browser. The commented paragraph should still be readable in the source code.",
            hint: "Wrap the second <p> element in comment syntax: <!-- <p>Hidden text</p> -->"
          },
          {
            title: "Exercise 3 – Leave a TODO Comment",
            description: "Create a page with a nav element containing two links. Add a comment above the nav that says 'TODO: Add a dropdown menu for mobile users in the next version'.",
            hint: "Comments can span multiple lines or be on one line. Use <!-- TODO: message --> as a common convention."
          }
        ],
        quiz: [
          { question: "What is the syntax for an HTML comment?", options: ["// This is a comment", "/* This is a comment */", "<!-- This is a comment -->", "# This is a comment"], correctIndex: 2, explanation: "HTML comments use <!-- to open and --> to close. Everything between them is ignored by the browser." },
          { question: "Are HTML comments visible to end users on the rendered page?", options: ["Yes, they appear as small gray text at the bottom", "No, browsers completely ignore comment content when rendering", "Only if the user right-clicks and inspects the element", "Yes, they are shown in the browser's console"], correctIndex: 1, explanation: "HTML comments are invisible in the rendered page. Browsers parse and skip them entirely. Users never see comment text in the normal browser view." },
          { question: "Can someone see your HTML comments if they view page source?", options: ["No, comments are hidden even in view source", "Yes, anyone can right-click and view page source to see all HTML including comments", "Only if they use developer tools", "Comments are encrypted by the browser"], correctIndex: 1, explanation: "Yes! HTML comments are visible in the page source (right-click → View Page Source). Never put passwords, API keys, or sensitive information in HTML comments." },
          { question: "What is 'commenting out' code?", options: ["Deleting code permanently", "Wrapping code in comment syntax to temporarily disable it without deleting it", "Adding explanatory notes to code", "Moving code to an external file"], correctIndex: 1, explanation: "Commenting out means wrapping code in comment syntax (<!-- -->) to prevent it from rendering. The code remains in the file but is ignored. This is useful for testing or temporarily disabling elements." },
          { question: "What is a good reason to use comments in HTML?", options: ["To make the file load faster", "To add hidden ads visible only to developers", "To document what sections of code do and why decisions were made", "To apply styling to specific elements"], correctIndex: 2, explanation: "Good reasons for comments: explaining complex sections, marking where sections begin/end, leaving TODO notes, and documenting decisions. This helps future readers (including yourself) understand the code." },
          { question: "Can HTML comments span multiple lines?", options: ["No, each comment must be on a single line", "Yes, comments can span as many lines as needed", "Only if each line starts with <!--", "Only in the <head> section"], correctIndex: 1, explanation: "HTML comments can span multiple lines: <!-- This is a long comment that spans multiple lines. All of this is ignored by the browser. -->. The browser ignores everything between <!-- and -->." },
          { question: "Can you nest HTML comments inside other comments?", options: ["Yes, nested comments are fully supported", "No, HTML does not support nested comments — it causes unexpected behavior", "Only one level of nesting is allowed", "Yes, but only in Chrome and Firefox"], correctIndex: 1, explanation: "HTML does not support nested comments. Placing <!-- inside another comment is invalid. The parser reads the first --> it encounters as closing the comment, leaving the rest as visible text." },
          { question: "What is a common developer convention for TODO comments?", options: ["//TODO: (JavaScript style)", "<!-- TODO: action needed -->", "# TODO: (Python style)", "/* TODO: (CSS style) */"], correctIndex: 1, explanation: "In HTML, TODO comments follow this style: <!-- TODO: add a contact form here -->. These are notes to yourself or your team about things that still need to be done." },
          { question: "What is the risk of storing API keys or passwords in HTML comments?", options: ["They will be automatically deleted by the browser", "Anyone viewing the page source can read the comments and see the sensitive data", "They slow down page loading speed", "They cause JavaScript errors"], correctIndex: 1, explanation: "Sensitive data in HTML comments is a serious security risk. Anyone can view page source and read your comments. Never store credentials, keys, or private information in HTML." },
          { question: "Do HTML comments affect page loading speed?", options: ["Yes, significantly — comments slow down parsing", "Minimally — comments are small data but do add to file size", "No effect at all — browsers skip them instantly", "Comments actually speed up parsing by skipping content"], correctIndex: 1, explanation: "HTML comments do add bytes to the file, which technically increases page size and parse time minimally. In production, some developers strip comments for optimization, though the effect is negligible for most sites." },
          { question: "Which of these is NOT a good use for HTML comments?", options: ["Marking sections like <!-- HEADER --> for organization", "Temporarily disabling code while testing", "Storing a user's session token for quick reference", "Leaving a TODO note for future development"], correctIndex: 2, explanation: "Storing session tokens, passwords, or any sensitive information in comments is a critical security mistake. Comments are visible in page source to anyone who inspects them." },
          { question: "What happens when a browser encounters <!-- in an HTML file?", options: ["It executes everything after it as JavaScript", "It treats everything until --> as a comment and skips it in rendering", "It shows an error in the developer console", "It stops parsing the HTML file"], correctIndex: 1, explanation: "When a browser encounters <!--, it skips everything until it finds the matching -->. The content is parsed but not rendered — effectively invisible to the user." },
          { question: "Can you comment out a block of HTML that includes other comments?", options: ["Yes, without any issues", "No — nested comments cause the outer comment to close early", "Only if you use JavaScript comments instead", "Only if the inner comment is on the same line"], correctIndex: 1, explanation: "You cannot reliably nest comments in HTML. If you try to comment out code that contains another <!-- --> comment, the parser may close the outer comment at the inner -->, causing the code to appear as visible text." },
          { question: "Where are HTML comments visible to developers during normal development?", options: ["In the browser's rendered output", "In the browser's developer tools (Elements panel) and View Source", "Only in the terminal", "Only in VS Code — they disappear when opened in a browser"], correctIndex: 1, explanation: "HTML comments are visible in VS Code (and any text editor), in View Source (Ctrl+U in Chrome), and in browser DevTools Elements panel. They are just hidden from the normal rendered page view." },
          { question: "What does the phrase 'self-documenting code' mean and how do comments relate?", options: ["Code that automatically generates documentation websites", "Code that is clear and readable enough that minimal comments are needed", "Code that includes mandatory comment on every line", "Code generated by an AI tool"], correctIndex: 1, explanation: "Self-documenting code is written clearly enough that it requires few comments. Good variable names, logical structure, and consistent patterns reduce comment need. Comments add value when code cannot explain itself." },
          { question: "Which of these comment styles is NOT valid in HTML?", options: ["<!-- Single line comment -->", "<!-- Multi-line\ncomment -->", "// This is a comment", "<!-- Section: Footer -->"], correctIndex: 2, explanation: "// is not a valid HTML comment syntax — it is used in JavaScript and other languages. HTML uses <!-- --> exclusively for comments." },
          { question: "What happens to comments when an HTML page is 'minified' for production?", options: ["They are color-coded for better readability", "They are preserved but compressed", "They are typically stripped out to reduce file size", "They are converted to meta tags"], correctIndex: 2, explanation: "HTML minification tools (used to reduce file sizes for production) typically remove comments, extra whitespace, and other non-essential content. This improves load times without affecting functionality." },
          { question: "What is an HTML comment NOT able to do?", options: ["Document code sections", "Temporarily hide elements", "Apply CSS styles to elements", "Leave TODO notes"], correctIndex: 2, explanation: "Comments cannot do anything functional like apply styles, run code, or modify page behavior. They are purely informational, visible only in source code and completely ignored by browsers at render time." },
          { question: "Why might you want to add a comment like '<!-- Last updated: 2024-01-15 -->'?", options: ["It helps the browser cache the page more efficiently", "It provides helpful context about when content was last changed — useful for maintenance", "It is required for SEO purposes", "It prevents the page from being indexed by search engines"], correctIndex: 1, explanation: "Date/version comments help track when content was last modified. This is useful for maintenance, especially if there are legal or compliance requirements to update content regularly." },
          { question: "Can HTML comments be used to explain the purpose of an HTML attribute?", options: ["Yes, and this is a common best practice", "No, comments cannot appear inside opening tags", "Only if the attribute is deprecated", "Yes, but only inside the <head>"], correctIndex: 1, explanation: "Correct — comments cannot appear inside opening tags like <div <!-- my comment --> class='box'>. Comments can only appear between elements, not within a tag's attributes." }
        ]
      },
      {
        id: "topic-2-6",
        title: "HTML Attributes",
        explanation: `Attributes are additional pieces of information added inside an HTML element's opening tag. They provide configuration, data, or behavior instructions to the element and the browser.

The syntax is always: <tagname attribute-name="attribute-value">. The attribute name and value are separated by an equals sign, and the value is wrapped in quotes (double quotes are convention, though single quotes also work). Multiple attributes in one tag are separated by spaces.

Attributes are always placed inside the opening tag, never the closing tag. For self-closing elements, they go in the only tag: <img src="photo.jpg" alt="A photo">.

Some key attributes you will use constantly:

class — assigns one or more CSS class names to an element, used for styling with CSS.
id — assigns a unique identifier to an element. Each id must be unique across the page. Used for CSS targeting and JavaScript.
style — applies inline CSS styles directly to the element (generally avoided for maintainability).
title — provides a tooltip text that appears on hover.
lang — specifies the language of the element's content.
href — used on anchor (<a>) tags, specifies the URL to link to.
src — used on <img> and <script> tags, specifies the file path.
alt — used on <img>, provides alternative text if the image fails to load.

Some attributes are Boolean — they work by their presence alone, with no value needed: <input disabled> or <input required>.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Attributes</title>
  </head>
  <body>

    <!-- id: unique identifier -->
    <h1 id="main-title">HTML Attributes Demo</h1>

    <!-- class: for CSS styling (multiple elements can share a class) -->
    <p class="intro-text">This paragraph has a CSS class.</p>
    <p class="intro-text highlight">This one has two classes.</p>

    <!-- title: tooltip on hover -->
    <p title="This tooltip appears on hover">Hover over me!</p>

    <!-- style: inline CSS (generally avoid — use class + CSS instead) -->
    <p style="color: blue; font-weight: bold;">Inline styled text</p>

    <!-- Multiple attributes on one element -->
    <img
      src="photo.jpg"
      alt="A beautiful landscape"
      width="400"
      title="Mountain view"
    />

  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Add Attributes to Elements",
            description: "Create a paragraph with an id of 'intro', a class of 'text-block', and a title that says 'This is the introduction'. Also write a second paragraph sharing the same class but with a different id.",
            hint: "Attributes are space-separated inside the opening tag: <p id='intro' class='text-block' title='This is the introduction'>"
          },
          {
            title: "Exercise 2 – Explore Boolean Attributes",
            description: "Create an HTML form with a text input that has the required attribute and a button that has the disabled attribute. Observe how the browser treats these boolean attributes.",
            hint: "Boolean attributes need no value: <input type='text' required> and <button disabled>Click Me</button>"
          },
          {
            title: "Exercise 3 – Multiple Classes",
            description: "Create three paragraphs: one with class 'large', one with class 'red-text', and one with both classes 'large red-text'. Observe how classes can be combined.",
            hint: "To add two classes, separate them with a space inside the class attribute: class='large red-text'. Classes don't actually change appearance without CSS, but they set up the connection."
          }
        ],
        quiz: [
          { question: "Where are HTML attributes placed?", options: ["In the closing tag only", "After the closing tag", "Inside the opening tag", "Before the opening tag"], correctIndex: 2, explanation: "Attributes are always placed inside the opening tag, before the closing angle bracket: <element attribute='value'>. Never in the closing tag." },
          { question: "What is the correct syntax for an HTML attribute?", options: ["attribute: 'value'", "attribute = value", "attribute='value'", "[attribute value]"], correctIndex: 2, explanation: "The correct syntax is attribute='value' (or attribute=\"value\" with double quotes). Attribute name, equals sign, and quoted value — all inside the opening tag." },
          { question: "What does the 'id' attribute do?", options: ["Adds a CSS class to an element", "Specifies the source URL for a file", "Assigns a unique identifier to an element", "Sets the element's default content"], correctIndex: 2, explanation: "The id attribute assigns a unique identifier to an element. IDs must be unique on the page — no two elements should share the same id. Used for CSS targeting and JavaScript manipulation." },
          { question: "What does the 'class' attribute do?", options: ["Assigns a unique id to the element", "Assigns one or more CSS class names for styling", "Sets the element's type or category", "Controls the element's position on the page"], correctIndex: 1, explanation: "The class attribute assigns CSS class names to an element. Multiple elements can share the same class, and one element can have multiple classes separated by spaces: class='card featured'." },
          { question: "What is the difference between id and class attributes?", options: ["id can be reused; class must be unique", "class can be reused; id must be unique per page", "They are identical — just different naming conventions", "id is for JavaScript only; class is for CSS only"], correctIndex: 1, explanation: "id must be unique — only one element per page should have a given id. class can be shared across many elements. Both can be used by CSS and JavaScript, though id is more specific." },
          { question: "What does the 'alt' attribute do on an <img> tag?", options: ["Sets an alternate theme for the image", "Provides alternative text if the image fails to load or for screen readers", "Specifies an alternative image URL as a fallback", "Controls the image's alt(ernate) color mode"], correctIndex: 1, explanation: "The alt attribute provides alternative text for images. It is displayed if the image fails to load, read by screen readers for accessibility, and used by search engines to understand image content." },
          { question: "What is a 'Boolean attribute' in HTML?", options: ["An attribute that accepts true or false as its value", "An attribute whose mere presence activates it — no value needed", "An attribute specific to JavaScript-controlled elements", "An attribute with two possible values: yes or no"], correctIndex: 1, explanation: "Boolean attributes are activated by their presence alone. <input disabled> and <input disabled='disabled'> are equivalent. The browser does not need a value — if the attribute exists, it is true." },
          { question: "Which of these is a Boolean attribute?", options: ["href", "src", "required", "class"], correctIndex: 2, explanation: "required is a Boolean attribute — just writing <input required> enables input validation. Other Boolean attributes include: disabled, checked, readonly, multiple, selected, hidden." },
          { question: "Can an HTML element have multiple attributes?", options: ["No, one attribute per element maximum", "Yes, up to two attributes per element", "Yes, elements can have as many attributes as needed", "Only id and class together, no others"], correctIndex: 2, explanation: "Yes! Elements can have any number of attributes: <img src='file.jpg' alt='description' width='200' class='hero-image' id='main-photo'>. Attributes are space-separated in the opening tag." },
          { question: "Are double quotes required around attribute values?", options: ["Yes, always required in all situations", "No, attribute values can also use single quotes or be unquoted if they have no spaces", "Only if the value contains numbers", "Double quotes are invalid; single quotes must be used"], correctIndex: 1, explanation: "HTML attribute values can use double quotes, single quotes, or no quotes (if the value contains no spaces or special characters). Double quotes are the universal convention and safest choice." },
          { question: "What does the 'title' attribute do?", options: ["Sets the page title in the browser tab", "Creates a tooltip that appears when a user hovers over the element", "Specifies the heading level of the element", "Defines the element's role in accessibility"], correctIndex: 1, explanation: "The title attribute creates a tooltip — a small popup label that appears when the user hovers over the element. It provides supplementary information without cluttering the page." },
          { question: "What does the 'href' attribute specify on an <a> tag?", options: ["The height and resolution for the link's visual styling", "The URL or path that the link navigates to when clicked", "The horizontal reference point for element positioning", "The element's history reference in the browser"], correctIndex: 1, explanation: "href (HyperText Reference) on an <a> tag specifies the destination URL: <a href='https://example.com'>Click here</a>. Without href, the link does not navigate anywhere." },
          { question: "What does the 'src' attribute do?", options: ["Sets a source language for the content", "Specifies the file path or URL for an image, script, or media element", "Stands for 'source referer' and tracks link origins", "Controls the element's styling source"], correctIndex: 1, explanation: "src (source) specifies the file path or URL for elements that reference external files: <img src='photo.jpg'>, <script src='app.js'>. Without it, the media element has no content to display." },
          { question: "What is the 'style' attribute used for?", options: ["Linking to an external CSS stylesheet", "Defining the element's JavaScript behavior", "Applying inline CSS styles directly to a single element", "Setting the page's global font style"], correctIndex: 2, explanation: "The style attribute applies inline CSS directly: <p style='color: red; font-size: 18px;'>. It is generally avoided in favor of external stylesheets because it mixes presentation with structure and is hard to maintain." },
          { question: "What does the 'lang' attribute specify?", options: ["The programming language used on the page", "The human language of the element's content", "The CSS language version (CSS2 vs CSS3)", "The HTML version being used"], correctIndex: 1, explanation: "The lang attribute specifies the human language of content: <html lang='en'> or <p lang='fr'>. This helps screen readers use correct pronunciation and search engines index content appropriately." },
          { question: "Can you add your own custom attributes to HTML elements?", options: ["No, only predefined HTML attributes are allowed", "Yes, using the data-* prefix for custom data attributes", "Yes, any attribute name is valid in HTML5", "Only inside <div> elements"], correctIndex: 1, explanation: "HTML5 introduced data-* attributes for storing custom data: <div data-user-id='42' data-role='admin'>. These are valid, accessible to JavaScript, and do not affect rendering." },
          { question: "What is the correct format for a data attribute?", options: ["custom-attr='value'", "x-data-attr='value'", "data-anything='value'", "_data-anything='value'"], correctIndex: 2, explanation: "Custom data attributes follow the format data-name='value'. The name must start with 'data-' followed by at least one letter. Example: <article data-id='101' data-author='jane'>." },
          { question: "What happens if you give two elements the same id?", options: ["The browser crashes", "The page will not render any elements", "The HTML is invalid — browsers may behave unpredictably, and JS/CSS targeting may fail", "Both elements will be styled identically automatically"], correctIndex: 2, explanation: "Duplicate IDs violate the HTML specification. While browsers may still render the page, CSS may only style the first instance, and JavaScript's getElementById() returns only the first match — causing bugs." },
          { question: "What does aria-label do, and why is it important?", options: ["It labels images for search engines only", "It provides an accessible name for elements that screen readers announce — important when visual labels are absent", "It assigns a CSS label class to the element", "It creates a visible text label above form inputs"], correctIndex: 1, explanation: "aria-label provides a text description of an element for screen readers when a visible text label is absent or insufficient: <button aria-label='Close dialog'>✕</button>. Critical for accessibility." },
          { question: "Can attribute values contain spaces?", options: ["No, spaces are always invalid in attribute values", "Yes, as long as the value is wrapped in quotes", "Only in the class attribute (for multiple classes)", "Yes, but only single quotes can wrap values with spaces"], correctIndex: 1, explanation: "Attribute values can contain spaces if wrapped in quotes: class='primary button'. The class attribute specifically uses spaces to separate multiple class names. All attributes accept spaced values when quoted." }
        ]
      }
    ]
  },

  // ===========================
  // LESSON 3 – HTML Links, Images & Media
  // ===========================
  {
    id: "lesson-3",
    title: "Lesson 3 – HTML Links, Images & Media",
    topics: [
      {
        id: "topic-3-1",
        title: "Creating Hyperlinks",
        explanation: `Hyperlinks are what make the web a web — the ability to click text or images and navigate to another location. Without links, every webpage would be an isolated island. The anchor element, <a>, is how you create hyperlinks in HTML.

The most important attribute of <a> is href (HyperText Reference). Its value is the URL or path you want to navigate to when the link is clicked.

External links point to another website: <a href="https://google.com">Go to Google</a>. Notice the full URL including https://.

Internal links point to other pages within your own website: <a href="/about">About Us</a>. You only need the path, not the full URL.

The target attribute controls where the link opens. target="_blank" opens the link in a new browser tab. If you use target="_blank", best practice is to also add rel="noopener noreferrer" for security reasons — this prevents the new tab from accessing the original page's window object.

You can also link to email addresses using mailto: <a href="mailto:hello@example.com">Email Us</a>. Clicking this opens the user's default email client with the address pre-filled.

Links can wrap more than just text — you can wrap an image in an <a> tag to make the image clickable.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Hyperlinks</title>
  </head>
  <body>
    <h1>Types of Hyperlinks</h1>

    <!-- External link: opens same tab -->
    <p><a href="https://developer.mozilla.org">Visit MDN Web Docs</a></p>

    <!-- External link: opens new tab (with security attributes) -->
    <p>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        Open GitHub in New Tab
      </a>
    </p>

    <!-- Internal link: page within the same site -->
    <p><a href="/about">Go to About Page</a></p>

    <!-- Email link -->
    <p><a href="mailto:hello@example.com">Send us an email</a></p>

    <!-- Phone link (on mobile devices) -->
    <p><a href="tel:+14155551234">Call Us: +1 (415) 555-1234</a></p>

    <!-- Link that scrolls to an element with id="section-2" on this page -->
    <p><a href="#section-2">Jump to Section 2</a></p>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Create a Navigation Links List",
            description: "Create an unordered list containing three navigation links: one external link (to your favorite website), one email link, and one phone link. Wrap each in a <li> element.",
            hint: "Use <ul> with <li> for each link. External links need full https:// URLs. Email links use mailto:, phone links use tel:."
          },
          {
            title: "Exercise 2 – Open Links in New Tabs Safely",
            description: "Create a list of three external links, each configured to open in a new tab with the proper security attributes. Test each one in your browser.",
            hint: "Add target='_blank' rel='noopener noreferrer' to each <a> tag for secure new-tab links."
          },
          {
            title: "Exercise 3 – Clickable Image Link",
            description: "Wrap an <img> tag inside an <a> tag so that clicking the image navigates to a website. The image should link to the website's homepage.",
            hint: "The pattern is: <a href='URL'><img src='image.jpg' alt='description'></a>. The entire image becomes clickable."
          }
        ],
        quiz: [
          { question: "What HTML element creates a hyperlink?", options: ["<link>", "<href>", "<a>", "<url>"], correctIndex: 2, explanation: "The <a> element (anchor element) creates hyperlinks. The destination is specified in its href attribute." },
          { question: "What does 'href' stand for?", options: ["Hyper Reference File", "HyperText Reference", "HTML Resource File", "Hyperlink Redirect Flow"], correctIndex: 1, explanation: "href stands for HyperText Reference — the attribute that specifies where the link points to, whether a URL, file path, email, or page anchor." },
          { question: "What does target='_blank' do on a link?", options: ["Opens the link in a new window maximized to full screen", "Opens the link in a new browser tab", "Makes the link target a specific element on the page", "Creates a blank, unstyled link"], correctIndex: 1, explanation: "target='_blank' causes the link to open in a new browser tab (or window, depending on browser settings). Without this attribute, links open in the current tab." },
          { question: "Why should you add rel='noopener noreferrer' when using target='_blank'?", options: ["To improve the link's visual styling", "For security — it prevents the new tab from accessing the original page through JavaScript", "To force the link to open in a new window instead of a tab", "It is required by the HTML specification for all external links"], correctIndex: 1, explanation: "rel='noopener noreferrer' prevents a security vulnerability: without it, the new tab can access the parent page's window object via window.opener, potentially allowing malicious scripts." },
          { question: "How do you create a link to an email address?", options: ["<a href='email:user@example.com'>", "<a href='send:user@example.com'>", "<a href='mailto:user@example.com'>", "<email>user@example.com</email>"], correctIndex: 2, explanation: "Email links use the mailto: scheme in href: <a href='mailto:user@example.com'>Email us</a>. When clicked, this opens the user's default email client with the address pre-filled." },
          { question: "What is the difference between an internal and external link?", options: ["Internal links are faster; external links are slower", "Internal links point to pages within the same website; external links point to different websites", "Internal links use id attributes; external links use class attributes", "Internal links use http://; external links must use https://"], correctIndex: 1, explanation: "Internal links navigate within the same site and can use relative paths (/about). External links point to different websites and require full absolute URLs (https://example.com)." },
          { question: "What does <a href='#section-id'> do?", options: ["Creates an external link to a site called section-id", "Navigates to an element on the same page with id='section-id'", "Creates a link that opens a JavaScript alert", "Links to a CSS class named section-id"], correctIndex: 1, explanation: "The # prefix creates an anchor link — it scrolls the page to the element with the matching id attribute. This is how Table of Contents links work on long pages." },
          { question: "Can an image be wrapped inside a link tag?", options: ["No, only text can be wrapped in <a> tags", "Yes, wrapping <img> in <a> makes the entire image clickable", "Only if the image has a class='link' attribute", "Only if the link uses target='_blank'"], correctIndex: 1, explanation: "Yes! <a href='https://example.com'><img src='photo.jpg' alt='Click me'></a> makes the image a clickable link. This is common for clickable logos and image galleries." },
          { question: "What happens if you omit the href attribute from an <a> tag?", options: ["The browser throws an error", "The anchor renders as text with no link behavior", "The link navigates to the current page by default", "The link navigates to the homepage"], correctIndex: 1, explanation: "An <a> tag without href (or with an empty href) renders as text without link styling or behavior. It is still a valid anchor element but acts as a placeholder." },
          { question: "What does tel: do in a link href?", options: ["It translates the linked page into another language", "It creates a phone call link — on mobile, clicking it opens the dialer", "It tests the link for broken URLs", "It links to a telephone directory API"], correctIndex: 1, explanation: "<a href='tel:+1234567890'> creates a phone link. On mobile devices, clicking it opens the phone dialer with the number pre-filled. On desktops, it may open a calling app or do nothing." },
          { question: "What is the default link color in most browsers?", options: ["Black text with underline", "Blue text with underline", "Red text without underline", "Green text with bold weight"], correctIndex: 1, explanation: "Browsers default to blue underlined text for unvisited links. Visited links turn purple, and active (during click) links turn red. All of these can be overridden with CSS." },
          { question: "What attribute on <a> makes a link open in the same tab (the default)?", options: ["target='_self'", "target='_same'", "target='_current'", "No attribute needed — same tab is the default behavior"], correctIndex: 3, explanation: "Links open in the same tab by default — no attribute is needed. If you want to explicitly set same-tab behavior (useful when overriding other targets), you can use target='_self'." },
          { question: "What is a 'broken link'?", options: ["A link with incorrect CSS styling", "A link whose href points to a resource that no longer exists", "A link with invalid HTML syntax", "A link that uses http:// instead of https://"], correctIndex: 1, explanation: "A broken link is one that navigates to a URL that returns an error (typically 404 Not Found). This happens when pages are deleted or URLs change without redirect setup." },
          { question: "What should descriptive link text communicate?", options: ["How fast the link loads", "Where the link goes — what the user will find if they click it", "The developer who created the link", "The link's CSS class names"], correctIndex: 1, explanation: "Good link text describes the destination: 'Read the HTML guide' instead of 'Click here'. Screen readers read links out of context, so descriptive text is essential for accessibility." },
          { question: "What does 'Click here' as link text cause for accessibility?", options: ["No accessibility impact", "Screen reader users who navigate by links hear 'Click here' with no context about the destination", "It causes browsers to open links in a new tab", "It makes the link invalid HTML"], correctIndex: 1, explanation: "'Click here' as link text is an accessibility anti-pattern. Screen readers can navigate between links without reading surrounding text, so 'Click here' provides no information about the destination." },
          { question: "Can you use JavaScript in an href attribute?", options: ["No, href only accepts URLs", "Yes, using javascript: void(0) or javascript: functionName()", "Only in external script files", "Only if the page uses XHTML"], correctIndex: 1, explanation: "href='javascript:void(0)' or href='javascript:someFunction()' is valid but generally discouraged. For button-like behavior, use <button> with event listeners instead of abusing <a> for non-navigation actions." },
          { question: "What does the download attribute on <a> do?", options: ["Forces the link to download the linked file instead of navigating to it", "Sets the download speed limit for the file", "Makes the browser cache the linked file permanently", "Activates a custom download animation"], correctIndex: 0, explanation: "<a href='file.pdf' download> tells the browser to download the file rather than opening it in the browser. You can also specify a filename: download='my-report.pdf'." },
          { question: "What is a relative link versus an absolute link?", options: ["Relative links are less important; absolute links point to critical pages", "Relative links omit the protocol/domain; absolute links include the full URL", "Relative links use # and absolute links use http://", "They are the same thing — just different naming conventions"], correctIndex: 1, explanation: "Absolute links include the full URL: https://example.com/page. Relative links specify a path relative to the current location: /about or ../contact. Relative links are preferred for internal links." },
          { question: "What does <a href='/'> link to?", options: ["The current page", "The website's homepage or root directory", "A file named '/' in the current directory", "The browser's default home page"], correctIndex: 1, explanation: "<a href='/'> links to the root of the current website — the homepage. This is the standard way to create a 'go home' link in navigation menus." },
          { question: "What is the rel attribute on a link used for?", options: ["Setting the link's visual role on the page", "Describing the relationship between the current document and the linked document", "Requiring authentication before following the link", "Defining the link's CSS relative positioning"], correctIndex: 1, explanation: "The rel (relationship) attribute describes how the linked resource relates to the current document. Common values: noopener, noreferrer (security for _blank), nofollow (SEO), stylesheet (for CSS <link> tags)." },
          { question: "If a URL has a # at the end (like page.html#), what does clicking it do?", options: ["Navigates to the page's footer element", "Stays on the current page or scrolls to the top if already there", "Opens a new browser window", "Logs an error to the browser console"], correctIndex: 1, explanation: "An href ending in # (or just #) is an anchor with no target id. Clicking it typically scrolls back to the top of the page or does nothing if already at the top." }
        ]
      },
      {
        id: "topic-3-2",
        title: "Absolute vs Relative URLs",
        explanation: `When you specify URLs in HTML — for links, images, scripts, or stylesheets — you choose between absolute URLs and relative URLs. Choosing the right one affects how portable and maintainable your code is.

An absolute URL contains the complete path including protocol, domain, and path: https://www.example.com/images/logo.png. This URL works from anywhere on the internet because it is fully self-contained. Use absolute URLs when linking to external websites.

A relative URL specifies a path relative to the current document's location. There are three types:

Root-relative paths start with /: /images/logo.png. This means "starting from the root of this website", regardless of where the current page is. The most reliable type of relative URL for internal links.

Document-relative paths do not start with /: images/logo.png or ../about.html. These paths are relative to the current page's location. A single dot (.) means "current directory". Two dots (..) mean "go up one directory level".

Path-relative syntax: if your page is at /products/laptops.html and you use ../images/logo.png, the browser looks for /images/logo.png (going up one level from /products/).

Use relative URLs for all internal links and assets — they allow you to move your entire site to a different domain without updating every link. Use absolute URLs only for external resources.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Absolute vs Relative URLs</title>
  </head>
  <body>
    <h1>URL Types in HTML</h1>

    <!-- Absolute URL: full path with protocol and domain -->
    <p>
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
        Absolute: MDN HTML Docs
      </a>
    </p>

    <!-- Root-relative URL: starts from website root -->
    <p>
      <a href="/about">Root-relative: /about page</a>
    </p>

    <!-- Document-relative URL: relative to current file's location -->
    <p>
      <a href="contact.html">Document-relative: contact.html in same folder</a>
    </p>

    <!-- Going up one directory -->
    <p>
      <a href="../index.html">Go up one directory to index.html</a>
    </p>

    <!-- Image with absolute URL (external) -->
    <img
      src="https://via.placeholder.com/300x200"
      alt="External placeholder image"
    />

    <!-- Image with root-relative URL (internal) -->
    <img src="/images/hero.jpg" alt="Internal hero image" />
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Identify URL Types",
            description: "Look at these URLs and categorize each as absolute, root-relative, or document-relative: (1) https://google.com, (2) /blog/post, (3) images/photo.jpg, (4) ../css/style.css, (5) mailto:test@test.com. Write your answers as comments in your HTML file.",
            hint: "Absolute: includes https:// and domain. Root-relative: starts with /. Document-relative: does not start with / or protocol."
          },
          {
            title: "Exercise 2 – Convert URLs",
            description: "Given a page at /products/shirts/blue.html, write the correct relative URL to reach: (1) /products/pants/red.html, (2) /images/logo.png, (3) /index.html",
            hint: "From /products/shirts/: to reach /products/pants/ you go up one level (../pants/). To reach /images/ you go up two levels (../../images/)."
          },
          {
            title: "Exercise 3 – Build a Navigation",
            description: "Create a simple navigation bar with links to: Home (/), Products (/products), About (/about), and an external link to your favorite resource. Use the most appropriate URL type for each.",
            hint: "Internal pages should use root-relative paths starting with /. External sites need full https:// URLs."
          }
        ],
        quiz: [
          { question: "Which of these is an absolute URL?", options: ["/images/logo.png", "../style.css", "contact.html", "https://example.com/about"], correctIndex: 3, explanation: "An absolute URL includes the full protocol (https://), domain, and path. https://example.com/about is complete and works from anywhere. The others are relative paths." },
          { question: "Which of these is a root-relative URL?", options: ["https://example.com/about", "/about", "../about.html", "about.html"], correctIndex: 1, explanation: "A root-relative URL starts with / and is relative to the website's root: /about means the /about path on the current website. It works regardless of where the current page is located." },
          { question: "What does .. mean in a relative URL path?", options: ["Stay in the current directory", "Go up one directory level", "Navigate to the root of the website", "Create a new directory"], correctIndex: 1, explanation: ".. means 'parent directory' — going up one level. ../images/photo.jpg from /products/page.html resolves to /images/photo.jpg." },
          { question: "From a page at /blog/2024/post.html, what does ../index.html resolve to?", options: ["/blog/2024/index.html", "/blog/index.html", "/index.html", "/blog/2024/../index.html"], correctIndex: 1, explanation: "From /blog/2024/post.html, going up one level (..) takes you to /blog/2024/. Adding index.html gives /blog/2024/index.html? No — ../ goes up one directory. From /blog/2024/ going .. gives /blog/. So ../index.html = /blog/index.html." },
          { question: "When should you use absolute URLs?", options: ["For all links — internal and external", "Only for external links pointing to other websites", "Only for image src attributes", "Only for stylesheet links"], correctIndex: 1, explanation: "Use absolute URLs when linking to external websites (different domain). For internal links and assets, relative URLs are preferred because they work regardless of what domain the site is hosted on." },
          { question: "Why are relative URLs preferred for internal links?", options: ["Relative URLs load faster than absolute URLs", "Relative URLs allow you to move the site to a new domain without updating all links", "Relative URLs are more secure than absolute URLs", "Search engines prefer relative URLs for internal linking"], correctIndex: 1, explanation: "Relative URLs are portable — if you move your site from example.com to mysite.com, all relative URLs still work. Absolute internal links would all need updating." },
          { question: "What does a single dot (.) represent in a relative URL?", options: ["The parent directory", "The root of the website", "The current directory", "A hidden file or folder"], correctIndex: 2, explanation: "A single dot (.) refers to the current directory. ./images/photo.jpg is the same as images/photo.jpg — both refer to the images folder in the same directory as the current page." },
          { question: "What does /images/logo.png refer to?", options: ["The images folder in the same directory as the current file", "The images folder at the root of the website, regardless of current page location", "A file called images/logo.png on the user's desktop", "An external image from a CDN"], correctIndex: 1, explanation: "The leading / makes this a root-relative path — it always refers to /images/logo.png on the current website, regardless of where the linking page is located in the file structure." },
          { question: "If an image's src points to a file that does not exist, what does the browser show?", options: ["A blank white space with no indication", "The alt text and a broken image icon", "An error page instead of the full page", "The last successfully loaded image"], correctIndex: 1, explanation: "When an image fails to load (wrong path, deleted file, network error), browsers display a broken image icon and show the alt attribute text. This is why descriptive alt text is essential." },
          { question: "What is the URL for a file called style.css inside a css/ folder at the same level as the current HTML file?", options: ["/style.css", "../css/style.css", "css/style.css", "//css/style.css"], correctIndex: 2, explanation: "css/style.css is a document-relative path. If the HTML file and the css/ folder are at the same directory level, this correctly points to the style.css file inside that folder." },
          { question: "What happens to internal absolute URLs if you move your site to a new domain?", options: ["They automatically update to the new domain", "They break — they still point to the old domain", "They redirect automatically via DNS", "They fall back to relative URLs"], correctIndex: 1, explanation: "Internal absolute URLs (like https://olddomain.com/about) will break when the site moves to newdomain.com — they still point to the old address. Relative URLs (/about) work regardless of domain." },
          { question: "In a path like ../../images/photo.jpg, how many directory levels up does it go?", options: ["One level", "Two levels", "Three levels", "It navigates to the root"], correctIndex: 1, explanation: "Each ../ goes up one directory level. ../../ goes up two levels. From /projects/web/page.html, ../../images/ would resolve to /images/." },
          { question: "What does href='#' do in a link?", options: ["Links to an element with an empty id", "Links to an external page named #", "Creates a link that navigates to the top of the current page (or does nothing)", "Links to the previous page in browser history"], correctIndex: 2, explanation: "href='#' is an anchor with no specified target. It typically scrolls to the top of the current page. It is sometimes used as a placeholder for links that are not yet implemented." },
          { question: "What is a protocol-relative URL and is it recommended?", options: ["A URL that works with any protocol: //example.com/file — No longer recommended; use explicit https://", "A URL with no file path: https://example.com — Recommended for all pages", "A URL without a domain: /page — Highly recommended for all internal links", "A URL using ftp:// — Recommended for file transfers only"], correctIndex: 0, explanation: "Protocol-relative URLs (//example.com/file) once let browsers use http:// or https:// based on the parent page. This is now discouraged — always specify https:// explicitly." },
          { question: "For a CSS file, which tag is used and where does it go?", options: ["<style src='style.css'> in the body", "<link rel='stylesheet' href='style.css'> in the head", "<css href='style.css'> in the head", "<script src='style.css'> in the body"], correctIndex: 1, explanation: "CSS files are linked with <link rel='stylesheet' href='path/to/style.css'> inside the <head> element. The rel='stylesheet' tells the browser this link is a stylesheet." },
          { question: "What tool helps verify that all your links and image paths are working correctly?", options: ["The browser's spelling checker", "A link checker tool or browser dev tools Network tab showing 404 errors", "The HTML validator only", "The CSS inspector"], correctIndex: 1, explanation: "Browser DevTools (F12) Network tab shows which resources failed to load (404 errors). Online tools like W3C Link Checker can audit all links on your page for broken URLs." },
          { question: "What does the base <base href=''> tag do?", options: ["Sets the page's primary font", "Sets a base URL that all relative links on the page are resolved against", "Creates a base-level heading on the page", "Defines the page's database connection"], correctIndex: 1, explanation: "<base href='https://example.com/'> sets a base URL. All relative links are then resolved relative to this URL instead of the actual page URL. Useful but can cause confusion — use with care." },
          { question: "Is https://example.com and http://example.com the same URL?", options: ["Yes, they are identical — the protocol makes no difference", "No — https uses encryption; http does not. They may serve different content", "Only if they resolve to the same IP", "Yes, all modern servers redirect http to https automatically"], correctIndex: 1, explanation: "https:// and http:// are different protocols. While most servers redirect http to https, they are not inherently the same URL. Always use https:// in absolute links for security." },
          { question: "What is 'path traversal' and why should you be careful with .. in server-side code?", options: ["A CSS layout technique using relative positioning", "An attack where ../.. sequences in URLs try to access files outside the intended directory", "A method of linking pages in a nested folder structure", "The process of resolving relative URLs to absolute paths"], correctIndex: 1, explanation: "Path traversal attacks use ../ sequences to try to access files outside allowed directories (e.g., ../../etc/passwd). This is a server-side vulnerability — browsers handle client-side paths safely, but server code must sanitize paths." },
          { question: "What is the difference between / and // at the start of a URL?", options: ["No difference — they are interchangeable", "/ is root-relative (current website root); // is protocol-relative (matches current page's protocol)", "/ means current directory; // means parent directory", "// is absolute; / is relative"], correctIndex: 1, explanation: "/ is root-relative (the root of the current website). // is protocol-relative, inheriting the current page's protocol (http or https) — this is legacy and not recommended. Always use explicit https://." }
        ]
      },
      {
        id: "topic-3-3",
        title: "Adding Images",
        explanation: `Images are fundamental to modern web pages. HTML uses the <img> element — a self-closing (void) element — to embed images. Unlike most HTML elements, <img> has no content between tags because the image itself IS the content.

The two required attributes are src (source) and alt (alternative text). src specifies where the image file is located — either a relative path to a file on your server or an absolute URL for an external image. alt provides a text description of the image.

HTML supports several image formats: JPEG/JPG is best for photographs and complex images with many colors. PNG supports transparency and is better for logos, icons, and images with text. GIF supports simple animations and is limited to 256 colors. SVG is a vector format — images defined by math rather than pixels, meaning they scale perfectly at any size. WebP is Google's modern format that offers excellent compression for both photos and graphics — increasingly supported by all browsers.

When choosing an image format: use JPEG for photos, PNG for images needing transparency, SVG for icons and logos, and WebP for optimal compression.

Browsers load images asynchronously after the main HTML. Images that are not properly sized can cause Cumulative Layout Shift (CLS) — the page "jumps" when images finally load. Specifying width and height attributes helps browsers reserve space.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Adding Images</title>
  </head>
  <body>
    <h1>Images in HTML</h1>

    <!-- Basic image with required src and alt -->
    <img src="photo.jpg" alt="A mountain landscape at sunset" />

    <!-- Image with explicit dimensions (helps prevent layout shift) -->
    <img
      src="avatar.png"
      alt="User profile photo"
      width="150"
      height="150"
    />

    <!-- External image from a URL -->
    <img
      src="https://picsum.photos/400/300"
      alt="A random placeholder image from Lorem Picsum"
    />

    <!-- SVG image: scalable at any size -->
    <img src="logo.svg" alt="Company logo" width="200" />

    <!-- Figure with caption (semantic image container) -->
    <figure>
      <img src="diagram.png" alt="A flowchart showing how HTTP requests work" />
      <figcaption>Figure 1: The HTTP request-response cycle</figcaption>
    </figure>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Add Images with Alt Text",
            description: "Add three images to your page using URLs from picsum.photos (format: https://picsum.photos/400/250). Give each one a descriptive alt text and a meaningful title attribute.",
            hint: "Use <img src='https://picsum.photos/400/250' alt='Your description here' />. Change the numbers for different sizes."
          },
          {
            title: "Exercise 2 – Figure and Caption",
            description: "Wrap one of your images in a <figure> element and add a <figcaption> describing what the image shows. This is the semantic way to associate an image with its caption.",
            hint: "<figure><img src='...' alt='...' /><figcaption>Caption text here</figcaption></figure>"
          },
          {
            title: "Exercise 3 – Image Gallery",
            description: "Create a simple image gallery with 4 images arranged in a row (they will wrap on smaller screens). Use consistent sizes (width='200') for visual consistency. Include descriptive alt text for each.",
            hint: "Place four <img> elements one after another. Add width='200' to each. They will flow inline by default."
          }
        ],
        quiz: [
          { question: "What element is used to embed images in HTML?", options: ["<image>", "<picture>", "<img>", "<src>"], correctIndex: 2, explanation: "<img> is the HTML element for embedding images. It is a void element with no closing tag." },
          { question: "Is <img> a self-closing element?", options: ["No, it requires </img>", "Yes, it is a void element with no closing tag", "Only when used with src attribute", "Only when loading external images"], correctIndex: 1, explanation: "<img> is a void element — it has no closing tag. Both <img> and <img /> are valid in HTML5. It cannot have content between opening and closing tags." },
          { question: "Which two attributes are required for every <img> element?", options: ["src and href", "src and alt", "alt and title", "width and height"], correctIndex: 1, explanation: "src specifies where the image file is, and alt provides alternative text for accessibility. Both are required for valid, accessible HTML." },
          { question: "What image format is best for photographs?", options: ["PNG", "SVG", "GIF", "JPEG/JPG"], correctIndex: 3, explanation: "JPEG is optimized for photographs — it uses lossy compression that significantly reduces file size while maintaining good visual quality for complex, colorful images." },
          { question: "What image format supports transparency?", options: ["JPEG", "GIF (limited) and PNG", "SVG (only)", "BMP"], correctIndex: 1, explanation: "PNG supports full transparency (alpha channel). GIF supports binary transparency (a pixel is either fully transparent or fully opaque). SVG is vector-based and also supports transparency." },
          { question: "What is a major advantage of SVG images over PNG or JPEG?", options: ["SVG files are smaller for all image types", "SVG images scale perfectly at any size without pixelating", "SVG supports more colors than PNG", "SVG loads faster than JPEG always"], correctIndex: 1, explanation: "SVG (Scalable Vector Graphics) are defined by mathematical equations, not pixels. They scale perfectly to any size — from a favicon to a billboard — without any pixelation or quality loss." },
          { question: "What is WebP?", options: ["A web protocol for image delivery", "A modern image format developed by Google with better compression than JPEG/PNG", "A vector image format similar to SVG", "A GIF replacement that supports HD animation"], correctIndex: 1, explanation: "WebP is a modern image format by Google that offers superior compression (smaller file sizes) compared to JPEG and PNG while maintaining similar or better quality. Well-supported in all modern browsers." },
          { question: "What is CLS (Cumulative Layout Shift) and how do images relate?", options: ["A browser caching technique for faster image loading", "A layout instability metric — images without specified dimensions cause page jumps as they load", "A color system for web images", "A compression standard for image optimization"], correctIndex: 1, explanation: "CLS measures how much page content moves around as it loads. Images without width/height cause layout shift — the page 'jumps' when the browser finally knows the image dimensions." },
          { question: "What does specifying width and height on an <img> prevent?", options: ["The image from being right-clicked and saved", "Layout shift — the browser reserves space before the image loads", "The image from scaling beyond those exact dimensions in CSS", "External images from being loaded"], correctIndex: 1, explanation: "width and height attributes tell the browser the image's aspect ratio before it loads, allowing it to reserve exactly the right space. This prevents the jarring 'layout jump' when images finish loading." },
          { question: "What is the <figure> element used for?", options: ["Drawing shapes on a canvas", "Semantically grouping a media element (image, video, code) with its caption", "Specifying the size of an image container", "Creating a figure tag within a table"], correctIndex: 1, explanation: "<figure> is a semantic container for self-contained media — images, diagrams, code snippets. It is paired with <figcaption> for the caption. The figure could theoretically be moved to a different part of the page without losing meaning." },
          { question: "What does <figcaption> do?", options: ["Adds a caption below or above a <figure> element", "Captions all images on the page automatically", "Creates a title attribute for the figure", "Applies bold formatting to the surrounding figure"], correctIndex: 0, explanation: "<figcaption> provides a caption for a <figure> element. It can be placed before or after the content inside <figure>. Browsers typically display it below the image." },
          { question: "What does loading='lazy' on an <img> element do?", options: ["Loads the image instantly with aggressive caching", "Delays loading the image until it is near the viewport — improves page performance", "Creates an animated loading indicator over the image", "Forces the browser to use a compressed version of the image"], correctIndex: 1, explanation: "loading='lazy' implements lazy loading — the image is not fetched until it is about to enter the user's viewport. This dramatically speeds up initial page load for pages with many images." },
          { question: "What file format should you use for a company logo that needs to look sharp on all screen sizes?", options: ["JPEG — best quality for complex visuals", "GIF — supports simple animations", "SVG — vector format that scales perfectly at any size", "PNG — best compression for logos"], correctIndex: 2, explanation: "SVG is ideal for logos because it is vector-based and scales without quality loss from tiny (favicon) to large (banner). CSS and JavaScript can also manipulate SVG elements directly." },
          { question: "Can you make an image a hyperlink?", options: ["No, links can only wrap text", "Yes, wrap the <img> tag inside an <a> tag", "Only with JavaScript — not with HTML alone", "Only if the image has an id attribute"], correctIndex: 1, explanation: "Yes! <a href='https://example.com'><img src='logo.png' alt='Go home'></a> makes the entire image clickable as a link. This is how clickable logos and image buttons are made." },
          { question: "What is the difference between <img src='photo.jpg'> and <img src='https://example.com/photo.jpg'>?", options: ["No difference — browsers treat them identically", "The first loads from your own server (relative path); the second loads from an external URL", "The first is for JPEG only; the second works for all formats", "The second creates a link to the image; the first embeds it"], correctIndex: 1, explanation: "photo.jpg is a relative path — the browser looks for it on your own server relative to the current page. https://example.com/photo.jpg loads from an external server. If the external server is slow or down, your image won't load." },
          { question: "What happens when an image's src path is incorrect?", options: ["The browser shows a white rectangle", "The browser displays a broken image icon and the alt text", "The whole page crashes", "The browser automatically finds an alternative image"], correctIndex: 1, explanation: "When an image cannot load, browsers display a broken image icon (usually a small icon) along with the alt attribute text. This is why meaningful alt text is critical." },
          { question: "What does the title attribute on an <img> display?", options: ["The image's caption below it", "A tooltip text when hovering over the image", "A text alternative for screen readers (same as alt)", "The image's file name in the browser status bar"], correctIndex: 1, explanation: "The title attribute on <img> creates a tooltip visible when hovering. However, it is NOT a substitute for alt — many accessibility tools ignore title. Use alt for accessibility, title for supplementary hover info." },
          { question: "What is the correct way to set an image to 50% width of its container using HTML attributes?", options: ["width='50%'", "width='0.5'", "Use CSS instead — width attribute only accepts pixel values in HTML5", "size='50percent'"], correctIndex: 2, explanation: "HTML's width and height attributes in HTML5 should only specify pixel dimensions (width='200'). For percentage-based or responsive sizing, use CSS: img { width: 50%; }." },
          { question: "What is meant by 'decorative images' and how should they be handled?", options: ["Images used only for advertising — they should be marked with data-ad='true'", "Images that are purely aesthetic with no informational value — use alt='' so screen readers skip them", "Images with many colors and visual effects — use SVG instead", "All images not featuring people — they should have generic alt text"], correctIndex: 1, explanation: "Decorative images add no information for screen reader users. Use alt='' (empty alt) so screen readers skip them entirely rather than announcing them. Never omit alt completely — that is invalid HTML." },
          { question: "What is the <picture> element used for?", options: ["A canvas element for drawing images with JavaScript", "Providing multiple image sources for different screen sizes or formats — responsive images", "Creating a picture frame border around images", "Embedding video as an alternative to the <video> element"], correctIndex: 1, explanation: "<picture> lets you provide multiple image sources: <picture><source srcset='image.webp' type='image/webp'><img src='image.jpg' alt='...'></picture>. Browsers pick the best format/size they support." }
        ]
      },
      {
        id: "topic-3-4",
        title: "Image Attributes (alt, width, height)",
        explanation: `Three image attributes deserve special attention because they significantly impact both user experience and accessibility: alt, width, and height.

The alt attribute (alternative text) is the most important image attribute. It serves three critical purposes. First, accessibility: screen readers read the alt text aloud to visually impaired users. A properly written alt text describes what the image shows in context. Second, SEO: search engines cannot see images but can read alt text. Well-written alt describes the image for Google Images and helps overall page SEO. Third, fallback: if the image fails to load, browsers display the alt text so users understand what should be there.

Writing good alt text: describe the image's content and purpose in the context of the surrounding content. For a photo of a red apple on a recipe page, "Red apple sliced into quarters" is much better than "apple" or "image". For decorative images that add no information, use empty alt: alt="". Never omit the alt attribute entirely — that is invalid HTML.

The width and height attributes control image dimensions. Specifying both in HTML (not just CSS) is important because browsers use these values to reserve space before the image downloads. Without them, every image loads with zero dimensions and then "jumps" to its full size — causing Cumulative Layout Shift (CLS), a key web performance metric.

Values are in pixels (no unit needed in HTML). Use CSS for responsive sizing — setting width="100%" in CSS while keeping the HTML attributes as the intrinsic dimensions maintains both performance and responsiveness.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Image Attributes</title>
  </head>
  <body>
    <h1>Image Attributes in Action</h1>

    <!-- Good alt text: describes the image specifically -->
    <img
      src="sunset.jpg"
      alt="Orange and pink sunset over the San Francisco Bay bridge"
      width="800"
      height="533"
    />

    <!-- Decorative image: empty alt so screen readers skip it -->
    <img
      src="divider.png"
      alt=""
      width="600"
      height="2"
    />

    <!-- Profile image with context-appropriate alt -->
    <img
      src="profile.jpg"
      alt="Jane Smith, CEO of Example Corp, smiling"
      width="150"
      height="150"
    />

    <!-- Lazy loading for performance -->
    <img
      src="below-fold.jpg"
      alt="An infographic about HTML history"
      width="700"
      height="400"
      loading="lazy"
    />
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Write Quality Alt Text",
            description: "Add three images using public URLs and write high-quality, descriptive alt text for each. Think about: what is in the image, what emotion or information it conveys, and what the user would miss without seeing it.",
            hint: "Alt text should be concise but descriptive: 'A brown tabby cat sleeping on a red couch' is better than 'cat' or 'photo of cat'."
          },
          {
            title: "Exercise 2 – Decorative Images",
            description: "Add a decorative divider line image (or any image used purely for aesthetics) and give it an empty alt attribute. Explain in a comment above the image why you chose an empty alt.",
            hint: "For decorative images: alt='' (empty alt, not omitting the attribute). A comment might say: <!-- Decorative only: no informational value for screen reader users -->"
          },
          {
            title: "Exercise 3 – Set Correct Dimensions",
            description: "Find or create three images with known dimensions. Add all three to your page with the correct width and height attributes matching the actual image dimensions. Add the loading='lazy' attribute to all images.",
            hint: "HTML width and height should match the actual image pixel dimensions. CSS can scale them separately. Both attributes together prevent layout shift."
          }
        ],
        quiz: [
          { question: "What are the three purposes of the alt attribute?", options: ["SEO, speed, and styling", "Accessibility (screen readers), fallback display (when image fails), and SEO", "Animation fallback, CSS backup, and database storage", "Language translation, image caching, and color adjustment"], correctIndex: 1, explanation: "The alt attribute serves three purposes: (1) Accessibility — screen readers read it to visually impaired users; (2) Fallback — shown when the image cannot load; (3) SEO — search engines use it to understand image content." },
          { question: "What should you write for the alt text of a decorative image?", options: ["'decorative' as the value", "Omit the alt attribute entirely", "An empty string: alt=''", "A detailed description regardless of decorative nature"], correctIndex: 2, explanation: "For decorative images (purely aesthetic, no informational value), use alt='' (empty alt). Screen readers skip images with empty alt. Never omit alt entirely — that is invalid HTML and causes screen readers to read the filename instead." },
          { question: "Why is specifying both width and height on <img> good for performance?", options: ["It prevents the image from scaling beyond those exact sizes", "It allows the browser to reserve space before the image loads, preventing layout shift", "It reduces the image's file size during download", "It tells the browser to load the image at a higher priority"], correctIndex: 1, explanation: "When you specify both width and height, the browser can calculate the aspect ratio and reserve exact space before the image downloads. This prevents Cumulative Layout Shift (CLS) — the jarring jump when images finally load." },
          { question: "What is Cumulative Layout Shift (CLS)?", options: ["A browser compression technique for images", "A measurement of how much page content unexpectedly shifts during loading", "A CSS animation technique for smooth image transitions", "A metric for measuring image loading speed"], correctIndex: 1, explanation: "CLS is a Core Web Vital metric measuring visual instability — how much page elements unexpectedly jump around during loading. Images without dimensions are a major cause of high CLS scores." },
          { question: "For an image of a team's CEO with a name tag, which alt text is best?", options: ["alt='image'", "alt='person'", "alt='CEO'", "alt='Sarah Chen, Chief Executive Officer of TechCorp, standing at a conference podium'"], correctIndex: 3, explanation: "Good alt text describes the image specifically and contextually. 'Sarah Chen, CEO of TechCorp' conveys identity and context. 'Image', 'person', and 'CEO' are too vague for users who cannot see the image." },
          { question: "What does loading='lazy' do on an image?", options: ["Prioritizes the image to load before the HTML is parsed", "Defers the image from loading until it is near the viewport, saving bandwidth", "Loads the image at a lower quality for faster initial display", "Creates a fade-in animation as the image loads"], correctIndex: 1, explanation: "loading='lazy' defers image loading until the user scrolls near the image. For pages with many images, this significantly improves initial load time since off-screen images are not downloaded immediately." },
          { question: "What is the difference between alt and title on an <img> element?", options: ["alt is for browsers; title is for search engines", "alt provides accessible description for screen readers and fallback; title provides a tooltip on hover", "alt controls image size; title controls image position", "They are identical — just use whichever you prefer"], correctIndex: 1, explanation: "alt is for accessibility and fallback — it is read by screen readers and shown when images fail. title creates a hover tooltip for supplementary information. alt is required; title is optional and not a substitute for alt." },
          { question: "If an image has alt='Photo', what is wrong with this alt text?", options: ["'Photo' is too long for alt text", "It is redundant — screen readers already announce the element as an image. Describe the image content instead", "Alt text cannot be a noun", "Nothing — 'Photo' is perfectly acceptable alt text"], correctIndex: 1, explanation: "Screen readers already announce the element as an image, so alt='Photo' or alt='Image of...' is redundant. Alt text should describe WHAT is in the image, not that it IS an image." },
          { question: "What units does the HTML width attribute use?", options: ["CSS units like px, em, or rem", "Pixels only (numeric values without a unit)", "Percentages only", "Points (pt) or inches (in)"], correctIndex: 1, explanation: "The HTML width and height attributes accept numeric values only, interpreted as pixels. For example: width='400'. For percentage-based or other CSS sizing, use the CSS width property instead." },
          { question: "Can you set an image's display dimensions larger than its actual file size?", options: ["No — images can only display at their native resolution", "Yes, but scaling up reduces quality (pixelation)", "Yes, and quality is maintained through browser upscaling algorithms", "Only for SVG images — raster images cannot be enlarged"], correctIndex: 1, explanation: "You can display a raster image (JPEG, PNG) larger than its native resolution, but it will appear pixelated or blurry. Always provide images at the intended display size or larger, and scale down with CSS." },
          { question: "What is the 'intrinsic size' of an image?", options: ["The size calculated by the browser for optimal display", "The actual pixel dimensions of the image file itself", "The size in the HTML width/height attributes", "The size after CSS transforms are applied"], correctIndex: 1, explanation: "Intrinsic size is the image's actual native dimensions — the pixel width and height baked into the file. HTML width/height attributes and CSS can change the display size without changing the intrinsic size." },
          { question: "For an icon image used as a bullet point in a list, what alt text is appropriate?", options: ["A detailed description of the icon design", "The file name of the icon", "An empty alt='' since it is decorative", "The word 'icon'"], correctIndex: 2, explanation: "Decorative icons (used as visual bullets, dividers, or purely aesthetic elements) should use alt='' so screen readers skip them. The surrounding text provides all necessary context." },
          { question: "What is the purpose of the srcset attribute on images?", options: ["Providing multiple source files for different screen densities or viewport widths", "Setting a fallback color when the image fails", "Specifying a source set of stylesheets for the page", "Listing multiple image formats for security verification"], correctIndex: 0, explanation: "srcset lets you provide multiple versions of an image: <img srcset='small.jpg 480w, large.jpg 1080w' src='fallback.jpg'>. Browsers choose the most appropriate version based on screen density and size." },
          { question: "What does object-fit: cover do to an image in CSS?", options: ["Stretches the image to exactly fill its container, ignoring aspect ratio", "Scales the image to fill the container while maintaining aspect ratio, cropping if needed", "Displays the image at its intrinsic size, ignoring the container dimensions", "Creates a cover overlay effect on the image"], correctIndex: 1, explanation: "object-fit: cover scales the image to fill the entire container while preserving its aspect ratio. Excess is cropped rather than squishing the image. Often used for hero images and card thumbnails." },
          { question: "How should you handle images that fail to load for users on slow connections?", options: ["Redirect them to a page without images", "Remove all images for mobile users", "Provide meaningful alt text and consider low-bandwidth alternatives using srcset", "Use JavaScript to show an alert when images fail"], correctIndex: 2, explanation: "Meaningful alt text ensures users understand what was supposed to appear. Using srcset to serve smaller images on slow connections, and lazy loading for below-fold images, further helps users with limited bandwidth." },
          { question: "What is the aspect-ratio CSS property used for with images?", options: ["Setting the image's color ratio between RGB channels", "Maintaining the image's width-to-height ratio as it is resized", "Controlling how the image aspect is affected by compression", "Setting the ratio of images to text on a page"], correctIndex: 1, explanation: "CSS aspect-ratio (e.g., aspect-ratio: 16/9) maintains the proportional relationship between width and height. Setting width and letting height auto-calculate via aspect-ratio prevents distortion." },
          { question: "Which attribute prevents an image from being dragged and dropped by users?", options: ["nodrag='true'", "draggable='false'", "readonly='true'", "lock='drag'"], correctIndex: 1, explanation: "draggable='false' prevents users from dragging an image. By default, images are draggable in browsers. This attribute is useful for preventing accidental image drags in web applications." },
          { question: "What happens when alt text is very long (like a full paragraph)?", options: ["Long alt text improves SEO scores linearly", "Screen readers read the full alt text, which may become burdensome — use short, descriptive text instead", "Browsers automatically truncate alt text beyond 50 characters", "Long alt text breaks the HTML spec and causes errors"], correctIndex: 1, explanation: "Screen readers read the entire alt text. Very long alt text (full paragraphs) becomes burdensome for screen reader users navigating image-heavy pages. Keep alt text concise and descriptive — a sentence or two at most." },
          { question: "For a graph or chart image, what should the alt text include?", options: ["Just the word 'chart' or 'graph'", "A description of what the chart shows — the key data points or trend it illustrates", "The chart's color scheme and visual style", "The JavaScript code used to generate the chart"], correctIndex: 1, explanation: "For data visualizations, alt text should describe the key insight or trend: 'Bar chart showing sales grew 40% from Q1 to Q4 2023'. Not just 'chart'. If data is complex, also consider a data table alternative." },
          { question: "What does crossorigin='anonymous' on an <img> element do?", options: ["Hides the image from anonymous users", "Enables CORS requests for the image, allowing certain cross-origin operations like canvas drawing", "Makes the image load without authentication", "Prevents the image from being indexed by search engines"], correctIndex: 1, explanation: "crossorigin='anonymous' enables CORS (Cross-Origin Resource Sharing) for the image. This is required to use cross-origin images in canvas operations (e.g., drawing the image and exporting the canvas) without security errors." }
        ]
      },
      {
        id: "topic-3-5",
        title: "Audio in HTML",
        explanation: `HTML5 introduced native audio support through the <audio> element, eliminating the need for Flash and external plugins that were previously required to play audio on websites.

The <audio> element works by specifying one or more audio source files. The browser plays the first format it supports. Adding the controls attribute gives users a built-in playback interface — a play/pause button, progress bar, and volume control.

The src attribute can go directly on the <audio> tag if you are providing a single file. For multiple format support (important for cross-browser compatibility), use nested <source> elements.

Why multiple formats? Different browsers historically supported different audio formats. MP3 (MPEG Audio Layer III) is the most widely supported format today and works in all modern browsers. OGG Vorbis is an open-source alternative supported by Firefox and Chrome. WAV is uncompressed and high quality but results in very large file sizes.

In practice today, MP3 alone is sufficient for most projects since all modern browsers support it. But including OGG as a fallback is still good practice.

Additional audio attributes: autoplay (starts playing automatically — most browsers block this without user interaction), loop (repeats continuously), muted (starts muted), and preload (controls how much the browser pre-downloads: none, metadata, or auto).

Always include text content between the opening and closing <audio> tags as a fallback for browsers that do not support HTML5 audio.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Audio</title>
  </head>
  <body>
    <h1>Audio in HTML</h1>

    <!-- Simple audio with controls -->
    <audio src="music.mp3" controls>
      Your browser does not support HTML audio.
    </audio>

    <!-- Multiple formats for broad compatibility -->
    <audio controls>
      <source src="music.mp3" type="audio/mpeg" />
      <source src="music.ogg" type="audio/ogg" />
      <p>Your browser does not support HTML5 audio. 
         <a href="music.mp3">Download the audio file</a>.
      </p>
    </audio>

    <!-- Autoplay + loop (muted is required for autoplay in most browsers) -->
    <audio autoplay loop muted>
      <source src="background-music.mp3" type="audio/mpeg" />
    </audio>

    <!-- Preloading metadata only for performance -->
    <audio controls preload="metadata">
      <source src="podcast-episode.mp3" type="audio/mpeg" />
    </audio>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Basic Audio Player",
            description: "Create an audio player using a public MP3 URL (try: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3). Add the controls attribute and include fallback text.",
            hint: "Use: <audio src='URL' controls>Your browser does not support audio.</audio>"
          },
          {
            title: "Exercise 2 – Multiple Source Formats",
            description: "Build an audio element that provides both MP3 and OGG fallback sources. Include the type attribute on each <source> element and text fallback inside the <audio> element.",
            hint: "Use: <audio controls><source src='file.mp3' type='audio/mpeg'><source src='file.ogg' type='audio/ogg'>Fallback text</audio>"
          },
          {
            title: "Exercise 3 – Audio Player Page",
            description: "Create a 'Podcast Player' page with three separate audio players representing three episodes. Each should have a heading (episode title), a description paragraph, and an audio player with controls.",
            hint: "Structure: <h2>Episode 1</h2><p>Description...</p><audio controls><source src='...'></audio> — repeat for each episode."
          }
        ],
        quiz: [
          { question: "What HTML element is used to embed audio?", options: ["<sound>", "<audio>", "<media>", "<music>"], correctIndex: 1, explanation: "The <audio> element is the HTML5 native element for embedding audio. It replaced the need for Flash and plugins for audio playback." },
          { question: "What does the controls attribute do on <audio>?", options: ["Controls the audio file's bitrate", "Displays the browser's built-in audio player UI (play, pause, volume, scrubber)", "Prevents users from pausing the audio", "Sets which audio format to use"], correctIndex: 1, explanation: "The controls attribute renders the browser's built-in audio player interface — play/pause button, seek bar, volume control, and download option. Without it, the audio loads but no player UI is shown." },
          { question: "Why provide multiple <source> elements in an <audio> element?", options: ["To play multiple songs simultaneously", "For browser compatibility — different browsers may support different audio formats", "To increase audio quality", "To load the audio from the fastest server available"], correctIndex: 1, explanation: "Different browsers may support different audio formats. By providing multiple <source> elements (MP3 and OGG), the browser plays the first format it supports, ensuring broad compatibility." },
          { question: "What is the most universally supported audio format for the web?", options: ["OGG Vorbis", "WAV", "FLAC", "MP3"], correctIndex: 3, explanation: "MP3 (MPEG Audio Layer III) is supported by all modern browsers. It offers good audio quality at reasonable file sizes, making it the standard choice for web audio." },
          { question: "What does autoplay do on an <audio> element?", options: ["Makes the audio play on page load automatically", "Plays the audio only when the user scrolls to it", "Enables auto-download of the audio file", "Automatically selects the best quality source"], correctIndex: 0, explanation: "autoplay starts audio playback automatically when the page loads. However, most modern browsers block autoplay with sound unless the page has had user interaction — to prevent jarring unexpected audio." },
          { question: "Why do most browsers block autoplay with sound?", options: ["For copyright reasons", "Because it was removed from the HTML specification", "To prevent unexpected, jarring audio that annoys users and can be a privacy concern", "For performance reasons — audio processing is computationally expensive"], correctIndex: 2, explanation: "Browsers block autoplay with sound to protect users from unexpected audio experiences — ads, websites playing music, or sites trying to grab attention. Muted autoplay is generally still allowed." },
          { question: "What does the loop attribute do?", options: ["Creates a loop of multiple audio files", "Repeats the audio continuously after it ends", "Plays the audio in reverse", "Loops only the first 10 seconds of audio"], correctIndex: 1, explanation: "loop makes the audio restart from the beginning when it ends, playing continuously until the user stops it. Commonly used for background ambient music." },
          { question: "What does the muted attribute do on <audio>?", options: ["Removes the mute button from the player UI", "Starts the audio in a muted state (zero volume)", "Permanently silences the audio with no way to unmute", "Filters certain frequency ranges"], correctIndex: 1, explanation: "muted starts the audio with the volume at zero. The user can still unmute via the player controls. This enables autoplay to work in browsers (muted autoplay is generally permitted)." },
          { question: "What is the type attribute on a <source> element used for?", options: ["Setting the audio file's encoding bitrate", "Specifying the MIME type of the audio format so browsers can decide if they can play it", "Defining the audio player's visual type", "Controlling playback speed"], correctIndex: 1, explanation: "The type attribute specifies the MIME type: type='audio/mpeg' for MP3, type='audio/ogg' for OGG. Browsers use this to quickly check if they support the format without downloading the file first." },
          { question: "What fallback content should go inside <audio> tags?", options: ["A JavaScript audio API fallback", "Text or a download link for browsers that don't support HTML5 audio", "A Flash player object", "Nothing — <audio> should have no text content"], correctIndex: 1, explanation: "Text between <audio> tags appears in browsers that don't support the element. Best practice: include a message and a download link so users can still access the audio. Example: <p>Your browser doesn't support audio. <a href='file.mp3'>Download it</a>.</p>" },
          { question: "What is the preload attribute on <audio>?", options: ["Preloads audio tracks from a playlist automatically", "Controls how much the browser pre-buffers the audio: none, metadata, or auto", "Enables predictive preloading based on user behavior", "Tells the server to push audio via HTTP/2"], correctIndex: 1, explanation: "preload controls pre-buffering: none (no preloading), metadata (only file length/format info), auto (browser decides how much to buffer). metadata is a good balance — shows duration without wasting bandwidth." },
          { question: "What does type='audio/mpeg' mean?", options: ["The audio is compressed at MPEG bitrate level 3", "The MIME type indicating this source is an MP3 audio file", "The audio requires an MPEG plugin to play", "The file is a video with MPEG audio track"], correctIndex: 1, explanation: "audio/mpeg is the MIME type for MP3 files. MIME types help browsers identify file formats without having to download and analyze the file. For OGG, use audio/ogg; for WAV, use audio/wav." },
          { question: "What is the MIME type for OGG audio files?", options: ["audio/vorbis", "audio/ogv", "audio/ogg", "audio/opus"], correctIndex: 2, explanation: "The MIME type for OGG Vorbis audio files is audio/ogg. This is what you put in type='audio/ogg' on your <source> element for OGG format files." },
          { question: "Can JavaScript control HTML5 audio playback?", options: ["No, audio is controlled only by browser UI", "Yes, through the HTMLMediaElement API (audio.play(), audio.pause(), audio.currentTime, etc.)", "Only through third-party libraries", "Only if the audio has the controls attribute"], correctIndex: 1, explanation: "The HTMLMediaElement API gives JavaScript full control: audio.play(), audio.pause(), audio.volume, audio.currentTime, audio.muted, audio.loop. This powers custom audio players and interactive experiences." },
          { question: "What should you consider about copyright when embedding audio on a webpage?", options: ["No copyright consideration needed — embedding is always legal", "Only use audio you own, have a license for, or that is in the public domain/Creative Commons", "Copyright only applies to video, not audio on websites", "As long as you credit the artist, any audio can be embedded"], correctIndex: 1, explanation: "Copyright law applies to web audio. Only embed audio you created, licensed, or that is freely available (Creative Commons, royalty-free). Embedding copyrighted music without a license can lead to legal issues." },
          { question: "What is the difference between WAV and MP3 audio formats?", options: ["WAV is more compressed than MP3", "WAV is uncompressed (high quality, large files); MP3 is compressed (good quality, much smaller files)", "WAV is modern; MP3 is deprecated", "They are identical — just different file extensions"], correctIndex: 1, explanation: "WAV is uncompressed — perfect audio quality but very large files. MP3 uses lossy compression, making files much smaller (typically 10x smaller than WAV) while maintaining good perceptual quality for web use." },
          { question: "What is the OPUS audio format?", options: ["An older audio format only supported by Internet Explorer", "A modern, efficient audio codec designed for internet streaming with better quality than MP3 at lower bitrates", "A lossless audio format similar to FLAC", "An audio format exclusive to Apple devices"], correctIndex: 1, explanation: "OPUS is a modern open audio codec optimized for internet streaming. It delivers better quality than MP3 at equivalent or lower bitrates, especially for speech. Supported by all modern browsers." },
          { question: "Can you style the <audio> controls with CSS?", options: ["Yes, fully — all aspects of the audio controls are stylable", "No, built-in audio controls cannot be styled with CSS", "Only the background color of the player can be changed", "Only with vendor-specific CSS prefixes"], correctIndex: 1, explanation: "The built-in browser audio controls cannot be styled with CSS — they use browser-native UI. For custom-styled audio players, you must hide the controls (no controls attribute) and build your own UI with JavaScript." },
          { question: "What is the purpose of the <track> element inside <audio>?", options: ["Adds multiple audio tracks to a player", "Provides text tracks like subtitles or captions for audio content", "Controls the audio file's bitrate and quality", "Creates a track list of multiple audio files"], correctIndex: 1, explanation: "<track> provides text tracks for media — subtitles, captions, descriptions, chapters, or metadata. For audio content like podcasts, captions improve accessibility for deaf and hard-of-hearing users." },
          { question: "What is Web Audio API?", options: ["An HTML tag for advanced audio features", "A low-level JavaScript API for complex audio processing, mixing, and synthesis in the browser", "A CSS property for audio visualization", "A browser extension for audio recording"], correctIndex: 1, explanation: "The Web Audio API is a powerful JavaScript interface for advanced audio features: mixing, effects, visualization, synthesis, and spatialization. Used for games, music apps, and interactive audio experiences." }
        ]
      },
      {
        id: "topic-3-6",
        title: "Video in HTML",
        explanation: `The <video> element works similarly to <audio> but for video content. Before HTML5, displaying video required Flash or other plugins. Now, video is a first-class citizen of HTML with the <video> element.

Like <audio>, <video> accepts src directly or uses nested <source> elements for multiple format fallbacks. The controls attribute shows the browser's built-in video player.

The most common video formats for the web: MP4 (H.264 codec) is the most widely supported and recommended format — all modern browsers support it. WebM is an open-source format with excellent compression (slightly smaller files than MP4) — supported by Chrome and Firefox. OGV (Ogg Theora) is another open-source option but now rarely used.

The width and height attributes control the video player's display dimensions. Unlike with images, these do not cause layout shift issues because the browser knows the element needs space.

Useful video attributes: autoplay (same restrictions as audio — usually blocked without muted), muted (required for autoplay to work), loop (repeat), poster (an image URL to show before the video plays — like a thumbnail), preload (controls buffering), and playsinline (important for iOS — prevents fullscreen on mobile).

The <video> element can also be used as background video. Set autoplay, muted, and loop together for looping background video. This is a popular modern design technique.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Video</title>
  </head>
  <body>
    <h1>Video in HTML</h1>

    <!-- Basic video with controls -->
    <video src="clip.mp4" controls width="720" height="405">
      Your browser does not support HTML5 video.
    </video>

    <!-- Multiple formats with poster image -->
    <video
      controls
      width="720"
      height="405"
      poster="thumbnail.jpg"
    >
      <source src="clip.mp4" type="video/mp4" />
      <source src="clip.webm" type="video/webm" />
      <p>
        Your browser does not support HTML5 video.
        <a href="clip.mp4">Download the video</a>.
      </p>
    </video>

    <!-- Background video: autoplay + muted + loop -->
    <video autoplay muted loop playsinline width="100%">
      <source src="background.mp4" type="video/mp4" />
    </video>

  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Embed a Video",
            description: "Embed a public video (try: https://www.w3schools.com/html/mov_bbb.mp4) using the <video> element. Add controls, set width to 640 and height to 360, and include fallback text.",
            hint: "Use: <video src='URL' controls width='640' height='360'>Fallback text here</video>"
          },
          {
            title: "Exercise 2 – Add a Poster Image",
            description: "Add a poster attribute to your video pointing to any image URL. This image will appear as the video's thumbnail before the user presses play.",
            hint: "Add poster='https://picsum.photos/640/360' to your <video> opening tag. The browser shows this image until playback starts."
          },
          {
            title: "Exercise 3 – Create a Video Page",
            description: "Build a 'Video Library' page with two videos, each with a heading title, description paragraph, and video player. Include controls, poster images, and proper width/height attributes.",
            hint: "Structure: h2 title, p description, video element with controls and poster. Repeat for the second video."
          }
        ],
        quiz: [
          { question: "What HTML element embeds video in a webpage?", options: ["<movie>", "<film>", "<video>", "<media>"], correctIndex: 2, explanation: "The <video> element is HTML5's native video embedding element. It renders a video player with optional built-in controls." },
          { question: "What is the most widely supported video format for the web?", options: ["AVI", "FLV", "WebM", "MP4 (H.264)"], correctIndex: 3, explanation: "MP4 with the H.264 codec is the most universally supported video format. All modern browsers (Chrome, Firefox, Safari, Edge) support it. Use MP4 as your primary format." },
          { question: "What does the poster attribute on <video> do?", options: ["Adds a watermark to the video", "Sets an image to display as the video thumbnail before playback starts", "Creates a promotional overlay on top of the video", "Specifies a fallback image if video loading fails"], correctIndex: 1, explanation: "poster='image.jpg' specifies a thumbnail image to display while the video is loading or before the user starts playback. Without it, browsers show a blank/black area or the first frame." },
          { question: "What combination of attributes enables looping background video?", options: ["background + loop + nocontrols", "autoplay + muted + loop", "controls + repeat + noaudio", "preload + loop + silent"], correctIndex: 1, explanation: "autoplay + muted + loop together create looping background video. muted is required because browsers block autoplay with sound. playsinline is also recommended for iOS." },
          { question: "What does playsinline do on mobile devices?", options: ["Plays video inline on the page instead of opening fullscreen — important for iOS", "Plays the video line by line for slow connections", "Enables inline playback controls only", "Forces the video to play in portrait mode"], correctIndex: 0, explanation: "Without playsinline, iOS Safari opens videos in fullscreen mode automatically. playsinline prevents this, keeping the video embedded within the page layout — essential for background videos." },
          { question: "What is the MIME type for MP4 video?", options: ["video/mp4", "video/mpeg4", "media/mp4", "video/h264"], correctIndex: 0, explanation: "The MIME type for MP4 video files is video/mp4. Use this in the type attribute of <source> elements: <source src='video.mp4' type='video/mp4'>." },
          { question: "What is the MIME type for WebM video?", options: ["video/webm", "video/vp8", "media/webm", "video/google"], correctIndex: 0, explanation: "The MIME type for WebM video is video/webm. WebM uses VP8 or VP9 video codecs and is an open-source alternative to MP4 with excellent browser support (except older Safari versions)." },
          { question: "Can JavaScript control <video> playback?", options: ["No, video is only controlled by browser UI", "Yes, through the HTMLMediaElement API (video.play(), pause(), currentTime, etc.)", "Only through a dedicated Video API", "Only if the video has no controls attribute"], correctIndex: 1, explanation: "Yes — video.play(), video.pause(), video.currentTime, video.volume, video.muted, video.playbackRate and more are available via the HTMLMediaElement API, enabling fully custom video players." },
          { question: "What should the fallback content inside <video> tags contain?", options: ["A Flash player as fallback", "Text explaining the situation and a download link for the video file", "Nothing — browsers handle the fallback automatically", "A JavaScript-based video player as backup"], correctIndex: 1, explanation: "Fallback content between <video> tags appears in browsers that don't support the element. Include a message and a download link: <p>Your browser can't play video. <a href='video.mp4'>Download it</a>.</p>" },
          { question: "What does preload='none' do on a <video> element?", options: ["Prevents the video from ever loading", "Tells the browser not to preload any of the video data until the user interacts", "Removes the browser's default preloading behavior permanently", "Sets the video to play only when explicitly called by JavaScript"], correctIndex: 1, explanation: "preload='none' tells the browser not to download any video data until the user presses play. This saves bandwidth for users who never watch the video, but means a delay when they start playback." },
          { question: "What is the difference between <video src='file.mp4'> and using <source> elements?", options: ["They are functionally identical in all situations", "Using <source> elements allows providing multiple formats for broader browser compatibility", "Using src directly provides better performance than <source>", "Only <source> elements can specify video dimensions"], correctIndex: 1, explanation: "Using <source> elements lets you provide multiple video formats: <source src='file.mp4' type='video/mp4'><source src='file.webm' type='video/webm'>. The browser plays the first one it supports." },
          { question: "Why is providing multiple video formats (MP4 + WebM) good practice?", options: ["Multiple formats increase video quality", "It provides a fallback for browsers that don't support one of the formats", "It allows the browser to select the fastest-loading format", "It is required by the HTML specification for all video elements"], correctIndex: 1, explanation: "Browser support for video formats varies. By providing both MP4 and WebM, you ensure compatibility across Chrome, Firefox, Safari, and Edge — each browser picks the first format it supports." },
          { question: "What does the width and height attribute control on <video>?", options: ["The video's playback resolution", "The visual dimensions of the video player on the page", "The maximum file size that can be loaded", "The video's aspect ratio for letterboxing"], correctIndex: 1, explanation: "width and height on <video> set the display dimensions of the video player box on the page. The actual video resolution may differ — the browser scales the video to fit these dimensions." },
          { question: "What happens if a video is wider than the viewport?", options: ["The page becomes horizontally scrollable", "The video overflows and is clipped at the viewport edge", "The browser automatically constrains the video width", "CSS must be used to set max-width: 100% to prevent overflow"], correctIndex: 3, explanation: "Without CSS constraints, a video with a fixed width larger than the viewport overflows horizontally. Use CSS: video { max-width: 100%; height: auto; } to make videos responsive." },
          { question: "What is the purpose of <track kind='subtitles'> inside a video?", options: ["Adding audio tracks to a video", "Providing text subtitles that appear over the video for accessibility", "Tracking the video's play count", "Creating chapter markers for navigation"], correctIndex: 1, explanation: "<track kind='subtitles' src='subtitles.vtt' srclang='en'> provides text subtitles synchronized with the video. This is crucial for accessibility for deaf users and for users watching without sound." },
          { question: "What file format do WebVTT (Web Video Text Tracks) use?", options: [".srt", ".sub", ".vtt", ".txt"], correctIndex: 2, explanation: "WebVTT (Web Video Text Tracks) files use the .vtt extension. They contain time-stamped text for subtitles, captions, or descriptions. Used with the <track> element inside <video>." },
          { question: "How does object-fit: cover work specifically for video elements?", options: ["It compresses the video file for faster loading", "It crops and fills the video container while maintaining aspect ratio", "It stretches video to fill without maintaining aspect ratio", "It adds CSS animation to the video"], correctIndex: 1, explanation: "object-fit: cover works on <video> elements just like on <img> — the video scales to fill the container while maintaining aspect ratio, cropping excess. Perfect for full-viewport background videos." },
          { question: "What is the Canvas API used for with video in JavaScript?", options: ["Recording video from the user's webcam", "Drawing individual video frames onto a <canvas> for image processing or effects", "Converting video to a different format in the browser", "Streaming video to a server in real-time"], correctIndex: 1, explanation: "You can draw video frames onto a <canvas> element using ctx.drawImage(videoElement). This enables real-time image processing, filters, overlays, and frame-by-frame analysis using JavaScript." },
          { question: "What does video.readyState === 4 mean in JavaScript?", options: ["The video has encountered an error", "The video's metadata is loading", "The video has enough data to play through without buffering (HAVE_ENOUGH_DATA)", "The video playback has been paused"], correctIndex: 2, explanation: "readyState 4 (HAVE_ENOUGH_DATA) means the browser has buffered enough data to play the video through to completion without interruption. Values 0-4 describe the video's loading state." },
          { question: "Can <video> be used to capture webcam input?", options: ["Yes, using navigator.mediaDevices.getUserMedia() to stream webcam to a video element", "No, <video> only plays pre-recorded files", "Only with a separate <webcam> element", "Yes, using the src='webcam' attribute"], correctIndex: 0, explanation: "Yes! navigator.mediaDevices.getUserMedia({video: true}) returns a media stream from the webcam. Set videoElement.srcObject = stream to display it. This is how browser-based video chat and camera apps work." }
        ]
      }
    ]
  },

  // ===========================
  // LESSON 4 – HTML Lists & Tables
  // ===========================
  {
    id: "lesson-4",
    title: "Lesson 4 – HTML Lists & Tables",
    topics: [
      {
        id: "topic-4-1",
        title: "Unordered Lists",
        explanation: `Unordered lists present a collection of items where order does not matter — like a shopping list, a list of features, or navigation links. HTML uses the <ul> element (unordered list) containing <li> elements (list items).

The browser renders each <li> with a bullet point by default. Browsers typically use filled circles, but this can be changed with CSS using the list-style-type property to disc (default), circle, square, or none.

<ul> is a block-level element. Each <li> is also a block-level element but constrained within the list. List items can contain any HTML — text, links, images, even other lists.

When to use unordered lists:
- Navigation menus (one of the most common uses — nav links are semantically a list)
- Feature lists
- Collections of items where sequence is irrelevant
- Bullet-point lists in articles

When NOT to use unordered lists: when order matters (use <ol>), when displaying tabular data (use a table), or when you just want visual bullet styling without semantic list meaning (use CSS instead).

The combination of <ul> and <li> provides semantic meaning beyond just visual bullets — it tells browsers, screen readers, and search engines that this is a list of related items. Screen readers announce "list with 5 items" so users understand the structure.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Unordered Lists</title>
  </head>
  <body>
    <h1>Unordered Lists</h1>

    <!-- Basic unordered list -->
    <h2>Grocery List</h2>
    <ul>
      <li>Apples</li>
      <li>Bread</li>
      <li>Milk</li>
      <li>Eggs</li>
    </ul>

    <!-- Navigation menu (common use of ul) -->
    <h2>Website Navigation</h2>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>

    <!-- List with rich content -->
    <h2>Our Features</h2>
    <ul>
      <li><strong>Fast:</strong> Loads in under 1 second</li>
      <li><strong>Secure:</strong> End-to-end encryption</li>
      <li><strong>Simple:</strong> No setup required</li>
    </ul>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Build a Feature List",
            description: "Create an unordered list of at least 5 features of your favorite website or app. Each list item should use <strong> for the feature name followed by a colon and a brief description.",
            hint: "Pattern: <li><strong>Feature Name:</strong> Description here</li>"
          },
          {
            title: "Exercise 2 – Navigation Menu",
            description: "Create a semantic navigation menu using <nav><ul>. Include 4 list items, each containing an anchor link (<a>). Use href='/' for Home and '#' for the others.",
            hint: "Wrap with <nav><ul>...</ul></nav>. Each item: <li><a href='link'>Page Name</a></li>"
          },
          {
            title: "Exercise 3 – Multiple Lists",
            description: "Create a page with two separate unordered lists: one for 'Things I Like' and one for 'Things I Dislike'. Each should have a heading (h2) and at least 4 items.",
            hint: "Each list is its own <ul>...</ul> block with its own heading above it."
          }
        ],
        quiz: [
          { question: "What HTML element creates an unordered list?", options: ["<ol>", "<list>", "<ul>", "<il>"], correctIndex: 2, explanation: "<ul> creates an unordered list. Each item is wrapped in <li>. Browsers render bullets by default." },
          { question: "What does each list item use as its element?", options: ["<item>", "<li>", "<bullet>", "<dt>"], correctIndex: 1, explanation: "<li> (list item) is the element for each item in both <ul> and <ol>. It contains the item's content." },
          { question: "What does an unordered list display by default?", options: ["Numbers before each item", "Letters before each item", "Bullet points before each item", "Dashes before each item"], correctIndex: 2, explanation: "By default, <ul> list items display with bullet points (filled circles). This can be changed with CSS list-style-type." },
          { question: "How do you change the bullet style of an unordered list?", options: ["Using the type attribute on <ul>", "Using the bullet attribute on <ul>", "Using CSS list-style-type property", "Using the style attribute with bullet: square"], correctIndex: 2, explanation: "CSS controls bullet style: ul { list-style-type: circle; } or ul { list-style-type: square; } or ul { list-style-type: none; } to remove bullets." },
          { question: "When is an unordered list semantically appropriate?", options: ["When showing ranked items from best to worst", "When showing steps that must be followed in a specific order", "When listing items where sequence is not important", "When displaying data with rows and columns"], correctIndex: 2, explanation: "<ul> is for unordered collections — items where sequence doesn't matter. If order matters, use <ol>. If you have tabular data, use a table." },
          { question: "Can list items (<li>) contain other HTML elements?", options: ["No, only plain text is allowed in <li>", "Yes, any HTML can go inside <li>, including links, images, and more lists", "Only inline elements like <strong> and <em>", "Only other list items"], correctIndex: 1, explanation: "List items can contain any HTML — text, links, images, paragraphs, even other lists (nested lists). This flexibility makes <li> useful for complex navigation structures." },
          { question: "What semantic meaning does a <ul> + <li> structure communicate?", options: ["That the items are ranked in importance", "That the items form an unordered, related group — communicated to screen readers and search engines", "That items should be displayed in a grid layout", "That all items are links to other pages"], correctIndex: 1, explanation: "The <ul>/<li> combination communicates a semantically meaningful list to browsers, screen readers, and search engines. Screen readers announce 'list with N items', helping users navigate." },
          { question: "What CSS property removes bullet points from a list?", options: ["list-style: none", "bullet-style: none", "list-type: hidden", "marker: none"], correctIndex: 0, explanation: "list-style: none (or list-style-type: none) removes bullet points. This is commonly used when creating navigation menus where you want a list structure without visible bullets." },
          { question: "What is the most common use of unordered lists in web development?", options: ["Displaying database tables", "Creating navigation menus", "Showing form validation errors", "Displaying image galleries"], correctIndex: 1, explanation: "Navigation menus are one of the most common uses of <ul>. A nav menu is semantically a list of links — wrapping in <nav><ul><li>...</li></ul></nav> is the recommended approach." },
          { question: "What is the difference between <ul> and <ol>?", options: ["<ul> is for vertical lists; <ol> is for horizontal lists", "<ul> items are unordered with bullets; <ol> items are ordered with numbers", "<ul> has no default styling; <ol> is styled with CSS only", "<ul> is block-level; <ol> is inline"], correctIndex: 1, explanation: "<ul> (unordered list) uses bullets — items have no inherent sequence. <ol> (ordered list) uses numbers or letters — items have a specific sequence that matters." },
          { question: "Is a <ul> element block-level or inline?", options: ["Inline — it flows with surrounding text", "Block-level — it starts on a new line and takes full width", "It depends on the number of items", "It is neither — it uses its own display type"], correctIndex: 1, explanation: "<ul> is block-level. It starts on a new line and occupies the full available width. The browser adds default top/bottom margin and left padding/indentation." },
          { question: "What does the browser add by default to the left side of a list?", options: ["A border", "Padding and indentation to make room for bullets", "A background color", "Extra margin between list items"], correctIndex: 1, explanation: "Browsers add left padding to <ul> and <ol> elements to create space for bullets/numbers. This is why lists appear indented. You can override this with CSS: ul { padding-left: 0; }" },
          { question: "Is it valid to have a <div> inside a <li>?", options: ["No, <li> can only contain inline elements", "Yes, list items can contain any HTML elements including block-level ones", "Only if the <li> has a class attribute", "Only in <ol>, not in <ul>"], correctIndex: 1, explanation: "Yes! <li> can contain block-level elements like <div>, <p>, <h2>, etc. This is commonly used in card-style list layouts where each list item has a heading, text, and an image." },
          { question: "What happens if you place content directly in <ul> without <li> wrappers?", options: ["Content appears normally as part of the list", "Content is invisible in the browser", "It is invalid HTML — browsers may auto-fix it or the content may appear outside the list", "Content appears with bullets but without the list structure"], correctIndex: 2, explanation: "HTML requires <ul> to only contain <li> elements as direct children. Content directly in <ul> without <li> is invalid. Browsers may move it or behave unexpectedly." },
          { question: "How many items can an unordered list have?", options: ["Maximum 10 items", "Maximum 100 items", "No limit — a list can have any number of <li> elements", "The HTML spec recommends no more than 7 items"], correctIndex: 2, explanation: "There is no HTML limit on list item count. However, very long lists may indicate you need a different UI approach (search, pagination, categorization). Semantic lists can have any number of items." },
          { question: "What CSS property controls the position of list bullets relative to the list content?", options: ["bullet-position", "list-style-position (inside or outside)", "marker-location", "list-marker-pos"], correctIndex: 1, explanation: "list-style-position: outside (default — bullet to the left, text wraps at text start) or inside (bullet inside text block, text wraps under bullet). 'inside' is useful for indented list styling." },
          { question: "Can you use custom images as list bullets with CSS?", options: ["No, only browser default bullets are possible", "Yes, using list-style-image: url('bullet.png')", "Only SVG images, not PNG or JPEG", "Only with JavaScript — CSS cannot set custom bullets"], correctIndex: 1, explanation: "Yes! list-style-image: url('star.png') replaces bullets with a custom image. Modern CSS also uses ::marker pseudo-element for more control: li::marker { content: '★'; color: gold; }" },
          { question: "What attribute was historically used to change bullet style directly on <ul> in HTML4?", options: ["The type attribute (now deprecated)", "The style attribute with list-style", "The bullet attribute", "The marker attribute"], correctIndex: 0, explanation: "HTML4 used <ul type='circle'|'disc'|'square'>. This attribute is deprecated in HTML5. All list styling should now be done with CSS." },
          { question: "What is an 'aria-label' and when would you use it on a <ul>?", options: ["It labels the list count for SEO purposes", "It provides an accessible name for the list for screen reader users — useful when list purpose isn't clear from context", "It limits the list to a specific number of visible items", "It marks the list as important for search engines"], correctIndex: 1, explanation: "aria-label provides a descriptive name for elements. <ul aria-label='Main navigation'> tells screen readers 'this is the main navigation list' — helpful when the list's purpose isn't clear from surrounding content." },
          { question: "Which is the correct way to remove the left indentation from an unordered list?", options: ["<ul style='indent: 0'>", "<ul noindent>", "ul { margin: 0; padding-left: 0; }", "ul { list-indent: 0; }"], correctIndex: 2, explanation: "Browsers add left padding to lists for bullet space. To remove it: ul { padding-left: 0; list-style: none; margin: 0; }. This is standard practice for creating navigation menus." }
        ]
      },
      {
        id: "topic-4-2",
        title: "Ordered Lists",
        explanation: `Ordered lists are for items where sequence matters — step-by-step instructions, ranked items, numbered recipes, or any collection where the order carries meaning. The <ol> element creates an ordered list, with each item in <li>.

By default, browsers number list items starting from 1. The type attribute controls the numbering system: type="1" (default decimal numbers: 1, 2, 3), type="a" (lowercase letters: a, b, c), type="A" (uppercase letters: A, B, C), type="i" (lowercase Roman numerals: i, ii, iii), type="I" (uppercase Roman numerals: I, II, III).

The start attribute lets you begin numbering from a different number. start="5" makes the list begin counting at 5. start="10" makes it start at 10. This is useful for continuation lists — when you break a list into sections and want counting to continue.

The reversed attribute (a Boolean attribute) makes the list count down instead of up: 10, 9, 8... This is useful for "Top 10" countdown lists.

Ordered lists are commonly used for: cooking/recipe steps, installation instructions, numbered tutorial steps, terms and conditions (with numbered clauses), legal document sections, and any sequential process.

Like unordered lists, items in <ol> can contain any HTML, and lists can be nested inside each other.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Ordered Lists</title>
  </head>
  <body>
    <h1>Ordered Lists</h1>

    <!-- Default: numbered list -->
    <h2>How to Make Tea</h2>
    <ol>
      <li>Boil water to 90°C (195°F)</li>
      <li>Place a teabag in your mug</li>
      <li>Pour hot water over the teabag</li>
      <li>Steep for 3-5 minutes</li>
      <li>Remove the teabag and enjoy</li>
    </ol>

    <!-- Uppercase letters as markers -->
    <h2>Multiple Choice Question</h2>
    <ol type="A">
      <li>Option one</li>
      <li>Option two</li>
      <li>Option three</li>
    </ol>

    <!-- Start from a specific number -->
    <h2>Continuing a List (from step 6)</h2>
    <ol start="6">
      <li>Connect to the network</li>
      <li>Open the browser</li>
    </ol>

    <!-- Reversed countdown -->
    <h2>Top 3 Countdown</h2>
    <ol reversed>
      <li>Bronze: Third place</li>
      <li>Silver: Second place</li>
      <li>Gold: First place</li>
    </ol>

  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Write Step-by-Step Instructions",
            description: "Create an ordered list of instructions for a task you know well — making coffee, tying shoelaces, or signing up for a website. Include at least 6 steps.",
            hint: "Each step is one <li> inside <ol>. Keep each step actionable and clear — start with a verb."
          },
          {
            title: "Exercise 2 – Roman Numeral List",
            description: "Create an outline for an essay using Roman numerals (type='I'). Include three main sections as Roman numerals: I, II, III. Give each section a sub-list using uppercase letters (type='A') with 2-3 sub-points.",
            hint: "Nested lists go inside <li> elements. The inner <ol type='A'> lives inside the outer <ol type='I'>'s <li>."
          },
          {
            title: "Exercise 3 – Continued and Reversed Lists",
            description: "Create a two-part tutorial page. Part 1 has steps 1-5. Part 2 continues from step 6 using start='6'. Then create a 'Top 5 Countdown' list using the reversed attribute.",
            hint: "Part 1: normal <ol>. Part 2: <ol start='6'>. Countdown: <ol reversed start='5'>"
          }
        ],
        quiz: [
          { question: "What HTML element creates an ordered list?", options: ["<ul>", "<ol>", "<nl>", "<list>"], correctIndex: 1, explanation: "<ol> creates an ordered list where items are automatically numbered. Each item is wrapped in <li>." },
          { question: "What does the type='a' attribute do on an <ol>?", options: ["Uses the letter 'a' as the only marker", "Numbers the list using lowercase letters: a, b, c...", "Makes the list appear smaller (smaller type size)", "Adds anchor links to each list item"], correctIndex: 1, explanation: "type='a' changes the counter from numbers to lowercase letters: a, b, c, d... Other type values: 'A' (uppercase), 'i' (lowercase Roman), 'I' (uppercase Roman), '1' (default numbers)." },
          { question: "What does the start='5' attribute do on an <ol>?", options: ["Limits the list to 5 items", "Begins numbering from 5 instead of 1", "Shows only every 5th item", "Makes each item 5px larger"], correctIndex: 1, explanation: "start='5' makes the list start counting from 5. First item shows '5.', second '6.', etc. Useful for continuation lists that pick up where a previous list left off." },
          { question: "What does the reversed attribute do on an <ol>?", options: ["Reverses the visual order of items in the list", "Makes the counter count down instead of up", "Reverses the text direction of each item", "Swaps list items randomly"], correctIndex: 1, explanation: "reversed is a Boolean attribute that makes the counter count downward. A list with 5 items would show 5, 4, 3, 2, 1. The DOM order of items is unchanged — only the counter reverses." },
          { question: "When should you use <ol> instead of <ul>?", options: ["When you want colored bullet points", "When the order or sequence of items matters", "When you have more than 5 items", "When items need to be sorted alphabetically"], correctIndex: 1, explanation: "Use <ol> when sequence matters — steps in a process, ranked items, tutorials, instructions. If the items could be shuffled without losing meaning, use <ul> instead." },
          { question: "What does type='I' (uppercase I) mean on an <ol>?", options: ["Numbered with italic styling", "Numbered with uppercase Roman numerals: I, II, III...", "Items are indexed starting at I (eye) = 1", "Items use the letter I as a prefix"], correctIndex: 1, explanation: "type='I' uses uppercase Roman numerals for list markers: I, II, III, IV, V... Commonly used for formal documents, legal sections, and academic outlines." },
          { question: "Can an ordered list's value attribute be set on individual <li> elements?", options: ["No, all items must follow sequential numbering", "Yes, using the value attribute on <li> sets the marker for that item and all following items", "Only if the list uses type='1'", "Only for the first list item"], correctIndex: 1, explanation: "The value attribute on <li> changes the item's number and all subsequent items follow from that value: <li value='10'> makes that item show as 10, and the next item shows as 11." },
          { question: "What happens if you use start='10' reversed on a list with 3 items?", options: ["Items count: 1, 2, 3", "Items count: 10, 9, 8", "Items count: 3, 2, 1", "Items count: 10, 11, 12"], correctIndex: 1, explanation: "start='10' reversed makes the list begin at 10 and count down: 10, 9, 8. start sets the beginning value, reversed changes direction." },
          { question: "Are the type values for <ol> case-sensitive?", options: ["Yes, 'A' and 'a' produce the same result", "Yes, 'A' gives uppercase letters; 'a' gives lowercase letters", "No, all type values produce the same output", "Only 'I' and 'i' are case-sensitive"], correctIndex: 1, explanation: "Yes, type values are case-sensitive: 'A' produces uppercase letters (A, B, C), 'a' produces lowercase (a, b, c). 'I' produces uppercase Roman numerals (I, II, III), 'i' produces lowercase (i, ii, iii)." },
          { question: "What is the default marker style for an <ol> element?", options: ["Bullets (disc)", "Uppercase letters (A, B, C)", "Decimal numbers (1, 2, 3)", "Roman numerals (I, II, III)"], correctIndex: 2, explanation: "By default, <ol> uses decimal numbers: 1, 2, 3, 4... This is equivalent to type='1'. You can change this with the type attribute or CSS list-style-type." },
          { question: "How do you style ordered list markers with CSS?", options: ["Using the type attribute on the <ol>", "Using CSS list-style-type property", "Using the marker attribute", "Ordered lists cannot be styled with CSS"], correctIndex: 1, explanation: "CSS controls ordered list styling: ol { list-style-type: lower-roman; } or ol { list-style-type: upper-alpha; }. The HTML type attribute is now considered presentational and CSS is preferred." },
          { question: "Can ordered lists be nested inside each other?", options: ["No, lists cannot be nested", "Yes, nesting <ol> inside <li> is common for outlines and sub-steps", "Only <ul> can be nested; <ol> cannot", "Only if the inner list uses a different type attribute"], correctIndex: 1, explanation: "Yes! Ordered lists can be nested: the inner <ol> goes inside an <li> of the outer <ol>. This is how multi-level outlines, legal sections (1.1, 1.2), and academic documents are structured." },
          { question: "What does the CSS list-style-type: lower-roman do?", options: ["Makes list markers lowercase letters", "Makes list markers lowercase Roman numerals (i, ii, iii, iv)", "Makes the entire list lowercase text", "Applies a Roman font to list text"], correctIndex: 1, explanation: "list-style-type: lower-roman uses lowercase Roman numerals as markers: i, ii, iii, iv, v... This is the CSS equivalent of the HTML type='i' attribute." },
          { question: "What is a common accessibility best practice for ordered lists with important steps?", options: ["Use numbers in the text instead of the list element", "Ensure each step is meaningful on its own without relying only on its position", "Avoid ordered lists — use divs with manual numbering", "Always set type='A' for readability"], correctIndex: 1, explanation: "For accessibility, each list item's content should be understandable on its own when possible. Screen readers can jump between list items, so relying on 'see step 3' without repeating context can be confusing." },
          { question: "What is the difference between the HTML type attribute on <ol> and CSS list-style-type?", options: ["They are identical in all ways", "HTML type is presentational (deprecated in favor of CSS); CSS list-style-type is the modern preferred way", "CSS list-style-type only works with <ul>, not <ol>", "HTML type supports more options than CSS list-style-type"], correctIndex: 1, explanation: "HTML's type attribute on <ol> is considered presentational markup — mixing presentation with structure. Modern practice uses CSS list-style-type for all list marker styling, keeping HTML for structure only." },
          { question: "What does li { list-style-type: none; } do?", options: ["Hides the list item text", "Removes the marker (number or bullet) from list items", "Makes list items display inline", "Removes the border from list items"], correctIndex: 1, explanation: "list-style-type: none removes the counter/bullet marker from list items. The items still exist and display as blocks, just without the automatic number or bullet. Commonly used for nav menus." },
          { question: "Which CSS property also removes the bullet/number AND any indentation from a list?", options: ["list-style: none alone removes everything", "list-style: none plus padding-left: 0 and margin: 0 are typically needed", "display: inline on <ul> removes everything", "Only JavaScript can remove all default list styling"], correctIndex: 1, explanation: "list-style: none removes bullets/numbers. But browsers also add padding-left for bullet space and top/bottom margins. For a clean reset: ul, ol { list-style: none; margin: 0; padding-left: 0; }" },
          { question: "What is the value attribute on <li> used for in ordered lists?", options: ["Setting the CSS value of the list item", "Overriding the sequential number to a specific value", "Setting the item's data value for JavaScript", "Controlling the item's height in pixels"], correctIndex: 1, explanation: "<li value='5'> forces that item to display as 5. All subsequent <li> elements continue from this value: the next item becomes 6, then 7, etc. Useful for non-consecutive numbered lists." },
          { question: "Can you use CSS counters as an alternative to <ol> for numbered lists?", options: ["No, CSS counters only affect visual styling of existing lists", "Yes, CSS counters (counter-increment, counter-reset, content: counter()) can replicate ordered list numbering on any element", "Only on list elements, not on div or span", "CSS counters work but require JavaScript to initialize"], correctIndex: 1, explanation: "CSS counters let you add automatic numbering to any element: counter-reset on the parent, counter-increment on items, and content: counter(name) on ::before pseudo-elements. Powerful for custom-styled numbered content." },
          { question: "What SEO benefit do ordered lists provide?", options: ["They always rank content higher in Google search results", "They help search engines understand the sequential structure and steps within content — useful for featured snippets", "They increase page load speed which helps SEO", "They allow structured data markup automatically"], correctIndex: 1, explanation: "Ordered lists help Google understand step-by-step processes. Google can extract 'How To' structured snippets from well-marked-up ordered lists, showing numbered steps directly in search results." },
          { question: "What is the ::marker CSS pseudo-element?", options: ["A pseudo-element that styles only the first item in a list", "A pseudo-element targeting the marker box (bullet or number) of list items", "A CSS shorthand for all marker-related properties", "A JavaScript API for accessing list markers"], correctIndex: 1, explanation: "::marker targets the marker box of a list item — the bullet or number. You can style it: li::marker { color: red; font-size: 1.2em; } for colored or custom-sized markers. Well-supported in modern browsers." }
        ]
      },
      {
        id: "topic-4-3",
        title: "Nested Lists",
        explanation: `Nested lists are lists within lists — one of the most useful structural patterns in HTML. You create them by placing a <ul> or <ol> element inside an <li> element.

When a list item contains a nested list, it creates a hierarchical structure: a parent item with child items beneath it. Browsers automatically indent nested lists and may change the bullet style for each level.

The most important rule: the nested list must go inside an <li>, not directly inside <ul> or <ol>. This is one of the most common beginner mistakes.

Correct nesting:
<ul>
  <li>Parent item
    <ul>
      <li>Child item 1</li>
      <li>Child item 2</li>
    </ul>
  </li>
</ul>

Incorrect nesting (invalid HTML):
<ul>
  <li>Parent item</li>
  <ul> ← Wrong! Should be inside <li>
    <li>Child item</li>
  </ul>
</ul>

Real-world uses for nested lists include: site navigation with dropdown sub-menus, document outlines, table of contents, multi-level categories, organizational charts described in text, and ingredient lists with sub-categories.

You can nest as deeply as needed, though going beyond three levels usually indicates a UI design problem — the structure is probably too complex for a list and needs a different approach.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Nested Lists</title>
  </head>
  <body>
    <h1>Nested Lists</h1>

    <!-- Nested unordered list -->
    <h2>Website Navigation</h2>
    <ul>
      <li>Home</li>
      <li>Products
        <ul>
          <li>Laptops</li>
          <li>Phones</li>
          <li>Tablets</li>
        </ul>
      </li>
      <li>About Us
        <ul>
          <li>Our Team</li>
          <li>Our Mission</li>
        </ul>
      </li>
      <li>Contact</li>
    </ul>

    <!-- Nested ordered list (outline format) -->
    <h2>Course Outline</h2>
    <ol>
      <li>Introduction
        <ol type="a">
          <li>What is HTML?</li>
          <li>How browsers work</li>
        </ol>
      </li>
      <li>Core Elements
        <ol type="a">
          <li>Tags and syntax</li>
          <li>Attributes</li>
        </ol>
      </li>
    </ol>

  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Multi-Category Grocery List",
            description: "Create a nested list for a grocery shopping list. Use an outer <ul> with categories (Produce, Dairy, Bakery) and an inner <ul> under each category with 3-4 specific items.",
            hint: "Each category item in the outer <ul> contains the category name plus a nested <ul> of specific items."
          },
          {
            title: "Exercise 2 – Mixed Nesting",
            description: "Create a 'Book Outline' using an ordered list. Each main chapter (numbered 1, 2, 3) should have sub-sections using an inner ordered list with type='a' (a, b, c). Each sub-section should have further bullet points using <ul>.",
            hint: "Three levels: outer <ol> > <li> > inner <ol type='a'> > <li> > inner <ul> > <li>"
          },
          {
            title: "Exercise 3 – Site Map",
            description: "Build a simple site map as a nested list showing: Home, Products (with Phones, Laptops, Accessories sub-items), Services (Web Design, SEO sub-items), and Contact Us.",
            hint: "This is a two-level nested list. Items without children are just <li>text</li>. Items with children wrap their sub-<ul> inside their <li>."
          }
        ],
        quiz: [
          { question: "Where must a nested list be placed?", options: ["Directly inside <ul> or <ol>", "Inside a <li> element", "After the parent list's closing tag", "Inside a <div> wrapping the parent list"], correctIndex: 1, explanation: "A nested list must be placed inside a <li> element — not directly inside <ul> or <ol>. The <li> is the parent item; the nested list provides its sub-items." },
          { question: "What happens visually to nested lists?", options: ["They display at the same indentation level as the parent", "They are automatically indented more deeply", "They display in bold to distinguish them", "They require manual CSS indentation — no default occurs"], correctIndex: 1, explanation: "Browsers automatically indent nested lists further than their parent. Each level of nesting is indented more, creating the visual hierarchy that makes the nested structure clear." },
          { question: "Can you nest an ordered list inside an unordered list?", options: ["No, you can only nest the same type", "Yes, any combination of <ul> and <ol> can be nested", "Only at the first level of nesting", "Only if both lists have the same items"], correctIndex: 1, explanation: "Yes! You can mix types freely. <ul> can contain <li> with <ol> inside, and vice versa. This is useful for outlines where main points are bullets and sub-points are numbered steps." },
          { question: "How deep can you nest lists?", options: ["Maximum 2 levels", "Maximum 3 levels", "Maximum 5 levels", "There is no HTML limit, though 3+ levels often indicates a design issue"], correctIndex: 3, explanation: "HTML has no nesting depth limit. However, deep nesting (4+ levels) often indicates the structure is too complex for a list format. Consider a different UI pattern if nesting goes beyond 3 levels." },
          { question: "What is the most common mistake when writing nested lists?", options: ["Using <ul> and <ol> in the same list", "Placing the nested list directly inside <ul> instead of inside <li>", "Using the wrong bullet type for sub-items", "Having too many items in the nested list"], correctIndex: 1, explanation: "The most common mistake: <ul><li>Parent</li><ul><li>Child</li></ul></ul> — the nested <ul> must be inside the parent <li>: <ul><li>Parent<ul><li>Child</li></ul></li></ul>." },
          { question: "What does the browser typically do with bullet styles for nested lists?", options: ["Uses the same bullet style at every level", "Changes to progressively lighter bullet styles: disc > circle > square", "Changes to numbered lists automatically", "Removes bullets entirely for nested items"], correctIndex: 1, explanation: "By default, browsers change bullet styles for nested unordered lists: first level is disc (filled), second is circle (hollow), third is square. CSS can override all of these." },
          { question: "How would you mark up a Table of Contents with main chapters and sub-chapters?", options: ["Using a single flat <ol> with all chapters and sub-chapters", "Using nested <ol> — outer for chapters, inner <ol> for sub-chapters inside each chapter's <li>", "Using a <table> with chapter headings", "Using <dl> with dt for chapters and dd for sub-chapters"], correctIndex: 1, explanation: "A Table of Contents is perfectly suited to nested ordered lists: outer <ol> for chapters, and an inner <ol type='a'> or <ol> inside each chapter's <li> for sub-chapters." },
          { question: "Can a single <li> contain both text and a nested list?", options: ["No, a <li> must contain only a nested list or only text", "Yes, text and the nested list can both be in the same <li>", "Only if the text is wrapped in a <span>", "Only in <ul>, not in <ol>"], correctIndex: 1, explanation: "Yes! A <li> can contain both text and a nested list: <li>Products<ul><li>Item 1</li></ul></li>. The text 'Products' is the parent item label, and the nested list provides sub-items." },
          { question: "What CSS property creates a 2-column layout for list items instead of vertical stacking?", options: ["list-layout: columns", "column-count: 2 on the <ul>", "display: horizontal on <li>", "li { float: left; width: 50%; }"], correctIndex: 1, explanation: "column-count: 2 on <ul> creates a multi-column list layout. Alternatively, CSS Grid or Flexbox on the list element can arrange items in columns." },
          { question: "What is a 'definition list' and how does it differ from nested lists?", options: ["A list with defined item limits — maximum 10 items per list", "A <dl> element using <dt> (term) and <dd> (description) pairs — for term/description pairs, not hierarchical nesting", "A nested list where each parent is a definition of its children", "A list that can only contain heading elements"], correctIndex: 1, explanation: "<dl> (definition list) with <dt> and <dd> is designed for term-definition pairs (like a glossary) — not for hierarchical content. Nested lists are for hierarchical content where items have sub-items." },
          { question: "In a navigation menu, when would nested lists be appropriate?", options: ["Never — navigation should use <nav> tags only", "When the menu has dropdown sub-menus — the sub-menu items are a nested <ul> inside the parent <li>", "When the site has more than 10 pages", "Only on mobile navigation menus"], correctIndex: 1, explanation: "Dropdown navigation menus use nested lists: the top-level items are <li> in the outer <ul>. Sub-menu items are a nested <ul> inside each parent <li>. CSS and JavaScript control the dropdown visibility." },
          { question: "How do screen readers handle nested lists?", options: ["They announce each list item without context", "They announce when entering and exiting nested lists, giving context like 'list of 3 items'", "They skip nested lists as they are considered decorative", "Screen readers cannot navigate nested lists"], correctIndex: 1, explanation: "Screen readers announce list structure: 'list with 3 items, item 1: Products, sub-list with 2 items, item 1: Laptops...' This context helps users understand the hierarchy. Proper HTML structure is essential." },
          { question: "What is the role of indentation in the HTML source of nested lists?", options: ["Indentation is required by the HTML specification", "Indentation in source code affects rendering — more indented items appear more indented", "Source indentation is purely for developer readability — it has no effect on rendering", "Indentation controls which items are considered nested"], correctIndex: 2, explanation: "HTML ignores whitespace in source code. Indentation in your HTML file is for developer readability only. The nesting structure is defined by the HTML element nesting, not whitespace or tab depth." },
          { question: "What is an accessible way to label a nested navigation list?", options: ["Use a visually hidden heading before the nested list", "Use aria-label on the <ul>: <ul aria-label='Products submenu'>", "Add a title attribute to the nested <ul>", "Both A and B are valid accessible approaches"], correctIndex: 3, explanation: "Both approaches work: a visually hidden <h3> provides context visible to screen readers, and aria-label='Products submenu' directly labels the list. Use whichever fits your layout and design." },
          { question: "What CSS pseudo-class can target only first-level list items (not nested)?", options: ["li:first-child", "li:not(li li) or ul > li", "li.first-level", "li[depth='1']"], correctIndex: 1, explanation: "ul > li (direct child combinator) targets only <li> elements that are direct children of <ul>, excluding nested items. li:not(li li) excludes list items that are descendants of other list items." },
          { question: "How would you create a numbered outline with sub-items using just CSS (without type attribute)?", options: ["It is impossible with CSS alone", "Using CSS counters with counter-reset and counter-increment", "Using CSS :nth-child selectors", "Using CSS generated content attribute"], correctIndex: 1, explanation: "CSS counters can create hierarchical numbering: counter-reset on the list, counter-increment on items, and content: counters(name, '.') counter(name) ' ' for dotted numbering like 1.1, 1.2, 2.1, etc." },
          { question: "What does the CSS property list-style: none do to nested lists?", options: ["Removes bullets from the parent list only", "Removes bullets from all lists, including nested ones, if applied to the parent", "Removes the nested list indentation but keeps bullets", "Only affects lists with id or class attributes"], correctIndex: 1, explanation: "list-style: none on a parent <ul> also applies to nested lists within it via inheritance. If you want different styling for the nested list, override it on the nested list's selector directly." },
          { question: "In what real-world document type are nested ordered lists most commonly used?", options: ["Social media posts", "Legal contracts and legal documents with numbered sections and sub-sections", "Image galleries", "Database records"], correctIndex: 1, explanation: "Legal documents, contracts, and regulatory documents commonly use nested ordered lists: Section 1 > 1.1 > 1.1(a) > 1.1(a)(i). HTML's nested <ol> structure matches this format perfectly." },
          { question: "What is a common UX problem with very deeply nested lists?", options: ["They crash browsers", "They load slower than shallow lists", "They become difficult to navigate visually and cognitively — users lose track of hierarchy", "They require special HTML5 doctype to render"], correctIndex: 2, explanation: "Very deep nesting (4+ levels) becomes cognitively taxing for users. It is hard to track which level you are on and how items relate. Consider using tabs, accordions, or a different layout for deeply hierarchical content." },
          { question: "What is 'Breadth-First' versus 'Depth-First' structure in nested lists context?", options: ["CSS layout techniques for positioning list items", "Breadth-First: few nested levels, many items per level. Depth-First: many nested levels, few items per level", "Two algorithms for sorting list items alphabetically", "Browser rendering strategies for complex lists"], correctIndex: 1, explanation: "In information architecture: Breadth-First structures have wide, shallow hierarchies (many main categories, few sub-levels). Depth-First structures go deep quickly (few main categories, many sub-levels). Both affect navigation usability." }
        ]
      },
      {
        id: "topic-4-4",
        title: "Creating Tables",
        explanation: `HTML tables are for displaying tabular data — information that naturally belongs in rows and columns, like a spreadsheet. The key principle: tables are for data, not for layout. Using tables to position page elements was an old practice from the 1990s that is now considered bad practice. Use CSS (Flexbox or Grid) for layouts.

Three core elements form a basic table: <table> (the container), <tr> (table row — creates a horizontal row), and <td> (table data — a single cell).

Every <td> must be inside a <tr>, and every <tr> must be inside <table>. The structure is strictly hierarchical. Browsers determine column widths automatically based on content, though CSS can override this.

A simple 3×2 table has 3 rows (<tr>) with 2 cells (<td>) each. The number of <td> elements in each <tr> determines the column count. All rows should have the same number of cells for a valid table (unless you use colspan or rowspan, covered next).

Table elements are block-level containers by default but display using the table layout model — a special CSS display mode that browsers use for tabular data. This model automatically creates consistent column widths across all rows.

By default, tables have no visual borders — you add those with CSS using border and border-collapse: collapse.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Tables</title>
    <style>
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
      th { background: #f5f5f5; font-weight: bold; }
    </style>
  </head>
  <body>
    <h1>Creating Tables</h1>

    <!-- Basic table: rows and cells -->
    <table>
      <tr>
        <td>Row 1, Cell 1</td>
        <td>Row 1, Cell 2</td>
        <td>Row 1, Cell 3</td>
      </tr>
      <tr>
        <td>Row 2, Cell 1</td>
        <td>Row 2, Cell 2</td>
        <td>Row 2, Cell 3</td>
      </tr>
      <tr>
        <td>Row 3, Cell 1</td>
        <td>Row 3, Cell 2</td>
        <td>Row 3, Cell 3</td>
      </tr>
    </table>

  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Build a Simple Data Table",
            description: "Create a 4×3 table (4 rows, 3 columns) showing a weekly schedule: columns for Monday, Wednesday, Friday, and rows for Morning, Afternoon, Evening. Fill in realistic activities.",
            hint: "Each <tr> represents a time slot. Each <td> within the row represents what happens that day."
          },
          {
            title: "Exercise 2 – Product Comparison Table",
            description: "Build a product comparison table with 3 products (columns) and 4 features (rows). Use real or fictional product names and feature values like 'Yes', 'No', or a number.",
            hint: "First row headers: Product Name, Product A, Product B, Product C. Subsequent rows: Feature name, values."
          },
          {
            title: "Exercise 3 – Add CSS Styling",
            description: "Take your table from Exercise 1 or 2 and add a <style> block in the <head> with: border-collapse: collapse on <table>, 1px solid border on th and td, 8px padding on th and td, and a background color on alternating rows using tr:nth-child(even).",
            hint: "Add <style>table{border-collapse:collapse;} th,td{border:1px solid #ccc; padding:8px;} tr:nth-child(even){background:#f5f5f5;}</style>"
          }
        ],
        quiz: [
          { question: "What HTML element creates a table?", options: ["<grid>", "<data>", "<table>", "<chart>"], correctIndex: 2, explanation: "<table> is the container element for HTML tables. All table rows and cells must be descendants of this element." },
          { question: "What does <tr> stand for?", options: ["Table Reference", "Text Render", "Table Row", "Table Range"], correctIndex: 2, explanation: "<tr> stands for Table Row. It creates a horizontal row in the table. Rows contain cell elements (<td> or <th>)." },
          { question: "What does <td> stand for?", options: ["Table Definition", "Text Display", "Table Data", "Table Dimension"], correctIndex: 2, explanation: "<td> stands for Table Data — a single data cell within a table row. It is the most common cell element in a table's body." },
          { question: "What is the correct nesting order for table elements?", options: ["<td> inside <table> inside <tr>", "<tr> inside <td> inside <table>", "<tr> inside <table>, <td> inside <tr>", "<table> inside <tr> inside <td>"], correctIndex: 2, explanation: "Correct nesting: <table> contains <tr>, and <tr> contains <td> or <th>. The hierarchy is table > row > cell. Never skip levels in this hierarchy." },
          { question: "What is the primary rule for using HTML tables?", options: ["Tables should only be used for displaying text", "Tables are for tabular data — not for page layout", "Tables should always have exactly 3 columns", "Tables must always include a caption element"], correctIndex: 1, explanation: "HTML tables should only be used for tabular data — information with rows and columns (spreadsheet-like). Using tables for page layout is a bad practice — use CSS Flexbox or Grid instead." },
          { question: "Why should tables NOT be used for page layout?", options: ["Tables crash mobile browsers", "Tables are slower to render than divs", "Tables impose rigid structure, harm accessibility, are harder to maintain, and violate separation of concerns", "Tables cannot be styled with CSS"], correctIndex: 2, explanation: "Layout tables harm accessibility (screen readers struggle), are inflexible (can't easily stack on mobile), mix presentation with structure, and are harder to maintain. CSS Flexbox and Grid are designed for layout." },
          { question: "What does border-collapse: collapse do in CSS for tables?", options: ["Collapses the table to a single cell", "Merges adjacent cell borders into a single border instead of doubling them", "Hides the table borders completely", "Combines all rows into one"], correctIndex: 1, explanation: "By default, table cells have separate borders with a gap between them. border-collapse: collapse merges these into single borders — a cleaner, more professional look." },
          { question: "What determines the number of columns in an HTML table?", options: ["The columns attribute on <table>", "The number of <td> or <th> elements in the first row", "The CSS column-count property", "The number of <tr> elements"], correctIndex: 1, explanation: "The number of cells (<td> or <th>) in a row determines the column count. Ideally, all rows have the same number of cells for a proper grid (unless using colspan/rowspan)." },
          { question: "Do HTML tables have visible borders by default?", options: ["Yes, a 1px black border is the default", "Yes, a 2px border with 3D effect", "No, tables have no visual borders by default", "Yes, but only in Firefox and Safari"], correctIndex: 2, explanation: "Tables have no visible borders by default — they are transparent. You must add borders using CSS: table, th, td { border: 1px solid #ccc; }." },
          { question: "What CSS property should be combined with border-collapse: collapse for the best table appearance?", options: ["table-layout: auto", "Adding padding to th and td cells", "Making the table 100% width", "Setting font-size to 14px"], correctIndex: 1, explanation: "After collapsing borders, adding padding to cells is essential for readability: td, th { padding: 8px 12px; }. Without padding, text touches the borders and looks cramped." },
          { question: "What is the default display type for <table>?", options: ["display: block", "display: flex", "display: table", "display: inline-block"], correctIndex: 2, explanation: "<table> has display: table by default — a special CSS display mode that enables the table layout algorithm (column width equalization across rows, etc.). This is distinct from block or flex layout." },
          { question: "What happens if rows in a table have different numbers of cells?", options: ["The browser throws a validation error", "The table renders but with irregular columns and alignment issues", "Extra cells auto-populate with default text", "Rows with fewer cells are hidden"], correctIndex: 1, explanation: "Rows with mismatched cell counts create irregular tables. The browser still renders the table, but the column alignment may break. For consistent tables, every row should have the same number of cells (unless using colspan/rowspan)." },
          { question: "Can table cells contain other HTML elements?", options: ["Only text — no elements inside cells", "Yes, any HTML can be placed inside <td> including images, lists, and nested tables", "Only inline elements like <span> and <strong>", "Only if the table uses display: table in CSS"], correctIndex: 1, explanation: "Yes! Table cells (<td>) can contain any HTML — text, images, forms, lists, other tables. Complex tables often have multiple elements per cell (e.g., an image plus a caption inside one cell)." },
          { question: "What attribute on <table> sets the table to fill its container width?", options: ["<table width='full'>", "Use CSS: table { width: 100%; }", "<table size='100%'>", "<table expand='true'>"], correctIndex: 1, explanation: "Use CSS to set table width: table { width: 100%; }. The HTML width attribute is deprecated. CSS gives full control over table dimensions." },
          { question: "What does <caption> inside <table> do?", options: ["Captions one specific cell with a footnote", "Provides a title or description for the entire table, displayed above or below it", "Sets the column header style", "Adds a caption badge to the first cell"], correctIndex: 1, explanation: "<caption> must be the first child of <table> and provides a title for the entire table. It appears above by default. Semantically, it describes what the table contains — helpful for accessibility." },
          { question: "What CSS property controls the algorithm used to determine column widths?", options: ["column-sizing", "table-layout (auto or fixed)", "cell-sizing", "border-spacing: column"], correctIndex: 1, explanation: "table-layout: auto (default) lets the browser calculate column widths based on content. table-layout: fixed makes columns equal width based on the table width, which renders faster for large tables." },
          { question: "What is the role of the <tbody> element inside a table?", options: ["Defines the table's body text style", "Semantically groups the main data rows of the table, separate from header/footer rows", "Creates a thick border under the table header", "Makes the body rows scrollable independently"], correctIndex: 1, explanation: "<tbody> groups the main data rows of a table. When combined with <thead> and <tfoot>, it creates semantic sections. Browsers generate <tbody> automatically if omitted, but explicitly writing it is better practice." },
          { question: "What happens to a table's accessibility if headers are not marked with <th>?", options: ["No accessibility impact — <td> and <th> are interchangeable", "Screen readers cannot associate headers with data cells, making the table harder to understand", "Tables without <th> are flagged as decoration by screen readers", "Tables render the same but fail HTML validation"], correctIndex: 1, explanation: "Without <th> elements, screen readers cannot tell users which header corresponds to each data cell. In a large table, users lose track of what each column/row represents. <th> with scope attribute is essential for accessible tables." },
          { question: "What is border-spacing and how does it differ from border-collapse?", options: ["They are identical — just different names for the same property", "border-spacing sets the gap between separate borders; border-collapse removes that gap by merging borders", "border-spacing is for rows; border-collapse is for columns", "border-collapse is CSS3 only; border-spacing is CSS2"], correctIndex: 1, explanation: "border-spacing sets the distance between adjacent cell borders (only applies in 'separate' border model). border-collapse: collapse eliminates this gap entirely by merging adjacent borders into one." },
          { question: "How do you create a table with alternating row background colors using CSS?", options: ["Using table { alternate-rows: true; }", "Using tr:nth-child(even) { background-color: #f5f5f5; }", "Using tr.even and tr.odd classes manually", "Using table-layout: striped in CSS3"], correctIndex: 1, explanation: "tr:nth-child(even) { background-color: #f5f5f5; } applies a background to every even-numbered row. This creates a 'zebra striping' pattern that makes large data tables much easier to scan." }
        ]
      },
      {
        id: "topic-4-5",
        title: "Table Headers & Borders",
        explanation: `Two enhancements make HTML tables both more accessible and more visually clear: table headers and proper border styling.

The <th> element (table header) creates a header cell. By default, browsers render <th> content in bold and centered — visually distinct from regular <td> cells. More importantly, <th> carries semantic meaning: this cell is a header for a row or column.

The scope attribute on <th> tells browsers and screen readers which cells the header applies to. scope="col" means this is a column header. scope="row" means this is a row header. This is critical for accessibility — without scope, screen readers cannot associate data cells with their headers.

For structural organization, HTML provides three sectioning elements within tables: <thead> (table head — contains the header row(s)), <tbody> (table body — contains the data rows), and <tfoot> (table footer — contains summary rows, totals, etc.).

Using these sections is best practice. Browsers generate <tbody> automatically if you omit it, but explicitly including all three sections creates clearer, more maintainable markup.

For borders, the CSS approach is: table { border-collapse: collapse; } and th, td { border: 1px solid #ccc; }. Additional styles like text-align, background-color, and padding complete a professional-looking table.

Never use the old border attribute directly on the <table> tag (like <table border="1">) — this is deprecated and should be replaced with CSS.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Table Headers</title>
    <style>
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        border: 1px solid #ccc;
        padding: 10px 14px;
        text-align: left;
      }
      th {
        background-color: #2563eb;
        color: white;
      }
      tbody tr:nth-child(even) {
        background-color: #f8fafc;
      }
    </style>
  </head>
  <body>
    <h1>Table with Headers</h1>

    <table>
      <!-- thead: column headers -->
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">In Stock</th>
        </tr>
      </thead>

      <!-- tbody: data rows -->
      <tbody>
        <tr>
          <td>Laptop Pro 15"</td>
          <td>$1,299</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Wireless Mouse</td>
          <td>$49</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>USB-C Hub</td>
          <td>$79</td>
          <td>No</td>
        </tr>
      </tbody>

      <!-- tfoot: summary row -->
      <tfoot>
        <tr>
          <td><strong>Total Products</strong></td>
          <td colspan="2">3 items</td>
        </tr>
      </tfoot>
    </table>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Full Table with thead/tbody/tfoot",
            description: "Create a sales report table with: <thead> row (Month, Revenue, Sales Count), <tbody> with 3 months of data, and <tfoot> with totals row. Style with CSS (blue headers, alternating row colors).",
            hint: "Structure: <table><thead><tr><th>...</th></tr></thead><tbody>data rows</tbody><tfoot><tr><td>Totals</td>...</tr></tfoot></table>"
          },
          {
            title: "Exercise 2 – Row Headers with scope",
            description: "Build a schedule table where the first column contains time slots as row headers (<th scope='row'>). The first row contains day names as column headers (<th scope='col'>).",
            hint: "The first row uses <th scope='col'> for days. Each data row starts with <th scope='row'> for the time slot, then <td> for each day's activity."
          },
          {
            title: "Exercise 3 – Style a Complete Table",
            description: "Take any table you built and apply thorough CSS styling: border-collapse, padding, header background color, hover effects on rows (tr:hover), and a caption. Make it look like a real product table.",
            hint: "Add tr:hover { background-color: #e0f2fe; } for hover. Add <caption> inside <table> before any rows. Blue headers with white text look great."
          }
        ],
        quiz: [
          { question: "What element creates a header cell in a table?", options: ["<td class='header'>", "<head>", "<th>", "<tr class='header'>"], correctIndex: 2, explanation: "<th> (table header) creates a semantic header cell — bold and centered by default. More importantly, it tells browsers and screen readers this cell is a header." },
          { question: "What does scope='col' on a <th> indicate?", options: ["The header applies to the entire table", "The header applies to all cells in its column below it", "The header applies to all cells in its row", "The header spans multiple columns"], correctIndex: 1, explanation: "scope='col' tells browsers and screen readers that this header cell describes the column of data cells below it. scope='row' means it describes the row of cells to its right." },
          { question: "What element groups the header row(s) of a table?", options: ["<head>", "<thead>", "<th>", "<header>"], correctIndex: 1, explanation: "<thead> wraps the header row(s) of a table — typically the row(s) with column labels. Browsers may repeat <thead> rows when a long table prints across multiple pages." },
          { question: "What element groups the main data rows of a table?", options: ["<tbody>", "<tdata>", "<main>", "<rows>"], correctIndex: 0, explanation: "<tbody> wraps the body rows of a table — the actual data. When using <thead>, <tbody>, and <tfoot>, they must appear in this order (thead first, tfoot before or after tbody per spec)." },
          { question: "What element groups the footer row(s) of a table?", options: ["<tfooter>", "<footer>", "<tfoot>", "<bottom>"], correctIndex: 2, explanation: "<tfoot> wraps summary, total, or footer rows. Browsers may repeat <tfoot> at the bottom of each page when printing a long table that spans multiple pages." },
          { question: "What CSS property creates the appearance of borders in a table?", options: ["table-border: 1px", "The deprecated border attribute on <table>", "th, td { border: 1px solid #ccc; }", "table { outline: 1px solid }"], correctIndex: 2, explanation: "CSS border property on th and td cells creates visible borders. Combined with border-collapse: collapse on the table, this creates the classic table grid appearance." },
          { question: "What is the deprecated way to add borders to HTML tables?", options: ["Using CSS table-border property", "Using the border='1' attribute directly on <table>", "Using <table style='border: 1px'>", "Using <border> as a child element"], correctIndex: 1, explanation: "<table border='1'> was the HTML4 way to add borders. This attribute is deprecated in HTML5. Use CSS instead: table, th, td { border: 1px solid #ccc; } with border-collapse: collapse." },
          { question: "What does <th> look like by default compared to <td>?", options: ["Identical — no visual difference", "Smaller font, italicized text", "Bold and center-aligned text", "Colored background and larger font"], correctIndex: 2, explanation: "Browsers render <th> in bold and center-aligned by default, distinguishing it visually from <td> (normal weight, left-aligned). These defaults can be overridden with CSS." },
          { question: "What happens when you use <thead> and <tfoot> in a long table that is printed?", options: ["Headers and footers are omitted from print", "Browsers may repeat <thead> at the top and <tfoot> at the bottom of each printed page", "Only the first page shows the header and footer", "Print output always shows the complete table on one page"], correctIndex: 1, explanation: "When a long table spans multiple printed pages, browsers can repeat <thead> at the top and <tfoot> at the bottom of each page — keeping headers and totals visible throughout the document." },
          { question: "Why is scope='col' or scope='row' important for accessibility?", options: ["It improves visual styling of the table headers", "Screen readers use scope to announce which header belongs to each data cell as users navigate", "It is required for table borders to render correctly", "It enables keyboard navigation in tables"], correctIndex: 1, explanation: "Without scope, screen readers cannot associate data cells with their headers. With scope='col', a screen reader can announce 'Revenue: $12,000' as it navigates cells — providing essential context." },
          { question: "What does text-align: left on table cells override?", options: ["The default right-alignment of all cells", "The default center-alignment of <th> cells", "The vertical alignment of cell content", "The border alignment of the table"], correctIndex: 1, explanation: "<th> is center-aligned by default. Adding th { text-align: left; } overrides this. For data tables (not form-like layouts), left-aligning headers is often preferred for consistency with data cell text." },
          { question: "What CSS creates a hover effect on table rows?", options: ["table:hover { background: #f5f5f5; }", "tr:hover { background-color: #f0f9ff; }", "tr.hover { highlight: true; }", "td:hover-row { background: #f5f5f5; }"], correctIndex: 1, explanation: "tr:hover { background-color: #f0f9ff; } applies a background color to an entire row when the user hovers over any cell in that row. This helps users track which row they are reading." },
          { question: "Can <tbody> appear multiple times in a table?", options: ["No, only one <tbody> is allowed", "Yes, multiple <tbody> elements can divide data into logical groups", "Only if each <tbody> has a different id", "Only in HTML5 documents"], correctIndex: 1, explanation: "A table can have multiple <tbody> elements to group rows logically — for example, grouping data by category: <tbody> for Category A rows, another <tbody> for Category B rows, each optionally with a group header." },
          { question: "What is the purpose of adding id attributes to header cells?", options: ["Styling headers individually with CSS", "Allowing <td> cells to use headers='header-id' to associate with multiple headers for complex tables", "Enabling JavaScript to find headers by ID", "Generating automatic anchor links in the table"], correctIndex: 1, explanation: "For complex tables with multiple row and column headers, id on <th> and headers='id1 id2' on <td> creates explicit associations that screen readers use to announce the correct context for each cell." },
          { question: "What does the summary attribute on <table> do in HTML5?", options: ["Provides a visible summary caption above the table", "Creates a screen-reader-accessible description (deprecated in HTML5; use <caption> instead)", "Sets the table's column summary statistics", "Limits the table to showing a summary view by default"], correctIndex: 1, explanation: "The summary attribute on <table> was used in HTML4 to describe a table's structure for screen readers. It is deprecated in HTML5. Use <caption> for visible descriptions or aria-describedby for accessible descriptions." },
          { question: "What is the recommended way to add a visible description for a table?", options: ["Using the summary attribute on <table>", "Using <caption> as the first child element of <table>", "Adding a <p> element before the <table>", "Using title attribute on <table>"], correctIndex: 1, explanation: "<caption> is the semantic element for a table's visible title/description. It must be the first element inside <table>. Screen readers also announce captions, making them doubly useful." },
          { question: "What CSS property vertically aligns content within table cells?", options: ["line-height: middle", "vertical-align: middle", "align-items: center", "text-baseline: middle"], correctIndex: 1, explanation: "vertical-align: middle (or top, bottom) on td/th elements controls vertical positioning of cell content. By default, table cells vertically center their content." },
          { question: "What visual effect does a table's default display have before any CSS is applied?", options: ["Cells appear with borders and alternating gray backgrounds", "Cells appear side by side with no borders and default browser padding", "The table appears invisible — no visual output", "All cells collapse to zero width until CSS is applied"], correctIndex: 1, explanation: "Without CSS, a table renders as cells side by side in rows with no borders. Text in cells uses browser default padding. Tables become styled through CSS — there is minimal default visual treatment." },
          { question: "What is the 'table layout algorithm' that distinguishes CSS table layout?", options: ["A JavaScript algorithm for sorting table data", "The CSS algorithm that determines cell widths and heights based on content and table width", "A browser extension for rendering tables", "A web standard for spreadsheet import"], correctIndex: 1, explanation: "The table layout algorithm calculates how wide each column should be, taking into account all cells in that column. table-layout: auto (default) inspects all cells; table-layout: fixed uses only the first row for faster rendering." },
          { question: "Can <th> elements appear anywhere in a table, or only in the first row?", options: ["Only in the first row of the table", "Only in <thead> sections", "<th> can appear in any row to mark row headers or column headers anywhere in the table", "<th> can appear only in odd-numbered rows"], correctIndex: 2, explanation: "<th> can appear anywhere — first row for column headers, first cell of each row for row headers, or even in the middle/footer of tables. The scope attribute clarifies its role." }
        ]
      },
      {
        id: "topic-4-6",
        title: "Merging Cells (colspan & rowspan)",
        explanation: `Sometimes a single cell in a table needs to span multiple columns or rows. This is exactly what colspan and rowspan allow.

colspan merges a cell across multiple columns. colspan="3" on a <td> means that cell takes the space of 3 regular cells horizontally. When you use colspan, you must remove the other cells that would have occupied that space — otherwise the table will have too many cells in that row.

rowspan merges a cell across multiple rows. rowspan="2" means the cell spans 2 rows vertically. Similarly, you must remove the cells from the rows below that would normally occupy that space.

This is a common source of confusion. Think of it this way: the browser allocates a grid of positions. If a cell has colspan="3", it reserves positions 1, 2, and 3 in that row. The other <td> elements in that row only need to fill the remaining positions.

A concrete example: a calendar grid where a multi-day event spans 3 days would use colspan="3" for that event's cell, and you would not add separate cells for those 3 days.

Real-world uses: report summary rows spanning all columns (colspan), employee records spanning multiple departments (rowspan), calendar events, timetable blocks, pricing tables with grouped headers, and complex data visualizations.

When working with merged cells, count your cells carefully for each row to ensure the totals match. This is a skill that comes with practice.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Colspan and Rowspan</title>
    <style>
      table { border-collapse: collapse; }
      th, td { border: 1px solid #999; padding: 8px 14px; text-align: center; }
      th { background: #3b82f6; color: white; }
      td[colspan] { background: #eff6ff; }
    </style>
  </head>
  <body>
    <h1>Merging Table Cells</h1>

    <!-- colspan: span across 3 columns -->
    <h2>Colspan Example</h2>
    <table>
      <tr>
        <th colspan="3">Annual Report 2024</th>
      </tr>
      <tr>
        <th>Q1</th>
        <th>Q2</th>
        <th>Q3</th>
      </tr>
      <tr>
        <td>$12,000</td>
        <td>$15,000</td>
        <td>$18,000</td>
      </tr>
    </table>

    <!-- rowspan: span down 2 rows -->
    <h2>Rowspan Example</h2>
    <table>
      <tr>
        <th>Person</th>
        <th>Department</th>
        <th>Role</th>
      </tr>
      <tr>
        <td rowspan="2">Engineering</td>
        <td>Frontend</td>
        <td>Design UI</td>
      </tr>
      <tr>
        <!-- "Engineering" cell is taken by rowspan above -->
        <td>Backend</td>
        <td>Build APIs</td>
      </tr>
    </table>

  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Build a Table with colspan",
            description: "Create a 3-column table with 4 rows. The first row should have a single header spanning all 3 columns using colspan='3'. The remaining rows should have 3 cells each.",
            hint: "First row: <tr><th colspan='3'>Main Title</th></tr>. Subsequent rows: <tr><td>A</td><td>B</td><td>C</td></tr>"
          },
          {
            title: "Exercise 2 – Rowspan for Categories",
            description: "Create a table showing two categories of products. The first column should use rowspan to merge the category name across multiple product rows (2 rows per category).",
            hint: "First row of each category: <td rowspan='2'>Category Name</td> followed by product cells. The second row: omit the category cell — rowspan fills it."
          },
          {
            title: "Exercise 3 – Weekly Schedule with Both",
            description: "Create a class schedule table for Monday-Friday with time slots. Use rowspan for a 2-hour class that spans two time slots. Use colspan for a group event that covers all 5 days.",
            hint: "Combine both: rowspan merges cells vertically (for a 2-hour class), colspan merges cells horizontally (for an all-day event)."
          }
        ],
        quiz: [
          { question: "What does colspan='3' on a <td> do?", options: ["Creates 3 separate cells with the same content", "Merges the cell across 3 columns horizontally", "Merges the cell across 3 rows vertically", "Sets the cell's text size to 3em"], correctIndex: 1, explanation: "colspan='3' makes the cell span horizontally across 3 column positions. The cell visually takes up the space of 3 regular cells in that row." },
          { question: "What does rowspan='2' on a <td> do?", options: ["Creates 2 rows with the same content", "Makes the cell span 2 rows vertically", "Makes the cell span 2 columns horizontally", "Sets the row height to 2em"], correctIndex: 1, explanation: "rowspan='2' makes the cell extend vertically across 2 rows. The cell visually takes up the space of 2 regular cells stacked on top of each other." },
          { question: "When you use colspan='3' in a row, what must you do?", options: ["Add 3 extra empty cells to compensate", "Remove 2 of the cells that would otherwise fill those 3 column positions", "Add a corresponding rowspan on the next row", "Add a colspan='3' to the same cell in every row"], correctIndex: 1, explanation: "If a cell has colspan='3', it occupies 3 column positions. You must not add cells for those extra positions — doing so would give that row too many columns." },
          { question: "When you use rowspan='2' in a cell, what must you adjust?", options: ["Add 2 extra rows below to compensate", "Remove the cell that would normally fill that position in the row below", "Add a corresponding colspan to the next column", "Add the rowspan to every cell in the row"], correctIndex: 1, explanation: "rowspan='2' occupies 2 row positions in a column. In the next row, you must not include a cell for that column — the rowspan cell fills it already." },
          { question: "What is a practical use case for colspan in a table?", options: ["Creating a cell that serves as a full-width section header spanning all columns", "Making all rows appear taller", "Giving one row fewer cells than others", "Adding extra columns to a specific row"], correctIndex: 0, explanation: "colspan is commonly used for: section headers spanning the full table width, totals rows spanning all data columns, grouped column headers (like 'Q1-Q4' spanning 4 quarter columns)." },
          { question: "What is a practical use case for rowspan in a table?", options: ["Making a cell span multiple columns", "A category cell that groups multiple rows of products under one label", "Creating a table footer with a summary", "Making a row taller without adding content"], correctIndex: 1, explanation: "rowspan is used when one label covers multiple rows: a category name spanning its product rows, a merged time slot for a multi-hour class, or a multi-day event in a calendar." },
          { question: "What happens if your colspan values do not add up to the correct column count for a row?", options: ["The browser throws a JavaScript error", "The browser may render the table incorrectly — adding extra cells or misaligning columns", "The excess columns are automatically hidden", "The browser prompts you to fix the HTML"], correctIndex: 1, explanation: "Mismatched colspan values create malformed tables. Browsers attempt to recover but may render extra empty cells or break column alignment. Count carefully: sum of all (colspan or 1) in a row must equal total column count." },
          { question: "Can you combine colspan and rowspan on the same cell?", options: ["No, only one can be used per cell", "Yes, a cell can span both multiple columns and multiple rows simultaneously", "Only in <th> cells — not in <td>", "Only if the table has an even number of rows and columns"], correctIndex: 1, explanation: "Yes! A cell can use both: <td colspan='2' rowspan='3'> creates a cell that spans 2 columns and 3 rows simultaneously — creating a 2×3 block area." },
          { question: "In a 4-column table, if the first cell uses colspan='4', how many cells should the rest of that row contain?", options: ["3 more cells", "4 more cells", "0 more cells — colspan='4' fills the entire row", "1 more cell"], correctIndex: 2, explanation: "colspan='4' fills all 4 column positions. No additional cells should be in that row. Adding any more cells would create too many columns in that row." },
          { question: "How would you create a table where the first column cell spans 3 rows?", options: ["<td rows='3'>", "<td rowspan='3'>", "<td height='3rows'>", "<td merge='3'>"], correctIndex: 1, explanation: "<td rowspan='3'> on the first cell in a row makes it span 3 row positions. In the next 2 rows, the first column position is already occupied by this cell — don't add a cell there." },
          { question: "What is the maximum value for colspan or rowspan?", options: ["100", "1000", "65534", "There is no maximum specified in the HTML spec"], correctIndex: 3, explanation: "There is no specified maximum for colspan or rowspan in the HTML spec. Browsers may have practical limits, but for real-world use, you will never approach them." },
          { question: "What happens visually when a cell has rowspan='3'?", options: ["The cell's text appears three times", "The cell appears taller, visually spanning the height of 3 normal rows", "Three identical rows are created with that cell's content", "The cell is repeated in the next 3 rows automatically"], correctIndex: 1, explanation: "rowspan='3' makes the cell appear three times taller — it occupies the vertical space of 3 regular rows. The cell's content is centered within this merged area." },
          { question: "What is the rowspan default value if not specified?", options: ["0", "1 (spans only its own row)", "2", "The number of rows in the table"], correctIndex: 1, explanation: "The default value of rowspan is 1 — the cell spans only its own row. Similarly, the default for colspan is 1. Specifying colspan='1' or rowspan='1' is redundant but not wrong." },
          { question: "What is colspan='0' in HTML?", options: ["Hides the cell entirely", "Makes the cell span to the end of the column group", "Invalid — must be at least 1", "Sets the column width to 0px"], correctIndex: 1, explanation: "colspan='0' is a special value meaning 'span to the last column of the current column group'. It is rarely used in practice. Most implementations treat colspan='0' as spanning to the table's last column." },
          { question: "In a schedule table where a class runs from 9am-11am across 2 time slot rows, what attribute handles this?", options: ["colspan='2' on the class cell", "rowspan='2' on the class cell", "span='row:2' on the class cell", "time-span='2' as a custom attribute"], correctIndex: 1, explanation: "A class running across 2 time slots (rows) should use rowspan='2'. This makes the class cell span the height of 2 rows, just like the 2-hour class takes up 2 time slot rows." },
          { question: "How do you verify your colspan/rowspan table is correct?", options: ["Check that every row's cell count (counting colspans) equals the table's column count", "Test that the table looks symmetric visually", "Count that total <td> count equals rows × columns", "Use a JavaScript validator to check dynamically"], correctIndex: 0, explanation: "For each row, sum up the actual column positions taken (1 per normal cell, or the colspan value). This must equal the total column count. For rowspan, count columns in each 'virtual row' considering which cells span into it." },
          { question: "What does a <th colspan='3'> in a <thead> typically represent?", options: ["Three separate column headers merged into one group header", "A header that applies to only 3 rows of data", "A deprecation of the following 3 columns", "A header merged with 3 rows below it"], correctIndex: 0, explanation: "A <th colspan='3'> in the header row creates a grouped column header — a single header cell that labels a group of 3 columns. Common in tables with quarterly sub-columns under an annual heading." },
          { question: "What is 'table linearization' and how do colspan/rowspan affect it?", options: ["A CSS technique for making tables responsive", "How screen readers flatten tables — complex spans can make linearized reading confusing without proper headers", "The process of converting a table to a list for mobile", "A browser feature for compressing table data"], correctIndex: 1, explanation: "Screen readers linearize tables (read cell by cell). colspan and rowspan create non-sequential cell orders that can confuse users without proper headers (th with scope/id/headers attributes) to provide context." },
          { question: "Can rowspan extend beyond the table's <tbody> section into <tfoot>?", options: ["Yes, rowspan can cross section boundaries", "No, rowspan is limited to cells within the same table section (thead, tbody, or tfoot)", "Only if the table has a single tbody section", "Only in Chrome — other browsers limit rowspan to one section"], correctIndex: 1, explanation: "rowspan cannot extend across table section boundaries (thead, tbody, tfoot). A rowspan in <tbody> can only span rows within that same <tbody> section, not into <tfoot>." },
          { question: "What CSS technique makes complex tables with merged cells responsive on mobile?", options: ["CSS table-layout: responsive", "Hiding some columns with media queries, or converting the table to a definition list layout on small screens", "Setting colspan='1' for all cells on mobile", "Using display: flex on the <table> element"], correctIndex: 1, explanation: "Responsive tables often use: display: block on tr/td with media queries (each cell becomes its own block with data-label), scrollable table containers (overflow-x: auto), or hiding non-essential columns at small breakpoints." }
        ]
      }
    ]
  },

  // ===========================
  // LESSON 5 – HTML Forms & Semantic HTML
  // ===========================
  {
    id: "lesson-5",
    title: "Lesson 5 – HTML Forms & Semantic HTML",
    topics: [
      {
        id: "topic-5-1",
        title: "Introduction to Forms",
        explanation: `Forms are the primary way users interact with web applications. Whenever you log in, search for something, submit a comment, or make a purchase online, you are using an HTML form. Understanding forms is essential for building interactive websites.

The <form> element is the container for all form controls. It has two critical attributes: action and method.

The action attribute specifies where the form data is sent when submitted — typically a URL for a server-side script. If action is omitted, data is sent to the current page's URL.

The method attribute specifies how data is sent. GET appends form data to the URL as query strings (visible, bookmarkable, but limited size and not for sensitive data). POST sends data in the request body (not visible in URL, better for sensitive data, no size limitation). Use GET for search forms. Use POST for login forms, registration, and any form submitting sensitive or large data.

Inside the form, you place form controls: <input>, <textarea>, <select>, <button>, etc.

The <button type="submit"> or <input type="submit"> triggers form submission. When a user clicks it, the browser validates the form and sends the data.

Understanding form basics: forms create a two-way communication channel between users and your server. They are the bridge between the static HTML you write and the dynamic responses a server can provide.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Forms</title>
  </head>
  <body>
    <h1>Contact Us</h1>

    <!-- action: where to send data. method: how to send it -->
    <form action="/submit-contact" method="post">

      <!-- Text input -->
      <label for="name">Full Name:</label>
      <input type="text" id="name" name="name" placeholder="Jane Smith" />

      <!-- Email input -->
      <label for="email">Email Address:</label>
      <input type="email" id="email" name="email" placeholder="jane@example.com" />

      <!-- Text area for longer messages -->
      <label for="message">Message:</label>
      <textarea id="message" name="message" rows="5" cols="40"
        placeholder="Type your message here..."></textarea>

      <!-- Submit button -->
      <button type="submit">Send Message</button>

    </form>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Build a Simple Contact Form",
            description: "Create a contact form with fields for: Name (text), Email (email), Subject (text), and Message (textarea). Add a submit button and use method='post'. Include placeholder text for each field.",
            hint: "Each input needs a label linked by matching for='id' and id='same-value'. The textarea needs rows and cols attributes."
          },
          {
            title: "Exercise 2 – Compare GET vs POST",
            description: "Create two identical search forms: one with method='get' and one with method='post'. Add a search text input to each and a submit button. Submit each and observe the URL difference in your browser.",
            hint: "With GET, form data appears in the URL bar after submission: ?search=your+term. POST sends data invisibly in the request body."
          },
          {
            title: "Exercise 3 – Registration Form",
            description: "Build a user registration form with: Username, Email, Password, Confirm Password, and Date of Birth fields. Add a submit button labeled 'Create Account'. Use appropriate input types for each field.",
            hint: "Use type='password' for password fields and type='date' for date of birth. Use type='email' for email."
          }
        ],
        quiz: [
          { question: "What HTML element is the container for form controls?", options: ["<input>", "<fieldset>", "<form>", "<controls>"], correctIndex: 2, explanation: "<form> is the container element for all form controls. It defines where form data is sent (action) and how it is sent (method)." },
          { question: "What does the action attribute on a <form> specify?", options: ["The CSS animation to play on submit", "The URL or path where form data is sent when submitted", "The allowed input types in the form", "The color of the submit button"], correctIndex: 1, explanation: "The action attribute specifies the destination URL for the form data — typically a server-side URL that processes the submission. If omitted, data is sent to the current page URL." },
          { question: "What is the difference between method='get' and method='post'?", options: ["GET is for large data; POST is for small data", "GET appends data to the URL; POST sends data in the request body (hidden)", "GET encrypts data; POST sends it plaintext", "There is no difference — both work identically"], correctIndex: 1, explanation: "GET appends form data as URL query strings (?name=value) — visible, bookmarkable, size-limited. POST sends data in the request body — invisible in URL, no size limit, better for sensitive data." },
          { question: "When should you use method='get' for a form?", options: ["For login forms with passwords", "For search forms and filters where the result should be bookmarkable", "For forms submitting credit card information", "For file upload forms"], correctIndex: 1, explanation: "GET is appropriate for search and filter forms — the URL with query params can be bookmarked or shared: /products?category=shoes&size=10. Never use GET for sensitive data like passwords." },
          { question: "When should you use method='post'?", options: ["For public search forms that should be shareable", "For login, registration, payment, and any form with sensitive or large data", "Only for image upload forms", "Whenever you want the form to redirect to a new page"], correctIndex: 1, explanation: "POST is appropriate for login, registration, payments, and any form with sensitive data or large payloads. POST data does not appear in URLs — important for passwords and private information." },
          { question: "What element triggers form submission?", options: ["<submit>", "<button type='submit'> or <input type='submit'>", "Clicking any button inside the form", "<form action='submit'>"], correctIndex: 1, explanation: "<button type='submit'> or <input type='submit'> triggers form submission. When clicked, the browser validates the form and sends data to the action URL." },
          { question: "What happens when a form is submitted with method='get'?", options: ["Data is encrypted and sent to the server", "Data is appended to the URL as query string parameters", "A new browser window opens with the data", "The browser automatically refreshes the form"], correctIndex: 1, explanation: "GET submission appends form data to the URL: if action='/search' and input name='q' has value 'html', the URL becomes /search?q=html. This URL can be bookmarked and shared." },
          { question: "What is a query string in a URL?", options: ["The part after # that targets a page element", "The part after ? that contains key=value data pairs from a form", "The protocol part (https://)", "The file path of the page"], correctIndex: 1, explanation: "A query string appears after ? in a URL: https://example.com/search?q=html&page=2. Each key=value pair comes from form field name=value. Multiple pairs are joined with &." },
          { question: "What does the name attribute on form inputs do?", options: ["Sets the visible label for the input", "Identifies the input's data key when form data is sent to the server", "Creates a CSS class for the input", "Sets the input's placeholder text"], correctIndex: 1, explanation: "The name attribute identifies the input in the submitted data. If an input has name='email', the server receives email=user@example.com. Without name, the input's data is not submitted." },
          { question: "What happens when a user submits a form without filling a required field?", options: ["The form submits but marks the field red", "The browser shows a validation error and prevents submission", "The server rejects the empty field", "Nothing — required is only visual feedback"], correctIndex: 1, explanation: "With the required attribute and type-based validation, browsers block submission and display inline error messages when required fields are empty or invalid. This is native browser form validation." },
          { question: "What is the default method for a form if the method attribute is omitted?", options: ["post", "get", "put", "submit"], correctIndex: 1, explanation: "The default form method is GET. If you omit method, the browser uses GET and appends form data to the URL. Always specify method explicitly to make your intent clear." },
          { question: "What does enctype='multipart/form-data' on a <form> do?", options: ["Encrypts the form data before sending", "Enables file uploads — required when the form contains file input fields", "Compresses the form data to reduce size", "Enables cross-origin form submission"], correctIndex: 1, explanation: "enctype='multipart/form-data' changes how the browser encodes form data — required when the form includes <input type='file'>. Without it, file contents are not properly transmitted." },
          { question: "Can a form include another form nested inside it?", options: ["Yes, nested forms enable multi-step submissions", "No, HTML does not allow nested <form> elements", "Only if each form has a different action", "Only in HTML5 documents"], correctIndex: 1, explanation: "HTML does not allow <form> elements to be nested inside each other. Nested forms are invalid and browsers handle them unpredictably. For multi-step forms, use JavaScript or separate pages." },
          { question: "What does the novalidate attribute on <form> do?", options: ["Removes all input fields", "Disables built-in browser validation on submission", "Makes form fields read-only", "Prevents the form from being submitted at all"], correctIndex: 1, explanation: "novalidate disables the browser's built-in form validation on submit. Used when you want to implement custom JavaScript validation instead of relying on browser defaults." },
          { question: "What is form validation?", options: ["Making form inputs look visually consistent", "Checking that user input meets requirements before allowing submission", "Encrypting form data before sending to the server", "Formatting form data as JSON"], correctIndex: 1, explanation: "Form validation checks that user input meets requirements — required fields are filled, email addresses are valid, passwords meet length requirements, etc. Can be done by the browser (HTML attributes) or JavaScript." },
          { question: "What does the autocomplete attribute on <form> or <input> do?", options: ["Automatically submits the form after a delay", "Controls whether the browser suggests previously entered values for inputs", "Adds automatic grammar correction to text inputs", "Sets the input to focus automatically on page load"], correctIndex: 1, explanation: "autocomplete='on' (default) allows the browser to suggest previously entered values. autocomplete='off' disables this — useful for sensitive fields like OTP codes or new passwords." },
          { question: "What is a CSRF attack and how do forms relate?", options: ["A form submission that causes a server crash", "Cross-Site Request Forgery — a malicious site tricks a user's browser into submitting a form to another site the user is logged into", "A CSS conflict between form styles", "A form validation error caused by special characters"], correctIndex: 1, explanation: "CSRF (Cross-Site Request Forgery) exploits authenticated sessions — a malicious page submits a form to a bank or social network on behalf of the logged-in user. Prevention: CSRF tokens in forms, SameSite cookie attribute." },
          { question: "What does the target attribute on <form> do?", options: ["Sets the CSS target for styling", "Specifies where to display the response: _blank (new tab), _self (same tab), _parent, _top", "Targets a specific element on the page to update", "Sets the form's CSS target for pseudo-selectors"], correctIndex: 1, explanation: "target on <form> works like target on <a> — it specifies where the server's response is displayed: _blank (new tab), _self (current tab, default), _parent, or _top." },
          { question: "What is the purpose of a <fieldset> element inside a form?", options: ["Sets the maximum number of fields allowed", "Groups related form controls semantically with an optional legend", "Creates a fixed-size container for the form", "Applies CSS validation styles to all fields within it"], correctIndex: 1, explanation: "<fieldset> groups related form controls together semantically. <legend> inside <fieldset> provides a label for the group. This is especially helpful for forms with multiple sections like 'Personal Info' and 'Payment Details'." },
          { question: "What does <legend> do inside a <fieldset>?", options: ["Shows legal text required by GDPR regulations", "Provides a visible title/label for the fieldset group", "Creates a legend/key for form icons", "Sets the maximum number of characters in the fieldset"], correctIndex: 1, explanation: "<legend> provides a title for a <fieldset>. It appears at the top of the fieldset's border by default. Screen readers announce the legend when entering the fieldset group." }
        ]
      },
      {
        id: "topic-5-2",
        title: "Input Types",
        explanation: `The <input> element is the most versatile form control. Its type attribute determines what kind of input is rendered and what validation the browser applies automatically.

type="text" is the default — a single-line text field. type="email" validates that the entry looks like an email address. type="password" hides the typed characters. type="number" shows only numeric input, with optional min and max constraints. type="date" shows a date picker in most browsers. type="checkbox" renders a checkbox for boolean yes/no choices. type="radio" creates a radio button for selecting one option from a group. type="file" lets users select a file for upload. type="submit" creates a button that submits the form. type="reset" resets all form fields to their default values. type="search" is like text but optimized for search (may show an X to clear on some browsers). type="tel" is for phone numbers (shows a numeric keyboard on mobile). type="url" validates that input looks like a URL. type="color" shows a color picker. type="range" shows a slider for numeric ranges.

The right input type is crucial for two reasons. First, browsers apply appropriate validation: type="email" automatically rejects non-email format. Second, mobile keyboards adapt: type="email" shows the @ key, type="number" shows a numeric keypad, type="tel" shows a phone keypad — dramatically improving mobile user experience.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Input Types</title>
  </head>
  <body>
    <h1>HTML Input Types</h1>
    <form>

      <p><label>Text: <input type="text" placeholder="Enter text" /></label></p>
      <p><label>Email: <input type="email" placeholder="you@example.com" /></label></p>
      <p><label>Password: <input type="password" placeholder="••••••••" /></label></p>
      <p><label>Number: <input type="number" min="1" max="100" value="10" /></label></p>
      <p><label>Date: <input type="date" /></label></p>
      <p><label>Checkbox: <input type="checkbox" /> I agree to the terms</label></p>

      <p>Favorite color:
        <label><input type="radio" name="color" value="red" /> Red</label>
        <label><input type="radio" name="color" value="blue" /> Blue</label>
        <label><input type="radio" name="color" value="green" /> Green</label>
      </p>

      <p><label>File upload: <input type="file" /></label></p>
      <p><label>Range (1-10): <input type="range" min="1" max="10" value="5" /></label></p>
      <p><label>Color picker: <input type="color" value="#3b82f6" /></label></p>
      <p><label>Search: <input type="search" placeholder="Search..." /></label></p>

      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Try All Major Input Types",
            description: "Create a form that includes at least 8 different input types: text, email, password, number, date, checkbox, radio (a group of 3), and range. Label each properly and submit the form to see how different types validate.",
            hint: "For radio buttons, all options in the same group must share the same name attribute: name='color'."
          },
          {
            title: "Exercise 2 – Mobile-Optimized Form",
            description: "Build a contact form specifically optimized for mobile: use type='tel' for a phone field, type='email' for email, type='url' for website, type='number' for age. Test on your phone if possible — notice the keyboard changes.",
            hint: "Mobile optimization comes from choosing the right type — the phone shows the right keyboard automatically."
          },
          {
            title: "Exercise 3 – Settings Form",
            description: "Create a 'Profile Settings' form with: text (username), email, password, date (birthday), color picker (favorite color), range slider (age 18-100), file upload (profile picture), and a group of 3 radio buttons for preferred language.",
            hint: "Color picker: <input type='color'>, Range: <input type='range' min='18' max='100'>, File: <input type='file' accept='image/*'>"
          }
        ],
        quiz: [
          { question: "What is the default type for an <input> element?", options: ["email", "text", "submit", "search"], correctIndex: 1, explanation: "If the type attribute is omitted on <input>, it defaults to type='text' — a single-line plain text input field." },
          { question: "What does type='email' do that type='text' does not?", options: ["Shows a text field with an email icon", "Validates the input has the format of an email address before form submission", "Automatically sends an email on submit", "Only allows entering @gmail.com addresses"], correctIndex: 1, explanation: "type='email' applies validation — the browser checks for a valid email format (text@text.text) before allowing submission. type='text' accepts anything without format checking." },
          { question: "What does type='password' do to the input?", options: ["Requires the password to have symbols", "Automatically encrypts the input before sending", "Hides the typed characters (shows dots or asterisks)", "Requires the input to match another field"], correctIndex: 2, explanation: "type='password' masks the characters as the user types — showing dots or asterisks instead of the actual characters. This prevents shoulder-surfing. The data is still sent as plain text unless HTTPS is used." },
          { question: "What happens on a mobile device when an input has type='number'?", options: ["The input disappears on mobile", "The browser shows a numeric keypad instead of the full keyboard", "The input requires a number in any language", "Nothing — mobile browsers ignore type attribute"], correctIndex: 1, explanation: "type='number' on mobile triggers the numeric keyboard — a keypad with digits 0-9. This makes number entry faster and easier on touch screens without having to switch keyboard modes." },
          { question: "What is type='radio' used for?", options: ["Playing audio in the form", "Selecting exactly one option from a group of options", "Creating a circular loading indicator", "Allowing multiple items to be selected"], correctIndex: 1, explanation: "type='radio' creates a radio button — users can select exactly one option from a group. All radio buttons in a group must share the same name attribute to work correctly as a group." },
          { question: "What attribute links radio buttons into a mutual-exclusion group?", options: ["group='same-name'", "The same name attribute value across all options in the group", "The same id attribute", "The radio-group wrapper element"], correctIndex: 1, explanation: "Radio buttons in the same group must share the same name attribute. When one is selected, others with the same name automatically deselect — enforcing 'pick exactly one'." },
          { question: "What is the difference between checkbox and radio inputs?", options: ["Checkboxes are circular; radio buttons are square", "Checkboxes allow multiple selections; radio buttons allow exactly one selection per group", "Checkboxes can be required; radio buttons cannot", "Radio buttons submit data; checkboxes do not"], correctIndex: 1, explanation: "Checkboxes are independent — each can be checked or unchecked independently. Radio buttons are grouped — selecting one deselects all others with the same name. Checkboxes for multi-select, radios for single-select." },
          { question: "What does type='file' enable?", options: ["Reading files from a server", "File uploads — the input opens a file picker dialog", "Writing files to the user's computer", "Downloading files from the web"], correctIndex: 1, explanation: "type='file' shows a file picker button. Users can select a file from their device. For file uploads to work, the form must have method='post' and enctype='multipart/form-data'." },
          { question: "What does type='submit' create?", options: ["A text input for submission date", "A button that submits the form data when clicked", "A field to enter the form's action URL", "A hidden field with submission metadata"], correctIndex: 1, explanation: "type='submit' creates a clickable button that triggers form submission. Clicking it validates the form and sends data to the action URL. The button displays 'Submit' by default unless you set a value attribute." },
          { question: "What does type='reset' do?", options: ["Resets the user's browser to factory settings", "Clears all form fields back to their original default values", "Resubmits the form with original data", "Refreshes the page without submitting"], correctIndex: 1, explanation: "type='reset' creates a button that clears all form inputs back to their default values (empty or the value specified in the value attribute). Be cautious — users can accidentally reset and lose all their input." },
          { question: "What is type='range' used for?", options: ["Setting a date range with two pickers", "A slider control for selecting a numeric value within a range", "Specifying the range of valid passwords", "Setting min and max for number inputs"], correctIndex: 1, explanation: "type='range' renders a slider that lets users select a number within a range. min, max, and step attributes control the slider's range and granularity. Combine with a label showing the current value for best UX." },
          { question: "What does the accept attribute do on type='file'?", options: ["Sets the maximum number of files allowed", "Filters which file types the picker shows", "Sets the maximum file size allowed", "Accepts the EULA automatically"], correctIndex: 1, explanation: "accept='image/*' or accept='.pdf,.doc' filters which file types appear in the file picker dialog. It is a hint — users can override it. Always validate file types on the server too." },
          { question: "What is type='hidden' used for?", options: ["Creating invisible form fields that submit data the user cannot see", "Hiding the entire form from users", "Making the input password-strength invisible", "Creating a field only visible to admins"], correctIndex: 0, explanation: "type='hidden' creates a non-visible input that still submits its value with the form. Used for CSRF tokens, user IDs, page IDs, or other data that should be included in the submission but not shown to users." },
          { question: "What does type='color' render?", options: ["A text input that accepts color names like 'red'", "A color picker dialog for selecting a color", "A dropdown of predefined CSS colors", "An input for entering hex color codes as text"], correctIndex: 1, explanation: "type='color' renders a color picker — a visual interface for selecting colors. The value is a hex color string like #ff0000. Browser implementations vary slightly in appearance." },
          { question: "What is type='date' and how does it display?", options: ["A text input for typing any date format", "A date picker control — browsers show a calendar interface", "A dropdown of months and years", "An input that auto-formats dates as you type"], correctIndex: 1, explanation: "type='date' shows a date picker control — the exact UI varies by browser and OS but typically includes a calendar. The value is always formatted as YYYY-MM-DD regardless of what the user sees." },
          { question: "What mobile keyboard does type='tel' trigger?", options: ["The full QWERTY keyboard", "A phone-style numeric keypad with * and #", "The numeric pad only", "A special international phone format keyboard"], correctIndex: 1, explanation: "type='tel' on mobile triggers a phone-style keypad including digits 0-9, *, #, and + for international codes. Note: type='tel' does NOT validate phone number format — use pattern for validation." },
          { question: "What does the multiple attribute on type='file' do?", options: ["Sets the maximum file count to any number", "Allows users to select multiple files at once from the file picker", "Enables uploading to multiple servers", "Creates multiple file input buttons"], correctIndex: 1, explanation: "The multiple attribute on type='file' (and type='email') allows selecting multiple items. <input type='file' multiple> lets users select multiple files in the file dialog (Ctrl+click or Shift+click)." },
          { question: "What does type='url' validate?", options: ["That the input is an existing website that responds", "That the input has the format of a URL (starts with http:// or https://)", "That the URL domain is registered", "That the URL does not contain special characters"], correctIndex: 1, explanation: "type='url' validates that the input has URL format — typically requiring a scheme like https://. It does NOT check if the URL actually exists or is reachable." },
          { question: "What does the step attribute on type='number' or type='range' do?", options: ["Creates steps/stages in the form for multi-step UX", "Sets the increment amount for the value when using arrow keys or the slider", "Specifies the number of decimal places shown", "Creates visual step markers below the input"], correctIndex: 1, explanation: "step sets the increment: <input type='number' min='0' max='100' step='5'> allows values 0, 5, 10, 15... Arrow keys increment by the step amount. step='any' allows any decimal value." },
          { question: "What is type='search' different from type='text'?", options: ["It queries a search engine directly", "Browsers may style it differently (rounded corners, X to clear) and it is semantically appropriate for search", "It adds a search icon inside the input", "It is always a larger input field"], correctIndex: 1, explanation: "type='search' is semantically a search field. Some browsers show an X to clear it and may style it with rounded corners. Search inputs may also receive special treatment in accessibility tools." }
        ]
      },
      {
        id: "topic-5-3",
        title: "Labels & Placeholders",
        explanation: `Labels and placeholders both provide guidance to form users, but they serve fundamentally different purposes and should never be confused or substituted for each other.

The <label> element creates a visible text description for a form control. The for attribute links the label to its input by matching the input's id attribute. This linkage has two important effects: clicking the label focuses the input (larger click target, especially useful on mobile), and screen readers read the label aloud when the input is focused.

Always use <label> for form fields. It is not optional — missing labels break accessibility. Screen reader users cannot understand what an unlabeled input is for.

Placeholder text (the placeholder attribute on inputs) is hint text that appears inside the input field when it is empty and disappears when the user starts typing. It is designed to show a format example or hint: "Enter your email address" or "YYYY-MM-DD".

The critical rule: placeholder is NOT a replacement for a label. When placeholder text disappears on focus or typing, users forget what the field is for — especially frustrating for users with cognitive disabilities or those who pause mid-form. Always have a visible label.

Two ways to associate labels with inputs: the for/id method (label separate from input, linked by matching values), or wrapping the input inside the label element (no for/id needed, the association is implicit).`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Labels and Placeholders</title>
  </head>
  <body>
    <h1>Labels and Placeholders</h1>

    <form>
      <!-- Method 1: Separate label linked by for/id -->
      <div>
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="e.g. johndoe123"
        />
      </div>

      <!-- Method 2: Wrapping label (implicit association) -->
      <div>
        <label>
          Email Address
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <!-- Placeholder showing expected format -->
      <div>
        <label for="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <!-- Password: no placeholder with the actual password -->
      <div>
        <label for="password">Password (8+ characters)</label>
        <input type="password" id="password" name="password" />
      </div>

      <button type="submit">Submit</button>
    </form>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Properly Label Every Field",
            description: "Create a form with 4 fields (Name, Email, Age, City). Use the for/id method to properly link each label to its input. Verify that clicking the label text focuses the input.",
            hint: "The label's for value must exactly match the input's id value. Example: for='my-email' links to id='my-email'."
          },
          {
            title: "Exercise 2 – Wrapping Label Method",
            description: "Rebuild the same form using the wrapping label method instead — wrap each input inside its label. Note that you do not need for or id attributes with this method.",
            hint: "<label>Email <input type='email' name='email' placeholder='...'></label>"
          },
          {
            title: "Exercise 3 – Label + Placeholder + Required",
            description: "Create a registration form where every field has: a visible label, a helpful placeholder showing the expected format, and the required attribute. Verify that browser validation shows errors when fields are empty.",
            hint: "Add required attribute to inputs that must be filled: <input type='text' id='name' name='name' placeholder='Jane Smith' required />"
          }
        ],
        quiz: [
          { question: "What does the for attribute on <label> do?", options: ["Specifies what CSS class to apply to the input", "Links the label to an input with the matching id value", "Sets how many times the label appears", "Defines the label's purpose for SEO"], correctIndex: 1, explanation: "The for attribute on <label> matches the id attribute of the associated input. This links them, enabling: clicking the label focuses the input, and screen readers announce the label text when the input is focused." },
          { question: "Can placeholder text replace a <label> element?", options: ["Yes — placeholder text is sufficient for accessibility", "No — placeholder disappears when typing, leaving users without guidance", "Only for short, simple forms", "Only if the placeholder is long enough"], correctIndex: 1, explanation: "Placeholder text is NOT a replacement for labels. Placeholders disappear when users start typing, which is confusing for users with cognitive disabilities. Always use <label> for accessibility." },
          { question: "What does clicking a label do (when properly linked with for/id)?", options: ["Nothing visible — labels are decorative only", "Focuses the associated input and places the cursor there", "Submits the form", "Highlights the input with a border"], correctIndex: 1, explanation: "Clicking a properly linked <label> focuses (activates) its associated input. This is especially important for checkboxes and radio buttons — it creates a much larger click target." },
          { question: "What is the benefit of labels for screen reader users?", options: ["Screen readers skip labeled inputs", "Screen readers read the label text aloud when the input is focused, so users know what to enter", "Labels enable screen readers to auto-fill the form", "Labels change how the screen reader navigates the page"], correctIndex: 1, explanation: "When a screen reader user focuses an input with a linked label, the reader announces the label text. Without a label, the reader might say 'edit text' with no context — the user has no idea what the field is for." },
          { question: "What are the two ways to associate a <label> with an <input>?", options: ["Using class and id attributes", "Using the for/id method or wrapping the input inside the label element", "Using aria-label or data-label attributes", "Using label.for() in JavaScript"], correctIndex: 1, explanation: "Method 1: <label for='email'>Email</label><input id='email'>. Method 2: <label>Email <input type='email'></label>. Both create the same accessible association." },
          { question: "When using the wrapping label method, do you need for and id attributes?", options: ["Yes, for/id are still required", "No — the association is implicit when input is inside label", "Only for/id is needed — not wrapping", "You need id but not for"], correctIndex: 1, explanation: "When the input is nested inside the label, the association is implicit — no for or id attributes needed. The browser understands the input belongs to that label by containment." },
          { question: "What is placeholder text best used for?", options: ["Primary labels describing what a field is for", "Showing an example or hint of expected format — not as a primary label", "Displaying the field's current value", "Setting the field's default value"], correctIndex: 1, explanation: "Placeholder is best for format hints: 'e.g. YYYY-MM-DD' or '+1 (555) 000-0000'. It shows how to fill in the field, not what the field is for. The label answers 'what is this?' and placeholder answers 'what format?'" },
          { question: "What accessibility issue does placeholder text as the only label create?", options: ["Placeholders render too small on mobile screens", "Users with cognitive disabilities or those who pause mid-form may forget what a field is for after the placeholder disappears", "Screen readers cannot access placeholder text", "Placeholder text causes form submission failures"], correctIndex: 1, explanation: "When placeholder is the only label and a user has typed something (making the placeholder disappear), they may forget what the field was for — especially in long forms or for users with cognitive impairments." },
          { question: "What CSS property changes placeholder text color?", options: ["placeholder-color: #999", "::placeholder { color: #999; }", "input.placeholder { color: #999; }", "placeholder-text-color: #999"], correctIndex: 1, explanation: "The ::placeholder pseudo-element styles placeholder text: ::placeholder { color: #bbb; font-style: italic; }. Browser support is good, though some older browsers need vendor prefixes." },
          { question: "What happens when the for attribute value does not match any input's id?", options: ["The browser shows an error", "The label has no functional association — clicking it does nothing, accessibility is broken", "The label applies to all inputs in the form", "The browser automatically links it to the nearest input"], correctIndex: 1, explanation: "If for='name' but no input has id='name', the label has no functional link. Clicking the label does nothing. Screen readers may not properly announce it. Always verify that for and id values match exactly." },
          { question: "Is placeholder text required for accessibility?", options: ["Yes, it is required by WCAG", "No — placeholder is optional and a convenience feature", "Yes, without placeholder, forms fail validation", "Only for inputs longer than 50 characters"], correctIndex: 1, explanation: "Placeholder is optional. Labels are required for accessibility. A well-labeled input with no placeholder is fully accessible. An input with only placeholder and no label is not accessible." },
          { question: "Can multiple labels be linked to the same input?", options: ["No — one label per input is the rule", "Yes, multiple labels can share the same for value", "Only if they are wrapped in a <labelgroup> element", "Only in the same row of a table"], correctIndex: 1, explanation: "Multiple <label> elements can use the same for value, linking them all to one input. Screen readers may announce all linked labels. This is useful for combining a visible label with an additional description." },
          { question: "What is aria-label and when would you use it on an input?", options: ["A label attribute only visible to admin users", "An accessible name for an input when a visible label is not present — read by screen readers", "A label specifically for ARIA assistive technology developers", "A label that describes the form's legal compliance"], correctIndex: 1, explanation: "aria-label='Search' on an input provides a screen-reader-accessible name when a visible label cannot be displayed (like a search box with only an icon). It is not visible on screen — it is an accessibility attribute." },
          { question: "What is aria-describedby?", options: ["An attribute that describes the aria system to the browser", "Links an input to a separate element whose text serves as a description for screen readers", "A label for dropdown menus only", "An attribute for describing an element's CSS state"], correctIndex: 1, explanation: "aria-describedby links an input to another element's id: <input aria-describedby='hint-text'><p id='hint-text'>Must be 8+ characters</p>. Screen readers announce the description after the label and input type." },
          { question: "What is the purpose of the title attribute on an input?", options: ["Required for HTML validation", "Provides a tooltip that may appear on hover — but not a reliable accessibility substitute for labels", "Sets the input's display title above the field", "Defines the type of data expected"], correctIndex: 1, explanation: "The title attribute creates a tooltip on hover. Some browsers may show it as a validation hint. However, it is NOT a reliable replacement for proper labels — many screen readers and mobile browsers do not expose it." },
          { question: "What visual indicator shows a form field is required?", options: ["A red border automatically added by browsers", "A custom required indicator — often an asterisk (*) — styled manually with CSS", "The required attribute changes the label color automatically", "Browsers automatically add 'Required' text next to the label"], correctIndex: 1, explanation: "Browsers do not add visual 'required' indicators automatically. The convention is to add an asterisk (*) next to the label text: <label>Name <span aria-hidden='true'>*</span></label>, and include a note explaining the asterisk." },
          { question: "What does the for attribute's value need to match exactly?", options: ["The input's name attribute value", "The input's class attribute value", "The input's id attribute value", "The form's id attribute value"], correctIndex: 2, explanation: "The label's for attribute must match the input's id attribute — exactly, including capitalization and hyphens. for='user-email' links to id='user-email'. Mismatches break the association." },
          { question: "What kind of form fields benefit most from clicking the label to focus?", options: ["Text inputs only", "Checkboxes and radio buttons — making them much easier to click on mobile", "Select dropdowns only", "File inputs only"], correctIndex: 1, explanation: "Checkboxes and radio buttons have small click targets. Linking a label makes the entire label text clickable to toggle/select — crucial for mobile usability. Without proper labels, users must click precisely on the tiny control." },
          { question: "What does the label element NOT do?", options: ["Provide accessible text for screen readers", "Create a larger click area for inputs", "Submit form data to the server", "Visually describe what an input is for"], correctIndex: 2, explanation: "<label> does not submit data. It creates: (1) a visible description, (2) an accessible association for screen readers, and (3) an extended click area. Data submission is handled by <input>, <textarea>, etc." },
          { question: "What is the WCAG guideline related to labels?", options: ["WCAG 1.4.4 - Resize Text", "WCAG 1.3.1 - Info and Relationships and WCAG 3.3.2 - Labels or Instructions", "WCAG 2.4.3 - Focus Order", "WCAG 1.1.1 - Non-text Content"], correctIndex: 1, explanation: "WCAG 1.3.1 requires that information conveyed through presentation (like visual labels) also be available programmatically. WCAG 3.3.2 requires labels or instructions for user input fields. Both are Level A requirements." }
        ]
      },
      {
        id: "topic-5-4",
        title: "Dropdown & Textarea",
        explanation: `While <input> handles single-line text and various specialized inputs, two more form elements cover longer text and option selection: <textarea> for multi-line text, and <select> for dropdown menus.

The <textarea> element creates a multi-line text input — perfect for messages, comments, descriptions, and any text requiring multiple lines. Unlike <input>, it has an opening and closing tag. Default content goes between the tags. Key attributes: rows (number of visible text rows), cols (visible character width), though CSS is preferred for sizing. Users can resize the textarea by default (dragable corner). Use CSS resize: none to prevent resizing, or resize: vertical to allow only vertical resizing.

The <select> element creates a dropdown menu. Inside it, <option> elements define the choices. Each <option> has a value attribute (what gets submitted) and display text (what the user sees). The selected attribute makes an option pre-selected by default.

To create grouped options within a select, use <optgroup label="Category"> to visually group related options.

The multiple attribute on <select> turns it into a multi-selection list (users hold Ctrl/Cmd to select multiple). The size attribute controls how many options are visible at once.

Both elements should have a <label>, and <textarea> can use placeholder just like input.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Dropdown and Textarea</title>
  </head>
  <body>
    <h1>Select and Textarea</h1>
    <form>

      <!-- Dropdown select -->
      <label for="country">Country:</label>
      <select id="country" name="country">
        <option value="">-- Select a country --</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au" selected>Australia</option>
      </select>

      <!-- Grouped options with optgroup -->
      <label for="fruit">Favorite Fruit:</label>
      <select id="fruit" name="fruit">
        <optgroup label="Citrus">
          <option value="orange">Orange</option>
          <option value="lemon">Lemon</option>
        </optgroup>
        <optgroup label="Berries">
          <option value="strawberry">Strawberry</option>
          <option value="blueberry">Blueberry</option>
        </optgroup>
      </select>

      <!-- Textarea for multi-line text -->
      <label for="bio">About You:</label>
      <textarea
        id="bio"
        name="bio"
        rows="5"
        cols="50"
        placeholder="Tell us about yourself..."
      ></textarea>

      <button type="submit">Save</button>
    </form>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Country + Message Form",
            description: "Create a form with: a dropdown to select your country (include at least 5 countries), a second dropdown for preferred language (3 options), and a textarea for leaving a message. Give everything proper labels.",
            hint: "Each select needs a label. Give the select an id and the label a for='same-id'. The textarea's opening and closing tags must have nothing between them if there is no default content."
          },
          {
            title: "Exercise 2 – Grouped Select",
            description: "Create a dropdown for 'Programming Language Preference' that uses <optgroup> to group options into: Web Languages (HTML, CSS, JavaScript), Backend Languages (Python, Java, Go), and Mobile Languages (Swift, Kotlin).",
            hint: "Structure: <select><optgroup label='Web Languages'><option>HTML</option>...</optgroup><optgroup label='Backend'>...</optgroup></select>"
          },
          {
            title: "Exercise 3 – Feedback Form",
            description: "Build a complete feedback form with: Name (text input), Email (email), Rating (dropdown: 1-5 stars), Category (grouped select: Bug/Feature/Other), and detailed feedback (large textarea with rows='8'). All fields should be required.",
            hint: "Combine all the elements you have learned. Use required on each field. The rating select's options should be 1, 2, 3, 4, 5 with labels like '5 - Excellent'."
          }
        ],
        quiz: [
          { question: "What element creates a multi-line text input?", options: ["<input type='multiline'>", "<text>", "<textarea>", "<input rows='5'>"], correctIndex: 2, explanation: "<textarea> creates a multi-line text input with a visible area for long text. It has opening and closing tags (<textarea></textarea>) and can contain default text between them." },
          { question: "What element creates a dropdown menu?", options: ["<dropdown>", "<input type='select'>", "<menu>", "<select>"], correctIndex: 3, explanation: "<select> creates a dropdown menu. Options are defined with <option> elements inside <select>. The user can select one (or multiple, with the multiple attribute)." },
          { question: "What element defines each choice in a dropdown?", options: ["<choice>", "<option>", "<item>", "<value>"], correctIndex: 1, explanation: "<option> elements inside <select> define each choice: <option value='us'>United States</option>. The value is submitted; the text between tags is what the user sees." },
          { question: "What does the selected attribute on an <option> do?", options: ["Prevents the option from being deselected", "Makes the option pre-selected by default when the page loads", "Disables the option so it cannot be selected", "Marks the option as the correct answer in a quiz"], correctIndex: 1, explanation: "selected on an <option> makes that option the default pre-selected value: <option value='au' selected>Australia</option>. If no option has selected, the first option is shown by default." },
          { question: "What does the rows attribute on <textarea> control?", options: ["The maximum number of lines allowed in the input", "The number of visible text rows (height) in the textarea", "The row number in the form layout", "The spacing between lines of text"], correctIndex: 1, explanation: "rows sets the visible height of the textarea in terms of text rows: rows='5' shows 5 lines of text before scrolling. This can also be controlled with CSS height." },
          { question: "What does the cols attribute on <textarea> control?", options: ["The number of columns in a multi-column form layout", "The visible width in terms of character count", "The column alignment of the form", "The number of columns allowed in structured text"], correctIndex: 1, explanation: "cols sets the visible width of the textarea in character units: cols='40' shows approximately 40 characters wide. CSS width is preferred for precise control." },
          { question: "How do you prevent users from resizing a textarea?", options: ["<textarea no-resize>", "CSS: textarea { resize: none; }", "Using the fixed attribute", "Setting rows and cols to specific values"], correctIndex: 1, explanation: "CSS resize: none prevents textarea resizing. Other values: resize: vertical (only vertical resize allowed), resize: horizontal, resize: both (default browser behavior)." },
          { question: "What does the value attribute on <option> do?", options: ["Sets the text shown to users in the dropdown", "Specifies the data value submitted to the server when this option is selected", "Sets the default placeholder for the option", "Controls the visual styling of the option"], correctIndex: 1, explanation: "The value attribute is what gets submitted: <option value='us'>United States</option> — the server receives 'us', not 'United States'. Users see the display text; servers receive the value." },
          { question: "What does <optgroup label='Fruits'> create?", options: ["A filter that limits options to fruit-related items", "A visual group header in the dropdown that cannot itself be selected", "A separate dropdown for fruits inside the main dropdown", "A label above the dropdown showing 'Fruits'"], correctIndex: 1, explanation: "<optgroup> creates a labeled group within a dropdown. The label appears as a non-selectable header in the dropdown list. It visually organizes options into categories." },
          { question: "What does the multiple attribute on <select> enable?", options: ["Creates multiple identical dropdowns", "Allows users to select multiple options (using Ctrl+click or Shift+click)", "Multiplies the dropdown size", "Creates a multi-column dropdown layout"], correctIndex: 1, explanation: "multiple on <select> converts the dropdown to a multi-selection list box. Users hold Ctrl (Windows) or Cmd (Mac) to select multiple options. The select displays as a list with the size attribute controlling visible items." },
          { question: "How do you place default text in a textarea?", options: ["Using the placeholder attribute only", "Using the value attribute", "Placing the text between <textarea> opening and closing tags", "Using the content attribute"], correctIndex: 2, explanation: "Default text in textarea goes between the tags: <textarea>Default content here</textarea>. The value attribute does not work for textarea — content goes between the tags, not in an attribute." },
          { question: "What is the purpose of a blank first option in a select dropdown?", options: ["Required by HTML specification", "Ensures no value is pre-selected — forces the user to make a deliberate choice", "Creates a visual separator in the dropdown", "Prevents form submission if not changed"], correctIndex: 1, explanation: "<option value=''>-- Choose a country --</option> as the first option ensures no meaningful value is pre-selected. With required on the select, this blank option forces the user to make a choice." },
          { question: "Can you add placeholder text to a <select> dropdown?", options: ["Yes, using placeholder='Choose an option'", "No, placeholder does not work on <select>", "Only in Chrome and Firefox", "Using the hint attribute instead"], correctIndex: 1, explanation: "The placeholder attribute does not work on <select>. The common workaround is a blank/disabled first option: <option value='' disabled selected>Choose an option</option>." },
          { question: "What does the disabled attribute on an <option> do?", options: ["Makes the option invisible to users", "The option appears greyed out and cannot be selected", "Prevents the form from submitting if that option is chosen", "Moves the option to the bottom of the list"], correctIndex: 1, explanation: "disabled on an <option> makes it visible in the dropdown but greyed out and unselectable. Useful for showing a placeholder label: <option value='' disabled selected>Select an option</option>." },
          { question: "What does the size attribute on <select> do?", options: ["Sets the dropdown width in pixels", "Controls how many options are visible at once without scrolling", "Sets the font size for options", "Limits the maximum number of options allowed"], correctIndex: 1, explanation: "size='5' on <select> shows 5 options visible simultaneously as a list box instead of a collapsed dropdown. This changes the visual presentation from a dropdown to a scrollable list." },
          { question: "Can <textarea> contain HTML markup as default content?", options: ["Yes, HTML tags are parsed inside textarea", "No — textarea content is plain text; HTML tags appear as literal text", "Only if the textarea has a type='html' attribute", "Only if the page has a specific DOCTYPE"], correctIndex: 1, explanation: "Content inside <textarea> is treated as plain text. HTML tags are displayed as literal characters (<b>bold</b> shows as text, not bold). For HTML content editing, you need contenteditable or a rich text editor library." },
          { question: "How do you set the maximum number of characters in a textarea?", options: ["Using the max attribute", "Using the max-length attribute", "Using maxlength attribute", "Textareas have no character limit by default and the limit must be enforced with JavaScript"], correctIndex: 2, explanation: "maxlength='500' on <textarea> limits input to 500 characters. The browser enforces this — users cannot type beyond the limit. Combine with minlength for minimum character requirements." },
          { question: "What does the wrap attribute on <textarea> control?", options: ["Text wrapping behavior when the text is submitted to the server", "How the textarea border wraps around the element", "The line wrapping of labels around the textarea", "The word-wrap CSS applied to the textarea"], correctIndex: 0, explanation: "wrap='soft' (default): visual wrapping, but submitted without newlines from wrapping. wrap='hard': physical newlines inserted where text wraps. wrap='off': no wrapping — horizontal scroll instead." },
          { question: "What CSS makes a textarea stretch to fill its container width?", options: ["<textarea full-width>", "CSS: textarea { width: 100%; box-sizing: border-box; }", "CSS: textarea { flex: 1; }", "The textarea automatically fills its container width"], correctIndex: 1, explanation: "textarea { width: 100%; box-sizing: border-box; } makes the textarea fill its container. box-sizing: border-box ensures padding and border are included in the width calculation." },
          { question: "Can you wrap a <select> element in a <label>?", options: ["No, <label> can only wrap input elements", "Yes, and this creates a proper accessible association", "Only if the select has no options inside it", "Only in specific browser environments"], correctIndex: 1, explanation: "Yes! <label>Country <select name='country'><option>...</option></select></label> creates an implicit association just like wrapping an input in a label. Both approaches work for select elements." }
        ]
      },
      {
        id: "topic-5-5",
        title: "Form Validation Attributes",
        explanation: `HTML5 introduced native browser-level form validation — the ability to validate user input without writing any JavaScript. This is done through validation attributes directly on form elements.

The most common validation attributes:

required — makes the field mandatory. Browsers block form submission if it is empty.

minlength and maxlength — specify minimum and maximum character lengths for text inputs and textareas. If the user types fewer than minlength characters, submission is blocked.

min and max — for numeric and date inputs, specify the minimum and maximum valid values. min="18" max="100" on a number input only allows values between 18 and 100.

pattern — accepts a JavaScript regular expression that the input value must match. pattern="[A-Za-z0-9]{6,12}" requires alphanumeric characters between 6 and 12 in length.

type-based validation — using the correct type attributes (email, url, number) applies automatic format validation without any additional attributes.

When validation fails, browsers show inline error messages automatically. The :valid and :invalid CSS pseudo-classes let you style valid and invalid fields visually.

For complex validation that HTML attributes cannot handle (like "password must contain at least one uppercase letter"), use JavaScript validation alongside or instead of HTML validation.`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Form Validation</title>
    <style>
      input:valid { border-color: green; }
      input:invalid:not(:placeholder-shown) { border-color: red; }
    </style>
  </head>
  <body>
    <h1>Form Validation Attributes</h1>
    <form>

      <!-- required: field must be filled -->
      <label for="name">Full Name (required):</label>
      <input type="text" id="name" name="name" required />

      <!-- minlength + maxlength: character count limits -->
      <label for="username">Username (4-15 chars):</label>
      <input
        type="text"
        id="username"
        name="username"
        minlength="4"
        maxlength="15"
        required
      />

      <!-- pattern: must match a regex -->
      <label for="zip">ZIP Code (5 digits):</label>
      <input
        type="text"
        id="zip"
        name="zip"
        pattern="[0-9]{5}"
        title="Please enter a 5-digit ZIP code"
        required
      />

      <!-- min + max on number -->
      <label for="age">Age (18-120):</label>
      <input
        type="number"
        id="age"
        name="age"
        min="18"
        max="120"
        required
      />

      <!-- Email type: automatic format validation -->
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />

      <button type="submit">Submit</button>
    </form>
  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Add Validation to Existing Form",
            description: "Take a form you built previously and add validation attributes: required to all fields, minlength='2' to name fields, email type to email fields, and min='0' max='120' to any age/number field. Submit the form with invalid data to see browser error messages.",
            hint: "Add the attributes directly to the input tags. The browser handles all error messaging automatically."
          },
          {
            title: "Exercise 2 – Pattern Validation",
            description: "Create a form field for a UK postal code (pattern like 'SW1A 1AA'). Use the pattern attribute with the regex '[A-Z]{1,2}[0-9][0-9A-Z]?\\s?[0-9][A-Z]{2}'. Add a title attribute explaining the expected format.",
            hint: "The title attribute text shows in the browser's validation error message. Use pattern='[A-Z]{1,2}[0-9][0-9A-Z]? ?[0-9][A-Z]{2}' and title='UK postcode format: SW1A 1AA'"
          },
          {
            title: "Exercise 3 – Style Valid & Invalid Fields",
            description: "Add CSS to style form validation states: input:valid with a green border, input:invalid with a red border (only after the user has typed something, using :not(:placeholder-shown)). This gives real-time feedback as users type.",
            hint: "Add in <style>: input:valid { border: 2px solid green; } input:invalid:not(:placeholder-shown) { border: 2px solid red; }"
          }
        ],
        quiz: [
          { question: "What does the required attribute do on a form input?", options: ["Makes the input field visually stand out", "Blocks form submission if the field is empty", "Automatically fills the field with default content", "Requires the user to use uppercase letters"], correctIndex: 1, explanation: "required is a Boolean attribute that makes a field mandatory. If the user tries to submit the form with the field empty (or with just whitespace), the browser shows an error and prevents submission." },
          { question: "What does minlength='8' on a text input do?", options: ["Sets the minimum visual width of the input", "Requires the user to enter at least 8 characters before the form can submit", "Limits input to only the first 8 characters", "Sets the minimum font size for text in the input"], correctIndex: 1, explanation: "minlength='8' requires at least 8 characters. Submitting with fewer triggers a browser validation error: 'Please lengthen this text to 8 characters or more (you are currently using N characters).'" },
          { question: "What does maxlength='50' on an input do?", options: ["Shows an error if the user types more than 50 characters", "Prevents the user from typing more than 50 characters — hard limit", "Shows a counter of remaining characters (50 - current)", "Only allows 50 specific characters"], correctIndex: 1, explanation: "maxlength is a hard limit — the browser stops accepting input after the maximum is reached. Unlike minlength (which shows a validation error), the user simply cannot type beyond maxlength." },
          { question: "What does the pattern attribute on an input accept?", options: ["A CSS selector pattern", "A JavaScript regular expression the value must fully match", "An example value showing the expected format", "A list of allowed values separated by commas"], correctIndex: 1, explanation: "pattern takes a JavaScript regular expression. The entire input value must match the pattern for validation to pass. Example: pattern='[0-9]{5}' requires exactly 5 digits." },
          { question: "What does the title attribute do on an input with a pattern?", options: ["Sets the input label text", "Provides the error message text browsers show when pattern validation fails", "Creates a tooltip showing the pattern rule", "Sets the accessibility description"], correctIndex: 1, explanation: "When a pattern validation fails, browsers typically show the title attribute text in the error message. Example: title='Enter a 5-digit ZIP code' gives users a clear, human-readable validation hint." },
          { question: "What do min and max do on a number input?", options: ["Set the minimum and maximum font size", "Set the minimum and maximum valid numeric values", "Set the minimum and maximum visible digits", "Control the range slider end points visually only"], correctIndex: 1, explanation: "min and max on number (and date) inputs set the valid range. min='18' max='100' rejects numbers below 18 or above 100 on submit. Arrow key increments also respect these boundaries." },
          { question: "What CSS pseudo-class targets form inputs with valid values?", options: [":checked", ":valid", ":correct", ":success"], correctIndex: 1, explanation: ":valid targets inputs that currently pass all validation constraints. :invalid targets inputs that fail. These pseudo-classes enable real-time visual feedback as users fill out forms." },
          { question: "What CSS pseudo-class targets form inputs with invalid values?", options: [":error", ":wrong", ":invalid", ":fail"], correctIndex: 2, explanation: ":invalid targets inputs failing validation. Note: :invalid is true even for empty required fields on page load, which can cause unwanted red borders immediately. Use :not(:placeholder-shown) or :user-invalid to limit this." },
          { question: "What is the purpose of the :not(:placeholder-shown) CSS trick?", options: ["It styles inputs that have no placeholder attribute", "It prevents showing validation colors until the user has started typing (when placeholder disappears)", "It removes the placeholder when validation fails", "It shows a custom placeholder on invalid inputs"], correctIndex: 1, explanation: "input:invalid:not(:placeholder-shown) { border-color: red; } only applies the invalid style when the placeholder is hidden (user has typed something). This avoids showing red borders on empty fields immediately on page load." },
          { question: "What happens when an input's value fails pattern validation on submit?", options: ["The form submits anyway with the invalid value", "The browser shows an inline error and prevents submission", "The input clears itself automatically", "JavaScript is required to handle the error"], correctIndex: 1, explanation: "Browser-native pattern validation blocks form submission and shows an inline error near the field. The error message typically includes the title attribute text if provided." },
          { question: "Which validation method is always more thorough and reliable?", options: ["HTML attribute validation — it uses the browser's built-in capabilities", "JavaScript client-side validation — it gives more control", "Server-side validation — the final authority that cannot be bypassed", "CSS validation via :valid/:invalid pseudo-classes"], correctIndex: 2, explanation: "Server-side validation is always authoritative. Client-side validation (HTML attributes or JavaScript) can be bypassed by users disabling JavaScript or crafting custom requests. Always validate on the server." },
          { question: "Can HTML validation be bypassed by users?", options: ["No — HTML validation is enforced by browsers and cannot be bypassed", "Yes — users can submit forms with JavaScript, disabled validation, or direct HTTP requests", "Only by skilled developers with DevTools", "Only if the form uses method='get'"], correctIndex: 1, explanation: "HTML validation is a UX convenience, not a security measure. Users can bypass it using JavaScript in DevTools, form submission tools, or by using novalidate. Always implement server-side validation too." },
          { question: "What does type='email' validate automatically without additional attributes?", options: ["That the email domain exists", "That the input contains an @ sign with text before and after it", "That the email has not been used before", "That the email server is reachable"], correctIndex: 1, explanation: "type='email' validates the format — it checks for text@text.text format. It does NOT verify the email exists or that the domain is reachable. Use a confirmation email for that." },
          { question: "What is the step attribute used for in validation?", options: ["Creates steps/pages in a multi-step form", "Sets the valid increment for number inputs — values must be a multiple of step from min", "Defines the step-by-step validation order", "Creates numbered step indicators above the form"], correctIndex: 1, explanation: "step='5' on number inputs means only values that are multiples of 5 (from the min) are valid: 0, 5, 10, 15... step='any' allows any decimal value. Entering values between valid steps triggers validation errors." },
          { question: "What CSS property on an input makes the browser's required indicator appear in some browsers?", options: ["required-indicator: visible", "The required attribute alone may trigger a browser indicator (like a red asterisk in Firefox)", "validation-style: required", "content: 'required' on the input"], correctIndex: 1, explanation: "Some browsers (like older Firefox versions) add a visual 'required' indicator for inputs with the required attribute. However, this is not standardized — always add your own visible required indicator in HTML/CSS." },
          { question: "What does the novalidate attribute on a <form> do?", options: ["Prevents JavaScript from running on the form", "Disables native browser validation so the form always submits without checking", "Hides validation error messages while still checking", "Only validates on the server, not the browser"], correctIndex: 1, explanation: "novalidate on <form> disables all browser-native validation — required fields, pattern, email format, etc. Used when implementing custom JavaScript validation to avoid conflicting with browser defaults." },
          { question: "What is :user-invalid pseudo-class?", options: ["Targets inputs with values the user flagged as incorrect", "Targets inputs that have been interacted with by the user and are currently invalid", "Targets invalid inputs belonging to logged-in users", "A deprecated version of :invalid"], correctIndex: 1, explanation: ":user-invalid targets inputs that have been interacted with (blurred or changed) and are currently invalid. Unlike :invalid which activates immediately, :user-invalid only shows errors after the user has engaged with the field." },
          { question: "For a password field, which HTML attribute enforces a minimum length?", options: ["password-length='8'", "minlength='8'", "min='8'", "validate='minLength:8'"], correctIndex: 1, explanation: "minlength='8' on type='password' enforces a minimum of 8 characters. Note: For complex password rules (uppercase, symbols, etc.), use JavaScript validation alongside the HTML attribute." },
          { question: "What form element attribute makes a select dropdown required?", options: ["The required attribute on <select>", "The mandatory attribute on <option>", "required works on select, but only the empty option must be selected first", "required does not work on <select>"], correctIndex: 0, explanation: "required works on <select>. If the selected value is empty (value=''), the form won't submit. Pair with an empty first option: <option value=''>Choose...</option> and the required attribute on <select>." },
          { question: "What is constraint validation and how does it relate to HTML5 form attributes?", options: ["A server-side validation API for checking data constraints in the database", "The HTML5 form validation API that allows checking validity programmatically and customizing error messages via JavaScript", "A CSS constraint system for limiting form element sizes", "A browser security feature that constrains cross-origin form submission"], correctIndex: 1, explanation: "Constraint validation is the HTML5 specification for native form validation. The ValidityState object (input.validity.valueMissing, input.validity.patternMismatch, etc.) and input.setCustomValidity() give JavaScript access to validation states and custom messages." }
        ]
      },
      {
        id: "topic-5-6",
        title: "Semantic HTML Elements",
        explanation: `Semantic HTML means using HTML elements that carry meaning about the content they contain — not just using <div> and <span> for everything. HTML5 introduced a rich set of semantic elements that describe their content's purpose.

The most important semantic elements for page structure: <header> contains introductory content — typically a logo, site title, and navigation. <nav> wraps navigation links — the main menu of the site. <main> contains the primary content of the page — there should be only one <main> per page. <footer> contains the page or section footer — copyright, links, contact info. <article> represents self-contained content that could stand alone (a blog post, news article, forum post). <section> groups related content with a heading — a thematic section of a page. <aside> represents tangentially related content — a sidebar, callout box, or related links.

Why does semantic HTML matter so much?

SEO: Search engines understand your content structure. Google knows <main> is the primary content, <nav> is navigation, and <article> is your main content piece. This improves search rankings.

Accessibility: Screen readers use semantic elements to help users navigate. Users can jump directly to <main>, skip the <nav>, or navigate between <article> elements.

Maintainability: Code that says <header> is infinitely clearer than <div id="top-section">. Semantic code documents itself.

Browser defaults: Browsers apply meaningful default styling and behavior to semantic elements (though minimal).`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Semantic HTML</title>
  </head>
  <body>

    <!-- Site header: logo, branding, nav -->
    <header>
      <h1>CodeCraft</h1>
      <p>Learn HTML the right way</p>
    </header>

    <!-- Primary navigation -->
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/courses">Courses</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>

    <!-- Main content: only one per page -->
    <main>

      <!-- A section groups related content -->
      <section>
        <h2>Featured Courses</h2>
        <!-- An article is self-contained, shareable content -->
        <article>
          <h3>HTML Fundamentals</h3>
          <p>Learn the building blocks of the web...</p>
        </article>
        <article>
          <h3>CSS Styling</h3>
          <p>Make your pages beautiful...</p>
        </article>
      </section>

      <!-- Aside: supplementary content -->
      <aside>
        <h3>Did You Know?</h3>
        <p>HTML was invented in 1991 by Tim Berners-Lee.</p>
      </aside>

    </main>

    <!-- Site footer -->
    <footer>
      <p>© 2024 CodeCraft. All rights reserved.</p>
      <a href="/privacy">Privacy Policy</a>
    </footer>

  </body>
</html>`,
        exercises: [
          {
            title: "Exercise 1 – Restructure a Page Semantically",
            description: "Take a page built with only <div> elements and rebuild it using semantic elements: replace the top section with <header>, the menu with <nav>, the content area with <main>, any sidebar with <aside>, and the bottom with <footer>.",
            hint: "Each semantic element replaces the role a div was playing. header = top of page, nav = menu links, main = primary content, aside = sidebar, footer = bottom of page."
          },
          {
            title: "Exercise 2 – Build a Blog Layout",
            description: "Create a blog page with: a <header> (site name + tagline), <nav> (3 links), <main> with two <article> elements (each with h2 title, author name, date, and 2 paragraphs), an <aside> (recent posts list), and a <footer> (copyright).",
            hint: "Structure: header > nav > main > article (× 2) + aside, footer. Articles sit inside main alongside aside."
          },
          {
            title: "Exercise 3 – Nested Sections",
            description: "Build a 'Course Catalog' page where the <main> contains two <section> elements (HTML and CSS courses). Each section has an h2 heading and contains three <article> elements representing individual courses. Add appropriate header and footer.",
            hint: "main > section (×2) > article (×3 each). Each article should have an h3 course title and a short description paragraph."
          }
        ],
        quiz: [
          { question: "What does the <header> element represent?", options: ["The <head> section of the document", "Introductory content — site logo, title, and navigation at the top of a page or section", "The first heading element on a page", "A header row in a table"], correctIndex: 1, explanation: "<header> represents introductory content for a page or section — typically the site logo, branding, title, and navigation. It is distinct from <head> (document metadata)." },
          { question: "What does the <nav> element represent?", options: ["Navigation between browsers", "A section containing navigation links", "The breadcrumb trail only", "A numbered navigation system"], correctIndex: 1, explanation: "<nav> wraps major navigation link groups. Not every set of links needs <nav> — use it for the primary site navigation, table of contents, or other major navigation blocks." },
          { question: "What does the <main> element represent?", options: ["The largest section of the page visually", "The dominant, primary content of the page — unique to this page, not repeated on others", "The main HTML document (same as html element)", "The primary column in a multi-column layout"], correctIndex: 1, explanation: "<main> marks the dominant content of the page — the core content unique to this page, excluding repeated items like headers, footers, and nav. Only one <main> should appear per page." },
          { question: "What does the <footer> element represent?", options: ["The last HTML element in the file", "Footer content for a page or section — copyright, links, contact info", "The foot of a table", "The lowest visible part of the browser window"], correctIndex: 1, explanation: "<footer> represents the footer of a page or section — typically containing copyright notices, contact info, social links, legal links. A page can have multiple footers (one for the page, others for articles or sections)." },
          { question: "What makes <article> semantically unique?", options: ["It creates an article-style multi-column layout", "It represents self-contained, independently distributable content — could be shared or republished on its own", "It is the only element allowed inside <main>", "It contains only text — no other elements"], correctIndex: 1, explanation: "<article> represents content that makes sense on its own — a blog post, news article, forum thread, product card. The key test: could this content be removed and still make sense if reposted elsewhere?" },
          { question: "What does <section> represent?", options: ["A section in a CSS stylesheet", "A thematic grouping of content, typically with a heading that describes the group", "A sub-region of the <main> element only", "A part of a form that can be submitted separately"], correctIndex: 1, explanation: "<section> groups related content that belongs together thematically. Each section should have a heading. Unlike <article>, sections are not self-contained — they are parts of a larger whole." },
          { question: "What does <aside> represent?", options: ["Content that appears on the side of the screen in CSS", "Tangentially related content — sidebars, callout boxes, related links", "The aside content of an article's conclusion", "An element that creates a visual panel or card"], correctIndex: 1, explanation: "<aside> represents content related to the surrounding content but not essential to understanding it — sidebars, pull quotes, advertising, biographies. If removed, the main content would still make sense." },
          { question: "What is the primary benefit of semantic HTML for SEO?", options: ["Semantic HTML guarantees a #1 search ranking", "Search engines understand page structure — what is primary content, navigation, or supplementary — improving indexing", "Semantic elements have higher character limits for content", "Search engine bots only index content inside semantic elements"], correctIndex: 1, explanation: "Search engines like Google understand the structural purpose of semantic elements. <main> content is weighted as primary. <nav> is recognized as navigation. <article> signals self-contained quality content." },
          { question: "How do semantic elements help screen reader users?", options: ["Screen readers display a visual map of semantic elements", "Screen readers use semantics for landmark navigation — users can jump directly to <main>, skip <nav>, etc.", "Semantic elements change the reading speed of screen readers", "Screen readers convert semantic elements to audio descriptions"], correctIndex: 1, explanation: "Screen readers expose semantic 'landmarks' (main, nav, header, footer, aside). Users can navigate directly to these landmarks without reading the entire page — jumping straight to main content or the navigation." },
          { question: "Is it valid to have multiple <header> and <footer> elements on one page?", options: ["No — only one of each is allowed per page", "Yes — each <article> or <section> can have its own <header> and <footer>", "Only <footer> can appear multiple times; <header> is limited to one", "Only if they have unique id attributes"], correctIndex: 1, explanation: "Yes! <header> and <footer> are not just for the page — they can also serve as the header and footer for individual <article> or <section> elements. Each article might have its own author header and publication footer." },
          { question: "What is the difference between <article> and <section>?", options: ["<article> is for longer text; <section> is for shorter content", "<article> is self-contained (standalone); <section> is a thematic part of a larger whole", "<article> must contain headings; <section> does not require headings", "They are semantically identical — just different names"], correctIndex: 1, explanation: "<article> is self-contained and independent — it could stand alone (a blog post). <section> is a grouping element — a part of a page organized by theme (a 'Features' section). Articles can contain sections, and sections can contain articles." },
          { question: "When should you use <div> instead of semantic elements?", options: ["Always prefer <div> — it is more flexible", "When there is no appropriate semantic element and you only need a layout container for CSS styling", "When the content is not important enough for a semantic element", "When targeting older browser versions that don't support HTML5"], correctIndex: 1, explanation: "<div> is appropriate when no semantic element fits and you only need a container for CSS/JavaScript purposes. Don't force a semantic element just to avoid divs — use the right tool for each situation." },
          { question: "What is an ARIA landmark role and how do semantic elements relate?", options: ["A type of bookmark for specific DOM elements", "Semantic HTML elements automatically map to ARIA landmark roles (main, navigation, banner, contentinfo, etc.)", "A CSS positioning system for accessible elements", "A JavaScript API for navigating the DOM"], correctIndex: 1, explanation: "HTML5 semantic elements automatically have implied ARIA roles: <main> = 'main', <nav> = 'navigation', <header> = 'banner', <footer> = 'contentinfo', <aside> = 'complementary'. These are what screen reader landmark navigation uses." },
          { question: "What is the 'document outline' concept in HTML5 and why did it never fully work?", options: ["A method for generating automatic table of contents from headings", "HTML5 proposed a document outline algorithm based on sections, but browsers never implemented it — use heading hierarchy instead", "A browser feature for visualizing the DOM structure", "The process of converting HTML to PDF with proper sections"], correctIndex: 1, explanation: "HTML5 proposed that sections would create new heading contexts, allowing multiple h1s. However, no browser ever fully implemented this algorithm. The result: always use proper h1-h6 hierarchy regardless of section nesting." },
          { question: "Where should scripts typically be placed in semantic HTML?", options: ["In the <header> element of the page", "In the <head> with async/defer, or at the end of <body> before </body>", "Directly inside <main>", "In a separate <scripts> element"], correctIndex: 1, explanation: "Scripts with async or defer in <head> load without blocking HTML parsing. Alternatively, scripts at the end of <body> are read last, allowing HTML to render first. Both approaches avoid render-blocking." },
          { question: "What does the <figure> + <figcaption> semantic pair communicate?", options: ["A styled figure with a caption for design purposes only", "A self-contained unit of referenced content (image, diagram, code) with an associated caption", "The first illustration element in a section", "A pull quote element for highlighted text"], correctIndex: 1, explanation: "<figure> marks a self-contained piece of content (image, diagram, code example, graph) that is referenced in the main content. <figcaption> provides its caption. The figure could be moved within the document without loss of meaning." },
          { question: "What does the <time> element do in HTML5?", options: ["Displays a digital clock on the page", "Represents a specific time or date in a machine-readable format", "Creates a countdown timer", "Marks time-sensitive content that expires"], correctIndex: 1, explanation: "<time datetime='2024-01-15'>January 15, 2024</time> provides both human-readable text and machine-readable datetime. The datetime attribute uses standardized formats — useful for search engines, calendars, and assistive tech." },
          { question: "What is the <mark> element and when is it semantically appropriate?", options: ["For all bold text — same as <strong>", "For text highlighted due to its relevance in the current context (like search term highlighting)", "For text marked as 'to do' in a draft", "For text that has been marked as verified"], correctIndex: 1, explanation: "<mark> highlights text relevant to the user's current context — like highlighting search terms in results or marking key passages. It is not for decorative highlighting — use CSS background-color for that." },
          { question: "What does using <h1> inside a <nav> indicate?", options: ["The most important link in the navigation", "Typically a misuse — nav should contain a list of links, not a top-level heading", "The logo text which is both a heading and navigation element", "A required component of all semantic nav elements"], correctIndex: 1, explanation: "An h1 inside <nav> is unusual and likely a misuse. Navigation typically contains lists of links. If you want to label the nav, use aria-label='Main navigation' on <nav> rather than a heading inside it." },
          { question: "What is the key test for whether to use <section> or a plain <div>?", options: ["Whether the element needs a background color", "Whether the content has a heading that describes its theme — section needs a heading; div does not require one", "Whether the element contains more than 3 children", "Whether the element is visible to users"], correctIndex: 1, explanation: "The rule of thumb: if you would give the group a heading (like 'Features', 'Testimonials'), it is semantically a section. If you only need a container for styling (no heading), use a div. Sections without headings are considered poor practice." }
        ]
      }
    ]
  }
];

export const flatTopics = courseData.flatMap(lesson =>
  lesson.topics.map((topic, topicIndex) => ({
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    lessonIndex: courseData.findIndex(l => l.id === lesson.id),
    topicId: topic.id,
    topicTitle: topic.title,
    topicIndex,
    totalTopicsInLesson: lesson.topics.length,
    topic
  }))
);

export const getNextTopic = (lessonId: string, topicId: string) => {
  const currentIndex = flatTopics.findIndex(t => t.lessonId === lessonId && t.topicId === topicId);
  if (currentIndex === -1 || currentIndex === flatTopics.length - 1) return null;
  return flatTopics[currentIndex + 1];
};

export const getPrevTopic = (lessonId: string, topicId: string) => {
  const currentIndex = flatTopics.findIndex(t => t.lessonId === lessonId && t.topicId === topicId);
  if (currentIndex <= 0) return null;
  return flatTopics[currentIndex - 1];
};
