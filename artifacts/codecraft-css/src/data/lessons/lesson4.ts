import type { Lesson } from "../types";

export const cssLayoutLesson: Lesson = {
  id: "css-layout",
  title: "CSS Layout",
  topics: [
    {
      id: "css-layout-display-property",
      title: "The Display Property",
      explanation: "Every element on a webpage has a natural way it takes up space, and the display property is the master switch that controls that behavior. Think of it like choosing between different types of furniture: some pieces, like a dining table, demand the full width of the room (block elements), while others, like a book on a shelf, only take up the space they need and sit side-by-side with their neighbors (inline elements).\n\nWhen an element is set to display: block, it behaves like a paragraph or a heading — it starts on its own line and stretches to fill the entire width available to it. You can freely set its width and height. Common block elements include div, p, h1 through h6, and ul. If you put two block elements next to each other, they will stack vertically.\n\nWhen an element is set to display: inline, it flows along with text, sitting right in the middle of a sentence if needed. Inline elements like span, a, and strong only take up as much width as their content requires. The important caveat is that you cannot set explicit width or height on inline elements — the browser ignores those properties for them. Top and bottom margins also have limited effect on inline elements.\n\nThe best of both worlds is display: inline-block. These elements flow alongside other inline content (they do not force a new line), but they also respect width, height, top and bottom margins just like block elements. This makes inline-block incredibly useful for navigation menu items, buttons, and image galleries where you want elements to sit side-by-side while still being fully controllable.\n\nFinally, display: none is the invisibility cloak of CSS. When you apply it to an element, that element disappears completely — not just visually, but from the document flow entirely. Other elements move in to fill the space it once occupied, as if it never existed. This is different from visibility: hidden, which hides the element visually but preserves the space it takes up. The display: none technique is commonly used with JavaScript to show and hide menus, modals, and tooltips.\n\nUnderstanding display is fundamental because almost every layout technique you will learn builds on top of it. Flexbox and Grid, for instance, are activated by setting display: flex or display: grid on a container element. Mastering the basic display values gives you a strong mental model for how elements interact with each other on the page.",
      htmlExample: `<div class="block-box">I am a block element</div>
<div class="block-box">I am another block element</div>
<span class="inline-box">Inline one</span>
<span class="inline-box">Inline two</span>
<span class="inline-box">Inline three</span>
<div class="inline-block-box">Inline-block A</div>
<div class="inline-block-box">Inline-block B</div>
<div class="hidden-box">You cannot see me</div>`,
      cssExample: `.block-box {
  display: block;
  background-color: #4a90d9;
  color: white;
  padding: 10px;
  margin-bottom: 8px;
}

.inline-box {
  display: inline;
  background-color: #e8a838;
  color: white;
  padding: 4px 8px;
}

.inline-block-box {
  display: inline-block;
  width: 120px;
  height: 60px;
  background-color: #5cb85c;
  color: white;
  text-align: center;
  line-height: 60px;
  margin: 4px;
}

.hidden-box {
  display: none;
}`,
      exercises: [
        {
          title: "Make Spans Stack Vertically",
          description: "Change the three inline span elements so that they each appear on their own line, stacking vertically like block elements. Do this by changing the display value on .inline-box.",
          hint: "Try setting display to 'block' on the .inline-box class and observe how the spans start behaving like divs."
        },
        {
          title: "Create a Navigation Bar",
          description: "Add four div elements with the class 'nav-item' containing the text Home, About, Services, and Contact. Use display: inline-block to make them appear side by side, each with a fixed width of 100px, a height of 40px, and a light blue background.",
          hint: "Give each div display: inline-block, then set width: 100px and height: 40px. Use line-height: 40px and text-align: center to center the text."
        }
      ],
      quiz: [
        {
          question: "What is the default display value for a <div> element?",
          options: ["inline", "block", "inline-block", "flex"],
          correctIndex: 1,
          explanation: "Div elements are block-level by default, meaning they stretch to fill the available width and stack vertically."
        },
        {
          question: "Which display value allows you to set width and height while still letting elements sit side-by-side?",
          options: ["block", "inline", "inline-block", "none"],
          correctIndex: 2,
          explanation: "inline-block combines the flow of inline elements with the sizing capabilities of block elements."
        },
        {
          question: "What happens to the space an element occupied when you set display: none on it?",
          options: [
            "The space is preserved but the element is invisible",
            "The space collapses and other elements fill in",
            "The element moves to the bottom of the page",
            "The element becomes transparent"
          ],
          correctIndex: 1,
          explanation: "display: none removes the element from the document flow entirely, so surrounding elements reflow to fill the gap."
        },
        {
          question: "Which of the following is an inline element by default?",
          options: ["div", "p", "span", "section"],
          correctIndex: 2,
          explanation: "The <span> element is an inline element by default; it flows within text without starting a new line."
        },
        {
          question: "If you set width: 200px on an element with display: inline, what will happen?",
          options: [
            "The element will be 200px wide",
            "The width property will be ignored",
            "The element will overflow its container",
            "The element will switch to block display"
          ],
          correctIndex: 1,
          explanation: "Inline elements do not respect width or height properties; those values are simply ignored by the browser."
        },
        {
          question: "What is the difference between display: none and visibility: hidden?",
          options: [
            "There is no difference",
            "display: none keeps the space; visibility: hidden collapses it",
            "display: none collapses the space; visibility: hidden keeps it",
            "visibility: hidden removes the element from the DOM"
          ],
          correctIndex: 2,
          explanation: "display: none removes the element from layout flow, while visibility: hidden hides it visually but the space remains."
        },
        {
          question: "Which CSS declaration activates Flexbox layout on a container?",
          options: ["display: flexbox", "display: flex", "flex: enable", "layout: flex"],
          correctIndex: 1,
          explanation: "Setting display: flex on a container element turns it into a flex container and enables Flexbox for its children."
        },
        {
          question: "Two block-level elements are placed next to each other in HTML. How will they render?",
          options: [
            "Side by side on the same line",
            "On separate lines, stacking vertically",
            "Overlapping each other",
            "Only the first one will be visible"
          ],
          correctIndex: 1,
          explanation: "Block elements always start on a new line and stack vertically unless their layout is otherwise altered."
        },
        {
          question: "Which display value is the default for the <a> anchor element?",
          options: ["block", "inline-block", "inline", "flex"],
          correctIndex: 2,
          explanation: "Anchor elements are inline by default, which is why they flow within text content without breaking to a new line."
        },
        {
          question: "You want a button-like element that sits inline with text but respects padding and a set height. Which display value should you use?",
          options: ["block", "inline", "inline-block", "table"],
          correctIndex: 2,
          explanation: "inline-block allows the element to flow with text while also accepting width, height, and complete padding/margin values."
        },
        {
          question: "Which CSS property would you use to completely remove an element from the page and its layout flow?",
          options: ["visibility: hidden", "opacity: 0", "display: none", "position: hidden"],
          correctIndex: 2,
          explanation: "display: none is the only option that removes the element from the layout flow entirely; the others only affect visibility."
        },
        {
          question: "Spot the bug: .label { display: inline; width: 150px; } — the width is not applying. Why?",
          options: [
            "The width value needs a unit like px",
            "Inline elements ignore width and height",
            "display: inline should be display: block",
            "The semicolons are causing the issue"
          ],
          correctIndex: 1,
          explanation: "Inline elements do not respect the width property. Changing to inline-block or block would allow the width to take effect."
        },
        {
          question: "What does display: inline-block allow that display: inline does not?",
          options: [
            "Floating elements",
            "Setting explicit width and height",
            "Nesting other elements",
            "Using background colors"
          ],
          correctIndex: 1,
          explanation: "Unlike inline, inline-block respects width and height properties, giving you box-model control while maintaining inline flow."
        },
        {
          question: "A <li> element inside a <ul> has which default display value?",
          options: ["block", "inline", "list-item", "inline-block"],
          correctIndex: 2,
          explanation: "List items have display: list-item by default, which is similar to block but also generates the list marker (bullet or number)."
        },
        {
          question: "Which of the following would make a horizontal navigation bar from a list of <li> elements?",
          options: [
            "li { display: block; }",
            "li { display: inline-block; }",
            "li { float: none; }",
            "li { position: static; }"
          ],
          correctIndex: 1,
          explanation: "Setting display: inline-block on list items makes them flow side by side horizontally instead of stacking vertically."
        },
        {
          question: "What will this render as? <span style=\"display: block;\">Hello</span><span>World</span>",
          options: [
            "Hello World on the same line",
            "Hello on one line, World on the next",
            "Only Hello will be visible",
            "Nothing — spans cannot be block"
          ],
          correctIndex: 1,
          explanation: "The first span is changed to block display, so it occupies its own line; World follows on the next line as an inline span."
        },
        {
          question: "Which statement about display: none is correct?",
          options: [
            "The element is still accessible to screen readers",
            "The element takes up space but is invisible",
            "The element is removed from layout and is inaccessible to assistive tech",
            "The element becomes a block element"
          ],
          correctIndex: 2,
          explanation: "display: none hides the element from all users including assistive technologies; it is as if the element does not exist."
        },
        {
          question: "Which HTML element is block-level by default?",
          options: ["strong", "em", "img", "h2"],
          correctIndex: 3,
          explanation: "Heading elements like h2 are block-level by default, causing them to occupy their own line."
        },
        {
          question: "An element with display: inline-block has a margin-top: 20px. What happens?",
          options: [
            "The margin is ignored just like with inline elements",
            "The margin is applied and pushes the element down 20px",
            "The margin is applied to the bottom instead",
            "The element switches to block layout"
          ],
          correctIndex: 1,
          explanation: "inline-block elements respect all margin directions including top and bottom, unlike pure inline elements."
        },
        {
          question: "Setting display: flex on an element affects which elements?",
          options: [
            "The element itself and all its descendants",
            "Only the element itself",
            "Only the direct children of the element",
            "Only sibling elements"
          ],
          correctIndex: 2,
          explanation: "Flexbox properties on a flex container directly control only its immediate children; descendants deeper in the tree are not affected unless they are also flex containers."
        }
      ]
    },
    {
      id: "css-layout-position-property",
      title: "The Position Property",
      explanation: "The CSS position property gives you control over exactly where an element sits on the page. By default, elements appear in what is called normal flow — they stack and arrange themselves based on the order they appear in the HTML. The position property lets you step outside of that flow, or nudge elements within it, using four directional properties: top, right, bottom, and left.\n\nThe default value is position: static, which simply means the element sits exactly where the document flow places it. The top, right, bottom, and left properties have no effect on static elements. Almost every element starts here unless you change it.\n\nPosition: relative is like moving a worker slightly from their normal spot while keeping that spot reserved. The element shifts visually by whatever amount you specify with top, right, bottom, or left, but its original space in the document flow remains. No other elements reflow to fill its old position. This makes relative positioning excellent for subtle tweaks and as a reference point for absolutely positioned children.\n\nPosition: absolute removes the element from the document flow entirely — it floats above the page and no longer affects surrounding elements. Its position is calculated relative to its nearest ancestor that has a position value other than static. If no such ancestor exists, it positions itself relative to the initial containing block (essentially the browser viewport). This is perfect for things like dropdown menus, tooltips, and badges overlaid on images.\n\nPosition: fixed is similar to absolute, but the element always positions itself relative to the viewport, not any ancestor. This means it stays in exactly the same place even when the page is scrolled. Navigation bars that stick to the top of the screen and chat widgets pinned to the corner of the browser are classic uses of position: fixed.\n\nPosition: sticky is a hybrid that starts behaving like relative positioning, flowing normally in the document, but then switches to fixed-like behavior once the element reaches a defined scroll position. A common pattern is a table header that scrolls with content until it reaches the top of the screen, then sticks there as the user continues scrolling. For sticky positioning to work, you must set at least one of top, right, bottom, or left.\n\nUnderstanding the positioning context is crucial: an absolutely positioned element looks for its nearest positioned ancestor (anything with a position value other than static) to anchor itself to. This is why developers often give a parent element position: relative — even without moving it — just to create that anchor for child elements.",
      htmlExample: `<div class="container">
  <div class="static-box">Static (default)</div>
  <div class="relative-box">Relative — shifted down 10px</div>
  <div class="absolute-parent">
    Parent with position: relative
    <div class="absolute-child">Absolute child</div>
  </div>
</div>
<div class="fixed-badge">Fixed!</div>`,
      cssExample: `.container {
  position: relative;
  background: #f0f4f8;
  padding: 20px;
  min-height: 200px;
}

.static-box {
  position: static;
  background: #4a90d9;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
}

.relative-box {
  position: relative;
  top: 10px;
  left: 20px;
  background: #e8a838;
  color: white;
  padding: 10px;
  margin-bottom: 20px;
}

.absolute-parent {
  position: relative;
  background: #dbe9f8;
  padding: 10px;
  height: 80px;
}

.absolute-child {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #e74c3c;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
}

.fixed-badge {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #5cb85c;
  color: white;
  padding: 8px 14px;
  border-radius: 20px;
}`,
      exercises: [
        {
          title: "Create a Notification Badge",
          description: "Add a small circular badge with the number '3' inside it that sits on the top-right corner of a parent box. Use position: relative on the parent and position: absolute on the badge, placing it at top: -8px and right: -8px.",
          hint: "Give the parent div position: relative. Give the badge div position: absolute, then use top: -8px and right: -8px. Add border-radius: 50% and a contrasting background color."
        },
        {
          title: "Sticky Section Header",
          description: "Create a long scrollable container (height: 300px; overflow-y: scroll) with several paragraphs of text. Add a heading above the content with position: sticky and top: 0 so it sticks to the top of the container as you scroll.",
          hint: "Place the heading inside the scrollable container. Set position: sticky and top: 0 on the heading. Make sure the container has overflow-y: scroll and enough content to scroll."
        }
      ],
      quiz: [
        {
          question: "What is the default value of the CSS position property?",
          options: ["relative", "absolute", "fixed", "static"],
          correctIndex: 3,
          explanation: "Elements are positioned as 'static' by default, meaning they follow the normal document flow."
        },
        {
          question: "Which position value removes an element from the normal document flow?",
          options: ["static", "relative", "absolute", "sticky"],
          correctIndex: 2,
          explanation: "An absolutely positioned element is removed from the document flow; surrounding elements act as if it does not exist."
        },
        {
          question: "An element with position: relative and top: 20px will:",
          options: [
            "Move up 20px from its normal position",
            "Move down 20px from its normal position",
            "Be placed 20px from the top of the viewport",
            "Be removed from the document flow"
          ],
          correctIndex: 1,
          explanation: "The 'top' offset pushes the element away from its top edge, which visually moves it downward."
        },
        {
          question: "For position: absolute to work relative to a parent element, the parent must have:",
          options: [
            "display: block",
            "Any position value other than static",
            "overflow: hidden",
            "A defined width and height"
          ],
          correctIndex: 1,
          explanation: "An absolutely positioned child anchors to its nearest ancestor that has a position value other than static."
        },
        {
          question: "Which position value causes an element to remain in place even when the page is scrolled?",
          options: ["absolute", "sticky", "fixed", "relative"],
          correctIndex: 2,
          explanation: "position: fixed anchors the element to the viewport, so it does not move when the user scrolls."
        },
        {
          question: "What must you do for position: sticky to take effect?",
          options: [
            "Set overflow: scroll on the body",
            "Give the element a fixed width",
            "Set at least one of top, right, bottom, or left",
            "Set z-index to a high number"
          ],
          correctIndex: 2,
          explanation: "Sticky positioning requires a threshold defined by top, right, bottom, or left to know when to 'stick'."
        },
        {
          question: "A parent div has position: static. Its child has position: absolute, top: 0, left: 0. Where will the child be placed?",
          options: [
            "At the top-left corner of the parent",
            "At the top-left corner of the nearest positioned ancestor or viewport",
            "At its normal position in document flow",
            "Outside the visible area of the page"
          ],
          correctIndex: 1,
          explanation: "Since the parent is static, the child looks further up the DOM tree for a positioned ancestor, potentially reaching the viewport."
        },
        {
          question: "Which statement is true about position: relative?",
          options: [
            "The element is removed from normal flow",
            "The element's original space is preserved in the flow",
            "Other elements move to fill the element's old space",
            "It has no effect unless combined with z-index"
          ],
          correctIndex: 1,
          explanation: "Relative positioning moves the element visually but keeps its original space reserved in the document flow."
        },
        {
          question: "Spot the bug: a developer wants a tooltip positioned in the top-right of a card, but the tooltip ends up at the top-right of the entire page. What is the likely issue?",
          options: [
            "The tooltip has the wrong z-index",
            "The card element has no position set (it is static)",
            "The tooltip uses position: fixed instead of absolute",
            "The card has overflow: hidden"
          ],
          correctIndex: 1,
          explanation: "If the parent card has no position set (static), the absolutely positioned tooltip will look for a positioned ancestor higher up, often the viewport."
        },
        {
          question: "Which position value behaves like relative until a scroll threshold is reached, then like fixed?",
          options: ["absolute", "fixed", "sticky", "static"],
          correctIndex: 2,
          explanation: "position: sticky starts in normal flow then 'sticks' at a defined scroll position, combining relative and fixed behavior."
        },
        {
          question: "The top, right, bottom, and left properties have no effect on elements with which position value?",
          options: ["relative", "absolute", "fixed", "static"],
          correctIndex: 3,
          explanation: "Offset properties (top, right, bottom, left) only apply to positioned elements; they are ignored on static elements."
        },
        {
          question: "What will position: fixed; bottom: 0; right: 0; produce?",
          options: [
            "An element at the bottom-right of its parent",
            "An element at the bottom-right corner of the browser viewport",
            "An element that scrolls with the page to the bottom-right",
            "An element that only appears when scrolled to the bottom"
          ],
          correctIndex: 1,
          explanation: "Fixed positioning always anchors to the viewport, so bottom: 0; right: 0 pins the element to the viewport's bottom-right corner."
        },
        {
          question: "Which position value is the best choice for a header that should 'stick' as the user scrolls past a section?",
          options: ["position: absolute", "position: fixed", "position: sticky", "position: relative"],
          correctIndex: 2,
          explanation: "position: sticky is designed for this exact use case, flowing normally then sticking at the scroll threshold."
        },
        {
          question: "An absolutely positioned element's left: 50px is measured from where?",
          options: [
            "The left edge of the viewport",
            "The left edge of the document body",
            "The left edge of its nearest positioned ancestor",
            "The left edge of the element itself"
          ],
          correctIndex: 2,
          explanation: "Absolute positioning offsets are measured from the nearest ancestor with a position value other than static."
        },
        {
          question: "What does setting only position: relative (with no top/left/right/bottom) do to an element?",
          options: [
            "Visually moves it to a random position",
            "Has no visual effect but establishes a positioning context for children",
            "Removes it from the document flow",
            "Makes it scroll with the page header"
          ],
          correctIndex: 1,
          explanation: "With no offsets, relative positioning is visually invisible but creates a containing block for absolutely positioned descendants."
        },
        {
          question: "Which position value is most appropriate for a floating chat button that always appears in the bottom-right of the screen?",
          options: ["relative", "absolute", "sticky", "fixed"],
          correctIndex: 3,
          explanation: "A chat button that remains in the same viewport position regardless of scrolling should use position: fixed."
        },
        {
          question: "Fill in the blank: An element with position: _____ is taken out of normal flow and positioned relative to the viewport, remaining there during scrolling.",
          options: ["absolute", "fixed", "sticky", "relative"],
          correctIndex: 1,
          explanation: "position: fixed removes the element from normal flow and pins it to the viewport, unaffected by scrolling."
        },
        {
          question: "If two absolutely positioned elements overlap, which one appears on top by default?",
          options: [
            "The one that appears first in the HTML",
            "The one that appears later in the HTML",
            "The one with the larger width",
            "The one with the larger font-size"
          ],
          correctIndex: 1,
          explanation: "Without z-index, stacking order follows source order — elements that appear later in the HTML are painted on top."
        },
        {
          question: "A sticky element does not seem to stick. Which of the following is NOT a common cause of this issue?",
          options: [
            "No top/bottom offset is defined",
            "A parent element has overflow: hidden",
            "The sticky element has display: inline",
            "The sticky element has a red background color"
          ],
          correctIndex: 3,
          explanation: "Background color has no effect on sticky behavior; the common culprits are missing offsets, overflow issues, or inline display."
        },
        {
          question: "What happens to the space originally occupied by an absolutely positioned element?",
          options: [
            "It is reserved and kept empty",
            "It is filled in by the next sibling element",
            "The element shrinks to zero size",
            "The element moves to the end of the page"
          ],
          correctIndex: 1,
          explanation: "Absolute positioning removes the element from the document flow, so siblings reflow to occupy the space it left behind."
        }
      ]
    },
    {
      id: "css-layout-floats",
      title: "Floats and Clearing Floats",
      explanation: "Before modern layout systems like Flexbox and Grid existed, floats were the primary tool web developers used to create multi-column layouts. While their role has diminished for full-page layouts, floats are still very useful for their original intended purpose: allowing an element — most often an image — to sit beside flowing text.\n\nWhen you apply float: left or float: right to an element, you are pulling it out of the normal document flow and pushing it to one side of its container. Text and other inline content will then wrap around the floated element, similar to how a magazine article wraps text around a photo. This is the most natural use case for floats and still very common today.\n\nThe complication with floats is that since floated elements are partly removed from normal flow, their parent container may not grow tall enough to contain them. If all the children of a container are floated, the container collapses to zero height, which looks like a layout bug. This is the infamous float collapse problem.\n\nTo solve the float collapse, you need to clear the floats. The simplest modern solution is the clearfix technique: add a CSS rule that uses a pseudo-element to insert an invisible clearing element after the floated content. The rule looks like this: .clearfix::after { content: ''; display: block; clear: both; }. Adding the clearfix class to a container that holds floated elements will force the container to fully enclose them.\n\nYou can also use the clear property directly on an element to specify that it should move below any preceding floated elements. For example, clear: left tells the element to drop below any left-floated elements, clear: right clears right floats, and clear: both clears floats on both sides.\n\nAnother modern solution to float collapse is simply setting overflow: hidden or overflow: auto on the parent container. This triggers a block formatting context, which forces the parent to contain its floated children. It is less explicit than clearfix but often works in simple cases.\n\nFloat layouts have largely been replaced by Flexbox and Grid, which give you more control without the float collapse headaches. However, understanding floats helps you maintain older code and understand why certain layout patterns exist. The float: left technique for wrapping text around images remains one of the most satisfying and appropriate uses of the property.",
      htmlExample: `<div class="article">
  <img class="float-image" src="https://via.placeholder.com/120x90" alt="Article image" />
  <p>This text will wrap around the floated image on the left side.
  Floats were originally designed for exactly this kind of magazine-style
  layout, where an image sits beside a column of text. The text flows
  naturally around the image, filling the available space.</p>
  <p>Once the text is longer than the image, it flows back to the full width
  of the container, just as you would expect in a print layout.</p>
</div>
<div class="clearfix-demo">
  <div class="float-left-box">Left float</div>
  <div class="float-right-box">Right float</div>
</div>`,
      cssExample: `.article {
  background: #f8f9fa;
  padding: 16px;
  border: 1px solid #dee2e6;
  margin-bottom: 20px;
  overflow: hidden;
}

.float-image {
  float: left;
  margin: 0 16px 8px 0;
}

.clearfix-demo::after {
  content: '';
  display: block;
  clear: both;
}

.clearfix-demo {
  background: #e3f2fd;
  padding: 10px;
  border: 2px dashed #90caf9;
}

.float-left-box {
  float: left;
  background: #4a90d9;
  color: white;
  padding: 10px 16px;
}

.float-right-box {
  float: right;
  background: #e8a838;
  color: white;
  padding: 10px 16px;
}`,
      exercises: [
        {
          title: "Text Wrapping Around an Image",
          description: "Create a div with an image and several paragraphs of text. Float the image to the right and add margin-left and margin-bottom to give it breathing room from the text. Observe how the text wraps around the left side of the image.",
          hint: "Set float: right on the image element, then add margin-left: 16px and margin-bottom: 8px to create space between the image and the text."
        },
        {
          title: "Fix a Collapsed Container",
          description: "Create a container div with two floated children (float: left on both). Notice the container collapses. Fix it using the clearfix technique by adding a ::after pseudo-element on the container with content: '', display: block, and clear: both.",
          hint: "Apply .container::after { content: ''; display: block; clear: both; } to the container's CSS. This forces the container to stretch around its floated children."
        }
      ],
      quiz: [
        {
          question: "What was the original intended use case for CSS floats?",
          options: [
            "Creating multi-column page layouts",
            "Wrapping text around images",
            "Centering elements on the page",
            "Creating sticky navigation bars"
          ],
          correctIndex: 1,
          explanation: "Floats were designed for magazine-style layouts where text wraps around a floating image, just as in print design."
        },
        {
          question: "What happens to a parent container when all its children are floated?",
          options: [
            "The parent grows to be the full height of the tallest child",
            "The parent collapses to zero height",
            "The children align to the center of the parent",
            "The parent becomes a flex container"
          ],
          correctIndex: 1,
          explanation: "When all children are floated, the parent loses its content height and collapses, because floated elements are partially out of normal flow."
        },
        {
          question: "Which CSS rule is the modern clearfix technique?",
          options: [
            ".container { clear: both; }",
            ".container::after { content: ''; display: block; clear: both; }",
            ".container { overflow: visible; }",
            ".container::before { display: float; }"
          ],
          correctIndex: 1,
          explanation: "The clearfix hack inserts an invisible block after the floated content using the ::after pseudo-element with clear: both."
        },
        {
          question: "What does clear: both do when applied to an element?",
          options: [
            "Removes all floats from the page",
            "Makes the element float in both directions",
            "Forces the element to appear below any preceding floated elements",
            "Removes the element's own float"
          ],
          correctIndex: 2,
          explanation: "clear: both tells the browser to push the element down until there are no floated elements on either its left or right side."
        },
        {
          question: "A floated element is pushed to the:",
          options: [
            "Center of its container",
            "Left or right side of its container",
            "Top or bottom of its container",
            "Outside the browser viewport"
          ],
          correctIndex: 1,
          explanation: "float: left pushes an element to the left edge and float: right pushes it to the right edge of its containing block."
        },
        {
          question: "Which property set on a parent can also solve float collapse by creating a block formatting context?",
          options: [
            "padding: 0",
            "overflow: hidden",
            "display: inline",
            "margin: auto"
          ],
          correctIndex: 1,
          explanation: "Setting overflow to hidden or auto on a parent establishes a block formatting context, forcing it to enclose its floated children."
        },
        {
          question: "Text next to a floated image will:",
          options: [
            "Overlap the image",
            "Push the image off the page",
            "Wrap around the floated image",
            "Disappear behind the image"
          ],
          correctIndex: 2,
          explanation: "Inline content like text naturally wraps around floated elements, which is the primary purpose of the float property."
        },
        {
          question: "Which value of the clear property only clears left-floated elements?",
          options: ["clear: both", "clear: all", "clear: left", "clear: right"],
          correctIndex: 2,
          explanation: "clear: left only ensures the element drops below left-floated elements, leaving right-floated elements unaffected."
        },
        {
          question: "What does float: right do?",
          options: [
            "Moves the element to the right side and allows content to wrap around its left",
            "Centers the element and adds right margin",
            "Aligns the element's text to the right",
            "Fixes the element at the right edge of the viewport"
          ],
          correctIndex: 0,
          explanation: "float: right pulls the element to the right side of its container, and surrounding inline content wraps around its left side."
        },
        {
          question: "Spot the bug: a developer floats all list items left to create a menu, but the nav bar background color is not showing. What is the likely cause?",
          options: [
            "The background-color value is incorrect",
            "The nav bar has collapsed because all its children are floated",
            "Float does not work on list items",
            "The list items need display: flex"
          ],
          correctIndex: 1,
          explanation: "When all children are floated, the parent container collapses and has no height, so its background color becomes invisible."
        },
        {
          question: "Which CSS layout method has largely replaced floats for creating multi-column layouts?",
          options: ["Tables", "Floats with clear: both", "Flexbox and CSS Grid", "Position absolute"],
          correctIndex: 2,
          explanation: "Flexbox and CSS Grid were designed for layout and have replaced the float-based layout techniques of the past."
        },
        {
          question: "If you float an image to the left, what margin would you add to give the text space?",
          options: [
            "margin-left on the image",
            "margin-right on the image",
            "margin-top on the paragraph",
            "padding-left on the container"
          ],
          correctIndex: 1,
          explanation: "Adding margin-right to a left-floated image creates space between the image and the text that wraps around its right side."
        },
        {
          question: "What is the value of float that removes any float applied to an element?",
          options: ["float: remove", "float: none", "float: clear", "float: default"],
          correctIndex: 1,
          explanation: "float: none is the default value and un-floats an element that might otherwise inherit or have a float applied to it."
        },
        {
          question: "Fill in the blank: The _____ property on a non-floated element forces it to move below any floated predecessors.",
          options: ["position", "display", "clear", "overflow"],
          correctIndex: 2,
          explanation: "The clear property forces an element to drop below any preceding floated elements, effectively 'clearing' the float."
        },
        {
          question: "A floated element is followed immediately by a paragraph. The paragraph text wraps around the float. How would you stop the paragraph from wrapping and make it start below the float?",
          options: [
            "Give the paragraph float: left",
            "Give the paragraph clear: both",
            "Give the paragraph display: inline",
            "Give the parent overflow: visible"
          ],
          correctIndex: 1,
          explanation: "Applying clear: both to the paragraph forces it to drop below the floated element rather than wrapping beside it."
        },
        {
          question: "Which is NOT a valid float value?",
          options: ["left", "right", "none", "center"],
          correctIndex: 3,
          explanation: "There is no float: center in CSS; valid values are float: left, float: right, and float: none."
        },
        {
          question: "What is a 'block formatting context' in relation to floats?",
          options: [
            "A way to format block-level text",
            "An isolated layout region where floated elements are contained",
            "The default behavior of inline elements",
            "A JavaScript API for managing floats"
          ],
          correctIndex: 1,
          explanation: "A block formatting context creates an isolated region where floats are fully contained, preventing collapse and wrap issues."
        },
        {
          question: "When does the clearfix ::after technique insert its clearing element?",
          options: [
            "Before the first child of the container",
            "After the last child of the container",
            "Between each pair of floated children",
            "Only when JavaScript is enabled"
          ],
          correctIndex: 1,
          explanation: "The ::after pseudo-element inserts content after the element's last child, effectively forcing the parent to clear its floated children."
        },
        {
          question: "Which of the following best describes the relationship between floats and normal document flow?",
          options: [
            "Floated elements are fully inside normal flow",
            "Floated elements are fully outside normal flow",
            "Floated elements are partly outside normal flow — block siblings ignore them but inline content wraps around them",
            "Floated elements always overlap other elements"
          ],
          correctIndex: 2,
          explanation: "Floated elements are in a special state: block elements treat them as if they are gone, but inline text wraps around them."
        },
        {
          question: "You apply overflow: auto to a parent that contains floated children. What is the expected result?",
          options: [
            "The floated children are removed from the page",
            "The parent gains scrollbars but does not wrap around the children",
            "The parent wraps around the floated children, fixing the collapse",
            "The floated children become inline elements"
          ],
          correctIndex: 2,
          explanation: "overflow: auto establishes a block formatting context, which forces the parent to fully contain its floated children."
        }
      ]
    },
    {
      id: "css-layout-flexbox-container",
      title: "Flexbox Container Properties",
      explanation: "Flexbox, short for Flexible Box Layout, is a powerful CSS layout model that makes it easy to arrange elements in a row or column, distribute space among them, and align them in relation to each other. Before Flexbox, aligning elements vertically centered on a page was notoriously difficult. Today, it is a single line of CSS.\n\nTo start using Flexbox, you simply set display: flex on a parent element. This parent instantly becomes a flex container, and all of its direct children become flex items. The flex container provides all the tools you need to control how those items are arranged.\n\nThe flex-direction property sets the main axis — the direction in which items flow. The default is row, which arranges items horizontally from left to right. Setting flex-direction: column stacks items vertically. You can also use row-reverse and column-reverse to flip the order.\n\nBy default, flex items all try to fit on a single line. When there are too many items to fit, they may overflow or shrink. The flex-wrap property controls this: flex-wrap: nowrap (the default) keeps everything on one line, while flex-wrap: wrap allows items to move to new rows or columns as needed. This is essential for responsive design.\n\nJustify-content aligns items along the main axis (the direction set by flex-direction). Its values include flex-start (default, packs items to the start), flex-end (packs to the end), center (groups items in the middle), space-between (evenly spaces items with no gap at the edges), and space-around (adds equal spacing around each item). This one property alone handles many common spacing challenges.\n\nAlign-items controls alignment along the cross axis — perpendicular to the main axis. For a row layout, this means vertical alignment. Values include stretch (default, all items grow to the same height), flex-start, flex-end, center, and baseline. Setting align-items: center on a flex row container is the famous one-line vertical centering trick.\n\nThe gap property (also written as row-gap and column-gap) adds space between flex items without needing margins. This is a cleaner approach than adding margins to individual items, because the gap only applies between items, not around the outer edges of the container.",
      htmlExample: `<nav class="nav-bar">
  <div class="logo">MyBrand</div>
  <ul class="nav-links">
    <li>Home</li>
    <li>About</li>
    <li>Services</li>
    <li>Contact</li>
  </ul>
</nav>

<div class="card-row">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</div>`,
      cssExample: `.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2c3e50;
  padding: 0 20px;
  height: 60px;
}

.logo {
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  color: #ecf0f1;
  cursor: pointer;
}

.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  justify-content: center;
}

.card {
  background: #4a90d9;
  color: white;
  padding: 24px;
  width: 120px;
  text-align: center;
  border-radius: 8px;
}`,
      exercises: [
        {
          title: "Centered Hero Section",
          description: "Create a div with class 'hero' containing an h1 and a p element. Make the hero div 300px tall with a background color. Use Flexbox to center the h1 and p both horizontally and vertically by setting flex-direction: column, justify-content: center, and align-items: center.",
          hint: "Set display: flex, flex-direction: column, justify-content: center, and align-items: center on the .hero class. Don't forget to set a height like 300px."
        },
        {
          title: "Wrapping Card Grid",
          description: "Create 8 card divs inside a container. Set the container to display: flex with flex-wrap: wrap and gap: 16px. Give each card a width of 150px and a min-height of 100px. See how they wrap to new rows when the container is not wide enough.",
          hint: "Set flex-wrap: wrap on the container so items can wrap to new lines. Each card needs a fixed width (like 150px) for the wrapping to work properly."
        }
      ],
      quiz: [
        {
          question: "How do you activate Flexbox on a container element?",
          options: ["flex: enable", "display: flexbox", "display: flex", "layout: flex"],
          correctIndex: 2,
          explanation: "Setting display: flex on a container makes it a flex container and enables Flexbox rules for all its direct children."
        },
        {
          question: "What is the default value of flex-direction?",
          options: ["column", "row", "row-reverse", "column-reverse"],
          correctIndex: 1,
          explanation: "flex-direction defaults to row, arranging flex items horizontally from left to right."
        },
        {
          question: "Which property controls alignment of flex items along the main axis?",
          options: ["align-items", "align-content", "justify-content", "flex-wrap"],
          correctIndex: 2,
          explanation: "justify-content handles alignment and spacing along the main axis (horizontal in a row layout)."
        },
        {
          question: "Which justify-content value places equal space between items but no space on the outer edges?",
          options: ["space-around", "space-evenly", "space-between", "flex-start"],
          correctIndex: 2,
          explanation: "space-between distributes available space evenly between items, with no extra space before the first or after the last item."
        },
        {
          question: "What does align-items: center do in a flex row container?",
          options: [
            "Centers items horizontally",
            "Centers items vertically within the flex container",
            "Groups all items in the middle of the main axis",
            "Stretches all items to the full width"
          ],
          correctIndex: 1,
          explanation: "In a row layout, the cross axis is vertical, so align-items: center vertically centers all flex items."
        },
        {
          question: "What is the default value of flex-wrap?",
          options: ["wrap", "wrap-reverse", "nowrap", "auto"],
          correctIndex: 2,
          explanation: "flex-wrap defaults to nowrap, meaning all items try to fit on a single line, potentially overflowing or shrinking."
        },
        {
          question: "Which property adds space between flex items without affecting outer edges?",
          options: ["padding", "margin", "gap", "border-spacing"],
          correctIndex: 2,
          explanation: "The gap property adds space between flex items only, without adding extra space around the outer edges of the container."
        },
        {
          question: "Setting flex-direction: column means items will stack:",
          options: ["Horizontally", "Diagonally", "Vertically", "In a circle"],
          correctIndex: 2,
          explanation: "flex-direction: column makes items flow top to bottom, stacking vertically instead of the default horizontal row."
        },
        {
          question: "Which align-items value is the default and stretches all items to the same height?",
          options: ["center", "flex-start", "baseline", "stretch"],
          correctIndex: 3,
          explanation: "align-items defaults to stretch, which causes all items to grow to the height of the tallest item in the container."
        },
        {
          question: "What does flex-wrap: wrap do?",
          options: [
            "Wraps text inside flex items",
            "Allows flex items to move to new lines when they don't fit",
            "Wraps the container around its items",
            "Forces all items onto one line"
          ],
          correctIndex: 1,
          explanation: "flex-wrap: wrap allows items to flow onto new rows or columns when there is not enough space on the current line."
        },
        {
          question: "Which property changes the direction of the main axis in Flexbox?",
          options: ["justify-direction", "axis-direction", "flex-direction", "align-direction"],
          correctIndex: 2,
          explanation: "flex-direction sets the main axis, determining whether items flow as a row (horizontal) or column (vertical)."
        },
        {
          question: "Spot the bug: a developer sets display: flex on a container expecting children to stack vertically, but they appear in a horizontal row. What is missing?",
          options: [
            "flex-wrap: wrap is needed",
            "flex-direction: column is needed",
            "justify-content: column is needed",
            "align-items: vertical is needed"
          ],
          correctIndex: 1,
          explanation: "By default flex-direction is row (horizontal). To stack items vertically, you must explicitly set flex-direction: column."
        },
        {
          question: "What does justify-content: flex-end do?",
          options: [
            "Moves flex items to the top of the container",
            "Packs all items toward the end of the main axis",
            "Makes the last flex item grow to fill remaining space",
            "Removes the last flex item from the flow"
          ],
          correctIndex: 1,
          explanation: "justify-content: flex-end groups all flex items at the end of the main axis (right side in a row layout)."
        },
        {
          question: "When flex-direction is column, which axis does justify-content align items along?",
          options: ["Horizontal axis", "Vertical axis", "Diagonal axis", "It has no effect with column"],
          correctIndex: 1,
          explanation: "justify-content always aligns along the main axis; when flex-direction is column, the main axis is vertical."
        },
        {
          question: "Which value of justify-content distributes space so that every item — including the first and last — has equal space around it?",
          options: ["space-between", "space-around", "space-evenly", "center"],
          correctIndex: 2,
          explanation: "space-evenly gives equal gaps everywhere including before the first and after the last item, unlike space-around or space-between."
        },
        {
          question: "How many direct children does display: flex affect?",
          options: [
            "All descendants at every nesting level",
            "Only the element itself",
            "Only the direct children of the flex container",
            "Only children that have a width set"
          ],
          correctIndex: 2,
          explanation: "Flexbox affects only the direct children of the flex container; deeper descendants require their own flex context."
        },
        {
          question: "What happens when you set flex-wrap: wrap and the items exceed the container width?",
          options: [
            "Items overflow beyond the container",
            "Items shrink to fit on one line",
            "Items move to the next line",
            "The container grows to fit all items on one line"
          ],
          correctIndex: 2,
          explanation: "flex-wrap: wrap allows items to break onto new rows when they run out of space in the current row."
        },
        {
          question: "Fill in the blank: To center a div both horizontally and vertically inside a flex container, set justify-content: _____ and align-items: _____.",
          options: [
            "center / center",
            "middle / middle",
            "stretch / stretch",
            "auto / auto"
          ],
          correctIndex: 0,
          explanation: "Both justify-content: center and align-items: center must be set to achieve both horizontal and vertical centering in a flex container."
        },
        {
          question: "A flex container has align-items: flex-start. What does this do?",
          options: [
            "Aligns all items to the start of the main axis",
            "Aligns all items to the start of the cross axis (top in a row layout)",
            "Makes items grow to fill the container height",
            "Pushes items to the bottom of the container"
          ],
          correctIndex: 1,
          explanation: "align-items: flex-start pins all items to the start of the cross axis, which is the top edge in a horizontal row layout."
        },
        {
          question: "Which shorthand property can replace both row-gap and column-gap in a flex container?",
          options: ["spacing", "gap", "gutter", "flex-gap"],
          correctIndex: 1,
          explanation: "The gap shorthand sets both row-gap and column-gap at once: gap: 10px is equivalent to row-gap: 10px; column-gap: 10px."
        }
      ]
    },
    {
      id: "css-layout-flexbox-items",
      title: "Flexbox Item Properties",
      explanation: "While the flex container determines how items are arranged as a group, individual flex items also have their own properties that give them fine-grained control over their size and behavior within the container. These item-level properties let you override the container's rules for specific elements.\n\nThe most fundamental item property is flex-grow. By default it is 0, meaning items do not grow to fill extra space. When you set flex-grow: 1 on an item, it will absorb all available leftover space in the container. If two items both have flex-grow: 1, they share the extra space equally. If one has flex-grow: 2 and another has flex-grow: 1, the first gets twice as much of the extra space.\n\nThe companion property, flex-shrink, controls how items shrink when there is not enough space. The default is 1, which means all items shrink proportionally when necessary. Setting flex-shrink: 0 prevents an item from shrinking at all, which is useful for logos or icons that must always stay the same size.\n\nFlex-basis sets the starting size of a flex item before flex-grow and flex-shrink adjust it. You can think of it as the item's ideal size before the container distributes remaining space. It accepts any length value (like 200px or 30%) or the keyword auto, which defaults to the element's content size.\n\nThe shorthand property flex combines all three: flex: 1 is equivalent to flex-grow: 1; flex-shrink: 1; flex-basis: 0%, meaning the item will grow and shrink freely from a starting size of zero. flex: auto means flex-grow: 1; flex-shrink: 1; flex-basis: auto.\n\nThe order property changes the visual order of a flex item without affecting the HTML source order. By default all items have order: 0. Items with a lower order value appear first, and items with higher values appear last. This is powerful for responsive design where you might want to reorder elements on smaller screens.\n\nAlign-self is the item-level version of the container's align-items. It lets a single item override the cross-axis alignment set on the container. For example, if a flex container has align-items: center, one special item can break out with align-self: flex-end to align to the bottom of the row.",
      htmlExample: `<div class="flex-demo">
  <div class="item item-grow-2">Grow 2</div>
  <div class="item item-grow-1">Grow 1</div>
  <div class="item item-no-shrink">No Shrink</div>
</div>

<div class="flex-order">
  <div class="order-item" style="order: 3;">First in HTML</div>
  <div class="order-item" style="order: 1;">Second in HTML</div>
  <div class="order-item" style="order: 2;">Third in HTML</div>
</div>`,
      cssExample: `.flex-demo {
  display: flex;
  gap: 10px;
  background: #f0f4f8;
  padding: 10px;
  margin-bottom: 16px;
}

.item {
  background: #4a90d9;
  color: white;
  padding: 12px;
  text-align: center;
  min-width: 0;
}

.item-grow-2 {
  flex-grow: 2;
}

.item-grow-1 {
  flex-grow: 1;
}

.item-no-shrink {
  flex-shrink: 0;
  width: 100px;
  background: #e74c3c;
}

.flex-order {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #fff3cd;
}

.order-item {
  background: #e8a838;
  color: white;
  padding: 12px;
  flex: 1;
  text-align: center;
}`,
      exercises: [
        {
          title: "Growing Sidebar Layout",
          description: "Create a container with two children: a sidebar and a main content area. Set the sidebar to flex-basis: 200px and flex-shrink: 0 so it keeps its size. Set flex-grow: 1 on the main content so it fills all remaining space.",
          hint: "On the sidebar: flex-shrink: 0; flex-basis: 200px. On the main content: flex-grow: 1. Use display: flex on the parent container."
        },
        {
          title: "Override Alignment with align-self",
          description: "Create a flex container with align-items: flex-start and four items of different heights. Use align-self: flex-end on the last item and align-self: center on the second item to make them align differently from the rest.",
          hint: "Set align-items: flex-start on the container. Then set align-self: flex-end on the specific item you want to align differently."
        }
      ],
      quiz: [
        {
          question: "What does flex-grow: 0 (the default) mean?",
          options: [
            "The item will shrink to nothing",
            "The item will not grow to fill extra space",
            "The item will grow to fill all extra space",
            "The item will be removed from the flex container"
          ],
          correctIndex: 1,
          explanation: "flex-grow: 0 means the item keeps its natural size and does not expand to absorb leftover space in the container."
        },
        {
          question: "If item A has flex-grow: 2 and item B has flex-grow: 1, how is extra space distributed?",
          options: [
            "Item A gets all the extra space",
            "Item A gets twice as much extra space as item B",
            "Extra space is shared equally",
            "Item B grows and item A shrinks"
          ],
          correctIndex: 1,
          explanation: "flex-grow values are ratios; item A gets 2/3 of the extra space and item B gets 1/3."
        },
        {
          question: "What does flex-shrink: 0 prevent?",
          options: [
            "The item from growing",
            "The item from shrinking when space is tight",
            "The item from wrapping to a new line",
            "The item from being reordered"
          ],
          correctIndex: 1,
          explanation: "flex-shrink: 0 tells the browser not to reduce this item's size when the container runs out of space."
        },
        {
          question: "What does flex-basis set?",
          options: [
            "The minimum width of a flex item",
            "The starting size of a flex item before grow/shrink adjustments",
            "The background color of a flex item",
            "The alignment of a flex item on the cross axis"
          ],
          correctIndex: 1,
          explanation: "flex-basis is the initial size from which flex-grow and flex-shrink calculations are made."
        },
        {
          question: "What is the shorthand for flex-grow: 1; flex-shrink: 1; flex-basis: 0%?",
          options: ["flex: auto", "flex: 1", "flex: none", "flex: initial"],
          correctIndex: 1,
          explanation: "flex: 1 expands to flex-grow: 1; flex-shrink: 1; flex-basis: 0%, allowing the item to grow and shrink from a zero starting size."
        },
        {
          question: "What does the order property control?",
          options: [
            "The z-index of flex items",
            "The visual order of flex items independently of HTML source order",
            "The order in which flex items are downloaded",
            "The order of CSS properties within a rule"
          ],
          correctIndex: 1,
          explanation: "The order property changes the visual rendering order of flex items without modifying the underlying HTML structure."
        },
        {
          question: "What is the default value of the order property for flex items?",
          options: ["1", "-1", "0", "auto"],
          correctIndex: 2,
          explanation: "All flex items start with order: 0, and items are rendered in ascending order value, then by source order for ties."
        },
        {
          question: "Which property allows a single flex item to override its container's align-items setting?",
          options: ["flex-align", "self-align", "align-self", "item-align"],
          correctIndex: 2,
          explanation: "align-self on an individual item overrides the container's align-items setting for that specific item."
        },
        {
          question: "Three items all have flex: 1. How will available space be distributed?",
          options: [
            "Only the first item grows",
            "Space is distributed based on content size",
            "Each item gets an equal share of the available space",
            "No item grows"
          ],
          correctIndex: 2,
          explanation: "When all items have equal flex-grow values, available space is divided equally among them."
        },
        {
          question: "What does flex: none mean?",
          options: [
            "flex-grow: 0; flex-shrink: 0; flex-basis: auto — the item neither grows nor shrinks",
            "The item is removed from the flex container",
            "The item ignores all flex properties",
            "The item's size is set to zero"
          ],
          correctIndex: 0,
          explanation: "flex: none expands to flex-grow: 0; flex-shrink: 0; flex-basis: auto, making the item rigid at its natural size."
        },
        {
          question: "Spot the bug: a developer wants one item to fill all remaining space while others stay at fixed sizes. They set flex: 1 on every item. What is the issue?",
          options: [
            "flex: 1 is not a valid value",
            "All items grow equally instead of just one growing to fill space",
            "The items will overflow the container",
            "flex: 1 disables flex-shrink"
          ],
          correctIndex: 1,
          explanation: "Setting flex: 1 on all items makes all of them share extra space equally. Only the intended item should have flex-grow: 1 (or flex: 1)."
        },
        {
          question: "An item has align-self: flex-end in a horizontal flex row. Where does it align?",
          options: [
            "At the right end of the row",
            "At the bottom of the flex container",
            "At the left start of the row",
            "At the center of the row"
          ],
          correctIndex: 1,
          explanation: "In a row layout, the cross axis is vertical; align-self: flex-end moves the item to the bottom edge of the container."
        },
        {
          question: "What does flex-basis: auto mean?",
          options: [
            "The item has no base size",
            "The item's base size is determined by its content or width/height property",
            "The item stretches to fill the container",
            "The item's base size is 50% of the container"
          ],
          correctIndex: 1,
          explanation: "flex-basis: auto uses the item's content size or explicit width/height as the starting size before grow/shrink adjustments."
        },
        {
          question: "Which property would you use to prevent a logo image inside a flex nav from shrinking on small screens?",
          options: ["flex-grow: 0", "flex-shrink: 0", "flex-basis: auto", "order: -1"],
          correctIndex: 1,
          explanation: "flex-shrink: 0 prevents the item from shrinking, keeping the logo at its original size even when space is limited."
        },
        {
          question: "Fill in the blank: flex: _____ is the shorthand that means an item will not grow and will not shrink.",
          options: ["0", "none", "1", "auto"],
          correctIndex: 1,
          explanation: "flex: none expands to flex-grow: 0; flex-shrink: 0; flex-basis: auto — the item is completely rigid."
        },
        {
          question: "Item A has order: 2 and item B has order: -1. Which appears first visually?",
          options: ["Item A", "Item B", "They appear in their source order", "Neither — order conflicts cancel out"],
          correctIndex: 1,
          explanation: "Flex items are rendered in ascending order value; order: -1 comes before order: 0 (default) and order: 2."
        },
        {
          question: "What is the default value of flex-shrink?",
          options: ["0", "1", "auto", "none"],
          correctIndex: 1,
          explanation: "flex-shrink defaults to 1, which means all flex items will shrink proportionally if the container is too small."
        },
        {
          question: "Which flex item property is most useful for creating equal-width columns that all grow together?",
          options: ["flex-shrink: 0", "flex-grow: 1 on all items", "order: 0", "align-self: stretch"],
          correctIndex: 1,
          explanation: "Setting flex-grow: 1 on all items makes each column take an equal share of available width, creating equal columns."
        },
        {
          question: "An item has flex-basis: 200px and flex-grow: 1. What does this mean?",
          options: [
            "The item is always exactly 200px wide",
            "The item starts at 200px and grows to fill any extra space",
            "The item starts at 0 and grows to 200px maximum",
            "The item shrinks to 1px from 200px"
          ],
          correctIndex: 1,
          explanation: "flex-basis: 200px sets the starting size, and flex-grow: 1 tells the item to absorb remaining space beyond those 200 pixels."
        },
        {
          question: "You want the last flex item to always appear first visually without changing the HTML. Which property helps?",
          options: ["flex-direction: reverse", "order: -1 on the last item", "flex-grow: 0 on the last item", "align-self: flex-start on the last item"],
          correctIndex: 1,
          explanation: "Setting order: -1 on the last item gives it a lower order value than the others (which default to 0), visually moving it first."
        }
      ]
    },
    {
      id: "css-layout-grid-container",
      title: "CSS Grid Container Properties",
      explanation: "CSS Grid is a two-dimensional layout system that lets you place elements into rows and columns simultaneously. While Flexbox works great for one-dimensional layouts (either a row or a column), Grid shines when you need to control both dimensions at once — think magazine spreads, dashboards, and complex web pages.\n\nActivating Grid is just like Flexbox: set display: grid on a container. All direct children of that container become grid items. Then you define the grid's structure with column and row tracks.\n\nThe grid-template-columns property defines how many columns exist and how wide each one is. For example, grid-template-columns: 200px 1fr 1fr creates three columns: the first is 200px wide, and the remaining two split the leftover space equally. The fr unit stands for 'fraction' and is unique to Grid — it represents a fraction of the available space.\n\nSimilarly, grid-template-rows sets the height of each row. You can mix different units: pixels, percentages, fr, auto, or even the minmax() function that specifies a minimum and maximum size range.\n\nThe repeat() function is a shorthand for repeating track definitions. Instead of writing 1fr 1fr 1fr 1fr, you can write repeat(4, 1fr). This is especially useful for equal-width column grids.\n\nThe gap property (or column-gap and row-gap separately) adds space between rows and columns, just as it does in Flexbox. You do not need to add margins to individual items.\n\nJust as in Flexbox, justify-items and align-items control how grid items align within their cells. Justify-items handles horizontal alignment within cells; align-items handles vertical. The default for both is stretch, making items fill their entire cell. Setting place-items: center (a shorthand for both) instantly centers all grid items both horizontally and vertically within their cells.",
      htmlExample: `<div class="grid-layout">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
  <div class="grid-item">Item 4</div>
  <div class="grid-item">Item 5</div>
  <div class="grid-item">Item 6</div>
</div>`,
      cssExample: `.grid-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 16px;
  padding: 20px;
  background: #f0f4f8;
}

.grid-item {
  background: #4a90d9;
  color: white;
  padding: 24px;
  text-align: center;
  border-radius: 6px;
  font-size: 1rem;
}`,
      exercises: [
        {
          title: "Holy Grail Layout",
          description: "Create a grid container with three column tracks: 160px, 1fr, 160px. This creates a sidebar-content-sidebar layout. Add a header row above and a footer row below using grid-template-rows: 60px 1fr 40px. Place seven child divs inside to see the structure.",
          hint: "Use grid-template-columns: 160px 1fr 160px and grid-template-rows: 60px 1fr 40px on the container. Add gap: 10px for visual clarity."
        },
        {
          title: "Responsive Columns with repeat and minmax",
          description: "Create a grid that uses repeat(auto-fill, minmax(150px, 1fr)) for grid-template-columns. Add 10 card items and resize the browser to see columns automatically adjust. Add gap: 12px between items.",
          hint: "The key property is grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)). This creates as many 150px columns as will fit, stretching them to fill remaining space."
        }
      ],
      quiz: [
        {
          question: "How do you enable CSS Grid on a container?",
          options: ["grid: enable", "display: grid", "layout: grid", "grid-layout: true"],
          correctIndex: 1,
          explanation: "Setting display: grid on a container activates CSS Grid and makes all direct children grid items."
        },
        {
          question: "What does the fr unit represent in CSS Grid?",
          options: [
            "A fixed pixel value",
            "A fraction of the available space",
            "The font-relative size",
            "A percentage of the container width"
          ],
          correctIndex: 1,
          explanation: "The fr unit is unique to Grid and represents a fraction of the space remaining after fixed-size tracks are placed."
        },
        {
          question: "What does grid-template-columns: repeat(3, 1fr) create?",
          options: [
            "Three rows of equal height",
            "Three columns each taking one third of the available width",
            "A 3px border around the grid",
            "Three items that repeat their content"
          ],
          correctIndex: 1,
          explanation: "repeat(3, 1fr) creates three equally-sized columns that each take one third of the available width."
        },
        {
          question: "Which Grid property sets the height of rows?",
          options: ["grid-template-columns", "grid-template-rows", "row-height", "grid-rows"],
          correctIndex: 1,
          explanation: "grid-template-rows defines the number and size of explicit row tracks in the grid."
        },
        {
          question: "What is the default value of align-items in a grid container?",
          options: ["center", "flex-start", "stretch", "baseline"],
          correctIndex: 2,
          explanation: "align-items defaults to stretch in Grid, so items grow to fill the full height of their grid cell."
        },
        {
          question: "What does the gap property do in a CSS Grid?",
          options: [
            "Sets the padding inside each grid cell",
            "Creates space between rows and columns",
            "Defines the number of empty rows between items",
            "Increases the border width of the grid container"
          ],
          correctIndex: 1,
          explanation: "gap adds space between grid rows and columns without adding outer margins around the grid edges."
        },
        {
          question: "What does grid-template-columns: 200px 1fr 2fr create?",
          options: [
            "Three equal columns",
            "A fixed 200px column, then two more where the third is twice as wide as the second",
            "Two columns both 200px wide",
            "Three columns that all shrink to 200px"
          ],
          correctIndex: 1,
          explanation: "After placing the 200px fixed column, remaining space is split into 3 fractions: column 2 gets 1/3 and column 3 gets 2/3."
        },
        {
          question: "What is the shorthand place-items a combination of?",
          options: [
            "justify-content and align-content",
            "justify-items and align-items",
            "flex-grow and flex-shrink",
            "row-gap and column-gap"
          ],
          correctIndex: 1,
          explanation: "place-items is shorthand for align-items and justify-items, setting both cross-axis and inline-axis item alignment."
        },
        {
          question: "Which Grid function creates a track that has a minimum and maximum size?",
          options: ["clamp()", "minmax()", "range()", "fit-content()"],
          correctIndex: 1,
          explanation: "minmax(min, max) defines a track size range, allowing the track to be flexible between the two bounds."
        },
        {
          question: "What does auto-fill do in repeat(auto-fill, minmax(150px, 1fr))?",
          options: [
            "Fills remaining cells with empty placeholders",
            "Creates as many tracks as will fit given the minimum size",
            "Makes the grid fill the full viewport",
            "Automatically generates additional HTML elements"
          ],
          correctIndex: 1,
          explanation: "auto-fill creates as many column tracks as will fit in the container, using the minimum size from minmax as the threshold."
        },
        {
          question: "Spot the bug: a developer writes display: grid; grid-template: repeat(3, 1fr); — columns are not being created. What is the issue?",
          options: [
            "grid-template is not a valid property",
            "repeat(3, 1fr) should be used with grid-template-columns, not grid-template alone without slash notation",
            "fr is not a valid unit",
            "display: grid must come after the grid-template declaration"
          ],
          correctIndex: 1,
          explanation: "Using grid-template with just a repeat() value sets rows by default; columns require grid-template-columns or the full grid-template shorthand with a slash."
        },
        {
          question: "How does CSS Grid differ from Flexbox in terms of dimensionality?",
          options: [
            "Grid is one-dimensional; Flexbox is two-dimensional",
            "Grid is two-dimensional; Flexbox is one-dimensional",
            "Both are two-dimensional",
            "Both are one-dimensional"
          ],
          correctIndex: 1,
          explanation: "CSS Grid handles both rows and columns simultaneously (two-dimensional), while Flexbox controls one direction at a time."
        },
        {
          question: "What is the difference between justify-items and justify-content in Grid?",
          options: [
            "They are identical properties",
            "justify-items aligns content within cells; justify-content distributes the entire grid within the container",
            "justify-items applies to rows; justify-content applies to columns",
            "justify-items sets the main axis; justify-content sets the cross axis"
          ],
          correctIndex: 1,
          explanation: "justify-items controls how each item aligns inside its cell, while justify-content distributes the grid tracks within the container."
        },
        {
          question: "Which property controls how each grid item aligns horizontally within its grid cell?",
          options: ["justify-content", "align-items", "justify-items", "align-content"],
          correctIndex: 2,
          explanation: "justify-items controls the horizontal (inline) alignment of items within their individual grid cells."
        },
        {
          question: "What does grid-template-columns: 1fr 2fr 1fr create?",
          options: [
            "Three equal columns",
            "Three columns where the middle column is twice as wide as each side column",
            "Two columns of equal size",
            "A single centered column"
          ],
          correctIndex: 1,
          explanation: "The total is 4 fractions: the first gets 1/4, the middle gets 2/4 (half), and the last gets 1/4 of available space."
        },
        {
          question: "What does the auto value for a grid track size mean?",
          options: [
            "The track is sized to fit its contents",
            "The track is automatically removed",
            "The track inherits size from its parent",
            "The track is set to 1fr"
          ],
          correctIndex: 0,
          explanation: "auto track sizing means the track grows to fit its content, neither forcing a fixed size nor sharing remaining space."
        },
        {
          question: "Fill in the blank: grid-template-columns: repeat(_____, 1fr) creates 4 equal columns.",
          options: ["4x", "4", "auto, 4", "4 * 1fr"],
          correctIndex: 1,
          explanation: "repeat(4, 1fr) is the correct syntax — the first argument is the repeat count and the second is the track definition."
        },
        {
          question: "Which property would you use to add 20px between grid columns and 10px between grid rows separately?",
          options: [
            "gap: 20px 10px",
            "column-gap: 20px; row-gap: 10px",
            "grid-gap: 20px / 10px",
            "spacing: 20px 10px"
          ],
          correctIndex: 1,
          explanation: "column-gap and row-gap let you set column and row spacing independently. The gap shorthand sets row-gap first, then column-gap."
        },
        {
          question: "What happens to extra grid items that are not explicitly placed in a defined grid area?",
          options: [
            "They are hidden",
            "They overflow outside the container",
            "They are placed in auto-generated implicit tracks",
            "They collapse to zero size"
          ],
          correctIndex: 2,
          explanation: "The grid auto-placement algorithm places overflow items into implicit tracks created according to grid-auto-rows and grid-auto-columns."
        },
        {
          question: "Which is a valid use of the minmax() function?",
          options: [
            "grid-template-columns: minmax(100px, 300px) 1fr",
            "width: minmax(100px, 300px)",
            "padding: minmax(10px, 20px)",
            "font-size: minmax(12px, 18px)"
          ],
          correctIndex: 0,
          explanation: "minmax() is only valid inside Grid track definitions; it defines a flexible size range for a grid track."
        }
      ]
    },
    {
      id: "css-layout-grid-items",
      title: "CSS Grid Item Properties and Template Areas",
      explanation: "CSS Grid items have their own set of properties that control where they are placed within the grid and how much space they span. This gives you fine-grained control over every cell, allowing items to span multiple rows or columns, and even skip cells entirely.\n\nThe grid-column property controls which column lines an item starts and ends at. Grid lines are numbered starting from 1 at the left edge. For a three-column grid, there are four column lines: 1, 2, 3, and 4. Setting grid-column: 1 / 3 places an item starting at line 1 and ending at line 3, so it spans two columns. You can also use the span keyword: grid-column: span 2 means 'start wherever automatic placement puts you, and span 2 columns from there.'\n\nThe grid-row property works identically but controls vertical positioning across row lines. grid-row: 1 / 3 would make an item stretch across two rows.\n\nGrid template areas provide a visual, name-based way to design your layout. Using grid-template-areas on the container, you draw an ASCII art diagram of your layout using quoted strings, where each word is a named area and each row is a quoted string:\n\ngrid-template-areas:\n  \"header header header\"\n  \"sidebar main main\"\n  \"footer footer footer\";\n\nThen, on each grid item, you set grid-area: header, grid-area: sidebar, grid-area: main, or grid-area: footer to map them to their positions. This approach is extremely readable — just by looking at the CSS you can instantly visualize the layout. A period (.) in the template represents an empty cell.\n\nThe align-self and justify-self properties work on individual grid items, just as they do in Flexbox, overriding the container's align-items and justify-items for that specific item. This lets one item break the alignment rules set for the whole grid.\n\nUsing grid-column and grid-row together, you can create rich editorial layouts where a featured image spans several columns while text fills the remaining cells, all without JavaScript and without complex markup.",
      htmlExample: `<div class="page-grid">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="main-content">Main Content</main>
  <footer class="footer">Footer</footer>
</div>`,
      cssExample: `.page-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 10px;
  height: 400px;
}

.header {
  grid-area: header;
  background: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.sidebar {
  grid-area: sidebar;
  background: #4a90d9;
  color: white;
  padding: 16px;
}

.main-content {
  grid-area: main;
  background: #f8f9fa;
  padding: 16px;
}

.footer {
  grid-area: footer;
  background: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
}`,
      exercises: [
        {
          title: "Featured Article Span",
          description: "Create a 3-column grid with 6 items. Make the first item span all 3 columns using grid-column: 1 / 4 to create a featured hero card above a row of three regular cards. Give the featured card a different background color.",
          hint: "Set grid-column: 1 / 4 (or grid-column: span 3) on the first item. The remaining 5 items will auto-place into the grid after the featured card."
        },
        {
          title: "Template Areas Dashboard",
          description: "Design a dashboard layout with areas: topbar (full width), left-panel and right-panel (side by side), and status (full width at bottom). Use grid-template-areas to define the layout and grid-area to assign each child element.",
          hint: "In grid-template-areas, use 'topbar topbar', 'left-panel right-panel', 'status status' across three rows. Then set grid-area on each child element to match the area names."
        }
      ],
      quiz: [
        {
          question: "In a CSS Grid with 4 columns, how many column lines are there?",
          options: ["3", "4", "5", "8"],
          correctIndex: 2,
          explanation: "A grid with 4 columns has 5 column lines: one before the first column (line 1) through one after the last column (line 5)."
        },
        {
          question: "What does grid-column: 1 / 3 mean?",
          options: [
            "The item spans 3 columns",
            "The item starts at column line 1 and ends at column line 3, spanning 2 columns",
            "The item is in column 1, row 3",
            "The item takes 1/3 of the container width"
          ],
          correctIndex: 1,
          explanation: "grid-column: start / end places the item between those column lines; 1 / 3 covers the first two columns."
        },
        {
          question: "What does grid-column: span 2 mean?",
          options: [
            "The item is placed at column 2",
            "The item spans 2 columns from its auto-placed starting position",
            "The item shrinks to 2px",
            "The item stretches to fill column 2 only"
          ],
          correctIndex: 1,
          explanation: "span 2 tells the browser to let the item span 2 columns wide starting from wherever it is auto-placed."
        },
        {
          question: "Which property assigns a grid item to a named template area?",
          options: ["grid-placement", "grid-region", "grid-area", "grid-template"],
          correctIndex: 2,
          explanation: "grid-area on a grid item assigns it to a named area defined in the container's grid-template-areas property."
        },
        {
          question: "In grid-template-areas, what does a period (.) represent?",
          options: [
            "The end of a row",
            "An empty cell in the grid",
            "A full-width spanning area",
            "A separator between area names"
          ],
          correctIndex: 1,
          explanation: "A period in grid-template-areas represents a cell that is intentionally left empty with no named area assigned to it."
        },
        {
          question: "What does grid-row: 2 / 4 do?",
          options: [
            "Places the item in row 2 and spans 4 rows",
            "Starts at row line 2 and ends at row line 4, spanning 2 rows",
            "Creates 2 to 4 rows automatically",
            "Sets the row height to 4px"
          ],
          correctIndex: 1,
          explanation: "grid-row: 2 / 4 places the item starting at row line 2 and ending at row line 4, covering 2 row tracks."
        },
        {
          question: "Which shorthand property sets both grid-row and grid-column?",
          options: ["grid-placement", "grid-position", "grid-area", "grid-span"],
          correctIndex: 2,
          explanation: "grid-area can be used as a shorthand for grid-row-start / grid-column-start / grid-row-end / grid-column-end."
        },
        {
          question: "Why is grid-template-areas considered highly readable?",
          options: [
            "It uses shorter property names",
            "It creates a visual ASCII map of the layout in the CSS",
            "It automatically generates HTML structure",
            "It loads faster than other grid properties"
          ],
          correctIndex: 1,
          explanation: "Template areas allow you to literally draw the layout structure in your CSS, making it instantly understandable at a glance."
        },
        {
          question: "Spot the bug: an item has grid-area: sidebar but the container has grid-template-areas with 'side-bar' (with a hyphen). What is the issue?",
          options: [
            "grid-area does not support hyphens",
            "The area name in grid-area does not match the name in grid-template-areas",
            "The container needs display: grid-areas",
            "Sidebar must be wrapped in quotes"
          ],
          correctIndex: 1,
          explanation: "Area names must match exactly between grid-template-areas and grid-area. 'sidebar' and 'side-bar' are different names."
        },
        {
          question: "A grid item spans 3 rows. Which property sets this?",
          options: ["row-span: 3", "grid-row: span 3", "rows: 3", "grid-template-rows: span 3"],
          correctIndex: 1,
          explanation: "grid-row: span 3 makes the item occupy 3 row tracks from its starting position."
        },
        {
          question: "In a 3-column layout, what does grid-column: 2 / -1 do?",
          options: [
            "Places the item in column 2 only",
            "Starts at column line 2 and stretches to the last column line",
            "Moves the item to the second to last column",
            "Creates a negative margin on the second column"
          ],
          correctIndex: 1,
          explanation: "Negative line numbers count from the end; -1 refers to the last grid line, so 2 / -1 spans from line 2 to the very end."
        },
        {
          question: "What must every area name in grid-template-areas be on the same row to form?",
          options: [
            "A valid CSS selector",
            "A rectangular shape",
            "A continuous line",
            "A square shape"
          ],
          correctIndex: 1,
          explanation: "Named areas in grid-template-areas must form rectangles — L-shaped or disconnected areas are not valid."
        },
        {
          question: "Which property on a grid item overrides the container's align-items for that specific item?",
          options: ["align-content", "align-items", "align-self", "place-items"],
          correctIndex: 2,
          explanation: "align-self on a grid item overrides the container's align-items setting for just that one item."
        },
        {
          question: "If you set grid-area: header on an item but forget grid-template-areas on the container, what happens?",
          options: [
            "The item moves to the top of the page",
            "An error is thrown",
            "The item is auto-placed and the name acts as an implicit name reference that creates implicit lines",
            "The item expands to fill the entire grid"
          ],
          correctIndex: 2,
          explanation: "Named grid-area values generate implicit named lines (header-start, header-end) but without grid-template-areas, the layout may not be as intended."
        },
        {
          question: "What value of grid-column places an item from the first line to the last line in a 4-column grid?",
          options: ["grid-column: 1 / 5", "grid-column: 1 / 4", "grid-column: full", "grid-column: span all"],
          correctIndex: 0,
          explanation: "A 4-column grid has 5 column lines; grid-column: 1 / 5 spans from the first to the last line, covering all 4 columns."
        },
        {
          question: "Which property controls where a grid item sits horizontally within its cell?",
          options: ["align-self", "justify-self", "place-self", "grid-column"],
          correctIndex: 1,
          explanation: "justify-self aligns a single grid item horizontally (inline axis) within its assigned grid cell."
        },
        {
          question: "How many area strings are needed in grid-template-areas for a 3-row layout?",
          options: ["1 string with spaces", "3 quoted strings", "A single array", "6 strings total"],
          correctIndex: 1,
          explanation: "Each row in the grid layout requires its own quoted string in grid-template-areas, so a 3-row layout needs 3 strings."
        },
        {
          question: "Fill in the blank: grid-column: 1 / _____ would span all 3 columns in a 3-column grid.",
          options: ["3", "4", "span 3", "end"],
          correctIndex: 1,
          explanation: "A 3-column grid has 4 column lines; to span all 3 columns you go from line 1 to line 4."
        },
        {
          question: "Can a grid item be placed on multiple named areas simultaneously?",
          options: [
            "Yes, by listing area names separated by commas",
            "No, a grid item can only be assigned to one named area",
            "Yes, using the grid-multi-area property",
            "Yes, if the areas are adjacent"
          ],
          correctIndex: 1,
          explanation: "Each grid item has exactly one grid-area value; you cannot assign it to multiple named areas at once."
        },
        {
          question: "What is the effect of justify-self: end on a grid item?",
          options: [
            "The item is aligned to the right end of its grid cell",
            "The item is pushed to the last row of the grid",
            "The item is aligned to the end of the main axis",
            "The item spans to the end of the grid"
          ],
          correctIndex: 0,
          explanation: "justify-self: end aligns the item to the end (right) of its grid cell on the inline axis."
        }
      ]
    },
    {
      id: "css-layout-media-queries",
      title: "Responsive Design and Media Queries",
      explanation: "Responsive design is the practice of building webpages that look great on screens of all sizes — from a tiny smartphone in a pocket to a giant desktop monitor. Rather than creating separate websites for each device, you write a single codebase that adapts to whatever screen it is viewed on. The cornerstone of responsive design in CSS is the media query.\n\nA media query is a conditional block of CSS that applies its styles only when certain conditions about the user's environment are true. The most common condition is the width of the browser viewport. The syntax looks like this:\n\n@media (max-width: 768px) {\n  .container { flex-direction: column; }\n}\n\nThis rule says: when the viewport is 768 pixels wide or narrower, apply the flex-direction: column style. At viewport widths wider than 768px, the rule is completely ignored. The value 768px is called a breakpoint.\n\nThere are two main philosophies for writing responsive CSS: mobile-first and desktop-first. In a mobile-first approach, you write your base styles for small screens, then use min-width media queries to add styles as screens get larger. In a desktop-first approach, you write for large screens first and use max-width queries to override for smaller screens. Mobile-first is generally recommended because it forces you to focus on essential content first.\n\nBreakpoints are the specific viewport widths where your layout changes. Common breakpoints roughly correspond to device sizes: around 480px for large phones, 768px for tablets, 1024px for small desktops, and 1280px for large desktops. Modern approaches often use content-based breakpoints — you add a breakpoint wherever your layout starts to look awkward, rather than tying them to specific devices.\n\nMedia queries can check more than just width. You can query height with min-height and max-height, check the device orientation with (orientation: portrait) or (orientation: landscape), and even check user preferences like (prefers-color-scheme: dark) for implementing dark mode.\n\nResponsive design also involves other techniques beyond media queries: using relative units like percentages and em instead of fixed pixels, setting images to max-width: 100% so they never overflow their container, and using flexible layouts like Flexbox and Grid that naturally adapt to different sizes.",
      htmlExample: `<div class="responsive-container">
  <header class="resp-header">My Website</header>
  <div class="resp-layout">
    <nav class="resp-nav">
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
    <main class="resp-main">
      <p>This layout adapts to the screen width.
      On wide screens the nav sits beside the content.
      On narrow screens they stack vertically.</p>
    </main>
  </div>
</div>`,
      cssExample: `.responsive-container {
  max-width: 900px;
  margin: 0 auto;
}

.resp-header {
  background: #2c3e50;
  color: white;
  padding: 16px;
  text-align: center;
  font-size: 1.4rem;
}

.resp-layout {
  display: flex;
  gap: 16px;
  padding: 16px;
}

.resp-nav {
  width: 160px;
  flex-shrink: 0;
  background: #ecf0f1;
  padding: 12px;
}

.resp-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.resp-nav li {
  padding: 8px 0;
  border-bottom: 1px solid #bdc3c7;
}

.resp-main {
  flex: 1;
  background: #f8f9fa;
  padding: 16px;
}

@media (max-width: 600px) {
  .resp-layout {
    flex-direction: column;
  }
  .resp-nav {
    width: 100%;
  }
}`,
      exercises: [
        {
          title: "Responsive Card Grid",
          description: "Create a grid of 6 cards using display: grid with grid-template-columns: repeat(3, 1fr) for desktop. Add a media query at max-width: 768px that changes it to repeat(2, 1fr), and another at max-width: 480px that changes it to 1fr (a single column).",
          hint: "Start with the 3-column grid as the base style, then add @media (max-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } } and another for 480px with a single column."
        },
        {
          title: "Mobile Navigation Toggle",
          description: "Create a navigation bar that shows links horizontally on wide screens (display: flex). On screens narrower than 600px, hide the nav links (display: none) and show a hamburger icon (three stacked divs) instead. Use a media query to swap what is visible.",
          hint: "Give the links .nav-links and give the hamburger .hamburger. By default show .nav-links as flex and set .hamburger { display: none }. In your media query at 600px, reverse these so .hamburger is shown and .nav-links is hidden."
        }
      ],
      quiz: [
        {
          question: "What is a media query in CSS?",
          options: [
            "A JavaScript function for detecting screen size",
            "A conditional CSS block that applies styles based on the user's environment",
            "A way to load different HTML files for different devices",
            "A server-side technique for detecting mobile browsers"
          ],
          correctIndex: 1,
          explanation: "A media query is a CSS feature that conditionally applies styles based on characteristics of the device or viewport."
        },
        {
          question: "Which media query applies styles only when the viewport is 600px or narrower?",
          options: [
            "@media (min-width: 600px)",
            "@media (max-width: 600px)",
            "@media screen (600px)",
            "@media (width: 600px)"
          ],
          correctIndex: 1,
          explanation: "max-width: 600px means the styles apply when the viewport width is 600px or less."
        },
        {
          question: "What is a breakpoint in responsive design?",
          options: [
            "A bug that causes the layout to break",
            "A specific viewport width where the layout changes",
            "A point where JavaScript takes over from CSS",
            "The maximum width of a container"
          ],
          correctIndex: 1,
          explanation: "A breakpoint is the viewport width value at which a media query triggers and the layout adapts to the new screen size."
        },
        {
          question: "What does the mobile-first approach mean in responsive design?",
          options: [
            "Only building websites for mobile devices",
            "Writing base styles for small screens and adding complexity for larger screens with min-width queries",
            "Using a mobile framework like Bootstrap",
            "Writing CSS for desktop first, then removing styles for mobile"
          ],
          correctIndex: 1,
          explanation: "Mobile-first means starting with mobile-friendly base styles and progressively enhancing them for larger screens using min-width media queries."
        },
        {
          question: "Which query detects if the user prefers a dark color scheme?",
          options: [
            "@media (dark-mode: on)",
            "@media (theme: dark)",
            "@media (prefers-color-scheme: dark)",
            "@media (color: dark)"
          ],
          correctIndex: 2,
          explanation: "The prefers-color-scheme media feature detects if the user has set a dark theme preference in their operating system."
        },
        {
          question: "Which CSS technique prevents images from overflowing their containers on small screens?",
          options: [
            "img { position: absolute; }",
            "img { max-width: 100%; }",
            "img { width: fixed; }",
            "img { display: block; width: 0; }"
          ],
          correctIndex: 1,
          explanation: "max-width: 100% ensures an image never exceeds its container's width while still being flexible."
        },
        {
          question: "What does @media (orientation: landscape) target?",
          options: [
            "Devices held horizontally, where width is greater than height",
            "Desktop monitors only",
            "Devices with a camera",
            "Screens wider than 1024px"
          ],
          correctIndex: 0,
          explanation: "Landscape orientation means the device or viewport is wider than it is tall, typically a phone held sideways or a widescreen monitor."
        },
        {
          question: "In a mobile-first approach, which media query keyword is most commonly used?",
          options: ["max-width", "min-width", "screen-width", "device-width"],
          correctIndex: 1,
          explanation: "Mobile-first uses min-width queries to progressively add styles as screens get bigger, starting from the mobile base."
        },
        {
          question: "Spot the bug: @media max-width: 768px { .box { display: none; } } — the media query is not working. What is wrong?",
          options: [
            "display: none is not allowed inside media queries",
            "The condition must be wrapped in parentheses: @media (max-width: 768px)",
            "The unit px cannot be used in media queries",
            "Media queries need a semicolon at the start"
          ],
          correctIndex: 1,
          explanation: "Media query conditions must be enclosed in parentheses; the correct syntax is @media (max-width: 768px) { ... }."
        },
        {
          question: "What is the recommended meta tag needed in HTML for responsive design to work correctly on mobile browsers?",
          options: [
            "<meta name=\"charset\" content=\"UTF-8\">",
            "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
            "<meta name=\"mobile\" content=\"responsive\">",
            "<meta name=\"screen\" content=\"flexible\">"
          ],
          correctIndex: 1,
          explanation: "The viewport meta tag tells mobile browsers to set the viewport width to the device width instead of simulating a desktop screen."
        },
        {
          question: "Which media query applies styles only for screens larger than 1024px?",
          options: [
            "@media (max-width: 1024px)",
            "@media (min-width: 1024px)",
            "@media (width > 1024px)",
            "@media (screen: large)"
          ],
          correctIndex: 1,
          explanation: "min-width: 1024px means the styles apply when the viewport is 1024px wide or more."
        },
        {
          question: "Which of these is NOT a valid media query condition?",
          options: [
            "(max-width: 768px)",
            "(orientation: portrait)",
            "(prefers-color-scheme: dark)",
            "(font-size: 16px)"
          ],
          correctIndex: 3,
          explanation: "font-size is not a media feature you can query; media features test environment characteristics, not CSS property values."
        },
        {
          question: "You want different styles at widths between 600px and 900px. Which media query achieves this?",
          options: [
            "@media (min-width: 600px) and (max-width: 900px)",
            "@media (width: 600px to 900px)",
            "@media (between: 600px, 900px)",
            "@media (range: 600px 900px)"
          ],
          correctIndex: 0,
          explanation: "Using 'and' chains two conditions together; min-width: 600px and max-width: 900px targets only viewports in that range."
        },
        {
          question: "Fill in the blank: In a desktop-first approach, the base styles are for _____ screens and media queries use _____ to override for smaller screens.",
          options: [
            "small / min-width",
            "large / max-width",
            "medium / min-height",
            "all / orientation"
          ],
          correctIndex: 1,
          explanation: "Desktop-first starts with large-screen styles and uses max-width media queries to adjust layouts for progressively smaller screens."
        },
        {
          question: "A Flexbox container switches to flex-direction: column inside a media query. What does this accomplish?",
          options: [
            "Items become fixed in position",
            "Items stack vertically on smaller screens instead of sitting side by side",
            "The container's width becomes 100%",
            "Items are hidden on small screens"
          ],
          correctIndex: 1,
          explanation: "Changing to flex-direction: column inside a media query is a common technique for stacking horizontal layouts vertically on narrow screens."
        },
        {
          question: "What is the purpose of using relative units like percentages and em instead of fixed pixels in responsive design?",
          options: [
            "They load faster",
            "They scale proportionally with the viewport or font size, making layouts more flexible",
            "They are supported by more browsers",
            "They prevent the need for media queries"
          ],
          correctIndex: 1,
          explanation: "Relative units naturally adapt to different screen sizes and user preferences, reducing the need for as many media queries."
        },
        {
          question: "Which approach of responsive design is generally recommended for better performance?",
          options: ["Desktop-first", "Mobile-first", "Tablet-first", "Content-last"],
          correctIndex: 1,
          explanation: "Mobile-first is recommended because it starts with the simplest layout, ensuring mobile users download only what they need."
        },
        {
          question: "What does @media print { ... } apply to?",
          options: [
            "Styles for large screens",
            "Styles when the page is printed",
            "Styles when fonts are loading",
            "Styles on all media types"
          ],
          correctIndex: 1,
          explanation: "The 'print' media type applies styles specifically when the user sends the page to a printer or saves it as PDF."
        },
        {
          question: "A container has max-width: 1200px and margin: 0 auto. What does this achieve in responsive design?",
          options: [
            "The container is always 1200px wide",
            "The container fills the screen up to 1200px then stays centered at that maximum width",
            "The container is hidden on screens wider than 1200px",
            "The container shrinks on all screens"
          ],
          correctIndex: 1,
          explanation: "max-width: 1200px prevents the container from getting wider than 1200px, while margin: 0 auto keeps it centered in wider viewports."
        },
        {
          question: "Which media feature allows styles when the screen has sufficient resolution for fine details?",
          options: [
            "(resolution: high)",
            "(min-resolution: 2dppx)",
            "(pixel-ratio: 2)",
            "(display: retina)"
          ],
          correctIndex: 1,
          explanation: "min-resolution: 2dppx (or the equivalent -webkit-min-device-pixel-ratio: 2) targets high-DPI screens like Retina displays."
        }
      ]
    },
    {
      id: "css-layout-viewport-units",
      title: "Viewport Units and Responsive Sizing",
      explanation: "Viewport units are CSS length values that are relative to the size of the browser's viewport — the visible area of the webpage. Unlike percentages, which are relative to the parent element's size, viewport units always refer to the entire visible window. This makes them incredibly useful for full-screen sections, fluid typography, and sizing elements that should respond to the overall screen size rather than their container.\n\nThe four original viewport units are vw, vh, vmin, and vmax. The vw unit stands for 'viewport width' — 1vw is equal to 1% of the viewport width. So an element set to width: 50vw will always take up exactly half of the screen's visible width, regardless of where it is in the HTML structure. The vh unit works the same way for height: 100vh means the full visible height of the browser window.\n\nSetting an element to height: 100vh is the easiest way to create a hero section that fills the entire screen. The element will always be exactly as tall as the viewport, from top to bottom. This was previously very difficult to achieve with pure CSS.\n\nVmin takes the smaller of the two viewport dimensions. So if you are on a phone in portrait mode where the width is 390px and the height is 844px, 1vmin = 3.9px (1% of 390). On a landscape phone, the dimensions flip and the smaller dimension is the height. Vmax takes the larger of the two dimensions. These are great for ensuring elements remain proportional on both portrait and landscape screens.\n\nModern browsers support newer viewport units that address a long-standing issue: on mobile browsers, the viewport height can shift when the address bar appears and disappears while scrolling. The standard 100vh is based on the largest possible viewport height (as if the address bar were hidden). The newer svh (small viewport height) is based on the smallest viewport, dvh (dynamic viewport height) dynamically tracks the current actual height, and lvh (large viewport height) matches 100vh's behavior explicitly.\n\nFor fluid typography, the clamp() function is a powerful companion to viewport units. It takes three arguments: a minimum value, a preferred value, and a maximum value. For example, font-size: clamp(14px, 2.5vw, 22px) means the font will never be smaller than 14px, never larger than 22px, and will scale fluidly at 2.5vw between those bounds. This creates text that grows and shrinks with the viewport without abrupt jumps.",
      htmlExample: `<section class="hero-section">
  <div class="hero-content">
    <h1 class="fluid-title">Welcome to My Site</h1>
    <p class="fluid-text">This section fills the full viewport height.
    Resize the browser and notice how it adapts.</p>
  </div>
</section>

<div class="size-demo">
  <div class="vw-box">50vw wide</div>
  <div class="vh-box">30vh tall</div>
</div>`,
      cssExample: `.hero-section {
  height: 100vh;
  background: linear-gradient(135deg, #2c3e50, #4a90d9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  text-align: center;
  color: white;
  padding: 20px;
}

.fluid-title {
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
}

.fluid-text {
  font-size: clamp(0.9rem, 2vw, 1.2rem);
}

.size-demo {
  padding: 20px;
}

.vw-box {
  width: 50vw;
  background: #4a90d9;
  color: white;
  padding: 12px;
  margin-bottom: 10px;
  text-align: center;
}

.vh-box {
  height: 30vh;
  background: #e8a838;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}`,
      exercises: [
        {
          title: "Full-Screen Landing Page Section",
          description: "Create a hero section using height: 100vh with a gradient background. Center your name and a subtitle both horizontally and vertically using Flexbox. Make the heading use clamp(1.5rem, 4vw, 3rem) for fluid sizing.",
          hint: "Set height: 100vh on the section. Use display: flex, align-items: center, and justify-content: center to center content. Apply font-size: clamp(1.5rem, 4vw, 3rem) to your heading."
        },
        {
          title: "Fluid Typography Scale",
          description: "Create three headings (h1, h2, h3) and a paragraph. Apply clamp() font sizes to each: h1 should range from 2rem to 4rem with a viewport-relative preferred value, h2 from 1.5rem to 3rem, h3 from 1.2rem to 2rem, and p from 0.9rem to 1.1rem.",
          hint: "Use font-size: clamp(min, preferred, max) on each element. For the preferred value, try something like 4vw for h1, 3vw for h2, 2.5vw for h3, and 1.5vw for p."
        }
      ],
      quiz: [
        {
          question: "What does 1vw represent?",
          options: [
            "1 pixel of viewport width",
            "1% of the viewport width",
            "1% of the parent element's width",
            "1% of the screen's physical width"
          ],
          correctIndex: 1,
          explanation: "1vw equals 1% of the current viewport (browser window) width, regardless of element nesting."
        },
        {
          question: "Which viewport unit represents 1% of the viewport height?",
          options: ["vw", "vh", "vmin", "vmax"],
          correctIndex: 1,
          explanation: "vh stands for viewport height; 1vh is 1% of the total visible height of the browser window."
        },
        {
          question: "What does height: 100vh achieve on an element?",
          options: [
            "The element is always 100 pixels tall",
            "The element fills the full visible height of the browser viewport",
            "The element is 100% of its parent's height",
            "The element adapts to its content height"
          ],
          correctIndex: 1,
          explanation: "100vh makes the element exactly as tall as the visible viewport, perfect for hero sections that fill the screen."
        },
        {
          question: "What does vmin represent?",
          options: [
            "The minimum font size for the viewport",
            "1% of the smaller viewport dimension (width or height)",
            "The minimum viewport size supported by the browser",
            "1% of the viewport width, always"
          ],
          correctIndex: 1,
          explanation: "vmin takes 1% of whichever dimension is smaller — width or height — ensuring consistent sizing on both orientations."
        },
        {
          question: "How is vw different from a percentage width?",
          options: [
            "vw is always bigger than a percentage",
            "vw is relative to the viewport width; percentage width is relative to the parent element",
            "They are identical",
            "vw only works on block elements"
          ],
          correctIndex: 1,
          explanation: "A percentage width is relative to the containing parent, while vw is always relative to the full browser viewport width."
        },
        {
          question: "What is the clamp() function used for?",
          options: [
            "Clamping colors to specific ranges",
            "Setting a value that scales fluidly between a minimum and maximum",
            "Preventing overflow in containers",
            "Fixing elements to the viewport"
          ],
          correctIndex: 1,
          explanation: "clamp(min, preferred, max) allows a value to scale fluidly with a preferred (often viewport-relative) value while staying within bounds."
        },
        {
          question: "What does font-size: clamp(14px, 2vw, 24px) mean?",
          options: [
            "The font is always 2vw",
            "The font is 14px on small screens, grows up to 24px on large screens, and scales at 2vw in between",
            "The font switches between 14px and 24px at the 2vw breakpoint",
            "The font is 2% of the viewport width always"
          ],
          correctIndex: 1,
          explanation: "clamp ensures the font never goes below 14px or above 24px while ideally being 2vw — fluid scaling without abrupt jumps."
        },
        {
          question: "Which modern viewport unit dynamically tracks the current actual viewport height including address bar changes on mobile?",
          options: ["100vh", "dvh", "svh", "lvh"],
          correctIndex: 1,
          explanation: "dvh (dynamic viewport height) updates in real-time as the mobile browser chrome appears and disappears."
        },
        {
          question: "An element is set to width: 100vw. What potential issue might this cause?",
          options: [
            "The element becomes invisible",
            "The element may cause horizontal scrolling if the page also has a scrollbar",
            "The element will overflow its parent",
            "The element ignores CSS transforms"
          ],
          correctIndex: 1,
          explanation: "100vw includes the full viewport width; if the page has a vertical scrollbar, 100vw exceeds the content area and causes horizontal overflow."
        },
        {
          question: "Spot the bug: a developer sets height: 100% on a hero div expecting it to fill the screen, but it collapses to zero height. What is the issue?",
          options: [
            "100% is not a valid height value",
            "Percentage height requires the parent (and html/body) to also have a defined height",
            "height should be min-height instead",
            "The div needs display: flex"
          ],
          correctIndex: 1,
          explanation: "Percentage heights are relative to the parent's height. If the parent has no defined height, 100% of undefined is zero. Use 100vh instead for viewport-relative height."
        },
        {
          question: "What does vmax represent?",
          options: [
            "The maximum allowed viewport size",
            "1% of the larger of the two viewport dimensions",
            "The viewport width, always",
            "100% of the viewport height"
          ],
          correctIndex: 1,
          explanation: "vmax uses 1% of whichever viewport dimension is larger — width or height. On a landscape screen, vmax = vw."
        },
        {
          question: "Which value would create text that is exactly half the viewport width?",
          options: [
            "font-size: 50%",
            "font-size: 50vw",
            "font-size: 0.5em",
            "font-size: 50px"
          ],
          correctIndex: 1,
          explanation: "font-size: 50vw makes the font size 50% of the viewport width, which would be extremely large — demonstrating the scale of vw for typography."
        },
        {
          question: "Why might you prefer clamp() for font-size over viewport units alone?",
          options: [
            "clamp() is faster to compute",
            "clamp() prevents the text from becoming unreadably small or large",
            "clamp() works in older browsers",
            "clamp() automatically generates media queries"
          ],
          correctIndex: 1,
          explanation: "Viewport units alone can make text too small on tiny screens or too huge on large ones; clamp() sets safe minimum and maximum bounds."
        },
        {
          question: "On a viewport that is 1000px wide and 600px tall, what is 10vmin?",
          options: ["60px", "100px", "10px", "6px"],
          correctIndex: 0,
          explanation: "vmin uses the smaller dimension; here height (600px) is smaller, so 1vmin = 6px and 10vmin = 60px."
        },
        {
          question: "What is svh (small viewport height) based on?",
          options: [
            "The smallest possible device height",
            "The viewport height when the browser chrome (address bar) is fully visible",
            "50% of the standard viewport height",
            "The viewport height on the smallest supported device"
          ],
          correctIndex: 1,
          explanation: "svh is calculated from the smallest viewport height, which occurs when the browser address bar is fully expanded and taking up space."
        },
        {
          question: "An element has width: 50vw and margin: 0 auto. What happens?",
          options: [
            "The element is 50% of the viewport wide and centered horizontally",
            "The element is 50% of its parent wide and centered",
            "margin: auto does not work with vw units",
            "The element collapses because vw and margin conflict"
          ],
          correctIndex: 0,
          explanation: "50vw sets the width to half the viewport, and margin: 0 auto centers a block element horizontally within its parent container."
        },
        {
          question: "Fill in the blank: 1vh = 1% of the _____ height.",
          options: ["parent element's", "document's total", "viewport's visible", "screen's physical"],
          correctIndex: 2,
          explanation: "vh is based on the visible area of the browser window (viewport), not the entire document or physical screen."
        },
        {
          question: "What would font-size: 5vw look like on a 320px wide mobile screen?",
          options: ["5px", "16px", "32px", "50px"],
          correctIndex: 1,
          explanation: "5vw = 5% of 320px = 16px, which is a comfortable reading size — showing why vw can work well for fluid typography."
        },
        {
          question: "What is the primary advantage of using viewport units over media queries for responsive sizing?",
          options: [
            "Viewport units load faster",
            "Viewport units provide continuous smooth scaling without abrupt breakpoint jumps",
            "Viewport units work without any CSS",
            "Viewport units replace the need for flexible layouts"
          ],
          correctIndex: 1,
          explanation: "Viewport units scale smoothly and continuously as the viewport changes, avoiding the sudden layout jumps that occur at media query breakpoints."
        },
        {
          question: "Which combination of properties would create a square element that is always 20% of the smaller viewport dimension?",
          options: [
            "width: 20vw; height: 20vh",
            "width: 20vmin; height: 20vmin",
            "width: 20%; height: 20%",
            "width: 20vmax; height: 20vmax"
          ],
          correctIndex: 1,
          explanation: "Using the same vmin value for both width and height creates a square that proportionally fits the smaller viewport dimension, maintaining aspect ratio across orientations."
        }
      ]
    },
    {
      id: "css-layout-z-index",
      title: "Z-index and Stacking Context",
      explanation: "Webpages are two-dimensional surfaces on your screen, but CSS allows elements to overlap in a third dimension — depth. Think of it like placing pieces of paper on a desk: some sheets sit on top of others. The z-index property controls this third dimension, letting you decide which elements appear in front of others.\n\nZ-index only works on elements that have a position value other than static — so relative, absolute, fixed, or sticky. On static elements, z-index is completely ignored. The property accepts integer values: higher numbers appear in front, lower numbers appear behind. Negative values push elements behind the normal document flow.\n\nBy default, when elements overlap without explicit z-index values, they follow source order: elements that appear later in the HTML are painted on top of earlier elements. When you set a z-index, you override this natural stacking order.\n\nThe real complexity of z-index comes from the concept of stacking contexts. A stacking context is like a separate stack of papers that exists independently from everything else on the desk. Each stacking context has its own internal stacking order, and z-index values inside one context never compete with z-index values in another context. The entire context is stacked as a single unit relative to other stacking contexts.\n\nSeveral things create a new stacking context: setting position with a z-index value other than auto, setting opacity to less than 1, using transform, filter, will-change, or isolation: isolate, among others. The last one — isolation: isolate — exists specifically to create a stacking context without any visible side effects, making it a clean tool for containing z-index issues.\n\nA common debugging scenario: a developer sets z-index: 9999 on a modal but it still appears behind another element. The problem is usually that the modal is inside a stacking context with a lower z-index than the element covering it. No matter how high you set the internal z-index, the entire stacking context containing the modal sits beneath the other one.\n\nTo fix z-index bugs, trace up the DOM tree to find all positioned ancestors with explicit z-index values. The fix often involves moving the modal to a higher level in the DOM (often directly inside the body element), or reducing the z-index on the interfering parent stacking context.",
      htmlExample: `<div class="stacking-demo">
  <div class="box box-bottom">Bottom (z-index: 1)</div>
  <div class="box box-middle">Middle (z-index: 2)</div>
  <div class="box box-top">Top (z-index: 3)</div>
</div>

<div class="context-demo">
  <div class="context-parent">
    Parent (z-index: 1)
    <div class="context-child">Child (z-index: 100)<br>Still behind next sibling</div>
  </div>
  <div class="blocking-sibling">Sibling (z-index: 2)</div>
</div>`,
      cssExample: `.stacking-demo {
  position: relative;
  height: 100px;
  margin-bottom: 120px;
}

.box {
  position: absolute;
  width: 160px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  border-radius: 4px;
}

.box-bottom {
  z-index: 1;
  background: #2c3e50;
  top: 0;
  left: 0;
}

.box-middle {
  z-index: 2;
  background: #4a90d9;
  top: 20px;
  left: 40px;
}

.box-top {
  z-index: 3;
  background: #e74c3c;
  top: 40px;
  left: 80px;
}

.context-demo {
  position: relative;
  padding: 10px;
}

.context-parent {
  position: relative;
  z-index: 1;
  background: #e8f4fd;
  padding: 10px;
  width: 200px;
  border: 2px solid #4a90d9;
}

.context-child {
  position: absolute;
  z-index: 100;
  background: #f39c12;
  color: white;
  padding: 6px;
  top: 30px;
  left: 20px;
  font-size: 0.7rem;
}

.blocking-sibling {
  position: absolute;
  z-index: 2;
  background: #2c3e50;
  color: white;
  padding: 12px;
  top: 10px;
  left: 100px;
  width: 160px;
}`,
      exercises: [
        {
          title: "Layered Card with Badge",
          description: "Create a card with a notification badge that overlaps the top-right corner. The card should have a slightly offset shadow div behind it (z-index: 0), the card itself at z-index: 1, and the badge at z-index: 2. Observe how z-index controls the layering.",
          hint: "Set position: relative on a wrapper, then use position: absolute on the shadow and badge. Assign z-index: 0 to the shadow, z-index: 1 to the card, and z-index: 2 to the badge."
        },
        {
          title: "Isolated Stacking Context",
          description: "Create two overlapping sections. Inside the first section, place an element with a very high z-index (like 999). Notice it may overlap the second section. Add isolation: isolate to the first section to contain its stacking context, preventing the child from escaping.",
          hint: "Set isolation: isolate on the section to create a self-contained stacking context. Elements inside will no longer escape to compete with elements outside the section."
        }
      ],
      quiz: [
        {
          question: "On which type of element does z-index have no effect?",
          options: [
            "Elements with display: block",
            "Elements with position: static",
            "Elements with opacity: 1",
            "Elements with float: left"
          ],
          correctIndex: 1,
          explanation: "z-index only works on positioned elements (position: relative/absolute/fixed/sticky); it is ignored on static elements."
        },
        {
          question: "What does a higher z-index value mean?",
          options: [
            "The element appears behind elements with lower z-index",
            "The element appears in front of elements with lower z-index",
            "The element is further from the viewport",
            "The element is scaled up in size"
          ],
          correctIndex: 1,
          explanation: "Higher z-index values place elements closer to the viewer, on top of elements with lower z-index values."
        },
        {
          question: "What is a stacking context?",
          options: [
            "The CSS property that creates layers",
            "An independent layer in which elements are stacked relative to each other",
            "A JavaScript framework for managing z-index",
            "The default stacking order of the document"
          ],
          correctIndex: 1,
          explanation: "A stacking context is a self-contained group of elements that are stacked as a unit; z-index values inside do not compete with those outside."
        },
        {
          question: "What is the default stacking order when no z-index is set and elements overlap?",
          options: [
            "Earlier elements in HTML appear in front",
            "Later elements in HTML appear in front",
            "Larger elements appear in front",
            "Block elements appear in front of inline elements"
          ],
          correctIndex: 1,
          explanation: "Without explicit z-index, source order determines stacking; elements later in the HTML paint on top of earlier ones."
        },
        {
          question: "Which property creates a stacking context as a side effect when set to a value less than 1?",
          options: ["z-index", "opacity", "visibility", "display"],
          correctIndex: 1,
          explanation: "Setting opacity to any value less than 1 creates a new stacking context, which can affect how z-index works for descendants."
        },
        {
          question: "Why might z-index: 9999 on a modal still appear behind another element?",
          options: [
            "9999 is too high a value",
            "The modal is inside a stacking context that itself has a lower z-index than the other element",
            "Modals cannot use z-index",
            "The browser ignores z-index on large elements"
          ],
          correctIndex: 1,
          explanation: "If the modal is inside a stacking context with a low z-index, the entire context sits behind the other element regardless of the internal z-index."
        },
        {
          question: "What is the simplest way to create a stacking context without any visual side effects?",
          options: [
            "position: relative; z-index: 0",
            "opacity: 0.99",
            "isolation: isolate",
            "transform: translate(0, 0)"
          ],
          correctIndex: 2,
          explanation: "isolation: isolate is designed specifically to create a stacking context with no visual changes to the element, making it the cleanest option."
        },
        {
          question: "Can z-index accept negative values?",
          options: [
            "No, z-index must be a positive integer",
            "Yes, negative values place elements behind the normal document flow",
            "Yes, but only on flex items",
            "No, negative values reset z-index to 0"
          ],
          correctIndex: 1,
          explanation: "Negative z-index values are valid and push an element behind the normal document flow and its parent background."
        },
        {
          question: "Spot the bug: an element has z-index: 10 but it is not stacking correctly. The developer checks and the element has no position set. What is the fix?",
          options: [
            "Increase z-index to 100",
            "Add position: relative to the element",
            "Add display: block to the element",
            "Remove the z-index and use order instead"
          ],
          correctIndex: 1,
          explanation: "z-index requires the element to be positioned (any value other than static). Adding position: relative activates z-index without visually moving the element."
        },
        {
          question: "Which CSS property, when applied to a parent, can trap a child's high z-index within that parent's stacking context?",
          options: [
            "overflow: hidden",
            "position: relative with a z-index value",
            "display: flex",
            "margin: auto"
          ],
          correctIndex: 1,
          explanation: "A parent with position and a z-index value other than auto creates a stacking context, confining children's z-index values to that context."
        },
        {
          question: "An element with z-index: 5 is inside a stacking context with z-index: 1. Another element outside has z-index: 2. Which appears on top?",
          options: [
            "The element with z-index: 5",
            "The element with z-index: 2",
            "They are at the same level",
            "The first element in the HTML"
          ],
          correctIndex: 1,
          explanation: "The entire stacking context (z-index: 1) is compared against the outside element (z-index: 2); the stacking context loses, bringing all its children below z-index: 2."
        },
        {
          question: "Which of the following does NOT create a new stacking context?",
          options: [
            "opacity: 0.5",
            "transform: rotate(0deg)",
            "position: relative with no z-index",
            "isolation: isolate"
          ],
          correctIndex: 2,
          explanation: "position: relative alone does not create a stacking context; z-index must also be set (to a non-auto value) to create one."
        },
        {
          question: "What value of z-index is the auto default equivalent to?",
          options: [
            "0 but within the parent's stacking context",
            "1 on all elements",
            "-1",
            "It creates its own stacking context at level 0"
          ],
          correctIndex: 0,
          explanation: "z-index: auto means the element does not create a new stacking context; it participates in the parent's stacking context at level 0."
        },
        {
          question: "Fill in the blank: For z-index to work, the element must have a position value of _____, _____, _____, or _____.",
          options: [
            "block / inline / flex / grid",
            "relative / absolute / fixed / sticky",
            "static / relative / absolute / fixed",
            "inherit / initial / unset / revert"
          ],
          correctIndex: 1,
          explanation: "z-index activates only on positioned elements: relative, absolute, fixed, or sticky. Static elements ignore z-index."
        },
        {
          question: "What does z-index: -1 do to an element?",
          options: [
            "Hides the element completely",
            "Moves the element behind its parent background if the parent creates a stacking context",
            "Makes the element fully transparent",
            "Removes the element from the DOM"
          ],
          correctIndex: 1,
          explanation: "A negative z-index can place an element below its parent's background, but the exact behavior depends on whether the parent has a stacking context."
        },
        {
          question: "Which of the following creates a stacking context?",
          options: [
            "display: block",
            "margin: 0 auto",
            "filter: blur(2px)",
            "padding: 20px"
          ],
          correctIndex: 2,
          explanation: "CSS filter with any value other than none creates a new stacking context, which is a common source of unexpected z-index behavior."
        },
        {
          question: "What is the best practice for placing a modal overlay that must appear above all other page content?",
          options: [
            "Nest it deep inside the main content with z-index: 9999",
            "Place it as a direct child of the body element with a high z-index",
            "Use position: static with a very high z-index",
            "Wrap the rest of the page in a div with opacity: 0"
          ],
          correctIndex: 1,
          explanation: "Placing a modal directly inside body avoids stacking context traps and ensures its z-index competes at the root level."
        },
        {
          question: "What does will-change: transform do in relation to stacking contexts?",
          options: [
            "It has no effect on stacking",
            "It creates a new stacking context as a side effect",
            "It forces the element to z-index: 0",
            "It merges the element into the parent stacking context"
          ],
          correctIndex: 1,
          explanation: "will-change: transform (and will-change: opacity) create a new stacking context as a browser optimization side effect."
        },
        {
          question: "Two elements A and B are siblings. A has z-index: 3 and B has z-index: 1. B has a child C with z-index: 10. Which element is in front?",
          options: [
            "C, because it has the highest z-index",
            "A, because its stacking context (z-index: 3) beats B's stacking context (z-index: 1)",
            "B, because it contains element C",
            "All three are at the same level"
          ],
          correctIndex: 1,
          explanation: "The stacking contexts (A at z-index:3 vs B at z-index:1) compete first; A wins, so A appears above everything inside B including C."
        },
        {
          question: "What is the most common reason experienced developers use isolation: isolate?",
          options: [
            "To speed up rendering",
            "To prevent child elements' z-index values from affecting elements outside the parent",
            "To force block formatting context",
            "To enable CSS animations on nested elements"
          ],
          correctIndex: 1,
          explanation: "isolation: isolate cleanly contains a component's z-index stack, preventing it from accidentally layering above or below unrelated page elements."
        }
      ]
    }
  ]
};
