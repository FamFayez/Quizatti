import React from "react";

const UploadControl = ({ onFileChange, triggerFileInput }) => (
  <div className="upload-section">
    <button
      className="upload-btn"
      onClick={() => triggerFileInput("uploadInput-0")}
    >
      ➕ Add File
    </button>
    <input
      type="file"
      id="uploadInput-0"
      style={{ display: "none" }}
      onChange={onFileChange}
    />
  </div>
);

export default UploadControl;
