
import React, { useState } from "react";
import { Task } from "@/types";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskChart from "./TaskChart";
import TeamTimeline from "./TeamTimeline";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTaskContext } from "@/context/TaskContext";
import NewTaskDialog from "./NewTaskDialog";

type KanbanColumnProps = {
  title: string;
  tasks: Task[];
  color: string;
  columnId: string;
  projectId: string;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  title, 
  tasks, 
  color, 
  columnId,
  projectId
}) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  
  // Default assignee for new tasks (using first team member in this column or default)
  const defaultAssignee = tasks.length > 0 
    ? tasks[0].assignee
    : { id: "default", name: "Team Member", role: "Developer" };

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
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => setIsAddTaskOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add task</span>
        </Button>
      </div>
      
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div 
            className="flex-1 overflow-y-auto p-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <NewTaskDialog 
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        projectId={projectId}
        status={columnId}
        assigneeId={defaultAssignee.id}
        assigneeName={defaultAssignee.name}
        assigneeRole={defaultAssignee.role}
      />
    </div>
  );
};

type KanbanBoardProps = {
  tasks?: Task[];
  projectId?: string;
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ projectId = "all" }) => {
  const { tasks: allTasks, moveTask } = useTaskContext();
  
  // Safely handle the tasks array to prevent the filter error
  const taskList = allTasks || [];
  
  const filteredTasks = projectId === "all" 
    ? taskList 
    : taskList.filter((task) => task.projectId === projectId);
  
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

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the item was dropped back where it started
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Move the task to the new status
    if (destination.droppableId !== source.droppableId) {
      moveTask(draggableId, destination.droppableId);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Kanban Board</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex h-[500px] gap-4 overflow-x-auto p-4">
              {columns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  title={column.title}
                  tasks={column.tasks}
                  color={column.color}
                  columnId={column.id}
                  projectId={projectId}
                />
              ))}
            </div>
          </DragDropContext>
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
