const WelcomeScreen = ({ onStart }) => {
  return (
    <section className="container section-welcome">
      <h1 className="main-heading">Welcome to Our Survey</h1>
      <button onClick={onStart}>Start Survey</button>
    </section>
  );
};

export default WelcomeScreen;
