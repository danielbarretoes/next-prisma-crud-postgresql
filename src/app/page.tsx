import TaskForm from "@/components/TaskForm";
import TasksList from "@/components/TasksList";

function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <TaskForm />
        <br />
        <TasksList />
      </div>
    </div>
  );
}

export default HomePage;
