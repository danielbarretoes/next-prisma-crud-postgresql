import { Task } from "@prisma/client";
import { useTasks } from "@/context/TaskContext";

function TaskCard({ task }: { task: Task }) {
  const { deleteTask, setSelectedTask } = useTasks();

  return (
    <div key={task.id} className="bg-slate-800 p-4 my-2 flex justify-between">
      <div>
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p>{task.description}</p>
        <p>{new Date(task.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-x-2">
        <button
          className="bg-slate-600 p-4"
          onClick={async () => {
            if (confirm("Are you sure you want to delete this note?")) {
              await deleteTask(Number(task.id));
            }
          }}
        >
          Delete
        </button>
        <button
          className="bg-slate-600 p-4"
          onClick={() => {
            setSelectedTask(task);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
