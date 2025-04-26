
import React from "react";
import { Task } from "@/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

type TaskChartProps = {
  tasks: Task[];
  projectId: string;
};

const TaskChart: React.FC<TaskChartProps> = ({ tasks, projectId }) => {
  const projectTasks = tasks.filter((task) => task.projectId === projectId);
  
  const statusCounts = {
    "TO_DO": projectTasks.filter(task => task.status === "TO_DO").length,
    "IN_PROGRESS": projectTasks.filter(task => task.status === "IN_PROGRESS").length,
    "REVIEW": projectTasks.filter(task => task.status === "REVIEW").length,
    "DONE": projectTasks.filter(task => task.status === "DONE").length,
  };

  const chartData = [
    { name: "To Do", value: statusCounts["TO_DO"] },
    { name: "In Progress", value: statusCounts["IN_PROGRESS"] },
    { name: "Review", value: statusCounts["REVIEW"] },
    { name: "Done", value: statusCounts["DONE"] },
  ];

  const COLORS = [
    "hsl(var(--warning))",   // To Do
    "hsl(var(--primary))",   // In Progress
    "hsl(var(--secondary))", // Review
    "hsl(var(--success))",   // Done
  ];

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
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => 
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default TaskChart;
