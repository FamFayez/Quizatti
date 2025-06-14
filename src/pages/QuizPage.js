import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Question from "../Components/Question";
import "../style/stylee.css";
import { getData, patchDataToken, postData } from "../axios/axiosHelper";
import { HOME_URL, QUIZ_API_URL } from "../utils/constants";
import { Stack } from "@mui/material";
import { Pagination } from "@mui/material";
import Spinner from "../shared/Spinner";
import toastMsg from "../functions/toastMsg";

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useLocation().state;
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(new Date());
  const [quizStartedAt, setQuizStartedAt] = useState(null);
  const [quizDuration, setQuizDuration] = useState(30);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(
    quizQuestions.map((q) => ({
      question: q._id,
      selectedOption: null
    }))
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (state && state.questions?.length === 0) {
    setLoading(true);
    getData(`${QUIZ_API_URL}/${id}/getQuestions`)
      .then((res) => {
        setAnswers(
          res.data.data.map((q) => ({
            question: q._id,
            selectedOption: q.selectedOption || null
          }))
        );
        setQuizQuestions(res.data.data);
        setQuizStartedAt(res.data.startedAt);
        setQuizDuration(res.data.duration);
      })
      .catch((err) => {
        toastMsg(err.response.data.message, "error");
        navigate(-1);
      })
      .finally(() => {
        setLoading(false);
      });
    // } else {
    //   const { questions = [], startedAt, duration = 30 } = state;
    //   setQuizQuestions(questions);
    //   setQuizStartedAt(startedAt);
    //   setQuizDuration(duration);
    // }
  }, []);

  // Timer state
  const [seconds, setSeconds] = useState(0);

  // Timer logic
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
      // Check if time is up
      if (quizStartedAt) {
        const endTime = new Date(quizStartedAt);
        endTime.setMinutes(endTime.getMinutes() + quizDuration);
        const now = new Date();
        if (now >= endTime) {
          endQuiz(id, answers);
          navigate(HOME_URL);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted, quizStartedAt, quizDuration]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${hrs.toString().padStart(2, "0")}:
            ${mins.toString().padStart(2, "0")}:
            ${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = async (index, answer) => {
    let updated = [...answers];
    updated = updated.map((a) => {
      if (a.question === quizQuestions[index]._id) {
        a.selectedOption = answer;
      }
      return a;
    });
    setAnswers(updated);
    await patchDataToken(`${QUIZ_API_URL}/${id}/updateState`, {
      questions: updated.filter((a) => a.selectedOption !== null)
    })
      .then((res) => {
        setLastUpdatedAt(new Date(res.data.updatedAt));
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleSubmit = () => {
    const confirmSubmit = window.confirm("Submit your quiz?");
    if (!confirmSubmit) {
      return;
    }
    endQuiz(id, answers);
  };

  const endQuiz = async (id, answers) => {
    setLoading(true);
    postData(
      `${QUIZ_API_URL}/${id}/end`,
      {
        questions: answers.filter((a) => a.selectedOption !== null)
      },
      true
    )
      .then((res) => {
        toastMsg(res.data.message);
        setIsSubmitted(true);
      })
      .catch((err) => {
        toastMsg(err.response.data.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getScore = () => {
    return quizQuestions.reduce((acc, q, i) => {
      return answers[i] === q.Answer ? acc + 1 : acc;
    }, 0);
  };

  return (
    <div className="quiz-container">
      {loading && <Spinner />}
      {/* Timer */}
      <div className="quiz-timer">
        <h3>
          🕒 Time Left:{" "}
          {quizStartedAt
            ? (() => {
                const endTime = new Date(quizStartedAt);
                endTime.setMinutes(endTime.getMinutes() + quizDuration);
                const now = new Date();
                const diffMs = endTime - now;
                const diffMins = Math.floor(diffMs / 60000);
                const diffSecs = Math.floor((diffMs % 60000) / 1000);
                return `${diffMins}:${diffSecs.toString().padStart(2, "0")}`;
              })()
            : "--:--"}{" "}
          / {quizDuration}:00
        </h3>
      </div>

      {!isSubmitted ? (
        !loading &&
        quizQuestions?.length > 0 && (
          <>
            <Question
              number={currentIndex + 1}
              question={quizQuestions[currentIndex]}
              onNext={() =>
                setCurrentIndex((prev) =>
                  Math.min(prev + 1, quizQuestions.length - 1)
                )
              }
              onPrevious={() =>
                setCurrentIndex((prev) => Math.max(prev - 1, 0))
              }
              isFirst={currentIndex === 0}
              isLast={currentIndex === quizQuestions.length - 1}
              onAnswerSelect={(answer) => handleAnswer(currentIndex, answer)}
              selectedOption={
                answers.find(
                  (a) => a.question === quizQuestions[currentIndex]._id
                )?.selectedOption || null
              }
            />

            <div className="flex-center" style={{ marginTop: "20px" }}>
              <Stack spacing={2}>
                <Pagination
                  count={quizQuestions.length}
                  page={currentIndex + 1}
                  onChange={(_, page) => setCurrentIndex(page - 1)}
                  color="primary"
                />
              </Stack>
            </div>

            {/* <div className="pagination">
              {quizQuestions.map((_, idx) => {
                const isAnswered = answers[idx] !== null;
                const isActive = currentIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`pagination-button ${
                      isAnswered ? "answered" : "unanswered"
                    } ${isActive ? "active" : ""}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div> */}

            <div className="submit-section">
              <button className="submit-btn" onClick={handleSubmit}>
                Submit Quiz
              </button>
              <p className="fw-light mt-2" style={{ fontSize: "14px" }}>
                Last update: {lastUpdatedAt.toLocaleString().split(", ")[1]}
              </p>
            </div>
          </>
        )
      ) : (
        <div className="result-box">
          <h2>Quiz Result</h2>
          <p>Total Questions: {quizQuestions.length}</p>
          <p>Correct Answers: {getScore()}</p>
          <p>Incorrect Answers: {quizQuestions.length - getScore()}</p>
          <p>
            Your Score: {((getScore() / quizQuestions.length) * 100).toFixed(2)}
            %
          </p>
          <p>Total Time Taken: {formatTime(seconds)}</p>

          {/* Back to Home Button */}
          <Link to={HOME_URL} className="back-home-button">
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}
