export default function Question({
  number = 1,
  question,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  onAnswerSelect,
  selectedOption
}) {
  const renderOption = (key) => {
    return (
      <p
        className={`option ${selectedOption === key ? "selected" : ""}`}
        onClick={() => onAnswerSelect(key)}
      >
        {question[key]}
      </p>
    );
  };

  return (
    <div className="question">
      <h4>Question {number}</h4>
      <h1>{question?.question}</h1>

      <div className="options-container">
        {renderOption("answerA")}
        {renderOption("answerB")}
      </div>
      <div className="options-container">
        {renderOption("answerC")}
        {renderOption("answerD")}
      </div>

      <div className="button-container">
        {
          <button disabled={isFirst} onClick={onPrevious}>
            &laquo; Previous
          </button>
        }
        {
          <button disabled={isLast} onClick={onNext}>
            Next &raquo;
          </button>
        }
      </div>
    </div>
  );
}
