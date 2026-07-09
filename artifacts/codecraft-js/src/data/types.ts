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
  explanation: string;
  jsExample: string;
  exercises: Exercise[];
  quiz: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  topics: Topic[];
}
