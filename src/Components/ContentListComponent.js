import React from "react";

const ContentListComponent = ({ contentItems, userRole, onRemoveFile }) => {
  return (
    <div className="content-list">
      {contentItems.map((item, index) => (
        <div className="content-item" key={item._id || index}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>

          {item.fileUrl ? (
            <div>
              <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                View File
              </a>
              {userRole === "Assistant" && (
                <button
                  className="remove-btn"
                  onClick={() => onRemoveFile(item._id)}
                >
                  🗑️ Remove File
                </button>
              )}
            </div>
          ) : (
            <p>No file uploaded</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentListComponent;
