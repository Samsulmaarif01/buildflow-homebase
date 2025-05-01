
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
    
    const hasReview = projectTasks.some(task => task.status === "REVIEW");
    if (hasReview) return "REVIEW";
    
    return "IN_PROGRESS";
  }, [tasks]);

  // Function to calculate project progress percentage
  const calculateProjectProgress = useCallback((projectId: string): number => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    if (!projectTasks.length) return 0;
    
    // Weight tasks by status: DONE=100%, REVIEW=75%, IN_PROGRESS=50%, TO_DO=0%
    const progressMap: Record<string, number> = {
      DONE: 100,
      REVIEW: 75,
      IN_PROGRESS: 50,
      TO_DO: 0
    };
    
    const totalProgress = projectTasks.reduce((sum, task) => {
      return sum + (progressMap[task.status] || 0);
    }, 0);
    
    return Math.round(totalProgress / projectTasks.length);
  }, [tasks]);

  // Update projects based on task status - Synchronize immediately
  const updateProjectsBasedOnTasks = useCallback(() => {
    setProjects(prevProjects => 
      prevProjects.map(project => ({
        ...project,
        status: calculateProjectStatus(project.id),
        progress: calculateProjectProgress(project.id)
      }))
    );
  }, [calculateProjectStatus, calculateProjectProgress]);

  // Ensure synchronization on initial load
  useEffect(() => {
    updateProjectsBasedOnTasks();
  }, [updateProjectsBasedOnTasks]);

  const moveTask = useCallback((taskId: string, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Immediate update - don't use setTimeout to ensure sync
    updateProjectsBasedOnTasks();
    
    toast({
      description: "Task status updated successfully",
    });
  }, [toast, updateProjectsBasedOnTasks]);

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    // Immediate update - don't use setTimeout
    updateProjectsBasedOnTasks();
    
    toast({
      description: "Task updated successfully",
    });
  }, [toast, updateProjectsBasedOnTasks]);

  const addTask = useCallback((task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: `t${Math.floor(Math.random() * 10000)}`,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Immediate update - don't use setTimeout
    updateProjectsBasedOnTasks();
    
    toast({
      description: "New task added successfully",
    });
  }, [toast, updateProjectsBasedOnTasks]);

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
