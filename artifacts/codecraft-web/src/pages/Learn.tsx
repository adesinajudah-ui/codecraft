import { useState } from "react";
import { useListLanguages, useListCoursesByLanguage, getListCoursesByLanguageQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, Loader2 } from "lucide-react";

export default function Learn() {
  const { data: languages, isLoading: isLoadingLangs } = useListLanguages();
  const [selectedSlug, setSelectedSlug] = useState<string>("");

  const { data: courses, isLoading: isLoadingCourses } = useListCoursesByLanguage(selectedSlug, {
    query: {
      enabled: !!selectedSlug,
      queryKey: getListCoursesByLanguageQueryKey(selectedSlug)
    }
  });

  return (
    <div className="p-4">
      <div className="mb-5">
        <h1 className="text-xl font-bold font-mono tracking-tight mb-1">Course Catalog</h1>
        <p className="text-muted-foreground text-sm">Select a language to browse courses.</p>
      </div>

      <div className="mb-5">
        <Select
          value={selectedSlug}
          onValueChange={setSelectedSlug}
          disabled={isLoadingLangs}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            {languages?.map(lang => (
              <SelectItem key={lang.slug} value={lang.slug}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!selectedSlug && !isLoadingLangs && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <BookOpen className="w-10 h-10 text-muted-foreground mb-3" />
            <h3 className="text-base font-medium mb-1">Choose a Language</h3>
            <p className="text-muted-foreground text-sm">
              Select a language above to view courses.
            </p>
          </CardContent>
        </Card>
      )}

      {isLoadingCourses && (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {courses && courses.length > 0 && (
        <div className="space-y-3">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card className="hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold px-2 py-0.5 bg-secondary rounded-full">
                      {course.level}
                    </span>
                    <span className="text-xs font-mono text-primary">
                      {course.xpReward} XP
                    </span>
                  </div>
                  <CardTitle className="text-base">{course.title}</CardTitle>
                  <CardDescription className="text-xs line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-2">
                  <div className="text-xs text-muted-foreground">
                    {course.lessonCount} lessons
                  </div>
                </CardContent>
                <CardFooter className="px-4 pb-4">
                  {selectedSlug === "html" ? (
                    <a href="/html-course/" className="w-full">
                      <Button className="w-full" size="sm">View Course</Button>
                    </a>
                  ) : selectedSlug === "css" ? (
                    <a href="/css-course/" className="w-full">
                      <Button className="w-full" size="sm">View Course</Button>
                    </a>
                  ) : (
                    <Link href={`/learn/${course.id}`} className="w-full">
                      <Button className="w-full" size="sm">View Course</Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {courses && courses.length === 0 && (
        <div className="text-center p-12 text-muted-foreground text-sm">
          No courses found for this language yet.
        </div>
      )}
    </div>
  );
}
