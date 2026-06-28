import { Show, useClerk } from "@clerk/react";
import { Link, Redirect } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { signOut } = useClerk();

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <header className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="CodeCraft Logo" className="w-8 h-8" />
          <span className="text-xl font-bold font-mono tracking-tight text-primary">CodeCraft</span>
        </div>
        <div className="flex items-center gap-4">
          <Show when="signed-in">
            <Link href="/dashboard">
              <Button variant="secondary">Dashboard</Button>
            </Link>
            <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
          </Show>
          <Show when="signed-out">
            <Link href="/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Start Coding</Button>
            </Link>
          </Show>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Master code. <br />
          <span className="text-primary">Build the future.</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
          CodeCraft is the ultimate programming education platform. Learn HTML, CSS, JavaScript, Java, C, and Python.
          Compete on the leaderboard, take quizzes, and level up your skills.
        </p>
        
        <Show when="signed-out">
          <Link href="/sign-up">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full font-mono">
              Initialize Journey
            </Button>
          </Link>
        </Show>
        <Show when="signed-in">
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full font-mono">
              Continue Journey
            </Button>
          </Link>
        </Show>
      </main>
    </div>
  );
}
