import type { Lesson, Topic } from "./types";
import { cssBasicsLesson } from "./lessons/lesson1";
import { cssSelectorsLesson } from "./lessons/lesson2";
import { cssStylingLesson } from "./lessons/lesson3";
import { cssLayoutLesson } from "./lessons/lesson4";
import { cssProfessionalLesson } from "./lessons/lesson5";

export const courseData: Lesson[] = [
  cssBasicsLesson,
  cssSelectorsLesson,
  cssStylingLesson,
  cssLayoutLesson,
  cssProfessionalLesson,
];

export interface FlatTopic {
  lessonId: string;
  lessonTitle: string;
  topicId: string;
  topicTitle: string;
  topic: Topic;
}

export const flatTopics: FlatTopic[] = courseData.flatMap((lesson) =>
  lesson.topics.map((topic) => ({
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    topicId: topic.id,
    topicTitle: topic.title,
    topic,
  })),
);

export function getPrevTopic(lessonId: string, topicId: string): FlatTopic | null {
  const index = flatTopics.findIndex((t) => t.lessonId === lessonId && t.topicId === topicId);
  if (index <= 0) return null;
  return flatTopics[index - 1];
}

export function getNextTopic(lessonId: string, topicId: string): FlatTopic | null {
  const index = flatTopics.findIndex((t) => t.lessonId === lessonId && t.topicId === topicId);
  if (index === -1 || index === flatTopics.length - 1) return null;
  return flatTopics[index + 1];
}
