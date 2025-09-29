import React, { useState } from "react";
import "../index.css";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAddTask({ title });
    setTitle("");
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
      />
      <button onClick={handleAdd} className="btn">
        Add
      </button>
    </div>
  );
};

export default TaskForm;
