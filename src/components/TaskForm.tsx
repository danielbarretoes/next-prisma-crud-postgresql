"use client";
import { useState, useRef, useEffect } from "react";
import { useTasks } from "@/context/TaskContext";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  const { createTask, selectedTask, setSelectedTask, updateTask } = useTasks();

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description || "");
    }
  }, [selectedTask]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (selectedTask) {
          await updateTask(selectedTask.id, {
            title,
            description,
          });
          setSelectedTask(null);
        } else {
          await createTask({
            title,
            description,
          });
        }

        setTitle("");
        setDescription("");

        titleRef.current?.focus();
      }}
    >
      <input
        type="text"
        name="title"
        autoFocus
        placeholder="Title"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={titleRef}
      />

      <textarea
        name="title"
        placeholder="Content"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></textarea>

      <div className="flex justify-end gap-x-2">
        <button
          className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!title || !description}
          type="submit"
        >
          {selectedTask ? "Update" : "Create"}
        </button>

        {selectedTask && (
          <button
            className="px-5 py-2 text-black bg-slate-400 hover:bg-slate-500 rounded-md"
            type="button"
            onClick={() => {
              setSelectedTask(null);
              setTitle("");
              setDescription("");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
