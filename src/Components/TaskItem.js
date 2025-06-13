import React, { useState } from "react";
import EditTaskModal from "./EditTaskModal";

const TaskItem = ({ task, index, userRole, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = (updatedData) => {
    onUpdate({
      ...updatedData,
      id: task._id
    });
  };

  const isExternalLink = task.isLink && task.file;

  return (
    <article className="section-block">
      <div className="lecture-block">
        <h2>
          {isExternalLink ? (
            // External link
            <a
              href={task.file}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-link"
            >
              🔗{task.name}
            </a>
          ) : task.file ? (
            // Uploaded file
            <a
              href={task.file}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-link"
            >
              📄{task.name}
            </a>
          ) : (
            // Plain text
            <span>📝 {task.title}</span>
          )}

          {(userRole === "Teacher" || userRole === "Assistant") && (
            <>
              <button className="btn" onClick={handleEdit} title="Edit Task">
                ✏️
              </button>
              <button
                className="btn"
                onClick={() => onDelete(index, task._id)}
                title="Delete Task"
              >
                🗑️
              </button>
            </>
          )}
        </h2>
      </div>
      <EditTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={task}
      />
    </article>
  );
};

export default TaskItem;
