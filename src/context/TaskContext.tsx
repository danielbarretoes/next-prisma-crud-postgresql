"use client";

import { createContext, useState, useContext } from "react";
import { CreateTask, UpdateTask } from "@/interfaces/Task";
import { Task } from "@prisma/client";

export const TasksContext = createContext<{
  tasks: Task[];
  loadTasks: () => Promise<void>;
  createTask: (task: CreateTask) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  updateTask: (id: number, task: UpdateTask) => Promise<void>;
}>({
  tasks: [],
  loadTasks: async () => {},
  createTask: async (task: CreateTask) => {},
  deleteTask: async (id: number) => {},
  selectedTask: null,
  setSelectedTask: (task: Task | null) => {},
  updateTask: async (id: number, task: UpdateTask) => {},
});

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  }

  // Falta Load Task - Get Single Task

  async function createTask(task: CreateTask) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newTasks = await res.json();
    loadTasks();
  }

  async function deleteTask(id: number) {
    const res = await fetch("/api/tasks/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    loadTasks();
  }

  async function updateTask(id: number, task: UpdateTask) {
    const res = await fetch("/api/tasks/" + id, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    loadTasks();
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loadTasks,
        createTask,
        updateTask,
        deleteTask,
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
