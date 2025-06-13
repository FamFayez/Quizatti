import { useState } from "react";
import "../style/UploadLecture.css"; // Create or update your CSS file as needed
import { toast } from "react-toastify";

const UploadFile = ({ onFileUpload }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [chapterNo, setChapterNo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !file) {
      toast.error("Please provide both title and file.");
      return;
    }

    onFileUpload({
      title,
      chapterNo,
      file,
    });

    toast.success("Lecture added successfully!");
    setTitle("");
    setFile(null);
    setChapterNo("");
    setShowForm(false);
  };

  return (
    <div className="upload-container">
      {!showForm ? (
        <button className="upload-toggle-btn" onClick={() => setShowForm(true)}>
          📤 Upload Lecture
        </button>
      ) : (
        <form className="upload-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Lecture title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="file"
            accept=".pdf,.ppt,.pptx,.doc,.docx"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile) {
                setFile(selectedFile);
                const fileName = selectedFile.name.replace(/\.[^/.]+$/, "");
                if (!title) setTitle(fileName);
              }
            }}
            required
          />

          <input
            type="text"
            placeholder="Chapter Number (optional)"
            value={chapterNo}
            onChange={(e) => setChapterNo(e.target.value)}
          />

          <div className="form-actions">
            <button type="submit" className="ok-btn">OK</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UploadFile;
