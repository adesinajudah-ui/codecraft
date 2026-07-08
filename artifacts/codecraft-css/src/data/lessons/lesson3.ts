import type { Lesson } from "../types";

export const cssStylingLesson: Lesson = {
  id: "css-styling",
  title: "Styling Text & Elements",
  topics: [
    {
      id: "css-styling-font-properties",
      title: "Font Properties",
      explanation: "Fonts are the clothes your text wears. Just like choosing an outfit changes how you present yourself, choosing the right font changes how your content feels to readers. CSS gives you a powerful set of font properties to control exactly how text looks on screen.\n\nThe `font-family` property lets you pick which typeface to use. You can list multiple fonts separated by commas — this is called a font stack. The browser tries each font in order and uses the first one it finds installed. It's good practice to end your stack with a generic family like `serif`, `sans-serif`, or `monospace` as a safe fallback. For example, `font-family: 'Georgia', serif;` means 'use Georgia if available, otherwise use any serif font.'\n\nThe `font-size` property controls how big the text appears. You can use pixels (`px`) for an exact size, `em` units that scale relative to the parent element's font size, or `rem` units that scale relative to the root element. A common base size is 16px, and you'd write it as `font-size: 16px;`. Beginners often find pixels easiest to start with, but `rem` units help build more flexible layouts later.\n\nThe `font-weight` property controls how thick or thin the characters appear. Common values include `normal` (the default weight), `bold` (heavier strokes), and numeric values from 100 to 900 in steps of 100. Weight 400 equals normal and 700 equals bold. Not all fonts support every numeric weight, so they may fall back to the nearest available weight.\n\nThe `font-style` property lets you make text italic or oblique. `normal` removes any slant, `italic` uses a specially designed italic version of the font if one exists, and `oblique` just mechanically slants the regular characters. Most of the time `italic` is what you want.\n\nThere is also a shorthand property simply called `font` that lets you set several font properties in one declaration. The order matters: `font: italic bold 18px/1.5 'Arial', sans-serif;` sets style, weight, size, line-height, and family all at once. While handy, beginners often find individual properties clearer when learning.",
      htmlExample: "<h1 class=\"headline\">Welcome to Typography</h1>\n<p class=\"body-text\">This paragraph uses a readable font stack for comfortable reading at length. Good typography improves comprehension.</p>\n<p class=\"mono-text\">Code samples look great in monospace.</p>",
      cssExample: ".headline {\n  font-family: 'Georgia', serif;\n  font-size: 32px;\n  font-weight: 700;\n  font-style: normal;\n}\n\n.body-text {\n  font-family: 'Arial', sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n}\n\n.mono-text {\n  font-family: 'Courier New', monospace;\n  font-size: 14px;\n  font-weight: normal;\n  font-style: italic;\n}",
      exercises: [
        {
          title: "Create a Font Stack",
          description: "Change the headline to use a sans-serif font stack with at least two specific fonts listed before the generic fallback, and increase its size to 40px.",
          hint: "Remember to separate font names with commas, and wrap multi-word font names in quotes."
        },
        {
          title: "Experiment with Font Weight",
          description: "Add a new paragraph with class 'light-text' and style it with font-weight 300 and font-style italic to create a delicate, light appearance.",
          hint: "If weight 300 looks the same as normal, the font may not support that weight — try a different font family."
        }
      ],
      quiz: [
        {
          question: "Which CSS property controls the typeface used for text?",
          options: ["font-type", "font-family", "font-face", "text-font"],
          correctIndex: 1,
          explanation: "The `font-family` property specifies which typeface or font stack the browser should use to render text."
        },
        {
          question: "What does a font stack achieve in CSS?",
          options: [
            "It stacks text vertically on the page",
            "It lists multiple fonts so the browser uses the first available one",
            "It loads fonts in parallel for speed",
            "It applies different fonts to different screen sizes"
          ],
          correctIndex: 1,
          explanation: "A font stack is a comma-separated list of fonts; the browser tries each in order and uses the first one it finds installed on the user's system."
        },
        {
          question: "Which font-weight value is equivalent to 'bold'?",
          options: ["400", "600", "700", "900"],
          correctIndex: 2,
          explanation: "A font-weight of 700 corresponds to the keyword `bold`, while 400 corresponds to `normal`."
        },
        {
          question: "What does `font-style: oblique` do?",
          options: [
            "Uses the specially designed italic variant of the font",
            "Mechanically slants the regular characters of the font",
            "Makes the text bold and slanted",
            "Removes all styling from the text"
          ],
          correctIndex: 1,
          explanation: "`oblique` artificially slants the upright characters, while `italic` uses a true italic typeface design if one exists."
        },
        {
          question: "Which unit scales font size relative to the root element's font size?",
          options: ["px", "em", "rem", "%"],
          correctIndex: 2,
          explanation: "`rem` (root em) sizes text relative to the font size set on the `<html>` element, making it easier to maintain consistent scaling."
        },
        {
          question: "If a font listed in a font-family stack is not found, what happens?",
          options: [
            "The text disappears",
            "An error is thrown in the browser console",
            "The browser tries the next font in the list",
            "The browser downloads the missing font automatically"
          ],
          correctIndex: 2,
          explanation: "The browser moves on to the next font in the comma-separated list until it finds one available, or falls back to the generic family."
        },
        {
          question: "Which of the following is a valid generic font family keyword?",
          options: ["Arial", "Georgia", "monospace", "Helvetica"],
          correctIndex: 2,
          explanation: "`monospace` is a generic family keyword; Arial, Georgia, and Helvetica are specific font names that require installation."
        },
        {
          question: "What does the shorthand `font` property require at minimum?",
          options: [
            "font-size only",
            "font-family only",
            "font-size and font-family",
            "font-weight and font-style"
          ],
          correctIndex: 2,
          explanation: "The `font` shorthand requires at least a font-size and font-family to be valid; the other values are optional."
        },
        {
          question: "What is the default value of font-weight for most elements?",
          options: ["100", "400", "700", "normal and 700 are both defaults"],
          correctIndex: 1,
          explanation: "The default font-weight is `normal`, which corresponds to the numeric value 400."
        },
        {
          question: "Which CSS rule makes text italic?",
          options: [
            "font-weight: italic",
            "text-style: italic",
            "font-style: italic",
            "font: italic"
          ],
          correctIndex: 2,
          explanation: "`font-style: italic` is the correct property and value to render text in an italic style."
        },
        {
          question: "A developer writes `font-family: Helvetica Neue, sans-serif;`. What is wrong?",
          options: [
            "sans-serif is not a valid fallback",
            "Helvetica Neue should be wrapped in quotes because it has a space",
            "The comma should be a semicolon",
            "Nothing is wrong"
          ],
          correctIndex: 1,
          explanation: "Font names with spaces must be wrapped in quotes, so it should be `'Helvetica Neue', sans-serif;`."
        },
        {
          question: "What will `font-size: 2em` result in if the parent element's font size is 16px?",
          options: ["2px", "16px", "32px", "8px"],
          correctIndex: 2,
          explanation: "`em` units multiply the parent's font size: 2 × 16px = 32px."
        },
        {
          question: "Which font-weight value makes text appear thinnest?",
          options: ["100", "400", "700", "900"],
          correctIndex: 0,
          explanation: "Font weight 100 (also called Thin or Hairline) is the lightest available weight in the numeric scale."
        },
        {
          question: "What does `font-family: serif` mean?",
          options: [
            "Use the font named 'Serif'",
            "Use any font installed on the system that has serifs",
            "Use Times New Roman specifically",
            "Use a handwriting-style font"
          ],
          correctIndex: 1,
          explanation: "`serif` is a generic family keyword meaning the browser should pick any available serif font on the system."
        },
        {
          question: "Which declaration correctly sets font size using pixels?",
          options: ["font-size: 18;", "font-size: 18px;", "font-size: px18;", "font: 18;"],
          correctIndex: 1,
          explanation: "CSS sizes require a unit, so `font-size: 18px;` is the correct syntax with the `px` unit appended."
        },
        {
          question: "What is the purpose of listing a generic font family at the end of a font stack?",
          options: [
            "To override all other fonts in the stack",
            "To provide a guaranteed fallback if none of the specific fonts are available",
            "To improve loading speed",
            "To set the font size"
          ],
          correctIndex: 1,
          explanation: "Generic families like `sans-serif` are always available as a last-resort fallback, ensuring text is always styled appropriately."
        },
        {
          question: "The CSS rule `font: bold 20px Arial;` is missing which required component?",
          options: ["font-style", "font-variant", "Nothing — it is valid", "A generic family fallback"],
          correctIndex: 2,
          explanation: "The `font` shorthand requires font-size and font-family at minimum — this example has both (20px and Arial), so it is valid."
        },
        {
          question: "Which property would you use to make a heading text appear thicker than normal?",
          options: ["font-thickness", "text-bold", "font-weight", "text-weight"],
          correctIndex: 2,
          explanation: "`font-weight` controls the thickness (boldness) of the font strokes."
        },
        {
          question: "If `font-style` is not explicitly set, what is its default value?",
          options: ["italic", "oblique", "normal", "bold"],
          correctIndex: 2,
          explanation: "The default value of `font-style` is `normal`, meaning text is displayed upright without any slant."
        },
        {
          question: "What happens when you use a numeric font-weight like 500 but the font only has 400 and 700?",
          options: [
            "The text disappears",
            "The browser throws an error",
            "The browser uses the closest available weight",
            "The weight defaults to 400 always"
          ],
          correctIndex: 2,
          explanation: "When the exact numeric weight is unavailable, the browser selects the closest weight the font supports."
        }
      ]
    },
    {
      id: "css-styling-text-properties",
      title: "Text Properties",
      explanation: "Beyond choosing a font, CSS offers a rich set of text properties that control how your words are arranged and decorated on the page. These properties handle everything from aligning paragraphs to adding underlines or transforming letters — they are the finishing touches that give your text personality and structure.\n\nThe `text-align` property positions text within its container. The options are `left`, `right`, `center`, and `justify`. Left alignment is the default for most languages, while `center` is popular for headings and `justify` stretches lines so both edges align neatly, much like a printed book.\n\nThe `text-decoration` property adds lines to text. `underline` adds a line beneath, `overline` adds one above, `line-through` strikes through the middle (useful for completed tasks), and `none` removes any decoration — handy for removing the default underline from links. You can also combine these, for example `underline overline`.\n\nThe `text-transform` property changes the capitalization of text without requiring you to retype it. `uppercase` converts every letter to capitals, `lowercase` converts to small letters, `capitalize` makes the first letter of each word a capital, and `none` leaves the text as written. This is great for buttons or headings where you want consistent capitalization regardless of what the author typed.\n\nThe `letter-spacing` property adds or removes space between individual characters. A small positive value like `2px` creates an airy, spread-out look popular in all-caps headings. A negative value brings characters closer together. The `word-spacing` property does the same thing but between whole words.\n\nThe `line-height` property controls the vertical space between lines of text within a paragraph. A unitless value like `1.5` means 1.5 times the current font size, and this is the recommended approach since it scales proportionally. A generous line-height (around 1.5 to 1.7) makes body text significantly easier to read.\n\nThe `text-indent` property pushes the first line of a paragraph inward, just like pressing Tab in a word processor. Meanwhile `text-shadow` adds a shadow effect: you specify horizontal offset, vertical offset, blur radius, and color, for example `text-shadow: 2px 2px 4px rgba(0,0,0,0.3);`.",
      htmlExample: "<h2 class=\"section-title\">Our Mission</h2>\n<p class=\"intro\">We believe good design starts with great typography. Every choice you make shapes how readers experience your content.</p>\n<p class=\"task done\">Write the first draft</p>",
      cssExample: ".section-title {\n  text-align: center;\n  text-transform: uppercase;\n  letter-spacing: 4px;\n  text-shadow: 1px 1px 3px #aaa;\n}\n\n.intro {\n  text-align: justify;\n  line-height: 1.7;\n  text-indent: 24px;\n}\n\n.done {\n  text-decoration: line-through;\n  color: #888;\n}",
      exercises: [
        {
          title: "Style a Navigation Label",
          description: "Create a span with class 'nav-label', give it uppercase text transform, wide letter-spacing of 3px, and center alignment.",
          hint: "letter-spacing accepts pixel values; text-transform and text-align are separate properties."
        },
        {
          title: "Readable Paragraph",
          description: "Set the `.intro` paragraph to have a line-height of 1.8, remove the text-indent, and change text-align to left.",
          hint: "Unitless line-height values like 1.8 are recommended over pixel values for better scaling."
        }
      ],
      quiz: [
        {
          question: "Which CSS property aligns text to both left and right edges by stretching word spacing?",
          options: ["text-align: center", "text-align: justify", "text-align: stretch", "text-align: spread"],
          correctIndex: 1,
          explanation: "`text-align: justify` stretches each line so that both the left and right edges are flush, like text in a newspaper column."
        },
        {
          question: "What does `text-decoration: none` typically accomplish on links?",
          options: [
            "Makes links invisible",
            "Removes the default underline from anchor elements",
            "Removes the link color",
            "Disables click events on links"
          ],
          correctIndex: 1,
          explanation: "Anchor elements have an underline by default; `text-decoration: none` removes that underline, a common styling choice in navigation menus."
        },
        {
          question: "What will `text-transform: capitalize` do to the text 'hello world'?",
          options: [
            "HELLO WORLD",
            "hello world",
            "Hello World",
            "Hello world"
          ],
          correctIndex: 2,
          explanation: "`capitalize` makes the first letter of each word uppercase, so 'hello world' becomes 'Hello World'."
        },
        {
          question: "Which property controls the spacing between characters within a word?",
          options: ["word-spacing", "letter-spacing", "char-gap", "text-spacing"],
          correctIndex: 1,
          explanation: "`letter-spacing` adjusts the space between individual characters, while `word-spacing` controls space between whole words."
        },
        {
          question: "A unitless value for `line-height` like 1.5 means:",
          options: [
            "1.5 pixels between lines",
            "1.5 times the element's font-size",
            "150 pixels",
            "1.5 centimeters"
          ],
          correctIndex: 1,
          explanation: "A unitless `line-height` is a multiplier of the current font-size, so 1.5 means 1.5× the font size, and it scales automatically."
        },
        {
          question: "Which value of `text-decoration` draws a line through the middle of text?",
          options: ["underline", "overline", "line-through", "strikethrough"],
          correctIndex: 2,
          explanation: "`line-through` is the CSS value that draws a horizontal line through the middle of text, often used for deleted or completed items."
        },
        {
          question: "What does `text-indent: 32px` do?",
          options: [
            "Indents every line of the paragraph by 32px",
            "Indents only the first line of a paragraph by 32px",
            "Adds 32px padding around the text",
            "Moves the entire element 32px to the right"
          ],
          correctIndex: 1,
          explanation: "`text-indent` only applies to the first line of a block of text, pushing it inward like a traditional paragraph indent."
        },
        {
          question: "Which of these is a valid `text-shadow` declaration?",
          options: [
            "text-shadow: red;",
            "text-shadow: 2px 2px 4px #333;",
            "text-shadow: 4px solid black;",
            "text-shadow: blur(4px) red;"
          ],
          correctIndex: 1,
          explanation: "`text-shadow` takes horizontal offset, vertical offset, blur radius, and color in that order: `2px 2px 4px #333;`."
        },
        {
          question: "What is the default value of `text-align` for most block elements?",
          options: ["center", "justify", "right", "left"],
          correctIndex: 3,
          explanation: "Most block-level elements default to `text-align: left` in left-to-right languages."
        },
        {
          question: "Which `text-transform` value converts all characters to uppercase?",
          options: ["capitalize", "uppercase", "allcaps", "upper"],
          correctIndex: 1,
          explanation: "`text-transform: uppercase` converts every character in the element to its uppercase form."
        },
        {
          question: "How can you add both an underline and an overline to text?",
          options: [
            "text-decoration: underline; text-decoration: overline;",
            "text-decoration: underline overline;",
            "text-decor: underline + overline;",
            "decoration: both;"
          ],
          correctIndex: 1,
          explanation: "You can list multiple `text-decoration` values space-separated in a single declaration: `text-decoration: underline overline;`."
        },
        {
          question: "A developer sets `word-spacing: 10px`. What will change visually?",
          options: [
            "Characters within each word will be spaced 10px apart",
            "Each word will have 10px of space between it and the next word",
            "The line height will increase by 10px",
            "The font size will increase by 10px"
          ],
          correctIndex: 1,
          explanation: "`word-spacing` controls the gap between whole words, not between individual letters."
        },
        {
          question: "Which line-height value is generally recommended for body paragraph readability?",
          options: ["0.8", "1.0", "1.5 to 1.7", "3.0"],
          correctIndex: 2,
          explanation: "A line-height between 1.5 and 1.7 creates comfortable spacing between lines, improving readability for body text."
        },
        {
          question: "What does `text-transform: none` do?",
          options: [
            "Removes all text from the element",
            "Makes text invisible",
            "Leaves the text capitalization as it appears in the HTML",
            "Converts text to lowercase"
          ],
          correctIndex: 2,
          explanation: "`text-transform: none` is the default — it leaves the text's capitalization exactly as written in the HTML source."
        },
        {
          question: "Which property would you use to add decorative space between the letters of a logo text?",
          options: ["word-spacing", "text-indent", "letter-spacing", "padding-letter"],
          correctIndex: 2,
          explanation: "`letter-spacing` controls the space between individual characters, ideal for spreading out logo or heading text for visual effect."
        },
        {
          question: "What is the effect of a negative `letter-spacing` value?",
          options: [
            "Text is removed",
            "Characters overlap or are pushed closer together",
            "The font weight decreases",
            "The font size shrinks"
          ],
          correctIndex: 1,
          explanation: "Negative letter-spacing brings characters closer together, which can create a compact or tight typographic style."
        },
        {
          question: "Spot the bug: `.title { text-align: centre; }` What is wrong?",
          options: [
            "The property name should be text-alignment",
            "centre is not a valid value; the correct value is center",
            "The selector needs a # prefix",
            "Semicolons are not used in CSS"
          ],
          correctIndex: 1,
          explanation: "CSS uses American English spelling, so the valid value is `center`, not `centre`."
        },
        {
          question: "Which declaration will make a paragraph's text all lowercase?",
          options: [
            "text-case: lowercase",
            "font-transform: lowercase",
            "text-transform: lowercase",
            "letter-case: small"
          ],
          correctIndex: 2,
          explanation: "`text-transform: lowercase` converts all characters in the element to lowercase."
        },
        {
          question: "What does setting `line-height: 1` effectively do?",
          options: [
            "Sets line height to 1px",
            "Makes lines tightly packed with no extra space between them",
            "Doubles the line height",
            "Inherits line height from the parent"
          ],
          correctIndex: 1,
          explanation: "A `line-height` of 1 means lines are exactly as tall as the font size, with no additional leading, making text feel very tight."
        },
        {
          question: "Which property controls the vertical distance between lines of text in a paragraph?",
          options: ["vertical-spacing", "text-leading", "line-height", "row-gap"],
          correctIndex: 2,
          explanation: "`line-height` is the CSS property that sets the vertical space (leading) between lines of text within an element."
        }
      ]
    },
    {
      id: "css-styling-background-properties",
      title: "Background Properties",
      explanation: "Backgrounds are the canvas behind your content. CSS gives you precise control over what appears behind an element — whether that's a solid color, a photo, a pattern, or a gradient. Understanding background properties lets you create visually rich layouts without needing image editing software.\n\nThe most basic background property is `background-color`, which fills an element with a solid color. You can use color names, hex codes, RGB values, or HSL values. For example, `background-color: #f0f0f0;` gives a light gray background.\n\nThe `background-image` property lets you place an image behind content. You write `background-image: url('photo.jpg');` pointing to an image file. You can also use CSS gradients here, like `background-image: linear-gradient(to right, red, blue);` which creates a smooth transition from red to blue.\n\nOnce you have a background image, `background-repeat` controls whether it tiles. By default images repeat both horizontally and vertically. You can set it to `no-repeat` to show it once, `repeat-x` for horizontal tiling only, or `repeat-y` for vertical tiling only.\n\nThe `background-position` property sets where a non-repeating image is placed. Common values include `center`, `top left`, `bottom right`, or specific coordinates like `50% 30%`. Combining `background-position: center;` with `background-repeat: no-repeat;` is very common for hero images.\n\nThe `background-size` property is especially useful. `cover` scales the image to fill the entire element while maintaining its aspect ratio — some edges may be cropped. `contain` scales the image to fit entirely within the element, potentially leaving empty space. You can also specify exact dimensions like `background-size: 300px 200px;`.\n\nThe `background-attachment` property determines whether the background scrolls with the page or stays fixed. `scroll` (default) moves with the element, while `fixed` creates a parallax-like effect where the background stays put as the user scrolls.\n\nAll of these can be combined using the `background` shorthand, though it can get complex. Using individual properties is clearer when starting out.",
      htmlExample: "<div class=\"hero\">Hero Section</div>\n<div class=\"card\">Content Card</div>\n<div class=\"pattern\">Pattern Background</div>",
      cssExample: ".hero {\n  background-image: linear-gradient(135deg, #667eea, #764ba2);\n  background-size: cover;\n  color: white;\n  padding: 60px 20px;\n  text-align: center;\n  font-size: 24px;\n}\n\n.card {\n  background-color: #fff8e1;\n  padding: 20px;\n  margin: 10px 0;\n}\n\n.pattern {\n  background-color: #e8f4f8;\n  background-image: url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='2' fill='%23ccc'/%3E%3C/svg%3E\");\n  background-repeat: repeat;\n  padding: 30px;\n}",
      exercises: [
        {
          title: "Full-Screen Hero",
          description: "Create a div with class 'banner', give it a linear gradient background going from teal to navy, set background-size to cover, and add enough padding to make it feel spacious.",
          hint: "Try `linear-gradient(to bottom, teal, navy)` or any two colors you like."
        },
        {
          title: "Centered Background Image",
          description: "Apply a background-image to a div, set background-repeat to no-repeat, background-position to center, and background-size to contain.",
          hint: "Use a URL to any publicly available image, or a placeholder like https://via.placeholder.com/300."
        }
      ],
      quiz: [
        {
          question: "Which property fills an element with a solid color behind its content?",
          options: ["color", "fill", "background-color", "background"],
          correctIndex: 2,
          explanation: "`background-color` sets the solid color that fills the background area of an element."
        },
        {
          question: "What does `background-size: cover` do?",
          options: [
            "Shrinks the image to fit inside the element without cropping",
            "Scales the image to fill the element, possibly cropping edges",
            "Tiles the image to cover the element",
            "Sets the image width to 100%"
          ],
          correctIndex: 1,
          explanation: "`cover` scales the image to fully fill the element while maintaining aspect ratio — parts of the image may be cropped."
        },
        {
          question: "Which `background-repeat` value prevents an image from tiling?",
          options: ["none", "no-tile", "no-repeat", "once"],
          correctIndex: 2,
          explanation: "`background-repeat: no-repeat` displays the background image exactly once, without tiling."
        },
        {
          question: "What is the default value of `background-repeat`?",
          options: ["no-repeat", "repeat", "repeat-x", "cover"],
          correctIndex: 1,
          explanation: "By default, background images tile both horizontally and vertically with `background-repeat: repeat`."
        },
        {
          question: "Which CSS function can create a color gradient for a background?",
          options: ["gradient()", "color-mix()", "linear-gradient()", "background-fade()"],
          correctIndex: 2,
          explanation: "`linear-gradient()` is a CSS function used as a value for `background-image` to create smooth color transitions."
        },
        {
          question: "What does `background-size: contain` do?",
          options: [
            "Scales the image to fill the element, cropping if needed",
            "Scales the image to fit entirely within the element, possibly leaving empty space",
            "Tiles the image to contain it within the element",
            "Sets the image to its natural size"
          ],
          correctIndex: 1,
          explanation: "`contain` ensures the entire image is visible within the element, scaling it down if needed but not cropping."
        },
        {
          question: "How do you reference an external image in `background-image`?",
          options: [
            "background-image: 'photo.jpg'",
            "background-image: url('photo.jpg')",
            "background-image: src('photo.jpg')",
            "background-image: img('photo.jpg')"
          ],
          correctIndex: 1,
          explanation: "The `url()` function is required to reference image paths in `background-image`."
        },
        {
          question: "Which value of `background-attachment` keeps the background fixed while the page scrolls?",
          options: ["none", "sticky", "fixed", "static"],
          correctIndex: 2,
          explanation: "`background-attachment: fixed` keeps the background image stationary while the page content scrolls, creating a parallax effect."
        },
        {
          question: "What does `background-position: center` do?",
          options: [
            "Aligns the element in the center of the page",
            "Centers the background image within the element",
            "Centers the text within the background",
            "Makes the background fill the center of the screen"
          ],
          correctIndex: 1,
          explanation: "`background-position: center` places the background image in the center of the element's background area."
        },
        {
          question: "Which shorthand property can set background-color, background-image, and background-position together?",
          options: ["backdrop", "bg", "background", "fill"],
          correctIndex: 2,
          explanation: "The `background` shorthand property lets you set multiple background sub-properties in one declaration."
        },
        {
          question: "What color will `background-color: transparent` produce?",
          options: ["White", "Black", "No color — the parent background shows through", "Gray"],
          correctIndex: 2,
          explanation: "`transparent` is the default background color, meaning no color is applied and the parent element's background is visible."
        },
        {
          question: "Which value of `background-repeat` tiles the image only horizontally?",
          options: ["repeat-x", "repeat-y", "horizontal", "tile-x"],
          correctIndex: 0,
          explanation: "`repeat-x` repeats the background image along the x-axis (horizontally) only."
        },
        {
          question: "A developer wants a gradient that goes from top to bottom. Which value is correct?",
          options: [
            "linear-gradient(horizontal, red, blue)",
            "linear-gradient(to bottom, red, blue)",
            "linear-gradient(down, red, blue)",
            "linear-gradient(180, red, blue)"
          ],
          correctIndex: 1,
          explanation: "`to bottom` is the keyword direction for a top-to-bottom gradient in `linear-gradient()`."
        },
        {
          question: "Spot the bug: `background-colour: #ff0000;` What is wrong?",
          options: [
            "#ff0000 is not a valid color code",
            "colour is a spelling error; the correct property is background-color",
            "The semicolon is in the wrong place",
            "Background cannot be set with hex values"
          ],
          correctIndex: 1,
          explanation: "CSS uses American English, so the correct property name is `background-color`, not `background-colour`."
        },
        {
          question: "What does `background-position: top right` mean?",
          options: [
            "The image is in the top-left corner",
            "The image is positioned in the top-right corner of the element",
            "The image is centered but offset to the right",
            "The element is moved to the top-right of the viewport"
          ],
          correctIndex: 1,
          explanation: "`background-position: top right` places the background image's origin at the top-right corner of the element."
        },
        {
          question: "Which background-size value would show the entire image without cropping, possibly with empty areas?",
          options: ["cover", "contain", "full", "auto"],
          correctIndex: 1,
          explanation: "`contain` scales the image so it fits completely within the element, never cropping, which may leave uncovered areas."
        },
        {
          question: "What is the correct syntax for a diagonal linear gradient?",
          options: [
            "linear-gradient(diagonal, #fff, #000)",
            "linear-gradient(to bottom right, #fff, #000)",
            "gradient(45deg, white, black)",
            "linear-gradient(corner, white, black)"
          ],
          correctIndex: 1,
          explanation: "`to bottom right` is a valid direction keyword for a diagonal gradient, or you can use a degree value like `45deg`."
        },
        {
          question: "If an element has both `background-color` and `background-image` set, which appears on top?",
          options: [
            "background-color is on top",
            "background-image is on top",
            "They blend automatically",
            "Only the last one declared is used"
          ],
          correctIndex: 1,
          explanation: "`background-image` renders on top of `background-color`, so the color acts as a fallback visible if the image fails to load or is transparent."
        },
        {
          question: "Which of these correctly sets a background image to cover an element with no repeat?",
          options: [
            "background: url(img.jpg) no-repeat cover;",
            "background-image: url(img.jpg); background-repeat: no-repeat; background-size: cover;",
            "background: img.jpg no-repeat cover;",
            "bg-image: url(img.jpg) cover;"
          ],
          correctIndex: 1,
          explanation: "Setting each sub-property individually is a clear, correct approach: image, repeat, and size each get their own declaration."
        },
        {
          question: "What does the value `repeat-y` do for `background-repeat`?",
          options: [
            "Repeats the image both horizontally and vertically",
            "Repeats the image vertically only",
            "Repeats the image horizontally only",
            "Repeats the image once on the y-axis"
          ],
          correctIndex: 1,
          explanation: "`repeat-y` tiles the background image only along the vertical (y) axis, creating a vertical stripe effect."
        }
      ]
    },
    {
      id: "css-styling-borders-border-radius",
      title: "Borders and Border-Radius",
      explanation: "Borders are the outlines you can draw around any element. They help define boundaries, separate sections visually, and add decorative detail. CSS gives you complete control over a border's thickness, style, and color.\n\nThe longhand way uses three properties: `border-width` sets the thickness (e.g. `2px`), `border-style` sets the line pattern, and `border-color` sets the color. The most common shorthand combines all three: `border: 2px solid #333;`. This one line says 'draw a 2-pixel wide, solid, dark gray border around the element.'\n\nFor `border-style`, you have more options than you might expect: `solid` draws a plain line, `dashed` creates dashes, `dotted` creates dots, `double` draws two parallel lines, and `none` removes any border. The `groove` and `ridge` styles add a 3D carved or raised appearance.\n\nYou can also target individual sides. `border-top`, `border-right`, `border-bottom`, and `border-left` let you style each side independently. For example, `border-bottom: 3px solid tomato;` draws only a bottom border, a popular design technique for headings.\n\nThe `border-radius` property is where things get exciting. It rounds the corners of an element, turning sharp rectangles into smooth rounded shapes. A single value like `border-radius: 8px;` rounds all four corners equally. Higher values create rounder corners. Setting `border-radius: 50%` on an element with equal width and height creates a perfect circle — this is the standard trick for circular profile pictures.\n\nYou can also target individual corners: `border-top-left-radius`, `border-top-right-radius`, `border-bottom-right-radius`, and `border-bottom-left-radius`. Or use the four-value shorthand `border-radius: 10px 20px 30px 40px;` which sets top-left, top-right, bottom-right, bottom-left in clockwise order.\n\nCombining borders with border-radius unlocks creative card and button designs that are staples of modern web interfaces.",
      htmlExample: "<div class=\"card\">\n  <img class=\"avatar\" src=\"https://via.placeholder.com/80\" alt=\"Avatar\" />\n  <h3>Jane Smith</h3>\n  <p>Web Developer</p>\n</div>\n<button class=\"btn\">Click Me</button>",
      cssExample: ".card {\n  border: 2px solid #ddd;\n  border-radius: 12px;\n  padding: 20px;\n  display: inline-block;\n  text-align: center;\n}\n\n.avatar {\n  border-radius: 50%;\n  border: 3px solid #6c63ff;\n  display: block;\n  margin: 0 auto 10px;\n}\n\n.btn {\n  border: none;\n  background-color: #6c63ff;\n  color: white;\n  padding: 10px 24px;\n  border-radius: 24px;\n  cursor: pointer;\n  margin-top: 10px;\n}",
      exercises: [
        {
          title: "Pill-Shaped Badge",
          description: "Create a span with class 'badge', style it with a background color, padding, and a border-radius large enough to create a pill shape.",
          hint: "A border-radius equal to half the element's height (or a large value like 999px) creates a pill shape."
        },
        {
          title: "Underline Only Style",
          description: "Style an h2 element so it only has a bottom border (no border on other sides), making it look like a classic section divider.",
          hint: "Use `border-bottom` instead of the `border` shorthand to only apply a border to the bottom edge."
        }
      ],
      quiz: [
        {
          question: "What does `border: 2px dashed red` set?",
          options: [
            "A 2px red solid border",
            "A 2px red dashed border",
            "A 2px red dotted border",
            "A 2-color dashed border"
          ],
          correctIndex: 1,
          explanation: "The `border` shorthand accepts width, style, and color in order — `2px dashed red` creates a dashed red border 2 pixels thick."
        },
        {
          question: "Which border-radius value creates a perfect circle from a square element?",
          options: ["100px", "border-radius: round", "50%", "100%"],
          correctIndex: 2,
          explanation: "`border-radius: 50%` rounds each corner by 50% of the element's dimensions, turning a square into a circle."
        },
        {
          question: "What does `border-style: none` do?",
          options: [
            "Sets a transparent border",
            "Sets border color to white",
            "Removes the border entirely",
            "Sets a 0px border width"
          ],
          correctIndex: 2,
          explanation: "`border-style: none` removes the border from the element, preventing it from taking up any space."
        },
        {
          question: "Which property would you use to style only the bottom edge of an element?",
          options: ["border-side: bottom", "border-bottom", "border: bottom", "bottom-border"],
          correctIndex: 1,
          explanation: "`border-bottom` is the shorthand for styling only the bottom edge, accepting width, style, and color values."
        },
        {
          question: "What does `border-radius: 10px 20px` set?",
          options: [
            "Top-left and bottom-right: 10px; top-right and bottom-left: 20px",
            "Top: 10px; Bottom: 20px",
            "Left: 10px; Right: 20px",
            "All corners: 15px (average)"
          ],
          correctIndex: 0,
          explanation: "With two values, `border-radius` sets top-left & bottom-right to the first value, and top-right & bottom-left to the second."
        },
        {
          question: "Which border-style value creates a 3D carved-in appearance?",
          options: ["solid", "inset", "groove", "carved"],
          correctIndex: 2,
          explanation: "`border-style: groove` creates a 3D grooved (carved-in) border effect using the border color."
        },
        {
          question: "What is wrong with this rule: `border: solid #333`?",
          options: [
            "Nothing is wrong",
            "The color value #333 is invalid",
            "The border width is missing",
            "Solid should come after the color"
          ],
          correctIndex: 2,
          explanation: "While technically it may render with a default width, best practice requires specifying width explicitly — e.g. `border: 1px solid #333`."
        },
        {
          question: "How many corners does `border-radius: 10px 20px 30px 40px` affect?",
          options: ["1", "2", "4", "8"],
          correctIndex: 2,
          explanation: "With four values, `border-radius` sets all four corners clockwise: top-left, top-right, bottom-right, bottom-left."
        },
        {
          question: "A button has `border: none`. What does this mean?",
          options: [
            "The button has an invisible border",
            "The button has no border at all",
            "The button has a 0px white border",
            "The button inherits the border from its parent"
          ],
          correctIndex: 1,
          explanation: "`border: none` removes all border from the element — this is commonly used to strip default browser styles from buttons."
        },
        {
          question: "Which shorthand property sets all four border sides at once?",
          options: ["border-all", "borders", "border", "border-sides"],
          correctIndex: 2,
          explanation: "The `border` shorthand applies the same width, style, and color to all four sides simultaneously."
        },
        {
          question: "What does `border-style: dotted` look like?",
          options: [
            "A line made of small squares",
            "A line made of small circles or dots",
            "A line with large dashes",
            "A double line"
          ],
          correctIndex: 1,
          explanation: "`border-style: dotted` renders the border as a series of dots (small circles), distinct from the rectangular dashes of `dashed`."
        },
        {
          question: "If you set `border-radius: 50%` on a rectangle (wider than tall), what shape do you get?",
          options: [
            "A perfect circle",
            "A rounded rectangle",
            "An ellipse",
            "A square"
          ],
          correctIndex: 2,
          explanation: "On a non-square element, `border-radius: 50%` creates an ellipse because the horizontal and vertical radii differ."
        },
        {
          question: "Which property targets only the top-right corner's radius?",
          options: [
            "border-radius-top-right",
            "border-top-right-radius",
            "corner-radius: top-right",
            "border-radius: top-right 10px"
          ],
          correctIndex: 1,
          explanation: "`border-top-right-radius` is the individual corner property for the top-right corner."
        },
        {
          question: "What does the `double` border style look like?",
          options: [
            "A very thick single line",
            "Two parallel lines with a gap between them",
            "A dashed line that looks doubled",
            "A solid line with a shadow"
          ],
          correctIndex: 1,
          explanation: "`border-style: double` draws two parallel lines separated by a space, and the total width is set by `border-width`."
        },
        {
          question: "Spot the bug: `.box { border-radius: 50; }` What is wrong?",
          options: [
            "50 should be 50px or 50%",
            "border-radius is not a valid property",
            "The semicolon is in the wrong place",
            "Nothing is wrong"
          ],
          correctIndex: 0,
          explanation: "CSS values require units unless the value is 0; `50` alone is invalid — it should be `50px` or `50%`."
        },
        {
          question: "Which border-style would best create a visible separator line under a heading?",
          options: ["none", "hidden", "solid", "inset"],
          correctIndex: 2,
          explanation: "`solid` creates a clean, visible line that works well as a heading separator when applied with `border-bottom`."
        },
        {
          question: "What is the order of values in the `border` shorthand?",
          options: [
            "style, width, color",
            "color, style, width",
            "width, style, color",
            "width, color, style"
          ],
          correctIndex: 2,
          explanation: "The `border` shorthand convention is: width first, then style, then color — e.g. `1px solid black`."
        },
        {
          question: "What does a large `border-radius` like 999px on a button achieve?",
          options: [
            "A very large circle",
            "A pill or capsule shape",
            "An invisible border",
            "A square with sharp corners"
          ],
          correctIndex: 1,
          explanation: "A very large `border-radius` (larger than the element's half-height) creates a fully rounded 'pill' or 'capsule' button shape."
        },
        {
          question: "Which of these creates a card with rounded corners and a light shadow-like border?",
          options: [
            "border: 1px solid #e0e0e0; border-radius: 8px;",
            "outline: 1px solid #e0e0e0; corner: 8px;",
            "shadow-border: 8px;",
            "box-border: rounded 8px #e0e0e0;"
          ],
          correctIndex: 0,
          explanation: "Combining a subtle `border` with `border-radius` is the standard technique for card components."
        },
        {
          question: "What does `border-color: red blue` set?",
          options: [
            "Top and bottom: red; left and right: blue",
            "Top and bottom: blue; left and right: red",
            "Left: red; right: blue",
            "All borders: a red-to-blue gradient"
          ],
          correctIndex: 0,
          explanation: "With two values, `border-color` applies the first color to top and bottom, and the second to left and right sides."
        }
      ]
    },
    {
      id: "css-styling-box-shadows",
      title: "Box Shadows",
      explanation: "Shadows are one of CSS's most powerful tools for adding depth and realism to flat interfaces. A box shadow makes an element appear to float above the page, giving users a visual cue about hierarchy and interactivity — like a button that appears raised or a card that floats above the background.\n\nThe `box-shadow` property takes several values in a specific order: horizontal offset, vertical offset, blur radius, spread radius, and color. Here's a breakdown of each: the horizontal offset shifts the shadow left (negative) or right (positive); the vertical offset shifts it up (negative) or down (positive); blur radius determines how soft and diffused the shadow is — 0 creates a sharp edge, while larger values create a softer blur; spread radius expands or contracts the entire shadow; color sets the shadow's color, often a semi-transparent black like `rgba(0,0,0,0.2)`.\n\nA typical card shadow looks like this: `box-shadow: 0 4px 6px rgba(0,0,0,0.1);`. This positions the shadow slightly below the element with a gentle blur, suggesting the card is slightly elevated.\n\nYou can layer multiple box shadows by separating them with commas. For example, a material-design style might combine a close crisp shadow with a larger diffused one: `box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);`.\n\nThe `inset` keyword, placed before the other values, reverses the shadow so it appears inside the element rather than outside. This is great for creating a pressed-button effect or inner depth: `box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);`.\n\nBox shadows are also used creatively: a glow effect uses a color rather than black (`box-shadow: 0 0 15px rgba(108,99,255,0.6);`), and large spread with minimal blur can mimic a thick border. Shadows are powerful when subtle — beginners often make them too large or too dark, so start small and build up.",
      htmlExample: "<div class=\"card-flat\">Flat Card</div>\n<div class=\"card-raised\">Raised Card</div>\n<button class=\"btn-shadow\">Press Me</button>",
      cssExample: ".card-flat, .card-raised, .btn-shadow {\n  padding: 20px;\n  margin: 10px;\n  border-radius: 8px;\n  background: white;\n  display: inline-block;\n}\n\n.card-flat {\n  border: 1px solid #ddd;\n}\n\n.card-raised {\n  box-shadow: 0 4px 12px rgba(0,0,0,0.15);\n}\n\n.btn-shadow {\n  background-color: #6c63ff;\n  color: white;\n  border: none;\n  cursor: pointer;\n  box-shadow: 0 4px 0 #4a43d1;\n}",
      exercises: [
        {
          title: "Glow Effect",
          description: "Create a div with class 'glowing', give it a purple background, and apply a box-shadow that creates a glowing purple halo around it using a colored shadow with zero offset.",
          hint: "Use `box-shadow: 0 0 20px rgba(108,99,255,0.8);` as a starting point and adjust values."
        },
        {
          title: "Inset Shadow Input",
          description: "Style a text input to have an inset box shadow, giving it the appearance of being pressed into the page rather than floating above it.",
          hint: "Use the `inset` keyword first in your box-shadow value: `box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);`"
        }
      ],
      quiz: [
        {
          question: "What is the correct order of values in `box-shadow`?",
          options: [
            "color, blur, spread, horizontal, vertical",
            "horizontal, vertical, blur, spread, color",
            "blur, horizontal, vertical, color",
            "spread, blur, horizontal, vertical, color"
          ],
          correctIndex: 1,
          explanation: "The order is: horizontal offset, vertical offset, blur radius, spread radius, color."
        },
        {
          question: "What does a `box-shadow` blur radius of 0 produce?",
          options: [
            "No shadow",
            "A shadow with completely sharp edges",
            "A very soft shadow",
            "An error"
          ],
          correctIndex: 1,
          explanation: "A blur radius of 0 creates a solid, hard-edged shadow with no blurring or feathering."
        },
        {
          question: "What does the `inset` keyword do in `box-shadow`?",
          options: [
            "Makes the shadow appear outside the element",
            "Makes the shadow appear inside the element",
            "Doubles the shadow size",
            "Locks the shadow position to the top"
          ],
          correctIndex: 1,
          explanation: "The `inset` keyword makes the shadow appear on the inner surface of the element instead of outside it."
        },
        {
          question: "What does a negative horizontal offset in `box-shadow` do?",
          options: [
            "Moves the shadow to the right",
            "Moves the shadow to the left",
            "Makes the shadow disappear",
            "Inverts the shadow color"
          ],
          correctIndex: 1,
          explanation: "A negative horizontal offset shifts the shadow toward the left side of the element."
        },
        {
          question: "How do you apply multiple box shadows to one element?",
          options: [
            "Use multiple box-shadow properties",
            "Use the box-shadows property",
            "Separate shadow values with commas in one property",
            "Apply shadows via a class for each one"
          ],
          correctIndex: 2,
          explanation: "Multiple shadows are applied in a single `box-shadow` property, with each shadow separated by a comma."
        },
        {
          question: "What color format is commonly used for box shadows to allow transparency?",
          options: ["hex", "color name", "rgba()", "hsl()"],
          correctIndex: 2,
          explanation: "`rgba()` allows you to set an alpha (transparency) channel, making shadows semi-transparent for a more natural look."
        },
        {
          question: "What does the spread radius do in a box-shadow?",
          options: [
            "Controls how soft the shadow is",
            "Expands or contracts the size of the shadow",
            "Sets the shadow's distance from the element",
            "Controls the shadow's opacity"
          ],
          correctIndex: 1,
          explanation: "The spread radius expands (positive) or shrinks (negative) the total size of the shadow beyond the element's bounds."
        },
        {
          question: "Which box-shadow creates a subtle card elevation effect?",
          options: [
            "box-shadow: 0 0 0 black",
            "box-shadow: 0 4px 8px rgba(0,0,0,0.1)",
            "box-shadow: 50px 50px 0 red",
            "box-shadow: inset 0 0 20px black"
          ],
          correctIndex: 1,
          explanation: "A small vertical offset with moderate blur and low-opacity shadow creates the standard subtle card elevation effect."
        },
        {
          question: "What does `box-shadow: 0 0 15px gold` create?",
          options: [
            "A gold shadow below the element",
            "A gold shadow to the right",
            "A gold glow effect around the element",
            "An inset gold border"
          ],
          correctIndex: 2,
          explanation: "Zero offsets with a blur radius and a colored value creates an even glow around the entire element."
        },
        {
          question: "What does a large spread value like 20px in box-shadow produce?",
          options: [
            "A very blurry shadow",
            "A shadow that extends far beyond the element's borders",
            "An inset shadow",
            "A shadow that is 20 pixels tall"
          ],
          correctIndex: 1,
          explanation: "A large positive spread radius expands the shadow so it extends visibly beyond the element's edges in all directions."
        },
        {
          question: "Which declaration creates a pressed-down button effect using an inset shadow?",
          options: [
            "box-shadow: 0 4px 0 darkblue",
            "box-shadow: inset 0 2px 4px rgba(0,0,0,0.3)",
            "box-shadow: 0 -4px 0 darkblue",
            "box-shadow: pressed 2px 2px gray"
          ],
          correctIndex: 1,
          explanation: "An `inset` shadow pushed downward with blur creates the illusion of the button surface being indented when pressed."
        },
        {
          question: "What happens when you set `box-shadow: none`?",
          options: [
            "A transparent shadow is added",
            "Any previously set shadow is removed",
            "The element becomes invisible",
            "A default shadow is applied"
          ],
          correctIndex: 1,
          explanation: "`box-shadow: none` removes any box shadow applied to an element."
        },
        {
          question: "Which part of `box-shadow: 3px 5px 10px 2px rgba(0,0,0,0.2)` is the spread?",
          options: ["3px", "5px", "10px", "2px"],
          correctIndex: 3,
          explanation: "The fourth value in the sequence is the spread radius — here it is `2px`, which slightly expands the shadow."
        },
        {
          question: "A designer wants a shadow that appears directly below the element with no offset to the sides. Which values should be used?",
          options: [
            "box-shadow: 0 5px 10px rgba(0,0,0,0.2)",
            "box-shadow: 5px 5px 10px rgba(0,0,0,0.2)",
            "box-shadow: 5px 0 10px rgba(0,0,0,0.2)",
            "box-shadow: -5px 5px 10px rgba(0,0,0,0.2)"
          ],
          correctIndex: 0,
          explanation: "Setting horizontal offset to 0 and vertical offset to a positive value places the shadow directly below the element."
        },
        {
          question: "Which of these is NOT a valid part of a box-shadow value?",
          options: ["blur radius", "opacity", "spread radius", "horizontal offset"],
          correctIndex: 1,
          explanation: "There is no separate `opacity` value in `box-shadow` — transparency is handled by using `rgba()` or `hsla()` for the color."
        },
        {
          question: "What does `box-shadow: 0 2px 0 darkgreen` look like?",
          options: [
            "A soft green glow",
            "A hard green line directly below the element",
            "An inset green border",
            "A green shadow to the right"
          ],
          correctIndex: 1,
          explanation: "With no blur (0) and a small vertical offset, the shadow appears as a sharp line just below the element — useful for a '3D button' effect."
        },
        {
          question: "Spot the bug: `box-shadow: horizontal 4px blur 8px black;` What is wrong?",
          options: [
            "black is not a valid color here",
            "The values should be numbers with units, not keywords like 'horizontal' and 'blur'",
            "blur should come before horizontal",
            "The semicolon is missing"
          ],
          correctIndex: 1,
          explanation: "`box-shadow` takes numeric values with units, not labels like 'horizontal' or 'blur' — the correct form is `4px 4px 8px black`."
        },
        {
          question: "When layering two box shadows, which one appears on top visually?",
          options: [
            "The second one in the list",
            "The one with the larger blur",
            "The first one in the list",
            "They blend equally"
          ],
          correctIndex: 2,
          explanation: "When multiple shadows are listed, the first one is rendered on top (in front of) subsequent ones."
        },
        {
          question: "Which color would make a box-shadow nearly invisible?",
          options: [
            "rgba(0,0,0,0.05)",
            "rgba(0,0,0,1)",
            "#000000",
            "rgb(200,0,0)"
          ],
          correctIndex: 0,
          explanation: "`rgba(0,0,0,0.05)` is a nearly transparent black — it produces a very subtle shadow, barely visible unless on a very light background."
        },
        {
          question: "Why do designers prefer `rgba()` over named colors like 'black' for shadows?",
          options: [
            "Named colors don't work in box-shadow",
            "rgba() allows semi-transparent shadows that look more natural",
            "rgba() loads faster",
            "Named colors are deprecated in CSS"
          ],
          correctIndex: 1,
          explanation: "Semi-transparent shadows using `rgba()` look more realistic because they blend naturally with any background color."
        }
      ]
    },
    {
      id: "css-styling-list-styling",
      title: "Lists Styling",
      explanation: "Lists are fundamental HTML structures — every navigation menu, feature list, and step-by-step guide uses them. CSS gives you precise control over how list items appear, from the bullet or number style to the spacing and positioning of each item.\n\nThe primary property is `list-style-type`, which controls the marker before each list item. For unordered lists (`<ul>`), common values include `disc` (filled circle, the default), `circle` (hollow circle), `square` (filled square), and `none` (removes the marker entirely). For ordered lists (`<ol>`), you can use `decimal` (1, 2, 3), `lower-alpha` (a, b, c), `upper-alpha` (A, B, C), `lower-roman` (i, ii, iii), and `upper-roman` (I, II, III).\n\nThe `list-style-position` property controls where the marker sits relative to the list item content. The default value is `outside`, meaning the marker is in the left margin, outside the text flow. Setting it to `inside` moves the marker inside the content box, so text wraps around it.\n\nThe `list-style-image` property lets you replace the standard marker with a custom image: `list-style-image: url('checkmark.png');`. However, this gives you limited sizing control, so many developers instead use `list-style: none` and add their own custom marker using `::before` pseudo-elements combined with content and background properties.\n\nThe `list-style` shorthand combines type, position, and image into one line. For example: `list-style: square inside;`.\n\nFor navigation menus, the most common pattern is removing the list style and default padding entirely: `list-style: none; padding: 0; margin: 0;`. Then each `<li>` is styled individually. This transforms a plain bullet list into a clean navigation structure.\n\nSpacing between list items is typically controlled with `margin-bottom` on the `<li>` elements, giving each item comfortable breathing room. This is a better approach than adjusting line-height for lists.",
      htmlExample: "<h3>Features</h3>\n<ul class=\"feature-list\">\n  <li>Fast performance</li>\n  <li>Responsive design</li>\n  <li>Accessible markup</li>\n</ul>\n\n<h3>Steps</h3>\n<ol class=\"step-list\">\n  <li>Install the package</li>\n  <li>Configure settings</li>\n  <li>Deploy your app</li>\n</ol>",
      cssExample: ".feature-list {\n  list-style-type: square;\n  padding-left: 20px;\n}\n\n.feature-list li {\n  margin-bottom: 8px;\n  color: #333;\n}\n\n.step-list {\n  list-style-type: decimal;\n  padding-left: 24px;\n}\n\n.step-list li {\n  margin-bottom: 10px;\n  font-weight: 500;\n}",
      exercises: [
        {
          title: "Navigation Menu",
          description: "Create a ul with class 'nav-menu', remove the list-style and default padding, then style each li to display inline so the items appear in a horizontal row.",
          hint: "Use `list-style: none;`, `padding: 0;`, and `li { display: inline; margin-right: 15px; }` on the list items."
        },
        {
          title: "Custom Marker Style",
          description: "Style an unordered list to use circle markers positioned inside the text flow, and add spacing between each item.",
          hint: "Use `list-style-type: circle; list-style-position: inside;` on the ul."
        }
      ],
      quiz: [
        {
          question: "What is the default `list-style-type` for unordered lists?",
          options: ["square", "circle", "disc", "bullet"],
          correctIndex: 2,
          explanation: "The default marker for `<ul>` elements is `disc`, a filled circle."
        },
        {
          question: "Which `list-style-type` value produces lettered items like a, b, c?",
          options: ["lower-roman", "alpha", "lower-alpha", "letters"],
          correctIndex: 2,
          explanation: "`list-style-type: lower-alpha` produces lowercase letters a, b, c as list markers."
        },
        {
          question: "What does `list-style: none` do?",
          options: [
            "Hides the list items",
            "Removes the bullet or number markers",
            "Removes the list from the DOM",
            "Makes the list horizontal"
          ],
          correctIndex: 1,
          explanation: "`list-style: none` removes the bullet or numbering markers from list items, leaving clean text."
        },
        {
          question: "What does `list-style-position: inside` change?",
          options: [
            "It moves the list inside a div",
            "The marker is placed inside the content box, so text wraps around it",
            "The list is positioned absolutely",
            "The numbers are placed after the text"
          ],
          correctIndex: 1,
          explanation: "`inside` moves the list marker inside the content flow, so the first line's text starts after the marker and subsequent lines align to the left edge."
        },
        {
          question: "Which shorthand property sets list-style-type, list-style-position, and list-style-image?",
          options: ["list", "list-format", "list-style", "list-options"],
          correctIndex: 2,
          explanation: "The `list-style` shorthand accepts all three sub-properties: type, position, and image."
        },
        {
          question: "How do you add a custom image as a list bullet?",
          options: [
            "list-style-type: image('check.png')",
            "list-bullet: url('check.png')",
            "list-style-image: url('check.png')",
            "list-marker: img('check.png')"
          ],
          correctIndex: 2,
          explanation: "`list-style-image: url('check.png')` replaces the default marker with a custom image."
        },
        {
          question: "What is the best way to control spacing between list items?",
          options: [
            "Adjust list-item-gap",
            "Add margin-bottom to li elements",
            "Change line-height on the ul",
            "Use padding-top on each li"
          ],
          correctIndex: 1,
          explanation: "Adding `margin-bottom` to individual `<li>` elements is the cleanest way to control vertical spacing between list items."
        },
        {
          question: "Which CSS rule would you use to create a horizontal navigation list?",
          options: [
            "ul { direction: horizontal; }",
            "li { display: inline; }",
            "li { float: horizontal; }",
            "ul { list-direction: row; }"
          ],
          correctIndex: 1,
          explanation: "Setting `li { display: inline; }` (or `inline-block` or `flex`) makes list items line up horizontally."
        },
        {
          question: "What does `list-style-type: upper-roman` produce?",
          options: ["a, b, c", "i, ii, iii", "1, 2, 3", "I, II, III"],
          correctIndex: 3,
          explanation: "`upper-roman` produces uppercase Roman numerals: I, II, III, IV, etc."
        },
        {
          question: "If you want no indentation and no markers on a list, which two properties should you set?",
          options: [
            "list-style: none; text-indent: 0;",
            "list-style: none; padding-left: 0;",
            "margin: 0; border: none;",
            "display: block; list-style: remove;"
          ],
          correctIndex: 1,
          explanation: "Removing markers with `list-style: none` and indentation with `padding-left: 0` fully strips default list styling."
        },
        {
          question: "What is the default value of `list-style-position`?",
          options: ["inside", "outside", "left", "block"],
          correctIndex: 1,
          explanation: "By default, `list-style-position` is `outside`, placing the marker in the margin outside the text area."
        },
        {
          question: "Which list-style-type value produces markers like I, II, III?",
          options: ["decimal", "lower-roman", "upper-roman", "upper-alpha"],
          correctIndex: 2,
          explanation: "`upper-roman` produces uppercase Roman numerals (I, II, III) as the ordered list markers."
        },
        {
          question: "Spot the bug: `.menu { list-style-type: bullets; }` What is wrong?",
          options: [
            "`bullets` is not a valid value; use `disc` for filled circles",
            "The property should be `marker-type`",
            "Class selectors need a # prefix",
            "Nothing is wrong"
          ],
          correctIndex: 0,
          explanation: "`bullets` is not a valid CSS value for `list-style-type`; `disc` is the correct keyword for filled circle markers."
        },
        {
          question: "What does `list-style: circle inside` do?",
          options: [
            "Uses hollow circle markers positioned inside the content box",
            "Creates a circular list layout",
            "Uses disc markers outside the box",
            "Creates a bulleted list with circle shapes around items"
          ],
          correctIndex: 0,
          explanation: "`circle` sets the marker type to hollow circles, and `inside` positions the marker inside the content box."
        },
        {
          question: "Which element do you target to remove default browser padding from a list?",
          options: ["li", "ul or ol", "list-item", "marker"],
          correctIndex: 1,
          explanation: "Browser default styles add `padding-left` to `<ul>` and `<ol>` elements; targeting these and setting `padding-left: 0` removes the indentation."
        },
        {
          question: "What does `list-style-type: decimal` produce for ordered lists?",
          options: ["1, 2, 3", "a, b, c", "I, II, III", "*, *, *"],
          correctIndex: 0,
          explanation: "`decimal` is the default for `<ol>` elements, producing standard numbers: 1, 2, 3, 4..."
        },
        {
          question: "Why do developers often prefer using `::before` pseudo-elements over `list-style-image` for custom markers?",
          options: [
            "list-style-image is deprecated",
            "::before allows more control over size and positioning of custom markers",
            "list-style-image does not work in modern browsers",
            "::before is faster to load"
          ],
          correctIndex: 1,
          explanation: "The `list-style-image` property has limited size and alignment control, while `::before` with CSS allows full styling flexibility."
        },
        {
          question: "How would you make only the second `<li>` in a list have a different color?",
          options: [
            "li:second { color: red; }",
            "li:nth-child(2) { color: red; }",
            "li[2] { color: red; }",
            "li.second-item { color: red; }"
          ],
          correctIndex: 1,
          explanation: "`li:nth-child(2)` targets the second list item specifically using a pseudo-class selector."
        },
        {
          question: "Which list-style-type produces markers like A, B, C?",
          options: ["upper-alpha", "upper-roman", "alpha-upper", "capitals"],
          correctIndex: 0,
          explanation: "`upper-alpha` produces uppercase letters A, B, C as ordered list markers."
        },
        {
          question: "What is the result of applying `list-style: none; padding: 0; margin: 0;` to a `<ul>`?",
          options: [
            "The list becomes invisible",
            "A clean list with no markers, no indentation, and no surrounding space",
            "The list items are removed from the page",
            "The list becomes horizontal automatically"
          ],
          correctIndex: 1,
          explanation: "This combination removes all default browser styling from a list, giving you a clean starting point for custom navigation or layout."
        }
      ]
    },
    {
      id: "css-styling-links-states",
      title: "Links and Their States",
      explanation: "Hyperlinks are among the most interactive elements on any page. CSS lets you style them not just in their default state, but in each of their interactive states — giving users clear feedback about what they can click, what they've already visited, and what they're about to activate.\n\nLinks have four primary states, each styled using pseudo-classes: `a:link` styles unvisited links, `a:visited` styles links the user has previously clicked (browsers track visit history), `a:hover` styles the link while the mouse cursor is over it, and `a:active` styles the link during the brief moment it is being clicked.\n\nThe order you declare these pseudo-classes matters. The commonly remembered order is LoVe HAte: Link, Visited, Hover, Active. Writing them in this order ensures the styles cascade correctly — for example, hover should override visited styles when the user mouses over a visited link.\n\nBy default, links are blue and underlined for unvisited, purple for visited, and red during active state — though these vary slightly between browsers. You'll almost always want to override these defaults to match your design.\n\nA very common pattern in modern design is to remove the underline from navigation links with `text-decoration: none`, and then add a different kind of hover indicator — perhaps a color change, an underline with `text-decoration: underline`, or a background color change. This gives users clear hover feedback without the default underline clutter.\n\nThe `cursor` property pairs naturally with link styling. Setting `cursor: pointer` on any element makes the hand cursor appear on hover, signaling clickability. Links already have this by default, but interactive elements styled as buttons often need it explicitly.\n\nThe `:focus` state is equally important for accessibility — keyboard users navigate with Tab and links must visually indicate focus. Never set `outline: none` without providing an alternative focus indicator, as this harms keyboard navigation for users who rely on it.",
      htmlExample: "<nav class=\"main-nav\">\n  <a href=\"#\" class=\"nav-link\">Home</a>\n  <a href=\"#\" class=\"nav-link\">About</a>\n  <a href=\"#\" class=\"nav-link\">Contact</a>\n</nav>\n\n<p>Read more about <a href=\"#\" class=\"inline-link\">CSS selectors</a> in our guide.</p>",
      cssExample: ".main-nav {\n  background: #2c3e50;\n  padding: 10px 20px;\n}\n\n.nav-link {\n  color: #ecf0f1;\n  text-decoration: none;\n  margin-right: 20px;\n  padding: 5px 0;\n  border-bottom: 2px solid transparent;\n  transition: border-color 0.2s;\n}\n\n.nav-link:hover {\n  border-bottom-color: #3498db;\n}\n\n.nav-link:active {\n  color: #3498db;\n}\n\n.inline-link:link { color: #2980b9; }\n.inline-link:visited { color: #8e44ad; }\n.inline-link:hover { color: #e74c3c; text-decoration: underline; }\n.inline-link:active { color: #c0392b; }",
      exercises: [
        {
          title: "Color-Changing Nav Links",
          description: "Style a set of navigation links so they are white by default, turn yellow on hover, and turn light-gray when visited.",
          hint: "Use `a:link`, `a:hover`, and `a:visited` pseudo-classes in LoVe HAte order."
        },
        {
          title: "Button-Style Link",
          description: "Create a link that looks like a button — give it a background color, padding, border-radius, and remove the underline. Change the background color on hover.",
          hint: "Set `display: inline-block` on the link so padding applies properly, then style background and hover state."
        }
      ],
      quiz: [
        {
          question: "Which pseudo-class styles a link that has already been visited by the user?",
          options: ["a:seen", "a:clicked", "a:visited", "a:history"],
          correctIndex: 2,
          explanation: "`a:visited` applies styles to links whose URLs the browser has in its history."
        },
        {
          question: "What is the correct order for declaring link pseudo-classes (LoVe HAte)?",
          options: [
            "hover, link, active, visited",
            "link, visited, hover, active",
            "active, hover, visited, link",
            "visited, link, active, hover"
          ],
          correctIndex: 1,
          explanation: "The LoVe HAte mnemonic gives the correct cascade order: Link, Visited, Hover, Active."
        },
        {
          question: "Which pseudo-class styles a link at the exact moment it is being clicked?",
          options: ["a:hover", "a:focus", "a:active", "a:click"],
          correctIndex: 2,
          explanation: "`a:active` applies while the element is being pressed — typically for just a brief moment during a click."
        },
        {
          question: "What does `text-decoration: none` do on a link?",
          options: [
            "Makes the link invisible",
            "Removes the default underline from the link",
            "Prevents the link from being clicked",
            "Removes the link color"
          ],
          correctIndex: 1,
          explanation: "Links have an underline by default; `text-decoration: none` removes it, giving you a clean base for custom link styling."
        },
        {
          question: "Why is the LoVe HAte declaration order important?",
          options: [
            "Browsers require this specific order to work",
            "It ensures later states properly override earlier ones due to CSS cascade",
            "It improves page loading speed",
            "It groups related states for readability only"
          ],
          correctIndex: 1,
          explanation: "CSS applies rules in order, so declaring `:hover` after `:visited` ensures hover styles override visited styles when the user mouses over a visited link."
        },
        {
          question: "What does `cursor: pointer` do when applied to a non-link element?",
          options: [
            "It makes the element clickable",
            "It displays the hand cursor to suggest the element is interactive",
            "It adds a pointer arrow icon to the text",
            "It removes the default cursor"
          ],
          correctIndex: 1,
          explanation: "`cursor: pointer` shows the hand icon on hover, signaling to users that the element is clickable — it changes appearance only, not behavior."
        },
        {
          question: "Which pseudo-class style is triggered when a user tabs to a link with their keyboard?",
          options: ["a:hover", "a:active", "a:focus", "a:tab"],
          correctIndex: 2,
          explanation: "`a:focus` is triggered when a link receives keyboard focus, which is essential for keyboard navigation accessibility."
        },
        {
          question: "What is the default color of an unvisited link in most browsers?",
          options: ["Black", "Red", "Blue", "Green"],
          correctIndex: 2,
          explanation: "Browsers historically render unvisited links in blue, though the exact shade varies slightly between browsers."
        },
        {
          question: "Which of these correctly styles a link to turn green on hover?",
          options: [
            "a.hover { color: green; }",
            "a:hover { color: green; }",
            "a[hover] { color: green; }",
            "a::hover { color: green; }"
          ],
          correctIndex: 1,
          explanation: "`a:hover` uses a single colon pseudo-class, correctly targeting the link's hover state."
        },
        {
          question: "Why should you never set `outline: none` on `:focus` without a replacement?",
          options: [
            "Browsers will ignore the rule",
            "It breaks keyboard navigation for users who rely on visible focus indicators",
            "It makes all text invisible",
            "It conflicts with the hover state"
          ],
          correctIndex: 1,
          explanation: "Keyboard users rely on the visible focus outline to know which element is active; removing it without a replacement creates an accessibility barrier."
        },
        {
          question: "What style change could serve as a hover indicator for a navigation link without adding an underline?",
          options: [
            "Change the font-family",
            "Change the background-color or add a bottom border",
            "Increase the font size",
            "Add an outline"
          ],
          correctIndex: 1,
          explanation: "A background color change or an underline-style bottom border provides clear hover feedback without the default underline decoration."
        },
        {
          question: "How do you make a link look like a button using CSS?",
          options: [
            "Use the button tag instead",
            "Set display: inline-block; add padding, background-color, and border-radius",
            "Apply link-style: button",
            "Change font-size to match button size"
          ],
          correctIndex: 1,
          explanation: "Setting `display: inline-block` lets padding work properly, and adding background, padding, and border-radius creates a button appearance."
        },
        {
          question: "What does the `a:link` pseudo-class target?",
          options: [
            "All anchor elements",
            "Only unvisited links with an href attribute",
            "Links that are currently active",
            "Links inside a nav element"
          ],
          correctIndex: 1,
          explanation: "`a:link` specifically targets anchor elements that have an `href` attribute and have not been visited yet."
        },
        {
          question: "A link has both `a:visited` and `a:hover` styles. The user hovers over a visited link. Which style wins?",
          options: [
            "visited, because it was declared first",
            "hover, because it is more specific",
            "hover, if it is declared after visited in the stylesheet",
            "Both apply and blend together"
          ],
          correctIndex: 2,
          explanation: "When specificity is equal, the later declaration wins — declaring `:hover` after `:visited` ensures hover overrides visited styling."
        },
        {
          question: "Which declaration prevents navigation links from having an underline?",
          options: [
            "a { underline: false; }",
            "a { text-decoration: none; }",
            "a { line: remove; }",
            "a { font-decoration: none; }"
          ],
          correctIndex: 1,
          explanation: "`text-decoration: none` removes the underline from links, which is the standard technique for navigation menus."
        },
        {
          question: "What will `a:active { color: red; }` do?",
          options: [
            "All links will be permanently red",
            "Links turn red as they are being pressed",
            "Links are red after being visited",
            "Links turn red on hover"
          ],
          correctIndex: 1,
          explanation: "`a:active` applies only during the brief moment a link is being clicked, giving instant press feedback."
        },
        {
          question: "Which property helps show users that a styled div or span is clickable like a button?",
          options: ["display: pointer", "cursor: pointer", "hoverable: true", "mouse: hand"],
          correctIndex: 1,
          explanation: "`cursor: pointer` changes the mouse cursor to a hand icon, conventionally indicating a clickable element."
        },
        {
          question: "Spot the bug: `a::visited { color: purple; }` What is wrong?",
          options: [
            "`visited` is not a valid link state",
            "Double colons `::` should be single colon `:` for pseudo-classes like visited",
            "Purple is not a valid color value",
            "Nothing is wrong"
          ],
          correctIndex: 1,
          explanation: "`::` (double colon) is used for pseudo-elements; pseudo-classes like `:visited` use a single colon `:`."
        },
        {
          question: "Which link state is typically styled differently to help users remember which pages they have already visited?",
          options: ["a:hover", "a:active", "a:visited", "a:link"],
          correctIndex: 2,
          explanation: "`a:visited` is traditionally styled (often purple) to help users distinguish pages they've already seen from unvisited ones."
        },
        {
          question: "What is the purpose of the `transition` property on a link hover style?",
          options: [
            "It enables the link to transition to a new page",
            "It creates a smooth animated change between default and hover styles",
            "It delays the link action",
            "It moves the link element on hover"
          ],
          correctIndex: 1,
          explanation: "`transition` creates a smooth animation when CSS properties change, like smoothly fading a link's color on hover instead of snapping instantly."
        }
      ]
    },
    {
      id: "css-styling-tables",
      title: "Tables Styling",
      explanation: "HTML tables are used to display structured, tabular data — like schedules, pricing plans, or comparison charts. Without CSS, tables look plain and can be hard to read. With a little styling, you can transform a raw table into a professional, scannable data display.\n\nThe `border-collapse` property is usually the first thing to set on a table. By default, HTML tables have `border-collapse: separate`, which means each cell has its own border with a small gap between cells. Setting it to `collapse` merges adjacent borders into one, giving a cleaner grid appearance. Almost all styled tables use `border-collapse: collapse;`.\n\nAdding borders to the table, `<th>`, and `<td>` elements creates the grid lines. A common approach is: `th, td { border: 1px solid #ddd; padding: 10px; }`. The `padding` gives cell content breathing room.\n\nThe `<th>` element represents table headers. You typically style these with a different background color, heavier font weight, and perhaps centered text to distinguish them from data cells: `th { background-color: #4a90e2; color: white; font-weight: bold; text-align: center; }`.\n\nZebra striping is a popular technique to improve readability in tables with many rows. It alternates the background color of rows using the `:nth-child` pseudo-class: `tr:nth-child(even) { background-color: #f2f2f2; }`. This makes it easier to follow a row across the table.\n\nThe `text-align` and `vertical-align` properties work within table cells. `vertical-align: middle` ensures cell content is centered vertically. `text-align: right` is useful for numeric columns.\n\nFor responsive design, tables are often given `width: 100%` to fill their container, and `table-layout: fixed` can be used to give columns equal widths. The `overflow-x: auto` technique wraps a table in a container so it scrolls horizontally on small screens rather than overflowing.",
      htmlExample: "<table class=\"data-table\">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Role</th>\n      <th>Salary</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Alice</td>\n      <td>Engineer</td>\n      <td>$90,000</td>\n    </tr>\n    <tr>\n      <td>Bob</td>\n      <td>Designer</td>\n      <td>$85,000</td>\n    </tr>\n    <tr>\n      <td>Carol</td>\n      <td>Manager</td>\n      <td>$95,000</td>\n    </tr>\n  </tbody>\n</table>",
      cssExample: ".data-table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.data-table th,\n.data-table td {\n  border: 1px solid #ddd;\n  padding: 12px 16px;\n  text-align: left;\n}\n\n.data-table th {\n  background-color: #4a90e2;\n  color: white;\n  font-weight: bold;\n}\n\n.data-table tbody tr:nth-child(even) {\n  background-color: #f5f8ff;\n}\n\n.data-table tbody tr:hover {\n  background-color: #e8f0fe;\n}",
      exercises: [
        {
          title: "Zebra Striping",
          description: "Add zebra striping to an existing table by using :nth-child(odd) to give odd rows a light gray background.",
          hint: "Target `tr:nth-child(odd)` within the tbody and set a subtle background color like `#f9f9f9`."
        },
        {
          title: "Responsive Table Wrapper",
          description: "Wrap your table in a div with class 'table-wrapper', give the div `overflow-x: auto`, and set the table's width to a fixed 600px to demonstrate horizontal scrolling on small screens.",
          hint: "The wrapper div needs `overflow-x: auto` and the table needs a width wider than the viewport to show scrolling."
        }
      ],
      quiz: [
        {
          question: "What does `border-collapse: collapse` do to a table?",
          options: [
            "Removes all borders from the table",
            "Merges adjacent cell borders into a single border",
            "Makes the table borders thicker",
            "Collapses the table to zero height"
          ],
          correctIndex: 1,
          explanation: "`border-collapse: collapse` merges adjacent cell borders so they share a single line, creating a clean grid appearance."
        },
        {
          question: "What is the default value of `border-collapse` for HTML tables?",
          options: ["collapse", "separate", "none", "merge"],
          correctIndex: 1,
          explanation: "The default is `border-collapse: separate`, which displays gaps between cell borders."
        },
        {
          question: "Which selector targets every even row in a table body for zebra striping?",
          options: [
            "tr.even",
            "tbody tr:nth-child(2)",
            "tbody tr:nth-child(even)",
            "tr:alternate"
          ],
          correctIndex: 2,
          explanation: "`tbody tr:nth-child(even)` selects every even-numbered row within the table body, enabling zebra striping."
        },
        {
          question: "How do you add space inside table cells between the border and the content?",
          options: [
            "Use cell-spacing on the table",
            "Use margin on td elements",
            "Use padding on th and td elements",
            "Use border-padding"
          ],
          correctIndex: 2,
          explanation: "`padding` on `<th>` and `<td>` elements adds space between the cell border and its content."
        },
        {
          question: "Which CSS property vertically aligns content in a table cell to the middle?",
          options: ["text-align: center", "vertical-align: middle", "align: vertical-center", "cell-align: middle"],
          correctIndex: 1,
          explanation: "`vertical-align: middle` centers cell content vertically within the table cell."
        },
        {
          question: "What does `width: 100%` on a table element do?",
          options: [
            "Makes each column 100% wide",
            "Makes the table span the full width of its container",
            "Sets the table height to 100%",
            "Doubles the table width"
          ],
          correctIndex: 1,
          explanation: "Setting `width: 100%` on a table element makes it expand to fill its parent container's full width."
        },
        {
          question: "Which selector targets table header cells specifically?",
          options: ["table-header", "thead td", "th", "td.header"],
          correctIndex: 2,
          explanation: "`th` targets all `<th>` (table header) elements, which are typically used in `<thead>` rows."
        },
        {
          question: "How can you make a table scroll horizontally on small screens?",
          options: [
            "table { scroll: horizontal; }",
            "Wrap the table in a div with overflow-x: auto",
            "table { responsive: true; }",
            "table { max-width: screen; }"
          ],
          correctIndex: 1,
          explanation: "Wrapping a table in a container div with `overflow-x: auto` allows the table to scroll horizontally if it's wider than the viewport."
        },
        {
          question: "What does `table-layout: fixed` do?",
          options: [
            "Prevents the table from being resized",
            "Makes all columns equal width based on the table width",
            "Locks the table to the top of the page",
            "Prevents zebra striping"
          ],
          correctIndex: 1,
          explanation: "`table-layout: fixed` distributes column widths evenly based on the table's total width, ignoring content width."
        },
        {
          question: "Which declaration adds a hover highlight to table rows?",
          options: [
            "tr.hover { background: #eee; }",
            "tr:hover { background-color: #eee; }",
            "tr[hover] { background: #eee; }",
            "table:hover tr { background: #eee; }"
          ],
          correctIndex: 1,
          explanation: "`tr:hover { background-color: #eee; }` applies a background color to any row the mouse cursor is over."
        },
        {
          question: "What styling difference typically distinguishes `<th>` from `<td>` by default?",
          options: [
            "th has a different border color",
            "th text is bold and centered by default",
            "th uses a different font",
            "th has a larger font size"
          ],
          correctIndex: 1,
          explanation: "Browsers render `<th>` elements with bold, centered text by default, distinguishing headers from regular data cells."
        },
        {
          question: "What property removes the gap between table cells when using `border-collapse: separate`?",
          options: ["border-spacing: 0", "cell-gap: 0", "border-collapse: none", "table-spacing: 0"],
          correctIndex: 0,
          explanation: "`border-spacing: 0` removes the space between cells when `border-collapse: separate` is in use."
        },
        {
          question: "Spot the bug: `table { border-collapse: collapsed; }` What is wrong?",
          options: [
            "The value should be `collapse`, not `collapsed`",
            "border-collapse is not a valid property",
            "The selector needs to be more specific",
            "Nothing is wrong"
          ],
          correctIndex: 0,
          explanation: "The valid value is `collapse`, not `collapsed` — a common misspelling."
        },
        {
          question: "Which selector would target only the first row in a table header?",
          options: [
            "thead tr",
            "table tr:first",
            "th:first",
            "thead:first-child tr"
          ],
          correctIndex: 0,
          explanation: "`thead tr` targets all rows inside the `<thead>` section, typically just the one header row."
        },
        {
          question: "What does `text-align: right` on `<td>` elements do for a price column?",
          options: [
            "Moves the column to the right side of the table",
            "Aligns numeric text to the right edge of the cell, making numbers easier to compare",
            "Adds right padding to the cells",
            "Bolds the cell content"
          ],
          correctIndex: 1,
          explanation: "Right-aligning numeric data allows the units place to align vertically, making numbers much easier to compare visually."
        },
        {
          question: "What is the purpose of adding a hover style to table rows?",
          options: [
            "To prevent users from selecting rows",
            "To help users visually track which row they are reading",
            "To indicate clickable rows only",
            "To change the table layout on hover"
          ],
          correctIndex: 1,
          explanation: "A hover highlight helps users keep track of which row their eye is on in tables with many rows and columns."
        },
        {
          question: "Which CSS property would you use to make a table's column widths fixed and equal?",
          options: ["table-layout: fixed", "column-width: equal", "width: fixed", "border-collapse: fixed"],
          correctIndex: 0,
          explanation: "`table-layout: fixed` forces equal column widths based on the table's total width and any specified column widths."
        },
        {
          question: "What does `caption-side: bottom` do?",
          options: [
            "Moves the table to the bottom of the page",
            "Displays the table caption below the table",
            "Adds padding to the bottom of the table",
            "Moves header cells to the bottom row"
          ],
          correctIndex: 1,
          explanation: "`caption-side: bottom` positions the `<caption>` element (a table's title) below the table instead of the default top position."
        },
        {
          question: "Which CSS creates alternating row colors using both odd and even rows?",
          options: [
            "tr:odd { background: #eee; } tr:even { background: white; }",
            "tr:nth-child(odd) { background: #eee; } tr:nth-child(even) { background: white; }",
            "tr.odd { background: #eee; } tr.even { background: white; }",
            "tr[row=odd] { background: #eee; }"
          ],
          correctIndex: 1,
          explanation: "`tr:nth-child(odd)` and `tr:nth-child(even)` pseudo-classes target alternating rows for zebra striping."
        },
        {
          question: "Why is `padding` preferred over `margin` for spacing inside table cells?",
          options: [
            "Margin does not work on inline elements",
            "Margin on table cells is ignored in most browsers; padding creates inner space reliably",
            "Padding is faster to render",
            "Margin increases the row height too much"
          ],
          correctIndex: 1,
          explanation: "Browser behavior for margins on table cells is inconsistent or ignored; `padding` reliably adds space inside the cell borders."
        }
      ]
    },
    {
      id: "css-styling-opacity-visibility",
      title: "Opacity and Visibility",
      explanation: "Sometimes you need to hide elements or make them partially transparent. CSS offers several approaches, each with different behaviors that are important to understand — choosing the wrong one can create confusing user experiences.\n\nThe `opacity` property controls how transparent an element is. Its value ranges from `0` (completely invisible) to `1` (fully opaque), with decimals like `0.5` making an element 50% see-through. A critical detail: `opacity` affects the entire element and all its children. If you set `opacity: 0.5` on a div, every piece of content inside — text, images, child elements — will also be 50% transparent. The element remains in the document flow, taking up space, and can still receive mouse events.\n\nThis is different from using `rgba()` or `hsla()` for color, where only that specific color's alpha channel is affected. For example, `background-color: rgba(0,0,0,0.5)` makes only the background semi-transparent while the text inside remains fully opaque.\n\nThe `visibility` property has two main values: `visible` (the default) and `hidden`. A `visibility: hidden` element becomes invisible but continues to occupy its space in the layout — it just can't be seen or interacted with. This differs from `opacity: 0`, which also hides visually but still receives mouse events, while `visibility: hidden` does not.\n\nThe `display: none` property is completely different from both. It removes the element from the layout entirely, as if it were not there. No space is reserved for it. This is used when you want to completely show or hide elements dynamically.\n\nThe difference matters in practice: use `display: none` when you want the element gone from the layout, `visibility: hidden` when you want to preserve layout space, and `opacity: 0` when you want a fade effect but need to keep interactability (though `pointer-events: none` can disable that).\n\nThe `opacity` property is commonly used for hover effects — fading elements slightly when hovered signals interactivity: `opacity: 0.8` on hover is subtle and effective.",
      htmlExample: "<div class=\"box visible-box\">Visible</div>\n<div class=\"box transparent-box\">50% Opacity</div>\n<div class=\"box hidden-box\">Hidden (space kept)</div>\n<div class=\"box after-hidden\">After hidden element</div>",
      cssExample: ".box {\n  background-color: #6c63ff;\n  color: white;\n  padding: 20px;\n  margin: 10px 0;\n  border-radius: 6px;\n}\n\n.visible-box {\n  opacity: 1;\n}\n\n.transparent-box {\n  opacity: 0.4;\n}\n\n.hidden-box {\n  visibility: hidden;\n}\n\n.after-hidden {\n  background-color: #e74c3c;\n}",
      exercises: [
        {
          title: "Fade on Hover",
          description: "Style an image or div so it is fully opaque by default but fades to 60% opacity when hovered, using a transition for a smooth effect.",
          hint: "Use `opacity: 1` normally and `opacity: 0.6` on `:hover`, with `transition: opacity 0.3s;` for smoothness."
        },
        {
          title: "Compare Hidden vs None",
          description: "Create three boxes in a row. Make the middle one use `visibility: hidden`, then duplicate the setup and use `display: none` on the middle one instead. Observe how the neighboring boxes shift position.",
          hint: "With `visibility: hidden` the gap remains; with `display: none` the siblings move to fill the space."
        }
      ],
      quiz: [
        {
          question: "What does `opacity: 0` do to an element?",
          options: [
            "Removes the element from the layout",
            "Makes the element completely invisible but it still takes up space",
            "Makes the element invisible and removes its space",
            "Makes only the background invisible"
          ],
          correctIndex: 1,
          explanation: "`opacity: 0` makes the element completely transparent while it still occupies its space in the document layout."
        },
        {
          question: "What is the range of valid values for the `opacity` property?",
          options: ["0 to 100", "0% to 100%", "0 to 1", "-1 to 1"],
          correctIndex: 2,
          explanation: "`opacity` accepts values from 0 (fully transparent) to 1 (fully opaque), with decimals for intermediate transparency."
        },
        {
          question: "How does `visibility: hidden` differ from `display: none`?",
          options: [
            "They are identical",
            "visibility: hidden preserves the element's space; display: none removes it from layout",
            "display: none preserves space; visibility: hidden removes it",
            "visibility: hidden works on images only"
          ],
          correctIndex: 1,
          explanation: "`visibility: hidden` makes the element invisible but keeps its space; `display: none` removes the element from the flow entirely."
        },
        {
          question: "If a parent element has `opacity: 0.5`, what happens to its children?",
          options: [
            "Children maintain their own opacity",
            "Children also become 50% transparent",
            "Children become fully transparent",
            "Children become fully opaque"
          ],
          correctIndex: 1,
          explanation: "`opacity` is applied to the entire element including all children — it cannot be overridden on child elements."
        },
        {
          question: "What is the difference between `opacity: 0.5` on a div and `background-color: rgba(0,0,0,0.5)` on the same div?",
          options: [
            "They produce identical results",
            "opacity affects the entire element and children; rgba affects only the background color",
            "rgba applies to all children too",
            "opacity only affects images"
          ],
          correctIndex: 1,
          explanation: "`opacity` makes the whole element semi-transparent including children; `rgba()` only affects the specific background color, leaving text fully opaque."
        },
        {
          question: "Does an element with `opacity: 0` still respond to mouse clicks?",
          options: [
            "No, it is completely non-interactive",
            "Yes, it can still receive pointer events",
            "Only if cursor: pointer is set",
            "Only on touch devices"
          ],
          correctIndex: 1,
          explanation: "`opacity: 0` only affects visibility, not interactivity — an invisible element can still be hovered and clicked."
        },
        {
          question: "Which property removes an element from the page layout entirely?",
          options: ["opacity: 0", "visibility: hidden", "display: none", "visibility: collapse"],
          correctIndex: 2,
          explanation: "`display: none` removes the element from the document flow, freeing up the space it previously occupied."
        },
        {
          question: "What value of `opacity` makes an element 25% opaque (75% transparent)?",
          options: ["25", "0.75", "0.25", "75"],
          correctIndex: 2,
          explanation: "`opacity: 0.25` means the element is 25% opaque and 75% transparent."
        },
        {
          question: "Which declaration makes only the background of a box semi-transparent, keeping the text fully visible?",
          options: [
            "opacity: 0.5",
            "background-color: rgba(0, 0, 0, 0.5)",
            "visibility: 0.5",
            "background-opacity: 0.5"
          ],
          correctIndex: 1,
          explanation: "Using `rgba()` for `background-color` makes only the background semi-transparent while text in the element stays fully opaque."
        },
        {
          question: "How do you make an element fade smoothly when toggled using opacity?",
          options: [
            "Use animate: opacity",
            "Add transition: opacity 0.3s to the element",
            "Use opacity-transition property",
            "Set display: fade"
          ],
          correctIndex: 1,
          explanation: "`transition: opacity 0.3s` makes changes to the opacity property animate smoothly over 0.3 seconds."
        },
        {
          question: "What happens to space in the layout when `visibility: hidden` is applied?",
          options: [
            "The space is freed and neighboring elements shift",
            "The space is preserved and neighboring elements do not shift",
            "The element collapses to 0 height",
            "The parent's height reduces"
          ],
          correctIndex: 1,
          explanation: "`visibility: hidden` makes the element invisible but its layout space remains, so surrounding elements are unaffected."
        },
        {
          question: "What property would you add to prevent an `opacity: 0` element from being clicked?",
          options: ["click: none", "pointer-events: none", "cursor: none", "interactive: false"],
          correctIndex: 1,
          explanation: "`pointer-events: none` prevents the element from receiving any mouse events, making an invisible element truly non-interactive."
        },
        {
          question: "Which of these creates a hover effect where an image dims slightly?",
          options: [
            "img:hover { brightness: 0.7; }",
            "img:hover { opacity: 0.7; }",
            "img:hover { fade: 30%; }",
            "img:hover { visible: 70%; }"
          ],
          correctIndex: 1,
          explanation: "`opacity: 0.7` on hover makes the image 30% more transparent, creating a subtle dimming effect."
        },
        {
          question: "What does `visibility: visible` do?",
          options: [
            "It is the same as display: block",
            "It restores an element made hidden with visibility: hidden",
            "It makes the element glow",
            "It makes the element's children visible"
          ],
          correctIndex: 1,
          explanation: "`visibility: visible` is the default value and can be used to override an inherited `visibility: hidden` on child elements."
        },
        {
          question: "Spot the bug: `.box { opacity: 50%; }` What is wrong?",
          options: [
            "Nothing is wrong",
            "opacity does not accept percentage values; use a decimal like 0.5",
            "The selector needs an id prefix",
            "opacity should be written as transparency"
          ],
          correctIndex: 1,
          explanation: "`opacity` only accepts decimal values from 0 to 1, not percentages. Use `opacity: 0.5` instead of `50%`."
        },
        {
          question: "If a child element's `opacity` is set to 1, does it override a parent's `opacity: 0.3`?",
          options: [
            "Yes, the child becomes fully opaque",
            "No, opacity on the parent creates a stacking context; children cannot exceed it",
            "Only if the child has a higher z-index",
            "Yes, but only for text content"
          ],
          correctIndex: 1,
          explanation: "Parent opacity creates a compositing layer — children cannot exceed the parent's opacity value, so `opacity: 1` on a child cannot override `opacity: 0.3` on the parent."
        },
        {
          question: "Which combination creates an element that is invisible and not in the layout?",
          options: [
            "opacity: 0; visibility: hidden;",
            "display: none;",
            "visibility: hidden; display: block;",
            "opacity: 0; display: block;"
          ],
          correctIndex: 1,
          explanation: "`display: none` is the only single property that removes an element from the layout entirely while making it invisible."
        },
        {
          question: "What does `opacity: 1` mean?",
          options: [
            "Fully transparent",
            "50% opaque",
            "Fully opaque (the default)",
            "1 pixel of transparency"
          ],
          correctIndex: 2,
          explanation: "`opacity: 1` means fully opaque — the element is 100% visible, which is the default behavior."
        },
        {
          question: "Which approach is best for creating a loading skeleton screen with faded placeholder boxes?",
          options: [
            "display: none on each placeholder",
            "visibility: hidden on each placeholder",
            "opacity: 0.3 on each placeholder",
            "color: transparent on each placeholder"
          ],
          correctIndex: 2,
          explanation: "`opacity: 0.3` shows the placeholder shape in a faded state, indicating content is loading — the element remains visible but muted."
        },
        {
          question: "What is a practical use case for `visibility: hidden` over `display: none`?",
          options: [
            "When you want to completely remove an element",
            "When you want to hide an element but preserve the layout space so other elements don't shift",
            "When the element needs to respond to click events while hidden",
            "When animating an element's position"
          ],
          correctIndex: 1,
          explanation: "`visibility: hidden` is ideal when you want to toggle content visibility without causing layout shifts in surrounding elements."
        }
      ]
    },
    {
      id: "css-styling-css-variables",
      title: "CSS Variables (Custom Properties)",
      explanation: "CSS custom properties — also called CSS variables — are one of the most powerful features added to modern CSS. They let you define values once and reuse them throughout your entire stylesheet, making your code easier to maintain, update, and theme.\n\nA CSS variable is declared with a name that starts with two dashes: `--primary-color: #6c63ff;`. This declaration is almost always placed inside the `:root` selector, which represents the top-level element of the document (equivalent to `html`). Placing variables in `:root` makes them globally available to every element.\n\nTo use a variable's value, you call the `var()` function with the variable name: `color: var(--primary-color);`. If you need a fallback in case the variable is not defined, you add a second argument: `color: var(--primary-color, blue);`.\n\nThe real power of CSS variables is in updates. Imagine you have a primary color used in 50 places across your stylesheet. Without variables, changing the brand color means finding and replacing every occurrence. With a variable, you change `--primary-color` in one place and all 50 uses update automatically.\n\nCSS variables also support theming. A dark mode can be implemented by changing variable values inside a different selector, like `[data-theme='dark']` or a class on the `<body>`: `body.dark-mode { --bg-color: #1a1a1a; --text-color: #fff; }`. All elements using these variables instantly switch to dark mode styling.\n\nVariables can store any CSS value — colors, font sizes, spacing values, border radii, shadow declarations, or even parts of transform values. They cascade like regular CSS: a variable defined on a child element overrides the parent's variable of the same name within that child's scope.\n\nOne important distinction: CSS variables are different from preprocessor variables (like Sass `$variables`). CSS variables are live in the browser and can be changed at runtime via JavaScript, making them far more dynamic.",
      htmlExample: "<div class=\"card primary-card\">\n  <h3>Primary Card</h3>\n  <p>Styled using CSS variables for easy theming.</p>\n  <button class=\"btn\">Action</button>\n</div>",
      cssExample: ":root {\n  --primary-color: #6c63ff;\n  --secondary-color: #ff6584;\n  --text-color: #333;\n  --border-radius: 8px;\n  --spacing-md: 16px;\n  --font-size-base: 16px;\n}\n\n.primary-card {\n  background-color: white;\n  border: 2px solid var(--primary-color);\n  border-radius: var(--border-radius);\n  padding: var(--spacing-md);\n  color: var(--text-color);\n  font-size: var(--font-size-base);\n  max-width: 300px;\n}\n\n.primary-card h3 {\n  color: var(--primary-color);\n}\n\n.btn {\n  background-color: var(--primary-color);\n  color: white;\n  border: none;\n  padding: 8px var(--spacing-md);\n  border-radius: var(--border-radius);\n  cursor: pointer;\n}\n\n.btn:hover {\n  background-color: var(--secondary-color);\n}",
      exercises: [
        {
          title: "Define a Spacing Scale",
          description: "In :root, create three spacing variables: --space-sm (8px), --space-md (16px), --space-lg (32px). Apply them to different elements' padding and margin values.",
          hint: "Declare in :root and use var(--space-sm) etc. wherever you would normally type a pixel value."
        },
        {
          title: "Dark Mode Toggle",
          description: "Create two sets of color variables: one inside :root for light mode, and the same variable names inside a .dark-mode class on the body. Apply these variables to a div's background and text color.",
          hint: "When the body has class 'dark-mode', the variables defined there will override the :root ones for all child elements."
        }
      ],
      quiz: [
        {
          question: "How do you declare a CSS custom property named 'primary-color' in the root scope?",
          options: [
            "$primary-color: #333;",
            "--primary-color: #333; inside :root",
            "@primary-color: #333;",
            "var(primary-color): #333;"
          ],
          correctIndex: 1,
          explanation: "CSS custom properties are declared with two leading dashes: `--primary-color: #333;` inside `:root` for global scope."
        },
        {
          question: "How do you use a CSS variable called '--brand-color' in a property?",
          options: [
            "color: --brand-color;",
            "color: $brand-color;",
            "color: var(--brand-color);",
            "color: css(--brand-color);"
          ],
          correctIndex: 2,
          explanation: "The `var()` function is used to reference CSS custom properties: `color: var(--brand-color);`."
        },
        {
          question: "What does the second argument in `var(--color, blue)` do?",
          options: [
            "Sets a maximum color value",
            "Acts as a fallback if --color is not defined",
            "Multiplies the color value",
            "Applies blue as a secondary color"
          ],
          correctIndex: 1,
          explanation: "The second argument to `var()` is a fallback value used if the specified custom property is not defined."
        },
        {
          question: "Why are CSS variables typically declared in `:root`?",
          options: [
            "It is the only valid location for variables",
            ":root represents the top-level element, making variables globally accessible",
            "It loads variables before other styles",
            "It prevents variables from being overridden"
          ],
          correctIndex: 1,
          explanation: "`:root` targets the document's top-level element, so variables declared there are available to every element in the page."
        },
        {
          question: "Can CSS variables be changed with JavaScript at runtime?",
          options: [
            "No, CSS variables are compiled at build time",
            "Yes, using element.style.setProperty('--var-name', value)",
            "Only in Node.js",
            "Only with a CSS preprocessor"
          ],
          correctIndex: 1,
          explanation: "CSS custom properties are live in the browser and can be changed at runtime with JavaScript using `element.style.setProperty()`."
        },
        {
          question: "What is the naming convention for CSS custom properties?",
          options: [
            "They start with a single dash: -my-var",
            "They start with a dollar sign: $my-var",
            "They start with two dashes: --my-var",
            "They start with the @ symbol: @my-var"
          ],
          correctIndex: 2,
          explanation: "CSS custom properties must start with two dashes `--` followed by the variable name."
        },
        {
          question: "If `--spacing` is defined as 16px in `:root` and also as 24px on a `.card` element, what value do children of `.card` use?",
          options: [
            "16px — the root value always wins",
            "24px — the local variable overrides the root one for children of .card",
            "20px — the average of both",
            "An error occurs"
          ],
          correctIndex: 1,
          explanation: "CSS variables cascade — a variable defined on a closer ancestor overrides the same variable from a more distant ancestor like `:root`."
        },
        {
          question: "What types of values can CSS variables store?",
          options: [
            "Only color values",
            "Only numeric values",
            "Any valid CSS value including colors, sizes, strings, and more",
            "Only values used in transitions"
          ],
          correctIndex: 2,
          explanation: "CSS custom properties can hold any valid CSS value, including colors, lengths, font names, shadow declarations, and more."
        },
        {
          question: "How can CSS variables help implement a dark mode?",
          options: [
            "By switching stylesheets entirely",
            "By redefining variable values inside a dark-mode class or selector, changing all dependent styles at once",
            "By using display: none on light-mode elements",
            "By setting color: invert on the body"
          ],
          correctIndex: 1,
          explanation: "Redefining CSS variables inside a dark-mode class or `[data-theme='dark']` attribute cascades the new values to all elements using those variables."
        },
        {
          question: "Spot the bug: `color: var(primary-color);` What is wrong?",
          options: [
            "The var() function is not supported",
            "The variable name is missing the two leading dashes: should be var(--primary-color)",
            "color is not a valid property for var()",
            "Parentheses should be square brackets: var[--primary-color]"
          ],
          correctIndex: 1,
          explanation: "CSS custom property names must start with `--`; the correct syntax is `var(--primary-color)`."
        },
        {
          question: "What selector gives CSS variables the widest possible scope?",
          options: ["body", "*", ":root", "html body"],
          correctIndex: 2,
          explanation: "`:root` is the highest-specificity way to define global CSS variables accessible from all elements."
        },
        {
          question: "Which of these is a valid CSS custom property declaration?",
          options: [
            "--font-large = 24px;",
            "--font-large: 24px;",
            "$font-large: 24px;",
            "@font-large: 24px;"
          ],
          correctIndex: 1,
          explanation: "CSS custom properties use a colon (not `=`) as the separator: `--font-large: 24px;`"
        },
        {
          question: "How does updating one CSS variable affect an entire design system?",
          options: [
            "Only elements with that exact variable name change",
            "Every element using that variable updates automatically across the stylesheet",
            "Only the first usage of the variable updates",
            "Variables must be refreshed manually in each rule"
          ],
          correctIndex: 1,
          explanation: "Since every `var(--variable-name)` reference is resolved at render time, changing a variable's value instantly updates all elements using it."
        },
        {
          question: "How are CSS variables different from Sass variables ($variables)?",
          options: [
            "CSS variables have the same two-dash syntax",
            "Sass variables are compiled away; CSS variables are live in the browser and can be changed at runtime",
            "CSS variables can only hold color values",
            "Sass variables work in all browsers; CSS variables do not"
          ],
          correctIndex: 1,
          explanation: "Sass variables are compiled to static values during build time; CSS custom properties exist in the live browser and can be dynamically updated."
        },
        {
          question: "Which of these correctly uses a variable as a fallback inside another variable?",
          options: [
            "color: var(--main, var(--fallback-color));",
            "color: var(--main || --fallback-color);",
            "color: var(--main, --fallback-color);",
            "color: var(--main) or var(--fallback-color);"
          ],
          correctIndex: 0,
          explanation: "You can nest `var()` as a fallback: `var(--main, var(--fallback-color))` tries `--main` first, then `--fallback-color`."
        },
        {
          question: "What happens if you use `var(--undefined-var)` and no fallback is provided?",
          options: [
            "The browser uses 0 as the fallback",
            "The property is treated as if it were set to its initial value",
            "An error is thrown",
            "The property inherits from the parent"
          ],
          correctIndex: 1,
          explanation: "If a CSS variable is undefined and no fallback is given, the property is set to its initial (default) value."
        },
        {
          question: "Why is using CSS variables better than repeating a color value like #6c63ff throughout a stylesheet?",
          options: [
            "Variables render faster",
            "Variables make it possible to change the color in one place and have all references update automatically",
            "Hex values are deprecated",
            "Variables reduce file size significantly"
          ],
          correctIndex: 1,
          explanation: "Centralizing values in a variable means a single change propagates everywhere the variable is used, eliminating tedious find-and-replace operations."
        },
        {
          question: "Can a CSS variable reference another CSS variable in its value?",
          options: [
            "No, circular references are not allowed",
            "Yes, variables can reference other variables using var()",
            "Only in preprocessors like Sass",
            "Only for color properties"
          ],
          correctIndex: 1,
          explanation: "CSS variables can reference other variables: `--border-color: var(--primary-color);` is perfectly valid."
        },
        {
          question: "Which approach correctly creates a spacing scale with CSS variables?",
          options: [
            ":root { --space-1: 4px; --space-2: 8px; --space-3: 16px; }",
            "root { $space-1: 4px; $space-2: 8px; }",
            "@root { --space: 4px 8px 16px; }",
            ":root { space(1): 4px; space(2): 8px; }"
          ],
          correctIndex: 0,
          explanation: "Defining a set of spacing variables in `:root` using the `--name: value;` syntax is the correct approach for a CSS spacing scale."
        },
        {
          question: "What must a CSS custom property name always start with?",
          options: ["A letter", "--", "$", "@"],
          correctIndex: 1,
          explanation: "CSS custom properties must always begin with two dashes `--` followed by a name — this is what differentiates them from standard CSS properties."
        }
      ]
    }
  ]
};
