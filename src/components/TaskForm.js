import React, { useState } from "react";
import "./TaskForm.css";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prio, setPrio] = useState("low");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title) {
      setError("Title is required");
      return;
    }
    setLoading(true);
    try {
      await onAdd({
        title,
        description: desc,
        priority: prio,
        completed: false,
      });
      setTitle("");
      setDesc("");
      setPrio("low");
    } catch {
      setError("Could not add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Enter description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <select value={prio} onChange={(e) => setPrio(e.target.value)}>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "saving..." : "add"}
      </button>
    </form>
  );
}

export default TaskForm;
