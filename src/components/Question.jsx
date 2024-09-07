import Rating from "./Rating";

const Question = ({ question, answer, onAnswerChange, questionNum }) => {
  const handleRatingSelect = (value) => {
    onAnswerChange(value);
  };

  return (
    <div className="question">
      <p>{questionNum + 1}. {question.question}</p>
      {question.type === "rating" && (
        <Rating
          value={parseInt(answer)}
          onChange={handleRatingSelect}
          question={question}
        />
      )}
      {question.type === "text" && (
        <textarea
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default Question;
