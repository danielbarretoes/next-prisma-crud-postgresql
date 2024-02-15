import TaskForm from "@/components/TaskForm";
import TasksList from "@/components/TasksList";

function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="text-center">
          <h1 className="text-2xl font-bold ">Next 14 - Prisma - CRUD</h1>
          <h4>PosgreSQL on Vercel</h4>
          <h4>Deployed on Vercel</h4>
          <p>Developed by Daniel Barreto</p>
        </div>
        <br />
        <TaskForm />
        <br />
        <TasksList />
      </div>
    </div>
  );
}

export default HomePage;
