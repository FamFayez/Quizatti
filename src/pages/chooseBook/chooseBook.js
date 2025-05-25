import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Container.css";
import "../../style/ChooseBook.css";
import book from "../../assets/img/book.png";
import ImageBackground from "../../Components/ImageBackground";

const books = [
  {
    id: 1,
    name: "Math",
    chapters: [
      "Algebra",
      "Geometry",
      "Calculus",
      "Algebra",
      "Geometry",
      "Calculus",
      "Algebra",
      "Geometry",
      "Calculus",
      "Algebra",
      "Geometry",
      "Calculus",
      "Algebra",
      "Geometry",
      "Calculus",
      "Algebra",
      "Geometry",
      "Calculus",
      "Algebra",
      "Geometry",
      "Calculus",
    ],
  },
  { id: 2, name: "Science", chapters: ["Physics", "Chemistry", "Biology"] },
];

const ChooseBook = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const navigate = useNavigate();

  const handleBookChange = (e) => {
    const book = books.find((b) => b.name === e.target.value);
    console.log("Selected Book:", book); // Debugging: track book change
    setSelectedBook(book);
    setSelectedChapters([]);
    setErrorMessage(""); // Reset error message when book is selected
  };

  const handleChapterToggle = (chapter) => {
    console.log("Toggling chapter:", chapter); // Debugging: track chapter toggle
    setSelectedChapters((prev) =>
      prev.includes(chapter)
        ? prev.filter((ch) => ch !== chapter)
        : [...prev, chapter]
    );
  };

  const handleSubmit = () => {
    console.log("Selected Book:", selectedBook); // Debugging: check selectedBook value
    console.log("Selected Chapters:", selectedChapters); // Debugging: check selectedChapters value

    // Validate that a book and at least one chapter are selected
    if (!selectedBook) {
      setErrorMessage("Please select a book.");
      return;
    }

    if (selectedChapters.length === 0) {
      setErrorMessage("Please select at least one chapter.");
      return;
    }

    // If validation passes, navigate to the next page
    setErrorMessage(""); // Clear error message if validation passes
    navigate("/Chapter");
  };

  return (
    <div className="container choose-book-layout">
      {/* LEFT: Book Selection */}
      <div className="left-content">
        <div className="book-select">
          <h2>Select a Book</h2>
          <select onChange={handleBookChange} defaultValue="">
            <option value="" disabled>
              -- Choose Book --
            </option>
            {books.map((book) => (
              <option key={book.id} value={book.name}>
                {book.name}
              </option>
            ))}
          </select>
        </div>

        {selectedBook && (
          <div className="chapter-list">
            <h2>Choose Chapters</h2>
            {selectedBook.chapters.map((chapter, index) => (
              <label key={index} className="chapter-item">
                <input
                  type="checkbox"
                  value={chapter}
                  checked={selectedChapters.includes(chapter)}
                  onChange={() => handleChapterToggle(chapter)}
                />
                {chapter}
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

        {/* Display error message if there's any */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* RIGHT: Image */}
      <div className="right-image">
        <ImageBackground imageSrc={book} altText="Tasks Image" />
      </div>
    </div>
  );
};

export default ChooseBook;
