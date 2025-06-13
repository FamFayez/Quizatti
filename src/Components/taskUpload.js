import React, { useState } from "react";

const TaskUpload = ({
  userRole,
  selectedFile,
  textPreview,
  errorMessage,
  manualTaskText,
  setManualTaskText,
  onTextTaskSubmit,
  onFileChange,
}) => {
  const [taskType, setTaskType] = useState("text"); // text | link | file

  // Allow only "Assistant"
  if (userRole !== "Assistant") return null;

  return (
    <div className="upload-section">
      <div className="task-type-selector">
        <label>
          <input
            type="radio"
            value="text"
            checked={taskType === "text"}
            onChange={() => setTaskType("text")}
          />
          Text
        </label>
        <label>
          <input
            type="radio"
            value="link"
            checked={taskType === "link"}
            onChange={() => setTaskType("link")}
          />
          Link
        </label>
        <label>
          <input
            type="radio"
            value="file"
            checked={taskType === "file"}
            onChange={() => setTaskType("file")}
          />
          File
        </label>
      </div>

      {(taskType === "text" || taskType === "link") && (
        <div className="manual-task">
          <input
            type="text"
            value={manualTaskText}
            onChange={(e) => setManualTaskText(e.target.value)}
            placeholder={
              taskType === "link" ? "Enter task link" : "Enter task title"
            }
            className="task-input"
          />
          <button
            onClick={() => onTextTaskSubmit(taskType)}
            className="submit-btn"
          >
            ➕ Add {taskType === "link" ? "Link" : "Text"} Task
          </button>
        </div>
      )}

      {taskType === "file" && (
        <div className="file-upload">
          <input
            type="file"
            accept=".txt,.pdf,.ppt,.pptx"
            onChange={onFileChange}
          />
        </div>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {textPreview && (
        <div className="text-preview">
          <h3>Text File Preview:</h3>
          <pre>{textPreview}</pre>
        </div>
      )}
    </div>
  );
};

export default TaskUpload;
