import { ChevronDown, Search } from "lucide-react";

const Header = ({
  tasks,
  onAddTask,
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter,
}) => {
  const priorityOptions = ["All", "High", "Medium", "Low"];

  return (
    <header className="mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-8">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-indigo-600"></span>

            <span className="text-xs font-semibold tracking-wide text-indigo-700">
              WORKSPACE
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Kanban Task Board
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Stay focused. Organize your work. Get things done.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddTask}
          className="inline-flex cursor-pointer active:scale-95 items-center justify-center gap-2 self-start rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg sm:self-auto"
        >
          <span className="text-lg leading-none">+</span>
          Add New Task
        </button>
      </div>

      <div className="flex flex-col gap-5 border-t border-slate-100 bg-white/80 p-5 sm:p-8 lg:flex-row lg:items-center">
        {/* Search & Filters */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Search */}
          <div className="relative w-full lg:max-w-2xl">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks by title..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          {/* Filter Controls */}
          <div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="priority"
                className="text-slate-500 text-sm font-medium"
              >
                Priority:
              </label>
              <div className="relative">
                <select
                  id="priority"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-6 pr-7 text-sm font-medium text-slate-600 outline-none transition hover:border-indigo-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 sm:w-auto"
                >
                  {priorityOptions.map((item) => (
                    <option value={item.toLowerCase()} key={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Tasks Card */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />

          <span className="text-sm font-medium text-slate-600">
            {tasks.length}{" "}
            {tasks.length === 1 ? "task" : "tasks"} total
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
