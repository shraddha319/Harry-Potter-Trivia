import { useQuiz } from "../context";

import { Link, useNavigate } from "react-router-dom";
import { Option } from "../types/quiz";
import { useEffect } from "react";

export default function Quiz() {
  const {
    quiz: { quizData, session },
    dispatchQuiz,
  } = useQuiz();
  const navigate = useNavigate();

  function optionBtnColor({ option, isRight }: Option) {
    if (session.answered) {
      if (isRight) return "bg-green-500 border-0 text-white";
      if (session.response[session.questNum] === option)
        return "bg-red-500 border-0 text-white";
    }
    return "text-gray-500 border-gray-500 hover:text-gray-700 hover:border-gray-700";
  }

  function restartQuizHandler() {
    dispatchQuiz({ type: "RESET_QUIZ" });
    navigate("/category");
  }

  useEffect(() => {
    const intervalId: ReturnType<typeof setInterval> = setInterval(
      () => dispatchQuiz({ type: "DECREMENT_TIMER" }),
      1000
    );

    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      if (session.questNum === session.categorySelected.questions.length - 1)
        navigate("/score");
      dispatchQuiz({
        type: "CLEAR_TIMER",
        payload: {
          questNum:
            session.questNum < session.categorySelected.questions.length - 1
              ? session.questNum + 1
              : 0,
        },
      });
    }, 15000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [session.questNum]);

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-lg text-center uppercase tracking-widest text-primary">
        {session.categorySelected.category}
      </h1>
      <div className="flex flex-row justify-between items-center w-full mx-6">
        <div className="w-15 px-2 py-4 h-5 rounded bg-gold text-white flex justify-center items-center text-sm uppercase tracking-wider">
          Score
          <strong className="ml-2 text-bold text-lg">{session.score}</strong>
        </div>
        <div className="w-14 h-14 p-1 rounded-full flex items-center justify-center rounded-full bg-primary text-white text-bold text-2xl">
          {session.timer}
        </div>
        <div className="w-15 h-4 rounded text-gray-500 text-bold">
          Points: {session.categorySelected.questions[session.questNum].points}
        </div>
      </div>
      <p className="text-sm text-customGray text-center">
        {session.questNum + 1}.{" "}
        {session.categorySelected.questions[session.questNum].question}
      </p>
      <ol className="flex flex-col w-3/5">
        {session.categorySelected.questions[session.questNum].options.map(
          ({ option, isRight }) => (
            <li>
              <button
                className={`text-xs m-1 p-2 min-w-full border-2 rounded-full ${optionBtnColor(
                  {
                    option,
                    isRight,
                  }
                )}`}
                disabled={session.answered}
                onClick={() =>
                  dispatchQuiz({
                    type: "STORE_USER_RESPONSE",
                    payload: {
                      questNum: session.questNum,
                      userResponse: option,
                      answered: true,
                      points: isRight
                        ? session.categorySelected.questions[session.questNum]
                            .points
                        : 0,
                    },
                  })
                }
              >
                {option}
              </button>
            </li>
          )
        )}
      </ol>
      <div>
        {session.questNum < session.categorySelected.questions.length - 1 ? (
          <>
            <button
              className="px-4 py-2 text-sm text-white bg-primary rounded m-2"
              onClick={() =>
                dispatchQuiz({
                  type: "INCREMENT_QUEST_NUM",
                  payload: {
                    questNum:
                      session.questNum <
                      session.categorySelected.questions.length - 1
                        ? session.questNum + 1
                        : 0,
                    answered: false,
                  },
                })
              }
            >
              Next
            </button>
            <button
              className="px-4 text-sm py-2 text-customGray border-2 border-customGray rounded"
              onClick={restartQuizHandler}
            >
              Quit
            </button>
          </>
        ) : (
          <Link
            className="px-4 py-2 text-sm text-white bg-primary rounded m-2"
            to="/score"
          >
            Finish
          </Link>
        )}
      </div>
    </div>
  );
}
