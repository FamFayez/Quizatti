import React, { useState } from "react";
import "../style/QuestionBank.css";
import { quesdata } from "../core/data/Questions";

const QuestionBank = () => {
  const [questions, setQuestions] = useState(quesdata);

  const handleRemove = (questionNum) => {
    const confirmDelete = window.confirm("You really want to remove that question?");
    if (confirmDelete) {
      const updated = questions.filter((q) => q.QuestionNum !== questionNum);
      setQuestions(updated);
    }
  };

  return (
    <div className="question-bank-container">
      <h2>Question Bank</h2>
      <table className="question-bank-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Option A</th>
            <th>Option B</th>
            <th>Option C</th>
            <th>Option D</th>
            <th>Answer</th>
            <th>Chapter</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.QuestionNum}>
              <td>{q.Question}</td>
              <td>{q.A}</td>
              <td>{q.B}</td>
              <td>{q.C}</td>
              <td>{q.D}</td>
              <td>{q.Answer}</td>
              <td>{q.chapter}</td>
              <td>{q.level}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleRemove(q.QuestionNum)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;
