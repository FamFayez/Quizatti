import React, { useState } from "react";
import "../style/TaskUpload.css";

const TaskUpload = ({
  userRole,
  selectedFile,
  textPreview,
  errorMessage,
  manualTaskText,
  setManualTaskText,
  onTextTaskSubmit,
  onFileChange,
  onUpload
}) => {
  const [taskData, setTaskData] = useState({
    name: "",
    file: null,
    solutionFile: null,
    deadline: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Allow only "Assistant"
  if (userRole !== "Assistant") return null;

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = () => {
    if (!taskData.name || !taskData.file || !taskData.deadline) {
      alert("Please fill in all required fields");
      return;
    }
    
    onUpload(taskData);
    setIsModalOpen(false);
    // Reset form
    setTaskData({
      name: "",
      file: null,
      solutionFile: null,
      deadline: ""
    });
  };

  return (
    <div className="upload-section">
      <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
        ➕ Add New Task
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content bg-white rounded-4">
            <div className="modal-header">
              <h2 className="text-dark">Add New Task</h2>
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="task-form">
              <div className="form-group">
                <label htmlFor="name">Task Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={taskData.name}
                  onChange={handleInputChange}
                  className="task-input"
                  placeholder="Enter task name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="file">Task File:</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleInputChange}
                  accept=".txt,.pdf,.ppt,.pptx"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="solutionFile">Solution File (Optional):</label>
                <input
                  type="file"
                  id="solutionFile"
                  name="solutionFile"
                  onChange={handleInputChange}
                  accept=".txt,.pdf,.ppt,.pptx"
                />
              </div>

              <div className="form-group">
                <label htmlFor="deadline">Deadline:</label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={taskData.deadline}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="modal-footer">
                <button onClick={handleSubmit} className="submit-btn">
                  Add Task
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
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
