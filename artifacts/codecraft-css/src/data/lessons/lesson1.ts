import type { Lesson } from "../types";

export const cssBasicsLesson: Lesson = {
  id: "css-basics",
  title: "CSS Basics",
  topics: [
    {
      id: "css-basics-what-is-css",
      title: "What CSS Is and Why It Matters",
      explanation: "Imagine you are building a house. HTML is the raw structure — the walls, floors, and roof. CSS, which stands for Cascading Style Sheets, is everything that makes the house beautiful and livable: the paint colors, the carpet texture, the window size, and the layout of each room. Without CSS, every webpage would look like a plain text document, just words and links stacked on top of each other in a browser's default black-and-white style.\n\nCSS was created to solve a very real problem that early web developers faced. In the early days of the web, HTML was being stretched far beyond its original purpose. Tags like `<font>` and `<center>` were invented just to handle visual styling, which cluttered the code and made pages hard to maintain. If you wanted to change the color of every heading on a 50-page website, you'd have to edit every single file by hand. CSS changed that by separating content from presentation.\n\nWhen you write CSS, you are essentially writing a set of instructions to the browser: \"Find all the headings and make them blue. Give all paragraphs a comfortable line height. Make that navigation bar stick to the top of the screen.\" The browser reads these instructions and applies them to the HTML, producing the visual result that users actually see.\n\nThis separation of concerns is one of the most powerful ideas in web development. Your HTML file describes what is on the page — a heading, a paragraph, an image. Your CSS file describes how it should look — big, colorful, centered. Keeping these separate makes your code cleaner, easier to update, and reusable across many pages.\n\nCSS is also what makes the web responsive, meaning pages can adapt their layout to fit a phone screen just as well as a wide desktop monitor. Without CSS, every device would show the same rigid layout regardless of screen size. With CSS, you can write rules that say \"on small screens, stack these columns vertically\" and the browser will do exactly that.\n\nLearning CSS opens up the ability to build polished, professional-looking interfaces. Even small CSS changes — adding some padding, choosing a pleasant font, using color strategically — can transform a plain document into something that feels intentional and trustworthy. As you progress, you will find that CSS is a creative medium, not just a technical one.",
      htmlExample: `<h1>Welcome to My Page</h1>
<p>This page has no styles yet. It looks pretty plain!</p>
<a href="#">Click me</a>`,
      cssExample: `h1 {
  color: steelblue;
  font-size: 2rem;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

a {
  color: tomato;
  text-decoration: none;
  font-weight: bold;
}`,
      exercises: [
        {
          title: "Paint the Heading",
          description: "Change the color of the h1 element to any color you like. Try using a named color such as 'coral' or 'seagreen'. Observe how a single CSS rule transforms the look of the entire heading.",
          hint: "Use the 'color' property inside the h1 rule. For example: color: coral;"
        },
        {
          title: "Style the Link",
          description: "Make the anchor link look more like a button by adding a background-color and some padding. You do not need to change the HTML at all — just add CSS properties to the existing 'a' rule.",
          hint: "Try adding: background-color: steelblue; padding: 6px 12px; color: white; border-radius: 4px;"
        }
      ],
      quiz: [
        {
          question: "What does CSS stand for?",
          options: ["Creative Style Syntax", "Cascading Style Sheets", "Colorful Scripting System", "Content Styling Standard"],
          correctIndex: 1,
          explanation: "CSS stands for Cascading Style Sheets, where 'cascading' refers to the way multiple style rules combine and override each other."
        },
        {
          question: "What is the primary purpose of CSS?",
          options: ["To define the structure of a webpage", "To add interactivity to a webpage", "To control the visual presentation of HTML content", "To store data in a browser"],
          correctIndex: 2,
          explanation: "CSS is responsible for controlling how HTML elements look — their colors, sizes, spacing, and layout."
        },
        {
          question: "Which problem did CSS originally solve?",
          options: ["HTML was too slow to render", "Styling was mixed directly into HTML, making maintenance hard", "Browsers couldn't display images", "JavaScript was not yet invented"],
          correctIndex: 1,
          explanation: "Early web developers embedded style information directly in HTML using tags like <font>, making pages hard to maintain; CSS separated presentation from structure."
        },
        {
          question: "What is the relationship between HTML and CSS often compared to?",
          options: ["A car and its engine", "A structure (like a house) and its decoration", "A keyboard and a monitor", "A database and a server"],
          correctIndex: 1,
          explanation: "HTML provides the structure (walls, floors) while CSS provides the decoration (paint, furniture arrangement)."
        },
        {
          question: "Without CSS, what would most webpages look like?",
          options: ["Colorful and animated", "Plain text with browser default formatting", "Completely invisible", "Interactive dashboards"],
          correctIndex: 1,
          explanation: "Without CSS, browsers display HTML with their built-in default styles — mostly plain black text on a white background."
        },
        {
          question: "What does 'separation of concerns' mean in the context of HTML and CSS?",
          options: ["Keeping JavaScript separate from databases", "Keeping page content separate from its visual presentation", "Using different files for each HTML element", "Running CSS and HTML on different servers"],
          correctIndex: 1,
          explanation: "Separation of concerns means HTML handles what is on the page while CSS handles how it looks, keeping both cleaner and easier to manage."
        },
        {
          question: "Which of the following is a benefit of using CSS?",
          options: ["It replaces the need for HTML entirely", "You can update the look of many pages by changing one stylesheet", "It runs faster than HTML", "It adds security to your website"],
          correctIndex: 1,
          explanation: "A single external CSS file can style hundreds of HTML pages, so one change updates the look across the entire site."
        },
        {
          question: "Which tag was an early HTML attempt to handle text color before CSS?",
          options: ["<style>", "<color>", "<font>", "<text>"],
          correctIndex: 2,
          explanation: "The <font> tag was used in early HTML to set text color and size, but it cluttered markup and was replaced by CSS."
        },
        {
          question: "CSS makes websites 'responsive', which means they:",
          options: ["Load faster", "Send emails automatically", "Adapt their layout to different screen sizes", "Work offline"],
          correctIndex: 2,
          explanation: "Responsive design uses CSS to adapt layouts so pages look good on phones, tablets, and desktops."
        },
        {
          question: "In CSS, a 'rule' tells the browser to:",
          options: ["Block a specific user", "Validate HTML syntax", "Find certain elements and apply specific styles to them", "Download external fonts"],
          correctIndex: 2,
          explanation: "A CSS rule selects one or more HTML elements and instructs the browser to apply the defined visual styles to them."
        },
        {
          question: "Which file extension is standard for an external CSS file?",
          options: [".html", ".js", ".css", ".xml"],
          correctIndex: 2,
          explanation: "CSS files use the .css extension, for example 'styles.css', which is then linked from an HTML file."
        },
        {
          question: "What happens visually when you remove a CSS file from a styled webpage?",
          options: ["The page disappears", "The page shows unstyled HTML with browser defaults", "The page shows an error message", "Images stop loading"],
          correctIndex: 1,
          explanation: "Without CSS the browser falls back to its default styles, so the page shows plain text and default link colors instead of custom styles."
        },
        {
          question: "CSS is described as a creative medium because:",
          options: ["It is only used by artists", "Visual design choices in CSS shape how users feel about a page", "CSS generates images automatically", "It replaces photography on websites"],
          correctIndex: 1,
          explanation: "Color, spacing, typography, and layout choices all affect user experience and aesthetics, making CSS a creative tool, not just a technical one."
        },
        {
          question: "Which of the following is NOT something CSS is typically used for?",
          options: ["Changing text color", "Storing user login data", "Setting the layout of a page", "Applying fonts to text"],
          correctIndex: 1,
          explanation: "Storing user data is handled by server-side code or databases, not CSS, which is solely for visual presentation."
        },
        {
          question: "When was CSS first introduced as a web standard?",
          options: ["In the 1980s", "In the mid-1990s", "In 2005", "In 2015"],
          correctIndex: 1,
          explanation: "CSS was proposed in 1994 and the first official CSS1 specification was published in 1996 by the W3C."
        },
        {
          question: "Which organization maintains the official CSS standards?",
          options: ["Google", "Mozilla Foundation", "W3C (World Wide Web Consortium)", "Apple"],
          correctIndex: 2,
          explanation: "The W3C is the main international standards body that develops and maintains CSS specifications."
        },
        {
          question: "If a website has 100 HTML pages all linked to one CSS file, and you change a font in the CSS file, how many pages are affected?",
          options: ["Only the first page", "Only the page you currently have open", "All 100 pages", "None, you must change each HTML file"],
          correctIndex: 2,
          explanation: "All pages linked to the same stylesheet inherit the change immediately, which is one of the biggest advantages of external CSS."
        },
        {
          question: "Which best describes the 'C' (Cascading) in CSS?",
          options: ["CSS loads from top to bottom like a waterfall", "Multiple style rules combine in a defined priority order", "CSS only works in Chrome", "Styles are deleted after the page closes"],
          correctIndex: 1,
          explanation: "The cascade is the process by which multiple CSS rules are combined and resolved based on specificity and source order."
        },
        {
          question: "A developer wants every paragraph on their site to have more breathing room between lines. The best tool for this is:",
          options: ["HTML alone", "CSS", "JavaScript", "A server-side language like PHP"],
          correctIndex: 1,
          explanation: "Visual formatting like line spacing is handled by CSS, specifically the line-height property."
        },
        {
          question: "Which statement about CSS is TRUE?",
          options: ["CSS can only style text, not layout", "CSS requires a server to work", "CSS is interpreted by the web browser", "CSS files must be written before HTML files"],
          correctIndex: 2,
          explanation: "The web browser reads and interprets CSS rules and applies the resulting styles to the rendered page."
        }
      ]
    },
    {
      id: "css-basics-including-css",
      title: "How to Include CSS in an HTML Page",
      explanation: "Before CSS can do anything, the browser needs to know where to find it. There are three different ways to connect CSS to your HTML, and each one has its own appropriate use case. Understanding when to use each method will help you write cleaner, more maintainable code from the start.\n\nThe first method is inline styles. An inline style is written directly inside an HTML element using the style attribute. For example, you might write `<p style=\"color: red;\">` to make a single paragraph red. Inline styles have the highest specificity, meaning they override almost everything else. However, this approach comes with a big downside: it mixes your content and styling together, making both harder to read and update. If you need to change the style of 20 paragraphs, you'd have to edit each one individually. Inline styles are best reserved for rare situations, like quickly testing something or applying a style that truly only applies to one unique element.\n\nThe second method is internal styles, sometimes called embedded styles. Here, you write all your CSS inside a `<style>` element placed in the `<head>` section of your HTML file. This keeps all the CSS for that page in one place, which is easier to manage than scattered inline styles. Internal styles are a good choice when you're building a single-page site or a quick prototype that doesn't need to share styles with other pages. The downside is that if you have multiple HTML files, you'd need to copy your `<style>` block into each one, leading to duplication.\n\nThe third method — and the one you'll use most often in real projects — is external stylesheets. You create a separate file with a `.css` extension, write all your CSS rules there, and then link it to your HTML file using the `<link>` element inside the `<head>` section. The link element looks like this: `<link rel=\"stylesheet\" href=\"styles.css\">`. The `rel` attribute tells the browser that this linked file is a stylesheet, and `href` provides the file path.\n\nExternal stylesheets are the professional standard for good reason. One stylesheet can be linked from hundreds of pages, so updating a single file changes the look everywhere at once. They also let the browser cache the CSS file, meaning repeat visitors experience faster load times because the CSS doesn't need to be downloaded again.\n\nA common question is: can you use more than one method at the same time? Absolutely. In fact, a page can have an external stylesheet, an internal `<style>` block, and some inline styles all at once. The browser processes all of them together using the cascade rules you'll learn about soon.",
      htmlExample: `<!-- Internal style example -->
<head>
  <style>
    h2 { color: darkgreen; }
  </style>
</head>
<h2>Internal Style Heading</h2>
<p style="color: purple;">This paragraph uses an inline style.</p>
<p>This paragraph inherits the page defaults.</p>`,
      cssExample: `/* This would live in an external file, e.g. styles.css */
body {
  font-family: sans-serif;
  background-color: #f9f9f9;
}

p {
  color: #444;
  line-height: 1.7;
}`,
      exercises: [
        {
          title: "Add an Internal Style",
          description: "Add a <style> block inside a <head> element and write a CSS rule that makes all <h2> elements display in a dark blue color. Do not use inline styles for this exercise.",
          hint: "Place <style> inside <head>, then write: h2 { color: darkblue; }"
        },
        {
          title: "Convert Inline to Internal",
          description: "The paragraph currently uses an inline style attribute to set its color. Move that style into a <style> block in the <head> instead, removing the style attribute from the <p> tag entirely.",
          hint: "Create a p { color: purple; } rule in the <style> block and remove style=\"color: purple;\" from the <p> tag."
        }
      ],
      quiz: [
        {
          question: "How many ways can you include CSS in an HTML page?",
          options: ["One", "Two", "Three", "Four"],
          correctIndex: 2,
          explanation: "CSS can be included via inline styles (style attribute), internal styles (<style> in <head>), and external stylesheets (<link>)."
        },
        {
          question: "Which HTML element is used to link an external CSS file?",
          options: ["<script>", "<style>", "<link>", "<css>"],
          correctIndex: 2,
          explanation: "The <link> element with rel=\"stylesheet\" and href pointing to the .css file is used to attach an external stylesheet."
        },
        {
          question: "Where should the <link> element for an external stylesheet be placed?",
          options: ["At the end of the <body>", "Inside a <div>", "Inside the <head>", "After the closing </html> tag"],
          correctIndex: 2,
          explanation: "The <link> element belongs in the <head> section so the browser can start loading styles before rendering the page content."
        },
        {
          question: "What attribute of the <link> element specifies the path to the CSS file?",
          options: ["src", "href", "url", "path"],
          correctIndex: 1,
          explanation: "The href attribute provides the file path or URL of the external CSS file to be loaded."
        },
        {
          question: "What value should the rel attribute have when linking a stylesheet?",
          options: ["css", "text/css", "stylesheet", "style"],
          correctIndex: 2,
          explanation: "rel=\"stylesheet\" tells the browser that the linked resource is a CSS stylesheet."
        },
        {
          question: "An inline style is applied using which HTML attribute?",
          options: ["class", "id", "style", "css"],
          correctIndex: 2,
          explanation: "The style attribute placed directly on an HTML element holds inline CSS declarations."
        },
        {
          question: "Which CSS inclusion method has the highest specificity by default?",
          options: ["External stylesheet", "Internal <style> block", "Inline style attribute", "They all have equal specificity"],
          correctIndex: 2,
          explanation: "Inline styles have the highest specificity and will override rules defined in internal or external stylesheets."
        },
        {
          question: "What is a major drawback of using inline styles throughout a large site?",
          options: ["They make the page load faster", "They are difficult to override", "They mix content and presentation, making updates tedious", "They only work in Chrome"],
          correctIndex: 2,
          explanation: "Inline styles blend styling with HTML content, making the code harder to read and requiring individual changes for each element."
        },
        {
          question: "Which method is best for sharing styles across multiple HTML pages?",
          options: ["Inline styles", "Internal <style> blocks", "External stylesheet", "HTML attributes"],
          correctIndex: 2,
          explanation: "A single external .css file can be linked by many pages, so one update changes the look everywhere."
        },
        {
          question: "Where is an internal <style> block placed in an HTML document?",
          options: ["Inside a <p> tag", "Inside the <head>", "After the <body> tag", "Inside a <div>"],
          correctIndex: 1,
          explanation: "The <style> element belongs inside the <head> section of the HTML document."
        },
        {
          question: "Which of the following is a correct <link> element for a stylesheet?",
          options: [
            "<link src=\"styles.css\">",
            "<link rel=\"stylesheet\" href=\"styles.css\">",
            "<link type=\"css\" file=\"styles.css\">",
            "<stylesheet href=\"styles.css\">"
          ],
          correctIndex: 1,
          explanation: "The correct syntax uses rel=\"stylesheet\" and href to point to the CSS file."
        },
        {
          question: "Why do external stylesheets improve page load speed for returning visitors?",
          options: ["They compress HTML automatically", "Browsers cache external CSS files so they don't need to re-download them", "External CSS is written in a faster language", "They remove images from the page"],
          correctIndex: 1,
          explanation: "Browsers cache external stylesheet files, so on repeat visits the CSS is loaded from local cache rather than downloaded again."
        },
        {
          question: "Can a single HTML page use all three CSS inclusion methods at once?",
          options: ["No, only one method is allowed per page", "Yes, and the browser processes all of them together", "Only two methods can be combined", "Only external and inline can be combined"],
          correctIndex: 1,
          explanation: "All three methods can coexist on one page; the browser combines them all using the cascade to determine final styles."
        },
        {
          question: "Which CSS inclusion method is most appropriate for a quick one-off prototype with no other pages?",
          options: ["External stylesheet", "Inline styles", "Internal <style> block", "No CSS at all"],
          correctIndex: 2,
          explanation: "An internal <style> block is convenient for single-page prototypes since you don't need to share styles across multiple files."
        },
        {
          question: "What file extension does an external CSS file use?",
          options: [".html", ".txt", ".css", ".style"],
          correctIndex: 2,
          explanation: "External CSS files use the .css extension, for example 'main.css' or 'styles.css'."
        },
        {
          question: "An inline style is written as: <p _____=\"color: red;\">. What fills the blank?",
          options: ["class", "style", "css", "format"],
          correctIndex: 1,
          explanation: "The style attribute is used to apply inline CSS directly to an HTML element."
        },
        {
          question: "Which inclusion method is generally considered best practice for production websites?",
          options: ["Inline styles", "Internal <style> blocks", "External stylesheets", "Embedded scripts"],
          correctIndex: 2,
          explanation: "External stylesheets separate concerns, enable caching, and allow one file to style many pages, making them the professional standard."
        },
        {
          question: "If both an external stylesheet and an inline style target the same element property, which wins?",
          options: ["The external stylesheet", "The inline style", "They cancel each other out", "The browser's default style"],
          correctIndex: 1,
          explanation: "Inline styles have higher specificity than external stylesheet rules, so the inline declaration wins."
        },
        {
          question: "Which HTML element wraps CSS rules written inside the HTML file itself?",
          options: ["<css>", "<script>", "<style>", "<head>"],
          correctIndex: 2,
          explanation: "The <style> element contains internal CSS rules written directly within the HTML document."
        },
        {
          question: "A developer has 50 HTML pages all linked to 'theme.css'. To change the background color of every page, they should:",
          options: ["Edit each of the 50 HTML files", "Edit only 'theme.css'", "Add an inline style to each page", "Create 50 separate CSS files"],
          correctIndex: 1,
          explanation: "Since all pages link to the same external file, a single change to 'theme.css' updates all 50 pages simultaneously."
        }
      ]
    },
    {
      id: "css-basics-syntax-and-comments",
      title: "CSS Syntax and Comments",
      explanation: "Every language has grammar rules — a specific way that statements must be written for them to be understood. CSS is no exception. Once you learn the basic structure of a CSS rule, you'll be able to read and write any CSS you encounter.\n\nA CSS rule has two main parts: a selector and a declaration block. The selector is what you write first, and it tells the browser which HTML element or elements you want to style. After the selector comes a pair of curly braces `{ }`, and inside those braces is where you place your declarations. A declaration is a single instruction made up of a property and a value, separated by a colon. The declaration ends with a semicolon. So the complete pattern looks like this: `selector { property: value; }`.\n\nLet's make this concrete. If you want all paragraphs to have green text, you write: `p { color: green; }`. Here, `p` is the selector (targeting all `<p>` elements), `color` is the property (the visual aspect you want to change), and `green` is the value (what you want that aspect to be). The colon separates property from value, and the semicolon ends the declaration.\n\nYou can include multiple declarations inside one rule's curly braces by separating each with a semicolon. For example, you could set both the color and font size of a heading in one rule: `h1 { color: navy; font-size: 2rem; }`. Writing each declaration on its own line (with consistent indentation) is conventional and makes your CSS much easier to read, though it's not required by the browser.\n\nCSS is not case-sensitive for property names and values, but it is case-sensitive for selectors that reference class names and IDs in some scenarios. To keep things simple and avoid bugs, it's good practice to write everything in lowercase.\n\nComments in CSS let you leave notes in your code that the browser completely ignores. A CSS comment starts with `/*` and ends with `*/`. Comments can span a single line or multiple lines, and they're incredibly useful for explaining why you made a certain choice, marking sections of a stylesheet, or temporarily disabling a rule while testing. Unlike HTML comments (`<!-- -->`), CSS comments use this `/* */` format even inside `<style>` blocks in HTML.\n\nThe semicolon after the last declaration in a block is technically optional in CSS, but omitting it is a common source of bugs when you add more declarations later. Get into the habit of always including the semicolon.",
      htmlExample: `<h1>CSS Syntax Demo</h1>
<p class="intro">This is an introductory paragraph.</p>
<p>This is a regular paragraph.</p>`,
      cssExample: `/* Main heading style */
h1 {
  color: navy;
  font-size: 2rem;
  text-align: center;
}

/* Intro paragraph gets special treatment */
.intro {
  font-style: italic;
  color: steelblue;
}

p {
  line-height: 1.6; /* comfortable reading height */
}`,
      exercises: [
        {
          title: "Write Your First Rule",
          description: "Write a CSS rule that targets all <p> elements and sets their font-size to 18px and their color to #333. Make sure to include proper syntax: a selector, curly braces, and semicolons after each declaration.",
          hint: "p { font-size: 18px; color: #333; }"
        },
        {
          title: "Add a Comment",
          description: "Add a CSS comment above the h1 rule explaining what it does, and add an inline comment after the color declaration. Practice the /* */ comment syntax in both positions.",
          hint: "/* This styles the main heading */ before the rule, and /* dark blue */ after the color value."
        }
      ],
      quiz: [
        {
          question: "In CSS, what symbol separates a property from its value in a declaration?",
          options: ["Semicolon (;)", "Colon (:)", "Equals sign (=)", "Hyphen (-)"],
          correctIndex: 1,
          explanation: "A colon separates the property name from its value, for example: color: red;"
        },
        {
          question: "What character ends a CSS declaration?",
          options: ["Period (.)", "Comma (,)", "Semicolon (;)", "Slash (/)"],
          correctIndex: 2,
          explanation: "Each CSS declaration ends with a semicolon to separate it from the next declaration in the block."
        },
        {
          question: "In the rule 'p { color: blue; }', what is 'p'?",
          options: ["A property", "A value", "A selector", "A comment"],
          correctIndex: 2,
          explanation: "The 'p' is the selector — it tells the browser which elements (in this case all <p> elements) to apply the style to."
        },
        {
          question: "In the rule 'p { color: blue; }', what is 'color'?",
          options: ["A selector", "A property", "A value", "A comment"],
          correctIndex: 1,
          explanation: "In a CSS declaration, 'color' is the property — the specific visual aspect you are setting."
        },
        {
          question: "In the rule 'p { color: blue; }', what is 'blue'?",
          options: ["A selector", "A property", "A value", "A unit"],
          correctIndex: 2,
          explanation: "In a CSS declaration, 'blue' is the value assigned to the property 'color'."
        },
        {
          question: "What is the correct CSS comment syntax?",
          options: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */", "# This is a comment"],
          correctIndex: 2,
          explanation: "CSS uses /* */ for comments, unlike HTML which uses <!-- --> or JavaScript which uses //."
        },
        {
          question: "Can a CSS comment span multiple lines?",
          options: ["No, comments must fit on one line", "Yes, the /* */ syntax allows multi-line comments", "Only if you use // on each line", "Only in external stylesheets"],
          correctIndex: 1,
          explanation: "Because /* opens and */ closes the comment, everything in between — across any number of lines — is ignored by the browser."
        },
        {
          question: "What are the curly braces { } in a CSS rule called?",
          options: ["Selectors", "Declarations", "A declaration block", "A value block"],
          correctIndex: 2,
          explanation: "The curly braces and the declarations they contain are called the declaration block."
        },
        {
          question: "Which of the following is a valid CSS rule?",
          options: [
            "p color = blue;",
            "p { color: blue; }",
            "p: color blue;",
            "<p style=color:blue>"
          ],
          correctIndex: 1,
          explanation: "A valid CSS rule has a selector, then curly braces, then property: value; declarations inside."
        },
        {
          question: "Is it required to write each declaration on its own line in CSS?",
          options: ["Yes, otherwise the CSS won't work", "No, but it improves readability", "Only for external stylesheets", "Yes, the browser needs line breaks to parse CSS"],
          correctIndex: 1,
          explanation: "The browser doesn't care about whitespace; declarations on one line or many lines both work, but separate lines improve readability."
        },
        {
          question: "What happens to code inside a CSS comment?",
          options: ["It is executed with lower priority", "The browser completely ignores it", "It applies only to the next rule", "It causes a CSS parse error"],
          correctIndex: 1,
          explanation: "The browser ignores everything inside /* */ comments, making them safe for notes and temporarily disabled code."
        },
        {
          question: "If you forget the semicolon at the end of a declaration, what typically happens?",
          options: ["The browser throws a visible error on the page", "That declaration is ignored and may break the next one", "Nothing, semicolons are always optional", "The entire stylesheet fails to load"],
          correctIndex: 1,
          explanation: "A missing semicolon can cause the browser to merge two declarations, causing the second one to fail silently."
        },
        {
          question: "How many declarations can you put inside one CSS rule's curly braces?",
          options: ["Only one", "Only two", "Up to ten", "As many as you need"],
          correctIndex: 3,
          explanation: "A CSS rule can contain any number of declarations, each separated by a semicolon."
        },
        {
          question: "Which selector would target all <h2> elements on the page?",
          options: ["#h2", ".h2", "h2", "@h2"],
          correctIndex: 2,
          explanation: "A plain element name like h2 is a type selector that targets all matching HTML elements."
        },
        {
          question: "What is wrong with this CSS? 'h1 color: red;'",
          options: ["The property name is wrong", "There are no curly braces around the declaration", "The value should be in quotes", "The selector should be capitalized"],
          correctIndex: 1,
          explanation: "The declaration must be wrapped in curly braces: h1 { color: red; }"
        },
        {
          question: "Where in a stylesheet might a developer use a comment most helpfully?",
          options: ["Inside a property value", "Between a selector and its opening brace", "Above a section to explain what the rules below do", "Inside a selector name"],
          correctIndex: 2,
          explanation: "Comments above sections explain the intent of the rules that follow, making large stylesheets easier to navigate."
        },
        {
          question: "Is CSS case-sensitive for property names?",
          options: ["Yes, properties must always be uppercase", "No, property names are not case-sensitive", "Only for color values", "Only in external files"],
          correctIndex: 1,
          explanation: "CSS property names are not case-sensitive, so 'Color', 'COLOR', and 'color' all work, though lowercase is standard convention."
        },
        {
          question: "What does a CSS selector do?",
          options: ["Defines the visual value of a property", "Identifies which HTML elements a rule applies to", "Closes a declaration block", "Sets the file path for images"],
          correctIndex: 1,
          explanation: "The selector is the part of a CSS rule that identifies which HTML elements should receive the declared styles."
        },
        {
          question: "Which of the following correctly shows a rule with two declarations?",
          options: [
            "p { font-size: 16px color: red; }",
            "p { font-size: 16px; color: red; }",
            "p { font-size: 16px, color: red, }",
            "p font-size: 16px; color: red;"
          ],
          correctIndex: 1,
          explanation: "Each declaration must end with a semicolon, so font-size: 16px; color: red; is the correct format inside the braces."
        },
        {
          question: "Using comments, a developer temporarily 'disables' a CSS rule. How do they do this?",
          options: [
            "Delete the rule and undo later",
            "Move the rule to a different file",
            "Wrap the rule in /* */ comment markers",
            "Add a ! before the rule"
          ],
          correctIndex: 2,
          explanation: "Wrapping code in /* */ turns it into a comment, which the browser ignores, effectively disabling the rule without deleting it."
        }
      ]
    },
    {
      id: "css-basics-cascade-and-specificity",
      title: "The Cascade and Specificity Basics",
      explanation: "The word 'cascading' in CSS is not just a fancy name — it describes one of the most fundamental ideas in the entire language. When multiple CSS rules target the same element and try to set the same property, the browser needs a way to decide which one wins. That decision-making process is called the cascade.\n\nThink of the cascade like a tiebreaker system in a competition. When there's a conflict, the browser looks at three main criteria to decide the winner: origin (where the style came from), specificity (how precisely the rule targets an element), and source order (which rule appears later in the code).\n\nOrigin refers to where a style comes from. Browser default styles have the lowest priority. Your authored styles (the CSS you write) come next and override them. Inline styles come last and override almost everything.\n\nSpecificity is the most important tiebreaker in day-to-day CSS. It measures how specifically a selector targets an element. A rule that says \"make all paragraphs blue\" is less specific than a rule that says \"make paragraphs with this particular class blue.\" The more specific rule wins, regardless of order.\n\nSpecificity is calculated using a points-like system with three categories. Type selectors (like `h1`, `p`, `div`) are worth 1 point each. Class selectors (like `.menu`, `.intro`), attribute selectors, and pseudo-classes are worth 10 points each. ID selectors (like `#header`, `#logo`) are worth 100 points each. A rule's total specificity is the sum of all selector parts used.\n\nFor example, a rule written as `p { color: red; }` has a specificity of 1. A rule written as `.intro { color: blue; }` has a specificity of 10. If both target the same paragraph with class=\"intro\", the class selector wins and the text is blue.\n\nSource order is the final tiebreaker. If two rules have identical specificity, the one that appears later in the stylesheet wins. This is why the order of your CSS rules matters.\n\nThere is one additional tool called `!important` that can override the normal cascade. Adding `!important` after a value forces that declaration to win against competing rules. However, using it too freely makes stylesheets extremely hard to debug and maintain, so most experienced developers avoid it except in very specific situations.",
      htmlExample: `<h1 id="main-title" class="title">Hello, Cascade!</h1>
<p class="intro">This paragraph has a class applied.</p>
<p>This paragraph has no class.</p>`,
      cssExample: `/* Type selector - lowest specificity */
p {
  color: gray;
}

/* Class selector - beats type selector */
.intro {
  color: steelblue;
}

/* ID selector - highest specificity here */
#main-title {
  color: darkred;
}

/* This would lose to #main-title above */
.title {
  color: green;
}`,
      exercises: [
        {
          title: "Test Specificity",
          description: "Add both a class selector and a type selector targeting the same paragraph element. Give them conflicting color values and observe which one wins. Then add an inline style to override both.",
          hint: "Write p { color: red; } and .special { color: blue; } — the element with class='special' should be blue."
        },
        {
          title: "Source Order Test",
          description: "Write two rules with the same specificity (both type selectors) that both target <h2> and set a different color. Notice that the second rule wins. Then swap their order and see what changes.",
          hint: "Write h2 { color: red; } then h2 { color: blue; } — the heading should be blue because it comes last."
        }
      ],
      quiz: [
        {
          question: "What does the 'cascade' in CSS refer to?",
          options: [
            "The waterfall-like visual effect CSS can create",
            "The process by which conflicting style rules are resolved",
            "The order in which HTML elements load",
            "The animation speed of CSS transitions"
          ],
          correctIndex: 1,
          explanation: "The cascade is the algorithm that determines which CSS rule wins when multiple rules conflict on the same property and element."
        },
        {
          question: "Which selector type has the highest specificity?",
          options: ["Type selector (e.g., p)", "Class selector (e.g., .intro)", "ID selector (e.g., #header)", "Universal selector (e.g., *)"],
          correctIndex: 2,
          explanation: "ID selectors have the highest specificity of common selector types, worth approximately 100 points in the specificity system."
        },
        {
          question: "What is the specificity value of a pure type selector like 'p'?",
          options: ["0", "1", "10", "100"],
          correctIndex: 1,
          explanation: "Type selectors (element selectors) contribute 1 point to specificity in the CSS specificity calculation."
        },
        {
          question: "What is the specificity value of a class selector like '.menu'?",
          options: ["1", "5", "10", "100"],
          correctIndex: 2,
          explanation: "Class selectors, attribute selectors, and pseudo-classes each contribute 10 points to specificity."
        },
        {
          question: "Two rules have equal specificity and both target the same element. Which one applies?",
          options: ["The first one in the stylesheet", "The last one in the stylesheet", "Both apply equally", "Neither applies"],
          correctIndex: 1,
          explanation: "When specificity is equal, source order decides — the rule that appears later in the stylesheet wins."
        },
        {
          question: "An element has both a class rule (color: blue) and a type rule (color: red). Which color appears?",
          options: ["Red, because type selectors are first", "Blue, because class selectors have higher specificity", "Both colors appear simultaneously", "Neither, they cancel each other out"],
          correctIndex: 1,
          explanation: "Class selectors (specificity 10) beat type selectors (specificity 1), so the blue color from the class rule wins."
        },
        {
          question: "What does adding '!important' to a CSS declaration do?",
          options: ["It makes the property animate", "It forces the declaration to override normal cascade rules", "It marks the declaration as a comment", "It applies the rule only in Chrome"],
          correctIndex: 1,
          explanation: "!important overrides the normal cascade, making that declaration win against competing rules regardless of specificity."
        },
        {
          question: "Why is overusing !important considered bad practice?",
          options: ["It makes the browser crash", "It increases load time significantly", "It makes stylesheets very difficult to debug and maintain", "It is not supported in all browsers"],
          correctIndex: 2,
          explanation: "When too many rules use !important, it becomes very hard to understand which styles actually apply and why."
        },
        {
          question: "Which has higher specificity: '#nav' or '.nav'?",
          options: ["#nav", ".nav", "They are equal", "It depends on source order"],
          correctIndex: 0,
          explanation: "ID selectors (#nav, specificity ~100) are more specific than class selectors (.nav, specificity ~10)."
        },
        {
          question: "The specificity of a rule with selector 'p.intro' (type + class) is approximately:",
          options: ["1", "10", "11", "100"],
          correctIndex: 2,
          explanation: "Combining a type selector (1) and a class selector (10) gives a total specificity of 11."
        },
        {
          question: "Which of the following has the lowest priority in the cascade?",
          options: ["Your authored CSS", "Inline styles", "Browser default styles", "ID selector rules"],
          correctIndex: 2,
          explanation: "Browser default (user-agent) styles have the lowest priority and are overridden by any author-written CSS."
        },
        {
          question: "If an inline style says color: red and an external stylesheet says color: blue for the same element, which wins?",
          options: ["The external stylesheet (blue)", "The inline style (red)", "They merge to create purple", "The last-loaded file wins"],
          correctIndex: 1,
          explanation: "Inline styles have the highest specificity among normal styles and override rules in external or internal stylesheets."
        },
        {
          question: "In the cascade, 'origin' refers to:",
          options: ["Which country the CSS file is hosted in", "Where a style comes from (browser default, author, or inline)", "The first letter of the selector", "The line number in the stylesheet"],
          correctIndex: 1,
          explanation: "Origin describes whether a style comes from the browser's built-in defaults, the author's stylesheet, or an inline style attribute."
        },
        {
          question: "Two rules: 'h1 { color: green; }' appears on line 5, and 'h1 { color: orange; }' appears on line 20. What color is the h1?",
          options: ["Green", "Orange", "A mix of green and orange", "Neither, they cancel out"],
          correctIndex: 1,
          explanation: "With equal specificity, the later rule wins; line 20 comes after line 5, so the h1 is orange."
        },
        {
          question: "Specificity only matters when:",
          options: ["Multiple rules target different elements", "Multiple rules target the same element and the same property", "You use more than one stylesheet", "You use ID selectors"],
          correctIndex: 1,
          explanation: "Specificity is the tiebreaker only when there is a conflict — multiple rules targeting the same element and property."
        },
        {
          question: "A developer writes '.box { color: red !important; }' and then '#box { color: blue; }'. The element has both class 'box' and id 'box'. What color is it?",
          options: ["Blue, because ID is more specific", "Red, because !important overrides specificity", "Purple (both values blend)", "The browser's default color"],
          correctIndex: 1,
          explanation: "!important overrides normal specificity calculations; the class rule with !important beats the ID rule without it."
        },
        {
          question: "Which of the following is NOT one of the three main cascade criteria?",
          options: ["Origin", "Specificity", "Source order", "File size"],
          correctIndex: 3,
          explanation: "The three main cascade criteria are origin, specificity, and source order. File size has no effect on the cascade."
        },
        {
          question: "What is the specificity of the selector '#main .intro p'?",
          options: ["3", "12", "111", "21"],
          correctIndex: 2,
          explanation: "#main contributes 100, .intro contributes 10, and p contributes 1, giving a total of 111."
        },
        {
          question: "A developer notices a rule they wrote doesn't seem to apply. The most likely cause is:",
          options: ["A typo in the HTML", "Another rule with higher specificity is overriding it", "CSS doesn't support that property", "The browser is outdated"],
          correctIndex: 1,
          explanation: "The most common reason a rule doesn't apply as expected is that another rule with higher specificity is overriding it."
        },
        {
          question: "A universal selector '*' has a specificity of:",
          options: ["0", "1", "10", "100"],
          correctIndex: 0,
          explanation: "The universal selector * has zero specificity — it matches everything but loses to any other selector in a conflict."
        }
      ]
    },
    {
      id: "css-basics-inheritance",
      title: "Inheritance in CSS",
      explanation: "Imagine if every time you added a new paragraph to your webpage, you had to manually set its font family, font size, and text color. That would be exhausting and error-prone. CSS inheritance is the feature that prevents this repetitive work. When you set certain CSS properties on a parent element, those values automatically flow down to the element's children and descendants — just like how traits can pass from parents to children in a family.\n\nNot all CSS properties are inherited by default, and that's intentional. Properties related to text and typography — like `color`, `font-family`, `font-size`, `line-height`, and `font-weight` — are inherited because it makes sense: you want all the text inside a section to use the same font unless you specifically override it. On the other hand, properties related to the box model — like `margin`, `padding`, `border`, and `background` — are not inherited by default, because you generally don't want every child element to automatically have the same border as its parent.\n\nHere's a practical example: if you set `font-family: Georgia` on the `body` element, every piece of text anywhere on the page — headings, paragraphs, links, list items — will use Georgia unless you explicitly set a different font on a more specific element. This is an incredibly powerful pattern, because you only have to declare it once.\n\nYou can also control inheritance explicitly using three special values. The value `inherit` forces a property to inherit from its parent, even if that property doesn't normally inherit. The value `initial` resets a property to its browser default value. The value `unset` acts like `inherit` for naturally inherited properties and like `initial` for non-inherited ones.\n\nInheritance interacts with the cascade: when there's no explicit rule for an element, the browser first checks if the property is inherited and if the parent has a value. If inheritance provides a value, that's used. Only if no inherited value is available does the browser fall back to the initial (default) value.\n\nUnderstanding inheritance saves you from writing redundant CSS. Set your baseline font and color on `body`, and trust that everything inside it will pick those up automatically unless you decide to override.",
      htmlExample: `<body>
  <article>
    <h2>An Inherited World</h2>
    <p>This paragraph inherits the font and color from <em>body</em>.</p>
    <p class="special">This one has its own color set explicitly.</p>
  </article>
</body>`,
      cssExample: `body {
  font-family: Georgia, serif;
  font-size: 16px;
  color: #222;
  line-height: 1.6;
}

h2 {
  /* inherits font-family from body, but sets its own size */
  font-size: 1.5rem;
  color: darkblue;
}

.special {
  color: tomato; /* overrides the inherited color */
}`,
      exercises: [
        {
          title: "Set a Global Font",
          description: "Set the font-family property on the body element to any sans-serif font. Observe that all the text inside the page automatically uses that font without needing to set it on each element individually.",
          hint: "body { font-family: Arial, sans-serif; } — all text inside the body should now use Arial."
        },
        {
          title: "Override an Inherited Value",
          description: "After setting a global color on body, add a rule for h2 that sets a different color. The h2 should display with its own color while all other elements still use the body color.",
          hint: "If body has color: #333, then h2 { color: darkblue; } will show headings in dark blue while paragraphs stay dark gray."
        }
      ],
      quiz: [
        {
          question: "What is CSS inheritance?",
          options: [
            "The way stylesheets are linked to HTML files",
            "When child elements automatically receive certain CSS property values from their parent",
            "The process of overriding styles with !important",
            "Importing one CSS file into another"
          ],
          correctIndex: 1,
          explanation: "Inheritance means certain CSS property values set on a parent element are automatically passed down to its child and descendant elements."
        },
        {
          question: "Which of the following properties is inherited by default?",
          options: ["margin", "border", "color", "padding"],
          correctIndex: 2,
          explanation: "The color property is inherited by default, so text color set on a parent flows down to all text in child elements."
        },
        {
          question: "Which property is NOT inherited by default?",
          options: ["font-family", "line-height", "border", "font-size"],
          correctIndex: 2,
          explanation: "Border is a box model property and is not inherited, because you typically don't want every child element to share its parent's border."
        },
        {
          question: "If you set font-family on the body element, what happens to text in a <p> inside that body?",
          options: [
            "Nothing, paragraphs use the browser default font",
            "The paragraph inherits the font-family from body",
            "The paragraph's font-family must be set separately",
            "The browser throws an error"
          ],
          correctIndex: 1,
          explanation: "font-family is an inherited property, so paragraphs inside body automatically use the same font unless overridden."
        },
        {
          question: "What CSS value forces a property to inherit from its parent even if it doesn't normally inherit?",
          options: ["auto", "none", "initial", "inherit"],
          correctIndex: 3,
          explanation: "The value 'inherit' explicitly tells an element to take its value for that property from its parent element."
        },
        {
          question: "What does the CSS value 'initial' do?",
          options: [
            "Copies the value from the parent",
            "Resets the property to its browser default value",
            "Applies the value only on page load",
            "Makes the property animate from zero"
          ],
          correctIndex: 1,
          explanation: "'initial' sets a CSS property back to its specified initial (default) value as defined by the CSS specification."
        },
        {
          question: "Why don't box-model properties like margin and padding inherit by default?",
          options: [
            "The browser can't calculate them for children",
            "You generally don't want every child element to share its parent's spacing",
            "These properties are too complex to inherit",
            "Inheritance is only for text properties"
          ],
          correctIndex: 1,
          explanation: "If margin and padding inherited, every nested element would accumulate spacing, causing undesirable layouts."
        },
        {
          question: "A developer sets color: #444 on the body. A paragraph inside the body has no color rule. What color is the paragraph text?",
          options: ["Browser default (usually black)", "#444, inherited from body", "Transparent", "Red"],
          correctIndex: 1,
          explanation: "color is an inherited property, so the paragraph inherits #444 from its ancestor body element."
        },
        {
          question: "Which element is typically used to set global inherited styles like font and color for an entire page?",
          options: ["<head>", "<html>", "<body>", "<style>"],
          correctIndex: 2,
          explanation: "Styles set on the body element are inherited by all visible content on the page, making it the best place for global defaults."
        },
        {
          question: "What does 'unset' do for a property that normally inherits?",
          options: ["Resets it to the browser default", "Acts like 'inherit' and uses the parent's value", "Sets it to zero", "Removes the property from the element"],
          correctIndex: 1,
          explanation: "For inherited properties, 'unset' behaves like 'inherit', pulling the value from the parent element."
        },
        {
          question: "What does 'unset' do for a property that does NOT normally inherit?",
          options: ["Acts like 'inherit'", "Acts like 'initial', resetting to default", "Makes the property mandatory", "Triggers a CSS error"],
          correctIndex: 1,
          explanation: "For non-inherited properties, 'unset' acts like 'initial', resetting the property to its default value."
        },
        {
          question: "A child element has an explicit color rule. Its parent also has a color rule. Which color applies to the child?",
          options: [
            "The parent's color, because parents take priority",
            "The child's own color rule, because explicit rules beat inherited values",
            "Both colors blend together",
            "The browser default color"
          ],
          correctIndex: 1,
          explanation: "An explicit CSS rule on the child element overrides any inherited value from its parent."
        },
        {
          question: "How many inherited CSS properties does a typical body rule affect on nested elements?",
          options: ["Only direct children", "Only one level deep", "All descendant elements on the page", "Only elements with no other rules"],
          correctIndex: 2,
          explanation: "Inherited values flow all the way down the DOM tree, affecting every descendant unless explicitly overridden."
        },
        {
          question: "Which category of CSS properties is MOST likely to be inherited?",
          options: ["Box model properties (margin, padding, border)", "Typography properties (font, color, line-height)", "Background properties (background-color, background-image)", "Positioning properties (position, top, left)"],
          correctIndex: 1,
          explanation: "Typography-related properties inherit by default so that text styling flows consistently through nested elements."
        },
        {
          question: "Setting font-size on body to 16px and then font-size on h1 to 2em means h1 will be:",
          options: ["2px", "2rem based on root", "32px (2 times the inherited 16px)", "16px, ignoring the em unit"],
          correctIndex: 2,
          explanation: "1em equals the element's own font size or its inherited font size; here h1 inherits 16px so 2em = 32px."
        },
        {
          question: "What is the main practical benefit of CSS inheritance?",
          options: [
            "It makes pages load faster",
            "It reduces the need to write the same property on every element",
            "It prevents CSS conflicts",
            "It allows JavaScript to control styles"
          ],
          correctIndex: 1,
          explanation: "Inheritance lets you set a property once on an ancestor and have it apply everywhere without repetition."
        },
        {
          question: "background-color is set on a <div>. Will nested <p> elements inside it have the same background-color?",
          options: ["Yes, all background properties inherit", "No, background-color does not inherit by default", "Only if the p has no text", "Only in Chrome"],
          correctIndex: 1,
          explanation: "background-color is not an inherited property; child elements have a transparent background by default, which reveals the parent's background visually, but they don't inherit the value."
        },
        {
          question: "How does inheritance interact with the cascade?",
          options: [
            "Inheritance always beats explicit rules",
            "Explicit CSS rules on an element take priority over inherited values",
            "Inherited values have higher specificity than class selectors",
            "Inheritance is not related to the cascade"
          ],
          correctIndex: 1,
          explanation: "When an element has an explicit CSS rule, that rule wins over any inherited value from a parent element."
        },
        {
          question: "A developer wants every link on the page to use the same color as surrounding text. Which value should they use?",
          options: ["a { color: default; }", "a { color: inherit; }", "a { color: initial; }", "a { color: auto; }"],
          correctIndex: 1,
          explanation: "'inherit' tells the anchor to take its color from its parent element, matching the surrounding text color."
        },
        {
          question: "Which best describes 'initial' value for the font-weight property?",
          options: ["It sets font-weight to bold", "It inherits font-weight from the parent", "It resets font-weight to the CSS specification's default (normal)", "It removes the property"],
          correctIndex: 2,
          explanation: "'initial' resets a property to its initial value as specified by the CSS standard — for font-weight that is 'normal'."
        }
      ]
    },
    {
      id: "css-basics-units",
      title: "Units of Measurement",
      explanation: "When you set a font size, a width, or a margin in CSS, you need to tell the browser not just a number but also what kind of measurement that number represents. Is it pixels? A percentage of the parent? Relative to the font size? CSS provides many types of units, and choosing the right one makes the difference between a layout that works beautifully on every device and one that breaks on smaller screens.\n\nThe most familiar unit is the pixel, written as `px`. A pixel in CSS is a consistent unit approximately equal to 1/96th of an inch on a standard display. Pixels are absolute — a value of `16px` will be the same size regardless of any parent element. This predictability makes pixels great for things like borders, box shadows, or images where you need precise control. However, because pixels are fixed, they can create accessibility problems: if a user increases their browser's base font size for readability, elements sized in pixels don't respond.\n\nPercentage units, written with a `%` sign, are relative to the parent element. If you give an element a width of `50%`, it will always be half the width of its container, even if the container changes size. This makes percentages ideal for fluid, responsive layouts.\n\nThe `em` unit is relative to the font size of the element itself. If an element has a font size of `20px`, then `1em` equals `20px` for that element, `2em` equals `40px`, and so on. This can be powerful for scaling related properties together, but it has a tricky side effect: if you nest elements and each one uses `em` for its font size, the sizes compound — a `1.2em` inside a `1.2em` inside a `1.2em` ends up much larger than you might expect.\n\nThe `rem` unit (root em) solves the compounding problem. Instead of being relative to the current element's font size, `rem` is always relative to the root element's (`<html>`) font size, which defaults to `16px` in most browsers. This makes `1rem` always equal to `16px` (unless the user or developer changes the root font size). Using `rem` for typography is now widely recommended because it respects user font-size preferences while remaining predictable.\n\nThere are also viewport units: `vw` (viewport width) and `vh` (viewport height), where `1vw` is 1% of the browser window's width. These are useful for full-page layouts and responsive typography.\n\nAs a beginner, a practical rule of thumb: use `px` for fine details and borders, `rem` for font sizes and spacing, and `%` for widths in responsive layouts.",
      htmlExample: `<div class="container">
  <h2>Units Demo</h2>
  <p class="large-text">This text uses rem units.</p>
  <div class="box">This box uses px and % units.</div>
</div>`,
      cssExample: `html {
  font-size: 16px; /* base for rem calculations */
}

.container {
  width: 80%;
  margin: 0 auto;
}

h2 {
  font-size: 2rem;    /* 32px */
}

.large-text {
  font-size: 1.25rem; /* 20px */
  line-height: 1.6;
}

.box {
  width: 200px;
  padding: 1rem;
  border: 2px solid steelblue;
  font-size: 1rem;
}`,
      exercises: [
        {
          title: "Compare px and rem",
          description: "Set the font-size of two different paragraphs: one using px (e.g. 20px) and one using rem (e.g. 1.25rem). In a browser with default settings, both should be similar sizes. Try to understand why rem is more flexible for accessibility.",
          hint: "With html font-size at 16px, 1.25rem = 20px. They look the same, but rem responds to user preferences."
        },
        {
          title: "Fluid Width with Percentages",
          description: "Create a div that is 60% wide. Resize your browser window or the preview panel and observe how the box shrinks and grows proportionally with the viewport.",
          hint: ".box { width: 60%; background: lightblue; padding: 1rem; }"
        }
      ],
      quiz: [
        {
          question: "What is the CSS unit 'px' short for?",
          options: ["Points", "Pixels", "Percent", "Proportional x-units"],
          correctIndex: 1,
          explanation: "'px' stands for pixels, a fixed-size unit approximately equal to 1/96th of an inch on standard displays."
        },
        {
          question: "Which CSS unit is always relative to the root element's font size?",
          options: ["em", "px", "rem", "%"],
          correctIndex: 2,
          explanation: "'rem' stands for root em and is always relative to the font-size set on the <html> element."
        },
        {
          question: "If the html element has font-size: 16px, what is 2rem equal to in pixels?",
          options: ["8px", "16px", "32px", "2px"],
          correctIndex: 2,
          explanation: "1rem = 16px (the root font size), so 2rem = 2 × 16px = 32px."
        },
        {
          question: "A div has font-size: 20px. Inside it, a span has font-size: 1.5em. How big is the span's text?",
          options: ["15px", "20px", "30px", "1.5px"],
          correctIndex: 2,
          explanation: "1em equals the parent's (or current element's) font size; 1.5em × 20px = 30px."
        },
        {
          question: "What does the '%' unit in width: 50% mean?",
          options: ["50% of the viewport width", "50% of the screen resolution", "50% of the containing (parent) element's width", "50% of 100px"],
          correctIndex: 2,
          explanation: "Percentage widths are relative to the parent container's width."
        },
        {
          question: "Why might using 'px' for font sizes cause accessibility issues?",
          options: ["Pixels are too large for most screens", "Pixel-sized fonts don't respond to the user's browser font size preference", "px only works in Chrome", "Pixels cause text to pixelate on retina displays"],
          correctIndex: 1,
          explanation: "When users increase their browser's default font size for readability, pixel-sized text doesn't scale, but rem-sized text does."
        },
        {
          question: "What is the 'em' unit relative to?",
          options: ["The root element's font size", "The viewport width", "The current element's font size (or inherited font size)", "The element's width"],
          correctIndex: 2,
          explanation: "'em' is relative to the font size of the element itself; if no font size is set, it inherits from the parent."
        },
        {
          question: "What problem can arise when nesting elements that each use 'em' for their font-size?",
          options: ["The font becomes italic", "Font sizes compound and grow unexpectedly large", "The page crashes", "em units are ignored inside nested elements"],
          correctIndex: 1,
          explanation: "Each level of nesting multiplies the em value, so nested ems compound and can produce unexpectedly large text."
        },
        {
          question: "Which unit is best for creating a box that always takes up half the width of its parent container?",
          options: ["px", "rem", "em", "%"],
          correctIndex: 3,
          explanation: "Percentage units are relative to the parent container, making 50% always half the parent's width regardless of screen size."
        },
        {
          question: "What does '1vw' represent?",
          options: ["1 viewport height unit", "1% of the browser viewport's width", "1 vertical weight unit", "1 variable width pixel"],
          correctIndex: 1,
          explanation: "vw stands for viewport width; 1vw equals 1% of the browser window's total width."
        },
        {
          question: "What is the default font-size of the html element in most browsers?",
          options: ["12px", "14px", "16px", "18px"],
          correctIndex: 2,
          explanation: "Most browsers set the root font size to 16px by default, which forms the base for rem calculations."
        },
        {
          question: "A border: 1px solid black is set on a box. If the user increases their browser font size, the border:",
          options: ["Also grows proportionally", "Gets thinner", "Stays at 1px because px is an absolute unit", "Disappears"],
          correctIndex: 2,
          explanation: "Pixel values are absolute and don't respond to changes in browser font size settings."
        },
        {
          question: "Which unit should you use for typography to best respect user font preferences?",
          options: ["px", "pt", "rem", "cm"],
          correctIndex: 2,
          explanation: "rem scales with the root font size, which users can control through browser settings, making it the most accessible unit for text."
        },
        {
          question: "What does 100vh mean?",
          options: ["100 vertical heading units", "100% of the viewport height", "100 pixels high", "100% of the parent's height"],
          correctIndex: 1,
          explanation: "vh stands for viewport height; 100vh equals the full height of the visible browser window."
        },
        {
          question: "If html has font-size: 10px, what is 1.5rem?",
          options: ["10px", "1.5px", "15px", "16px"],
          correctIndex: 2,
          explanation: "With root font-size set to 10px, 1rem = 10px, so 1.5rem = 1.5 × 10px = 15px."
        },
        {
          question: "For responsive layouts, which combination of units is most commonly recommended?",
          options: ["px for everything", "em for layout, px for fonts", "% for widths, rem for font sizes", "vh for all measurements"],
          correctIndex: 2,
          explanation: "Percentages create fluid widths that adapt to container sizes, while rem ensures font sizes scale with user preferences."
        },
        {
          question: "Which unit would you use for a fine 1-pixel border that shouldn't change with font size?",
          options: ["1rem", "1%", "1em", "1px"],
          correctIndex: 3,
          explanation: "Borders are typically decorative details that should stay consistent, making the absolute px unit appropriate."
        },
        {
          question: "An element's padding is set to 2em and its font-size is 14px. What is the computed padding?",
          options: ["2px", "28px", "32px", "14px"],
          correctIndex: 1,
          explanation: "When em is used for padding, it's relative to the element's font-size; 2em × 14px = 28px."
        },
        {
          question: "What is the unit 'pt' typically used for?",
          options: ["Web pixel measurements", "Print-based measurements (points)", "Percentage of the parent", "Proportional text"],
          correctIndex: 1,
          explanation: "Points (pt) are a print unit; 1pt = 1/72 inch. They can be used in CSS but are less common for screen layouts."
        },
        {
          question: "If you want a full-width hero section that fills the entire browser window height, which unit is best for its height?",
          options: ["100%", "100rem", "100vh", "100px"],
          correctIndex: 2,
          explanation: "100vh sets height to 100% of the viewport height, making the section fill the visible window regardless of screen size."
        }
      ]
    },
    {
      id: "css-basics-colors",
      title: "Colors in CSS",
      explanation: "Color is one of the most expressive tools in web design, and CSS gives you multiple ways to specify exactly the color you want. Understanding the different color formats will help you read other people's CSS, communicate clearly with designers, and pick colors precisely.\n\nThe simplest way to specify a color is with a named color. CSS recognizes over 140 color names, ranging from the familiar — `red`, `blue`, `green`, `white`, `black` — to the more evocative — `coral`, `tomato`, `steelblue`, `lavender`, `goldenrod`. Named colors are great for quick prototyping and easy reading, but the selection is limited, so you'll often need other formats for precise colors.\n\nHexadecimal colors (hex values) are written starting with a `#` followed by six characters: `#RRGGBB`. Each pair of characters represents the intensity of one color channel — Red, Green, and Blue — using a scale from 00 (none) to FF (full intensity) in hexadecimal notation. For example, `#FF0000` is full red with no green or blue. `#000000` is black (no light at all) and `#FFFFFF` is white (all channels at maximum). Hex colors can also be shortened when each pair is a repeated digit: `#FF6600` can be written as `#F60`. Hex is probably the most common color format you'll see in professional CSS.\n\nThe `rgb()` function lets you specify colors using decimal numbers for each channel, each ranging from 0 to 255. So `rgb(255, 0, 0)` is the same red as `#FF0000`. Many designers prefer `rgb()` because the 0–255 scale feels more intuitive than hexadecimal. The related `rgba()` function adds a fourth value — the alpha channel — which controls transparency, ranging from 0 (completely transparent) to 1 (fully opaque). For example, `rgba(0, 0, 0, 0.5)` is a semi-transparent black.\n\nThe `hsl()` function describes colors in terms of Hue, Saturation, and Lightness. Hue is an angle on the color wheel (0–360 degrees), Saturation is how vivid the color is (0% being gray, 100% being fully vivid), and Lightness goes from 0% (black) to 100% (white), with 50% being the pure color. Many designers find HSL more intuitive for adjusting colors — for example, to make a color lighter, just increase the Lightness value. Like RGB, HSL also has an `hsla()` variant with an alpha channel.\n\nModern CSS also supports the `color()` function and other new formats, but named colors, hex, rgb, and hsl cover the vast majority of everyday needs.",
      htmlExample: `<div class="palette">
  <div class="swatch red">Named: red</div>
  <div class="swatch hex">#3a86ff</div>
  <div class="swatch rgb">rgb(255, 107, 107)</div>
  <div class="swatch hsl">hsl(145, 60%, 40%)</div>
  <div class="swatch transparent">rgba semi-transparent</div>
</div>`,
      cssExample: `.swatch {
  padding: 1rem;
  margin: 0.5rem 0;
  color: white;
  border-radius: 4px;
  font-weight: bold;
}

.red        { background-color: red; }
.hex        { background-color: #3a86ff; }
.rgb        { background-color: rgb(255, 107, 107); }
.hsl        { background-color: hsl(145, 60%, 40%); }
.transparent { background-color: rgba(0, 0, 0, 0.4); color: white; }`,
      exercises: [
        {
          title: "Explore Hex Colors",
          description: "Choose three different hex colors — one warm (reds/oranges), one cool (blues/purples), one neutral (grays). Apply them as background-color to three separate divs. Use a color picker if needed to find hex values you like.",
          hint: "Try #ff6b6b for a warm red, #4dabf7 for a cool blue, and #868e96 for a neutral gray."
        },
        {
          title: "HSL Hue Rotation",
          description: "Create three boxes all using HSL colors with the same saturation (70%) and lightness (50%), but vary the hue value: try 0, 120, and 240. This demonstrates how hue moves around the color wheel.",
          hint: "hsl(0, 70%, 50%) is red, hsl(120, 70%, 50%) is green, hsl(240, 70%, 50%) is blue."
        }
      ],
      quiz: [
        {
          question: "How many named colors does CSS recognize?",
          options: ["16", "50", "Over 140", "Over 1000"],
          correctIndex: 2,
          explanation: "CSS includes over 140 named colors, from 'red' and 'blue' to 'rebeccapurple' and 'papayawhip'."
        },
        {
          question: "What does '#FF0000' represent?",
          options: ["Pure green", "Pure blue", "Pure red", "Pure white"],
          correctIndex: 2,
          explanation: "In hex, FF is maximum intensity; #FF0000 means full red (FF), no green (00), no blue (00)."
        },
        {
          question: "What is the hex color for pure white?",
          options: ["#000000", "#FFFFFF", "#FF00FF", "#00FF00"],
          correctIndex: 1,
          explanation: "#FFFFFF sets all three color channels (R, G, B) to maximum intensity, producing white."
        },
        {
          question: "In RGB color notation rgb(0, 0, 0), what color is this?",
          options: ["White", "Red", "Black", "Transparent"],
          correctIndex: 2,
          explanation: "rgb(0, 0, 0) means zero intensity for all three channels, producing black — the absence of light."
        },
        {
          question: "What is the range of each channel value in rgb()?",
          options: ["0 to 100", "0 to 255", "0 to 360", "0 to 1"],
          correctIndex: 1,
          explanation: "Each RGB channel (red, green, blue) accepts integer values from 0 (none) to 255 (full intensity)."
        },
        {
          question: "What does the 'a' in rgba() control?",
          options: ["Angle of the color", "Alpha (transparency level)", "Average brightness", "Animation speed"],
          correctIndex: 1,
          explanation: "The fourth value in rgba() is the alpha channel, controlling transparency from 0 (invisible) to 1 (fully opaque)."
        },
        {
          question: "In HSL, what does the 'H' (Hue) value represent?",
          options: ["The brightness of the color", "A position on the color wheel measured in degrees (0-360)", "The grayness of the color", "The transparency level"],
          correctIndex: 1,
          explanation: "Hue is an angle from 0 to 360 on the color wheel: 0/360 is red, 120 is green, 240 is blue."
        },
        {
          question: "In HSL, a Saturation of 0% produces:",
          options: ["Full color intensity", "A transparent color", "A gray shade", "An error"],
          correctIndex: 2,
          explanation: "0% saturation removes all color information, resulting in a gray tone (the brightness determined by the lightness value)."
        },
        {
          question: "What HSL Lightness value produces the purest, most vivid version of a hue?",
          options: ["0%", "25%", "50%", "100%"],
          correctIndex: 2,
          explanation: "At 50% lightness, the hue is at its pure, vivid state; lower values darken it toward black, higher values lighten it toward white."
        },
        {
          question: "What is the shorthand hex for #AABBCC?",
          options: ["#ABC", "#AABB", "#BC", "#AABBCC has no shorthand"],
          correctIndex: 0,
          explanation: "When each hex pair is a repeated digit (AA, BB, CC), it can be shortened to #ABC."
        },
        {
          question: "rgba(255, 0, 0, 0.5) produces:",
          options: ["Fully opaque red", "Semi-transparent red", "Pink", "Dark red"],
          correctIndex: 1,
          explanation: "The alpha value 0.5 makes the red 50% transparent, so it shows the background partially through."
        },
        {
          question: "Which color format do designers often prefer for adjusting brightness or making color variations?",
          options: ["Named colors", "Hex", "RGB", "HSL"],
          correctIndex: 3,
          explanation: "HSL makes it intuitive to adjust lightness or saturation without changing the hue, making it great for creating color variations."
        },
        {
          question: "hsl(240, 100%, 50%) produces what color?",
          options: ["Red", "Green", "Blue", "Yellow"],
          correctIndex: 2,
          explanation: "Hue 240 corresponds to blue on the color wheel; 100% saturation and 50% lightness gives the purest blue."
        },
        {
          question: "What does the hex value #808080 represent?",
          options: ["Black", "White", "Medium gray", "Dark blue"],
          correctIndex: 2,
          explanation: "#808080 sets all three channels to the same medium value (128 in decimal), producing a neutral gray."
        },
        {
          question: "Which named color best describes rgb(255, 165, 0)?",
          options: ["Purple", "Orange", "Yellow", "Teal"],
          correctIndex: 1,
          explanation: "High red, medium green, and no blue produces an orange color — the named equivalent is 'orange'."
        },
        {
          question: "How many characters follow the '#' in a standard 6-character hex color?",
          options: ["3", "4", "6", "8"],
          correctIndex: 2,
          explanation: "A standard hex color has 6 characters after the #: two each for red (RR), green (GG), and blue (BB)."
        },
        {
          question: "What is the difference between rgb() and rgba()?",
          options: ["rgb() is older", "rgba() adds an alpha (transparency) channel", "They are identical", "rgb() supports more colors"],
          correctIndex: 1,
          explanation: "rgba() adds a fourth alpha parameter that controls transparency, whereas rgb() produces fully opaque colors."
        },
        {
          question: "A developer types color: #GG0000. What happens?",
          options: ["It produces a bright green", "The browser ignores the invalid value and uses the inherited or default color", "It crashes the browser", "It produces orange"],
          correctIndex: 1,
          explanation: "'GG' is not a valid hexadecimal value (hex uses 0-9 and A-F), so the browser ignores the invalid declaration."
        },
        {
          question: "hsl(0, 100%, 50%) and hsl(360, 100%, 50%) produce:",
          options: ["Different colors", "The same color (red)", "One is bright red, one is dark red", "One is red, one is magenta"],
          correctIndex: 1,
          explanation: "The hue circle is 0-360 degrees; both 0 and 360 point to the same position on the wheel — red."
        },
        {
          question: "Which CSS color format is generally most human-readable at a glance for common colors?",
          options: ["Hex values", "RGB values", "Named colors", "HSL values"],
          correctIndex: 2,
          explanation: "Named colors like 'tomato', 'steelblue', and 'goldenrod' are immediately readable, though they cover fewer options than numeric formats."
        }
      ]
    },
    {
      id: "css-basics-box-model",
      title: "The Box Model Overview",
      explanation: "Every single element on a webpage — whether it's a heading, a paragraph, an image, or a button — is treated by the browser as a rectangular box. This fundamental idea is called the CSS box model, and understanding it is absolutely essential for controlling layout and spacing.\n\nThe box model has four distinct layers, from the inside out: content, padding, border, and margin. Imagine a framed photograph: the photo itself is the content; the white matting around the photo is the padding; the frame is the border; and the gap between the frame and the wall (or other frames) is the margin.\n\nThe content area is where the actual text, image, or other element appears. You control its size with the `width` and `height` properties.\n\nPadding is the space between the content and the element's border. It is part of the element's background, meaning if you set a background color, it fills the padding area too. Padding pushes the content inward, creating breathing room inside the box.\n\nBorder is a line drawn around the padding and content. You can control its width, style (solid, dashed, dotted), and color. Borders are optional — an element's border-width defaults to 0.\n\nMargin is the transparent space outside the border. Margins push other elements away and are used to create gaps between different boxes on the page. Unlike padding, margin is always transparent — it never inherits the element's background color.\n\nA crucial concept is how the box's total size is calculated. By default, the `width` you set only controls the content area. So if you set `width: 200px` and then add `padding: 20px` and `border: 5px`, the total rendered width becomes 200 + 20 + 20 + 5 + 5 = 250px. This default behavior is called `content-box` sizing.\n\nTo make sizing more intuitive, CSS introduced `box-sizing: border-box`. When you apply this, the `width` you set includes the padding and border — so `width: 200px` always means the total visible box is 200px, no matter how much padding you add. Most modern developers apply `box-sizing: border-box` to all elements as a baseline reset, which prevents unexpected size overflows.\n\nMargins have one additional quirk called margin collapsing: when two block elements sit directly above and below each other, their vertical margins don't add up — they overlap, and only the larger of the two applies.",
      htmlExample: `<div class="outer">
  <div class="box">Box Model Demo</div>
</div>`,
      cssExample: `.outer {
  background-color: #e9ecef;
  padding: 20px;
}

.box {
  width: 200px;
  padding: 20px;
  border: 4px solid steelblue;
  margin: 16px;
  background-color: #cfe2ff;
  box-sizing: border-box;
}`,
      exercises: [
        {
          title: "Visualize All Four Layers",
          description: "Create a div with a background color. Add padding (e.g. 20px), a visible border (e.g. 3px solid red), and a margin (e.g. 30px). Open browser DevTools and hover over the element to see each box model layer highlighted.",
          hint: ".demo { width: 150px; padding: 20px; border: 3px solid red; margin: 30px; background: lightyellow; }"
        },
        {
          title: "Discover border-box",
          description: "Create two identical boxes both set to width: 300px and padding: 30px. Add box-sizing: border-box to one but not the other. Compare their actual rendered widths to see the difference.",
          hint: ".box-a { width: 300px; padding: 30px; } .box-b { width: 300px; padding: 30px; box-sizing: border-box; } — box-b will be narrower overall."
        }
      ],
      quiz: [
        {
          question: "What are the four layers of the CSS box model, from inside to outside?",
          options: [
            "Content, margin, padding, border",
            "Content, padding, border, margin",
            "Margin, border, padding, content",
            "Border, padding, content, margin"
          ],
          correctIndex: 1,
          explanation: "From the inside out: content (the actual element), padding (inner space), border (the frame), margin (outer space)."
        },
        {
          question: "What does padding do?",
          options: [
            "Creates space outside the border between this element and others",
            "Creates space between the content and the element's border",
            "Draws a line around the element",
            "Controls the element's width"
          ],
          correctIndex: 1,
          explanation: "Padding adds space between the content area and the border, pushing content inward."
        },
        {
          question: "What does margin do?",
          options: [
            "Creates space between the content and border",
            "Draws a decorative line around the element",
            "Creates space outside the border between elements",
            "Sets the background color"
          ],
          correctIndex: 2,
          explanation: "Margin is transparent space outside the border that pushes other elements away."
        },
        {
          question: "An element has a background-color set. Which area will that background color fill?",
          options: [
            "Only the content area",
            "The content and padding areas",
            "The content, padding, and border areas",
            "The entire margin area"
          ],
          correctIndex: 1,
          explanation: "Background color fills both the content area and the padding area, but not the margin (which is always transparent)."
        },
        {
          question: "With the default box-sizing (content-box), a box has width: 100px, padding: 10px, border: 5px. What is its total rendered width?",
          options: ["100px", "110px", "120px", "130px"],
          correctIndex: 3,
          explanation: "Default sizing: total width = content(100) + left padding(10) + right padding(10) + left border(5) + right border(5) = 130px."
        },
        {
          question: "What does box-sizing: border-box change?",
          options: [
            "It makes all elements the same size",
            "The stated width includes padding and border, so total size equals the set width",
            "It removes the border from the box model",
            "It applies box shadows automatically"
          ],
          correctIndex: 1,
          explanation: "With border-box, width: 200px means the entire box is 200px wide — padding and border are included within that measurement."
        },
        {
          question: "Which CSS property draws a line around an element?",
          options: ["outline-box", "margin", "border", "padding"],
          correctIndex: 2,
          explanation: "The border property draws a line around the padding and content of an element."
        },
        {
          question: "What is margin collapsing?",
          options: [
            "Margins that grow over time",
            "When vertical margins between adjacent blocks overlap rather than add up",
            "Negative margins that shrink elements",
            "Margins that are removed on mobile"
          ],
          correctIndex: 1,
          explanation: "When two block elements are stacked vertically, their touching margins collapse to the size of the larger margin rather than summing."
        },
        {
          question: "What is the default value of box-sizing in CSS?",
          options: ["border-box", "padding-box", "content-box", "full-box"],
          correctIndex: 2,
          explanation: "By default, CSS uses box-sizing: content-box, meaning width and height only measure the content area."
        },
        {
          question: "Which property would you use to add space inside a button so the text isn't cramped against its edges?",
          options: ["margin", "border", "padding", "width"],
          correctIndex: 2,
          explanation: "Padding adds inner space between the button's text (content) and its visible edge (border), preventing cramped text."
        },
        {
          question: "Margin is always:",
          options: ["Filled with the element's background color", "Transparent", "Bordered automatically", "Equal to the padding value"],
          correctIndex: 1,
          explanation: "Margin is always transparent — it creates space between elements but never shows the element's background."
        },
        {
          question: "Where does the browser render the border of a box?",
          options: ["Between the content and padding", "Between the padding and margin", "Outside the margin", "Inside the content area"],
          correctIndex: 1,
          explanation: "The border sits between the padding (inner space) and the margin (outer space), wrapping around the content and padding."
        },
        {
          question: "An element with width: 300px and box-sizing: border-box has padding: 50px added. What is its content area width?",
          options: ["300px", "400px", "200px", "250px"],
          correctIndex: 2,
          explanation: "With border-box, total width is 300px; padding takes 50px each side (100px total), leaving 200px for content."
        },
        {
          question: "What shorthand padding value does 'padding: 10px 20px' set?",
          options: [
            "10px on all sides",
            "10px top/bottom, 20px left/right",
            "10px left/right, 20px top/bottom",
            "20px on all sides"
          ],
          correctIndex: 1,
          explanation: "When two values are given, the first applies to top and bottom, and the second to left and right."
        },
        {
          question: "Which tool is best for visually inspecting the box model of an element?",
          options: ["The CSS color picker", "Browser DevTools (developer tools)", "The HTML validator", "A text editor"],
          correctIndex: 1,
          explanation: "Browser DevTools shows a visual diagram of the box model with exact measurements for each layer when you inspect an element."
        },
        {
          question: "To center a block element horizontally, which combination is commonly used?",
          options: [
            "margin: auto; with no width",
            "width set to a value and margin: 0 auto;",
            "padding: auto;",
            "border: auto;"
          ],
          correctIndex: 1,
          explanation: "Setting a specific width and margin: 0 auto; tells the browser to distribute equal auto margins on both sides, centering the block."
        },
        {
          question: "Adding a border of 2px to an element with box-sizing: content-box will:",
          options: [
            "Not change the element's visible size",
            "Increase the element's total rendered size by 4px",
            "Decrease the content area by 2px",
            "Have no effect until you also set padding"
          ],
          correctIndex: 1,
          explanation: "With content-box sizing, border is added outside the stated width; a 2px border adds 4px total (2px each side) to total size."
        },
        {
          question: "What does margin: 0 auto do on a block element with a set width?",
          options: ["Removes all margins", "Centers the element horizontally within its container", "Sets margin to auto pixels", "Makes the element 100% wide"],
          correctIndex: 1,
          explanation: "auto left and right margins distribute space equally on both sides, horizontally centering a block element inside its container."
        },
        {
          question: "Which property controls the size of the content area directly?",
          options: ["border", "margin", "padding", "width"],
          correctIndex: 3,
          explanation: "The width and height properties set the size of the content area (with default content-box sizing)."
        },
        {
          question: "Two stacked paragraphs both have margin-bottom: 20px and margin-top: 30px where they meet. What is the actual gap between them?",
          options: ["50px", "20px", "30px", "10px"],
          correctIndex: 2,
          explanation: "Due to margin collapsing, the vertical gap between the two is the larger of the two margins (30px), not their sum (50px)."
        }
      ]
    },
    {
      id: "css-basics-browser-defaults-and-resets",
      title: "Browser Default Styles and Resets",
      explanation: "When you open a blank HTML file in a browser without any CSS, you don't see a completely unstyled document. You see headings that are large and bold, links that are blue and underlined, paragraphs with some spacing, and lists with bullets. These styles come from the browser itself — each browser ships with a built-in stylesheet called the user-agent stylesheet that provides basic, readable formatting for raw HTML documents.\n\nThe user-agent stylesheet has been around since the very beginning of the web, and its purpose is thoughtful: it ensures that even HTML without any author styling is still readable and navigable. Without these defaults, a raw HTML page would truly look like a wall of unstyled text.\n\nHowever, browser defaults come with a challenge: different browsers don't agree on exactly what the defaults should be. Chrome might give `<h1>` slightly different margin values than Firefox or Safari. Some browsers add default padding to `<ul>` elements; others add it differently. These inconsistencies meant that a page could look slightly different across browsers even with the same CSS.\n\nThis led web developers to create CSS resets — stylesheets you load first, before your own CSS, that deliberately zero out or normalize all browser defaults. The idea is to create a consistent blank slate, so you know exactly what you're starting from in every browser.\n\nOne of the most famous resets is Eric Meyer's CSS Reset, which sets margins, padding, borders, and font sizes to zero or their most neutral values for a long list of elements. This is a very aggressive approach: after applying it, even headings look like body text, which means you have to re-declare every style you want.\n\nA more modern approach is a CSS Normalize stylesheet (created by Nicolas Gallagher). Rather than zeroing everything out, Normalize preserves useful defaults while correcting the inconsistencies between browsers. It's less of a sledgehammer and more of a targeted fix.\n\nMany developers today write their own minimal reset — just a few lines that address the most common pain points. A very common starter is setting `box-sizing: border-box` on all elements, removing default margins and padding, and ensuring consistent font rendering. Understanding what browser defaults exist helps you write reset rules intentionally rather than guessing why your elements have unexpected spacing.",
      htmlExample: `<!-- This demonstrates what browser defaults look like -->
<h1>Heading 1 (browser default: large bold)</h1>
<h2>Heading 2</h2>
<p>A paragraph with default margins above and below.</p>
<ul>
  <li>List item with default bullet</li>
  <li>Another list item</li>
</ul>
<a href="#">A link (default: blue, underlined)</a>`,
      cssExample: `/* A minimal modern CSS reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  color: #333;
}

/* After the reset, re-add useful spacing */
p, h1, h2, h3, ul, ol {
  margin-bottom: 1rem;
}

ul, ol {
  padding-left: 1.5rem;
}`,
      exercises: [
        {
          title: "Observe Browser Defaults",
          description: "Write a simple HTML file with headings (h1–h3), a paragraph, a list, and a link but with NO CSS at all. Open it in your browser and notice the default font sizes, margins, bullet points, and link color applied automatically.",
          hint: "Compare how h1 looks much larger than h3 even without any CSS, and notice the blue link color."
        },
        {
          title: "Apply a Mini Reset",
          description: "Add CSS that sets margin: 0 and padding: 0 on all elements using the universal selector (*). Notice how all the default spacing disappears. Then add back just the spacing you want using explicit rules.",
          hint: "* { margin: 0; padding: 0; box-sizing: border-box; } — then add p { margin-bottom: 1rem; } to restore paragraph spacing."
        }
      ],
      quiz: [
        {
          question: "What is the user-agent stylesheet?",
          options: [
            "A stylesheet written by the webpage author",
            "A built-in browser stylesheet that provides default styles for HTML elements",
            "A stylesheet that targets mobile users",
            "A JavaScript file that controls styles"
          ],
          correctIndex: 1,
          explanation: "The user-agent stylesheet is the browser's own built-in CSS that provides default styling so raw HTML is still readable."
        },
        {
          question: "Why do browser default styles exist?",
          options: [
            "To make websites look exactly the same in every browser",
            "To ensure HTML documents are readable even without author CSS",
            "To prevent developers from writing CSS",
            "To add animations automatically"
          ],
          correctIndex: 1,
          explanation: "Browser defaults ensure that even plain HTML without any developer-written CSS is still legible and navigable."
        },
        {
          question: "What is a CSS reset?",
          options: [
            "A way to delete all your CSS",
            "A stylesheet that removes or normalizes browser default styles to create a consistent starting point",
            "A tool that restores a page to an earlier version",
            "A browser extension"
          ],
          correctIndex: 1,
          explanation: "A CSS reset is a stylesheet loaded first to zero out or normalize browser defaults, giving developers a consistent baseline."
        },
        {
          question: "What is the default color of unvisited links in most browsers?",
          options: ["Black", "Red", "Blue", "Green"],
          correctIndex: 2,
          explanation: "Most browsers style unvisited links with blue text and an underline by default, based on early web conventions."
        },
        {
          question: "Why do different browsers sometimes render the same HTML differently without author CSS?",
          options: [
            "HTML is interpreted differently per browser",
            "Each browser has its own user-agent stylesheet with slightly different default values",
            "The HTML specification is different per browser",
            "JavaScript runs differently in each browser"
          ],
          correctIndex: 1,
          explanation: "Different browsers implement their own user-agent stylesheets with slightly different default margin, padding, and font values."
        },
        {
          question: "Eric Meyer's CSS Reset is known for being:",
          options: [
            "A minimal two-line reset",
            "A targeted fix for specific browser bugs",
            "A very aggressive reset that zeros out almost all default styles",
            "A reset that only works in Chrome"
          ],
          correctIndex: 2,
          explanation: "Eric Meyer's reset aggressively removes margins, padding, and default styling from a comprehensive list of HTML elements."
        },
        {
          question: "How does CSS Normalize differ from a full CSS reset?",
          options: [
            "Normalize is more aggressive and zeros everything",
            "Normalize preserves useful defaults and only fixes browser inconsistencies",
            "Normalize only works for fonts",
            "Normalize is a JavaScript library"
          ],
          correctIndex: 1,
          explanation: "normalize.css preserves sensible browser defaults while harmonizing the inconsistencies between different browsers."
        },
        {
          question: "Which CSS selector applies a style to every single element on the page?",
          options: ["body", "all", "*", "html"],
          correctIndex: 2,
          explanation: "The universal selector * matches every HTML element, making it useful for applying reset rules broadly."
        },
        {
          question: "A common reason why elements have unexpected spacing even before you write any CSS is:",
          options: [
            "JavaScript added the spacing",
            "Browser default (user-agent) styles include margins and padding on many elements",
            "The HTML has invisible characters",
            "The server added extra whitespace"
          ],
          correctIndex: 1,
          explanation: "Browser default stylesheets apply margins to headings, paragraphs, and lists, which can cause unexpected spacing."
        },
        {
          question: "Which line is part of a very common modern minimal CSS reset?",
          options: [
            "* { display: block; }",
            "* { box-sizing: border-box; margin: 0; padding: 0; }",
            "html { font-size: 0; }",
            "body { width: 100vw; }"
          ],
          correctIndex: 1,
          explanation: "Setting box-sizing: border-box with zero margins and padding is a widely used minimal reset to create a predictable starting point."
        },
        {
          question: "After applying a full CSS reset (like Eric Meyer's), headings like h1 will:",
          options: [
            "Still appear bold and large",
            "Look like regular body text until you re-style them",
            "Disappear from the page",
            "Turn red"
          ],
          correctIndex: 1,
          explanation: "An aggressive reset removes the default size and weight from headings; you must explicitly re-declare those styles."
        },
        {
          question: "Where in your HTML document should a CSS reset be loaded?",
          options: [
            "After your own stylesheet",
            "Before your own stylesheet, so defaults are cleared first",
            "In the <body> element",
            "At the end of the HTML file"
          ],
          correctIndex: 1,
          explanation: "Loading the reset first ensures browser defaults are neutralized before your own styles are applied."
        },
        {
          question: "Which default browser style applies to <strong> elements?",
          options: ["Italic text", "Bold text", "Underlined text", "Uppercase text"],
          correctIndex: 1,
          explanation: "Browsers default to rendering <strong> elements in bold font weight."
        },
        {
          question: "In a CSS reset, 'padding: 0; margin: 0' on the body element would remove:",
          options: [
            "All text from the page",
            "The default outer spacing the browser adds around the page content",
            "All link styles",
            "Image sizes"
          ],
          correctIndex: 1,
          explanation: "Browsers apply a small default margin to the body element; zeroing it removes the gap between content and the browser window edge."
        },
        {
          question: "What advantage does understanding browser defaults give a CSS developer?",
          options: [
            "They can avoid writing any CSS",
            "They can intentionally override only what needs changing rather than guessing at unexpected styles",
            "They can skip using resets entirely",
            "They gain access to advanced browser features"
          ],
          correctIndex: 1,
          explanation: "Knowing what browser defaults exist lets you write targeted CSS that addresses specific inconsistencies rather than fighting unknown behavior."
        },
        {
          question: "Which HTML elements typically have default margins applied by browsers?",
          options: [
            "span and a",
            "img and canvas",
            "h1-h6, p, ul, ol",
            "div and section"
          ],
          correctIndex: 2,
          explanation: "Headings, paragraphs, and lists all have browser-default margins that create spacing between them."
        },
        {
          question: "The appearance of unordered list bullets (<ul>) without any CSS comes from:",
          options: [
            "HTML attribute default values",
            "The browser's user-agent stylesheet",
            "JavaScript running on page load",
            "The operating system settings"
          ],
          correctIndex: 1,
          explanation: "Default list styling — including bullets and indentation — is provided by the browser's user-agent stylesheet."
        },
        {
          question: "A developer notices a gap at the edges of their page but hasn't set any margins. The most likely cause is:",
          options: [
            "The HTML file has extra blank lines",
            "The browser's default margin on the body element",
            "The CSS file failed to load",
            "JavaScript removed the content"
          ],
          correctIndex: 1,
          explanation: "Most browsers apply a default margin (usually 8px) to the body element, creating a gap at the page edges."
        },
        {
          question: "Which approach is best described as a 'targeted fix' for browser inconsistencies without zeroing everything?",
          options: ["Eric Meyer's Reset", "Inline styles", "normalize.css", "The universal selector reset"],
          correctIndex: 2,
          explanation: "normalize.css is designed to fix only the differences and bugs between browsers while preserving sensible defaults."
        },
        {
          question: "Why might a developer add '*, *::before, *::after { box-sizing: border-box; }' as the first rule in their CSS?",
          options: [
            "To make every element take up 100% of the screen",
            "To ensure padding and border are included in stated widths for all elements",
            "To remove all animations",
            "To center everything on the page"
          ],
          correctIndex: 1,
          explanation: "Applying border-box to all elements (including pseudo-elements) makes width/height calculations predictable throughout the entire stylesheet."
        }
      ]
    }
  ]
};
