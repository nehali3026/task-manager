import type { Task } from "../types/task";

const API = "http://localhost:5000/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(API);
  return res.json();
};

export const createTask = async (task: Task) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id: string, task: Task) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const deleteTask = async (id: string) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });
};
