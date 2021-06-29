import "./quiz.scss";
import { useQuiz } from "../../context/quiz";

import { Link, useNavigate } from "react-router-dom";
import { Option } from "../../types/quiz";
import { useEffect } from "react";

export default function Quiz() {
  const {
    quiz: { quizData, session },
    dispatchQuiz,
  } = useQuiz();
  const navigate = useNavigate();

  function optionBtnColor({ option, isRight }: Option) {
    if (session.answered) {
      if (isRight) return "green";
      if (session.response[session.questNum] === option) return "red";
    }
    return "";
  }

  function restartQuizHandler() {
    dispatchQuiz({ type: "RESET_QUIZ" });
    navigate("/instruction");
  }

  useEffect(() => {
    const intervalId: ReturnType<typeof setInterval> = setInterval(
      () => dispatchQuiz({ type: "DECREMENT_TIMER" }),
      1000
    );

    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      if (session.questNum === quizData.questions.length - 1)
        navigate("/score");
      dispatchQuiz({
        type: "CLEAR_TIMER",
        payload: {
          questNum:
            session.questNum < quizData.questions.length - 1
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
    <div className="quiz">
      <h3>Score: {session.score}</h3>
      <p>
        {session.questNum + 1}.{quizData.questions[session.questNum].question}
      </p>
      <h2>{session.timer}</h2>
      <ol>
        {quizData.questions[session.questNum].options.map(
          ({ option, isRight }) => (
            <li>
              <button
                style={{
                  background: optionBtnColor({ option, isRight }),
                }}
                disabled={session.answered}
                onClick={() =>
                  dispatchQuiz({
                    type: "STORE_USER_RESPONSE",
                    payload: {
                      questNum: session.questNum,
                      userResponse: option,
                      answered: true,
                      points: isRight
                        ? quizData.questions[session.questNum].points
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

      {session.questNum < quizData.questions.length - 1 ? (
        <>
          <button
            onClick={() =>
              dispatchQuiz({
                type: "INCREMENT_QUEST_NUM",
                payload: {
                  questNum:
                    session.questNum < quizData.questions.length - 1
                      ? session.questNum + 1
                      : 0,
                  answered: false,
                },
              })
            }
          >
            next
          </button>
          <button onClick={restartQuizHandler}>quit</button>
        </>
      ) : (
        <Link to="/score">finish</Link>
      )}
    </div>
  );
}
