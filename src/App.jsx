import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import { useForm } from "react-hook-form";
import TaskForm from "./components/TaskForm.jsx";
import { nanoid } from "nanoid";
import TaskBoard from "./components/TaskBoard.jsx";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch,setDebouncedSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onAddTask = () => {
    setShowForm(true);
  };

  const onCloseTask = () => {
    setShowForm(false);
    setEditId(null);
  };

  const onFormSubmit = (data) => {
    setTasks((prev) => {
      if (editId) {
        return prev.map((item) =>
          item.id === editId ? { ...item, ...data } : item,
        );
      } else {
        return [...prev, { ...data, id: nanoid() }];
      }
    });
    reset();
    setEditId(null);
    setShowForm(false);
  };

  const onEditTask = (id) => {
    setEditId(id);
    setShowForm(true);
  };

  const onDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task)=>{
    const matchedSearch = task.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase());

    const matchedPriority = priorityFilter === "all" ||
    task.priority === priorityFilter;

    return (matchedSearch && matchedPriority);
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (editId) {
      let editItem = tasks.find((task) => task.id === editId);

      if (editItem) {
        reset(editItem);
      }
    } else {
      reset({
        title: "",
        description: "",
        status: "todo",
        priority: "low",
      });
    }
  }, [tasks, editId, reset]);

  useEffect(()=> {
    const timer = setTimeout(()=>{
      setDebouncedSearch(searchTerm);
    }, 500);

    return ()=> clearTimeout(timer);
  }, [searchTerm]);

  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <Header
          tasks={filteredTasks}
          onAddTask={onAddTask}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <TaskBoard
          tasks={filteredTasks}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />

        {showForm && (
          <TaskForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            onCloseTask={onCloseTask}
            editId={editId}
            onFormSubmit={onFormSubmit}
          />
        )}
      </div>
    </main>
  );
}

export default App;
