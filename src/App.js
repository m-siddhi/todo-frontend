import React, { useEffect, useState } from "react";
import api from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const getTasks = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await api.get("/tasks");
      const tasksFromApi = res.data.tasks ? res.data.tasks : res.data;
      const tasksWithCompleted = tasksFromApi.map((t) => ({
        ...t,
        completed: t.completed || false,
      }));
      setTasks(tasksWithCompleted);
    } catch (e) {
      setErr("could not load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const res = await api.post("/tasks", task);
      if (res.data && res.data._id) {
        setTasks((prev) => [
          { ...res.data, completed: res.data.completed || false },
          ...prev,
        ]);
      }
    } catch (e) {
      console.log("add err", e);
    }
  };

  const updateTask = async (id, obj) => {
    try {
      const res = await api.put(`/tasks/${id}`, obj);
      setTasks(
        tasks.map((t) =>
          t._id === id
            ? { ...res.data, completed: res.data.completed || false }
            : t
        )
      );
    } catch (e) {
      console.log("update err", e);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (e) {
      console.log("delete err", e);
    }
  };

  const toggleTask = (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    const newStatus = task.completed ? false : true;
    updateTask(id, { completed: newStatus });
  };

  return (
    <div className="app">
      <h2>Todo App</h2>
      <TaskForm onAdd={addTask} />
      {err && <p style={{ color: "red" }}>{err}</p>}
      {loading ? (
        <p>loading...</p>
      ) : (
        <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
      )}
    </div>
  );
}

export default App;
