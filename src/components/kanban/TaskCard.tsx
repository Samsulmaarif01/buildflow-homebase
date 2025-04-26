
import React from "react";
import { Task } from "@/types";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type TaskCardProps = {
  task: Task;
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="card-hover mb-2 rounded-md border border-border bg-card p-3 shadow-sm">
      <h4 className="font-medium">{task.title}</h4>
      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
        {task.description}
      </p>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">
              {task.assignee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs">{task.assignee.name}</span>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{format(new Date(task.dueDate), "MMM d")}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
