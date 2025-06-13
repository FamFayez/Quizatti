import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Question from "../Components/Question";
import { quesdata } from "../core/data/Questions";
import "../style/stylee.css";

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(quesdata.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer state
  const [seconds, setSeconds] = useState(0);

  // Timer logic
  useEffect(() => {
    if (isSubmitted) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${hrs.toString().padStart(2, "0")}:
            ${mins.toString().padStart(2, "0")}:
            ${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (index, answer) => {
    const updated = [...answers];
    updated[index] = answer;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    const confirmSubmit = window.confirm("Submit your quiz?");
    if (confirmSubmit) {
      setIsSubmitted(true);
    }
  };

  const getScore = () => {
    return quesdata.reduce((acc, q, i) => {
      return answers[i] === q.Answer ? acc + 1 : acc;
    }, 0);
  };

  return (
    <div className="quiz-container">
      {/* Timer */}
      <div className="quiz-timer">
        <h3>🕒 Time Elapsed: {formatTime(seconds)}</h3>
      </div>

      {!isSubmitted ? (
        <>
          <Question
            question={quesdata[currentIndex]}
            onNext={() =>
              setCurrentIndex((prev) =>
                Math.min(prev + 1, quesdata.length - 1)
              )
            }
            onPrevious={() =>
              setCurrentIndex((prev) => Math.max(prev - 1, 0))
            }
            isFirst={currentIndex === 0}
            isLast={currentIndex === quesdata.length - 1}
            onAnswerSelect={(answer) => handleAnswer(currentIndex, answer)}
            selectedAnswer={answers[currentIndex]}
          />

          <div className="pagination">
            {quesdata.map((_, idx) => {
              const isAnswered = answers[idx] !== null;
              const isActive = currentIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`pagination-button ${isAnswered ? "answered" : "unanswered"} ${isActive ? "active" : ""}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {currentIndex === quesdata.length - 1 && (
            <div className="submit-section">
              <button className="submit-btn" onClick={handleSubmit}>
                Submit Quiz
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="result-box">
          <h2>Quiz Result</h2>
          <p>Total Questions: {quesdata.length}</p>
          <p>Correct Answers: {getScore()}</p>
          <p>Incorrect Answers: {quesdata.length - getScore()}</p>
          <p>Your Score: {((getScore() / quesdata.length) * 100).toFixed(2)}%</p>
          <p>Total Time Taken: {formatTime(seconds)}</p>

          {/* Back to Home Button */}
          <Link to="/" className="back-home-button">
             Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}
