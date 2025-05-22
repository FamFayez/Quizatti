import React, { useState } from "react";

const LecUpload = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileChange(file); // Pass the file back to the parent
  };

  // Trigger file input click when the "Add File" button is clicked
  const handleUploadClick = () => {
    document.getElementById("fileUpload").click();
  };

  return (
    <div className="upload-section">
      <button className="upload-btn" onClick={handleUploadClick}>
        ➕ Add File
      </button>
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {selectedFile && (
        <p className="selected-file">Selected: {selectedFile.name}</p>
      )}
    </div>
  );
};

export default LecUpload;
