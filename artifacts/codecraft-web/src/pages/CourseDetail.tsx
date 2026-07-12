import { useGetCourse, useGetUserProgress, getGetCourseQueryKey, getGetUserProgressQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, Circle, ArrowLeft, PlayCircle, Trophy, Lock, Coins } from "lucide-react";

export default function CourseDetail() {
  const { courseId } = useParams();
  const id = parseInt(courseId || "0", 10);

  const { data: course, isLoading: isLoadingCourse } = useGetCourse(id, {
    query: { enabled: !!id, queryKey: getGetCourseQueryKey(id) }
  });

  const { data: progress, isLoading: isLoadingProgress } = useGetUserProgress();

  if (isLoadingCourse || isLoadingProgress) {
    return (
      <div className="flex h-full items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return <div className="p-4 text-center text-muted-foreground">Course not found</div>;
  }

  const completedLessonIds = new Set(progress?.filter(p => p.completed).map(p => p.lessonId));
  const progressPercent = course.lessons.length > 0
    ? (course.lessons.filter(l => completedLessonIds.has(l.id)).length / course.lessons.length) * 100
    : 0;

  return (
    <div className="p-4">
      <Link href="/learn">
        <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground h-8">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back
        </Button>
      </Link>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full uppercase tracking-wider">
            {course.level}
          </span>
          <span className="flex items-center text-xs font-mono text-primary">
            <Trophy className="w-3.5 h-3.5 mr-1" />
            {course.xpReward} XP
          </span>
        </div>
        <h1 className="text-2xl font-bold font-mono tracking-tight mb-2">{course.title}</h1>
        <p className="text-sm text-muted-foreground">{course.description}</p>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{Math.round(progressPercent)}% done</span>
        </div>
      </div>

      <h2 className="text-base font-semibold mb-3">Lessons</h2>
      <div className="space-y-2 mb-6">
        {course.lessons.map((lesson, idx) => {
          const isCompleted = completedLessonIds.has(lesson.id);
          const isPremium = (lesson as any).isPremium;
          return (
            <Card key={lesson.id} className={`transition-colors ${isCompleted ? "bg-secondary/20" : ""}`}>
              <CardContent className="p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : isPremium ? (
                    <Lock className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate flex items-center gap-1.5">
                      {idx + 1}. {lesson.title}
                      {isPremium && (
                        <Badge variant="outline" className="border-yellow-500/40 text-yellow-500 text-[10px] gap-0.5 px-1.5 py-0">
                          <Coins className="w-2.5 h-2.5" />{(lesson as any).coinCost}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {lesson.xpReward} XP
                    </div>
                  </div>
                </div>
                <Link href={`/learn/${course.id}/lesson/${lesson.id}`} className="flex-shrink-0">
                  <Button size="sm" variant={isCompleted ? "outline" : "default"} className="h-8 text-xs px-3">
                    {isCompleted ? "Review" : isPremium ? "Unlock" : "Start"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Link href={`/quiz/${course.id}`} className="flex-1">
          <Button variant="secondary" className="w-full gap-2" size="sm">
            <PlayCircle className="w-4 h-4" />
            Solo Quiz
          </Button>
        </Link>
        <Link href={`/quiz/${course.id}/multiplayer`} className="flex-1">
          <Button variant="outline" className="w-full gap-2" size="sm">
            <PlayCircle className="w-4 h-4" />
            Multiplayer
          </Button>
        </Link>
      </div>
    </div>
  );
}
