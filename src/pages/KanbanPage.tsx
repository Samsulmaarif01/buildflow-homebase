
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { TaskProvider } from "@/context/TaskContext";
import { projects } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const KanbanPage = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Kanban Board</h1>
          <p className="text-muted-foreground">
            Kelola dan lacak tugas Anda dengan papan Kanban.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filter by Project:</p>
          <Select
            value={selectedProjectId}
            onValueChange={(value) => setSelectedProjectId(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <TaskProvider>
          <KanbanBoard projectId={selectedProjectId} readOnly={false} />
        </TaskProvider>
      </div>
    </Layout>
  );
};

export default KanbanPage;
