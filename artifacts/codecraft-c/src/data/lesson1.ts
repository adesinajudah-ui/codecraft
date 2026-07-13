import type { Lesson } from "./types";

export const lesson1: Lesson = {
  id: "lesson-1",
  title: "Lesson 1 - C Basics",
  description: "Learn the foundational building blocks of C programming, from compilation and program structure to variables, I/O, operators, and code style.",
  topics: [
    {
      id: "topic-1-1",
      title: "Introduction to C and How Compilation Works",
      estimatedReadingTime: 8,
      explanation: `C is one of the oldest and most influential programming languages ever created. Developed in the early 1970s by Dennis Ritchie at Bell Labs, C was originally designed to write the Unix operating system. Despite its age, C remains extremely relevant today. Operating systems, embedded firmware, game engines, databases, and countless other critical pieces of software are still written in C. Learning C gives you a deep understanding of how computers actually work, which makes you a better programmer in any language.

Unlike languages like Python or JavaScript, which run inside an interpreter or a virtual machine, C is a compiled language. This means you write your source code in plain text files, and then a special program called a compiler translates that source code into machine code — the raw binary instructions your processor can execute directly. This extra step might seem inconvenient at first, but it results in programs that run extremely fast and use very little memory.

The compilation process in C actually involves several stages. First, the preprocessor scans your file looking for lines that start with a hash symbol. These are called preprocessor directives. The most common one is #include, which tells the preprocessor to paste the contents of another file into your code before compilation begins. For example, #include <stdio.h> brings in declarations for standard input and output functions like printf. The preprocessor also handles #define macros and conditional compilation.

After the preprocessor finishes, the compiler proper takes over. It reads your C source code and checks it for syntax errors — mistakes in the grammar of the language. If everything looks correct, the compiler translates your code into an intermediate format called object code. Object code is almost machine code, but it may reference functions that are defined in other files or libraries. A separate program called the linker then combines one or more object files with any required libraries to produce the final executable file.

On Linux and macOS, the most common C compiler is GCC, the GNU Compiler Collection. On Windows, you can use GCC through MinGW, or Microsoft's own MSVC compiler. To compile a simple C program called hello.c into an executable called hello, you run: gcc hello.c -o hello. Then you run the program by typing ./hello in your terminal. Understanding this flow — write source, compile, link, execute — is essential background knowledge that will help you make sense of error messages and understand what your tools are doing.`,
      codeExample: `/* This file shows the lifecycle of a C program.
   Save it as hello.c, then compile with:
   gcc hello.c -o hello
   Run it with: ./hello
*/

#include <stdio.h>   /* Preprocessor directive: include standard I/O */

int main(void)       /* Entry point of every C program */
{
    /* The printf function sends text to standard output */
    printf("Hello from C!\\n");
    printf("Compilation turned this source into machine code.\\n");

    return 0;        /* 0 means the program finished successfully */
}`,
      expectedOutput: `Hello from C!
Compilation turned this source into machine code.`,
      keyTakeaways: [
        "C is a compiled language; source code must be translated into machine code before it can run.",
        "The compilation pipeline has three main stages: preprocessing, compiling, and linking.",
        "GCC is the most widely used C compiler on Unix-like systems.",
        "The preprocessor handles directives like #include before the actual compilation begins.",
        "C programs are extremely fast because they run as native machine code with no interpreter in between."
      ],
      commonMistakes: [
        "Trying to run the .c source file directly instead of compiling it first — the OS cannot execute plain text.",
        "Forgetting the -o flag and not realising the output defaults to a file named 'a.out'.",
        "Confusing compiler errors (syntax problems in your code) with linker errors (missing function definitions).",
        "Not installing a C compiler and wondering why the gcc command is not found.",
        "Assuming that because a file compiles without errors, it will behave correctly at runtime."
      ],
      bestPractices: [
        "Always name your output executable meaningfully with the -o flag so it is clear what the binary does.",
        "Enable compiler warnings with -Wall -Wextra to catch potential problems early.",
        "Keep your source files small and focused; large single-file programs are hard to maintain.",
        "Learn to read compiler error messages carefully — they tell you the file, line number, and problem.",
        "Use a version control system like Git from the start so you can undo mistakes."
      ],
      exercises: [
        {
          title: "Exercise 1 - Identify Compilation Stages",
          description: "Write a short paragraph in a comment block inside a C file listing the three main stages of compilation (preprocessing, compiling, linking) and what each stage does. Then add a printf statement that prints the name of the compiler you are using.",
          hint: "Start with /* ... */ for multi-line comments. Use printf(\"GCC\\n\"); for the output — replace GCC with whatever compiler you have installed."
        },
        {
          title: "Exercise 2 - Compile and Run",
          description: "Create a file called my_first.c, write a complete C program that prints your name and the current year on separate lines, compile it with gcc, and run the resulting executable. Record the exact gcc command you used.",
          hint: "You need #include <stdio.h> at the top, int main(void) as the function, two printf calls each ending with \\n, and return 0; at the end."
        },
        {
          title: "Exercise 3 - Intentional Error",
          description: "Take the hello.c example, remove the semicolon from the end of the printf line, try to compile it, and write down exactly what error message GCC prints. Then fix the error and compile successfully.",
          hint: "GCC error messages follow the pattern filename:line:column: error: description. The line number tells you exactly where the problem is."
        }
      ],
      challenge: {
        title: "Challenge - Trace the Toolchain",
        description: "Use GCC's step-by-step flags to observe each compilation stage. Run 'gcc -E hello.c -o hello.i' to see the preprocessor output, then 'gcc -S hello.i -o hello.s' to see the assembly, then 'gcc -c hello.s -o hello.o' to create the object file, and finally 'gcc hello.o -o hello' to link. Examine each intermediate file and write a comment in hello.c describing what you found in each stage's output.",
        hint: "The .i file will be very long because #include <stdio.h> pastes in hundreds of lines. The .s file contains human-readable assembly instructions. The .o file is binary and mostly unreadable in a text editor."
      },
      quiz: [
        {
          question: "Who created the C programming language?",
          options: ["Bjarne Stroustrup", "Dennis Ritchie", "Linus Torvalds", "Brian Kernighan"],
          correctIndex: 1,
          explanation: "Dennis Ritchie developed C at Bell Labs in the early 1970s. Bjarne Stroustrup later created C++, which is based on C."
        },
        {
          question: "What does a C compiler do?",
          options: [
            "It runs your C code line by line as you type it",
            "It converts C source code into machine code that the processor can execute",
            "It checks your spelling and grammar in comments",
            "It connects your program to the internet"
          ],
          correctIndex: 1,
          explanation: "A compiler translates the entire source file from human-readable C code into binary machine code that the CPU can execute directly, unlike an interpreter which runs code line by line."
        },
        {
          question: "Which of the following is the correct command to compile hello.c into an executable named hello using GCC?",
          options: [
            "run hello.c -output hello",
            "gcc hello.c -o hello",
            "compile -c hello.c hello",
            "gcc -run hello.c"
          ],
          correctIndex: 1,
          explanation: "The -o flag specifies the output filename. 'gcc hello.c -o hello' compiles hello.c and places the result in an executable called hello."
        },
        {
          question: "What is the role of the preprocessor in the C compilation pipeline?",
          options: [
            "It links object files into an executable",
            "It converts C code to assembly language",
            "It processes directives like #include and #define before compilation",
            "It optimises the machine code after compilation"
          ],
          correctIndex: 2,
          explanation: "The preprocessor handles all lines starting with '#', such as #include (which pastes in header file contents) and #define (which creates text macros), before the compiler sees your code."
        },
        {
          question: "What does the linker do?",
          options: [
            "It checks your code for syntax errors",
            "It combines object files and libraries into a final executable",
            "It formats your source code for readability",
            "It runs your program in a sandbox for testing"
          ],
          correctIndex: 1,
          explanation: "The linker takes one or more compiled object files and combines them with any libraries they depend on to produce the final runnable executable."
        },
        {
          question: "If you compile with 'gcc hello.c' and do not specify an output name with -o, what is the default name of the executable?",
          options: ["hello", "hello.exe", "a.out", "output"],
          correctIndex: 2,
          explanation: "On Unix-like systems, GCC defaults to producing an executable named 'a.out' when no output filename is specified with the -o flag."
        },
        {
          question: "What does the #include <stdio.h> directive do?",
          options: [
            "It imports the Python standard library",
            "It tells the linker to include the stdio object file",
            "It pastes the contents of stdio.h into your source file before compilation",
            "It makes the program run faster"
          ],
          correctIndex: 2,
          explanation: "The preprocessor replaces #include <stdio.h> with the actual contents of that header file, which contains function declarations like printf and scanf so the compiler knows their signatures."
        },
        {
          question: "C is described as a compiled language. What is the main practical advantage of this?",
          options: [
            "Compiled programs are easier to write than interpreted ones",
            "Compiled programs run as native machine code and are therefore very fast",
            "Compiled programs do not need a CPU to run",
            "Compiled programs are always shorter than interpreted ones"
          ],
          correctIndex: 1,
          explanation: "Because compiled C programs are translated to machine code before execution, they run directly on the hardware with no interpreter overhead, which makes them extremely fast."
        },
        {
          question: "What kind of file does the compiler produce before linking?",
          options: ["An executable file", "A source file", "An object file", "A header file"],
          correctIndex: 2,
          explanation: "The compiler produces object files (typically with a .o extension) that contain machine code but still have unresolved references to external functions. The linker then resolves those references."
        },
        {
          question: "Which flag tells GCC to enable all common warnings?",
          options: ["-w", "-Wall", "-warn", "-errors"],
          correctIndex: 1,
          explanation: "-Wall enables a broad set of warning messages that alert you to potentially problematic code patterns. These warnings do not stop compilation but highlight things you should review."
        },
        {
          question: "What is a preprocessor directive?",
          options: [
            "A line in C code that begins with # and is processed before compilation",
            "A comment that explains what the program does",
            "A function that runs before main()",
            "A type of loop that executes before the main loop"
          ],
          correctIndex: 0,
          explanation: "Preprocessor directives start with # and are handled by the preprocessor before the compiler sees your code. Examples include #include, #define, and #ifdef."
        },
        {
          question: "When was C created?",
          options: ["Early 1950s", "Early 1970s", "Early 1990s", "Early 2000s"],
          correctIndex: 1,
          explanation: "C was developed in the early 1970s at Bell Labs, primarily by Dennis Ritchie, and was closely associated with the development of the Unix operating system."
        },
        {
          question: "Which of the following is NOT a stage of the C compilation process?",
          options: ["Preprocessing", "Interpreting", "Compiling", "Linking"],
          correctIndex: 1,
          explanation: "Interpreting is not part of the C compilation pipeline. C is compiled, not interpreted. The three stages are preprocessing, compiling (to object code), and linking."
        },
        {
          question: "Why is C still widely used today despite being over 50 years old?",
          options: [
            "Because newer languages do not work on modern computers",
            "Because C programs are the easiest to write",
            "Because C offers performance, low-level hardware access, and portability",
            "Because C is the only language that supports functions"
          ],
          correctIndex: 2,
          explanation: "C is still dominant in systems programming, embedded systems, and performance-critical software because it generates fast code, gives direct hardware access, and runs on nearly every platform."
        },
        {
          question: "What does 'return 0;' at the end of main() signify?",
          options: [
            "The program ran zero times",
            "The program encountered an error",
            "The program finished successfully (exit code 0 means success)",
            "The program will restart from the beginning"
          ],
          correctIndex: 2,
          explanation: "By convention, returning 0 from main() tells the operating system the program completed without errors. Non-zero return values typically indicate an error condition."
        },
        {
          question: "What is the file extension for C source files?",
          options: [".cpp", ".c", ".cs", ".java"],
          correctIndex: 1,
          explanation: "C source files use the .c extension. Files ending in .cpp are C++ source files, .cs is C#, and .java is Java."
        },
        {
          question: "What does the GCC flag -S produce?",
          options: [
            "A compiled executable",
            "An object file",
            "Assembly language output",
            "A preprocessed source file"
          ],
          correctIndex: 2,
          explanation: "The -S flag tells GCC to stop after compilation and output human-readable assembly language code (.s file) rather than continuing to produce an object file or executable."
        },
        {
          question: "What happens if your C source code has a syntax error?",
          options: [
            "The program compiles but crashes at runtime",
            "The compiler reports an error and does not produce an executable",
            "The program runs but skips the broken line",
            "The preprocessor fixes the error automatically"
          ],
          correctIndex: 1,
          explanation: "Syntax errors prevent compilation. The compiler stops and reports the error with a file name and line number; no executable is produced until all syntax errors are corrected."
        },
        {
          question: "Which organisation developed the GCC compiler?",
          options: ["Microsoft", "Apple", "The GNU Project", "Bell Labs"],
          correctIndex: 2,
          explanation: "GCC stands for GNU Compiler Collection and was developed by the GNU Project, founded by Richard Stallman, as part of the free software movement."
        },
        {
          question: "What is the purpose of a header file in C?",
          options: [
            "It contains the main() function for a program",
            "It stores the compiled machine code",
            "It declares function signatures and types so the compiler knows how to use them",
            "It holds the program's data while it runs"
          ],
          correctIndex: 2,
          explanation: "Header files (with .h extension) contain declarations — function prototypes, type definitions, and macros — that tell the compiler how to use functions defined elsewhere, like those in the standard library."
        }
      ]
    },
    {
      id: "topic-1-2",
      title: "Setting Up and Writing Your First C Program",
      estimatedReadingTime: 7,
      explanation: `Before you can write and run C programs, you need to set up your development environment. The good news is that the tools you need are free and available on every major operating system. On Linux, you can install GCC by running your package manager — for example, on Ubuntu or Debian you would type 'sudo apt install build-essential' in a terminal. On macOS, you can get a C compiler by installing Xcode Command Line Tools with the command 'xcode-select --install'. On Windows, a popular option is to install MinGW-w64 which provides GCC for Windows, or you can use Windows Subsystem for Linux (WSL) to get a full Linux environment.

You also need a text editor or an integrated development environment (IDE) to write your code. For absolute beginners, Visual Studio Code (VS Code) is an excellent choice — it is free, lightweight, and has extensions for C that provide syntax highlighting and error hints. Other choices include CLion, Code::Blocks, or even a simple terminal editor like nano or vim. What matters is that the tool saves plain text files — never write C code in a word processor like Microsoft Word, because those programs add hidden formatting that will confuse the compiler.

Once your environment is ready, writing your first C program is surprisingly straightforward. Every C program starts with one or more #include directives to bring in the functions you need, followed by the main function. The main function is where every C program begins executing. Inside main, you write statements — instructions for the computer to carry out — each ending with a semicolon. When main returns, the program ends.

The most important function for a beginner is printf, which stands for "print formatted." It sends text to the terminal. You pass it a string enclosed in double quotes, and it displays that string. The special sequence backslash-n (written as \n inside the string) tells printf to move to the next line, just like pressing Enter on a keyboard. Without \n at the end of your output, the next line of text (or your terminal prompt) will appear immediately after your output on the same line.

A common first mistake is to type the code but never save the file, or to save it with the wrong extension. Make sure your file is saved with the .c extension before trying to compile. Another common issue is using a full-featured text editor that uses "smart quotes" (curly quote marks) instead of straight double quotes. The compiler will not understand curly quotes. Always use a programming-focused text editor that uses plain ASCII characters.`,
      codeExample: `/* first_program.c
   A complete, working first C program.
   Compile: gcc first_program.c -o first_program
   Run:     ./first_program
*/

#include <stdio.h>   /* Gives us access to printf */

int main(void)
{
    printf("Welcome to C programming!\\n");
    printf("My name is Alice.\\n");
    printf("I am learning to code.\\n");

    return 0;   /* Tell the OS everything went fine */
}`,
      expectedOutput: `Welcome to C programming!
My name is Alice.
I am learning to code.`,
      keyTakeaways: [
        "You need a C compiler (GCC on Linux/macOS/Windows) and a plain-text editor to write C programs.",
        "Every C program must have a main() function — this is where execution begins.",
        "printf is used to print text to the terminal; use \\n to move to a new line.",
        "Each statement in C must end with a semicolon.",
        "Save your file with a .c extension before compiling."
      ],
      commonMistakes: [
        "Using a word processor like Word to write code — these insert hidden formatting characters that break the compiler.",
        "Forgetting to save the file before compiling, so the compiler sees an older version of your code.",
        "Not adding \\n at the end of printf strings, causing output to appear on the same line as the terminal prompt.",
        "Using curly (smart) quotes instead of straight double quotes around strings.",
        "Forgetting the semicolon at the end of a statement — this is one of the most common beginner errors."
      ],
      bestPractices: [
        "Use a dedicated code editor like VS Code with the C/C++ extension for syntax highlighting and error feedback.",
        "Compile and test your program after every small change — do not write hundreds of lines before testing.",
        "Choose descriptive filenames like calculator.c rather than vague names like test.c or my_file.c.",
        "Keep a terminal window open next to your editor so you can compile and run quickly.",
        "Read every compiler error message carefully; they contain the line number and a description of the problem."
      ],
      exercises: [
        {
          title: "Exercise 1 - Your Hello World",
          description: "Write a C program that prints 'Hello, World!' followed by a blank line and then your name. Make sure each piece of output is on its own line. Compile and run it.",
          hint: "Use three printf calls. For the blank line, call printf with just '\\n' inside the quotes, or add two \\n at the end of the first printf string."
        },
        {
          title: "Exercise 2 - Multi-line Story",
          description: "Write a C program that prints a three-sentence story about anything you like. Each sentence should appear on its own line. The program must compile cleanly with no warnings when you use 'gcc -Wall -Wextra yourfile.c -o yourfile'.",
          hint: "You will need three printf calls, each with a string ending in \\n. Make sure every printf call ends with a semicolon."
        },
        {
          title: "Exercise 3 - Environment Check",
          description: "Write a C program that prints the name of your operating system, the name of the compiler you are using, and the version of GCC (you can find this by running 'gcc --version' in your terminal). Print each piece of information on its own line with a label, e.g. 'OS: Linux'.",
          hint: "Just hardcode the information as strings in your printf calls — for example printf(\"OS: Linux\\n\");. You do not need to detect these automatically yet."
        }
      ],
      challenge: {
        title: "Challenge - ASCII Art Banner",
        description: "Write a C program that prints your name as a simple ASCII art banner using multiple printf statements. For example, if your name is 'Al', you might draw large block letters made of asterisks. The banner should be at least 3 lines tall and use multiple printf calls. Compile with -Wall -Wextra and ensure there are no warnings.",
        hint: "Think of each row of your banner as one printf call. Align characters carefully — spaces inside the string count. You might sketch your design on paper first before writing the code."
      },
      quiz: [
        {
          question: "What command installs build tools including GCC on Ubuntu Linux?",
          options: [
            "apt install gcc-tools",
            "sudo apt install build-essential",
            "brew install gcc",
            "yum install c-compiler"
          ],
          correctIndex: 1,
          explanation: "'build-essential' is a meta-package on Debian/Ubuntu systems that installs GCC, G++, make, and other essential build tools in one command. 'brew install gcc' is the macOS Homebrew command."
        },
        {
          question: "What is the entry point of every C program?",
          options: ["start()", "begin()", "main()", "run()"],
          correctIndex: 2,
          explanation: "Every C program must have a function called main(). When the OS runs your program, execution begins at the first line inside main()."
        },
        {
          question: "What does \\n represent inside a printf string?",
          options: [
            "The letter n",
            "A tab character",
            "A newline character (moves output to the next line)",
            "The end of the program"
          ],
          correctIndex: 2,
          explanation: "\\n is an escape sequence representing the newline character (ASCII 10). When printf encounters it, it moves the cursor to the beginning of the next line."
        },
        {
          question: "Which character must appear at the end of every C statement?",
          options: [":", ".", ";", ","],
          correctIndex: 2,
          explanation: "In C, every statement must be terminated with a semicolon. Forgetting a semicolon is one of the most common causes of compiler errors for beginners."
        },
        {
          question: "Why should you NOT write C code in Microsoft Word?",
          options: [
            "Word does not support the C language file extension",
            "Word inserts hidden formatting characters that confuse the compiler",
            "Word files are too large for the compiler to read",
            "Word does not allow saving files"
          ],
          correctIndex: 1,
          explanation: "Word processors add hidden formatting metadata (fonts, styles, etc.) that are invisible to you but make the file invalid for a compiler, which expects plain ASCII text."
        },
        {
          question: "What does printf stand for?",
          options: ["print function", "print formatted", "print file", "process and format"],
          correctIndex: 1,
          explanation: "printf stands for 'print formatted'. The 'f' at the end refers to its ability to format output using format specifiers like %d and %s, which you will learn about later."
        },
        {
          question: "What file extension must C source files have?",
          options: [".cpp", ".txt", ".c", ".exe"],
          correctIndex: 2,
          explanation: "C source files must use the .c extension. The compiler uses this extension to identify the file as C source code. .cpp is for C++ files."
        },
        {
          question: "Which of the following is a good, free code editor for writing C programs?",
          options: ["Microsoft Word", "Visual Studio Code", "Adobe Photoshop", "VLC Media Player"],
          correctIndex: 1,
          explanation: "Visual Studio Code is a free, lightweight code editor with excellent C/C++ extension support. It provides syntax highlighting, error hints, and terminal integration."
        },
        {
          question: "What happens if you forget to save your source file before compiling?",
          options: [
            "The compiler refuses to start",
            "The compiler may compile an older saved version of your file",
            "The operating system deletes the file",
            "Nothing — the compiler always uses the latest version in memory"
          ],
          correctIndex: 1,
          explanation: "The compiler reads the file from disk. If you have unsaved changes in your editor, the compiler sees the last saved version, which may not include your recent edits."
        },
        {
          question: "What command installs Xcode Command Line Tools (which includes a C compiler) on macOS?",
          options: [
            "brew install gcc",
            "sudo apt install build-essential",
            "xcode-select --install",
            "install-gcc --macos"
          ],
          correctIndex: 2,
          explanation: "'xcode-select --install' prompts macOS to install the Xcode Command Line Tools, which include the clang C compiler and other development utilities."
        },
        {
          question: "In the program 'int main(void)', what does 'void' mean in this context?",
          options: [
            "The function returns nothing",
            "The function takes no arguments (parameters)",
            "The function is empty",
            "The function will be deleted"
          ],
          correctIndex: 1,
          explanation: "'void' inside the parentheses means main takes no parameters from the command line. This is an explicit way of saying 'this function accepts no arguments'."
        },
        {
          question: "Which of the following printf calls correctly prints 'Hello' on one line and 'World' on the next?",
          options: [
            "printf(\"Hello World\");",
            "printf(\"Hello\\nWorld\\n\");",
            "printf(\"Hello\", \"World\");",
            "printf(Hello\\nWorld);"
          ],
          correctIndex: 1,
          explanation: "The \\n escape sequence creates a newline. 'printf(\"Hello\\nWorld\\n\");' prints Hello, moves to the next line, prints World, and then moves to another new line."
        },
        {
          question: "What does 'return 0;' do inside main()?",
          options: [
            "Restarts the program",
            "Prints the number 0",
            "Signals to the operating system that the program ended successfully",
            "Declares a variable called 0"
          ],
          correctIndex: 2,
          explanation: "Returning 0 from main() is the standard way to tell the OS the program completed without errors. The OS can check this exit code in shell scripts."
        },
        {
          question: "What is Windows Subsystem for Linux (WSL) useful for?",
          options: [
            "Running Windows programs on Linux",
            "Running a Linux environment directly on Windows to use Linux tools like GCC",
            "Converting C code to Windows-only code",
            "Compiling programs faster than native Windows tools"
          ],
          correctIndex: 1,
          explanation: "WSL lets Windows users run a real Linux environment without a virtual machine, giving access to standard Linux development tools including GCC and bash."
        },
        {
          question: "What does the -Wall flag do when passed to GCC?",
          options: [
            "Compiles all .c files in the current directory",
            "Creates a wall of text output",
            "Enables a comprehensive set of compiler warnings",
            "Makes the executable run on all platforms"
          ],
          correctIndex: 2,
          explanation: "-Wall stands for 'warn all' and enables many useful warning messages. These are not errors but flag potential problems you should investigate and fix."
        },
        {
          question: "If a friend sends you code with curly quote marks like \u201cHello\u201d instead of straight quotes like \"Hello\", what will happen when you compile it?",
          options: [
            "It will compile and run normally",
            "The compiler will automatically fix the quotes",
            "The compiler will report an error because curly quotes are not valid C syntax",
            "The program will print the curly quote characters"
          ],
          correctIndex: 2,
          explanation: "The C compiler expects plain ASCII double-quote characters. Unicode curly/smart quotes are not valid string delimiters in C and will cause a compile error."
        },
        {
          question: "How many main() functions can a C program have?",
          options: ["As many as you need", "Two — one for startup and one for shutdown", "Exactly one", "Zero — main is optional"],
          correctIndex: 2,
          explanation: "A C program must have exactly one main() function. Having zero results in a linker error, and having more than one also causes a linker error due to duplicate symbols."
        },
        {
          question: "Which best describes a good habit when writing C programs?",
          options: [
            "Write the entire program before compiling for the first time",
            "Compile and test after every small change",
            "Avoid using comments so the file stays small",
            "Use the same filename for every program to save time"
          ],
          correctIndex: 1,
          explanation: "Compiling frequently means errors are caught early when they are easy to fix. Writing hundreds of lines before testing makes debugging much harder."
        },
        {
          question: "What does MinGW-w64 provide for Windows users?",
          options: [
            "A graphical C programming environment built by Microsoft",
            "A port of GCC and related tools for the Windows operating system",
            "A virtual machine to run Linux programs",
            "A C interpreter that runs without compilation"
          ],
          correctIndex: 1,
          explanation: "MinGW-w64 (Minimalist GNU for Windows 64-bit) is a port of the GCC compiler toolchain to Windows, allowing Windows developers to compile C programs natively."
        },
        {
          question: "What is the output of this program?\n\nprintf(\"Line 1\\nLine 2\\n\");",
          options: [
            "Line 1\\nLine 2\\n",
            "Line 1 Line 2",
            "Line 1\nLine 2",
            "Line1\nLine2"
          ],
          correctIndex: 2,
          explanation: "The \\n sequences are interpreted as real newlines. The output is 'Line 1' on one line and 'Line 2' on the next, both followed by newlines."
        }
      ]
    },
    {
      id: "topic-1-3",
      title: "Structure of a C Program",
      estimatedReadingTime: 9,
      explanation: `Every C program follows a recognisable structure. Once you understand this structure, reading and writing C becomes much more intuitive. At the very top of a C source file, you will find preprocessor directives — lines beginning with #. These are instructions to the preprocessor that run before the compiler sees your code. The most common directive is #include, which imports declarations from header files. Header files end in .h and contain declarations for functions you want to use, such as printf from stdio.h.

After the preprocessor directives, you typically find global declarations. These might be constant definitions using #define, global variable declarations, or the signatures (prototypes) of functions you plan to write later in the file. You do not always need global declarations in simple programs, but understanding where they go is important as your programs grow.

The heart of every C program is the main() function. In C, a function is a named block of code that performs a specific task. The syntax for defining a function is: return_type function_name(parameters) { body }. For main(), the return type is int (meaning main returns an integer to the operating system), and the function name is main. The body is everything between the opening curly brace { and the closing curly brace }. The body contains declarations of local variables and executable statements. Statements are executed in order from top to bottom unless a control structure (like an if statement or a loop) changes the flow.

Curly braces are used throughout C to group things together. A pair of { } defines a block. Every function body is a block. Blocks can be nested — you can have blocks inside blocks, which is what happens when you write an if statement inside a function. The indentation of code inside blocks is not required by the compiler, but it is essential for human readers. Consistent indentation (usually 4 spaces or one tab per level) makes the structure of your program visually obvious.

A C program can also contain multiple functions beyond main. You might define a function called greet() that handles printing a greeting, and then call greet() from main. Each function is defined at the same level as main (not inside main). This separation of concerns — dividing your program into functions with specific jobs — is a fundamental principle of good programming. Even though you are just starting out, getting into the habit of thinking in functions will save you enormous effort as your programs grow more complex.`,
      codeExample: `/* structure_demo.c
   Demonstrates the standard structure of a C program.
   Compile: gcc structure_demo.c -o structure_demo
   Run:     ./structure_demo
*/

#include <stdio.h>   /* Preprocessor directive: standard I/O */
#include <stdlib.h>  /* Preprocessor directive: standard library */

/* A global constant defined with #define */
#define PROGRAM_VERSION 1

/* A function prototype (declaration) for a function defined later */
void print_info(void);

/* The main function: entry point of the program */
int main(void)
{
    printf("Program version: %d\\n", PROGRAM_VERSION);

    /* Call our custom function */
    print_info();

    return 0;  /* Successful exit */
}

/* Definition of the print_info function */
void print_info(void)
{
    printf("This program demonstrates C structure.\\n");
    printf("Functions keep code organised and reusable.\\n");
}`,
      expectedOutput: `Program version: 1
This program demonstrates C structure.
Functions keep code organised and reusable.`,
      keyTakeaways: [
        "A C program begins with preprocessor directives (#include, #define), followed by global declarations, then function definitions.",
        "The main() function is the entry point; every program has exactly one.",
        "Curly braces {} define blocks; every function body is enclosed in a block.",
        "Statements inside a block are executed top to bottom in order.",
        "Programs can contain multiple functions; dividing code into functions keeps it organised."
      ],
      commonMistakes: [
        "Placing #include directives after the function definitions — they must appear at the top of the file.",
        "Forgetting to close a curly brace, causing the compiler to think the function continues past where you intended.",
        "Writing code outside any function (other than declarations) — executable statements must be inside a function.",
        "Calling a function before declaring or defining it — the compiler needs to know the function's signature before the call.",
        "Using inconsistent indentation, making it very hard to spot mismatched braces."
      ],
      bestPractices: [
        "Always put #include directives at the very top of your file, before everything else.",
        "Use consistent indentation (4 spaces is the most common convention) for every level of nesting.",
        "Add a function prototype near the top of your file if you define a function after main, so the compiler knows about it.",
        "Keep each function short and focused on one task — if a function is getting very long, consider splitting it.",
        "Use blank lines to visually separate sections of your file (preprocessor directives, declarations, functions)."
      ],
      exercises: [
        {
          title: "Exercise 1 - Label the Parts",
          description: "Copy the code example into a file. Add a comment above each section (preprocessor directives, global constant, function prototype, main body, function definition) explaining in plain English what that section does.",
          hint: "Use /* ... */ for multi-line comments or // for single-line comments. Place each comment on its own line immediately above the section it describes."
        },
        {
          title: "Exercise 2 - Add a Second Function",
          description: "Extend the code example by writing a second custom function called print_farewell() that prints a goodbye message. Add its prototype near the top of the file, define it after main, and call it from main after the call to print_info().",
          hint: "The prototype goes near the top: 'void print_farewell(void);'. The definition looks like the print_info definition but with different printf content. Call it with print_farewell(); inside main."
        },
        {
          title: "Exercise 3 - Spot the Errors",
          description: "The following code has three structural errors. Find and fix all three:\n\nvoid greet(void);\nint main(void)\nprintf(\"Hello\\n\");\ngreet();\nreturn 0;\nvoid greet(void) { printf(\"Greetings!\\n\"); }",
          hint: "Look for missing curly braces around the main body, and check whether the function definition is complete."
        }
      ],
      challenge: {
        title: "Challenge - Three-Function Program",
        description: "Write a C program with three custom functions in addition to main. The first function prints a welcome banner, the second prints three interesting facts about C, and the third prints a farewell message. Main should call all three functions in order. Use proper prototypes, consistent indentation, and compile with -Wall -Wextra with no warnings.",
        hint: "Declare all three prototypes before main. Define all three functions after main. Each function should have a void return type since none of them return a value. Use #define to create a constant for the number of facts (3) and use it in a comment in your second function."
      },
      quiz: [
        {
          question: "Where do #include directives belong in a C source file?",
          options: [
            "At the very top, before function definitions",
            "Inside the main() function",
            "At the bottom of the file, after all functions",
            "Anywhere — order does not matter"
          ],
          correctIndex: 0,
          explanation: "#include directives are preprocessor instructions that must appear before the code that depends on them. By convention (and for clarity), they go at the very top of the file."
        },
        {
          question: "What is a function prototype in C?",
          options: [
            "The first version of a function before it is finalised",
            "A declaration that tells the compiler a function's name, return type, and parameter types",
            "A function that creates new functions",
            "A comment describing what a function does"
          ],
          correctIndex: 1,
          explanation: "A function prototype is a declaration (not the full definition) that gives the compiler the function's name, return type, and parameter list. It ends with a semicolon and allows you to call the function before its full definition appears."
        },
        {
          question: "What do curly braces {} do in C?",
          options: [
            "They enclose strings of text",
            "They define a block of code that groups statements together",
            "They are used for mathematical calculations",
            "They mark the beginning of a comment"
          ],
          correctIndex: 1,
          explanation: "Curly braces delimit blocks. A block groups zero or more statements. Every function body is a block, and blocks can be nested inside other blocks."
        },
        {
          question: "What happens if you forget to close a curly brace?",
          options: [
            "The program runs but ignores the unclosed block",
            "The compiler produces a syntax error, usually mentioning unexpected end of file",
            "The program automatically adds a closing brace",
            "Only a warning is shown; the program still compiles"
          ],
          correctIndex: 1,
          explanation: "An unclosed curly brace is a syntax error. The compiler expects a matching closing brace and when it reaches the end of the file without finding one, it reports an error."
        },
        {
          question: "In what order are statements inside a function body executed?",
          options: [
            "In alphabetical order by statement content",
            "Randomly, unless you specify an order",
            "From top to bottom, in the order they appear",
            "From bottom to top"
          ],
          correctIndex: 2,
          explanation: "C executes statements sequentially: the first statement runs first, then the second, and so on, from top to bottom, unless a control flow structure (if, loop, etc.) redirects execution."
        },
        {
          question: "What does 'int' mean in 'int main(void)'?",
          options: [
            "The function takes an integer parameter",
            "The function returns an integer value",
            "The function contains integer variables",
            "The function is internal to the file"
          ],
          correctIndex: 1,
          explanation: "'int' is the return type of main. It means main returns an integer to the operating system. By convention, returning 0 means success and a non-zero value means an error."
        },
        {
          question: "Where must executable statements (like printf) appear in a C program?",
          options: [
            "Anywhere in the file, at any level",
            "Only inside the main() function",
            "Inside a function body — they cannot appear outside a function",
            "Only at the top of the file, before #include"
          ],
          correctIndex: 2,
          explanation: "In C, executable statements must be inside a function body. You cannot write a printf call or arithmetic statement at the file level outside of any function."
        },
        {
          question: "What is the purpose of indentation in C source code?",
          options: [
            "The compiler requires indentation to understand your code",
            "It makes the code structure visually clear for human readers",
            "It speeds up compilation",
            "It defines the scope of variables"
          ],
          correctIndex: 1,
          explanation: "C does not require indentation — the compiler ignores whitespace used for indentation. However, consistent indentation is essential for human readers to understand the structure and nesting of the code."
        },
        {
          question: "What is the #define preprocessor directive used for?",
          options: [
            "Including header files",
            "Creating named constants or macros that the preprocessor replaces before compilation",
            "Defining a new function",
            "Declaring a variable"
          ],
          correctIndex: 1,
          explanation: "#define creates text substitutions: wherever the defined name appears in code, the preprocessor replaces it with the given value or expression before the compiler runs."
        },
        {
          question: "Which section of a C file typically comes FIRST?",
          options: [
            "Function definitions",
            "The main() function",
            "Global variable declarations",
            "Preprocessor directives (#include, #define)"
          ],
          correctIndex: 3,
          explanation: "By convention and necessity, preprocessor directives appear first because other code depends on what they provide (such as function declarations from headers). Function definitions typically come after."
        },
        {
          question: "Can a C program have functions in addition to main()?",
          options: [
            "No — only main() is allowed",
            "Yes — you can define as many functions as you need",
            "Yes — but only two additional functions maximum",
            "Only if you use a special compiler flag"
          ],
          correctIndex: 1,
          explanation: "C programs can (and typically do) contain many functions beyond main(). Breaking programs into well-named functions is a core programming practice that improves readability and reuse."
        },
        {
          question: "What is a 'block' in C?",
          options: [
            "A named section of memory",
            "A group of statements enclosed in curly braces {}",
            "A type of loop",
            "A file containing multiple functions"
          ],
          correctIndex: 1,
          explanation: "A block is any sequence of zero or more statements enclosed in { }. Blocks define the bodies of functions, if statements, loops, and other constructs."
        },
        {
          question: "Which statement about function definitions in C is correct?",
          options: [
            "Function definitions must appear inside main()",
            "Function definitions appear at the file level, not inside other functions",
            "Each function must be in its own separate file",
            "Functions can only be defined after main()"
          ],
          correctIndex: 1,
          explanation: "In standard C, function definitions appear at the file (top) level, not nested inside other functions. You can define them before or after main, but not inside main."
        },
        {
          question: "What is the difference between a function prototype and a function definition?",
          options: [
            "A prototype is the full function with its body; a definition is just the name",
            "A prototype declares the function signature without a body; a definition provides the full implementation with a body",
            "Prototypes are for standard library functions; definitions are for your own functions",
            "There is no difference — the terms are interchangeable"
          ],
          correctIndex: 1,
          explanation: "A prototype ends with a semicolon and contains no body — it just tells the compiler the function exists and its signature. A definition provides the actual {} body with the implementation."
        },
        {
          question: "How many entry points (main functions) can a C program have?",
          options: ["One per source file", "Exactly one for the entire program", "As many as needed", "Zero — the OS finds the start automatically"],
          correctIndex: 1,
          explanation: "A C program must have exactly one main() function across all its source files. Multiple definitions of main produce a linker error due to symbol conflicts."
        },
        {
          question: "What does the 'void' return type on a custom function mean?",
          options: [
            "The function takes no parameters",
            "The function returns nothing",
            "The function is empty",
            "The function is dangerous and should be avoided"
          ],
          correctIndex: 1,
          explanation: "'void' as a return type means the function does not return a value to the caller. You use void when a function just performs an action (like printing) without computing a result."
        },
        {
          question: "If you call a function before defining it and have no prototype, what happens?",
          options: [
            "The program runs normally",
            "The linker fixes it automatically",
            "The compiler may produce a warning or error because it does not know the function's signature",
            "The preprocessor adds the prototype automatically"
          ],
          correctIndex: 2,
          explanation: "Without a prototype or prior definition, the compiler does not know the function's return type or parameter types. In C89 this could cause implicit declaration warnings; in C99 and later it is an error."
        },
        {
          question: "What is the role of the #include <stdlib.h> directive?",
          options: [
            "It includes standard input/output functions like printf",
            "It includes standard library utilities like memory allocation (malloc) and program exit (exit)",
            "It includes string manipulation functions",
            "It includes mathematical functions"
          ],
          correctIndex: 1,
          explanation: "stdlib.h declares functions for general utilities: dynamic memory allocation (malloc, free), type conversion (atoi), random numbers (rand), and program control (exit)."
        },
        {
          question: "A well-structured C function should ideally do:",
          options: [
            "As many things as possible to reduce the total number of functions",
            "Exactly one clearly defined task",
            "Nothing — all code should be in main",
            "At least 100 lines of work to justify the overhead"
          ],
          correctIndex: 1,
          explanation: "Good programming practice says each function should have a single, clear responsibility. This makes functions easier to test, reuse, read, and maintain."
        },
        {
          question: "What would happen if you put a printf statement at the top level of a file, outside any function?",
          options: [
            "It would run before main()",
            "The compiler would produce an error — executable statements cannot appear outside functions",
            "The compiler would move it into main() automatically",
            "It would be treated as a comment"
          ],
          correctIndex: 1,
          explanation: "In C, all executable statements must be inside a function body. Placing a statement like printf at file scope (outside any function) is a syntax error."
        },
        {
          question: "What is the purpose of blank lines between sections of a C source file?",
          options: [
            "The compiler requires them between sections",
            "They improve human readability by visually separating logical sections",
            "They reduce the file size",
            "They speed up compilation"
          ],
          correctIndex: 1,
          explanation: "Blank lines are whitespace that the compiler ignores. Their sole purpose is to help human readers quickly identify different sections (includes, declarations, functions) at a glance."
        }
      ]
    },
    {
      id: "topic-1-4",
      title: "Variables and Data Types",
      estimatedReadingTime: 12,
      explanation: `A variable is a named location in your computer's memory that stores a value. Think of it like a labelled box — you give the box a name, decide what kind of thing it can hold, put a value in it, and later look at or change that value. In C, before you can use a variable, you must declare it. A declaration tells the compiler two things: the variable's name and its type. The type determines how much memory to reserve and what operations are valid on that variable.

C has several built-in data types. The most commonly used basic types are: int for whole numbers (integers), float for numbers with decimal points (single precision), double for numbers with decimal points but with more precision than float (double precision), and char for individual characters. Each of these types occupies a certain number of bytes in memory. On most modern 64-bit systems, int is 4 bytes, float is 4 bytes, double is 8 bytes, and char is 1 byte. You can use the sizeof operator to find out the size of any type on your system.

To declare a variable, you write the type followed by the name, followed by a semicolon. For example, 'int age;' declares a variable named age that can hold an integer. You can also initialise a variable at the same time as declaring it: 'int age = 25;' declares age and immediately sets it to 25. It is generally a good habit to initialise variables when you declare them, because reading an uninitialised variable gives you whatever random data happened to be in that memory location — a bug that can be very hard to track down.

Variable names in C follow specific rules. A name must start with a letter (a-z, A-Z) or an underscore (_). After the first character, names can contain letters, digits (0-9), and underscores. Names are case-sensitive, so 'age', 'Age', and 'AGE' are three different variables. C has reserved keywords (like int, if, for, return) that you cannot use as variable names. By convention, most C programmers use lowercase names for variables, with underscores separating words (e.g., student_age, total_score). This style is called snake_case.

The integer type deserves extra attention because it comes in several variants. You can add the modifier 'unsigned' to make an integer that can only hold non-negative values (0 and above), which doubles its positive range. You can also use 'short' for a smaller integer (typically 2 bytes) or 'long' and 'long long' for larger integers. The exact size of these types depends on the platform and compiler, which is why the header <stdint.h> provides types like int32_t and uint64_t that have guaranteed sizes — very useful when you need precision.`,
      codeExample: `/* variables_demo.c
   Demonstrates variable declarations, types, and basic usage.
   Compile: gcc variables_demo.c -o variables_demo
   Run:     ./variables_demo
*/

#include <stdio.h>

int main(void)
{
    /* Declare and initialise variables of different types */
    int age = 20;
    float height = 1.75f;   /* 'f' suffix marks a float literal */
    double salary = 45000.50;
    char grade = 'A';       /* Character literals use single quotes */

    /* Print each variable with the correct format specifier */
    printf("Age:    %d years\\n", age);
    printf("Height: %.2f metres\\n", height);
    printf("Salary: %.2f dollars\\n", salary);
    printf("Grade:  %c\\n", grade);

    /* Show sizes of types using sizeof */
    printf("\\nSize of int:    %zu bytes\\n", sizeof(int));
    printf("Size of float:  %zu bytes\\n", sizeof(float));
    printf("Size of double: %zu bytes\\n", sizeof(double));
    printf("Size of char:   %zu bytes\\n", sizeof(char));

    return 0;
}`,
      expectedOutput: `Age:    20 years
Height: 1.75 metres
Salary: 45000.50 dollars
Grade:  A

Size of int:    4 bytes
Size of float:  4 bytes
Size of double: 8 bytes
Size of char:   1 bytes`,
      keyTakeaways: [
        "Variables are named memory locations; every variable must be declared with a type before use.",
        "The four most common basic types are int, float, double, and char.",
        "Always initialise variables when you declare them to avoid reading random garbage values.",
        "Variable names are case-sensitive and must start with a letter or underscore.",
        "Use sizeof() to find the size in bytes of any type or variable on your system."
      ],
      commonMistakes: [
        "Using a variable without initialising it — the value will be undefined (garbage) and can cause unpredictable behaviour.",
        "Confusing float and double — double has more precision and should be preferred when in doubt.",
        "Using double quotes for character literals — characters use single quotes ('A'), strings use double quotes (\"A\").",
        "Choosing a name that is a C keyword (like int, return, or for) — this causes a compiler error.",
        "Forgetting to use the correct format specifier in printf — using %d for a float will print garbled output."
      ],
      bestPractices: [
        "Always initialise variables at the point of declaration to prevent undefined behaviour.",
        "Use descriptive variable names that clearly convey their purpose (e.g., student_count, not sc).",
        "Prefer double over float for decimal values unless you have a specific reason (like memory constraints) to use float.",
        "Declare variables close to where they are first used, not necessarily all at the top of the function.",
        "Use snake_case for variable names to follow common C conventions and improve readability."
      ],
      exercises: [
        {
          title: "Exercise 1 - Personal Profile",
          description: "Write a C program that stores your first name initial (as a char), your age (as an int), your height in metres (as a double), and your favourite number (as an int). Print all four values with descriptive labels on separate lines.",
          hint: "Use %c for char, %d for int, and %.2lf for double in your format strings. Remember that char literals use single quotes."
        },
        {
          title: "Exercise 2 - Type Sizes Survey",
          description: "Write a C program that prints the size in bytes of all these types: char, short, int, long, long long, float, double. Use sizeof() for each. Include a brief description of each type's typical use case as a comment next to each printf.",
          hint: "Use %zu as the format specifier for sizeof() results, since sizeof returns an unsigned size_t value."
        },
        {
          title: "Exercise 3 - Swap Two Variables",
          description: "Declare two integer variables a = 10 and b = 20. Write code to swap their values (so that a becomes 20 and b becomes 10) using a third temporary variable called temp. Print the values before and after the swap.",
          hint: "You need three steps: temp = a; then a = b; then b = temp;. This is the classic swap pattern — try to understand why you need the temporary variable."
        }
      ],
      challenge: {
        title: "Challenge - Unit Converter",
        description: "Write a C program that declares a double variable for a temperature in Celsius (initialise it to a value of your choice). Compute and store the Fahrenheit equivalent (F = C * 9.0 / 5.0 + 32) and the Kelvin equivalent (K = C + 273.15) in separate double variables. Print all three values with two decimal places and their unit names. Then print the size in bytes of each of the three variables using sizeof.",
        hint: "Use the formula carefully: write 9.0 / 5.0, not 9/5 — integer division of 9/5 gives 1, not 1.8. The %zu format specifier handles the size_t returned by sizeof."
      },
      quiz: [
        {
          question: "What is a variable in C?",
          options: [
            "A mathematical symbol used in equations",
            "A named memory location that stores a value of a specific type",
            "A function that changes its behaviour each time it is called",
            "A compiler instruction to reserve disk space"
          ],
          correctIndex: 1,
          explanation: "A variable is a named location in RAM that holds a value. The name lets you refer to that memory location by a readable label rather than a raw address."
        },
        {
          question: "Which of the following is a correct variable declaration in C?",
          options: [
            "variable int count;",
            "count int = 5;",
            "int count;",
            "int = count;"
          ],
          correctIndex: 2,
          explanation: "C declarations follow the pattern 'type name;'. So 'int count;' is correct. The type always comes first, followed by the variable name and a semicolon."
        },
        {
          question: "What type would you use to store the value 3.14159?",
          options: ["int", "char", "double", "void"],
          correctIndex: 2,
          explanation: "3.14159 is a decimal number, so you need a floating-point type. double is preferred over float because it has greater precision (about 15 significant digits vs 7 for float)."
        },
        {
          question: "What type is used to store a single character like 'Z'?",
          options: ["string", "char", "letter", "int"],
          correctIndex: 1,
          explanation: "The char type stores a single character. It occupies 1 byte of memory and stores the ASCII code of the character. Character literals are written with single quotes, like 'Z'."
        },
        {
          question: "What happens if you use a variable before initialising it?",
          options: [
            "The compiler sets it to zero automatically",
            "The program crashes with an error message",
            "The variable contains whatever random data was in that memory location (undefined behaviour)",
            "The preprocessor warns you but fixes it"
          ],
          correctIndex: 2,
          explanation: "Using an uninitialised local variable is undefined behaviour in C. The variable may contain any random value left in memory, leading to unpredictable program behaviour."
        },
        {
          question: "Which of the following is a valid variable name in C?",
          options: ["2ndScore", "int", "student_age", "total-cost"],
          correctIndex: 2,
          explanation: "student_age is valid: it starts with a letter and uses only letters and underscores. '2ndScore' starts with a digit, 'int' is a reserved keyword, and 'total-cost' contains a hyphen which is not allowed."
        },
        {
          question: "Are variable names case-sensitive in C?",
          options: [
            "No — 'age', 'Age', and 'AGE' all refer to the same variable",
            "Yes — 'age', 'Age', and 'AGE' are three different variables",
            "Only for global variables",
            "Only when using GCC; other compilers may differ"
          ],
          correctIndex: 1,
          explanation: "C is fully case-sensitive. 'age', 'Age', and 'AGE' are treated as completely distinct identifiers. This is a common source of bugs for beginners."
        },
        {
          question: "What does sizeof(int) typically return on a modern 64-bit system?",
          options: ["1", "2", "4", "8"],
          correctIndex: 2,
          explanation: "On most modern 32-bit and 64-bit systems, int is 4 bytes (32 bits). However, the C standard only guarantees a minimum size; always use sizeof() to check on your specific system."
        },
        {
          question: "What format specifier should you use with printf to print an int?",
          options: ["%f", "%c", "%s", "%d"],
          correctIndex: 3,
          explanation: "%d is the format specifier for a signed decimal integer (int). Using the wrong specifier (e.g., %f for an int) produces undefined behaviour and garbled output."
        },
        {
          question: "What format specifier should you use with printf to print a double?",
          options: ["%d", "%lf", "%c", "%i"],
          correctIndex: 1,
          explanation: "%lf (or %f — both work for double in printf but %lf is more explicit) is the format specifier for a double. Note: for scanf, you must use %lf for double; %f reads into a float."
        },
        {
          question: "Which modifier makes an integer variable store only non-negative values?",
          options: ["positive", "unsigned", "nonneg", "abs"],
          correctIndex: 1,
          explanation: "The 'unsigned' modifier (e.g., unsigned int) tells the compiler to treat the variable as non-negative, effectively doubling the maximum positive value it can store."
        },
        {
          question: "What is the difference between float and double?",
          options: [
            "float stores integers; double stores decimals",
            "float is 4 bytes with ~7 significant digits; double is 8 bytes with ~15 significant digits",
            "float is for negative numbers; double is for positive numbers",
            "They are identical — the names are interchangeable"
          ],
          correctIndex: 1,
          explanation: "Both float and double store decimal numbers, but double uses twice the memory and provides much greater precision. For general programming, double is the preferred choice."
        },
        {
          question: "Which of the following correctly initialises a char variable?",
          options: [
            "char letter = \"A\";",
            "char letter = A;",
            "char letter = 'A';",
            "char letter = (A);"
          ],
          correctIndex: 2,
          explanation: "Character literals are enclosed in single quotes in C. Double quotes create a string (character array), not a single char. So char letter = 'A'; is correct."
        },
        {
          question: "What is the purpose of the 'f' suffix in 'float x = 3.14f;'?",
          options: [
            "It marks the file where the variable is stored",
            "It tells the compiler the literal is a float, not a double",
            "It rounds the value to the nearest whole number",
            "It is a formatting option for printf"
          ],
          correctIndex: 1,
          explanation: "Without the 'f' suffix, '3.14' is a double-precision literal. Adding 'f' makes it a float literal, which avoids potential warnings about implicit narrowing from double to float."
        },
        {
          question: "Which naming convention is most commonly used for variable names in C?",
          options: [
            "camelCase (e.g., studentAge)",
            "PascalCase (e.g., StudentAge)",
            "snake_case (e.g., student_age)",
            "SCREAMING_SNAKE_CASE (e.g., STUDENT_AGE)"
          ],
          correctIndex: 2,
          explanation: "By convention, C programmers use snake_case for variable names (all lowercase with underscores between words). SCREAMING_SNAKE_CASE is reserved for constants defined with #define."
        },
        {
          question: "What is the output of: int x = 5; printf(\"%d\\n\", x);",
          options: ["x", "5", "%d", "0"],
          correctIndex: 1,
          explanation: "printf replaces %d with the value of x, which is 5. The \\n prints a newline after it. The output is the digit 5 followed by a newline."
        },
        {
          question: "Which type would be most appropriate for storing someone's age in years?",
          options: ["double", "char", "int", "void"],
          correctIndex: 2,
          explanation: "Age is a whole number, so int is the appropriate type. double or float would be wasteful and imprecise for a value that is always an integer. char could technically work but is not semantically clear."
        },
        {
          question: "What is 'undefined behaviour' in C?",
          options: [
            "Code that the programmer has not documented yet",
            "A situation where the C standard does not specify what the program must do, leading to unpredictable results",
            "A program that takes user input the programmer did not expect",
            "A compiler error that is not listed in the manual"
          ],
          correctIndex: 1,
          explanation: "Undefined behaviour means the C standard places no requirements on what the program does in that situation. Results can vary across compilers, platforms, and even runs — making it a serious source of bugs."
        },
        {
          question: "Can you declare multiple variables of the same type on one line?",
          options: [
            "No — each variable must have its own line",
            "Yes — for example: int a = 1, b = 2, c = 3;",
            "Only if they are uninitialized",
            "Only for global variables"
          ],
          correctIndex: 1,
          explanation: "C allows declaring multiple variables of the same type separated by commas: 'int a = 1, b = 2, c = 3;'. However, for clarity, many style guides recommend one variable per line."
        },
        {
          question: "What header file provides guaranteed-size integer types like int32_t?",
          options: ["<stdio.h>", "<stdlib.h>", "<stdint.h>", "<limits.h>"],
          correctIndex: 2,
          explanation: "<stdint.h> defines integer types with guaranteed sizes, such as int8_t (8-bit signed), uint32_t (32-bit unsigned), and int64_t (64-bit signed). These are essential for portable code."
        }
      ]
    },
    {
      id: "topic-1-5",
      title: "Constants and Literals",
      estimatedReadingTime: 8,
      explanation: `In C, a literal is a fixed value written directly into your source code. When you write '42' in your program, that is an integer literal. When you write '3.14', that is a floating-point literal. When you write '"Hello"', that is a string literal. When you write ''A'', that is a character literal. These values are baked directly into the compiled code and never change while the program runs. Understanding what kinds of literals exist and how to write them is essential for working with C effectively.

A constant is a value that is given a name and is guaranteed not to change. There are two main ways to define constants in C. The first and oldest way is using the #define preprocessor directive. When you write '#define PI 3.14159', the preprocessor replaces every occurrence of the text 'PI' in your code with the text '3.14159' before the compiler even sees it. This is purely a text substitution. The result is that your code reads more clearly (PI is self-explanatory) and is easier to maintain (if you want to change the value, you change it in one place).

The second way to define a constant in C is to use the 'const' keyword. When you write 'const double pi = 3.14159;', you create a variable whose value the compiler prevents you from modifying after initialisation. Unlike #define, a const variable is a real variable with a type and a memory location. This means the compiler can type-check it, which catches bugs that bare text substitution cannot. Modern C style (C99 and later) generally prefers const over #define for simple values because of this type safety.

Integer literals can be written in different number bases. The default is decimal (base 10), which is how we normally write numbers. You can also write hexadecimal (base 16) literals by prefixing them with '0x' — for example, 0xFF is 255 in decimal. Octal (base 8) literals start with a leading zero — so 0777 is 511 in decimal. Binary literals were added in GCC as an extension and are standard from C23 using the prefix '0b'. Hexadecimal is frequently used in systems programming because each hex digit corresponds to exactly 4 bits.

String literals deserve special attention. When you write "Hello" in C code, the compiler creates a sequence of characters in memory: H, e, l, l, o, and then a special invisible character called the null terminator, written as '\0'. The null terminator marks the end of the string. So the string "Hello" actually occupies 6 bytes, not 5. This null-terminated approach is fundamental to how C handles strings, and forgetting to account for the null terminator is one of the most common C bugs. You will explore C strings in depth in a later lesson; for now, just know that string literals end with this hidden character.`,
      codeExample: `/* constants_demo.c
   Demonstrates literals, #define constants, and const variables.
   Compile: gcc constants_demo.c -o constants_demo
   Run:     ./constants_demo
*/

#include <stdio.h>

/* Constant defined with #define (preprocessor substitution) */
#define MAX_STUDENTS 30
#define SCHOOL_NAME  "Springfield Academy"

int main(void)
{
    /* Constant defined with const keyword (type-safe) */
    const double PI = 3.14159265;
    const int    DAYS_IN_WEEK = 7;

    /* Integer literals in different bases */
    int decimal = 255;
    int hex     = 0xFF;    /* Same value: 255 */
    int octal   = 0377;    /* Same value: 255 */

    printf("School: %s\\n", SCHOOL_NAME);
    printf("Max students: %d\\n", MAX_STUDENTS);
    printf("PI = %.8f\\n", PI);
    printf("Days in week: %d\\n", DAYS_IN_WEEK);

    printf("\\nThree ways to write 255:\\n");
    printf("  Decimal: %d\\n", decimal);
    printf("  Hex:     %d (0xFF)\\n", hex);
    printf("  Octal:   %d (0377)\\n", octal);

    /* Character literals */
    char newline_char = '\\n';
    char tab_char     = '\\t';
    printf("\\nNewline char ASCII value: %d\\n", (int)newline_char);
    printf("Tab char ASCII value:     %d\\n", (int)tab_char);

    return 0;
}`,
      expectedOutput: `School: Springfield Academy
Max students: 30
PI = 3.14159265
Days in week: 7

Three ways to write 255:
  Decimal: 255
  Hex:     255 (0xFF)
  Octal:   255 (0377)

Newline char ASCII value: 10
Tab char ASCII value:     9`,
      keyTakeaways: [
        "A literal is a fixed value written directly in code (e.g., 42, 3.14, 'A', \"Hello\").",
        "Constants can be defined with #define (preprocessor text substitution) or the const keyword (type-safe variable).",
        "Integer literals can be written in decimal (42), hexadecimal (0x2A), or octal (052).",
        "String literals are null-terminated — 'Hello' occupies 6 bytes including the hidden '\\0' at the end.",
        "Prefer const over #define for simple values to benefit from type checking."
      ],
      commonMistakes: [
        "Writing '#define PI 3.14;' with a semicolon — the semicolon becomes part of the substituted text and causes syntax errors.",
        "Trying to change a const variable after declaration — this causes a compiler error.",
        "Writing a string with single quotes instead of double quotes — 'Hello' is not a valid C string.",
        "Forgetting that a string literal 'Hello' takes 6 bytes (5 characters + null terminator), not 5.",
        "Using octal accidentally by writing a leading zero on a number — 0123 is octal 83, not decimal 123."
      ],
      bestPractices: [
        "Name #define constants and const variables in SCREAMING_SNAKE_CASE to visually distinguish them from regular variables.",
        "Prefer const over #define for numeric constants because const is type-checked by the compiler.",
        "Never put a semicolon at the end of a #define line — the preprocessor includes the semicolon in the substitution.",
        "Use hexadecimal literals when working with bit masks and hardware registers to make the bit pattern visually clear.",
        "Group all your constants near the top of the file or in a dedicated header file for easy maintenance."
      ],
      exercises: [
        {
          title: "Exercise 1 - Circle Calculator",
          description: "Write a C program that defines PI as a const double. Declare a const double for a radius of 5.0. Compute and print the circumference (2 * PI * radius) and the area (PI * radius * radius), each to 4 decimal places.",
          hint: "Use const double PI = 3.14159265; and const double RADIUS = 5.0;. For output use printf(\"Circumference: %.4f\\n\", ...);."
        },
        {
          title: "Exercise 2 - Hex and Decimal",
          description: "Write a C program that declares three int variables: one with a decimal literal of your choice, one with its hexadecimal equivalent (0x...), and one with its octal equivalent (0...). Print all three with both %d (decimal) and %x (hexadecimal) format specifiers to confirm they hold the same value.",
          hint: "Pick a number like 200. Its hex is 0xC8 and its octal is 0310. Use printf(\"%d in hex is %x\\n\", value, value);."
        },
        {
          title: "Exercise 3 - String Length Surprise",
          description: "Write a C program that uses the sizeof operator on three different string literals: \"Hi\", \"Hello\", and \"C programming\". Print the result of sizeof for each. Then explain in a comment why sizeof(\"Hi\") returns 3 and not 2.",
          hint: "sizeof on a string literal returns the number of bytes including the null terminator '\\0'. So sizeof(\"Hi\") is 3: 'H', 'i', and '\\0'."
        }
      ],
      challenge: {
        title: "Challenge - Constants Reference Card",
        description: "Write a C program that defines at least one constant using #define and at least one using const for each of these categories: a mathematical constant, a configuration limit, and a unit conversion factor. Then write a 'reference card' of output that prints all your constants with their names, values, and types (e.g., 'PI (const double): 3.14159265'). Show the hexadecimal representation of any integer constants using %x. Compile with -Wall -Wextra.",
        hint: "For a unit conversion factor, consider 1 inch = 2.54 cm or 1 mile = 1.609344 km. Use const double for the mathematical constants and const int for limits. #define for the configuration limit demonstrates the contrast between the two approaches."
      },
      quiz: [
        {
          question: "What is a literal in C?",
          options: [
            "A variable that can never change",
            "A fixed value written directly in source code, like 42 or 'A'",
            "A function that returns a constant value",
            "A comment that explains a value"
          ],
          correctIndex: 1,
          explanation: "A literal is a value written directly in your source code. Examples: 42 (integer literal), 3.14 (float literal), 'A' (character literal), and \"Hello\" (string literal)."
        },
        {
          question: "What does #define MAX 100 do?",
          options: [
            "Creates a const int variable named MAX with value 100",
            "Tells the preprocessor to replace every occurrence of MAX with 100 before compilation",
            "Allocates 100 bytes of memory named MAX",
            "Declares a function called MAX"
          ],
          correctIndex: 1,
          explanation: "#define is a preprocessor directive. Before the compiler sees the code, the preprocessor replaces every occurrence of the text 'MAX' with the text '100'. It is a text substitution, not a typed variable."
        },
        {
          question: "What is the difference between using #define and const for constants?",
          options: [
            "#define creates typed variables; const is a preprocessor substitution",
            "#define is a preprocessor text substitution with no type; const creates a typed variable with compiler type checking",
            "They are identical in all respects",
            "#define only works for integers; const works for all types"
          ],
          correctIndex: 1,
          explanation: "#define does typeless text substitution before compilation. const creates an actual typed variable that the compiler checks. Using const is generally safer because the compiler can catch type mismatch bugs."
        },
        {
          question: "What prefix marks a hexadecimal integer literal?",
          options: ["h", "0x", "#", "0h"],
          correctIndex: 1,
          explanation: "Hexadecimal literals in C begin with '0x' (or '0X'). For example, 0xFF equals 255 in decimal. Hexadecimal uses digits 0-9 and letters A-F."
        },
        {
          question: "What prefix marks an octal integer literal?",
          options: ["0o", "oct", "0", "8x"],
          correctIndex: 2,
          explanation: "Octal literals start with a single leading zero. So 0777 is an octal number equal to 511 in decimal. This can be a subtle trap if you accidentally write 0123 thinking it means 123."
        },
        {
          question: "Why should you NOT put a semicolon at the end of a #define line?",
          options: [
            "#define requires no termination because it is not a statement",
            "The semicolon becomes part of the text substitution and causes syntax errors in the code that uses the constant",
            "Semicolons after #define are optional; either way works",
            "The preprocessor removes the semicolon automatically"
          ],
          correctIndex: 1,
          explanation: "The preprocessor substitutes the entire text after the name, including a semicolon if you write one. So '#define MAX 100;' would turn 'x = MAX' into 'x = 100;' — an extra semicolon that breaks the surrounding code."
        },
        {
          question: "How many bytes does the string literal \"Hi\" occupy in memory?",
          options: ["1", "2", "3", "4"],
          correctIndex: 2,
          explanation: "\"Hi\" is stored as 'H', 'i', and then the null terminator '\\0'. That is 3 characters = 3 bytes. C strings are always null-terminated, so their memory size is (visible characters + 1)."
        },
        {
          question: "What is the null terminator in a C string?",
          options: [
            "The last visible character of the string",
            "A special character (ASCII value 0, written as '\\0') that marks the end of a string",
            "A space character added after the last word",
            "The return statement at the end of the function"
          ],
          correctIndex: 1,
          explanation: "Every C string ends with a null terminator — the character with ASCII value 0, written '\\0'. Functions like printf use this to know where the string ends."
        },
        {
          question: "What would happen if you try to modify a const variable after initialisation?",
          options: [
            "The value changes normally",
            "The compiler produces an error",
            "The compiler produces only a warning, and the change is made at runtime",
            "The variable becomes undefined"
          ],
          correctIndex: 1,
          explanation: "Attempting to assign a new value to a const variable is a compile-time error. The compiler enforces the 'constant' contract and refuses to compile the code."
        },
        {
          question: "What is the decimal value of the hexadecimal literal 0xFF?",
          options: ["15", "16", "255", "256"],
          correctIndex: 2,
          explanation: "0xFF in hexadecimal = 15*16 + 15 = 240 + 15 = 255 in decimal. 'F' in hex is 15, so FF = (15 * 16) + 15 = 255."
        },
        {
          question: "Which naming convention is recommended for constants defined with #define?",
          options: [
            "camelCase (e.g., maxStudents)",
            "snake_case (e.g., max_students)",
            "SCREAMING_SNAKE_CASE (e.g., MAX_STUDENTS)",
            "PascalCase (e.g., MaxStudents)"
          ],
          correctIndex: 2,
          explanation: "By strong convention, #define constants use SCREAMING_SNAKE_CASE (all uppercase with underscores). This visually distinguishes them from regular variables and functions, making code easier to read."
        },
        {
          question: "What type of literal is 'A' (with single quotes) in C?",
          options: ["A string literal", "A character literal", "An integer literal", "A pointer literal"],
          correctIndex: 1,
          explanation: "Single-quoted values like 'A' are character literals of type char. They store the ASCII code of the character. Double-quoted values like \"A\" are string literals (a pointer to a null-terminated array)."
        },
        {
          question: "What is the decimal value of the octal literal 010?",
          options: ["10", "8", "16", "1"],
          correctIndex: 1,
          explanation: "Octal 010 = 1 * 8^1 + 0 * 8^0 = 8. This is a common source of confusion — leading zeros make numbers octal, so 010 is NOT decimal 10."
        },
        {
          question: "Which of the following is the correct way to define a constant using const in C?",
          options: [
            "const = GRAVITY 9.8;",
            "const double GRAVITY = 9.8;",
            "GRAVITY const double = 9.8;",
            "#const double GRAVITY = 9.8;"
          ],
          correctIndex: 1,
          explanation: "The const keyword precedes the type, then the name and value follow: 'const double GRAVITY = 9.8;'. This creates a type-checked, immutable double variable."
        },
        {
          question: "When would you prefer to use a hexadecimal literal over a decimal one?",
          options: [
            "When the value is larger than 1000",
            "When working with bit masks, hardware registers, or memory addresses where the bit pattern matters",
            "When the value is a fraction",
            "When using printf with the %f format specifier"
          ],
          correctIndex: 1,
          explanation: "Hexadecimal is preferred for bit manipulation because each hex digit maps to exactly 4 bits. Writing 0xFF is much clearer than 255 when you are thinking about 8-bit patterns."
        },
        {
          question: "What does the suffix 'f' mean in the literal 3.14f?",
          options: [
            "It rounds to the nearest integer",
            "It marks the literal as a float (single precision) rather than a double",
            "It is the format specifier for printf",
            "It stands for 'fixed point'"
          ],
          correctIndex: 1,
          explanation: "Without a suffix, floating-point literals like 3.14 are of type double. The 'f' suffix (or 'F') makes the literal a float type. This avoids implicit narrowing warnings when assigning to a float variable."
        },
        {
          question: "Which header is needed to use printf in a C program?",
          options: ["<stdlib.h>", "<math.h>", "<stdio.h>", "<string.h>"],
          correctIndex: 2,
          explanation: "printf is declared in <stdio.h> (standard input/output). Including this header gives the compiler the information it needs to correctly call printf and related functions."
        },
        {
          question: "What is the ASCII value of the newline character '\\n'?",
          options: ["0", "7", "10", "32"],
          correctIndex: 2,
          explanation: "The newline character has ASCII value 10. When printf encounters '\\n', it outputs the character with ASCII 10, which causes the terminal to move to the beginning of the next line."
        },
        {
          question: "What does the %x format specifier do in printf?",
          options: [
            "Prints a value in exponential notation",
            "Prints an integer in hexadecimal notation",
            "Prints an unsigned character",
            "Prints the size of a variable"
          ],
          correctIndex: 1,
          explanation: "%x prints an unsigned integer as a lowercase hexadecimal number. %X uses uppercase hex digits. For example, printf(\"%x\", 255) prints 'ff'."
        },
        {
          question: "Why is it good practice to place constants near the top of a file?",
          options: [
            "The compiler requires constants before variables",
            "It makes constants easy to find and change, since they are all in one place",
            "Constants declared later in the file do not work",
            "It reduces the file size"
          ],
          correctIndex: 1,
          explanation: "Centralising constants at the top of a file (or in a header file) means that if you need to change a value, you only need to change it in one place. This reduces errors and improves maintainability."
        }
      ]
    },
    {
      id: "topic-1-6",
      title: "Basic Input and Output (printf and scanf)",
      estimatedReadingTime: 11,
      explanation: `Input and output (I/O) are how your program communicates with the outside world. Output means sending information from your program to the terminal (or a file). Input means reading information from the user (or a file) into your program. In C, the most fundamental tools for I/O are printf for output and scanf for input, both declared in <stdio.h>.

You have already used printf extensively. The 'f' in printf stands for 'formatted', meaning you can embed format specifiers in your string to control how values are printed. A format specifier starts with '%' and is followed by one or more characters that describe the type and format of the value. The most common are: %d for int, %f for float and double, %c for char, and %s for strings (C-style character arrays). After the format string, you list the values to substitute in order. For example, printf("Age: %d, Height: %.2f\n", age, height) prints the int variable age and the double height with two decimal places.

Format specifiers have optional components that let you fine-tune the output. The syntax is: %[flags][width][.precision]type. The width field specifies a minimum field width — if the value is shorter, it is padded with spaces. The precision field (after a dot) specifies the number of digits after the decimal point for floats, or the maximum number of characters for strings. The flag '-' left-aligns within the field. For example, %10d prints an integer right-aligned in a 10-character field, while %-10d left-aligns it.

scanf works similarly to printf but in reverse — instead of outputting values, it reads them from standard input (the keyboard). The format string uses the same specifiers (%d, %f, %c, %s). Crucially, for numeric types, you must pass scanf the address of the variable using the address-of operator '&'. So to read an integer into a variable 'age', you write scanf("%d", &age). The ampersand is essential because scanf needs to know where in memory to store the value it reads. Without it, you are passing the value of age (which could be garbage) rather than the address where scanf should write.

There is one important gotcha with scanf and characters: scanf("%c", &ch) reads the next character from the input buffer, including whitespace characters like newlines. If the user has previously pressed Enter, the newline from that Enter might be waiting in the input buffer and get read into your char variable instead of the character you wanted. A common workaround is to put a space before the %c in the format string: scanf(" %c", &ch). That leading space tells scanf to skip any whitespace before reading the character. Understanding these nuances of scanf is important for writing programs that behave predictably when handling user input.`,
      codeExample: `/* io_demo.c
   Demonstrates printf formatting and scanf for user input.
   Compile: gcc io_demo.c -o io_demo
   Run:     ./io_demo
*/

#include <stdio.h>

int main(void)
{
    int    age;
    double height;
    char   initial;

    /* --- Output with formatting --- */
    printf("%-15s %10s\\n", "Name", "Score");   /* column headers */
    printf("%-15s %10.2f\\n", "Alice",  95.5);
    printf("%-15s %10.2f\\n", "Bob",    87.25);
    printf("%-15s %10.2f\\n", "Charlie", 91.0);

    /* --- Input with scanf --- */
    printf("\\nEnter your age: ");
    scanf("%d", &age);           /* & gives scanf the address to write to */

    printf("Enter your height in metres: ");
    scanf("%lf", &height);       /* %lf reads a double */

    printf("Enter your first initial: ");
    scanf(" %c", &initial);      /* space before %c skips leftover newline */

    /* Print what was entered */
    printf("\\nYou entered:\\n");
    printf("  Age:     %d years\\n", age);
    printf("  Height:  %.2f metres\\n", height);
    printf("  Initial: %c\\n", initial);

    return 0;
}`,
      expectedOutput: `Name                  Score
Alice                 95.50
Bob                   87.25
Charlie               91.00

Enter your age: (waits for input)
Enter your height in metres: (waits for input)
Enter your first initial: (waits for input)

You entered:
  Age:     (user's value) years
  Height:  (user's value) metres
  Initial: (user's letter)`,
      keyTakeaways: [
        "printf outputs formatted text; format specifiers like %d, %f, %c control how values appear.",
        "scanf reads formatted input from the user; you must pass the address of variables using the & operator.",
        "Width and precision modifiers (e.g., %10.2f) let you align and format numeric output precisely.",
        "Use %lf (not %f) when reading a double with scanf.",
        "Put a space before %c in scanf (scanf(\" %c\", &ch)) to skip leftover whitespace in the input buffer."
      ],
      commonMistakes: [
        "Forgetting the & in scanf — passing the value instead of the address causes undefined behaviour and often crashes.",
        "Using %f instead of %lf with scanf for a double — %f reads into a float, truncating the double's precision.",
        "Not printing a newline \\n at the end of output, causing the terminal prompt to appear on the same line.",
        "Forgetting to match the number of format specifiers with the number of arguments in printf.",
        "Expecting scanf to wait for input when a newline from a previous call is already in the buffer."
      ],
      bestPractices: [
        "Always prompt the user clearly with printf before calling scanf, so they know what to type.",
        "Check the return value of scanf — it returns the number of items successfully read; zero means parsing failed.",
        "Use the space-before-%c trick (scanf(\" %c\", &ch)) whenever reading a character after reading another value.",
        "Prefer explicit width and precision in printf for numeric output to make tables and reports look clean.",
        "For robust programs, validate user input after reading it to ensure it is within expected bounds."
      ],
      exercises: [
        {
          title: "Exercise 1 - Greeting Program",
          description: "Write a C program that asks the user for their name initial (a single char) and their age (an int), then prints a personalised greeting like 'Hello, J! You are 22 years old.' Use printf to prompt and scanf to read each value.",
          hint: "Read the initial with scanf(\" %c\", &initial) and the age with scanf(\"%d\", &age). Use the space before %c to avoid the newline issue."
        },
        {
          title: "Exercise 2 - Formatted Table",
          description: "Write a C program that hardcodes a table of 4 items (name and price). Print a formatted table with a header row, using left-alignment for names (15 chars wide) and right-alignment for prices (8 chars wide with 2 decimal places). Add a separator line of dashes between the header and data.",
          hint: "Use printf(\"%-15s %8.2f\\n\", name, price); for each data row. For the separator line, just printf a string of dashes the right length."
        },
        {
          title: "Exercise 3 - Simple Calculator",
          description: "Write a C program that asks the user to enter two integers. Use scanf to read both values. Then print their sum, difference, product, and quotient (as a double — divide with 1.0 multiplication to avoid integer division). Format each result on its own line.",
          hint: "For the quotient, cast one operand to double before dividing: (double)a / b. This forces floating-point division instead of integer division."
        }
      ],
      challenge: {
        title: "Challenge - Receipt Printer",
        description: "Write a C program that acts as a simple shop receipt. First, prompt the user for three item names (using a char for a one-letter code), quantities (int), and unit prices (double) using scanf. Then print a formatted receipt with: a header ('=== Receipt ==='), each item in a row (letter code, quantity, unit price, total price), a separator line, and a final total at the bottom. Right-align all monetary values with two decimal places. Compute a 10% tax and show both the subtotal and the grand total including tax.",
        hint: "Read item codes with scanf(\" %c\", &code) to skip whitespace. The total for an item is quantity * price. Use formatted printf with field widths to make columns align. Subtotal is the sum of the three item totals, tax is subtotal * 0.10, and grand total is subtotal + tax."
      },
      quiz: [
        {
          question: "What does the '%' symbol in a printf format string indicate?",
          options: [
            "A percentage sign should be printed",
            "The beginning of a format specifier that will be replaced by a value",
            "The end of the format string",
            "A comment within the format string"
          ],
          correctIndex: 1,
          explanation: "In a printf format string, '%' marks the beginning of a format specifier. The characters following '%' describe the type and formatting of the value to be substituted. To print a literal '%', use '%%'."
        },
        {
          question: "What format specifier prints a signed integer with printf?",
          options: ["%f", "%d", "%c", "%s"],
          correctIndex: 1,
          explanation: "%d (or %i) prints a signed decimal integer. %f is for floating-point, %c for a single character, and %s for a null-terminated string."
        },
        {
          question: "Why must you use '&' before a variable name in scanf?",
          options: [
            "It is a stylistic convention that has no effect",
            "It tells the compiler to declare a new variable",
            "It passes the memory address of the variable so scanf knows where to write the input",
            "It specifies the type of the variable"
          ],
          correctIndex: 2,
          explanation: "scanf needs to write a value into your variable. To do that, it needs the address of that variable in memory. The & (address-of) operator provides that address."
        },
        {
          question: "What does '%.2f' mean in a printf format string?",
          options: [
            "Print a float with a width of 2",
            "Print a floating-point number with exactly 2 digits after the decimal point",
            "Print only the first 2 digits of a number",
            "Print a float rounded to 2 significant figures"
          ],
          correctIndex: 1,
          explanation: "The '.2' in %.2f sets the precision to 2 decimal places. So printf(\"%.2f\", 3.14159) prints '3.14'. The 'f' part selects the floating-point format."
        },
        {
          question: "What format specifier should you use with scanf to read a double?",
          options: ["%f", "%d", "%lf", "%df"],
          correctIndex: 2,
          explanation: "When reading with scanf, you must use %lf for a double. Using %f with scanf reads into a float, not a double, and can cause data corruption and incorrect values."
        },
        {
          question: "What does the '-' flag do in a printf format specifier like '%-15s'?",
          options: [
            "Prints a negative sign before the value",
            "Left-aligns the value within the specified field width",
            "Prints the value in reverse order",
            "Subtracts 15 from the string length"
          ],
          correctIndex: 1,
          explanation: "The '-' flag causes left-alignment within the field. Without it, values are right-aligned by default. '%-15s' prints a string left-aligned in a 15-character-wide field."
        },
        {
          question: "What problem can occur if you use scanf(\"%c\", &ch) after already reading an integer?",
          options: [
            "The integer is converted to a character automatically",
            "scanf reads the newline left in the input buffer from pressing Enter after the integer",
            "scanf skips the character and reads the next integer",
            "The program runs out of memory"
          ],
          correctIndex: 1,
          explanation: "After the user presses Enter to submit an integer, the newline character stays in the input buffer. A subsequent scanf(\"%c\") immediately reads that newline instead of waiting for a new character."
        },
        {
          question: "What is the correct fix for the newline-in-buffer problem when reading a char?",
          options: [
            "Use scanf(\"%d\", &ch) instead",
            "Add a space before %c in the format string: scanf(\" %c\", &ch)",
            "Read the char before reading the integer",
            "Use printf to clear the buffer first"
          ],
          correctIndex: 1,
          explanation: "A space before %c in scanf's format string tells scanf to skip all leading whitespace characters (including newlines) before reading the character. This cleanly handles the leftover newline."
        },
        {
          question: "What does printf(\"%-10s%5d\\n\", \"Alice\", 95) print?",
          options: [
            "Alice     95",
            "     Alice95     ",
            "Alice95",
            "Alice95     "
          ],
          correctIndex: 0,
          explanation: "%-10s prints 'Alice' left-aligned in a 10-char field ('Alice     '), then %5d prints 95 right-aligned in a 5-char field ('   95'), followed by a newline."
        },
        {
          question: "What does scanf return?",
          options: [
            "The value that was read",
            "The number of items successfully read and assigned",
            "The length of the input string",
            "Always 0 on success"
          ],
          correctIndex: 1,
          explanation: "scanf returns the count of input items successfully matched and assigned. Checking this return value lets you detect if the user entered invalid input (e.g., text when a number was expected)."
        },
        {
          question: "Which format specifier prints a char with printf?",
          options: ["%s", "%i", "%c", "%ch"],
          correctIndex: 2,
          explanation: "%c prints a single character. It takes the int value of the char argument and prints the corresponding ASCII character. %s expects a pointer to a null-terminated string."
        },
        {
          question: "How do you print a literal percent sign (%) using printf?",
          options: [
            "Use \\% in the format string",
            "Use %% in the format string",
            "Use /% in the format string",
            "You cannot print a percent sign with printf"
          ],
          correctIndex: 1,
          explanation: "To print a literal '%' sign, write '%%' in the format string. A single '%' always starts a format specifier, so you need to escape it by doubling it."
        },
        {
          question: "What is the output of printf(\"%05d\\n\", 42)?",
          options: ["42   ", "  042", "00042", "42000"],
          correctIndex: 2,
          explanation: "The '0' flag in %05d pads with zeros instead of spaces, and '5' sets the minimum field width. So 42 (two digits) is padded with three leading zeros: '00042'."
        },
        {
          question: "Which of the following correctly reads a double and an int from the user in that order?",
          options: [
            "scanf(\"%f %d\", &d, &i);",
            "scanf(\"%lf %d\", &d, &i);",
            "scanf(\"%d %lf\", &i, &d);",
            "scanf(\"%double %int\", &d, &i);"
          ],
          correctIndex: 1,
          explanation: "Use %lf for double and %d for int in scanf. The order of format specifiers must match the order of the variable addresses. Option B reads the double first, then the int, which matches the question order."
        },
        {
          question: "What does the width specifier do in printf(\"%10d\", n)?",
          options: [
            "Limits the number to at most 10 digits",
            "Prints n in a field at least 10 characters wide, right-aligned by default",
            "Multiplies n by 10",
            "Allocates 10 bytes of memory"
          ],
          correctIndex: 1,
          explanation: "The width field (10 in %10d) specifies the minimum number of characters for the output. If n has fewer than 10 characters, spaces are added on the left (right-aligning the number)."
        },
        {
          question: "What header file must you include to use printf and scanf?",
          options: ["<stdlib.h>", "<stdio.h>", "<input.h>", "<output.h>"],
          correctIndex: 1,
          explanation: "printf and scanf are declared in <stdio.h> (Standard Input/Output). You must include this header to use these functions without causing compiler errors or undefined behaviour."
        },
        {
          question: "What is 'standard input' in the context of C programs?",
          options: [
            "A file on the disk named 'input.txt'",
            "The keyboard, by default — the stream from which scanf reads",
            "The first argument passed to main()",
            "A variable named stdin"
          ],
          correctIndex: 1,
          explanation: "Standard input (stdin) is by default connected to the keyboard. scanf reads from stdin. You can redirect it to a file when running the program using shell redirection (./program < input.txt)."
        },
        {
          question: "What is the output of printf(\"%.4f\\n\", 3.1)?",
          options: ["3.1", "3.1000", "3.100", "3.10000"],
          correctIndex: 1,
          explanation: "%.4f prints a float with exactly 4 decimal places. 3.1 has only one decimal digit, so printf pads it with trailing zeros to reach 4 places: '3.1000'."
        },
        {
          question: "What happens if the number of format specifiers does not match the number of arguments in printf?",
          options: [
            "The compiler always catches this as an error",
            "Extra arguments are silently ignored; missing arguments lead to undefined behaviour",
            "printf prompts the user for the missing values",
            "The program exits with an error code"
          ],
          correctIndex: 1,
          explanation: "If there are more format specifiers than arguments, printf reads garbage from the stack — undefined behaviour. Extra arguments beyond the specifiers are silently ignored. GCC warns about this with -Wall."
        },
        {
          question: "In printf, what does the format specifier %s expect?",
          options: [
            "A single char value",
            "A pointer to a null-terminated character array (a C string)",
            "An integer whose value is printed as a string",
            "A string length value"
          ],
          correctIndex: 1,
          explanation: "%s expects a pointer to a null-terminated character array. printf prints characters starting from that pointer until it encounters the null terminator '\\0'. You cannot pass a char value directly to %s."
        }
      ]
    },
    {
      id: "topic-1-7",
      title: "Operators in C",
      estimatedReadingTime: 12,
      explanation: `Operators are the symbols that tell C to perform computations, comparisons, or logical operations. You are already familiar with basic arithmetic operators from mathematics. In C, you have addition (+), subtraction (-), multiplication (*), division (/), and modulus (%). The modulus operator is perhaps the least familiar — it gives you the remainder of a division. For example, 17 % 5 equals 2, because 5 goes into 17 three times with a remainder of 2. Modulus is extremely useful for things like checking whether a number is even (if the number % 2 equals 0, it is even) or wrapping a value around a range.

An important subtlety in C is integer division. When you divide two integer values, C performs integer division — it discards the fractional part. So 7 / 2 gives 3, not 3.5. This surprises many beginners. If you need the decimal result, at least one of the operands must be a floating-point type. You can achieve this by making one of the values a float or double literal (e.g., 7.0 / 2 gives 3.5), or by casting one of the variables to double (e.g., (double)a / b).

Assignment operators in C deserve special attention. The basic assignment operator is '='. But C also provides compound assignment operators that combine an arithmetic operation with assignment: += (add and assign), -= (subtract and assign), *= (multiply and assign), /= (divide and assign), and %= (modulo and assign). For example, 'x += 5' is equivalent to 'x = x + 5'. These save typing and are idiomatic C. The increment (++) and decrement (--) operators add or subtract 1 from a variable. 'x++' and '++x' both add 1 to x, but there is a subtle difference: 'x++' returns the value of x before incrementing (post-increment), while '++x' returns the value after incrementing (pre-increment). This distinction matters when the increment appears inside an expression.

Comparison (relational) operators compare two values and produce either 1 (true) or 0 (false). The comparison operators are: == (equal to), != (not equal to), > (greater than), < (less than), >= (greater than or equal to), and <= (less than or equal to). Note carefully: the equality operator is == (two equal signs), NOT = (one equal sign). Writing '=' where you meant '==' is one of the most classic and dangerous bugs in C — the assignment succeeds and returns the assigned value, which may evaluate to true, causing the condition to behave completely unexpectedly.

Logical operators combine boolean (true/false) conditions. In C, logical AND is && (two ampersands), logical OR is || (two pipe characters), and logical NOT is ! (exclamation mark). C uses 0 to represent false and any non-zero value to represent true. So '!0' equals 1, and '!5' equals 0. Logical operators use short-circuit evaluation: with &&, if the left operand is false (0), the right operand is not evaluated; with ||, if the left operand is true, the right operand is not evaluated. This is both an efficiency optimisation and a useful programming technique.`,
      codeExample: `/* operators_demo.c
   Demonstrates arithmetic, comparison, logical, and assignment operators.
   Compile: gcc operators_demo.c -o operators_demo
   Run:     ./operators_demo
*/

#include <stdio.h>

int main(void)
{
    int a = 17, b = 5;

    /* Arithmetic operators */
    printf("=== Arithmetic ===\\n");
    printf("%d + %d = %d\\n",  a, b, a + b);
    printf("%d - %d = %d\\n",  a, b, a - b);
    printf("%d * %d = %d\\n",  a, b, a * b);
    printf("%d / %d = %d  (integer division)\\n", a, b, a / b);
    printf("%d %% %d = %d  (remainder)\\n",       a, b, a % b);
    printf("%d / %d = %.2f (float division)\\n",  a, b, (double)a / b);

    /* Compound assignment */
    printf("\\n=== Compound Assignment ===\\n");
    int x = 10;
    printf("x starts at %d\\n", x);
    x += 3;  printf("x += 3  -> %d\\n", x);
    x -= 2;  printf("x -= 2  -> %d\\n", x);
    x *= 4;  printf("x *= 4  -> %d\\n", x);
    x /= 3;  printf("x /= 3  -> %d\\n", x);
    x++;     printf("x++     -> %d\\n", x);
    x--;     printf("x--     -> %d\\n", x);

    /* Comparison operators */
    printf("\\n=== Comparison ===\\n");
    printf("%d == %d : %d\\n", a, b, a == b);
    printf("%d != %d : %d\\n", a, b, a != b);
    printf("%d >  %d : %d\\n", a, b, a >  b);
    printf("%d <  %d : %d\\n", a, b, a <  b);

    /* Logical operators */
    printf("\\n=== Logical ===\\n");
    printf("(a > 10 && b < 10) : %d\\n", (a > 10 && b < 10));
    printf("(a < 10 || b < 10) : %d\\n", (a < 10 || b < 10));
    printf("!(a == b)          : %d\\n",  !(a == b));

    return 0;
}`,
      expectedOutput: `=== Arithmetic ===
17 + 5 = 22
17 - 5 = 12
17 * 5 = 85
17 / 5 = 3  (integer division)
17 % 5 = 2  (remainder)
17 / 5 = 3.40 (float division)

=== Compound Assignment ===
x starts at 10
x += 3  -> 13
x -= 2  -> 11
x *= 4  -> 44
x /= 3  -> 14
x++     -> 15
x--     -> 14

=== Comparison ===
17 == 5 : 0
17 != 5 : 1
17 >  5 : 1
17 <  5 : 0

=== Logical ===
(a > 10 && b < 10) : 1
(a < 10 || b < 10) : 1
!(a == b)          : 1`,
      keyTakeaways: [
        "The five arithmetic operators are +, -, *, /, and % (modulus/remainder).",
        "Integer division truncates the result — 7 / 2 gives 3, not 3.5. Cast to double for decimal results.",
        "The equality comparison operator is == (two equals signs); = is assignment — confusing them is a classic bug.",
        "Compound operators like +=, -=, *= combine arithmetic and assignment in one step.",
        "Logical && and || use short-circuit evaluation — the right side is not evaluated if the left side determines the result."
      ],
      commonMistakes: [
        "Writing = instead of == in a condition — this assigns instead of comparing, and the condition is almost always wrong.",
        "Performing integer division when decimal results are needed — 5 / 2 gives 2, not 2.5.",
        "Confusing the post-increment (x++) and pre-increment (++x) when used inside complex expressions.",
        "Using & instead of && for logical AND — single & is the bitwise AND operator, not the logical one.",
        "Forgetting that the % operator works on integers only — using it with floats causes a compiler error."
      ],
      bestPractices: [
        "Add parentheses around complex expressions to make operator precedence explicit and code easier to read.",
        "Avoid using increment/decrement operators inside larger expressions — use them on their own line for clarity.",
        "When doing division that should be decimal, explicitly cast one operand to double to prevent integer division.",
        "Use compound assignment operators (+=, -=) for conciseness, but do not sacrifice readability for brevity.",
        "Write comparison conditions in an order that makes logical sense when read aloud, e.g., 'if (count > 0)'."
      ],
      exercises: [
        {
          title: "Exercise 1 - Modulus Magic",
          description: "Write a C program that reads an integer from the user. Use the modulus operator to determine and print whether the number is even or odd. Then print the remainder when the number is divided by 7.",
          hint: "If number % 2 == 0, the number is even. If number % 2 == 1 (or != 0), it is odd. Use printf to print both results clearly."
        },
        {
          title: "Exercise 2 - Integer vs Float Division",
          description: "Write a C program that declares two int variables a = 9 and b = 4. Print the result of a/b as an integer, then print the result of (double)a / b as a double with 4 decimal places. Explain the difference in a comment.",
          hint: "Use %d for integer division and %.4f for double division. The cast (double)a converts a from int to double before the division happens."
        },
        {
          title: "Exercise 3 - Operator Table",
          description: "Write a C program that asks the user for two integers. Print a table showing all five arithmetic operations (+, -, *, /, %) applied to those two numbers, plus the results of all six comparison operators (==, !=, >, <, >=, <=). Each row should have the operator symbol, operands, and result.",
          hint: "Use a separate printf for each operation. Comparison operators produce 1 or 0 — print those as integers with %d."
        }
      ],
      challenge: {
        title: "Challenge - Mini Calculator with Precedence",
        description: "Write a C program that asks the user to enter three integers: a, b, and c. Then compute and display the results of the following expressions (print each expression as text alongside the result): a+b*c, (a+b)*c, a-b+c, a*(b-c), a%b+c, and (a+b)%(c+1). Make sure all output is clearly labelled. Also check using logical operators: print 1 if all three values are positive (using &&), and print 1 if at least one of them is negative (using ||).",
        hint: "Operator precedence in C follows mathematical rules: * and / before + and -. Use parentheses to override precedence. For the logical checks, conditions like (a > 0 && b > 0 && c > 0) work naturally with &&."
      },
      quiz: [
        {
          question: "What is the result of 17 % 5 in C?",
          options: ["3", "2", "3.4", "1"],
          correctIndex: 1,
          explanation: "The % operator gives the remainder of integer division. 17 divided by 5 is 3 remainder 2, so 17 % 5 = 2."
        },
        {
          question: "What is the result of 7 / 2 in C when both operands are integers?",
          options: ["3.5", "4", "3", "3.0"],
          correctIndex: 2,
          explanation: "Integer division in C truncates (discards) the fractional part. 7 divided by 2 is 3.5, but with integer division the result is 3. To get 3.5, at least one operand must be a floating-point type."
        },
        {
          question: "What does the expression 'x += 5' mean?",
          options: [
            "x is equal to 5",
            "x is greater than or equal to 5",
            "Add 5 to x and store the result back in x",
            "Check if x plus 5 is true"
          ],
          correctIndex: 2,
          explanation: "+= is a compound assignment operator. 'x += 5' is shorthand for 'x = x + 5' — it adds 5 to the current value of x and stores the result back in x."
        },
        {
          question: "What is the difference between = and == in C?",
          options: [
            "They are the same; both test for equality",
            "= assigns a value to a variable; == tests whether two values are equal",
            "= tests equality; == assigns",
            "= is for integers; == is for floats"
          ],
          correctIndex: 1,
          explanation: "= is the assignment operator (sets a variable's value). == is the equality comparison operator (tests if two values are the same, returning 1 for true or 0 for false). Mixing them up is a very common and hard-to-spot bug."
        },
        {
          question: "What is the result of (double)7 / 2 in C?",
          options: ["3", "3.0", "3.5", "4"],
          correctIndex: 2,
          explanation: "Casting 7 to double makes it 7.0, a floating-point value. Dividing 7.0 by the integer 2 promotes 2 to double as well, giving 3.5 as a floating-point result."
        },
        {
          question: "What does the logical && operator do?",
          options: [
            "Performs bitwise AND on two integers",
            "Returns true (1) only if both operands are non-zero (true)",
            "Returns true (1) if at least one operand is non-zero",
            "Negates a single boolean value"
          ],
          correctIndex: 1,
          explanation: "&& is logical AND. The expression (A && B) is 1 (true) only if both A and B are non-zero. If either is zero (false), the result is 0 (false)."
        },
        {
          question: "What does the logical || operator do?",
          options: [
            "Returns true if both operands are true",
            "Returns true if at least one operand is non-zero",
            "Performs bitwise OR on two integers",
            "Negates a single boolean value"
          ],
          correctIndex: 1,
          explanation: "|| is logical OR. The expression (A || B) is 1 (true) if at least one of A or B is non-zero. It is only 0 (false) if both A and B are zero."
        },
        {
          question: "What is 'short-circuit evaluation' in the context of logical operators?",
          options: [
            "The processor executes both sides of && and || simultaneously",
            "If the result can be determined from the left operand alone, the right operand is not evaluated",
            "The operator rounds the result to the nearest integer",
            "An error that occurs when the circuit is too short"
          ],
          correctIndex: 1,
          explanation: "With &&, if the left operand is false, the overall result is already false so the right operand is skipped. With ||, if the left is true, the right is skipped. This prevents unnecessary computation and side effects."
        },
        {
          question: "What is the result of !0 in C?",
          options: ["0", "1", "-1", "undefined"],
          correctIndex: 1,
          explanation: "The logical NOT operator ! negates a boolean value. In C, 0 is false, so !0 is true, which is represented as 1."
        },
        {
          question: "What does x++ do to the variable x?",
          options: [
            "Multiplies x by itself",
            "Adds 1 to x (post-increment)",
            "Subtracts 1 from x",
            "Tests if x is positive"
          ],
          correctIndex: 1,
          explanation: "x++ is the post-increment operator: it adds 1 to x. 'Post' means the original value of x is used in the surrounding expression before the increment takes effect."
        },
        {
          question: "What is the difference between x++ and ++x?",
          options: [
            "x++ adds 2; ++x adds 1",
            "x++ adds 1; ++x does nothing",
            "Both add 1 to x, but x++ returns the value before incrementing; ++x returns the value after",
            "There is no difference"
          ],
          correctIndex: 2,
          explanation: "Both increment x by 1, but they differ in the value they yield when used inside an expression. x++ yields the old value (post-increment); ++x yields the new value (pre-increment)."
        },
        {
          question: "What is the result of 10 % 3?",
          options: ["3", "1", "0", "4"],
          correctIndex: 1,
          explanation: "10 divided by 3 is 3 remainder 1 (3 * 3 = 9, and 10 - 9 = 1). So 10 % 3 = 1."
        },
        {
          question: "What is the result of the expression (5 > 3)?",
          options: ["5", "3", "1", "true"],
          correctIndex: 2,
          explanation: "Comparison operators in C return the integer 1 for true and 0 for false. Since 5 is greater than 3, (5 > 3) evaluates to 1."
        },
        {
          question: "What is the result of (5 == 5) && (3 > 7)?",
          options: ["1", "0", "5", "undefined"],
          correctIndex: 1,
          explanation: "(5 == 5) is 1 (true) and (3 > 7) is 0 (false). With &&, both must be true for the result to be true. Since one is false, the result is 0 (false)."
        },
        {
          question: "What operator would you use to check if a number is divisible by 4?",
          options: ["/ 4", "% 4 == 0", "* 4 == 0", "// 4"],
          correctIndex: 1,
          explanation: "A number is divisible by 4 if the remainder when divided by 4 is zero. So you check 'number % 4 == 0'. If the condition is true (1), the number is divisible by 4."
        },
        {
          question: "Which of the following is the bitwise AND operator (not logical AND)?",
          options: ["&&", "&", "AND", "and"],
          correctIndex: 1,
          explanation: "& is the bitwise AND operator — it operates on individual bits of integer values. && is the logical AND operator that works on boolean (true/false) values. They are very different and should not be confused."
        },
        {
          question: "What is the value of x after: int x = 10; x -= 3; x *= 2;",
          options: ["14", "17", "20", "7"],
          correctIndex: 0,
          explanation: "First, x -= 3 makes x = 7. Then x *= 2 makes x = 14. The compound assignment operators execute left to right, one at a time."
        },
        {
          question: "Why is writing 'if (x = 5)' instead of 'if (x == 5)' a bug?",
          options: [
            "= is not allowed inside if conditions",
            "x = 5 assigns 5 to x (always true if 5 is non-zero) instead of comparing, so the condition is almost always wrong",
            "The compiler rejects single = in conditions",
            "There is no bug; both work identically"
          ],
          correctIndex: 1,
          explanation: "'x = 5' assigns 5 to x and evaluates to 5 (non-zero = true), so the if block always runs regardless of x's original value. This is a logic bug that GCC can warn about with -Wall."
        },
        {
          question: "What is operator precedence in C?",
          options: [
            "The order in which variables are declared",
            "The rules that determine which operator is evaluated first in an expression with multiple operators",
            "The priority of functions over operators",
            "The order in which arguments are passed to a function"
          ],
          correctIndex: 1,
          explanation: "Operator precedence determines evaluation order. For example, * and / have higher precedence than + and -, so 2 + 3 * 4 evaluates as 2 + (3 * 4) = 14, not (2 + 3) * 4 = 20."
        },
        {
          question: "What does 'x %= 3' do?",
          options: [
            "Sets x to 3",
            "Computes x modulo 3 and stores the result back in x",
            "Divides x by 3",
            "Tests if x is divisible by 3"
          ],
          correctIndex: 1,
          explanation: "%= is the compound modulo-assign operator. 'x %= 3' is equivalent to 'x = x % 3' — it replaces x with the remainder of dividing x by 3."
        }
      ]
    },
    {
      id: "topic-1-8",
      title: "Comments and Code Style",
      estimatedReadingTime: 7,
      explanation: `Comments are pieces of text in your source code that the compiler completely ignores. They exist for human readers — for you to explain your code to yourself and to others. Writing good comments is an essential programming skill that separates professional-quality code from beginner code. Comments serve many purposes: they explain why a piece of code does what it does (not just what it does, since the code itself shows what), they document assumptions and edge cases, they temporarily disable code during debugging, and they leave notes for future readers (which is often future you, returning to code weeks or months later).

C supports two comment styles. The first is the block comment, which begins with slash-asterisk and ends with asterisk-slash. Everything between these two markers is a comment, and it can span multiple lines. Block comments are often used for file headers (at the top of a file, describing its purpose, author, and date), for documenting function behaviour, or for temporarily commenting out a large block of code. The second style is the single-line comment, which begins with two slashes and extends to the end of the current line. This style was borrowed from C++ and became officially part of C in the C99 standard. Single-line comments are ideal for brief notes alongside code.

Code style refers to the conventions and habits that make your code consistently formatted and readable. While the C compiler accepts almost any arrangement of whitespace, identically-structured code that follows a consistent style is dramatically easier to read and debug. The most important style decisions are: indentation (use 4 spaces per level — this is by far the most common C convention), brace placement (the opening brace of a function body is typically on the same line as the function header or on the next line — choose one style and be consistent), line length (keep lines under 80 characters so they are readable in most editors and terminals), and spacing around operators (writing 'a + b' rather than 'a+b' improves readability significantly).

Many organisations and projects define their own style guides. The Linux kernel uses the K&R style with 8-space tabs. Google's C++ style guide uses 2 spaces. Most standalone C projects use 4 spaces. The important thing is not which style you choose, but that you choose one and apply it consistently throughout your codebase. Inconsistently styled code signals carelessness and makes collaboration harder.

One common question beginners ask is: how much should I comment? The answer is to comment the 'why' and 'how', not the 'what'. A comment that says 'add 1 to x' above the line 'x = x + 1' adds no value — the code already says that. But a comment that says 'increment index to skip the header line' explains the reason, which is not visible from the code alone. Over-commenting is almost as bad as under-commenting because it creates noise that obscures the important comments. Strive for code that is clear enough that only the non-obvious parts need explanation.`,
      codeExample: `/* comments_style_demo.c
   Author: CodeCraft Team
   Purpose: Demonstrates comment styles and good code formatting.
   Compile: gcc comments_style_demo.c -o comments_style_demo
   Run:     ./comments_style_demo
*/

#include <stdio.h>

/* Compute the factorial of a non-negative integer n.
   Uses an iterative approach (loop rather than recursion)
   to avoid stack overflow for large inputs.
   Returns: n! (n factorial), or 1 if n is 0 (by convention). */
int factorial(int n)
{
    int result = 1;
    int i;

    /* Multiply result by each integer from 1 up to n */
    for (i = 1; i <= n; i++) {
        result *= i;
    }

    return result;
}

int main(void)
{
    int number = 6;  /* Change this to compute a different factorial */

    /* Print header */
    printf("Factorial Calculator\\n");
    printf("-------------------\\n");

    /* We start at 0 because 0! = 1 by mathematical convention */
    int k;
    for (k = 0; k <= number; k++) {
        printf("%d! = %d\\n", k, factorial(k));
    }

    return 0;
}`,
      expectedOutput: `Factorial Calculator
-------------------
0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720`,
      keyTakeaways: [
        "Block comments (/* ... */) can span multiple lines; single-line comments (//) go to end of line (C99+).",
        "Comment the 'why' and 'how', not the 'what' — the code already shows what it does.",
        "Consistent indentation (4 spaces per level) is the most important formatting habit in C.",
        "Good style includes blank lines between logical sections, spaces around operators, and descriptive names.",
        "A file header comment with purpose, author, and date is professional practice for every source file."
      ],
      commonMistakes: [
        "Nesting block comments — C does not support /* inside another /* ... */, causing compiler errors.",
        "Over-commenting obvious code ('i = i + 1; // add 1 to i') while leaving complex code unexplained.",
        "Using inconsistent indentation — mixing tabs and spaces causes code to look misaligned in different editors.",
        "Writing lines longer than 80 characters, which forces horizontal scrolling and reduces readability.",
        "Forgetting to update comments when you change the code, leaving misleading or contradictory comments."
      ],
      bestPractices: [
        "Write a file header comment at the top of every source file with its purpose, compilation command, and author.",
        "Document each function with a comment explaining its purpose, parameters, and what it returns.",
        "Use single-line (//) comments for brief annotations on the same line or immediately above a statement.",
        "Keep your style consistent: choose a brace style, an indentation width, and a naming convention, then use them everywhere.",
        "Periodically review and update comments when you change code — stale comments are worse than no comments."
      ],
      exercises: [
        {
          title: "Exercise 1 - Comment an Existing Program",
          description: "Take any program you wrote in a previous topic (at least 15 lines of code). Add a proper file header comment, a function-level comment for every function, and inline comments explaining any non-obvious lines. Aim to explain the 'why' not the 'what'. At least 30% of your lines should be comments or blank lines.",
          hint: "Start with the file header: /* filename, Author, Purpose, Compile instructions */. Then add a block comment above each function explaining what it does, what its parameters mean, and what it returns."
        },
        {
          title: "Exercise 2 - Style Makeover",
          description: "The following code is poorly styled. Rewrite it with proper indentation, meaningful variable names, spaces around operators, and appropriate comments:\nint main(){int x=10,y=20,z;z=x*y+x/y-x%y;printf(\"%d\\n\",z);return 0;}",
          hint: "First, expand it to multiple lines with one statement per line. Then indent the body of main() by 4 spaces. Rename x, y, z to something meaningful. Add spaces around all operators. Add a comment explaining what z computes."
        },
        {
          title: "Exercise 3 - Defensive Comments",
          description: "Write a C program that computes the average of three floating-point numbers entered by the user. Add comments that explain: (1) why you use double instead of float, (2) why you use 3.0 instead of 3 in the division, and (3) what happens if the user enters the same value three times.",
          hint: "The key insight for comment (2) is that dividing by the integer 3 would cause integer division even though the sum is a double. Dividing by 3.0 ensures floating-point division."
        }
      ],
      challenge: {
        title: "Challenge - Fully Documented Library",
        description: "Write a C program that defines four small utility functions: one that computes the square of an integer, one that computes the cube, one that returns the absolute value (without using <math.h>), and one that returns the larger of two integers. Each function must have a complete documentation comment in a style similar to Javadoc or Doxygen — including description, parameter names and meanings, and return value. Main should call and demonstrate all four functions. Apply consistent 4-space indentation and keep all lines under 80 characters. Compile with -Wall -Wextra with no warnings or errors.",
        hint: "A documentation comment looks like: /* Compute the square of n. Param n: the integer to square. Returns: n * n. */. Write it immediately above the function definition. For absolute value without <math.h>, return (n < 0) ? -n : n;."
      },
      quiz: [
        {
          question: "What is a comment in C?",
          options: [
            "A special type of variable that stores text",
            "Text in source code that the compiler ignores, written for human readers",
            "An error message printed at runtime",
            "A function that displays information"
          ],
          correctIndex: 1,
          explanation: "Comments are text in source code that the compiler ignores completely. They exist solely for human readers — to explain, document, and annotate code."
        },
        {
          question: "Which syntax starts a block comment in C?",
          options: ["//", "/*", "#", "--"],
          correctIndex: 1,
          explanation: "A block comment starts with /* and ends with */. It can span multiple lines. Everything between the delimiters is ignored by the compiler."
        },
        {
          question: "Which syntax starts a single-line comment in C (C99 and later)?",
          options: ["/*", "//", "#!", "--"],
          correctIndex: 1,
          explanation: "Single-line comments start with // and extend to the end of that line. They were introduced in C99 (borrowed from C++). Everything after // on the same line is ignored."
        },
        {
          question: "Can block comments be nested in C?",
          options: [
            "Yes — you can have /* inside /* ... */",
            "No — a /* ... */ comment ends at the very first */ it encounters",
            "Only with a special compiler flag",
            "Yes, but only up to 3 levels deep"
          ],
          correctIndex: 1,
          explanation: "Block comments cannot be nested. The comment ends at the first */ the compiler finds, regardless of how many /* appear inside it. Attempting to nest them causes compiler errors or unexpected behaviour."
        },
        {
          question: "What is the best content for a comment?",
          options: [
            "Explaining what the code does literally (e.g., 'increment x by 1')",
            "Explaining why the code does something, or how a non-obvious approach works",
            "Listing every variable and its type",
            "Copying the compiler manual into comments"
          ],
          correctIndex: 1,
          explanation: "Good comments explain intent and reasoning — the 'why' — because the code itself shows the 'what'. Comments that restate the obvious ('add 1 to i') add noise without value."
        },
        {
          question: "How many spaces per indentation level is most common in C?",
          options: ["2", "4", "8", "1"],
          correctIndex: 1,
          explanation: "4 spaces per indentation level is the most widely used convention in C. The Linux kernel uses 8 spaces, and some projects use 2, but 4 is the most common default."
        },
        {
          question: "What is the maximum recommended line length in C source code?",
          options: ["40 characters", "80 characters", "120 characters", "There is no recommended limit"],
          correctIndex: 1,
          explanation: "80 characters per line is a long-standing convention, originating from the width of old terminals and punch cards. It ensures code is readable in split-screen editors and terminals without horizontal scrolling."
        },
        {
          question: "What is a file header comment?",
          options: [
            "The first #include directive in a file",
            "A block comment at the top of a source file describing its purpose, author, and other metadata",
            "A comment inside the main() function",
            "The return statement at the end of main()"
          ],
          correctIndex: 1,
          explanation: "A file header comment is a block comment at the very top of a source file that documents the file's purpose, how to compile it, the author, date, and any other relevant information."
        },
        {
          question: "Which of the following represents good commenting practice?",
          options: [
            "/* x = x + 1; */ /* add 1 to x */",
            "/* Skip the header row — row 0 contains column names, not data */\\ni = 1;",
            "int i; /* i */",
            "/* TODO: write the rest of the program later */"
          ],
          correctIndex: 1,
          explanation: "The second option explains why i starts at 1 (to skip the header row), which is non-obvious from the code alone. The others either state the obvious, are meaningless, or leave a permanent TODO without resolution."
        },
        {
          question: "What happens if you forget to close a block comment with */? ",
          options: [
            "The compiler treats the rest of the file as a comment and produces errors or an empty program",
            "The comment ends at the next #include",
            "The comment automatically closes at the end of the function",
            "The compiler inserts */ at the end of the file"
          ],
          correctIndex: 0,
          explanation: "An unclosed block comment causes the compiler to treat everything from the opening /* to the end of the file as a comment. This typically results in 'unexpected end of file' errors."
        },
        {
          question: "Why is consistent indentation important?",
          options: [
            "The compiler uses indentation to determine block boundaries",
            "Consistent indentation makes the program run faster",
            "Consistent indentation makes code structure visually obvious and easier for humans to read and debug",
            "It is required by the C standard"
          ],
          correctIndex: 2,
          explanation: "C ignores whitespace (unlike Python), but consistent indentation is essential for humans. Misaligned code hides bugs and makes the logical structure (which block belongs where) hard to see."
        },
        {
          question: "What is 'stale' or 'misleading' comments?",
          options: [
            "Comments that are very old but still accurate",
            "Comments that no longer match the code because the code was changed without updating the comment",
            "Comments written in a foreign language",
            "Comments that explain the 'why' instead of the 'what'"
          ],
          correctIndex: 1,
          explanation: "A stale comment was accurate when written but is now wrong because the code changed and the comment was not updated. These are dangerous because they mislead readers about what the code actually does."
        },
        {
          question: "What does 'code style' refer to?",
          options: [
            "The font used to display code in your editor",
            "The programming language you choose to use",
            "Consistent conventions for formatting, naming, and structuring code",
            "The colour scheme of the development environment"
          ],
          correctIndex: 2,
          explanation: "Code style encompasses all the formatting and naming conventions used consistently throughout a codebase: indentation, brace placement, line length, naming conventions, and comment density."
        },
        {
          question: "Which statement about the // comment style is true?",
          options: [
            "It was part of C from the very beginning (C89)",
            "It was introduced in C99 and is now universally supported",
            "It only works with GCC, not other compilers",
            "It can span multiple lines without any special marker"
          ],
          correctIndex: 1,
          explanation: "The // single-line comment was introduced in the C99 standard, adopted from C++. It is now universally supported by modern C compilers. In C89, only /* ... */ block comments were valid."
        },
        {
          question: "What should a function-level comment document?",
          options: [
            "The implementation details and every line inside the function",
            "The function's purpose, its parameters, and what it returns",
            "The history of who edited the function and when",
            "Nothing — function names should be self-explanatory"
          ],
          correctIndex: 1,
          explanation: "A good function comment describes what the function does (purpose), what each parameter means, and what value it returns. Implementation details inside the function are a separate concern."
        },
        {
          question: "What is the 'K&R' brace style?",
          options: [
            "Placing the opening brace on the same line as the control statement or function header",
            "Placing the opening brace on its own new line below the statement",
            "Using no braces at all",
            "Using square brackets instead of curly braces"
          ],
          correctIndex: 0,
          explanation: "K&R style (Kernighan and Ritchie, from their C book) places the opening brace at the end of the line: 'int main(void) {'. Allman style places it on the next line. Both are common; consistency matters more than which you pick."
        },
        {
          question: "Is over-commenting (adding too many comments) harmful?",
          options: [
            "No — you can never have too many comments",
            "Yes — excessive obvious comments create noise that hides important comments and reduces readability",
            "Yes — comments slow down compilation significantly",
            "No — the compiler removes all comments so they have no effect"
          ],
          correctIndex: 1,
          explanation: "Over-commenting is counterproductive. When every line has a comment, important comments are buried in noise and readers stop paying attention to them. Focus comments on the non-obvious parts."
        },
        {
          question: "What style should be used for code inside a function body?",
          options: [
            "No indentation — all code starts at column 1",
            "Each statement indented by one level (e.g., 4 spaces) relative to the function body braces",
            "Alternating indentation on each line",
            "Indentation based on the number of characters on the line"
          ],
          correctIndex: 1,
          explanation: "Code inside a function body should be indented one level (typically 4 spaces) relative to the braces. Nested structures (like loops inside ifs) are indented another level further."
        },
        {
          question: "Which of the following is a valid C99 single-line comment?",
          options: [
            "/* This is my comment",
            "// This is my comment",
            "## This is my comment",
            "-- This is my comment"
          ],
          correctIndex: 1,
          explanation: "// starts a single-line comment in C99 and later. /* without a closing */ is an unclosed block comment (error). ## and -- are not comment syntax in C."
        },
        {
          question: "Why should you add spaces around binary operators like + and =?",
          options: [
            "The compiler requires spaces around operators",
            "Spaces make expressions easier for humans to read and reduce visual ambiguity",
            "Spaces change operator precedence",
            "Spaces speed up compilation"
          ],
          correctIndex: 1,
          explanation: "Spaces around operators (writing 'a + b' instead of 'a+b') improve human readability. The compiler ignores whitespace, so it has no functional effect, but it makes code significantly clearer to read and review."
        }
      ]
    }
  ]
};
