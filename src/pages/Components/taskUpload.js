const TaskUpload = ({
  userRole,
  textPreview,
  errorMessage,
  uploadMessage,
  manualTaskText,
  setManualTaskText,
  onTextTaskSubmit,
}) => {
  if (userRole !== "doctor" && userRole !== "ta") return null;

  return (
    <div className="upload-section">
      <div className="manual-task">
        <input
          type="text"
          value={manualTaskText}
          onChange={(e) => setManualTaskText(e.target.value)}
          placeholder="Enter task title"
          className="task-input"
        />
        <button onClick={onTextTaskSubmit} className="submit-btn">
          ➕ Add Text Task
        </button>
      </div>

      {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
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
