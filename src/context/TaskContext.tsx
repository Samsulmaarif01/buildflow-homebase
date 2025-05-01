
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Task, Project, ProjectStatus } from "@/types";
import { tasks as initialTasks, projects as initialProjects } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

type TaskContextType = {
  tasks: Task[];
  projects: Project[];
  moveTask: (taskId: string, newStatus: string) => void;
  updateTask: (updatedTask: Task) => void;
  addTask: (task: Omit<Task, "id">) => void;
  updateProjectsBasedOnTasks: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const { toast } = useToast();

  // Function to calculate project status based on tasks
  const calculateProjectStatus = useCallback((projectId: string): ProjectStatus => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    
    if (!projectTasks.length) return "PLANNING";
    
    const allDone = projectTasks.every(task => task.status === "DONE");
    if (allDone) return "COMPLETED";
    
    const allTodo = projectTasks.every(task => task.status === "TO_DO");
    if (allTodo) return "PLANNING";
    
    return "IN_PROGRESS";
  }, [tasks]);

  // Function to calculate project progress percentage
  const calculateProjectProgress = useCallback((projectId: string): number => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    if (!projectTasks.length) return 0;
    
    const completedTasks = projectTasks.filter(task => task.status === "DONE").length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  }, [tasks]);

  // Update projects based on task status
  const updateProjectsBasedOnTasks = useCallback(() => {
    setProjects(prevProjects => 
      prevProjects.map(project => ({
        ...project,
        status: calculateProjectStatus(project.id),
        progress: calculateProjectProgress(project.id)
      }))
    );
  }, [calculateProjectStatus, calculateProjectProgress]);

  // Update projects whenever tasks change
  useEffect(() => {
    updateProjectsBasedOnTasks();
  }, [tasks, updateProjectsBasedOnTasks]);

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
        projects,
        moveTask,
        updateTask,
        addTask,
        updateProjectsBasedOnTasks,
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
