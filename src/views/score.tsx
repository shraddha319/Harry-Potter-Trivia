import { useQuiz } from "../context/quiz";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ScoreIcon } from "../images/Quidditch-goals.svg";

export default function Score() {
  const {
    quiz: { session },
    dispatchQuiz,
  } = useQuiz();
  const navigate = useNavigate();

  function restartQuizHandler() {
    dispatchQuiz({ type: "RESET_QUIZ" });
    navigate("/category");
  }

  function optionStyle(userResponse, option, isRight) {
    return isRight
      ? "bg-green-500 border-0 text-white"
      : userResponse === option && !isRight
      ? "bg-red-500 border-0 text-white"
      : "text-gray-500 border-gray-500";
  }

  return (
    <div className="space-y-8 flex flex-col items-center p-4">
      <section className="w-3/5 text-center bg-customGray rounded-2xl text-bold p-4 text-gold m-2 flex flex-row space-x-4">
        <ScoreIcon fill="#CDB750" className="w-14 h-14" />
        <div>
          <p className="text-sm uppercase">Score</p>
          <p className="text-5xl">{session.score}</p>
        </div>
      </section>
      <section>
        <button
          className="mx-auto bg-primary text-white px-4 py-2 rounded text-sm"
          onClick={restartQuizHandler}
        >
          Play Again
        </button>
      </section>
      <section className="space-y-6">
        <header className="space-x-1 space-y-1 w-auto">
          <div className="h-0.5 rounded w-5 bg-primary"></div>
          <h2 className="text-sm text-primary font-semibold tracking-widest">
            Your attempt
          </h2>
        </header>
        <ol className="space-y-8">
          {session.categorySelected.questions.map(
            ({ question, options }, questNum) => (
              <li>
                <p className="text-sm text-customGray">{question}</p>
                <ul>
                  {options.map(({ option, isRight }) => (
                    <li
                      className={`${optionStyle(
                        session.response[questNum],
                        option,
                        isRight
                      )} text-xs text-center my-2 mx-4 p-2 border-2 rounded-full`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
        </ol>
      </section>
    </div>
  );
}
