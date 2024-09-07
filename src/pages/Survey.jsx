import { useState, useEffect } from "react";
import {
  saveAnswer,
  saveSurveyStatus,
  clearSurveyData,
  initializeSession,
  getStoredAnswers,
} from "../utils/storage";
import ThankYou from "../components/ThankYou";
import Question from "../components/Question";
import SurveyButtons from "../components/SurveyButtons";

// Load questions from JSON file | here don't need fetch but for dynamic data we need fetch
const loadQuestions = async () => {
  const response = await fetch("/questions.json");
  const data = await response.json();
  return data;
};

// Main Survey component
const Survey = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const loadedQuestions = await loadQuestions();
      setQuestions(loadedQuestions);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    // Initialize session when the component first run
    initializeSession();
    // Clear survey data if starting a new survey session
    clearSurveyData();
    // Load previously saved answers
    const savedAnswers = getStoredAnswers();
    setAnswers(savedAnswers);
  }, []);

  const handleAnswerChange = (questionId, newAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: newAnswer,
    }));
  };

  const handleNext = () => {
    // Save the current answer
    saveAnswer(
      questions[currentIndex].id,
      answers[questions[currentIndex].id] || "skipped"
    );
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of survey
      saveSurveyStatus("COMPLETED");
      setShowThanks(true);
    }
  };

  const handlePrevious = () => {
    // Save the current answer
    saveAnswer(
      questions[currentIndex].id,
      answers[questions[currentIndex].id] || "skipped"
    );
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    saveAnswer(questions[currentIndex].id, "skipped");
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (window.confirm("Are you sure you want to submit the survey?")) {
      // End of survey
      saveSurveyStatus("COMPLETED");
      setShowThanks(true);
    }
  };

  const handleSubmit = () => {
    if (window.confirm("Are you sure you want to submit the survey?")) {
      // Save the last answer
      saveAnswer(
        questions[currentIndex].id,
        answers[questions[currentIndex].id] || "skipped"
      );
      saveSurveyStatus("COMPLETED");
      setShowThanks(true);
    }
  };

  if (showThanks) {
    return <ThankYou />;
  }

  if (questions.length === 0)
    return <div className="container loading-div">Loading...</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="container">
      <h3 className="survey-heading">Customer Survey</h3>
      <p className="num-of-question">{`Question ${currentIndex + 1} / ${
        questions.length
      }`}</p>
      <Question
        question={currentQuestion}
        answer={answers[currentQuestion.id] || ""}
        onAnswerChange={(newAnswer) =>
          handleAnswerChange(currentQuestion.id, newAnswer)
        }
        questionNum={currentIndex}
      />
      <SurveyButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSkip={handleSkip}
        onSubmit={handleSubmit}
        isLastQuestion={currentIndex === questions.length - 1}
        isFirstQuestion={currentIndex === 0}
      />
    </div>
  );
};

export default Survey;
