
import React from "react";
import { Task } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

type TeamTimelineProps = {
  tasks?: Task[];
  projectId?: string;
};

const TeamTimeline: React.FC<TeamTimelineProps> = ({ tasks = [], projectId = "all" }) => {
  // Safely handle the tasks array
  const taskList = tasks || [];
  
  const projectTasks = projectId === "all" 
    ? taskList 
    : taskList.filter((task) => task.projectId === projectId);
  
  const chartData = projectTasks.map((task) => ({
    name: task.title,
    assignee: task.assignee.name,
    progress: task.status === "DONE" ? 100 : task.status === "REVIEW" ? 75 : task.status === "IN_PROGRESS" ? 50 : 0,
    start: new Date(task.dueDate).getTime() - 7 * 24 * 60 * 60 * 1000, // Mockup start date 1 week before due date
    end: new Date(task.dueDate).getTime(),
    taskId: task.id, // Include UUID for referencing
  }));

  const config = {
    tasks: {
      theme: {
        light: "hsl(var(--primary))",
        dark: "hsl(var(--primary))",
      },
    },
  };

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={config}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            barSize={20}
            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <p className="font-medium">{data.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Assigned to: {data.assignee}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Progress: {data.progress}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Task ID: {data.taskId}
                    </p>
                  </div>
                );
              }}
            />
            <Bar dataKey="progress" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default TeamTimeline;
