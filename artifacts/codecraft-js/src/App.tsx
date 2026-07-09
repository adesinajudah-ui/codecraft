import { Switch, Route, Router as WouterRouter, Link } from 'wouter';
import { ThemeProvider } from 'next-themes';
import Home from './pages/Home';
import TopicPage from './pages/TopicPage';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lesson/:lessonId/topic/:topicId">
        {(params) => (
          <TopicPage
            lessonId={params.lessonId ?? ''}
            topicId={params.topicId ?? ''}
          />
        )}
      </Route>
      <Route>
        <div className="min-h-dvh flex flex-col items-center justify-center gap-4 bg-background p-8">
          <h1 className="text-xl font-bold text-foreground">Page Not Found</h1>
          <Link href="/" className="text-primary hover:underline text-sm">
            Return to Course Home
          </Link>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WouterRouter base={base}>
        <Router />
      </WouterRouter>
    </ThemeProvider>
  );
}

export default App;
