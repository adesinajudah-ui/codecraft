import type { Lesson } from "./types";

export const lesson4: Lesson = {
  id: "lesson-4",
  title: "Lesson 4 – Functions, Arrays, Pointers, and Structs",
  description: "Build the essential building blocks of real C programs: write reusable functions, store collections in arrays, navigate memory with pointers, and group related data into structs.",
  topics: [
    {
      id: "topic-4-1",
      title: "Functions — Declaration, Definition, and Calling",
      estimatedReadingTime: 10,
      explanation: `A function is a named, reusable block of code that performs a specific task. Instead of writing the same logic over and over in different parts of a program, you write it once as a function and call it as many times as you need. This is one of the most important ideas in programming: breaking a large problem into small, well-named pieces that are each easy to understand and test on their own.

Every C function has four essential parts. The return type says what kind of value the function sends back to its caller — it could be int, double, char, or void if it sends nothing back. The function name is an identifier you choose; by convention, function names use lowercase letters with underscores between words, like compute_area or print_greeting. The parameter list, enclosed in parentheses, declares what information the function needs to do its job. And the function body, enclosed in curly braces, contains the statements that implement the logic.

The distinction between a function declaration (also called a prototype) and a function definition is important in C. A declaration tells the compiler the function's name, return type, and parameter types so that the compiler can type-check calls to it even before seeing the full definition. A definition provides the actual body. If you define a function before main, the definition also serves as its own declaration. If you define it after main — which is common — you must provide a prototype above main so the compiler knows the function exists when it sees the call.

The syntax of a function prototype is simply the first line of the function followed by a semicolon: return_type function_name(parameter_types);. Parameter names are optional in prototypes (only types are required), but including names makes the prototype self-documenting. The definition is the same first line followed by the full body in braces.

Calling a function means writing its name followed by parentheses containing any arguments. The arguments are the actual values you pass; the parameters are the variables inside the function that receive those values. After the function executes its body (and optionally a return statement), control returns to the exact point in the caller where the call was made, carrying back the return value if there is one.

The void return type is used for functions that do not send a value back. Such functions are called for their side effects — printing output, modifying global state, or doing I/O. A function with a non-void return type must have a return statement that provides a value of the correct type.`,
      codeExample: `#include <stdio.h>

/* Function prototypes (declarations) */
double circle_area(double radius);
void print_separator(void);
int max(int a, int b);

int main(void) {
    /* Calling functions */
    double area = circle_area(5.0);
    printf("Area of circle with radius 5: %.2f\\n", area);

    print_separator();

    int bigger = max(17, 42);
    printf("max(17, 42) = %d\\n", bigger);

    print_separator();

    /* Functions can be called inside expressions */
    printf("max(max(3,7), max(1,9)) = %d\\n", max(max(3, 7), max(1, 9)));

    return 0;
}

/* Function definitions */
double circle_area(double radius) {
    return 3.14159 * radius * radius;
}

void print_separator(void) {
    printf("--------------------\\n");
}

int max(int a, int b) {
    if (a > b) {
        return a;
    }
    return b;
}`,
      expectedOutput: `Area of circle with radius 5: 78.54
--------------------
max(17, 42) = 42
--------------------
max(max(3,7), max(1,9)) = 9`,
      keyTakeaways: [
        "A function groups reusable logic under a meaningful name, reducing duplication.",
        "A prototype (declaration) tells the compiler the function's signature before its definition.",
        "The return type specifies what kind of value the function sends back; void means nothing.",
        "Arguments are the actual values passed at the call site; parameters receive them inside the function.",
        "A return statement ends the function and sends a value back to the caller.",
        "Functions should do one thing well — the single-responsibility principle makes code easier to test."
      ],
      commonMistakes: [
        "Forgetting the function prototype when the definition appears after main — the compiler sees an undeclared function call.",
        "Mismatching the return type in the prototype versus the definition, causing compiler warnings or errors.",
        "Omitting the return statement in a non-void function — the return value is undefined.",
        "Using the same name for a parameter and a local variable inside the function body, causing confusion.",
        "Calling a function with the wrong number of arguments — C will not automatically supply missing ones."
      ],
      bestPractices: [
        "Place all function prototypes at the top of the file, just after the #include directives.",
        "Keep each function focused on a single, clearly described task.",
        "Name functions with a verb-noun style (compute_area, print_report) to make calls read like sentences.",
        "Always write the return statement explicitly, even at the end where it might be optional.",
        "Use const in parameter declarations to signal that a parameter will not be modified inside the function."
      ],
      exercises: [
        {
          title: "Exercise 1 – Power Function",
          description: "Write a function int power(int base, int exp) that returns base raised to the non-negative integer exponent exp. Use a loop inside the function. Call it from main with several different pairs and print the results.",
          hint: "Start with result = 1 and multiply by base in a loop that runs exp times. The function must have a prototype above main."
        },
        {
          title: "Exercise 2 – Celsius to Fahrenheit",
          description: "Write a function double to_fahrenheit(double celsius) that converts a Celsius temperature to Fahrenheit using the formula F = C * 9/5 + 32. In main, call it for 0, 100, and -40 and print each result with one decimal place.",
          hint: "Use 9.0/5.0 (not 9/5) in the formula to avoid integer division truncation."
        },
        {
          title: "Exercise 3 – Is Prime",
          description: "Write a function int is_prime(int n) that returns 1 if n is prime and 0 otherwise. In main, loop from 2 to 30 and use is_prime to print only the prime numbers.",
          hint: "A number is prime if no integer from 2 up to its square root divides it evenly. Use the modulo operator % to check divisibility."
        }
      ],
      challenge: {
        title: "Challenge – Menu-Driven Unit Converter",
        description: "Write a program with separate functions for at least four unit conversions (e.g., km-to-miles, kg-to-pounds, Celsius-to-Fahrenheit, hours-to-minutes). Each conversion function takes a double and returns a double. In main, display a menu in a loop, read the user's choice, call the matching function, and print the result. Use a switch statement for dispatch and a sentinel value to quit.",
        hint: "Declare all four conversion function prototypes at the top. The menu loop should use a do-while so it always shows at least once. Pass the numeric value to convert as the function argument."
      },
      quiz: [
        {
          question: "What is the purpose of a function prototype in C?",
          options: [
            "To allocate memory for the function.",
            "To tell the compiler the function's name, return type, and parameter types before the full definition.",
            "To execute the function immediately when the file is loaded.",
            "To prevent other files from calling the function."
          ],
          correctIndex: 1,
          explanation: "A prototype gives the compiler enough information to type-check calls to the function even before the definition has been seen."
        },
        {
          question: "Which return type should a function have if it does not send any value back to the caller?",
          options: ["int", "null", "void", "0"],
          correctIndex: 2,
          explanation: "void is the return type for functions that perform a task but do not return a value. Calling such a function cannot be used in an expression."
        },
        {
          question: "Where does execution continue after a called function returns?",
          options: [
            "At the beginning of main.",
            "At the top of the called function.",
            "At the statement immediately after the call site in the caller.",
            "At the last return statement of any function."
          ],
          correctIndex: 2,
          explanation: "When a function returns, control resumes at the point in the calling code immediately after the function call expression."
        },
        {
          question: "What is the difference between an argument and a parameter?",
          options: [
            "They are the same thing.",
            "A parameter is the actual value passed at the call site; an argument is the variable inside the function.",
            "An argument is the actual value at the call site; a parameter is the variable inside the function that receives it.",
            "Arguments are only used with void functions."
          ],
          correctIndex: 2,
          explanation: "Arguments are the values you provide when calling a function. Parameters are the variable declarations in the function's definition that receive those values."
        },
        {
          question: "What happens if a non-void function has no return statement?",
          options: [
            "It automatically returns 0.",
            "It returns the last computed value.",
            "The return value is undefined — this is a bug.",
            "The compiler refuses to compile the program."
          ],
          correctIndex: 2,
          explanation: "Omitting a return statement in a non-void function causes undefined behaviour for the return value. Most compilers issue a warning but still compile."
        }
      ]
    },
    {
      id: "topic-4-2",
      title: "Parameters, Return Values, and Pass-by-Value",
      estimatedReadingTime: 9,
      explanation: `When you call a function in C, the values you pass as arguments are copied into the function's parameters. This means that whatever the function does to its parameters has absolutely no effect on the original variables back in the caller. This is called pass-by-value semantics, and understanding it deeply is essential for writing correct C programs.

Think of it like photocopying a document and handing someone the copy. They can scribble all over it, tear it up, or rewrite it completely — your original document is untouched. The function receives its own private copies of the argument values, housed in fresh local variables (the parameters) that are created when the function is called and destroyed when it returns.

This behavior has an important consequence: if you write a function intended to swap two integers by modifying two parameters, it will not work — the swaps happen on the copies, and the caller never sees the change. The solution (which leads directly into the topic of pointers) is to pass the addresses of the variables instead. But for now, understanding why the swap fails is just as valuable as knowing how to fix it.

Return values are the only direct way for a function to send information back to its caller. A return statement carries one value out of the function. If you need to "return" multiple results, you can use pointers (to write into caller-provided memory), use a struct, or use global variables — but global variables are generally discouraged.

Functions can also call other functions, including themselves (recursion, covered next). A function that calls another function must have that other function's prototype visible at the point of the call, just as main does. This rule applies consistently throughout C regardless of how deeply functions are nested in their calling chain.

Local variables declared inside a function exist only for the duration of that function's execution. They are allocated on the stack when the function is called and released automatically when it returns. This means you should never return the address of a local variable — the memory it occupied will be reused by the next function call and the pointer becomes dangling.`,
      codeExample: `#include <stdio.h>

/* Demonstrates pass-by-value: the caller's variable is NOT modified */
void try_to_double(int x) {
    x = x * 2;  /* modifies the local copy only */
    printf("Inside try_to_double: x = %d\\n", x);
}

/* The only way out of a function is a return value */
int actual_double(int x) {
    return x * 2;
}

/* Multiple parameters, each passed by value */
double weighted_average(double a, double b, double w) {
    /* w is the weight for a; (1-w) is the weight for b */
    return a * w + b * (1.0 - w);
}

/* Local variable lifetime demonstration */
int make_value(void) {
    int local = 99;   /* exists only inside this call */
    return local;     /* copy of the value is returned */
}

int main(void) {
    int n = 10;

    try_to_double(n);
    printf("After try_to_double: n = %d\\n", n); /* still 10 */

    int result = actual_double(n);
    printf("actual_double(%d) = %d\\n", n, result);

    double avg = weighted_average(80.0, 60.0, 0.7);
    printf("Weighted average: %.1f\\n", avg);

    int v = make_value();
    printf("make_value returned: %d\\n", v);

    return 0;
}`,
      expectedOutput: `Inside try_to_double: x = 20
After try_to_double: n = 10
actual_double(10) = 20
Weighted average: 74.0
make_value returned: 99`,
      keyTakeaways: [
        "C is strictly pass-by-value: function parameters are independent copies of the arguments.",
        "Modifying a parameter inside a function does not affect the caller's original variable.",
        "The return statement is the standard mechanism for a function to send one value back to the caller.",
        "Local variables are created on the stack when a function is called and destroyed when it returns.",
        "Never return the address of a local variable — it becomes dangling after the function exits.",
        "To modify the caller's variables from within a function, pass pointers (addresses) instead of values."
      ],
      commonMistakes: [
        "Expecting a function to modify a caller's variable through a value parameter — it only modifies the copy.",
        "Writing a swap function using value parameters and being surprised it does not work.",
        "Returning a pointer to a local variable — the memory is freed when the function returns, making the pointer dangling.",
        "Forgetting that each function call gets its own separate set of parameter copies, even for recursive calls.",
        "Relying on side effects to return multiple values instead of using structs or output pointers."
      ],
      bestPractices: [
        "Design functions to communicate results through return values rather than relying on global state.",
        "Mark parameters that should not be modified with const to document and enforce read-only intent.",
        "If a function needs to produce multiple outputs, consider using a struct as the return type.",
        "Keep parameter lists short (ideally fewer than five); if you need more, group related parameters into a struct.",
        "Document the units, valid ranges, and expected values of each parameter in a comment above the prototype."
      ],
      exercises: [
        {
          title: "Exercise 1 – Failed Swap",
          description: "Write a function void swap(int a, int b) that tries to swap a and b inside the function body. Call it from main with two different integers, print the values before and after calling swap, and observe that the original variables are unchanged. Write a comment explaining why the swap did not work.",
          hint: "This is intentionally broken. Inside swap, use a temporary variable: int temp = a; a = b; b = temp; — but print a and b inside swap too, to confirm the copies were swapped."
        },
        {
          title: "Exercise 2 – Clamp Function",
          description: "Write a function int clamp(int value, int low, int high) that returns value if it is between low and high inclusive, returns low if value is below low, and returns high if value is above high. Test it in main with several values and print the results.",
          hint: "Use two if statements or the ternary operator. Remember the function returns, not modifies, so the caller must store the result."
        },
        {
          title: "Exercise 3 – Hypotenuse",
          description: "Write a function double hypotenuse(double a, double b) that computes and returns the length of the hypotenuse of a right triangle using the Pythagorean theorem. Use sqrt from <math.h>. Call it from main with three different pairs of side lengths.",
          hint: "Include <math.h> and link with -lm if needed. The formula is sqrt(a*a + b*b). Return the result directly."
        }
      ],
      challenge: {
        title: "Challenge – Statistics Functions",
        description: "Write four separate functions: double sum_of(double a, double b, double c), double average_of(double a, double b, double c), double maximum_of(double a, double b, double c), and double minimum_of(double a, double b, double c). In main, read three floating-point numbers from the user and call all four functions, printing each result on its own line with a descriptive label. average_of should call sum_of rather than repeating the addition.",
        hint: "Declare all four prototypes first. average_of can call sum_of(a,b,c) / 3.0. For max/min, chain two comparisons using your earlier max/min logic or the ternary operator."
      },
      quiz: [
        {
          question: "What does pass-by-value mean in C?",
          options: [
            "The function receives a reference to the original variable.",
            "The function receives a copy of the argument; changes to it do not affect the original.",
            "The caller's variable is passed directly into the function's memory.",
            "Values are passed on the heap."
          ],
          correctIndex: 1,
          explanation: "Pass-by-value means the function gets its own copy of each argument. Modifying a parameter inside the function has no effect on the caller's variable."
        },
        {
          question: "Why does a simple swap(int a, int b) function that swaps a and b not work?",
          options: [
            "Because integers cannot be swapped in C.",
            "Because the function swaps copies, not the caller's actual variables.",
            "Because swap is a reserved keyword in C.",
            "Because C does not allow two parameters of the same type."
          ],
          correctIndex: 1,
          explanation: "a and b are local copies. Swapping them inside the function has no effect on the variables passed by the caller."
        },
        {
          question: "What is the lifetime of a local variable declared inside a function?",
          options: [
            "For the entire duration of the program.",
            "Until the next function is called.",
            "Only for the duration of that specific function call.",
            "Until the variable is explicitly deleted."
          ],
          correctIndex: 2,
          explanation: "Local variables live on the stack and are created when the function is called and destroyed when it returns."
        },
        {
          question: "What is wrong with: int *bad(void) { int x = 5; return &x; }?",
          options: [
            "int * is not a valid return type.",
            "x must be declared static to return its address.",
            "Returning the address of a local variable creates a dangling pointer after the function returns.",
            "The & operator cannot be used on function parameters."
          ],
          correctIndex: 2,
          explanation: "x is a local variable; its memory is released when bad() returns. The returned pointer points to freed stack memory, which is undefined behaviour."
        },
        {
          question: "How can a function effectively return two separate integer results to the caller?",
          options: [
            "Use two return statements.",
            "Print the values inside the function.",
            "Pass two pointer parameters and write results through them, or return a struct.",
            "Declare both integers as global variables."
          ],
          correctIndex: 2,
          explanation: "A function can only return one value directly. To return two values, use pointer parameters (output parameters) or package both values in a struct."
        }
      ]
    },
    {
      id: "topic-4-3",
      title: "Recursion",
      estimatedReadingTime: 9,
      explanation: `Recursion is a technique where a function calls itself to solve a smaller version of the same problem. It might sound circular, but it works because each call handles a slightly smaller (or simpler) input, and eventually the problem is simple enough to solve directly without calling itself again. That simplest case is called the base case, and every correct recursive function must have at least one.

The general pattern of a recursive function has two parts. The base case checks whether the input is simple enough to answer directly, and if so, returns the answer without making another recursive call. The recursive case breaks the problem into a smaller sub-problem, calls the function on that sub-problem, and combines the result with some additional work to produce the answer for the current call.

Consider computing the factorial of a non-negative integer n (written n!). Factorial is defined as n multiplied by (n-1) multiplied by (n-2) down to 1, with 0! defined as 1. Recursively: if n is 0, return 1 (base case); otherwise, return n multiplied by factorial(n-1) (recursive case). Each call reduces n by one until n reaches 0.

Every recursive call uses stack space for its own local variables and return address. This means that very deep recursion — for example, computing factorial(100000) — can exhaust the call stack and cause a stack overflow crash. For problems where the depth could be large, an iterative solution using a loop is often preferable. A rule of thumb: use recursion when it makes the code significantly clearer and the depth is bounded to a few thousand calls at most.

Recursion naturally expresses algorithms that work on hierarchical or self-similar structures — traversing trees, parsing nested expressions, computing Fibonacci numbers, performing binary search, or implementing merge sort. In those contexts, the recursive version often reads like a direct translation of the mathematical definition, making it much clearer than an equivalent loop-based version.

One important concept is the state of each call frame. Each recursive invocation has its own private copies of all local variables. Changes in one call frame do not affect another. Understanding this — and tracing through a small example by hand, tracking what each frame holds — is the best way to develop intuition for recursion.`,
      codeExample: `#include <stdio.h>

/* Recursive factorial */
long long factorial(int n) {
    if (n == 0) {          /* base case */
        return 1;
    }
    return n * factorial(n - 1);  /* recursive case */
}

/* Recursive Fibonacci (illustrative; exponential time) */
int fibonacci(int n) {
    if (n <= 1) {          /* base cases: fib(0)=0, fib(1)=1 */
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

/* Recursive sum of digits */
int sum_digits(int n) {
    if (n < 10) {
        return n;          /* single digit: it is its own sum */
    }
    return (n % 10) + sum_digits(n / 10);
}

/* Recursive power function */
double power(double base, int exp) {
    if (exp == 0) {
        return 1.0;
    }
    return base * power(base, exp - 1);
}

int main(void) {
    printf("factorial(6)  = %lld\\n", factorial(6));
    printf("factorial(10) = %lld\\n", factorial(10));

    printf("\\nFibonacci sequence (0-9):\\n");
    for (int i = 0; i < 10; i++) {
        printf("fib(%d) = %d\\n", i, fibonacci(i));
    }

    printf("\\nsum_digits(12345) = %d\\n", sum_digits(12345));
    printf("power(2.0, 8)     = %.0f\\n", power(2.0, 8));

    return 0;
}`,
      expectedOutput: `factorial(6)  = 720
factorial(10) = 3628800

Fibonacci sequence (0-9):
fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34

sum_digits(12345) = 15
power(2.0, 8)     = 256`,
      keyTakeaways: [
        "Every recursive function needs a base case that stops the recursion and a recursive case that reduces the problem.",
        "Each recursive call gets its own private stack frame with its own copies of local variables.",
        "Recursion is elegant for naturally hierarchical problems but can cause stack overflow with very deep inputs.",
        "The Fibonacci example is a classic illustration, though its naive recursive version has exponential time complexity.",
        "Tracing recursion by hand — writing out each call and its return value — is the best way to understand it.",
        "An iterative solution using a loop is often more efficient when the recursion depth could be large."
      ],
      commonMistakes: [
        "Forgetting the base case, causing infinite recursion and a stack overflow crash.",
        "Writing a base case that is never actually reached because the recursive case does not approach it.",
        "Thinking that modifying a local variable in one recursive call affects the variable in the caller's frame — it does not.",
        "Using recursion for problems with potentially enormous depth (like computing fibonacci(100)) without memoization.",
        "Not understanding that each function call has its own n — each frame is independent."
      ],
      bestPractices: [
        "Always define the base case first, at the top of the function, before the recursive case.",
        "Ensure the recursive case always moves toward the base case with each call.",
        "Add a comment describing the base case and the recursive relationship.",
        "Prefer iteration over recursion when the recursion depth could be proportional to the input size.",
        "Use memoization or dynamic programming to optimise recursive functions with overlapping sub-problems."
      ],
      exercises: [
        {
          title: "Exercise 1 – Recursive Sum",
          description: "Write a recursive function int recursive_sum(int n) that returns the sum of all integers from 1 to n. The base case is n == 1 returning 1. Test it for n = 1, 5, and 10 and verify against the formula n*(n+1)/2.",
          hint: "The recursive case returns n + recursive_sum(n - 1). Make sure n == 1 is the base case, not n == 0, to avoid a negative-n infinite loop."
        },
        {
          title: "Exercise 2 – Count Down, Count Up",
          description: "Write a recursive function void countdown(int n) that prints the numbers from n down to 1, then prints 'Go!'. Use recursion — do not use a loop. Then write void countup(int n, int max) that prints from n up to max using recursion.",
          hint: "For countdown, the base case is n == 0 (print 'Go!' and return). For the recursive case, print n then call countdown(n-1). Swap the print and call order for countup."
        },
        {
          title: "Exercise 3 – Recursive Reverse Digits",
          description: "Write a recursive function that prints the digits of a positive integer in reverse order. For example, reverse_print(12345) should print 5 4 3 2 1. The base case is when n < 10 — print it. The recursive case prints n % 10, then recurses on n / 10.",
          hint: "Print the last digit (n % 10) before making the recursive call, which handles the remaining digits. This naturally reverses the order."
        }
      ],
      challenge: {
        title: "Challenge – Binary Search (Recursive)",
        description: "Implement recursive binary search: write int binary_search(int arr[], int low, int high, int target) that returns the index of target in the sorted array arr, or -1 if not found. The base case is low > high (not found). The recursive case computes mid = (low + high) / 2, returns mid if arr[mid] == target, searches the left half if target < arr[mid], or searches the right half otherwise. Test it on a sorted array of 10 elements.",
        hint: "The left half call uses binary_search(arr, low, mid - 1, target). The right half uses binary_search(arr, mid + 1, high, target). Initialise with low=0 and high=n-1 in main."
      },
      quiz: [
        {
          question: "What is the base case in a recursive function?",
          options: [
            "The first recursive call made.",
            "The condition under which the function calls itself.",
            "The simplest input for which the function returns a result directly without recursing.",
            "The last line of the function body."
          ],
          correctIndex: 2,
          explanation: "The base case handles the simplest version of the problem and stops the recursion by returning a direct answer."
        },
        {
          question: "What happens if a recursive function has no base case?",
          options: [
            "It returns 0 by default.",
            "The program compiles but recursion continues until the call stack overflows, crashing the program.",
            "The compiler detects the error and refuses to compile.",
            "The function runs exactly once."
          ],
          correctIndex: 1,
          explanation: "Without a base case, the function keeps calling itself indefinitely. The stack fills up and the program crashes with a stack overflow."
        },
        {
          question: "Do local variables in one recursive call share memory with variables in another call of the same function?",
          options: [
            "Yes, all calls share the same local variables.",
            "Only if they have the same name.",
            "No, each call gets its own independent stack frame with separate copies of all local variables.",
            "Only the return value is shared."
          ],
          correctIndex: 2,
          explanation: "Each recursive call creates a new stack frame. The local variables in one call are completely independent from those in any other call."
        },
        {
          question: "What is the result of factorial(0) if defined as: if (n==0) return 1; else return n * factorial(n-1);?",
          options: ["0", "1", "Infinite recursion", "-1"],
          correctIndex: 1,
          explanation: "n == 0 triggers the base case immediately, returning 1. This matches the mathematical definition that 0! = 1."
        },
        {
          question: "Why is the naive recursive Fibonacci implementation inefficient for large inputs?",
          options: [
            "Because it uses too many local variables.",
            "Because it recomputes the same sub-problems exponentially many times.",
            "Because recursion is always slower than iteration.",
            "Because Fibonacci numbers overflow int quickly."
          ],
          correctIndex: 1,
          explanation: "fibonacci(n) calls fibonacci(n-1) and fibonacci(n-2), both of which call two more, leading to an exponential number of redundant computations."
        }
      ]
    },
    {
      id: "topic-4-4",
      title: "Arrays — Declaration, Initialization, and Traversal",
      estimatedReadingTime: 10,
      explanation: `An array is a collection of elements that all have the same type, stored in a contiguous block of memory and accessed by an integer index. Arrays are the most fundamental data structure in C. Instead of declaring fifty separate integer variables named score1, score2, score3, ..., score50, you declare a single array int scores[50] and refer to each element as scores[0] through scores[49].

The declaration syntax is: type name[size]; where type is the element type, name is the array's identifier, and size is the number of elements — a positive integer constant. In C99 and later, you can use a variable for the size, creating a variable-length array (VLA), but for portability and clarity, compile-time constants are preferred.

Array indexing in C is zero-based: the first element is always at index 0 and the last element is at index size - 1. This is a consistent rule with no exceptions. One of the most common beginners' bugs in C is an off-by-one error — accessing index size instead of size - 1, which reads or writes memory beyond the end of the array. C does not check array bounds at runtime, so this causes silent undefined behaviour, not a helpful error message.

Initialization can happen at the point of declaration. You provide a comma-separated list of values inside curly braces: int primes[5] = {2, 3, 5, 7, 11};. If you provide fewer values than the declared size, the remaining elements are zero-initialized. If you provide exactly the right number of values, you can omit the size: int primes[] = {2, 3, 5, 7, 11}; and the compiler counts the elements automatically.

Traversal means visiting every element in sequence. The idiomatic C pattern uses a for loop: for (int i = 0; i < SIZE; i++) { ... arr[i] ... }. The loop counter i starts at 0 (matching the first index) and runs while i < SIZE (stopping before the one-past-last index). This pattern appears so frequently that recognizing and writing it immediately becomes second nature.

When you pass an array to a function, C does not copy all the elements. Instead, the function receives a pointer to the first element. This means functions that receive arrays can — and often do — modify the original elements. We will explore this connection between arrays and pointers in detail in a later topic.`,
      codeExample: `#include <stdio.h>

#define SIZE 8

int main(void) {
    /* Declaration and zero-initialization */
    int counts[SIZE] = {0};  /* all elements initialized to 0 */
    printf("After zero-init: counts[0]=%d, counts[7]=%d\\n",
           counts[0], counts[7]);

    /* Declaration with explicit initializer list */
    int primes[] = {2, 3, 5, 7, 11, 13, 17, 19};  /* compiler counts: 8 */

    /* Traversal with a for loop */
    printf("Primes: ");
    for (int i = 0; i < SIZE; i++) {
        printf("%d ", primes[i]);
    }
    printf("\\n");

    /* Computing the sum and finding the maximum */
    int sum = 0;
    int max = primes[0];
    for (int i = 0; i < SIZE; i++) {
        sum += primes[i];
        if (primes[i] > max) {
            max = primes[i];
        }
    }
    printf("Sum = %d, Max = %d\\n", sum, max);

    /* Modifying array elements */
    int squares[6];
    for (int i = 0; i < 6; i++) {
        squares[i] = (i + 1) * (i + 1);
    }
    printf("Squares: ");
    for (int i = 0; i < 6; i++) {
        printf("%d ", squares[i]);
    }
    printf("\\n");

    /* Partial initialization: rest becomes 0 */
    int partial[5] = {10, 20};
    printf("Partial: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", partial[i]);
    }
    printf("\\n");

    return 0;
}`,
      expectedOutput: `After zero-init: counts[0]=0, counts[7]=0
Primes: 2 3 5 7 11 13 17 19 
Sum = 77, Max = 19
Squares: 1 4 9 16 25 36 
Partial: 10 20 0 0 0 `,
      keyTakeaways: [
        "An array stores multiple values of the same type in contiguous memory, accessed by a zero-based index.",
        "The first element is at index 0; the last is at index size - 1. Going to index size is out of bounds.",
        "C does not perform bounds checking at runtime — accessing out-of-bounds indices causes undefined behaviour.",
        "Initialize arrays at declaration with {0} for all zeros, or with a brace-enclosed value list.",
        "The standard traversal pattern is a for loop from i=0 while i < size.",
        "When fewer initializers are provided than the declared size, remaining elements are zero."
      ],
      commonMistakes: [
        "Using index size instead of size-1 for the last element — classic off-by-one, reads beyond the array.",
        "Forgetting that arrays are zero-indexed and starting loops at i=1, missing the first element.",
        "Declaring an array but not initializing it, then reading values that contain garbage memory.",
        "Using = to copy one array to another — you must copy element by element (or use memcpy).",
        "Passing the array 'by value' to a function expecting to get an independent copy — arrays decay to pointers."
      ],
      bestPractices: [
        "Always define the array size as a named constant (#define SIZE 8 or const int size = 8) and use it in loops.",
        "Initialize arrays explicitly at declaration, especially before reading them in functions.",
        "Use int arr[] = {...} with an explicit initializer list rather than separately declaring size when practical.",
        "Prefer iterating with i < SIZE (strict less-than) rather than i <= SIZE-1 to avoid the risk of unsigned wrap-around.",
        "Use sizeof(arr)/sizeof(arr[0]) to compute the element count when the array size is not explicitly named."
      ],
      exercises: [
        {
          title: "Exercise 1 – Array Statistics",
          description: "Declare an integer array of 10 elements and initialize it with values of your choice. Write a program that computes and prints the sum, average (as a float), minimum, and maximum of the array.",
          hint: "Use four separate variables: sum, min, max, and average. Initialize min and max to arr[0] before the loop, then update them as you traverse."
        },
        {
          title: "Exercise 2 – Reverse an Array",
          description: "Read 5 integers into an array from the user, then print them in reverse order. Do not use a second array — just loop from index 4 down to 0.",
          hint: "Use scanf in a loop to fill the array first. Then use a separate for loop counting down from SIZE-1 to 0 inclusive."
        },
        {
          title: "Exercise 3 – Count Occurrences",
          description: "Declare an integer array of 10 elements. Read a target integer from the user and count how many times that value appears in the array. Print the count.",
          hint: "Traverse the array with a for loop and increment a counter variable each time arr[i] == target."
        }
      ],
      challenge: {
        title: "Challenge – Bubble Sort",
        description: "Implement the bubble sort algorithm to sort an integer array of 10 user-supplied elements in ascending order. Bubble sort works by repeatedly stepping through the array, comparing adjacent elements, and swapping them if they are in the wrong order. Repeat passes until no swaps occur. Print the array before and after sorting.",
        hint: "Use a nested loop: the outer loop runs up to SIZE-1 times, the inner loop runs from 0 to SIZE-2. Swap arr[j] and arr[j+1] when arr[j] > arr[j+1]. Use an int swapped flag to stop early if a pass makes no swaps."
      },
      quiz: [
        {
          question: "If an array is declared as int arr[10], what is the index of the last valid element?",
          options: ["10", "9", "11", "0"],
          correctIndex: 1,
          explanation: "Arrays are zero-indexed in C. With 10 elements, valid indices run from 0 to 9. Index 10 is one past the end and out of bounds."
        },
        {
          question: "What happens when you access arr[size] (one past the last index) in C?",
          options: [
            "C automatically returns 0.",
            "A runtime bounds-check error is printed.",
            "Undefined behaviour — C does not check bounds.",
            "The program terminates gracefully."
          ],
          correctIndex: 2,
          explanation: "C performs no runtime bounds checking. Accessing out-of-bounds memory is undefined behaviour and can corrupt data, crash the program, or silently return garbage."
        },
        {
          question: "What does int arr[5] = {1, 2}; do to the remaining three elements?",
          options: [
            "Leaves them with random garbage values.",
            "Sets them to -1.",
            "Sets them to 0.",
            "Causes a compile error because sizes must match."
          ],
          correctIndex: 2,
          explanation: "When an initializer list has fewer elements than the declared size, the remaining elements are zero-initialized."
        },
        {
          question: "What is the idiomatic loop to traverse all elements of int arr[N]?",
          options: [
            "for (int i = 1; i <= N; i++)",
            "for (int i = 0; i < N; i++)",
            "for (int i = 0; i <= N; i++)",
            "for (int i = 1; i < N; i++)"
          ],
          correctIndex: 1,
          explanation: "Start at 0 (first element) and continue while i < N (stopping before index N, which is out of bounds)."
        },
        {
          question: "What does int arr[] = {3, 1, 4, 1, 5}; do regarding size?",
          options: [
            "Creates an array of unspecified size that grows dynamically.",
            "Creates an array of exactly 5 elements; the compiler counts the initializers.",
            "Creates an array of 6 elements with an extra 0 at the end.",
            "This is a syntax error in C."
          ],
          correctIndex: 1,
          explanation: "When you omit the size but provide an initializer list, the compiler counts the values and sets the array size accordingly — here, 5."
        }
      ]
    },
    {
      id: "topic-4-5",
      title: "Multi-dimensional Arrays",
      estimatedReadingTime: 8,
      explanation: `A multi-dimensional array is an array of arrays. The most common form is the two-dimensional (2D) array, which models a grid, table, or matrix of values organized into rows and columns. You declare a 2D array as type name[rows][cols]; where rows is the number of rows and cols is the number of columns. The total number of elements is rows multiplied by cols, and they are all stored contiguously in memory in row-major order — the first row's elements come first, then the second row's, and so on.

Accessing an element uses two indices: name[row][col]. Both are zero-based. Think of the first index as selecting which row (like selecting a shelf) and the second as selecting which column within that row (like selecting a book on that shelf). The valid row indices run from 0 to rows-1 and the valid column indices from 0 to cols-1.

Initialization of a 2D array can use nested brace lists to visually mirror the grid structure: int matrix[2][3] = { {1, 2, 3}, {4, 5, 6} };. This is easier to read than a flat list, though a flat list is also valid. Partial initialization (fewer values than elements) zero-fills the remaining elements, just as with 1D arrays.

Traversal of a 2D array uses nested for loops. The outer loop iterates over rows and the inner loop iterates over columns. This is the canonical pattern that appears in matrix arithmetic, image processing, game boards, and tabular data everywhere in C programming.

Higher-dimensional arrays (3D, 4D) follow the same pattern: add another pair of brackets and another nested for loop per dimension. In practice, 3D arrays appear in some scientific computing and graphics contexts (think: frames of video, or a 3D grid of voxels), but beyond three dimensions, C programmers typically prefer dynamically allocated structures or arrays of pointers for flexibility.

When passing a 2D array to a function, you must specify all dimension sizes except the first (outermost). The function parameter is declared as void func(int arr[][COLS], int rows) — the number of columns must be known at compile time so the compiler can calculate the offset for each row.`,
      codeExample: `#include <stdio.h>

#define ROWS 3
#define COLS 4

void print_matrix(int m[][COLS], int rows) {
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < COLS; c++) {
            printf("%4d", m[r][c]);
        }
        printf("\\n");
    }
}

int main(void) {
    /* Declare and initialize a 3x4 matrix */
    int matrix[ROWS][COLS] = {
        {  1,  2,  3,  4 },
        {  5,  6,  7,  8 },
        {  9, 10, 11, 12 }
    };

    printf("Original matrix:\\n");
    print_matrix(matrix, ROWS);

    /* Multiply each element by 2 */
    for (int r = 0; r < ROWS; r++) {
        for (int c = 0; c < COLS; c++) {
            matrix[r][c] *= 2;
        }
    }

    printf("\\nAfter doubling:\\n");
    print_matrix(matrix, ROWS);

    /* Compute column sums */
    printf("\\nColumn sums: ");
    for (int c = 0; c < COLS; c++) {
        int colsum = 0;
        for (int r = 0; r < ROWS; r++) {
            colsum += matrix[r][c];
        }
        printf("%d ", colsum);
    }
    printf("\\n");

    /* 3x3 identity matrix */
    int identity[3][3] = {
        {1, 0, 0},
        {0, 1, 0},
        {0, 0, 1}
    };
    printf("\\nIdentity matrix:\\n");
    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) {
            printf("%d ", identity[r][c]);
        }
        printf("\\n");
    }

    return 0;
}`,
      expectedOutput: `Original matrix:
   1   2   3   4
   5   6   7   8
   9  10  11  12

After doubling:
   2   4   6   8
  10  12  14  16
  18  20  22  24

Column sums: 30 36 42 48 

Identity matrix:
1 0 0 
0 1 0 
0 0 1 `,
      keyTakeaways: [
        "A 2D array is declared as type name[rows][cols] and stored in row-major order in memory.",
        "Elements are accessed with two zero-based indices: arr[row][col].",
        "Nested for loops (outer for rows, inner for columns) are the standard traversal pattern.",
        "Initialize with nested brace lists to visually reflect the grid structure.",
        "When passing a 2D array to a function, all dimensions except the first must be specified.",
        "Row-major storage means arr[r][c] and arr[r][c+1] are adjacent in memory; arr[r][c] and arr[r+1][c] are COLS elements apart."
      ],
      commonMistakes: [
        "Confusing [row][col] order — the first index is always the row, the second is the column.",
        "Forgetting to specify the column count in a function parameter for a 2D array.",
        "Accessing arr[ROWS][0] or arr[0][COLS] — both are out of bounds.",
        "Initializing a 2D array with a flat list and getting the row boundaries wrong.",
        "Using nested loops with the row and column counters swapped, transposing the access pattern."
      ],
      bestPractices: [
        "Define row and column sizes as named constants and use them consistently in declarations and loops.",
        "Use the nested brace initialization style for 2D arrays to visually reflect the grid layout.",
        "Print a 2D array in a helper function to keep main clean and to make the print logic reusable.",
        "Remember that passing a 2D array to a function requires specifying all but the first dimension.",
        "Use r for the row loop variable and c for the column variable to make nested loops readable at a glance."
      ],
      exercises: [
        {
          title: "Exercise 1 – Row Sums",
          description: "Declare a 3x4 integer array with values of your choice. Write nested loops to compute the sum of each row and print it. Then compute the grand total of all elements.",
          hint: "Use a separate inner loop per row, accumulating into a rowsum variable that is reset to 0 at the start of each outer iteration."
        },
        {
          title: "Exercise 2 – Matrix Transpose",
          description: "Declare a 3x3 integer matrix and compute its transpose into a second 3x3 array. The transpose of element [r][c] goes to [c][r] in the new matrix. Print both the original and the transposed matrix.",
          hint: "transposed[c][r] = original[r][c]. Use nested loops with r and c going from 0 to 2."
        },
        {
          title: "Exercise 3 – Multiplication Table",
          description: "Fill a 10x10 2D array so that element [r][c] = (r+1) * (c+1), creating a multiplication table. Print it as a neatly formatted grid using %4d as the format specifier.",
          hint: "Use nested for loops with both indices running from 0 to 9. The value is (r+1)*(c+1) because rows and columns are 1-indexed in the display but 0-indexed in the array."
        }
      ],
      challenge: {
        title: "Challenge – Matrix Multiplication",
        description: "Write a program that multiplies two 3x3 integer matrices A and B, storing the result in matrix C. The element C[i][j] is the dot product of row i of A with column j of B: sum over k of A[i][k] * B[k][j]. Hardcode matrices A and B with interesting values, compute C, and print all three matrices neatly.",
        hint: "You need three nested loops: i for the result row, j for the result column, and k for the dot product summation. Initialize C to all zeros before the triple loop."
      },
      quiz: [
        {
          question: "How is a 3-row, 4-column 2D integer array declared in C?",
          options: [
            "int arr[4][3];",
            "int arr[3][4];",
            "int arr[3,4];",
            "int arr[12];"
          ],
          correctIndex: 1,
          explanation: "The declaration is type name[rows][cols], so a 3-row, 4-column array is int arr[3][4]."
        },
        {
          question: "In what order are elements of a 2D array stored in memory in C?",
          options: [
            "Column-major: all elements of column 0 first, then column 1, etc.",
            "Row-major: all elements of row 0 first, then row 1, etc.",
            "Diagonal: from top-left to bottom-right.",
            "Random order determined by the compiler."
          ],
          correctIndex: 1,
          explanation: "C stores 2D arrays in row-major order: the entire first row is stored contiguously, followed by the entire second row, and so on."
        },
        {
          question: "What is the correct function signature to receive a 3x4 int matrix?",
          options: [
            "void func(int m[][], int rows)",
            "void func(int m[3][], int rows)",
            "void func(int m[][4], int rows)",
            "void func(int **m, int rows, int cols)"
          ],
          correctIndex: 2,
          explanation: "When passing a 2D array to a function, all dimensions except the outermost (rows) must be specified. The column count of 4 must be present."
        },
        {
          question: "What is the typical loop pattern for traversing a 2D array with R rows and C columns?",
          options: [
            "A single loop from 0 to R*C",
            "Two independent loops, one for rows and one for columns",
            "An outer loop for rows (0 to R-1) containing an inner loop for columns (0 to C-1)",
            "An outer loop for columns containing an inner loop for rows"
          ],
          correctIndex: 2,
          explanation: "Nested for loops are standard: the outer loop picks a row, the inner loop visits each column within that row."
        },
        {
          question: "int mat[2][3] = {{1,2,3}}; What is mat[1][0]?",
          options: ["1", "0", "Garbage", "Compile error"],
          correctIndex: 1,
          explanation: "The second row is not provided in the initializer, so it is zero-initialized. mat[1][0] is 0."
        }
      ]
    },
    {
      id: "topic-4-6",
      title: "Strings and Character Arrays",
      estimatedReadingTime: 10,
      explanation: `In C, there is no dedicated string type — strings are represented as arrays of characters (type char) with a special terminating byte: the null character, written \\0 (ASCII value 0). Every C string is terminated by this null character, which signals functions like printf and strlen where the string ends. This convention is fundamental, and forgetting the null terminator is one of the most common sources of bugs in C.

There are two main ways to work with strings in C. The first is a string literal — a sequence of characters enclosed in double quotes, like "Hello". When you write a string literal, the compiler stores the characters plus an automatic null terminator and gives you a pointer to the first character. String literals are stored in read-only memory; you should not try to modify their characters through that pointer.

The second way is a character array that you declare yourself: char buffer[50]; or char name[] = "Alice";. When you initialize a char array from a string literal like char name[] = "Alice";, the compiler copies the characters including the null terminator into the array. The array is stored in writable memory (on the stack if declared locally), so you can modify its contents. This is the form you need when you want to build or change a string at runtime.

When reading strings from the user, use fgets(buffer, sizeof(buffer), stdin) rather than scanf("%s", buffer). The scanf approach stops at the first whitespace and, worse, does not limit how many characters it reads — it will overflow the buffer if the user types too much. fgets is safe because you tell it the maximum number of characters to read, preventing overflow.

The relationship between strings and character arrays maps directly onto what you already know about arrays. Indexing works: name[0] is the first character, name[1] is the second, and name[k] is the null terminator. A loop like for (int i = 0; name[i] != '\\0'; i++) traverses every character in the string. The condition name[i] != '\\0' checks for the null terminator, stopping just before it.

One subtle but important point: char *s = "hello"; declares a pointer to the first character of a read-only string literal. char s[] = "hello"; declares a 6-element (5 chars + '\\0') modifiable character array. These look similar but behave very differently when you try to modify the contents.`,
      codeExample: `#include <stdio.h>
#include <string.h>

int main(void) {
    /* String literal — read-only pointer */
    const char *greeting = "Hello, World!";
    printf("Greeting: %s\\n", greeting);
    printf("First char: %c\\n", greeting[0]);

    /* Character array initialized from a literal — writable copy */
    char name[] = "Alice";
    name[0] = 'B';              /* change 'A' to 'B' */
    printf("Modified name: %s\\n", name);

    /* Manual array with explicit null terminator */
    char word[6] = {'C', 'o', 'd', 'e', 'r', '\\0'};
    printf("Manual word: %s\\n", word);

    /* Reading a string with fgets (safe) */
    char line[80];
    printf("\\nBuffer contents example (hardcoded for demo):\\n");
    /* In a real program: fgets(line, sizeof(line), stdin); */
    /* Here we simulate what a user might type: */
    char *src = "Learning C is fun!";
    int i;
    for (i = 0; src[i] != '\\0' && i < 79; i++) {
        line[i] = src[i];
    }
    line[i] = '\\0';
    printf("Line: %s\\n", line);

    /* Traversing a string character by character */
    printf("Characters in greeting:\\n");
    for (int j = 0; greeting[j] != '\\0'; j++) {
        printf("  [%d] = '%c'\\n", j, greeting[j]);
    }

    /* String length without strlen — manual count */
    int len = 0;
    while (word[len] != '\\0') {
        len++;
    }
    printf("Length of '%s' counted manually: %d\\n", word, len);

    return 0;
}`,
      expectedOutput: `Greeting: Hello, World!
First char: H
Modified name: Blice

Buffer contents example (hardcoded for demo):
Line: Learning C is fun!
Characters in greeting:
  [0] = 'H'
  [1] = 'e'
  [2] = 'l'
  [3] = 'l'
  [4] = 'o'
  [5] = ','
  [6] = ' '
  [7] = 'W'
  [8] = 'o'
  [9] = 'r'
  [10] = 'l'
  [11] = 'd'
  [12] = '!'
Length of 'Coder' counted manually: 5`,
      keyTakeaways: [
        "C strings are null-terminated character arrays — every string ends with the '\\0' byte.",
        "String literals like \"hello\" are read-only; character arrays like char s[] = \"hello\" are writable.",
        "Always allocate at least strlen(s) + 1 bytes to hold a string copy, reserving space for '\\0'.",
        "Use fgets instead of scanf(\"%s\") for safe string input that prevents buffer overflows.",
        "Traverse a string with a loop checking for '\\0' to process each character individually.",
        "char *s = \"hi\" and char s[] = \"hi\" look similar but the first points to read-only memory."
      ],
      commonMistakes: [
        "Forgetting the null terminator when building a string manually — subsequent string functions will read garbage.",
        "Trying to modify a string literal through a char * pointer — this is undefined behaviour (usually a crash).",
        "Allocating strlen(s) bytes for a copy instead of strlen(s)+1, omitting space for '\\0'.",
        "Using scanf(\"%s\") without a width limit — it overflows the buffer with long input.",
        "Comparing strings with == instead of strcmp — == compares pointer addresses, not contents."
      ],
      bestPractices: [
        "Always declare char arrays large enough to hold the maximum content plus the null terminator.",
        "Use fgets(buf, sizeof(buf), stdin) for all string input from the keyboard.",
        "Declare string literals as const char * to let the compiler catch accidental modification attempts.",
        "After copying into a buffer, always ensure the last byte is '\\0' explicitly for safety.",
        "Use the string library functions (strlen, strcpy, strcmp) rather than reinventing them in loops."
      ],
      exercises: [
        {
          title: "Exercise 1 – String Length",
          description: "Write a function int my_strlen(const char *s) that counts and returns the number of characters in s (not including the null terminator) without using the standard strlen. Test it on three strings of different lengths.",
          hint: "Use a while loop that increments a counter as long as s[counter] != '\\0'."
        },
        {
          title: "Exercise 2 – Count Vowels",
          description: "Write a program that reads a string from the user with fgets, then counts and prints the number of vowels (a, e, i, o, u — both upper and lower case) it contains.",
          hint: "Traverse the string character by character. Use a switch or a series of if statements comparing each character to 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'."
        },
        {
          title: "Exercise 3 – Reverse a String In Place",
          description: "Write a function void reverse_string(char s[]) that reverses a string in place without using a second array. Use two index pointers — one starting from the left, one from the right — and swap characters until they meet in the middle.",
          hint: "Find the length with strlen (or your my_strlen). Use left=0, right=len-1, swap s[left] and s[right] with a temp char, increment left, decrement right, loop while left < right."
        }
      ],
      challenge: {
        title: "Challenge – Word Counter",
        description: "Write a program that reads a line of text (up to 256 characters) using fgets and counts the number of words in it. Define a word as a maximal sequence of non-whitespace characters. Handle multiple consecutive spaces, leading spaces, and trailing spaces correctly. Print the word count. Then also print each word on its own line by scanning through the string and printing characters that are not spaces.",
        hint: "Use a boolean variable in_word (0 or 1). When you transition from whitespace to a non-space character, increment the word counter and set in_word=1. When you see whitespace, set in_word=0."
      },
      quiz: [
        {
          question: "What character terminates every C string?",
          options: ["'.'", "'\\n'", "'\\0'", "' '"],
          correctIndex: 2,
          explanation: "The null character '\\0' (ASCII value 0) marks the end of every C string. String functions use it to know where the string ends."
        },
        {
          question: "What is the size of the array created by char s[] = \"cat\";?",
          options: ["3", "4", "5", "It depends on the compiler."],
          correctIndex: 1,
          explanation: "\"cat\" has 3 characters plus the null terminator '\\0', so the array has 4 elements."
        },
        {
          question: "Why is using == to compare two C strings incorrect?",
          options: [
            "== is only for integers, not chars.",
            "== compares the pointer addresses, not the string contents.",
            "== does not work with arrays at all.",
            "== is slower than strcmp."
          ],
          correctIndex: 1,
          explanation: "Array names decay to pointers. Using == compares the memory addresses where the strings are stored, not their character contents. Use strcmp instead."
        },
        {
          question: "What does char *s = \"hello\"; allow you to do that char s[] = \"hello\"; does not?",
          options: [
            "Read the string character by character.",
            "Point s to a completely different string literal later.",
            "Modify individual characters like s[0] = 'H'.",
            "Pass s to printf with %s."
          ],
          correctIndex: 1,
          explanation: "char *s can be reassigned to point to a different string. char s[] is a fixed array; s itself cannot point elsewhere, though its contents can be modified."
        },
        {
          question: "Why is fgets preferred over scanf(\"%s\") for reading user strings?",
          options: [
            "fgets is faster than scanf.",
            "scanf cannot read strings at all.",
            "fgets limits the number of characters read, preventing buffer overflow.",
            "fgets converts characters to uppercase automatically."
          ],
          correctIndex: 2,
          explanation: "fgets takes a maximum size argument and will not read more characters than the buffer can hold, preventing buffer overflow. scanf(\"%s\") without a width limit is unsafe."
        }
      ]
    },
    {
      id: "topic-4-7",
      title: "String Library Functions (string.h)",
      estimatedReadingTime: 8,
      explanation: `The C standard library provides a set of ready-made functions for working with strings, all declared in the header <string.h>. Learning these functions saves you from writing common string operations by hand and produces code that is faster, safer, and more readable. Every serious C programmer uses them routinely.

The most essential function is strlen(s), which returns the number of characters in the string s, not counting the null terminator. Its return type is size_t, an unsigned integer type. Use it whenever you need to know the length of a string — but be aware that it traverses the entire string each time it is called, so avoid calling it repeatedly inside a loop; store the result in a variable instead.

strcpy(dest, src) copies the string src (including the null terminator) into the buffer dest. You must ensure dest is large enough to hold all the characters of src plus the null terminator, or the copy will overflow the destination buffer. The safer alternative in modern C is strncpy(dest, src, n), which copies at most n characters and does not overflow the destination. However, strncpy does not guarantee null termination if src is longer than n, so you often need to manually set dest[n-1] = '\\0' after calling it.

strcat(dest, src) appends (concatenates) the string src onto the end of dest, overwriting dest's null terminator and adding a new one at the end. Again, dest must have enough space to hold both strings plus the null terminator. strncat(dest, src, n) is the safer bounded version.

strcmp(s1, s2) compares two strings lexicographically (character by character using ASCII values). It returns 0 if the strings are equal, a negative value if s1 comes before s2, and a positive value if s1 comes after s2. This is the correct way to compare C strings — never use == for string comparison.

strstr(haystack, needle) searches for the first occurrence of the substring needle inside the string haystack. It returns a pointer to the first character of the match, or NULL if needle is not found. strchr(s, c) finds the first occurrence of the character c in the string s and also returns a pointer or NULL. strtok(s, delimiters) tokenizes a string by splitting it at delimiter characters, returning successive tokens on repeated calls.`,
      codeExample: `#include <stdio.h>
#include <string.h>

int main(void) {
    char src[] = "Hello, C!";
    char dest[50];

    /* strlen: count characters (not including null terminator) */
    printf("strlen(\\\"Hello, C!\\\") = %zu\\n", strlen(src));

    /* strcpy: copy one string into another buffer */
    strcpy(dest, src);
    printf("strcpy result: %s\\n", dest);

    /* strcat: concatenate a string onto dest */
    strcat(dest, " Welcome!");
    printf("After strcat: %s\\n", dest);

    /* strcmp: compare two strings */
    char a[] = "apple";
    char b[] = "banana";
    int cmp = strcmp(a, b);
    if (cmp < 0) {
        printf("strcmp: \\\"%s\\\" comes before \\\"%s\\\"\\n", a, b);
    } else if (cmp > 0) {
        printf("strcmp: \\\"%s\\\" comes after \\\"%s\\\"\\n", a, b);
    } else {
        printf("strcmp: strings are equal\\n");
    }
    printf("strcmp(\\\"cat\\\",\\\"cat\\\") = %d\\n", strcmp("cat", "cat"));

    /* strstr: find a substring */
    const char *sentence = "The quick brown fox";
    const char *found = strstr(sentence, "brown");
    if (found) {
        printf("strstr found \\\"brown\\\" at position %ld\\n",
               found - sentence);
    }

    /* strchr: find a character */
    const char *pos = strchr(sentence, 'q');
    if (pos) {
        printf("strchr found 'q' at index %ld\\n", pos - sentence);
    }

    /* strtok: split a string by delimiter */
    char csv[] = "one,two,three,four";
    printf("strtok tokens: ");
    char *token = strtok(csv, ",");
    while (token != NULL) {
        printf("[%s] ", token);
        token = strtok(NULL, ",");
    }
    printf("\\n");

    return 0;
}`,
      expectedOutput: `strlen("Hello, C!") = 9
strcpy result: Hello, C!
After strcat: Hello, C! Welcome!
strcmp: "apple" comes before "banana"
strcmp("cat","cat") = 0
strstr found "brown" at position 10
strchr found 'q' at index 4
strtok tokens: [one] [two] [three] [four] `,
      keyTakeaways: [
        "strlen returns the number of characters in a string, not including the null terminator.",
        "strcpy copies a string into a buffer; always ensure the destination is large enough.",
        "strcat appends one string to another; the destination must have enough space for the combined result.",
        "strcmp compares two strings: returns 0 for equality, negative if s1 < s2, positive if s1 > s2.",
        "strstr finds a substring; strchr finds a single character — both return pointers or NULL.",
        "strtok splits a string into tokens on repeated calls, passing NULL after the first call."
      ],
      commonMistakes: [
        "Using strcpy or strcat into a buffer that is too small — this overflows and corrupts memory.",
        "Comparing strings with == instead of strcmp — == compares pointer addresses, not contents.",
        "Calling strlen inside a loop on the same string repeatedly — each call traverses the whole string; store the length first.",
        "Forgetting that strtok modifies the original string by inserting null bytes at delimiter positions.",
        "Assuming strncpy always null-terminates — it does not if src is longer than n; add dest[n-1]='\\0' manually."
      ],
      bestPractices: [
        "Always use snprintf or strncat instead of sprintf/strcat when the destination size is bounded.",
        "Store strlen results in a variable before loops to avoid redundant traversals.",
        "Pass sizeof(dest) to strncpy/strncat so the bound matches the actual buffer size.",
        "After strncpy, explicitly set dest[n-1] = '\\0' to guarantee null termination.",
        "Prefer strcmp return value comparison (== 0, < 0, > 0) over just testing for non-zero, which improves clarity."
      ],
      exercises: [
        {
          title: "Exercise 1 – String Copy and Append",
          description: "Declare a destination buffer of 100 characters. Use strcpy to copy the string \"Hello\" into it, then use strcat to append \", World!\". Print the result and its length using strlen.",
          hint: "Make sure the destination buffer is large enough for both strings and the null terminator before calling strcat."
        },
        {
          title: "Exercise 2 – Case-Insensitive Compare",
          description: "Write a function int str_equal_ignore_case(const char *a, const char *b) that returns 1 if two strings are equal ignoring case and 0 otherwise. Use a loop comparing tolower(a[i]) with tolower(b[i]) from <ctype.h> character by character.",
          hint: "If the lengths differ, they cannot be equal. Traverse character by character with tolower on both and compare. Return 0 immediately on the first mismatch."
        },
        {
          title: "Exercise 3 – Split CSV",
          description: "Write a program that defines a CSV string like \"Alice,30,Engineer\". Use strtok to split it by comma and print each field on its own line with a label like 'Field 1: Alice'.",
          hint: "Call strtok(csv, \",\") for the first token, then call strtok(NULL, \",\") in a loop for subsequent tokens. Use a counter to label each field."
        }
      ],
      challenge: {
        title: "Challenge – String Utilities Library",
        description: "Implement your own versions of four standard functions without using <string.h>: my_strlen, my_strcpy, my_strcat, and my_strcmp. Each must match the semantics of its standard counterpart. Then write a test harness in main that verifies each of your functions against the standard library versions on at least three different test strings, printing PASS or FAIL for each test.",
        hint: "For my_strcmp, traverse both strings simultaneously, comparing corresponding characters. Return the difference of the first differing characters (a[i] - b[i]). Check that both hit '\\0' at the same time for equality."
      },
      quiz: [
        {
          question: "What does strlen(\"hello\") return?",
          options: ["6", "5", "4", "It depends on the platform."],
          correctIndex: 1,
          explanation: "strlen counts characters up to but not including the null terminator. \"hello\" has 5 characters, so strlen returns 5."
        },
        {
          question: "What must be true about the destination buffer when calling strcpy(dest, src)?",
          options: [
            "dest must be exactly strlen(src) bytes.",
            "dest must be at least strlen(src) + 1 bytes to hold the string and its null terminator.",
            "dest and src must be the same size.",
            "dest must be NULL-initialized first."
          ],
          correctIndex: 1,
          explanation: "strcpy writes strlen(src) characters plus a null terminator, so dest must hold at least strlen(src) + 1 bytes."
        },
        {
          question: "What does strcmp(\"abc\", \"abc\") return?",
          options: ["1", "-1", "0", "3"],
          correctIndex: 2,
          explanation: "strcmp returns 0 when both strings are identical character-for-character."
        },
        {
          question: "What does strstr(\"abcdef\", \"cd\") return?",
          options: [
            "2 (the index)",
            "A pointer to the 'c' in \"abcdef\"",
            "A pointer to the 'd' in \"abcdef\"",
            "NULL"
          ],
          correctIndex: 1,
          explanation: "strstr returns a pointer to the first occurrence of the substring. \"cd\" starts at 'c' in \"abcdef\", so a pointer to that 'c' is returned."
        },
        {
          question: "After the first call to strtok(s, \",\"), how do you get the next token?",
          options: [
            "Call strtok(s, \",\") again with the same string.",
            "Call strtok(NULL, \",\") — pass NULL as the first argument.",
            "Call strtok(s + 1, \",\") to advance by one character.",
            "Call strstr to find the next comma manually."
          ],
          correctIndex: 1,
          explanation: "strtok maintains internal state after the first call. Passing NULL as the first argument tells it to continue scanning from where it left off."
        }
      ]
    },
    {
      id: "topic-4-8",
      title: "Pointers — Address-of, Dereference, and Basic Usage",
      estimatedReadingTime: 12,
      explanation: `A pointer is a variable that holds the memory address of another variable. Every variable in a C program lives at a specific location in memory, and that location has a numeric address. Pointers let you work with those addresses directly, giving you a level of control over memory that higher-level languages hide from you. Pointers are one of C's most powerful — and most feared — features. With practice and a clear mental model, they become natural.

The address-of operator & (a single ampersand) retrieves the memory address of a variable. If you write int x = 42; the expression &x gives you the address where x is stored. This address is typically a hexadecimal number like 0x7ffeed123abc, representing a position in your computer's memory. You can print it with the %p format specifier.

The dereference operator * (a single asterisk in an expression, not a declaration) does the opposite: given a pointer (an address), * gives you the value stored at that address. So if p holds the address of x, then *p reads the value of x. Writing *p = 99; stores 99 into the memory location that p points to, which changes x directly.

Declaring a pointer variable uses the * symbol in the declaration: int *p; declares p as a variable that will hold the address of an int. The type before the * matters — it tells the compiler what type of value is stored at the address, which determines how many bytes are read or written when you dereference the pointer and how pointer arithmetic works.

The relationship between & and * is that they are inverse operations: &(*p) gives back the original address, and *(&x) gives back the original value of x. You use & to get an address and * to follow an address to its value.

One of the most important uses of pointers is enabling functions to modify variables in the caller. As you saw in pass-by-value, a function cannot modify a caller's variable directly. But if you pass &x (the address of x) instead, the function can dereference the pointer to write directly to x's memory. This is how C implements "pass by reference" — by explicitly passing addresses.

Always initialize pointers before dereferencing them. An uninitialized pointer contains a garbage address; dereferencing it is undefined behaviour and typically crashes. The NULL pointer (value 0) is used as a sentinel meaning "this pointer points to nothing" — dereferencing NULL is always an error.`,
      codeExample: `#include <stdio.h>

/* A function that modifies the caller's variable via a pointer */
void increment(int *p) {
    *p = *p + 1;  /* dereference p to read and write the value at that address */
}

/* A function that swaps two integers — the correct way using pointers */
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10;
    int y = 20;

    /* & operator: get the address of x */
    printf("Value of x: %d\\n", x);
    printf("Address of x: %p\\n", (void *)&x);

    /* Declare a pointer and point it at x */
    int *p = &x;
    printf("Pointer p holds address: %p\\n", (void *)p);
    printf("Dereferencing p (*p): %d\\n", *p);

    /* Modify x through the pointer */
    *p = 99;
    printf("After *p = 99, x is now: %d\\n", x);

    /* Pass address to a function */
    increment(&x);
    printf("After increment(&x), x = %d\\n", x);

    /* Correct swap using pointers */
    printf("\\nBefore swap: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After swap:  x=%d, y=%d\\n", x, y);

    /* Pointer to pointer */
    int **pp = &p;  /* pp holds the address of the pointer p */
    printf("\\n**pp = %d (two dereferences)\\n", **pp);

    /* NULL pointer check */
    int *null_ptr = NULL;
    if (null_ptr == NULL) {
        printf("null_ptr is NULL — safe to not dereference.\\n");
    }

    return 0;
}`,
      expectedOutput: `Value of x: 10
Address of x: 0x7ffd5a1b2c3d
Pointer p holds address: 0x7ffd5a1b2c3d
Dereferencing p (*p): 10
After *p = 99, x is now: 99
After increment(&x), x = 100

Before swap: x=100, y=20
After swap:  x=20, y=100

**pp = 20 (two dereferences)
null_ptr is NULL — safe to not dereference.`,
      keyTakeaways: [
        "A pointer variable stores the memory address of another variable.",
        "The & operator returns the address of a variable; the * operator dereferences a pointer to access its value.",
        "Declare a pointer as type *name; the type determines how many bytes are accessed on dereference.",
        "Passing &variable to a function lets the function modify the caller's variable through pointer dereference.",
        "Always initialize pointers before dereferencing; an uninitialized pointer contains garbage and crashes.",
        "NULL is the null pointer constant; always check for NULL before dereferencing a pointer that might be null."
      ],
      commonMistakes: [
        "Confusing the * in a declaration (int *p — declares a pointer) with * in an expression (*p — dereferences).",
        "Dereferencing an uninitialized pointer — it holds a garbage address; reading or writing through it is undefined behaviour.",
        "Forgetting & when passing a variable's address to a function that expects a pointer parameter.",
        "Dereferencing NULL — this always causes a segmentation fault crash.",
        "Thinking that p = q copies the value at the address — it copies the address itself; use *p = *q to copy values."
      ],
      bestPractices: [
        "Initialize every pointer when you declare it, either to a valid address or to NULL.",
        "Check pointers for NULL before dereferencing them, especially pointers received from functions.",
        "Use descriptive names for pointer variables (like ptr_x or name_ptr) to make their purpose clear.",
        "When passing an output pointer to a function, check inside the function that the pointer is not NULL.",
        "Cast pointers to void * when printing with %p for portability."
      ],
      exercises: [
        {
          title: "Exercise 1 – Pointer Basics",
          description: "Declare three integer variables a, b, c with different values. Declare three pointers pa, pb, pc pointing to them. Print each variable's value both directly and through its pointer. Then modify each variable through its pointer and print the new values.",
          hint: "Use int *pa = &a; to declare and initialize each pointer. Use *pa = new_value; to modify through the pointer."
        },
        {
          title: "Exercise 2 – Min and Max via Pointers",
          description: "Write a function void min_max(int arr[], int n, int *out_min, int *out_max) that finds the minimum and maximum of an array and writes them to the locations pointed to by out_min and out_max. Call it from main and print the results.",
          hint: "Initialize *out_min = arr[0] and *out_max = arr[0], then loop comparing arr[i] against them, updating with *out_min = arr[i] when a smaller value is found."
        },
        {
          title: "Exercise 3 – Pointer Arithmetic Preview",
          description: "Declare int arr[] = {10, 20, 30, 40, 50} and int *p = arr. Print *p, *(p+1), *(p+2), *(p+3), and *(p+4) to access each element via pointer arithmetic. Confirm each matches arr[0] through arr[4].",
          hint: "*(p+i) is equivalent to arr[i] for all i in range. Just print each expression with printf(\"%d\\n\", *(p+i))."
        }
      ],
      challenge: {
        title: "Challenge – Implement qsort with a Comparator",
        description: "Use the standard library qsort function (from <stdlib.h>) to sort an array of 8 doubles in ascending order. qsort requires a comparator function with signature int compare(const void *a, const void *b). Inside the comparator, cast a and b to const double * and return negative, zero, or positive based on which is larger. Print the array before and after sorting.",
        hint: "The comparator should cast: const double *da = (const double *)a; const double *db = (const double *)b; Then return (*da > *db) - (*da < *db) for a clean three-way comparison."
      },
      quiz: [
        {
          question: "What does the & operator do when applied to a variable?",
          options: [
            "It returns the value stored in the variable.",
            "It returns the memory address of the variable.",
            "It performs a bitwise AND on the variable.",
            "It declares the variable as a pointer."
          ],
          correctIndex: 1,
          explanation: "The address-of operator & returns a pointer (memory address) to where the variable is stored."
        },
        {
          question: "Given int x = 5; int *p = &x; what does *p refer to?",
          options: [
            "The address of x.",
            "The pointer variable p itself.",
            "The value stored at the address p holds — which is x's value, 5.",
            "An error, because p is a pointer not an int."
          ],
          correctIndex: 2,
          explanation: "* is the dereference operator. *p follows the address stored in p and yields the value at that location, which is x = 5."
        },
        {
          question: "What is the purpose of the NULL pointer?",
          options: [
            "To represent a pointer that points to memory address 0 for reading.",
            "To represent a pointer that does not point to any valid object — used as a sentinel meaning 'no address'.",
            "To automatically free memory when assigned.",
            "To indicate that a pointer has been freed."
          ],
          correctIndex: 1,
          explanation: "NULL is a pointer value meaning 'points to nothing'. It is used to mark uninitialized or invalid pointers and as a sentinel return value."
        },
        {
          question: "What is the correct declaration for a pointer to an int?",
          options: ["int &p;", "int p*;", "pointer int p;", "int *p;"],
          correctIndex: 3,
          explanation: "In C, pointer declarations use the * before the variable name: int *p; declares p as a variable that holds the address of an int."
        },
        {
          question: "Why does passing a pointer to a function allow the function to modify the caller's variable?",
          options: [
            "Because the function receives a reference that automatically syncs.",
            "Because the function receives the address of the variable and can dereference it to write to that memory directly.",
            "Because C automatically passes all variables by reference to functions.",
            "Because the pointer copies the variable's value into a shared location."
          ],
          correctIndex: 1,
          explanation: "The function receives the address. By dereferencing with *, it writes to the exact memory location of the caller's variable, which persists after the function returns."
        }
      ]
    },
    {
      id: "topic-4-9",
      title: "Pointers and Arrays — Pointer Arithmetic",
      estimatedReadingTime: 10,
      explanation: `Arrays and pointers in C are intimately connected. When you use an array name in an expression (like passing it to a function or assigning it to a pointer), the array name automatically converts — "decays" — to a pointer to its first element. Understanding this relationship demystifies many C behaviors and is essential for writing functions that operate on arrays.

If you declare int arr[5] = {10, 20, 30, 40, 50}; and then int *p = arr; (note: no & needed — arr already decays to &arr[0]), then p points to arr[0]. You can now use p to access the array's elements through pointer arithmetic.

Pointer arithmetic is arithmetic performed on pointer values, where the unit is the size of the pointed-to type. Adding 1 to an int * advances the pointer by sizeof(int) bytes — typically 4 bytes — moving it to point at the next int. So p + 0 points to arr[0], p + 1 points to arr[1], p + 2 to arr[2], and so on. The dereference expressions *(p + 0), *(p + 1), *(p + 2) yield 10, 20, 30 respectively — identical to arr[0], arr[1], arr[2].

This equivalence is not just coincidental: in C, arr[i] is defined as *(arr + i). The bracket notation is literally syntactic sugar for pointer arithmetic and dereference. This means you can use pointer arithmetic and bracket notation interchangeably, and understanding this equivalence explains many idioms you will encounter in real C code.

Subtracting two pointers that point into the same array gives the number of elements between them — a value of type ptrdiff_t. This is useful for computing lengths and offsets. You can also compare pointers with <, >, ==, and != to determine relative positions within the same array.

Passing arrays to functions exploits this decay. When you write void func(int arr[], int n), the parameter int arr[] is exactly equivalent to int *p — arr receives a pointer to the first element. Changes made to arr[i] inside the function affect the original array. This is why functions that receive arrays can modify them without explicit pointer parameters.

The increment and decrement operators work naturally on pointers: p++ moves p forward by one element, and p-- moves it backward. A common C idiom for traversing an array is to iterate a pointer variable from the start to the end: for (int *p = arr; p < arr + SIZE; p++) { use *p; }.`,
      codeExample: `#include <stdio.h>

#define SIZE 5

/* Receives a pointer to the first element — modifies original array */
void scale(int *arr, int n, int factor) {
    for (int i = 0; i < n; i++) {
        arr[i] *= factor;   /* equivalent to *(arr + i) *= factor */
    }
}

int main(void) {
    int nums[SIZE] = {10, 20, 30, 40, 50};
    int *p = nums;   /* p points to nums[0] — no & needed */

    printf("Accessing via bracket notation:\\n");
    for (int i = 0; i < SIZE; i++) {
        printf("  nums[%d] = %d\\n", i, nums[i]);
    }

    printf("\\nAccessing via pointer arithmetic (*(p+i)):\\n");
    for (int i = 0; i < SIZE; i++) {
        printf("  *(p+%d) = %d\\n", i, *(p + i));
    }

    printf("\\nTraversing with pointer increment:\\n");
    for (int *q = nums; q < nums + SIZE; q++) {
        printf("  *q = %d  (address %p)\\n", *q, (void *)q);
    }

    /* Pointer subtraction to compute distance */
    int *first = &nums[0];
    int *last  = &nums[4];
    printf("\\nDistance between first and last: %td elements\\n",
           last - first);

    /* Confirming arr[i] == *(arr + i) */
    printf("\\nnums[3] = %d, *(nums+3) = %d (should be equal)\\n",
           nums[3], *(nums + 3));

    /* Passing array to function — function modifies original */
    scale(nums, SIZE, 2);
    printf("\\nAfter scale by 2: ");
    for (int i = 0; i < SIZE; i++) {
        printf("%d ", nums[i]);
    }
    printf("\\n");

    return 0;
}`,
      expectedOutput: `Accessing via bracket notation:
  nums[0] = 10
  nums[1] = 20
  nums[2] = 30
  nums[3] = 40
  nums[4] = 50

Accessing via pointer arithmetic (*(p+i)):
  *(p+0) = 10
  *(p+1) = 20
  *(p+2) = 30
  *(p+3) = 40
  *(p+4) = 50

Traversing with pointer increment:
  *q = 10  (address 0x7ffd...)
  *q = 20  (address 0x7ffd...)
  *q = 30  (address 0x7ffd...)
  *q = 40  (address 0x7ffd...)
  *q = 50  (address 0x7ffd...)

Distance between first and last: 4 elements

nums[3] = 40, *(nums+3) = 40 (should be equal)

After scale by 2: 20 40 60 80 100 `,
      keyTakeaways: [
        "Array names decay to a pointer to the first element in most expression contexts.",
        "arr[i] is exactly equivalent to *(arr + i) — bracket indexing is pointer arithmetic in disguise.",
        "Adding n to a pointer advances it by n elements (n * sizeof(type) bytes), not n bytes.",
        "Subtracting two pointers into the same array yields the element count between them.",
        "Functions that take int arr[] parameters receive a pointer; changes to arr[i] modify the original.",
        "The for (type *p = arr; p < arr + SIZE; p++) idiom iterates an array cleanly using pointer arithmetic."
      ],
      commonMistakes: [
        "Writing &arr when passing to a function — arr already decays to &arr[0]; &arr is a pointer to the array, not to the first element.",
        "Adding byte counts to a pointer instead of element counts — p + 4 for an int* moves 16 bytes, not 4.",
        "Comparing or subtracting pointers that do not point into the same array — undefined behaviour.",
        "Advancing a pointer past the end of an array (beyond arr + SIZE) and then dereferencing it — out of bounds.",
        "Confusing *(p + i) and (*p) + i — the first dereferences p+i, the second adds i to the value at p."
      ],
      bestPractices: [
        "Prefer arr[i] over *(arr+i) for clarity unless you are traversing with a pointer variable.",
        "Use a named SIZE constant in the loop bound (q < arr + SIZE) so it is always in sync with the declaration.",
        "When a function should not modify its array argument, declare the parameter as const int arr[].",
        "Use ptrdiff_t (from <stddef.h>) for pointer differences, not int, to ensure correctness on 64-bit platforms.",
        "After advancing a pointer past the array end, do not dereference it — this is out-of-bounds even if no swap happened."
      ],
      exercises: [
        {
          title: "Exercise 1 – Pointer Traversal",
          description: "Declare an array of 6 floats. Use a pointer variable (not array indexing) to traverse the array, printing each element's value and its memory address. Then use pointer arithmetic to compute and print the total sum.",
          hint: "Initialize float *p = arr; then in the loop use *p for the value and (void*)p for the address. Advance with p++."
        },
        {
          title: "Exercise 2 – Find in Array",
          description: "Write a function int *find(int *arr, int n, int target) that returns a pointer to the first occurrence of target in the array, or NULL if not found. In main, call it and print the index of the found element using pointer subtraction (result - arr).",
          hint: "Loop through the array; when arr[i] == target, return &arr[i]. If the loop ends without finding it, return NULL."
        },
        {
          title: "Exercise 3 – Pointer-Based String Length",
          description: "Write a function int ptr_strlen(const char *s) that returns the length of a string using only pointer arithmetic — no array indexing with brackets. Start with a pointer at s and advance it until you reach '\\0', counting steps.",
          hint: "Use a pointer variable char *end = s; and increment end++ in a while loop while *end != '\\0'. Then return end - s."
        }
      ],
      challenge: {
        title: "Challenge – Pointer-Based Array Utilities",
        description: "Write three functions using pointer arithmetic (no bracket indexing allowed in the function bodies): void ptr_reverse(int *arr, int n) that reverses an array in place, int *ptr_max(int *arr, int n) that returns a pointer to the maximum element, and void ptr_copy(int *dest, const int *src, int n) that copies n elements from src to dest. Test all three in main with a 7-element array and verify the results.",
        hint: "For ptr_reverse, use two pointers left and right starting at arr and arr+n-1, swapping *left and *right and moving inward. For ptr_max, initialize max_ptr = arr and advance through the array."
      },
      quiz: [
        {
          question: "When an array name like arr is used in most expressions, what does it become?",
          options: [
            "A copy of the entire array.",
            "A pointer to the first element of the array.",
            "A pointer to the last element.",
            "The size of the array."
          ],
          correctIndex: 1,
          explanation: "In most expression contexts, an array name decays to a pointer to its first element (type *), not a copy of the array."
        },
        {
          question: "If int *p = arr, what does *(p + 3) give you?",
          options: [
            "The address of arr[3].",
            "The value of arr[3].",
            "The value of arr[0] plus 3.",
            "The size of arr divided by 3."
          ],
          correctIndex: 1,
          explanation: "*(p + 3) dereferences the pointer at offset 3, yielding arr[3]. This is exactly equivalent to arr[3]."
        },
        {
          question: "For an int *p, what does p + 1 actually add to the address in bytes?",
          options: [
            "1 byte",
            "2 bytes",
            "sizeof(int) bytes (typically 4)",
            "8 bytes always"
          ],
          correctIndex: 2,
          explanation: "Pointer arithmetic scales by the size of the pointed-to type. Adding 1 to int * advances the address by sizeof(int) bytes."
        },
        {
          question: "What is the result of subtracting two pointers into the same array?",
          options: [
            "The difference of their addresses in bytes.",
            "The number of elements between them.",
            "A new pointer halfway between them.",
            "Always zero."
          ],
          correctIndex: 1,
          explanation: "Pointer subtraction on same-array pointers gives the number of elements (not bytes) between them — the result type is ptrdiff_t."
        },
        {
          question: "What does a function receive when you pass an array name to it?",
          options: [
            "A copy of all array elements.",
            "A pointer to the first element — changes inside the function affect the original.",
            "The size of the array.",
            "A read-only view of the array."
          ],
          correctIndex: 1,
          explanation: "Arrays decay to pointers when passed to functions. The function gets the address of the first element and can modify the original elements through it."
        }
      ]
    },
    {
      id: "topic-4-10",
      title: "Structs — Defining and Using Custom Data Types",
      estimatedReadingTime: 11,
      explanation: `A struct (short for structure) is a user-defined data type that groups together variables of different types under a single name. While an array holds many values of the same type, a struct holds a fixed set of named fields that can each be a different type. Structs let you model real-world entities naturally in code: a Person has a name (char array), an age (int), and a height (double). Instead of managing three separate variables for every person, you group them into one struct Person entity.

Defining a struct uses the keyword struct followed by a tag name and a brace-enclosed list of member declarations: struct Point { int x; int y; }; This definition is like a blueprint — it describes the shape of the data but does not allocate any memory. To actually create a variable of that struct type, you write struct Point p1; which reserves space for both x and y.

Accessing struct members uses the dot operator (.) for regular struct variables: p1.x = 3; p1.y = 4; printf("%d %d\\n", p1.x, p1.y);. The dot operator reads like "p1 dot x" — you are reaching into p1 and accessing its x member.

Structs can be initialized at declaration using a brace-enclosed list of values in the order the members are declared: struct Point origin = {0, 0}; or with designated initializers (C99) that name each field: struct Point p2 = {.x = 5, .y = 10};. Designated initializers are clearer for structs with many members.

You can also assign one struct variable to another with a simple = — this copies all the member values, unlike arrays which cannot be directly assigned. This makes struct assignment convenient when you want a copy of a structured value.

When you pass a struct to a function, it is passed by value — the entire struct is copied. If the struct is large or you want the function to modify the original, you pass a pointer to the struct instead. In that case, you use the arrow operator (->) to access members through the pointer: ptr->x is shorthand for (*ptr).x. The arrow operator is one of the most frequently used operators in C programs that work with structs and linked data structures.

Structs can be nested: a struct Rectangle might contain two struct Point members for its top-left and bottom-right corners. They can also be used in arrays — an array of structs is a natural way to represent a collection of related records, like a class roster of Student structs.`,
      codeExample: `#include <stdio.h>
#include <string.h>
#include <math.h>

/* Struct definition — a blueprint, not yet any memory */
struct Point {
    double x;
    double y;
};

struct Student {
    char name[50];
    int  age;
    double gpa;
};

/* Function that takes a struct by value — gets a copy */
double distance(struct Point a, struct Point b) {
    double dx = a.x - b.x;
    double dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
}

/* Function that takes a struct by pointer — modifies original */
void birthday(struct Student *s) {
    s->age += 1;   /* arrow operator: equivalent to (*s).age += 1 */
}

int main(void) {
    /* Declare and initialize using brace syntax */
    struct Point p1 = {0.0, 0.0};
    struct Point p2 = {3.0, 4.0};

    printf("p1: (%.1f, %.1f)\\n", p1.x, p1.y);
    printf("p2: (%.1f, %.1f)\\n", p2.x, p2.y);
    printf("Distance p1 to p2: %.2f\\n", distance(p1, p2));

    /* Designated initializers (C99) */
    struct Student alice = {.name = "Alice", .age = 20, .gpa = 3.75};
    printf("\\nStudent: %s, age %d, GPA %.2f\\n",
           alice.name, alice.age, alice.gpa);

    /* Modify via pointer — uses arrow operator */
    birthday(&alice);
    printf("After birthday: %s is now %d\\n", alice.name, alice.age);

    /* Struct assignment — copies all fields */
    struct Student bob = alice;
    strcpy(bob.name, "Bob");
    bob.gpa = 3.50;
    printf("Bob: %s, age %d, GPA %.2f\\n", bob.name, bob.age, bob.gpa);
    printf("Alice unchanged: %s, age %d\\n", alice.name, alice.age);

    /* Array of structs */
    struct Point points[3] = {{1, 2}, {4, 6}, {0, 0}};
    printf("\\nArray of points:\\n");
    for (int i = 0; i < 3; i++) {
        printf("  points[%d] = (%.0f, %.0f)\\n",
               i, points[i].x, points[i].y);
    }

    /* Nested struct */
    struct Rectangle {
        struct Point top_left;
        struct Point bottom_right;
    };
    struct Rectangle rect = {{0, 10}, {20, 0}};
    printf("\\nRect top-left: (%.0f, %.0f)\\n",
           rect.top_left.x, rect.top_left.y);

    return 0;
}`,
      expectedOutput: `p1: (0.0, 0.0)
p2: (3.0, 4.0)
Distance p1 to p2: 5.00

Student: Alice, age 20, GPA 3.75
After birthday: Alice is now 21
Bob: Bob, age 21, GPA 3.50
Alice unchanged: Alice, age 21

Array of points:
  points[0] = (1, 2)
  points[1] = (4, 6)
  points[2] = (0, 0)

Rect top-left: (0, 10)`,
      keyTakeaways: [
        "A struct groups variables of different types into a single named entity — like a record or object.",
        "struct definition is a type blueprint; you then declare variables of that struct type to allocate memory.",
        "Access members of a struct variable with the dot operator (s.member).",
        "Access members through a pointer with the arrow operator (ptr->member), equivalent to (*ptr).member.",
        "Structs are passed by value to functions (entire copy); pass a pointer for large structs or to allow modification.",
        "Struct assignment with = copies all members; unlike arrays, this works directly."
      ],
      commonMistakes: [
        "Forgetting the semicolon after the closing brace of a struct definition — struct { ... }; requires it.",
        "Using the dot operator on a struct pointer — you must use -> or dereference first: (*ptr).member.",
        "Passing a large struct by value to a function that should modify the original — use a pointer instead.",
        "Forgetting that struct assignment copies the fields, so modifying the copy does not affect the original.",
        "Naming a local struct variable the same as the struct tag, causing confusion: struct Point Point; is confusing."
      ],
      bestPractices: [
        "Use typedef to give structs a shorter alias: typedef struct Point { double x; double y; } Point; lets you write Point p instead of struct Point p.",
        "Use designated initializers (.field = value) for clarity when a struct has many members.",
        "Pass structs by pointer to functions that need to modify them or that receive large structs.",
        "Group closely related data into a struct to make function signatures shorter and more meaningful.",
        "Zero-initialize a struct with = {0} to ensure all members start at a known value."
      ],
      exercises: [
        {
          title: "Exercise 1 – Student Records",
          description: "Define a struct Student with fields: name (char array of 50), student_id (int), and grade (double). Create an array of 3 Student structs, initialize them with data, and write a function void print_student(struct Student s) that prints a student's details. Call it for each student.",
          hint: "Use strcpy to copy a string into the name field. Call print_student(students[i]) in a loop."
        },
        {
          title: "Exercise 2 – Rectangle Area and Perimeter",
          description: "Define a struct Rectangle with fields width and height (both double). Write two functions: double area(struct Rectangle r) and double perimeter(struct Rectangle r). In main, read width and height from the user, create a Rectangle struct, and call both functions, printing the results.",
          hint: "area returns r.width * r.height. perimeter returns 2 * (r.width + r.height). Pass by value is fine for this small struct."
        },
        {
          title: "Exercise 3 – Struct Pointer Modification",
          description: "Define a struct Counter with a single int field called count. Write two functions: void reset(struct Counter *c) that sets count to 0, and void tick(struct Counter *c) that increments count by 1. In main, create a Counter, call tick five times, print count, call reset, and print again.",
          hint: "Use c->count = 0 in reset and c->count++ in tick. Pass &my_counter to both functions."
        }
      ],
      challenge: {
        title: "Challenge – Contact Book",
        description: "Define a struct Contact with fields: name (char[60]), phone (char[20]), and email (char[80]). Create an array of 5 Contacts. Write functions: void add_contact(struct Contact book[], int *count, const char *name, const char *phone, const char *email) that adds a contact, void print_all(struct Contact book[], int count) that prints all contacts, and struct Contact *find_by_name(struct Contact book[], int count, const char *name) that returns a pointer to the matching contact or NULL. Populate the book with 3 contacts and test all functions.",
        hint: "add_contact uses strcpy to fill each field and increments *count via the pointer. find_by_name uses strcmp to compare names and returns &book[i] on a match."
      },
      quiz: [
        {
          question: "What is the purpose of a struct in C?",
          options: [
            "To store multiple values of the same type, like an array.",
            "To group variables of potentially different types under a single name.",
            "To allocate memory on the heap.",
            "To define a function prototype."
          ],
          correctIndex: 1,
          explanation: "A struct groups named fields that can be of different types, modeling a single entity with multiple attributes."
        },
        {
          question: "How do you access the field 'x' of a struct Point variable named p?",
          options: ["p->x", "p::x", "p[x]", "p.x"],
          correctIndex: 3,
          explanation: "The dot operator accesses a struct field through a variable: p.x. The arrow -> is used when you have a pointer to a struct."
        },
        {
          question: "If ptr is a struct Point *, which expression accesses its x field?",
          options: ["ptr.x", "ptr[x]", "ptr->x", "*ptr.x"],
          correctIndex: 2,
          explanation: "The arrow operator -> dereferences a struct pointer and accesses a field in one step: ptr->x is equivalent to (*ptr).x."
        },
        {
          question: "What does struct assignment (b = a) do for two struct variables?",
          options: [
            "Makes b an alias for a — both names refer to the same memory.",
            "Copies all field values from a into b independently.",
            "Causes a compile error because structs cannot be assigned.",
            "Copies only the first field."
          ],
          correctIndex: 1,
          explanation: "Struct assignment copies all member values from the right-hand side to the left-hand side. The two variables are independent after the copy."
        },
        {
          question: "When should you pass a struct to a function by pointer rather than by value?",
          options: [
            "Always, because pointers are faster.",
            "Never, structs should always be passed by value.",
            "When the function needs to modify the original struct or the struct is large and copying it is expensive.",
            "Only when the struct contains arrays."
          ],
          correctIndex: 2,
          explanation: "Pass by value copies the entire struct; for large structs this is wasteful. Pass a pointer when the function must modify the original or when avoiding a large copy."
        },
        {
          question: "What is wrong with the following: struct Foo { int x; int y; } (missing semicolon after closing brace)?",
          options: [
            "Nothing — the semicolon is optional.",
            "It is a syntax error; struct definitions must end with a semicolon.",
            "It causes a linker error.",
            "It declares x and y as global variables."
          ],
          correctIndex: 1,
          explanation: "Struct definitions are declarations and must end with a semicolon: struct Foo { int x; int y; };"
        }
      ]
    }
  ]
};
