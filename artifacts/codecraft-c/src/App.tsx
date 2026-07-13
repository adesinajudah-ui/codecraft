import { ThemeProvider } from "next-themes";
import { Route, Switch, Router as WouterRouter } from "wouter";
import Home from "@/pages/Home";
import TopicPage from "@/pages/TopicPage";
import Certificate from "@/pages/Certificate";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lesson/:lessonId/topic/:topicId" component={TopicPage} />
      <Route path="/certificate" component={Certificate} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </ThemeProvider>
  );
}

export default App;
