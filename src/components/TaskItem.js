import React from "react";
import "../index.css";

const TaskItem = ({ task, onDelete, onToggleStatus }) => {
  return (
    <li className="task-item">
      <span className={task.status === "completed" ? "completed" : ""}>
        {task.title}
      </span>

      <div className="task-buttons">
        <button onClick={() => onToggleStatus(task._id, task.status)}>
          {task.status === "pending" ? "Complete" : "Undo"}
        </button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
