import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import API from "./api"; // 👈 axios instance

function App() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load tasks ❌");
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const res = await API.post("/tasks", taskData);
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
      setMessage("Failed to add task ❌");
    }
  };

  // ✅ Toggle task (PATCH)
  const toggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);

      const res = await API.patch(`/tasks/${id}`, {
        completed: !task.completed,
      });

      setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
      setMessage("Failed to update task ❌");
    }
  };

  // ✅ Delete task (DELETE)
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete task ❌");
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />

      <main className="max-w-3xl mx-auto px-6 pt-28">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Your Tasks
          </h2>
          <p className="text-white/50">Stay organized and productive</p>

          {/* ✅ Message display */}
          {message && <p className="mt-2 text-sm text-green-400">{message}</p>}
        </div>

        <TaskForm onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </main>

      {/* Floating Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 sm:hidden w-14 h-14 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full shadow-2xl shadow-violet-500/40 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
}
console.log("Using API URL:", import.meta.env.VITE_API_URL);
export default App;