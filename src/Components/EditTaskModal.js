import React, { useState, useEffect } from 'react';
import '../style/EditModal.css';

const EditTaskModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    solutionFile: null,
    deadline: ''
  });

  useEffect(() => {
    if (initialData) {
      // Format the date to YYYY-MM-DD for the date input
      const formattedDeadline = initialData.deadline 
        ? new Date(initialData.deadline).toISOString().split('T')[0]
        : '';

      setFormData({
        name: initialData.name || '',
        solutionFile: initialData.solutionFile || null,
        deadline: formattedDeadline
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only include fields that have been changed
    const updatedData = {};
    if (formData.name !== initialData.name) updatedData.name = formData.name;
    if (formData.solutionFile !== initialData.solutionFile) updatedData.solutionFile = formData.solutionFile;
    if (formData.deadline !== initialData.deadline) updatedData.deadline = formData.deadline;
    
    onSave(updatedData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Task Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter task name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="solutionFile">Solution File:</label>
            <input
              type="file"
              id="solutionFile"
              name="solutionFile"
              onChange={handleChange}
              accept=".txt,.pdf,.ppt,.pptx"
            />
            {initialData.solutionFile && (
              <p className="current-file">
                Current file: {initialData.solutionFile.name || 'Solution file'}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Deadline:</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal; 