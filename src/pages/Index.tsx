
import React from "react";
import { projects } from "@/data/mockData";
import ProjectGrid from "@/components/dashboard/ProjectGrid";
import Layout from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Project Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your construction projects
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold text-primary">
              {projects.length}
            </div>
            <p className="text-sm text-muted-foreground">Total Projects</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold text-amber-500">
              {projects.filter(p => p.status === "IN_PROGRESS").length}
            </div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold text-emerald-500">
              {projects.filter(p => p.status === "COMPLETED").length}
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">Active Projects</h2>
          <ProjectGrid projects={projects} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
