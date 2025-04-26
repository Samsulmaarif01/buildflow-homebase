
import React from "react";
import Layout from "@/components/layout/Layout";
import KanbanBoard from "@/components/kanban/KanbanBoard";

const KanbanPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Kanban Board</h1>
          <p className="text-muted-foreground">
            Manage and track your tasks with the kanban board
          </p>
        </div>
        
        <KanbanBoard />
      </div>
    </Layout>
  );
};

export default KanbanPage;
