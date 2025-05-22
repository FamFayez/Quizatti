import React, { useState } from "react";
import Question from "../Question";
import { quesdata } from "../../../core/data/Questions";

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div>
      <Question
        question={quesdata[currentIndex]}
        onNext={goToNext}
        onPrevious={goToPrevious}
        isFirst={currentIndex === 0}
        isLast={currentIndex === quesdata.length - 1}
      />
    </div>
  );
}
