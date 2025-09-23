import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggle, onUpdate }) {
  if (!tasks || tasks.length === 0) return <div>No tasks yet</div>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
