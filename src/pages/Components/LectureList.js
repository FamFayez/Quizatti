import React from "react";
import EditableLectureItem from "./EditItem";

const LectureList = ({ lectures, userRole, onDelete, onUpdate }) => {
  return (
    <>
      {lectures.map((lecture, index) => (
        <article className="section-block" key={index}>
          <div className="lecture-block">
            <h2>
              {lecture.file ? (
                <>
                  <a
                    href={lecture.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdf-link"
                  >
                    📄 {lecture.title}
                  </a>
                  {userRole === "doctor" && (
                    <button
                      className="delete-btn"
                      onClick={() => onDelete(index, "file")}
                    >
                      🗑 Remove File
                    </button>
                  )}
                </>
              ) : (
                <>📄 {lecture.title}</>
              )}
            </h2>

            {/* Editable Title Component */}
            {userRole === "doctor" && (
              <EditableLectureItem
                index={index}
                lecture={lecture}
                onDelete={onDelete}
                onUpdate={onUpdate}
                userRole={userRole}
              />
            )}
          </div>

          <div className="task-block">
            {lecture.note ? (
              <>
                <p>{lecture.note}</p>
                {userRole === "doctor" && (
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(index, "note")}
                  ></button>
                )}
              </>
            ) : (
              <p> </p>
            )}
          </div>
        </article>
      ))}
    </>
  );
};

export default LectureList;
