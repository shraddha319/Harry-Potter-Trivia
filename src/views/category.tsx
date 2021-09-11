import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuiz } from '../context';
import { getQuiz } from '../api';
import cat from '../images/quidditch-cat.svg';
import { ReactComponent as LeaderBoardIcon } from '../images/Triwizard-cup.svg';
import { Loader } from '../components';

export default function Category() {
  const {
    quiz: { quizData },
    dispatchQuiz,
  } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: {
            success,
            data: { quiz },
          },
        } = await getQuiz();
        if (success)
          dispatchQuiz({ type: 'FETCH_QUIZ', payload: { categories: quiz } });
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="space-y-10 p-4">
      <section>
        <h1 className="text-lg lg:text-2xl mx-2 my-1">Welcome back!</h1>
      </section>
      {!quizData?.categories ? (
        <Loader />
      ) : (
        <section className="space-y-3">
          <header className="space-x-1 space-y-1 w-auto lg:my-5">
            <div className="h-0.5 rounded w-5 bg-primary"></div>
            <h2 className="text-sm lg:text-xl text-primary font-semibold tracking-widest">
              Play
            </h2>
          </header>
          <div className="flex flex-row">
            {quizData.categories.map((category) => (
              <button
                onClick={() => {
                  dispatchQuiz({
                    type: 'SET_QUIZ_CATEGORY',
                    payload: { category },
                  });
                  navigate('/instruction');
                }}
                className="flex flex-col justify-center p-2 lg:p-8 rounded bg-primary mx-1 space-y-2 hover:bg-red-700"
              >
                <img className="w-12" src={cat} alt="cat" />
                <p className="text-white tracking-wider text-xs lg:text-lg">
                  {category.name}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}
      <section className="space-y-3">
        <header className="space-x-1 space-y-1 w-auto lg:my-5">
          <div className="h-0.5 rounded w-5 bg-primary"></div>
          <h2 className="text-sm lg:text-xl text-primary font-semibold tracking-widest">
            Scores
          </h2>
        </header>
        <div className="grid grid-cols-2 gap-2">
          <div className="container bg-customGray rounded text-white p-1 lg:p-8 flex flex-row justify-center items-center">
            <LeaderBoardIcon className="w-14 lg:w-16 p-1 h-full" fill="#fff" />
            <div className="text-center tracking-widest m-1">
              <p className="uppercase p-1 font-semibold text-sm lg:text-lg">
                Top Score
              </p>
              <strong className="m-1 text-3xl lg:text-5xl">10</strong>
            </div>
          </div>
          <div className="bg-gold text-center rounded text-white tracking-normal flex flex-col items-center justify-center p-1 lg:p-8 space-y-2">
            <p className="text-sm lg:text-3xl font-semibold">Your Points</p>
            <strong className="m-1 text-3xl lg:text-5xl">9</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
