import React, { useState } from "react";
import "./TaskForm.css";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);

    if (!title.trim()) {
      setErr("Title required");
      return;
    }

    setSubmitting(true);

    try {
      await onAdd({
        title: title.trim(),
        description: description.trim(),
        priority,
      });
      setTitle("");
      setDescription("");
      setPriority("low");
    } catch (error) {
      setErr(error.message || "Failed to add");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="priority-row">
        <label>
          Priority:
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
      {err && <div className="error">{err}</div>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
