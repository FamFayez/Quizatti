import React, { useState } from "react";
import EditSection from "./EditSection";
import "../style/Container.css"; // <-- New CSS for professional styles

const SectionListComponent = ({ contentItems, userRole, onRemoveFile, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditClick = (index, item) => {
    setSelectedItem({ ...item, index });
    setIsModalOpen(true);
  };

  const handleModalSave = (updatedData) => {
    if (selectedItem) {
      const updatedItem = {
        ...selectedItem,
        ...updatedData
      };
      onUpdate(selectedItem.index, updatedItem);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="content-list">
      {contentItems.map((item, index) => (
        <div className="content-card" key={item._id || index}>
          <h2 className="content-title">{item.name}</h2>
          <p className="content-meta">📘 Chapter: {item.chapterNo}</p>
          <p className="content-meta">📅 Uploaded: {new Date(item.createdAt).toLocaleDateString()}</p>

          {item.file ? (
            <div className="content-actions">
              <a
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                className="view-link"
              >
                🔗 View File
              </a>

              {( userRole === "assistant") && (
                <>
                  <button className="btn delete-btn" onClick={() => onRemoveFile(item._id)}>
                    🗑️ Remove
                  </button>
                  <button className="btn edit-btn" onClick={() => handleEditClick(index, item)}>
                    ✏️ Edit
                  </button>
                </>
              )}
            </div>
          ) : (
            <p className="no-file">❌ No file uploaded</p>
          )}
        </div>
      ))}

      <EditSection
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        initialData={selectedItem}
      />
    </div>
  );
};

export default SectionListComponent;

