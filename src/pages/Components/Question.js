

export default function Question({ question, onNext, onPrevious, isFirst, isLast }) {
  return (
    <div className="question">
      <h4>Question {question.QuestionNum}</h4>
      <h1>{question.Question}</h1>

      <div className="options-container">
        <p className="option">{question.A}</p>
        <p className="option">{question.B}</p>
      </div>
      <div className="options-container">
        <p className="option">{question.C}</p>
        <p className="option">{question.D}</p>
      </div>

      <div className="button-container">
        {!isFirst && (
          <button onClick={onPrevious}>&laquo;</button>
        )}

        {!isLast ? (
          <button onClick={onNext}>&raquo;</button>
        ) : (
          <button onClick={() => alert("Quiz submitted!")}>Submit</button>
        )}
      </div>
    </div>
  );
}
