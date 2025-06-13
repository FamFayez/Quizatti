import { useState } from "react";

const EditableLectureItem = ({ lecture, index, onUpdate, userRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(lecture.title);

  const handleSave = () => {
    onUpdate(index, { ...lecture, title: editedTitle });
    setIsEditing(false);
  };

  return (
    <div className="lecture-item">
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      ) : (
        <h4>{lecture.title}</h4>
      )}

      <div className="lecture-actions">
        {(userRole === "Teacher" || userRole === "Assistant") && (
          <>
            {isEditing ? (
              <button onClick={handleSave}>💾 Save</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditableLectureItem;
