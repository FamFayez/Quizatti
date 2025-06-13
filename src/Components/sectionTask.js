import EditableLectureItem from "./EditItem";

const SectionTask = ({ lectures, userRole, onDelete, onUpdate }) => {
  return (
    <>
      {lectures.map((lecture, index) => (
        <article className="section-block" key={lecture._id || index}>
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
                  {userRole === "Assistant" && (
                    <button
                      className="delete-btn"
                      onClick={() => onDelete(lecture._id)}
                    >
                      🗑 Remove File
                    </button>
                  )}
                </>
              ) : (
                <>📄 {lecture.title}</>
              )}
            </h2>

            {userRole === "Assistant" && (
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
            {lecture.note && <p>{lecture.note}</p>}
          </div>
        </article>
      ))}
    </>
  );
};

export default SectionTask;
