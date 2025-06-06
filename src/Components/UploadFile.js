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
      note: showNote ? note : "", // Include note only if showNote is true
    };

    onFileUpload(newLecture);

    setTitle("");
    setFile(null);
    setNote("");
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
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      </div>
      {showNote && (
        <div>
          <input
            type="text"
            placeholder="Optional note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      )}
      <button type="submit">Upload Lecture</button>
    </form>
  );
};

export default UploadFile;
