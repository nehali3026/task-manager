import { useEffect, useState } from "react";
import type { Task } from "./types/task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";
import TaskCard from "./components/TaskCard";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selected, setSelected] = useState<Task | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "view" | null>(null);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">
              Task Manager
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your daily workflow efficiently
            </p>
          </div>

          <button
            onClick={() => setMode("add")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-sm"
          >
            + New Task
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onView={() => {
                setSelected(task);
                setMode("view");
              }}
              onEdit={() => {
                setSelected(task);
                setMode("edit");
              }}
              onDelete={async () => {
                if (task.id) {
                  await deleteTask(task.id);
                  fetchTasks();
                }
              }}
            />
          ))}
        </div>
      </div>

      {mode && (
        <Modal
          title={
            mode === "add"
              ? "Add Task"
              : mode === "edit"
                ? "Edit Task"
                : "View Task"
          }
          onClose={() => {
            setMode(null);
            setSelected(null);
          }}
        >
          {mode === "view" ? (
            <div className="space-y-3 text-slate-600">
              <p>
                <strong>Title:</strong> {selected?.title}
              </p>
              <p>
                <strong>Description:</strong> {selected?.description}
              </p>
              <p>
                <strong>Priority:</strong> {selected?.priority}
              </p>
              <p>
                <strong>Status:</strong> {selected?.status}
              </p>
              <p>
                <strong>Due Date:</strong> {selected?.dueDate}
              </p>
            </div>
          ) : (
            <TaskForm
              initialData={mode === "edit" ? selected! : undefined}
              onSubmit={async (data) => {
                if (mode === "add") await createTask(data);
                if (mode === "edit" && selected?.id)
                  await updateTask(selected.id, data);
                fetchTasks();
                setMode(null);
              }}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
