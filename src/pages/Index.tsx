
import React, { useState } from "react";
import ProjectGrid from "@/components/dashboard/ProjectGrid";
import Layout from "@/components/layout/Layout";
import { useTaskContext } from "@/context/TaskContext";
import { TaskProvider } from "@/context/TaskContext";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // We need to wrap the component in TaskProvider to use the context
  return (
    <TaskProvider>
      <IndexContent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </TaskProvider>
  );
};

const IndexContent = ({ searchTerm, setSearchTerm }: { searchTerm: string, setSearchTerm: (term: string) => void }) => {
  const { projects, updateProjectsBasedOnTasks } = useTaskContext();
  
  const filteredProjects = searchTerm 
    ? projects.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : projects;

  // Count projects by status
  const totalProjects = projects.length;
  const inProgressProjects = projects.filter(p => p.status === "IN_PROGRESS").length;
  const completedProjects = projects.filter(p => p.status === "COMPLETED").length;
  
  return (
    <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Project Dashboard</h1>
          <p className="text-muted-foreground">
          Kelola dan pantau semua proyek konstruksi Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold text-primary">
              {totalProjects}
            </div>
            <p className="text-sm text-muted-foreground">Total Projects</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold text-amber-500">
              {inProgressProjects}
            </div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold text-emerald-500">
              {completedProjects}
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">
            {searchTerm ? `Search Results (${filteredProjects.length})` : 'Active Projects'}
          </h2>
          <ProjectGrid projects={filteredProjects} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
