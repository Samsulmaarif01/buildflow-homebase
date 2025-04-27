
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectView from "./pages/ProjectView";
import NotFound from "./pages/NotFound";
import KanbanPage from "./pages/KanbanPage";
import TimelinePage from "./pages/TimelinePage";
import TeamPage from "./pages/TeamPage";
import FilesPage from "./pages/FilesPage";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/project/:id" element={<ProjectView />} />
            <Route path="/kanban" element={<KanbanPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
