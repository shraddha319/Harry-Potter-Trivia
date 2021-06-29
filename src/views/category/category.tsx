import { useQuiz } from "../../context/quiz";
import { Link } from "react-router-dom";

export default function Category() {
  const {
    quiz: { quizData },
    dispatchQuiz,
  } = useQuiz();

  return (
    <div className="category">
      <p>choose a category</p>
      {quizData.categories.map((category) => (
        <div>
          <input
            onChange={() =>
              dispatchQuiz({ type: "SET_QUIZ_CATEGORY", payload: { category } })
            }
            type="radio"
            name="quiz-category"
            value={category.category}
          />
          <label>{category.category}</label>
        </div>
      ))}
      <Link to="/instruction">continue</Link>
    </div>
  );
}
