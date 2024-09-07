const SurveyButtons = ({
  onPrevious,
  onNext,
  onSkip,
  onSubmit,
  isLastQuestion,
  isFirstQuestion,
}) => {
  return (
    <section className="section-surveyButtons">
      <button
        className="survey-button"
        onClick={onPrevious}
        disabled={isFirstQuestion}
      >
        Previous
      </button>
      <button className="survey-button" onClick={onSkip}>
        Skip
      </button>
      {isLastQuestion ? (
        <button className="survey-button" onClick={onSubmit}>
          Submit
        </button>
      ) : (
        <button className="survey-button" onClick={onNext}>
          Next
        </button>
      )}
    </section>
  );
};

export default SurveyButtons;
