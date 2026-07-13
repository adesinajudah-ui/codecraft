import type { Lesson } from "./types";

export const lesson5: Lesson = {
  id: "lesson-5",
  title: "Lesson 5 – Advanced C",
  description: "Master advanced C programming topics including dynamic memory, file handling, data structures, multi-file projects, and professional best practices.",
  topics: [
    {
      id: "topic-5-1",
      title: "Dynamic Memory Allocation (malloc, calloc, realloc, free)",
      estimatedReadingTime: 12,
      explanation: `When you declare a regular variable like "int x = 5;", the memory for that variable is reserved at compile time and lives on the stack. The stack is fast and automatically cleaned up, but it has a fixed size and you must know in advance how much space you need. Dynamic memory allocation gives you a completely different option: you can request memory at runtime, from a region called the heap, in whatever amount you need at that moment.

Think of the stack like a fixed-size notepad you carry in your pocket — great for quick notes, but limited space. The heap is like a warehouse. You can rent as much space as you want from the warehouse, use it for as long as you need, and then return it when you are done. The trade-off is that you are responsible for managing that rental: if you forget to return it, the warehouse gradually fills up, which is called a memory leak.

The four key functions for dynamic memory in C all live in the header <stdlib.h>. The first is malloc (memory allocate). You call it with the number of bytes you want, and it returns a void pointer to the first byte of that block. Because it returns a void pointer, you typically cast it to the type you need. If the allocation fails (for example, the system is out of memory), malloc returns NULL, so you should always check the returned pointer before using it.

The second function is calloc (clear allocate). It works like malloc but takes two arguments: the number of elements and the size of each element. Crucially, calloc also zeroes out all the bytes in the allocated block, whereas malloc leaves the memory with whatever random data happened to be there. This makes calloc safer when you want a clean starting state, such as when initialising an array of integers to zero.

The third function is realloc (re-allocate). It allows you to resize a previously allocated block. You pass it the original pointer and the new total size you want. It may move the block to a different location in memory if it cannot expand the existing block in place, so you must use the returned pointer going forward, not the old one. Finally, free releases the memory back to the system. Every malloc or calloc must be paired with exactly one free, and you should never use a pointer after freeing it — that is called a dangling pointer and leads to unpredictable behaviour.`,
      codeExample: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    /* --- malloc: allocate an array of 5 integers --- */
    int *arr = (int *)malloc(5 * sizeof(int));
    if (arr == NULL) {
        fprintf(stderr, "malloc failed\\n");
        return 1;
    }

    /* Fill the array manually (malloc does NOT zero memory) */
    for (int i = 0; i < 5; i++) {
        arr[i] = (i + 1) * 10;
    }
    printf("malloc array: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    /* --- realloc: grow the array to hold 8 integers --- */
    int *bigger = (int *)realloc(arr, 8 * sizeof(int));
    if (bigger == NULL) {
        fprintf(stderr, "realloc failed\\n");
        free(arr);
        return 1;
    }
    arr = bigger;  /* use the new pointer from now on */
    arr[5] = 60;
    arr[6] = 70;
    arr[7] = 80;
    printf("realloc array: ");
    for (int i = 0; i < 8; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    free(arr);

    /* --- calloc: allocate and zero 4 doubles --- */
    double *scores = (double *)calloc(4, sizeof(double));
    if (scores == NULL) {
        fprintf(stderr, "calloc failed\\n");
        return 1;
    }
    printf("calloc zeros: ");
    for (int i = 0; i < 4; i++) {
        printf("%.1f ", scores[i]);  /* all should be 0.0 */
    }
    printf("\\n");

    scores[0] = 95.5;
    scores[1] = 88.0;
    printf("after filling: %.1f %.1f\\n", scores[0], scores[1]);

    free(scores);

    /* --- Dynamic string copy --- */
    const char *msg = "Hello, heap!";
    char *copy = (char *)malloc(strlen(msg) + 1);  /* +1 for null terminator */
    if (copy) {
        strcpy(copy, msg);
        printf("String copy: %s\\n", copy);
        free(copy);
    }

    return 0;
}`,
      expectedOutput: `malloc array: 10 20 30 40 50 
realloc array: 10 20 30 40 50 60 70 80 
calloc zeros: 0.0 0.0 0.0 0.0 
after filling: 95.5 88.0
String copy: Hello, heap!`,
      keyTakeaways: [
        "malloc allocates raw uninitialized bytes on the heap; always check for NULL return.",
        "calloc allocates and zero-initializes memory, taking element count and element size.",
        "realloc resizes an existing allocation; always capture the return value in a new pointer.",
        "Every malloc/calloc must be paired with exactly one free to prevent memory leaks.",
        "Never use a pointer after calling free on it — that creates a dangling pointer.",
        "sizeof ensures your allocation is correct regardless of platform-specific type sizes."
      ],
      commonMistakes: [
        "Forgetting to check if malloc/calloc returned NULL before using the pointer — on failure this causes a crash.",
        "Using the old pointer after realloc — realloc may move the block, making the old address invalid.",
        "Freeing memory twice (double free) — this corrupts the heap and causes undefined behaviour.",
        "Not freeing allocated memory at all — leads to memory leaks that grow over time.",
        "Allocating strlen(s) bytes for a string copy instead of strlen(s)+1, forgetting the null terminator."
      ],
      bestPractices: [
        "Always check the return value of malloc, calloc, and realloc for NULL before using the pointer.",
        "Set a pointer to NULL immediately after freeing it to prevent accidental use of a dangling pointer.",
        "Use sizeof(type) rather than hard-coding byte counts to keep code portable across platforms.",
        "Prefer calloc when you need a zeroed block; it is both safer and more readable than malloc+memset.",
        "Track all allocations systematically and use tools like Valgrind to detect leaks during development."
      ],
      exercises: [
        {
          title: "Exercise 1 – Dynamic Integer Array",
          description: "Write a program that asks the user for a count N, allocates an array of N integers with malloc, reads N values from stdin, computes the sum and average, prints them, then frees the memory.",
          hint: "Remember to multiply N by sizeof(int) in the malloc call, and always check the returned pointer for NULL."
        },
        {
          title: "Exercise 2 – Growing Buffer",
          description: "Start with a calloc block of 3 doubles. Print the zero-initialised values. Then use realloc to grow it to 6 doubles, fill the new slots with 1.0, 2.0, 3.0, and print all 6 values.",
          hint: "Assign realloc's return value to a temporary pointer first; only update your main pointer if realloc succeeds."
        },
        {
          title: "Exercise 3 – Dynamic String Builder",
          description: "Write a function char *duplicate(const char *s) that uses malloc to allocate exactly the right number of bytes, copies the string s into the new buffer, and returns it. In main, call it, print the result, and free the returned pointer.",
          hint: "The right number of bytes is strlen(s) + 1 to account for the null terminator at the end."
        }
      ],
      challenge: {
        title: "Challenge – Dynamic 2D Matrix",
        description: "Create a dynamically allocated 2D matrix of integers. First allocate an array of N row pointers using malloc, then allocate each row with malloc. Fill the matrix so that element [i][j] = i * N + j. Print the matrix, then free every row and the pointer array. Accept N as a command-line argument.",
        hint: "Free each row in a loop before freeing the outer pointer array. Use atoi to convert the command-line argument to an integer."
      },
      quiz: [
        {
          question: "Which function allocates memory AND zeroes all the bytes?",
          options: ["malloc", "calloc", "realloc", "free"],
          correctIndex: 1,
          explanation: "calloc allocates a block and initialises every byte to zero. malloc allocates raw uninitialized memory."
        },
        {
          question: "What does malloc return if it cannot allocate the requested memory?",
          options: ["0", "NULL", "-1", "An uninitialised pointer"],
          correctIndex: 1,
          explanation: "malloc returns NULL on failure, which is why you must always check the returned pointer before using it."
        },
        {
          question: "What is a memory leak?",
          options: [
            "Accessing memory out of bounds",
            "Using a freed pointer",
            "Allocating memory that is never freed",
            "Declaring too many local variables"
          ],
          correctIndex: 2,
          explanation: "A memory leak occurs when heap memory is allocated but never freed, gradually exhausting available memory."
        },
        {
          question: "Which header must you include to use malloc, calloc, realloc, and free?",
          options: ["<stdio.h>", "<string.h>", "<stdlib.h>", "<memory.h>"],
          correctIndex: 2,
          explanation: "These four dynamic memory functions are declared in <stdlib.h>."
        },
        {
          question: "What is the correct way to allocate space for 10 ints?",
          options: [
            "malloc(10)",
            "malloc(10 * sizeof(int))",
            "calloc(sizeof(int))",
            "malloc(sizeof(10))"
          ],
          correctIndex: 1,
          explanation: "You need 10 elements each of size sizeof(int) bytes, so the correct call is malloc(10 * sizeof(int))."
        },
        {
          question: "After calling realloc, which pointer should you use going forward?",
          options: [
            "The original pointer passed to realloc",
            "Both pointers interchangeably",
            "The pointer returned by realloc",
            "A pointer cast to char *"
          ],
          correctIndex: 2,
          explanation: "realloc may move the block; always use the returned pointer, as the original may be invalid after the call."
        },
        {
          question: "What is a dangling pointer?",
          options: [
            "A pointer that is never initialised",
            "A pointer used after the memory it points to has been freed",
            "A pointer to a stack variable",
            "A pointer returned by calloc"
          ],
          correctIndex: 1,
          explanation: "A dangling pointer refers to memory that has already been freed; accessing it causes undefined behaviour."
        },
        {
          question: "How many times should you call free for a single malloc allocation?",
          options: ["Zero times", "Once", "Twice", "As many times as you read from it"],
          correctIndex: 1,
          explanation: "Each allocation must be freed exactly once. Freeing twice (double free) corrupts the heap."
        },
        {
          question: "What does calloc(4, sizeof(double)) do?",
          options: [
            "Allocates 4 bytes and does not initialise them",
            "Allocates space for 4 doubles and sets all bytes to zero",
            "Allocates space for 4 doubles with random values",
            "Returns a double value"
          ],
          correctIndex: 1,
          explanation: "calloc takes element count and element size, allocates the total bytes, and zeroes every byte."
        },
        {
          question: "Why should you set a pointer to NULL after freeing it?",
          options: [
            "To reclaim the memory immediately",
            "To prevent accidentally using the now-invalid address",
            "Because free requires a NULL argument",
            "To signal the OS to zero the memory"
          ],
          correctIndex: 1,
          explanation: "Setting a pointer to NULL after free prevents accidental dereference of the dangling pointer in later code."
        },
        {
          question: "What is the heap in C memory management?",
          options: [
            "The region where global variables are stored",
            "The region for local function variables",
            "The region managed by malloc and free for dynamic allocation",
            "The memory used to store machine code"
          ],
          correctIndex: 2,
          explanation: "The heap is the area of memory managed by malloc/calloc/realloc/free for dynamic, runtime allocations."
        },
        {
          question: "Which statement about malloc is TRUE?",
          options: [
            "malloc zeroes the allocated memory",
            "malloc returns an int *",
            "malloc takes the number of bytes and returns a void *",
            "malloc can never fail"
          ],
          correctIndex: 2,
          explanation: "malloc takes a byte count (size_t) and returns a void *, which you cast to the appropriate pointer type."
        },
        {
          question: "How many bytes should you allocate to store a copy of the string \"hello\"?",
          options: ["4", "5", "6", "7"],
          correctIndex: 2,
          explanation: "\"hello\" has 5 characters plus a null terminator '\\0', requiring 6 bytes total."
        },
        {
          question: "What happens if you pass NULL to free()?",
          options: [
            "It crashes immediately",
            "It is a no-op; nothing happens",
            "It frees the entire heap",
            "It causes undefined behaviour"
          ],
          correctIndex: 1,
          explanation: "The C standard guarantees that free(NULL) is safe and does nothing, so you do not need to check before calling free."
        },
        {
          question: "Which tool is commonly used to detect memory leaks in C programs on Linux?",
          options: ["gdb", "strace", "Valgrind", "nm"],
          correctIndex: 2,
          explanation: "Valgrind (specifically its Memcheck tool) reports memory leaks, use of uninitialised memory, and other heap errors."
        },
        {
          question: "What is wrong with: int *p = malloc(sizeof(int)); *p = 5; free(p); printf(\"%d\", *p);",
          options: [
            "sizeof(int) is the wrong size",
            "Accessing *p after free is a dangling pointer dereference",
            "printf format is wrong for int",
            "Nothing is wrong"
          ],
          correctIndex: 1,
          explanation: "After free(p), p becomes a dangling pointer. Reading *p is undefined behaviour and may crash or return garbage."
        },
        {
          question: "realloc(ptr, 0) is equivalent to calling:",
          options: ["malloc(0)", "calloc(0,0)", "free(ptr)", "Nothing"],
          correctIndex: 2,
          explanation: "Passing a size of 0 to realloc is implementation-defined but commonly equivalent to freeing the block."
        },
        {
          question: "Which of the following best describes 'double free'?",
          options: [
            "Allocating memory twice for the same variable",
            "Calling free twice on the same pointer",
            "Using calloc instead of malloc",
            "Allocating double-precision floats"
          ],
          correctIndex: 1,
          explanation: "Double free means calling free on the same pointer twice, which corrupts heap metadata and leads to crashes or exploits."
        },
        {
          question: "What does the void * return type of malloc mean?",
          options: [
            "The function returns nothing",
            "The pointer can be cast to any pointer type",
            "The allocated memory contains void data",
            "The function may return an integer"
          ],
          correctIndex: 1,
          explanation: "void * is a generic pointer; in C it can be implicitly converted to any pointer type, making malloc usable for any type."
        },
        {
          question: "In the call malloc(n * sizeof(int)), what is the purpose of sizeof(int)?",
          options: [
            "To print the size of int",
            "To determine the number of elements",
            "To ensure the correct number of bytes is requested regardless of platform",
            "To cast the return value"
          ],
          correctIndex: 2,
          explanation: "sizeof(int) yields the platform-specific byte size of int, making the allocation portable across 32-bit and 64-bit systems."
        }
      ]
    },
    {
      id: "topic-5-2",
      title: "File Handling in C",
      estimatedReadingTime: 11,
      explanation: `Programs that only use the keyboard and screen lose all their data when they finish running. File handling lets your program persist information by reading from and writing to files on disk. In C, file operations are performed through a pointer of type FILE, which is an opaque structure defined in <stdio.h>. You never need to know the internal details of FILE; you just work with a pointer to it.

The first step in any file operation is opening the file with fopen. You pass fopen the filename (as a string) and a mode string. Common modes are "r" (read only), "w" (write — creates the file or truncates an existing one), "a" (append — adds to the end without destroying existing content), "r+" (read and write), "w+" (read and write, truncating), and "a+" (read and append). fopen returns a FILE pointer, or NULL if the file could not be opened, so always check for NULL.

Once the file is open, you read or write using functions that mirror the console functions you already know. fprintf writes formatted text to a file, just like printf but with the FILE pointer as the first argument. fscanf reads formatted data from a file, like scanf. fgets reads a whole line as a string, which is generally safer than fscanf for text. fputc writes a single character, and fgetc reads one. For raw binary data, fread and fwrite transfer blocks of bytes directly.

When you are finished with a file, you must close it with fclose. Closing flushes any buffered data that has not yet been written to disk and releases the operating system resources associated with the file. Forgetting to close a file can result in data loss (because buffered writes may never reach disk) and resource leaks.

Error handling is important in file I/O. The function feof checks whether you have reached the end of a file, and ferror checks whether an error has occurred on a stream. The function perror prints a human-readable description of the last system error. These tools help you write robust programs that handle missing files, permission errors, and disk-full conditions gracefully rather than silently producing wrong results.`,
      codeExample: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    const char *filename = "demo.txt";

    /* --- Writing to a file --- */
    FILE *fp = fopen(filename, "w");
    if (fp == NULL) {
        perror("fopen for writing");
        return 1;
    }

    fprintf(fp, "Line 1: Hello from C!\\n");
    fprintf(fp, "Line 2: File handling is powerful.\\n");
    fprintf(fp, "Line 3: Score = %d\\n", 42);
    fclose(fp);
    printf("File written successfully.\\n");

    /* --- Reading back with fgets --- */
    fp = fopen(filename, "r");
    if (fp == NULL) {
        perror("fopen for reading");
        return 1;
    }

    printf("File contents:\\n");
    char buffer[128];
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("  %s", buffer);  /* fgets preserves the newline */
    }
    fclose(fp);

    /* --- Appending to the file --- */
    fp = fopen(filename, "a");
    if (fp == NULL) {
        perror("fopen for appending");
        return 1;
    }
    fprintf(fp, "Line 4: Appended later.\\n");
    fclose(fp);

    /* --- Read the updated file --- */
    fp = fopen(filename, "r");
    if (fp == NULL) { perror("fopen"); return 1; }
    printf("Updated file:\\n");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("  %s", buffer);
    }
    fclose(fp);

    return 0;
}`,
      expectedOutput: `File written successfully.
File contents:
  Line 1: Hello from C!
  Line 2: File handling is powerful.
  Line 3: Score = 42
Updated file:
  Line 1: Hello from C!
  Line 2: File handling is powerful.
  Line 3: Score = 42
  Line 4: Appended later.`,
      keyTakeaways: [
        "Use fopen to open a file and always check for a NULL return before proceeding.",
        "Mode strings control behaviour: 'r' reads, 'w' writes/truncates, 'a' appends.",
        "fprintf and fscanf work like printf/scanf but operate on a FILE pointer.",
        "fgets is safer than fscanf for reading lines of text because it limits the buffer size.",
        "Always close files with fclose to flush buffers and release OS resources.",
        "Use perror or strerror(errno) to print descriptive error messages on failure."
      ],
      commonMistakes: [
        "Not checking the return value of fopen for NULL — if the file can't be opened, all subsequent operations crash.",
        "Opening a file in 'w' mode when you want to append — 'w' silently deletes the existing content.",
        "Forgetting to call fclose — buffered data may never reach disk, causing data loss.",
        "Using fscanf to read lines with spaces — it stops at whitespace; use fgets instead.",
        "Not accounting for the newline character that fgets includes at the end of the buffer."
      ],
      bestPractices: [
        "Always check fopen's return value and handle the NULL case with a meaningful error message.",
        "Prefer fgets over fscanf for reading text lines to avoid buffer overflows and whitespace issues.",
        "Close files as soon as you are done with them, especially in long-running programs.",
        "Use 'rb' and 'wb' modes when reading or writing binary data to avoid newline translation issues on Windows.",
        "Structure file I/O code so that even error paths reach fclose before returning."
      ],
      exercises: [
        {
          title: "Exercise 1 – Write and Read a Config File",
          description: "Write a program that creates a file called 'config.txt', writes three key=value pairs (like 'width=800'), then reads the file back and prints each line.",
          hint: "Open with 'w' to write, then close and reopen with 'r' to read. Use fgets to read lines safely."
        },
        {
          title: "Exercise 2 – Line Counter",
          description: "Write a program that opens a text file whose name is hard-coded, reads it line by line with fgets, counts the total number of lines, and prints the count.",
          hint: "Increment a counter inside the while(fgets(...)) loop. Each successful fgets call corresponds to one line."
        },
        {
          title: "Exercise 3 – Number File",
          description: "Write a program that writes the integers 1 through 10, one per line, to a file called 'numbers.txt'. Then reopen it and read back each integer with fscanf, printing the sum.",
          hint: "Use fprintf to write each number. When reading, fscanf returns the number of items matched; loop while it returns 1."
        }
      ],
      challenge: {
        title: "Challenge – CSV Logger",
        description: "Write a program that appends a log entry to 'log.csv' each time it runs. Each entry should contain a sequential run number (read from and update a counter file), a hardcoded username, and a message passed as a command-line argument. After appending, read the entire CSV file and print it.",
        hint: "Use one file to track the run count (read an int with fscanf, increment it, write it back). Use 'a' mode for the CSV so previous entries are preserved."
      },
      quiz: [
        {
          question: "What does fopen return if it fails to open the file?",
          options: ["0", "NULL", "-1", "An empty FILE struct"],
          correctIndex: 1,
          explanation: "fopen returns NULL on failure, so you must always check the returned FILE pointer before using it."
        },
        {
          question: "Which mode string opens a file for writing and deletes its existing contents?",
          options: ["r", "a", "w", "r+"],
          correctIndex: 2,
          explanation: "'w' opens a file for writing; if the file exists, its contents are truncated to zero length."
        },
        {
          question: "Which function is safest for reading a line of text from a file?",
          options: ["fscanf", "fgetc", "fgets", "scanf"],
          correctIndex: 2,
          explanation: "fgets reads at most n-1 characters including the newline, preventing buffer overflow unlike fscanf."
        },
        {
          question: "What does fclose do?",
          options: [
            "Deletes the file",
            "Flushes buffers and releases OS resources for the FILE",
            "Rewinds the file to the beginning",
            "Opens a closed file"
          ],
          correctIndex: 1,
          explanation: "fclose flushes any pending buffered output, closes the file descriptor, and frees the FILE structure."
        },
        {
          question: "Which header provides FILE, fopen, fclose, fprintf, and fgets?",
          options: ["<stdlib.h>", "<string.h>", "<stdio.h>", "<fcntl.h>"],
          correctIndex: 2,
          explanation: "All standard C file I/O functions and the FILE type are declared in <stdio.h>."
        },
        {
          question: "What mode should you use to add data to the end of an existing file without deleting it?",
          options: ["w", "r", "a", "w+"],
          correctIndex: 2,
          explanation: "'a' (append) positions the write pointer at the end of the file, preserving existing content."
        },
        {
          question: "Which function writes formatted output to a file?",
          options: ["printf", "sprintf", "fprintf", "fwrite"],
          correctIndex: 2,
          explanation: "fprintf is the file-output equivalent of printf; its first argument is the FILE pointer to write to."
        },
        {
          question: "What does feof(fp) return?",
          options: [
            "The current file position",
            "Non-zero when the end-of-file indicator is set",
            "Zero when reading is complete",
            "The number of bytes remaining"
          ],
          correctIndex: 1,
          explanation: "feof returns a non-zero value when the stream's end-of-file indicator has been set after a read attempt."
        },
        {
          question: "What does perror('msg') do?",
          options: [
            "Prints 'msg' and exits",
            "Prints 'msg: error description' to stderr based on errno",
            "Prints the file pointer address",
            "Resets errno to zero"
          ],
          correctIndex: 1,
          explanation: "perror prints the provided string followed by a colon and the system error message corresponding to the current errno value."
        },
        {
          question: "How do you read a single character from a file?",
          options: ["fgets(fp)", "fscanf(fp, '%s')", "fgetc(fp)", "getchar(fp)"],
          correctIndex: 2,
          explanation: "fgetc(fp) reads and returns the next character from the file stream as an unsigned char cast to int."
        },
        {
          question: "Which mode opens a file for both reading and writing without truncating it?",
          options: ["w", "a+", "r+", "w+"],
          correctIndex: 2,
          explanation: "'r+' opens an existing file for both reading and writing without truncating it; the file must already exist."
        },
        {
          question: "What is wrong with opening a file with 'w' when you intended to preserve its content?",
          options: [
            "Nothing, 'w' appends automatically",
            "'w' truncates the file to zero length, erasing all existing data",
            "'w' is read-only",
            "'w' creates a new file with a different name"
          ],
          correctIndex: 1,
          explanation: "'w' always creates a fresh empty file, destroying any previous content — use 'a' to append instead."
        },
        {
          question: "What value does fgets return at end-of-file or on error?",
          options: ["0", "EOF", "NULL", "An empty string"],
          correctIndex: 2,
          explanation: "fgets returns NULL when no more characters can be read due to end-of-file or an error condition."
        },
        {
          question: "fwrite(buf, size, count, fp) writes how many bytes in total?",
          options: ["size", "count", "size + count", "size * count"],
          correctIndex: 3,
          explanation: "fwrite writes 'count' elements each of 'size' bytes, so the total bytes written is size * count."
        },
        {
          question: "What is the difference between 'w' and 'wb' mode?",
          options: [
            "No difference on any platform",
            "'wb' opens for writing binary data, skipping newline translation",
            "'wb' is write-only while 'w' allows reading too",
            "'wb' writes wide characters"
          ],
          correctIndex: 1,
          explanation: "On some platforms (notably Windows), 'w' translates newlines. 'wb' disables this, writing raw bytes."
        },
        {
          question: "Which is the correct way to check for a file open error?",
          options: [
            "if (fp == 0)",
            "if (fp == NULL)",
            "if (fp < 0)",
            "if (ferror(fp))"
          ],
          correctIndex: 1,
          explanation: "fopen returns the NULL pointer on failure. Comparing with NULL is the correct portable check."
        },
        {
          question: "What does rewind(fp) do?",
          options: [
            "Closes and reopens the file",
            "Moves the file position to the very beginning",
            "Flushes the write buffer",
            "Reads the file backwards"
          ],
          correctIndex: 1,
          explanation: "rewind(fp) sets the file position indicator to the start of the file and clears the error indicator."
        },
        {
          question: "If you forget fclose after writing, what may happen?",
          options: [
            "The program crashes immediately",
            "Buffered data may never be written to disk, causing data loss",
            "The file is automatically saved every second",
            "The file is deleted"
          ],
          correctIndex: 1,
          explanation: "C uses buffered I/O; without fclose, the output buffer may not be flushed, so data can be lost."
        },
        {
          question: "Which function reads formatted data from a file?",
          options: ["scanf", "sscanf", "fscanf", "fread"],
          correctIndex: 2,
          explanation: "fscanf reads formatted input from a FILE stream, analogous to how scanf reads from stdin."
        },
        {
          question: "What does the 'a+' mode allow that 'a' alone does not?",
          options: [
            "Deleting lines from the file",
            "Both reading and appending",
            "Overwriting existing content",
            "Opening binary files"
          ],
          correctIndex: 1,
          explanation: "'a+' opens the file for both reading and appending; 'a' alone only supports writing at the end."
        }
      ]
    },
    {
      id: "topic-5-3",
      title: "Command-Line Arguments",
      estimatedReadingTime: 8,
      explanation: `Every time you run a program from a terminal, you can pass extra information to it directly on the command line — these are called command-line arguments. You have already seen this in action: when you type "gcc hello.c -o hello", the strings "hello.c", "-o", and "hello" are all command-line arguments passed to the gcc program. C gives you a simple and elegant way to receive these arguments inside your own programs.

When you write your main function to accept two special parameters — conventionally named argc and argv — the operating system fills them in for you before your program starts. The name argc stands for "argument count" and holds the total number of arguments including the program's own name. The name argv stands for "argument vector" and is an array of pointers to strings (char **argv or equivalently char *argv[]), where each element is one argument.

The first element, argv[0], is always the name of the program itself (or the path used to launch it). Actual user-provided arguments begin at argv[1]. So if a user runs "./calculator 10 + 5", then argc is 4, argv[0] is "./calculator", argv[1] is "10", argv[2] is "+", and argv[3] is "5". Note that all arguments arrive as strings; if you need a number, you must convert it using atoi (for integers) or atof (for floating-point values) from <stdlib.h>.

A useful convention is to check argc early in main to make sure the user provided the expected number of arguments, and to print a usage message and exit if they did not. For example, "Usage: ./program filename" is a friendly message that tells the user how to run the program correctly. This makes your programs much more user-friendly and prevents crashes from missing arguments.

For programs that accept many options (like -v for verbose, -o for output file), the standard library provides getopt, and third-party libraries like argp or argtable offer more advanced argument parsing. However, for most student-level programs, manually examining argv is sufficient and teaches the fundamentals clearly.`,
      codeExample: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
    /* Print all received arguments */
    printf("Program name: %s\\n", argv[0]);
    printf("Argument count (argc): %d\\n", argc);

    if (argc < 2) {
        printf("Usage: %s <number1> <number2>\\n", argv[0]);
        printf("Example: %s 7 3\\n", argv[0]);
        return 1;
    }

    /* Demonstrate checking a flag */
    if (strcmp(argv[1], "--help") == 0) {
        printf("This program adds two numbers.\\n");
        printf("Usage: %s <number1> <number2>\\n", argv[0]);
        return 0;
    }

    if (argc != 3) {
        fprintf(stderr, "Error: exactly two numbers required.\\n");
        return 1;
    }

    /* Convert string arguments to integers */
    int a = atoi(argv[1]);
    int b = atoi(argv[2]);

    printf("%d + %d = %d\\n", a, b, a + b);
    printf("%d - %d = %d\\n", a, b, a - b);
    printf("%d * %d = %d\\n", a, b, a * b);

    if (b != 0) {
        printf("%d / %d = %.2f\\n", a, b, (double)a / b);
    } else {
        printf("Division by zero is undefined.\\n");
    }

    return 0;
}`,
      expectedOutput: `Program name: ./calc
Argument count (argc): 3
7 + 3 = 10
7 - 3 = 4
7 * 3 = 21
7 / 3 = 2.33`,
      keyTakeaways: [
        "argc holds the total argument count including the program name; user arguments start at index 1.",
        "argv is an array of C strings; argv[0] is the program name and argv[1] onwards are user arguments.",
        "All command-line arguments arrive as strings; use atoi or atof to convert them to numbers.",
        "Always validate argc before accessing argv elements to avoid out-of-bounds access.",
        "Print a usage message and return a non-zero exit code when arguments are missing or wrong."
      ],
      commonMistakes: [
        "Accessing argv[1] without checking argc first — if the user gave no arguments, argv[1] is out of bounds.",
        "Forgetting that argv[0] is the program name — user data starts at argv[1], not argv[0].",
        "Treating argv strings as integers directly — you must convert with atoi or strtol first.",
        "Not printing a usage message when arguments are wrong — makes the program hard to use.",
        "Using atoi on a non-numeric string — atoi returns 0, which may silently produce wrong results; prefer strtol for robust parsing."
      ],
      bestPractices: [
        "Always check argc before accessing any argv element beyond argv[0].",
        "Print a clear usage message to stderr when the user provides wrong arguments.",
        "Use strtol instead of atoi for numeric arguments to detect invalid input via the endptr and errno.",
        "Support a --help flag that prints usage information and exits with code 0.",
        "Return 0 from main on success and a non-zero value on error for scripting compatibility."
      ],
      exercises: [
        {
          title: "Exercise 1 – Greeting Program",
          description: "Write a program that takes a name as a command-line argument and prints 'Hello, <name>!'. If no argument is given, print a usage message.",
          hint: "Check argc == 2 before using argv[1]. Print to stderr for error messages."
        },
        {
          title: "Exercise 2 – Argument Echo",
          description: "Write a program that prints each command-line argument on its own line, preceded by its index number. For example: '1: hello', '2: world'.",
          hint: "Loop from i = 1 to i < argc, printing i and argv[i] each iteration."
        },
        {
          title: "Exercise 3 – Sum of Numbers",
          description: "Write a program that accepts any number of integer arguments and prints their sum. If no numbers are given, print 0.",
          hint: "Loop through argv[1] to argv[argc-1], converting each with atoi and accumulating into a sum variable."
        }
      ],
      challenge: {
        title: "Challenge – Mini Calculator",
        description: "Write a command-line calculator that takes exactly three arguments: a number, an operator (+, -, *, /), and another number. Print the result. Handle division by zero, invalid operators, and wrong argument counts gracefully with meaningful error messages.",
        hint: "Use strcmp to compare the operator string. Cast to double before division. Return non-zero on any error."
      },
      quiz: [
        {
          question: "What does argc represent in main(int argc, char *argv[])?",
          options: [
            "The size of each argument in bytes",
            "The number of command-line arguments including the program name",
            "The index of the last argument",
            "The number of flags passed"
          ],
          correctIndex: 1,
          explanation: "argc (argument count) is the total number of strings in argv, counting argv[0] (the program name) as the first."
        },
        {
          question: "What is stored in argv[0]?",
          options: [
            "The first user-supplied argument",
            "The program name or path",
            "The number of arguments",
            "NULL"
          ],
          correctIndex: 1,
          explanation: "argv[0] always holds the name or path used to invoke the program, not a user-supplied argument."
        },
        {
          question: "If a user runs './prog hello world', what is argc?",
          options: ["1", "2", "3", "4"],
          correctIndex: 2,
          explanation: "argc counts argv[0] ('./prog'), argv[1] ('hello'), and argv[2] ('world'), giving a total of 3."
        },
        {
          question: "Command-line arguments in argv are of what type?",
          options: ["int", "float", "char * (C strings)", "double"],
          correctIndex: 2,
          explanation: "All command-line arguments are passed as null-terminated C strings (char *), even if they look like numbers."
        },
        {
          question: "Which function converts a command-line string argument to an integer?",
          options: ["itoa", "atoi", "strtod", "scanf"],
          correctIndex: 1,
          explanation: "atoi (ASCII to integer) converts a string like '42' to the integer value 42. It is declared in <stdlib.h>."
        },
        {
          question: "What is wrong with accessing argv[1] without checking argc first?",
          options: [
            "argv[1] is always the program name",
            "If no arguments were given, argv[1] is out of bounds and undefined",
            "argv[1] requires a cast to char *",
            "Nothing is wrong"
          ],
          correctIndex: 1,
          explanation: "If the user provided no arguments, argc is 1 and argv[1] does not exist; accessing it is undefined behaviour."
        },
        {
          question: "What is the last element of the argv array?",
          options: ["argv[argc]", "argv[argc-1]", "NULL", "argv[argc] which equals NULL"],
          correctIndex: 3,
          explanation: "By C standard, argv[argc] is guaranteed to be NULL, providing a sentinel for loops over argv."
        },
        {
          question: "Which function provides more robust string-to-integer conversion than atoi?",
          options: ["itoa", "strtol", "sprintf", "sscanf"],
          correctIndex: 1,
          explanation: "strtol lets you detect invalid input via an endptr and errno, unlike atoi which silently returns 0 on error."
        },
        {
          question: "What should a well-written program print to stderr when wrong arguments are given?",
          options: [
            "Nothing",
            "A random error code",
            "A usage message explaining the correct invocation",
            "All environment variables"
          ],
          correctIndex: 2,
          explanation: "A usage message (e.g., 'Usage: prog <file>') printed to stderr helps users understand how to run the program correctly."
        },
        {
          question: "What exit code should main return on success?",
          options: ["1", "-1", "0", "255"],
          correctIndex: 2,
          explanation: "By convention, a return value of 0 from main signals success; non-zero values indicate errors to the shell."
        },
        {
          question: "How would you convert argv[1] to a double?",
          options: ["(double)argv[1]", "atof(argv[1])", "atoi(argv[1])", "scanf(argv[1])"],
          correctIndex: 1,
          explanation: "atof (ASCII to float/double) converts a string like '3.14' to the double value 3.14, declared in <stdlib.h>."
        },
        {
          question: "If argc == 1, what does that mean?",
          options: [
            "One user argument was provided",
            "No user arguments were provided; only the program name is in argv",
            "The program name is missing",
            "argc starts at 0"
          ],
          correctIndex: 1,
          explanation: "argc of 1 means argv has only one element: argv[0], the program name. No additional arguments were passed."
        },
        {
          question: "Which declaration of main correctly accepts command-line arguments?",
          options: [
            "int main(void)",
            "int main(int argc, char *argv[])",
            "void main(int n, char *args)",
            "int main(char **args)"
          ],
          correctIndex: 1,
          explanation: "The standard signature is int main(int argc, char *argv[]) or equivalently int main(int argc, char **argv)."
        },
        {
          question: "What does atoi('abc') return?",
          options: ["A compile error", "97 (ASCII value of 'a')", "0", "Undefined behaviour"],
          correctIndex: 2,
          explanation: "atoi returns 0 when the string does not start with a valid integer representation, which is why strtol is preferred for robust code."
        },
        {
          question: "How do you check if argv[1] equals the string '--help'?",
          options: [
            "argv[1] == '--help'",
            "argv[1] = '--help'",
            "strcmp(argv[1], '--help') == 0",
            "argv[1].equals('--help')"
          ],
          correctIndex: 2,
          explanation: "Strings in C cannot be compared with ==; use strcmp which returns 0 when the strings are identical."
        },
        {
          question: "What is char **argv equivalent to in a function parameter?",
          options: ["char argv[]", "char *argv[]", "char argv[][]", "void *argv"],
          correctIndex: 1,
          explanation: "char **argv and char *argv[] are equivalent in a function parameter: both declare a pointer to pointers to char."
        },
        {
          question: "To print a usage error message, you should write to:",
          options: ["stdout via printf", "stderr via fprintf(stderr, ...)", "A file called error.txt", "argv[0]"],
          correctIndex: 1,
          explanation: "Error and diagnostic messages should go to stderr so they are separate from normal output and visible even when stdout is redirected."
        },
        {
          question: "If you run './prog 5 3', what is argv[2]?",
          options: ["5", "3", "2", "./prog"],
          correctIndex: 1,
          explanation: "argv[0] is './prog', argv[1] is '5', and argv[2] is '3' — each command-line token is a separate string."
        },
        {
          question: "Which of the following correctly loops over all user-provided arguments?",
          options: [
            "for (int i = 0; i < argc; i++)",
            "for (int i = 1; i < argc; i++)",
            "for (int i = 0; i <= argc; i++)",
            "for (int i = 1; i <= argc; i++)"
          ],
          correctIndex: 1,
          explanation: "Starting at i=1 skips argv[0] (the program name) and loops through all user-provided arguments up to argv[argc-1]."
        },
        {
          question: "Why is it good practice to return a non-zero value from main on error?",
          options: [
            "It causes the OS to automatically retry the program",
            "Shell scripts can detect program failure using the exit code",
            "It frees all allocated memory",
            "It prints an error message automatically"
          ],
          correctIndex: 1,
          explanation: "Shell scripts and other programs check a process's exit code; returning non-zero signals failure and enables error handling in scripts."
        }
      ]
    },
    {
      id: "topic-5-4",
      title: "Function Pointers",
      estimatedReadingTime: 10,
      explanation: `In C, functions are stored in memory just like data. Every function has an address — the location of its first instruction. A function pointer is a variable that holds such an address, allowing you to store, pass, and call functions indirectly. This is one of the most powerful and flexible features of the C language.

The syntax for function pointers can look intimidating at first. If you have a function "int add(int a, int b)", the type of a pointer to it is "int (*)(int, int)". To declare a variable called op of this type, you write "int (*op)(int, int);". The parentheses around *op are essential — without them, "int *op(int, int)" would declare a function that returns int *, which is entirely different. Once declared, you can assign the function's address to op with "op = add;" and call it with "op(3, 4);" which behaves exactly like "add(3, 4);".

One of the most common and practical uses of function pointers is passing a function as an argument to another function. The standard library's qsort function is a perfect example: it takes a function pointer to a comparison function, which lets you sort any type of data using any ordering you choose. Similarly, you can write a function "void apply(int *arr, int n, int (*transform)(int))" that applies any transformation — double, square, negate — to each element of an array.

typedef can dramatically improve function pointer readability. Instead of repeating "int (*)(int, int)" everywhere, you can write "typedef int (*BinaryOp)(int, int);" and then use "BinaryOp op = add;" wherever you need a pointer to a binary integer function. This is especially valuable when working with tables of function pointers, which are a common technique for implementing menus, command dispatch tables, or state machines.

Function pointers are the foundation of callback-based design: you register a function to be called later when some event occurs. This pattern is central to event-driven programming and is the mechanism behind things like signal handlers in C. Understanding function pointers also prepares you for understanding object-oriented patterns like virtual function tables (vtables) used in C++.`,
      codeExample: `#include <stdio.h>
#include <stdlib.h>

/* Simple arithmetic functions */
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }

/* A function that takes a function pointer as a parameter */
void apply_and_print(int x, int y, int (*op)(int, int), const char *name) {
    printf("%s(%d, %d) = %d\\n", name, x, y, op(x, y));
}

/* Transformation functions for use with map */
int double_it(int n) { return n * 2; }
int square_it(int n) { return n * n; }

/* A map function: applies a function to every element */
void map(int *arr, int len, int (*transform)(int)) {
    for (int i = 0; i < len; i++) {
        arr[i] = transform(arr[i]);
    }
}

/* typedef for a binary operation */
typedef int (*BinaryOp)(int, int);

int main(void) {
    /* Calling via function pointer */
    int (*op)(int, int) = add;
    printf("Direct pointer call: %d\\n", op(10, 3));

    /* Passing function pointers as arguments */
    apply_and_print(10, 3, add, "add");
    apply_and_print(10, 3, subtract, "subtract");
    apply_and_print(10, 3, multiply, "multiply");

    /* Array of function pointers */
    BinaryOp ops[] = { add, subtract, multiply };
    const char *names[] = { "add", "subtract", "multiply" };
    printf("\\nDispatch table:\\n");
    for (int i = 0; i < 3; i++) {
        printf("  %s(6, 2) = %d\\n", names[i], ops[i](6, 2));
    }

    /* Using map with different transformations */
    int data[] = { 1, 2, 3, 4, 5 };
    int len = 5;
    map(data, len, double_it);
    printf("\\nAfter doubling: ");
    for (int i = 0; i < len; i++) printf("%d ", data[i]);
    printf("\\n");

    return 0;
}`,
      expectedOutput: `Direct pointer call: 13
add(10, 3) = 13
subtract(10, 3) = 7
multiply(10, 3) = 30

Dispatch table:
  add(6, 2) = 8
  subtract(6, 2) = 4
  multiply(6, 2) = 12

After doubling: 2 4 6 8 10`,
      keyTakeaways: [
        "A function pointer holds the memory address of a function and can be used to call it indirectly.",
        "The declaration syntax is: returnType (*pointerName)(paramTypes); — parentheses around *name are essential.",
        "Function pointers enable passing behaviour (functions) as arguments to other functions.",
        "typedef can simplify complex function pointer types, making code more readable.",
        "Arrays of function pointers create dispatch tables for implementing menus and state machines.",
        "Callbacks — functions registered to be called later — are built on function pointers."
      ],
      commonMistakes: [
        "Omitting the parentheses: 'int *fp(int)' declares a function returning int *, not a function pointer.",
        "Calling a NULL function pointer — always initialise or check function pointers before calling them.",
        "Mismatching the parameter types: assigning a function with a different signature causes undefined behaviour.",
        "Forgetting to #include the header that declares the function before using its address.",
        "Confusing 'fp = func' (storing the address) with 'fp = func()' (calling the function and storing its return value)."
      ],
      bestPractices: [
        "Use typedef to create readable names for complex function pointer types.",
        "Always initialise function pointer variables to NULL if not immediately assigned.",
        "Check that a function pointer is not NULL before calling it.",
        "Keep function signatures consistent when building arrays or tables of function pointers.",
        "Document the expected signature and behaviour of callback function pointers in comments."
      ],
      exercises: [
        {
          title: "Exercise 1 – Calculator with Function Pointer",
          description: "Write four functions: add, subtract, multiply, and divide (returning double). Ask the user for two numbers and an operator character (+,-,*,/). Use an if-else chain to set a function pointer, then call it to print the result.",
          hint: "Declare the pointer as 'double (*op)(double, double);' and assign it based on the operator character."
        },
        {
          title: "Exercise 2 – Apply Transformation",
          description: "Write a function 'void transform(int *arr, int n, int (*f)(int))' that applies f to every element. Write two functions: negate (returns -x) and absolute_val (returns x if x>=0 else -x). Test both on an array.",
          hint: "Call f(arr[i]) and assign the result back to arr[i] inside the loop."
        },
        {
          title: "Exercise 3 – Comparison Callback",
          description: "Write two comparison functions compatible with qsort: one that sorts integers ascending and one descending. Use qsort from <stdlib.h> to sort an integer array both ways and print the results.",
          hint: "A qsort comparator takes two const void * arguments; cast them to const int * and subtract or compare to determine order."
        }
      ],
      challenge: {
        title: "Challenge – Command Dispatch Table",
        description: "Build a mini command interpreter. Define at least four commands (help, quit, greet, version) as functions with signature 'void cmd(void)'. Store them in a struct array alongside their names. In a loop, read a command name from stdin and search the table for a matching function; call it if found, or print 'Unknown command' if not.",
        hint: "Typedef the function pointer type as 'typedef void (*Command)(void)'. Use strcmp to match command names in the table."
      },
      quiz: [
        {
          question: "What does a function pointer store?",
          options: [
            "The return value of the function",
            "The memory address of a function",
            "The source code of the function",
            "The number of parameters"
          ],
          correctIndex: 1,
          explanation: "A function pointer holds the address (in memory) of the function's first instruction, allowing indirect calls."
        },
        {
          question: "Which declaration correctly creates a function pointer named fp pointing to a function that takes an int and returns int?",
          options: [
            "int fp(int);",
            "int *fp(int);",
            "int (*fp)(int);",
            "(*int)fp(int);"
          ],
          correctIndex: 2,
          explanation: "int (*fp)(int) is correct. The parentheses around *fp are essential; without them it would declare a function returning int *."
        },
        {
          question: "How do you assign the function 'double square(double x)' to a function pointer named f?",
          options: [
            "f = &square();",
            "f = square;",
            "f = *square;",
            "f = square();"
          ],
          correctIndex: 1,
          explanation: "In C, using a function name without parentheses yields its address. 'f = square;' and 'f = &square;' are both valid and equivalent."
        },
        {
          question: "What happens if you call a NULL function pointer?",
          options: [
            "It calls the default function",
            "It silently does nothing",
            "It causes undefined behaviour (typically a crash)",
            "It returns zero"
          ],
          correctIndex: 2,
          explanation: "Calling through a NULL pointer is undefined behaviour; on most systems it immediately causes a segmentation fault."
        },
        {
          question: "What is a callback in C?",
          options: [
            "Calling main again from a function",
            "A function whose address is passed to another function to be called later",
            "Returning a value from a function",
            "A special keyword in C"
          ],
          correctIndex: 1,
          explanation: "A callback is a function you provide (via pointer) to another function, which calls it at the appropriate time."
        },
        {
          question: "What is the purpose of typedef with function pointers?",
          options: [
            "To make the function run faster",
            "To create a readable alias for a complex function pointer type",
            "To declare the function as inline",
            "To allow the function to accept any argument type"
          ],
          correctIndex: 1,
          explanation: "typedef creates a named alias so you can write 'BinaryOp op;' instead of 'int (*op)(int, int);' everywhere."
        },
        {
          question: "Which standard library function uses a function pointer for custom sorting?",
          options: ["sort()", "qsort()", "bsearch()", "memcmp()"],
          correctIndex: 1,
          explanation: "qsort takes a comparator function pointer, allowing you to sort any array of any type with any ordering."
        },
        {
          question: "An array of function pointers is useful for implementing what pattern?",
          options: [
            "A linked list",
            "A binary tree",
            "A dispatch table or command table",
            "A hash map"
          ],
          correctIndex: 2,
          explanation: "An array of function pointers acts as a dispatch table: index or search the array to select and call the right function."
        },
        {
          question: "What is wrong with: int *fp(int x) if you wanted a function pointer?",
          options: [
            "Nothing, it is a valid function pointer",
            "It declares a function named fp that returns int *, not a pointer to a function",
            "The parameter type is wrong",
            "You cannot use int * in a declaration"
          ],
          correctIndex: 1,
          explanation: "Without parentheses around *fp, C parses it as a function declaration returning int *, not a function pointer variable."
        },
        {
          question: "Given: typedef void (*Handler)(int); — which of the following declares a Handler variable named h?",
          options: ["void h(int);", "Handler h;", "void (*h)(int) = Handler;", "Handler *h;"],
          correctIndex: 1,
          explanation: "After the typedef, 'Handler h;' declares h as a variable of type 'pointer to function taking int returning void'."
        },
        {
          question: "Can function pointers be stored in an array?",
          options: [
            "No, only data pointers can be stored in arrays",
            "Yes, as long as all pointers in the array share the same function signature",
            "Yes, but only in a linked list",
            "No, arrays only hold integers and floats"
          ],
          correctIndex: 1,
          explanation: "An array of function pointers is valid and very useful, but all elements must point to functions with the same signature."
        },
        {
          question: "Which of the following is a valid call through a function pointer named compute?",
          options: [
            "call compute(3, 4);",
            "(*compute)(3, 4); or compute(3, 4);",
            "compute -> (3, 4);",
            "invoke(compute, 3, 4);"
          ],
          correctIndex: 1,
          explanation: "Both (*compute)(3, 4) and compute(3, 4) are valid and equivalent syntaxes for calling through a function pointer."
        },
        {
          question: "What must match between a function pointer and the function it points to?",
          options: [
            "Only the return type",
            "Only the parameter types",
            "Both return type and parameter types (the full signature)",
            "Only the function name"
          ],
          correctIndex: 2,
          explanation: "The full signature — return type and all parameter types — must match for the assignment to be valid and safe."
        },
        {
          question: "Function pointers are the C foundation for what concept used in C++?",
          options: ["Templates", "References", "Virtual function tables (vtables)", "Namespaces"],
          correctIndex: 2,
          explanation: "C++ virtual dispatch is implemented under the hood using vtables, which are arrays of function pointers."
        },
        {
          question: "What is the result of assigning 'fp = func();' when func returns an int and fp is int (*)(void)?",
          options: [
            "fp now points to func",
            "fp stores the integer return value, which is a type error",
            "fp is set to NULL",
            "func is called and its address stored in fp"
          ],
          correctIndex: 1,
          explanation: "'func()' calls the function and produces an int; you cannot assign an int to a function pointer. This is a type mismatch."
        },
        {
          question: "Which is the correct way to pass a function pointer to another function?",
          options: [
            "void run(int func(int));",
            "void run(int (*callback)(int));",
            "void run(func *callback);",
            "void run(&callback);"
          ],
          correctIndex: 1,
          explanation: "void run(int (*callback)(int)) declares a parameter that is a pointer to a function taking int and returning int."
        },
        {
          question: "A signal handler in C is registered using which function?",
          options: ["register()", "signal()", "sigaction()", "Both signal() and sigaction()"],
          correctIndex: 3,
          explanation: "Both signal() and sigaction() accept a function pointer to the handler; sigaction is preferred for more control."
        },
        {
          question: "What is printed by: int (*fp)(int,int) = add; printf(\"%d\", fp(2,3)); if add returns a+b?",
          options: ["2", "3", "5", "A compile error"],
          correctIndex: 2,
          explanation: "fp points to add, so fp(2,3) calls add(2,3) which returns 2+3=5."
        },
        {
          question: "Why should you check a function pointer for NULL before calling it?",
          options: [
            "NULL function pointers return a special value",
            "Calling through NULL is undefined and crashes on most systems",
            "NULL pointers are automatically redirected to main",
            "NULL function pointers are always valid in C"
          ],
          correctIndex: 1,
          explanation: "Calling through a NULL function pointer is undefined behaviour, typically causing an immediate crash (SIGSEGV)."
        },
        {
          question: "Which comparison is used to find a function in a string-keyed dispatch table?",
          options: ["==", "strcmp", "memcmp", "strncpy"],
          correctIndex: 1,
          explanation: "strcmp compares two C strings for equality (returns 0 if equal), suitable for matching command names in a dispatch table."
        }
      ]
    },
    {
      id: "topic-5-5",
      title: "typedef and Type Abstraction",
      estimatedReadingTime: 7,
      explanation: `As your C programs grow, working with raw type names can become clunky and repetitive. The typedef keyword solves this by letting you create your own type aliases — new names for existing types that you can use throughout your code just like the built-in types. This is not creating a new type at the hardware level; it is creating a more meaningful name for an existing one.

The simplest use of typedef is renaming primitive types for clarity or portability. For example, embedded systems programmers often write "typedef unsigned char uint8_t;" to make it crystal clear that a variable holds an 8-bit unsigned integer. In fact, the standard header <stdint.h> provides exactly this: types like uint8_t, uint16_t, int32_t, and uint64_t that give precise control over integer sizes, which matters enormously when writing code that must work correctly on both 32-bit and 64-bit systems.

typedef is especially useful with structs. Without typedef, every time you use a struct you must write "struct Point p;". With typedef, you can write "typedef struct { int x; int y; } Point;" and then use "Point p;" everywhere — much cleaner. You can also define the struct and the typedef separately, which is necessary when the struct refers to itself (as in a linked list node that contains a pointer to the next node of the same type).

For function pointers, typedef is almost essential in real code. Comparing "int (*)(int, int)" written everywhere versus a typedef alias "BinaryOp" makes the code dramatically more readable and maintainable. When you refactor the function signature, you only update the typedef in one place.

Type abstraction through typedef is a key technique for writing code that is maintainable and portable. It separates the interface (the type name others use) from the implementation (the actual underlying type). If you later need to change a size_t from int to long, you change one typedef and the rest of the code adapts automatically. This makes typedef an important tool for writing professional, production-quality C.`,
      codeExample: `#include <stdio.h>
#include <stdint.h>

/* typedef for primitive types — clear size semantics */
typedef unsigned int uint;
typedef double Celsius;
typedef double Fahrenheit;

/* typedef for a struct — clean usage without 'struct' keyword */
typedef struct {
    int x;
    int y;
} Point;

/* typedef for a struct that refers to itself (forward declaration needed) */
typedef struct Node Node;
struct Node {
    int value;
    Node *next;   /* pointer to the same struct type */
};

/* typedef for a function pointer */
typedef double (*Converter)(double);

/* Conversion functions */
Fahrenheit celsius_to_fahrenheit(Celsius c) {
    return c * 9.0 / 5.0 + 32.0;
}

Celsius fahrenheit_to_celsius(Fahrenheit f) {
    return (f - 32.0) * 5.0 / 9.0;
}

void convert_and_print(double value, Converter fn, const char *direction) {
    printf("%s: %.2f -> %.2f\\n", direction, value, fn(value));
}

int main(void) {
    /* Using typedef aliases */
    uint age = 25;
    printf("Age: %u\\n", age);

    Point p1 = {3, 4};
    printf("Point: (%d, %d)\\n", p1.x, p1.y);

    /* Fixed-width types from <stdint.h> */
    uint8_t  small = 255;
    uint32_t big   = 4000000000U;
    printf("uint8_t: %u, uint32_t: %u\\n", small, big);

    /* Function pointer typedef */
    convert_and_print(100.0, celsius_to_fahrenheit, "C->F");
    convert_and_print(212.0, fahrenheit_to_celsius, "F->C");

    /* Simple linked list using typedef'd Node */
    Node n3 = {30, NULL};
    Node n2 = {20, &n3};
    Node n1 = {10, &n2};
    Node *curr = &n1;
    printf("List: ");
    while (curr != NULL) {
        printf("%d ", curr->value);
        curr = curr->next;
    }
    printf("\\n");

    return 0;
}`,
      expectedOutput: `Age: 25
Point: (3, 4)
uint8_t: 255, uint32_t: 4000000000
C->F: 100.00 -> 212.00
F->C: 212.00 -> 100.00
List: 10 20 30`,
      keyTakeaways: [
        "typedef creates an alias for an existing type, improving readability and maintainability.",
        "typedef with structs lets you use 'TypeName var;' instead of 'struct TypeName var;'.",
        "Fixed-width integer types like uint8_t and int32_t from <stdint.h> ensure portability.",
        "typedef dramatically simplifies function pointer declarations and parameter types.",
        "Changing the underlying type only requires updating the typedef, not every usage site.",
        "typedef does not create a new type; it is purely a name alias recognized by the compiler."
      ],
      commonMistakes: [
        "Confusing typedef with #define — typedef is processed by the compiler and respects scope; #define is a textual substitution by the preprocessor.",
        "Forgetting the semicolon at the end of a typedef statement.",
        "Using a self-referential typedef struct without a forward declaration — the tag name is needed before the typedef is complete.",
        "Assuming typedef creates a new type — it is an alias; operations on the alias are identical to operations on the original type.",
        "Using vague typedef names like 'MyInt' when more descriptive names like 'Pixel' or 'Score' would convey intent."
      ],
      bestPractices: [
        "Use typedef for struct types to eliminate the repetitive 'struct' keyword at every usage site.",
        "Use fixed-width types from <stdint.h> when precise integer sizes matter for portability.",
        "Always use descriptive typedef names that convey the purpose of the type, not just its size.",
        "Place typedef declarations in header files so they can be shared across multiple source files.",
        "Use typedef for function pointer types to keep complex signatures readable and maintainable."
      ],
      exercises: [
        {
          title: "Exercise 1 – Student Record Struct",
          description: "Define a typedef for a struct Student containing a name (char array), age (int), and GPA (double). Create two Student variables, fill them in, and print all their fields.",
          hint: "typedef struct { ... } Student; then use 'Student s1;' to declare instances."
        },
        {
          title: "Exercise 2 – Temperature Converter",
          description: "Use typedef to alias double as Celsius and double as Kelvin. Write a function that converts Celsius to Kelvin (add 273.15). Call it and print the result with appropriate labels.",
          hint: "Both Celsius and Kelvin are aliases for double, so they are interchangeable at the C level — the distinction is documentation for the programmer."
        },
        {
          title: "Exercise 3 – Fixed-Width Integers",
          description: "Write a program that declares variables of types uint8_t, uint16_t, uint32_t, and uint64_t, assigns each its maximum value using the UINT8_MAX etc. macros from <stdint.h>, and prints all four with their sizes using sizeof.",
          hint: "Include <stdint.h> and <inttypes.h>. Use PRIu64 format specifier for portable uint64_t printing."
        }
      ],
      challenge: {
        title: "Challenge – Generic Stack with typedef",
        description: "Define a typedef for a stack node containing an integer value and a next pointer. Implement push and pop functions using dynamic memory allocation. Then write a main that pushes 1-5 onto the stack and pops and prints all five values (demonstrating LIFO order), freeing each node after popping.",
        hint: "Typedef the struct with a forward declaration. push allocates a node with malloc; pop frees it. Maintain a top pointer."
      },
      quiz: [
        {
          question: "What does typedef do in C?",
          options: [
            "Creates a new data type",
            "Creates an alias (new name) for an existing type",
            "Allocates memory for a type",
            "Converts between types at runtime"
          ],
          correctIndex: 1,
          explanation: "typedef creates an alternative name for an existing type; no new type is created at the compiler or hardware level."
        },
        {
          question: "Which header provides fixed-width integer types like uint8_t and int32_t?",
          options: ["<stdlib.h>", "<limits.h>", "<stdint.h>", "<types.h>"],
          correctIndex: 2,
          explanation: "The <stdint.h> header defines exact-width integer types like int8_t, uint16_t, int32_t, and uint64_t."
        },
        {
          question: "After 'typedef unsigned long size_t;', what does 'size_t n = 10;' declare?",
          options: [
            "A variable of a new integer type",
            "A variable of type unsigned long named n",
            "A pointer to unsigned long",
            "A compile error"
          ],
          correctIndex: 1,
          explanation: "typedef merely creates an alias; 'size_t n' is equivalent to 'unsigned long n' after that typedef."
        },
        {
          question: "What is the benefit of typedef with struct?",
          options: [
            "It makes the struct take up less memory",
            "It allows the struct to inherit from another struct",
            "It removes the need to write the 'struct' keyword at every usage",
            "It makes the struct thread-safe"
          ],
          correctIndex: 2,
          explanation: "With a typedef, you write 'Point p;' instead of 'struct Point p;' everywhere, reducing verbosity."
        },
        {
          question: "What is wrong with: typedef struct { int val; Self *next; } Self;?",
          options: [
            "You cannot use int inside a typedef struct",
            "Self is not defined when the pointer 'Self *next' is encountered during parsing",
            "typedef structs cannot have pointers",
            "Nothing is wrong"
          ],
          correctIndex: 1,
          explanation: "The typedef name 'Self' is not in scope until after the closing brace. A forward declaration with a tag is needed."
        },
        {
          question: "Which of the following is a correct self-referential typedef struct?",
          options: [
            "typedef struct { int v; Self *n; } Self;",
            "typedef struct Node { int v; struct Node *n; } Node;",
            "typedef struct Node Node { int v; Node *n; };",
            "struct typedef Node { int v; Node *n; };"
          ],
          correctIndex: 1,
          explanation: "Using a struct tag (Node) allows the self-referential pointer 'struct Node *n;' before the typedef is complete."
        },
        {
          question: "typedef int Score; — which statement is true?",
          options: [
            "Score and int are now incompatible types",
            "Score is a completely new type with its own conversion rules",
            "Score and int are interchangeable; no implicit conversion is needed",
            "Score cannot be used in arithmetic"
          ],
          correctIndex: 2,
          explanation: "typedef does not create a new type; Score and int are the same type, so no conversion is needed between them."
        },
        {
          question: "Where should typedef declarations be placed for use across multiple source files?",
          options: [
            "In a .c implementation file",
            "In the main function body",
            "In a .h header file included by all files that need it",
            "In a separate typedef.c file"
          ],
          correctIndex: 2,
          explanation: "Placing typedef in a header (.h) file allows every .c file that includes it to share the same type alias."
        },
        {
          question: "What advantage does uint32_t have over unsigned int?",
          options: [
            "uint32_t is faster on all platforms",
            "uint32_t guarantees exactly 32 bits regardless of platform",
            "unsigned int is 32 bits on all modern systems anyway",
            "uint32_t uses less memory"
          ],
          correctIndex: 1,
          explanation: "uint32_t guarantees a 32-bit unsigned integer on any platform, while 'unsigned int' size varies by compiler and architecture."
        },
        {
          question: "typedef void (*Callback)(int); — what does Callback name?",
          options: [
            "A void function that takes a Callback argument",
            "A pointer type for functions that take an int and return void",
            "An alias for void",
            "A pointer to a void variable"
          ],
          correctIndex: 1,
          explanation: "This typedef creates the name 'Callback' for the type 'pointer to function taking int and returning void'."
        },
        {
          question: "Which is NOT a good use of typedef?",
          options: [
            "Aliasing a struct to avoid the 'struct' keyword",
            "Giving a meaningful name to a function pointer type",
            "Renaming int to MyInt for no semantic benefit",
            "Using fixed-width types for portability"
          ],
          correctIndex: 2,
          explanation: "Renaming int to MyInt without adding semantic meaning just adds confusion; typedefs should convey purpose, not just rename arbitrarily."
        },
        {
          question: "typedef double Meters; typedef double Seconds; — can you assign a Meters value to a Seconds variable?",
          options: [
            "No, they are distinct types after typedef",
            "Yes, because both are aliases for double",
            "Only with an explicit cast",
            "Only in C99 or later"
          ],
          correctIndex: 1,
          explanation: "Both are aliases for double, so they are identical types; assigning between them compiles without error or cast."
        },
        {
          question: "What is the difference between typedef and #define for type naming?",
          options: [
            "No difference — they are identical",
            "typedef is compiler-level and respects scope; #define is preprocessor textual substitution",
            "#define is safer and more portable",
            "typedef only works for struct types"
          ],
          correctIndex: 1,
          explanation: "typedef is a language construct the compiler understands; #define is textual replacement by the preprocessor with no type safety."
        },
        {
          question: "After 'typedef int Pixel;', which operation is valid?",
          options: [
            "Pixel p = 255; int x = p + 1;",
            "Pixel p = 3.14;",
            "Pixel *arr = malloc(10);",
            "printf('%Pixel', p);"
          ],
          correctIndex: 0,
          explanation: "Since Pixel is an alias for int, arithmetic with int is fully valid. Assigning a double or using a non-existent format specifier is not."
        },
        {
          question: "What does the macro UINT8_MAX from <stdint.h> equal?",
          options: ["127", "255", "65535", "2147483647"],
          correctIndex: 1,
          explanation: "uint8_t is an 8-bit unsigned integer with values 0-255, so UINT8_MAX is 255."
        },
        {
          question: "Why use typedef for a function pointer type rather than writing the type inline?",
          options: [
            "Inline function pointers are not valid C",
            "typedef makes function pointer declarations shorter and more readable",
            "typedef makes the function run faster",
            "Inline function pointers cause memory leaks"
          ],
          correctIndex: 1,
          explanation: "A typedef alias like 'BinaryOp' is far more readable than writing 'int (*)(int, int)' everywhere in function signatures."
        },
        {
          question: "In a large project, changing a typedef's underlying type requires changes in:",
          options: [
            "Every .c file that uses the type",
            "Only the header file where the typedef is defined",
            "The linker configuration",
            "Every function that returns the type"
          ],
          correctIndex: 1,
          explanation: "Because typedef centralizes the type definition, you only change the header; all code using the alias adapts automatically."
        },
        {
          question: "typedef struct { float real; float imag; } Complex; — how do you declare a Complex variable?",
          options: [
            "struct Complex c;",
            "Complex c;",
            "typedef Complex c;",
            "Complex *c = new Complex();"
          ],
          correctIndex: 1,
          explanation: "The typedef makes 'Complex' a complete type name, so you declare variables with just 'Complex c;'."
        },
        {
          question: "Which best describes a typedef in terms of memory?",
          options: [
            "It allocates a new memory region for the type",
            "It has no memory impact; it is purely a compile-time name",
            "It reduces memory usage by sharing storage",
            "It moves the type to the heap"
          ],
          correctIndex: 1,
          explanation: "typedef is entirely a compile-time construct; it creates no code, no data, and has zero runtime cost."
        },
        {
          question: "When must you use a struct tag (like 'struct Node') even with a typedef?",
          options: [
            "Always, for clarity",
            "When the struct contains a pointer to itself",
            "Never; typedef always works without a tag",
            "Only for global structs"
          ],
          correctIndex: 1,
          explanation: "A self-referential struct needs the tag so the pointer member's type is known before the typedef name is established."
        },
        {
          question: "Which header should you include to use PRIu64 for portable uint64_t printf formatting?",
          options: ["<stdint.h>", "<inttypes.h>", "<printf.h>", "<format.h>"],
          correctIndex: 1,
          explanation: "<inttypes.h> defines the PRI* and SCN* format macros like PRIu64 for portable printing of fixed-width integer types."
        }
      ]
    },
    {
      id: "topic-5-6",
      title: "Linked Lists",
      estimatedReadingTime: 13,
      explanation: `Arrays are excellent data structures, but they have one major limitation: once created, their size is fixed. If you need to add more elements than the array can hold, you are stuck. A linked list solves this problem by storing each element in its own separately allocated node, where each node contains the data and a pointer to the next node. Together, these nodes form a chain — the list.

Each node in a singly linked list is typically a struct with two members: the data (an integer, a string, or any other type) and a pointer to the next node. The last node's next pointer is set to NULL, marking the end of the list. You also keep track of a pointer called head, which points to the first node. An empty list is represented by head == NULL.

To add a node at the front of a singly linked list, you allocate a new node with malloc, set its data field, set its next pointer to the current head, and then update head to point to the new node. This is called prepending and takes constant time regardless of how long the list is. Appending to the tail requires traversing the entire list to find the last node, which takes time proportional to the list length. A doubly linked list adds a prev pointer to each node, enabling backward traversal and efficient tail operations.

Deleting a node requires careful pointer manipulation. To remove a node from the middle, you need a pointer to the node just before it, so you can redirect its next pointer around the node being removed, then free the removed node. Forgetting to free the removed node is a classic memory leak. Deleting the head is a special case: update head to head->next before freeing the old head.

Traversing (visiting every node) is straightforward: start with a pointer at head, visit the node, move to next, and repeat until the pointer is NULL. Linked lists are the foundation for many higher-level data structures including stacks, queues, hash table chaining, and adjacency lists for graphs. Understanding them deeply is essential for any serious C programmer.`,
      codeExample: `#include <stdio.h>
#include <stdlib.h>

/* Define the node type */
typedef struct Node {
    int value;
    struct Node *next;
} Node;

/* Create a new node on the heap */
Node *create_node(int value) {
    Node *n = (Node *)malloc(sizeof(Node));
    if (n == NULL) { fprintf(stderr, "malloc failed\\n"); exit(1); }
    n->value = value;
    n->next = NULL;
    return n;
}

/* Prepend a value to the front of the list */
Node *prepend(Node *head, int value) {
    Node *n = create_node(value);
    n->next = head;
    return n;  /* new head */
}

/* Append a value to the end of the list */
Node *append(Node *head, int value) {
    Node *n = create_node(value);
    if (head == NULL) return n;
    Node *curr = head;
    while (curr->next != NULL) curr = curr->next;
    curr->next = n;
    return head;
}

/* Delete the first node with the given value */
Node *delete_value(Node *head, int value) {
    if (head == NULL) return NULL;
    if (head->value == value) {
        Node *new_head = head->next;
        free(head);
        return new_head;
    }
    Node *curr = head;
    while (curr->next != NULL && curr->next->value != value) {
        curr = curr->next;
    }
    if (curr->next != NULL) {
        Node *to_delete = curr->next;
        curr->next = to_delete->next;
        free(to_delete);
    }
    return head;
}

/* Print the list */
void print_list(Node *head) {
    printf("List: ");
    while (head != NULL) {
        printf("%d -> ", head->value);
        head = head->next;
    }
    printf("NULL\\n");
}

/* Free the entire list */
void free_list(Node *head) {
    while (head != NULL) {
        Node *next = head->next;
        free(head);
        head = next;
    }
}

int main(void) {
    Node *head = NULL;

    head = append(head, 10);
    head = append(head, 20);
    head = append(head, 30);
    print_list(head);

    head = prepend(head, 5);
    print_list(head);

    head = delete_value(head, 20);
    print_list(head);

    free_list(head);
    return 0;
}`,
      expectedOutput: `List: 10 -> 20 -> 30 -> NULL
List: 5 -> 10 -> 20 -> 30 -> NULL
List: 5 -> 10 -> 30 -> NULL`,
      keyTakeaways: [
        "A linked list stores elements in dynamically allocated nodes, each with data and a next pointer.",
        "The head pointer references the first node; NULL marks both an empty list and the end of the list.",
        "Prepending is O(1); appending or searching requires traversing the list O(n).",
        "Deleting a node requires finding its predecessor to redirect the next pointer, then freeing the node.",
        "Always free every node when done to prevent memory leaks.",
        "Doubly linked lists add a prev pointer enabling backward traversal and O(1) tail deletion."
      ],
      commonMistakes: [
        "Losing the head pointer during operations — always save the new head when prepending or deleting the first node.",
        "Forgetting to free deleted nodes — leaving orphaned malloc'd memory that is never freed.",
        "Not checking for NULL before dereferencing a node pointer — crashes when the list is empty or you pass the end.",
        "Forgetting to set the new node's next pointer before updating head in a prepend — creates a cycle or loses the list.",
        "Failing to handle the empty list case (head == NULL) in every function that operates on the list."
      ],
      bestPractices: [
        "Use a separate create_node function to encapsulate allocation and initialisation.",
        "Always return the (possibly updated) head from functions that modify the list.",
        "Write a dedicated free_list function and call it before the program exits.",
        "Test every list function with an empty list, a single-element list, and a multi-element list.",
        "Consider using a sentinel (dummy) head node to simplify edge cases in insertion and deletion."
      ],
      exercises: [
        {
          title: "Exercise 1 – Build and Print a List",
          description: "Write a program that appends the integers 1 through 5 to an initially empty list, then prints the list in order, then prints it in reverse by first copying the values to an array.",
          hint: "To print in reverse, traverse the list once counting nodes, then traverse again storing values in an array, and print the array backwards."
        },
        {
          title: "Exercise 2 – Search the List",
          description: "Write a function 'int search(Node *head, int target)' that returns 1 if target exists in the list and 0 otherwise. Test it with values that are and are not in the list.",
          hint: "Traverse with a while loop; if curr->value == target, return 1. If the loop ends without finding it, return 0."
        },
        {
          title: "Exercise 3 – Count and Sum",
          description: "Write two functions: 'int count(Node *head)' returning the number of nodes, and 'int sum(Node *head)' returning the sum of all values. Print both for a list of your choice.",
          hint: "Both functions follow the same traversal pattern — loop while curr != NULL, accumulate, and advance curr."
        }
      ],
      challenge: {
        title: "Challenge – Sorted Insert",
        description: "Write a function 'Node *insert_sorted(Node *head, int value)' that inserts a new node at the correct position to keep the list in ascending sorted order. Then write a program that inserts 10 random integers (use rand() % 100) one by one and prints the sorted list after each insertion.",
        hint: "Find the first node whose value is greater than the new value; insert before it. Handle the empty list and insertion at the head as special cases."
      },
      quiz: [
        {
          question: "In a singly linked list, what does the last node's next pointer contain?",
          options: ["The first node's address", "0", "NULL", "The list's length"],
          correctIndex: 2,
          explanation: "The last node's next pointer is set to NULL to mark the end of the list."
        },
        {
          question: "What does the head pointer in a linked list represent?",
          options: [
            "The total length of the list",
            "A pointer to the last node",
            "A pointer to the first node",
            "The data of the first element"
          ],
          correctIndex: 2,
          explanation: "head points to the first node; an empty list is represented by head == NULL."
        },
        {
          question: "What is the time complexity of prepending to a singly linked list?",
          options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
          correctIndex: 2,
          explanation: "Prepending only requires updating two pointers (new node's next and head), which takes constant time O(1)."
        },
        {
          question: "What is the time complexity of appending to a singly linked list without a tail pointer?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
          correctIndex: 2,
          explanation: "You must traverse the entire list to reach the last node before appending, taking O(n) time."
        },
        {
          question: "What must you do before freeing a node during deletion?",
          options: [
            "Set its value to zero",
            "Save its next pointer to relink the list",
            "Move it to the end of the list",
            "Call realloc on it first"
          ],
          correctIndex: 1,
          explanation: "Before freeing a node, save node->next so you can link the previous node to the rest of the list."
        },
        {
          question: "How is an empty linked list represented?",
          options: [
            "head points to a node with value 0",
            "head == NULL",
            "head->next == NULL",
            "A list with one sentinel node"
          ],
          correctIndex: 1,
          explanation: "An empty list is represented by head == NULL, meaning there are no nodes at all."
        },
        {
          question: "A doubly linked list differs from a singly linked list in that:",
          options: [
            "It stores two values per node",
            "Each node also has a prev pointer to the preceding node",
            "It uses arrays instead of pointers",
            "It cannot be traversed forward"
          ],
          correctIndex: 1,
          explanation: "A doubly linked list adds a prev pointer to each node, enabling backward traversal and O(1) deletion from the tail."
        },
        {
          question: "What is a memory leak risk specific to linked lists?",
          options: [
            "Allocating too many stack variables",
            "Deleting a node without calling free on it",
            "Using too many if statements",
            "Printing the list too many times"
          ],
          correctIndex: 1,
          explanation: "If you unlink a node from the list but forget to call free on it, the memory is leaked and never returned to the OS."
        },
        {
          question: "Which is the correct way to prepend a new node with value v to a list with head h?",
          options: [
            "h->next = new_node; h = new_node;",
            "new_node->next = h; h = new_node;",
            "new_node->next = NULL; h = new_node;",
            "h = new_node; new_node->next = h;"
          ],
          correctIndex: 1,
          explanation: "Set new_node->next to the old head first, then update head to new_node. The other options break the list."
        },
        {
          question: "What crash occurs when you dereference curr->next when curr is NULL?",
          options: [
            "Stack overflow",
            "Segmentation fault (null pointer dereference)",
            "Integer overflow",
            "A compile error"
          ],
          correctIndex: 1,
          explanation: "Dereferencing a NULL pointer is undefined behaviour; on most systems it immediately causes a segmentation fault."
        },
        {
          question: "To count the number of nodes in a linked list, what is the algorithm?",
          options: [
            "Return the address of the last node",
            "Traverse from head to NULL, incrementing a counter each step",
            "Divide the total memory by sizeof(Node)",
            "Use strlen on the head pointer"
          ],
          correctIndex: 1,
          explanation: "Walk from head to NULL, incrementing a counter for each node visited; the final counter is the length."
        },
        {
          question: "What is the advantage of a linked list over an array for frequent insertions at the front?",
          options: [
            "Linked lists use less memory overall",
            "Prepend is O(1) for a list vs O(n) shift for an array",
            "Linked lists allow random access by index",
            "Arrays do not support insertion"
          ],
          correctIndex: 1,
          explanation: "Inserting at the front of an array requires shifting all elements O(n); a linked list prepend is O(1)."
        },
        {
          question: "What is the disadvantage of a linked list compared to an array?",
          options: [
            "Arrays use more memory per element",
            "Linked lists do not allow traversal",
            "Random access by index is O(n) for a list vs O(1) for an array",
            "Linked lists cannot store integers"
          ],
          correctIndex: 2,
          explanation: "To access the nth element of a linked list, you must traverse n nodes from head, which is O(n). Arrays offer O(1) indexed access."
        },
        {
          question: "Which function is used to allocate a new list node on the heap?",
          options: ["calloc only", "malloc or calloc", "new", "alloca"],
          correctIndex: 1,
          explanation: "malloc or calloc (from <stdlib.h>) allocates heap memory for a new node. In C there is no 'new' keyword."
        },
        {
          question: "When traversing a list with 'while (curr != NULL)', what should the loop body end with?",
          options: [
            "curr = NULL;",
            "curr = curr->value;",
            "curr = curr->next;",
            "free(curr);"
          ],
          correctIndex: 2,
          explanation: "Advancing the pointer with curr = curr->next moves to the next node; without this the loop is infinite."
        },
        {
          question: "A circular linked list differs from a regular linked list in that:",
          options: [
            "It has no head pointer",
            "The last node's next points back to the first node",
            "Each node has two data fields",
            "It is stored entirely on the stack"
          ],
          correctIndex: 1,
          explanation: "In a circular list the tail's next points to the head, forming a ring. Traversal must stop when you return to the starting node."
        },
        {
          question: "Why should you test linked list functions with an empty list?",
          options: [
            "Empty lists cause compile errors",
            "Edge cases with NULL head cause crashes if not handled",
            "Empty lists require a different node type",
            "You should not; only non-empty lists matter"
          ],
          correctIndex: 1,
          explanation: "Many list functions have special NULL-head cases; failing to handle them leads to null pointer dereferences."
        },
        {
          question: "What happens if you update head before setting new_node->next in a prepend?",
          options: [
            "Nothing; the order does not matter",
            "new_node->next = head now points to new_node itself, creating a cycle",
            "head is set to NULL",
            "The old list is automatically preserved"
          ],
          correctIndex: 1,
          explanation: "If you set head = new_node first, then new_node->next = head sets next to new_node itself — an immediate one-node cycle."
        },
        {
          question: "free_list should traverse the list using:",
          options: [
            "while (head != NULL) { free(head); head = head->next; }",
            "while (head != NULL) { Node *next = head->next; free(head); head = next; }",
            "free(head);",
            "for (int i=0; i<len; i++) free(head[i]);"
          ],
          correctIndex: 1,
          explanation: "Save head->next before freeing head; otherwise you dereference freed memory to get the next pointer."
        },
        {
          question: "Which data structures are commonly built on top of linked lists?",
          options: [
            "Stacks and queues",
            "Binary search trees only",
            "Hash tables only",
            "Arrays and strings"
          ],
          correctIndex: 0,
          explanation: "Stacks (push/pop at one end) and queues (enqueue at tail, dequeue at head) are natural linked-list applications."
        }
      ]
    },
    {
      id: "topic-5-7",
      title: "Stacks and Queues",
      estimatedReadingTime: 11,
      explanation: `A stack and a queue are both abstract data structures that store a sequence of items, but they differ in how items are added and removed. A stack follows the LIFO principle — Last In, First Out. Think of a stack of cafeteria trays: you always take the top tray (the last one placed), and you always place new trays on top. The two primary operations on a stack are push (add an item to the top) and pop (remove and return the top item). Checking the top item without removing it is called peek.

A queue follows the FIFO principle — First In, First Out. Think of a line at a ticket counter: the person who arrives first is served first. Items are added at the back (called enqueue) and removed from the front (called dequeue). Queues are essential for breadth-first search algorithms, task scheduling, event buffering, and any situation where order of arrival matters.

In C, both structures can be implemented with arrays or linked lists. An array-based stack is extremely simple: maintain an integer top that starts at -1 (empty), increment it and write to arr[top] on push, read arr[top] and decrement top on pop. The limitation is a fixed maximum size determined at allocation time. A linked-list-based stack has no practical size limit but uses more memory per element due to the pointer overhead.

An array-based queue is trickier because naive implementation wastes space as dequeue advances the front index. The standard solution is a circular buffer (or ring buffer): use modular arithmetic so that the indices wrap around. When front or rear reaches the end of the array, it wraps to the beginning. A linked-list queue is simpler to implement correctly: maintain both head and tail pointers, enqueue by appending to tail, dequeue by removing from head.

Understanding stacks and queues is fundamental because they model a huge range of real-world situations and appear constantly in algorithms: the call stack for function calls is a stack, message queues in operating systems use queue semantics, and undo/redo functionality in editors uses stacks. Implementing them from scratch in C deepens your understanding of both the data structures and C's memory model.`,
      codeExample: `#include <stdio.h>
#include <stdlib.h>

/* ===== ARRAY-BASED STACK ===== */
#define STACK_MAX 10

typedef struct {
    int data[STACK_MAX];
    int top;
} Stack;

void stack_init(Stack *s) { s->top = -1; }
int stack_empty(Stack *s) { return s->top == -1; }
int stack_full(Stack *s)  { return s->top == STACK_MAX - 1; }

void push(Stack *s, int val) {
    if (stack_full(s)) { printf("Stack overflow!\\n"); return; }
    s->data[++(s->top)] = val;
}

int pop(Stack *s) {
    if (stack_empty(s)) { printf("Stack underflow!\\n"); return -1; }
    return s->data[(s->top)--];
}

int peek(Stack *s) {
    if (stack_empty(s)) return -1;
    return s->data[s->top];
}

/* ===== LINKED-LIST-BASED QUEUE ===== */
typedef struct QNode { int val; struct QNode *next; } QNode;

typedef struct {
    QNode *front;
    QNode *rear;
} Queue;

void queue_init(Queue *q) { q->front = q->rear = NULL; }
int queue_empty(Queue *q) { return q->front == NULL; }

void enqueue(Queue *q, int val) {
    QNode *n = (QNode *)malloc(sizeof(QNode));
    if (!n) { fprintf(stderr, "malloc failed\\n"); exit(1); }
    n->val = val; n->next = NULL;
    if (q->rear == NULL) { q->front = q->rear = n; return; }
    q->rear->next = n;
    q->rear = n;
}

int dequeue(Queue *q) {
    if (queue_empty(q)) { printf("Queue empty!\\n"); return -1; }
    QNode *old = q->front;
    int val = old->val;
    q->front = old->next;
    if (q->front == NULL) q->rear = NULL;
    free(old);
    return val;
}

void queue_free(Queue *q) {
    while (!queue_empty(q)) dequeue(q);
}

int main(void) {
    /* Stack demo */
    Stack s;
    stack_init(&s);
    push(&s, 10); push(&s, 20); push(&s, 30);
    printf("Stack peek: %d\\n", peek(&s));
    printf("Popped: %d, %d, %d\\n", pop(&s), pop(&s), pop(&s));

    /* Queue demo */
    Queue q;
    queue_init(&q);
    enqueue(&q, 1); enqueue(&q, 2); enqueue(&q, 3);
    printf("Queue dequeued: %d, %d, %d\\n",
           dequeue(&q), dequeue(&q), dequeue(&q));
    queue_free(&q);
    return 0;
}`,
      expectedOutput: `Stack peek: 30
Popped: 30, 20, 10
Queue dequeued: 1, 2, 3`,
      keyTakeaways: [
        "A stack is LIFO: push adds to the top, pop removes from the top — like a stack of plates.",
        "A queue is FIFO: enqueue adds to the back, dequeue removes from the front — like a waiting line.",
        "Array-based stacks are simple and fast but have a fixed maximum capacity.",
        "Linked-list-based queues are dynamically sized; always free every node to avoid leaks.",
        "Always check for overflow (stack full) and underflow (empty) before push/pop/dequeue.",
        "Stacks power function call management; queues power scheduling and BFS algorithms."
      ],
      commonMistakes: [
        "Not checking for underflow before popping or dequeuing — on an empty stack/queue this accesses invalid memory.",
        "Forgetting to update both front and rear pointers when a queue becomes empty after the last dequeue.",
        "In an array stack, using top == 0 as the empty condition instead of top == -1 — index 0 is a valid element.",
        "Leaking queue node memory by forgetting to free dequeued nodes.",
        "Off-by-one errors with the stack array — confusing STACK_MAX with STACK_MAX-1 as the full condition."
      ],
      bestPractices: [
        "Always write and call empty/full check functions rather than inlining the boundary conditions.",
        "Initialise stack top to -1 and queue front/rear to NULL to represent the empty state cleanly.",
        "For dynamic stacks, use a linked list or realloc-based array to avoid fixed-size limitations.",
        "Write a queue_free function that dequeues all elements to ensure proper cleanup.",
        "Document the LIFO or FIFO contract of each data structure at the top of its implementation."
      ],
      exercises: [
        {
          title: "Exercise 1 – Balanced Parentheses Checker",
          description: "Use a stack to check if a string of parentheses, brackets, and braces is balanced. Push opening characters, and when you see a closing character, pop and verify it matches. Print whether the input is balanced.",
          hint: "Use a char stack. For ')', check the popped char is '('; for '}' check '{'; for ']' check '['."
        },
        {
          title: "Exercise 2 – Reverse a String with a Stack",
          description: "Write a program that reads a string, pushes each character onto a stack, then pops them all off and prints the reversed string.",
          hint: "Use a char array as a stack with a top index. Each push stores str[i]; each pop retrieves the last pushed character."
        },
        {
          title: "Exercise 3 – Print Queue Simulation",
          description: "Simulate a simple print queue. Enqueue five job names (strings). Print 'Processing: <name>' as you dequeue each one. If you add a new job after processing two, show that it goes to the end.",
          hint: "Use a linked-list queue of char * (or fixed-char arrays). Enqueue, dequeue twice, enqueue a new job, then dequeue all remaining."
        }
      ],
      challenge: {
        title: "Challenge – Min Stack",
        description: "Implement a special stack that supports push, pop, peek (top value), and min (the current minimum value in the stack) — all in O(1) time. The trick is to use a second auxiliary stack that tracks the minimums. Test it by pushing and popping values in a mixed order and verifying min is always correct.",
        hint: "The aux stack pushes a new minimum whenever a value <= current minimum is pushed, and pops synchronously when the main stack pops that value."
      },
      quiz: [
        {
          question: "What does LIFO stand for?",
          options: ["Last Input First Output", "Last In First Out", "Linear In First Out", "Linked Internal File Order"],
          correctIndex: 1,
          explanation: "LIFO — Last In, First Out — means the most recently added item is the first to be removed, like a stack of trays."
        },
        {
          question: "What does FIFO stand for?",
          options: ["First In First Out", "First Input File Output", "Fixed Index Floating Object", "File Input Function Order"],
          correctIndex: 0,
          explanation: "FIFO — First In, First Out — means the first item added is the first to be removed, like a line at a counter."
        },
        {
          question: "Which operation adds an item to the top of a stack?",
          options: ["enqueue", "push", "insert", "append"],
          correctIndex: 1,
          explanation: "push adds an element to the top of the stack; pop removes from the top."
        },
        {
          question: "Which operation removes an item from the front of a queue?",
          options: ["pop", "push", "dequeue", "shift"],
          correctIndex: 2,
          explanation: "dequeue removes the front element from a queue, while enqueue adds to the back."
        },
        {
          question: "For an array-based stack of size MAX, which condition means the stack is empty?",
          options: ["top == 0", "top == MAX", "top == -1", "top == MAX - 1"],
          correctIndex: 2,
          explanation: "Initialising top to -1 and checking top == -1 is the standard way to represent an empty array-based stack."
        },
        {
          question: "What is a stack overflow in the context of a data structure?",
          options: [
            "A runtime error when a C program crashes",
            "Pushing onto a stack that has reached its maximum capacity",
            "Calling too many functions recursively",
            "A queue with no elements"
          ],
          correctIndex: 1,
          explanation: "Stack overflow occurs when you push to a full stack; underflow occurs when you pop from an empty one."
        },
        {
          question: "What real-world analogy best describes a queue?",
          options: [
            "A stack of pancakes",
            "A book on a shelf",
            "A line of customers at a bank",
            "A drawer of files"
          ],
          correctIndex: 2,
          explanation: "A queue is like a line — the first person who joins is the first to be served, following FIFO order."
        },
        {
          question: "In a linked-list queue, which pointers must you maintain?",
          options: [
            "Only a head pointer",
            "Only a tail pointer",
            "Both a front (head) and rear (tail) pointer",
            "A middle and end pointer"
          ],
          correctIndex: 2,
          explanation: "You need front to dequeue efficiently (O(1)) and rear to enqueue efficiently (O(1)) without traversing."
        },
        {
          question: "What is 'peek' on a stack?",
          options: [
            "Removing the top element",
            "Adding an element below the current top",
            "Viewing the top element without removing it",
            "Checking if the stack is empty"
          ],
          correctIndex: 2,
          explanation: "Peek (also called top) returns the top element's value without popping it from the stack."
        },
        {
          question: "Which algorithm uses a queue for its traversal?",
          options: [
            "Depth-First Search",
            "Binary search",
            "Bubble sort",
            "Breadth-First Search"
          ],
          correctIndex: 3,
          explanation: "Breadth-First Search (BFS) uses a queue to process nodes level by level, exploring neighbors before going deeper."
        },
        {
          question: "The function call stack in a CPU is what type of structure?",
          options: ["Queue", "Stack", "Array", "Linked list"],
          correctIndex: 1,
          explanation: "The call stack stores function activation records. When a function calls another, its frame is pushed; on return it is popped — LIFO."
        },
        {
          question: "What is the main advantage of a linked-list-based stack over an array-based stack?",
          options: [
            "Faster push operations",
            "No fixed maximum size — grows dynamically",
            "Less memory usage per element",
            "Thread-safe operations"
          ],
          correctIndex: 1,
          explanation: "A linked-list stack can grow without a pre-defined limit, unlike an array stack that is bounded by its allocated size."
        },
        {
          question: "After dequeuing the last element from a linked-list queue, what must you do?",
          options: [
            "Set front = rear = NULL",
            "Set front = NULL but leave rear unchanged",
            "Set rear to front",
            "Reallocate the queue"
          ],
          correctIndex: 0,
          explanation: "When the queue becomes empty, both front and rear must be set to NULL to correctly represent the empty state."
        },
        {
          question: "A circular buffer solves which problem with array-based queues?",
          options: [
            "The array being too slow",
            "Wasted space as the front index advances",
            "Nodes not being freed properly",
            "The queue growing beyond array size"
          ],
          correctIndex: 1,
          explanation: "A simple array queue wastes space as front advances. A circular buffer wraps rear back to index 0, reusing freed slots."
        },
        {
          question: "What is the time complexity of push and pop on an array-based stack?",
          options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
          correctIndex: 2,
          explanation: "Both push and pop on an array stack only modify the top index and access one element — constant time O(1)."
        },
        {
          question: "Which is a correct application of a stack?",
          options: [
            "Simulating a print queue",
            "Checking balanced parentheses in an expression",
            "Processing customers in arrival order",
            "Breadth-first traversal of a graph"
          ],
          correctIndex: 1,
          explanation: "Checking balanced parentheses uses a stack: push opening brackets, pop and match when a closing bracket is seen."
        },
        {
          question: "When implementing undo functionality in a text editor, which data structure is typically used?",
          options: ["Queue", "Stack", "Doubly linked list", "Hash table"],
          correctIndex: 1,
          explanation: "Each action is pushed onto a stack; undo pops the most recent action, reversing it — classic LIFO behaviour."
        },
        {
          question: "What does 'stack underflow' mean?",
          options: [
            "The stack used too much memory",
            "A pop or peek was attempted on an empty stack",
            "The stack overflowed the array bounds",
            "The stack was freed twice"
          ],
          correctIndex: 1,
          explanation: "Stack underflow occurs when you attempt to pop or peek from a stack that has no elements."
        },
        {
          question: "In a linked-list queue, where are new elements added?",
          options: ["At the front", "At the rear (tail)", "In sorted order", "After the middle node"],
          correctIndex: 1,
          explanation: "Enqueue appends to the rear; dequeue removes from the front, maintaining FIFO order."
        },
        {
          question: "Which condition detects a full array-based stack of size MAX using top as the index?",
          options: [
            "top == MAX",
            "top == MAX - 1",
            "top == 0",
            "top == -1"
          ],
          correctIndex: 1,
          explanation: "With top starting at -1 and valid indices 0..MAX-1, the stack is full when top == MAX - 1."
        }
      ]
    },
    {
      id: "topic-5-8",
      title: "Multi-file Programs and Header Files",
      estimatedReadingTime: 9,
      explanation: `Every real C project beyond a toy program is split across multiple files. As your codebase grows, putting everything in one file becomes unmanageable: it is hard to find things, teams cannot work on different parts simultaneously, and recompilation takes forever because you have to recompile everything for every tiny change. Multi-file organisation solves all these problems.

In a multi-file C project, the code is divided into translation units — each .c source file is one translation unit. Each translation unit is compiled independently into an object file (.o) by the compiler. The linker then combines these object files into the final executable. If you change only one .c file, only that file needs to be recompiled; the others can be reused from their pre-built object files.

Header files (.h) are the glue that holds multi-file projects together. A header file contains declarations (not definitions): function prototypes, struct definitions, typedef aliases, constants (#define), and extern variable declarations. When a .c file #includes a header, the preprocessor pastes the header's text into that file before compilation, making the declarations visible so the compiler knows the types and signatures without seeing the actual implementations.

The single most important rule of header files is to use include guards. Without them, if file A.h includes B.h and B.h also includes A.h (or if you accidentally include the same header twice), you get duplicate definition errors. An include guard wraps the entire header in a conditional compilation block: #ifndef MY_HEADER_H, #define MY_HEADER_H, ... content ..., #endif. Modern compilers also support #pragma once as a non-standard but widely accepted shorthand.

Good project structure separates concerns: related functions go in the same .c file, paired with a .h file that exports their public interface. Private helper functions (that only that .c file needs) are declared static to limit their visibility. The main.c file typically only contains main() and is the entry point that calls functions from other modules. This modular design makes code reusable, testable, and maintainable.`,
      codeExample: `/* ===== math_utils.h ===== */
/* Include guard prevents double-inclusion */
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

/* Public function prototypes */
int add(int a, int b);
int subtract(int a, int b);
double average(int *arr, int n);

/* Constant shared across files */
#define PI 3.14159265358979

#endif /* MATH_UTILS_H */

/* ===== math_utils.c ===== */
/* (In a real project this would be a separate file) */
#include "math_utils.h"  /* include our own header */

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }

double average(int *arr, int n) {
    if (n <= 0) return 0.0;
    int sum = 0;
    for (int i = 0; i < n; i++) sum += arr[i];
    return (double)sum / n;
}

/* ===== main.c (combined here for demonstration) ===== */
#include <stdio.h>
#include "math_utils.h"

int main(void) {
    printf("add(3, 4) = %d\\n", add(3, 4));
    printf("subtract(10, 3) = %d\\n", subtract(10, 3));

    int data[] = {10, 20, 30, 40, 50};
    printf("average = %.2f\\n", average(data, 5));

    printf("PI = %.5f\\n", PI);
    return 0;
}`,
      expectedOutput: `add(3, 4) = 7
subtract(10, 3) = 7
average = 30.00
PI = 3.14159`,
      keyTakeaways: [
        "Large C projects split code into multiple .c source files, each compiled separately into object files.",
        "Header files (.h) contain declarations (prototypes, typedefs, constants) shared between translation units.",
        "Include guards (#ifndef / #define / #endif) prevent errors from headers being included multiple times.",
        "Use #include <header.h> for system headers and #include 'header.h' for your own project headers.",
        "Declare functions static in a .c file to limit their visibility to that file only.",
        "The linker combines compiled object files into the final executable, resolving cross-file references."
      ],
      commonMistakes: [
        "Placing function definitions (not just prototypes) in header files — if included in multiple .c files, causes duplicate definition linker errors.",
        "Forgetting include guards, leading to redefinition errors when a header is included more than once.",
        "Using #include <myheader.h> (angle brackets) for your own headers instead of #include 'myheader.h' (quotes).",
        "Declaring global variables in headers without 'extern' — each including file creates its own copy.",
        "Not compiling all .c files together when linking — missing object files cause undefined reference errors."
      ],
      bestPractices: [
        "Always use include guards or #pragma once in every header file.",
        "Keep header files lean: only declare what other files truly need; keep internal helpers in the .c file.",
        "Use the extern keyword in headers for global variables and define them in exactly one .c file.",
        "Use a Makefile or build system to manage multi-file compilation dependencies automatically.",
        "Name your include guard macro after the filename: MATH_UTILS_H for math_utils.h."
      ],
      exercises: [
        {
          title: "Exercise 1 – Split a Program",
          description: "Take a single-file program that defines a struct Point and functions to compute distance and midpoint between two points. Split it into point.h (declarations), point.c (definitions), and main.c (usage). Compile with gcc point.c main.c -o prog.",
          hint: "Put the struct typedef and function prototypes in point.h with include guards. Include point.h in both point.c and main.c."
        },
        {
          title: "Exercise 2 – String Utilities Module",
          description: "Create strutils.h and strutils.c. Implement functions: count_vowels(char *s) returning int and to_uppercase(char *s) modifying in place. In main.c, include strutils.h and test both functions.",
          hint: "The prototype in the header must exactly match the function signature in the .c file. Remember the include guard."
        },
        {
          title: "Exercise 3 – Shared Constants",
          description: "Create a constants.h that defines several #define macros: MAX_NAME (50), MAX_STUDENTS (30), and PASSING_GRADE (60). Include this header in two separate .c files and verify both can use the constants.",
          hint: "Constants defined with #define in a header are safe to include multiple times because they are textual substitutions, but include guards are still good practice."
        }
      ],
      challenge: {
        title: "Challenge – Calculator Module",
        description: "Build a three-file project: calc.h declares a Calculator struct (with an accumulator field) and functions init, add, subtract, multiply, divide, reset, and print_result. calc.c implements them. main.c creates a Calculator and runs a sequence of operations. Compile as: gcc calc.c main.c -o calculator.",
        hint: "Pass the Calculator by pointer to all functions so they can modify the accumulator. The divide function should check for zero and print an error without modifying the accumulator."
      },
      quiz: [
        {
          question: "What is the purpose of a header file in C?",
          options: [
            "To store compiled machine code",
            "To provide declarations (prototypes, types, constants) shared between source files",
            "To replace the need for a linker",
            "To store global variables"
          ],
          correctIndex: 1,
          explanation: "Header files contain declarations — function prototypes, typedefs, constants — that other .c files include to know about interfaces."
        },
        {
          question: "What is an include guard?",
          options: [
            "A security feature that prevents unauthorised file access",
            "A preprocessor pattern (#ifndef/#define/#endif) preventing a header from being processed multiple times",
            "A runtime check that limits include depth",
            "A compiler flag for include optimization"
          ],
          correctIndex: 1,
          explanation: "Include guards use #ifndef to check if a macro is defined; if not, they define it and include the content, preventing redefinition."
        },
        {
          question: "Which syntax includes a project's own header file?",
          options: [
            "#include <myheader.h>",
            "#include 'myheader.h'",
            "#import myheader.h",
            "#require myheader.h"
          ],
          correctIndex: 1,
          explanation: "Angle brackets search system include paths; double quotes search the project directory first, which is correct for your own headers."
        },
        {
          question: "What does the linker do?",
          options: [
            "Converts C source to assembly",
            "Runs the program in a sandbox",
            "Combines compiled object files into a final executable, resolving cross-file references",
            "Checks the code for syntax errors"
          ],
          correctIndex: 2,
          explanation: "After compiling each .c file to a .o object file, the linker resolves symbol references between them and produces the executable."
        },
        {
          question: "What is a translation unit in C?",
          options: [
            "A function that translates between languages",
            "A single .c source file after preprocessing",
            "A group of related header files",
            "An object file produced by the linker"
          ],
          correctIndex: 1,
          explanation: "A translation unit is one .c file with all its #includes expanded by the preprocessor; it is compiled as a unit."
        },
        {
          question: "What problem occurs if you put a function definition in a header included by two .c files?",
          options: [
            "No problem — headers can contain definitions",
            "A duplicate symbol linker error, because the function is defined twice",
            "A preprocessor warning",
            "The function runs twice on startup"
          ],
          correctIndex: 1,
          explanation: "Each .c file that includes the header compiles its own copy of the function, causing a 'multiple definition' linker error."
        },
        {
          question: "What does 'static' mean when applied to a function in a .c file?",
          options: [
            "The function is stored in static memory",
            "The function is visible only within that translation unit",
            "The function cannot modify global variables",
            "The function runs only once"
          ],
          correctIndex: 1,
          explanation: "static on a function limits its linkage to the current translation unit, hiding it from other .c files."
        },
        {
          question: "How do you declare a global variable in a header so it is not defined multiple times?",
          options: [
            "int g_count; in the header",
            "extern int g_count; in the header and int g_count; in exactly one .c file",
            "static int g_count; in the header",
            "#define g_count 0 in the header"
          ],
          correctIndex: 1,
          explanation: "'extern int g_count;' in the header declares the variable without defining it; the definition goes in one .c file."
        },
        {
          question: "What command compiles two .c files into one executable with gcc?",
          options: [
            "gcc file1.c | gcc file2.c -o prog",
            "gcc file1.c file2.c -o prog",
            "gcc -link file1.c file2.c",
            "gcc file1.c && gcc file2.c -o prog"
          ],
          correctIndex: 1,
          explanation: "Listing all .c files on one gcc command line compiles and links them together in one step."
        },
        {
          question: "What is #pragma once?",
          options: [
            "A standard C keyword for include guards",
            "A non-standard but widely supported compiler directive that acts as an include guard",
            "A directive that limits include depth to one level",
            "A way to include a file only on the first compilation"
          ],
          correctIndex: 1,
          explanation: "#pragma once is a compiler extension (supported by GCC, Clang, MSVC) that prevents multiple inclusion without the #ifndef pattern."
        },
        {
          question: "In a well-structured project, what typically goes in main.c?",
          options: [
            "All function implementations",
            "Only the main() function and high-level calls to module functions",
            "All struct definitions",
            "Only #include directives"
          ],
          correctIndex: 1,
          explanation: "main.c should be the thin entry point containing main() that calls into well-organised modules defined in other files."
        },
        {
          question: "What is an object file?",
          options: [
            "A file containing C source code",
            "The final linked executable",
            "The compiled machine code for a single .c file, not yet linked",
            "A file storing program configuration"
          ],
          correctIndex: 2,
          explanation: "gcc -c file.c produces file.o — compiled machine code for that translation unit, waiting to be linked with others."
        },
        {
          question: "What tool automates dependency tracking and rebuilding of only changed files?",
          options: ["gcc", "gdb", "make (with a Makefile)", "valgrind"],
          correctIndex: 2,
          explanation: "make reads a Makefile that specifies dependencies; it only recompiles source files that have changed since the last build."
        },
        {
          question: "Which of the following should be in a .h header file?",
          options: [
            "Function bodies (implementations)",
            "Function prototypes, struct definitions, and typedef aliases",
            "All local variable declarations",
            "malloc and free calls"
          ],
          correctIndex: 1,
          explanation: "Headers hold declarations: prototypes tell callers about function signatures; structs and typedefs define shared data shapes."
        },
        {
          question: "If mylib.h has no include guard and is included twice, what happens?",
          options: [
            "The second include is silently ignored",
            "The preprocessor merges both includes automatically",
            "Redefinition errors occur for any types, macros, or prototypes declared in it",
            "The program runs but prints a warning"
          ],
          correctIndex: 2,
          explanation: "Without a guard, the preprocessor pastes the header's content twice; structs and typedefs defined twice cause compile errors."
        },
        {
          question: "What does -c flag in 'gcc -c math.c' do?",
          options: [
            "Cleans the build directory",
            "Compiles math.c to math.o without linking",
            "Checks syntax only",
            "Runs the program after compilation"
          ],
          correctIndex: 1,
          explanation: "The -c flag tells gcc to compile to an object file (.o) but skip the linker step, useful for incremental builds."
        },
        {
          question: "Where should you define (not just declare) a global constant integer in a multi-file project?",
          options: [
            "In every .c file that uses it",
            "In a header file as 'int CONSTANT = 5;'",
            "In exactly one .c file; use extern in the header",
            "Inside the main function"
          ],
          correctIndex: 2,
          explanation: "Global definitions must appear in exactly one translation unit; use extern in the header so all other files can reference it."
        },
        {
          question: "What naming convention is recommended for include guard macros?",
          options: [
            "A random unique string",
            "The filename in uppercase with dots replaced by underscores (e.g., MATH_UTILS_H)",
            "The project name followed by a number",
            "Any single word in lowercase"
          ],
          correctIndex: 1,
          explanation: "Basing the guard name on the filename (MATH_UTILS_H for math_utils.h) prevents clashes across the project."
        },
        {
          question: "Which keyword limits a global variable's scope to its own .c file?",
          options: ["extern", "const", "static", "volatile"],
          correctIndex: 2,
          explanation: "static on a global variable gives it internal linkage, making it invisible to other translation units."
        },
        {
          question: "A 'undefined reference to' error from the linker usually means:",
          options: [
            "A syntax error in a .c file",
            "A function is called but its implementation is not included in the link step",
            "A header file is missing an include guard",
            "The function return type is wrong"
          ],
          correctIndex: 1,
          explanation: "'Undefined reference' is a linker error: the function is declared (the compiler is happy) but its .c file was not compiled and linked."
        }
      ]
    },
    {
      id: "topic-5-9",
      title: "The C Standard Library Overview",
      estimatedReadingTime: 8,
      explanation: `The C standard library is a rich collection of functions, macros, and types that come with every conforming C compiler. Rather than implementing everything from scratch — input/output, string manipulation, memory allocation, math, sorting — you can rely on these battle-tested, highly optimised functions. Knowing what the standard library offers and where to find it is a key mark of an experienced C programmer.

The most familiar header is <stdio.h>, which you have used since the beginning. It provides printf, scanf, fopen, fclose, fgets, fprintf, fputs, and many others for interacting with files and the terminal. Another header you know well is <stdlib.h>, which provides memory management (malloc, free, calloc, realloc), process control (exit, abort), type conversions (atoi, atof, strtol), and utility algorithms (qsort, bsearch).

The <string.h> header provides functions for working with null-terminated C strings: strlen measures a string's length, strcpy and strncpy copy strings, strcat and strncat concatenate them, strcmp and strncmp compare them, strchr and strstr search within strings, and memcpy, memset, memmove work on raw byte arrays. The <math.h> header provides mathematical functions like sqrt, pow, fabs, sin, cos, tan, floor, and ceil — you typically need to link with -lm when using it.

The <ctype.h> header provides character classification functions: isdigit checks if a character is a digit, isalpha checks for a letter, islower and isupper check case, and tolower/toupper perform case conversion. The <time.h> header provides time-related functions: time() returns the current time as a Unix timestamp, difftime computes the difference between two times, and strftime formats time into a human-readable string.

Other important headers include <stdint.h> for fixed-width integer types, <stdbool.h> for the bool type and true/false, <assert.h> for the assert macro (great for catching bugs during development), <errno.h> for the errno error variable and error constants, <limits.h> for integer type limits like INT_MAX and INT_MIN, and <float.h> for floating-point limits. Learning which header provides what is something that comes with practice and reference reading.`,
      codeExample: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <math.h>
#include <assert.h>
#include <stdbool.h>
#include <limits.h>

/* Demonstrate various standard library functions */
int main(void) {
    /* <string.h> */
    char greeting[50];
    strcpy(greeting, "hello, world");
    printf("strlen: %zu\\n", strlen(greeting));
    printf("strcmp: %d\\n", strcmp("abc", "abc"));

    char upper[50];
    strcpy(upper, greeting);
    for (int i = 0; upper[i]; i++) upper[i] = (char)toupper(upper[i]);
    printf("toupper: %s\\n", upper);  /* <ctype.h> */

    /* <stdlib.h> — qsort */
    int nums[] = {5, 2, 9, 1, 7, 3};
    int n = 6;
    /* comparator for ascending sort */
    int cmp(const void *a, const void *b) {
        return (*(int *)a - *(int *)b);
    }
    qsort(nums, n, sizeof(int), cmp);
    printf("sorted: ");
    for (int i = 0; i < n; i++) printf("%d ", nums[i]);
    printf("\\n");

    /* <math.h> */
    printf("sqrt(144) = %.1f\\n", sqrt(144.0));
    printf("pow(2,10) = %.0f\\n", pow(2.0, 10.0));

    /* <stdbool.h> */
    bool flag = true;
    printf("bool flag: %s\\n", flag ? "true" : "false");

    /* <limits.h> */
    printf("INT_MAX = %d\\n", INT_MAX);
    printf("INT_MIN = %d\\n", INT_MIN);

    /* <assert.h> — assertion (will abort if false) */
    assert(1 + 1 == 2);  /* passes silently */
    printf("assert passed.\\n");

    /* <stdlib.h> — bsearch on sorted array */
    int key = 7;
    int *found = (int *)bsearch(&key, nums, n, sizeof(int), cmp);
    printf("bsearch for 7: %s\\n", found ? "found" : "not found");

    return 0;
}`,
      expectedOutput: `strlen: 12
strcmp: 0
toupper: HELLO, WORLD
sorted: 1 2 3 5 7 9 
sqrt(144) = 12.0
pow(2,10) = 1024
bool flag: true
INT_MAX = 2147483647
INT_MIN = -2147483648
assert passed.
bsearch for 7: found`,
      keyTakeaways: [
        "<stdio.h> provides all standard I/O: printf, scanf, fopen, fclose, fgets, fprintf.",
        "<stdlib.h> provides memory (malloc/free), conversion (atoi/atof), and algorithms (qsort/bsearch).",
        "<string.h> provides string and memory operations: strlen, strcpy, strcmp, memcpy, memset.",
        "<ctype.h> provides character classification and conversion: isdigit, isalpha, toupper, tolower.",
        "<math.h> provides math functions; link with -lm flag when using it.",
        "Use <assert.h> assert() during development to catch bugs early; assertions can be disabled with -DNDEBUG."
      ],
      commonMistakes: [
        "Forgetting to link with -lm when using <math.h> functions — causes 'undefined reference to sqrt' linker errors.",
        "Using strcpy without ensuring the destination buffer is large enough — causes buffer overflow.",
        "Confusing strcmp's return value: it returns 0 on equality, not 1 or true.",
        "Not including the correct header for a function — every standard library function has exactly one header it belongs to.",
        "Using assert in production code for input validation — assertions should be disabled in release builds; use proper error handling instead."
      ],
      bestPractices: [
        "Know which header each function belongs to; always include it explicitly, never rely on transitive includes.",
        "Prefer strncpy, strncat, and snprintf over their unsafe counterparts to prevent buffer overflows.",
        "Use bsearch only on arrays sorted in the same order as your comparator.",
        "Reserve assert for invariants (things that should always be true by design), not for user-input validation.",
        "Read the man pages or cppreference.com for any standard library function to understand its exact behaviour and edge cases."
      ],
      exercises: [
        {
          title: "Exercise 1 – String Utilities",
          description: "Write a program using only <string.h> and <ctype.h> functions: read a string, count its vowels, convert it to lowercase, reverse it in place, and print all three results.",
          hint: "For reverse in place, use two indices (front and back) swapping characters until they meet in the middle."
        },
        {
          title: "Exercise 2 – Sorting Structures",
          description: "Create an array of 5 structs, each containing a name (char[30]) and a score (int). Use qsort to sort them by score descending. Print the sorted list. Write the comparator function carefully.",
          hint: "Cast the void * arguments to struct pointers in your comparator, and compare the score fields. Reverse the subtraction for descending order."
        },
        {
          title: "Exercise 3 – Math Functions Demo",
          description: "Write a program that computes: the hypotenuse of a right triangle with legs 3 and 4 using sqrt, 2 to the power of 8 using pow, the absolute value of -17.5 using fabs, and ceiling/floor of 3.7. Print all results.",
          hint: "Include <math.h> and compile with -lm. Use sqrt(a*a + b*b) for the hypotenuse."
        }
      ],
      challenge: {
        title: "Challenge – Text Statistics Tool",
        description: "Write a program that reads a text file line by line and computes: total character count, total word count (sequences of non-space characters), total line count, frequency of each letter a-z (case-insensitive), and the average word length. Print all statistics. Use functions from <stdio.h>, <string.h>, <ctype.h>, and <stdlib.h>.",
        hint: "Keep an int array of size 26 for letter frequencies, indexed by (tolower(c) - 'a'). Count words by tracking transitions from whitespace to non-whitespace."
      },
      quiz: [
        {
          question: "Which header provides the strlen and strcpy functions?",
          options: ["<stdio.h>", "<string.h>", "<stdlib.h>", "<ctype.h>"],
          correctIndex: 1,
          explanation: "strlen and strcpy are declared in <string.h>, which provides all standard C string and memory functions."
        },
        {
          question: "What does strcmp return when two strings are equal?",
          options: ["1", "true", "0", "-1"],
          correctIndex: 2,
          explanation: "strcmp returns 0 when both strings are identical character by character. Non-zero means they differ."
        },
        {
          question: "Which header must you include to use the bool type and true/false in C?",
          options: ["<stdint.h>", "<stdlib.h>", "<stdbool.h>", "<bool.h>"],
          correctIndex: 2,
          explanation: "<stdbool.h> defines bool as an alias for _Bool and the macros true (1) and false (0)."
        },
        {
          question: "What extra compiler flag is often needed when using <math.h> functions?",
          options: ["-lm", "-math", "-stdlib", "-fmath"],
          correctIndex: 0,
          explanation: "On Linux, the math library is separate; you link it with the -lm flag: gcc prog.c -o prog -lm."
        },
        {
          question: "Which function from <stdlib.h> sorts an array of any type?",
          options: ["sort()", "msort()", "qsort()", "bsort()"],
          correctIndex: 2,
          explanation: "qsort sorts arrays using a user-supplied comparator function pointer; it works on arrays of any type."
        },
        {
          question: "What does isdigit('7') return from <ctype.h>?",
          options: ["0", "'7'", "A non-zero integer (true)", "-1"],
          correctIndex: 2,
          explanation: "isdigit returns a non-zero value (true) if the character is a decimal digit (0-9), zero otherwise."
        },
        {
          question: "What does assert(condition) do when condition is false?",
          options: [
            "Prints a warning and continues",
            "Returns 0",
            "Aborts the program with an error message",
            "Throws an exception"
          ],
          correctIndex: 2,
          explanation: "assert aborts the program and prints the failing condition, file, and line number to stderr — useful for catching bugs during development."
        },
        {
          question: "Which header provides INT_MAX and INT_MIN?",
          options: ["<stdint.h>", "<limits.h>", "<stdlib.h>", "<math.h>"],
          correctIndex: 1,
          explanation: "<limits.h> defines macros for the minimum and maximum values of standard integer types like INT_MAX and CHAR_MIN."
        },
        {
          question: "What does memset(buf, 0, n) do?",
          options: [
            "Copies n bytes from 0 to buf",
            "Sets all n bytes of buf to zero",
            "Compares n bytes of buf with 0",
            "Moves buf n bytes forward in memory"
          ],
          correctIndex: 1,
          explanation: "memset fills the first n bytes of buf with the value 0 — commonly used to zero out arrays or structs."
        },
        {
          question: "Which function searches a sorted array for a key?",
          options: ["lsearch", "qsort", "bsearch", "strstr"],
          correctIndex: 2,
          explanation: "bsearch performs a binary search on a sorted array using a comparator, returning a pointer to the found element or NULL."
        },
        {
          question: "What does tolower('A') return?",
          options: ["A", "'a'", "65", "0"],
          correctIndex: 1,
          explanation: "tolower converts an uppercase letter to its lowercase equivalent; tolower('A') returns 'a' (97 as an int)."
        },
        {
          question: "Which header provides the errno variable and error constants like ENOENT?",
          options: ["<error.h>", "<errno.h>", "<stdlib.h>", "<stdio.h>"],
          correctIndex: 1,
          explanation: "<errno.h> declares errno and constants like ENOENT (file not found) and ENOMEM (out of memory)."
        },
        {
          question: "What does strstr(haystack, needle) return if needle is not found?",
          options: ["0", "An empty string", "NULL", "-1"],
          correctIndex: 2,
          explanation: "strstr returns a pointer to the first occurrence of needle in haystack, or NULL if needle is not found."
        },
        {
          question: "Why is strncpy safer than strcpy?",
          options: [
            "strncpy is faster",
            "strncpy limits the maximum number of characters copied, preventing buffer overflow",
            "strncpy always adds a null terminator",
            "strncpy works with wide characters"
          ],
          correctIndex: 1,
          explanation: "strncpy takes a maximum length argument, preventing it from writing beyond the destination buffer's size."
        },
        {
          question: "Which function converts the string '3.14' to the double 3.14?",
          options: ["atoi", "atof", "itoa", "strtoi"],
          correctIndex: 1,
          explanation: "atof (ASCII to float/double) converts a string representation of a decimal number to a double value."
        },
        {
          question: "What does exit(1) do?",
          options: [
            "Returns 1 from the current function",
            "Terminates the program with exit code 1",
            "Raises a signal",
            "Jumps to main"
          ],
          correctIndex: 1,
          explanation: "exit() terminates the process immediately with the given status code, flushing stdio buffers and calling atexit handlers."
        },
        {
          question: "Which of the following correctly counts the length of a C string s?",
          options: ["sizeof(s)", "s.length()", "strlen(s)", "count(s)"],
          correctIndex: 2,
          explanation: "strlen returns the number of characters before the null terminator. sizeof(s) gives the pointer size, not string length."
        },
        {
          question: "assert() can be disabled at compile time by defining which macro?",
          options: ["NDEBUG", "NOASSERT", "RELEASE", "DISABLE_ASSERT"],
          correctIndex: 0,
          explanation: "Compiling with -DNDEBUG defines the NDEBUG macro, which causes assert() to expand to nothing (no-op)."
        },
        {
          question: "Which header provides snprintf?",
          options: ["<string.h>", "<stdlib.h>", "<stdio.h>", "<snprintf.h>"],
          correctIndex: 2,
          explanation: "snprintf is a safe printf variant that writes to a string buffer with a size limit; it is declared in <stdio.h>."
        },
        {
          question: "What does memmove differ from memcpy?",
          options: [
            "memmove is slower and less safe",
            "memmove correctly handles overlapping source and destination regions",
            "memcpy handles overlaps; memmove does not",
            "They are identical"
          ],
          correctIndex: 1,
          explanation: "memmove handles overlapping regions correctly; memcpy has undefined behaviour when source and destination overlap."
        }
      ]
    },
    {
      id: "topic-5-10",
      title: "Debugging and Common Errors",
      estimatedReadingTime: 10,
      explanation: `Every programmer — beginner and expert alike — writes buggy code. Debugging is the skill of systematically finding and fixing those bugs. In C, this is particularly important because the language gives you enormous power but almost no safety nets: a bug that would be caught and reported as an exception in Python or Java might silently corrupt memory in C and only cause a visible crash much later, far from the actual mistake. Understanding the categories of bugs and the tools to find them is essential.

C bugs typically fall into several categories. Compilation errors are the easiest — the compiler refuses to build the code and points you to the line. Warnings from the compiler (-Wall -Wextra flags) often reveal subtle problems like using an uninitialised variable or comparing a signed and unsigned integer. Always treat warnings as errors until you understand them. Linker errors occur after compilation and usually mean a function is called but its implementation was not compiled or linked.

Runtime errors are trickier. A segmentation fault (segfault) means your program accessed memory it should not — a null pointer dereference, an out-of-bounds array access, or using a dangling pointer. An off-by-one error means your loop ran one iteration too many or too few, often manifesting as corrupted data. Integer overflow occurs when arithmetic exceeds the range of the integer type. Floating-point precision issues arise because not all decimal fractions can be represented exactly in binary.

The GNU debugger gdb is your most powerful tool. You compile with -g to include debug information, then run gdb ./yourprogram. Inside gdb, you set breakpoints with break main or break line_number, run the program with run, inspect variable values with print, step through code line by line with next or step, and see the current stack trace with backtrace. When a segfault occurs, typing backtrace in gdb immediately after shows you exactly which function and line caused it.

Valgrind's Memcheck tool detects memory errors that gdb might miss: uninitialised memory reads, reads/writes past the end of an allocation, memory leaks, and double frees. Run your program as "valgrind ./yourprog" and examine the output. Even a clean-running program may have hidden memory errors that Valgrind reveals. Combining compiler warnings (-Wall -Wextra -fsanitize=address), gdb, and Valgrind gives you a thorough debugging toolkit that can find nearly any C bug.`,
      codeExample: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Example demonstrating common bug patterns and how to fix them */

/* BUG 1: Off-by-one error (demonstrates the problem) */
void off_by_one_demo(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    /* WRONG: arr[5] is out of bounds */
    /* for (int i = 0; i <= 5; i++) printf("%d\\n", arr[i]); */

    /* CORRECT: loop from 0 to 4 */
    printf("Correct array access: ");
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\\n");
}

/* BUG 2: Null pointer check */
void null_pointer_demo(void) {
    int *p = malloc(sizeof(int));
    if (p == NULL) {
        fprintf(stderr, "malloc failed\\n");
        return;
    }
    *p = 42;
    printf("Value via pointer: %d\\n", *p);
    free(p);
    p = NULL;  /* prevent dangling pointer use */
    /* *p = 10;  <-- would be a bug here because p is NULL */
}

/* BUG 3: Unintialised variable */
void uninitialised_demo(void) {
    int x = 0;  /* CORRECT: explicitly initialised */
    /* int x;   <-- BUG: x has garbage value */
    x += 5;
    printf("Initialised x: %d\\n", x);
}

/* BUG 4: Integer overflow awareness */
void overflow_demo(void) {
    int big = 2147483647;  /* INT_MAX */
    printf("INT_MAX: %d\\n", big);
    /* big + 1 would overflow */
    long long big_l = (long long)big + 1;
    printf("After +1 as long long: %lld\\n", big_l);
}

/* BUG 5: String buffer safe usage */
void string_demo(void) {
    char buf[10];
    /* strcpy(buf, "this string is too long!"); <-- BUG: overflow */
    strncpy(buf, "hello", sizeof(buf) - 1);
    buf[sizeof(buf) - 1] = '\\0';  /* guarantee null termination */
    printf("Safe string: %s\\n", buf);
}

int main(void) {
    off_by_one_demo();
    null_pointer_demo();
    uninitialised_demo();
    overflow_demo();
    string_demo();
    return 0;
}`,
      expectedOutput: `Correct array access: 10 20 30 40 50 
Value via pointer: 42
Initialised x: 5
INT_MAX: 2147483647
After +1 as long long: 2147483648
Safe string: hello`,
      keyTakeaways: [
        "Always compile with -Wall -Wextra and treat warnings as errors to catch bugs early.",
        "Segfaults are caused by null pointer dereferences, out-of-bounds access, or dangling pointers.",
        "Off-by-one errors are among the most common bugs; double-check loop bounds and array indices.",
        "Use gdb to set breakpoints, step through code, and inspect variables at the point of failure.",
        "Valgrind detects memory leaks, uninitialised reads, out-of-bounds accesses, and double frees.",
        "Always initialise variables and check malloc return values to prevent undefined behaviour."
      ],
      commonMistakes: [
        "Ignoring compiler warnings — many warnings point directly to bugs that will cause runtime failures.",
        "Using array index i <= n instead of i < n — accesses one element past the end of the array.",
        "Forgetting to initialise local variables — they contain whatever bytes happened to be on the stack.",
        "Comparing floating-point numbers with == — use fabs(a-b) < EPSILON for approximate equality.",
        "Not enabling address sanitizer (-fsanitize=address) during development, which would catch many memory bugs instantly."
      ],
      bestPractices: [
        "Compile with: gcc -Wall -Wextra -g -fsanitize=address -o prog source.c during development.",
        "Use gdb to inspect the exact state of your program when a crash occurs; backtrace is the first command to run.",
        "Run Valgrind on your program even if it appears to work correctly — silent memory errors can corrupt data later.",
        "Write small, testable functions and test them individually before integrating them.",
        "Use meaningful variable names and add comments explaining non-obvious logic to make bugs more visible during code review."
      ],
      exercises: [
        {
          title: "Exercise 1 – Find and Fix the Bugs",
          description: "Given a program with three bugs (an off-by-one in a loop, an uninitialized variable, and a missing null-check after malloc), identify and fix each one. Write the corrected version.",
          hint: "Change 'i <= n' to 'i < n', initialise the variable before use, and add 'if (p == NULL) return 1;' after malloc."
        },
        {
          title: "Exercise 2 – gdb Practice",
          description: "Write a short program with a deliberate null pointer dereference. Compile it with -g, run it under gdb, let it crash, then type 'backtrace' to see the call stack. Record the file and line number gdb reports.",
          hint: "Set int *p = NULL; then access *p. In gdb: 'run', then after the crash, type 'bt' or 'backtrace'."
        },
        {
          title: "Exercise 3 – Valgrind Memory Leak",
          description: "Write a program that allocates memory in a loop 5 times without freeing it. Run it under Valgrind and read the leak summary. Then fix the leaks and verify Valgrind reports 'no leaks are possible'.",
          hint: "After each malloc, add a corresponding free before the loop ends or at program termination."
        }
      ],
      challenge: {
        title: "Challenge – Debug a Buggy Linked List",
        description: "You are given a linked list implementation with three intentional bugs: a missing free in delete causing a leak, an off-by-one that stops the traversal one node early, and a null check missing in the search function. Identify all three bugs using compiler warnings and Valgrind, then fix them and verify correctness.",
        hint: "Run with -fsanitize=address to catch the missing null check at runtime. Valgrind will report the leak. Trace the traversal carefully counting nodes to find the off-by-one."
      },
      quiz: [
        {
          question: "What does a segmentation fault typically indicate?",
          options: [
            "A syntax error in your C code",
            "Accessing memory the program is not allowed to use",
            "A failed malloc call",
            "An infinite loop"
          ],
          correctIndex: 1,
          explanation: "A segfault occurs when the program accesses memory outside its allowed regions, typically from null or dangling pointers."
        },
        {
          question: "Which compiler flags enable most useful warnings in GCC?",
          options: ["-debug -warnings", "-Wall -Wextra", "-verbose -strict", "-warn -all"],
          correctIndex: 1,
          explanation: "-Wall enables common warnings; -Wextra adds additional warnings beyond -Wall. Together they catch most obvious issues."
        },
        {
          question: "What is an off-by-one error?",
          options: [
            "An integer that is exactly one more or less than it should be, causing boundary mistakes",
            "A function with one too many arguments",
            "A loop that starts at 1 instead of 0",
            "Declaring one extra variable"
          ],
          correctIndex: 0,
          explanation: "Off-by-one errors involve boundary conditions: a loop running once too many/few, or array access at index n instead of n-1."
        },
        {
          question: "What is the first gdb command to run after a program crashes?",
          options: ["continue", "step", "backtrace", "print"],
          correctIndex: 2,
          explanation: "backtrace (or bt) shows the call stack at the point of the crash, telling you which function and line caused the fault."
        },
        {
          question: "What does Valgrind's Memcheck tool detect?",
          options: [
            "Syntax errors",
            "Memory leaks, uninitialised reads, and out-of-bounds accesses",
            "Logic errors in algorithms",
            "Slow functions"
          ],
          correctIndex: 1,
          explanation: "Valgrind Memcheck detects heap memory errors: leaks, use of uninitialised data, buffer overruns, and double frees."
        },
        {
          question: "What happens when you access arr[n] for an array of size n?",
          options: [
            "Returns 0 as a safe default",
            "Causes undefined behaviour (out-of-bounds access)",
            "Returns NULL",
            "Causes a compile error"
          ],
          correctIndex: 1,
          explanation: "Valid array indices are 0 to n-1. Accessing arr[n] reads one past the end, which is undefined behaviour."
        },
        {
          question: "What compiler flag enables the AddressSanitizer to detect memory errors at runtime?",
          options: ["-lasan", "-fsanitize=address", "-memcheck", "-address"],
          correctIndex: 1,
          explanation: "-fsanitize=address instruments the code to detect buffer overflows, use-after-free, and other memory errors at runtime."
        },
        {
          question: "Why is using an uninitialised variable dangerous?",
          options: [
            "It always causes a compile error",
            "It contains whatever random bytes were on the stack, leading to unpredictable behaviour",
            "It is automatically set to 0",
            "It makes the program run slower"
          ],
          correctIndex: 1,
          explanation: "Local variables in C are not zeroed automatically; they contain leftover stack data, which causes non-deterministic bugs."
        },
        {
          question: "Why should you not use == to compare floating-point numbers?",
          options: [
            "== is not valid for float in C",
            "Floating-point representation is inexact; mathematically equal values may differ by tiny rounding errors",
            "float comparison requires a cast",
            "== compares addresses, not values, for floats"
          ],
          correctIndex: 1,
          explanation: "Binary floating-point cannot represent all decimals exactly; instead compare with fabs(a-b) < EPSILON for near-equality."
        },
        {
          question: "What does the -g flag do when compiling with GCC?",
          options: [
            "Enables optimizations",
            "Includes debug symbols in the binary for use with gdb",
            "Links the math library",
            "Generates assembly output"
          ],
          correctIndex: 1,
          explanation: "-g embeds debugging information (symbol names, line numbers) into the binary so debuggers like gdb can map addresses to source lines."
        },
        {
          question: "A dangling pointer is one that:",
          options: [
            "Points to unallocated stack memory",
            "Points to memory that has already been freed",
            "Contains the NULL value",
            "Points past the end of an array"
          ],
          correctIndex: 1,
          explanation: "After free(p), p still holds the address but the memory may be reused; using p is a dangling pointer dereference."
        },
        {
          question: "What does 'double free' cause?",
          options: [
            "The memory is freed twice — perfectly safe",
            "Heap corruption and undefined behaviour, often leading to a crash",
            "A compile error",
            "The memory is zeroed automatically"
          ],
          correctIndex: 1,
          explanation: "Calling free twice on the same pointer corrupts the heap's internal bookkeeping, leading to crashes or security vulnerabilities."
        },
        {
          question: "What does integer overflow occur?",
          options: [
            "When you divide by zero",
            "When an arithmetic result exceeds the range of the integer type",
            "When you use a float instead of int",
            "When malloc returns NULL"
          ],
          correctIndex: 1,
          explanation: "Integer overflow wraps around (for unsigned) or causes undefined behaviour (for signed), leading to wrong values."
        },
        {
          question: "Which is the safest way to set a breakpoint in gdb at function main?",
          options: ["stop main", "break main", "halt main", "pause main"],
          correctIndex: 1,
          explanation: "In gdb, 'break main' (or 'b main') sets a breakpoint at the entry to the main function."
        },
        {
          question: "What does a linker error 'undefined reference to foo' mean?",
          options: [
            "foo has a syntax error",
            "foo was declared but its definition (implementation) was not compiled or linked",
            "foo's return type is wrong",
            "foo was defined twice"
          ],
          correctIndex: 1,
          explanation: "The compiler saw a call to foo (via its prototype), but the linker cannot find the actual compiled implementation to link."
        },
        {
          question: "What is the purpose of assert() during debugging?",
          options: [
            "To handle user errors gracefully",
            "To verify invariants and crash immediately with a message if one is violated",
            "To print debug messages",
            "To pause execution and wait for user input"
          ],
          correctIndex: 1,
          explanation: "assert(condition) aborts with a descriptive message if condition is false, helping you catch incorrect assumptions immediately."
        },
        {
          question: "What tool would you use to find which line of code caused a segfault?",
          options: ["Valgrind", "gdb with backtrace", "grep", "nm"],
          correctIndex: 1,
          explanation: "Running the program under gdb and typing 'backtrace' after it crashes shows the exact line and function call stack."
        },
        {
          question: "Which of the following avoids a buffer overflow when copying a string?",
          options: [
            "strcpy(buf, input);",
            "strncpy(buf, input, sizeof(buf) - 1); buf[sizeof(buf)-1] = '\\0';",
            "sprintf(buf, input);",
            "gets(buf);"
          ],
          correctIndex: 1,
          explanation: "strncpy with a size limit prevents writing past the buffer; setting the last byte to null ensures null-termination."
        },
        {
          question: "What is a memory leak?",
          options: [
            "Allocating less memory than needed",
            "Accessing memory after it is freed",
            "Allocated memory that is never freed, gradually consuming more RAM",
            "A pointer that points to stack memory"
          ],
          correctIndex: 2,
          explanation: "A memory leak occurs when malloc'd memory is never freed; over time the process consumes more and more memory."
        },
        {
          question: "What is the recommended development compile command for maximum bug detection?",
          options: [
            "gcc prog.c -o prog",
            "gcc -Wall -Wextra -g -fsanitize=address prog.c -o prog",
            "gcc -O3 prog.c -o prog",
            "gcc -quiet prog.c -o prog"
          ],
          correctIndex: 1,
          explanation: "-Wall -Wextra enables warnings, -g adds debug symbols, and -fsanitize=address catches memory errors at runtime."
        }
      ]
    },
    {
      id: "topic-5-11",
      title: "Best Practices and Writing Production-Quality C",
      estimatedReadingTime: 9,
      explanation: `Writing code that compiles and produces the right output is only the beginning. Production-quality C code must also be readable, maintainable, secure, and efficient. These qualities do not appear by accident — they are the result of deliberate habits, conventions, and practices that professional C programmers apply consistently.

Naming is one of the most impactful habits. Use descriptive names that convey purpose: count_active_users is far clearer than cau or n. Local variables in short functions can use concise names (i, n, p), but anything that lives beyond a few lines deserves a meaningful name. Use lowercase_with_underscores for functions and variables (the Unix/C convention), ALL_CAPS for constants and macros, and CamelCase or Prefix_CamelCase for typedef'd types if you prefer a distinction.

Error handling is critical in production code. Every function that can fail should communicate its failure to the caller — via a return value, an output pointer, or updating errno. Callers must check for failure and handle it appropriately, even if "handling" just means propagating the error upward. Never silently swallow errors. For functions with many possible error paths, consider a pattern where all resources are allocated at the start, and a single "cleanup" label at the end (reached with goto on error) frees everything.

Memory discipline is non-negotiable. Every malloc must have a corresponding free. Resources that are acquired — files, sockets, memory — must be released before the program exits or before an error return. A useful discipline is to always write the free/fclose immediately after writing the malloc/fopen, so you never forget it. Document in comments which function is responsible for freeing a pointer that is passed around.

Code that is not tested is broken code that has not been discovered yet. Write small unit tests for each function. A test is just a function that calls your function with known inputs and asserts the outputs match what you expect. Running the suite after every change gives you confidence that nothing is broken. Document your functions with brief comments explaining what they do, what they assume about their inputs (pre-conditions), and what they guarantee about their outputs (post-conditions). This documentation is the contract that lets teammates — and future you — use and modify the code safely.`,
      codeExample: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

/* Pre-condition: s is a non-NULL, null-terminated C string.
 * Post-condition: Returns a newly allocated copy of s,
 *                 or NULL if allocation fails.
 * Caller is responsible for freeing the returned pointer. */
char *str_dup(const char *s) {
    if (s == NULL) return NULL;
    size_t len = strlen(s) + 1;
    char *copy = (char *)malloc(len);
    if (copy == NULL) return NULL;
    memcpy(copy, s, len);
    return copy;
}

/* Pre-condition: arr non-NULL, n >= 0.
 * Post-condition: Returns the index of target in arr, or -1. */
int linear_search(const int *arr, int n, int target) {
    assert(arr != NULL);
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

/* Compute factorial iteratively; returns -1 for negative input */
long long factorial(int n) {
    if (n < 0) return -1;
    long long result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}

/* Simple unit tests */
void run_tests(void) {
    /* Test str_dup */
    char *copy = str_dup("hello");
    assert(copy != NULL);
    assert(strcmp(copy, "hello") == 0);
    free(copy);

    assert(str_dup(NULL) == NULL);

    /* Test linear_search */
    int arr[] = {5, 3, 8, 1, 9};
    assert(linear_search(arr, 5, 8) == 2);
    assert(linear_search(arr, 5, 7) == -1);

    /* Test factorial */
    assert(factorial(0) == 1);
    assert(factorial(5) == 120);
    assert(factorial(-1) == -1);

    printf("All tests passed.\\n");
}

int main(void) {
    run_tests();

    char *name = str_dup("Alice");
    if (name == NULL) {
        fprintf(stderr, "Memory allocation failed\\n");
        return 1;
    }
    printf("Greeting: Hello, %s!\\n", name);
    free(name);

    int data[] = {10, 20, 30, 40, 50};
    int idx = linear_search(data, 5, 30);
    printf("Search for 30: index %d\\n", idx);

    printf("5! = %lld\\n", factorial(5));

    return 0;
}`,
      expectedOutput: `All tests passed.
Greeting: Hello, Alice!
Search for 30: index 2
5! = 120`,
      keyTakeaways: [
        "Use descriptive names: lowercase_with_underscores for functions/variables, ALL_CAPS for macros.",
        "Check every error condition; never silently ignore failures from malloc, fopen, or other fallible functions.",
        "Write the corresponding free/fclose immediately after each malloc/fopen so you never forget it.",
        "Document functions with pre-conditions, post-conditions, and ownership of returned pointers.",
        "Write unit tests for every non-trivial function and run them after every change.",
        "Compile with full warnings and sanitizers during development; treat warnings as errors."
      ],
      commonMistakes: [
        "Using cryptic single-letter variable names everywhere — acceptable for loop indices but not for function parameters.",
        "Returning from a function early without freeing all previously allocated resources — creates leaks.",
        "Not documenting who is responsible for freeing a dynamically allocated return value.",
        "Writing code first and tests 'later' — later never comes; write tests alongside the code.",
        "Ignoring return values of functions that signal errors — checking is not optional."
      ],
      bestPractices: [
        "Follow a consistent coding style (indentation, brace placement) and use a formatter like clang-format.",
        "Use const on parameters that a function does not modify, to document intent and enable compiler optimisation.",
        "Prefer early return or goto cleanup to deeply nested if-else chains for error handling paths.",
        "Keep functions short and focused — a function that does one thing well is easier to test, understand, and reuse.",
        "Code review your own work by reading it aloud or explaining it to a rubber duck before submitting — this catches many obvious issues."
      ],
      exercises: [
        {
          title: "Exercise 1 – Refactor for Clarity",
          description: "Take a messy function with poor names, no error checks, and no comments. Rename all variables to be descriptive, add a malloc NULL check, and write a short comment block explaining what the function does, its parameters, and return value.",
          hint: "A good comment block: what the function does, each parameter's meaning, what is returned, and who frees any returned pointer."
        },
        {
          title: "Exercise 2 – Write Unit Tests",
          description: "Write a function int is_palindrome(const char *s) that returns 1 if s reads the same forwards and backwards. Then write at least 5 unit tests covering: empty string, single character, even-length palindrome, odd-length palindrome, and a non-palindrome.",
          hint: "Compare s[i] and s[len-1-i] for i from 0 to len/2-1. Use assert() for each test case."
        },
        {
          title: "Exercise 3 – Error Propagation",
          description: "Write a function that opens a file, reads its first integer, and returns it through an output parameter. The function should return 0 on success and -1 on failure (file not found or bad content). In main, check the return value and print either the integer or a meaningful error message.",
          hint: "Use an int* output parameter: 'int read_first_int(const char *filename, int *out)'. Return -1 and close the file on any failure path."
        }
      ],
      challenge: {
        title: "Challenge – Mini Library with Tests",
        description: "Design and implement a small string library in strlib.h and strlib.c providing: str_dup, str_trim (remove leading and trailing whitespace), str_split (split by delimiter returning an array of strings), and str_join (join an array of strings with a separator). Write a comprehensive test suite in test_strlib.c. All functions must do proper error checking and return values must be freed by the caller.",
        hint: "str_split should return a NULL-terminated array of char * pointers, with a count output parameter. str_join should malloc the total length. Document every function's ownership contract."
      },
      quiz: [
        {
          question: "What naming convention is standard in C for function and variable names?",
          options: ["camelCase", "PascalCase", "lowercase_with_underscores", "ALL_CAPS"],
          correctIndex: 2,
          explanation: "The dominant C convention (used by the standard library and Unix) is lowercase_with_underscores for functions and variables."
        },
        {
          question: "What naming convention is standard in C for macro constants?",
          options: ["camelCase", "lowercase", "ALL_CAPS_WITH_UNDERSCORES", "PascalCase"],
          correctIndex: 2,
          explanation: "Macros and constants are conventionally written in ALL_CAPS (e.g., MAX_SIZE, PI) to visually distinguish them from variables."
        },
        {
          question: "What is a pre-condition of a function?",
          options: [
            "Code that runs before main is called",
            "An assumption about the inputs that the caller must guarantee",
            "A variable declared before the function",
            "A header that must be included"
          ],
          correctIndex: 1,
          explanation: "A pre-condition is a requirement the caller must satisfy (e.g., 'pointer must not be NULL') for the function to behave correctly."
        },
        {
          question: "What is a post-condition of a function?",
          options: [
            "Code that runs after main exits",
            "A guarantee the function makes about its outputs when pre-conditions are met",
            "A comment at the bottom of the file",
            "A test run after deployment"
          ],
          correctIndex: 1,
          explanation: "A post-condition guarantees the function's output state, e.g., 'returns a null-terminated string the caller must free'."
        },
        {
          question: "What does 'const int *arr' as a function parameter communicate?",
          options: [
            "arr cannot be reassigned to point elsewhere",
            "The function will not modify the integers that arr points to",
            "arr is a constant pointer to a constant int",
            "arr must point to a global variable"
          ],
          correctIndex: 1,
          explanation: "const int *arr means the pointed-to integers are read-only within the function, documenting that the function does not modify them."
        },
        {
          question: "Why should functions be kept short and focused?",
          options: [
            "Short functions compile faster",
            "They are easier to understand, test, and reuse independently",
            "Compilers only optimise short functions",
            "Long functions cause stack overflows"
          ],
          correctIndex: 1,
          explanation: "A function that does one thing well is simpler to reason about, test in isolation, and reuse in other contexts."
        },
        {
          question: "What is the 'goto cleanup' pattern used for in C error handling?",
          options: [
            "Jumping to a loop label",
            "Branching to a single resource-release block when any error occurs",
            "Exiting the program immediately",
            "Skipping debug assertions"
          ],
          correctIndex: 1,
          explanation: "A cleanup label collects all resource-freeing code; goto jumps there on any error, ensuring resources are always released."
        },
        {
          question: "What is a unit test?",
          options: [
            "Testing the complete program from the command line",
            "A function that calls a single small function with known inputs and asserts expected outputs",
            "A test that runs on a different computer",
            "Measuring the program's speed"
          ],
          correctIndex: 1,
          explanation: "A unit test isolates one function, feeds it specific inputs, and uses assert to verify the output matches what is expected."
        },
        {
          question: "When should you write unit tests?",
          options: [
            "After the entire program is complete",
            "Only when bugs are found",
            "Alongside (or before) the code as you write each function",
            "Never — C programs don't need tests"
          ],
          correctIndex: 2,
          explanation: "Writing tests alongside code ensures each function is verified immediately; waiting until the end often means tests are never written."
        },
        {
          question: "What does 'ownership' of a pointer mean?",
          options: [
            "The pointer is stored in a global variable",
            "The responsibility for freeing the memory the pointer refers to",
            "A pointer declared with a special owner keyword",
            "Ownership is an OS-level concept, not a C concept"
          ],
          correctIndex: 1,
          explanation: "Ownership defines who is responsible for calling free on a pointer. Unclear ownership is a major source of memory leaks and double frees."
        },
        {
          question: "clang-format is used for:",
          options: [
            "Detecting memory leaks",
            "Automatically formatting C code to a consistent style",
            "Compiling C programs",
            "Linking object files"
          ],
          correctIndex: 1,
          explanation: "clang-format automatically reformats C code to enforce a chosen style (indentation, brace placement, spacing), eliminating style debates."
        },
        {
          question: "What is the best way to handle a malloc failure in a production function?",
          options: [
            "Proceed using a NULL pointer",
            "Call exit(1) immediately",
            "Return an error value and let the caller decide how to handle it",
            "Print a message and continue"
          ],
          correctIndex: 2,
          explanation: "Returning an error value preserves program control to the caller, which may log the error, retry, or cleanly shut down."
        },
        {
          question: "What does compiling with -Werror do?",
          options: [
            "Enables verbose error output",
            "Treats all warnings as errors, preventing compilation with any warning",
            "Enables runtime error detection",
            "Links the error-handling library"
          ],
          correctIndex: 1,
          explanation: "-Werror makes any warning a fatal error, forcing you to fix all warnings before the program can be compiled."
        },
        {
          question: "What does 'return early on error' mean?",
          options: [
            "Calling exit as soon as an error occurs",
            "Checking error conditions at the top of a function and returning immediately rather than nesting deeper",
            "Returning 0 for all errors",
            "Calling the function again with different arguments"
          ],
          correctIndex: 1,
          explanation: "Early return on error reduces nesting depth and makes the main (happy) path of the function easy to read at a glance."
        },
        {
          question: "A 'rubber duck debugging' session involves:",
          options: [
            "Submerging a circuit board in water",
            "Explaining your code line by line to an inanimate object (or colleague) to spot mistakes",
            "Running automated tests",
            "Using a specific debugger command"
          ],
          correctIndex: 1,
          explanation: "Explaining code aloud forces you to articulate every assumption, which often reveals the bug you missed while silently reading."
        },
        {
          question: "Why is it good practice to write the free() call immediately after malloc()?",
          options: [
            "It frees the memory immediately",
            "It ensures you never forget to free the memory later",
            "It helps the compiler optimize",
            "It prevents other functions from using the memory"
          ],
          correctIndex: 1,
          explanation: "Writing free right after malloc (as a habit) guarantees you set up the cleanup before writing the code that uses the memory."
        },
        {
          question: "What does 'const correctness' mean in C?",
          options: [
            "Only using constant literals in arithmetic",
            "Applying const to pointer parameters that should not be modified to document and enforce read-only access",
            "Declaring all global variables as const",
            "Using #define instead of variables"
          ],
          correctIndex: 1,
          explanation: "Const correctness means using const on parameters and pointers that are read-only, making intent explicit and enabling compiler checks."
        },
        {
          question: "What should a well-documented function's comment include?",
          options: [
            "Only the function's name",
            "What the function does, its parameters' meanings, its return value, and ownership of returned pointers",
            "The programmer's name and date",
            "A list of all other functions called by this one"
          ],
          correctIndex: 1,
          explanation: "Good documentation conveys the function's purpose, each parameter's role, what is returned, and any ownership/resource responsibilities."
        },
        {
          question: "What is the benefit of code review (reading code aloud or having a peer review it)?",
          options: [
            "It compiles the code more efficiently",
            "It catches logic errors, unclear naming, and missing error checks that the author overlooked",
            "It automatically generates test cases",
            "It removes the need for compiler warnings"
          ],
          correctIndex: 1,
          explanation: "Code review by a fresh pair of eyes catches assumptions, omissions, and logic errors that the original author cannot see because of familiarity bias."
        },
        {
          question: "Which of the following represents production-quality error handling for fopen?",
          options: [
            "FILE *f = fopen(name, 'r'); /* use f */",
            "FILE *f = fopen(name, 'r'); if (!f) { perror(name); return -1; }",
            "FILE *f = fopen(name, 'r'); if (f == 0) exit(0);",
            "FILE *f = fopen(name, 'r'); assert(f);"
          ],
          correctIndex: 1,
          explanation: "Checking for NULL, using perror to print a descriptive error, and returning an error code to the caller is the correct production pattern."
        }
      ]
    }
  ]
};
