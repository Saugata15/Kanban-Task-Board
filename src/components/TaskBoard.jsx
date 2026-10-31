import React from "react";
import {
  Circle,
  Clock3,
  CircleCheck,
  Plus,
  ListTodo,
} from "lucide-react";
import TaskCard from "./TaskCard";

const columns = [
  {
    id: "todo",
    title: "Todo",
    description: "Things to get started",
    icon: Circle,
    color: "blue",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    dotColor: "bg-blue-500",
  },
  {
    id: "in-progress",
    title: "In Progress",
    description: "Currently working on",
    icon: Clock3,
    color: "amber",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
    dotColor: "bg-amber-500",
  },
  {
    id: "completed",
    title: "Completed",
    description: "Successfully finished",
    icon: CircleCheck,
    color: "emerald",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    dotColor: "bg-emerald-500",
  },
];

const TaskBoard = ({
  tasks = [],
  onEditTask,
  onDeleteTask,
}) => {
  return (
    <section className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">

        {columns.map((column) => {
          const Icon = column.icon;

          const columnTasks = tasks.filter(
            (task) => task.status === column.id
          );

          return (
            <div
              key={column.id}
              className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100/60"
            >

              {/* Column Header */}
              <div className="border-b border-slate-200/70 bg-white p-4 sm:p-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${column.bgColor}`}
                    >
                      <Icon
                        size={20}
                        className={column.iconColor}
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        {column.title}
                      </h3>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {column.description}
                      </p>
                    </div>

                  </div>

                  <span
                    className={`flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-sm font-bold ${column.bgColor} ${column.iconColor} ${column.borderColor}`}
                  >
                    {columnTasks.length}
                  </span>

                </div>

              </div>

              {/* Task List */}
              <div className="flex min-h-[300px] flex-col gap-3 p-3 sm:p-4">

                {columnTasks.length > 0 ? (
                  columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEditTask={onEditTask}
                      onDeleteTask={onDeleteTask}
                    />
                  ))
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/60 px-4 py-12 text-center">

                    <div
                      className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${column.bgColor}`}
                    >
                      <Icon
                        size={22}
                        className={column.iconColor}
                      />
                    </div>

                    <p className="text-sm font-semibold text-slate-600">
                      No tasks here yet
                    </p>

                    <p className="mt-1 max-w-[200px] text-xs leading-relaxed text-slate-400">
                      Tasks in this column will appear here.
                    </p>
                  </div>
                )}

              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
};

export default TaskBoard;
