import type { Task } from "../types/task";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const priorityColor = {
  Low: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-rose-100 text-rose-700",
};

const statusColor = {
  Pending: "bg-slate-100 text-slate-600",
  "In Progress": "bg-blue-100 text-blue-600",
  Completed: "bg-emerald-100 text-emerald-600",
};

const TaskCard = ({ task, onEdit, onDelete, onView }: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium text-slate-800">{task.title}</h3>

        <div className="flex gap-3 text-slate-400">
          <EyeIcon
            className="w-5 cursor-pointer hover:text-slate-600"
            onClick={onView}
          />
          <PencilSquareIcon
            className="w-5 cursor-pointer hover:text-indigo-600"
            onClick={onEdit}
          />
          <TrashIcon
            className="w-5 cursor-pointer hover:text-rose-600"
            onClick={onDelete}
          />
        </div>
      </div>

      <p className="text-sm text-slate-500 mt-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex justify-between items-center mt-5 text-xs">
        <span
          className={`px-3 py-1 rounded-full ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>

        <span className={`px-3 py-1 rounded-full ${statusColor[task.status]}`}>
          {task.status}
        </span>

        <span className="text-slate-400">{task.dueDate}</span>
      </div>
    </div>
  );
};

export default TaskCard;
