import type { Lesson } from "./types";
import { lesson1 } from "./lesson1";
import { lesson2 } from "./lesson2";
import { lesson3 } from "./lesson3";
import { lesson4 } from "./lesson4";
import { lesson5 } from "./lesson5";

export type { Lesson, Topic, Exercise, QuizQuestion } from "./types";

export const courseData: Lesson[] = [lesson1, lesson2, lesson3, lesson4, lesson5];

export const flatTopics = courseData.flatMap((lesson) =>
  lesson.topics.map((topic, topicIndex) => ({
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    lessonIndex: courseData.findIndex((l) => l.id === lesson.id),
    topicId: topic.id,
    topicTitle: topic.title,
    topicIndex,
    totalTopicsInLesson: lesson.topics.length,
    topic,
  })),
);

export const totalTopicCount = flatTopics.length;

export const getNextTopic = (lessonId: string, topicId: string) => {
  const currentIndex = flatTopics.findIndex((t) => t.lessonId === lessonId && t.topicId === topicId);
  if (currentIndex === -1 || currentIndex === flatTopics.length - 1) return null;
  return flatTopics[currentIndex + 1];
};

export const getPrevTopic = (lessonId: string, topicId: string) => {
  const currentIndex = flatTopics.findIndex((t) => t.lessonId === lessonId && t.topicId === topicId);
  if (currentIndex <= 0) return null;
  return flatTopics[currentIndex - 1];
};
