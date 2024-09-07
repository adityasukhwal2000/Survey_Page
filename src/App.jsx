import { useState } from "react";
import Welcome from "./pages/Welcome";
import Survey from "./pages/Survey";
const App = () => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className="app-container">
      {!started ? <Welcome onStart={handleStart} /> : <Survey />}
    </div>
  );
};

export default App;
