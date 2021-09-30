import { useQuiz } from '../contexts';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ScoreIcon } from '../images/Quidditch-goals.svg';
import { Loader } from '../components';
import { Option } from '../contexts/quiz/types';

export default function Score() {
  const {
    quiz: {
      session,
      quiz: { data: quizData },
    },
    dispatchQuiz,
  } = useQuiz();

  const navigate = useNavigate();
  const category =
    session &&
    quizData?.categories.find((cat) => cat._id === session.categoryId);

  function resetQuizHandler() {
    dispatchQuiz({ type: 'RESET_QUIZ' });
    navigate('/category');
  }

  function optionStyle(
    userResponse: string | null,
    { option, isRight }: Option
  ) {
    return isRight
      ? 'bg-green-500 border-0 text-white'
      : userResponse === option && !isRight
      ? 'bg-red-500 border-0 text-white'
      : 'text-gray-500 border-gray-500';
  }

  return (
    <div className="space-y-8 flex flex-col items-center p-4">
      {!session || !category ? (
        <Loader />
      ) : (
        <>
          <section className="w-3/5 text-center bg-customGray rounded-2xl text-bold p-4 text-gold m-2 flex flex-row space-x-4 lg:p-8 justify-center">
            <ScoreIcon fill="#CDB750" className="w-14 h-14 lg:h-20 lg:w-20" />
            <div>
              <p className="text-sm lg:text-lg uppercase">Score</p>
              <p className="text-5xl lg:text-6xl">{session.score}</p>
            </div>
          </section>
          <section>
            <button
              className="mx-auto bg-primary text-white px-4 py-2 rounded text-sm lg:text-xl"
              onClick={resetQuizHandler}
            >
              New Quiz
            </button>
          </section>
          <section className="space-y-6">
            <header className="space-x-1 space-y-1 w-auto lg:my-5">
              <div className="h-0.5 rounded w-5 bg-primary"></div>
              <h2 className="text-sm lg:text-2xl text-primary font-semibold tracking-widest">
                Your attempt
              </h2>
            </header>
            <ol className="space-y-8 lg:space-y-12">
              {category.questions.map(({ question, options }, questNum) => (
                <li className="space-y-4">
                  <p className="text-sm lg:text-lg text-customGray">
                    {question}
                  </p>
                  <ul className="space-y-4">
                    {options.map((option) => (
                      <li
                        className={`${optionStyle(
                          session.response[questNum],
                          option
                        )} text-xs lg:text-base lg:p-3 text-center my-2 mx-4 p-2 border-2 rounded-full`}
                      >
                        {option.option}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        </>
      )}
    </div>
  );
}
