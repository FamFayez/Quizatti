import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/quiz.css";
import { getData, postData } from "../axios/axiosHelper";
import { COURSE_API_URL, QUIZ_API_URL } from "../utils/constants";
import toastMsg from "../functions/toastMsg";

const QuizSetipPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [duration, setDuration] = useState("");
  const [startTime, setStartTime] = useState("");
  const [difficultyCounts, setDifficultyCounts] = useState({
    easy: "",
    medium: "",
    hard: ""
  });

  const [course, setCourse] = useState({});
  useEffect(() => {
    getData(COURSE_API_URL + `/${courseId}`)
      .then((res) => {
        setCourse(res.data.data);
      })
      .catch((err) => {
        toastMsg(err.response.data.message);
      });
  }, []);

  const handleChapterCheckbox = (e) => {
    const value = e.target.value;
    setSelectedChapters((prev) =>
      prev.includes(value)
        ? prev.filter((chapter) => parseInt(chapter) !== parseInt(value))
        : [...prev, parseInt(value)]
    );
  };

  const handleDifficultyChange = (e) => {
    const { name, value } = e.target;
    setDifficultyCounts((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    await postData(QUIZ_API_URL + `/${courseId}`, {
      name,
      chapters: selectedChapters,
      duration: parseInt(duration),
      startTime,
      numberOfQuestions: parseInt(numQuestions),
      easy: parseInt(difficultyCounts.easy),
      medium: parseInt(difficultyCounts.medium),
      hard: parseInt(difficultyCounts.hard)
    })
      .then((res) => {
        toastMsg(res.data.message, "success");
        navigate(`/course/${courseId}/quizzes`, { state: { course } });
      })
      .catch((err) => {
        toastMsg(err.response.data.message, "error");
      })
      .finally(() => {});
  };

  return (
    <div className="quizContainer">
      <div className="inputGroup">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="inputBox"
        />
      </div>
      <div className="inputGroup">
        <label>Duration</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="inputBox"
        />
      </div>
      <div className="inputGroup">
        <label>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="inputBox"
        />
      </div>
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
        {(course?.chapters?.length > 0
          ? course.chapters
          : course?.chaptersIndexes?.map((ch) => ch.number)
        )?.map((chapter) => (
          <div key={chapter} className="checkboxGroup">
            <input
              type="checkbox"
              value={parseInt(chapter)}
              checked={selectedChapters.includes(chapter)}
              onChange={handleChapterCheckbox}
            />
            <label>{chapter}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="submitButton">
        Submit
      </button>
      {/* {submittedData && (
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
      )} */}
    </div>
  );
};

export default QuizSetipPage;
