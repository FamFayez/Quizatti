import React, { useState } from "react";
import EditModal from "./EditModal";
import "../style/Container.css"; // <-- New CSS for professional styles

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
      setIsModalOpen(false);
    }
  };

  return (
    <div className="content-list m-0">
      {contentItems.map((item, index) => (
        <div className="content-card" key={item._id || index}>
          <h2 className="content-title">{item.name}</h2>
          <p className="content-meta">📘 Chapter: {item.chapterNo}</p>
          <p className="content-meta">
            📅 Uploaded: {new Date(item.createdAt).toLocaleDateString()}
          </p>

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

              {userRole === "teacher" && (
                <>
                  <button
                    className="btn delete-btn m-0"
                    onClick={() => onRemoveFile(item._id)}
                  >
                    🗑️ Remove
                  </button>
                  <button
                    className="btn edit-btn m-0"
                    onClick={() => handleEditClick(index, item)}
                  >
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

