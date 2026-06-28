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
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-mono tracking-tight mb-2">Course Catalog</h1>
          <p className="text-muted-foreground">Select a language to browse available courses.</p>
        </div>
        
        <div className="w-full md:w-64">
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
      </div>

      {!selectedSlug && !isLoadingLangs && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-16 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Choose a Language</h3>
            <p className="text-muted-foreground max-w-md">
              Select a programming language from the dropdown above to view courses.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-secondary rounded-full">
                      {course.level}
                    </span>
                    <span className="text-xs font-mono text-primary">
                      {course.xpReward} XP
                    </span>
                  </div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-sm text-muted-foreground">
                    {course.lessonCount} lessons
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/learn/${course.id}`} className="w-full">
                    <Button className="w-full">View Course</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {courses && courses.length === 0 && (
        <div className="text-center p-12 text-muted-foreground">
          No courses found for this language yet.
        </div>
      )}
    </div>
  );
}
