import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/quiz.css";

const QuizSetipPage = () => {
  const [numQuestions, setNumQuestions] = useState("");
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [time, setTime] = useState("");
  const [grade, setGrade] = useState("");
  const [difficultyCounts, setDifficultyCounts] = useState({
    easy: "",
    medium: "",
    hard: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChapterCheckbox = (e) => {
    const value = e.target.value;
    setSelectedChapters((prev) =>
      prev.includes(value)
        ? prev.filter((chapter) => chapter !== value)
        : [...prev, value]
    );
  };

  const handleDifficultyChange = (e) => {
    const { name, value } = e.target;
    setDifficultyCounts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const totalDifficulty =
      Number(difficultyCounts.easy) +
      Number(difficultyCounts.medium) +
      Number(difficultyCounts.hard);

    if (
      Number(numQuestions) <= 0 ||
      Number(time) <= 0 ||
      Number(grade) <= 0 ||
      selectedChapters.length === 0
    ) {
      setError(
        "Please fill in all fields correctly (values > 0 and at least one chapter selected)."
      );
      setSubmittedData(null);
      return;
    }

    if (totalDifficulty !== Number(numQuestions)) {
      setError(
        `The sum of easy, medium, and hard questions must equal ${numQuestions}. Currently: ${totalDifficulty}`
      );
      setSubmittedData(null);
      return;
    }

    setError("");
    setSubmittedData({
      numQuestions,
      selectedChapters,
      time,
      grade,
      difficultyCounts,
    });
  };

  const goToQuizPage = () => {
    navigate("/quiz");
  };

  return (
    <div className="quizContainer">
      <div className="inputGroup">
        <label>Number of Questions</label>
        <input
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          className="inputBox"
        />
      </div>

      <div className="inputGroup">
        <label>Difficulty Distribution</label>
        <div className="difficultyInputs">
          <input
            type="number"
            name="easy"
            placeholder="Easy"
            value={difficultyCounts.easy}
            onChange={handleDifficultyChange}
            className="inputBox"
          />
          <input
            type="number"
            name="medium"
            placeholder="Medium"
            value={difficultyCounts.medium}
            onChange={handleDifficultyChange}
            className="inputBox"
          />
          <input
            type="number"
            name="hard"
            placeholder="Hard"
            value={difficultyCounts.hard}
            onChange={handleDifficultyChange}
            className="inputBox"
          />
        </div>
      </div>

      <div className="inputGroup">
        <label>Chapters</label>
        {["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"].map((chapter) => (
          <div key={chapter} className="checkboxGroup">
            <input
              type="checkbox"
              value={chapter}
              checked={selectedChapters.includes(chapter)}
              onChange={handleChapterCheckbox}
            />
            <label>{chapter}</label>
          </div>
        ))}
      </div>

      <div className="inputGroup">
        <label>Time (minutes)</label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="inputBox"
        />
      </div>

      <div className="inputGroup">
        <label>Grade</label>
        <input
          type="number"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="inputBox"
        />
      </div>

      {error && <div className="errorMessage">{error}</div>}

      <button onClick={handleSubmit} className="submitButton">
        Submit
      </button>

      {submittedData && (
        <div className="submittedSection">
          <div className="submittedData">
            <h3>Submitted Data</h3>
            <p>Number of Questions: {submittedData.numQuestions}</p>
            <p>Easy: {submittedData.difficultyCounts.easy}</p>
            <p>Medium: {submittedData.difficultyCounts.medium}</p>
            <p>Hard: {submittedData.difficultyCounts.hard}</p>
            <p>Chapters: {submittedData.selectedChapters.join(", ")}</p>
            <p>Time: {submittedData.time} min</p>
            <p>Grade: {submittedData.grade}</p>
          </div>
          <button onClick={goToQuizPage} className="quizPageButton">
            Go to Quiz Page
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizSetipPage;
