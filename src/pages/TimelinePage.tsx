
import React from "react";
import Layout from "@/components/layout/Layout";
import TeamTimeline from "@/components/kanban/TeamTimeline";
import { tasks } from "@/data/mockData";

const TimelinePage = () => {
  // Using a default projectId for displaying all tasks in Timeline view
  const defaultProjectId = "all";
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Project Timeline</h1>
          <p className="text-muted-foreground">
            View and track project progress across the team
          </p>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-4">
          <TeamTimeline tasks={tasks} projectId={defaultProjectId} />
        </div>
      </div>
    </Layout>
  );
};

export default TimelinePage;
