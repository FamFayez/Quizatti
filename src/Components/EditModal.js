import React, { useState, useEffect } from 'react';

const EditModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    chapterNo: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        chapterNo: initialData.chapterNo || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow bg-white">
            <div className="modal-header border-bottom bg-white">
              <h5 className="modal-title" id="editModalLabel">Edit Lecture</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
            <div className="modal-body bg-white">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label fw-medium">Lecture Name:</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="chapterNo" className="form-label fw-medium">Chapter Number:</label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    id="chapterNo"
                    name="chapterNo"
                    value={formData.chapterNo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="modal-footer border-top pt-3 bg-white">
                  <button type="button" className="btn btn-light px-4" onClick={onClose}>Cancel</button>
                  <button type="submit" className="btn btn-primary px-4">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default EditModal; 