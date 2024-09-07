import { useEffect, useState } from "react";

const ThankYou = () => {
  const [time, setTime] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(timer);
          // Redirect to Welcome screen
          window.location.reload();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Clean up timer
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container section-thankYou">
      <p className="emojis">🙂🙂🙂🙂</p>
      <h3 className="thank-you-heading">Thank you for your time!</h3>
      <p className="redirect">
        You will be redirecting to Welcome screen in {time + 1} seconds...
      </p>
    </section>
  );
};

export default ThankYou;
