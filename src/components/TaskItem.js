import React from "react";

function TaskItem({ task, onDelete, onToggle }) {
  return (
    <li className="task-item">
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)} // pass only the _id
        />
        <span
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {task.title}
        </span>
      </label>

      {task.priority && (
        <span className={`priority ${task.priority}`}>[{task.priority}]</span>
      )}
      {task.description && <div className="details">{task.description}</div>}

      <button onClick={() => onDelete(task._id)}>x</button>
    </li>
  );
}

export default TaskItem;
