import "./score.scss";
import { useQuiz } from "../../context/quiz";
import { useNavigate } from "react-router-dom";

export default function Score() {
  const {
    quiz: { quizData, session },
    dispatchQuiz,
  } = useQuiz();
  const navigate = useNavigate();

  function restartQuizHandler() {
    dispatchQuiz({ type: "RESET_QUIZ" });
    navigate("/instruction");
  }

  return (
    <div className="score">
      <h3>Score: {session.score}</h3>
      <ol>
        {quizData.questions.map(({ question, options, points }, questNum) => (
          <li>
            <p>{question}</p>
            <p>Points: {points}</p>
            <ul>
              {options.map(({ option, isRight }) => (
                <li
                  style={{
                    background: isRight
                      ? "green"
                      : session.response[questNum] === option && !isRight
                      ? "red"
                      : "",
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <button onClick={restartQuizHandler}>play again</button>
    </div>
  );
}
