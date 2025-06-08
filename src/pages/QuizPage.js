import React, { useState } from 'react';
import Question from "../Components/Question"
import { quesdata } from "../core/data/Questions";

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(quesdata.length).fill(null));

  const goToNext = () => {
    if (currentIndex < quesdata.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAnswer = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  return (
    <div>
      <Question 
        question={quesdata[currentIndex]} 
        onNext={goToNext} 
        onPrevious={goToPrevious} 
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
        className={`pagination-button ${isAnswered ? 'answered' : 'unanswered'} ${isActive ? 'active' : ''}`}
      >
        {idx + 1}
      </button>
    );
  })}
</div>
</div>
  );
};