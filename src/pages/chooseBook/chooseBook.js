import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Container.css";
import "../../style/ChooseBook.css";
import bookImage from "../../assets/img/book.png";
import ImageBackground from "../../Components/ImageBackground";
import chapterTitles from "../../core/data/bookChapters"; 
const ChooseBook = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedChapters([]);
    setErrorMessage("");

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setChapters(chapterTitles); // Use mock chapters for now
    } else {
      setErrorMessage("Please upload a valid PDF file.");
    }
  };

  const handleChapterToggle = (chapter) => {
    setSelectedChapters((prev) =>
      prev.includes(chapter)
        ? prev.filter((ch) => ch !== chapter)
        : [...prev, chapter]
    );
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setErrorMessage("Please upload a book.");
      return;
    }

    if (selectedChapters.length === 0) {
      setErrorMessage("Please select at least one chapter.");
      return;
    }

    setErrorMessage("");
    console.log("Submitted Book:", selectedFile.name);
    console.log("Selected Chapters:", selectedChapters);
    navigate("/Chapter");
  };

  return (
    <div className="container choose-book-layout">
      {/* LEFT: Upload + Chapters */}
      <div className="left-content">
        <div className="book-upload">
          <h2>Upload Book (PDF)</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
          />
        </div>

        {chapters.length > 0 && (
          <div className="chapter-list">
            <h2>Choose Chapters</h2>
            {chapters.map((title, index) => (
              <label key={index} className="chapter-item">
                <input
                  type="checkbox"
                  value={title}
                  checked={selectedChapters.includes(title)}
                  onChange={() => handleChapterToggle(title)}
                />
                {title}
              </label>
            ))}
          </div>
        )}

        {selectedChapters.length > 0 && (
          <div className="summary">
            <h2>Selected Chapters</h2>
            <ul>
              {selectedChapters.map((chapter, index) => (
                <li key={index}>{chapter}</li>
              ))}
            </ul>
          </div>
        )}

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* RIGHT: Image */}
      <div className="right-image">
        <ImageBackground imageSrc={bookImage} altText="Tasks Image" />
      </div>
    </div>
  );
};

export default ChooseBook;
