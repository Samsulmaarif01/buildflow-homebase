
import React, { createContext, useContext, useState, useCallback } from "react";
import { Task } from "@/types";
import { tasks as initialTasks } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

type TaskContextType = {
  tasks: Task[];
  moveTask: (taskId: string, newStatus: string) => void;
  updateTask: (updatedTask: Task) => void;
  addTask: (task: Omit<Task, "id">) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { toast } = useToast();

  const moveTask = useCallback((taskId: string, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    toast({
      description: "Task status updated successfully",
    });
  }, [toast]);

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    toast({
      description: "Task updated successfully",
    });
  }, [toast]);

  const addTask = useCallback((task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: `t${Math.floor(Math.random() * 10000)}`,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    toast({
      description: "New task added successfully",
    });
  }, [toast]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        moveTask,
        updateTask,
        addTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
