
import React from "react";
import Layout from "@/components/layout/Layout";
import TeamTimeline from "@/components/kanban/TeamTimeline";
import { TaskProvider } from "@/context/TaskContext";
import { useTaskContext } from "@/context/TaskContext";

const TimelineContent = () => {
  const { tasks } = useTaskContext();
  const defaultProjectId = "all";
  
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <TeamTimeline tasks={tasks} projectId={defaultProjectId} />
    </div>
  );
};

const TimelinePage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Project Timeline</h1>
          <p className="text-muted-foreground">
          Lihat dan lacak kemajuan proyek di seluruh tim.
          </p>
        </div>
        
        <TaskProvider>
          <TimelineContent />
        </TaskProvider>
      </div>
    </Layout>
  );
};

export default TimelinePage;
