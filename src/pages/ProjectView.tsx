
import React from "react";
import { useParams } from "react-router-dom";
import { projects, discussions } from "@/data/mockData";
import Layout from "@/components/layout/Layout";
import ProjectDetail from "@/components/project/ProjectDetail";
import DiscussionForum from "@/components/forum/DiscussionForum";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TaskProvider } from "@/context/TaskContext";

const ProjectView = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the project by UUID
  const project = projects.find((p) => p.id === id);
  
  // Filter related data by project UUID
  const projectDiscussions = discussions.filter((d) => d.projectId === id);

  if (!project) {
    return (
      <Layout>
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <p className="text-muted-foreground">
          Proyek yang Anda cari tidak ada atau telah dihapus.
          </p>
          <Button asChild className="mt-4">
            <Link to="/">Go back to dashboard</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <ProjectDetail project={project} />
        </div>

        <Tabs defaultValue="kanban">
          <TabsList>
            <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>
          <TabsContent value="kanban" className="mt-4">
            <TaskProvider>
              <KanbanBoard projectId={project.id} readOnly={true} />
            </TaskProvider>
          </TabsContent>
          <TabsContent value="discussion" className="mt-4">
            <DiscussionForum discussions={projectDiscussions} projectId={project.id} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProjectView;
