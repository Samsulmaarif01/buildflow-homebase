
import React from "react";
import Layout from "@/components/layout/Layout";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { TaskProvider } from "@/context/TaskContext";

const KanbanPage = () => {
  // Using a default projectId for displaying all tasks in Kanban view
  const defaultProjectId = "all";
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Kanban Board</h1>
          <p className="text-muted-foreground">
            Manage and track your tasks with the kanban board
          </p>
        </div>
        
        <TaskProvider>
          <KanbanBoard projectId={defaultProjectId} />
        </TaskProvider>
      </div>
    </Layout>
  );
};

export default KanbanPage;
