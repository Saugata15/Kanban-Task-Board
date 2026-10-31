import React from "react";

const TaskForm = ({
  register,
  handleSubmit,
  onCloseTask,
  editId,
  errors,
  onFormSubmit,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4"
      onClick={onCloseTask}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="my-auto max-w-lg w-full mx-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {editId ? "Edit Task" : "Create Task"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Add the details for your task.
              </p>
            </div>

            <button
              type="button"
              onClick={onCloseTask}
              aria-label="Close form"
              className="rounded-lg px-3 py-1 text-xl text-slate-500 bg-slate-100 cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Task title *
              </label>

              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 characters",
                  },
                })}
                placeholder="e.g. Build login page"
                maxLength={100}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              {errors.title && (
                <p className="text-red-600 font-medium text-xs block pt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Description
              </label>

              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="What needs to be done?"
                rows={3}
                maxLength={500}
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              {errors.description && (
                <p className="text-red-600 font-medium text-xs block pt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="mb-1.5 block text-sm font-medium"
                  htmlFor="status"
                >
                  Status
                </label>

                <select
                  {...register("status")}
                  id="status"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label
                  className="mb-1.5 block text-sm font-medium"
                  htmlFor="priority"
                >
                  Priority
                </label>

                <select
                  {...register("priority")}
                  id="priority"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCloseTask}
              className="rounded-xl cursor-pointer active:scale-95 border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl cursor-pointer active:scale-95 bg-indigo-600 px-4 py-1 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              {editId ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
