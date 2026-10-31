import React from "react";
import {
  CalendarDays,
  Flag,
  MoreHorizontal,
  Pencil,
  Trash2,
  Clock3,
  CircleCheck,
  Circle,
  ArrowRight,
  Check,
} from "lucide-react";

const priorityStyles = {
  low: {
    label: "Low",
    className: "bg-emerald-50 text-emerald-600 border-emerald-100",
    dot: "bg-emerald-500",
  },
  medium: {
    label: "Medium",
    className: "bg-amber-50 text-amber-600 border-amber-100",
    dot: "bg-amber-500",
  },
  high: {
    label: "High",
    className: "bg-rose-50 text-rose-600 border-rose-100",
    dot: "bg-rose-500",
  },
};

const statusOptions = [
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in-progress",
    label: "In Progress",
    icon: Clock3,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CircleCheck,
  },
];

const TaskCard = ({
  task,
  onEditTask,
  onDeleteTask
}) => {
  const {
    id,
    title,
    description,
    priority = "medium",
    status = "todo",
  } = task;

  const priorityInfo =
    priorityStyles[priority.toLowerCase()] ||
    priorityStyles.medium;

  const currentStatus = statusOptions.find(
    (item) => item.value === status
  );

  const isCompleted = status === "completed";

  return (
    <article
      className={`group relative rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/40 sm:p-5 ${
        isCompleted ? "opacity-80" : ""
      }`}
    >
      {/* Top Section */}
      <div className="mb-3 flex items-start justify-between gap-3">

        {/* Priority Badge */}
        <span
          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold ${priorityInfo.className}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${priorityInfo.dot}`}
          />

          {priorityInfo.label}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-1">

          <button
            type="button"
            onClick={() => onEditTask(id)}
            aria-label="Edit task"
            title="Edit task"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
          >
            <Pencil size={15} />
          </button>

          <button
            type="button"
            onClick={() => onDeleteTask(id)}
            aria-label="Delete task"
            title="Delete task"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
          >
            <Trash2 size={15} />
          </button>

        </div>
      </div>

      {/* Task Details */}
      <div className="mb-4">

        <h3
          className={`text-base font-bold leading-snug tracking-tight text-slate-800 ${
            isCompleted
              ? "line-through decoration-slate-400"
              : ""
          }`}
        >
          {title}
        </h3>

        {description && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        )}

      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 pt-3">

        <div className="flex items-center justify-between gap-2">

          {/* Current Status */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            {currentStatus && (
              <>
                <currentStatus.icon size={15} />

                <span>{currentStatus.label}</span>
              </>
            )}
          </div>

          {isCompleted && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-600">
              <Check size={13} />
              Done
            </span>
          )}

        </div>
      </div>

    </article>
  );
};

export default TaskCard;
