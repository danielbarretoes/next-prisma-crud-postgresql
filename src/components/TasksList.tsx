"use client";

import { useEffect } from "react";
import { Task } from "@prisma/client";
import { useTasks } from "@/context/TaskContext";
import TaskCard from "@/components/TaskCard";

const TasksList = () => {
  const { tasks, loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <div>TasksList</div>
      {tasks.map((task: Task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </>
  );
};

export default TasksList;
