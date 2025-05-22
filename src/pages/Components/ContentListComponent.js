// src/Components/ContentList.js
import React from "react";

const ContentListComponent = ({ contentItems, onRemoveFile }) => {
  return (
    <div className="content-list">
      {contentItems.map((item, index) => (
        <div className="content-item" key={index}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {item.file ? (
            <div>
              <p>File: {item.file.name}</p>
              <button
                className="remove-btn"
                onClick={() => onRemoveFile(index)}
              >
                🗑️ Remove File
              </button>
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
