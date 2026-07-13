import type { Lesson } from "./types";

export const lesson4: Lesson = {
  id: "lesson-4",
  title: "Lesson 4 – Functions, Arrays, Pointers, and Structs",
  description: "Master the core building blocks of C: writing reusable functions, storing collections of data in arrays, understanding memory addresses with pointers, and grouping related data into structs.",
  topics: [
    // ─────────────────────────────────────────────────────────────────────────
    // TOPIC 4-1: Functions
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "topic-4-1",
      title: "Functions — Declaration, Definition, and Calling",
      estimatedReadingTime: 10,
      explanation: `A function is a named, self-contained block of code that performs a specific task. Instead of copying the same logic everywhere you need it, you write it once as a function and call it by name whenever needed. This is the single most powerful tool for managing complexity in C programs. Good C code is a collection of well-named, single-purpose functions working together.

Every function in C has three parts: a declaration (also called a prototype), a definition (the actual implementation), and zero or more call sites (the places in code where the function is invoked). The declaration tells the compiler the function's name, what it returns, and what arguments it accepts — all before the compiler sees the definition. This allows you to call a function before its body appears in the source file.

A function prototype looks like this: return_type function_name(parameter_types);. For example, int add(int a, int b); declares a function that takes two ints and returns an int. The parameter names in a prototype are optional; only the types matter for the compiler. Placing prototypes near the top of a file (or in a header) is standard practice.

The function definition provides the body: the actual statements that run when the function is called. It looks identical to the prototype except the semicolon is replaced by a block enclosed in curly braces. Inside the body you can declare local variables, perform computations, and use a return statement to send a value back to the caller.

Calling a function is as simple as writing its name followed by parentheses containing any required arguments: int result = add(3, 7);. The program pauses the current function, jumps to the called function's body, executes it, then resumes right after the call site with the returned value substituted in.

Functions that do not return a meaningful value use the return type void. A void function still uses a return statement to exit early, but the statement has no expression: return;. Functions with a non-void return type must return a value on every path; failing to do so is undefined behaviour.

Keeping functions short, focused, and well-named makes programs dramatically easier to read, test, and maintain. Aim for each function to do one thing and do it clearly.`,
      codeExample: `#include <stdio.h>

/* --- Function prototypes (declarations) --- */
int add(int a, int b);
double average(int x, int y, int z);
void greet(void);

/* --- main calls the functions --- */
int main(void) {
    greet();

    int sum = add(10, 25);
    printf("10 + 25 = %d\\n", sum);

    double avg = average(4, 8, 12);
    printf("Average of 4, 8, 12 = %.2f\\n", avg);

    /* Functions can be used directly in expressions */
    printf("5 + 7 = %d\\n", add(5, 7));

    return 0;
}

/* --- Function definitions --- */
void greet(void) {
    printf("Hello from a function!\\n");
}

int add(int a, int b) {
    return a + b;
}

double average(int x, int y, int z) {
    return (x + y + z) / 3.0;
}`,
      expectedOutput: `Hello from a function!
10 + 25 = 35
Average of 4, 8, 12 = 8.00
5 + 7 = 12`,
      keyTakeaways: [
        "A function encapsulates a reusable block of logic under a single name.",
        "A prototype declares the return type and parameter types so the compiler knows the function's signature before its definition.",
        "The definition provides the actual body enclosed in curly braces.",
        "Call a function by writing its name with arguments in parentheses.",
        "void functions return no value; non-void functions must return the declared type.",
        "Functions improve readability, reusability, and testability of code."
      ],
      commonMistakes: [
        "Forgetting the function prototype causes a compiler warning or error when the function is called before its definition.",
        "Mismatching the return type in the prototype and the definition causes undefined behaviour.",
        "Returning a value from a void function or forgetting to return a value from a non-void function.",
        "Using the same name as a standard library function, silently shadowing it.",
        "Assuming that calling a function with the wrong number of arguments will be caught at runtime — it should be caught at compile time when prototypes are used."
      ],
      bestPractices: [
        "Always write function prototypes at the top of the file or in a header before main.",
        "Keep each function focused on a single, clearly named task.",
        "Name functions with verbs (compute_area, print_report) to make their purpose obvious.",
        "Keep function bodies short — if a function exceeds 30-40 lines, consider splitting it.",
        "Document non-obvious parameters and the return value with a brief comment above the prototype."
      ],
      exercises: [
        {
          title: "Exercise 1 – Square and Cube",
          description: "Write two functions: int square(int n) that returns n*n, and int cube(int n) that returns n*n*n. In main, read an integer from the user and print its square and cube using these functions.",
          hint: "Write prototypes above main and definitions below. Call each function with the user-supplied value."
        },
        {
          title: "Exercise 2 – Max of Three",
          description: "Write a function int max3(int a, int b, int c) that returns the largest of the three integers. Test it in main with at least three different sets of values, printing the result each time.",
          hint: "Use if-else or the ternary operator inside the function. You can find the max of a and b first, then compare that with c."
        },
        {
          title: "Exercise 3 – Celsius to Fahrenheit",
          description: "Write a function double celsius_to_fahrenheit(double c) that converts a Celsius temperature to Fahrenheit using the formula F = (C * 9.0/5.0) + 32. In main, call it for 0, 100, and -40 and print the results.",
          hint: "Use 9.0/5.0 (floating-point division) rather than 9/5 (integer division which would equal 1)."
        }
      ],
      challenge: {
        title: "Challenge – Mini Calculator",
        description: "Write four functions: add, subtract, multiply, and divide (all taking two doubles and returning a double). Handle division by zero in the divide function by printing an error message and returning 0.0. In main, present a simple menu that reads two numbers and an operator (+, -, *, /) from the user and calls the appropriate function.",
        hint: "Use a switch on the operator character. For divide, check if the second argument is 0.0 before dividing."
      },
      quiz: [
        {
          question: "What is the purpose of a function prototype in C?",
          options: [
            "To define the function body before main",
            "To inform the compiler of the function's name, return type, and parameter types before the definition appears",
            "To allocate memory for the function's local variables",
            "To prevent the function from being called more than once"
          ],
          correctIndex: 1,
          explanation: "A prototype gives the compiler the function's signature (return type and parameter types) so it can validate calls before seeing the full definition."
        },
        {
          question: "What return type should a function have if it performs an action but does not return a value?",
          options: ["int", "null", "void", "empty"],
          correctIndex: 2,
          explanation: "The void return type indicates the function does not produce a value. It still executes its body normally."
        },
        {
          question: "Where in the program does the return statement send control?",
          options: [
            "To the beginning of main",
            "To the statement immediately after the function call in the caller",
            "To the next function in the file",
            "To the operating system"
          ],
          correctIndex: 1,
          explanation: "return exits the current function and resumes execution at the call site — the line in the caller right after where the function was invoked."
        },
        {
          question: "Which of these is a valid function prototype?",
          options: [
            "int multiply(int a, int b)",
            "int multiply(int a, int b);",
            "function int multiply(int, int);",
            "def multiply(a, b) -> int:"
          ],
          correctIndex: 1,
          explanation: "A prototype ends with a semicolon. The version without the semicolon begins a definition (expecting a body in braces)."
        },
        {
          question: "What happens if a non-void function reaches the end of its body without a return statement?",
          options: [
            "It returns 0 automatically",
            "It causes a compile error in all cases",
            "It causes undefined behaviour",
            "It returns the value of the last expression evaluated"
          ],
          correctIndex: 2,
          explanation: "Falling off the end of a non-void function without returning is undefined behaviour in C. The caller receives a garbage value."
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TOPIC 4-2: Parameters, Return Values, and Pass-by-Value
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "topic-4-2",
      title: "Parameters, Return Values, and Pass-by-Value Semantics",
      estimatedReadingTime: 8,
      explanation: `Understanding how data moves into and out of functions is essential for writing correct C programs. C uses a mechanism called pass-by-value for all its basic types: when you call a function and pass an argument, C copies the value of the argument into the function's local parameter variable. The function works on this copy — the original variable in the caller is untouched.

Think of it like handing someone a photocopy of a document. They can scribble all over their copy; your original remains unchanged. This means that if a function modifies its parameter, that change is invisible to the caller. This is a safety property — functions cannot accidentally alter your variables — but it also means that to "return" multiple values or to modify the caller's variables, you need pointers (covered in topic 4-8).

A function's return value is how it hands a single result back to the caller. The return statement evaluates an expression and sends the result to the call site. The caller can capture the returned value in a variable, use it in another expression, or ignore it entirely. Ignoring the return value of a function that signals errors (like scanf) is a common mistake.

You can pass multiple arguments to a function by listing them in the parameter list, separated by commas. Each parameter acts like a local variable initialized to the copy of the caller's argument. The order of arguments must match the order of parameters in the prototype exactly.

Parameters and return values together form a function's interface — the contract between the function and its callers. A well-designed interface accepts exactly the information needed and returns exactly the information produced. Keep this interface minimal: functions that require ten arguments are often a sign that the function is doing too much.

Local variables declared inside a function exist only for the duration of that function call. They are created on the stack when the function is called and destroyed when it returns. They have no existence between calls — every new call starts with fresh, uninitialized local variables.`,
      codeExample: `#include <stdio.h>

/* Demonstrates that modifying a parameter does NOT affect the caller's variable */
void try_to_modify(int x) {
    x = 999;  /* Only the local copy changes */
    printf("Inside try_to_modify: x = %d\\n", x);
}

/* Returns the larger of two doubles */
double max_double(double a, double b) {
    if (a > b) {
        return a;
    }
    return b;
}

/* Multiple parameters — computes area of a rectangle */
double rectangle_area(double width, double height) {
    double area = width * height;  /* local variable */
    return area;
}

int main(void) {
    int original = 42;
    printf("Before call: original = %d\\n", original);
    try_to_modify(original);
    printf("After call:  original = %d\\n", original);  /* unchanged */

    double bigger = max_double(3.14, 2.71);
    printf("Max of 3.14 and 2.71 = %.2f\\n", bigger);

    double area = rectangle_area(5.0, 3.5);
    printf("Area of 5.0 x 3.5 rectangle = %.2f\\n", area);

    return 0;
}`,
      expectedOutput: `Before call: original = 42
Inside try_to_modify: x = 999
After call:  original = 42
Max of 3.14 and 2.71 = 3.14
Area of 5.0 x 3.5 rectangle = 17.50`,
      keyTakeaways: [
        "C passes function arguments by value — a copy of the argument is made for the parameter.",
        "Modifying a parameter inside a function has no effect on the caller's original variable.",
        "The return statement sends one value back to the call site.",
        "Local variables in a function exist only for the duration of that call.",
        "To modify a caller's variable from a function, you must pass a pointer to it.",
        "Keep function parameter lists minimal — functions with too many parameters often have design issues."
      ],
      commonMistakes: [
        "Expecting that changing a parameter inside a function will change the caller's variable — it will not because of pass-by-value.",
        "Forgetting that local variables are not preserved between calls — they start uninitialized each time.",
        "Ignoring the return value of functions that signal success or failure (like scanf or fopen).",
        "Returning a pointer to a local variable — the local variable is destroyed when the function returns, leaving a dangling pointer.",
        "Mixing up the order of arguments when calling a function, causing silent type coercion bugs."
      ],
      bestPractices: [
        "Use the return value to communicate the single primary result of a function.",
        "Check the return values of library functions that can fail, like scanf and malloc.",
        "Do not return pointers to local (stack) variables — they become invalid after the function returns.",
        "Prefer passing values rather than globals to keep functions independent and testable.",
        "Name parameters clearly in the definition to serve as inline documentation for callers."
      ],
      exercises: [
        {
          title: "Exercise 1 – Swap Attempt",
          description: "Write a function void swap_attempt(int a, int b) that swaps the values of a and b inside the function and prints them. Call it from main with two variables and print those variables before and after the call. Observe that the caller's variables are unchanged.",
          hint: "Use a temporary variable: int temp = a; a = b; b = temp; inside the function. This demonstrates pass-by-value."
        },
        {
          title: "Exercise 2 – Power Function",
          description: "Write a function double power(double base, int exp) that computes base raised to the power exp using a loop (do not use the math library). Handle negative exponents by returning 1.0/power(base, -exp). Test with 2.0^10, 3.0^3, and 2.0^-3.",
          hint: "Use a loop that multiplies an accumulator by base, exp times. For negative exponents, invert the result."
        },
        {
          title: "Exercise 3 – Clamp",
          description: "Write a function int clamp(int value, int min_val, int max_val) that returns value if it is between min_val and max_val, returns min_val if value is too small, and returns max_val if value is too large. Test it with several values.",
          hint: "Use if-else: first check value < min_val, then value > max_val, otherwise return value unchanged."
        }
      ],
      challenge: {
        title: "Challenge – Statistics Functions",
        description: "Write three functions: double compute_min(double a, double b, double c), double compute_max(double a, double b, double c), and double compute_mean(double a, double b, double c). In main, read three floating-point numbers from the user and call all three functions, printing the minimum, maximum, and mean with two decimal places.",
        hint: "For min and max, chain comparisons. For mean, sum the three values and divide by 3.0."
      },
      quiz: [
        {
          question: "What does pass-by-value mean in C?",
          options: [
            "The function receives the original variable and can modify it directly",
            "A copy of the argument's value is passed to the function's parameter",
            "The value is passed via a global variable",
            "The function's return value is passed back by reference"
          ],
          correctIndex: 1,
          explanation: "Pass-by-value means the function receives a copy. Changes to the parameter have no effect on the original variable in the caller."
        },
        {
          question: "What happens to a function's local variables after it returns?",
          options: [
            "They are preserved for the next call to the same function",
            "They are stored in global memory",
            "They are destroyed — they only exist for the duration of the call",
            "They are automatically returned to the caller"
          ],
          correctIndex: 2,
          explanation: "Local variables live on the stack and are destroyed when the function returns. Each new call creates fresh, uninitialized local variables."
        },
        {
          question: "What is wrong with: int *get_local(void) { int x = 5; return &x; }?",
          options: [
            "You cannot return a pointer from a function",
            "It returns a pointer to a local variable that no longer exists after the function returns",
            "int cannot be used with the address-of operator",
            "The function should be void"
          ],
          correctIndex: 1,
          explanation: "Local variable x is destroyed when the function returns. The returned pointer is dangling — accessing it is undefined behaviour."
        },
        {
          question: "If a function's return type is double but you do: return 3; what happens?",
          options: [
            "A compile error occurs",
            "The integer 3 is implicitly converted to 3.0 and returned",
            "The function returns 0.0 instead",
            "Undefined behaviour always results"
          ],
          correctIndex: 1,
          explanation: "C performs implicit type conversion: the integer 3 is promoted to the double 3.0 to match the declared return type."
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TOPIC 4-3: Recursion
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "topic-4-3",
      title: "Recursion",
      estimatedReadingTime: 9,
      explanation: `Recursion is a technique where a function calls itself to solve a smaller version of the same problem. It sounds circular, but it works because every recursive call makes progress toward a simpler case that can be solved directly — called the base case. Once the base case is reached, the chain of calls unwinds and the results are combined back up to the original call.

The classic example is factorial: n! = n × (n-1)!. To compute 5!, you compute 5 × 4!. To compute 4!, you compute 4 × 3!. This continues until you reach 1! = 1, the base case. Then 2! = 2 × 1 = 2, 3! = 3 × 2 = 6, and so on back up.

Every recursive function must have two essential ingredients. First, a base case: a condition under which the function returns a result directly without making another recursive call. Second, a recursive case: logic that breaks the problem into a simpler subproblem and calls itself with that simpler input. Without the base case, the function recurses forever until the stack overflows and the program crashes.

Each recursive call creates a new stack frame — a block of memory containing the function's parameters and local variables for that particular call. The stack frames pile up until the base case is reached, then they are popped off one by one as each call returns. This means recursion uses stack memory proportional to the depth of the recursion, which can be a limitation for very large inputs.

Many problems that are naturally recursive — traversing trees, exploring nested structures, implementing divide-and-conquer algorithms — are much cleaner to express recursively than iteratively. For simple cases like factorial or Fibonacci however, an iterative approach is usually more efficient because it avoids the overhead of function calls.

Debugging recursive functions can be tricky. A good strategy is to add printf calls showing the function's argument at each level, so you can trace the call chain and verify the base case is being reached.`,
      codeExample: `#include <stdio.h>

/* Factorial: n! = n * (n-1)! with base case 0! = 1 */
long long factorial(int n) {
    if (n <= 0) {          /* base case */
        return 1;
    }
    return n * factorial(n - 1);  /* recursive case */
}

/* Fibonacci: fib(n) = fib(n-1) + fib(n-2), fib(0)=0, fib(1)=1 */
int fibonacci(int n) {
    if (n == 0) return 0;  /* base case */
    if (n == 1) return 1;  /* base case */
    return fibonacci(n - 1) + fibonacci(n - 2);  /* recursive case */
}

/* Sum of digits: sum_digits(123) = 3 + sum_digits(12) */
int sum_digits(int n) {
    if (n < 10) return n;             /* base case: single digit */
    return (n % 10) + sum_digits(n / 10);  /* recursive case */
}

int main(void) {
    printf("5! = %lld\\n", factorial(5));
    printf("10! = %lld\\n", factorial(10));

    printf("Fibonacci(7) = %d\\n", fibonacci(7));

    printf("Sum of digits of 4823 = %d\\n", sum_digits(4823));

    return 0;
}`,
      expectedOutput: `5! = 120
10! = 3628800
Fibonacci(7) = 13
Sum of digits of 4823 = 17`,
      keyTakeaways: [
        "A recursive function calls itself with a simpler argument, making progress toward the base case.",
        "Every recursive function must have at least one base case to prevent infinite recursion.",
        "Each recursive call creates a new stack frame; deep recursion can overflow the stack.",
        "Recursion is elegant for problems that are naturally self-similar (trees, divide-and-conquer).",
        "Iterative solutions are often more efficient for simple sequences like factorial or Fibonacci.",
        "Trace the call chain with print statements to debug recursive functions."
      ],
      commonMistakes: [
        "Forgetting the base case — the function calls itself infinitely until the stack overflows.",
        "Not making progress toward the base case — the argument does not change in the right direction.",
        "Using recursion for very large inputs (e.g., fibonacci(50)) without memoization — exponential time.",
        "Returning the recursive call result without combining it correctly with the current step.",
        "Confusing the call stack depth with the actual value being computed."
      ],
      bestPractices: [
        "Always define and check the base case first in the function body.",
        "Ensure every recursive call moves closer to the base case (smaller n, reduced input).",
        "Consider an iterative approach when recursion depth could be large (thousands of levels).",
        "Use recursion where it genuinely simplifies the code; do not force it on inherently iterative problems.",
        "Add assertions or bounds checks to catch unexpectedly deep recursion during development."
      ],
      exercises: [
        {
          title: "Exercise 1 – Power via Recursion",
          description: "Write a recursive function int power(int base, int exp) that computes base raised to exp using recursion. Base case: power(base, 0) = 1. Recursive case: power(base, exp) = base * power(base, exp-1). Test with several values.",
          hint: "When exp reaches 0, return 1. Otherwise return base multiplied by the recursive call with exp-1."
        },
        {
          title: "Exercise 2 – Countdown",
          description: "Write a recursive function void countdown(int n) that prints the numbers from n down to 0, one per line, using recursion (no loops). After 0, print 'Blast off!'.",
          hint: "Print n, then call countdown(n-1). Base case: when n is negative, just return (or when n == 0, print 0 and 'Blast off!' and return)."
        },
        {
          title: "Exercise 3 – String Length Recursively",
          description: "Without using strlen, write a recursive function int my_strlen(const char *s) that returns the length of the string. Base case: if *s is the null terminator (value 0), return 0. Recursive case: return 1 + my_strlen(s+1).",
          hint: "Check if the character at the current pointer is '\\0'. If so, return 0. Otherwise return 1 plus the length of the rest of the string."
        }
      ],
      challenge: {
        title: "Challenge – Binary Search Recursively",
        description: "Write a recursive function int binary_search(int arr[], int low, int high, int target) that searches a sorted array for target. If low > high, return -1 (not found). Compute mid = (low+high)/2. If arr[mid] equals target, return mid. If arr[mid] < target, search the right half; otherwise search the left half. Test it on a sorted array of 10 integers.",
        hint: "This is a classic divide-and-conquer algorithm. Each recursive call halves the search space. Make sure to pass the adjusted low or high, not the full array bounds."
      },
      quiz: [
        {
          question: "What is the base case in a recursive function?",
          options: [
            "The first call to the function from main",
            "The condition under which the function returns directly without recursing further",
            "The largest input the function can handle",
            "The return type of the recursive call"
          ],
          correctIndex: 1,
          explanation: "The base case is the stopping condition. When reached, the function returns a result immediately instead of calling itself again."
        },
        {
          question: "What happens if a recursive function has no base case?",
          options: [
            "It returns 0 automatically",
            "It loops forever safely",
            "It calls itself indefinitely until the stack overflows, causing a crash",
            "The compiler catches it at compile time"
          ],
          correctIndex: 2,
          explanation: "Without a base case, recursion never terminates. Stack frames accumulate until the stack is exhausted, causing a stack overflow crash."
        },
        {
          question: "What does each recursive call create on the call stack?",
          options: [
            "A new global variable",
            "A new stack frame with its own local variables and parameters",
            "A copy of the entire program",
            "A heap allocation for the return value"
          ],
          correctIndex: 1,
          explanation: "Each function call (including recursive calls) pushes a new stack frame onto the call stack containing that call's parameters and local variables."
        },
        {
          question: "For computing factorial(5) recursively, which call reaches the base case first?",
          options: ["factorial(5)", "factorial(3)", "factorial(1) or factorial(0)", "factorial(2)"],
          correctIndex: 2,
          explanation: "Recursion descends through factorial(5) → (4) → (3) → (2) → (1) or (0), and the base case is n <= 0 or n == 1, which is reached last in the descent."
        },
        {
          question: "Why is the naive recursive Fibonacci function slow for large n?",
          options: [
            "Because recursion is always slower than loops",
            "Because it recomputes the same subproblems exponentially many times",
            "Because it uses too much heap memory",
            "Because it requires floating-point arithmetic"
          ],
          correctIndex: 1,
          explanation: "The naive recursive Fibonacci recalculates fibonacci(n-2) and fibonacci(n-1) repeatedly, resulting in exponential time complexity."
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TOPIC 4-4: Arrays
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "topic-4-4",
      title: "Arrays — Declaration, Initialization, Indexing, and Traversal",
      estimatedReadingTime: 9,
      explanation: `An array is a fixed-size, ordered collection of elements all of the same type, stored consecutively in memory. Instead of declaring ten separate integer variables (score1, score2, ..., score10), you declare one array and access each element by its position index. Arrays are the simplest and most widely used data structure in C.

You declare an array with a type, a name, and a size in square brackets: int scores[10]; declares an array of 10 integers. The size must be a compile-time constant in standard C (before C99 Variable Length Arrays). Memory for the array is allocated on the stack as a single contiguous block.

Array indices in C always start at zero. The first element is scores[0], the second is scores[1], and the last element of a 10-element array is scores[9]. This off-by-one reality is crucial to remember — accessing scores[10] on a 10-element array is out of bounds and causes undefined behaviour (often a crash or corruption).

You can initialize an array at declaration time using a brace-enclosed list: int scores[5] = {90, 85, 78, 92, 88};. If you provide fewer initializers than the array size, the remaining elements are automatically zero-initialized: int counts[5] = {1, 2}; gives {1, 2, 0, 0, 0}. If you provide no size but give an initializer list, the compiler deduces the size: int primes[] = {2, 3, 5, 7, 11}; creates an array of 5 elements.

Traversing an array — visiting each element — is almost always done with a for loop. The loop variable acts as the index, starting at 0 and going up to (but not including) the array size. The pattern int arr[N]; for (int i = 0; i < N; i++) { ... arr[i] ... } is so fundamental in C that you will write it dozens of times in any real program.

C does not check array bounds at runtime. Accessing an element outside the declared size silently reads or writes whatever happens to be in adjacent memory, which causes unpredictable and hard-to-debug bugs. You are responsible for ensuring your indices are always in the valid range [0, size-1].`,
      codeExample: `#include <stdio.h>

#define SIZE 6

int main(void) {
    /* Declaration and full initialization */
    int scores[SIZE] = {72, 88, 95, 61, 83, 77};

    /* Traversal: print all elements */
    printf("Scores: ");
    for (int i = 0; i < SIZE; i++) {
        printf("%d ", scores[i]);
    }
    printf("\\n");

    /* Compute the sum and average */
    int sum = 0;
    for (int i = 0; i < SIZE; i++) {
        sum += scores[i];
    }
    printf("Sum = %d, Average = %.1f\\n", sum, (double)sum / SIZE);

    /* Find the maximum */
    int max = scores[0];
    for (int i = 1; i < SIZE; i++) {
        if (scores[i] > max) {
            max = scores[i];
        }
    }
    printf("Maximum = %d\\n", max);

    /* Partial initialization: remaining elements are 0 */
    int counts[5] = {10, 20};
    printf("counts: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", counts[i]);
    }
    printf("\\n");

    /* Modify an element */
    scores[2] = 100;
    printf("After updating index 2: scores[2] = %d\\n", scores[2]);

    return 0;
}`,
      expectedOutput: `Scores: 72 88 95 61 83 77 
Sum = 476, Average = 79.3
Maximum = 95
counts: 10 20 0 0 0 
After updating index 2: scores[2] = 100`,
      keyTakeaways: [
        "An array stores elements of the same type in a contiguous block of memory.",
        "Array indices start at 0; the last valid index is size-1.",
        "Declare with type name[size]; initialize with = {v1, v2, ...};.",
        "Unspecified initializer elements are zero-initialized.",
        "Use a for loop from 0 to size-1 to traverse all elements.",
        "C does not check bounds — out-of-bounds access is undefined behaviour."
      ],
      commonMistakes: [
        "Using size as the last valid index — the last valid index is size-1, not size.",
        "Forgetting that arrays start at index 0, leading to off-by-one errors in loops.",
        "Accessing beyond the array bounds silently corrupts memory instead of giving an error.",
        "Comparing arrays with == — this compares pointers, not element-by-element contents.",
        "Using an uninitialized array element — the value is garbage until explicitly set."
      ],
      bestPractices: [
        "Always use a named constant or macro for the array size to keep loops and declarations in sync.",
        "Initialize arrays at declaration time when possible to avoid garbage values.",
        "Loop from 0 to size-1 inclusive; never use <= size as the loop condition.",
        "Pass the array size alongside the array to every function that receives the array.",
        "Use sizeof(arr)/sizeof(arr[0]) to compute the number of elements if the size is not stored separately."
      ],
      exercises: [
        {
          title: "Exercise 1 – Array Statistics",
          description: "Declare an array of 8 integers and initialize it with any values. Write a loop to compute and print the minimum value, maximum value, sum, and average of the array.",
          hint: "Initialize min and max to the first element (index 0) before the loop, then update them as you iterate."
        },
        {
          title: "Exercise 2 – Reverse an Array",
          description: "Declare an array of 5 integers. Write code to reverse the array in-place (swap the first and last, then the second and second-to-last, etc.) and print the reversed array.",
          hint: "Use two indices: one starting at 0 and one at size-1, moving toward each other. Swap arr[i] and arr[j] using a temporary variable."
        },
        {
          title: "Exercise 3 – Count Occurrences",
          description: "Initialize an array of 10 integers. Read a target integer from the user and count how many times it appears in the array. Print the count.",
          hint: "Use a counter variable, loop through the array, and increment the counter whenever arr[i] equals the target."
        }
      ],
      challenge: {
        title: "Challenge – Bubble Sort",
        description: "Implement bubble sort: repeatedly pass through an array, comparing adjacent elements and swapping them if they are in the wrong order. Continue until no swaps occur in a full pass. Print the array before and after sorting. Aim for the optimized version that stops early when no swaps occur.",
        hint: "Use a boolean flag 'swapped'. At the start of each pass set it to 0 (false). If any swap occurs, set it to 1 (true). After the pass, if swapped is still 0, break out of the outer loop."
      },
      quiz: [
        {
          question: "What is the index of the first element of an array in C?",
          options: ["1", "-1", "0", "Depends on the type"],
          correctIndex: 2,
          explanation: "C arrays are zero-indexed. The first element is always at index 0, and the last element of a size-N array is at index N-1."
        },
        {
          question: "What is the last valid index of an array declared as int arr[8]?",
          options: ["8", "9", "7", "6"],
          correctIndex: 2,
          explanation: "With 8 elements at indices 0 through 7, the last valid index is 7. Accessing arr[8] is out of bounds."
        },
        {
          question: "What value do unspecified elements get when an array is partially initialized?",
          options: ["Random garbage", "The value of the last specified element", "Zero", "Negative one"],
          correctIndex: 2,
          explanation: "When you provide fewer initializers than the array size, C zero-initializes the remaining elements."
        },
        {
          question: "What happens when you access arr[10] on a 10-element array?",
          options: [
            "C returns 0 safely",
            "A compile error occurs",
            "Undefined behaviour — reading or writing memory outside the array",
            "The program prints an error and continues"
          ],
          correctIndex: 2,
          explanation: "C does not perform bounds checking at runtime. Accessing out-of-bounds memory is undefined behaviour and typically causes corruption or crashes."
        },
        {
          question: "How do you determine the number of elements in an array arr of type int?",
          options: [
            "arr.length",
            "sizeof(arr)",
            "sizeof(arr) / sizeof(arr[0])",
            "strlen(arr)"
          ],
          correctIndex: 2,
          explanation: "sizeof(arr) gives the total bytes of the array; dividing by sizeof(arr[0]) (bytes per element) yields the element count."
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TOPIC 4-5: Multi-dimensional Arrays
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "topic-4-5",
      title: "Multi-dimensional Arrays",
      estimatedReadingTime: 8,
      explanation: `A multi-dimensional array is essentially an array of arrays. The most common case is a two-dimensional (2D) array, which you can think of as a grid or table with rows and columns. A 2D array is declared with two size specifiers: int matrix[3][4]; declares a 3-row, 4-column grid of integers — 12 elements total.

Internally, C stores all elements of a 2D array in a single contiguous block of memory in row-major order: all elements of row 0 come first, then row 1, then row 2, and so on. This means matrix[0][0], matrix[0][1], matrix[0][2], matrix[0][3] are stored in sequence, followed by matrix[1][0], and so on. Understanding this layout matters for performance: iterating by row (varying the column index in the inner loop) accesses memory sequentially, which is cache-friendly and fast.

You access an element in a 2D array with two index expressions: matrix[row][col]. Both indices are zero-based. So matrix[0][0] is the top-left corner and matrix[2][3] is the bottom-right of a 3×4 matrix.

Initializing a 2D array at declaration uses nested brace lists: int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};. Each inner list initializes one row. Like 1D arrays, any omitted elements are zero-initialized.

Traversal of a 2D array uses nested loops — the outer loop iterates over rows, the inner loop over columns. This is the standard pattern: for (int r = 0; r < ROWS; r++) { for (int c = 0; c < COLS; c++) { ... grid[r][c] ... } }.

C supports arrays with more than two dimensions, but 3D and higher arrays are rarely needed and can quickly become confusing. Most problems that seem to require 3D arrays are better solved with arrays of structs or dynamically allocated structures.`,
      codeExample: `#include <stdio.h>

#define ROWS 3
#define COLS 4

int main(void) {
    /* Declare and initialize a 3x4 integer matrix */
    int matrix[ROWS][COLS] = {
        { 1,  2,  3,  4},
        { 5,  6,  7,  8},
        { 9, 10, 11, 12}
    };

    /* Print the matrix row by row */
    printf("Matrix:\\n");
    for (int r = 0; r < ROWS; r++) {
        for (int c = 0; c < COLS; c++) {
            printf("%4d", matrix[r][c]);
        }
        printf("\\n");
    }

    /* Compute the sum of all elements */
    int total = 0;
    for (int r = 0; r < ROWS; r++) {
        for (int c = 0; c < COLS; c++) {
            total += matrix[r][c];
        }
    }
    printf("Sum of all elements: %d\\n", total);

    /* Print the diagonal elements (only valid for square sub-region) */
    printf("Diagonal: ");
    for (int i = 0; i < ROWS; i++) {
        printf("%d ", matrix[i][i]);
    }
    printf("\\n");

    /* Identity-like: a 3x3 zero-initialized then set diagonal */
    int identity[3][3] = {0};
    for (int i = 0; i < 3; i++) {
        identity[i][i] = 1;
    }
    printf("Identity matrix:\\n");
    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) {
            printf("%d ", identity[r][c]);
        }
        printf("\\n");
    }

    return 0;
}`,
      expectedOutput: `Matrix:
   1   2   3   4
   5   6   7   8
   9  10  11  12
Sum of all elements: 78
Diagonal: 1 6 11 
Identity matrix:
1 0 0 
0 1 0 
0 0 1 `,
      keyTakeaways: [
        "A 2D array is declared as type name[ROWS][COLS] and accessed with two indices.",
        "C stores 2D arrays in row-major order — all elements of row 0, then row 1, and so on.",
        "Both indices are zero-based; valid row indices are 0 to ROWS-1.",
        "Use nested loops to traverse a 2D array: outer loop for rows, inner for columns.",
        "Iterate in row-major order (inner loop over columns) for cache-friendly access.",
        "Partial initializer lists zero-initialize the remaining elements."
      ],
      commonMistakes: [
        "Swapping row and column indices, causing incorrect element access.",
        "Using the same loop variable for both the row and column loops — always use distinct variables.",
        "Exceeding either dimension's bound — out-of-bounds access is undefined behaviour.",
        "Confusing matrix[r][c] with matrix[r,c] — the comma form is a comma expression, not 2D indexing.",
        "Iterating column-major (outer loop over columns) for large matrices — this is cache-inefficient."
      ],
      bestPractices: [
        "Define ROWS and COLS as named constants or macros to keep declarations and loops synchronized.",
        "Always iterate in row-major order (varying the column index in the inner loop) for best cache performance.",
        "Initialize 2D arrays with brace-enclosed inner lists for clarity even when all zeros are desired.",
        "When passing 2D arrays to functions, specify all dimensions except the first in the parameter declaration.",
        "Consider using a 1D array with manual index arithmetic (row*COLS + col) for more flexible 2D data."
      ],
      exercises: [
        {
          title: "Exercise 1 – Matrix Transpose",
          description: "Declare a 3×3 integer matrix, initialize it with any values, and print it. Then compute its transpose into a second 3×3 matrix (swap rows and columns: transposed[c][r] = original[r][c]) and print the transposed matrix.",
          hint: "Use a nested loop where the outer index goes over rows (0 to 2) and the inner over columns (0 to 2), assigning transposed[c][r] = original[r][c]."
        },
        {
          title: "Exercise 2 – Row Sums",
          description: "Declare a 4×5 integer matrix with any initial values. For each row, compute and print the sum of that row's elements. Also compute and print the grand total.",
          hint: "For each row r, use an inner loop over columns to accumulate the row sum. Reset the row sum to 0 at the start of each outer iteration."
        },
        {
          title: "Exercise 3 – Multiplication Table",
          description: "Use a 10×10 2D array to store the multiplication table (table[i][j] = (i+1)*(j+1)). Print it in a formatted grid so columns are aligned.",
          hint: "Fill the array with nested loops first, then print with nested loops using printf(\"%4d\", table[i][j]) for alignment."
        }
      ],
      challenge: {
        title: "Challenge – Matrix Multiplication",
        description: "Write a program that multiplies two 3×3 integer matrices A and B and stores the result in a third matrix C. The formula is C[i][j] = sum over k of A[i][k] * B[k][j]. Initialize A and B with your own values, compute C, and print all three matrices.",
        hint: "You need three nested loops: outer over i (rows of A), middle over j (columns of B), inner over k (shared dimension). Initialize each C[i][j] to 0 before the k loop."
      },
      quiz: [
        {
          question: "How is a 2D array stored in memory in C?",
          options: [
            "Column-major order (all of column 0 first, then column 1, etc.)",
            "Row-major order (all of row 0 first, then row 1, etc.)",
            "Randomly, based on the compiler",
            "As a linked list of rows"
          ],
          correctIndex: 1,
          explanation: "C uses row-major storage: elements of row 0 are contiguous, followed immediately by elements of row 1, and so on."
        },
        {
          question: "How do you access the element in the second row, third column of matrix?",
          options: ["matrix[3][2]", "matrix[2][3]", "matrix[1][2]", "matrix[2][1]"],
          correctIndex: 2,
          explanation: "Rows and columns are zero-indexed. Second row is index 1, third column is index 2, giving matrix[1][2]."
        },
        {
          question: "What is the total number of elements in int grid[4][6]?",
          options: ["10", "46", "24", "12"],
          correctIndex: 2,
          explanation: "A 4-row, 6-column array has 4 × 6 = 24 elements."
        },
        {
          question: "Which loop order is more cache-efficient for a 2D array in C?",
          options: [
            "Outer loop over columns, inner loop over rows",
            "Outer loop over rows, inner loop over columns",
            "Both are equally efficient",
            "Single loop with manual index arithmetic"
          ],
          correctIndex: 1,
          explanation: "Row-major storage means adjacent memory locations differ by one column. Varying the column in the inner loop accesses sequential addresses, maximising cache hits."
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TOPIC 4-6: Strings and Character Arrays
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "topic-4-6",
      title: "Strings and Character Arrays",
      estimatedReadingTime: 9,
      explanation: `In C, there is no built-in string type. A string is simply an array of characters (type char) with a special convention: the last meaningful character is followed by a null terminator, the character with value 0 written as '\\0'. This null terminator signals the end of the string to all standard library functions. Without it, functions like printf and strlen would not know where the string ends.

A string literal in C source code is written as a sequence of characters enclosed in double quotes: "Hello". The compiler automatically appends the null terminator, so "Hello" is 6 bytes: 'H', 'e', 'l', 'l', 'o', '\\0'. String literals are stored in read-only memory (the data segment). Attempting to modify a string literal is undefined behaviour.

To work with a mutable string — one you can modify — you declare a char array large enough to hold the characters plus the null terminator: char name[20]; or char greeting[6] = "Hello"; (the compiler fills in the null). You can also write the initializer element by element: char greeting[] = {'H','e','l','l','o','\\0'};, though the string literal form is cleaner.

Reading a string from the user with scanf and the %s format specifier is common but dangerous: it does not limit how many characters are read, so a long input overflows the buffer. The safer alternative is fgets(buffer, sizeof(buffer), stdin), which reads at most sizeof(buffer)-1 characters and always null-terminates the result.

Printing a string uses printf with the %s format specifier. printf("%s\\n", greeting); scans from the pointer given until it finds '\\0' and prints each character. This is why every string buffer you pass to printf must be properly null-terminated.

Strings in C require careful memory management. You must always allocate at least strlen(s)+1 bytes to store a copy of string s. Forgetting the +1 for the null terminator is one of the most common bugs in C programs.`,
      codeExample: `#include <stdio.h>
#include <string.h>

int main(void) {
    /* String literal — stored in read-only memory */
    const char *literal = "Hello, World!";
    printf("Literal: %s\\n", literal);
    printf("Length:  %zu\\n", strlen(literal));

    /* Character array — mutable string */
    char greeting[20] = "Hello";
    printf("Greeting: %s\\n", greeting);

    /* Modify the mutable array */
    greeting[0] = 'J';
    greeting[1] = 'e';
    greeting[2] = 'l';
    greeting[3] = 'l';
    greeting[4] = 'o';
    greeting[5] = '\\0';  /* ensure null termination */
    printf("Modified: %s\\n", greeting);

    /* Initialize character by character */
    char vowels[] = {'a', 'e', 'i', 'o', 'u', '\\0'};
    printf("Vowels: %s\\n", vowels);

    /* Reading a string safely with scanf width limiter */
    char name[10] = "Alice";    /* pre-filled for demonstration */
    printf("Name has %zu characters\\n", strlen(name));

    /* Traverse a string character by character */
    printf("Characters of greeting: ");
    for (int i = 0; greeting[i] != '\\0'; i++) {
        printf("'%c' ", greeting[i]);
    }
    printf("\\n");

    return 0;
}`,
      expectedOutput: `Literal: Hello, World!
Length:  13
Greeting: Hello
Modified: Jello
Vowels: aeiou
Name has 5 characters
Characters of greeting: 'J' 'e' 'l' 'l' 'o' `,
      keyTakeaways: [
        "A C string is a char array terminated by a null character '\\0'.",
        "String literals are read-only; declare char arrays for mutable strings.",
        "Always allocate strlen(s)+1 bytes to store a copy of string s.",
        "Use %s with printf/scanf to print/read strings; always ensure null termination.",
        "fgets is safer than scanf %s because it limits the number of characters read.",
        "Traversal loops can use greeting[i] != '\\0' as the condition instead of a length counter."
      ],
      commonMistakes: [
        "Forgetting the null terminator when building a string character by character.",
        "Allocating strlen(s) bytes instead of strlen(s)+1, causing the null terminator to overwrite adjacent memory.",
        "Trying to modify a string literal — this is undefined behaviour.",
        "Using scanf %s without a width limit allows buffer overflow with long inputs.",
        "Comparing strings with == instead of strcmp — == compares pointers, not string contents."
      ],
      bestPractices: [
        "Always null-terminate character arrays that are used as strings.",
        "Use fgets instead of scanf %s for user input to prevent buffer overflows.",
        "Declare string buffers large enough to hold the longest expected input plus the null terminator.",
        "Use const char * for string literals and function parameters that should not be modified.",
        "Use the string.h library functions (strcmp, strcpy, strcat) rather than reinventing them."
      ],
      exercises: [
        {
          title: "Exercise 1 – Count Vowels",
          description: "Write a program that reads a string (up to 99 characters) with fgets into a char array and counts the number of vowels (a, e, i, o, u — both upper and lower case). Print the count.",
          hint: "Loop through the string with index i until you reach '\\0'. Check if each character matches any vowel using a series of || comparisons or strcmp."
        },
        {
          title: "Exercise 2 – Reverse a String In-Place",
          description: "Write a function void reverse_string(char *s) that reverses a string in place (no extra array). Use two indices (one at the start, one at the end) and swap characters until they meet in the middle.",
          hint: "Use strlen to find the end index. Swap s[left] and s[right], then move left forward and right backward."
        },
        {
          title: "Exercise 3 – Is Palindrome",
          description: "Write a function int is_palindrome(const char *s) that returns 1 if the string is the same forwards and backwards, and 0 otherwise. Ignore case for the comparison. Test with 'racecar', 'hello', and 'madam'.",
          hint: "Compare s[i] and s[len-1-i] using tolower() (from <ctype.h>) for case-insensitive comparison. Return 0 as soon as a mismatch is found."
        }
      ],
      challenge: {
        title: "Challenge – Word Count",
        description: "Write a program that reads a full line of text (up to 255 characters) with fgets and counts the number of words. A word is a maximal sequence of non-whitespace characters. Also count the total number of characters (excluding the newline) and the number of sentences (count '.', '!', and '?' as sentence terminators). Print all three counts.",
        hint: "Track a boolean 'in_word' flag. When you transition from whitespace to non-whitespace, increment the word count and set in_word=1. When you transition back, clear in_word."
      },
      quiz: [
        {
          question: "What marks the end of a C string?",
          options: ["A space character", "The null character '\\0' (value 0)", "A newline '\\n'", "A semicolon"],
          correctIndex: 1,
          explanation: "C strings are null-terminated: the character with value 0, written '\\0', signals the end to all string functions."
        },
        {
          question: "How many bytes does the string literal \"cat\" occupy in memory?",
          options: ["3", "4", "5", "2"],
          correctIndex: 1,
          explanation: "'c', 'a', 't', and the null terminator '\\0' require 4 bytes total."
        },
        {
          question: "What is wrong with: char *s = \"hello\"; s[0] = 'H';?",
          options: [
            "You cannot assign a string literal to a char pointer",
            "Modifying a string literal is undefined behaviour — they are read-only",
            "char * is the wrong type for strings",
            "The index 0 is invalid for strings"
          ],
          correctIndex: 1,
          explanation: "String literals are placed in read-only memory. Attempting to modify them is undefined behaviour, typically causing a segmentation fault."
        },
        {
          question: "Why is scanf(\"%s\", buffer) considered unsafe?",
          options: [
            "It cannot read strings containing letters",
            "It stops reading at whitespace, losing the rest of the line",
            "It reads without a length limit, allowing buffer overflow",
            "It requires a newline at the end"
          ],
          correctIndex: 2,
          explanation: "Without a width specifier, %s reads until whitespace with no limit, potentially writing past the end of the buffer."
        },
        {
          question: "How do you correctly compare two strings in C?",
          options: [
            "if (str1 == str2)",
            "if (str1 = str2)",
            "if (strcmp(str1, str2) == 0)",
            "if (str1.equals(str2))"
          ],
          correctIndex: 2,
          explanation: "== compares pointers (addresses), not contents. strcmp compares the characters of two strings and returns 0 if they are equal."
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TOPIC 4-7: String Library Functions (string.h)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "topic-4-7",
      title: "String Library Functions (string.h)",
      estimatedReadingTime: 8,
      explanation: `The C standard library provides a rich set of string manipulation functions in the <string.h> header. These functions handle the common operations you need on null-terminated char arrays: measuring length, copying, concatenating, comparing, searching, and more. Using these library functions is safer and more readable than re-implementing the same logic by hand.

The most fundamental string function is strlen(s), which returns the number of characters in string s, not counting the null terminator. The return type is size_t, an unsigned integer type. strlen is O(n) — it must scan the entire string to count characters — so avoid calling it repeatedly in the condition of a loop when the string does not change.

To copy a string, use strcpy(dest, src), which copies src (including the null terminator) into dest. You must ensure dest is large enough to hold strlen(src)+1 characters, or you will have a buffer overflow. The safer alternative is strncpy(dest, src, n), which copies at most n characters. However, strncpy does not guarantee null termination if src is at least n characters long, so many programmers follow it with dest[n-1] = '\\0'.

Concatenation is done with strcat(dest, src), which appends src to the end of dest (starting from dest's null terminator). Again, dest must have enough space for the combined string. strncat(dest, src, n) appends at most n characters and always null-terminates.

String comparison uses strcmp(s1, s2). It returns 0 if the strings are equal, a negative integer if s1 comes before s2 alphabetically, and a positive integer if s1 comes after. strncmp(s1, s2, n) compares at most n characters. There is also strcasecmp (not in standard C but common on Linux) or toupper/tolower loops for case-insensitive comparison.

To search within a string, strchr(s, c) returns a pointer to the first occurrence of character c in s, or NULL if not found. strstr(s1, s2) finds the first occurrence of substring s2 inside s1. These search functions return pointers into the original string, not copies, so the results are valid as long as the original string is alive.`,
      codeExample: `#include <stdio.h>
#include <string.h>

int main(void) {
    char src[] = "Hello";
    char dest[30];

    /* strlen */
    printf("Length of '%s': %zu\\n", src, strlen(src));

    /* strcpy */
    strcpy(dest, src);
    printf("After strcpy: '%s'\\n", dest);

    /* strcat */
    strcat(dest, ", World!");
    printf("After strcat: '%s'\\n", dest);
    printf("New length: %zu\\n", strlen(dest));

    /* strcmp */
    char a[] = "apple";
    char b[] = "banana";
    int cmp = strcmp(a, b);
    if (cmp < 0)       printf("'%s' comes before '%s'\\n", a, b);
    else if (cmp > 0)  printf("'%s' comes after '%s'\\n",  a, b);
    else               printf("Strings are equal\\n");

    /* strncpy — copy at most 3 chars */
    char partial[10];
    strncpy(partial, "Programming", 6);
    partial[6] = '\\0';  /* manual null termination */
    printf("strncpy(6 chars): '%s'\\n", partial);

    /* strchr — find first occurrence of a character */
    char sentence[] = "Find the needle here";
    char *pos = strchr(sentence, 'n');
    if (pos) printf("First 'n' at offset %ld\\n", pos - sentence);

    /* strstr — find a substring */
    char *sub = strstr(sentence, "needle");
    if (sub) printf("'needle' found at offset %ld\\n", sub - sentence);

    return 0;
}`,
      expectedOutput: `Length of 'Hello': 5
After strcpy: 'Hello'
After strcat: 'Hello, World!'
New length: 13
'apple' comes before 'banana'
strncpy(6 chars): 'Progra'
First 'n' at offset 7
'needle' found at offset 9`,
      keyTakeaways: [
        "strlen returns the character count NOT including the null terminator.",
        "strcpy and strcat require the destination buffer to be large enough — they do not check.",
        "strcmp returns 0 for equal strings, negative if s1 < s2, positive if s1 > s2.",
        "strchr finds a character; strstr finds a substring — both return pointers or NULL.",
        "strncpy copies at most n characters; manually null-terminate the result to be safe.",
        "Always #include <string.h> to use these functions."
      ],
      commonMistakes: [
        "Calling strcpy or strcat with a destination too small — causes a buffer overflow.",
        "Assuming strncpy always null-terminates — it does not when the source length >= n.",
        "Using strlen in a loop condition causing O(n²) performance when n is large.",
        "Comparing strings with == instead of strcmp — this compares pointers, not content.",
        "Forgetting to check whether strchr or strstr returned NULL before using the result."
      ],
      bestPractices: [
        "Always ensure destination buffers are large enough (strlen(src)+1 for strcpy; combined+1 for strcat).",
        "Prefer strncat and strncpy over their unchecked variants, and always manually null-terminate.",
        "Store strlen result in a variable outside a loop instead of calling it on every iteration.",
        "Check the return value of strchr and strstr for NULL before dereferencing.",
        "Use snprintf for building strings by formatting — it limits output and always null-terminates."
      ],
      exercises: [
        {
          title: "Exercise 1 – String Utilities",
          description: "Write a program that reads two strings from the user (each at most 49 chars). Print: the length of each, their concatenation, and whether they are equal (use strcmp). Then print which one comes first alphabetically.",
          hint: "Use strlen, strcat (into a buffer large enough for both), and strcmp. Check if strcmp returns 0 for equality or negative/positive for order."
        },
        {
          title: "Exercise 2 – Count a Character",
          description: "Write a function int count_char(const char *s, char c) that uses strchr in a loop to count how many times character c appears in string s. Do not use a plain loop — use strchr to find each occurrence and advance past it.",
          hint: "Start with a pointer set to s. Call strchr(ptr, c). If non-NULL, increment count and advance ptr to pos+1. Repeat until strchr returns NULL."
        },
        {
          title: "Exercise 3 – Safe String Copy",
          description: "Write a function void safe_copy(char *dest, size_t dest_size, const char *src) that copies at most dest_size-1 characters from src to dest and always null-terminates dest. Test it with a destination buffer smaller than the source.",
          hint: "Use strncpy(dest, src, dest_size - 1) then set dest[dest_size - 1] = '\\0'."
        }
      ],
      challenge: {
        title: "Challenge – Simple String Tokenizer",
        description: "Without using strtok, write a function that scans a string and extracts words separated by spaces. Store each word in a 2D char array (up to 20 words of 30 chars each). Print each word on its own line and print the total word count. Use strchr to find spaces and strncpy to copy each word.",
        hint: "Track the start of the current word. When you find a space (or the null terminator), compute the word length as (pos - start), use strncpy to copy it, null-terminate it, then advance start past the separator."
      },
      quiz: [
        {
          question: "What does strlen(\"hello\") return?",
          options: ["6", "5", "4", "7"],
          correctIndex: 1,
          explanation: "strlen counts characters up to but NOT including the null terminator, so 'h','e','l','l','o' = 5."
        },
        {
          question: "What does strcmp(\"abc\", \"abd\") return?",
          options: [
            "0 (strings are equal)",
            "A negative value (\"abc\" comes before \"abd\")",
            "A positive value (\"abc\" comes after \"abd\")",
            "1 always"
          ],
          correctIndex: 1,
          explanation: "Comparing character by character: 'a'='a', 'b'='b', 'c' < 'd', so \"abc\" sorts before \"abd\" and strcmp returns a negative value."
        },
        {
          question: "What is the risk of using strcat without checking buffer size?",
          options: [
            "It may return NULL instead of the concatenated string",
            "It may write past the end of the destination buffer, causing a buffer overflow",
            "It may silently truncate the result",
            "It may compare rather than concatenate"
          ],
          correctIndex: 1,
          explanation: "strcat appends without bounds checking. If the destination is too small, it writes into adjacent memory, causing a buffer overflow."
        },
        {
          question: "What does strchr(s, 'x') return if 'x' is not in the string s?",
          options: ["0", "NULL", "-1", "An empty string"],
          correctIndex: 1,
          explanation: "strchr returns NULL when the character is not found. Always check for NULL before using the returned pointer."
        },
        {
          question: "Which header must you include to use strlen, strcpy, and strcmp?",
          options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<ctype.h>"],
          correctIndex: 2,
          explanation: "All standard string manipulation functions are declared in <string.h>."
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TOPIC 4-8: Pointers
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "topic-4-8",
      title: "Pointers — Addresses, Declaration, and Basic Usage",
      estimatedReadingTime: 12,
      explanation: `A pointer is a variable that holds a memory address. Every variable in a C program lives at some address in memory — a numbered location where its bytes are stored. The address-of operator & retrieves that address. The dereference operator * follows a pointer to the value stored at the address it holds. These two operators are the foundation of all pointer usage in C.

When you write int x = 42;, the compiler assigns x some address — say, address 1000. The value 42 is stored at that address. Now if you write int *p = &x;, you declare a pointer p of type "pointer to int" and initialize it with the address of x. Now p holds 1000. Dereferencing with *p retrieves the value at address 1000, which is 42. And crucially, assigning *p = 99; stores 99 at address 1000 — modifying x through the pointer.

Pointer declaration uses an asterisk between the type and the name: int *p; declares p as a pointer to an integer. The type before the asterisk is the pointed-to type — it tells the compiler what kind of data lives at the address, and it controls how many bytes are read/written when you dereference. char *cp; points to a single byte; double *dp; points to 8 bytes.

Pointers are the mechanism that enables a function to modify the caller's variables. Pass-by-value gives a function a copy; to give a function the ability to modify the original, you pass the address. Inside the function, dereference the pointer to read or write the original. This is the only way to "return" multiple values from a C function without using global variables.

A null pointer is a pointer set to a zero address, written NULL (defined in <stddef.h> and most standard headers). It is used to represent "no valid address". You should initialize pointers to NULL when they do not yet point to anything, and check for NULL before dereferencing.

Pointer pitfalls are among the most notorious bugs in C: uninitialized pointers (holding garbage addresses), null pointer dereferences (crashing immediately), and dangling pointers (pointing to freed or out-of-scope memory). Working carefully with initialization and lifetime prevents all of these.`,
      codeExample: `#include <stdio.h>

/* A function that modifies the caller's variable via a pointer */
void double_value(int *p) {
    *p = *p * 2;   /* modify the value AT the address */
}

/* A function that "returns" two values via output pointers */
void min_max(int a, int b, int *out_min, int *out_max) {
    if (a < b) {
        *out_min = a;
        *out_max = b;
    } else {
        *out_min = b;
        *out_max = a;
    }
}

int main(void) {
    int x = 10;
    int *p = &x;   /* p points to x */

    printf("x = %d\\n", x);
    printf("&x (address of x) = %p\\n", (void *)&x);
    printf("p  (value of p)   = %p\\n", (void *)p);
    printf("*p (dereferenced) = %d\\n", *p);

    *p = 99;  /* modify x through p */
    printf("After *p = 99: x = %d\\n", x);

    double_value(&x);
    printf("After double_value: x = %d\\n", x);

    int lo, hi;
    min_max(17, 4, &lo, &hi);
    printf("min = %d, max = %d\\n", lo, hi);

    /* NULL pointer — safe to declare, NEVER dereference */
    int *null_ptr = NULL;
    printf("null_ptr is NULL: %s\\n", null_ptr == NULL ? "yes" : "no");

    return 0;
}`,
      expectedOutput: `x = 10
&x (address of x) = 0x... (varies by run)
p  (value of p)   = 0x... (same address)
*p (dereferenced) = 10
After *p = 99: x = 99
After double_value: x = 198
min = 4, max = 17
null_ptr is NULL: yes`,
      keyTakeaways: [
        "A pointer stores a memory address — the location of another variable.",
        "& (address-of) gives the address of a variable; * (dereference) gives the value at an address.",
        "Declare a pointer with type *name; e.g., int *p; is a pointer to int.",
        "Dereferencing (*p) lets you read or write the variable the pointer points to.",
        "Pass a pointer to a function to allow it to modify the caller's variable.",
        "Always initialize pointers to NULL and check for NULL before dereferencing."
      ],
      commonMistakes: [
        "Dereferencing an uninitialized pointer — it holds a random address and the program will crash or corrupt memory.",
        "Forgetting the & when passing a variable to a function that expects a pointer (e.g., scanf).",
        "Confusing the pointer variable itself (address) with the value it points to (dereference).",
        "Dereferencing a NULL pointer — always check before using.",
        "Using a pointer after the variable it points to has gone out of scope (dangling pointer)."
      ],
      bestPractices: [
        "Initialize every pointer to NULL at declaration if you do not have a valid address yet.",
        "Check pointers for NULL before dereferencing them, especially return values from functions.",
        "Use meaningful names for pointer variables (e.g., count_ptr or p_score) to distinguish them from value variables.",
        "Be precise about the type a pointer points to — wrong-type pointer arithmetic leads to subtle bugs.",
        "In function signatures, annotate output-only pointer parameters with a comment like /* out */ for clarity."
      ],
      exercises: [
        {
          title: "Exercise 1 – Swap via Pointers",
          description: "Write a function void swap(int *a, int *b) that swaps the values of the two integers pointed to by a and b (using a temp variable). In main, declare two integer variables, print them, call swap, and print them again to verify the swap worked.",
          hint: "Inside swap: int temp = *a; *a = *b; *b = temp; Pass the addresses of your variables: swap(&x, &y)."
        },
        {
          title: "Exercise 2 – scanf and Pointers",
          description: "scanf already uses pointers under the hood. Write a program that reads three integers from the user using a single scanf call with three %d format specifiers. Then print their sum, product, and average. Explain in a comment why & is needed before each variable.",
          hint: "scanf needs pointers to store the values it reads. Write scanf(\"%d %d %d\", &a, &b, &c)."
        },
        {
          title: "Exercise 3 – Compute Quotient and Remainder",
          description: "Write a function void div_mod(int dividend, int divisor, int *quotient, int *remainder) that computes both the integer quotient and remainder of dividend/divisor and stores them via the output pointers. Call it from main and print both results.",
          hint: "Use *quotient = dividend / divisor; and *remainder = dividend % divisor; inside the function."
        }
      ],
      challenge: {
        title: "Challenge – Find Min and Max with Indices",
        description: "Write a function void find_extremes(const int *arr, int n, int *min_val, int *max_val, int *min_idx, int *max_idx) that finds the minimum and maximum values in an array and also returns the index of each via output pointers. In main, initialize an array of 10 integers, call the function, and print all four results.",
        hint: "Initialize min and max to arr[0] and min_idx/max_idx to 0. Loop from 1 to n-1 updating as you find smaller or larger values."
      },
      quiz: [
        {
          question: "What does the & (address-of) operator return?",
          options: [
            "The value of the variable",
            "The memory address where the variable is stored",
            "The size of the variable in bytes",
            "The type of the variable"
          ],
          correctIndex: 1,
          explanation: "The & operator returns the memory address of its operand — the location in RAM where the variable's bytes are stored."
        },
        {
          question: "What does the * (dereference) operator do when applied to a pointer?",
          options: [
            "Returns the address stored in the pointer",
            "Multiplies the pointer by 2",
            "Accesses the value stored at the address the pointer holds",
            "Declares the pointer to be constant"
          ],
          correctIndex: 2,
          explanation: "The dereference operator * follows the pointer to the memory location it holds and retrieves (or modifies) the value there."
        },
        {
          question: "What is wrong with: int *p; *p = 5;?",
          options: [
            "Pointers cannot store integers",
            "The * operator is only for arithmetic",
            "p is uninitialized — it holds a garbage address; dereferencing it is undefined behaviour",
            "You need to write int* p; with the asterisk next to the type"
          ],
          correctIndex: 2,
          explanation: "An uninitialized pointer holds whatever random bits were in memory. Dereferencing it writes to a random address, which is undefined behaviour."
        },
        {
          question: "How do you pass variable x to a function that modifies it through a pointer parameter?",
          options: ["func(x)", "func(*x)", "func(&x)", "func(x*)"],
          correctIndex: 2,
          explanation: "You pass the address of x using &x. Inside the function, the pointer parameter holds that address and can dereference it to modify x."
        },
        {
          question: "What is a NULL pointer?",
          options: [
            "A pointer to the value 0",
            "A pointer that stores the address zero, representing 'no valid address'",
            "A pointer that has been freed",
            "A pointer to a void function"
          ],
          correctIndex: 1,
          explanation: "NULL is a special address value (typically 0) used to indicate that a pointer does not currently point to any valid object."
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TOPIC 4-9: Pointers and Arrays / Pointer Arithmetic
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "topic-4-9",
      title: "Pointers and Arrays — Pointer Arithmetic",
      estimatedReadingTime: 10,
      explanation: `In C, arrays and pointers are deeply connected. When you use an array name in most expressions, it automatically decays to a pointer to its first element. That means: given int arr[5]; the expression arr is equivalent to &arr[0] — a pointer to the first integer. This is why you can pass an array to a function that accepts a pointer, and why array indexing and pointer arithmetic produce identical results.

Pointer arithmetic is the ability to add or subtract integers from pointers. Adding 1 to a pointer does NOT add 1 byte — it adds sizeof(pointed-to-type) bytes, moving to the next element. So if p = &arr[0] and int is 4 bytes, then p+1 points to arr[1] (4 bytes forward), p+2 points to arr[2], and so on. The compiler scales the offset automatically based on the pointed-to type.

The equivalence of indexing and pointer arithmetic is exact: arr[i] is identical to *(arr + i) by definition. You can even write the unusual-looking i[arr] (the addition is commutative) though this is never done in practice. The index notation is almost always clearer and preferred.

Subtracting one pointer from another (when both point into the same array) gives the number of elements between them as a ptrdiff_t. This is used, for example, to compute how far into a string a substring occurs.

Incrementing a pointer with ++ is common in low-level string and array processing. A loop that writes *p++ = value; assigns value to *p then advances p to the next element. Similarly, reading with *p++ is idiomatic in functions like strcpy implementations.

Passing arrays to functions takes advantage of this pointer-array duality: void print_array(int *arr, int n) and void print_array(int arr[], int n) are completely equivalent in C. Inside the function, the array decays to a pointer and the size information is lost — which is why you must always pass the length separately.

Be careful about pointer arithmetic outside array bounds. Computing a pointer that points more than one past the last element is undefined behaviour. Only pointers within [arr, arr+size] (inclusive on the one-past-end boundary for comparison only) are valid.`,
      codeExample: `#include <stdio.h>
#include <string.h>

/* Accepts an array as a pointer — the two parameter forms are equivalent */
void print_array(int *arr, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);          /* index notation */
    }
    printf("\\n");
}

/* Uses pointer arithmetic to traverse */
void print_array_ptr(int *arr, int n) {
    int *end = arr + n;                 /* one past the last element */
    for (int *p = arr; p < end; p++) {
        printf("%d ", *p);             /* dereference the pointer */
    }
    printf("\\n");
}

int main(void) {
    int nums[5] = {10, 20, 30, 40, 50};

    /* Array name decays to pointer to first element */
    int *p = nums;          /* equivalent to &nums[0] */
    printf("*p = %d (same as nums[0])\\n", *p);
    printf("*(p+2) = %d (same as nums[2])\\n", *(p + 2));

    /* Pointer arithmetic: advance through array */
    printf("Walking with pointer: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", *(nums + i));
    }
    printf("\\n");

    print_array(nums, 5);
    print_array_ptr(nums, 5);

    /* Pointer difference gives element count between pointers */
    int *first = &nums[1];
    int *last  = &nums[4];
    printf("Elements between index 1 and 4: %td\\n", last - first);

    /* Strings and pointer arithmetic */
    char str[] = "Hello";
    char *q = str;
    while (*q != '\\0') {
        printf("%c", *q);
        q++;                /* advance to next character */
    }
    printf("\\n");

    return 0;
}`,
      expectedOutput: `*p = 10 (same as nums[0])
*(p+2) = 30 (same as nums[2])
Walking with pointer: 10 20 30 40 50 
10 20 30 40 50 
10 20 30 40 50 
Elements between index 1 and 4: 3
Hello`,
      keyTakeaways: [
        "An array name decays to a pointer to its first element in most expressions.",
        "arr[i] is exactly equivalent to *(arr + i) — index notation is just syntax sugar.",
        "Adding n to a pointer of type T* advances it by n * sizeof(T) bytes.",
        "Subtracting two pointers (into the same array) gives the element count between them.",
        "Pass arrays to functions as pointer + length; the array's size is not available inside the function.",
        "Pointer arithmetic is only valid within the bounds of an array (or one past the end for comparison)."
      ],
      commonMistakes: [
        "Assuming pointer+1 moves one byte — it moves by sizeof(pointed-to-type) bytes.",
        "Performing arithmetic on pointers to different arrays — comparing or subtracting such pointers is undefined behaviour.",
        "Treating a pointer as if it still 'knows' the original array size after decaying — it does not.",
        "Using a pointer after it has gone past the end of the array without checking bounds.",
        "Confusing the address of the array (int (*)[N]) with a pointer to its first element (int *)."
      ],
      bestPractices: [
        "Use index notation arr[i] by default — it is clearer than *(arr+i) for most code.",
        "Always pass the array length alongside the pointer — never assume the callee can recover it.",
        "Reserve pointer-arithmetic traversal for performance-critical or string-processing code where it is idiomatic.",
        "Use const int *arr in function parameters when the function does not modify the array.",
        "Compute one-past-end pointers (arr + n) for loop bounds, but never dereference the one-past-end address."
      ],
      exercises: [
        {
          title: "Exercise 1 – Sum Using Pointer Arithmetic",
          description: "Write a function int sum_ptr(const int *arr, int n) that uses a pointer (not indices) to compute the sum. Use a loop with a pointer variable that you advance with ++ and dereference with *. Call it from main with an array of 6 integers.",
          hint: "Initialize int *p = arr; and a sum variable. Loop while p < arr + n, add *p to sum, then p++."
        },
        {
          title: "Exercise 2 – Find a Value",
          description: "Write a function int *find(int *arr, int n, int target) that uses pointer arithmetic to search the array for target. Return a pointer to the first matching element, or NULL if not found. In main, use the returned pointer to print the found element and its index (pointer - arr).",
          hint: "Walk p from arr to arr+n. When *p == target, return p. After the loop, return NULL."
        },
        {
          title: "Exercise 3 – String Copy with Pointers",
          description: "Without using strcpy, write void my_strcpy(char *dest, const char *src) that copies src to dest using only pointer arithmetic (no indices). Use the idiom *dest++ = *src++; in a loop until you copy the null terminator.",
          hint: "Loop while (*src != '\\0') copying each character, then copy the null terminator after the loop."
        }
      ],
      challenge: {
        title: "Challenge – Pointer-Based String Reverse",
        description: "Write a function void reverse_ptr(char *s) that reverses a string in place using only pointer arithmetic — no index variables. Use two pointers: one starting at s, one starting at s + strlen(s) - 1. Swap characters and move the pointers toward each other until they meet. Test with several strings.",
        hint: "Use char *left = s; and char *right = s + strlen(s) - 1; Swap *left and *right, then left++ and right--. Stop when left >= right."
      },
      quiz: [
        {
          question: "What does an array name evaluate to in most C expressions?",
          options: [
            "The number of elements in the array",
            "A pointer to the first element of the array",
            "A copy of all the array's elements",
            "The size in bytes of the entire array"
          ],
          correctIndex: 1,
          explanation: "In most contexts, an array name decays to a pointer to its first element (type T* for an array of T)."
        },
        {
          question: "If int *p = &arr[0] and sizeof(int) is 4, what address does p+3 hold?",
          options: [
            "Address of arr[0] plus 3 bytes",
            "Address of arr[0] plus 12 bytes (3 * 4)",
            "Address of arr[0] plus 1 byte",
            "NULL"
          ],
          correctIndex: 1,
          explanation: "Pointer arithmetic scales by the pointed-to type size. p+3 adds 3 * sizeof(int) = 12 bytes to the base address."
        },
        {
          question: "What is arr[i] equivalent to in C?",
          options: ["arr + i", "*(arr + i)", "&arr[i]", "arr * i"],
          correctIndex: 1,
          explanation: "By definition in C, arr[i] is exactly *(arr + i): add i (scaled by element size) to the base pointer, then dereference."
        },
        {
          question: "How do you pass an array of ints to a function that should not modify it?",
          options: [
            "void f(int arr[])",
            "void f(const int *arr, int n)",
            "void f(int &arr)",
            "void f(int arr[const])"
          ],
          correctIndex: 1,
          explanation: "const int *arr declares a pointer to read-only int, preventing modification. Passing n separately provides the array size."
        },
        {
          question: "What does (ptr2 - ptr1) return when both pointers point into the same array?",
          options: [
            "The byte difference between the two addresses",
            "The number of elements between the two pointers",
            "The sum of the two pointer values",
            "Always zero"
          ],
          correctIndex: 1,
          explanation: "Pointer subtraction of two pointers into the same array gives the number of elements (not bytes) between them, as a ptrdiff_t."
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TOPIC 4-10: Structs
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "topic-4-10",
      title: "Structs — Defining and Using Compound Data Types",
      estimatedReadingTime: 11,
      explanation: `Real programs deal with entities that have multiple attributes. A student has a name, ID, and GPA. A point in 2D space has an x coordinate and a y coordinate. A calendar date has a year, month, and day. In C, you group related fields together into a struct — a compound data type that holds multiple named members of potentially different types.

You define a struct with the struct keyword followed by an optional tag name and a list of member declarations in curly braces: struct Point { double x; double y; };. This definition creates a new type called struct Point. To declare a variable of this type, you write: struct Point p1;. You can then access its members with the dot (.) operator: p1.x = 3.0; p1.y = 4.0;.

You can initialize a struct at declaration using a brace-enclosed list matching the order of members: struct Point p2 = {1.5, 2.5};. In C99 and later, you can also use designated initializers, naming each field explicitly: struct Point p3 = {.x = 5.0, .y = 0.0};. Designated initializers are less error-prone because the meaning of each value is clear even if you add new fields later.

Structs can be passed to functions just like any other type. Because C uses pass-by-value, the function receives a complete copy of the struct. This is fine for small structs but wasteful for large ones — in that case you pass a pointer to the struct. When you have a pointer to a struct, you access members with the arrow operator (->) instead of the dot: ptr->x is shorthand for (*ptr).x.

Structs can be nested: a struct Rectangle can contain two struct Point members for its corners. They can also contain arrays: a struct Student can have a char array for the name. Structs are the primitive building block for all compound data organization in C — everything from complex numbers to linked list nodes to file headers is expressed as a struct.

Compared to separate global or local variables, grouping related data into structs makes code cleaner: you can pass one struct to a function instead of five separate parameters, return a struct to deliver multiple related results, and store an array of structs to represent a collection of records.`,
      codeExample: `#include <stdio.h>
#include <string.h>
#include <math.h>

/* --- Struct definitions --- */
struct Point {
    double x;
    double y;
};

struct Student {
    char   name[50];
    int    id;
    double gpa;
};

/* --- Functions using structs --- */

/* Pass by value — receives a copy */
double distance(struct Point a, struct Point b) {
    double dx = a.x - b.x;
    double dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
}

/* Pass by pointer — modifies the original */
void set_gpa(struct Student *s, double new_gpa) {
    s->gpa = new_gpa;          /* arrow operator for pointer-to-struct */
}

void print_student(const struct Student *s) {
    printf("Name: %s | ID: %d | GPA: %.2f\\n", s->name, s->id, s->gpa);
}

int main(void) {
    /* Initialize structs */
    struct Point p1 = {0.0, 0.0};
    struct Point p2 = {3.0, 4.0};

    printf("Distance from (0,0) to (3,4): %.2f\\n", distance(p1, p2));

    /* Dot operator to access members */
    struct Student alice;
    strcpy(alice.name, "Alice");
    alice.id  = 1001;
    alice.gpa = 3.5;
    print_student(&alice);

    /* Designated initializer (C99) */
    struct Student bob = {.name = "Bob", .id = 1002, .gpa = 3.8};
    print_student(&bob);

    /* Modify via pointer */
    set_gpa(&alice, 3.9);
    printf("After promotion: ");
    print_student(&alice);

    /* Array of structs */
    struct Point polygon[3] = {{0,0}, {4,0}, {2,3}};
    printf("Triangle vertices:\\n");
    for (int i = 0; i < 3; i++) {
        printf("  (%.1f, %.1f)\\n", polygon[i].x, polygon[i].y);
    }

    return 0;
}`,
      expectedOutput: `Distance from (0,0) to (3,4): 5.00
Name: Alice | ID: 1001 | GPA: 3.50
Name: Bob | ID: 1002 | GPA: 3.80
After promotion: Name: Alice | ID: 1001 | GPA: 3.90
Triangle vertices:
  (0.0, 0.0)
  (4.0, 0.0)
  (2.0, 3.0)`,
      keyTakeaways: [
        "A struct groups named members of different types into a single compound type.",
        "Access struct members with the dot operator (.) for value variables and arrow (->) for pointers.",
        "Structs are passed by value (full copy) by default; pass a pointer to avoid copying and to allow modification.",
        "Initialize structs with brace lists or, in C99+, with designated initializers (.field = value).",
        "Arrays of structs are a natural way to store records or collections of related entities.",
        "The arrow operator s->member is shorthand for (*s).member."
      ],
      commonMistakes: [
        "Using the dot operator on a pointer-to-struct instead of the arrow operator, causing a compile error.",
        "Forgetting that struct assignment copies all members — modifying the copy does not affect the original.",
        "Not null-terminating char array members used as strings when filling them manually.",
        "Comparing structs with == — C does not support struct equality comparison; compare member by member.",
        "Omitting the semicolon after the closing brace of a struct definition — this is a syntax error."
      ],
      bestPractices: [
        "Use typedef to create a shorter alias: typedef struct Point Point; so you can write Point p instead of struct Point p.",
        "Pass large structs by pointer to functions to avoid unnecessary copying.",
        "Use const struct MyType *ptr for pointer parameters that should not modify the struct.",
        "Initialize all members at declaration using designated initializers to avoid reading garbage values.",
        "Group all struct definitions in a header file when working with multiple source files."
      ],
      exercises: [
        {
          title: "Exercise 1 – Rectangle",
          description: "Define a struct Rectangle with members width and height (both doubles). Write a function double area(struct Rectangle r) that returns width*height, and double perimeter(struct Rectangle r) that returns 2*(width+height). In main, initialize a rectangle and print its area and perimeter.",
          hint: "Access members with the dot operator. Return the computed value from each function."
        },
        {
          title: "Exercise 2 – Student Grade Book",
          description: "Define a struct Student with a char name[40], int score, and char grade. Declare an array of 4 students, filling name and score manually. Write a loop that computes the grade (A>=90, B>=80, C>=70, D>=60, F otherwise) and stores it in the grade field. Print all students.",
          hint: "Use strcpy to set the name. Access array elements with students[i].name, students[i].score, etc."
        },
        {
          title: "Exercise 3 – Modify via Pointer",
          description: "Define a struct Counter with a single int value field. Write functions void increment(struct Counter *c) and void reset(struct Counter *c). In main, create a Counter, call increment several times and print the value each time, then call reset and print again.",
          hint: "Inside increment, use c->value++; Inside reset, use c->value = 0;"
        }
      ],
      challenge: {
        title: "Challenge – Simple Contact Book",
        description: "Define a struct Contact with fields: char name[50], char phone[15], and int age. Declare an array of 5 Contacts and fill them with hard-coded data. Write functions: void print_contact(const struct Contact *c) to print one contact, and void find_by_name(const struct Contact *contacts, int n, const char *target) that searches for a name using strcmp and prints the matching contact or 'Not found'. Call both functions from main.",
        hint: "In find_by_name, loop over the array and call strcmp(contacts[i].name, target) == 0 to check for a match."
      },
      quiz: [
        {
          question: "Which operator accesses a struct member through a pointer to the struct?",
          options: [".", "::", "->", "*"],
          correctIndex: 2,
          explanation: "The arrow operator -> dereferences the pointer and accesses the member in one step: ptr->member is (*ptr).member."
        },
        {
          question: "What does struct Point p2 = p1; do when p1 is a struct Point?",
          options: [
            "Creates a reference so p2 and p1 share the same data",
            "Creates a shallow copy — all members of p1 are copied into p2",
            "Makes p2 a pointer to p1",
            "Is a compile error — structs cannot be assigned"
          ],
          correctIndex: 1,
          explanation: "Struct assignment copies all members. p2 gets its own copy; modifying p2 does not affect p1."
        },
        {
          question: "Given struct Student s; what is the correct way to read a score into s.score?",
          options: [
            "scanf(\"%d\", s.score)",
            "scanf(\"%d\", &s.score)",
            "scanf(\"%d\", &s->score)",
            "scanf(\"%d\", *s.score)"
          ],
          correctIndex: 1,
          explanation: "scanf needs a pointer: &s.score gives the address of the score member inside the struct s."
        },
        {
          question: "How do you pass a struct to a function so the function can modify the original?",
          options: [
            "Pass the struct by value: func(myStruct)",
            "Pass a copy and return the modified copy",
            "Pass a pointer to the struct: func(&myStruct)",
            "Use a global variable instead"
          ],
          correctIndex: 2,
          explanation: "Passing &myStruct gives the function a pointer to the original. Using -> inside the function modifies the original, not a copy."
        },
        {
          question: "Which of the following correctly uses a designated initializer?",
          options: [
            "struct Point p = {x: 1.0, y: 2.0};",
            "struct Point p = {.x = 1.0, .y = 2.0};",
            "struct Point p = (x=1.0, y=2.0);",
            "struct Point p; p = {1.0, 2.0};"
          ],
          correctIndex: 1,
          explanation: "C99 designated initializers use the syntax .fieldName = value inside braces. This is the standard and portable form."
        },
        {
          question: "What is the result of comparing two structs with ==?",
          options: [
            "True if all their members are equal",
            "A compile error — C does not support struct == comparison",
            "Always false",
            "Compares only the first member"
          ],
          correctIndex: 1,
          explanation: "C does not define == for struct types. Attempting to use == on structs produces a compile error. You must compare members individually."
        }
      ]
    }
  ]
};
