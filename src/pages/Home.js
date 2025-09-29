import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {
  getTasks,
  createTask,
  deleteTask,
  updateStatus,
  searchTasks,
} from "../api/tasks";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const res = await createTask(taskData);
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleStatus = async (id, status) => {
    try {
      const newStatus = status === "pending" ? "completed" : "pending";
      const res = await updateStatus(id, newStatus);
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (query) => {
    try {
      const res = await searchTasks(query);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ width: "500px", margin: "50px auto", textAlign: "center" }}>
      <h1>To-Do List</h1>
      <TaskForm onAddTask={handleAddTask} onSearch={handleSearch} />
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};

export default Home;
