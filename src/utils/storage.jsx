// Function to initialize the session
export const initializeSession = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem("sessionId", sessionId);
  }
};

// Function to generate a unique session ID
const generateSessionId = () => {
  return "sess-" + Math.random().toString(36).slice(2, 11);
};

// Function to save answers to local storage
export const saveAnswer = (questionId, answer) => {
  const sessionId = localStorage.getItem("sessionId");
  if (!sessionId) return;

  const surveyData = JSON.parse(localStorage.getItem("surveyData")) || {};
  surveyData[sessionId] = surveyData[sessionId] || {};
  surveyData[sessionId][questionId] = answer;

  localStorage.setItem("surveyData", JSON.stringify(surveyData));
};

// Function to get answers from local storage
export const getStoredAnswers = () => {
  const sessionId = localStorage.getItem("sessionId");
  if (!sessionId) return {};

  const surveyData = JSON.parse(localStorage.getItem("surveyData")) || {};
  return surveyData[sessionId] || {};
};

// Function to save survey status
export const saveSurveyStatus = (status) => {
  const sessionId = localStorage.getItem("sessionId");
  if (!sessionId) return;

  const surveyStatus = JSON.parse(localStorage.getItem("surveyStatus")) || {};
  surveyStatus[sessionId] = status;

  localStorage.setItem("surveyStatus", JSON.stringify(surveyStatus));
};

// Function to get survey status
export const getSurveyStatus = () => {
  const sessionId = localStorage.getItem("sessionId");
  if (!sessionId) return null;

  const surveyStatus = JSON.parse(localStorage.getItem("surveyStatus")) || {};
  return surveyStatus[sessionId];
};

// Function to clear survey data
export const clearSurveyData = () => {
  const sessionId = localStorage.getItem("sessionId");
  if (!sessionId) return;

  const surveyData = JSON.parse(localStorage.getItem("surveyData")) || {};
  delete surveyData[sessionId];
  localStorage.setItem("surveyData", JSON.stringify(surveyData));
};
