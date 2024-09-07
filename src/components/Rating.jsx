const Rating = ({ value, onChange, question }) => {
  const handleClick = (rating) => {
    onChange(rating);
  };

  return (
    <section className="section-rating">
      {Array.from({ length: question.options.length }, (_, index) => (
        <div
          key={index + 1}
          className={`rating-circle ${value >= index + 1 ? "selected" : ""}`}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </div>
      ))}
    </section>
  );
};

export default Rating;
