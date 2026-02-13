import { useState, useEffect } from "react";
import type { Task } from "../types/task";

interface Props {
  onSubmit: (task: Task) => void;
  initialData?: Task;
}

const TaskForm = ({ onSubmit, initialData }: Props) => {
  const [form, setForm] = useState<Task>({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <input
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
      />

      <div className="flex gap-3">
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5"
      />

      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl">
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;
