import React, { useState, useEffect } from "react";
import api from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Fetch tasks from backend
  const getTasks = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await api.get("/tasks");
      // backend returns { tasks: [...] }
      setTasks(res.data.tasks || res.data);
    } catch (error) {
      setErr("Could not load tasks");
      console.error("GET tasks error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Add new task
  const addTask = async (task) => {
    try {
      const res = await api.post("/tasks", task);
      setTasks((prev) => [res.data, ...prev]); // res.data is the new task
    } catch (error) {
      setErr("Could not add task");
      console.error("POST task error:", error);
    }
  };

  // Update task
  const updateTask = async (id, updatedFields) => {
    try {
      const res = await api.put(`/tasks/${id}`, updatedFields);
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      setErr("Could not update task");
      console.error("PUT task error:", error);
    }
  };

  // Toggle task completed
  const toggleTask = (id) => {
    const task = tasks.find((t) => t._id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      setErr("Could not delete task");
      console.error("DELETE task error:", error);
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
