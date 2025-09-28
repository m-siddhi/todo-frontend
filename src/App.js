import React, { useState, useEffect } from "react";
import api from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const getTasks = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await api.get("/tasks");
      setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || []);
    } catch {
      setErr("Could not load tasks");
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
      setTasks((prev) => [res.data, ...prev]);
    } catch {
      setErr("Could not add task");
    }
  };

  const updateTask = async (id, updatedFields) => {
    try {
      const res = await api.put(`/tasks/${id}`, updatedFields);
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch {
      setErr("Could not update task");
    }
  };

  const toggleTask = (id) => {
    const task = tasks.find((t) => t._id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch {
      setErr("Could not delete task");
    }
  };

  return (
    <div className="app">
      <h2>Todo App</h2>
      <TaskForm onAdd={addTask} />
      {err && <p className="error">{err}</p>}
      {loading ? (
        <p>loading...</p>
      ) : (
        <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
      )}
    </div>
  );
}

export default App;
