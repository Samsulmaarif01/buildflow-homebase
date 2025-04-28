
import React from "react";
import { Task } from "@/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

type TaskChartProps = {
  tasks: Task[];
  // Added projectId prop that was being passed but not defined in the interface
  projectId?: string;
};

const TaskChart: React.FC<TaskChartProps> = ({ tasks }) => {
  // Count tasks by status
  const statusCounts = tasks.reduce((counts, task) => {
    const status = task.status;
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  // Ensure all statuses are represented
  statusCounts["TO_DO"] = statusCounts["TO_DO"] || 0;
  statusCounts["IN_PROGRESS"] = statusCounts["IN_PROGRESS"] || 0;
  statusCounts["REVIEW"] = statusCounts["REVIEW"] || 0;
  statusCounts["DONE"] = statusCounts["DONE"] || 0;

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
      type: "donut",
      height: "100%",
      width: "100%",
      color: "indigo",
      animated: true,
    },
  };

  // Check if there's any data to display
  const hasData = chartDataWithPercentages.some(item => item.value > 0);

  if (!hasData) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center text-center text-muted-foreground">
        No tasks available
      </div>
    );
  }

  // Custom rendering component for external labels
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value } = props;
    if (value === 0) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        key={`label-${index}`}
        x={x} 
        y={y} 
        fill="#000000" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs"
      >
        {`${name} ${percent}%`}
      </text>
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
              formatter={(value, name) => [`${value} tasks`, name]}
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
