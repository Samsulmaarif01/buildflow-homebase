
import React, { useState } from "react";
import { projects } from "@/data/mockData";
import ProjectGrid from "@/components/dashboard/ProjectGrid";
import Layout from "@/components/layout/Layout";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectsList, setProjectsList] = useState(projects);
  
  const filteredProjects = searchTerm 
    ? projectsList.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : projectsList;

  // Function to add a new project to the list
  const handleAddProject = (newProject: any) => {
    setProjectsList(prev => [...prev, newProject]);
  };
  
  return (
    <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm} onProjectAdd={handleAddProject}>
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
              {projectsList.length}
            </div>
            <p className="text-sm text-muted-foreground">Total Projects</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold text-amber-500">
              {projectsList.filter(p => p.status === "IN_PROGRESS").length}
            </div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold text-emerald-500">
              {projectsList.filter(p => p.status === "COMPLETED").length}
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
