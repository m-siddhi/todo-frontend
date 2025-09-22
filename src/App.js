import React, { useEffect, useState } from "react";
import api from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchTasks(query = "") {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/tasks" + (query ? `?${query}` : ""));
      const data = res.data.tasks ?? res.data;
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function addTask(payload) {
    const res = await api.post("/tasks", payload);
    setTasks((prev) => [res.data, ...prev]);
  }

  async function updateTask(id, payload) {
    const res = await api.put(`/tasks/${id}`, payload);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  }

  async function deleteTask(id) {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }

  async function toggleComplete(task) {
    await updateTask(task._id, { completed: !task.completed });
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h1>To-Do App</h1>
      <TaskForm onAdd={addTask} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleComplete}
          onUpdate={updateTask}
        />
      )}
    </div>
  );
}

export default App;
