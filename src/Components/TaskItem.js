import { useState } from "react";

const TaskItem = ({ task, index, userRole, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (editedTitle.trim() === "") return;
    onUpdate(index, { ...task, title: editedTitle });
    setIsEditing(false);
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
              🔗{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="edit-input"
                />
              ) : (
                task.title
              )}
            </a>
          ) : task.file ? (
            // Uploaded file
            <a
              href={task.file}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-link"
            >
              📄{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="edit-input"
                />
              ) : (
                task.title
              )}
            </a>
          ) : (
            // Plain text
            <span>
              📝{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="edit-input"
                />
              ) : (
                task.title
              )}
            </span>
          )}

          {(userRole === "Teacher" || userRole === "Assistant") && (
            <>
              {isEditing ? (
                <>
                  <button
                    className="save-btn"
                    onClick={handleSave}
                    title="Save Edit"
                  >
                    💾
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedTitle(task.title);
                    }}
                    title="Cancel Edit"
                  >
                    ❌
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn"
                    onClick={() => setIsEditing(true)}
                    title="Edit Task"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn"
                    onClick={() => onDelete(index)}
                    title="Delete Task"
                  >
                    🗑️
                  </button>
                </>
              )}
            </>
          )}
        </h2>
      </div>
    </article>
  );
};

export default TaskItem;
