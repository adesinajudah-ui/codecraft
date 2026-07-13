import type { Lesson } from "./types";

export const lesson2: Lesson = {
  id: "lesson-2",
  title: "Lesson 2 – C Fundamentals",
  description: "Explore core C concepts including type conversion, the preprocessor, format specifiers, bitwise operators, memory basics, and variable scope.",
  topics: [
    {
      id: "topic-2-1",
      title: "Type Conversion and Casting",
      estimatedReadingTime: 8,
      explanation: `In C, not every variable is the same type, and sometimes you need to move a value from one type to another. This is called type conversion. There are two flavors: implicit conversion, which the compiler handles automatically, and explicit conversion, which you control by writing a cast. Understanding how these work prevents subtle bugs that can ruin your programs.

Implicit conversion happens when C quietly changes one type to fit another. For example, if you add an int and a float together, C automatically promotes the int to float before doing the math. This is called "the usual arithmetic conversions." The rule is: C converts toward the type that can hold more information, so smaller types are widened to larger ones. This sounds helpful, but it can also hide problems, especially when going in the other direction.

When you assign a float to an int variable, C truncates the decimal part silently. The number 3.9 becomes 3, not 4. No rounding occurs; the fractional part simply disappears. The compiler may not even warn you unless you enable warnings explicitly. That silent loss is one of the most common sources of beginner bugs in C programs.

Explicit casting is the way you take control. You write the target type in parentheses directly before the value: (int) 3.9 gives you 3. You might use a cast to force integer division to produce a floating-point result instead. For instance, 5 / 2 in C gives 2 because both operands are integers. But (float) 5 / 2 gives 2.5 because you promoted 5 to float first, causing the division to use floating-point arithmetic.

There are some important rules to keep in mind. Casting between signed and unsigned integers can produce unexpected large values when a negative number is reinterpreted as unsigned. Casting a pointer from one type to another is possible but dangerous without a good reason. Always ask: "do I actually need this cast, and do I understand what value I will get?" Good C programmers cast intentionally, not by accident.`,
      codeExample: `#include <stdio.h>

int main(void) {
    int a = 7;
    int b = 2;
    float result_implicit;
    int truncated;
    float explicit_result;

    /* Implicit conversion: int promoted to float */
    result_implicit = a;          /* int 7 stored as float 7.0 */
    printf("Implicit int->float: %.1f\n", result_implicit);

    /* Integer division (no cast): result is truncated */
    printf("Integer division 7/2 = %d\n", a / b);

    /* Explicit cast: force float division */
    explicit_result = (float)a / b;
    printf("Float division (float)7/2 = %.1f\n", explicit_result);

    /* Assigning float to int truncates, not rounds */
    float pi = 3.99f;
    truncated = (int)pi;
    printf("(int)3.99 = %d  (not 4)\n", truncated);

    /* Casting char to int shows ASCII value */
    char letter = 'A';
    printf("'A' as int = %d\n", (int)letter);

    return 0;
}`,
      expectedOutput: `Implicit int->float: 7.0
Integer division 7/2 = 3
Float division (float)7/2 = 3.5
(int)3.99 = 3  (not 4)
'A' as int = 65`,
      keyTakeaways: [
        "Implicit conversion happens automatically; explicit casting uses the (type) syntax.",
        "Assigning a float to an int truncates (not rounds) the decimal portion.",
        "Integer division always produces an integer; cast at least one operand to float for fractional results.",
        "C promotes smaller types toward larger types in mixed-type arithmetic.",
        "Always cast intentionally and understand what value you will receive after conversion."
      ],
      commonMistakes: [
        "Expecting (int)3.9 to round to 4 — C truncates toward zero, giving 3.",
        "Writing 5 / 2 and expecting 2.5 — both operands are int so the result is int 2.",
        "Assigning a negative int to an unsigned variable and getting a huge positive number.",
        "Casting a pointer to an unrelated type and then dereferencing it, causing undefined behavior.",
        "Forgetting that char is just a small integer and can be used in arithmetic directly."
      ],
      bestPractices: [
        "Enable compiler warnings (-Wall -Wextra) so implicit narrowing conversions are flagged.",
        "Use explicit casts when intent is important, even if the compiler would do it implicitly.",
        "Never rely on implicit conversion to go from a larger type to a smaller one.",
        "Document casts with a short comment explaining why the conversion is safe.",
        "Prefer using the same type throughout an expression to avoid conversion surprises."
      ],
      exercises: [
        {
          title: "Exercise 1 – Integer vs Float Division",
          description: "Write a program that reads two integers from the user and prints both the integer result and the floating-point result of dividing the first by the second. Use a cast to produce the float result.",
          hint: "Cast one operand to float before dividing. Remember that (float)(a / b) is different from (float)a / b."
        },
        {
          title: "Exercise 2 – Truncation Explorer",
          description: "Declare four float variables with values 1.1, 1.5, 1.9, and -1.7. Cast each to int and print both the original and the truncated value. Note how truncation works for negative numbers.",
          hint: "Truncation always moves toward zero, so -1.7 becomes -1, not -2."
        },
        {
          title: "Exercise 3 – Char Arithmetic",
          description: "Write a program that takes a lowercase letter stored in a char variable and prints the uppercase version by subtracting 32 (the ASCII difference). Then print the char's numeric ASCII value using an explicit cast to int.",
          hint: "The ASCII value of 'a' is 97 and 'A' is 65. Use printf with %c and %d format specifiers."
        }
      ],
      challenge: {
        title: "Challenge – Grade Average Calculator",
        description: "Read five integer quiz scores from the user. Compute and print the average as a floating-point number with two decimal places. Then convert the float average back to an integer (truncated) and print a letter grade: 90+ is A, 80+ is B, 70+ is C, 60+ is D, otherwise F. Use explicit casts throughout and comment every conversion.",
        hint: "Sum the five scores as ints, then cast the sum to float before dividing by 5. Use if-else chains on the truncated int average for the grade."
      },
      quiz: [
        {
          question: "What does C do when you add an int and a float together?",
          options: [
            "It converts the float to int and performs integer addition.",
            "It converts the int to float and performs floating-point addition.",
            "It raises a compile-time error.",
            "It performs both int and float addition and stores both results."
          ],
          correctIndex: 1,
          explanation: "C's usual arithmetic conversions promote the smaller/less-precise type upward, so the int is widened to float before the addition takes place."
        },
        {
          question: "What is the result of the C expression 7 / 2 when both operands are int?",
          options: ["3.5", "4", "3", "3.0"],
          correctIndex: 2,
          explanation: "Integer division in C discards the fractional part, so 7 / 2 = 3. No rounding occurs."
        },
        {
          question: "How do you force a floating-point division from two int variables a and b?",
          options: [
            "(int)a / b",
            "a / b",
            "(float)a / b",
            "(float)(a / b)"
          ],
          correctIndex: 2,
          explanation: "Casting one operand before the division forces float arithmetic. Writing (float)(a/b) first does integer division and then converts the already-truncated result."
        },
        {
          question: "What value does (int)3.99 produce in C?",
          options: ["4", "3", "3.99", "0"],
          correctIndex: 1,
          explanation: "Casting a float to int truncates toward zero; 3.99 becomes 3, not 4."
        },
        {
          question: "What value does (int)(-2.7) produce?",
          options: ["-3", "-2", "2", "-2.7"],
          correctIndex: 1,
          explanation: "Truncation always moves toward zero, so -2.7 becomes -2, not -3."
        },
        {
          question: "Which conversion is implicit?",
          options: [
            "Writing (float)x to convert int x",
            "Assigning a float to an int variable without a cast",
            "Using (int) in front of a value",
            "Calling a conversion function explicitly"
          ],
          correctIndex: 1,
          explanation: "Implicit conversion happens without any cast syntax; the compiler performs it automatically, though it may produce a warning."
        },
        {
          question: "If you assign -1 to an unsigned int, what typically happens?",
          options: [
            "You get 0.",
            "You get -1 stored correctly.",
            "You get a very large positive number (UINT_MAX).",
            "The compiler refuses to compile."
          ],
          correctIndex: 2,
          explanation: "Negative integers reinterpreted as unsigned wrap around, so -1 becomes UINT_MAX (e.g., 4294967295 on a 32-bit system)."
        },
        {
          question: "What does the expression (char)65 evaluate to when printed with %c?",
          options: ["65", "A", "a", "The letter 'B'"],
          correctIndex: 1,
          explanation: "65 is the ASCII code for 'A', so casting the integer to char and printing with %c displays A."
        },
        {
          question: "Which statement about implicit promotion is correct?",
          options: [
            "C promotes larger types to smaller types.",
            "C promotes toward the type that can represent more values.",
            "C always converts everything to int.",
            "C always converts everything to double."
          ],
          correctIndex: 1,
          explanation: "The usual arithmetic conversions always widen toward the type with greater range/precision, preventing loss of significant information."
        },
        {
          question: "What is printed by: int x = (int)(9.0 / 4.0); printf('%d', x);?",
          options: ["2", "2.25", "2.0", "3"],
          correctIndex: 0,
          explanation: "9.0 / 4.0 = 2.25 as a double, then casting to int truncates to 2."
        },
        {
          question: "When is an explicit cast required rather than just good practice?",
          options: [
            "When converting int to long.",
            "When passing a void* to a specific pointer type in C.",
            "When adding two ints.",
            "When storing a char in an int."
          ],
          correctIndex: 1,
          explanation: "In C, void pointers are implicitly convertible, but casting makes intent clear; in practice explicit casts document that you know what you are doing with the pointer type."
        },
        {
          question: "What is the output of: float f = 1.0f / 3.0f; int i = (int)(f * 3); printf('%d', i);?",
          options: ["1", "0", "3", "Undefined"],
          correctIndex: 0,
          explanation: "1.0/3.0 in float is approximately 0.3333..., multiplied by 3 gives approximately 0.9999, and casting to int truncates to 0... actually due to floating-point representation this often gives 1. The expected result is 1 on most platforms."
        },
        {
          question: "Which best describes the difference between truncation and rounding?",
          options: [
            "Truncation always rounds toward the nearest integer.",
            "Truncation discards the fractional part; rounding picks the nearest integer.",
            "They are the same operation in C.",
            "Rounding discards the fractional part; truncation rounds up."
          ],
          correctIndex: 1,
          explanation: "Truncation simply drops the fractional digits (toward zero), while rounding picks the closest integer (using 0.5 as the midpoint boundary)."
        },
        {
          question: "What does the following print? printf('%d', (int)3.5 + (int)3.5);",
          options: ["7", "6", "8", "3"],
          correctIndex: 1,
          explanation: "Each (int)3.5 truncates to 3, so the sum is 3 + 3 = 6."
        },
        {
          question: "Assigning a double to a float is an example of:",
          options: [
            "Widening conversion",
            "Narrowing conversion",
            "No conversion at all",
            "An illegal operation in C"
          ],
          correctIndex: 1,
          explanation: "Going from double (64-bit) to float (32-bit) is narrowing — precision can be lost, which is why the compiler may warn about it."
        },
        {
          question: "What is the result of (float)3 / (float)2?",
          options: ["1", "1.5", "2", "1.0"],
          correctIndex: 1,
          explanation: "Both operands are now float, so floating-point division is performed and 3.0 / 2.0 = 1.5."
        },
        {
          question: "Which compiler flag helps catch implicit narrowing conversions?",
          options: ["-O2", "-Wall", "-std=c99", "-lm"],
          correctIndex: 1,
          explanation: "-Wall enables many common warnings including those about implicit conversion that may lose data."
        },
        {
          question: "What is 'promotion' in the context of C type conversion?",
          options: [
            "Moving a variable to global scope.",
            "Automatically converting a smaller type to a larger type.",
            "Casting an int to a char.",
            "Converting between pointer types."
          ],
          correctIndex: 1,
          explanation: "Promotion (or widening) is the automatic upward conversion of a smaller type — like char or short — to a larger type like int or double during arithmetic."
        },
        {
          question: "Given char c = 'a'; what does (int)c print?",
          options: ["97", "65", "1", "a"],
          correctIndex: 0,
          explanation: "The ASCII value of 'a' is 97. Casting it to int and printing with %d displays 97."
        },
        {
          question: "Why might assigning a long to an int be dangerous?",
          options: [
            "longs cannot be divided.",
            "The long value might exceed the range of int, causing data loss.",
            "Ints are always larger than longs.",
            "C does not allow this assignment."
          ],
          correctIndex: 1,
          explanation: "If the long value is larger than INT_MAX (typically 2147483647), only the lower bits are kept when truncating to int, giving a wrong or negative result."
        }
      ]
    },
    {
      id: "topic-2-2",
      title: "The Preprocessor and Macros",
      estimatedReadingTime: 9,
      explanation: `Before your C code ever reaches the compiler, a program called the preprocessor runs over it and transforms it. The preprocessor follows its own simple set of rules, handling lines that start with a hash (#) symbol. These directives tell the preprocessor to include other files, define named constants, or conditionally include or exclude sections of code. Understanding this first pass is essential for reading and writing real C programs.

The most common preprocessor directive you have already seen is #include. When the preprocessor encounters #include <stdio.h>, it literally copies and pastes the entire contents of stdio.h into your source file at that point. This is why, after including the header, your program knows about printf: the declaration was pasted right in. Angle brackets mean "look in the system include paths," while double quotes (#include "myfile.h") mean "look in the current directory first."

The #define directive lets you create macros. In its simplest form, #define PI 3.14159 tells the preprocessor to replace every occurrence of the word PI in the source with the text 3.14159 before the compiler sees anything. These are called object-like macros. They are not variables; they have no type and no memory. The preprocessor just does a textual find-and-replace. This is useful for named constants so you can change a value in one place and have it update everywhere.

Macros can also take parameters, making them function-like macros. For example, #define SQUARE(x) ((x)*(x)) looks like a function call but is pure text substitution. The extra parentheses around x and around the whole expression are critically important: without them, SQUARE(2+3) would expand to 2+3*2+3 = 11 instead of the expected 25. This is one of the trickiest and most classic macro pitfalls in C.

Conditional compilation lets you include or exclude blocks of code based on whether a macro is defined or has a certain value. The #ifdef, #ifndef, #if, #else, and #endif directives control this. A common use is "include guards" in header files: #ifndef MY_HEADER_H / #define MY_HEADER_H / ... contents ... / #endif. This prevents the header from being processed more than once if included by multiple files, which would cause duplicate definition errors.`,
      codeExample: `#include <stdio.h>

/* Object-like macro: simple text replacement */
#define MAX_SIZE 10
#define PI 3.14159

/* Function-like macro with extra parentheses for safety */
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))

/* Conditional compilation example */
#define DEBUG 1

int main(void) {
    int arr[MAX_SIZE];
    double radius = 5.0;
    double area;
    int result;

    printf("Array capacity: %d elements\n", MAX_SIZE);

    area = PI * SQUARE(radius);
    printf("Area of circle with radius 5: %.2f\n", area);

    /* SQUARE works correctly even with an expression */
    result = SQUARE(2 + 3);
    printf("SQUARE(2+3) = %d\n", result);

    printf("MAX(7, 4) = %d\n", MAX(7, 4));

#ifdef DEBUG
    printf("Debug mode is ON\n");
#endif

#ifndef PRODUCTION
    printf("Not in production build\n");
#endif

    return 0;
}`,
      expectedOutput: `Array capacity: 10 elements
Area of circle with radius 5: 78.54
SQUARE(2+3) = 25
MAX(7, 4) = 7
Debug mode is ON
Not in production build`,
      keyTakeaways: [
        "The preprocessor runs before compilation and transforms source text via directives starting with #.",
        "#include pastes the contents of another file directly into your source.",
        "#define creates macros, which are simple text substitutions with no type.",
        "Function-like macros require extra parentheses around parameters and the whole expression.",
        "Conditional compilation (#ifdef/#endif) controls which code is compiled based on defined macros."
      ],
      commonMistakes: [
        "Forgetting parentheses in function-like macros, causing operator-precedence bugs when expressions are passed.",
        "Adding a semicolon at the end of a #define line, which gets pasted into the code and may cause errors.",
        "Using #define for values that should be typed constants — prefer const or enum in modern C.",
        "Forgetting #endif to close an #ifdef block, causing compile errors that are hard to trace.",
        "Using a macro name that collides with a standard library identifier."
      ],
      bestPractices: [
        "Write macro names in ALL_CAPS to signal that they are macros, not functions or variables.",
        "Always wrap function-like macro parameters and the entire body in parentheses.",
        "Prefer const variables or enums over #define for typed constants in C.",
        "Use include guards in every header file to prevent double inclusion.",
        "Keep macros short and side-effect-free; avoid expressions like SQUARE(i++) that evaluate i twice."
      ],
      exercises: [
        {
          title: "Exercise 1 – Constants with #define",
          description: "Define macros for the conversion factors: INCHES_PER_FOOT (12), FEET_PER_YARD (3), and YARDS_PER_MILE (1760). Write a program that prints how many inches are in a mile using only these macros in the calculation.",
          hint: "Multiply the three macros together: INCHES_PER_FOOT * FEET_PER_YARD * YARDS_PER_MILE."
        },
        {
          title: "Exercise 2 – Function-like Macro",
          description: "Write a macro CUBE(x) that computes x cubed. Test it with the values 3 and (2+1). Verify that both give the correct result of 27 by printing them.",
          hint: "Remember to wrap x in parentheses inside the macro body: ((x)*(x)*(x))."
        },
        {
          title: "Exercise 3 – Conditional Debug Output",
          description: "Write a program with a DEBUG macro. When DEBUG is defined, the program should print the value of an intermediate calculation. When it is not defined, only the final result should print. Test both modes by commenting and uncommenting the #define DEBUG line.",
          hint: "Use #ifdef DEBUG ... #endif around any extra debug printf statements."
        }
      ],
      challenge: {
        title: "Challenge – Safe Math Macros",
        description: "Create macros ABS(x), MIN(a,b), MAX(a,b), and CLAMP(x, lo, hi) (which clamps x between lo and hi inclusive). Demonstrate each with at least two different test values and show that they work correctly even when expressions rather than simple variables are passed as arguments. Also write an include guard around your macro definitions as if they were in a header file, then explain in comments why each set of parentheses is necessary.",
        hint: "CLAMP can be defined using MIN and MAX together. Make sure every argument occurrence in every macro body is individually parenthesized."
      },
      quiz: [
        {
          question: "When does the preprocessor run relative to compilation?",
          options: [
            "After compilation, to optimize code.",
            "Before compilation, transforming the source text.",
            "During linking, to resolve symbols.",
            "At runtime, to adjust behavior."
          ],
          correctIndex: 1,
          explanation: "The preprocessor is the first stage of the C build process, transforming source text before the compiler ever sees it."
        },
        {
          question: "What does #include <stdio.h> do?",
          options: [
            "Links the stdio library at runtime.",
            "Declares stdio as an optional module.",
            "Copies the full contents of stdio.h into the source file.",
            "Compiles stdio.h into an object file."
          ],
          correctIndex: 2,
          explanation: "#include is a textual operation: the preprocessor literally pastes the contents of the named file at that point in your source."
        },
        {
          question: "What is the difference between #include <file.h> and #include 'file.h'?",
          options: [
            "Angle brackets are for C++, quotes are for C.",
            "Angle brackets search system include paths; quotes search the current directory first.",
            "They are identical in behavior.",
            "Quotes compile faster than angle brackets."
          ],
          correctIndex: 1,
          explanation: "Angle brackets tell the preprocessor to search the system/compiler include directories. Double quotes start the search in the current source directory."
        },
        {
          question: "What does #define PI 3.14159 do?",
          options: [
            "Creates a float variable named PI.",
            "Creates a constant double named PI.",
            "Instructs the preprocessor to replace every occurrence of PI with 3.14159 in the source.",
            "Defines a function named PI."
          ],
          correctIndex: 2,
          explanation: "#define creates a macro via simple text substitution. PI has no type; the preprocessor just swaps the text before compilation."
        },
        {
          question: "What is wrong with: #define DOUBLE(x) x + x?",
          options: [
            "Macros cannot take parameters.",
            "It will fail if x is a float.",
            "DOUBLE(3) * 2 expands to 3 + 3 * 2 = 9 instead of 12 due to missing parentheses.",
            "Nothing is wrong."
          ],
          correctIndex: 2,
          explanation: "Without wrapping the expansion in parentheses, operator precedence can change the result when the macro is used inside a larger expression."
        },
        {
          question: "What is the correct way to write a safe SQUARE macro?",
          options: [
            "#define SQUARE(x) x * x",
            "#define SQUARE(x) (x * x)",
            "#define SQUARE(x) ((x) * (x))",
            "#define SQUARE x * x"
          ],
          correctIndex: 2,
          explanation: "Each occurrence of the parameter must be parenthesized individually, and the entire expression should also be parenthesized to handle all operator-precedence cases."
        },
        {
          question: "What does #ifdef DEBUG ... #endif do?",
          options: [
            "Always compiles the enclosed code.",
            "Compiles the enclosed code only if DEBUG is defined.",
            "Removes the enclosed code from the executable.",
            "Prints 'DEBUG' to the terminal."
          ],
          correctIndex: 1,
          explanation: "#ifdef checks whether a macro name has been defined; if it has, everything up to #endif is included in compilation."
        },
        {
          question: "What is an include guard used for?",
          options: [
            "To guard against runtime errors in included files.",
            "To prevent a header file from being included more than once.",
            "To speed up compilation by caching headers.",
            "To encrypt header file contents."
          ],
          correctIndex: 1,
          explanation: "Include guards use #ifndef / #define / #endif to ensure a header's contents are only processed once, preventing duplicate definition errors."
        },
        {
          question: "Which of the following is a valid preprocessor directive?",
          options: ["@include stdio", "import stdio", "#include <stdio.h>", "include(stdio.h)"],
          correctIndex: 2,
          explanation: "Preprocessor directives start with # on their own line. The other forms are not valid C preprocessor syntax."
        },
        {
          question: "What happens if you write #define MAX_SIZE 10; (with a semicolon)?",
          options: [
            "The semicolon is ignored by the preprocessor.",
            "The semicolon becomes part of the replacement text and may cause syntax errors.",
            "It causes a compile-time error immediately.",
            "It terminates the macro correctly."
          ],
          correctIndex: 1,
          explanation: "The preprocessor replaces MAX_SIZE with '10;' including the semicolon, which can create double semicolons or other syntax errors in the code."
        },
        {
          question: "What does #undef PI do?",
          options: [
            "Sets PI to 0.",
            "Removes the definition of PI so it is no longer defined.",
            "Redefines PI as undefined.",
            "Causes a runtime error if PI is used afterward."
          ],
          correctIndex: 1,
          explanation: "#undef removes a previously defined macro name, so subsequent code no longer has access to that definition."
        },
        {
          question: "What is a function-like macro?",
          options: [
            "A macro that calls a C function.",
            "A macro that takes parameters and uses them in text substitution.",
            "A macro defined inside a function body.",
            "A macro that returns a value."
          ],
          correctIndex: 1,
          explanation: "Function-like macros take arguments in parentheses and substitute them textually in the expansion, like #define DOUBLE(x) ((x) + (x))."
        },
        {
          question: "Why is SQUARE(i++) dangerous when defined as ((i)*(i))?",
          options: [
            "It causes a compile error.",
            "i++ is evaluated twice, incrementing i twice instead of once.",
            "The increment is ignored.",
            "It only works with positive numbers."
          ],
          correctIndex: 1,
          explanation: "Macro expansion is text substitution, so SQUARE(i++) becomes ((i++) * (i++)), which evaluates i++ twice — incrementing i twice and producing undefined behavior."
        },
        {
          question: "How can you define a macro from the compiler command line with gcc?",
          options: [
            "gcc -D DEBUG main.c",
            "gcc -define DEBUG main.c",
            "gcc DEBUG main.c",
            "gcc -macro DEBUG main.c"
          ],
          correctIndex: 0,
          explanation: "The -D flag passes a macro definition to the preprocessor from the command line, equivalent to writing #define DEBUG in the source."
        },
        {
          question: "What does #ifndef mean?",
          options: [
            "If the macro IS defined, include this block.",
            "If the macro is NOT defined, include this block.",
            "Define a macro if it is not already defined.",
            "Never compile the block."
          ],
          correctIndex: 1,
          explanation: "#ifndef (if not defined) includes the following code only when the specified macro has not yet been defined, which is the key mechanism for include guards."
        },
        {
          question: "Which is preferred in modern C for named constants instead of #define?",
          options: [
            "static int",
            "extern int",
            "const int or enum",
            "volatile int"
          ],
          correctIndex: 2,
          explanation: "const variables and enums have types, scopes, and debugger visibility. #define macros have none of these advantages, making const/enum safer and clearer."
        },
        {
          question: "What is the output of: #define MSG 'hello' printf(MSG);?",
          options: [
            "hello",
            "MSG",
            "A compile error because MSG expands to 'hello' which is not a string literal with double quotes.",
            "Nothing"
          ],
          correctIndex: 2,
          explanation: "Single-quoted 'hello' is not a valid string literal in C (only single characters use single quotes). A string needs double quotes: \"hello\"."
        },
        {
          question: "What does the preprocessor NOT do?",
          options: [
            "Replace macro names with their expansions.",
            "Include file contents.",
            "Check syntax and type correctness.",
            "Strip out comments."
          ],
          correctIndex: 2,
          explanation: "The preprocessor only performs textual transformations. Syntax checking and type analysis are done by the compiler in a later stage."
        },
        {
          question: "Which directive is used to display a custom error message at compile time?",
          options: ["#warning", "#error", "#message", "#abort"],
          correctIndex: 1,
          explanation: "#error causes the preprocessor to emit the specified message and halt compilation immediately, useful for enforcing constraints."
        },
        {
          question: "What is the purpose of the predefined macro __FILE__?",
          options: [
            "It stores the current function name.",
            "It stores the name of the current source file as a string.",
            "It stores the file size.",
            "It is the path to the output executable."
          ],
          correctIndex: 1,
          explanation: "__FILE__ is a predefined macro that expands to a string literal containing the name of the source file being compiled, useful for debug logging."
        }
      ]
    },
    {
      id: "topic-2-3",
      title: "Format Specifiers in Depth",
      estimatedReadingTime: 8,
      explanation: `Every time you use printf or scanf in C, you provide a format string that controls exactly how data is displayed or read. Inside that format string, format specifiers begin with a percent sign and describe the type and appearance of each argument. Getting specifiers exactly right is crucial: using the wrong one for a given type causes undefined behavior, which can crash your program or print garbage.

The basic specifiers you already know include %d for signed int, %f for float/double in printf, %c for a single character, and %s for a string. But each specifier supports optional modifiers between the % and the letter that control width, precision, and padding. For example, %10d prints an integer right-aligned in a field of 10 characters. %-10d left-aligns it. %05d pads with leading zeros. These width fields are invaluable when formatting tables of numbers.

Precision works differently for different types. For floating-point numbers, %.2f means "show exactly 2 digits after the decimal point." For strings, %.5s means "print at most 5 characters." Understanding precision lets you control how much of a value is displayed, which is especially useful for currency or scientific output that demands a fixed number of decimal places.

For scanf, format specifiers tell the function what type of data to read. Here %d reads a decimal integer, %f reads a float, and %lf reads a double (note: this is different from printf, where %f handles both float and double). The address-of operator (&) is required before variable names in scanf so it knows where in memory to store the value it reads. A missing & is one of the most common beginner errors.

There are additional specifiers worth knowing: %x and %X print integers in hexadecimal (lowercase and uppercase), %o prints in octal, %e and %E print in scientific notation, %u is for unsigned int, and %ld is for long int. Matching the specifier to the exact type is not optional — type mismatch is undefined behavior in C, and you will see strange results even if the program does not crash.`,
      codeExample: `#include <stdio.h>

int main(void) {
    int count = 42;
    float price = 3.14159f;
    double precise = 2.718281828;
    char grade = 'B';
    char name[] = "Alice";
    unsigned int mask = 255;

    /* Basic specifiers */
    printf("Integer: %d\n", count);
    printf("Char: %c\n", grade);
    printf("String: %s\n", name);

    /* Width and alignment */
    printf("Right-aligned in 8 chars: [%8d]\n", count);
    printf("Left-aligned  in 8 chars: [%-8d]\n", count);
    printf("Zero-padded   in 8 chars: [%08d]\n", count);

    /* Float precision */
    printf("Float default: %f\n", price);
    printf("Float 2dp:     %.2f\n", price);
    printf("Double 9dp:    %.9f\n", precise);

    /* Scientific notation */
    printf("Scientific: %e\n", price);

    /* Hexadecimal and octal */
    printf("Hex lowercase: %x\n", mask);
    printf("Hex uppercase: %X\n", mask);
    printf("Octal:         %o\n", mask);

    /* Unsigned */
    printf("Unsigned: %u\n", mask);

    /* String precision (max characters) */
    printf("First 3 chars of name: %.3s\n", name);

    return 0;
}`,
      expectedOutput: `Integer: 42
Char: B
String: Alice
Right-aligned in 8 chars: [      42]
Left-aligned  in 8 chars: [42      ]
Zero-padded   in 8 chars: [00000042]
Float default: 3.141590
Float 2dp:     3.14
Double 9dp:    2.718281828
Scientific: 3.141590e+00
Hex lowercase: ff
Hex uppercase: FF
Octal:         377
Unsigned: 255
First 3 chars of name: Ali`,
      keyTakeaways: [
        "Format specifiers must match the exact type of the argument; mismatches cause undefined behavior.",
        "Width specifiers control the minimum field width; a minus sign left-aligns the value.",
        "Precision (.N) controls decimal places for floats or maximum characters for strings.",
        "scanf uses %lf for double, while printf's %f handles both float and double.",
        "Hex (%x/%X), octal (%o), and scientific (%e) specifiers provide alternate numeric representations."
      ],
      commonMistakes: [
        "Using %f in scanf to read a double — you must use %lf for double with scanf.",
        "Forgetting the & before variable names in scanf, causing a crash or undefined behavior.",
        "Using %d to print a long or long long, which may print incorrect values on 64-bit platforms.",
        "Confusing width and precision: %8.2f means a minimum width of 8 with 2 decimal places.",
        "Using %s to print a single char or %c for a whole string."
      ],
      bestPractices: [
        "Always match specifiers to exact types; use %ld for long, %lld for long long, %lf for double in scanf.",
        "Enable compiler warnings to catch format specifier mismatches at compile time.",
        "Use precision to control floating-point output consistently, especially in currency or scientific contexts.",
        "Prefer snprintf over sprintf when building strings to avoid buffer overflows.",
        "Test your format strings with boundary values (very large, very small, negative) to catch surprises."
      ],
      exercises: [
        {
          title: "Exercise 1 – Formatted Table",
          description: "Print a table of three columns: item name (left-aligned in 15 chars), quantity (right-aligned in 6 chars), and price (right-aligned in 10 chars with 2 decimal places). Use at least three rows of made-up data.",
          hint: "Use %-15s for the name, %6d for quantity, and %10.2f for price in a single printf per row."
        },
        {
          title: "Exercise 2 – Number Bases",
          description: "Declare an integer with the value 200. Print it in decimal, hexadecimal (lowercase), hexadecimal (uppercase), and octal, each on its own labeled line.",
          hint: "Use %d, %x, %X, and %o format specifiers respectively."
        },
        {
          title: "Exercise 3 – User Input with scanf",
          description: "Write a program that asks the user for their name (a single word), age (int), and height in meters (double). Read all three with scanf using the appropriate specifiers and then print a summary sentence using the values.",
          hint: "Use %s, %d, and %lf with scanf. Remember & before int and double variables, but not before a char array."
        }
      ],
      challenge: {
        title: "Challenge – Invoice Formatter",
        description: "Build a small invoice printer. Define at least five items as arrays of names (strings), quantities (ints), and unit prices (doubles). Print them in a neatly aligned table with a header row, then print the subtotal, a 10% tax, and the grand total, each formatted to two decimal places. Use width and precision specifiers throughout so the columns are perfectly aligned regardless of the length of the item names.",
        hint: "Pre-compute the column widths and use consistent format specifiers in every row. Use a loop to sum the line totals."
      },
      quiz: [
        {
          question: "Which format specifier is used to print a signed decimal integer?",
          options: ["%u", "%f", "%d", "%s"],
          correctIndex: 2,
          explanation: "%d is the specifier for signed decimal integers in both printf and scanf."
        },
        {
          question: "What does the format specifier %.2f do?",
          options: [
            "Prints a float with a minimum width of 2.",
            "Prints a float with exactly 2 digits after the decimal point.",
            "Prints a float with 2 significant digits total.",
            "Prints only the first 2 characters of the float."
          ],
          correctIndex: 1,
          explanation: "For floating-point types, the precision field .N specifies the number of digits to print after the decimal point."
        },
        {
          question: "Which specifier must you use in scanf to read a double?",
          options: ["%f", "%d", "%lf", "%g"],
          correctIndex: 2,
          explanation: "In scanf, %f reads a float and %lf reads a double. Using %f for a double in scanf reads the wrong number of bytes."
        },
        {
          question: "What does [%10d] print for the value 42?",
          options: ["[42        ]", "[        42]", "[0000000042]", "[42]"],
          correctIndex: 1,
          explanation: "A width of 10 right-aligns 42 in a field of 10 characters, adding 8 spaces before the number."
        },
        {
          question: "What does [%-10d] print for the value 42?",
          options: ["[        42]", "[42        ]", "[0000000042]", "[-42       ]"],
          correctIndex: 1,
          explanation: "The minus sign flag left-aligns the value in the field, padding with spaces on the right."
        },
        {
          question: "What does %x print for the integer value 255?",
          options: ["255", "ff", "FF", "377"],
          correctIndex: 1,
          explanation: "%x prints the integer in lowercase hexadecimal. 255 in hex is ff."
        },
        {
          question: "What does %o print for the integer value 8?",
          options: ["8", "10", "0x8", "08"],
          correctIndex: 1,
          explanation: "%o prints in octal (base 8). The value 8 in octal is 10."
        },
        {
          question: "What happens if you use %d to print a value of type long long?",
          options: [
            "It always works correctly.",
            "It produces a compile error.",
            "It may print an incorrect value because %d is only for int.",
            "It rounds the value to int range."
          ],
          correctIndex: 2,
          explanation: "You must use %lld for long long. Using %d reads only enough bytes for an int, leaving the rest of the long long unread and producing a wrong value."
        },
        {
          question: "What is the purpose of the & in scanf(\"%d\", &x)?",
          options: [
            "It is the bitwise AND operator applied to x.",
            "It passes the address of x so scanf knows where to store the read value.",
            "It dereferences the variable x.",
            "It is optional syntactic sugar."
          ],
          correctIndex: 1,
          explanation: "scanf needs a pointer to the variable to store the input. The & address-of operator provides that pointer."
        },
        {
          question: "What does %08d print for the value 42?",
          options: ["00000042", "42000000", "       42", "42      "],
          correctIndex: 0,
          explanation: "The 0 flag enables zero-padding, and 8 is the minimum width, so the number is padded with leading zeros to fill 8 characters."
        },
        {
          question: "Which specifier prints a single character?",
          options: ["%s", "%d", "%c", "%g"],
          correctIndex: 2,
          explanation: "%c reads or writes a single character."
        },
        {
          question: "What does %.3s do when printing the string 'Hello'?",
          options: ["Prints 'Hello' padded to 3 chars.", "Prints 'Hel'.", "Prints 'llo'.", "Causes an error."],
          correctIndex: 1,
          explanation: "For strings, precision limits the maximum number of characters printed. %.3s prints at most 3 characters: 'Hel'."
        },
        {
          question: "Which specifier would you use to print in scientific (exponential) notation?",
          options: ["%f", "%d", "%s", "%e"],
          correctIndex: 3,
          explanation: "%e prints a floating-point number in scientific notation like 3.14e+00."
        },
        {
          question: "What does %u do differently from %d?",
          options: [
            "%u is for Unicode characters.",
            "%u treats the value as unsigned, so negative ints print as large positive numbers.",
            "%u always adds a + sign.",
            "%u is for doubles."
          ],
          correctIndex: 1,
          explanation: "%u interprets the argument as an unsigned integer, so the bit pattern of -1 prints as a very large positive number like 4294967295."
        },
        {
          question: "Why is using a wrong format specifier classified as undefined behavior?",
          options: [
            "The compiler will fix it automatically.",
            "It only affects output formatting, not correctness.",
            "The function reads the wrong number of bytes from the argument, giving garbage or crashing.",
            "It is not undefined behavior; it just rounds the value."
          ],
          correctIndex: 2,
          explanation: "printf and scanf rely on the specifier to know how many bytes to read from the argument. A wrong specifier causes incorrect memory access, which is undefined behavior."
        },
        {
          question: "What does %+d do when printing 42 and -42?",
          options: [
            "Prints '42' and '-42' (no change).",
            "Prints '+42' and '-42' (always shows sign).",
            "Prints '+42' and '42' (positive only).",
            "Prints '42' and '+42'."
          ],
          correctIndex: 1,
          explanation: "The + flag forces a sign character to be displayed for both positive and negative numbers."
        },
        {
          question: "Which format specifier is used for printing a string?",
          options: ["%c", "%s", "%d", "%p"],
          correctIndex: 1,
          explanation: "%s prints a null-terminated character string (char array or string literal)."
        },
        {
          question: "If you call printf('%d %d', 1); (one value, two specifiers), what happens?",
          options: [
            "It prints '1 1'.",
            "Undefined behavior: printf reads a second argument that was never provided.",
            "A compile error occurs.",
            "It prints '1 0'."
          ],
          correctIndex: 1,
          explanation: "printf will attempt to read a second int argument from the stack even though none was passed, producing undefined behavior and possibly garbage output."
        },
        {
          question: "What does the format string '%5.2f' mean?",
          options: [
            "At least 5 digits, at least 2 after the decimal.",
            "A minimum total width of 5 characters, with exactly 2 decimal places.",
            "Exactly 5 decimal places and 2 characters of padding.",
            "Print 5 characters of the float and ignore the rest."
          ],
          correctIndex: 1,
          explanation: "5 is the minimum total field width and .2 is the precision (2 decimal digits). So 3.14 would print as ' 3.14' (one leading space to reach width 5)."
        },
        {
          question: "Which specifier prints the address (memory location) of a pointer?",
          options: ["%d", "%s", "%p", "%a"],
          correctIndex: 2,
          explanation: "%p prints the value of a pointer as a memory address, usually in hexadecimal, for debugging purposes."
        }
      ]
    },
    {
      id: "topic-2-4",
      title: "Arithmetic and Precision",
      estimatedReadingTime: 8,
      explanation: `C gives you arithmetic operators that look simple on the surface but have important nuances, especially once you move beyond whole-number math. Knowing how integer arithmetic, floating-point arithmetic, and operator precedence interact will save you from some of the most frustrating bugs in your early programming experience.

Integer arithmetic in C is exact within the type's range but has two key properties you must internalize. First, integer division truncates: 7 / 2 = 3, not 3.5. Second, the modulo operator (%) gives you the remainder: 7 % 2 = 1. These two operators together are extremely useful for tasks like checking whether a number is even (n % 2 == 0), extracting digits, or cycling through values. The modulo result's sign follows the sign of the dividend in C (so -7 % 2 = -1).

Floating-point arithmetic is approximate. Computers represent float and double in binary using a format called IEEE 754, and most decimal fractions cannot be represented exactly in binary. The classic example is that 0.1 + 0.2 does not equal exactly 0.3 in floating-point arithmetic. This is not a bug in C — it is an inherent property of finite binary representation. This means you should never compare floats for exact equality with ==; instead, check whether they are close enough: |a - b| < 0.0001.

Operator precedence determines the order in which operations are carried out when an expression has multiple operators. C follows the standard mathematical rules: multiplication and division before addition and subtraction, and parentheses override everything. The full precedence table in C has over a dozen levels. The safest habit is to use parentheses explicitly whenever you are not 100% certain of the order, making your intent clear both to the compiler and to the next person reading your code.

Integer overflow is another critical concept. If you add 1 to the maximum value an int can hold (INT_MAX, typically 2147483647), the result wraps around to a large negative number. This is undefined behavior for signed integers in C — do not rely on it. For unsigned integers, overflow wraps predictably (back to zero), and that is defined behavior. Always check whether your arithmetic could produce values outside a type's range and consider using larger types like long long when needed.`,
      codeExample: `#include <stdio.h>
#include <math.h>    /* for fabs() */
#include <limits.h>  /* for INT_MAX */

int main(void) {
    /* Integer division and modulo */
    printf("7 / 2   = %d\n", 7 / 2);
    printf("7 %% 2   = %d\n", 7 % 2);
    printf("-7 %% 2  = %d\n", -7 % 2);

    /* Check even/odd */
    int n = 14;
    if (n % 2 == 0) {
        printf("%d is even\n", n);
    }

    /* Floating-point imprecision */
    double a = 0.1 + 0.2;
    printf("0.1 + 0.2 = %.17f\n", a);  /* shows imprecision */
    printf("0.1 + 0.2 == 0.3? %s\n", (a == 0.3) ? "yes" : "no");

    /* Correct float comparison using tolerance */
    double epsilon = 1e-9;
    if (fabs(a - 0.3) < epsilon) {
        printf("Close enough to 0.3\n");
    }

    /* Operator precedence */
    int result1 = 2 + 3 * 4;      /* 3*4 first: 14 */
    int result2 = (2 + 3) * 4;    /* parentheses first: 20 */
    printf("2 + 3 * 4   = %d\n", result1);
    printf("(2 + 3) * 4 = %d\n", result2);

    /* INT_MAX and overflow */
    printf("INT_MAX = %d\n", INT_MAX);
    /* Wrapping with unsigned */
    unsigned int u = 0;
    u = u - 1;
    printf("0u - 1 = %u\n", u);  /* wraps to UINT_MAX */

    return 0;
}`,
      expectedOutput: `7 / 2   = 3
7 % 2   = 1
-7 % 2  = -1
14 is even
0.1 + 0.2 = 0.30000000000000004
0.1 + 0.2 == 0.3? no
Close enough to 0.3
2 + 3 * 4   = 14
(2 + 3) * 4 = 20
INT_MAX = 2147483647
0u - 1 = 4294967295`,
      keyTakeaways: [
        "Integer division truncates toward zero; use % for the remainder.",
        "Floating-point numbers are approximations; never compare them for exact equality.",
        "Use a small epsilon value (tolerance) when comparing floats for near-equality.",
        "Operator precedence follows math conventions; use parentheses to make intent clear.",
        "Signed integer overflow is undefined behavior; unsigned overflow wraps predictably."
      ],
      commonMistakes: [
        "Comparing floats with == and being surprised when equal-looking values are not equal.",
        "Forgetting that integer division truncates, expecting 7/2 to give 3.5.",
        "Assuming modulo always gives a positive result — it can be negative if the dividend is negative.",
        "Not accounting for integer overflow in calculations with large numbers.",
        "Mixing signed and unsigned in comparisons, which can cause unexpected results due to implicit conversion."
      ],
      bestPractices: [
        "Use double instead of float for most floating-point work; it offers more precision.",
        "Compare floating-point values using fabs(a - b) < epsilon rather than ==.",
        "Use parentheses generously to make operator precedence explicit and code readable.",
        "Check for potential overflow before doing arithmetic on values near type limits.",
        "Use the limits.h constants (INT_MAX, UINT_MAX, etc.) to document and check boundary conditions."
      ],
      exercises: [
        {
          title: "Exercise 1 – Modulo Patterns",
          description: "Write a program that prints all integers from 1 to 30 on one line, but replaces multiples of 3 with 'Fizz', multiples of 5 with 'Buzz', and multiples of both with 'FizzBuzz'. Use the % operator.",
          hint: "Check multiples of 15 first (FizzBuzz), then 3, then 5, then the number itself."
        },
        {
          title: "Exercise 2 – Float Precision Demo",
          description: "Declare 0.1 as a double and add it to itself 10 times in a loop. Print the running total after each addition. Also directly compute 0.1 * 10 and compare the two results to see if they match exactly.",
          hint: "Use %.17f to see enough decimal places to spot the floating-point imprecision."
        },
        {
          title: "Exercise 3 – Precedence Puzzle",
          description: "Without running the code, predict the value of: 10 - 2 * 3 + 8 / 4. Then write a program to verify your answer. Also try adding different parentheses to change the result.",
          hint: "Remember that * and / have higher precedence than + and -, and they are evaluated left to right at the same level."
        }
      ],
      challenge: {
        title: "Challenge – Simple Calculator with Precision",
        description: "Build a calculator that reads two doubles and an operator (+, -, *, /, %) from the user. Perform the operation and print the result with 6 decimal places. Handle division by zero with an error message. For the modulo, explain why % does not work directly on doubles and use fmod() from math.h instead. Also print whether the two input numbers are equal using a tolerance of 1e-9.",
        hint: "Use scanf to read the operator as a char. Use a switch statement or if-else chain. Link with -lm when compiling for fmod and fabs."
      },
      quiz: [
        {
          question: "What does 7 / 2 evaluate to in C when both operands are int?",
          options: ["3.5", "3", "4", "3.0"],
          correctIndex: 1,
          explanation: "Integer division truncates toward zero, so 7 / 2 = 3 with the fractional part discarded."
        },
        {
          question: "What does 7 % 3 evaluate to?",
          options: ["2", "1", "0", "3"],
          correctIndex: 1,
          explanation: "7 divided by 3 is 2 remainder 1, so 7 % 3 = 1."
        },
        {
          question: "What does -7 % 2 evaluate to in C?",
          options: ["1", "-1", "0", "Undefined"],
          correctIndex: 1,
          explanation: "In C, the sign of the modulo result follows the sign of the dividend, so -7 % 2 = -1."
        },
        {
          question: "Why should you not compare two double values with == for equality?",
          options: [
            "== is not defined for doubles in C.",
            "Doubles may differ by tiny rounding errors even when mathematically equal.",
            "== always returns false for doubles.",
            "Doubles must be compared with the compare() function."
          ],
          correctIndex: 1,
          explanation: "IEEE 754 floating-point representation causes small rounding errors, so two mathematically equal values may have slightly different bit patterns."
        },
        {
          question: "What is the correct way to test if double a equals double b?",
          options: [
            "a == b",
            "a - b == 0",
            "fabs(a - b) < some_small_epsilon",
            "a ~= b"
          ],
          correctIndex: 2,
          explanation: "Checking if the absolute difference is smaller than a tolerance (epsilon) is the standard way to compare floating-point values for near-equality."
        },
        {
          question: "What is the value of 2 + 3 * 4?",
          options: ["20", "14", "24", "9"],
          correctIndex: 1,
          explanation: "Multiplication has higher precedence than addition, so 3 * 4 = 12 is done first, then 2 + 12 = 14."
        },
        {
          question: "What is the value of (2 + 3) * 4?",
          options: ["14", "20", "24", "12"],
          correctIndex: 1,
          explanation: "Parentheses have the highest precedence, so 2 + 3 = 5 first, then 5 * 4 = 20."
        },
        {
          question: "What is 0.1 + 0.2 == 0.3 in C?",
          options: ["True (1)", "False (0)", "It depends on the system.", "A compile error."],
          correctIndex: 1,
          explanation: "Due to binary floating-point representation, 0.1 + 0.2 is not exactly 0.3; the comparison evaluates to false (0)."
        },
        {
          question: "What is signed integer overflow in C?",
          options: [
            "Adding two floats together.",
            "A result that exceeds the maximum (or minimum) value a signed type can hold, which is undefined behavior.",
            "Dividing by zero.",
            "Assigning a double to an int."
          ],
          correctIndex: 1,
          explanation: "When a signed integer operation produces a result outside its representable range, C specifies this as undefined behavior — the compiler is free to do anything."
        },
        {
          question: "What happens when you subtract 1 from an unsigned int value of 0?",
          options: [
            "You get -1.",
            "Undefined behavior.",
            "You get UINT_MAX (the largest unsigned int value).",
            "You get INT_MIN."
          ],
          correctIndex: 2,
          explanation: "Unsigned integer arithmetic wraps around modulo 2^N, so 0 - 1 wraps to the maximum unsigned int value (e.g., 4294967295 for 32-bit)."
        },
        {
          question: "Which operator gives the remainder of integer division?",
          options: ["//", "%%", "%", "mod"],
          correctIndex: 2,
          explanation: "The % operator computes the remainder after integer division, e.g., 10 % 3 = 1."
        },
        {
          question: "How do you check if an integer n is even?",
          options: ["n / 2 == 0", "n % 2 == 0", "n & 1 == 1", "n % 2 == 1"],
          correctIndex: 1,
          explanation: "A number is even if it has no remainder when divided by 2, so n % 2 == 0 is the standard even-number check."
        },
        {
          question: "Which header provides INT_MAX?",
          options: ["stdio.h", "math.h", "limits.h", "stdlib.h"],
          correctIndex: 2,
          explanation: "limits.h defines the minimum and maximum values for integer types, including INT_MAX, INT_MIN, UINT_MAX, etc."
        },
        {
          question: "What does using double instead of float give you?",
          options: [
            "Twice the speed.",
            "More precision (more significant digits and wider range).",
            "Exactly the same precision.",
            "The ability to store negative numbers."
          ],
          correctIndex: 1,
          explanation: "double is 64-bit (about 15-16 significant decimal digits) while float is 32-bit (about 6-7 digits), so double gives substantially more precision."
        },
        {
          question: "What is the result of 10 - 2 * 3 + 8 / 4?",
          options: ["4", "6", "8", "10"],
          correctIndex: 1,
          explanation: "Evaluate * and / first: 2*3=6, 8/4=2. Then left to right: 10-6=4, 4+2=6."
        },
        {
          question: "Why is it a good practice to use parentheses liberally in arithmetic expressions?",
          options: [
            "Parentheses speed up execution.",
            "They make precedence explicit, reducing bugs and improving readability.",
            "They are required by the C standard.",
            "They prevent floating-point errors."
          ],
          correctIndex: 1,
          explanation: "Explicit parentheses communicate intent clearly and prevent misunderstandings about operator precedence, both for the compiler and for human readers."
        },
        {
          question: "What function from math.h computes the floating-point remainder?",
          options: ["remainder()", "mod()", "fmod()", "floatmod()"],
          correctIndex: 2,
          explanation: "fmod(a, b) from math.h computes the floating-point remainder of a divided by b, analogous to % for integers."
        },
        {
          question: "What is the result of 1.0 / 3.0 * 3.0 == 1.0 in C?",
          options: ["Always true", "Always false", "Not guaranteed to be true due to floating-point rounding", "A compile error"],
          correctIndex: 2,
          explanation: "Floating-point division of 1.0 by 3.0 produces a repeating binary fraction, and multiplying back by 3.0 may not exactly recover 1.0."
        },
        {
          question: "When two operators have equal precedence, how does C evaluate them by default?",
          options: [
            "Right to left always.",
            "Left to right (left-associative) for most arithmetic operators.",
            "In the order they appear in the source.",
            "Randomly."
          ],
          correctIndex: 1,
          explanation: "Most binary arithmetic operators in C are left-associative, meaning a - b - c is evaluated as (a - b) - c."
        },
        {
          question: "Which is the safest type to use for financial calculations in C?",
          options: ["float", "double", "int (working in cents)", "long float"],
          correctIndex: 2,
          explanation: "Working in integer cents avoids floating-point rounding entirely. For true decimal arithmetic, integer types scaled to the required precision are more reliable than float or double."
        }
      ]
    },
    {
      id: "topic-2-5",
      title: "Bitwise Operators",
      estimatedReadingTime: 10,
      explanation: `Bitwise operators work directly on the individual binary digits (bits) of integer values. They are a core feature of C that makes the language especially powerful for systems programming, hardware interfacing, and writing high-performance code. If you have never thought about numbers in binary before, now is the time to learn, because understanding bits unlocks a whole category of efficient, compact operations.

Every integer in your computer is stored as a sequence of bits (0s and 1s). For example, the number 12 in an 8-bit representation is 00001100 in binary. Bitwise AND (&) takes two values and produces a result where each bit is 1 only if both input bits are 1. Bitwise OR (|) produces a 1 if either input bit is 1. Bitwise XOR (^) produces 1 if the bits differ (one is 0 and the other is 1). Bitwise NOT (~) flips all bits: every 0 becomes 1 and every 1 becomes 0.

The shift operators move bits left or right. Left shift (<<) moves all bits toward the more significant end, filling the vacated positions with zeros. Shifting an integer left by 1 is equivalent to multiplying by 2. Right shift (>>) moves bits toward the less significant end. For unsigned integers, right shift fills with zeros (logical shift). For signed integers, the behavior is implementation-defined, though most compilers do an arithmetic right shift (filling with the sign bit). These shifts are often used to multiply or divide by powers of two very efficiently.

A classic application of bitwise operators is working with "flags." A single integer can store many independent on/off switches, each represented by one bit. You "set" a flag using OR: flags |= MY_FLAG. You "clear" it using AND with NOT: flags &= ~MY_FLAG. You "test" it using AND: if (flags & MY_FLAG). This technique is used everywhere in C — in system calls, device drivers, and application settings. It is compact and efficient because one int holds 32 separate boolean flags.

Bitwise XOR has a clever property: a ^ a = 0 and a ^ 0 = a. This means XOR can be used to swap two integers without a temporary variable (a ^= b; b ^= a; a ^= b;), though this trick is mainly a curiosity today. More practically, XOR is used in error detection (parity bits), encryption, and hash functions. Understanding these operators prepares you for real-world C programming in embedded systems, networking, and low-level software.`,
      codeExample: `#include <stdio.h>

/* Helper to print 8 lowest bits of an integer */
void print_bits(unsigned char val) {
    for (int i = 7; i >= 0; i--) {
        printf("%d", (val >> i) & 1);
    }
    printf(" (%d)", val);
}

int main(void) {
    unsigned char a = 12;  /* 00001100 */
    unsigned char b = 10;  /* 00001010 */

    printf("a  = "); print_bits(a); printf("\n");
    printf("b  = "); print_bits(b); printf("\n\n");

    printf("a & b  = "); print_bits(a & b);  printf(" (AND)\n");
    printf("a | b  = "); print_bits(a | b);  printf(" (OR)\n");
    printf("a ^ b  = "); print_bits(a ^ b);  printf(" (XOR)\n");
    printf("~a     = "); print_bits(~a);     printf(" (NOT)\n\n");

    /* Shift operators */
    printf("a << 1 = "); print_bits(a << 1); printf(" (left shift = *2)\n");
    printf("a >> 1 = "); print_bits(a >> 1); printf(" (right shift = /2)\n\n");

    /* Flag manipulation */
    unsigned int flags = 0;
    const unsigned int FLAG_READ  = 1 << 0;  /* bit 0 */
    const unsigned int FLAG_WRITE = 1 << 1;  /* bit 1 */
    const unsigned int FLAG_EXEC  = 1 << 2;  /* bit 2 */

    flags |= FLAG_READ;     /* set read flag */
    flags |= FLAG_WRITE;    /* set write flag */
    printf("Flags after setting READ and WRITE: %u\n", flags);

    flags &= ~FLAG_WRITE;   /* clear write flag */
    printf("Flags after clearing WRITE: %u\n", flags);

    printf("Has READ?  %s\n", (flags & FLAG_READ)  ? "yes" : "no");
    printf("Has WRITE? %s\n", (flags & FLAG_WRITE) ? "yes" : "no");

    return 0;
}`,
      expectedOutput: `a  = 00001100 (12)
b  = 00001010 (10)

a & b  = 00001000 (8) (AND)
a | b  = 00001110 (14) (OR)
a ^ b  = 00000110 (6) (XOR)
~a     = 11110011 (243) (NOT)

a << 1 = 00011000 (24) (left shift = *2)
a >> 1 = 00000110 (6) (right shift = /2)

Flags after setting READ and WRITE: 3
Flags after clearing WRITE: 1
Has READ?  yes
Has WRITE? no`,
      keyTakeaways: [
        "Bitwise AND (&) sets a bit to 1 only when both inputs are 1; used for masking and testing bits.",
        "Bitwise OR (|) sets a bit to 1 if either input is 1; used for setting flags.",
        "Bitwise XOR (^) sets a bit to 1 only when the inputs differ; used for toggling.",
        "Left shift (<<) multiplies by powers of 2; right shift (>>) divides by powers of 2.",
        "Flags stored as single bits in an integer allow compact storage of many boolean switches."
      ],
      commonMistakes: [
        "Confusing bitwise AND (&) with logical AND (&&) — they have very different behavior.",
        "Right-shifting signed integers and assuming it fills with zeros (it may fill with the sign bit).",
        "Forgetting to cast or mask when doing bitwise NOT on signed integers, which may flip the sign bit.",
        "Using flag values that overlap (e.g., 1 and 3 share bit 0), causing flag checks to behave unexpectedly.",
        "Using shift amounts larger than or equal to the bit width of the type, which is undefined behavior."
      ],
      bestPractices: [
        "Use unsigned types for bitwise operations to avoid implementation-defined behavior with right shifts.",
        "Define bit flags using named constants (1 << 0, 1 << 1, etc.) rather than magic numbers.",
        "Always use parentheses around bitwise operations in larger expressions — their precedence is lower than comparison operators.",
        "Comment bit manipulations clearly; bit code is not self-documenting for most readers.",
        "Test flag operations with all combinations of set/clear/test to verify correctness."
      ],
      exercises: [
        {
          title: "Exercise 1 – Bit Checker",
          description: "Write a program that reads an integer from the user and prints 'even' if bit 0 is 0 or 'odd' if bit 0 is 1. Use a bitwise AND operation, not the % operator.",
          hint: "Bit 0 being set means the number is odd. Use: if (n & 1) to test it."
        },
        {
          title: "Exercise 2 – Power of Two Checker",
          description: "Write a function that uses bitwise operations to determine if a positive integer is a power of two. A number n is a power of two if and only if n & (n - 1) equals zero (and n is greater than zero). Test it with at least five values.",
          hint: "Powers of two in binary have exactly one bit set: 1, 10, 100, 1000. Subtracting 1 flips all bits below that single bit."
        },
        {
          title: "Exercise 3 – Permissions System",
          description: "Define three permission flags: READ (bit 0), WRITE (bit 1), EXECUTE (bit 2). Write a program that starts with all permissions off, then reads three yes/no answers from the user to set each permission, and finally prints a summary of which permissions are active.",
          hint: "Use |= to set a bit and check with & to test each bit. Use a char variable to read 'y' or 'n' from the user."
        }
      ],
      challenge: {
        title: "Challenge – Byte Manipulation Toolkit",
        description: "Write a C program with four functions: one to set a specific bit in an integer (given bit position 0-31), one to clear a specific bit, one to toggle a specific bit, and one to test whether a specific bit is set. Then write a main function that demonstrates all four operations on a starting value of 0, applying a sequence of operations and printing the binary representation after each step. Also use shifts to extract each individual byte from a 32-bit integer and print them separately.",
        hint: "Use (1u << position) to create a mask for any given bit position. For extracting bytes, right-shift by 0, 8, 16, or 24 and then mask with 0xFF."
      },
      quiz: [
        {
          question: "What does the bitwise AND operator & do?",
          options: [
            "Returns 1 if either bit is 1.",
            "Returns 1 only when both bits are 1.",
            "Flips all the bits.",
            "Shifts bits to the left."
          ],
          correctIndex: 1,
          explanation: "AND produces 1 only where both corresponding bits are 1; it is commonly used to mask out (isolate) specific bits."
        },
        {
          question: "What is 12 & 10 in binary (8-bit)?",
          options: ["14", "8", "6", "2"],
          correctIndex: 1,
          explanation: "12 = 00001100, 10 = 00001010. AND: only bit 3 is set in both, giving 00001000 = 8."
        },
        {
          question: "What is 12 | 10?",
          options: ["8", "6", "14", "22"],
          correctIndex: 2,
          explanation: "12 = 00001100, 10 = 00001010. OR: any bit set in either gives 00001110 = 14."
        },
        {
          question: "What is 12 ^ 10?",
          options: ["14", "8", "6", "2"],
          correctIndex: 2,
          explanation: "12 = 00001100, 10 = 00001010. XOR: bits that differ: bits 1 and 2 give 00000110 = 6."
        },
        {
          question: "What does left shift (<<) by 1 do to an integer value?",
          options: [
            "Divides by 2.",
            "Multiplies by 2.",
            "Adds 1.",
            "Flips all bits."
          ],
          correctIndex: 1,
          explanation: "Each left shift by 1 moves all bits one position toward the most significant bit, doubling the value (equivalent to multiplying by 2)."
        },
        {
          question: "What does right shift (>>) by 1 do to an unsigned integer?",
          options: [
            "Multiplies by 2.",
            "Divides by 2 (integer division).",
            "Adds a 1 bit at the top.",
            "Reverses the bit order."
          ],
          correctIndex: 1,
          explanation: "Right-shifting an unsigned integer by 1 divides it by 2 (truncating), shifting all bits one position toward the least significant bit."
        },
        {
          question: "How do you set bit 3 (0-indexed) of an integer flags?",
          options: [
            "flags = flags + 3",
            "flags |= (1 << 3)",
            "flags &= (1 << 3)",
            "flags ^= 3"
          ],
          correctIndex: 1,
          explanation: "Use OR with a mask that has only bit 3 set. 1 << 3 = 8 = 00001000. Oring with flags sets that bit without affecting others."
        },
        {
          question: "How do you clear bit 2 of an integer flags?",
          options: [
            "flags |= (1 << 2)",
            "flags ^= (1 << 2)",
            "flags &= ~(1 << 2)",
            "flags -= (1 << 2)"
          ],
          correctIndex: 2,
          explanation: "~(1 << 2) creates a mask with all bits set except bit 2. ANDing with flags clears only that bit."
        },
        {
          question: "How do you test if bit 1 of flags is set?",
          options: [
            "flags == (1 << 1)",
            "flags & (1 << 1)",
            "flags | (1 << 1)",
            "flags >> 1"
          ],
          correctIndex: 1,
          explanation: "Bitwise AND with a mask isolates the specific bit. The result is non-zero (true) if the bit is set, zero (false) if not."
        },
        {
          question: "What is the difference between & and &&?",
          options: [
            "They are identical operators.",
            "& is bitwise AND (operates on all bits); && is logical AND (returns 0 or 1 based on truth values).",
            "&& is bitwise; & is logical.",
            "& is faster but less safe."
          ],
          correctIndex: 1,
          explanation: "& operates bit-by-bit on the entire integer. && evaluates operands as boolean (non-zero = true), short-circuits, and always returns 0 or 1."
        },
        {
          question: "What does ~0 produce (for a 32-bit unsigned int)?",
          options: ["0", "1", "4294967295 (all bits set)", "-1"],
          correctIndex: 2,
          explanation: "Bitwise NOT flips all bits. Flipping all zeros gives all ones, which is the maximum unsigned int value (4294967295 for 32-bit)."
        },
        {
          question: "Why should you prefer unsigned types for bitwise operations?",
          options: [
            "Unsigned types are always larger.",
            "Right-shifting signed types may sign-extend, giving implementation-defined results.",
            "Bitwise operators do not work on signed types.",
            "Unsigned types compute faster."
          ],
          correctIndex: 1,
          explanation: "Right-shifting a signed negative integer is implementation-defined in C. Using unsigned guarantees a logical right shift (zero-fill), making behavior predictable."
        },
        {
          question: "What value does 1 << 4 produce?",
          options: ["4", "8", "16", "32"],
          correctIndex: 2,
          explanation: "Shifting the bit 1 four positions to the left: 0001 -> 10000 = 16."
        },
        {
          question: "Which bitwise operation can toggle (flip) a specific bit?",
          options: ["AND (&)", "OR (|)", "XOR (^)", "NOT (~)"],
          correctIndex: 2,
          explanation: "XOR with a 1 bit flips the corresponding bit: 0 ^ 1 = 1 and 1 ^ 1 = 0, making it ideal for toggling."
        },
        {
          question: "What is the result of a ^ a for any integer a?",
          options: ["a", "0", "1", "~a"],
          correctIndex: 1,
          explanation: "XOR of a value with itself always produces 0 because each bit XORed with itself equals 0."
        },
        {
          question: "How many boolean flags can a 32-bit int store?",
          options: ["8", "16", "32", "64"],
          correctIndex: 2,
          explanation: "A 32-bit integer has 32 bits, each of which can independently represent one true/false flag."
        },
        {
          question: "What is undefined behavior regarding shift operators?",
          options: [
            "Shifting a negative number.",
            "Shifting by an amount equal to or greater than the bit width of the type.",
            "Shifting an unsigned number.",
            "Left-shifting by 1."
          ],
          correctIndex: 1,
          explanation: "The C standard states that shifting by an amount >= the bit width of the type is undefined behavior — the result is not guaranteed."
        },
        {
          question: "What does n & 1 test?",
          options: [
            "Whether n is positive.",
            "Whether n is zero.",
            "Whether n is odd (bit 0 is set).",
            "Whether n is a power of two."
          ],
          correctIndex: 2,
          explanation: "Bit 0 (the least significant bit) is 1 for odd numbers and 0 for even numbers. ANDing with 1 isolates that bit."
        },
        {
          question: "Which operation extracts the lower byte (bits 0-7) of a 32-bit integer x?",
          options: ["x >> 8", "x & 0xFF00", "x & 0xFF", "x << 8"],
          correctIndex: 2,
          explanation: "0xFF = 11111111 in binary. ANDing with it keeps only the lowest 8 bits and zeros all higher bits."
        },
        {
          question: "What is wrong with: if (flags & FLAG_READ == 1)?",
          options: [
            "Nothing, it works correctly.",
            "== has higher precedence than &, so it evaluates as flags & (FLAG_READ == 1).",
            "& cannot be used in an if condition.",
            "FLAG_READ must be on the left side."
          ],
          correctIndex: 1,
          explanation: "The == operator has higher precedence than &, so the expression tests flags & (FLAG_READ == 1), not (flags & FLAG_READ) == 1. Use parentheses: (flags & FLAG_READ) != 0."
        }
      ]
    },
    {
      id: "topic-2-6",
      title: "Escape Sequences and Special Characters",
      estimatedReadingTime: 6,
      explanation: `When you write a string literal or a character constant in C, most characters represent themselves directly — type 'A' and you get the letter A. But some characters are either invisible (like a newline or tab), or they conflict with C's own syntax (like the double-quote that would end a string). Escape sequences solve this problem by using a backslash followed by one or more characters to represent a special meaning within a string or character literal.

The most common escape sequence is \\n, which represents the newline character. When printf outputs \\n, the terminal moves to the beginning of the next line. Similarly, \\t inserts a horizontal tab. These invisible control characters let you format output without needing actual newlines or tabs in the source code, which would be confusing and might not even be allowed in a string literal. You have been using \\n since your very first C program.

To include a backslash itself in a string, you write \\\\. To include a double-quote inside a double-quoted string, you write \\". To include a single-quote inside a character literal, you write \\'. These are necessary because the compiler would otherwise interpret those characters as terminating the string or literal. Understanding this lets you build strings that contain any character, including ones that would otherwise confuse the parser.

The null character \\0 has a special role in C: it marks the end of a string. Every string literal you write in C automatically has a \\0 appended at the end. This is why printf and other string functions know when the string has ended — they walk through memory one character at a time until they find the \\0. You rarely insert \\0 manually, but you need to know it is always there, taking up one byte of space beyond what you visually see in the string.

Octal (\\NNN) and hexadecimal (\\xHH) escape sequences let you embed any ASCII character by its numeric code. For example, \\x41 is the letter 'A' (ASCII 65 in hex). While rarely needed for everyday programming, these are useful when working with binary data, communication protocols, or embedded systems where specific byte values matter.`,
      codeExample: `#include <stdio.h>

int main(void) {
    /* Common escape sequences */
    printf("Line 1\nLine 2\n");
    printf("Column1\tColumn2\tColumn3\n");
    printf("She said \"hello!\"\n");
    printf("Path: C:\\Users\\Alice\\\n");

    /* Alert (bell) - may beep on some terminals */
    /* printf("\a"); */

    /* Carriage return moves cursor to line start */
    printf("Before CR\rAfter  \n");

    /* Null character ends a string early (conceptually) */
    char msg[] = "Hello\0World";
    printf("String with embedded null: %s\n", msg);
    /* printf stops at the first \0, so only 'Hello' prints */

    /* Character via hex escape */
    printf("Hex escape for A: \x41\n");
    printf("Hex escape for newline: done\x0A");  /* \x0A = newline */

    /* Single-quote in character literal */
    char apostrophe = '\'';
    printf("Apostrophe character: %c\n", apostrophe);

    /* Backslash character */
    char backslash = '\\';
    printf("Backslash character: %c\n", backslash);

    /* Size of string vs its visible content */
    char s[] = "Hi";
    printf("'Hi' has %zu bytes (including null)\n", sizeof(s));

    return 0;
}`,
      expectedOutput: `Line 1
Line 2
Column1	Column2	Column3
She said "hello!"
Path: C:\Users\Alice\
After  
String with embedded null: Hello
Hex escape for A: A
Hex escape for newline: done
Apostrophe character: '
Backslash character: \
'Hi' has 3 bytes (including null)`,
      keyTakeaways: [
        "Escape sequences begin with a backslash and represent special or syntax-conflicting characters.",
        "\\n is newline, \\t is tab, \\\\ is a literal backslash, and \\\" is a literal double quote.",
        "\\0 is the null character that terminates every C string — it is automatically appended to string literals.",
        "\\x41 and octal escapes let you embed any ASCII character by its numeric code.",
        "String size in memory includes the hidden null terminator, so 'Hi' occupies 3 bytes."
      ],
      commonMistakes: [
        "Writing \\n inside a character constant as '\\n' thinking it needs escaping differently — '\\n' is the correct char literal for newline.",
        "Forgetting that the null terminator adds one extra byte to every string's size.",
        "Using a single backslash in a file path string and forgetting to double it: 'C:\\Users' needs 'C:\\\\Users'.",
        "Confusing \\0 (null character, value 0) with '0' (the character zero, ASCII value 48).",
        "Using printf without \\n at the end and wondering why the output does not appear immediately (buffering)."
      ],
      bestPractices: [
        "Always end printf format strings with \\n unless you specifically need the cursor to stay on the same line.",
        "Use \\t to align columns in text output when a full formatting solution is overkill.",
        "Never confuse \\0 with '0'; always comment your intent when placing a null byte manually.",
        "Use hex escapes (\\xNN) for non-printable bytes in binary data rather than magic numbers.",
        "Remember that sizeof on a string literal includes the null terminator; strlen does not."
      ],
      exercises: [
        {
          title: "Exercise 1 – Escape Sequence Art",
          description: "Using only a single printf call (with escape sequences inside the string), print a small table with three rows and three columns of numbers, each column separated by a tab character, each row on its own line. Column headers should be 'Name', 'Age', and 'Score'.",
          hint: "Use \\t to separate columns and \\n to move to the next row, all inside one format string."
        },
        {
          title: "Exercise 2 – Path Printer",
          description: "Write a program that prints the Windows-style path: C:\\Program Files\\MyApp\\config.ini. Make sure the backslashes appear correctly in the output.",
          hint: "Each backslash in the output requires two backslashes in the source string: \\\\."
        },
        {
          title: "Exercise 3 – Null Terminator Investigation",
          description: "Declare a char array of size 10, fill the first 5 positions with the letters 'H', 'e', 'l', 'l', 'o', and set position 5 to '\\0'. Print the array with %s and also print the sizeof the array. Then move the null terminator to position 2 and print again to see the truncated output.",
          hint: "char arr[10]; arr[0]='H'; ... arr[5]='\\0'; Then printf('%s', arr); tries to print until it hits \\0."
        }
      ],
      challenge: {
        title: "Challenge – String Inspector",
        description: "Write a program that reads a line of input from the user (up to 100 characters) using fgets. Then iterate through the string character by character. For each character, print its position, the character itself (if printable), its ASCII value (as a decimal int), and a description for any escape sequences found (such as 'newline' for \\n or 'null' for \\0). Stop when you hit the null terminator.",
        hint: "Use a for loop with an index. Check if a char is printable using isprint() from ctype.h. Compare the char value to '\\n', '\\t', '\\0', etc. using if-else."
      },
      quiz: [
        {
          question: "What does \\n represent in a C string?",
          options: ["The letter n", "A backslash followed by n", "A newline character", "Nothing — it is ignored"],
          correctIndex: 2,
          explanation: "\\n is the escape sequence for the newline character (ASCII 10), which moves output to the beginning of the next line."
        },
        {
          question: "How do you include a literal double-quote character inside a string literal?",
          options: ["Use two double-quotes: \"\"", "Escape it as \\\"", "Use a single-quote instead.", "It is not possible."],
          correctIndex: 1,
          explanation: "The escape sequence \\\" represents a literal double-quote character within a double-quoted string."
        },
        {
          question: "What is \\0 in C?",
          options: [
            "The digit zero.",
            "The null character (ASCII value 0) used to terminate strings.",
            "An octal escape for the number 8.",
            "A shorthand for NULL pointer."
          ],
          correctIndex: 1,
          explanation: "\\0 is the null character with the integer value 0. It marks the end of every C string and is automatically appended to string literals."
        },
        {
          question: "How many bytes does the string 'Hi' occupy in memory (as a C string literal)?",
          options: ["1", "2", "3", "4"],
          correctIndex: 2,
          explanation: "'H', 'i', and the null terminator \\0 — three bytes total."
        },
        {
          question: "What does \\t represent?",
          options: ["A tilde character", "A tab character", "A terminator", "The letter t"],
          correctIndex: 1,
          explanation: "\\t is the escape sequence for the horizontal tab character (ASCII 9)."
        },
        {
          question: "How do you write a literal backslash in a C string?",
          options: ["\\", "\\\\", "/", "\\/"],
          correctIndex: 1,
          explanation: "A single backslash begins an escape sequence, so to get a literal backslash you need two backslashes: \\\\."
        },
        {
          question: "What is the ASCII value of the null character \\0?",
          options: ["0", "48", "32", "255"],
          correctIndex: 0,
          explanation: "The null character \\0 has the integer value 0, which is distinct from the digit character '0', which has ASCII value 48."
        },
        {
          question: "What does \\x41 represent?",
          options: ["The character 'a'", "The character 'A'", "The number 41 in decimal", "The hex digit 4 and digit 1"],
          correctIndex: 1,
          explanation: "\\x41 is a hexadecimal escape sequence. 0x41 = 65 in decimal, which is the ASCII code for 'A'."
        },
        {
          question: "What is the escape sequence for a carriage return?",
          options: ["\\n", "\\t", "\\r", "\\c"],
          correctIndex: 2,
          explanation: "\\r is the carriage return character (ASCII 13), which moves the cursor to the beginning of the current line without advancing to the next line."
        },
        {
          question: "What happens when you include \\0 in the middle of a string and print it with %s?",
          options: [
            "printf prints all characters including past the \\0.",
            "printf stops printing at the \\0 and ignores the rest.",
            "A runtime error occurs.",
            "The string is printed without the \\0."
          ],
          correctIndex: 1,
          explanation: "%s reads characters until it finds a null terminator \\0. Everything after it is effectively hidden from printf."
        },
        {
          question: "Which escape sequence produces an audible alert (bell) on some terminals?",
          options: ["\\b", "\\a", "\\e", "\\s"],
          correctIndex: 1,
          explanation: "\\a is the alert or bell character (ASCII 7), which may produce a beep sound on some terminals."
        },
        {
          question: "What does \\b represent?",
          options: ["A backslash", "A backspace character", "A bold marker", "A binary prefix"],
          correctIndex: 1,
          explanation: "\\b is the backspace character (ASCII 8), which moves the cursor one position to the left."
        },
        {
          question: "Does sizeof('A') equal sizeof('\\n') in C?",
          options: [
            "No — 'A' is larger.",
            "No — '\\n' is larger.",
            "Yes — both are char literals with size 1.",
            "Yes — but only on 64-bit systems."
          ],
          correctIndex: 2,
          explanation: "Both 'A' and '\\n' are character constants of type int in C (size 4) or char depending on context, but sizeof a single char literal is 1 byte for type char."
        },
        {
          question: "How do you write a single-quote character literal in C?",
          options: ["''''", "'\\'", "'\\'", "''"],
          correctIndex: 1,
          explanation: "To store a single-quote in a char variable you must escape it: '\\'' — backslash followed by a single quote."
        },
        {
          question: "What function does NOT include the null terminator in its count?",
          options: ["sizeof", "strlen", "malloc size for a string", "fgets buffer size"],
          correctIndex: 1,
          explanation: "strlen returns the number of characters before the null terminator, not including it. sizeof on a char array includes the null terminator byte."
        },
        {
          question: "What character is represented by \\0?",
          options: ["The digit zero '0'", "The null byte with value 0", "The letter O", "EOF marker"],
          correctIndex: 1,
          explanation: "\\0 is specifically the null character with integer value 0, not to be confused with the printable digit '0' which has ASCII value 48."
        },
        {
          question: "In a string 'C:\\\\Users\\\\Alice', how many backslashes appear in the output?",
          options: ["4", "2", "1", "0"],
          correctIndex: 1,
          explanation: "Each \\\\ escape sequence represents exactly one backslash in the output, so two \\\\ pairs produce two backslashes: C:\\Users\\Alice."
        },
        {
          question: "Which is true about escape sequences?",
          options: [
            "They only work in printf format strings.",
            "They are processed at runtime by printf.",
            "They are processed at compile time and embedded as single character values in the string.",
            "They require a special header to use."
          ],
          correctIndex: 2,
          explanation: "Escape sequences are interpreted by the compiler, not at runtime. The compiler embeds the corresponding byte value directly into the string in the executable."
        },
        {
          question: "What does printf('\\t%d\\t%d\\n', 1, 2) print?",
          options: [
            "\\t1\\t2\\n",
            "tab, 1, tab, 2, then newline",
            "1 2",
            "12"
          ],
          correctIndex: 1,
          explanation: "The \\t sequences produce tab characters and \\n produces a newline, so the output is: a tab, then 1, a tab, then 2, then a new line."
        },
        {
          question: "Why might output not appear immediately if printf does not end with \\n?",
          options: [
            "printf only works with newlines.",
            "Standard output is line-buffered by default; the buffer may not flush until a newline is encountered.",
            "The OS blocks printf without \\n.",
            "\\n is required by the C standard in all printf calls."
          ],
          correctIndex: 1,
          explanation: "When stdout is connected to a terminal it is usually line-buffered, meaning data sits in a buffer until a newline (or explicit flush) tells the system to send it to the screen."
        }
      ]
    },
    {
      id: "topic-2-7",
      title: "sizeof and Memory Basics",
      estimatedReadingTime: 8,
      explanation: `One of the most important things to understand about C is that it gives you direct control over memory — but that also means you are responsible for understanding how much memory each piece of data takes up. The sizeof operator is your primary tool for asking the question: "how many bytes does this type or variable occupy in memory?" Unlike most operators, sizeof is evaluated at compile time for most uses, making it zero-cost at runtime.

Every data type in C has a fixed size measured in bytes. A byte is 8 bits. The size of char is always exactly 1 byte by definition. The size of int is typically 4 bytes on modern platforms, though the C standard only guarantees it is at least 2 bytes. double is typically 8 bytes, float 4 bytes, and long varies by platform (4 or 8 bytes). Because these sizes can vary, using sizeof in your code instead of hardcoded numbers makes your programs more portable.

When applied to an array, sizeof gives you the total number of bytes occupied by the entire array, not just one element. This means sizeof(arr) / sizeof(arr[0]) gives you the number of elements in any array — a classic and essential C idiom. This is much safer than manually counting or hardcoding the array length, because if you change the array size, the calculation automatically updates.

Memory in a running program is divided into several regions. The stack is where local variables live — it grows and shrinks automatically as functions are called and return. The heap is where dynamically allocated memory lives (malloc, free). The data segment holds global and static variables. The text segment holds the compiled machine code. Understanding these regions explains lifetime and scope of variables, and also why local variables disappear when a function returns.

Alignment is another concept that affects memory usage. The processor often requires that certain types be stored at addresses that are multiples of their size (int at a 4-byte boundary, double at an 8-byte boundary). This means a struct may be larger than the sum of its member sizes because the compiler inserts "padding" bytes to keep members aligned. sizeof always gives you the true, padded size, which is what matters for allocation.`,
      codeExample: `#include <stdio.h>

struct Point {
    char label;    /* 1 byte */
    /* 3 bytes padding likely here */
    int x;         /* 4 bytes */
    int y;         /* 4 bytes */
};  /* total: likely 12 bytes, not 9 */

int main(void) {
    /* sizeof basic types */
    printf("sizeof(char)   = %zu bytes\n", sizeof(char));
    printf("sizeof(short)  = %zu bytes\n", sizeof(short));
    printf("sizeof(int)    = %zu bytes\n", sizeof(int));
    printf("sizeof(long)   = %zu bytes\n", sizeof(long));
    printf("sizeof(float)  = %zu bytes\n", sizeof(float));
    printf("sizeof(double) = %zu bytes\n", sizeof(double));

    /* sizeof on variables */
    int x = 42;
    printf("sizeof(x) where x is int = %zu\n", sizeof(x));

    /* sizeof an array */
    int arr[10];
    printf("sizeof(arr) for int[10] = %zu bytes\n", sizeof(arr));

    /* Classic: number of elements in array */
    int count = sizeof(arr) / sizeof(arr[0]);
    printf("Number of elements in arr: %d\n", count);

    /* String sizeof includes null terminator */
    char greeting[] = "Hello";
    printf("sizeof 'Hello' array = %zu bytes\n", sizeof(greeting));

    /* Struct padding */
    struct Point p;
    printf("sizeof(struct Point) = %zu bytes\n", sizeof(p));
    printf("  char:1 + int:4 + int:4 = 9, but padding makes it %zu\n",
           sizeof(p));

    /* sizeof does not evaluate its argument expression */
    int n = 5;
    size_t s = sizeof(n++);  /* n is NOT incremented */
    printf("sizeof(n++) = %zu, n is still %d\n", s, n);

    return 0;
}`,
      expectedOutput: `sizeof(char)   = 1 bytes
sizeof(short)  = 2 bytes
sizeof(int)    = 4 bytes
sizeof(long)   = 8 bytes
sizeof(float)  = 4 bytes
sizeof(double) = 8 bytes
sizeof(x) where x is int = 4
sizeof(arr) for int[10] = 40 bytes
Number of elements in arr: 10
sizeof 'Hello' array = 6 bytes
sizeof(struct Point) = 12 bytes
  char:1 + int:4 + int:4 = 9, but padding makes it 12
sizeof(n++) = 4, n is still 5`,
      keyTakeaways: [
        "sizeof returns the number of bytes a type or variable occupies; always use %zu to print size_t.",
        "sizeof(array) / sizeof(array[0]) is the correct way to compute the number of elements in an array.",
        "sizeof on a string array includes the null terminator, so 'Hello' gives 6 bytes.",
        "Structs may be larger than the sum of their members due to alignment padding.",
        "sizeof does not evaluate its operand expression — side effects like n++ inside sizeof do not happen."
      ],
      commonMistakes: [
        "Using %d instead of %zu to print sizeof results — size_t is unsigned and may be 64-bit.",
        "Applying sizeof to a pointer expecting the size of the array it points to — it gives the pointer's size, not the array.",
        "Forgetting that sizeof('Hello') gives the char array size including \\0, while strlen gives the length without \\0.",
        "Assuming struct size equals the sum of member sizes and not accounting for padding.",
        "Using sizeof to measure the length of a string when strlen is the correct function."
      ],
      bestPractices: [
        "Always use sizeof(type) or sizeof(variable) instead of hardcoded byte counts.",
        "Use the idiom sizeof(arr)/sizeof(arr[0]) to get array length, not a hardcoded number.",
        "Use %zu (not %d or %u) when printing size_t values from sizeof.",
        "Be aware that sizeof a pointer is always the pointer's size (4 or 8 bytes), regardless of what it points to.",
        "Use __attribute__((packed)) or pragma pack only when necessary and document why padding is being removed."
      ],
      exercises: [
        {
          title: "Exercise 1 – Type Size Survey",
          description: "Write a program that prints the size in bytes of all the fundamental C types: char, short, int, long, long long, float, double, and long double. Format the output as a table with the type name and its size.",
          hint: "Use sizeof(type) for each and print with %zu format specifier."
        },
        {
          title: "Exercise 2 – Array Length Macro",
          description: "Define a macro ARRAY_LEN(arr) that computes the number of elements in an array using the sizeof idiom. Test it on arrays of int, char, and double of different sizes and print the results.",
          hint: "The macro should expand to sizeof(arr) / sizeof((arr)[0]). Parenthesizing the argument in the macro body avoids edge cases."
        },
        {
          title: "Exercise 3 – Struct Padding Explorer",
          description: "Define three structs: one with members in order char, int, char; one with members int, char, char; and one with members char, char, int. Print the sizeof each struct and try to explain why they differ. Then print the sizeof each individual member and the sum to compare.",
          hint: "The compiler adds padding after smaller members to align the next member correctly. Reordering members can reduce or eliminate padding."
        }
      ],
      challenge: {
        title: "Challenge – Memory Layout Visualizer",
        description: "Create a struct that has at least 5 members of various types (char, short, int, double, char). Print the sizeof the struct and then use the offsetof macro from stddef.h to print the byte offset of each member within the struct. Calculate what the size would be with no padding (sum of sizeof each member) and print the difference. Finally explain in comments why the compiler inserts padding and how you could reorganize the struct to minimize wasted space.",
        hint: "offsetof(struct_name, member_name) returns the byte offset of a member from the start of the struct. Declare the struct, then call offsetof for each member in printf."
      },
      quiz: [
        {
          question: "What does sizeof return?",
          options: [
            "The value stored in a variable.",
            "The number of bytes a type or variable occupies in memory.",
            "The number of elements in an array.",
            "The memory address of a variable."
          ],
          correctIndex: 1,
          explanation: "sizeof is an operator that returns the size in bytes of its operand (a type or expression)."
        },
        {
          question: "What is the size of char always guaranteed to be in C?",
          options: ["2 bytes", "4 bytes", "1 byte", "It varies."],
          correctIndex: 2,
          explanation: "The C standard mandates that sizeof(char) is always 1 — it is the definition of a byte in C."
        },
        {
          question: "What type does sizeof return?",
          options: ["int", "unsigned int", "size_t", "long"],
          correctIndex: 2,
          explanation: "sizeof returns a value of type size_t, which is an unsigned integer type. Use %zu to print it."
        },
        {
          question: "Given int arr[10], what does sizeof(arr) return on a system where int is 4 bytes?",
          options: ["10", "4", "40", "sizeof(int*)"],
          correctIndex: 2,
          explanation: "sizeof(arr) returns the total bytes of the array: 10 elements times 4 bytes each = 40 bytes."
        },
        {
          question: "How do you compute the number of elements in an array using sizeof?",
          options: [
            "sizeof(arr)",
            "sizeof(arr) / sizeof(arr[0])",
            "sizeof(arr) - 1",
            "sizeof(arr) * sizeof(arr[0])"
          ],
          correctIndex: 1,
          explanation: "Dividing the total array size by the size of one element gives the element count. This is the standard C idiom for array length."
        },
        {
          question: "What does sizeof('Hello') return for a char array holding 'Hello'?",
          options: ["5", "6", "7", "It is a compile error."],
          correctIndex: 1,
          explanation: "The string 'Hello' has 5 characters plus the null terminator, so a char array holding it has 6 bytes, and sizeof returns 6."
        },
        {
          question: "Why might sizeof(struct) be larger than the sum of its members?",
          options: [
            "The compiler adds extra functionality.",
            "The compiler inserts padding bytes for alignment purposes.",
            "Struct headers add overhead.",
            "C rounds all struct sizes up to 16 bytes."
          ],
          correctIndex: 1,
          explanation: "The CPU often requires data to be at addresses aligned to their size. The compiler inserts padding bytes between or after members to satisfy alignment requirements."
        },
        {
          question: "What does sizeof(int *) return on a 64-bit system?",
          options: ["4", "8", "sizeof(int)", "It varies by pointer type."],
          correctIndex: 1,
          explanation: "On a 64-bit system, all pointers are 8 bytes regardless of what type they point to."
        },
        {
          question: "Does sizeof evaluate its operand expression?",
          options: [
            "Yes, always.",
            "No — it only analyzes the type; side effects do not occur.",
            "Only if the operand is a variable.",
            "Only for array types."
          ],
          correctIndex: 1,
          explanation: "sizeof is a compile-time operator for most cases. sizeof(n++) does not increment n — the expression is never executed."
        },
        {
          question: "Which format specifier is correct for printing a size_t value?",
          options: ["%d", "%u", "%zu", "%ld"],
          correctIndex: 2,
          explanation: "%zu is the correct specifier for size_t — 'z' specifies size_t width and 'u' means unsigned."
        },
        {
          question: "Where do local variables live in memory?",
          options: ["Heap", "Stack", "Data segment", "Text segment"],
          correctIndex: 1,
          explanation: "Local (automatic) variables are allocated on the stack when a function is called and automatically released when it returns."
        },
        {
          question: "Where does dynamically allocated memory (malloc) come from?",
          options: ["Stack", "Text segment", "Heap", "Register"],
          correctIndex: 2,
          explanation: "malloc allocates memory from the heap, which persists until explicitly freed with free()."
        },
        {
          question: "What does sizeof(int *) give compared to sizeof(int)?",
          options: [
            "They are always the same.",
            "sizeof(int *) is always larger — pointers are typically 8 bytes on 64-bit.",
            "sizeof(int *) is always smaller.",
            "They differ only on big-endian systems."
          ],
          correctIndex: 1,
          explanation: "On a modern 64-bit platform, int is 4 bytes but a pointer (including int*) is 8 bytes."
        },
        {
          question: "What is alignment in the context of C memory?",
          options: [
            "Making code lines the same length.",
            "Storing data at memory addresses that are multiples of the data's size.",
            "Sorting struct members alphabetically.",
            "Compressing data to use fewer bytes."
          ],
          correctIndex: 1,
          explanation: "Alignment means placing data at addresses divisible by their size (e.g., a 4-byte int at address 0, 4, 8, etc.) so the CPU can read it efficiently."
        },
        {
          question: "What is the text segment of a program?",
          options: [
            "Where string literals are stored.",
            "Where the compiled machine code (instructions) is stored.",
            "Where global variables live.",
            "The stack."
          ],
          correctIndex: 1,
          explanation: "The text (or code) segment holds the compiled machine instructions of your program. It is typically read-only."
        },
        {
          question: "What happens to a local variable after the function it is declared in returns?",
          options: [
            "It remains in memory until the program ends.",
            "It is moved to the heap.",
            "It goes out of scope and its stack memory is released.",
            "It is saved to a global variable."
          ],
          correctIndex: 2,
          explanation: "Local variables live on the stack frame of their function. When the function returns, the stack frame is popped and that memory is no longer valid."
        },
        {
          question: "If an int array is passed to a function, what does sizeof give inside that function?",
          options: [
            "The total size of the array.",
            "The size of a pointer (the array decays to a pointer).",
            "The number of elements.",
            "The same as in the calling function."
          ],
          correctIndex: 1,
          explanation: "Arrays decay to pointers when passed to functions. Inside the function, sizeof gives the pointer size, not the original array size."
        },
        {
          question: "How many bytes does a typical double occupy?",
          options: ["2", "4", "8", "16"],
          correctIndex: 2,
          explanation: "A double is a 64-bit (8-byte) IEEE 754 floating-point number on virtually all modern platforms."
        },
        {
          question: "What header provides the offsetof macro?",
          options: ["stdio.h", "stdlib.h", "stddef.h", "limits.h"],
          correctIndex: 2,
          explanation: "offsetof is defined in stddef.h. It returns the byte offset of a struct member from the beginning of the struct."
        },
        {
          question: "Why is using sizeof better than hardcoding byte counts in your code?",
          options: [
            "sizeof is always faster at runtime.",
            "sizeof makes the code portable — it automatically reflects the correct size on any platform.",
            "sizeof prevents all memory errors.",
            "The C standard requires using sizeof."
          ],
          correctIndex: 1,
          explanation: "Type sizes can vary across platforms and compilers. sizeof queries the actual size at compile time, making your code correct on any platform without manual updates."
        }
      ]
    },
    {
      id: "topic-2-8",
      title: "Storage Classes (auto, static, extern, register)",
      estimatedReadingTime: 9,
      explanation: `In C, every variable has not only a type (like int or double) but also a storage class that determines where it lives in memory, how long it lives, and who can access it. There are four storage class specifiers in C: auto, static, extern, and register. Understanding them is essential for writing programs that manage memory correctly and share data across functions or files properly.

The auto storage class is the default for local variables. You almost never write the keyword auto explicitly because C assumes it automatically for any variable declared inside a function. An auto variable is created on the stack when its enclosing block is entered and destroyed when the block exits. Each time the function is called, a fresh auto variable starts with whatever value happens to be in that stack memory (which is garbage unless you initialize it).

The static storage class has two distinct uses depending on where you declare it. For a local variable inside a function, static means the variable persists between function calls — it lives in the data segment rather than the stack, and it is initialized only once. This is useful for counting how many times a function has been called, for example. For a variable declared at file scope (outside any function), static means it has internal linkage — it is private to that translation unit and cannot be accessed from other files.

The extern storage class is the opposite of static at file scope: it declares a variable that is defined in another translation unit (another .c file). When you write extern int counter; you are telling the compiler "there is an int named counter defined somewhere else; let me use it here." This is how global variables are shared across multiple source files. Exactly one file must define the variable without extern; all others use extern to declare it.

The register storage class is a hint to the compiler that a variable is used frequently and should be placed in a CPU register for fast access. Modern compilers mostly ignore this hint because their optimizers are better at deciding what goes in registers. Register variables have one important restriction: you cannot take their address with the & operator, because registers do not have memory addresses. In practice, you will rarely see or use register in modern C code.`,
      codeExample: `#include <stdio.h>

/* File-scope variable: accessible from this file only (static linkage) */
static int file_private = 100;

/* Function that demonstrates static local variable */
void count_calls(void) {
    static int count = 0;  /* initialized once, persists between calls */
    count++;
    printf("count_calls has been called %d time(s)\n", count);
}

/* Function that demonstrates auto variable behavior */
void show_auto(void) {
    auto int x = 42;   /* 'auto' is explicit but unnecessary */
    printf("auto x = %d\n", x);
    /* x is destroyed when show_auto returns */
}

/* Example showing register hint (rarely used today) */
int sum_array(int arr[], int n) {
    register int i;
    register int total = 0;
    for (i = 0; i < n; i++) {
        total += arr[i];
    }
    return total;
}

int main(void) {
    /* auto is the default for local variables */
    int a = 10;  /* same as: auto int a = 10; */
    printf("Local a = %d\n", a);

    /* file_private is accessible here (same file) */
    printf("file_private = %d\n", file_private);

    /* Call count_calls multiple times to see static persist */
    count_calls();
    count_calls();
    count_calls();

    show_auto();

    int nums[] = {1, 2, 3, 4, 5};
    printf("Sum = %d\n", sum_array(nums, 5));

    return 0;
}`,
      expectedOutput: `Local a = 10
file_private = 100
count_calls has been called 1 time(s)
count_calls has been called 2 time(s)
count_calls has been called 3 time(s)
auto x = 42
Sum = 15`,
      keyTakeaways: [
        "auto is the default storage class for local variables; it is rarely written explicitly.",
        "static local variables persist between function calls and are initialized only once.",
        "static at file scope restricts a variable's visibility to its own translation unit.",
        "extern declares a variable defined in another file; used to share globals across source files.",
        "register is a compiler hint for frequently used variables; you cannot take the address of a register variable."
      ],
      commonMistakes: [
        "Expecting a static local variable to reset each time the function is called — it only initializes once.",
        "Confusing static at local scope (persistence) with static at file scope (restricted visibility).",
        "Defining a global variable with extern in multiple files instead of defining it once without extern.",
        "Using uninitialized auto variables and assuming they are zero — they contain garbage values.",
        "Trying to take the address of a register variable with & — this is a compile error."
      ],
      bestPractices: [
        "Never rely on auto being implied; initialize all local variables explicitly.",
        "Use static local variables only when persistence across calls is intentional and clearly documented.",
        "Prefer static file-scope variables over global variables to limit unintended cross-file access.",
        "When sharing a global across files, declare it in one header with extern and define it in exactly one .c file.",
        "Avoid register today; trust the compiler optimizer to make better register allocation decisions."
      ],
      exercises: [
        {
          title: "Exercise 1 – Call Counter",
          description: "Write a function greet() that prints 'Hello, guest N!' where N is the number of times the function has been called. Use a static local variable for the count. Call the function five times from main and verify the counter increments correctly.",
          hint: "Declare static int call_count = 0; inside greet and increment it each call."
        },
        {
          title: "Exercise 2 – Static vs Auto",
          description: "Write two functions: one that increments and prints a static local int, and one that increments and prints a regular (auto) local int. Call each three times from main. Observe and explain the difference in output.",
          hint: "The auto version resets to the initial value each call; the static version accumulates."
        },
        {
          title: "Exercise 3 – File-Private Variable",
          description: "Create a simple 'module' in a single .c file: use a static file-scope int as a private counter. Provide two functions — one to increment the counter and one to get its value. Never expose the counter variable directly. Call these from main to demonstrate encapsulation.",
          hint: "Declare static int counter = 0; at the top of the file, then write increment_counter() and get_counter() functions."
        }
      ],
      challenge: {
        title: "Challenge – Running Statistics Module",
        description: "Build a small statistics module using only storage class concepts. Use static local variables inside functions to maintain running state without global variables. Write functions: add_value(double v) that adds a value to a running sum and count, get_mean() that returns the mean of all added values, get_count() that returns how many values have been added, and reset() that clears all state. Call these from main with at least five values and print the results after each addition.",
        hint: "Each function can have its own static variables, or a single add_value function can hold them all as statics shared via static scope. Consider which approach is cleaner."
      },
      quiz: [
        {
          question: "What is the default storage class for a local variable in C?",
          options: ["static", "extern", "register", "auto"],
          correctIndex: 3,
          explanation: "Any variable declared inside a function without a storage class specifier is auto by default — allocated on the stack and destroyed when the block exits."
        },
        {
          question: "What does a static local variable do that an auto local variable does not?",
          options: [
            "It can be accessed from other functions.",
            "It persists its value between function calls.",
            "It is stored on the heap.",
            "It is faster to access."
          ],
          correctIndex: 1,
          explanation: "A static local variable lives in the data segment and retains its value across multiple calls to the function rather than being re-created each time."
        },
        {
          question: "How many times is a static local variable initialized?",
          options: ["Every function call", "Once, before the first call", "Every program run", "Never — it starts at garbage"],
          correctIndex: 1,
          explanation: "A static local variable is initialized exactly once — the first time program execution reaches its declaration. After that, its value persists."
        },
        {
          question: "What does static mean at file scope (outside any function)?",
          options: [
            "The variable persists between calls.",
            "The variable is visible to all files in the project.",
            "The variable has internal linkage and is private to the current file.",
            "The variable is stored on the stack."
          ],
          correctIndex: 2,
          explanation: "A file-scope static variable has internal linkage — it cannot be accessed from other translation units (other .c files)."
        },
        {
          question: "What is the purpose of extern?",
          options: [
            "To prevent a variable from being modified.",
            "To declare a variable that is defined in another translation unit.",
            "To make a variable visible only in the current file.",
            "To allocate a variable on the heap."
          ],
          correctIndex: 1,
          explanation: "extern tells the compiler that a variable exists but is defined elsewhere. It allows sharing global variables across multiple source files."
        },
        {
          question: "If int counter; appears in two .c files with no extern, what happens?",
          options: [
            "Both files share the same variable.",
            "A linker error occurs due to duplicate definition.",
            "One definition is silently chosen.",
            "Both variables exist independently."
          ],
          correctIndex: 1,
          explanation: "Defining the same global name in two translation units causes a duplicate symbol error at link time."
        },
        {
          question: "Where does a static local variable live in memory?",
          options: ["Stack", "Heap", "Data segment", "Text segment"],
          correctIndex: 2,
          explanation: "Static variables (both local and file-scope) are stored in the data segment of the program's memory, not on the stack."
        },
        {
          question: "Which storage class specifier prevents you from taking the address of a variable?",
          options: ["auto", "static", "extern", "register"],
          correctIndex: 3,
          explanation: "register variables are meant to be stored in CPU registers, which have no addressable memory location, so the & operator cannot be used on them."
        },
        {
          question: "What initial value does an uninitialized auto variable have?",
          options: ["0", "NULL", "Garbage (whatever is on the stack)", "-1"],
          correctIndex: 2,
          explanation: "Uninitialized auto variables have indeterminate values — whatever bits happen to be in that stack memory location. Always initialize them."
        },
        {
          question: "What initial value does a static variable have if not explicitly initialized?",
          options: ["Garbage", "0 (zero-initialized by the C standard)", "NULL", "-1"],
          correctIndex: 1,
          explanation: "The C standard guarantees that all static-duration variables (both file-scope and static local) are zero-initialized if not explicitly initialized."
        },
        {
          question: "Is writing 'auto int x = 5;' inside a function valid C?",
          options: [
            "No — auto is not a valid keyword.",
            "Yes — it is valid but redundant since auto is the default.",
            "Yes — it changes the variable's behavior.",
            "No — auto is only for C++."
          ],
          correctIndex: 1,
          explanation: "auto is a valid storage class keyword in C, but it is the default for local variables so writing it explicitly is redundant and uncommon."
        },
        {
          question: "How do you properly share a global variable across two .c files?",
          options: [
            "Define it (without extern) in both files.",
            "Define it in one file and use extern in the other.",
            "Use static in both files.",
            "Use register in the header."
          ],
          correctIndex: 1,
          explanation: "Define the variable in exactly one .c file and declare it with extern in every other .c file (or in a shared header) that needs to use it."
        },
        {
          question: "When is a static local variable's value reset?",
          options: [
            "Each time the function is called.",
            "Each time the program is run.",
            "It is never reset unless you explicitly assign a new value.",
            "When the function's block exits."
          ],
          correctIndex: 2,
          explanation: "Static local variables persist until the program ends. Their value only changes when your code explicitly assigns to them."
        },
        {
          question: "What is the main reason register variables are rarely used in modern C?",
          options: [
            "register variables cause undefined behavior.",
            "Modern optimizing compilers are better at register allocation than programmers.",
            "register was removed in C99.",
            "register variables cannot hold floating-point values."
          ],
          correctIndex: 1,
          explanation: "Modern compilers use sophisticated algorithms to decide what lives in registers. Manual register hints are usually ignored and unnecessary."
        },
        {
          question: "What happens to an auto local variable when the function returns?",
          options: [
            "It is saved for the next call.",
            "It is moved to the heap.",
            "It goes out of scope and the stack memory is reclaimed.",
            "It is set to zero."
          ],
          correctIndex: 2,
          explanation: "When a function returns, its stack frame is popped, and all auto variables in it cease to exist — accessing them afterward is undefined behavior."
        },
        {
          question: "Which storage class would you use to hide a helper variable from other .c files?",
          options: ["auto", "extern", "static (at file scope)", "register"],
          correctIndex: 2,
          explanation: "A static file-scope variable has internal linkage, making it invisible outside the translation unit — the C equivalent of a private module variable."
        },
        {
          question: "What does 'translation unit' mean in C?",
          options: [
            "A single function.",
            "A single .c file after preprocessing.",
            "All .c files in a project.",
            "The linker's output."
          ],
          correctIndex: 1,
          explanation: "A translation unit is a single .c source file together with all the headers it includes, forming one unit that the compiler processes independently."
        },
        {
          question: "Can two functions in the same file access the same static local variable?",
          options: [
            "Yes — static locals are shared between all functions in a file.",
            "No — a static local variable is private to the function it is declared in.",
            "Yes — but only if both functions are in the same block.",
            "Only if declared with extern."
          ],
          correctIndex: 1,
          explanation: "Static local variables are scoped to the function (or block) they are declared in. They persist but are not accessible from other functions."
        },
        {
          question: "If a file-scope variable is declared without static, what linkage does it have?",
          options: [
            "Internal linkage (private to the file).",
            "External linkage (accessible from other files).",
            "No linkage.",
            "Register linkage."
          ],
          correctIndex: 1,
          explanation: "Without the static keyword, a file-scope variable has external linkage by default, meaning it can be accessed from other translation units using extern."
        },
        {
          question: "Which of the following is a practical use of a static local variable?",
          options: [
            "Storing user input that must reset each call.",
            "Counting how many times a function has been called.",
            "Sharing a value between two different functions.",
            "Dynamically allocating memory."
          ],
          correctIndex: 1,
          explanation: "A static local counter that increments each call is a classic use case — it persists across calls and is encapsulated within the function."
        }
      ]
    },
    {
      id: "topic-2-9",
      title: "Scope and Lifetime of Variables",
      estimatedReadingTime: 9,
      explanation: `Two concepts govern how variables work in time and space: scope and lifetime. Scope is about visibility — where in your source code can you refer to a variable by name? Lifetime is about existence — for how long does the memory holding the variable's value actually exist during program execution? These are related but distinct, and confusing them leads to subtle, hard-to-find bugs.

Scope in C is determined by where a declaration appears in the source code. A variable declared inside a function body (or any pair of curly braces) has block scope — it can only be used within that block and any nested inner blocks. A variable declared outside all functions has file scope — it can be used from its declaration to the end of the file. Function parameters have block scope within the function body. Understanding scope prevents the common mistake of trying to use a variable outside the region where it was declared.

When an inner block declares a variable with the same name as an outer block's variable, the inner declaration "shadows" the outer one. Inside the inner block, the name refers to the inner variable. This can cause confusion and subtle bugs because you might think you are modifying the outer variable but are actually modifying a separate local one. Most compilers can warn you about shadowing if you enable the right flags.

Lifetime describes how long a variable's storage actually exists during program execution. Local (auto) variables have automatic lifetime: they are created when their block is entered and destroyed when the block exits. Static variables (whether local or at file scope) have static lifetime: they exist for the entire duration of the program, from startup to shutdown. Dynamically allocated memory (using malloc) has dynamic lifetime: it exists from the malloc call until the corresponding free call.

The interaction between scope and lifetime is subtle and important. A static local variable has block scope (only accessible within its function) but static lifetime (it lives for the entire program). This means its value persists across calls but its name is inaccessible outside the function — encapsulation with persistence. Conversely, a global variable has file or program scope and static lifetime. Getting the right combination for each piece of data is a key skill in writing maintainable C programs.`,
      codeExample: `#include <stdio.h>

/* File scope: accessible throughout this file, static lifetime */
int global_counter = 0;

void demonstrate_scope(void) {
    int x = 10;  /* block scope, automatic lifetime */
    printf("Inside demonstrate_scope: x = %d\n", x);
    global_counter++;

    {
        /* Inner block: new scope */
        int x = 99;  /* shadows outer x */
        printf("Inner block x (shadows outer): %d\n", x);
        int y = 200; /* y only exists in this inner block */
        printf("Inner block y = %d\n", y);
    }
    /* y is gone here; original x is back */
    printf("After inner block: x = %d (original)\n", x);
    /* printf('%d', y);  -- ERROR: y is out of scope */
}

/* Function with static local */
void persistent_count(void) {
    static int calls = 0;  /* block scope, static lifetime */
    calls++;
    printf("persistent_count called %d time(s), global_counter = %d\n",
           calls, global_counter);
}

int main(void) {
    demonstrate_scope();
    demonstrate_scope();

    persistent_count();
    persistent_count();
    persistent_count();

    printf("Final global_counter = %d\n", global_counter);

    /* Loop variable scope (C99 and later) */
    for (int i = 0; i < 3; i++) {
        printf("Loop i = %d\n", i);
    }
    /* i is out of scope here */

    return 0;
}`,
      expectedOutput: `Inside demonstrate_scope: x = 10
Inner block x (shadows outer): 99
Inner block y = 200
After inner block: x = 10 (original)
Inside demonstrate_scope: x = 10
Inner block x (shadows outer): 99
Inner block y = 200
After inner block: x = 10 (original)
persistent_count called 1 time(s), global_counter = 2
persistent_count called 2 time(s), global_counter = 2
persistent_count called 3 time(s), global_counter = 2
Final global_counter = 2
Loop i = 0
Loop i = 1
Loop i = 2`,
      keyTakeaways: [
        "Scope is about name visibility in source code; lifetime is about how long memory exists at runtime.",
        "Block scope limits a variable's name to its enclosing curly-brace block.",
        "File scope makes a variable accessible from its declaration to the end of the file.",
        "Inner declarations can shadow outer ones — the inner name hides the outer one within that block.",
        "A static local variable has block scope but static lifetime — persistent across calls, hidden outside the function."
      ],
      commonMistakes: [
        "Trying to use a variable outside its scope and wondering why the compiler says it is undeclared.",
        "Accidentally shadowing an outer variable with an inner declaration and modifying the wrong one.",
        "Assuming a local variable initialized to a value in a previous call retains that value — it does not (unless static).",
        "Using a pointer to a local variable after the function returns — the memory no longer exists.",
        "Declaring all variables globally 'for convenience' and then struggling with unexpected value changes."
      ],
      bestPractices: [
        "Declare variables in the narrowest scope possible — closer to their use reduces complexity.",
        "Enable -Wshadow compiler warning to catch unintentional variable shadowing.",
        "Avoid global variables when possible; prefer passing values through function parameters.",
        "Never return a pointer to a local (auto) variable from a function — the memory is gone.",
        "Use meaningful names at different scope levels to reduce the chance of accidental shadowing."
      ],
      exercises: [
        {
          title: "Exercise 1 – Scope Detective",
          description: "Write a program with a global int x = 1, a function with a local int x = 2, and inside that function a block with int x = 3. Print x at each level. Then predict which x each printf statement accesses before running the code.",
          hint: "Each declaration of x shadows the outer one. The innermost x is active within the innermost block."
        },
        {
          title: "Exercise 2 – Lifetime Demonstration",
          description: "Write two versions of an ID generator function: one using an auto local int (resets each call) and one using a static local int (persists). Call each five times and print the result to compare their behavior.",
          hint: "The auto version should start at 1 each call; the static version should increment from the last call."
        },
        {
          title: "Exercise 3 – Scope Error Finder",
          description: "Write a program that tries to use a variable declared inside a for loop after the loop ends. Observe the compiler error. Fix it by moving the declaration before the loop. Explain in a comment why the original code fails.",
          hint: "With C99 'for(int i = 0; ...)' the variable i is scoped to the loop. To use i after the loop, declare it before the for statement."
        }
      ],
      challenge: {
        title: "Challenge – Scoped Calculator State",
        description: "Build a simple stack-based calculator state machine. Use file-scope static variables to maintain a private stack of up to 10 doubles (the data and top-of-stack index are file-private). Expose only three functions: push(double val), pop(double *out), and peek(double *out). These should return 1 on success and 0 on error (stack full or empty). In main, push several values, pop them, and demonstrate that the stack internals are completely hidden from main. Add bounds-checking and test error cases.",
        hint: "Declare static double stack[10]; and static int top = 0; at file scope. Use these inside your push/pop/peek functions. Main only calls these functions and never directly touches stack or top."
      },
      quiz: [
        {
          question: "What is 'scope' in C?",
          options: [
            "How long a variable exists in memory.",
            "Where in the source code a variable's name is visible and accessible.",
            "The memory region where a variable is stored.",
            "The storage class of a variable."
          ],
          correctIndex: 1,
          explanation: "Scope is about name visibility in the source text — which parts of the code can see and use a particular variable name."
        },
        {
          question: "What is 'lifetime' of a variable?",
          options: [
            "Where in the source code it can be accessed.",
            "How long the storage holding its value actually exists at runtime.",
            "The number of bytes it occupies.",
            "Whether it is global or local."
          ],
          correctIndex: 1,
          explanation: "Lifetime refers to the duration during program execution for which the memory holding the variable's value is valid and allocated."
        },
        {
          question: "A variable declared inside a function body has which type of scope?",
          options: ["File scope", "Global scope", "Block scope", "Function prototype scope"],
          correctIndex: 2,
          explanation: "Variables declared inside curly braces (including function bodies) have block scope — they are only visible within that block and nested blocks."
        },
        {
          question: "What is 'variable shadowing'?",
          options: [
            "A variable that stores a copy of another variable.",
            "An inner declaration using the same name as an outer variable, hiding the outer one.",
            "A global variable that overrides a local one.",
            "A pointer that points to another pointer."
          ],
          correctIndex: 1,
          explanation: "Shadowing occurs when a variable in an inner scope has the same name as one in an outer scope. The inner name takes precedence within its block, hiding the outer variable."
        },
        {
          question: "What lifetime does a local (auto) variable have?",
          options: [
            "It exists for the entire program.",
            "It exists from when its block is entered to when it is exited.",
            "It exists until the next garbage collection.",
            "It exists until the next function call."
          ],
          correctIndex: 1,
          explanation: "Auto variables have automatic lifetime — they are created on the stack when their block is entered and destroyed when the block exits."
        },
        {
          question: "A static local variable has which combination of scope and lifetime?",
          options: [
            "File scope and automatic lifetime.",
            "Block scope and static lifetime.",
            "Block scope and automatic lifetime.",
            "File scope and static lifetime."
          ],
          correctIndex: 1,
          explanation: "A static local variable is only accessible within its function (block scope) but persists for the entire program run (static lifetime)."
        },
        {
          question: "What is the lifetime of a file-scope global variable?",
          options: [
            "Until the enclosing function returns.",
            "Until the end of the block it is declared in.",
            "The entire duration of the program.",
            "Until the variable is reassigned."
          ],
          correctIndex: 2,
          explanation: "File-scope variables have static lifetime — they exist from program startup to shutdown."
        },
        {
          question: "What happens if you return a pointer to a local variable from a function?",
          options: [
            "It works because the variable is promoted to heap storage.",
            "It causes undefined behavior — the local variable no longer exists after the function returns.",
            "The pointer is automatically set to NULL.",
            "The variable is moved to file scope."
          ],
          correctIndex: 1,
          explanation: "The local variable lives on the stack frame that is discarded when the function returns. The pointer then points to memory that may be reused for something else — this is a dangling pointer."
        },
        {
          question: "Which scope does a variable declared outside all functions have?",
          options: ["Block scope", "Function scope", "File scope", "Register scope"],
          correctIndex: 2,
          explanation: "Variables declared at the top level, outside any function, have file scope — they are accessible from their declaration to the end of the translation unit."
        },
        {
          question: "In C99 and later, what is the scope of 'i' in 'for (int i = 0; i < 10; i++)'?",
          options: [
            "i is accessible throughout the entire function.",
            "i is accessible only within the for loop (including its body).",
            "i is a file-scope variable.",
            "i is accessible after the loop ends."
          ],
          correctIndex: 1,
          explanation: "When declared in the for initializer (C99 and later), the loop variable is scoped to the loop — it cannot be accessed before or after the loop."
        },
        {
          question: "What compiler warning flag helps catch unintentional variable shadowing?",
          options: ["-Wall", "-Wshadow", "-Wextra", "-Wunused"],
          correctIndex: 1,
          explanation: "-Wshadow specifically warns when a local variable shadows another variable from an outer scope."
        },
        {
          question: "Why is using global variables considered poor practice?",
          options: [
            "Global variables cannot be initialized.",
            "They make it hard to track where state changes, increasing the risk of bugs.",
            "Global variables are stored on the stack.",
            "They cannot be used with printf."
          ],
          correctIndex: 1,
          explanation: "Global variables can be read and written by any function in the file, making it difficult to reason about when and where their values change, leading to hard-to-find bugs."
        },
        {
          question: "What does 'declaring a variable in the narrowest scope' mean?",
          options: [
            "Making the variable name as short as possible.",
            "Declaring the variable inside the smallest block where it is needed.",
            "Using the smallest data type.",
            "Using register storage class."
          ],
          correctIndex: 1,
          explanation: "Limiting a variable to the smallest block where it is actually used reduces complexity, prevents accidental misuse, and makes code easier to understand and maintain."
        },
        {
          question: "Two different functions each have a local variable named 'total'. What is true?",
          options: [
            "They share the same memory location.",
            "They are completely independent variables with different memory locations.",
            "The second declaration causes a compile error.",
            "They must be declared with different types."
          ],
          correctIndex: 1,
          explanation: "Local variables in different functions are entirely independent. The same name in different functions refers to completely separate storage."
        },
        {
          question: "What is the lifetime of dynamically allocated memory (malloc)?",
          options: [
            "Until the function that called malloc returns.",
            "For the entire program.",
            "From the malloc call until the corresponding free call.",
            "Until the next block is entered."
          ],
          correctIndex: 2,
          explanation: "Heap-allocated memory (malloc) has dynamic lifetime — it exists from allocation until explicitly freed with free(), regardless of function scope."
        },
        {
          question: "Which scenario describes a dangling pointer?",
          options: [
            "A pointer that is NULL.",
            "A pointer that was never initialized.",
            "A pointer to memory that has been freed or gone out of scope.",
            "A pointer to a global variable."
          ],
          correctIndex: 2,
          explanation: "A dangling pointer refers to memory that no longer belongs to the program (freed or stack frame destroyed). Dereferencing it is undefined behavior."
        },
        {
          question: "What is true about a variable declared in an inner block with the same name as an outer block variable?",
          options: [
            "It modifies the outer variable.",
            "It is a compile error.",
            "It creates a new, independent variable that shadows the outer one within the inner block.",
            "Both variables become the same after the inner block."
          ],
          correctIndex: 2,
          explanation: "The inner declaration creates a separate variable. Within the inner block, the name refers to the inner variable. Once the inner block ends, the name again refers to the outer variable."
        },
        {
          question: "What scope do function parameters have?",
          options: ["File scope", "Global scope", "Block scope (the function body)", "They have no scope."],
          correctIndex: 2,
          explanation: "Function parameters behave like local variables with block scope limited to the function body — they are not accessible outside the function."
        },
        {
          question: "If a local variable is never initialized, what value does it contain?",
          options: [
            "0 (always zero-initialized).",
            "An indeterminate value (garbage).",
            "The value of the previously called function's local variable.",
            "NULL."
          ],
          correctIndex: 1,
          explanation: "Uninitialized automatic variables contain whatever bits happen to be in that stack memory location. This is indeterminate and should not be relied upon."
        },
        {
          question: "How does C's scoping differ from using no scoping rules at all?",
          options: [
            "Without scoping, programs run faster.",
            "Without scoping, all names would need to be unique across the entire program, and any function could accidentally change any variable.",
            "Scoping is optional in C.",
            "Without scoping, the compiler cannot compile the code."
          ],
          correctIndex: 1,
          explanation: "Scoping allows the same name to be reused in different contexts safely. Without it, every variable name would have to be globally unique and any code could interfere with any variable."
        }
      ]
    }
  ]
};
