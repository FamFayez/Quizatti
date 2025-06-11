// src/Components/ContentList.js
import React from "react";

const ContentListComponent = ({ lectures, userRole, onDelete, onUpdate }) => {
  return (
    <div className="lecture-list">
      {lectures.length === 0 ? (
        <p>No lectures available.</p>
      ) : (
        lectures.map((lecture, index) => (
          <div key={lecture._id} className="lecture-item">
            <h4>{lecture.title}</h4>
            <p>{lecture.description}</p>

            {userRole === "teacher" && (
              <div className="lecture-actions">
                <button onClick={() => onDelete(lecture._id)}>❌ Delete</button>
                <button onClick={() => onUpdate(lecture._id, lecture)}>✏️ Edit</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ContentListComponent;
