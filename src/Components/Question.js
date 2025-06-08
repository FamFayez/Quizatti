

export default function Question({
  question,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  onAnswerSelect,
  selectedAnswer
}) {
  const renderOption = (key) => (
    <p
      className={`option ${selectedAnswer === key ? 'selected' : ''}`}
      onClick={() => onAnswerSelect(key)}
    >
      {question[key]}
    </p>
  );

  return (
    <div className="question">
      <h4>Question {question.QuestionNum}</h4>
      <h1>{question.Question}</h1>

      <div className="options-container">
        {renderOption('A')}
        {renderOption('B')}
      </div>
      <div className="options-container">
        {renderOption('C')}
        {renderOption('D')}
      </div>

      <div className="button-container">
        {!isFirst && <button onClick={onPrevious}>&laquo;</button>}
        {!isLast ? (
          <button onClick={onNext}>&raquo;</button>
        ) : (
          <button onClick={() => alert("Quiz submitted!")}>Submit</button>
        )}
      </div>
    </div>
  );
}
