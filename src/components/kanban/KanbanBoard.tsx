import React from "react";
import { Task } from "@/types";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskChart from "./TaskChart";
import TeamTimeline from "./TeamTimeline";

type KanbanColumnProps = {
  title: string;
  tasks: Task[];
  color: string;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, color }) => {
  return (
    <div className="flex h-full min-w-[280px] flex-col rounded-lg border border-border bg-secondary/30">
      <div className="flex items-center justify-between border-b border-border p-3">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${color}`}></div>
          <h3 className="font-medium">{title}</h3>
          <span className="rounded-full bg-secondary px-2 text-xs font-medium">
            {tasks.length}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add task</span>
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

type KanbanBoardProps = {
  tasks: Task[];
  projectId: string;
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks = [], projectId = "all" }) => {
  const filteredTasks = projectId === "all" 
    ? tasks 
    : tasks.filter((task) => task.projectId === projectId);
  
  const columns = [
    {
      id: "TO_DO",
      title: "To Do",
      color: "bg-status-todo",
      tasks: filteredTasks.filter(task => task.status === "TO_DO"),
    },
    {
      id: "IN_PROGRESS",
      title: "In Progress",
      color: "bg-status-progress",
      tasks: filteredTasks.filter(task => task.status === "IN_PROGRESS"),
    },
    {
      id: "REVIEW",
      title: "Review",
      color: "bg-status-review",
      tasks: filteredTasks.filter(task => task.status === "REVIEW"),
    },
    {
      id: "DONE",
      title: "Done",
      color: "bg-status-done",
      tasks: filteredTasks.filter(task => task.status === "DONE"),
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Kanban Board</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex h-[500px] gap-4 overflow-x-auto p-4">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                title={column.title}
                tasks={column.tasks}
                color={column.color}
              />
            ))}
            
            <div className="flex h-full min-w-[280px] flex-col rounded-lg border border-dashed border-muted items-center justify-center">
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Column
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamTimeline tasks={filteredTasks} projectId={projectId} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Task Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskChart tasks={filteredTasks} projectId={projectId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default KanbanBoard;
