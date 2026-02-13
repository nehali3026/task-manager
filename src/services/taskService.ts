import type { Task } from "../types/task";

const STORAGE_KEY = "tasks";

const getStoredTasks = (): Task[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const getTasks = async (): Promise<Task[]> => {
  return getStoredTasks();
};

export const createTask = async (task: Task): Promise<Task> => {
  const tasks = getStoredTasks();
  const newTask = { ...task, id: crypto.randomUUID() };
  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);
  return newTask;
};

export const updateTask = async (id: string, updatedTask: Task) => {
  const tasks = getStoredTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...updatedTask, id } : task,
  );
  saveTasks(updatedTasks);
  return updatedTask;
};

export const deleteTask = async (id: string) => {
  const tasks = getStoredTasks();
  const filteredTasks = tasks.filter((task) => task.id !== id);
  saveTasks(filteredTasks);
};
