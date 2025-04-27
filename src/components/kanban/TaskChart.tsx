
import React from "react";
import { Task } from "@/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Tooltip } from "recharts";
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
    { name: "To Do", value: statusCounts["TO_DO"], color: "#000000" }, // Black
    { name: "In Progress", value: statusCounts["IN_PROGRESS"], color: "#2563EB" }, // Blue
    { name: "Review", value: statusCounts["REVIEW"], color: "#93c5fd" }, // Light blue
    { name: "Done", value: statusCounts["DONE"], color: "#86efac" }, // Green
  ];

  // Calculate percentages for each status
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const chartDataWithPercentages = chartData.map(item => ({
    ...item,
    percent: total > 0 ? Math.round((item.value / total) * 100) : 0
  }));

  const config = {
    tasks: {
      theme: {
        light: "hsl(var(--primary))",
        dark: "hsl(var(--primary))",
      },
    },
  };

  // Check if there's any data to display
  const hasData = chartDataWithPercentages.some(item => item.value > 0);

  if (!hasData) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">No task data available</p>
      </div>
    );
  }

  // Custom rendering component for external labels
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
    if (value === 0) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <>
        <text 
          x={x} 
          y={y} 
          fill="#000000" 
          textAnchor={x > cx ? 'start' : 'end'} 
          dominantBaseline="central"
          className="text-xs"
        >
          {`${name} ${percent}%`}
        </text>
      </>
    );
  };

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={config}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartDataWithPercentages}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={renderCustomizedLabel}
              labelLine={{ stroke: "#CCCCCC", strokeWidth: 0.5 }}
              startAngle={90}
              endAngle={-270}
            >
              {chartDataWithPercentages.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => [`${value} tasks`, name]}
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                padding: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default TaskChart;
