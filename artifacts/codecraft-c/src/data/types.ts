export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface Exercise {
  title: string;
  description: string;
  hint: string;
}

export interface Topic {
  id: string;
  title: string;
  /** Minutes, used to show "X min read" on the topic page. */
  estimatedReadingTime: number;
  explanation: string;
  codeExample: string;
  /** What the codeExample prints when compiled & run — shown as a static "Expected Output" panel (not a live compiler). */
  expectedOutput: string;
  keyTakeaways: string[];
  commonMistakes: string[];
  bestPractices: string[];
  exercises: Exercise[];
  challenge: Exercise;
  quiz: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}
