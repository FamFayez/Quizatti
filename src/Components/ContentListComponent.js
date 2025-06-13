import React, { useState } from "react";
import EditModal from "./EditModal";

const ContentListComponent = ({ contentItems, userRole, onRemoveFile, onUpdate }) => {
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
    }
  };

  return (
    <div className="content-list">
      {contentItems.map((item, index) => (
        <div className="section-block" key={item._id || index}>
          <h2>{item.name}</h2>
          <p>Chapter: {item.chapterNo}</p>
          <p>Uploaded: {new Date(item.createdAt).toLocaleDateString()}</p>

          {item.file ? (
            <div>
              <a href={item.file} target="_blank" rel="noopener noreferrer">
                View File
              </a>
              {userRole === "assistant" || userRole === "teacher" && (
                <button
                  className="delete-btn"
                  onClick={() => onRemoveFile(item._id)}
                >
                  🗑️ Remove File
                </button>
              )}
              {(userRole === "teacher" || userRole === "assistant") && (
                <button onClick={() => handleEditClick(index, item)}>✏️ Edit</button>
              )}
            </div>
          ) : (
            <p>No file uploaded</p>
          )}
        </div>
      ))}

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        initialData={selectedItem}
      />
    </div>
  );
};

export default ContentListComponent;
