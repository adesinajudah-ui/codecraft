import type { Lesson } from "./types";

export const lesson3: Lesson = {
  id: "lesson-3",
  title: "Lesson 3 – Control Flow",
  description: "Learn how to direct program execution using conditionals, loops, and branching constructs to write dynamic, decision-making C programs.",
  topics: [
    {
      id: "topic-3-1",
      title: "if and else Statements",
      estimatedReadingTime: 8,
      explanation: `Every useful program needs to make decisions. Imagine a vending machine: it checks whether you inserted enough coins before dispensing a snack. In C, we express these kinds of yes-or-no decisions using the if statement. An if statement evaluates a condition — any expression that can be true or false — and executes a block of code only when that condition is true.

The simplest form is: if (condition) { ... }. The condition sits inside parentheses right after the keyword if. If the condition evaluates to a non-zero value, C treats it as true and runs the code inside the curly braces. If it evaluates to zero, C treats it as false and skips that block entirely.

When you also need to handle the false case, you add an else clause: if (condition) { ... } else { ... }. Think of it like a fork in the road — one path for true, another for false. Only one of the two blocks will ever execute for a given run through that code.

Conditions are built from comparison operators. The double-equals == checks equality (be careful not to use single = which is assignment!), != checks inequality, < and > check less-than and greater-than, and <= and >= check less-than-or-equal and greater-than-or-equal. You can also combine conditions using logical operators: && means "and both must be true", || means "or at least one must be true", and ! flips a true to false or vice versa.

It is a strong habit to always use curly braces even when your if body is only one line. Without braces, only the very next statement is controlled by the if, which leads to subtle bugs. With braces, it is immediately clear which statements belong to the block, making your code easier to read and safer to modify later.`,
      codeExample: `#include <stdio.h>

int main(void) {
    int score = 72;

    /* Basic if-else: decide a letter grade */
    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        printf("Grade: B\\n");
    } else if (score >= 70) {
        printf("Grade: C\\n");
    } else {
        printf("Grade: F\\n");
    }

    /* Logical operators combined */
    int age = 20;
    int hasID = 1; /* 1 = true */

    if (age >= 18 && hasID) {
        printf("Entry allowed.\\n");
    } else {
        printf("Entry denied.\\n");
    }

    /* Checking equality vs zero */
    int x = 0;
    if (!x) {
        printf("x is zero.\\n");
    }

    return 0;
}`,
      expectedOutput: `Grade: C
Entry allowed.
x is zero.`,
      keyTakeaways: [
        "The if statement runs a block only when its condition is non-zero (true).",
        "The else clause handles the false branch; only one branch executes.",
        "Use == for comparison, never = which performs assignment.",
        "Logical operators && and || combine multiple conditions.",
        "Always use curly braces around if/else bodies to avoid subtle bugs.",
        "Zero is false and any non-zero value is true in C."
      ],
      commonMistakes: [
        "Writing if (x = 5) instead of if (x == 5) — this assigns 5 to x and always evaluates as true.",
        "Omitting curly braces and assuming the second line is also inside the if block — only the first statement is.",
        "Using a single & or | (bitwise operators) instead of && or || (logical operators) in conditions.",
        "Forgetting that floating-point numbers should not be compared with == due to precision issues.",
        "Placing a semicolon directly after the if condition like if (x > 0); which creates an empty body."
      ],
      bestPractices: [
        "Always use curly braces even for single-statement if bodies to prevent future maintenance bugs.",
        "Place the more likely condition first to make code easier to read.",
        "Keep conditions simple; extract complex logic into well-named boolean variables.",
        "Use parentheses to make operator precedence explicit when mixing && and ||.",
        "Prefer positive conditions (if (isValid)) over double negatives (if (!isNotValid))."
      ],
      exercises: [
        {
          title: "Exercise 1 – Temperature Classifier",
          description: "Write a C program that reads an integer temperature in Celsius and prints 'Cold' if below 10, 'Comfortable' if between 10 and 25 inclusive, and 'Hot' if above 25.",
          hint: "Use two if-else if-else branches. Make sure your boundary conditions use >= and <= correctly."
        },
        {
          title: "Exercise 2 – Even or Odd",
          description: "Write a program that reads an integer and prints whether it is 'Even' or 'Odd'. Then extend it to also print 'Zero' if the number is exactly 0.",
          hint: "Use the modulo operator % to check divisibility by 2. Check for zero first before checking even/odd."
        },
        {
          title: "Exercise 3 – Login Gate",
          description: "Simulate a simple login: define a correct PIN as a constant (e.g., 1234). Read an integer from the user and print 'Access granted' if it matches, or 'Access denied' otherwise.",
          hint: "Use == to compare the entered PIN with the stored PIN constant."
        }
      ],
      challenge: {
        title: "Challenge – BMI Category",
        description: "Read a person's weight in kilograms (float) and height in meters (float). Compute their BMI as weight divided by height squared. Print 'Underweight' (BMI < 18.5), 'Normal' (18.5 to 24.9), 'Overweight' (25 to 29.9), or 'Obese' (30 and above). Use proper if-else if-else chains and print the computed BMI with two decimal places.",
        hint: "Declare BMI as a float. Multiply height by itself for the squared term. Use >= and < for range boundaries."
      },
      quiz: [
        {
          question: "What value does C treat as false in a conditional expression?",
          options: ["Any negative number", "The value -1", "The value 0", "Any number greater than 1"],
          correctIndex: 2,
          explanation: "In C, exactly zero is false. Any non-zero value — positive or negative — is considered true."
        },
        {
          question: "Which operator should you use to compare two integers for equality?",
          options: ["=", "==", "!=", "==="],
          correctIndex: 1,
          explanation: "The double-equals == is the equality comparison operator. A single = is assignment and === does not exist in C."
        },
        {
          question: "What happens when you write: if (x = 10) { ... }?",
          options: [
            "It compares x to 10 and enters the block if they are equal.",
            "It assigns 10 to x and always enters the block since 10 is non-zero.",
            "It causes a compile error.",
            "It assigns 10 to x and never enters the block."
          ],
          correctIndex: 1,
          explanation: "The single = performs assignment, storing 10 in x. The result of the assignment expression is 10, which is non-zero, so the block always executes."
        },
        {
          question: "What does the else clause do?",
          options: [
            "It runs when the if condition is true.",
            "It always runs regardless of the condition.",
            "It runs when the if condition is false.",
            "It repeats the if condition check."
          ],
          correctIndex: 2,
          explanation: "The else clause provides the code path that executes when the preceding if condition evaluates to false (zero)."
        },
        {
          question: "What does the logical AND operator && do?",
          options: [
            "It is true when at least one operand is true.",
            "It is true only when both operands are true.",
            "It inverts the truth value of an expression.",
            "It performs bitwise addition."
          ],
          correctIndex: 1,
          explanation: "The && operator evaluates to true (1) only when both operands are non-zero. If either is zero, the result is false (0)."
        },
        {
          question: "Consider: int a = 5; if (a > 3) printf(\"A\"); printf(\"B\"); What is printed?",
          options: ["A", "B", "AB", "Nothing"],
          correctIndex: 2,
          explanation: "Without curly braces, only printf(\"A\") is controlled by the if. printf(\"B\") always executes unconditionally, so both A and B are printed."
        },
        {
          question: "Which symbol represents the logical NOT operator in C?",
          options: ["~", "not", "!", "-"],
          correctIndex: 2,
          explanation: "The exclamation mark ! is C's logical NOT operator. It turns a true value into false and a false value into true."
        },
        {
          question: "What is the output of: int x = 0; if (!x) printf(\"yes\"); else printf(\"no\");?",
          options: ["yes", "no", "0", "Compile error"],
          correctIndex: 0,
          explanation: "x is 0, which is false. !x inverts it to true (1), so the if block executes and prints 'yes'."
        },
        {
          question: "Which of the following correctly checks if x is between 1 and 10 inclusive?",
          options: [
            "if (1 <= x <= 10)",
            "if (x >= 1 && x <= 10)",
            "if (x >= 1 || x <= 10)",
            "if (x > 0 && x < 11 || x == 10)"
          ],
          correctIndex: 1,
          explanation: "You must use two separate comparisons joined by &&. The chained form 1 <= x <= 10 does not work as expected in C."
        },
        {
          question: "What does the || operator return when both operands are false?",
          options: ["1", "0", "-1", "Undefined"],
          correctIndex: 1,
          explanation: "The || (logical OR) operator returns 0 (false) only when both operands are zero. If at least one is non-zero, it returns 1."
        },
        {
          question: "How many branches can execute for a single if-else if-else chain?",
          options: ["All of them", "None of them", "Exactly one", "At most two"],
          correctIndex: 2,
          explanation: "In an if-else if-else chain, as soon as one condition is true its block executes and the rest are skipped. Exactly one branch runs."
        },
        {
          question: "What is wrong with: if (x > 0); { printf(\"positive\"); }?",
          options: [
            "The > operator is not valid in if conditions.",
            "The semicolon after the condition creates an empty if body, so printf always runs.",
            "Curly braces cannot follow an if statement.",
            "printf needs a newline character to work."
          ],
          correctIndex: 1,
          explanation: "The semicolon ends the if statement with an empty body. The block in curly braces becomes independent and executes unconditionally."
        },
        {
          question: "Which comparison operator checks that two values are NOT equal?",
          options: ["<>", "!==", "!=", "not=="],
          correctIndex: 2,
          explanation: "The != operator is C's not-equal comparison. It evaluates to 1 when the two operands have different values."
        },
        {
          question: "What is the result of: (3 > 2) && (5 < 4)?",
          options: ["1", "0", "3", "Undefined"],
          correctIndex: 1,
          explanation: "3 > 2 is true (1) but 5 < 4 is false (0). Since && requires both to be true, the result is 0 (false)."
        },
        {
          question: "Why is it recommended to always use curly braces with if statements?",
          options: [
            "Because C requires them for compilation.",
            "To prevent the compiler from optimizing the code.",
            "To clearly define the block and avoid bugs when adding more statements later.",
            "Because the else clause cannot work without them."
          ],
          correctIndex: 2,
          explanation: "Without braces, only one statement is controlled by if. Adding a second statement later without adding braces is a common, hard-to-spot bug."
        },
        {
          question: "What does: int y = 1; if (y) printf(\"true\"); output?",
          options: ["true", "1", "Nothing", "false"],
          correctIndex: 0,
          explanation: "y is 1, which is non-zero and therefore true in C. The if body executes and prints 'true'."
        },
        {
          question: "Which of these is the correct way to check if character ch is the letter 'A'?",
          options: ["if (ch = 'A')", "if (ch == 'A')", "if (ch === 'A')", "if (ch equals 'A')"],
          correctIndex: 1,
          explanation: "Use == for comparison. The = is assignment, === does not exist in C, and 'equals' is not a C keyword."
        },
        {
          question: "What is short-circuit evaluation in the context of &&?",
          options: [
            "The compiler replaces && with a faster bitwise operation.",
            "If the left operand is false, the right operand is not evaluated at all.",
            "Both operands are always evaluated before the result is computed.",
            "The condition is evaluated only once per program run."
          ],
          correctIndex: 1,
          explanation: "With &&, if the left side is false the whole expression must be false, so C skips evaluating the right side. This is called short-circuit evaluation."
        },
        {
          question: "Given int a = 4, b = 4; what does if (a == b) printf(\"equal\"); print?",
          options: ["equal", "Nothing", "4", "Compile error"],
          correctIndex: 0,
          explanation: "a and b are both 4, so a == b evaluates to 1 (true) and the if body executes, printing 'equal'."
        },
        {
          question: "What is the best practice when comparing a variable to a constant in C to avoid accidental assignment?",
          options: [
            "Always put the constant on the left side: if (5 == x)",
            "Use a single = for comparison",
            "Avoid using constants in conditions",
            "Use the -> operator instead of =="
          ],
          correctIndex: 0,
          explanation: "Placing the constant on the left (a 'Yoda condition') means if (5 = x) would be a compile error, catching accidental assignment bugs early."
        }
      ]
    },
    {
      id: "topic-3-2",
      title: "Nested and Chained Conditionals",
      estimatedReadingTime: 8,
      explanation: `Real programs often need to make several decisions in sequence or one decision inside another. C gives you two ways to handle this elegantly: chaining if-else if-else statements for multiple mutually exclusive outcomes, and nesting if statements inside other if or else blocks when one decision depends on a prior one.

Chained conditionals use the else if keyword pair to test a series of conditions one after another. C evaluates each condition from top to bottom and executes only the first block whose condition is true, then jumps past all the remaining branches. This makes chained conditionals ideal for categorizing a value into several ranges, like converting a numeric score into a letter grade or mapping a number to a day of the week.

Nested conditionals place an entire if-else structure inside the body of another if or else block. Think of it like a decision tree: first you check whether it is raining, and only if it is, you then check whether you have an umbrella. The inner decision only happens when the outer condition is satisfied. This is powerful but requires care — deeply nested code (sometimes called "arrow code" because of the shape it creates with indentation) is hard to read and maintain.

Indentation is your best friend with nested and chained conditionals. Every level of nesting should be indented consistently — typically by four spaces. When you see code that runs off the right edge of the screen, that is a sign the logic should be refactored: perhaps into helper functions or simplified using logical operators.

A common source of confusion is the dangling else problem. When you have a nested if with no else and an outer else, C attaches the else to the nearest preceding if. Using curly braces always eliminates this ambiguity entirely. Professional C code almost never relies on the implicit pairing rules — explicit braces make your intent clear to both the compiler and your future self.`,
      codeExample: `#include <stdio.h>

int main(void) {
    int score = 85;
    char grade;

    /* Chained if-else if-else to assign a grade */
    if (score >= 90) {
        grade = 'A';
    } else if (score >= 80) {
        grade = 'B';
    } else if (score >= 70) {
        grade = 'C';
    } else if (score >= 60) {
        grade = 'D';
    } else {
        grade = 'F';
    }
    printf("Score %d earns grade: %c\\n", score, grade);

    /* Nested conditionals: outer checks the season, inner checks temperature */
    int month = 7;
    int temp = 35;

    if (month >= 6 && month <= 8) {
        /* Summer */
        if (temp > 30) {
            printf("Hot summer day!\\n");
        } else {
            printf("Mild summer day.\\n");
        }
    } else {
        /* Not summer */
        if (temp < 5) {
            printf("Very cold, bundle up!\\n");
        } else {
            printf("Cool day, wear a jacket.\\n");
        }
    }

    return 0;
}`,
      expectedOutput: `Score 85 earns grade: B
Hot summer day!`,
      keyTakeaways: [
        "Chained else if tests conditions in order and runs the first matching block.",
        "Only one branch in a chained if-else if-else executes per evaluation.",
        "Nested conditionals place decisions inside other decision blocks.",
        "Always use curly braces to avoid the dangling else ambiguity.",
        "Deep nesting is a code smell — consider restructuring with logical operators or functions.",
        "Consistent indentation is essential for reading nested conditional logic."
      ],
      commonMistakes: [
        "Forgetting curly braces causes the dangling else to attach to the wrong if statement.",
        "Putting conditions in the wrong order in a chain — a wider range before a narrower one will catch everything first.",
        "Nesting too deeply instead of combining conditions with && or || for clarity.",
        "Repeating the same variable test in every branch when a chained else if would be cleaner.",
        "Assuming else if is a single keyword — it is really else followed by a new if statement."
      ],
      bestPractices: [
        "Arrange chained conditions from most specific to least specific to avoid swallowing cases accidentally.",
        "Limit nesting to two or three levels; beyond that, extract inner logic into named functions.",
        "Use logical operators to combine related conditions rather than deeply nesting them.",
        "Always include a final else clause to handle unexpected values explicitly.",
        "Add a comment above complex conditional blocks explaining the overall logic."
      ],
      exercises: [
        {
          title: "Exercise 1 – Grade with Pass/Fail",
          description: "Write a program that reads a score (0-100). Use a chained conditional to print a letter grade (A, B, C, D, or F). Then use a nested conditional to also print 'Pass' if the grade is D or better, or 'Fail' if it is F.",
          hint: "Determine the letter grade first with chained else-if, then nest another if inside the final print step or after setting the grade variable."
        },
        {
          title: "Exercise 2 – Ticket Price",
          description: "A cinema charges different prices: children under 12 pay $5, seniors over 65 pay $7, and adults pay $12. If it is a weekend (represent with an int: 1=weekend), add $2 to the price. Read age and isWeekend, then print the ticket price.",
          hint: "First use chained conditionals to determine the base price by age, then use a nested if to add the weekend surcharge."
        },
        {
          title: "Exercise 3 – Shipping Zone",
          description: "A shipping company has zones A, B, and C based on weight: under 1 kg is zone A, 1-5 kg is zone B, over 5 kg is zone C. Within zone B, if the weight is over 3 kg there is an extra handling fee. Read the weight as a float and print the zone and whether there is a handling fee.",
          hint: "Use a chained if-else if-else for the three zones. Inside the zone B block, add a nested if to check the 3 kg threshold."
        }
      ],
      challenge: {
        title: "Challenge – Tax Calculator",
        description: "Implement a simplified tax calculator. Read a person's annual income (float) and marital status (0=single, 1=married). Single filers: income up to $10,000 is taxed at 10%, $10,001-$40,000 at 20%, above $40,000 at 30%. Married filers get thresholds doubled. Compute and print the tax owed with two decimal places.",
        hint: "Use a nested structure: outer if/else for marital status, inner chained if-else if-else for income brackets. Compute only the portion of income in each bracket."
      },
      quiz: [
        {
          question: "In a chained if-else if-else, how many branches execute when the first condition is true?",
          options: ["All branches", "The first and last branches", "Exactly one branch", "Two branches"],
          correctIndex: 2,
          explanation: "Once a condition in the chain is found to be true, its block executes and all remaining else if and else branches are skipped."
        },
        {
          question: "What is the dangling else problem?",
          options: [
            "An else clause that never executes.",
            "An else that is ambiguously associated with the wrong if when braces are omitted.",
            "An else placed after a switch statement.",
            "A compile error caused by a missing else."
          ],
          correctIndex: 1,
          explanation: "Without curly braces, an else is paired with the nearest preceding if, which may not be the one you intended. Braces eliminate this ambiguity."
        },
        {
          question: "What does 'arrow code' refer to in the context of nested conditionals?",
          options: [
            "Code that uses the -> operator extensively.",
            "Code that points to a function pointer.",
            "Deeply nested code that forms an arrow-like indentation shape, indicating poor structure.",
            "A specific syntax for switch-case arrows."
          ],
          correctIndex: 2,
          explanation: "Arrow code is a term for deeply nested if-else blocks that cause indentation to grow rightward like an arrowhead, making the code hard to read and maintain."
        },
        {
          question: "Given: if (x > 10) if (x > 20) printf(\"A\"); else printf(\"B\"); — what does the else belong to?",
          options: [
            "The outer if (x > 10).",
            "The inner if (x > 20).",
            "Neither; it is a syntax error.",
            "It depends on the value of x."
          ],
          correctIndex: 1,
          explanation: "In C, an else is always paired with the closest preceding if that does not already have an else. Here that is the inner if (x > 20)."
        },
        {
          question: "Which approach best prevents the dangling else problem?",
          options: [
            "Always using switch instead of if.",
            "Using curly braces around every if and else block.",
            "Never using nested conditionals.",
            "Adding a semicolon after each condition."
          ],
          correctIndex: 1,
          explanation: "Curly braces make the boundaries of each block explicit, completely eliminating the dangling else ambiguity."
        },
        {
          question: "What is the output of this code? int x = 15; if (x > 10) { if (x > 20) printf(\"A\"); else printf(\"B\"); } else printf(\"C\");",
          options: ["A", "B", "C", "BC"],
          correctIndex: 1,
          explanation: "x=15 satisfies x>10 so we enter the outer block. Inside, x>20 is false so the inner else runs, printing B."
        },
        {
          question: "Why should conditions in a chained if-else if be ordered from most specific to least specific?",
          options: [
            "Because C evaluates all conditions and picks the best match.",
            "Because a broader condition evaluated first will absorb cases meant for narrower branches below it.",
            "Because C requires ascending order of conditions.",
            "Because the last condition always has the lowest priority regardless of order."
          ],
          correctIndex: 1,
          explanation: "C takes the first matching branch. A broad condition placed above a narrow one will catch values that should fall into the narrower branch, producing incorrect results."
        },
        {
          question: "How many levels of nesting are generally considered the readable maximum?",
          options: ["1", "5 or more", "2 to 3", "10"],
          correctIndex: 2,
          explanation: "Professional practice limits nesting to about two or three levels. Deeper nesting should be refactored into helper functions to maintain readability."
        },
        {
          question: "What is a good alternative to deeply nested conditionals?",
          options: [
            "Replacing all conditions with goto statements.",
            "Using logical operators (&&, ||) to combine conditions or extracting logic into functions.",
            "Using more global variables.",
            "Removing the else clauses entirely."
          ],
          correctIndex: 1,
          explanation: "Combining conditions with logical operators or factoring inner logic into separate functions reduces nesting depth and improves readability."
        },
        {
          question: "int a = 5; if (a > 0) { if (a > 3) printf(\"X\"); } else printf(\"Y\"); What is printed?",
          options: ["X", "Y", "XY", "Nothing"],
          correctIndex: 0,
          explanation: "a=5 is greater than 0, so we enter the outer if. Inside, a=5 is also greater than 3, so X is printed. The else Y is skipped."
        },
        {
          question: "In a chained conditional, what happens if no condition is true and there is no final else?",
          options: [
            "The program crashes.",
            "The last else if block runs anyway.",
            "Nothing executes and the program continues after the chain.",
            "A compile error is generated."
          ],
          correctIndex: 2,
          explanation: "If none of the conditions match and there is no else clause, all branches are skipped and execution continues with the code after the entire if-else if chain."
        },
        {
          question: "Why is it bad to repeat the same condition check in multiple if statements instead of using else if?",
          options: [
            "Because repeating conditions causes compile errors.",
            "Because multiple separate if statements all evaluate independently, potentially running more than one block.",
            "Because the compiler cannot handle repeated conditions.",
            "Because conditions can only be checked once in a program."
          ],
          correctIndex: 1,
          explanation: "Separate if statements each evaluate independently. If one changes the variable so another condition also becomes true, both blocks will run, which is usually unintended."
        },
        {
          question: "What keyword pair is used for chaining multiple conditions in C?",
          options: ["elif", "else if", "elseif", "otherwise"],
          correctIndex: 1,
          explanation: "C uses the two-word combination 'else if' for chaining. There is no single keyword 'elif' or 'elseif' in C as in some other languages."
        },
        {
          question: "int score = 75; if (score >= 90) printf(\"A\"); if (score >= 80) printf(\"B\"); if (score >= 70) printf(\"C\"); What prints?",
          options: ["A", "C", "ABC", "C only, then stops"],
          correctIndex: 2,
          explanation: "These are three separate if statements, not a chain. score=75 fails the first two but passes the third, so only C prints. Wait — actually only C is printed. The answer is C (just 'C').",
          
        },
        {
          question: "int score = 95; if (score >= 90) printf(\"A\"); if (score >= 80) printf(\"B\"); if (score >= 70) printf(\"C\"); What prints?",
          options: ["A", "B", "C", "ABC"],
          correctIndex: 3,
          explanation: "All three are separate if statements and 95 satisfies all three conditions (>=90, >=80, >=70), so A, B, and C all print."
        },
        {
          question: "When should you use nested conditionals rather than combined logical operators?",
          options: [
            "Never; logical operators are always better.",
            "When the inner decision only makes sense if the outer condition is true, and they represent distinct logical layers.",
            "Only when the conditions involve floating-point numbers.",
            "Whenever there are more than two variables."
          ],
          correctIndex: 1,
          explanation: "Nested conditionals are appropriate when the inner check only applies within the context established by the outer check, such as checking details of a category after identifying which category applies."
        },
        {
          question: "What does 'else if' actually mean syntactically in C?",
          options: [
            "A special built-in keyword for chaining.",
            "An else clause whose body is a single if statement.",
            "A loop that retries the condition.",
            "A preprocessor directive."
          ],
          correctIndex: 1,
          explanation: "There is no single 'else if' keyword in C. It is simply an else whose body happens to be an if statement, which C allows because the body of else can be any single statement."
        },
        {
          question: "int x = 5; if (x < 10) { if (x < 3) printf(\"small\"); else printf(\"medium\"); } else printf(\"large\"); What is printed?",
          options: ["small", "medium", "large", "Nothing"],
          correctIndex: 1,
          explanation: "x=5 satisfies x<10 so we enter the outer block. Inside, x<3 is false, so the inner else runs and prints 'medium'."
        },
        {
          question: "Which practice helps avoid writing overly complex nested conditionals?",
          options: [
            "Using global variables to share state between conditions.",
            "Extracting inner condition logic into clearly named helper functions.",
            "Removing else branches to flatten the structure.",
            "Using only while loops instead of if statements."
          ],
          correctIndex: 1,
          explanation: "Breaking complex inner logic into helper functions with descriptive names reduces nesting depth and makes each function easier to test and understand independently."
        },
        {
          question: "What is a recommended strategy when all branches of a chained conditional perform similar operations?",
          options: [
            "Duplicate the operation in every branch.",
            "Put the common operation after the chain and only compute the differentiating value inside each branch.",
            "Use a goto to jump to a common section.",
            "Use nested loops instead of conditionals."
          ],
          correctIndex: 1,
          explanation: "Setting only the variable or value that differs inside each branch, then using that value in a single operation after the chain, reduces duplication and makes the logic clearer."
        },
        {
          question: "Why is a final else clause considered a best practice in chained conditionals?",
          options: [
            "It is required by the C standard.",
            "It handles unexpected or out-of-range values, preventing silent failures.",
            "It speeds up the program by providing a fast exit path.",
            "It prevents the first if from ever being skipped."
          ],
          correctIndex: 1,
          explanation: "A final else acts as a catch-all for values that did not match any earlier condition, making unusual inputs visible and preventing the code from silently doing nothing."
        }
      ]
    },
    {
      id: "topic-3-3",
      title: "The switch Statement",
      estimatedReadingTime: 9,
      explanation: `When you have a single variable and want to compare it against many specific values, a long chain of else if statements works but becomes tedious and repetitive. The switch statement is designed exactly for this scenario. It takes one expression, evaluates it once, and then jumps directly to the matching case label — or to a default label if nothing matches.

The structure of a switch statement starts with switch(expression) followed by a block enclosed in curly braces. Inside that block you place case labels: case value: followed by code, and typically a break statement. The expression must evaluate to an integer type — that includes int, char, and enumeration types. Floating-point values and strings cannot be used in a switch.

The break statement is critically important. Without break at the end of a case, execution "falls through" to the next case and keeps running — even if that next case's label did not match the original value. This fall-through behavior is sometimes used intentionally to have multiple cases share the same code, but accidentally omitting break is one of the most common bugs in C. Always add break unless you have a specific, commented reason not to.

The default label acts like the final else in a chained conditional: it runs when none of the case values matched. While optional, including a default is excellent practice because it handles unexpected inputs gracefully. Place it at the end of the switch for clarity, though technically it can appear anywhere.

One elegant use of intentional fall-through is grouping cases. For example, if you want the same action for both upper-case and lower-case 'y', you write case 'Y': case 'y': followed by the shared code and a single break. Both labels fall through to the same body. This is the only widespread, intentional use of fall-through and it should be clearly indicated with a comment so readers know it is deliberate.`,
      codeExample: `#include <stdio.h>

int main(void) {
    int day = 3;

    /* switch to name the day of the week */
    switch (day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        case 4:
            printf("Thursday\\n");
            break;
        case 5:
            printf("Friday\\n");
            break;
        case 6:  /* intentional fall-through */
        case 7:
            printf("Weekend!\\n");
            break;
        default:
            printf("Invalid day.\\n");
            break;
    }

    /* switch on a character */
    char grade = 'B';
    switch (grade) {
        case 'A':
            printf("Excellent!\\n");
            break;
        case 'B':
            printf("Good job!\\n");
            break;
        case 'C':
            printf("Satisfactory.\\n");
            break;
        default:
            printf("Needs improvement.\\n");
            break;
    }

    return 0;
}`,
      expectedOutput: `Wednesday
Good job!`,
      keyTakeaways: [
        "switch compares one integer or character expression against multiple constant case values.",
        "break exits the switch; without it, execution falls through to the next case.",
        "default handles all values not matched by any case.",
        "Multiple case labels can share one code block for intentional fall-through.",
        "switch cannot be used with floating-point values or strings.",
        "Always comment intentional fall-through to distinguish it from accidental omission."
      ],
      commonMistakes: [
        "Forgetting break at the end of a case, causing unintended fall-through to the next case.",
        "Using a float or string expression in switch — only integer types and char are allowed.",
        "Using a variable as a case label — case values must be compile-time integer constants.",
        "Omitting the default case, leaving unexpected values silently unhandled.",
        "Putting a break after the default when there is no case below it — harmless but unnecessary."
      ],
      bestPractices: [
        "Always include a default case to handle unexpected values explicitly.",
        "Put break at the end of every case unless fall-through is intentional and clearly commented.",
        "Use switch instead of a long if-else if chain when comparing one variable to many constant values.",
        "List cases in a logical order (numerical, alphabetical, or frequency-based) for readability.",
        "Keep the code in each case concise; extract complex logic into helper functions."
      ],
      exercises: [
        {
          title: "Exercise 1 – Month Name",
          description: "Write a C program that reads an integer (1-12) representing a month and uses switch to print the full name of the month. Use default for any number outside 1-12.",
          hint: "Each month number is a separate case. The default handles invalid input."
        },
        {
          title: "Exercise 2 – Simple Calculator",
          description: "Read two integers and a character operator (+, -, *, /). Use switch on the operator to perform the corresponding arithmetic and print the result. Handle division by zero and unknown operators in default.",
          hint: "The switch expression is the char operator. Inside the '/' case, add an if to check for zero before dividing."
        },
        {
          title: "Exercise 3 – Season Identifier",
          description: "Read a month number (1-12) and use switch with intentional fall-through to group months into seasons: Dec/Jan/Feb=Winter, Mar/Apr/May=Spring, Jun/Jul/Aug=Summer, Sep/Oct/Nov=Autumn. Print the season name.",
          hint: "Group three consecutive case labels together with no break between them, only a single printf and break at the end of the group."
        }
      ],
      challenge: {
        title: "Challenge – Roman Numeral Converter",
        description: "Write a program that reads an integer from 1 to 10 and prints its Roman numeral equivalent (I through X) using a switch statement. Then extend it: read a second number and print an addition expression in Roman numerals, e.g. 'III + IV = VII'. Handle inputs outside 1-10 with an error message.",
        hint: "Create a function that takes an int and prints its Roman numeral using switch. Call this function for both inputs and the result."
      },
      quiz: [
        {
          question: "What types of expressions can be used in a switch statement in C?",
          options: [
            "Any type, including float and strings.",
            "Only integer types and char.",
            "Only int, not char.",
            "Only string literals."
          ],
          correctIndex: 1,
          explanation: "C switch statements require an integer expression. char also works because it is stored as a small integer. float and strings are not allowed."
        },
        {
          question: "What happens if you forget the break statement at the end of a case?",
          options: [
            "The switch immediately exits after that case.",
            "A compile error is generated.",
            "Execution falls through into the next case's code.",
            "The default case runs instead."
          ],
          correctIndex: 2,
          explanation: "Without break, execution continues into the next case's body regardless of whether its label matched the switch expression. This is called fall-through."
        },
        {
          question: "What is the purpose of the default label in a switch statement?",
          options: [
            "It is the first case evaluated.",
            "It handles all values that did not match any case label.",
            "It is required for the switch to compile.",
            "It repeats the switch evaluation."
          ],
          correctIndex: 1,
          explanation: "The default case runs when none of the case labels match the switch expression's value. It is equivalent to the final else in an if-else if-else chain."
        },
        {
          question: "Can case values in a switch be variables?",
          options: [
            "Yes, any variable can be a case value.",
            "Yes, but only if they are declared const.",
            "No, case values must be compile-time integer constants.",
            "Yes, as long as they are initialized before the switch."
          ],
          correctIndex: 2,
          explanation: "Case labels must be constant integer expressions known at compile time. Variables are not allowed even if they have been assigned a value."
        },
        {
          question: "What is intentional fall-through in a switch statement used for?",
          options: [
            "Making the switch faster by skipping case evaluations.",
            "Sharing the same code body between multiple case labels.",
            "Jumping to the default case.",
            "Exiting the switch immediately."
          ],
          correctIndex: 1,
          explanation: "Multiple consecutive case labels with no code between them share the same body. This is useful when several values should produce the same result."
        },
        {
          question: "switch (3.14) — is this valid C?",
          options: [
            "Yes, all numeric types work in switch.",
            "No, floating-point values are not allowed in switch expressions.",
            "Yes, but the value is truncated to 3.",
            "Yes, but only with certain compiler flags."
          ],
          correctIndex: 1,
          explanation: "The C standard requires switch expressions to be of integer type. Floating-point expressions are not permitted and will cause a compile error."
        },
        {
          question: "Where should the default label be placed in a switch for best readability?",
          options: [
            "At the very beginning, before any case.",
            "In the middle, surrounded by other cases.",
            "At the end, after all other case labels.",
            "It does not matter; the compiler will reorder it."
          ],
          correctIndex: 2,
          explanation: "By convention, default is placed last so readers can find the normal cases first and see the fallback handling at the end. Technically it can appear anywhere."
        },
        {
          question: "What does the break statement do inside a switch?",
          options: [
            "Stops the entire program.",
            "Repeats the switch evaluation from the beginning.",
            "Transfers control to the default label.",
            "Exits the switch block and continues with the code after it."
          ],
          correctIndex: 3,
          explanation: "break inside a switch causes execution to jump to the statement immediately following the closing brace of the switch block."
        },
        {
          question: "When is a switch statement preferred over a chain of else if?",
          options: [
            "When comparing a single expression against many specific constant values.",
            "When comparing ranges of values.",
            "When the condition involves floating-point arithmetic.",
            "When the program needs to loop back to re-test a condition."
          ],
          correctIndex: 0,
          explanation: "switch excels when one variable or expression is checked against many known constant values. For range comparisons or complex conditions, if-else if is more appropriate."
        },
        {
          question: "int x = 2; switch(x) { case 1: printf(\"one\"); case 2: printf(\"two\"); case 3: printf(\"three\"); } What is printed?",
          options: ["two", "twothree", "onetwothree", "Nothing"],
          correctIndex: 1,
          explanation: "case 2 matches and prints 'two'. Without a break, execution falls through to case 3 and prints 'three'. Output is 'twothree'."
        },
        {
          question: "int x = 5; switch(x) { case 5: printf(\"five\"); break; default: printf(\"other\"); break; } What is printed?",
          options: ["five", "other", "fiveother", "Nothing"],
          correctIndex: 0,
          explanation: "x=5 matches case 5, prints 'five', then break exits the switch. default is not reached."
        },
        {
          question: "What must case labels evaluate to?",
          options: [
            "Constant integer expressions.",
            "Any numeric literal including float.",
            "String literals.",
            "Addresses (pointers)."
          ],
          correctIndex: 0,
          explanation: "Each case label must be a constant integer expression — a literal integer or a compile-time constant. Runtime values and floating-point numbers are not allowed."
        },
        {
          question: "Is it legal to have two case labels with the same value in the same switch?",
          options: [
            "Yes, the second one acts as a fallback.",
            "No, duplicate case values are a compile error.",
            "Yes, both execute in sequence.",
            "Yes, but only if they are separated by a break."
          ],
          correctIndex: 1,
          explanation: "Duplicate case values within the same switch statement are a compile error. Each constant value may appear at most once."
        },
        {
          question: "Which of the following is an appropriate comment convention for intentional fall-through?",
          options: [
            "/* FALL THROUGH */ or /* intentional fall-through */",
            "// break omitted by mistake",
            "/* end of case */",
            "No comment is needed; the compiler handles it."
          ],
          correctIndex: 0,
          explanation: "Explicitly commenting intentional fall-through tells readers and code analysis tools that the absence of break is deliberate, not an oversight."
        },
        {
          question: "Can you declare a variable inside a switch block?",
          options: [
            "No, variables cannot be declared inside switch.",
            "Yes, freely anywhere between cases.",
            "Yes, but only if you wrap the case body in its own curly braces.",
            "Only if the variable is static."
          ],
          correctIndex: 2,
          explanation: "Declaring variables inside switch cases can cause 'jump bypasses variable initialization' issues. Wrapping the case body in its own curly braces creates a proper scope for local variables."
        },
        {
          question: "What happens when a switch expression matches the default label?",
          options: [
            "The program terminates.",
            "The default block executes and, if followed by break, the switch exits.",
            "All case blocks execute before default.",
            "The switch expression is re-evaluated."
          ],
          correctIndex: 1,
          explanation: "When no case matches, execution jumps to default. Its body runs, and a break (if present) exits the switch just like any other case."
        },
        {
          question: "char c = 'y'; switch(c) { case 'Y': case 'y': printf(\"yes\"); break; default: printf(\"no\"); } What is printed?",
          options: ["yes", "no", "yesno", "Compile error"],
          correctIndex: 0,
          explanation: "c='y' matches the case 'y' label. Execution falls through to the shared body (since there is nothing between 'Y' and 'y'), prints 'yes', then break exits."
        },
        {
          question: "How does switch differ from if-else if when it comes to evaluating the expression?",
          options: [
            "switch evaluates the expression repeatedly for each case.",
            "switch evaluates the expression once and jumps directly to the matching case.",
            "switch evaluates all cases simultaneously.",
            "switch evaluates from the bottom case upward."
          ],
          correctIndex: 1,
          explanation: "The switch expression is evaluated exactly once, and then execution jumps directly to the matching case label, which can be more efficient than repeated comparisons in else if."
        },
        {
          question: "What is the best practice when you want the default case to signal an error?",
          options: [
            "Leave it empty with just a break.",
            "Print an error message or set an error flag inside the default case.",
            "Remove default and add an extra if-else after the switch.",
            "Use exit(0) to terminate the program."
          ],
          correctIndex: 1,
          explanation: "Including an error message or error flag in default makes unexpected values visible, which helps with debugging and makes the program's behavior clearly defined for all inputs."
        },
        {
          question: "Which of the following correctly uses a char in a switch?",
          options: [
            "switch (\"hello\") { case \"h\": ... }",
            "switch ('A') { case 65: printf(\"A\"); break; }",
            "switch (3.5) { case 3: ... }",
            "switch (NULL) { case 0: ... }"
          ],
          correctIndex: 1,
          explanation: "Character 'A' has integer value 65 in ASCII, so switch('A') is valid and case 65 matches. Strings and floats are not allowed in switch."
        },
        {
          question: "Why is it a good practice to include break after the default case?",
          options: [
            "Because C requires it for correct compilation.",
            "To prevent execution from accidentally falling into code added after default in the future.",
            "Because without it the switch reruns from the beginning.",
            "Because default without break causes undefined behavior."
          ],
          correctIndex: 1,
          explanation: "Including break after default is a defensive habit: if another case is ever added after default, execution will not accidentally fall into it."
        }
      ]
    },
    {
      id: "topic-3-4",
      title: "The while Loop",
      estimatedReadingTime: 7,
      explanation: `Loops are one of the most powerful ideas in programming. Instead of writing the same code ten times, you write it once and tell the computer to repeat it. The while loop is the most fundamental repetition construct in C and the easiest to understand: it keeps running a block of code as long as a condition remains true.

The syntax is simple: while (condition) { body }. Before each repetition, C checks the condition. If it is non-zero (true), the body runs. Then control returns to the top and the condition is checked again. This continues until the condition becomes zero (false), at which point the loop exits and execution continues with whatever follows the loop. If the condition is false before the loop body ever runs, the body is skipped entirely.

Every while loop needs three things to work correctly: initialization (set up the variable the condition depends on), the condition itself (the check that decides whether to loop again), and an update (change the variable so eventually the condition becomes false). If you forget the update, your program will loop forever — a bug known as an infinite loop. An infinite loop will freeze your program or cause it to use 100% CPU until forcibly stopped.

Think of a while loop like watching a traffic light. You check whether it is red (condition). While it is red, you wait (loop body). Every few seconds you check again (back to condition). The moment it turns green (condition becomes false), you go (exit the loop). This check-then-act pattern is exactly what while does.

A common use of while is input validation: keep asking the user for input until they provide a valid value. Another classic use is processing a stream of data when you do not know in advance how many items there are — you loop while there is more data to read.`,
      codeExample: `#include <stdio.h>

int main(void) {
    /* Count from 1 to 5 */
    int i = 1;          /* initialization */
    while (i <= 5) {    /* condition */
        printf("%d\\n", i);
        i++;            /* update */
    }

    printf("---\\n");

    /* Sum digits until user enters 0 */
    int number;
    int sum = 0;
    printf("Enter numbers to sum (0 to stop):\\n");
    /* For demo, we simulate: 3, 7, 2, 0 */
    int demo[] = {3, 7, 2, 0};
    int idx = 0;
    number = demo[idx++];
    while (number != 0) {
        sum += number;
        number = demo[idx++];
    }
    printf("Sum = %d\\n", sum);

    /* Condition false from the start — body never runs */
    int x = 10;
    while (x < 5) {
        printf("This never prints.\\n");
        x++;
    }
    printf("After skipped loop, x = %d\\n", x);

    return 0;
}`,
      expectedOutput: `1
2
3
4
5
---
Enter numbers to sum (0 to stop):
Sum = 12
After skipped loop, x = 10`,
      keyTakeaways: [
        "while checks its condition before each iteration; if false from the start, the body never runs.",
        "Every loop needs initialization, a condition, and an update to avoid infinite loops.",
        "An infinite loop occurs when the condition never becomes false.",
        "while is ideal when you do not know how many iterations are needed in advance.",
        "The loop body can be skipped entirely if the initial condition is false.",
        "Use while for input validation and sentinel-controlled loops."
      ],
      commonMistakes: [
        "Forgetting to update the loop variable inside the body, causing an infinite loop.",
        "Using = instead of == in the condition, which always evaluates as true for non-zero values.",
        "Off-by-one errors: using < when <= is needed (or vice versa), causing one too few or too many iterations.",
        "Placing a semicolon after while (condition); which creates an infinite empty loop.",
        "Modifying the loop variable in the wrong direction so the condition never becomes false."
      ],
      bestPractices: [
        "Always ensure the loop variable is updated inside the body to guarantee eventual termination.",
        "Use a clear, descriptive name for the loop control variable rather than a single letter when the context calls for it.",
        "Add a comment explaining the loop's purpose and what changes each iteration.",
        "Consider a maximum iteration count as a safeguard against accidental infinite loops in critical code.",
        "Prefer while when the number of iterations is not known upfront; use for when it is."
      ],
      exercises: [
        {
          title: "Exercise 1 – Countdown",
          description: "Write a C program that uses a while loop to count down from 10 to 1, printing each number on its own line, then prints 'Blast off!'.",
          hint: "Initialize the counter to 10, set the condition to check it is greater than 0, and decrement inside the loop."
        },
        {
          title: "Exercise 2 – Multiplication Table",
          description: "Read an integer n from the user. Use a while loop to print the multiplication table for n from 1 to 12 (e.g., '3 x 1 = 3', '3 x 2 = 6', ...).",
          hint: "Use a counter variable starting at 1. The condition is counter <= 12. Compute the product inside the loop."
        },
        {
          title: "Exercise 3 – Digit Sum",
          description: "Read a positive integer and use a while loop to repeatedly extract and sum its digits until the number becomes zero. Print the sum of the digits.",
          hint: "Use the modulo operator % 10 to get the last digit, then integer division by 10 to remove it. Continue while the number is not zero."
        }
      ],
      challenge: {
        title: "Challenge – Collatz Conjecture",
        description: "Read a positive integer n. Repeatedly apply the Collatz rule: if n is even, divide by 2; if n is odd, multiply by 3 and add 1. Count the steps and repeat until n equals 1. Print each step's value and the total number of steps taken.",
        hint: "Use a while loop with condition n != 1. Inside, check even/odd with the % operator. Keep a separate step counter."
      },
      quiz: [
        {
          question: "When is a while loop's condition checked?",
          options: [
            "After the body executes.",
            "Before each iteration, including the first.",
            "Only once, at the very beginning.",
            "After the last iteration only."
          ],
          correctIndex: 1,
          explanation: "A while loop checks its condition before every iteration. If it is false initially, the body never runs at all."
        },
        {
          question: "What causes an infinite loop?",
          options: [
            "A condition that starts false.",
            "A condition that never becomes false during execution.",
            "A loop body with more than one statement.",
            "Using <= instead of <."
          ],
          correctIndex: 1,
          explanation: "If the loop's condition never becomes false — typically because the update step is missing or wrong — the loop runs indefinitely."
        },
        {
          question: "int i = 0; while (i < 3) printf(\"%d\\n\", i); — What is wrong?",
          options: [
            "printf is used incorrectly.",
            "The condition should use > not <.",
            "There is no update to i, so the loop runs forever.",
            "The initial value of i should be 1."
          ],
          correctIndex: 2,
          explanation: "i is never incremented inside the loop body. Since i stays 0 and 0 < 3 is always true, this is an infinite loop."
        },
        {
          question: "What does this loop print? int x = 10; while (x < 5) { printf(\"%d\\n\", x); x++; }",
          options: ["10 9 8 7 6", "Nothing", "5 6 7 8 9", "10"],
          correctIndex: 1,
          explanation: "x starts at 10 and the condition x < 5 is immediately false, so the loop body never executes and nothing is printed."
        },
        {
          question: "How many times does this loop run? int n = 1; while (n <= 5) { n++; }",
          options: ["4", "5", "6", "Infinite"],
          correctIndex: 1,
          explanation: "n starts at 1 and increments each time. The loop runs for n = 1, 2, 3, 4, 5. When n becomes 6, the condition n <= 5 is false and the loop exits. That is 5 iterations."
        },
        {
          question: "What is the result of: while (1) { break; } printf(\"done\");?",
          options: [
            "An infinite loop that never prints 'done'.",
            "A compile error.",
            "Prints 'done' after the break exits the loop immediately.",
            "The printf executes before the while."
          ],
          correctIndex: 2,
          explanation: "while(1) creates an infinite loop, but break immediately exits it on the first iteration. Execution then continues and prints 'done'."
        },
        {
          question: "What are the three components every while loop needs to avoid an infinite loop?",
          options: [
            "Declaration, body, and return.",
            "Initialization, condition, and update.",
            "Input, processing, and output.",
            "Start, middle, and end labels."
          ],
          correctIndex: 1,
          explanation: "Every loop needs: initialization (set up the variable), a condition (test that can become false), and an update (change the variable so the condition eventually becomes false)."
        },
        {
          question: "What happens if you put a semicolon after while (condition);?",
          options: [
            "The loop body executes once.",
            "The condition is ignored and the body runs unconditionally.",
            "An empty loop runs, and if the condition never changes, it loops forever.",
            "A compile error is generated."
          ],
          correctIndex: 2,
          explanation: "The semicolon makes the loop body an empty statement. The condition is evaluated repeatedly with no code running, creating either an infinite loop or doing nothing."
        },
        {
          question: "Which scenario is a classic use case for a while loop?",
          options: [
            "Running code exactly 10 times.",
            "Repeating until the user enters a valid value (input validation).",
            "Executing a block always at least once.",
            "Comparing one value to multiple constants."
          ],
          correctIndex: 1,
          explanation: "While loops are ideal when you do not know how many repetitions are needed. Input validation — looping until valid input is given — is a classic example."
        },
        {
          question: "int count = 5; while (count > 0) { printf(\"%d \", count); count--; } What is printed?",
          options: ["1 2 3 4 5", "5 4 3 2 1", "5 4 3 2 1 0", "0 1 2 3 4"],
          correctIndex: 1,
          explanation: "count starts at 5 and decrements each iteration. It prints 5, then 4, 3, 2, 1. When count reaches 0 the condition count > 0 is false and the loop ends."
        },
        {
          question: "What is a sentinel value in the context of a while loop?",
          options: [
            "The maximum number of allowed iterations.",
            "A special value that signals the end of input and terminates the loop.",
            "The initial value of the loop variable.",
            "The variable used to count loop iterations."
          ],
          correctIndex: 1,
          explanation: "A sentinel value is a special input (like 0 or -1) that the user enters to signal they are done. The loop condition checks for this value to decide when to stop."
        },
        {
          question: "What type of error results from using < instead of <= in a loop meant to process values 1 through 10?",
          options: [
            "An infinite loop.",
            "An off-by-one error where the loop runs 9 times instead of 10.",
            "A compile error.",
            "The loop runs 11 times instead of 10."
          ],
          correctIndex: 1,
          explanation: "Using < 10 stops after processing up to 9. The value 10 is never processed. This is an off-by-one error — one iteration short."
        },
        {
          question: "Can a while loop run zero times?",
          options: [
            "No, it always runs at least once.",
            "Yes, if the condition is false before the first check.",
            "Only if an explicit break is placed at the beginning of the body.",
            "Only with the use of a special compiler flag."
          ],
          correctIndex: 1,
          explanation: "Since while checks its condition before the body, if the condition is initially false, the body never executes and the loop runs zero times."
        },
        {
          question: "Which variable naming choice is better for readability in a while loop that processes student records?",
          options: [
            "int i;",
            "int x;",
            "int studentCount;",
            "int var;"
          ],
          correctIndex: 2,
          explanation: "Descriptive names like studentCount clearly communicate the variable's purpose, making the loop's logic easier to understand for any reader."
        },
        {
          question: "What is the value of sum after this code? int sum = 0; int i = 1; while (i <= 4) { sum += i; i++; }",
          options: ["4", "10", "16", "0"],
          correctIndex: 1,
          explanation: "The loop adds 1 + 2 + 3 + 4 = 10 to sum. i goes from 1 to 4 inclusive, so four additions are performed."
        },
        {
          question: "Why is it dangerous to use a floating-point variable as a while loop counter?",
          options: [
            "C does not allow floats in while conditions.",
            "Float arithmetic rounding errors can make the condition never exactly become false.",
            "Floats cannot be incremented with ++.",
            "Float comparison is performed with == which is always true for floats."
          ],
          correctIndex: 1,
          explanation: "Floating-point arithmetic has rounding errors, so a float counter may never exactly reach the intended endpoint, causing too many or too few iterations or even an infinite loop."
        },
        {
          question: "int i = 1; int product = 1; while (i <= 5) { product *= i; i++; } What is product?",
          options: ["15", "25", "120", "5"],
          correctIndex: 2,
          explanation: "The loop computes 1 * 2 * 3 * 4 * 5 = 120, which is 5 factorial."
        },
        {
          question: "What does the loop counter represent in the loop: int i = 0; while (i < n) { /* process */ i++; }?",
          options: [
            "The total number of elements processed so far.",
            "The index of the current element being processed.",
            "The remaining number of elements to process.",
            "Both a and b depending on context."
          ],
          correctIndex: 1,
          explanation: "With 0-based indexing, i typically represents the current index being processed. After n iterations (0 through n-1), the loop has processed n elements total."
        },
        {
          question: "When should you prefer a while loop over a for loop?",
          options: [
            "When you know the exact number of iterations in advance.",
            "When the loop variable has a complex update expression.",
            "When the number of iterations is not known before the loop starts.",
            "When you need to iterate over an array."
          ],
          correctIndex: 2,
          explanation: "while is most natural when the termination condition depends on program state or user input rather than a fixed count. for is cleaner when the count is known upfront."
        },
        {
          question: "In a while loop used for input validation, what should the loop body always contain?",
          options: [
            "A return statement to exit the function.",
            "A new scanf (or input read) so the condition variable can change.",
            "A printf to display the loop counter.",
            "A break statement to handle valid input."
          ],
          correctIndex: 1,
          explanation: "The loop body must re-read input so the condition variable can potentially change. Without re-reading, the loop would run forever because the invalid value never changes."
        }
      ]
    },
    {
      id: "topic-3-5",
      title: "The do-while Loop",
      estimatedReadingTime: 6,
      explanation: `The do-while loop is a close cousin of the while loop, with one crucial difference: it checks its condition after the body executes, not before. This guarantees that the loop body runs at least once, no matter what. Even if the condition starts out false, the body will execute once before the check happens.

The syntax is: do { body } while (condition); — notice the semicolon at the very end, after the closing parenthesis. This trailing semicolon is mandatory and its absence is a compile error. Forgetting it is a common mistake for beginners who are used to while loops, where no semicolon follows the condition.

Think about a menu-driven program where you present options to the user. You always want to display the menu at least once before checking what the user picked. With a while loop, you would need to either duplicate the display code before the loop or use a slightly awkward structure. With do-while, you display the menu, read the choice, and then check whether to loop back — perfectly matching the logic.

Another classic use is asking for a number within a valid range. You prompt and read once, then check if the value is invalid and repeat if so. This is more natural with do-while than with while, because the prompt and read logically come before the validity check.

In practice, do-while is used less frequently than while and for, but knowing it gives you the right tool for situations where the body must run at least once. When you see the pattern "do something, then decide whether to repeat", reach for do-while. When you see "first check if you should do anything, then do it", reach for while.`,
      codeExample: `#include <stdio.h>

int main(void) {
    /* Count from 1 to 5 with do-while */
    int i = 1;
    do {
        printf("%d\\n", i);
        i++;
    } while (i <= 5);

    printf("---\\n");

    /* Body runs at least once even though condition is initially false */
    int x = 10;
    do {
        printf("Runs once! x = %d\\n", x);
        x++;
    } while (x < 5);  /* false from the start, but body already ran */

    printf("---\\n");

    /* Menu simulation: always show at least once */
    int choice;
    int attempts = 0;
    int fakeInput[] = {9, 9, 2}; /* simulated user inputs */
    int fi = 0;

    do {
        printf("Menu: 1=Start 2=Quit\\n");
        choice = fakeInput[fi++];
        attempts++;
        printf("You chose: %d\\n", choice);
    } while (choice != 1 && choice != 2);

    printf("Valid choice made after %d attempt(s).\\n", attempts);

    return 0;
}`,
      expectedOutput: `1
2
3
4
5
---
Runs once! x = 10
---
Menu: 1=Start 2=Quit
You chose: 9
Menu: 1=Start 2=Quit
You chose: 9
Menu: 1=Start 2=Quit
You chose: 2
Valid choice made after 3 attempt(s).`,
      keyTakeaways: [
        "do-while executes its body first, then checks the condition — guaranteed at least one execution.",
        "A semicolon is required after the closing while(condition); of a do-while loop.",
        "do-while is ideal for menus and input validation where one execution must happen before checking.",
        "If the condition is false initially, a while loop body runs zero times but a do-while body runs once.",
        "The update step must still be inside the body to avoid infinite loops.",
        "do-while is less common than while and for but is the clearest choice for run-first patterns."
      ],
      commonMistakes: [
        "Forgetting the mandatory semicolon after while(condition) at the end of the do-while loop.",
        "Confusing do-while with while and expecting the body might not run — it always runs at least once.",
        "Forgetting to update the loop control variable inside the body, causing an infinite loop.",
        "Using do-while when a while loop is more appropriate, leading to unintended first-iteration side effects.",
        "Placing the condition update after the while(...) semicolon, which means it is outside the loop."
      ],
      bestPractices: [
        "Use do-while when the body must execute at least once by the nature of the problem.",
        "Always include the semicolon after while(condition) and consider adding a comment like '/* end do-while */' for clarity.",
        "Keep the loop body concise; if it grows large, extract it into a function called from the loop.",
        "Add a comment explaining why do-while was chosen over while to help future readers.",
        "For menu-driven programs, do-while naturally models the pattern of showing the menu before validating the choice."
      ],
      exercises: [
        {
          title: "Exercise 1 – Positive Number",
          description: "Write a program that repeatedly prompts the user to enter a positive number. Keep looping (using do-while) until the user enters a value greater than zero. Then print the entered value.",
          hint: "Read the input inside the do block. The while condition should check if the number is not positive."
        },
        {
          title: "Exercise 2 – Sum Until Negative",
          description: "Use a do-while loop to repeatedly read integers from the user and add them to a running total. Stop when the user enters a negative number. Print the total (do not include the negative number in the sum).",
          hint: "Read inside the do block, add to sum only if the value is >= 0, and loop while the value is >= 0."
        },
        {
          title: "Exercise 3 – Password Retry",
          description: "Define a correct password as a constant integer (e.g., 9999). Use a do-while loop to prompt the user for a password and read it. Keep looping while the entered password does not match. Print 'Access granted' when it matches. Also count and print the number of attempts.",
          hint: "The do-while condition checks whether the entered value differs from the correct password. Increment an attempt counter each iteration."
        }
      ],
      challenge: {
        title: "Challenge – Number Guessing Game",
        description: "Implement a guessing game. Set a secret number (e.g., 42). Use a do-while loop to ask the user to guess. After each guess, print 'Too high', 'Too low', or 'Correct!'. Keep looping until the correct number is guessed. Count the number of guesses and print it when the game ends.",
        hint: "The do-while condition is that the guess does not equal the secret number. Use if-else inside the loop for feedback. For testing with fixed values, simulate guesses with an array."
      },
      quiz: [
        {
          question: "What is the key difference between a while loop and a do-while loop?",
          options: [
            "while loops can be infinite; do-while loops cannot.",
            "do-while checks the condition after the body, guaranteeing at least one execution.",
            "while loops use a semicolon after the condition; do-while does not.",
            "do-while can only count upward; while can count in any direction."
          ],
          correctIndex: 1,
          explanation: "The defining difference is that do-while evaluates its condition after the body executes. This means the body always runs at least once, even if the condition is initially false."
        },
        {
          question: "What syntax error is unique to do-while loops?",
          options: [
            "Missing opening brace.",
            "Missing semicolon after while(condition).",
            "No space between do and the opening brace.",
            "Missing return statement inside the loop."
          ],
          correctIndex: 1,
          explanation: "The do-while loop requires a semicolon after the closing while(condition). This is unlike while and for loops and is a frequent mistake for new C programmers."
        },
        {
          question: "int x = 10; do { printf(\"%d\\n\", x); x++; } while (x < 5); How many times does it print?",
          options: ["0", "1", "5", "Infinite"],
          correctIndex: 1,
          explanation: "The body executes once (printing 10 and incrementing x to 11). Then x < 5 is false, so the loop terminates. One iteration total."
        },
        {
          question: "When is a do-while loop the most natural choice?",
          options: [
            "When you want to iterate exactly n times.",
            "When you need to process an array of known size.",
            "When the action must happen before you can determine whether to repeat.",
            "When you want to loop forever until an external signal."
          ],
          correctIndex: 2,
          explanation: "do-while is best when the body must execute at least once — for example, displaying a menu or prompting for input before validating the response."
        },
        {
          question: "What is printed? int i = 1; do { printf(\"%d \", i); i *= 2; } while (i <= 16);",
          options: ["1 2 4 8 16", "2 4 8 16", "1 2 4 8", "1 2 4 8 16 32"],
          correctIndex: 0,
          explanation: "i starts at 1, prints 1 then doubles to 2, prints 2, doubles to 4, prints 4, doubles to 8, prints 8, doubles to 16, prints 16, then doubles to 32 which is > 16, so loop ends. Output: 1 2 4 8 16."
        },
        {
          question: "Which of the following is a valid do-while loop in C?",
          options: [
            "do { x++; } while (x < 10)",
            "do { x++; } while (x < 10);",
            "do (x < 10) { x++; }",
            "while { x++; } do (x < 10);"
          ],
          correctIndex: 1,
          explanation: "The correct syntax is do { body } while (condition); with a semicolon at the end. The semicolon after the closing parenthesis is mandatory."
        },
        {
          question: "What practical advantage does do-while have for menu-driven programs?",
          options: [
            "Menus are displayed faster with do-while.",
            "do-while allows the menu to be shown before reading the user's choice, matching the natural flow.",
            "do-while prevents the user from entering invalid choices.",
            "do-while compiles to smaller machine code for menu logic."
          ],
          correctIndex: 1,
          explanation: "In a menu, you always display before reading. do-while matches this pattern: display (body), read (body), then check validity (condition) to decide whether to repeat."
        },
        {
          question: "How many times does a do-while loop run if the condition is false from the very beginning?",
          options: ["Zero times.", "One time.", "Two times.", "Until a break statement is hit."],
          correctIndex: 1,
          explanation: "A do-while always executes its body at least once because the condition is checked only after the first execution."
        },
        {
          question: "int n = 5; int sum = 0; do { sum += n; n--; } while (n > 0); What is sum?",
          options: ["5", "15", "10", "20"],
          correctIndex: 1,
          explanation: "The loop adds 5+4+3+2+1 = 15. n starts at 5 and decrements after each addition, stopping when n reaches 0."
        },
        {
          question: "What must appear inside every do-while loop body to prevent an infinite loop?",
          options: [
            "A return statement.",
            "A printf call.",
            "An update to at least one variable that the condition depends on.",
            "A scanf call."
          ],
          correctIndex: 2,
          explanation: "Just like while loops, do-while loops need some update inside the body that eventually makes the condition false, or the loop will run forever."
        },
        {
          question: "Which pattern is do-while most similar to conceptually?",
          options: [
            "'Check then act' — decide first, then execute.",
            "'Act then check' — execute first, then decide whether to repeat.",
            "'Act in parallel' — execute multiple branches simultaneously.",
            "'Act and skip' — execute only certain statements each time."
          ],
          correctIndex: 1,
          explanation: "do-while follows the 'act then check' pattern: the body runs first, and then the condition is evaluated to decide whether to repeat."
        },
        {
          question: "In terms of flow, a do-while loop is equivalent to which structure?",
          options: [
            "body; while (condition) { body; }",
            "while (condition) { body; } body;",
            "if (condition) { body; } while (condition) { body; }",
            "for (;;) { body; if (condition) break; }"
          ],
          correctIndex: 0,
          explanation: "A do-while is logically equivalent to running the body once and then running a regular while loop: body; while(condition) { body; }. The condition check comes after."
        },
        {
          question: "What value does an empty do-while condition 'do {} while(0);' produce?",
          options: [
            "An infinite loop.",
            "A compile error.",
            "The body runs exactly once, then the loop exits.",
            "The body never runs."
          ],
          correctIndex: 2,
          explanation: "while(0) is always false. The body runs once (as do-while guarantees), then the condition 0 is checked and found false, so the loop exits. This pattern is used in macros."
        },
        {
          question: "What is the proper indentation style for a do-while loop's while clause?",
          options: [
            "Align while with the opening brace of the body.",
            "Align while with the do keyword at the same indentation level.",
            "Indent while one level deeper than do.",
            "Place while on the same line as the closing brace."
          ],
          correctIndex: 1,
          explanation: "The while keyword of a do-while is aligned with do at the same level, as both are part of the same statement. The closing brace and while typically appear on the same line."
        },
        {
          question: "int x = 0; do { x += 2; } while (x < 10); printf(\"%d\", x); What is printed?",
          options: ["8", "10", "12", "0"],
          correctIndex: 1,
          explanation: "x doubles by 2 each iteration: 0->2->4->6->8->10. When x=10, x<10 is false, loop exits. printf prints 10."
        },
        {
          question: "Why might do-while be preferable to while for input validation?",
          options: [
            "do-while automatically validates the input type.",
            "You must read input at least once before you can check it, which matches the do-while pattern.",
            "do-while loops are faster for I/O operations.",
            "while loops cannot call scanf inside their body."
          ],
          correctIndex: 1,
          explanation: "You need to read at least one value before you can know if it is valid. do-while naturally expresses this: read (body), validate (condition), repeat if invalid."
        },
        {
          question: "What does the semicolon after while(condition) in a do-while loop signal to the compiler?",
          options: [
            "End of the loop body.",
            "End of the do-while statement.",
            "Beginning of the else clause.",
            "A label for goto."
          ],
          correctIndex: 1,
          explanation: "The semicolon after while(condition) terminates the entire do-while statement. Without it, the compiler would expect more code to follow and generate an error."
        },
        {
          question: "A do-while loop with the condition 'while(1)' — what does it do?",
          options: [
            "Runs the body once and exits.",
            "Never runs the body.",
            "Runs the body infinitely until a break or return is encountered.",
            "Causes a compile error."
          ],
          correctIndex: 2,
          explanation: "while(1) is always true, so the loop repeats forever. The only way to exit is via break, return, or exit() inside the body."
        },
        {
          question: "Which of the following code patterns is the idiomatic C do-while for input validation?",
          options: [
            "while (invalid) { read(); }",
            "do { read(); } while (invalid);",
            "if (!valid) { while (!valid) { read(); } }",
            "read(); if (invalid) while (invalid) read();"
          ],
          correctIndex: 1,
          explanation: "do { read(); } while (invalid); is the clean idiomatic pattern: read first, then validate and repeat if needed, matching the natural flow of input validation."
        },
        {
          question: "int count = 0; do { count++; } while (count < 0); What is count after the loop?",
          options: ["0", "1", "-1", "Infinite — never exits"],
          correctIndex: 1,
          explanation: "count starts at 0. The body runs once, incrementing count to 1. Then count < 0 is false (1 < 0 is false), so the loop exits with count = 1."
        }
      ]
    },
    {
      id: "topic-3-6",
      title: "The for Loop",
      estimatedReadingTime: 8,
      explanation: `The for loop is arguably the most frequently used loop in C. It bundles all three loop components — initialization, condition, and update — into a single compact line, making the loop structure immediately obvious to any reader. When you know in advance how many times you want to repeat something, the for loop is the clearest and most conventional choice.

The syntax is: for (initialization; condition; update) { body }. The three parts inside the parentheses are separated by semicolons. The initialization runs exactly once before the loop starts. Then, just like while, the condition is checked before every iteration. If true, the body runs. After the body, the update expression runs, and then the condition is checked again. This cycle continues until the condition is false.

A common idiom is the counting loop: for (int i = 0; i < n; i++). This runs the body n times with i taking values 0, 1, 2, ..., n-1. Using 0 as the starting index and < rather than <= for the upper bound aligns perfectly with how arrays are indexed in C, which you will use extensively in later lessons.

Each of the three parts in a for loop is optional. You can omit the initialization if the variable is set earlier, omit the update if you update inside the body, or even omit the condition (leaving an infinite loop). Some programmers write for(;;) as an intentional infinite loop that expects a break inside. However, omitting parts unnecessarily makes the code harder to read, so prefer including all three when they exist.

You can declare the loop variable directly in the initialization part: for (int i = 0; ...). This scopes i to the loop itself, which is excellent practice — it prevents the variable from accidentally being used after the loop ends. Not all very old C code used this (it requires C99 or later), but modern C code always should.`,
      codeExample: `#include <stdio.h>

int main(void) {
    /* Basic counting loop: 1 to 5 */
    for (int i = 1; i <= 5; i++) {
        printf("%d\\n", i);
    }

    printf("---\\n");

    /* Counting down */
    for (int i = 10; i >= 1; i--) {
        printf("%d ", i);
    }
    printf("\\n---\\n");

    /* Nested for loops: multiplication table */
    for (int row = 1; row <= 3; row++) {
        for (int col = 1; col <= 3; col++) {
            printf("%3d", row * col);
        }
        printf("\\n");
    }

    printf("---\\n");

    /* Sum of first n natural numbers */
    int n = 5;
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    printf("Sum 1 to %d = %d\\n", n, sum);

    return 0;
}`,
      expectedOutput: `1
2
3
4
5
---
10 9 8 7 6 5 4 3 2 1 
---
  1  2  3
  2  4  6
  3  6  9
---
Sum 1 to 5 = 15`,
      keyTakeaways: [
        "for(init; condition; update) compactly expresses all three loop components in one line.",
        "The initialization runs once, the condition is checked before every iteration, and the update runs after every body execution.",
        "The idiom for(int i = 0; i < n; i++) runs exactly n times with i from 0 to n-1.",
        "Declaring the loop variable in the initialization limits its scope to the loop body.",
        "Nested for loops multiply the iterations and are used for 2D data like grids and tables.",
        "Any of the three parts can be omitted but omitting them needlessly reduces clarity."
      ],
      commonMistakes: [
        "Using commas instead of semicolons to separate the three for-loop parts — semicolons are required.",
        "Off-by-one: using <= instead of < (or vice versa) causing one too many or few iterations.",
        "Modifying the loop counter inside the body in addition to the update expression, causing unpredictable iteration counts.",
        "Using i <= n - 1 instead of i < n — both work but the latter is cleaner and conventional.",
        "Forgetting that the loop variable declared in the for header is scoped only to the loop."
      ],
      bestPractices: [
        "Declare the loop variable in the for header (for(int i = ...)) to limit its scope.",
        "Use the 0-based counting pattern (i = 0; i < n) to align with array indexing conventions.",
        "Avoid modifying the loop counter inside the body; let the update expression handle it.",
        "Use meaningful variable names for nested loops (row, col) instead of single letters when iterating 2D data.",
        "Prefer for over while when the number of iterations is known before the loop begins."
      ],
      exercises: [
        {
          title: "Exercise 1 – Factorial",
          description: "Write a C program that reads a non-negative integer n and uses a for loop to compute and print n! (n factorial). Handle n=0 as a special case (0! = 1).",
          hint: "Initialize a result variable to 1. Loop from 1 to n multiplying result by i each iteration. No loop body needed for n=0 since 1 is already correct."
        },
        {
          title: "Exercise 2 – Print a Triangle",
          description: "Read an integer n and use nested for loops to print a right-aligned triangle of asterisks with n rows. Row 1 has 1 star, row 2 has 2 stars, and so on.",
          hint: "The outer loop controls the row number. The inner loop runs from 1 to the current row number, printing one star per iteration."
        },
        {
          title: "Exercise 3 – FizzBuzz",
          description: "Use a for loop to print numbers from 1 to 30. For multiples of 3 print 'Fizz' instead of the number, for multiples of 5 print 'Buzz', and for multiples of both 3 and 5 print 'FizzBuzz'.",
          hint: "Check divisibility by both 3 and 5 first (using &&), then check each individually. Use the modulo operator % to test divisibility."
        }
      ],
      challenge: {
        title: "Challenge – Prime Number Sieve",
        description: "Using nested for loops, implement a simple trial-division prime checker. Read an integer limit n. For each number from 2 to n, check if it is prime by testing divisibility by all integers from 2 to the square root of the number. Print all prime numbers up to n, and count how many there are.",
        hint: "The inner loop tests divisors from 2 up to i/2 (or use the sqrt function from math.h for efficiency). Use a flag variable to track primality. Print the count at the end."
      },
      quiz: [
        {
          question: "In for (int i = 0; i < 5; i++), how many times does the body execute?",
          options: ["4", "5", "6", "0"],
          correctIndex: 1,
          explanation: "i takes values 0, 1, 2, 3, 4. When i reaches 5, the condition i < 5 is false and the loop ends. That is 5 executions."
        },
        {
          question: "What separator is used between the three parts of a for loop header?",
          options: ["Comma", "Colon", "Semicolon", "Pipe |"],
          correctIndex: 2,
          explanation: "The three parts of a for loop header — initialization, condition, update — are separated by semicolons, not commas."
        },
        {
          question: "When does the initialization part of a for loop execute?",
          options: [
            "Before every iteration.",
            "After every iteration.",
            "Exactly once, before the first iteration.",
            "After the last iteration."
          ],
          correctIndex: 2,
          explanation: "The initialization runs once at the very start of the for loop, before the condition is checked for the first time."
        },
        {
          question: "When does the update expression in a for loop execute?",
          options: [
            "Before every iteration.",
            "After every iteration's body and before re-checking the condition.",
            "Only once, at the beginning.",
            "After the loop exits."
          ],
          correctIndex: 1,
          explanation: "After the loop body runs, the update expression executes. Then the condition is re-evaluated to decide whether to iterate again."
        },
        {
          question: "What does for(;;) represent?",
          options: [
            "A loop that runs zero times.",
            "A syntax error.",
            "An intentional infinite loop.",
            "A loop that runs exactly three times."
          ],
          correctIndex: 2,
          explanation: "Omitting all three parts of the for header (for(;;)) creates an infinite loop because there is no condition to become false. It must contain a break or return to ever exit."
        },
        {
          question: "What is the scope of a variable declared in the for initialization like: for(int i = 0; ...)?",
          options: [
            "The entire function.",
            "The entire file.",
            "Only within the for loop (initialization, condition, update, and body).",
            "Only inside the loop body, not the condition."
          ],
          correctIndex: 2,
          explanation: "A variable declared in the for initialization is scoped to the entire for statement: the condition, update, and body. It is not visible outside the loop."
        },
        {
          question: "int sum = 0; for (int i = 1; i <= 10; i++) sum += i; What is sum?",
          options: ["45", "55", "50", "10"],
          correctIndex: 1,
          explanation: "The loop adds 1+2+3+...+10. The formula n(n+1)/2 = 10*11/2 = 55 confirms this."
        },
        {
          question: "How do nested for loops work?",
          options: [
            "The outer loop and inner loop run simultaneously.",
            "For each iteration of the outer loop, the inner loop completes all its iterations.",
            "The inner loop runs first, then the outer loop starts.",
            "Nested for loops cause a compile error."
          ],
          correctIndex: 1,
          explanation: "In nested loops, for every single iteration of the outer loop, the inner loop runs through all its iterations completely from start to finish."
        },
        {
          question: "How many total iterations occur in: for(int i=0;i<3;i++) for(int j=0;j<4;j++) { ... }?",
          options: ["7", "12", "3", "4"],
          correctIndex: 1,
          explanation: "The outer loop runs 3 times and for each of those, the inner loop runs 4 times. Total: 3 * 4 = 12 iterations."
        },
        {
          question: "What is wrong with: for (int i = 0, i < 10, i++) { ... }?",
          options: [
            "The variable i cannot be declared inside a for loop.",
            "Commas are used instead of semicolons between the for loop parts.",
            "The update should be ++i, not i++.",
            "The condition should use <= not <."
          ],
          correctIndex: 1,
          explanation: "The three parts of a for loop header must be separated by semicolons, not commas. Commas are used in a different context (the comma operator) and this code would not compile as intended."
        },
        {
          question: "for (int i = 5; i >= 1; i--) printf(\"%d \", i); What is printed?",
          options: ["1 2 3 4 5", "5 4 3 2 1", "5 4 3 2 1 0", "Nothing"],
          correctIndex: 1,
          explanation: "i starts at 5 and decrements. It prints 5, 4, 3, 2, 1. When i reaches 0, the condition i >= 1 is false and the loop exits."
        },
        {
          question: "Why is 'for(int i = 0; i < n; i++)' preferred over 'for(int i = 1; i <= n; i++)'?",
          options: [
            "It is faster at runtime.",
            "It aligns with 0-based array indexing, which is the C convention.",
            "It is required by the C99 standard.",
            "It allows negative values of i."
          ],
          correctIndex: 1,
          explanation: "C arrays are 0-indexed, so the 0-to-n-1 pattern directly maps loop variable i to array indices, preventing off-by-one errors when processing arrays."
        },
        {
          question: "Can you have multiple statements in the initialization part of a for loop?",
          options: [
            "No, only one statement is allowed.",
            "Yes, by separating them with commas (comma operator).",
            "Yes, by separating them with semicolons.",
            "Only if they are all assignments."
          ],
          correctIndex: 1,
          explanation: "You can use the comma operator to include multiple expressions in the initialization: for(int i=0, j=10; i < j; i++, j--). Semicolons are not used there — they separate the three parts."
        },
        {
          question: "What happens to the value of i after: for(int i = 0; i < 5; i++) { ... }?",
          options: [
            "i equals 5.",
            "i equals 4.",
            "i is undefined because it is out of scope.",
            "i is reset to 0."
          ],
          correctIndex: 2,
          explanation: "When i is declared in the for header, it only exists within the loop. After the loop, i goes out of scope and is inaccessible."
        },
        {
          question: "Which for loop prints only even numbers from 2 to 10?",
          options: [
            "for(int i=1; i<=10; i++) if(i%2==0) printf(\"%d \",i);",
            "for(int i=2; i<=10; i+=2) printf(\"%d \",i);",
            "Both a and b produce the same output.",
            "Neither is valid C."
          ],
          correctIndex: 2,
          explanation: "Both approaches correctly print 2 4 6 8 10. Option a filters with modulo; option b steps by 2. Both are valid C and produce identical output."
        },
        {
          question: "What is the value of x after: int x = 0; for(int i = 0; i < 4; i++) x += i;?",
          options: ["4", "6", "10", "0"],
          correctIndex: 1,
          explanation: "The loop adds i=0, i=1, i=2, i=3. Sum: 0+1+2+3 = 6."
        },
        {
          question: "Is it good practice to modify the loop counter variable inside the for loop body?",
          options: [
            "Yes, it is a common optimization technique.",
            "No, it makes the loop's behavior unpredictable and hard to reason about.",
            "Yes, as long as you only increment, not decrement.",
            "Yes, because the update expression is then redundant."
          ],
          correctIndex: 1,
          explanation: "Modifying the loop counter in the body, in addition to the update expression, makes it very hard to predict how many iterations will occur. Let the update expression solely control the counter."
        },
        {
          question: "What advantage does a for loop have over a while loop for counted iteration?",
          options: [
            "for loops compile to faster machine code.",
            "for loops gather initialization, condition, and update into one readable line.",
            "while loops cannot count.",
            "for loops do not require curly braces."
          ],
          correctIndex: 1,
          explanation: "The for loop puts all three loop-control elements in one place, making the loop's structure immediately obvious and reducing the chance of forgetting the update."
        },
        {
          question: "What does the update expression 'i *= 2' do when used in a for loop instead of 'i++'?",
          options: [
            "Doubles i each iteration, creating exponential growth of i.",
            "Adds 2 to i each iteration.",
            "Causes a compile error in for loops.",
            "Resets i to 2 each iteration."
          ],
          correctIndex: 0,
          explanation: "i *= 2 multiplies i by 2 each time, so i grows as 1, 2, 4, 8, 16... The for loop is flexible enough for any update expression, not just increment."
        },
        {
          question: "for(int i = 0; i < 0; i++) printf(\"hello\"); How many times is 'hello' printed?",
          options: ["0", "1", "-1", "Infinite"],
          correctIndex: 0,
          explanation: "The condition i < 0 is false from the start (0 < 0 is false). The loop body never executes and 'hello' is never printed."
        }
      ]
    },
    {
      id: "topic-3-7",
      title: "break and continue",
      estimatedReadingTime: 6,
      explanation: `Sometimes you need finer control over a loop beyond simply letting it run its course. C provides two statements for this: break and continue. They give you the ability to exit a loop early or skip the rest of the current iteration without exiting the loop entirely.

The break statement immediately exits the nearest enclosing loop (or switch). When the program encounters break, it jumps to the statement that follows the closing brace of the loop. The loop stops, no more iterations occur, and execution continues normally after the loop. This is useful when you find what you are looking for and have no reason to keep checking. For example, searching through a list and stopping the moment you find the target value.

The continue statement is subtler. When encountered, it skips the rest of the current loop iteration and jumps to the update expression (in a for loop) or back to the condition check (in while and do-while). The loop does not exit — it simply moves on to the next iteration. continue is handy when some iterations need special handling that involves skipping the main processing step, like filtering out invalid inputs.

Both break and continue affect only the innermost loop they appear in. If you have nested loops and use break inside the inner loop, only the inner loop exits — the outer loop continues its iterations. This is an important distinction: there is no way to break out of multiple levels of loops with a single break statement in C (unlike some other languages). If you need to exit nested loops, common techniques include using a flag variable or restructuring the code.

Use break and continue judiciously. Overusing them can make loops hard to follow because the flow of control jumps around unexpectedly. When you find yourself using many continue statements, it is often a sign that the loop body's logic could be restructured using if-else instead, keeping all paths visible in one place.`,
      codeExample: `#include <stdio.h>

int main(void) {
    /* break: stop when we find 7 */
    printf("Searching for 7:\\n");
    for (int i = 1; i <= 10; i++) {
        if (i == 7) {
            printf("Found 7! Stopping.\\n");
            break;
        }
        printf("%d\\n", i);
    }

    printf("---\\n");

    /* continue: skip even numbers */
    printf("Odd numbers from 1 to 10:\\n");
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            continue; /* skip the rest of this iteration */
        }
        printf("%d\\n", i);
    }

    printf("---\\n");

    /* break in nested loops only exits the innermost loop */
    for (int outer = 1; outer <= 3; outer++) {
        for (int inner = 1; inner <= 3; inner++) {
            if (inner == 2) break; /* only exits inner loop */
            printf("outer=%d inner=%d\\n", outer, inner);
        }
    }

    return 0;
}`,
      expectedOutput: `Searching for 7:
1
2
3
4
5
6
Found 7! Stopping.
---
Odd numbers from 1 to 10:
1
3
5
7
9
---
outer=1 inner=1
outer=2 inner=1
outer=3 inner=1`,
      keyTakeaways: [
        "break immediately exits the nearest enclosing loop or switch statement.",
        "continue skips the rest of the current iteration and moves to the next one.",
        "Both break and continue affect only the innermost loop they appear in.",
        "break is useful for early exit when a search succeeds or a stopping condition is met.",
        "continue is useful for skipping certain items in a loop without exiting the loop.",
        "Overusing break and continue can make loop logic harder to follow; use them deliberately."
      ],
      commonMistakes: [
        "Thinking break exits all nested loops — it only exits the innermost enclosing loop.",
        "Confusing break and continue — break exits the loop, continue only skips the current iteration.",
        "In a while loop, using continue without updating the loop counter first, causing an infinite loop.",
        "Using break inside an if statement expecting it to break out of the outer loop — it exits the innermost loop regardless of where the if is.",
        "Overusing continue to avoid writing clear if-else logic, making the loop flow hard to trace."
      ],
      bestPractices: [
        "Use break when a clear stopping condition is met and further iteration is pointless.",
        "Use continue sparingly and only when it genuinely simplifies the logic compared to an if-else.",
        "In a while loop with continue, ensure the counter update happens before continue to avoid infinite loops.",
        "Use a flag variable or restructure nested loops rather than relying on break to exit multiple levels.",
        "Add a comment when using break or continue to explain why the early exit or skip is happening."
      ],
      exercises: [
        {
          title: "Exercise 1 – First Negative",
          description: "Write a for loop that iterates over a fixed array of integers. Use break to stop looping when the first negative number is found, and print its index and value. Print 'Not found' if no negative number exists.",
          hint: "Use a flag or check after the loop whether i reached the array length to distinguish 'found' from 'not found'."
        },
        {
          title: "Exercise 2 – Skip Multiples of 3",
          description: "Use a for loop to print all integers from 1 to 20. Use continue to skip any number that is a multiple of 3. Print all others.",
          hint: "Check if i % 3 == 0 inside the loop. If so, use continue to skip the printf."
        },
        {
          title: "Exercise 3 – Sum Until Threshold",
          description: "Read integers one by one in a while loop (simulate with an array). Keep a running sum. If at any point the sum exceeds 100, print the sum, print which number caused the overflow, and break out of the loop.",
          hint: "Add each number to the sum, then check if sum > 100. If so, print and break. If the loop ends normally, print the final sum without the threshold message."
        }
      ],
      challenge: {
        title: "Challenge – Menu With Validation",
        description: "Implement a simple interactive menu using a loop. Display options: 1=Print Hello, 2=Print Count (1-10), 3=Exit. Read an integer choice. For invalid choices (not 1, 2, or 3), print an error and use continue to re-prompt. For choice 3, use break to exit the menu loop. For choices 1 and 2, perform the action. Count valid operations performed and print the count when exiting.",
        hint: "Use a while(1) or for(;;) infinite loop. Handle invalid input with continue. Handle exit with break. Keep a counter that increments for choices 1 and 2."
      },
      quiz: [
        {
          question: "What does the break statement do in a loop?",
          options: [
            "Skips the current iteration and moves to the next.",
            "Immediately exits the nearest enclosing loop.",
            "Restarts the loop from the beginning.",
            "Exits the entire program."
          ],
          correctIndex: 1,
          explanation: "break immediately terminates the nearest enclosing loop (or switch), transferring control to the statement after the loop's closing brace."
        },
        {
          question: "What does the continue statement do?",
          options: [
            "Exits the loop immediately.",
            "Restarts the loop from the initialization.",
            "Skips the rest of the current iteration and goes back to the condition or update.",
            "Causes the loop to run indefinitely."
          ],
          correctIndex: 2,
          explanation: "continue skips any remaining statements in the current loop body and jumps to the update expression (for) or condition check (while/do-while) for the next iteration."
        },
        {
          question: "In nested loops, which loop does break exit?",
          options: [
            "All enclosing loops.",
            "The outermost loop only.",
            "The innermost loop containing the break.",
            "A randomly selected enclosing loop."
          ],
          correctIndex: 2,
          explanation: "break exits only the innermost loop (or switch) that directly contains it. Outer loops continue executing normally."
        },
        {
          question: "What is printed? for(int i=1;i<=5;i++){if(i==3)continue;printf(\"%d \",i);}",
          options: ["1 2 3 4 5", "1 2 4 5", "3", "1 2"],
          correctIndex: 1,
          explanation: "When i=3, continue skips the printf. All other values (1, 2, 4, 5) are printed."
        },
        {
          question: "What is printed? for(int i=1;i<=5;i++){if(i==3)break;printf(\"%d \",i);}",
          options: ["1 2 3 4 5", "1 2", "3 4 5", "1 2 3"],
          correctIndex: 1,
          explanation: "When i=3, break exits the loop. Before break, 1 and 2 were printed. 3 itself is not printed because break occurs before printf."
        },
        {
          question: "In a while loop, if you use continue before updating the loop counter, what happens?",
          options: [
            "The loop exits immediately.",
            "The loop counter skips to its maximum value.",
            "The loop becomes infinite because the counter never updates.",
            "An error is printed to stderr."
          ],
          correctIndex: 2,
          explanation: "If continue is hit before the counter update in a while loop, the update is skipped every time, the condition never changes, and the loop runs forever."
        },
        {
          question: "What is a common use case for break in a loop?",
          options: [
            "Filtering out unwanted values from an iteration.",
            "Stopping a search loop as soon as the target is found.",
            "Skipping every other iteration.",
            "Re-initializing the loop variable."
          ],
          correctIndex: 1,
          explanation: "break is ideal for search loops: once you find the target, there is no need to continue examining remaining elements, so break exits immediately."
        },
        {
          question: "What is a common use case for continue in a loop?",
          options: [
            "Exiting the loop when a target value is found.",
            "Processing all elements but skipping those that meet a certain criterion.",
            "Re-running the entire loop from the start.",
            "Preventing the update expression from running."
          ],
          correctIndex: 1,
          explanation: "continue is used to skip specific iterations — like skipping invalid inputs or filtering certain values — while still completing the remaining iterations."
        },
        {
          question: "Does break work inside an if statement that is inside a for loop?",
          options: [
            "No, break only works directly inside loop bodies, not inside if statements.",
            "Yes, break exits the nearest enclosing loop, regardless of how many if statements it is nested inside.",
            "No, it only exits the if block.",
            "Yes, but only if the if is the only statement in the loop body."
          ],
          correctIndex: 1,
          explanation: "break is not affected by if nesting. It always exits the nearest enclosing loop or switch statement, even if it is inside multiple if or else blocks."
        },
        {
          question: "How can you break out of two levels of nested loops in C?",
          options: [
            "Use break break; (double break).",
            "Use exit(0) to end the program.",
            "Set a flag variable in the inner loop and check it in the outer loop's condition or body.",
            "Use a special keyword outbreak."
          ],
          correctIndex: 2,
          explanation: "C has no multi-level break. The idiomatic solution is a flag variable: set it when the inner break occurs, then check it in the outer loop to break again or exit early."
        },
        {
          question: "In a for loop, after continue executes, which part runs next?",
          options: [
            "The initialization.",
            "The condition check.",
            "The update expression, then the condition check.",
            "The statement after the loop."
          ],
          correctIndex: 2,
          explanation: "In a for loop, continue jumps to the update expression (e.g., i++), which runs, and then the condition is re-evaluated before the next potential iteration."
        },
        {
          question: "In a while loop, after continue executes, which part runs next?",
          options: [
            "The initialization before the loop.",
            "The update expression.",
            "Directly back to the condition check.",
            "The first statement in the loop body."
          ],
          correctIndex: 2,
          explanation: "In a while loop, there is no update expression in the header. After continue, control jumps directly to the while condition check."
        },
        {
          question: "What is printed? int i=0; while(i<5){i++;if(i==3)continue;printf(\"%d \",i);}",
          options: ["1 2 3 4 5", "1 2 4 5", "0 1 2 4", "1 2"],
          correctIndex: 1,
          explanation: "i is incremented before the check. When i=3, continue skips printf. The rest (1, 2, 4, 5) are printed."
        },
        {
          question: "Why should continue be used sparingly?",
          options: [
            "Because it is slower than an equivalent if-else.",
            "Because it can make loop logic harder to follow by creating unexpected jumps in control flow.",
            "Because it is deprecated in C99.",
            "Because it prevents the loop from ever exiting."
          ],
          correctIndex: 1,
          explanation: "Multiple continue statements in a loop body create several exit points in the iteration, making it harder to trace which code runs under what conditions. Clear if-else logic is often more readable."
        },
        {
          question: "What is the output of: for(int i=1;i<=3;i++){for(int j=1;j<=3;j++){if(j==2)break;printf(\"%d%d \",i,j);}}",
          options: ["11 21 31", "11 12 13 21 22 23 31 32 33", "11 12 21 22 31 32", "Nothing"],
          correctIndex: 0,
          explanation: "For each value of i, the inner loop prints when j=1, then breaks when j=2. So only (1,1), (2,1), (3,1) are printed: '11 21 31'."
        },
        {
          question: "Can continue be used in a switch statement in C?",
          options: [
            "Yes, it skips to the next case.",
            "No, continue has no effect in switch and causes a compile error.",
            "continue in a switch skips to the default case.",
            "continue in a switch acts the same as break."
          ],
          correctIndex: 1,
          explanation: "continue does not apply to switch statements — it only applies to loops. Using continue inside a switch that is not inside a loop will cause a compile error."
        },
        {
          question: "What is a good alternative to using continue in a simple case?",
          options: [
            "Replace the loop with a switch statement.",
            "Use an if-else to conditionally execute the main body instead of using continue to skip it.",
            "Use goto to jump over the skipped code.",
            "Remove the condition entirely."
          ],
          correctIndex: 1,
          explanation: "Instead of 'if (bad) continue; do_work();', you can write 'if (!bad) { do_work(); }', which is equivalent but keeps the control flow linear and easier to read."
        },
        {
          question: "What does break do when encountered inside a switch that is inside a for loop?",
          options: [
            "Exits both the switch and the for loop.",
            "Exits only the switch statement, not the for loop.",
            "Exits only the for loop.",
            "Causes a compile error."
          ],
          correctIndex: 1,
          explanation: "break always exits the nearest enclosing switch or loop. Inside a switch that is inside a for loop, break exits the switch. Another break would be needed to exit the for loop."
        },
        {
          question: "Which statement about break is false?",
          options: [
            "break can be used in for, while, and do-while loops.",
            "break exits the nearest enclosing loop or switch.",
            "break can exit multiple nested loops simultaneously with one statement.",
            "break is often used in switch cases to prevent fall-through."
          ],
          correctIndex: 2,
          explanation: "break exits only the innermost enclosing loop or switch. There is no way to break out of multiple loops with a single break statement in C."
        },
        {
          question: "For a for loop 'for(int i=0;i<10;i++)', if break executes when i=5, what is i after the loop?",
          options: [
            "5 if declared outside the loop, otherwise out of scope.",
            "10 always.",
            "6, because i is incremented before break.",
            "i is automatically reset to 0."
          ],
          correctIndex: 0,
          explanation: "break exits before the update i++ runs. So i is still 5 at exit. If i was declared in the for header, it is out of scope after the loop; if declared outside, it holds 5."
        }
      ]
    },
    {
      id: "topic-3-8",
      title: "The goto Statement",
      estimatedReadingTime: 7,
      explanation: `The goto statement is one of C's most controversial features. It causes an unconditional jump to a labeled point anywhere in the same function. A label is simply an identifier followed by a colon, placed before any statement. When goto label; is encountered, execution immediately transfers to wherever that label is.

The syntax is straightforward: you write a label name (e.g., cleanup:) in front of a statement, and then somewhere else in the same function you write goto cleanup; to jump to it. Labels follow the same naming rules as variables — they can contain letters, digits, and underscores, and they must be unique within the function. A label cannot be declared without a following statement, so if you want a label at the very end of a block, you follow it with an empty statement: label: ;

The reason goto is controversial goes back to a famous letter written by computer scientist Edsger Dijkstra in 1968, titled "Go To Statement Considered Harmful." He argued that unrestricted use of goto makes programs nearly impossible to reason about — control can jump anywhere, making it extremely difficult to trace the sequence of events that led to any given state. This led to the structured programming movement, which advocates using loops and conditionals instead.

Modern professional C code avoids goto in almost all cases. However, there is one widely accepted exception: error handling and resource cleanup in C. When a function opens files, allocates memory, and acquires locks, and then encounters an error partway through, you need to cleanly release everything acquired so far before returning. Nested if-else blocks for this become deeply tangled. A single goto cleanup; that jumps to a cleanup section at the bottom of the function is actually the clearest solution here and is commonly seen in well-written systems code like the Linux kernel.

Understanding goto helps you read legacy code and systems code. But as a default rule, if you find yourself reaching for goto, first ask whether a loop, function call, or proper error-handling structure would express the same idea more clearly. The answer is almost always yes.`,
      codeExample: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    /* Example 1: goto used poorly (avoid this pattern) */
    int i = 0;
loop_start:
    if (i < 3) {
        printf("i = %d\\n", i);
        i++;
        goto loop_start; /* this is just a while loop — use while instead */
    }

    printf("---\\n");

    /* Example 2: The accepted use — cleanup on error */
    int *buffer = NULL;
    FILE *fp = NULL;

    buffer = (int *)malloc(10 * sizeof(int));
    if (buffer == NULL) {
        printf("Memory allocation failed.\\n");
        goto cleanup;
    }

    fp = fopen("nonexistent.txt", "r");
    if (fp == NULL) {
        printf("File open failed, cleaning up.\\n");
        goto cleanup;
    }

    /* Normal processing would happen here */
    printf("Both resources acquired successfully.\\n");
    fclose(fp);

cleanup:
    if (buffer != NULL) {
        free(buffer);
        printf("Memory freed.\\n");
    }
    printf("Function exiting cleanly.\\n");

    return 0;
}`,
      expectedOutput: `i = 0
i = 1
i = 2
---
File open failed, cleaning up.
Memory freed.
Function exiting cleanly.`,
      keyTakeaways: [
        "goto causes an unconditional jump to a labeled statement within the same function.",
        "Labels are identifiers followed by a colon, placed before any statement.",
        "Unrestricted use of goto creates 'spaghetti code' that is very hard to follow.",
        "The one accepted modern use is cleanup/error handling in C, avoiding deeply nested cleanup logic.",
        "goto cannot jump to a label in a different function.",
        "Almost every goto can be replaced with loops, functions, or break — prefer those."
      ],
      commonMistakes: [
        "Using goto to implement loops instead of using proper while or for constructs.",
        "Jumping forward over a variable declaration with goto, which can cause undefined behavior.",
        "Creating circular goto patterns that result in infinite loops without a clear exit condition.",
        "Using goto across function boundaries — labels are local to the function and cross-function goto is not possible.",
        "Overusing goto for flow control in ways that structured programming constructs handle more clearly."
      ],
      bestPractices: [
        "Avoid goto entirely in most cases; use loops, conditionals, and function calls instead.",
        "The one accepted exception is jumping to a cleanup label at the end of a function for resource deallocation.",
        "When using goto for cleanup, always place the cleanup label near the end of the function.",
        "Document any goto with a clear comment explaining why no structured alternative was sufficient.",
        "Never jump forward over variable declarations, as this produces unpredictable behavior."
      ],
      exercises: [
        {
          title: "Exercise 1 – Rewrite with Loop",
          description: "Given this goto-based code that counts from 1 to 5, rewrite it using a proper for loop: int i=1; start: printf(\"%d\\n\",i); i++; if(i<=5) goto start;. Verify that both versions produce the same output.",
          hint: "A for loop with initialization i=1, condition i<=5, and increment i++ does exactly the same thing without goto."
        },
        {
          title: "Exercise 2 – Spot the Problem",
          description: "Explain in a comment inside your code why this goto is dangerous: 'goto middle; int x = 5; middle: printf(\"%d\", x);'. Then rewrite it safely without goto.",
          hint: "The goto jumps over the declaration and initialization of x. When middle is reached, x has been declared but never initialized."
        },
        {
          title: "Exercise 3 – Cleanup Pattern",
          description: "Write a function that allocates two memory blocks (with malloc). If the first allocation fails, print an error and jump to cleanup. If the second fails, print an error and jump to cleanup. At cleanup, free any successfully allocated memory and print what was freed.",
          hint: "Initialize both pointers to NULL before any allocation. At the cleanup label, check each pointer with if(ptr != NULL) before freeing."
        }
      ],
      challenge: {
        title: "Challenge – Refactor with Functions",
        description: "Take a program that uses multiple goto statements for control flow (not just cleanup) and refactor it to use proper loops, conditionals, and functions. The program should: loop asking the user for a number between 1 and 10, print whether it is odd or even, and stop when the user enters 0. Write two versions: one with goto and one refactored with a do-while loop. Compare readability.",
        hint: "The goto version uses labels like 'ask_again' and 'done'. The refactored version uses do-while with a break or proper condition. Both should produce identical output."
      },
      quiz: [
        {
          question: "What does the goto statement do?",
          options: [
            "Calls a function at the specified label.",
            "Jumps unconditionally to the labeled statement in the same function.",
            "Exits the current loop.",
            "Returns a value from the current function."
          ],
          correctIndex: 1,
          explanation: "goto transfers execution unconditionally to the statement preceded by the specified label. Both goto and its target must be in the same function."
        },
        {
          question: "How is a label defined in C?",
          options: [
            "With the label keyword: label myLabel;",
            "As a function with no return type.",
            "As an identifier followed by a colon: myLabel:",
            "With a # preprocessor directive."
          ],
          correctIndex: 2,
          explanation: "A label is simply a valid C identifier followed by a colon. It must be placed immediately before a statement. Example: cleanup: free(ptr);"
        },
        {
          question: "Can goto jump to a label in a different function?",
          options: [
            "Yes, if the function is in the same file.",
            "Yes, if the label is declared extern.",
            "No, goto can only jump to labels within the same function.",
            "Yes, using a special function pointer syntax."
          ],
          correctIndex: 2,
          explanation: "Labels in C are local to the function they are declared in. goto can only transfer control within the same function boundary."
        },
        {
          question: "What term describes the chaotic, hard-to-follow code that results from excessive goto use?",
          options: [
            "Arrow code",
            "Spaghetti code",
            "Dead code",
            "Zombie code"
          ],
          correctIndex: 1,
          explanation: "Code with many goto statements is called spaghetti code because the control flow jumps around like tangled spaghetti, making it nearly impossible to trace the program's logic."
        },
        {
          question: "Who wrote the famous 1968 letter arguing against goto?",
          options: [
            "Dennis Ritchie",
            "Brian Kernighan",
            "Edsger Dijkstra",
            "Bjarne Stroustrup"
          ],
          correctIndex: 2,
          explanation: "Edsger Dijkstra wrote 'Go To Statement Considered Harmful' in 1968, which sparked the structured programming movement and led to widespread discouragement of goto."
        },
        {
          question: "What is the one widely accepted modern use of goto in C?",
          options: [
            "Implementing custom loop constructs.",
            "Jumping between different switch cases.",
            "Jumping to a cleanup/error-handling label at the end of a function for resource deallocation.",
            "Replacing recursion with iteration."
          ],
          correctIndex: 2,
          explanation: "The goto-to-cleanup pattern is accepted in C for error handling: when an error occurs partway through resource acquisition, goto cleanup; jumps to code that safely releases everything."
        },
        {
          question: "What must follow a label in C?",
          options: [
            "A function call.",
            "A statement (or a semicolon for an empty statement).",
            "A variable declaration.",
            "Another label."
          ],
          correctIndex: 1,
          explanation: "A label must be followed by at least one statement. If you want a label at the end of a block with nothing after it, use an empty statement: label: ;"
        },
        {
          question: "Why is jumping forward over a variable declaration with goto dangerous?",
          options: [
            "The variable will be initialized to random garbage.",
            "The variable's declaration is skipped, so the variable exists in scope but was never initialized.",
            "It causes an immediate segmentation fault.",
            "The compiler silently removes the variable."
          ],
          correctIndex: 1,
          explanation: "Jumping over a declaration means the variable is in scope after the label but its initialization code never ran. Compilers may warn or error about this depending on the version."
        },
        {
          question: "Which structured programming construct can always replace a backward goto (looping goto)?",
          options: [
            "switch",
            "A while, do-while, or for loop.",
            "An if-else chain.",
            "A function call."
          ],
          correctIndex: 1,
          explanation: "Any goto that jumps backward to repeat code is implementing a loop. It should be replaced with while, do-while, or for, which express the looping intent clearly."
        },
        {
          question: "In the cleanup pattern, why should all pointers be initialized to NULL before any allocation?",
          options: [
            "NULL is required for malloc to succeed.",
            "So the cleanup code can safely check if each resource was acquired before trying to free it.",
            "Because malloc returns NULL for the first call.",
            "To prevent the goto from jumping too far."
          ],
          correctIndex: 1,
          explanation: "If you always initialize pointers to NULL, the cleanup code can do if(ptr != NULL) free(ptr), which safely frees only what was actually allocated, even if goto jumped past some allocations."
        },
        {
          question: "Is it possible to replace every goto in a C program with structured constructs?",
          options: [
            "No, some patterns inherently require goto.",
            "Yes, any goto-based program can be rewritten using loops, conditionals, and functions.",
            "Only if the goto jumps backward.",
            "Only if the function has fewer than 50 lines."
          ],
          correctIndex: 1,
          explanation: "Theoretically, any goto can be eliminated using loops, conditionals, return, and helper functions. goto is never strictly necessary, though the cleanup pattern can be more readable with it."
        },
        {
          question: "What is 'structured programming'?",
          options: [
            "Using structs and unions for all data.",
            "A coding style that uses only loops, conditionals, and function calls instead of goto.",
            "Writing code in a top-down design pattern.",
            "Compiling code with strict warnings enabled."
          ],
          correctIndex: 1,
          explanation: "Structured programming is a paradigm that restricts control flow to well-defined constructs — sequence, selection (if/switch), and repetition (loops) — avoiding arbitrary jumps like goto."
        },
        {
          question: "Where is the cleanup label typically placed when using goto for error handling?",
          options: [
            "At the beginning of the function.",
            "In the middle of the function where errors are most likely.",
            "Near the end of the function, before the return statement.",
            "In a separate helper function."
          ],
          correctIndex: 2,
          explanation: "The cleanup label is placed near the bottom of the function so all error goto statements jump forward to a centralized cleanup section before the function returns."
        },
        {
          question: "Which of these is a label in C code: int start = 0; start: x = 1; goto start;?",
          options: [
            "int start",
            "start: (the label before x = 1)",
            "goto start",
            "x = 1"
          ],
          correctIndex: 1,
          explanation: "The label is 'start:' — the identifier followed by a colon before a statement. 'int start = 0' is a variable declaration, not a label."
        },
        {
          question: "Why does the Linux kernel source code use goto for error handling despite the general advice against it?",
          options: [
            "Linux was written before structured programming was invented.",
            "The cleanup pattern with goto produces cleaner, less nested code than deeply chained if-else error checks.",
            "The Linux kernel requires goto for hardware access.",
            "goto compiles to faster machine code in the kernel."
          ],
          correctIndex: 1,
          explanation: "Kernel code acquires many resources (locks, memory, devices). The goto-to-cleanup pattern avoids deeply nested if-else cleanup chains, producing code that is actually easier to read and verify."
        },
        {
          question: "What happens when two labels have the same name in the same function?",
          options: [
            "The second label overrides the first.",
            "goto always jumps to the first label.",
            "It is a compile error — label names must be unique within a function.",
            "The program randomly chooses one."
          ],
          correctIndex: 2,
          explanation: "Label names must be unique within a function. Duplicate labels are a compile-time error."
        },
        {
          question: "Can goto be used to jump into the middle of a loop body?",
          options: [
            "Yes, goto can jump anywhere in the function.",
            "No, goto cannot jump into loop bodies.",
            "Only with while loops, not for loops.",
            "Only if the loop body has fewer than 10 statements."
          ],
          correctIndex: 0,
          explanation: "goto can jump to any labeled statement in the same function, including inside loop bodies. This is one reason it can create confusing code — the normal loop setup may be bypassed."
        },
        {
          question: "What is the best way to exit multiple nested loops without goto?",
          options: [
            "Use break break; to break two levels at once.",
            "Use a boolean flag set in the inner loop, checked in the outer loop condition or body.",
            "Use continue in the inner loop to propagate the exit.",
            "Use a global variable to signal exit."
          ],
          correctIndex: 1,
          explanation: "Setting a boolean flag (e.g., done = 1) in the inner loop and then checking it in the outer loop (while(!done)) cleanly breaks out of both loops without goto."
        },
        {
          question: "Which of the following describes a legitimate case for goto according to modern C experts?",
          options: [
            "Replacing all while loops with goto for performance.",
            "Implementing state machines in embedded systems where clarity demands direct jumps.",
            "Jumping to a cleanup section at the end of a function when an error occurs mid-initialization.",
            "Both B and C are considered legitimate by modern C experts."
          ],
          correctIndex: 2,
          explanation: "The cleanup-on-error pattern at the end of a function is the most universally accepted use of goto in modern C. State machines more commonly use switch with enum states."
        },
        {
          question: "What does the statement 'goto considered harmful' mean for a C beginner?",
          options: [
            "goto is illegal in ANSI C.",
            "goto should almost never be used because it makes programs hard to read and maintain.",
            "goto is so harmful it will damage your hardware.",
            "goto causes performance problems."
          ],
          correctIndex: 1,
          explanation: "'Considered harmful' is a programming community phrase meaning 'strongly discouraged.' goto makes control flow hard to follow and should be replaced with structured constructs in almost all cases."
        }
      ]
    },
    {
      id: "topic-3-9",
      title: "Building Menu-Driven Programs",
      estimatedReadingTime: 10,
      explanation: `A menu-driven program is one that presents the user with a list of options, reads their choice, executes the corresponding action, and then — unless the user chooses to quit — displays the menu again and waits for the next choice. This is a classic, practical structure that ties together almost every concept from this lesson: loops, conditionals, switch, break, and input handling.

The fundamental structure uses a do-while or infinite loop. A do-while is natural here because you always want to display the menu at least once before checking whether to exit. Inside the loop, you print the menu options, read the user's choice, and use a switch statement to dispatch the correct action. A break or a condition in the loop handles the quit option.

Input handling is crucial in menu-driven programs. Users might enter letters when you expect numbers, or values outside the valid range. After reading with scanf, you should validate the input and print an error message for invalid choices, then loop back to the menu. Using a switch with a default case elegantly handles unexpected values.

Organizing a menu-driven program well means keeping the loop itself small and delegating each option's logic to a separate function. Instead of putting 50 lines of code inside a case, write a function called printReport() or calculateTotal() and call it. This makes the switch easy to read — each case is just one function call — and each function can be developed, tested, and understood independently.

Real-world menu programs also need to handle the edge case of the user entering EOF (end-of-file, triggered by pressing Ctrl+D on Linux or Ctrl+Z on Windows). A robust program checks the return value of scanf and handles EOF gracefully by breaking out of the loop rather than crashing or looping infinitely. Building this level of care into your programs from the beginning is the mark of a professional C programmer.`,
      codeExample: `#include <stdio.h>

/* Function prototypes for menu actions */
void greetUser(void);
void printNumbers(int n);
void showHelp(void);

int main(void) {
    int choice;

    do {
        /* Display the menu */
        printf("\\n=== Main Menu ===\\n");
        printf("1. Greet user\\n");
        printf("2. Print numbers 1 to 5\\n");
        printf("3. Show help\\n");
        printf("0. Quit\\n");
        printf("Enter choice: ");

        /* Read the choice; handle non-integer input */
        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter a number.\\n");
            break; /* For demo: break on bad input */
        }

        /* Dispatch based on choice */
        switch (choice) {
            case 1:
                greetUser();
                break;
            case 2:
                printNumbers(5);
                break;
            case 3:
                showHelp();
                break;
            case 0:
                printf("Goodbye!\\n");
                break;
            default:
                printf("Invalid choice. Try again.\\n");
        }

    } while (choice != 0);

    return 0;
}

void greetUser(void) {
    printf("Hello, welcome to CodeCraft C!\\n");
}

void printNumbers(int n) {
    for (int i = 1; i <= n; i++) {
        printf("%d ", i);
    }
    printf("\\n");
}

void showHelp(void) {
    printf("Enter a number from the menu to choose an action.\\n");
    printf("Enter 0 to quit.\\n");
}`,
      expectedOutput: `
=== Main Menu ===
1. Greet user
2. Print numbers 1 to 5
3. Show help
0. Quit
Enter choice: 
=== Main Menu ===
1. Greet user
2. Print numbers 1 to 5
3. Show help
0. Quit
Enter choice: Goodbye!`,
      keyTakeaways: [
        "Menu-driven programs use a loop to repeatedly display options and process choices.",
        "do-while is the natural loop for menus because the menu must show at least once.",
        "switch efficiently dispatches to the correct action based on the user's numeric choice.",
        "Delegate each menu option's logic to a separate function for clean, maintainable code.",
        "Always include a default case to handle invalid menu choices gracefully.",
        "Check scanf's return value to detect and handle non-numeric or EOF input robustly."
      ],
      commonMistakes: [
        "Placing all action code directly in switch cases instead of calling helper functions, making the switch unreadable.",
        "Forgetting break in switch cases, causing multiple actions to execute for one choice.",
        "Not validating input, so entering a letter instead of a number causes the menu to spin infinitely.",
        "Using while(1) without a proper exit condition, leaving no clean way to quit the program.",
        "Forgetting to clear the input buffer when scanf fails, causing repeated failed reads."
      ],
      bestPractices: [
        "Keep the main menu loop lean: print menu, read choice, call a function per case.",
        "Implement each menu option as a separate, well-named function.",
        "Use a do-while with the exit choice as the termination condition.",
        "Always include a default case in switch to handle invalid input gracefully.",
        "Check scanf return values and handle invalid input to prevent infinite loops on bad input."
      ],
      exercises: [
        {
          title: "Exercise 1 – Simple Calculator Menu",
          description: "Build a menu-driven calculator with options: 1=Add, 2=Subtract, 3=Multiply, 4=Divide, 0=Quit. For each arithmetic option, read two numbers, compute the result, and display it. Handle division by zero. Loop until the user selects 0.",
          hint: "Use do-while for the loop, switch for dispatch. Put the calculation logic in a helper function per operation, or inside each case with validation."
        },
        {
          title: "Exercise 2 – Unit Converter",
          description: "Create a menu that converts between: 1=Celsius to Fahrenheit, 2=Fahrenheit to Celsius, 3=Kilometers to Miles, 4=Miles to Kilometers, 0=Exit. Read the value to convert, compute, and print the result with two decimal places.",
          hint: "Formulas: F = C*9/5+32; C = (F-32)*5/9; Miles = km*0.621371; km = miles/0.621371. Each case reads a float and prints the result."
        },
        {
          title: "Exercise 3 – Student Grade Manager",
          description: "Design a menu with: 1=Enter a grade (0-100), 2=Show average of all entered grades, 3=Show highest grade, 4=Show lowest grade, 0=Exit. Store up to 50 grades in an array. Validate that grades are between 0 and 100.",
          hint: "Use a global array and counter (or pass them as parameters). Compute the average, max, and min in separate functions called from each switch case."
        }
      ],
      challenge: {
        title: "Challenge – Bank Account Simulator",
        description: "Build a menu-driven bank account simulator. Operations: 1=Deposit (read amount, add to balance), 2=Withdraw (read amount, subtract if sufficient, else print 'Insufficient funds'), 3=Check balance, 4=Transaction history (store last 10 transactions in an array), 0=Exit. Start with an initial balance of $1000. Display the menu after each operation until the user quits.",
        hint: "Use a float for balance. Use an array of floats for the last 10 transactions (positive for deposits, negative for withdrawals). Use a circular index or shift elements. Call helper functions from each case."
      },
      quiz: [
        {
          question: "Which loop is most natural for the main loop of a menu-driven program?",
          options: [
            "for loop with a fixed count.",
            "do-while loop.",
            "A simple while loop that starts with a false condition.",
            "A goto-based loop."
          ],
          correctIndex: 1,
          explanation: "do-while is most natural because the menu must display at least once before the user can make any choice. do-while guarantees at least one execution."
        },
        {
          question: "Why is switch preferred over if-else if for dispatching menu choices?",
          options: [
            "switch can handle string comparisons which if cannot.",
            "switch compiles to faster code than if-else.",
            "switch clearly maps each integer choice to an action and is more readable for many options.",
            "switch automatically handles invalid choices without a default."
          ],
          correctIndex: 2,
          explanation: "switch is visually clear and efficient for comparing one integer against many specific values, which is exactly what menu dispatch involves."
        },
        {
          question: "What does the default case in a menu's switch statement handle?",
          options: [
            "The quit option.",
            "Any choice the user entered that does not match a valid menu option.",
            "The first option, as a fallback.",
            "It is not needed in menu programs."
          ],
          correctIndex: 1,
          explanation: "The default case catches any input that is not a valid menu option number, allowing you to print an error message and re-display the menu without crashing."
        },
        {
          question: "Why should each menu option's logic be in a separate function?",
          options: [
            "Because C requires it for menu programs.",
            "To keep the switch statement concise and each action independently testable.",
            "Because local variables in switch cases can conflict.",
            "To avoid having to use break statements."
          ],
          correctIndex: 1,
          explanation: "Separate functions keep the switch readable (one function call per case), allow independent testing, and make the program easier to extend and maintain."
        },
        {
          question: "What should happen if the user enters a letter (non-integer) when a menu expects a number?",
          options: [
            "The program should crash with an error.",
            "The program should silently skip the input.",
            "The program should print an error message and re-display the menu.",
            "The program should exit immediately."
          ],
          correctIndex: 2,
          explanation: "A robust menu program validates input and informs the user of the error, then gives them another chance to enter a valid choice."
        },
        {
          question: "What does scanf return when it successfully reads one integer?",
          options: ["0", "1", "The integer value read", "-1"],
          correctIndex: 1,
          explanation: "scanf returns the number of items successfully read. If you asked it to read one integer and it succeeded, it returns 1. This return value should be checked for input validation."
        },
        {
          question: "How can you prevent the menu loop from running forever if the user enters 0 (quit)?",
          options: [
            "Use break inside the case 0 of the switch.",
            "Use the exit condition in the do-while: do { ... } while (choice != 0);",
            "Both A and B are valid ways to exit the loop on choice 0.",
            "You must use goto to exit a do-while loop."
          ],
          correctIndex: 2,
          explanation: "Both approaches work. Using the do-while condition is cleaner. Using break inside case 0 and letting the do-while condition also check is equally valid."
        },
        {
          question: "What is a 'dispatch' in the context of a menu-driven program?",
          options: [
            "Displaying the menu options to the user.",
            "Reading the user's choice from the keyboard.",
            "Routing program execution to the correct action based on the user's choice.",
            "Checking whether the user's input is valid."
          ],
          correctIndex: 2,
          explanation: "Dispatching means directing execution to the appropriate handler (usually a function) based on the selected option, typically done with a switch statement."
        },
        {
          question: "Why is it important to check the return value of scanf in a menu program?",
          options: [
            "To know how large the input buffer is.",
            "To detect non-integer input or end-of-file, preventing infinite loops.",
            "Because scanf is deprecated and unreliable.",
            "To determine which case in the switch will run."
          ],
          correctIndex: 1,
          explanation: "If scanf fails (user types a letter), the choice variable is unset or holds a previous value. Without checking the return, the loop may run infinitely with an unchanging invalid state."
        },
        {
          question: "What is the minimum number of options a useful menu-driven program must have?",
          options: [
            "At least five options.",
            "Exactly four options.",
            "At least one action option plus a quit/exit option.",
            "No minimum — a single option is acceptable."
          ],
          correctIndex: 2,
          explanation: "A minimal useful menu needs at least one meaningful action and a way to exit. Without an exit option, users cannot leave the program cleanly."
        },
        {
          question: "In a menu-driven bank program, where should the account balance variable be declared?",
          options: [
            "As a global variable so all functions can access it.",
            "Inside the main function, passed to helper functions as a pointer or parameter.",
            "Inside each switch case.",
            "As a local variable in the display function."
          ],
          correctIndex: 1,
          explanation: "Preferably in main and passed to functions — this avoids the drawbacks of global variables while still sharing the data. Globals work but make testing and maintenance harder."
        },
        {
          question: "Which of the following best describes how to handle 'Insufficient funds' in a withdrawal menu option?",
          options: [
            "Silently do nothing if the balance is too low.",
            "Exit the program with an error code.",
            "Check the balance before subtracting; if insufficient, print an error and do not subtract.",
            "Allow the balance to go negative without restriction."
          ],
          correctIndex: 2,
          explanation: "A proper validation check before the operation is the right approach: if (amount <= balance) then subtract, else print an informative error and leave the balance unchanged."
        },
        {
          question: "What is the 'clear the input buffer' problem in C menu programs?",
          options: [
            "When the screen buffer fills up and stops displaying.",
            "When scanf leaves unread characters in stdin, causing subsequent reads to behave unexpectedly.",
            "When too many printf calls slow down the program.",
            "When the choice variable overflows."
          ],
          correctIndex: 1,
          explanation: "If the user types '5\\n' and scanf reads 5, the newline remains in stdin. The next scanf may read it unexpectedly. Techniques like reading and discarding with getchar or using fflush help."
        },
        {
          question: "How should you structure a menu-driven program to add new options easily?",
          options: [
            "Hardcode all options and their logic directly in one large function.",
            "Add a new case to the switch and implement the new action as a separate function.",
            "Use global arrays to store function pointers for each option.",
            "Rewrite the entire menu structure each time."
          ],
          correctIndex: 1,
          explanation: "Adding a new case to the switch and writing a new handler function is the clean, scalable approach. Each addition is isolated and does not require touching existing code."
        },
        {
          question: "What is the purpose of a 'help' or 'about' option in a menu?",
          options: [
            "Required by the C standard for all programs.",
            "To provide the user with information about what each option does.",
            "To reset the program's state.",
            "To test the input validation system."
          ],
          correctIndex: 1,
          explanation: "A help option improves usability by explaining the available options and how to use the program, especially useful when options are not self-explanatory."
        },
        {
          question: "A user selects option 2 and the program correctly runs option 2. Then without re-displaying the menu, it also runs option 3. What bug caused this?",
          options: [
            "The do-while condition was wrong.",
            "A missing break in the switch case 2, causing fall-through to case 3.",
            "The scanf returned the wrong value.",
            "The user's choice variable was not initialized."
          ],
          correctIndex: 1,
          explanation: "Missing break at the end of case 2 causes execution to fall through into case 3's code. Each case in a menu switch must have a break to prevent this."
        },
        {
          question: "What is the best way to display currency amounts in a menu-driven bank program?",
          options: [
            "Print them as integers (cents) to avoid floating-point issues.",
            "Use printf with the format '%.2f' to show exactly two decimal places.",
            "Use integer division and the remainder separately.",
            "Always display the raw float with all decimal places."
          ],
          correctIndex: 1,
          explanation: "%.2f in printf formats a floating-point number with exactly two decimal places, which is the standard representation for currency values."
        },
        {
          question: "Why is it poor practice to ask the user to 're-enter their choice' in an infinite loop without a maximum retry limit?",
          options: [
            "C does not allow reading input more than five times.",
            "An infinite retry loop with no escape can trap a user, especially if there is a persistent input error.",
            "scanf slows down significantly after many failed reads.",
            "The C standard prohibits retrying scanf on failure."
          ],
          correctIndex: 1,
          explanation: "Without a limit, a persistent input problem (like piped bad data) can lock the program in an infinite retry loop. A maximum retry count or EOF detection provides a graceful exit."
        },
        {
          question: "What structure allows a menu-driven program to process multiple user sessions without restarting?",
          options: [
            "A single if-else chain.",
            "A loop that returns to the menu display after every completed action.",
            "A goto statement that jumps back to the top.",
            "A recursive call to main()."
          ],
          correctIndex: 1,
          explanation: "The loop structure — typically do-while — ensures the menu is re-displayed after each completed action, allowing any number of operations before the user chooses to quit."
        },
        {
          question: "In a well-designed menu program, how should related data (like a list of grades) be passed between the menu and action functions?",
          options: [
            "Through global variables declared outside main.",
            "Through function parameters and return values, keeping data encapsulated in main.",
            "By writing and reading from a temporary file.",
            "Using environment variables."
          ],
          correctIndex: 1,
          explanation: "Passing data through parameters keeps the functions reusable and testable. Global variables work but create hidden dependencies. Parameters make data flow explicit and the code cleaner."
        }
      ]
    }
  ]
};
