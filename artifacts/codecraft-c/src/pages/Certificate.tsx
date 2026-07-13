import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Award, ArrowLeft, Download } from "lucide-react";
import { totalTopicCount } from "@/data/courseData";
import { getCompletedCount, getLearnerName, setLearnerName } from "@/data/progress";

export default function Certificate() {
  const [name, setName] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const [issuedDate, setIssuedDate] = useState("");

  useEffect(() => {
    setName(getLearnerName());
    setCompletedCount(getCompletedCount());
    setIssuedDate(
      new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
    );
  }, []);

  const allComplete = completedCount >= totalTopicCount && totalTopicCount > 0;

  const handleNameChange = (value: string) => {
    setName(value);
    setLearnerName(value);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Course
        </Link>

        {!allComplete ? (
          <div className="bg-card border border-border rounded-xl p-10 text-center space-y-3">
            <Award className="w-10 h-10 mx-auto text-muted-foreground" />
            <h1 className="text-xl font-bold">Certificate Locked</h1>
            <p className="text-muted-foreground">
              Complete all {totalTopicCount} topics to unlock your CodeCraft C certificate. You've finished{" "}
              {completedCount} / {totalTopicCount} so far.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
              <input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter your full name"
                className="flex-1 w-full px-4 py-2 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="input-learner-name"
              />
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                data-testid="btn-download-certificate"
              >
                <Download className="w-4 h-4" /> Save / Print
              </button>
            </div>

            <div
              className="relative bg-card border-4 border-primary/40 rounded-2xl p-12 text-center overflow-hidden"
              data-testid="certificate-card"
            >
              <div className="absolute inset-4 border border-primary/20 rounded-xl pointer-events-none" />
              <Award className="w-16 h-16 mx-auto text-primary mb-4" />
              <p className="uppercase tracking-[0.3em] text-xs text-muted-foreground mb-2">Certificate of Completion</p>
              <h1 className="text-2xl md:text-3xl font-bold mb-6">CodeCraft — The C Programming Course</h1>
              <p className="text-sm text-muted-foreground">This certifies that</p>
              <p className="text-3xl md:text-4xl font-serif font-bold text-primary my-4 min-h-[3rem]">
                {name || "Your Name"}
              </p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                has successfully completed all {totalTopicCount} topics across 5 lessons of the CodeCraft C
                Programming course, covering everything from variables and control flow to pointers, data
                structures, and dynamic memory management.
              </p>
              <p className="text-xs text-muted-foreground mt-8">Issued on {issuedDate}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
