import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggle }) {
  if (!tasks || tasks.length === 0) {
    return <p>No tasks</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <TaskItem
          key={t._id}
          task={t}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TaskList;
