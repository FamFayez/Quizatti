import { useState } from "react";

const UploadFile = ({ onFileUpload, showNote = true }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !file) return alert("Title and file are required.");

    const newLecture = {
      title,
      file: URL.createObjectURL(file),
      note: showNote ? note : "",
    };

    onFileUpload(newLecture);

    setTitle("");
    setFile(null);
    setNote("");

    // Optionally clear file input manually (if needed)
    e.target.reset?.();
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Enter lecture title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="file"
          accept=".pdf,.ppt,.pptx,.doc,.docx"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
              setFile(selectedFile);
              const fileName = selectedFile.name.replace(/\.[^/.]+$/, ""); // Remove extension
              setTitle(fileName); // Auto-fill title with file name
            }
          }}
          required
        />
      </div>
      {/* {showNote && (
        <div>
          <input
            type="text"
            placeholder="Optional note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      )} */}
      <button type="submit">Upload Lecture</button>
    </form>
  );
};

export default UploadFile;
