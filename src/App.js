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
      setTasks(res.data.tasks ? res.data.tasks : res.data);
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
      setTasks((prev) => [res.data, ...prev]);
    } catch (e) {
      console.log("add err", e);
    }
  };

  const updateTask = async (id, obj) => {
    const res = await api.put(`/tasks/${id}`, obj);
    setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const toggleTask = (t) => {
    updateTask(t._id, { completed: !t.completed });
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
