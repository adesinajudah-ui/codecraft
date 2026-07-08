import type { Lesson } from "../types";

export const cssSelectorsLesson: Lesson = {
  id: "css-selectors",
  title: "CSS Selectors",
  topics: [
    {
      id: "css-selectors-type-element",
      title: "Type / Element Selectors",
      explanation: "When you write CSS, you need a way to tell the browser exactly which parts of your page you want to style. That's where selectors come in, and the simplest selector of all is the type selector — also called the element selector.\n\nA type selector works by matching the name of an HTML tag. If you write `p { color: blue; }` in your stylesheet, you're telling the browser: \"Find every single `<p>` element on this page and make its text blue.\" You don't need any special symbols or extra syntax — just write the tag name, followed by your rules inside curly braces.\n\nThink of it like a dress code at a venue. If the rule says \"everyone wearing a hat must check it at the door\", it applies to every hat-wearer in the building, no exceptions. A type selector works the same way — it sweeps across your entire document and applies the style to every matching element.\n\nType selectors are broad by nature. A rule like `h1 { font-size: 2rem; }` will affect every `<h1>` on the page — the one in your header, any inside an article, all of them. This is great for setting a consistent baseline style, but you'll want more specific selectors (which we'll cover soon) when you need different headings to look different.\n\nCommon HTML tags you'll often style with type selectors include `body`, `h1` through `h6`, `p`, `a`, `ul`, `li`, `img`, `div`, and `span`. The `body` selector is especially powerful because styles set on the body (like `font-family` or `background-color`) often cascade down to the whole page.\n\nOne key thing to understand: type selectors are case-insensitive in HTML documents. Writing `P { }` and `p { }` both target paragraph elements. However, it's considered best practice to always write tag names in lowercase to stay consistent with modern HTML conventions.\n\nType selectors are also the building block for more complex selectors. When you write a selector like `article p { }`, you're combining a type selector for `article` with one for `p`. Understanding how the basic type selector works makes everything else in CSS much easier to follow.\n\nAs you start writing CSS, lean on type selectors to establish your page's default look — baseline font sizes, spacing, colors. Then, as your design gets more detailed, you'll layer in class and ID selectors to handle the specifics. Think of type selectors as painting the walls of a room in a single color before you add the artwork.",
      htmlExample: `<h1>Welcome to My Page</h1>
<p>This is an introductory paragraph about the topic.</p>
<p>Here is a second paragraph with more details.</p>
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>`,
      cssExample: `body {
  font-family: sans-serif;
  background-color: #f9f9f9;
}

h1 {
  color: #2c3e50;
  font-size: 2rem;
}

p {
  color: #555;
  line-height: 1.6;
}

li {
  color: #333;
  margin-bottom: 4px;
}`,
      exercises: [
        {
          title: "Style the heading and links",
          description: "Add an `<a>` tag inside one of the paragraphs. Then write a type selector to make all `<a>` elements appear in a dark green color with no underline. Also change the `<h1>` font-size to 2.5rem.",
          hint: "Use `a { color: darkgreen; text-decoration: none; }` and update the existing `h1` rule."
        },
        {
          title: "Set a global font on the body",
          description: "Change the body selector so the entire page uses the font-family 'Georgia', serif. Then add a background-color of #fffde7 to the body as well. Notice how every element on the page inherits the font.",
          hint: "Update the body rule: `body { font-family: Georgia, serif; background-color: #fffde7; }`"
        }
      ],
      quiz: [
        {
          question: "Which CSS selector targets every `<p>` element on the page?",
          options: [".p { }", "#p { }", "p { }", "*p { }"],
          correctIndex: 2,
          explanation: "The type selector uses just the tag name — no dot or hash prefix — so `p { }` targets all paragraph elements."
        },
        {
          question: "What is another common name for the type selector?",
          options: ["Class selector", "Element selector", "Tag group selector", "Universal selector"],
          correctIndex: 1,
          explanation: "Type selectors are also called element selectors because they match HTML element types directly."
        },
        {
          question: "If you write `h2 { color: red; }`, which elements will be affected?",
          options: ["Only the first h2 on the page", "Only h2 elements inside a div", "Every h2 element on the page", "Every heading element on the page"],
          correctIndex: 2,
          explanation: "A type selector applies to every instance of that element type across the entire document."
        },
        {
          question: "Which of the following is a valid type selector for styling all list items?",
          options: [".li { }", "li { }", "#li { }", "[li] { }"],
          correctIndex: 1,
          explanation: "Type selectors use the bare tag name, so `li { }` correctly targets all `<li>` elements."
        },
        {
          question: "You want every image on a page to have a border. Which rule is correct?",
          options: ["image { border: 1px solid black; }", ".img { border: 1px solid black; }", "img { border: 1px solid black; }", "#image { border: 1px solid black; }"],
          correctIndex: 2,
          explanation: "The HTML tag for images is `img`, so the type selector is `img { }` — without a dot or hash."
        },
        {
          question: "What does the `body` type selector let you control?",
          options: ["Only the body tag's margin", "Styles that apply to the entire page via inheritance", "Only the background of the viewport", "Only block-level elements"],
          correctIndex: 1,
          explanation: "Styles set on `body` (like font-family and color) often cascade and inherit down to all child elements, affecting the whole page."
        },
        {
          question: "Are type selectors case-sensitive in HTML documents?",
          options: ["Yes, you must always use lowercase", "Yes, you must match the case of the tag", "No, H1 and h1 both work, but lowercase is best practice", "No, and uppercase is preferred"],
          correctIndex: 2,
          explanation: "In HTML, type selectors are case-insensitive, but lowercase is the conventional and recommended style."
        },
        {
          question: "Which rule sets the font size of all `<h3>` headings to 1.5rem?",
          options: ["h3 { font-size: 1.5rem; }", ".h3 { font-size: 1.5rem; }", "heading3 { font-size: 1.5rem; }", "h3 > font-size: 1.5rem;"],
          correctIndex: 0,
          explanation: "`h3 { font-size: 1.5rem; }` is the correct syntax — type selector followed by the property inside curly braces."
        },
        {
          question: "You apply `p { color: green; }` and then `p { color: blue; }`. What color will paragraphs be?",
          options: ["Green, because it was declared first", "Blue, because the later rule overrides the earlier one", "Both, alternating", "Neither, they cancel out"],
          correctIndex: 1,
          explanation: "When two rules with equal specificity target the same property, the last one in the stylesheet wins."
        },
        {
          question: "Spot the bug: `pargraph { color: red; }`. What is wrong?",
          options: ["Missing semicolon", "The tag name is misspelled — it should be `p` or `paragraph`", "Red is not a valid color value", "The braces are wrong"],
          correctIndex: 1,
          explanation: "`pargraph` is not a valid HTML element, so this selector matches nothing. The correct element is `p` (or `paragraph` doesn't exist in HTML at all)."
        },
        {
          question: "Which CSS rule makes all `<a>` link text appear dark blue?",
          options: ["link { color: darkblue; }", "anchor { color: darkblue; }", ".anchor { color: darkblue; }", "a { color: darkblue; }"],
          correctIndex: 3,
          explanation: "The HTML tag for links is `a`, so the correct type selector is `a { color: darkblue; }`."
        },
        {
          question: "What will `ul { list-style: none; }` do?",
          options: ["Remove bullet points from all unordered lists", "Remove all lists from the page", "Style only ordered lists", "Make list items display inline"],
          correctIndex: 0,
          explanation: "`list-style: none` removes the default bullet markers, and `ul { }` targets every unordered list element."
        },
        {
          question: "A page has three `<section>` elements. How many will `section { background: yellow; }` style?",
          options: ["Only the first one", "Only the last one", "All three", "None — section is not styleable"],
          correctIndex: 2,
          explanation: "Type selectors match every instance of the element, so all three `<section>` elements will receive a yellow background."
        },
        {
          question: "Which type selector would you use to style every table row?",
          options: ["tablerow { }", "row { }", "tr { }", "td { }"],
          correctIndex: 2,
          explanation: "The HTML tag for a table row is `tr`, making `tr { }` the correct type selector for table rows."
        },
        {
          question: "What is the main drawback of relying exclusively on type selectors?",
          options: ["They are not supported by modern browsers", "They are too specific and override other rules", "They apply to every element of that type, making individual styling impossible without overrides", "They require JavaScript to function"],
          correctIndex: 2,
          explanation: "Type selectors are intentionally broad; if you need two headings to look different, you'll need class or ID selectors to target them individually."
        },
        {
          question: "Which rule correctly sets a 10px margin on all `<div>` elements?",
          options: ["div margin: 10px;", "div { margin: 10px; }", ".div { margin: 10px; }", "div { margin = 10px; }"],
          correctIndex: 1,
          explanation: "CSS requires the property-value pairs to be inside curly braces using a colon, so `div { margin: 10px; }` is correct."
        },
        {
          question: "What does `span { font-weight: bold; }` affect?",
          options: ["Only spans inside paragraphs", "Only the first span on the page", "Every <span> element on the page", "Only spans with a class attribute"],
          correctIndex: 2,
          explanation: "A type selector is non-discriminating — it targets every element of that type regardless of position or attributes."
        },
        {
          question: "Which of these is NOT a type selector?",
          options: ["h1 { }", "footer { }", ".nav { }", "article { }"],
          correctIndex: 2,
          explanation: "`.nav { }` is a class selector (note the dot prefix). The others — `h1`, `footer`, and `article` — are all type selectors."
        },
        {
          question: "If a browser has default styles for `<button>` (like a grey background), what does `button { background: none; }` accomplish?",
          options: ["It has no effect because browser defaults cannot be overridden", "It removes the browser's default background from all buttons", "It only removes background on hovered buttons", "It adds a new button to the page"],
          correctIndex: 1,
          explanation: "Author stylesheets override browser default (user-agent) stylesheets, so `button { background: none; }` removes the default button background."
        },
        {
          question: "You add `header { display: flex; }` to your CSS. What does the `header` part represent?",
          options: ["A class selector matching elements with class='header'", "An ID selector matching the element with id='header'", "A type selector matching every <header> HTML element", "A variable name"],
          correctIndex: 2,
          explanation: "`header` is a valid HTML5 semantic element, so `header { }` is a type selector that targets all `<header>` elements on the page."
        }
      ]
    },
    {
      id: "css-selectors-class",
      title: "Class Selectors",
      explanation: "Type selectors are great for setting broad defaults, but real-world designs require something more precise. Imagine you have ten paragraphs on a page but you want only two of them to be highlighted in yellow. This is exactly where class selectors shine.\n\nA class selector targets HTML elements that have a specific `class` attribute. You define a class in your HTML by adding `class=\"your-name-here\"` to any element, and in CSS you reference that class by writing a dot (`.`) followed by the class name — like `.highlight { background: yellow; }`.\n\nThink of a class like a name tag at a conference. Anyone can put on the name tag \"VIP\" regardless of who they are or where they're sitting. When the host calls out \"all VIPs, please come forward\", only the people wearing that tag respond. CSS class selectors work identically — any element can wear any class name, and the style applies only to those elements.\n\nOne of the most powerful features of classes is that they're reusable. You can apply the same class to dozens of different elements across your HTML — `<p class=\"callout\">`, `<div class=\"callout\">`, `<span class=\"callout\">` — and one CSS rule (`.callout { }`) styles all of them consistently. This makes maintaining your styles much easier.\n\nElements can also have multiple classes at the same time. You simply separate class names with a space inside the attribute: `<p class=\"callout large\">`. The browser will apply the styles from both `.callout` and `.large` to that element. This lets you build a small library of reusable utility classes and combine them as needed.\n\nClass names must start with a letter (not a number or special character), and they're case-sensitive — `.Button` and `.button` are two completely different classes in CSS. By convention, most developers use lowercase letters and hyphens to separate words, like `.main-content` or `.error-message`. This style is sometimes called \"kebab-case\" and it reads naturally.\n\nWhen naming classes, choose names that describe what the element *is* or its *purpose*, not what it looks like. `.article-card` is a better name than `.grey-box` because if you ever change the box color from grey to blue, the name `.grey-box` becomes misleading. Semantic class names make your code easier to understand and maintain.\n\nClass selectors are the workhorse of CSS. They're used constantly in professional projects because they strike the perfect balance: they're specific enough to target individual elements or groups, yet flexible enough to be shared across many elements and element types.",
      htmlExample: `<h2>News Feed</h2>
<div class="card">
  <h3 class="card-title">Breaking Story</h3>
  <p class="card-body">Details of the story go here.</p>
  <span class="badge new">New</span>
</div>
<div class="card featured">
  <h3 class="card-title">Featured Story</h3>
  <p class="card-body">This story is highlighted.</p>
  <span class="badge">Read More</span>
</div>`,
      cssExample: `.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  background: white;
}

.card-title {
  font-size: 1.2rem;
  color: #222;
  margin: 0 0 8px 0;
}

.card-body {
  color: #555;
  line-height: 1.5;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  background: #e0e0e0;
  font-size: 0.8rem;
}

.badge.new {
  background: #c8f7c5;
  color: #1a7a1a;
}

.featured {
  border-color: #f0a500;
  background: #fffdf0;
}`,
      exercises: [
        {
          title: "Add a warning class",
          description: "Create a new class called `warning` that gives elements a light red background (`#ffe0e0`) and dark red text (`#8b0000`). Apply it to one of the paragraphs in the HTML. Write the CSS rule for `.warning`.",
          hint: "Add `class=\"card-body warning\"` to a paragraph, then write `.warning { background: #ffe0e0; color: #8b0000; }`"
        },
        {
          title: "Apply multiple classes",
          description: "Add a new `<div class=\"card featured\">` block with its own title and paragraph. Then add a CSS class called `.large-title` that sets `font-size: 1.6rem` and apply it alongside `card-title` on that div's heading.",
          hint: "Use `<h3 class=\"card-title large-title\">` and write `.large-title { font-size: 1.6rem; }` in your CSS."
        }
      ],
      quiz: [
        {
          question: "How do you write a CSS class selector for a class named `highlight`?",
          options: ["highlight { }", "#highlight { }", ".highlight { }", "*highlight { }"],
          correctIndex: 2,
          explanation: "Class selectors use a dot (.) prefix, so `.highlight { }` correctly targets all elements with `class=\"highlight\"`."
        },
        {
          question: "Which HTML attribute do you use to assign a class to an element?",
          options: ["id", "class", "name", "style"],
          correctIndex: 1,
          explanation: "The `class` attribute is used in HTML to assign one or more class names to an element."
        },
        {
          question: "Can the same class be applied to multiple different elements on the same page?",
          options: ["No, each class can only be used once per page", "Yes, classes are reusable across any number of elements", "Only if the elements are the same tag type", "Only if they are inside the same container"],
          correctIndex: 1,
          explanation: "Classes are designed to be reusable — you can apply the same class to as many elements as you like."
        },
        {
          question: "An element has `class=\"btn primary large\"`. How many classes does it have?",
          options: ["One class with a long name", "Two classes", "Three classes", "It is invalid HTML"],
          correctIndex: 2,
          explanation: "Multiple class names in the `class` attribute are separated by spaces, so this element has three classes: btn, primary, and large."
        },
        {
          question: "Which CSS rule would ONLY style elements that have BOTH `card` and `featured` classes?",
          options: [".card .featured { }", ".card, .featured { }", ".card.featured { }", "card featured { }"],
          correctIndex: 2,
          explanation: "Writing two class selectors with no space between them (`.card.featured`) targets elements that have both classes simultaneously."
        },
        {
          question: "What is wrong with the class name `1stItem` in CSS?",
          options: ["It has a number in it", "Class names cannot start with a number", "It uses camelCase", "Nothing is wrong with it"],
          correctIndex: 1,
          explanation: "CSS class names (as identifiers) cannot start with a digit. They must begin with a letter, underscore, or hyphen."
        },
        {
          question: "Are CSS class names case-sensitive?",
          options: ["No, .Button and .button are the same", "Yes, .Button and .button are different selectors", "Only in some browsers", "Only if they contain uppercase letters"],
          correctIndex: 1,
          explanation: "CSS class selectors are case-sensitive, so `.Button` and `.button` are treated as two distinct classes."
        },
        {
          question: "Which of the following best describes a semantic class name?",
          options: [".red-text", ".f-bold", ".error-message", ".box-123"],
          correctIndex: 2,
          explanation: "`.error-message` describes the element's purpose, making the code more readable and maintainable regardless of visual changes."
        },
        {
          question: "You write `.title { color: blue; }` but none of your elements turn blue. What is the most likely cause?",
          options: ["Blue is not a valid CSS color", "No elements have class=\"title\" in the HTML", "The dot is unnecessary", "CSS cannot change font color"],
          correctIndex: 1,
          explanation: "A class selector only works if there is at least one HTML element with the matching `class` attribute value."
        },
        {
          question: "What does `.btn { padding: 8px 16px; }` target?",
          options: ["Elements with tag name btn", "Elements with id=\"btn\"", "Elements with class=\"btn\"", "The first button on the page"],
          correctIndex: 2,
          explanation: "The dot prefix identifies `.btn` as a class selector, targeting any element that includes `btn` in its class attribute."
        },
        {
          question: "Can a `<span>` and a `<div>` share the same class?",
          options: ["No, each tag type has its own class namespace", "Yes, any element can have any class", "Only block elements can share classes", "Only inline elements can share classes"],
          correctIndex: 1,
          explanation: "Classes are not tied to specific element types — any HTML element can use any class name."
        },
        {
          question: "What is the conventional naming style for CSS classes with multiple words?",
          options: ["camelCase like cardTitle", "PascalCase like CardTitle", "kebab-case like card-title", "snake_case like card_title"],
          correctIndex: 2,
          explanation: "The CSS community convention is kebab-case (lowercase words joined by hyphens), like `.card-title`."
        },
        {
          question: "Which selector targets paragraphs that have the class `intro`?",
          options: ["p #intro { }", "p.intro { }", "p > .intro { }", "#p.intro { }"],
          correctIndex: 1,
          explanation: "`p.intro` combines the type selector `p` with the class selector `.intro`, matching only `<p>` elements that also have class `intro`."
        },
        {
          question: "A `<div class=\"box dark\">` exists on the page. Which selectors will match it? (choose the most complete answer)",
          options: [".box only", ".dark only", "Both .box and .dark", "Neither, because it has two classes"],
          correctIndex: 2,
          explanation: "An element with multiple classes matches each class selector individually — so both `.box` and `.dark` rules will apply."
        },
        {
          question: "What does the comma in `.alert, .warning { color: red; }` do?",
          options: ["It creates a combined class", "It means elements need both classes", "It is a grouping selector — it applies the rule to both classes separately", "It causes a syntax error"],
          correctIndex: 2,
          explanation: "A comma between selectors is a grouping selector — it applies the same rule to both `.alert` and `.warning` independently."
        },
        {
          question: "Which HTML snippet correctly applies two classes to a heading?",
          options: ["<h1 class=\"big\" class=\"bold\">", "<h1 classes=\"big bold\">", "<h1 class=\"big bold\">", "<h1 .big .bold>"],
          correctIndex: 2,
          explanation: "Multiple classes go in a single `class` attribute, separated by spaces: `class=\"big bold\"`."
        },
        {
          question: "Why is `.red-background` considered a less ideal class name than `.alert-banner`?",
          options: ["Hyphens are not allowed in class names", "It describes visual appearance rather than purpose, making it hard to maintain", "It is too short", "CSS cannot parse color words in class names"],
          correctIndex: 1,
          explanation: "Names tied to appearance (like color) become misleading if the design changes. Purpose-based names like `.alert-banner` remain meaningful regardless of styling changes."
        },
        {
          question: "You have `.highlight { background: yellow; }`. An element has `class=\"highlight\"`. The element also has an inline style `style=\"background: pink;\"`. What color is the background?",
          options: ["Yellow, because the class rule wins", "Pink, because inline styles have higher specificity than class selectors", "Both are applied, so it blends", "Neither, they cancel out"],
          correctIndex: 1,
          explanation: "Inline styles have higher specificity than class selectors, so `background: pink` overrides the class rule."
        },
        {
          question: "Spot the bug: `<p class=intro>Hello</p>`. What is wrong?",
          options: ["intro is not a valid class name", "The class attribute value must be wrapped in quotes", "p elements cannot have classes", "Nothing is wrong"],
          correctIndex: 1,
          explanation: "While some browsers accept unquoted attribute values, the HTML specification requires attribute values to be quoted: `class=\"intro\"`."
        },
        {
          question: "How many elements will `.nav-link { text-decoration: none; }` affect on a page with 8 anchor tags that all have class `nav-link`?",
          options: ["Only the first one", "Only the last one", "All 8 elements", "None — anchor tags cannot have classes"],
          correctIndex: 2,
          explanation: "A class selector applies to every element on the page that carries that class, so all 8 elements will be affected."
        }
      ]
    },
    {
      id: "css-selectors-id",
      title: "ID Selectors",
      explanation: "While class selectors let you style groups of elements, sometimes you need to target one very specific, unique element on a page. For that purpose, CSS gives us the ID selector.\n\nAn ID selector targets the single element on your page that has a matching `id` attribute. In your HTML you write `id=\"main-header\"` on an element, and in CSS you reference it with a hash symbol (`#`) followed by the name — like `#main-header { color: navy; }`. The key rule: an ID must be unique within a single HTML page. You should never give two elements the same `id` value.\n\nA good analogy is a social security number or a passport. Two people can share the same first name (like a class), but their identification numbers are unique. In the same way, your CSS class `.button` can be shared, but `#submit-button` should belong to exactly one element.\n\nBecause IDs are unique, ID selectors have higher specificity than class selectors. In CSS, specificity is a scoring system that determines which rule \"wins\" when two rules conflict. An ID selector outweighs a class selector, which in turn outweighs a type selector. This means `#main-title { color: red; }` will override `.title { color: blue; }` even if the class rule comes later in the stylesheet.\n\nWhen should you use IDs versus classes? A common guideline is to use IDs sparingly — only for elements you know will be truly unique, like a main navigation bar, a page footer, a modal dialog, or the main content area. For anything you might repeat or reuse, use a class. Many experienced developers actually avoid ID selectors in CSS entirely for this reason, preferring the flexibility of classes. However, IDs are still very useful in JavaScript (for `getElementById`) and for creating anchor links (`<a href=\"#section2\">`), even when you don't need them in CSS.\n\nID names follow the same rules as class names: they must start with a letter, are case-sensitive, and conventionally use kebab-case. `#main-content`, `#hero-section`, and `#contact-form` are all good examples.\n\nOne practical tip: because the high specificity of IDs can make overriding styles difficult later on, some CSS methodologies (like BEM) suggest avoiding them altogether in stylesheets. But understanding how they work — and how specificity factors in — is essential knowledge for any CSS developer.",
      htmlExample: `<header id="site-header">
  <h1 id="site-title">My Portfolio</h1>
  <nav>
    <a href="#about" class="nav-link">About</a>
    <a href="#work" class="nav-link">Work</a>
    <a href="#contact" class="nav-link">Contact</a>
  </nav>
</header>
<main id="main-content">
  <p>Welcome to my portfolio page.</p>
</main>`,
      cssExample: `#site-header {
  background-color: #1a1a2e;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#site-title {
  color: white;
  font-size: 1.5rem;
  margin: 0;
}

.nav-link {
  color: #a0c4ff;
  text-decoration: none;
  margin-left: 16px;
}

#main-content {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}`,
      exercises: [
        {
          title: "Style the footer by ID",
          description: "Add a `<footer id=\"site-footer\">` element at the bottom with some text like a copyright notice. Then write a CSS rule using `#site-footer` to give it a dark background, white text, and centered text alignment.",
          hint: "Use `#site-footer { background: #222; color: white; text-align: center; padding: 16px; }`"
        },
        {
          title: "Demonstrate specificity",
          description: "Give the `<h1 id=\"site-title\">` an additional class called `big-heading`. Write a `.big-heading { color: yellow; }` rule. Notice that the existing `#site-title { color: white; }` still wins. Now try removing the ID selector rule and see the class take effect.",
          hint: "ID selectors beat class selectors in specificity. When the `#site-title` rule is removed, the `.big-heading` color applies."
        }
      ],
      quiz: [
        {
          question: "How do you write a CSS selector targeting the element with `id=\"hero\"`?",
          options: [".hero { }", "*hero { }", "hero { }", "#hero { }"],
          correctIndex: 3,
          explanation: "ID selectors use a hash (`#`) prefix, so `#hero { }` targets the element with `id=\"hero\"`."
        },
        {
          question: "How many elements on a single HTML page should share the same `id`?",
          options: ["As many as needed", "Up to 5", "Exactly one", "Two at most"],
          correctIndex: 2,
          explanation: "IDs must be unique within a page — each `id` value should appear on exactly one element."
        },
        {
          question: "Which has higher specificity: a class selector or an ID selector?",
          options: ["Class selector", "ID selector", "They are equal", "It depends on the browser"],
          correctIndex: 1,
          explanation: "ID selectors have higher specificity (0,1,0,0) than class selectors (0,0,1,0), so ID rules override class rules when they conflict."
        },
        {
          question: "Which HTML attribute is used to set an ID on an element?",
          options: ["class", "name", "id", "key"],
          correctIndex: 2,
          explanation: "The `id` attribute is used in HTML to assign a unique identifier to an element."
        },
        {
          question: "What does `#footer { background: grey; }` do?",
          options: ["Styles all footer elements on the page", "Styles the element with id=\"footer\"", "Styles elements with class=\"footer\"", "Styles the last element on the page"],
          correctIndex: 1,
          explanation: "The `#` prefix means ID selector, so this rule targets the single element whose `id` attribute equals `footer`."
        },
        {
          question: "A rule `#title { color: red; }` conflicts with `.title { color: blue; }` on an element that has both the id `title` and class `title`. What color wins?",
          options: ["Blue, because the class rule comes later", "Red, because the ID rule has higher specificity", "Neither, both cancel out", "It depends on order in the stylesheet"],
          correctIndex: 1,
          explanation: "Specificity takes precedence over source order; the ID rule wins because IDs have greater specificity than classes."
        },
        {
          question: "Which is the best use case for an ID selector?",
          options: ["Styling every button on a page", "Targeting a unique element like the main navigation bar", "Grouping common card styles", "Adding hover effects"],
          correctIndex: 1,
          explanation: "IDs are intended for unique, one-of-a-kind elements such as a main navigation bar or a single hero section."
        },
        {
          question: "Is the ID `2nd-section` valid in CSS?",
          options: ["Yes, numbers are always allowed", "No, identifiers cannot start with a digit", "Yes, but only in modern CSS", "No, hyphens are not allowed"],
          correctIndex: 1,
          explanation: "CSS identifiers (including IDs) cannot start with a digit. Starting with a letter or hyphen is required."
        },
        {
          question: "Are CSS ID selectors case-sensitive?",
          options: ["No, #Header and #header are the same", "Yes, #Header and #header are different", "Only in XHTML", "It depends on the browser"],
          correctIndex: 1,
          explanation: "CSS ID selectors are case-sensitive, meaning `#Header` and `#header` are treated as different identifiers."
        },
        {
          question: "What is the main reason many experienced developers avoid using ID selectors in CSS?",
          options: ["They are not supported in all browsers", "Their high specificity makes styles difficult to override later", "They slow down page rendering", "They cannot be animated"],
          correctIndex: 1,
          explanation: "The high specificity of ID selectors can make it hard to override their styles without resorting to `!important` or writing even more specific rules."
        },
        {
          question: "Can an element have both an `id` and a `class` attribute?",
          options: ["No, an element can only have one or the other", "Yes, an element can have both", "Only div elements can have both", "Only if they have the same name"],
          correctIndex: 1,
          explanation: "An element can have both an `id` and one or more `class` attributes simultaneously — they serve different purposes."
        },
        {
          question: "You have `<a href=\"#contact\">Contact</a>`. What does the `#contact` in the href do?",
          options: ["It applies the CSS ID selector #contact", "It creates an anchor link that scrolls to the element with id=\"contact\"", "It adds a class named contact to the link", "It is invalid HTML"],
          correctIndex: 1,
          explanation: "In HTML, `href=\"#id-name\"` creates an in-page anchor link that scrolls the browser to the element with that `id`."
        },
        {
          question: "Spot the bug: `#main content { font-size: 18px; }`. What is wrong?",
          options: ["The hash symbol is invalid", "There is a space in the selector — it should be #main-content or it becomes a descendant selector", "font-size cannot use px units", "Curly braces are missing"],
          correctIndex: 1,
          explanation: "A space in `#main content` turns it into a descendant combinator, meaning elements inside `#main` with tag `content`. It should be `#main-content` with a hyphen."
        },
        {
          question: "How many CSS rules can reference the same ID in a stylesheet?",
          options: ["Only one rule per ID is allowed", "Any number of rules can reference the same ID", "Up to three rules", "Unlimited, but only the first applies"],
          correctIndex: 1,
          explanation: "You can write multiple CSS rules that reference the same ID selector — all matching properties will apply, with later rules overriding earlier ones for the same property."
        },
        {
          question: "Which HTML snippet is invalid because it violates ID uniqueness?",
          options: [
            "<p id=\"note\">First</p><p class=\"note\">Second</p>",
            "<p id=\"note\">First</p><p id=\"note\">Second</p>",
            "<p id=\"note-1\">First</p><p id=\"note-2\">Second</p>",
            "<p id=\"note\" class=\"note\">Text</p>"
          ],
          correctIndex: 1,
          explanation: "Two elements sharing `id=\"note\"` violates the HTML rule that IDs must be unique within a document."
        },
        {
          question: "What does `#nav a { color: white; }` select?",
          options: ["The element with id=\"nav a\"", "All <a> elements that are descendants of the element with id=\"nav\"", "Elements with both id=\"nav\" and tag type a", "The first anchor element on the page"],
          correctIndex: 1,
          explanation: "The space between `#nav` and `a` is a descendant combinator — it targets `<a>` elements that live anywhere inside the element with `id=\"nav\"`."
        },
        {
          question: "What CSS property is unrelated to ID selectors but commonly used alongside them?",
          options: ["z-index", "display", "All properties work with ID selectors just like any other selector", "Only layout properties"],
          correctIndex: 2,
          explanation: "ID selectors are just selectors — any CSS property can be used inside an ID rule, the same as with class or type selectors."
        },
        {
          question: "Which selector is more specific: `#box` or `div.box.large`?",
          options: ["div.box.large, because it has three parts", "#box, because a single ID outweighs any number of classes", "They are equal", "Depends on which appears last in the stylesheet"],
          correctIndex: 1,
          explanation: "An ID has a specificity value of (0,1,0,0), while `div.box.large` is (0,0,2,1). IDs always beat classes and type selectors."
        },
        {
          question: "You want to use JavaScript to select an element by its ID. Which method do you use?",
          options: ["document.querySelector('.id')", "document.getElementById('id')", "document.getClass('id')", "document.findById('id')"],
          correctIndex: 1,
          explanation: "`document.getElementById('id')` is the standard JavaScript method for retrieving a single element by its ID attribute."
        },
        {
          question: "What is the recommended naming convention for ID values?",
          options: ["PascalCase like MainContent", "camelCase like mainContent", "kebab-case like main-content", "UPPER_CASE like MAIN_CONTENT"],
          correctIndex: 2,
          explanation: "The CSS community convention for IDs (as with classes) is kebab-case, using lowercase letters and hyphens between words."
        }
      ]
    },
    {
      id: "css-selectors-grouping-universal",
      title: "Grouping and Universal Selectors",
      explanation: "Once you've written a few CSS rules, you'll inevitably notice that several elements share the same styles. Maybe your `h1`, `h2`, and `h3` all need the same font family, or your `button`, `input`, and `select` all need a `box-sizing` rule. Rewriting the same declaration three times wastes space and makes updates error-prone. The grouping selector solves this problem.\n\nGrouping works by placing a comma between selectors. The rule `h1, h2, h3 { font-family: Georgia, serif; }` applies the font to all three heading levels in one shot. You can group any combination of selectors — type selectors, class selectors, ID selectors — as long as you separate them with commas. Think of it like sending a single group email to multiple recipients instead of three separate messages.\n\nGrouping is especially useful for CSS resets and base styles. At the start of many stylesheets, developers write rules like `*, *::before, *::after { box-sizing: border-box; }` to normalize behavior across elements. That asterisk is our second topic: the universal selector.\n\nThe universal selector (`*`) matches every single element in the document — `<div>`, `<p>`, `<span>`, `<body>`, everything. Because it's so broad, it's rarely used alone to apply decorative styles. However, it's invaluable for a handful of specific purposes: CSS resets (removing all default margins and paddings), inheriting certain properties forcefully, or when combined with pseudo-elements like `::before` and `::after`.\n\nA classic example of the universal selector in action is the box-sizing reset. By default, browsers add padding and border to an element's total width, which can produce unexpected layout results. Writing `* { box-sizing: border-box; }` ensures that every element on the page calculates its width to include padding and border, making layouts far more predictable.\n\nBe cautious with the universal selector when applying styles that aren't inherited (like backgrounds or borders), because it will literally apply them to every element, which can have surprising effects. When you want to set a base font or color for the whole page, targeting `body` (which relies on inheritance) is usually better than `*`.\n\nGrouping and the universal selector are not complicated, but using them skillfully keeps your stylesheets concise, consistent, and easy to maintain. They're foundational tools in every CSS developer's toolkit.",
      htmlExample: `<header>
  <h1>Main Title</h1>
  <h2>Subtitle</h2>
</header>
<section>
  <h3>Section Heading</h3>
  <p>Some paragraph text here.</p>
  <button>Click Me</button>
  <input type="text" placeholder="Type here" />
</section>`,
      cssExample: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

h1, h2, h3 {
  font-family: Georgia, serif;
  color: #1a1a2e;
  margin-bottom: 8px;
}

button, input {
  font-family: inherit;
  font-size: 1rem;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

header, section {
  padding: 16px;
}`,
      exercises: [
        {
          title: "Group heading styles",
          description: "Add `<h4>` and `<h5>` elements to the HTML. Update the CSS grouping selector to include `h4` and `h5` so they also share the same font-family and color. Then add a new property `line-height: 1.3` to all of them at once.",
          hint: "Change `h1, h2, h3 { }` to `h1, h2, h3, h4, h5 { }` and add `line-height: 1.3;` inside the rule."
        },
        {
          title: "Universal selector experiment",
          description: "Modify the universal selector rule (`*`) to also add `outline: 1px solid red;`. Notice how every element on the page gets a red outline, showing the boundaries of all elements. Then remove it to see the layout without outlines.",
          hint: "Add `outline: 1px solid red;` to the existing `* { }` rule block."
        }
      ],
      quiz: [
        {
          question: "What does the grouping selector use to separate multiple selectors?",
          options: ["A space", "A colon", "A comma", "A plus sign"],
          correctIndex: 2,
          explanation: "Commas separate selectors in a group, allowing one CSS rule to apply to multiple selectors at once."
        },
        {
          question: "What does `h1, h2, p { color: navy; }` do?",
          options: ["Styles only elements that are all three types simultaneously", "Styles only h1 elements that contain h2 or p elements", "Applies color: navy to all h1, all h2, and all p elements separately", "Creates a combined element type"],
          correctIndex: 2,
          explanation: "A grouped selector applies the rule to each selector independently — so all h1, h2, and p elements each receive `color: navy`."
        },
        {
          question: "Which selector matches every element on the page?",
          options: ["all { }", "* { }", "body > * { }", ". { }"],
          correctIndex: 1,
          explanation: "The universal selector (`*`) matches every HTML element in the document."
        },
        {
          question: "What is the most common use of the universal selector `*`?",
          options: ["Styling all text to be bold", "CSS resets and box-sizing normalization", "Adding hover effects to all elements", "Selecting the root element"],
          correctIndex: 1,
          explanation: "The universal selector is most commonly used in CSS resets, such as `* { box-sizing: border-box; margin: 0; padding: 0; }`, to normalize browser defaults."
        },
        {
          question: "Is `h1, h2 { color: red; }` equivalent to writing two separate rules `h1 { color: red; }` and `h2 { color: red; }`?",
          options: ["No, grouped selectors have higher specificity", "Yes, they produce the same result", "Only if h1 comes before h2 in the HTML", "No, grouping creates a combined selector"],
          correctIndex: 1,
          explanation: "Grouped selectors are syntactic shorthand — they apply the same rules as writing separate declarations for each selector."
        },
        {
          question: "Spot the bug: `h1 h2 { font-size: 1.5rem; }`. Why does this NOT group h1 and h2?",
          options: ["There is no bug — it groups h1 and h2", "Missing a comma — the space makes it a descendant combinator, not a grouping", "font-size cannot be applied to headings", "h2 cannot follow h1 in CSS"],
          correctIndex: 1,
          explanation: "Without a comma, `h1 h2` is a descendant combinator targeting `h2` elements inside `h1` elements, not a grouping of h1 and h2."
        },
        {
          question: "Why might applying `* { background: lightblue; }` cause problems?",
          options: ["It has no effect on any elements", "It applies the background to every single element, overriding all other backgrounds", "It only affects text elements", "Universal selectors cannot set backgrounds"],
          correctIndex: 1,
          explanation: "The universal selector targets everything, so setting a background on `*` applies it to every element, causing visual chaos in most designs."
        },
        {
          question: "Which rule correctly groups class `.btn` and ID `#submit` to both have `cursor: pointer`?",
          options: [".btn #submit { cursor: pointer; }", ".btn + #submit { cursor: pointer; }", ".btn, #submit { cursor: pointer; }", ".btn #submit, { cursor: pointer; }"],
          correctIndex: 2,
          explanation: "A comma groups selectors of any type, so `.btn, #submit { cursor: pointer; }` applies the rule to both the class and the ID."
        },
        {
          question: "What does `* { box-sizing: border-box; }` change?",
          options: ["It removes all borders from elements", "It makes every element include padding and border within its declared width", "It hides all elements on the page", "It adds a border to every element"],
          correctIndex: 1,
          explanation: "`box-sizing: border-box` changes the box model so that padding and border are included in an element's total width and height."
        },
        {
          question: "Can you mix type selectors, class selectors, and ID selectors in a single grouping?",
          options: ["No, you can only group the same type of selector", "Yes, any combination of selectors can be grouped with commas", "Only class and ID selectors can be grouped", "Only type selectors can be grouped"],
          correctIndex: 1,
          explanation: "CSS allows any combination of selectors in a grouping — `h1, .card, #hero { }` is perfectly valid."
        },
        {
          question: "What is the specificity of the universal selector `*`?",
          options: ["Very high — higher than ID selectors", "Zero — it has no specificity weight", "Equal to a type selector", "Equal to a class selector"],
          correctIndex: 1,
          explanation: "The universal selector has a specificity of (0,0,0,0), meaning zero weight — it loses to even type selectors in specificity conflicts."
        },
        {
          question: "How many separate rules does `a, button, input { outline: none; }` replace?",
          options: ["One", "Two", "Three", "Six"],
          correctIndex: 2,
          explanation: "Grouping three selectors replaces three separate rules — one for `a`, one for `button`, and one for `input`."
        },
        {
          question: "Which statement about the universal selector is TRUE?",
          options: ["It only matches elements that have no class or ID", "It matches every element in the document", "It has the same specificity as a class selector", "It cannot be combined with other selectors"],
          correctIndex: 1,
          explanation: "The `*` selector is truly universal — it matches every element in the document regardless of type, class, or ID."
        },
        {
          question: "You write `body, html { height: 100%; }`. What does this accomplish?",
          options: ["It makes only the body 100% tall", "It sets height: 100% on both the html and body elements", "It is invalid because you cannot group html and body", "It only affects elements inside body"],
          correctIndex: 1,
          explanation: "The grouping applies `height: 100%` to both `html` and `body` elements, a common technique for full-height layouts."
        },
        {
          question: "What is wrong with `.class1, .class2, { color: red; }`?",
          options: ["You cannot group class selectors", "There is a trailing comma after .class2 before the brace", "Class selectors cannot use color", "Nothing is wrong"],
          correctIndex: 1,
          explanation: "A trailing comma before the opening brace is a syntax error. There should be no comma after the last selector."
        },
        {
          question: "Why is `* { color: blue; }` less preferable than `body { color: blue; }` for setting page-wide text color?",
          options: ["The universal selector doesn't affect color", "`body { color }` is inherited by children automatically, while `*` forces the override on every element", "body has higher specificity than *", "They are exactly equivalent"],
          correctIndex: 1,
          explanation: "`color` is an inherited property, so setting it on `body` naturally cascades to children. Using `*` overrides every element's color directly, which can interfere with intended color variations."
        },
        {
          question: "Which of the following is a valid grouped selector?",
          options: ["h1 + h2 + p { }", "h1 > h2 > p { }", "h1, h2, p { }", "h1(h2)(p) { }"],
          correctIndex: 2,
          explanation: "`h1, h2, p { }` uses comma-separated selectors, which is the correct syntax for a grouped selector."
        },
        {
          question: "What does `*, *::before, *::after { box-sizing: border-box; }` do that `* { box-sizing: border-box; }` alone does not?",
          options: ["Nothing different — they are equivalent", "It also applies box-sizing to pseudo-elements created with ::before and ::after", "It targets pseudo-classes as well", "It increases specificity"],
          correctIndex: 1,
          explanation: "Pseudo-elements (`::before`, `::after`) are not matched by `*` alone, so including them explicitly ensures the box-sizing reset also covers generated content."
        },
        {
          question: "A grouped selector `h1, h2 { margin: 0; }` is found in a stylesheet. A later rule says `h2 { margin: 20px; }`. What margin does h2 have?",
          options: ["0, because the grouped rule comes first", "20px, because the later specific rule for h2 wins", "Both — it has 0 and 20px", "Undefined"],
          correctIndex: 1,
          explanation: "Both rules have equal specificity (type selectors), and the later rule wins per the cascade. So h2 ends up with `margin: 20px`."
        },
        {
          question: "Can the universal selector `*` be combined with a class, like `*.active`?",
          options: ["No, * cannot be combined with other selectors", "Yes, *.active means any element with class active, equivalent to just .active", "Yes, but only in older CSS", "No, it requires a type selector"],
          correctIndex: 1,
          explanation: "`*.active` means \"any element with class `active`\", which is identical to `.active`. The `*` is implicit in class selectors and is usually omitted."
        }
      ]
    },
    {
      id: "css-selectors-descendant-child",
      title: "Descendant and Child Combinators",
      explanation: "CSS selectors become truly powerful once you understand how to select elements based on their position in the HTML structure. HTML is organized like a family tree: elements contain other elements, creating relationships of parents, children, and descendants. CSS combinators let you harness these relationships to apply styles with precision.\n\nThe descendant combinator is the simplest of these. You write it simply as a space between two selectors, like `nav a`. This means: \"select any `<a>` element that is somewhere inside a `<nav>` element.\" The `<a>` doesn't have to be a direct child — it could be nested three or four levels deep inside the `<nav>` and still match. Think of it like saying \"everyone who lives in California\" — it doesn't matter what county or city, just that they're somewhere within California.\n\nThe child combinator is more strict. You write it with a greater-than sign (`>`), like `ul > li`. This means: \"select `<li>` elements that are direct children of a `<ul>`.\" If that `<li>` is nested inside another element inside the `<ul>`, it won't match. Using the family tree analogy, the descendant combinator finds grandchildren, great-grandchildren, and beyond, while the child combinator only selects immediate children.\n\nWhen would you use one over the other? Use the descendant combinator when you want broad influence over a section's content — for example, `article a { color: #0066cc; }` styles all links inside an article regardless of how deeply they're nested. Use the child combinator when you need surgical precision — for example, `nav > ul > li` ensures you're only styling the top-level list items in a navigation menu, not list items inside a nested dropdown.\n\nThese combinators are also very useful for scoping styles. Instead of giving every element a unique class, you can write `header p` to style paragraphs only inside the header, without affecting paragraphs elsewhere on the page. This is a clean pattern that reduces the total number of classes in your HTML.\n\nOne thing to keep in mind: deeply nested descendant selectors like `section div p span a` can be slow for the browser to process and hard to maintain. Most experienced developers keep selectors to a depth of two or three levels to strike a balance between precision and readability.",
      htmlExample: `<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li>
      <a href="#">Products</a>
      <ul>
        <li><a href="#">Laptops</a></li>
        <li><a href="#">Phones</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
<main>
  <p>Visit our <a href="#">shop</a> today.</p>
</main>`,
      cssExample: `/* Descendant combinator: all links inside nav */
nav a {
  text-decoration: none;
  color: #0057b7;
  font-weight: bold;
}

/* Child combinator: only direct li children of the top-level ul */
nav > ul > li {
  display: inline-block;
  margin-right: 16px;
  position: relative;
}

/* Nested ul (dropdown) */
nav > ul > li > ul {
  display: none;
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  padding: 8px;
  list-style: none;
}

nav > ul > li:hover > ul {
  display: block;
}

/* main links are unaffected by nav a */
main a {
  color: #d35400;
}`,
      exercises: [
        {
          title: "Style only article links",
          description: "Wrap the `<main>` content in an `<article>` tag and add several more `<a>` links inside it. Write a descendant combinator CSS rule `article a` that makes all links inside the article appear in purple with an underline. Notice that nav links are not affected.",
          hint: "Use `article a { color: purple; text-decoration: underline; }` — the descendant combinator targets links anywhere inside the article."
        },
        {
          title: "Child combinator vs descendant",
          description: "Add `<p>` elements both directly inside a `<section>` and also inside a `<div>` inside that `<section>`. Write `section > p { font-style: italic; }` and observe that only the direct child paragraphs turn italic, not the nested ones.",
          hint: "`section > p` uses the child combinator and only matches `<p>` elements that are immediate children of `<section>`."
        }
      ],
      quiz: [
        {
          question: "What does the descendant combinator look like in CSS?",
          options: ["A greater-than sign (>)", "A plus sign (+)", "A tilde (~)", "A space between two selectors"],
          correctIndex: 3,
          explanation: "The descendant combinator is written as a space between two selectors, like `nav a` or `article p`."
        },
        {
          question: "What does `article p` select?",
          options: ["Only p elements that are direct children of article", "All p elements anywhere inside an article element", "article elements inside p elements", "p elements that come right after article elements"],
          correctIndex: 1,
          explanation: "The descendant combinator (space) selects all matching elements anywhere inside the first element, at any nesting depth."
        },
        {
          question: "What does the child combinator `>` match?",
          options: ["All descendants of the parent", "Only direct children of the parent", "Elements that come after the parent", "The parent element itself"],
          correctIndex: 1,
          explanation: "The `>` combinator selects only direct children — elements that are one level below the parent in the HTML tree."
        },
        {
          question: "Given `<div><p><span>Text</span></p></div>`, does `div span` match the span?",
          options: ["No, span is not a direct child of div", "Yes, because span is a descendant of div", "Only if span has a class", "No, span needs to be inside an article"],
          correctIndex: 1,
          explanation: "The descendant combinator matches elements at any depth, so `div span` matches the span even though it's nested inside a p inside the div."
        },
        {
          question: "Given `<ul><li><ul><li>Nested</li></ul></li></ul>`, does `ul > li` match the nested li?",
          options: ["Yes, because li is inside a ul", "No, because the nested li is a child of the inner ul, not the outer ul", "Yes, > matches all li descendants", "No, nested lists are not supported in CSS"],
          correctIndex: 1,
          explanation: "`ul > li` only matches `li` elements that are direct children of a `ul`. The nested `li` is a child of the inner `ul`, so it matches `ul > li` for the inner ul, but not the outer ul."
        },
        {
          question: "Which selector targets all `<a>` elements inside a `<footer>`, regardless of nesting depth?",
          options: ["footer > a", "footer + a", "footer a", "footer ~ a"],
          correctIndex: 2,
          explanation: "`footer a` uses the descendant combinator (space), selecting all anchor elements anywhere inside the footer."
        },
        {
          question: "Which selector targets ONLY `<a>` elements that are direct children of a `<nav>`?",
          options: ["nav a", "nav + a", "nav ~ a", "nav > a"],
          correctIndex: 3,
          explanation: "`nav > a` uses the child combinator, targeting only anchor elements that are immediate children of nav."
        },
        {
          question: "What is the advantage of using descendant selectors like `section p` instead of adding a class to every paragraph?",
          options: ["Descendant selectors are faster to process", "They reduce the number of classes needed in HTML, keeping markup cleaner", "They have higher specificity", "They are required by CSS standards"],
          correctIndex: 1,
          explanation: "Using structural selectors to scope styles reduces the need to add many individual class attributes to HTML elements."
        },
        {
          question: "How many selectors does `nav > ul > li > a` chain together?",
          options: ["Two", "Three", "Four", "Five"],
          correctIndex: 2,
          explanation: "The selector chains `nav`, `ul`, `li`, and `a` — four elements connected by three child combinators."
        },
        {
          question: "Spot the bug: you want only direct `<p>` children of `.card` to be styled, but you write `.card p { }`. What is wrong?",
          options: ["Nothing — this is correct", "`.card p` also targets p elements nested deeper inside .card, not just direct children", "p elements cannot be children of .card", "The dot is missing from p"],
          correctIndex: 1,
          explanation: "`.card p` is a descendant selector that matches all `<p>` inside `.card`. To target only direct children, you need `.card > p`."
        },
        {
          question: "What does `main > div > p { color: green; }` select?",
          options: ["All p elements inside main", "p elements that are direct children of div, which are direct children of main", "p elements inside any div", "div elements inside main"],
          correctIndex: 1,
          explanation: "Each `>` requires direct parenthood, so this selects `<p>` elements that are direct children of `<div>` elements that are direct children of `<main>`."
        },
        {
          question: "Which combinator should you use to style navigation links differently from regular paragraph links?",
          options: ["No combinator needed", "Descendant combinator: nav a vs p a", "Child combinator only", "Universal selector"],
          correctIndex: 1,
          explanation: "Using `nav a` and `p a` as separate rules lets you style links in navigation separately from links in paragraphs using the descendant combinator."
        },
        {
          question: "Can you combine a descendant combinator with a class selector, like `.sidebar a`?",
          options: ["No, combinators only work with type selectors", "Yes, you can combine any selectors with combinators", "Only in CSS3 and later", "Only with the universal selector"],
          correctIndex: 1,
          explanation: "Combinators work with any selector type — class, ID, type, or pseudo-selectors can all be used with combinators."
        },
        {
          question: "What does `header > nav > ul { list-style: none; }` remove?",
          options: ["The header and nav elements", "Bullet points from ul elements that are direct children of nav, which is a direct child of header", "All list styles on the page", "The border around the header"],
          correctIndex: 1,
          explanation: "Each `>` enforces direct parenthood at each level, so this removes list-style from `<ul>` elements that are direct children of `<nav>`, which are direct children of `<header>`."
        },
        {
          question: "Why should you avoid very long descendant chains like `body div section article p span a`?",
          options: ["They are not valid CSS", "They are fragile, hard to maintain, and slow for browsers to process", "They only work in Firefox", "They automatically add !important"],
          correctIndex: 1,
          explanation: "Deeply nested selectors are brittle (small HTML changes can break them), slow to match, and hard to read. Keeping selectors short is a best practice."
        },
        {
          question: "In the HTML `<section><div><p>Text</p></div></section>`, which selector does NOT match the paragraph?",
          options: ["section p", "section div p", "section > p", "section > div > p"],
          correctIndex: 2,
          explanation: "`section > p` requires the paragraph to be a direct child of section, but it's inside a div, so it doesn't match."
        },
        {
          question: "What is the specificity of `nav a` compared to just `a`?",
          options: ["`nav a` has higher specificity because it has two type selectors", "`a` has higher specificity because it is simpler", "They are equal", "It depends on the HTML structure"],
          correctIndex: 0,
          explanation: "`nav a` has specificity (0,0,0,2) — two type selectors — while `a` is (0,0,0,1). More selector parts generally increase specificity."
        },
        {
          question: "You want to style `<li>` elements only in a navigation menu, not in the article. The nav has `id=\"main-nav\"`. Which selector is best?",
          options: ["li { }", ".li { }", "#main-nav li { }", "#main-nav > li { }"],
          correctIndex: 2,
          explanation: "`#main-nav li` targets li elements anywhere inside the nav, scoping the style to only the navigation context."
        },
        {
          question: "Does `section > p` also match `<p>` elements inside a `<div>` inside `<section>`?",
          options: ["Yes, the child combinator matches all descendants", "No, the child combinator only matches direct children", "Only if the div has no class", "Only if section is the body's direct child"],
          correctIndex: 1,
          explanation: "The `>` child combinator is strict — it only matches elements one level directly below the parent, not grandchildren."
        },
        {
          question: "Which rule styles all `<strong>` elements that appear anywhere inside a `<blockquote>`?",
          options: ["blockquote > strong { font-style: italic; }", "blockquote + strong { font-style: italic; }", "blockquote strong { font-style: italic; }", "strong blockquote { font-style: italic; }"],
          correctIndex: 2,
          explanation: "`blockquote strong` uses the descendant combinator to target all `<strong>` elements at any depth inside a blockquote."
        }
      ]
    },
    {
      id: "css-selectors-sibling",
      title: "Adjacent and General Sibling Combinators",
      explanation: "The previous lesson showed us how to target elements based on parent-child relationships. But sometimes you need to select elements based on their position relative to siblings — elements that share the same parent. CSS provides two sibling combinators for exactly this purpose.\n\nThe adjacent sibling combinator, written with a plus sign (`+`), selects an element that immediately follows another element with the same parent. For example, `h2 + p` selects a paragraph that comes right after an `h2`, but only if they are siblings (same parent). If there's any other element between them, the rule won't match.\n\nImagine a row of books on a shelf. \"The book immediately to the right of the red book\" is an adjacent relationship — if you move any book between them, they're no longer adjacent. CSS's `+` combinator works the same way: it only fires when the two elements are neighbors with nothing in between.\n\nThe general sibling combinator, written with a tilde (`~`), is more relaxed. `h2 ~ p` selects all paragraphs that are siblings of an `h2` and come after it, even if there are other elements in between. Using our shelf analogy, it selects every book to the right of the red book, not just the immediate neighbor.\n\nBoth combinators only look forward — they find siblings that come after the reference element, not before. CSS has no way to select \"the element before\" using these combinators alone.\n\nWhere are these useful in practice? A common pattern is styling the first paragraph after a heading differently from others. `h1 + p { font-size: 1.2rem; }` gives the introductory paragraph below an `h1` a slightly larger font without any extra HTML attributes. Another practical use is the \"checkbox hack\" — using `input[type=checkbox]:checked ~ div` to show or hide content based on whether a checkbox is checked, entirely in CSS.\n\nUnderstanding sibling combinators unlocks a whole category of CSS patterns that would otherwise require JavaScript or extra classes in your HTML. They're powerful tools for keeping your markup clean.",
      htmlExample: `<article>
  <h2>Getting Started</h2>
  <p class="intro">This first paragraph comes right after the heading.</p>
  <p>This is a regular follow-up paragraph.</p>
  <p>And another paragraph further down.</p>
  <hr />
  <h2>Next Section</h2>
  <p>Paragraph after the second heading.</p>
</article>`,
      cssExample: `article {
  max-width: 640px;
  margin: 0 auto;
  font-family: sans-serif;
  padding: 16px;
}

h2 {
  color: #2c3e50;
  margin-top: 24px;
  margin-bottom: 0;
}

/* Adjacent sibling: only the p immediately after an h2 */
h2 + p {
  font-size: 1.15rem;
  color: #444;
  font-weight: 500;
  margin-top: 6px;
}

/* General sibling: all p elements that follow an h2 */
h2 ~ p {
  line-height: 1.7;
  color: #555;
}`,
      exercises: [
        {
          title: "Style the paragraph after a divider",
          description: "Add a `<p>` immediately after the `<hr />` element. Write an adjacent sibling selector `hr + p` that makes this paragraph italic and colored in a medium gray (#777).",
          hint: "Use `hr + p { font-style: italic; color: #777; }` to target only the paragraph immediately following the horizontal rule."
        },
        {
          title: "General sibling for list items",
          description: "Create a `<ul>` with five `<li>` items. Give the third `<li>` a class of `active`. Write a general sibling selector `.active ~ li` to make all list items after the active one appear lighter in color (color: #aaa) to show that they are 'future' items.",
          hint: "Use `.active ~ li { color: #aaa; }` — the tilde selects all sibling li elements that come after the .active element."
        }
      ],
      quiz: [
        {
          question: "What symbol is used for the adjacent sibling combinator?",
          options: [">", "~", "+", "&"],
          correctIndex: 2,
          explanation: "The adjacent sibling combinator is written with a plus sign (`+`), selecting the immediately following sibling element."
        },
        {
          question: "What does `h3 + p` select?",
          options: ["All p elements inside h3", "The p element that immediately follows an h3 with the same parent", "All p elements that come after any h3 on the page", "h3 elements inside p elements"],
          correctIndex: 1,
          explanation: "The adjacent sibling combinator `+` selects the very next sibling — in this case, a `<p>` that comes directly after an `<h3>` with no elements in between."
        },
        {
          question: "What symbol is used for the general sibling combinator?",
          options: [">", "~", "+", "..."],
          correctIndex: 1,
          explanation: "The general sibling combinator is written with a tilde (`~`), selecting all matching siblings that follow the reference element."
        },
        {
          question: "What does `h2 ~ p` select?",
          options: ["Only the p immediately after h2", "All p siblings of h2 that come before it", "All p elements that are siblings of h2 and come after it", "All p elements on the page"],
          correctIndex: 2,
          explanation: "The `~` combinator selects all siblings that match and appear after the reference element, even with other elements between them."
        },
        {
          question: "Given `<div><p>A</p><span></span><p>B</p></div>`, does `p + p` match paragraph B?",
          options: ["Yes, because B is a sibling p after A", "No, because a span is between them — they are not adjacent", "Yes, the span is ignored", "No, p cannot be adjacent to p"],
          correctIndex: 1,
          explanation: "The adjacent sibling combinator requires the two elements to be immediately next to each other. The `<span>` between the two paragraphs breaks adjacency."
        },
        {
          question: "Given `<div><p>A</p><span></span><p>B</p></div>`, does `p ~ p` match paragraph B?",
          options: ["Yes, because B is a general sibling p after A, regardless of the span between them", "No, the span breaks the sibling relationship", "Only if the span has no class", "No, ~ only works with matching element types"],
          correctIndex: 0,
          explanation: "The general sibling combinator `~` does not require adjacency. As long as B is a sibling `<p>` after A, it matches — regardless of what's between them."
        },
        {
          question: "Can sibling combinators select elements that come BEFORE the reference element?",
          options: ["Yes, the tilde works in both directions", "No, CSS sibling combinators only select elements that come after the reference", "Yes, the + combinator selects the preceding element", "Only when using the :not() pseudo-class"],
          correctIndex: 1,
          explanation: "CSS sibling combinators (+ and ~) only select forward — they find elements that appear after the reference element in the document order."
        },
        {
          question: "Which selector styles only the very first paragraph after each `<h1>` as an intro paragraph?",
          options: ["h1 ~ p { }", "h1 > p { }", "h1 p { }", "h1 + p { }"],
          correctIndex: 3,
          explanation: "`h1 + p` uses the adjacent sibling combinator to style only the `<p>` element that directly follows an `<h1>`."
        },
        {
          question: "What does `input:checked ~ label { color: green; }` do?",
          options: ["Styles all labels green all the time", "Styles label elements that are siblings and follow a checked input", "Styles checked labels", "Styles inputs inside labels"],
          correctIndex: 1,
          explanation: "This rule uses the general sibling combinator combined with the :checked pseudo-class to style labels that follow a checked input — a common CSS-only toggle pattern."
        },
        {
          question: "Both `+` and `~` require the two elements to share the same _____.",
          options: ["Tag name", "Class name", "Parent element", "ID"],
          correctIndex: 2,
          explanation: "Both sibling combinators only work when the two elements are siblings — meaning they share the same direct parent in the HTML tree."
        },
        {
          question: "Spot the bug: `h2 ~+ p { color: red; }`. What is wrong?",
          options: ["You cannot use color on headings", "~+ is not a valid CSS combinator — you must use either ~ or + alone", "p elements cannot be siblings of h2", "The semicolon is misplaced"],
          correctIndex: 1,
          explanation: "`~+` is not a valid CSS combinator. You must use either `~` (general sibling) or `+` (adjacent sibling) individually."
        },
        {
          question: "How is `li ~ li` useful in navigation menus?",
          options: ["It selects every list item", "It selects all list items after the first, allowing you to add top borders or separators between items", "It only selects nested list items", "It selects the last list item"],
          correctIndex: 1,
          explanation: "`li ~ li` selects every `<li>` except the first one (since the first has no preceding li sibling). This is useful for adding dividers between menu items."
        },
        {
          question: "Given three paragraphs in a div: p1, p2, p3. How many paragraphs does `p ~ p` match?",
          options: ["All three paragraphs", "Only p3", "p2 and p3", "None"],
          correctIndex: 2,
          explanation: "`p ~ p` selects `<p>` elements that follow another `<p>`. p1 has no preceding p sibling, so it doesn't match. p2 and p3 both come after p siblings, so both are selected."
        },
        {
          question: "Which combinator is described as: 'the element that comes right after, with nothing in between'?",
          options: ["Descendant (space)", "Child (>)", "Adjacent sibling (+)", "General sibling (~)"],
          correctIndex: 2,
          explanation: "The adjacent sibling combinator (+) requires the selected element to be the very next sibling — no other elements between them."
        },
        {
          question: "You have a `<label>` immediately followed by an `<input>`. Which selector turns the label blue when the input is focused?",
          options: ["input:focus + label { color: blue; }", "input:focus ~ label { color: blue; }", "label:focus + input { color: blue; }", "input + label:focus { color: blue; }"],
          correctIndex: 0,
          explanation: "`input:focus + label` is the right approach — it targets the label immediately following a focused input. (Note: in practice, this requires the label to come after the input in the HTML.)"
        },
        {
          question: "What is the key difference between `+` and `~`?",
          options: ["+ is for descendants, ~ is for siblings", "+ selects only the immediately next sibling; ~ selects all subsequent siblings", "+ is only for type selectors; ~ works with all selectors", "They are identical"],
          correctIndex: 1,
          explanation: "`+` is limited to the immediately following sibling, while `~` selects all subsequent siblings of the same type."
        },
        {
          question: "Which rule adds a top margin to every `<p>` that follows a `<p>` (creating spacing between consecutive paragraphs)?",
          options: ["p p { margin-top: 1em; }", "p + p { margin-top: 1em; }", "p ~ p { margin-top: 1em; }", "Both B and C are correct for this purpose"],
          correctIndex: 1,
          explanation: "`p + p` targets paragraphs immediately after another paragraph. It's a classic pattern for adding spacing between consecutive paragraphs without affecting the first one."
        },
        {
          question: "In `section > h2 + p`, what does the `>` part do?",
          options: ["It selects p elements inside h2 inside section", "It ensures h2 is a direct child of section before the adjacent p is selected", "It is invalid to mix > and + in one selector", "It selects the first child of section"],
          correctIndex: 1,
          explanation: "You can chain multiple combinators. `section > h2 + p` means: find a `<h2>` that is a direct child of `<section>`, then select the `<p>` immediately after that `<h2>`."
        },
        {
          question: "Does `.error ~ .error` select the first `.error` element?",
          options: ["Yes, because it matches all .error elements", "No, the first .error has no preceding .error sibling to trigger the selector", "Yes, because .error matches itself", "Only if there is only one .error element"],
          correctIndex: 1,
          explanation: "The `~` combinator requires a preceding sibling of the same type. The first `.error` has no preceding `.error` sibling, so it is not selected."
        },
        {
          question: "Which CSS selector would add a divider line above every `<section>` except the first one?",
          options: ["section { border-top: 1px solid #ddd; }", "section + section { border-top: 1px solid #ddd; }", "section ~ section { border-top: 1px solid #ddd; }", "Both B and C work here"],
          correctIndex: 3,
          explanation: "Both `section + section` and `section ~ section` select sections that follow another section, effectively skipping the first one. Both are correct for this purpose."
        }
      ]
    },
    {
      id: "css-selectors-attribute",
      title: "Attribute Selectors",
      explanation: "HTML elements can carry a wide variety of attributes — `href`, `type`, `placeholder`, `disabled`, `data-color`, and many more. CSS attribute selectors let you style elements based on these attributes, opening up a whole range of precise targeting that wouldn't be possible with type, class, or ID selectors alone.\n\nThe simplest attribute selector checks whether an attribute exists at all. Writing `[disabled]` targets any element that has a `disabled` attribute, no matter what its value is. This is great for styling disabled form fields consistently.\n\nYou can also target a specific value. `[type=\"text\"]` selects elements where the `type` attribute is exactly `\"text\"`. This is commonly used to style different input types differently — for example, giving text inputs a different border than checkbox inputs.\n\nCSS provides several operators for more flexible matching:\n- `[attr^=\"value\"]` — attribute starts with the value. Great for matching links that begin with `https://`.\n- `[attr$=\"value\"]` — attribute ends with the value. Useful for targeting links pointing to PDF files: `[href$=\".pdf\"]`.\n- `[attr*=\"value\"]` — attribute contains the value anywhere. For example, `[class*=\"btn\"]` would match classes like `btn-primary`, `btn-large`, `btn`.\n- `[attr~=\"value\"]` — attribute value is a space-separated list containing the word. This is how CSS classes actually work internally.\n- `[attr|=\"value\"]` — attribute is exactly the value or starts with `value-` (hyphen-separated). Often used for language codes: `[lang|=\"en\"]` matches `en`, `en-US`, `en-GB`.\n\nAttribute selectors are especially useful for styling links. You might want to add an icon to external links, show a PDF icon beside download links, or mark `mailto:` links with an envelope emoji — all without adding extra classes to your HTML.\n\nThey're also valuable when working with custom `data-*` attributes. If you add `data-theme=\"dark\"` to elements, you can write `[data-theme=\"dark\"]` in CSS to apply dark-mode styles.\n\nAttribute selectors have the same specificity as class selectors, which makes them a flexible and powerful addition to your selector toolkit.",
      htmlExample: `<form>
  <input type="text" placeholder="Your name" />
  <input type="email" placeholder="Your email" />
  <input type="password" placeholder="Password" />
  <input type="submit" value="Sign Up" />
  <input type="text" disabled placeholder="Unavailable field" />
</form>
<div>
  <a href="https://example.com">External link</a>
  <a href="resume.pdf">Download Resume (PDF)</a>
  <a href="mailto:hi@example.com">Email us</a>
</div>`,
      cssExample: `input[type="text"] {
  border: 2px solid #4a90e2;
  padding: 8px;
  border-radius: 4px;
  display: block;
  margin-bottom: 8px;
}

input[type="email"] {
  border: 2px solid #7ed321;
  padding: 8px;
  border-radius: 4px;
  display: block;
  margin-bottom: 8px;
}

input[disabled] {
  background: #f0f0f0;
  color: #aaa;
  cursor: not-allowed;
  display: block;
  margin-bottom: 8px;
  padding: 8px;
}

a[href^="https"] {
  color: #0066cc;
}

a[href$=".pdf"]::after {
  content: " 📄";
}

a[href^="mailto"]::before {
  content: "✉️ ";
}`,
      exercises: [
        {
          title: "Style links with target attribute",
          description: "Add `target=\"_blank\"` to the external link. Write a CSS attribute selector `a[target=\"_blank\"]` that adds `↗` after those links using the `::after` pseudo-element, signaling they open in a new tab.",
          hint: "Use `a[target=\"_blank\"]::after { content: ' ↗'; font-size: 0.8em; }`"
        },
        {
          title: "Highlight required fields",
          description: "Add `required` attributes to the text and email inputs. Write a CSS attribute selector `input[required]` that adds a `2px solid orange` border to required fields, distinguishing them from optional ones.",
          hint: "Use `input[required] { border: 2px solid orange; }` — the presence-only attribute selector matches any input with the required attribute."
        }
      ],
      quiz: [
        {
          question: "Which selector targets all elements that have a `disabled` attribute, regardless of its value?",
          options: ["[disabled='true']", ".disabled", "[disabled]", "disabled { }"],
          correctIndex: 2,
          explanation: "`[disabled]` is a presence selector — it matches any element that has the `disabled` attribute, whatever its value (or even if it has no value)."
        },
        {
          question: "What does `input[type=\"checkbox\"]` select?",
          options: ["All input elements", "Only input elements where type is exactly 'checkbox'", "Inputs with type containing 'checkbox'", "Checkboxes and radio buttons"],
          correctIndex: 1,
          explanation: "The `=` operator in attribute selectors requires an exact match, so only inputs with `type=\"checkbox\"` will be selected."
        },
        {
          question: "Which operator selects elements whose attribute VALUE STARTS WITH a given string?",
          options: ["[attr$='value']", "[attr*='value']", "[attr^='value']", "[attr~='value']"],
          correctIndex: 2,
          explanation: "The `^=` operator matches attributes whose value begins with the specified string — like `[href^='https']` for links starting with https."
        },
        {
          question: "Which operator selects elements whose attribute VALUE ENDS WITH a given string?",
          options: ["[attr$='value']", "[attr*='value']", "[attr^='value']", "[attr|='value']"],
          correctIndex: 0,
          explanation: "The `$=` operator matches attributes whose value ends with the specified string, such as `[href$='.pdf']` for PDF links."
        },
        {
          question: "Which CSS rule adds a PDF icon after links pointing to PDF files?",
          options: ["a[href='pdf']::after { content: '📄'; }", "a[href$='.pdf']::after { content: '📄'; }", "a[href^='.pdf']::after { content: '📄'; }", "a.pdf::after { content: '📄'; }"],
          correctIndex: 1,
          explanation: "`[href$='.pdf']` matches links whose `href` ends with `.pdf`, and `::after` appends the icon after the link text."
        },
        {
          question: "What does `[attr*='value']` match?",
          options: ["Attributes that start with 'value'", "Attributes that end with 'value'", "Attributes that contain 'value' anywhere", "Attributes that equal exactly 'value'"],
          correctIndex: 2,
          explanation: "The `*=` operator is the 'contains' operator — it matches if the attribute value contains the specified string anywhere."
        },
        {
          question: "What is the specificity of an attribute selector like `[type='text']`?",
          options: ["Same as a type selector (0,0,0,1)", "Same as a class selector (0,0,1,0)", "Same as an ID selector (0,1,0,0)", "Zero specificity"],
          correctIndex: 1,
          explanation: "Attribute selectors have the same specificity as class selectors: (0,0,1,0)."
        },
        {
          question: "Which selector targets `<a>` elements whose `href` starts with `mailto:`?",
          options: ["a[href='mailto']", "a[href^='mailto:']", "a[href$='mailto:']", "a[href*='mail']"],
          correctIndex: 1,
          explanation: "`a[href^='mailto:']` uses the starts-with operator to target links whose href begins with `mailto:`."
        },
        {
          question: "What does `[lang|='en']` match?",
          options: ["Only elements with lang='en'", "Elements with lang='en' or lang starting with 'en-' (like 'en-US', 'en-GB')", "Elements containing 'en' anywhere in lang", "Elements with lang ending in 'en'"],
          correctIndex: 1,
          explanation: "The `|=` operator matches the exact value or the value followed by a hyphen — designed for language codes like `en`, `en-US`, `en-GB`."
        },
        {
          question: "Spot the bug: `a[href^=https] { color: blue; }`. What's wrong?",
          options: ["^ is not a valid operator", "The attribute value should be quoted: a[href^='https']", "href cannot be used in attribute selectors", "Blue is not a valid color"],
          correctIndex: 1,
          explanation: "Attribute values in CSS attribute selectors should be quoted. While some browsers accept unquoted values, quoting is required by the spec and is best practice."
        },
        {
          question: "Which selector applies styles to any element that has a `data-tooltip` attribute?",
          options: ["data-tooltip { }", ".data-tooltip { }", "[data-tooltip] { }", "#data-tooltip { }"],
          correctIndex: 2,
          explanation: "Square brackets denote an attribute selector. `[data-tooltip]` targets any element with the `data-tooltip` attribute present."
        },
        {
          question: "What does `input:not([type='submit'])` select?",
          options: ["Only submit inputs", "All inputs except those with type='submit'", "Inputs with type containing 'submit'", "Non-input elements"],
          correctIndex: 1,
          explanation: "`input:not([type='submit'])` combines the :not() pseudo-class with an attribute selector to select all input elements except submit buttons."
        },
        {
          question: "Which rule styles all inputs that are NOT disabled?",
          options: ["input[enabled] { }", "input:not([disabled]) { }", "input[disabled='false'] { }", "input.enabled { }"],
          correctIndex: 1,
          explanation: "`input:not([disabled])` uses the :not() pseudo-class to select inputs that do not have the `disabled` attribute."
        },
        {
          question: "You have `<button data-theme='dark'>`. Which selector matches it?",
          options: ["button.dark { }", "button#dark { }", "button[data-theme='dark'] { }", "button[theme='dark'] { }"],
          correctIndex: 2,
          explanation: "`button[data-theme='dark']` correctly uses the attribute name `data-theme` and value `dark` to match this element."
        },
        {
          question: "What does `[attr~='word']` match that `[attr='word']` does not?",
          options: ["Nothing — they are identical", "`~=` matches attributes that are a space-separated list CONTAINING 'word', while `=` requires an exact match", "`~=` is case-insensitive, `=` is case-sensitive", "`~=` matches partial words, `=` matches whole words"],
          correctIndex: 1,
          explanation: "`~=` is the 'word in list' operator — it matches when the attribute is a whitespace-separated list and one of the words equals the value. `=` requires the entire attribute to equal the value."
        },
        {
          question: "Which attribute selector would target images with no `alt` attribute?",
          options: ["img[alt=''] { }", "img[alt] { }", "img:not([alt]) { }", "img { alt: none; }"],
          correctIndex: 2,
          explanation: "`img:not([alt])` selects images that lack the `alt` attribute entirely — useful for accessibility audits to highlight images missing alt text."
        },
        {
          question: "Can attribute selectors be combined with class selectors?",
          options: ["No, they are mutually exclusive", "Yes, like `input.large[type='text']` to target large text inputs specifically", "Only in CSS4", "Only with the universal selector"],
          correctIndex: 1,
          explanation: "You can combine any CSS selectors — `input.large[type='text']` targets input elements that have both the `large` class and `type='text'`."
        },
        {
          question: "What does `a[href]:not([href^='#'])` select?",
          options: ["Links with no href attribute", "All anchor tags", "Links that have an href attribute but it doesn't start with #", "Links pointing to external pages only"],
          correctIndex: 2,
          explanation: "`a[href]` requires an href attribute, and `:not([href^='#'])` excludes those starting with # (in-page anchors), leaving external and other non-hash links."
        },
        {
          question: "Are CSS attribute selectors case-sensitive by default?",
          options: ["No, they are always case-insensitive", "Yes, attribute values are case-sensitive by default in HTML", "Only the attribute name is case-sensitive", "Only in CSS3 and later"],
          correctIndex: 1,
          explanation: "By default, attribute value matching is case-sensitive. You can add `i` flag inside brackets (e.g., `[type='TEXT' i]`) for case-insensitive matching in CSS4."
        },
        {
          question: "Which selector targets form inputs where the placeholder text starts with 'Enter'?",
          options: ["input[placeholder^='Enter']", "input[placeholder$='Enter']", "input[placeholder='Enter']", "input::placeholder { content: 'Enter'; }"],
          correctIndex: 0,
          explanation: "`input[placeholder^='Enter']` uses the starts-with operator to match inputs whose placeholder attribute begins with the word 'Enter'."
        }
      ]
    },
    {
      id: "css-selectors-pseudo-classes",
      title: "Pseudo-classes",
      explanation: "CSS pseudo-classes let you style elements based on their current state or position — things you can't express with simple class or type selectors. They always start with a single colon (`:`) and describe a special condition of the element.\n\nThe most familiar pseudo-classes are the interaction states. `:hover` applies a style when the user moves their cursor over an element. `:focus` triggers when an element receives keyboard focus — this is crucial for keyboard accessibility. `:active` fires for the brief moment when an element is being clicked. Together, these three make buttons and links feel interactive and responsive.\n\nForm-related pseudo-classes include `:checked` (for checked checkboxes and radio buttons), `:disabled`, `:enabled`, `:required`, and `:valid`/`:invalid` (which trigger based on form validation). These let you give users clear visual feedback about the state of form controls without any JavaScript.\n\nStructural pseudo-classes help you target elements based on their position in the document. `:first-child` selects an element if it's the first child of its parent. `:last-child` selects the last. `:nth-child(n)` is the most versatile — it accepts a number, keyword (`odd`, `even`), or formula (`2n+1`, `3n`) to select elements by position. For example, `li:nth-child(odd)` selects the 1st, 3rd, 5th list items, enabling zebra-striping effects in tables or lists without adding extra classes.\n\n`:nth-child` uses a formula `an+b` where `n` starts at 0. So `2n+1` means positions 1, 3, 5... (odd), and `3n` means every third element (3, 6, 9...). It sounds complex but becomes intuitive with practice.\n\n`:not(selector)` is incredibly useful — it selects elements that do NOT match the given selector. `li:not(:last-child)` selects all list items except the last, which is perfect for adding a border-bottom separator to all items except the final one.\n\n`:nth-of-type()` works like `:nth-child()` but counts only siblings of the same element type, which can be useful when mixed content is present.\n\nPseudo-classes are the key to interactive, dynamic-feeling web interfaces built entirely in CSS. Learning them opens up a huge range of patterns that previously required JavaScript.",
      htmlExample: `<nav>
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Contact</a>
</nav>
<form>
  <input type="text" placeholder="Name" required />
  <input type="email" placeholder="Email" />
  <button type="submit">Submit</button>
</form>
<ul>
  <li>Item One</li>
  <li>Item Two</li>
  <li>Item Three</li>
  <li>Item Four</li>
  <li>Item Five</li>
</ul>`,
      cssExample: `nav a {
  display: inline-block;
  padding: 8px 16px;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;
}

nav a:hover {
  background: #e8f0fe;
  color: #1a73e8;
}

nav a:active {
  background: #c5d9fb;
}

input:focus {
  outline: 2px solid #1a73e8;
  outline-offset: 2px;
}

input:invalid {
  border-color: #e74c3c;
}

button:hover {
  opacity: 0.85;
  cursor: pointer;
}

li:nth-child(odd) {
  background: #f9f9f9;
}

li:last-child {
  font-weight: bold;
  color: #1a73e8;
}`,
      exercises: [
        {
          title: "Zebra-stripe a table",
          description: "Replace the `<ul>` with an HTML `<table>` with 6 `<tr>` rows. Write a CSS rule using `tr:nth-child(even)` to give alternate rows a light grey background (#f2f2f2), creating a striped table effect.",
          hint: "Use `tr:nth-child(even) { background: #f2f2f2; }` to target every second table row."
        },
        {
          title: "Focus styles for accessibility",
          description: "Add a `<textarea>` and a `<select>` dropdown to the form. Write CSS using `:focus` to give all three form controls (input, textarea, select) a visible blue outline when focused. Remove the default outline first with `outline: none` on the base elements, then re-add a custom one on `:focus`.",
          hint: "Use `input, textarea, select { outline: none; }` then `input:focus, textarea:focus, select:focus { outline: 2px solid #1a73e8; }`"
        }
      ],
      quiz: [
        {
          question: "Which pseudo-class applies styles when a user hovers their cursor over an element?",
          options: [":focus", ":active", ":hover", ":visited"],
          correctIndex: 2,
          explanation: "`:hover` triggers when the user's pointer moves over an element, making it ideal for hover effects on buttons and links."
        },
        {
          question: "Which pseudo-class fires when an element receives keyboard focus?",
          options: [":hover", ":focus", ":active", ":checked"],
          correctIndex: 1,
          explanation: "`:focus` applies when an element is focused — either by clicking or tabbing to it. It's critical for keyboard accessibility."
        },
        {
          question: "What does `li:first-child` select?",
          options: ["The first li element on the page", "A li element that is the first child of its parent", "The first li inside a ul", "li elements with no siblings"],
          correctIndex: 1,
          explanation: "`:first-child` selects an element only if it is the first child of its parent, regardless of what its parent is."
        },
        {
          question: "What does `li:nth-child(odd)` select?",
          options: ["Every other li starting from the second", "The 1st, 3rd, 5th, etc. li elements in their parent", "List items with an odd class", "All li except the first"],
          correctIndex: 1,
          explanation: "`:nth-child(odd)` selects elements at positions 1, 3, 5, 7... — the odd-numbered children — enabling zebra-striping."
        },
        {
          question: "Which pseudo-class targets a checked checkbox?",
          options: [":selected", ":on", ":checked", ":active"],
          correctIndex: 2,
          explanation: "`:checked` matches checkbox and radio button inputs that are in the checked state."
        },
        {
          question: "What does `a:visited` style?",
          options: ["Links that the user is currently hovering", "Links that the user has previously visited", "Links that open in a new tab", "Links with no href attribute"],
          correctIndex: 1,
          explanation: "`:visited` applies to links whose URLs are in the browser's history — i.e., links the user has already clicked."
        },
        {
          question: "Which pseudo-class selects the LAST child of its parent?",
          options: [":last-of-type", ":nth-last-child(1)", ":last-child", "Both B and C are correct"],
          correctIndex: 3,
          explanation: "Both `:last-child` and `:nth-last-child(1)` select the last child. `:last-child` is the simpler and more commonly used form."
        },
        {
          question: "What does `p:not(.intro)` select?",
          options: ["Paragraphs with class intro", "Paragraphs that do NOT have the class intro", "All elements except p.intro", "Only the first paragraph"],
          correctIndex: 1,
          explanation: "`:not(selector)` selects elements that do not match the given selector — so `p:not(.intro)` selects paragraphs without the `intro` class."
        },
        {
          question: "In `li:nth-child(2n+1)`, what positions are selected?",
          options: ["2, 4, 6 (even positions)", "1, 3, 5 (odd positions)", "Every third element", "Every second element starting from position 1"],
          correctIndex: 1,
          explanation: "`2n+1` with n=0,1,2... gives positions 1, 3, 5... — the odd positions. This is equivalent to `:nth-child(odd)`."
        },
        {
          question: "What does `button:active` style?",
          options: ["Buttons with class active", "Buttons that are focused", "Buttons in the moment they are being pressed (clicked)", "Buttons that are enabled"],
          correctIndex: 2,
          explanation: "`:active` applies the style during the brief moment an element is being activated (pressed). For buttons, this is while the mouse button is held down."
        },
        {
          question: "Which pseudo-class helps identify form inputs that fail HTML validation?",
          options: [":error", ":wrong", ":invalid", ":fail"],
          correctIndex: 2,
          explanation: "`:invalid` matches form controls whose value fails the browser's built-in validation (like an empty required field or a malformed email)."
        },
        {
          question: "What does `input:disabled { opacity: 0.5; }` accomplish?",
          options: ["Removes all disabled inputs from the page", "Makes all inputs 50% transparent", "Makes disabled inputs appear semi-transparent, visually indicating they are not interactive", "Disables all inputs on the page"],
          correctIndex: 2,
          explanation: "`:disabled` targets form elements with the disabled attribute. `opacity: 0.5` is a common way to visually communicate that a field is unavailable."
        },
        {
          question: "How does `:nth-of-type()` differ from `:nth-child()`?",
          options: ["They are identical", ":nth-of-type counts only siblings of the same element type, while :nth-child counts all siblings", ":nth-of-type uses letters, :nth-child uses numbers", ":nth-of-type works on classes, :nth-child works on IDs"],
          correctIndex: 1,
          explanation: "`:nth-child(2)` selects an element if it is the 2nd child of any type. `:nth-of-type(2)` selects an element if it is the 2nd sibling of its own type."
        },
        {
          question: "What does `li:not(:last-child)` do?",
          options: ["Selects only the last list item", "Selects all list items except the last one", "Selects list items that come before the last child", "Removes the last list item"],
          correctIndex: 1,
          explanation: "`li:not(:last-child)` selects all `<li>` elements that are NOT the last child — a common pattern for adding borders between items."
        },
        {
          question: "Spot the bug: `a.hover { color: blue; }` — the developer wanted hover styles but they apply all the time. What's wrong?",
          options: ["color: blue is not a valid value", "`.hover` is a class selector, not the `:hover` pseudo-class — should be `a:hover`", "Anchor tags cannot be styled with color", "The selector is missing a semicolon"],
          correctIndex: 1,
          explanation: "`.hover` targets elements with a class named `hover` (always applied). The pseudo-class for mouse-over effects is `:hover` with a colon."
        },
        {
          question: "What does `tr:nth-child(even) { background: #f0f0f0; }` create?",
          options: ["Colored headings in a table", "A striped (zebra-striped) table with alternating row backgrounds", "A table with only even rows visible", "Bold text in even rows"],
          correctIndex: 1,
          explanation: "Applying a background to even-numbered rows (2, 4, 6...) alongside no background on odd rows creates the classic striped table (zebra-stripe) effect."
        },
        {
          question: "Which pseudo-class is essential for keyboard-accessible navigation and should never be disabled with `outline: none` without replacement?",
          options: [":hover", ":active", ":focus", ":visited"],
          correctIndex: 2,
          explanation: "`:focus` shows sighted keyboard users which element is currently focused. Removing it without providing a custom visible focus style harms accessibility."
        },
        {
          question: "What does `p:first-of-type` select?",
          options: ["The first p on the entire page", "The first p child within each parent element", "Only the p with id='first'", "p elements that are the very first element in the body"],
          correctIndex: 1,
          explanation: "`:first-of-type` selects the first element of a given type within each parent — so in a document with multiple containers, each container's first `<p>` is selected."
        },
        {
          question: "In the `:nth-child(an+b)` formula, what does `n` represent?",
          options: ["A fixed number you choose", "An automatically incrementing counter starting from 0", "The total number of children", "The element's index in JavaScript"],
          correctIndex: 1,
          explanation: "`n` is an implicit counter that starts at 0 and increments by 1. The formula `an+b` is calculated for each value of n to determine which children to select."
        },
        {
          question: "Which rule styles only the 3rd list item in a `<ul>`?",
          options: ["li:third-child { }", "li:nth-child(3) { }", "li:child(3) { }", "li:order(3) { }"],
          correctIndex: 1,
          explanation: "`:nth-child(3)` selects the element that is exactly the 3rd child of its parent."
        }
      ]
    },
    {
      id: "css-selectors-pseudo-elements",
      title: "Pseudo-elements (::before, ::after, ::first-line)",
      explanation: "Pseudo-elements are different from pseudo-classes in one important way: instead of selecting an element in a particular state, they create a virtual sub-part of an element or target a specific portion of its content. They use double-colon syntax (`::`) to distinguish them from pseudo-classes (though older browsers supported single-colon syntax too).\n\nThe most frequently used pseudo-elements are `::before` and `::after`. These insert generated content — specified via the `content` property — either before or after the real content of an element, without touching the HTML. Think of them as invisible, automatically added child elements that live just inside the start and end of their host element. Because they're generated by CSS, they don't appear in the HTML source or the DOM in the traditional sense.\n\nFor example, `blockquote::before { content: '\"'; }` adds an opening quotation mark before blockquote text. `a[href$='.pdf']::after { content: ' (PDF)'; }` appends \" (PDF)\" after every link pointing to a PDF file, with zero changes to the HTML.\n\nThe `content` property is required for `::before` and `::after` to work. It can be a text string, an empty string (`content: ''`), a Unicode character, or the `url()` function to insert an image. When set to an empty string, the pseudo-element becomes an invisible box that you can style with dimensions, backgrounds, and positioning — this is the trick behind many CSS-only icons, decorative underline effects, and clearfix hacks.\n\n`::first-line` targets the first rendered line of a block element — the content that physically appears on the first line, which changes depending on the viewport width. This is great for dropcap effects or first-line emphasis in editorial text.\n\n`::first-letter` selects the very first character of block text. Combined with large font sizes and floats, it creates the classic typographic dropcap.\n\n`::placeholder` styles the placeholder text inside form inputs. `::selection` styles the text highlighting color when users click and drag to select text on the page.\n\nPseudo-elements are positioned within the normal flow by default, but they can be positioned absolutely relative to their parent with `position: absolute`. This makes them perfect for decorative flourishes, badges, and overlays — adding visual richness without polluting your HTML.",
      htmlExample: `<blockquote>
  Design is not just what it looks like and feels like. Design is how it works.
</blockquote>
<article>
  <h2>Typography Tips</h2>
  <p>Good typography is the foundation of readable web content. Choosing the right typeface, line height, and spacing makes a big difference to the reader experience.</p>
  <p>Small details, like first-line emphasis, create a polished and professional feel.</p>
</article>
<ul class="checklist">
  <li>Plan the layout</li>
  <li>Design the components</li>
  <li>Write the content</li>
</ul>`,
      cssExample: `blockquote {
  position: relative;
  font-style: italic;
  color: #555;
  padding: 16px 24px;
  border-left: 4px solid #ccc;
  margin: 16px 0;
}

blockquote::before {
  content: '\\201C';
  font-size: 4rem;
  color: #ccc;
  position: absolute;
  top: -10px;
  left: 8px;
  line-height: 1;
}

article p::first-line {
  font-weight: bold;
  color: #1a1a2e;
}

.checklist li::before {
  content: '\\2713  ';
  color: #27ae60;
  font-weight: bold;
}

.checklist {
  list-style: none;
  padding-left: 0;
}`,
      exercises: [
        {
          title: "Add decorative quotes",
          description: "Style the `<blockquote>` element to add both an opening `::before` and a closing `::after` decorative quote character. Use `content: '\\201C'` for the opening and `content: '\\201D'` for the closing double quote. Style them with a large font size and a muted color.",
          hint: "Use `blockquote::before { content: '\\201C'; font-size: 3rem; color: #ccc; }` and `blockquote::after { content: '\\201D'; font-size: 3rem; color: #ccc; }`"
        },
        {
          title: "Dropcap with ::first-letter",
          description: "Target the first `<p>` inside the `<article>` and use `::first-letter` to make the opening character large (font-size: 3em), bold, float left, and colored in a deep blue (#1a1a2e). This creates a classic newspaper dropcap effect.",
          hint: "Use `article p:first-of-type::first-letter { font-size: 3em; font-weight: bold; float: left; color: #1a1a2e; margin-right: 4px; }`"
        }
      ],
      quiz: [
        {
          question: "What syntax distinguishes pseudo-elements from pseudo-classes?",
          options: ["Pseudo-elements use a single colon (:), pseudo-classes use double colons (::)", "Pseudo-elements use double colons (::), pseudo-classes use a single colon (:)", "Both use single colons", "Both use double colons"],
          correctIndex: 1,
          explanation: "Modern CSS uses `::` for pseudo-elements (like `::before`) and `:` for pseudo-classes (like `:hover`), though single-colon pseudo-elements are still supported for backwards compatibility."
        },
        {
          question: "Which CSS property is REQUIRED for `::before` and `::after` to render anything?",
          options: ["display", "position", "content", "visibility"],
          correctIndex: 2,
          explanation: "The `content` property is mandatory for `::before` and `::after`. Without it (or with `content: none`), the pseudo-element won't render."
        },
        {
          question: "What does `p::before { content: '→ '; }` add to paragraphs?",
          options: ["An arrow after each paragraph", "An arrow before the text of each paragraph", "A border to the left of each paragraph", "Nothing — arrows are not valid content values"],
          correctIndex: 1,
          explanation: "`::before` inserts content just before the element's inner content, so `'→ '` appears at the start of each paragraph's text."
        },
        {
          question: "What does `::first-line` target?",
          options: ["The first child element of a block", "The first physically rendered line of text in a block element", "The first paragraph in a section", "The first word of an element"],
          correctIndex: 1,
          explanation: "`::first-line` selects only the first rendered line of a block element — the line as it physically wraps on screen, which changes with viewport width."
        },
        {
          question: "What does `::first-letter` do?",
          options: ["Targets the first word of an element", "Targets the very first character of a block element's text", "Selects all capital letters", "Targets the first paragraph of a section"],
          correctIndex: 1,
          explanation: "`::first-letter` selects just the first character of block-level text, which is how CSS dropcap effects are created."
        },
        {
          question: "Which pseudo-element styles text that users have highlighted (selected) on the page?",
          options: ["::highlight", "::selection", "::chosen", "::marked"],
          correctIndex: 1,
          explanation: "`::selection` targets the portion of text currently selected by the user, allowing you to customize the highlight color and background."
        },
        {
          question: "What does `::placeholder` style?",
          options: ["Elements with the placeholder attribute", "The hint text inside form inputs before the user types", "The label above a form field", "The default value of an input"],
          correctIndex: 1,
          explanation: "`::placeholder` targets the placeholder text shown inside an input or textarea before the user has entered any content."
        },
        {
          question: "Can `::before` and `::after` be positioned absolutely?",
          options: ["No, pseudo-elements always follow normal flow", "Yes, if the parent element has position: relative, pseudo-elements can be positioned absolutely", "Only ::after can be positioned", "Only with flexbox containers"],
          correctIndex: 1,
          explanation: "Pseudo-elements participate in CSS positioning. With `position: absolute` on the pseudo-element and `position: relative` on the parent, you can place them freely."
        },
        {
          question: "Which value for `content` makes a pseudo-element an invisible (but present) box?",
          options: ["content: none", "content: hidden", "content: ''  (empty string)", "content: transparent"],
          correctIndex: 2,
          explanation: "`content: ''` (an empty string) creates the pseudo-element with no visible content, but the element still exists and can be styled with dimensions and backgrounds."
        },
        {
          question: "Spot the bug: `.tooltip::before { font-size: 14px; color: white; }` — the tooltip doesn't appear. What's missing?",
          options: ["The selector is wrong", "The `content` property is missing", "Pseudo-elements cannot have color", "The font-size unit is wrong"],
          correctIndex: 1,
          explanation: "Without the `content` property, `::before` produces nothing. Adding `content: ''` or any string is required for the pseudo-element to render."
        },
        {
          question: "What does `a::after { content: ' (' attr(href) ')'; }` do?",
          options: ["Adds the href URL in parentheses after each link's visible text", "Removes the href attribute from links", "Wraps links in parentheses", "Creates a tooltip with the URL"],
          correctIndex: 0,
          explanation: "`attr(href)` inside `content` inserts the value of the `href` attribute. This is commonly used for print stylesheets to show link URLs after link text."
        },
        {
          question: "Which pseudo-element would you use to add a checkmark before each item in a custom list?",
          options: ["::after", "::marker", "::before", "::first-letter"],
          correctIndex: 2,
          explanation: "`::before` inserts content before the element's content. Using `content: '✓ '` before `<li>` elements creates custom checkmark list bullets."
        },
        {
          question: "What is `::marker` used for?",
          options: ["Styling the first letter of an element", "Styling the list bullet or number of a list item", "Marking text as highlighted", "Adding a border to an element"],
          correctIndex: 1,
          explanation: "`::marker` targets the list item marker (bullet point or number), allowing you to change its color, font size, or content directly."
        },
        {
          question: "Are `::before` and `::after` real HTML elements in the DOM?",
          options: ["Yes, they appear in the HTML source", "No, they are generated by CSS and not part of the real DOM", "Yes, but only in the rendered page, not the source", "Only ::before is a real element"],
          correctIndex: 1,
          explanation: "Pseudo-elements are generated content — they exist visually on screen, but they are not real HTML elements and don't appear in the HTML source or standard DOM."
        },
        {
          question: "What does `p::first-line { font-variant: small-caps; }` do?",
          options: ["Makes the entire paragraph use small caps", "Makes only the first rendered line of each paragraph use small caps", "Makes the first word of each paragraph use small caps", "Makes the first paragraph on the page use small caps"],
          correctIndex: 1,
          explanation: "`::first-line` targets only the first rendered line (which varies with viewport width), applying the style only to that physical line of text."
        },
        {
          question: "Which `content` value inserts the Unicode left double quotation mark in a `::before` pseudo-element?",
          options: ["content: 'ldquo'", "content: '&ldquo;'", "content: '\\201C'", "content: '\"'"],
          correctIndex: 2,
          explanation: "In CSS `content`, Unicode characters are specified as a backslash followed by the hex code: `'\\201C'` is the left double quotation mark (\\u201C)."
        },
        {
          question: "Can pseudo-elements like `::before` be animated with CSS transitions?",
          options: ["No, pseudo-elements cannot be animated", "Yes, pseudo-elements support CSS transitions and animations like regular elements", "Only opacity can be animated on pseudo-elements", "Only in Chrome"],
          correctIndex: 1,
          explanation: "Pseudo-elements can participate in CSS transitions and animations — you can animate their opacity, transform, color, and other properties."
        },
        {
          question: "Why would a developer use `::before` with `content: ''` and explicit width/height?",
          options: ["To add invisible spacing between elements", "To create CSS-only decorative shapes or icons without any extra HTML", "To target the first character of an element", "To increase selector specificity"],
          correctIndex: 1,
          explanation: "An empty-content pseudo-element can still be styled as a visible box. This technique is widely used to create decorative shapes, borders, and icons using pure CSS."
        },
        {
          question: "What is the specificity of `::before` and `::after`?",
          options: ["Same as an ID selector", "Same as a type selector (0,0,0,1)", "Zero specificity", "Same as a class selector"],
          correctIndex: 1,
          explanation: "Pseudo-elements have a specificity of (0,0,0,1) — the same as a type selector — contributing one point to the overall specificity of the selector."
        },
        {
          question: "The rule `h2::first-letter { font-size: 200%; color: red; }` makes what change?",
          options: ["All h2 text turns red and large", "Only the first character of each h2 becomes larger and red", "The first h2 on the page has a red letter", "The first word of each h2 becomes red"],
          correctIndex: 1,
          explanation: "`::first-letter` selects only the very first character of the element's text, enlarging and coloring just that letter."
        }
      ]
    }
  ]
};
