import { useGetCourse, useGetUserProgress, getGetCourseQueryKey, getGetUserProgressQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Circle, ArrowLeft, PlayCircle, Trophy } from "lucide-react";

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
    return <div className="p-8 text-center text-muted-foreground">Course not found</div>;
  }

  const completedLessonIds = new Set(progress?.filter(p => p.completed).map(p => p.lessonId));
  const progressPercent = course.lessons.length > 0 
    ? (course.lessons.filter(l => completedLessonIds.has(l.id)).length / course.lessons.length) * 100 
    : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/learn">
        <Button variant="ghost" size="sm" className="mb-6 -ml-3 text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to courses
        </Button>
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full uppercase tracking-wider">
            {course.level}
          </span>
          <span className="flex items-center text-sm font-mono text-primary">
            <Trophy className="w-4 h-4 mr-1" />
            {course.xpReward} XP total
          </span>
        </div>
        <h1 className="text-4xl font-bold font-mono tracking-tight mb-4">{course.title}</h1>
        <p className="text-lg text-muted-foreground">{course.description}</p>
        
        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 max-w-md h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="text-sm font-medium text-muted-foreground">{Math.round(progressPercent)}% complete</span>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
        {course.lessons.map((lesson, idx) => {
          const isCompleted = completedLessonIds.has(lesson.id);
          return (
            <Card key={lesson.id} className={`transition-colors ${isCompleted ? 'bg-secondary/20' : ''}`}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  )}
                  <div>
                    <div className="font-medium text-lg">
                      {idx + 1}. {lesson.title}
                    </div>
                    <div className="text-sm font-mono text-muted-foreground">
                      {lesson.xpReward} XP
                    </div>
                  </div>
                </div>
                <Link href={`/learn/${course.id}/lesson/${lesson.id}`}>
                  <Button variant={isCompleted ? "outline" : "default"}>
                    {isCompleted ? "Review" : "Start"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-4">
        <Link href={`/quiz/${course.id}`}>
          <Button variant="secondary" className="w-full sm:w-auto" size="lg">
            <PlayCircle className="w-5 h-5 mr-2" />
            Take Solo Quiz
          </Button>
        </Link>
        <Link href={`/quiz/${course.id}/multiplayer`}>
          <Button variant="outline" className="w-full sm:w-auto" size="lg">
            <PlayCircle className="w-5 h-5 mr-2" />
            Multiplayer Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
}
