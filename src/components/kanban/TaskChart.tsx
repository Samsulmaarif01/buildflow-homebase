
import React from "react";
import { Task } from "@/types";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type TaskChartProps = {
  tasks: Task[];
  projectId?: string;
};

const TaskChart: React.FC<TaskChartProps> = ({ tasks }) => {
  const taskStatusCount = tasks.reduce((acc, task) => {
    const status = task.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = [
    { name: "To Do", value: taskStatusCount["TO_DO"] || 0 },
    { name: "In Progress", value: taskStatusCount["IN_PROGRESS"] || 0 },
    { name: "Review", value: taskStatusCount["REVIEW"] || 0 },
    { name: "Done", value: taskStatusCount["DONE"] || 0 },
  ];

  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" className="fill-primary" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskChart;
