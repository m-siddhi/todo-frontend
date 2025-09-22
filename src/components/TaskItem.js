import React from "react";

export default function TaskItem({ task, onDelete, onToggle }) {
  const style = {
    padding: 10,
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  return (
    <li style={style}>
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
        <span
          style={{
            marginLeft: 8,
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </span>
        {task.priority && (
          <small style={{ marginLeft: 8 }}>({task.priority})</small>
        )}
        <div style={{ fontSize: 12, color: "#666" }}>{task.description}</div>
      </div>
      <div>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </li>
  );
}
