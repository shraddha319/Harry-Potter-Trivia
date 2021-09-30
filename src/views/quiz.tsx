import { useQuiz, updateUserScore, useUser } from '../contexts';
import { useNavigate, useParams } from 'react-router-dom';
import { Option } from '../contexts/quiz/types';
import { useReducer, useState } from 'react';
import { Loader } from '../components';
// import { postUserScore } from '../api';

type Session = {
  answered: boolean;
  questIndex: number;
  response: { [key: string]: any };
  score: number;
};

type SessionActionType =
  | {
      type: 'UPDATE_RESPONSE';
      payload: { response: any; points: number };
    }
  | {
      type: 'UPDATE_QUESTION';
    }
  | {
      type: 'RESTART_QUIZ';
    };

function sessionReducer(state: Session, action: SessionActionType): Session {
  switch (action.type) {
    case 'UPDATE_RESPONSE':
      return {
        ...state,
        answered: true,
        response: {
          ...state.response,
          [state.questIndex]: action.payload.response,
        },
        score: state.score + action.payload.points,
      };

    case 'UPDATE_QUESTION':
      return {
        ...state,
        answered: false,
        questIndex: state.questIndex + 1,
      };

    case 'RESTART_QUIZ':
      return {
        answered: false,
        questIndex: 0,
        response: {},
        score: 0,
      };

    default:
      return state;
  }
}

export default function Quiz() {
  const { categoryId } = useParams();
  const {
    quiz: {
      quiz: { data: quizData },
    },
    dispatchQuiz,
  } = useQuiz();
  const {
    user: { profile: user },
    dispatchUser,
  } = useUser();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [session, dispatchSession] = useReducer(sessionReducer, {
    answered: false,
    questIndex: 0,
    response: {},
    score: 0,
  });

  const category = quizData?.categories.find((cat) => cat._id === categoryId);

  function optionBtnColor({ option, isRight, _id }: Option) {
    if (session.answered) {
      if (isRight) return 'bg-green-500 border-0 text-white';
      if (session.response[session.questIndex] === option)
        return 'bg-red-500 border-0 text-white';
    }
    return 'text-gray-500 border-gray-500 hover:text-gray-700 hover:border-gray-700';
  }

  function restartQuizHandler() {
    dispatchSession({ type: 'RESTART_QUIZ' });
    navigate(`/category/${categoryId}/instruction`);
  }

  async function finishQuizHandler() {
    if (user) {
      // try {
      //   setLoader(true);
      //   await postUserScore(user._id, {
      //     quiz: categoryId,
      //     score: session.score,
      //   });
      // } catch (err) {
      //   console.log(err.message);
      // } finally {
      //   setLoader(false);
      // }
      setLoader(true);
      updateUserScore(dispatchUser, {
        userId: user._id,
        quizId: categoryId,
        score: session.score,
      });
      setLoader(false);
    }

    dispatchQuiz({
      type: 'SET_USER_RESPONSE',
      payload: { response: session.response, score: session.score, categoryId },
    });
    navigate(`/category/${categoryId}/score`);
  }

  return (
    <div className="flex flex-col items-center space-y-6 lg:space-y-10 p-4">
      {!category ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-lg text-center uppercase tracking-widest text-primary">
            {category.name}
          </h1>
          <div className="flex flex-row justify-between items-center w-full mx-6">
            <div className="w-15 px-2 py-4 lg:text-xl lg:p-6 h-5 rounded bg-gold text-white flex justify-center items-center text-sm uppercase tracking-wider">
              Score
              <strong className="ml-2 text-bold text-lg lg:text-2xl">
                {session.score}
              </strong>
            </div>
            <div className="w-15 h-4 rounded text-gray-500 text-bold lg:text-3xl">
              Points: {category.questions[session.questIndex].points}
            </div>
          </div>
          <p className="text-sm lg:text-lg text-customGray text-center">
            {session.questIndex + 1}.{' '}
            {category.questions[session.questIndex].question}
          </p>
          <ol className="flex flex-col w-3/5 space-y-2 lg:space-y-4">
            {category.questions[session.questIndex].options.map((option) => (
              <li>
                <button
                  className={`text-xs lg:text-lg p-2 min-w-full border-2 rounded-full ${optionBtnColor(
                    option
                  )}`}
                  disabled={session.answered}
                  onClick={() =>
                    dispatchSession({
                      type: 'UPDATE_RESPONSE',
                      payload: {
                        points: option.isRight
                          ? category.questions[session.questIndex].points
                          : 0,
                        response: option.option,
                      },
                    })
                  }
                >
                  {option.option}
                </button>
              </li>
            ))}
          </ol>
          <div className="space-x-2 lg:space-x-4">
            {session.questIndex < category.questions.length - 1 ? (
              <>
                <button
                  className="px-4 py-2 lg:text-xl text-sm text-white bg-primary rounded"
                  onClick={() =>
                    session.answered
                      ? dispatchSession({ type: 'UPDATE_QUESTION' })
                      : dispatchSession({
                          type: 'UPDATE_RESPONSE',
                          payload: {
                            points: 0,
                            response: null,
                          },
                        })
                  }
                >
                  Next
                </button>
                <button
                  className="px-4 text-sm py-2 lg:text-xl text-customGray border-2 border-customGray rounded"
                  onClick={restartQuizHandler}
                >
                  Restart
                </button>
              </>
            ) : (
              <button
                className="px-4 py-2 lg:text-xl text-sm text-white bg-primary rounded m-2"
                onClick={finishQuizHandler}
              >
                {loader ? <Loader /> : 'Finish'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
