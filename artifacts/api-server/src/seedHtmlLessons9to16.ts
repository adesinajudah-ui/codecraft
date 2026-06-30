import { db } from "@workspace/db";
import {
  languagesTable,
  coursesTable,
  lessonsTable,
  quizzesTable,
  quizQuestionsTable,
} from "@workspace/db";
import { eq } from "drizzle-orm";

export async function seedHtmlLessons9to16() {
  const [htmlLang] = await db
    .select()
    .from(languagesTable)
    .where(eq(languagesTable.slug, "html"))
    .limit(1);

  if (!htmlLang) throw new Error("HTML language not found. Run main seed first.");

  const existing = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.title, "HTML Lesson 9: Text Formatting"))
    .limit(1);

  if (existing.length > 0) {
    console.log("HTML Lessons 9–16 already seeded. Skipping.");
    return { message: "Already seeded" };
  }

  console.log("Seeding HTML Lessons 9–16...");

  // ── LESSON 9: Text Formatting ─────────────────────────────────────
  const [c9] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 9: Text Formatting",
    description: "Master every HTML text-formatting tag — bold, italic, underline, strikethrough, superscript, subscript, code, and more — and know when to use each one.",
    level: "beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c9.id,
    title: "Text Formatting",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Text Formatting Practice</title>
  </head>
  <body>

    <h1>HTML Text Formatting Tags</h1>

    <!-- Bold / Strong -->
    <p><b>b tag: visually bold only</b></p>
    <p><strong>strong tag: bold + semantic importance</strong></p>

    <!-- Italic / Emphasis -->
    <p><i>i tag: visually italic only</i></p>
    <p><em>em tag: italic + semantic emphasis</em></p>

    <!-- Underline and Strikethrough -->
    <p><u>u tag: underlined text</u></p>
    <p><s>s tag: strikethrough (removed/outdated content)</s></p>

    <!-- Superscript and Subscript -->
    <p>E = mc<sup>2</sup> (superscript)</p>
    <p>H<sub>2</sub>O (subscript)</p>

    <!-- Code and Preformatted -->
    <p>Use the <code>console.log()</code> function to debug.</p>
    <pre>
function hello() {
  console.log("Hello, World!");
}
    </pre>

    <!-- Highlight and Small -->
    <p>This is <mark>highlighted text</mark> using the mark tag.</p>
    <p>Normal text. <small>Small print / fine print text.</small></p>

    <!-- Quotations -->
    <p>Tim said: <q>The web is for everyone.</q></p>
    <blockquote>
      "The greatest glory in living lies not in never falling,
       but in rising every time we fall." — Nelson Mandela
    </blockquote>

    <!-- Abbreviation -->
    <p><abbr title="HyperText Markup Language">HTML</abbr> is the language of the web.</p>

    <!-- Try It: Add your own text using at least 4 different formatting tags -->

  </body>
</html>`,
    content: `\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  LESSON 9 \u2014 TEXT FORMATTING
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

\ud83c\udfaf LEARNING OBJECTIVES
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
After completing this lesson, you will be able to:
  \u2022 Distinguish semantic tags (<strong>, <em>) from visual tags (<b>, <i>)
  \u2022 Apply bold, italic, underline, and strikethrough formatting correctly
  \u2022 Use superscript and subscript for math and science notation
  \u2022 Display inline code and preformatted blocks with <code> and <pre>
  \u2022 Mark highlighted text, small print, and abbreviations
  \u2022 Format quotations with <q> and <blockquote>

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

SEMANTIC vs. VISUAL FORMATTING
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
HTML has two categories of formatting tags:

  SEMANTIC tags carry MEANING \u2014 they tell the browser (and screen
  readers, search engines) WHY the text is formatted this way.

  VISUAL tags carry only APPEARANCE \u2014 they say HOW the text looks
  but give no hint about the reason.

  Semantic: <strong>, <em>, <mark>, <abbr>, <blockquote>
  Visual:   <b>, <i>, <u>, <s>

Always prefer semantic tags when the meaning matters.
Use visual tags only for purely decorative styling (though CSS is
usually better for that anyway).

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

BOLD FORMATTING
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  <b>     \u2014 Bold text, visual only. No semantic meaning.
            Use for keywords, product names, or UI labels.
            Example: <b>Username:</b> jsmith

  <strong> \u2014 Bold text WITH semantic importance.
            Screen readers may announce it with emphasis.
            Use when the content is critically important.
            Example: <strong>Warning: Do not delete this file!</strong>

Rule of thumb: Use <strong> when you want to signal importance.
               Use <b> purely for visual bold with no extra meaning.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

ITALIC FORMATTING
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  <i>  \u2014 Italic text, visual only.
         Use for: book/film titles, foreign words, technical terms.
         Example: <i>The Great Gatsby</i>

  <em> \u2014 Italic text with semantic EMPHASIS.
         Screen readers stress it when reading aloud.
         Example: You should <em>really</em> save your work!

Rule of thumb: Use <em> when you mean emphasis in speech.
               Use <i> for titles, foreign phrases, or technical terms.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

UNDERLINE AND STRIKETHROUGH
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  <u>  \u2014 Underlines text. Use sparingly \u2014 underline often implies
         a hyperlink. Good use: spell-check marks, proper nouns.
         Example: <u>naieve</u> should be "naive"

  <s>  \u2014 Strikethrough. Indicates content is no longer accurate
         or relevant but is kept for context.
         Example: <s>$99.99</s> Now only $49.99!

  <del> \u2014 Deleted content (semantic). Shown with strikethrough.
          Used in document edits, diffs, track changes.

  <ins> \u2014 Inserted content (semantic). Shown with underline.
          Companion to <del> in tracked changes.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

SUPERSCRIPT AND SUBSCRIPT
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  <sup> \u2014 Superscript: raised above the normal text line.
          Use for: exponents, ordinals, footnotes.
          Examples:
            E = mc<sup>2</sup>          (exponent)
            The 1<sup>st</sup> place winner  (ordinal)
            See footnote<sup>[1]</sup>    (footnote reference)

  <sub> \u2014 Subscript: lowered below the normal text line.
          Use for: chemical formulas, math notation.
          Examples:
            H<sub>2</sub>O         (water)
            CO<sub>2</sub>         (carbon dioxide)
            log<sub>2</sub>(n)     (logarithm base)

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

CODE AND PREFORMATTED TEXT
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  <code>  \u2014 Inline code snippet. Displayed in a monospace font.
            Use for: variable names, function names, short snippets.
            Example: Use <code>innerHTML</code> to set content.

  <pre>   \u2014 Preformatted text. Preserves ALL spaces and line breaks
            exactly as written. Usually combined with <code>.
            Use for: multi-line code blocks, ASCII art, config files.

  <kbd>   \u2014 Keyboard input. Represents user key presses.
            Example: Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.

  <samp>  \u2014 Sample output from a program or system.
            Example: The terminal shows: <samp>Hello World</samp>

  <var>   \u2014 A mathematical or programming variable.
            Example: The value of <var>x</var> must be positive.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

HIGHLIGHT, SMALL, AND ABBREVIATIONS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  <mark>  \u2014 Highlights text with a yellow background by default.
            Use for: search results, relevant passages, key terms.
            Example: The answer is <mark>42</mark>.

  <small> \u2014 Smaller text. Useful for fine print, copyright, captions.
            Example: <small>&copy; 2024 CodeCraft. All rights reserved.</small>

  <abbr>  \u2014 Abbreviation or acronym. The title attribute provides the
            full expansion, shown as a tooltip on hover.
            Example: <abbr title="Cascading Style Sheets">CSS</abbr>

  <cite>  \u2014 Title of a creative work (book, article, film).
            Rendered in italics by browsers.
            Example: <cite>Clean Code</cite> by Robert C. Martin.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

QUOTATIONS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  <q>           \u2014 Short inline quotation. Browser auto-adds
                  quotation marks.
                  Example: She said <q>HTML is amazing!</q>

  <blockquote>  \u2014 Long block-level quotation. Indented by default.
                  Use the cite attribute to credit the source.
                  Example:
                    <blockquote cite="https://www.example.com">
                      "Knowledge is power."
                    </blockquote>

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udcdd PRACTICE QUESTIONS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
1. What is the difference between <b> and <strong>?
   Answer: <b> is purely visual bold; <strong> conveys importance semantically.

2. Which tag preserves all whitespace and line breaks exactly?
   Answer: <pre> (preformatted text)

3. How do you write H2O with correct subscript?
   Answer: H<sub>2</sub>O

4. What attribute on <abbr> provides the full expansion?
   Answer: title \u2014 e.g., <abbr title="HyperText Markup Language">HTML</abbr>

5. Which tag is used for short inline quotations?
   Answer: <q> \u2014 the browser automatically adds quotation marks.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udcbb CODING EXERCISES
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Exercise 1: Format the following sentence correctly:
  "Warning: Never share your password."
  Answer: <strong>Warning:</strong> Never share your <em>password</em>.

Exercise 2: Display this formula: E = mc squared
  Answer: E = mc<sup>2</sup>

Exercise 3: Display this formula: Carbon Dioxide (CO2)
  Answer: CO<sub>2</sub>

Exercise 4: Mark the answer in a search result:
  "The capital of France is Paris."
  Answer: The capital of France is <mark>Paris</mark>.

Exercise 5: Display a keyboard shortcut:
  "Press Ctrl+Z to undo."
  Answer: Press <kbd>Ctrl</kbd>+<kbd>Z</kbd> to undo.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udd2c TRY IT YOURSELF
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
The code editor shows a full page of formatting tags. Try:
  1. Add a <blockquote> with your favourite quote and credit the author
  2. Display the Pythagorean theorem: a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>
  3. Use <del> and <ins> to show a price change: was $100, now $79
  4. Use <abbr> for at least two acronyms on your page
  5. Write a code snippet using <code> and a multi-line block using <pre>

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udccc LESSON SUMMARY
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  \u2713 <strong>/<b> for bold; prefer <strong> for important content
  \u2713 <em>/<i> for italic; prefer <em> for spoken emphasis
  \u2713 <u> for underline; <s>/<del> for strikethrough
  \u2713 <sup> for superscript (exponents); <sub> for subscript (formulas)
  \u2713 <code> for inline code; <pre> for multi-line code blocks
  \u2713 <mark> highlights text; <small> reduces text size
  \u2713 <abbr title="..."> provides full expansion on hover
  \u2713 <q> for inline quotes; <blockquote> for long quotes
  \u2713 Semantic tags (<strong>, <em>, <mark>) carry meaning for accessibility

\u2192 Next Lesson: Colors in HTML`,
  });

  const [q9] = await db.insert(quizzesTable).values({ courseId: c9.id, title: "Text Formatting \u2014 Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q9.id, question: "Which tag makes text bold AND conveys semantic importance?", options: ["<b>", "<strong>", "<bold>", "<em>"], correctIndex: 1 },
    { quizId: q9.id, question: "Which tag makes text italic AND conveys semantic emphasis?", options: ["<i>", "<em>", "<italic>", "<b>"], correctIndex: 1 },
    { quizId: q9.id, question: "What is the difference between <b> and <strong>?", options: ["<b> is newer; <strong> is deprecated", "<b> is visual only; <strong> adds semantic importance", "They are identical", "<strong> only works in headings"], correctIndex: 1 },
    { quizId: q9.id, question: "Which tag is used to display superscript text (e.g., exponents)?", options: ["<sup>", "<super>", "<up>", "<exp>"], correctIndex: 0 },
    { quizId: q9.id, question: "Which tag is used to display subscript text (e.g., chemical formulas)?", options: ["<low>", "<sub>", "<subscript>", "<down>"], correctIndex: 1 },
    { quizId: q9.id, question: "How would you correctly write H2O in HTML?", options: ["H<sub>2</sub>O", "H<sup>2</sup>O", "H<small>2</small>O", "H2O"], correctIndex: 0 },
    { quizId: q9.id, question: "Which tag preserves all whitespace and line breaks exactly as written?", options: ["<code>", "<pre>", "<text>", "<format>"], correctIndex: 1 },
    { quizId: q9.id, question: "Which tag is used for an inline code snippet?", options: ["<code>", "<pre>", "<kbd>", "<samp>"], correctIndex: 0 },
    { quizId: q9.id, question: "What does the <mark> tag do?", options: ["Makes text bold", "Highlights text (yellow background by default)", "Underlines text", "Makes text italic"], correctIndex: 1 },
    { quizId: q9.id, question: "Which tag shows text that has been deleted (strikethrough with semantic meaning)?", options: ["<s>", "<del>", "<strike>", "<remove>"], correctIndex: 1 },
    { quizId: q9.id, question: "Which attribute on <abbr> provides the full expansion of an acronym?", options: ["alt", "href", "title", "label"], correctIndex: 2 },
    { quizId: q9.id, question: "Which tag is best for an inline short quotation?", options: ["<quote>", "<blockquote>", "<q>", "<cite>"], correctIndex: 2 },
    { quizId: q9.id, question: "Which tag is best for a long block-level quotation?", options: ["<q>", "<blockquote>", "<quote>", "<p>"], correctIndex: 1 },
    { quizId: q9.id, question: "The <kbd> tag is used for:", options: ["Keyboard input (key presses)", "Inline code", "Bold text", "Sample program output"], correctIndex: 0 },
    { quizId: q9.id, question: "The <small> tag is typically used for:", options: ["Making headings smaller", "Fine print and copyright notices", "Subscript text", "Code snippets"], correctIndex: 1 },
    { quizId: q9.id, question: "Which tag represents the title of a creative work (book, film)?", options: ["<title>", "<em>", "<cite>", "<i>"], correctIndex: 2 },
    { quizId: q9.id, question: "Why should you avoid overusing <u> (underline)?", options: ["It breaks the page layout", "Underline visually implies a hyperlink and can confuse users", "It is deprecated in HTML5", "Browsers ignore it"], correctIndex: 1 },
    { quizId: q9.id, question: "Which pair of tags would you use to show a price drop: was $99, now $59?", options: ["<b>$99</b> <i>$59</i>", "<del>$99</del> <ins>$59</ins>", "<s>$99</s> <mark>$59</mark>", "<strike>$99</strike> $59"], correctIndex: 1 },
    { quizId: q9.id, question: "Semantic formatting tags benefit:", options: ["Only search engines", "Only screen reader users", "Search engines, screen readers, and developer clarity", "Only visual design"], correctIndex: 2 },
    { quizId: q9.id, question: "Which tag represents a programming variable in documentation?", options: ["<code>", "<var>", "<pre>", "<samp>"], correctIndex: 1 },
  ]);

  // ── LESSON 10: Colors ─────────────────────────────────────────────
  const [c10] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 10: Colors",
    description: "Learn every way to specify colors in HTML and CSS: named colors, hex codes, RGB, RGBA, HSL, and HSLA — and how to apply them to text and backgrounds.",
    level: "beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c10.id,
    title: "Colors",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Colors in HTML</title>
    <style>
      /* Named color */
      .named    { color: tomato; }

      /* Hex color */
      .hex      { color: #3498db; }

      /* RGB */
      .rgb      { color: rgb(46, 204, 113); }

      /* RGBA (with transparency) */
      .rgba     { background-color: rgba(231, 76, 60, 0.3); padding: 4px; }

      /* HSL */
      .hsl      { color: hsl(270, 70%, 50%); }

      /* HSLA */
      .hsla-bg  { background-color: hsla(120, 60%, 50%, 0.25); padding: 4px; }

      /* Background color on the body */
      body      { background-color: #1a1a2e; color: #e0e0e0; font-family: Arial, sans-serif; padding: 20px; }

      .box { padding: 15px; margin: 10px 0; border-radius: 6px; }
    </style>
  </head>
  <body>
    <h1>Color Formats in HTML &amp; CSS</h1>

    <div class="box" style="background:#e74c3c;">Named color: tomato / Red Hex #e74c3c</div>
    <div class="box" style="background:#3498db;">Hex color: #3498db (a blue)</div>
    <div class="box" style="background:rgb(46,204,113);">RGB: rgb(46, 204, 113) — a green</div>
    <div class="box" style="background:rgba(231,76,60,0.4);">RGBA: rgba(231,76,60,0.4) — red, 40% opacity</div>
    <div class="box" style="background:hsl(270,70%,50%);">HSL: hsl(270,70%,50%) — purple</div>
    <div class="box" style="background:hsla(60,100%,50%,0.3);">HSLA: hsla(60,100%,50%,0.3) — yellow, 30% opacity</div>

    <!-- Try It: Change the background colors above to your favourite colors! -->
  </body>
</html>`,
    content: `\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  LESSON 10 \u2014 COLORS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

\ud83c\udfaf LEARNING OBJECTIVES
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
After completing this lesson, you will be able to:
  \u2022 Name all five color formats used in HTML/CSS
  \u2022 Read and write valid hex color codes
  \u2022 Use RGB and RGBA to specify colors and transparency
  \u2022 Use HSL and HSLA to specify colors intuitively
  \u2022 Apply colors to text (color) and backgrounds (background-color)
  \u2022 Choose accessible color combinations with sufficient contrast

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

WHERE COLORS ARE USED IN HTML
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Colors are set almost entirely via CSS (inline or in a <style> block).
The two most common CSS color properties are:

  color:            \u2014 sets the TEXT color
  background-color: \u2014 sets the BACKGROUND color of an element

Example:
  <p style="color: red; background-color: yellow;">
    Warning text
  </p>

HTML itself once had deprecated color attributes (<font color="...">)
but these are obsolete. Always use CSS.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

FORMAT 1: NAMED COLORS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
CSS supports 140+ named colors. Examples:
  red, blue, green, white, black, gray, orange, purple,
  tomato, coral, salmon, goldenrod, teal, navy, crimson

Useful for quick styling and readability:
  color: tomato;
  background-color: navy;

Limitation: Only 140 names \u2014 for precise brand colors, use hex or RGB.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

FORMAT 2: HEX CODES
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
The most common color format in web development.

Structure: #RRGGBB
  # = hash symbol (required)
  RR = red channel   (00 to ff)
  GG = green channel (00 to ff)
  BB = blue channel  (00 to ff)

Hexadecimal (base-16) counts: 0 1 2 3 4 5 6 7 8 9 a b c d e f
  00 = 0 (none of this channel)
  ff = 255 (maximum of this channel)

Examples:
  #ff0000  \u2014 pure red   (ff red, 00 green, 00 blue)
  #00ff00  \u2014 pure green (00 red, ff green, 00 blue)
  #0000ff  \u2014 pure blue  (00 red, 00 green, ff blue)
  #ffffff  \u2014 white      (all channels maxed)
  #000000  \u2014 black      (all channels at zero)
  #3498db  \u2014 a medium blue (a popular UI color)

Shorthand: If each pair is the same digit, use 3-character form:
  #ffcc00  \u2192  #fc0  (same color, shorter)
  #aabbcc  \u2192  #abc

Hex with alpha (transparency): #RRGGBBAA
  #ff000080  \u2014 red at 50% opacity (80 in hex = 128 = ~50%)

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

FORMAT 3: RGB
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Structure: rgb(red, green, blue)
  Each value is a number from 0 to 255.

  rgb(255, 0, 0)     \u2014 pure red
  rgb(0, 0, 255)     \u2014 pure blue
  rgb(128, 128, 128) \u2014 medium gray
  rgb(52, 152, 219)  \u2014 same as #3498db

When to use: When you need to calculate colors programmatically
or when the values come from a design tool as numbers.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

FORMAT 4: RGBA (RGB with Alpha/Transparency)
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Structure: rgba(red, green, blue, alpha)
  alpha = 0.0 (fully transparent) to 1.0 (fully opaque)

  rgba(255, 0, 0, 1.0)  \u2014 solid red
  rgba(255, 0, 0, 0.5)  \u2014 red at 50% opacity
  rgba(255, 0, 0, 0.0)  \u2014 fully invisible
  rgba(0, 0, 0, 0.3)    \u2014 a subtle dark overlay (useful for modals)

When to use: Overlays, hover effects, glassmorphism, watermarks.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

FORMAT 5: HSL (Hue, Saturation, Lightness)
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Structure: hsl(hue, saturation%, lightness%)

  Hue         \u2014 0-360 degrees on the color wheel
                  0/360 = red, 120 = green, 240 = blue
  Saturation  \u2014 0% (gray) to 100% (vivid color)
  Lightness   \u2014 0% (black) to 50% (normal) to 100% (white)

Examples:
  hsl(0, 100%, 50%)    \u2014 pure red
  hsl(120, 100%, 50%)  \u2014 pure green
  hsl(240, 100%, 50%)  \u2014 pure blue
  hsl(0, 0%, 50%)      \u2014 medium gray (no saturation)
  hsl(210, 60%, 40%)   \u2014 a muted dark blue

Why HSL is great: It's intuitive. To make a color lighter or darker,
just change the lightness. To desaturate it, reduce saturation.
This makes it excellent for design systems and theming.

FORMAT 6: HSLA (HSL with Alpha)
  hsla(hue, saturation%, lightness%, alpha)
  Same as HSL but with a transparency channel (0.0\u20131.0).

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

COLOR ACCESSIBILITY
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Web Content Accessibility Guidelines (WCAG) require sufficient contrast
between text and its background so that people with low vision or color
blindness can read content.

  Minimum contrast ratio (WCAG AA):  4.5:1 for normal text
  Enhanced contrast (WCAG AAA):      7:1 for normal text

Good combinations:
  \u2713 Black text on white background     (~21:1)
  \u2713 Dark text on light yellow          (good)
  \u2713 White text on dark navy             (good)

Bad combinations:
  \u2717 Light gray text on white background (too low contrast)
  \u2717 Red text on green background        (bad for color blindness)
  \u2717 Yellow text on white                (very low contrast)

Tools: Use browser DevTools color contrast checker, or online tools
like WebAIM Contrast Checker.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udcdd PRACTICE QUESTIONS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
1. What does #ff0000 represent?
   Answer: Pure red (ff=255 red, 00=0 green, 00=0 blue)

2. What color format allows you to set transparency?
   Answer: RGBA or HSLA (both include an alpha channel)

3. In HSL, what does a hue of 120 represent?
   Answer: Green (red=0, green=120, blue=240 on the color wheel)

4. What CSS property sets text color?
   Answer: color

5. What is the minimum WCAG AA contrast ratio for normal text?
   Answer: 4.5:1

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udcbb CODING EXERCISES
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Exercise 1: Write CSS for dark navy text on a light blue background.
  Answer: color: #001f5b; background-color: #cce5ff;

Exercise 2: Make a semi-transparent red overlay using RGBA.
  Answer: background-color: rgba(255, 0, 0, 0.4);

Exercise 3: Express pure blue in all five color formats.
  Named: blue
  Hex:   #0000ff
  RGB:   rgb(0, 0, 255)
  HSL:   hsl(240, 100%, 50%)
  RGBA:  rgba(0, 0, 255, 1.0)

Exercise 4: Create a green color using HSL at 40% lightness.
  Answer: hsl(120, 100%, 40%)

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udd2c TRY IT YOURSELF
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
In the code editor, try:
  1. Change the body background-color to a dark HSL color of your choice
  2. Try all five color formats on different <div> boxes
  3. Create a "danger" box: red background at 30% opacity with white text
  4. Create a "success" box: green background with dark text
  5. Try making the same shade using both hex and rgb() to confirm they match

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udccc LESSON SUMMARY
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  \u2713 color: sets text color; background-color: sets background
  \u2713 Named colors: 140+ human-readable names (red, navy, tomato)
  \u2713 Hex: #RRGGBB \u2014 most common format in web development
  \u2713 RGB: rgb(0-255, 0-255, 0-255) \u2014 numeric channels
  \u2713 RGBA: rgb + alpha (0.0 fully transparent, 1.0 fully opaque)
  \u2713 HSL: hsl(hue 0-360, saturation%, lightness%) \u2014 intuitive for design
  \u2713 HSLA: HSL + alpha transparency
  \u2713 Contrast ratio of 4.5:1 minimum required for accessible text

\u2192 Next Lesson: Links`,
  });

  const [q10] = await db.insert(quizzesTable).values({ courseId: c10.id, title: "Colors \u2014 Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q10.id, question: "Which CSS property sets the text color of an element?", options: ["background-color", "text-color", "color", "font-color"], correctIndex: 2 },
    { quizId: q10.id, question: "What does the hex color #ffffff represent?", options: ["Black", "Red", "White", "Transparent"], correctIndex: 2 },
    { quizId: q10.id, question: "What does the hex color #000000 represent?", options: ["White", "Black", "Blue", "Gray"], correctIndex: 1 },
    { quizId: q10.id, question: "In hex color notation, what does each pair of characters represent?", options: ["Hue, Saturation, Lightness", "Red, Green, Blue channels", "Opacity values", "Font, Size, Weight"], correctIndex: 1 },
    { quizId: q10.id, question: "How many named CSS colors are available?", options: ["Exactly 16", "About 140", "About 1000", "Unlimited"], correctIndex: 1 },
    { quizId: q10.id, question: "In RGB format, what is the maximum value for a single channel?", options: ["100", "360", "255", "1.0"], correctIndex: 2 },
    { quizId: q10.id, question: "In RGBA, what does the 'A' value of 0.0 mean?", options: ["Fully opaque", "Fully transparent", "Maximum brightness", "No color"], correctIndex: 1 },
    { quizId: q10.id, question: "In HSL, what does a hue value of 0 (or 360) represent?", options: ["Blue", "Green", "Red", "Yellow"], correctIndex: 2 },
    { quizId: q10.id, question: "In HSL, what does 0% saturation produce?", options: ["White", "Black", "The purest version of the hue", "A shade of gray"], correctIndex: 3 },
    { quizId: q10.id, question: "In HSL, what does 0% lightness produce?", options: ["White", "Black", "The most vivid color", "Transparent"], correctIndex: 1 },
    { quizId: q10.id, question: "What is the shorthand hex for #ffcc00?", options: ["#fco", "#fc0", "#ff0", "#fcc"], correctIndex: 1 },
    { quizId: q10.id, question: "Which color format is best for semi-transparent overlays?", options: ["Named colors", "Hex codes", "RGBA or HSLA", "RGB"], correctIndex: 2 },
    { quizId: q10.id, question: "What is the WCAG AA minimum contrast ratio for normal body text?", options: ["2:1", "3:1", "4.5:1", "7:1"], correctIndex: 2 },
    { quizId: q10.id, question: "Which color format is considered the most intuitive for designers?", options: ["Hex", "RGB", "Named", "HSL"], correctIndex: 3 },
    { quizId: q10.id, question: "rgba(0, 0, 255, 0.5) describes:", options: ["Solid blue", "Blue at 50% opacity", "Blue at 50% brightness", "Transparent"], correctIndex: 1 },
    { quizId: q10.id, question: "The deprecated <font color='...'> attribute should be replaced with:", options: ["The color HTML attribute", "CSS color property", "The bgcolor attribute", "The <textcolor> tag"], correctIndex: 1 },
    { quizId: q10.id, question: "Which color combination has the BEST accessibility contrast?", options: ["Light gray on white", "Yellow on white", "Black on white", "Red on green"], correctIndex: 2 },
    { quizId: q10.id, question: "rgb(255, 0, 0) is equivalent to which hex code?", options: ["#00ff00", "#0000ff", "#ff0000", "#ffffff"], correctIndex: 2 },
    { quizId: q10.id, question: "In HSL, hue 120 corresponds to which color?", options: ["Red", "Blue", "Yellow", "Green"], correctIndex: 3 },
    { quizId: q10.id, question: "Which format includes both hue-based color and transparency?", options: ["RGB", "Hex with alpha", "HSL", "HSLA"], correctIndex: 3 },
  ]);

  // ── LESSON 11: Links ──────────────────────────────────────────────
  const [c11] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 11: Links",
    description: "Master the HTML anchor tag — absolute and relative URLs, new-tab targets, email and phone links, anchor jumps, download links, and accessibility best practices.",
    level: "beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c11.id,
    title: "Links",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>HTML Links Practice</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.8; }
      a { color: #3498db; }
      a:hover { color: #1a5276; }
      nav a { margin-right: 16px; text-decoration: none; font-weight: bold; }
      section { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 20px; }
    </style>
  </head>
  <body>

    <!-- Navigation bar with internal anchor links -->
    <nav>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>

    <!-- Absolute URL: links to an external website -->
    <p>Visit <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
      MDN Web Docs
    </a> for HTML reference.</p>

    <!-- Relative URL: links within your own site -->
    <p><a href="/about.html">About this site</a> (relative link)</p>

    <!-- Email link -->
    <p>Email us: <a href="mailto:hello@codecraft.io">hello@codecraft.io</a></p>

    <!-- Phone link (works on mobile) -->
    <p>Call us: <a href="tel:+15551234567">+1 (555) 123-4567</a></p>

    <!-- Download link -->
    <p><a href="/files/report.pdf" download>Download PDF Report</a></p>

    <!-- Anchor sections (jump-to destinations) -->
    <section id="about">
      <h2>About</h2>
      <p>This section is targeted by the #about anchor link in the nav.</p>
    </section>

    <section id="projects">
      <h2>Projects</h2>
      <p>Your project showcase goes here.</p>
    </section>

    <section id="contact">
      <h2>Contact</h2>
      <p>Reach out via the email link above.</p>
    </section>

    <!-- Back to top -->
    <p><a href="#">Back to top</a></p>

  </body>
</html>`,
    content: `\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  LESSON 11 \u2014 LINKS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

\ud83c\udfaf LEARNING OBJECTIVES
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
After completing this lesson, you will be able to:
  \u2022 Write correct anchor tags with absolute and relative URLs
  \u2022 Open links in a new tab safely using target="_blank" and rel="noopener"
  \u2022 Create email, phone, and download links
  \u2022 Build in-page anchor navigation with id attributes
  \u2022 Write accessible, descriptive link text

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

THE ANCHOR TAG
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
The <a> (anchor) tag creates hyperlinks \u2014 the fundamental
building block of the web.

Basic syntax:
  <a href="URL">Link text visible to user</a>

Required attribute:
  href  \u2014 the destination URL (where the link goes)

Without href, <a> renders as plain text with no link behaviour.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

ABSOLUTE vs RELATIVE URLs
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
ABSOLUTE URL: Complete web address including protocol and domain.
  Use for: external sites, resources on a different domain.
  <a href="https://www.google.com">Google</a>
  <a href="https://www.wikipedia.org/wiki/HTML">Wikipedia HTML</a>

RELATIVE URL: Path relative to the current page. No domain needed.
  Use for: pages within your own website.
  <a href="/contact.html">Contact</a>          (from root)
  <a href="about.html">About</a>              (same folder)
  <a href="../index.html">Home</a>            (one folder up)
  <a href="/blog/post-1.html">First Post</a> (in subfolder)

Why relative? When you move your site to a different domain, all
relative links still work. Absolute internal links break.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

TARGET ATTRIBUTE: OPENING IN A NEW TAB
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  target="_blank"   \u2014 Opens in a new tab or window
  target="_self"    \u2014 Opens in the same tab (default)
  target="_parent"  \u2014 Opens in the parent frame
  target="_top"     \u2014 Opens in the full body of the window

Security rule: ALWAYS add rel="noopener noreferrer" when using
target="_blank". Without it, the opened page can access and
modify your page via window.opener (a security vulnerability
called "reverse tabnapping").

Correct:
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    External Link
  </a>

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

SPECIAL LINK TYPES
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
1. EMAIL LINKS
   Opens the user's email client with a pre-filled To: address.
   <a href="mailto:hello@example.com">Email Us</a>

   Optional extras (pre-fill subject and body):
   <a href="mailto:help@example.com?subject=Support&body=Hello%2C">
     Contact Support
   </a>

2. PHONE LINKS
   Dials the number on mobile devices.
   <a href="tel:+15551234567">+1 (555) 123-4567</a>

3. DOWNLOAD LINKS
   Forces a file download instead of navigating to it.
   <a href="/files/brochure.pdf" download>Download Brochure</a>
   
   Optionally specify a custom filename:
   <a href="/files/doc.pdf" download="company-brochure-2024.pdf">
     Download Brochure
   </a>

4. ANCHOR LINKS (In-page navigation)
   Jump to a section on the same page identified by its id.
   
   The destination:
     <section id="pricing">...</section>
   
   The link:
     <a href="#pricing">Jump to Pricing</a>
   
   Back to top shortcut:
     <a href="#">Back to Top</a>

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

LINK ACCESSIBILITY BEST PRACTICES
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  \u2713 Use descriptive link text:
      Bad:  <a href="/report.pdf">Click here</a>
      Good: <a href="/report.pdf">Download Q3 Report (PDF)</a>

  \u2713 Don't use URLs as link text:
      Bad:  <a href="https://example.com">https://example.com</a>
      Good: <a href="https://example.com">Visit Example.com</a>

  \u2713 Warn users before opening a new tab:
      <a href="https://..." target="_blank" rel="noopener">
        MDN Web Docs (opens in new tab)
      </a>

  \u2713 Visited links should look different from unvisited ones.
  \u2713 Ensure links have sufficient color contrast with the background.
  \u2713 Links should be keyboard-navigable (Tab key to focus, Enter to follow).

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udcdd PRACTICE QUESTIONS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
1. What attribute is required on <a> to create a link?
   Answer: href

2. What is the difference between absolute and relative URLs?
   Answer: Absolute includes the full domain; relative is relative to the current page.

3. Why must you add rel="noopener noreferrer" with target="_blank"?
   Answer: To prevent the opened page from accessing your page via window.opener (reverse tabnapping).

4. How do you create a link that opens an email client?
   Answer: <a href="mailto:address@example.com">Link text</a>

5. How do you make a link jump to a section with id="contact"?
   Answer: <a href="#contact">Contact</a>

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udcbb CODING EXERCISES
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Exercise 1: Write a link to https://www.github.com that opens in a new tab.
  Answer: <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">GitHub</a>

Exercise 2: Write a mailto link for support@mysite.com.
  Answer: <a href="mailto:support@mysite.com">Email Support</a>

Exercise 3: Write a link that jumps to a section with id="faq".
  Answer: <a href="#faq">FAQ</a>

Exercise 4: Write a download link for a file called resume.pdf.
  Answer: <a href="/files/resume.pdf" download>Download Resume (PDF)</a>

Exercise 5: Fix this bad link text: <a href="/privacy">here</a>
  Answer: <a href="/privacy">Read our Privacy Policy</a>

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udd2c TRY IT YOURSELF
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
In the code editor, try:
  1. Add a nav with at least three anchor links to sections on the page
  2. Add an external link (target="_blank" + rel="noopener noreferrer")
  3. Add a mailto link and a tel link in a contact section
  4. Add a download link pointing to any file path
  5. Add a "Back to top" link using href="#"

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udccc LESSON SUMMARY
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  \u2713 <a href="URL">text</a> is the anchor tag for all links
  \u2713 Absolute URLs: full web address; relative URLs: path within your site
  \u2713 target="_blank" opens a new tab; always add rel="noopener noreferrer"
  \u2713 mailto: links open email clients; tel: links dial phone numbers
  \u2713 download attribute forces file download instead of navigation
  \u2713 Anchor links (#id) jump to sections on the same page
  \u2713 href="#" scrolls back to the top of the page
  \u2713 Good link text is descriptive; never use "click here"

\u2192 Next Lesson: Images`,
  });

  const [q11] = await db.insert(quizzesTable).values({ courseId: c11.id, title: "Links \u2014 Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q11.id, question: "What tag creates a hyperlink in HTML?", options: ["<link>", "<a>", "<url>", "<href>"], correctIndex: 1 },
    { quizId: q11.id, question: "Which attribute on <a> specifies the destination URL?", options: ["src", "url", "href", "link"], correctIndex: 2 },
    { quizId: q11.id, question: "Which target value opens a link in a new browser tab?", options: ["_new", "_tab", "_blank", "_open"], correctIndex: 2 },
    { quizId: q11.id, question: "What rel value should always accompany target='_blank'?", options: ["external", "noreferrer only", "noopener noreferrer", "nofollow"], correctIndex: 2 },
    { quizId: q11.id, question: "What security risk does rel='noopener' prevent?", options: ["SQL injection", "Reverse tabnapping (window.opener access)", "CSRF attacks", "Cross-site scripting"], correctIndex: 1 },
    { quizId: q11.id, question: "Which URL type includes the full protocol and domain?", options: ["Relative URL", "Anchor URL", "Absolute URL", "Internal URL"], correctIndex: 2 },
    { quizId: q11.id, question: "A relative URL like /about.html is relative to:", options: ["The external domain", "The root of your own website", "The user's file system", "The browser's home page"], correctIndex: 1 },
    { quizId: q11.id, question: "How do you create a link that opens the user's email client?", options: ["href='email:...'", "href='mailto:...'", "href='mail:...'", "href='send:...'"], correctIndex: 1 },
    { quizId: q11.id, question: "How do you create a link that dials a phone number on mobile?", options: ["href='phone:...'", "href='call:...'", "href='dial:...'", "href='tel:...'"], correctIndex: 3 },
    { quizId: q11.id, question: "Which attribute forces a file to download instead of opening in the browser?", options: ["save", "download", "file", "force"], correctIndex: 1 },
    { quizId: q11.id, question: "How do you link to a section with id='contact' on the same page?", options: ["href='contact'", "href='#contact'", "href='.contact'", "href='@contact'"], correctIndex: 1 },
    { quizId: q11.id, question: "What does href='#' do?", options: ["Creates a dead link", "Scrolls back to the top of the page", "Links to the home page", "Opens a new tab"], correctIndex: 1 },
    { quizId: q11.id, question: "Which path goes one directory up from the current location?", options: ["./index.html", "/index.html", "../index.html", "~/index.html"], correctIndex: 2 },
    { quizId: q11.id, question: "What is wrong with <a href='/info'>Click here</a>?", options: ["Missing target attribute", "The href is invalid", "The link text 'click here' is not descriptive", "Missing rel attribute"], correctIndex: 2 },
    { quizId: q11.id, question: "Which attribute on <a> can give a downloaded file a custom name?", options: ["name", "filename", "title", "download"], correctIndex: 3 },
    { quizId: q11.id, question: "What does target='_self' do?", options: ["Opens in a new tab", "Opens in the same tab (default behaviour)", "Opens in a popup", "Opens in the parent frame"], correctIndex: 1 },
    { quizId: q11.id, question: "An <a> tag without an href attribute renders as:", options: ["An error", "An invisible element", "Plain text with no link behaviour", "A button"], correctIndex: 2 },
    { quizId: q11.id, question: "Which is the accessible link text?", options: ["<a href='/docs'>here</a>", "<a href='/docs'>Read the documentation</a>", "<a href='/docs'>https://site.com/docs</a>", "<a href='/docs'>link</a>"], correctIndex: 1 },
    { quizId: q11.id, question: "How can you pre-fill the subject of a mailto link?", options: ["href='mailto:a@b.com&subject=Hi'", "href='mailto:a@b.com?subject=Hi'", "href='mailto:a@b.com#subject=Hi'", "Not possible"], correctIndex: 1 },
    { quizId: q11.id, question: "Which tag should you use for site navigation links?", options: ["<div>", "<nav> containing <a> elements", "<menu>", "<list>"], correctIndex: 1 },
  ]);

  // ── LESSON 12: Images ─────────────────────────────────────────────
  const [c12] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 12: Images",
    description: "Learn to embed and control images in HTML — src, alt, width, height, lazy loading, responsive images, image formats, and accessibility.",
    level: "beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c12.id,
    title: "Images",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Images in HTML</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      img  { border-radius: 8px; }
      figure { margin: 20px 0; }
      figcaption { font-size: 0.85em; color: #666; margin-top: 6px; }
    </style>
  </head>
  <body>

    <h1>HTML Image Examples</h1>

    <!-- Basic image from the web -->
    <img
      src="https://picsum.photos/400/250"
      alt="A random photo from Lorem Picsum"
      width="400"
      height="250"
    >

    <!-- Image with explicit dimensions for layout stability -->
    <img
      src="https://picsum.photos/seed/city/600/300"
      alt="A city skyline at dusk"
      width="600"
      height="300"
      loading="lazy"
      style="max-width:100%;"
    >

    <!-- Figure with caption (semantic) -->
    <figure>
      <img
        src="https://picsum.photos/seed/nature/500/300"
        alt="A lush green forest with sunlight filtering through the trees"
        width="500"
        height="300"
        style="max-width:100%;"
      >
      <figcaption>A serene forest \u2014 photo from Lorem Picsum</figcaption>
    </figure>

    <!-- Linked image: clicking opens a full version -->
    <a href="https://picsum.photos/1200/800" target="_blank" rel="noopener">
      <img
        src="https://picsum.photos/seed/arch/300/200"
        alt="Click to view a high-resolution version of this architecture photo"
        width="300"
        height="200"
      >
    </a>

    <!-- Decorative image: empty alt for screen readers -->
    <img
      src="https://picsum.photos/seed/pattern/80/80"
      alt=""
      width="80"
      height="80"
      style="border-radius:50%;"
    >

    <!-- Try It: Replace the src with your own image URL and update the alt text! -->

  </body>
</html>`,
    content: `\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  LESSON 12 \u2014 IMAGES
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

\ud83c\udfaf LEARNING OBJECTIVES
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
After completing this lesson, you will be able to:
  \u2022 Embed images with the <img> tag correctly
  \u2022 Write meaningful alt text for accessibility
  \u2022 Set width and height to prevent layout shift
  \u2022 Use loading="lazy" for performance
  \u2022 Wrap images with <figure> and <figcaption>
  \u2022 Distinguish between web image formats and when to use each

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

THE IMG TAG
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
The <img> tag embeds images. It is self-closing (no closing tag).

Basic syntax:
  <img src="path/to/image.jpg" alt="Description of the image">

Required attributes:
  src  \u2014 path or URL of the image file
  alt  \u2014 alternative text description (for accessibility)

<img> is an inline element and flows with surrounding text by default.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

THE ALT ATTRIBUTE \u2014 MOST IMPORTANT ATTRIBUTE
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Alt text serves three critical purposes:

  1. ACCESSIBILITY: Screen readers read alt text aloud to blind users.
  2. SEO: Search engines index alt text to understand image content.
  3. FALLBACK: Displayed when the image fails to load.

Rules for writing good alt text:
  \u2713 Be specific and descriptive: describe what's in the image
  \u2713 Don't start with "Image of..." or "Photo of..." (redundant)
  \u2713 Keep it concise (typically under 125 characters)
  \u2713 For decorative images, use empty alt: alt=""
      (tells screen readers to skip it entirely)
  \u2713 For linked images, describe the link destination

Examples:
  Bad:  alt="image"
  Bad:  alt="photo.jpg"
  Good: alt="A golden retriever playing fetch on a sunny beach"

  Bad:  alt="button"
  Good (linked image): alt="Read our 2024 annual report PDF"

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

WIDTH, HEIGHT, AND LAYOUT SHIFT
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Always set width and height on images:
  <img src="photo.jpg" alt="..." width="800" height="500">

These values are in pixels and set the intrinsic size.
CSS can override the visual size while the browser still reserves
space \u2014 preventing "Cumulative Layout Shift" (CLS).

CLS is when content jumps around as images load. It is bad for
user experience and hurts Google search ranking (Core Web Vitals).

For responsive images, set width in HTML but constrain with CSS:
  <img src="photo.jpg" alt="..." width="1200" height="675" style="max-width:100%; height:auto;">

This makes the image scale fluidly without distortion.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

LAZY LOADING
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  loading="lazy"   \u2014 Image loads only when it enters the viewport.
                     Use for images below the fold (not in the initial view).
  loading="eager"  \u2014 Image loads immediately (default). Use for hero images.

  <img src="..." alt="..." loading="lazy">

Benefits of lazy loading:
  \u2713 Faster initial page load
  \u2713 Less data used for users who don't scroll far
  \u2713 Better performance score

Do NOT lazy-load the hero image (the first visible image on the page).
This delays what the user sees first and hurts performance.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

FIGURE AND FIGCAPTION
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Use <figure> to group an image with its caption semantically:

  <figure>
    <img src="chart.png" alt="Bar chart showing sales growth Q1-Q4 2024">
    <figcaption>Figure 1: Sales Growth across all quarters of 2024</figcaption>
  </figure>

<figcaption> can appear before or after the image inside <figure>.
Screen readers associate the caption with the image automatically.
This is preferred over a plain <p> below the image.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

IMAGE FORMATS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Choose the right format for the content:

  JPEG / JPG
    \u2022 Best for: photographs and complex scenes with many colors
    \u2022 Pros: Small file size via lossy compression
    \u2022 Cons: No transparency; quality degrades with re-saves

  PNG
    \u2022 Best for: graphics needing transparency (logos, icons, screenshots)
    \u2022 Pros: Lossless; supports transparent backgrounds
    \u2022 Cons: Larger file size than JPEG for photos

  SVG (Scalable Vector Graphics)
    \u2022 Best for: logos, icons, simple illustrations
    \u2022 Pros: Infinitely scalable (never blurry); tiny file size; animatable
    \u2022 Cons: Not suitable for complex photographs

  WebP
    \u2022 Best for: any web image (modern replacement for JPEG and PNG)
    \u2022 Pros: 25-35% smaller than JPEG at same quality; supports transparency
    \u2022 Cons: Older browsers may not support it (use <picture> for fallback)

  GIF
    \u2022 Best for: simple looping animations
    \u2022 Cons: Only 256 colors; large file size for complex images

  AVIF
    \u2022 Best for: modern browsers (even better compression than WebP)
    \u2022 Cons: Limited browser support (use <picture> for fallback)

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udcdd PRACTICE QUESTIONS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
1. Is <img> a self-closing tag?
   Answer: Yes \u2014 it has no closing tag.

2. Why is alt text required on images?
   Answer: For accessibility (screen readers), SEO, and as a fallback when images fail to load.

3. What alt text should a decorative image have?
   Answer: Empty alt text: alt="" (tells screen readers to skip it)

4. What does loading="lazy" do?
   Answer: Defers loading the image until it is near the viewport, improving performance.

5. Which image format is best for logos that must scale at any size?
   Answer: SVG (Scalable Vector Graphics)

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udcbb CODING EXERCISES
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Exercise 1: Write a basic img tag for a photo of a mountain at sunset.
  Answer: <img src="mountain-sunset.jpg" alt="Snow-capped mountain at sunset with orange sky" width="800" height="500">

Exercise 2: Wrap an image in a figure with a caption.
  Answer:
    <figure>
      <img src="chart.png" alt="Line chart showing user growth from 2020-2024" width="600" height="400">
      <figcaption>User growth 2020\u20132024</figcaption>
    </figure>

Exercise 3: Add lazy loading to an image below the fold.
  Answer: <img src="footer-photo.jpg" alt="..." loading="lazy" width="400" height="300">

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udd2c TRY IT YOURSELF
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
In the code editor:
  1. Try loading="eager" on the first image and loading="lazy" on the rest
  2. Wrap one image in <figure> with a meaningful <figcaption>
  3. Make an image clickable by wrapping it in an <a> tag
  4. Try adding style="border-radius:50%;" to create a circular image
  5. Set max-width:100% on an image and shrink your browser window to see it respond

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udccc LESSON SUMMARY
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  \u2713 <img src="..." alt="..."> is self-closing; src and alt are required
  \u2713 Alt text must describe the image content; decorative images use alt=""
  \u2713 Always set width and height to prevent layout shift (CLS)
  \u2713 loading="lazy" defers off-screen images; never lazy-load the hero image
  \u2713 <figure> + <figcaption> semantically pair an image with its caption
  \u2713 JPEG: photos; PNG: transparency; SVG: logos; WebP: modern format
  \u2713 Wrap image in <a> to make it a clickable link

\u2192 Next Lesson: Favicon`,
  });

  const [q12] = await db.insert(quizzesTable).values({ courseId: c12.id, title: "Images \u2014 Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q12.id, question: "Which HTML tag is used to embed an image?", options: ["<image>", "<img>", "<pic>", "<photo>"], correctIndex: 1 },
    { quizId: q12.id, question: "Is <img> a self-closing tag?", options: ["No, it needs </img>", "Yes, it has no closing tag", "Only in HTML5", "Only for PNG files"], correctIndex: 1 },
    { quizId: q12.id, question: "Which attribute specifies the image file path?", options: ["href", "link", "src", "path"], correctIndex: 2 },
    { quizId: q12.id, question: "What does the alt attribute do?", options: ["Sets the image title", "Provides alternative text for accessibility and fallback", "Links the image to a file", "Sets the image border"], correctIndex: 1 },
    { quizId: q12.id, question: "What alt text should a purely decorative image have?", options: ["alt='decorative'", "No alt attribute at all", "alt=''", "alt='image'"], correctIndex: 2 },
    { quizId: q12.id, question: "Why should you set width and height on images?", options: ["To make them display faster", "To prevent layout shift (CLS) as the page loads", "Required by HTML5", "To enable lazy loading"], correctIndex: 1 },
    { quizId: q12.id, question: "What does loading='lazy' do?", options: ["Loads the image faster", "Loads the image only when it nears the viewport", "Caches the image in the browser", "Loads a low-quality placeholder first"], correctIndex: 1 },
    { quizId: q12.id, question: "Which image should NOT have loading='lazy'?", options: ["Images in the footer", "The hero/banner image at the top of the page", "Images in a gallery", "Product thumbnail images"], correctIndex: 1 },
    { quizId: q12.id, question: "Which tags semantically pair an image with its caption?", options: ["<img> + <caption>", "<figure> + <figcaption>", "<img> + <label>", "<section> + <p>"], correctIndex: 1 },
    { quizId: q12.id, question: "Which image format is best for photographs with many colors?", options: ["PNG", "SVG", "GIF", "JPEG"], correctIndex: 3 },
    { quizId: q12.id, question: "Which image format supports transparency?", options: ["JPEG", "GIF only", "PNG and WebP", "JPEG and GIF"], correctIndex: 2 },
    { quizId: q12.id, question: "Which format is infinitely scalable and never blurry?", options: ["WebP", "PNG", "SVG", "AVIF"], correctIndex: 2 },
    { quizId: q12.id, question: "Which modern format produces files ~30% smaller than JPEG at the same quality?", options: ["GIF", "BMP", "WebP", "TIFF"], correctIndex: 2 },
    { quizId: q12.id, question: "How do you make an image clickable (a link)?", options: ["Add onclick to img", "Wrap <img> in an <a> tag", "Add href to img", "Use <button> around img"], correctIndex: 1 },
    { quizId: q12.id, question: "What CSS makes an image responsive (scales with the container)?", options: ["width: 100vw", "max-width: 100%; height: auto;", "display: flex;", "overflow: hidden;"], correctIndex: 1 },
    { quizId: q12.id, question: "Where can the <figcaption> appear relative to <img> inside <figure>?", options: ["Only below the image", "Only above the image", "Before or after the image", "Outside the figure"], correctIndex: 2 },
    { quizId: q12.id, question: "What is CLS (Cumulative Layout Shift)?", options: ["A CSS property for centering", "Content jumping around as images or fonts load", "A type of image compression", "A browser caching strategy"], correctIndex: 1 },
    { quizId: q12.id, question: "Which is the best alt text for a linked image that downloads a PDF?", options: ["alt='pdf'", "alt='click here'", "alt='Download the Q4 financial report PDF'", "alt=''"], correctIndex: 2 },
    { quizId: q12.id, question: "The <picture> element is used for:", options: ["Displaying multiple images at once", "Providing multiple image sources for different screen sizes and formats", "Creating image slideshows", "Adding captions to images"], correctIndex: 1 },
    { quizId: q12.id, question: "GIF format is best suited for:", options: ["High-quality photos", "Logos and icons", "Simple looping animations", "Document screenshots"], correctIndex: 2 },
  ]);

  // ── LESSON 13: Favicon ────────────────────────────────────────────
  const [c13] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 13: Favicon",
    description: "Understand what a favicon is, why it matters, how to create one, and all the modern ways to add favicons and app icons to your site.",
    level: "beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c13.id,
    title: "Favicon",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Site With Favicon</title>

    <!-- ====================================================
         FAVICON SETUP
         Place these tags inside <head> before <title>
    ==================================================== -->

    <!-- 1. Classic .ico favicon (highest browser compatibility) -->
    <link rel="icon" href="/favicon.ico" type="image/x-icon">

    <!-- 2. Modern SVG favicon (scales perfectly at any size) -->
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">

    <!-- 3. PNG fallback for browsers that don't support SVG favicon -->
    <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
    <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16">

    <!-- 4. Apple Touch Icon: used when adding site to iOS home screen -->
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">

    <!-- 5. Web App Manifest: for Android home screen / PWA support -->
    <link rel="manifest" href="/site.webmanifest">

    <!-- Theme color: browser chrome color on mobile -->
    <meta name="theme-color" content="#3498db">

  </head>
  <body>
    <h1>Check the browser tab!</h1>
    <p>If this site has a favicon set up, you'll see it in the tab,
       bookmarks bar, and browser history.</p>

    <h2>Where Favicons Appear</h2>
    <ul>
      <li>Browser tab (most common)</li>
      <li>Bookmarks bar</li>
      <li>Browser history dropdown</li>
      <li>Mobile home screen (apple-touch-icon / manifest)</li>
      <li>Search engine results (sometimes)</li>
    </ul>
  </body>
</html>`,
    content: `\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  LESSON 13 \u2014 FAVICON
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

\ud83c\udfaf LEARNING OBJECTIVES
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
After completing this lesson, you will be able to:
  \u2022 Explain what a favicon is and where it appears
  \u2022 Add a favicon to an HTML page using <link> in <head>
  \u2022 Understand the different favicon formats and their use cases
  \u2022 Set up an Apple Touch Icon for iOS home screen support
  \u2022 Use a web app manifest for Android / PWA favicon support

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

WHAT IS A FAVICON?
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
"Favicon" stands for "favourite icon."

It is the small icon that appears:
  \u2022 In the browser tab next to the page title
  \u2022 In the bookmarks / favourites bar
  \u2022 In the browser history and address bar dropdown
  \u2022 On the home screen when a user saves your site as an app
  \u2022 In search engine results (sometimes)

Why it matters:
  \u2713 Brand recognition: users identify your site among many open tabs
  \u2713 Professional polish: missing favicon = unfinished site
  \u2713 Improves trust and credibility
  \u2713 Required for Progressive Web Apps (PWA)

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

HOW TO ADD A FAVICON
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Favicons are added in the <head> section using <link> tags.
They are NEVER placed in <body>.

Basic (classic) setup:
  <link rel="icon" href="/favicon.ico">

Modern recommended setup (covers all browsers and devices):
  <!-- SVG favicon: scales perfectly, supports dark mode -->
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">

  <!-- PNG fallback for older browsers -->
  <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
  <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16">

  <!-- ICO: ultra-compatible classic format -->
  <link rel="icon" href="/favicon.ico" type="image/x-icon">

  <!-- Apple Touch Icon: for iOS home screen -->
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">

  <!-- Web App Manifest: for Android / PWA -->
  <link rel="manifest" href="/site.webmanifest">

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

FAVICON FORMATS EXPLAINED
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
.ICO (favicon.ico)
  \u2022 Original favicon format. Contains multiple sizes in one file.
  \u2022 Supported by ALL browsers including very old ones.
  \u2022 Place favicon.ico in the root of your site.
    Browsers automatically look for it at /.
  \u2022 Common sizes inside: 16x16, 32x32, 48x48

.SVG favicon
  \u2022 Modern, scalable vector icon. Looks sharp at any size.
  \u2022 Can use CSS inside SVG for dark mode support:
      @media (prefers-color-scheme: dark) {
        :root { fill: white; }
      }
  \u2022 Supported in Chrome, Firefox, Edge; not Safari (use ICO/PNG fallback).

.PNG
  \u2022 Raster format. Good for detailed icons.
  \u2022 Create at 16x16, 32x32, and 192x192 (for Android).

Apple Touch Icon (180x180 PNG)
  \u2022 Used when iOS users add your site to their home screen.
  \u2022 iOS uses this as the app icon.
  \u2022 Should be 180x180 pixels.
  \u2022 No transparency (iOS adds its own rounded corners).

Web App Manifest (site.webmanifest)
  \u2022 JSON file describing your web app.
  \u2022 Contains icons for Android and PWA (192x192 and 512x512 PNG).
  \u2022 Example manifest:
    {
      "name": "My Site",
      "short_name": "Site",
      "icons": [
        { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
        { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
      ],
      "theme_color": "#3498db",
      "background_color": "#ffffff",
      "display": "standalone"
    }

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

HOW TO CREATE A FAVICON
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Option 1: Online favicon generators (easiest)
  \u2022 realfavicongenerator.net \u2014 the industry standard tool
  \u2022 favicon.io \u2014 create from text, image, or emoji
  Upload a 512x512 PNG logo; the tool generates all sizes and HTML code.

Option 2: Create in design software
  \u2022 Figma, Adobe Illustrator, Sketch
  \u2022 Design a 512x512 icon, export as PNG/SVG

Option 3: Simple text/emoji favicon (quick and creative)
  Using favicon.io, generate from any emoji or text initials.

BEST PRACTICES:
  \u2713 Keep it simple: readable at 16x16 pixels
  \u2713 Use your brand colors
  \u2713 Avoid fine detail \u2014 it disappears at small sizes
  \u2713 Test in multiple browsers and on mobile

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

THEME COLOR META TAG
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  <meta name="theme-color" content="#3498db">

This sets the browser chrome (toolbar) color on Android Chrome and
Samsung Internet. It makes your site feel like a native app.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udcdd PRACTICE QUESTIONS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
1. What does "favicon" stand for?
   Answer: Favourite icon

2. In which HTML section do you place favicon link tags?
   Answer: Inside <head>

3. What is the Apple Touch Icon used for?
   Answer: As the app icon when iOS users add the site to their home screen (180x180 PNG)

4. Which favicon format is supported by all browsers including very old ones?
   Answer: .ICO (favicon.ico)

5. What tool can generate all favicon sizes from a single image?
   Answer: realfavicongenerator.net

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udccc LESSON SUMMARY
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  \u2713 Favicon = the small icon in browser tab, bookmarks, and history
  \u2713 Added via <link rel="icon" href="..."> in <head>
  \u2713 .ICO: oldest, most compatible; .SVG: modern, scalable, dark-mode
  \u2713 PNG 16x16 and 32x32: standard raster fallbacks
  \u2713 Apple Touch Icon (180x180 PNG): iOS home screen
  \u2713 site.webmanifest: Android/PWA with 192x192 and 512x512 icons
  \u2713 theme-color meta tag: tints the browser toolbar on Android
  \u2713 Use realfavicongenerator.net to generate all sizes at once

\u2192 Next Lesson: Tables`,
  });

  const [q13] = await db.insert(quizzesTable).values({ courseId: c13.id, title: "Favicon \u2014 Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q13.id, question: "What does 'favicon' stand for?", options: ["Fast visual icon", "Favourite icon", "File and view icon", "Front-end avatar icon"], correctIndex: 1 },
    { quizId: q13.id, question: "Where in your HTML document do you place favicon link tags?", options: ["In <body>", "In <footer>", "In <head>", "In <nav>"], correctIndex: 2 },
    { quizId: q13.id, question: "Which tag is used to link a favicon?", options: ["<icon>", "<img>", "<link>", "<meta>"], correctIndex: 2 },
    { quizId: q13.id, question: "What rel value links a favicon?", options: ["rel='favicon'", "rel='icon'", "rel='shortcut'", "rel='logo'"], correctIndex: 1 },
    { quizId: q13.id, question: "Which favicon format has the best browser compatibility including very old browsers?", options: [".svg", ".png", ".ico", ".gif"], correctIndex: 2 },
    { quizId: q13.id, question: "Which favicon format scales perfectly at any size?", options: [".ico", ".png", ".jpg", ".svg"], correctIndex: 3 },
    { quizId: q13.id, question: "What is the Apple Touch Icon used for?", options: ["Desktop browser favicons", "iOS home screen app icon", "Android Chrome icon", "Windows taskbar icon"], correctIndex: 1 },
    { quizId: q13.id, question: "What size is the Apple Touch Icon typically?", options: ["32x32", "64x64", "128x128", "180x180"], correctIndex: 3 },
    { quizId: q13.id, question: "What file is used to define icons for Android home screen / PWA?", options: ["manifest.json", "site.webmanifest", "icons.json", "pwa-config.json"], correctIndex: 1 },
    { quizId: q13.id, question: "What does the meta name='theme-color' tag do?", options: ["Sets the page background color", "Tints the browser toolbar on mobile devices", "Sets the favicon background", "Defines the CSS color theme"], correctIndex: 1 },
    { quizId: q13.id, question: "Where does a favicon automatically appear without any HTML tag?", options: ["In the footer of the page", "At root path /favicon.ico (browsers fetch it automatically)", "In the page header element", "In the sitemap"], correctIndex: 1 },
    { quizId: q13.id, question: "Which sizes are typically needed inside a .ico file?", options: ["8x8 and 16x16", "16x16 and 32x32", "64x64 and 128x128", "256x256 only"], correctIndex: 1 },
    { quizId: q13.id, question: "Why should a favicon design be simple?", options: ["Complex favicons are not allowed", "They are displayed at small sizes (as small as 16x16)", "Simple icons load faster", "Only one color is supported"], correctIndex: 1 },
    { quizId: q13.id, question: "Which online tool is widely recommended for generating all favicon sizes?", options: ["Figma", "realfavicongenerator.net", "photoshop.com", "icons8.com"], correctIndex: 1 },
    { quizId: q13.id, question: "What sizes should PNG icons in site.webmanifest include?", options: ["16x16 and 32x32", "64x64 and 128x128", "192x192 and 512x512", "48x48 and 96x96"], correctIndex: 2 },
    { quizId: q13.id, question: "How can an SVG favicon support dark mode?", options: ["It cannot support dark mode", "By using CSS media query inside the SVG for prefers-color-scheme", "By using a separate dark-favicon.svg file", "SVG automatically adapts"], correctIndex: 1 },
    { quizId: q13.id, question: "An Apple Touch Icon should NOT have transparency because:", options: ["PNG doesn't support transparency", "iOS adds its own rounded corners and background", "It breaks on older iPhones", "Transparency slows down loading"], correctIndex: 1 },
    { quizId: q13.id, question: "Where do favicons appear when a user bookmarks your page?", options: ["Only in the tab bar", "In the bookmarks bar and history alongside the site title", "Only on mobile devices", "They don't appear in bookmarks"], correctIndex: 1 },
    { quizId: q13.id, question: "A PWA (Progressive Web App) favicon is defined in:", options: ["The CSS file", "The HTML <head> only", "The site.webmanifest file", "The server config"], correctIndex: 2 },
    { quizId: q13.id, question: "What happens if you don't add a favicon to your site?", options: ["The page fails to load", "The browser shows a blank or default icon, which looks unfinished", "Browsers automatically generate one", "An error is shown in the console"], correctIndex: 1 },
  ]);

  // ── LESSON 14: Tables ─────────────────────────────────────────────
  const [c14] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 14: Tables",
    description: "Learn to build accessible, well-structured HTML tables — headers, body, footer, colspan, rowspan, captions, and best practices.",
    level: "beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c14.id,
    title: "Tables",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>HTML Tables</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      table { border-collapse: collapse; width: 100%; margin-bottom: 30px; }
      th, td { border: 1px solid #ccc; padding: 10px 14px; text-align: left; }
      th { background-color: #2c3e50; color: white; }
      tr:nth-child(even) { background-color: #f2f2f2; }
      caption { font-weight: bold; margin-bottom: 8px; font-size: 1.1em; }
      tfoot td { font-weight: bold; background-color: #ecf0f1; }
    </style>
  </head>
  <body>

    <h1>HTML Tables</h1>

    <!-- Basic table with caption, thead, tbody, tfoot -->
    <table>
      <caption>Monthly Programming Language Popularity (2024)</caption>

      <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Language</th>
          <th scope="col">Usage %</th>
          <th scope="col">Trend</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>
          <td>JavaScript</td>
          <td>63.6%</td>
          <td>\u2191 Rising</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Python</td>
          <td>51.2%</td>
          <td>\u2191 Rising</td>
        </tr>
        <tr>
          <td>3</td>
          <td>HTML/CSS</td>
          <td>52.8%</td>
          <td>\u2192 Stable</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Java</td>
          <td>30.2%</td>
          <td>\u2193 Declining</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colspan="2">Total surveyed languages: 4</td>
          <td colspan="2">Source: Stack Overflow 2024</td>
        </tr>
      </tfoot>
    </table>

    <!-- Table with colspan and rowspan -->
    <h2>Table with Merged Cells</h2>
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Morning</th>
          <th>Afternoon</th>
          <th>Evening</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Monday</td>
          <td colspan="2">HTML &amp; CSS Workshop (spans 2 columns)</td>
          <td>Review</td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td>JavaScript</td>
          <td rowspan="2">Project Work (spans 2 rows)</td>
          <td>Review</td>
        </tr>
        <tr>
          <td>Wednesday</td>
          <td>Python</td>
          <td>Review</td>
        </tr>
      </tbody>
    </table>

  </body>
</html>`,
    content: `\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  LESSON 14 \u2014 TABLES
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

\ud83c\udfaf LEARNING OBJECTIVES
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
After completing this lesson, you will be able to:
  \u2022 Build a complete table with <table>, <tr>, <th>, <td>
  \u2022 Use <thead>, <tbody>, and <tfoot> to structure table sections
  \u2022 Add a table caption with <caption>
  \u2022 Merge cells horizontally with colspan and vertically with rowspan
  \u2022 Apply the scope attribute for accessible table headers

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

TABLE STRUCTURE
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Core tags:
  <table>   \u2014 The container for the whole table
  <tr>      \u2014 Table Row (contains cells)
  <th>      \u2014 Table Header cell (bold, centered by default)
  <td>      \u2014 Table Data cell (regular content)

Minimal working table:
  <table>
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>Alice</td>
      <td>28</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>34</td>
    </tr>
  </table>

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

SEMANTIC TABLE SECTIONS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Split your table into three sections for better semantics:

  <thead>  \u2014 Header rows (column labels). Bold headers.
             Repeated if the table spans multiple print pages.

  <tbody>  \u2014 The main data rows. This is the bulk of your table.

  <tfoot>  \u2014 Footer rows (totals, averages, source notes).
             Always placed AFTER tbody in HTML, but browsers render
             it at the bottom automatically.

Example:
  <table>
    <thead>
      <tr><th>Product</th><th>Price</th><th>Qty</th></tr>
    </thead>
    <tbody>
      <tr><td>Widget A</td><td>$9.99</td><td>50</td></tr>
      <tr><td>Widget B</td><td>$14.99</td><td>30</td></tr>
    </tbody>
    <tfoot>
      <tr><td colspan="2">Total items:</td><td>80</td></tr>
    </tfoot>
  </table>

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

CAPTION
\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  <caption>  \u2014 A title/description for the table.
               Must be the FIRST child inside <table>.
               Helps screen readers and users understand the table context.

  <table>
    <caption>Q3 2024 Sales Report by Region</caption>
    ...
  </table>

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

COLSPAN AND ROWSPAN \u2014 MERGING CELLS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
colspan="N"  \u2014 Merge N cells HORIZONTALLY (across columns)
rowspan="N"  \u2014 Merge N cells VERTICALLY (across rows)

Colspan example (cell spans 3 columns):
  <tr>
    <td colspan="3">This cell spans three columns</td>
  </tr>

Rowspan example (cell spans 2 rows):
  <tr>
    <td rowspan="2">This spans two rows</td>
    <td>Row 1 Cell 2</td>
  </tr>
  <tr>
    <!-- No first cell here! It's "consumed" by the rowspan above -->
    <td>Row 2 Cell 2</td>
  </tr>

Important: When a cell uses rowspan="2", the NEXT row must have
one fewer <td> because the rowspan occupies that space.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

SCOPE ATTRIBUTE FOR ACCESSIBILITY
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
The scope attribute on <th> tells screen readers which cells
the header applies to:

  scope="col"   \u2014 This header applies to the entire column
  scope="row"   \u2014 This header applies to the entire row
  scope="colgroup" \u2014 Applies to a group of columns
  scope="rowgroup" \u2014 Applies to a group of rows

Example:
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Alice</th>
      <td>95</td>
    </tr>
  </tbody>

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

WHEN TO USE TABLES (AND WHEN NOT TO)
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
USE TABLES FOR:
  \u2713 Tabular/grid data with clear rows and columns
  \u2713 Comparison tables (pricing plans, feature comparisons)
  \u2713 Schedules and timetables
  \u2713 Financial data, spreadsheet-like information

DO NOT USE TABLES FOR:
  \u2717 Page layout (use CSS Grid or Flexbox instead)
  \u2717 Navigation menus
  \u2717 Purely visual alignment

Historic note: In the 1990s/early 2000s, developers used tables
for page layout. This is now considered bad practice. Tables are
for DATA only; CSS handles layout.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udcdd PRACTICE QUESTIONS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
1. What does <tr> stand for?
   Answer: Table Row

2. What is the difference between <th> and <td>?
   Answer: <th> is a header cell (bold, centered by default); <td> is a regular data cell.

3. What attribute merges cells horizontally?
   Answer: colspan="N"

4. What attribute merges cells vertically?
   Answer: rowspan="N"

5. Should tables be used for page layout?
   Answer: No. Tables are for tabular data only. Use CSS Grid or Flexbox for layout.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udccc LESSON SUMMARY
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  \u2713 <table> contains <tr> rows which contain <th> or <td> cells
  \u2713 <thead>, <tbody>, <tfoot> divide the table into semantic sections
  \u2713 <caption> gives the table a title (first child of <table>)
  \u2713 colspan="N" merges N cells horizontally
  \u2713 rowspan="N" merges N cells vertically (next rows need one fewer cell)
  \u2713 scope="col"/"row" on <th> improves accessibility for screen readers
  \u2713 Use CSS border-collapse: collapse to merge cell borders
  \u2713 Tables are for DATA only \u2014 never use them for page layout

\u2192 Next Lesson: Lists`,
  });

  const [q14] = await db.insert(quizzesTable).values({ courseId: c14.id, title: "Tables \u2014 Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q14.id, question: "Which tag is the outermost container for an HTML table?", options: ["<tr>", "<td>", "<table>", "<grid>"], correctIndex: 2 },
    { quizId: q14.id, question: "What does <tr> stand for?", options: ["Table Reference", "Table Row", "Table Record", "Text Row"], correctIndex: 1 },
    { quizId: q14.id, question: "What is the visual difference between <th> and <td> by default?", options: ["<th> is larger", "<th> is bold and centered; <td> is normal weight and left-aligned", "<th> has a border; <td> does not", "No difference"], correctIndex: 1 },
    { quizId: q14.id, question: "Which attribute merges cells horizontally across columns?", options: ["rowspan", "colspan", "merge", "span"], correctIndex: 1 },
    { quizId: q14.id, question: "Which attribute merges cells vertically across rows?", options: ["colspan", "rowspan", "cellspan", "vspan"], correctIndex: 1 },
    { quizId: q14.id, question: "Where must <caption> be placed inside a table?", options: ["After <thead>", "Before <thead> as the first child of <table>", "Inside <tbody>", "After <tfoot>"], correctIndex: 1 },
    { quizId: q14.id, question: "Which section contains the main data rows of a table?", options: ["<thead>", "<tfoot>", "<tbody>", "<tdata>"], correctIndex: 2 },
    { quizId: q14.id, question: "Which section typically contains totals or source notes?", options: ["<thead>", "<tbody>", "<tfoot>", "<summary>"], correctIndex: 2 },
    { quizId: q14.id, question: "What scope='col' on a <th> tells screen readers:", options: ["This header is for the entire row", "This header is for the entire column", "This header spans multiple columns", "This header is decorative"], correctIndex: 1 },
    { quizId: q14.id, question: "Which CSS property removes double borders in tables?", options: ["border-spacing: 0", "border-collapse: collapse", "border: none", "table-layout: fixed"], correctIndex: 1 },
    { quizId: q14.id, question: "If a cell has rowspan='3', how many rows does it occupy?", options: ["1", "2", "3", "Unlimited"], correctIndex: 2 },
    { quizId: q14.id, question: "When a cell uses rowspan='2', the following row must have:", options: ["One MORE cell than usual", "One FEWER cell than usual", "The same number of cells", "An extra <tr>"], correctIndex: 1 },
    { quizId: q14.id, question: "Should HTML tables be used for page layout?", options: ["Yes, they are the best layout method", "Only for two-column layouts", "No, CSS Grid or Flexbox should be used instead", "Only in email templates"], correctIndex: 2 },
    { quizId: q14.id, question: "What is a good use case for HTML tables?", options: ["Navigation menus", "Pricing comparison charts with rows and columns of data", "Image galleries", "Form layouts"], correctIndex: 1 },
    { quizId: q14.id, question: "Which of these is the correct order of children inside <table>?", options: ["tbody, thead, tfoot", "thead, tfoot, tbody", "thead, tbody, tfoot", "tbody, tfoot, thead"], correctIndex: 2 },
    { quizId: q14.id, question: "Which element adds a visible title above (or below) a table?", options: ["<title>", "<header>", "<caption>", "<label>"], correctIndex: 2 },
    { quizId: q14.id, question: "colspan='4' on a <td> means the cell spans:", options: ["4 rows", "4 columns", "4 pixels", "The entire table"], correctIndex: 1 },
    { quizId: q14.id, question: "What does scope='row' on a <th> indicate?", options: ["The header applies to its column", "The header applies to all cells in its row", "The header spans multiple rows", "The header is a sub-header"], correctIndex: 1 },
    { quizId: q14.id, question: "How many <td> cells should a row have if the previous row's first cell has rowspan='2'?", options: ["The same as normal", "One fewer than normal", "One more than normal", "Zero"], correctIndex: 1 },
    { quizId: q14.id, question: "The <thead> section, when a table is printed, will:", options: ["Not print at all", "Print only on the last page", "Repeat at the top of each printed page", "Print in a different color"], correctIndex: 2 },
  ]);

  // ── LESSON 15: Lists ──────────────────────────────────────────────
  const [c15] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 15: Lists",
    description: "Master all three HTML list types — unordered, ordered, and description lists — including nesting, custom styling, and accessibility.",
    level: "beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c15.id,
    title: "Lists",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>HTML Lists</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.8; }
      h2 { color: #2c3e50; }

      /* Custom unordered list bullet */
      ul.custom { list-style-type: square; padding-left: 24px; }

      /* Ordered list with roman numerals */
      ol.roman { list-style-type: upper-roman; }

      /* Remove bullets (useful for navigation) */
      ul.no-bullets { list-style: none; padding: 0; }
      ul.no-bullets li { display: inline; margin-right: 16px; }

      dt { font-weight: bold; margin-top: 10px; }
      dd { margin-left: 24px; color: #555; }
    </style>
  </head>
  <body>

    <h1>HTML Lists</h1>

    <!-- 1. Unordered list (bullets) -->
    <h2>Unordered List (ul)</h2>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
      <li>Python</li>
    </ul>

    <!-- 2. Ordered list (numbers) -->
    <h2>Ordered List (ol)</h2>
    <ol>
      <li>Install a code editor</li>
      <li>Write your first HTML file</li>
      <li>Open it in a browser</li>
      <li>Celebrate!</li>
    </ol>

    <!-- 3. Ordered list starting at a custom number -->
    <h2>Ordered List Starting at 5</h2>
    <ol start="5">
      <li>Continued from step 4</li>
      <li>Deploy to production</li>
    </ol>

    <!-- 4. Nested lists -->
    <h2>Nested List</h2>
    <ul>
      <li>Front-End
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
      </li>
      <li>Back-End
        <ul>
          <li>Node.js</li>
          <li>Python</li>
          <li>Java</li>
        </ul>
      </li>
    </ul>

    <!-- 5. Description list -->
    <h2>Description List (dl)</h2>
    <dl>
      <dt>HTML</dt>
      <dd>HyperText Markup Language \u2014 structures web content</dd>

      <dt>CSS</dt>
      <dd>Cascading Style Sheets \u2014 styles the HTML structure</dd>

      <dt>JavaScript</dt>
      <dd>Programming language that adds interactivity to web pages</dd>
    </dl>

    <!-- 6. Navigation list (list-style: none) -->
    <h2>Navigation (Inline List)</h2>
    <nav>
      <ul class="no-bullets">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>

    <!-- Try It: Create a nested ordered list for a recipe with steps
         and sub-steps -->

  </body>
</html>`,
    content: `\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  LESSON 15 \u2014 LISTS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

\ud83c\udfaf LEARNING OBJECTIVES
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
After completing this lesson, you will be able to:
  \u2022 Create unordered lists with <ul> and <li>
  \u2022 Create ordered lists with <ol> and <li>
  \u2022 Use the start, reversed, and type attributes on <ol>
  \u2022 Create description lists with <dl>, <dt>, and <dd>
  \u2022 Nest lists inside other lists
  \u2022 Style lists with CSS for navigation and custom bullets

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

TYPE 1: UNORDERED LIST (<ul>)
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Use when the ORDER of items DOES NOT MATTER.
Default marker: bullet point (\u2022).

  <ul>
    <li>Eggs</li>
    <li>Milk</li>
    <li>Bread</li>
  </ul>

CSS list-style-type options for <ul>:
  disc       \u2014 filled circle \u2022 (default)
  circle     \u2014 hollow circle \u25e6
  square     \u2014 filled square \u25aa
  none       \u2014 no bullet (used for navigation menus)

  ul { list-style-type: square; }

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

TYPE 2: ORDERED LIST (<ol>)
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Use when the ORDER MATTERS (steps, rankings, sequences).
Default marker: 1, 2, 3, ...

  <ol>
    <li>Boil water</li>
    <li>Add pasta</li>
    <li>Cook for 10 minutes</li>
    <li>Drain and serve</li>
  </ol>

Important attributes on <ol>:

  type="1"   \u2014 numbers 1, 2, 3 (default)
  type="A"   \u2014 uppercase letters A, B, C
  type="a"   \u2014 lowercase letters a, b, c
  type="I"   \u2014 uppercase Roman numerals I, II, III
  type="i"   \u2014 lowercase Roman numerals i, ii, iii

  start="N"  \u2014 starts counting from N instead of 1
  reversed   \u2014 counts down (10, 9, 8...)

Example:
  <ol type="A" start="3">
    <li>This will show as C</li>
    <li>This will show as D</li>
  </ol>

CSS list-style-type for <ol>:
  decimal, decimal-leading-zero, lower-alpha, upper-alpha,
  lower-roman, upper-roman, lower-greek, and many more.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

TYPE 3: DESCRIPTION LIST (<dl>)
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Use for glossaries, FAQs, metadata, term-definition pairs.

  <dl>   \u2014 Description List container
  <dt>   \u2014 Description Term (the word/phrase being described)
  <dd>   \u2014 Description Details (the definition or explanation)

Example:
  <dl>
    <dt>Semantic HTML</dt>
    <dd>HTML that uses meaningful tags to describe content structure,
        improving accessibility and SEO.</dd>

    <dt>Accessibility</dt>
    <dd>The practice of making websites usable by people with
        disabilities, including those using screen readers.</dd>
  </dl>

A single <dt> can have multiple <dd> entries.
Multiple <dt> elements can share one <dd>.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

NESTED LISTS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
You can nest any list inside any <li> element.
The nested list must be placed INSIDE the <li>, not after it.

Correct nesting:
  <ul>
    <li>Fruits
      <ul>
        <li>Apples</li>
        <li>Bananas</li>
      </ul>
    </li>
    <li>Vegetables</li>
  </ul>

Wrong nesting (list is outside the parent <li>):
  <ul>
    <li>Fruits</li>
      <ul>
        <li>Apples</li>   \u2717 WRONG: this <ul> is a sibling of <li>, not a child
      </ul>
  </ul>

You can mix types: put an <ol> inside a <ul> or vice versa.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

LISTS FOR NAVIGATION
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Navigation menus are almost always coded as lists:

  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/blog">Blog</a></li>
    </ul>
  </nav>

Then CSS removes bullets and arranges items horizontally:
  nav ul { list-style: none; display: flex; gap: 16px; padding: 0; }

This is the industry-standard pattern for all navigation bars.
Why a list? Because it's semantically correct (it IS a list of links)
and screen readers announce "navigation, list of 3 items."

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udcdd PRACTICE QUESTIONS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
1. When should you use <ul> vs <ol>?
   Answer: <ul> when order doesn't matter (ingredients); <ol> when order matters (steps).

2. What are the three tags in a description list?
   Answer: <dl> (container), <dt> (term), <dd> (description)

3. How do you make an ordered list count down?
   Answer: Add the reversed attribute: <ol reversed>

4. How do you remove bullet points from a list with CSS?
   Answer: list-style: none;

5. Where must a nested list be placed?
   Answer: Inside the parent <li> element, not after it.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udccc LESSON SUMMARY
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  \u2713 <ul> \u2014 unordered list (bullets); use when order doesn't matter
  \u2713 <ol> \u2014 ordered list (numbers); use when order matters
  \u2713 <li> \u2014 list item inside both <ul> and <ol>
  \u2713 <dl> \u2014 description list; <dt> = term; <dd> = description
  \u2713 Nested lists must go INSIDE the parent <li> element
  \u2713 <ol start="N"> starts at N; reversed counts down; type sets marker
  \u2713 list-style: none removes bullets (standard for navigation menus)
  \u2713 Navigation menus use <ul> inside <nav> with CSS flex layout

\u2192 Next Lesson: Block vs Inline Elements`,
  });

  const [q15] = await db.insert(quizzesTable).values({ courseId: c15.id, title: "Lists \u2014 Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q15.id, question: "Which tag creates an unordered (bulleted) list?", options: ["<ol>", "<ul>", "<dl>", "<list>"], correctIndex: 1 },
    { quizId: q15.id, question: "Which tag creates an ordered (numbered) list?", options: ["<ul>", "<list>", "<ol>", "<nl>"], correctIndex: 2 },
    { quizId: q15.id, question: "Which tag represents a list item in both <ul> and <ol>?", options: ["<item>", "<li>", "<dt>", "<entry>"], correctIndex: 1 },
    { quizId: q15.id, question: "When should you use <ol> instead of <ul>?", options: ["When items have descriptions", "When items have images", "When the order of items matters (steps, rankings)", "When items have links"], correctIndex: 2 },
    { quizId: q15.id, question: "Which three tags make up a description list?", options: ["<dl>, <dt>, <dd>", "<dl>, <li>, <di>", "<list>, <term>, <def>", "<desc>, <term>, <data>"], correctIndex: 0 },
    { quizId: q15.id, question: "In a description list, <dt> represents:", options: ["The list data", "The description term/word being described", "The description detail", "The list title"], correctIndex: 1 },
    { quizId: q15.id, question: "In a description list, <dd> represents:", options: ["The description title", "The term being described", "The definition or description detail", "A data item"], correctIndex: 2 },
    { quizId: q15.id, question: "Which <ol> attribute makes the list count in reverse?", options: ["reverse", "countdown", "reversed", "descending"], correctIndex: 2 },
    { quizId: q15.id, question: "Which attribute on <ol> sets the starting number?", options: ["begin", "from", "offset", "start"], correctIndex: 3 },
    { quizId: q15.id, question: "<ol type='A'> produces which markers?", options: ["1, 2, 3", "I, II, III", "A, B, C", "a, b, c"], correctIndex: 2 },
    { quizId: q15.id, question: "<ol type='i'> produces which markers?", options: ["I, II, III", "i, ii, iii", "a, b, c", "1, 2, 3"], correctIndex: 1 },
    { quizId: q15.id, question: "Where must a nested list be placed?", options: ["After the parent <li> closing tag", "Inside the parent <li> element", "Before the <ul> closing tag", "After the <ul> closing tag"], correctIndex: 1 },
    { quizId: q15.id, question: "Which CSS property removes list bullets?", options: ["list-style: 0", "bullet: none", "list-style: none", "marker: hidden"], correctIndex: 2 },
    { quizId: q15.id, question: "What is the industry-standard HTML pattern for a navigation menu?", options: ["<nav> with <div> items", "<nav> with <a> tags only", "<nav> with <ul> and <li><a> items", "<menu> with <option> items"], correctIndex: 2 },
    { quizId: q15.id, question: "What CSS makes a list display horizontally?", options: ["list-style: inline", "display: flex (on the list container) with list-style: none", "float: left on each li", "Both B and C are valid"], correctIndex: 3 },
    { quizId: q15.id, question: "Which list type is best for a glossary of programming terms?", options: ["<ul>", "<ol>", "<dl>", "<table>"], correctIndex: 2 },
    { quizId: q15.id, question: "Can you nest an <ol> inside a <ul>?", options: ["No, you can only nest same types", "Yes, any list can be nested inside any <li>", "Only if they have the same number of items", "Only in HTML5"], correctIndex: 1 },
    { quizId: q15.id, question: "What is the default bullet style for <ul>?", options: ["Square", "Circle", "Disc (filled circle)", "Dash"], correctIndex: 2 },
    { quizId: q15.id, question: "A <dt> element can be followed by:", options: ["Only one <dd>", "Multiple <dd> elements", "Another <dt> only", "Only <li> elements"], correctIndex: 1 },
    { quizId: q15.id, question: "Why are navigation menus coded as lists semantically?", options: ["Lists are faster to render", "A nav menu is semantically a list of links; screen readers announce item count", "Lists have built-in keyboard navigation", "Lists are easier to style"], correctIndex: 1 },
  ]);

  // ── LESSON 16: Block vs Inline Elements ───────────────────────────
  const [c16] = await db.insert(coursesTable).values({
    languageId: htmlLang.id,
    title: "HTML Lesson 16: Block vs Inline Elements",
    description: "Understand the fundamental display difference between block-level and inline elements, how they affect layout, and when to use <div> and <span>.",
    level: "beginner",
    xpReward: 100,
  }).returning();

  await db.insert(lessonsTable).values({
    courseId: c16.id,
    title: "Block vs Inline Elements",
    order: 1,
    language: "html",
    xpReward: 30,
    codeExample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Block vs Inline Elements</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }

      /* Make block and inline visible */
      .block-demo   { background: #aed6f1; padding: 10px; margin: 6px 0; border: 2px solid #2980b9; }
      .inline-demo  { background: #a9dfbf; padding: 4px 8px; border: 2px solid #27ae60; }

      /* Using div for layout sections */
      .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        max-width: 320px;
        margin: 20px 0;
      }
      .card h3 { margin: 0 0 8px; }
      .card p  { margin: 0; color: #555; }
    </style>
  </head>
  <body>

    <h1>Block vs Inline Elements</h1>

    <!-- BLOCK ELEMENTS: Each takes its own full line -->
    <h2>Block Elements (each on their own line)</h2>

    <div class="block-demo">&lt;div&gt; is a block element</div>
    <div class="block-demo">&lt;p&gt; is a block element</div>
    <div class="block-demo">&lt;h1&gt;&ndash;&lt;h6&gt; are block elements</div>
    <div class="block-demo">&lt;ul&gt; and &lt;ol&gt; are block elements</div>
    <div class="block-demo">&lt;table&gt; is a block element</div>
    <div class="block-demo">&lt;form&gt; is a block element</div>

    <!-- INLINE ELEMENTS: Flow within the text, side by side -->
    <h2>Inline Elements (flow within text)</h2>

    <p>
      This paragraph contains
      <span class="inline-demo">&lt;span&gt;</span>,
      <strong class="inline-demo">&lt;strong&gt;</strong>,
      <em class="inline-demo">&lt;em&gt;</em>, and
      <a href="#" class="inline-demo">&lt;a&gt;</a>
      \u2014 all inline, all on the same line.
    </p>

    <!-- DIV: generic block container for grouping -->
    <h2>Using &lt;div&gt; as a Layout Container</h2>
    <div class="card">
      <h3>JavaScript Essentials</h3>
      <p>Master the fundamentals of modern JavaScript.</p>
    </div>

    <!-- SPAN: generic inline container for styling text -->
    <h2>Using &lt;span&gt; for Inline Styling</h2>
    <p>
      The price is
      <span style="color: red; font-weight: bold; font-size: 1.2em;">$49.99</span>
      per month.
    </p>

    <!-- Block inside inline: WRONG (shown for reference only) -->
    <!-- Never do: <span><p>text</p></span> -->

    <!-- Try It: Add a div with class="card" for another course.
         Inside it, use a span to style one word in the description. -->

  </body>
</html>`,
    content: `\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
  LESSON 16 \u2014 BLOCK vs INLINE ELEMENTS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

\ud83c\udfaf LEARNING OBJECTIVES
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
After completing this lesson, you will be able to:
  \u2022 Explain the difference between block and inline elements
  \u2022 List common block and inline HTML elements
  \u2022 Use <div> as a block-level grouping container
  \u2022 Use <span> as an inline styling container
  \u2022 Understand the nesting rules (no block inside inline)
  \u2022 Understand how CSS can change display behaviour

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

WHAT ARE BLOCK-LEVEL ELEMENTS?
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Block-level elements have these characteristics:

  \u2022 FULL WIDTH: Always take up the entire available width of their
    parent container, even if the content is short.

  \u2022 NEW LINE: Always start on a new line. The next element after
    a block element also starts on a new line.

  \u2022 HEIGHT/WIDTH SETTABLE: You can set width, height, margin,
    and padding on all four sides.

  \u2022 CAN CONTAIN BOTH: Can contain other block elements and inline
    elements.

Visual mental model:
  Think of block elements as "paragraphs of content" \u2014
  each one occupies its own row, like paragraphs in a document.

Common block elements:
  <div>         \u2014 Generic block container (no semantic meaning)
  <p>           \u2014 Paragraph
  <h1>\u2013<h6>     \u2014 Headings
  <ul>, <ol>    \u2014 Lists
  <li>          \u2014 List item
  <table>       \u2014 Table
  <form>        \u2014 Form
  <header>      \u2014 Page/section header
  <footer>      \u2014 Page/section footer
  <main>        \u2014 Main content
  <section>     \u2014 Thematic section
  <article>     \u2014 Self-contained content
  <aside>       \u2014 Sidebar/tangential content
  <nav>         \u2014 Navigation
  <blockquote>  \u2014 Block quotation
  <pre>         \u2014 Preformatted text
  <hr>          \u2014 Horizontal rule
  <figure>      \u2014 Figure container

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

WHAT ARE INLINE ELEMENTS?
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Inline elements have these characteristics:

  \u2022 CONTENT WIDTH ONLY: Take up only as much width as their content.
    They do NOT start on a new line.

  \u2022 FLOW WITH TEXT: Sit within the flow of surrounding text.
    Multiple inline elements appear side-by-side on the same line.

  \u2022 HEIGHT/WIDTH NOT SETTABLE (directly): You cannot set width and
    height on inline elements. You CAN set left/right padding and
    margin, but NOT top/bottom reliably.

  \u2022 CAN CONTAIN: Other inline elements and text only.
    CANNOT contain block-level elements.

Visual mental model:
  Think of inline elements as words within a sentence \u2014 they flow
  with the surrounding text and wrap naturally when the line runs out.

Common inline elements:
  <span>    \u2014 Generic inline container (no semantic meaning)
  <a>       \u2014 Anchor/link
  <strong>  \u2014 Bold (semantic importance)
  <em>      \u2014 Italic (semantic emphasis)
  <b>       \u2014 Bold (visual)
  <i>       \u2014 Italic (visual)
  <u>       \u2014 Underline
  <s>       \u2014 Strikethrough
  <mark>    \u2014 Highlight
  <code>    \u2014 Inline code
  <q>       \u2014 Inline quotation
  <abbr>    \u2014 Abbreviation
  <img>     \u2014 Image (technically replaced inline)
  <input>   \u2014 Form input
  <button>  \u2014 Button
  <label>   \u2014 Form label
  <small>   \u2014 Small text
  <sup>     \u2014 Superscript
  <sub>     \u2014 Subscript

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

<div> \u2014 THE BLOCK CONTAINER
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
<div> is a generic block container with NO semantic meaning.
Use it purely for layout and styling grouping when no semantic
element (<section>, <article>, <nav>) is appropriate.

Common uses:
  \u2022 Wrapping a card, modal, or panel for CSS styling
  \u2022 Creating layout columns (with CSS flexbox/grid)
  \u2022 Grouping elements that belong together visually

Example:
  <div class="card">
    <img src="photo.jpg" alt="Product photo">
    <h3>Product Name</h3>
    <p>$29.99</p>
    <button>Add to Cart</button>
  </div>

Rule of thumb: Use a semantic element if one fits the content.
Use <div> only as a last resort for layout/styling.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

<span> \u2014 THE INLINE CONTAINER
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
<span> is a generic inline container with NO semantic meaning.
Use it to style or select part of a text run.

Common uses:
  \u2022 Coloring or styling a single word or phrase
  \u2022 Adding a class to part of a text for JavaScript targeting
  \u2022 Wrapping text for CSS custom styling

Example:
  <p>
    Your subscription renews on
    <span class="highlight">January 1, 2025</span>.
  </p>

  <p>
    Status: <span style="color: green; font-weight: bold;">Active</span>
  </p>

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

NESTING RULES
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
The critical rule: Inline elements CANNOT contain block elements.

VALID:
  Block inside block:         <div><p>text</p></div>          \u2713
  Inline inside block:        <p><strong>bold</strong></p>     \u2713
  Inline inside inline:       <a><strong>link</strong></a>     \u2713
  Block inside block + more:  <div><h2>title</h2><p>...</p></div> \u2713

INVALID:
  Block inside inline: <span><p>text</p></span>    \u2717 INVALID
  Block inside inline: <a><div>card</div></a>      \u2717 INVALID (except in HTML5 <a> special rule)
  Block inside inline: <strong><ul>...</ul></strong>  \u2717 INVALID

Why this matters: Invalid nesting causes browsers to "fix" your HTML
in unexpected ways, leading to layout bugs that are hard to diagnose.

HTML5 Special Exception: <a> wrapping block-level content (like a
<div> or <figure>) is technically allowed in HTML5, making entire
card components clickable links. But this remains a special case.

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

CSS DISPLAY PROPERTY \u2014 CHANGING THE DEFAULT
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
CSS can override the default block/inline behaviour:

  display: block;        \u2014 Makes an inline element act like a block
  display: inline;       \u2014 Makes a block element act like inline
  display: inline-block; \u2014 Behaves inline but you CAN set width/height
  display: flex;         \u2014 Block, but children use Flexbox layout
  display: grid;         \u2014 Block, but children use Grid layout
  display: none;         \u2014 Hides the element entirely (removed from layout)

Most useful: inline-block
  Elements sit side by side like inline, but you can control their
  size like a block. Used for buttons, badges, cards in a row, etc.

  span {
    display: inline-block;
    width: 100px;
    height: 30px;
    background: blue;
  }

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

QUICK COMPARISON TABLE
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Feature               Block         Inline
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Starts on new line?   Yes           No
Full width by default?  Yes         No (content width only)
Can set width/height?   Yes         No (use inline-block)
Contains block kids?  Yes           No
Examples              div, p, h1    span, a, strong, em
Generic container     <div>         <span>

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udcdd PRACTICE QUESTIONS
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
1. What are the two key visual behaviours of block elements?
   Answer: They take the full width of their container and start on a new line.

2. What is the generic inline container tag?
   Answer: <span>

3. What is the generic block container tag?
   Answer: <div>

4. Can an inline element contain a block element?
   Answer: No \u2014 inline elements cannot contain block-level elements.

5. What CSS display value lets an element sit inline but accept width/height?
   Answer: display: inline-block

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udcbb CODING EXERCISES
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Exercise 1: Use <div> and <span> correctly.
  Task: Highlight just the price in a paragraph.
  Answer: <p>The cost is <span style="color: red;">$29</span> per month.</p>

Exercise 2: Is the following valid HTML?
  <span><p>Hello</p></span>
  Answer: No \u2014 invalid. A block element (<p>) cannot be inside an inline element (<span>).

Exercise 3: What display value would you use to show several <span>
  elements side by side with set widths?
  Answer: display: inline-block

Exercise 4: Convert a list into an inline horizontal row.
  Answer: ul { list-style: none; display: flex; gap: 16px; } (or inline-block on li)

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udd2c TRY IT YOURSELF
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
In the code editor:
  1. Add background-color to a <div> and a <span> \u2014 see the size difference
  2. Try setting width: 200px on a <span> (it won't work); then add
     display: inline-block and try again
  3. Create 3 <div> elements side by side using display: flex on the parent
  4. Build a card component: a <div> containing an <img>, <h3>, <p>, and a <span>
     with a colored price
  5. Try nesting a <p> inside a <span> and observe the browser's correction

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\ud83d\udccc LESSON SUMMARY
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  \u2713 Block elements: full width, new line, can contain blocks and inline
  \u2713 Inline elements: content width, flow with text, contain inline only
  \u2713 <div> = generic block container; <span> = generic inline container
  \u2713 Never put block elements inside inline elements (except HTML5 <a> exception)
  \u2713 display: block makes inline act as block
  \u2713 display: inline makes block act as inline
  \u2713 display: inline-block sits inline but accepts width and height
  \u2713 display: none hides an element completely
  \u2713 Common block elements: div, p, h1-h6, ul, ol, section, article, nav
  \u2713 Common inline elements: span, a, strong, em, code, img, button

\u2192 Congratulations! You have completed Lessons 9\u201316 of the HTML course.
   Continue to the next module to learn HTML Forms and Input.`,
  });

  const [q16] = await db.insert(quizzesTable).values({ courseId: c16.id, title: "Block vs Inline Elements \u2014 Quiz" }).returning();
  await db.insert(quizQuestionsTable).values([
    { quizId: q16.id, question: "Which statement best describes a block-level element?", options: ["Takes only as much width as its content", "Always starts on a new line and takes full available width", "Cannot contain other elements", "Is always invisible"], correctIndex: 1 },
    { quizId: q16.id, question: "Which statement best describes an inline element?", options: ["Always starts on a new line", "Takes full available width", "Flows within the surrounding text and takes only content width", "Can contain block elements"], correctIndex: 2 },
    { quizId: q16.id, question: "Which is the generic BLOCK container element?", options: ["<span>", "<section>", "<div>", "<p>"], correctIndex: 2 },
    { quizId: q16.id, question: "Which is the generic INLINE container element?", options: ["<div>", "<span>", "<article>", "<nav>"], correctIndex: 1 },
    { quizId: q16.id, question: "Which of these is a block-level element?", options: ["<strong>", "<em>", "<span>", "<h1>"], correctIndex: 3 },
    { quizId: q16.id, question: "Which of these is an inline element?", options: ["<p>", "<div>", "<a>", "<section>"], correctIndex: 2 },
    { quizId: q16.id, question: "Can you set width and height directly on an inline element?", options: ["Yes", "No, inline elements ignore width and height", "Only with pixels, not percentages", "Only in Chrome"], correctIndex: 1 },
    { quizId: q16.id, question: "Which CSS display value lets an element sit inline but accept width and height?", options: ["display: block", "display: inline", "display: flex", "display: inline-block"], correctIndex: 3 },
    { quizId: q16.id, question: "Is <span><p>text</p></span> valid HTML?", options: ["Yes", "No \u2014 block elements cannot be placed inside inline elements", "Only in HTML5", "Only if p has no text content"], correctIndex: 1 },
    { quizId: q16.id, question: "What does display: none do to an element?", options: ["Makes it transparent", "Hides it but keeps its space in the layout", "Removes it from the layout entirely", "Makes it semi-transparent"], correctIndex: 2 },
    { quizId: q16.id, question: "Which element should you use to wrap a set of related HTML elements for layout purposes when no semantic tag fits?", options: ["<section>", "<div>", "<article>", "<p>"], correctIndex: 1 },
    { quizId: q16.id, question: "Which element should you use to style a single word within a paragraph?", options: ["<div>", "<em>", "<span>", "<mark>"], correctIndex: 2 },
    { quizId: q16.id, question: "What happens when you put two block elements next to each other?", options: ["They appear side by side", "Each one goes to its own line", "The second overlaps the first", "They merge into one element"], correctIndex: 1 },
    { quizId: q16.id, question: "What happens when you put two inline elements next to each other?", options: ["They appear on separate lines", "They appear side by side on the same line", "The second goes below the first", "They merge into one"], correctIndex: 1 },
    { quizId: q16.id, question: "Which CSS property changes an element's block/inline behaviour?", options: ["position", "float", "display", "visibility"], correctIndex: 2 },
    { quizId: q16.id, question: "Which is a valid nesting of elements?", options: ["<span><div>text</div></span>", "<a><h2>text</h2></a>", "<p><strong>text</strong></p>", "<em><p>text</p></em>"], correctIndex: 2 },
    { quizId: q16.id, question: "What is display: flex applied to?", options: ["The flex children", "The flex container (parent)", "Individual flex items", "The body only"], correctIndex: 1 },
    { quizId: q16.id, question: "The <img> element is technically:", options: ["A block element", "An inline-block / replaced inline element", "A flex container", "A table element"], correctIndex: 1 },
    { quizId: q16.id, question: "Why should you prefer semantic elements like <section> over <div>?", options: ["<section> is faster", "<div> is deprecated", "Semantic elements convey meaning to browsers, screen readers, and search engines", "There is no real difference"], correctIndex: 2 },
    { quizId: q16.id, question: "Which display value hides an element while preserving its space in the layout?", options: ["display: none", "visibility: hidden", "opacity: 0 only", "display: hidden"], correctIndex: 1 },
  ]);

  console.log("\u2705 HTML Lessons 9\u201316 seeded successfully!");
  console.log("   8 lesson-courses created");
  console.log("   8 detailed lessons (one per course)");
  console.log("   8 quizzes \u00d7 20 questions = 160 quiz questions");
  return { message: "HTML Lessons 9\u201316 seeded successfully \u2014 8 lessons, 160 quiz questions" };
}
