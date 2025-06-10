import React, { useState } from "react";
import "../style/QuestionBank.css";
import QUESTIONBankHook from "../hooks/QuestionBankHook";
import { postData, deleteDataToken } from "../axios/axiosHelper";
import { QUESTION_Bank_API_URL } from "../utils/constants";
import toastMsg from "../functions/toastMsg";

const getDifficultyText = (level) => {
  switch (level) {
    case 1:
      return "Easy";
    case 2:
      return "Medium";
    case 3:
      return "Hard";
    default:
      return "Unknown";
  }
};

const QuestionBank = () => {
  const { Questions, isLoading } = QUESTIONBankHook();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
    correctAnswer: "",
    chapterNo: "",
    difficultyLevel: "1",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { question, answerA, answerB, answerC, answerD, correctAnswer, chapterNo } = formData;

    if (!question.trim()) {
      toastMsg("Question text is required.", "error");
      return false;
    }

    const options = [answerA, answerB, answerC, answerD];
    const filledOptions = options.filter((opt) => opt.trim() !== "");
    if (filledOptions.length < 2) {
      toastMsg("At least two options must be provided.", "error");
      return false;
    }

    const validCorrectAnswers = ["answerA", "answerB", "answerC", "answerD"];
    if (!validCorrectAnswers.includes(correctAnswer)) {
      toastMsg("Correct answer must be one of: answerA, answerB, answerC, or answerD.", "error");
      return false;
    }

    if (!formData[correctAnswer].trim()) {
      toastMsg(`Correct answer (${correctAnswer}) is empty.`, "error");
      return false;
    }

    if (!chapterNo.trim() || isNaN(chapterNo) || parseInt(chapterNo) <= 0) {
      toastMsg("Chapter number must be a positive number.", "error");
      return false;
    }

    return true;
  };

  const handleAddQuestion = async () => {
    if (!validateForm()) return;

    try {
      const dataToSend = {
        ...formData,
        difficultyLevel: parseInt(formData.difficultyLevel),
        chapterNo: parseInt(formData.chapterNo),
      };

      await postData(QUESTION_Bank_API_URL, dataToSend);
      toastMsg("Question added successfully!", "success");
      window.location.reload();
    } catch (err) {
      toastMsg(err.response?.data?.message || "Error adding question", "error");
    }
  };

  const handleRemove = async (id) => {
    const confirmDelete = window.confirm("You really want to remove that question?");
    if (confirmDelete) {
      try {
        await deleteDataToken(`${QUESTION_Bank_API_URL}/${id}`);
        toastMsg("Question deleted successfully!", "success");
        window.location.reload();
      } catch (err) {
        toastMsg(err.response?.data?.message || "Error deleting question", "error");
      }
    }
  };

  return (
    <div className="question-bank-container">
      <h2>Question Bank</h2>
      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "➕ Add Question"}
      </button>

      {showForm && (
        <div className="add-form">
          <input name="question" placeholder="Question Text" onChange={handleInputChange} />
          <input name="answerA" placeholder="Option A" onChange={handleInputChange} />
          <input name="answerB" placeholder="Option B" onChange={handleInputChange} />
          <input name="answerC" placeholder="Option C" onChange={handleInputChange} />
          <input name="answerD" placeholder="Option D" onChange={handleInputChange} />

          {/* ✅ Dropdown for correct answer */}
          <select name="correctAnswer" value={formData.correctAnswer} onChange={handleInputChange}>
            <option value="">Select Correct Answer</option>
            <option value="answerA">Option A</option>
            <option value="answerB">Option B</option>
            <option value="answerC">Option C</option>
            <option value="answerD">Option D</option>
          </select>

          <input name="chapterNo" placeholder="Chapter Number" onChange={handleInputChange} />

          <select name="difficultyLevel" onChange={handleInputChange} value={formData.difficultyLevel}>
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="3">Hard</option>
          </select>

          <button onClick={handleAddQuestion}>OK</button>
        </div>
      )}

      {isLoading ? (
        <p>Loading questions...</p>
      ) : (
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
              <th>Difficulty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Questions.map((q) => (
              <tr key={q._id}>
                <td>{q.question}</td>
                <td>{q.answerA}</td>
                <td>{q.answerB}</td>
                <td>{q.answerC}</td>
                <td>{q.answerD}</td>
                <td>{q[q.correctAnswer]}</td>
                <td>{q.chapterNo}</td>
                <td>{getDifficultyText(q.difficultyLevel)}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleRemove(q._id)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuestionBank;

