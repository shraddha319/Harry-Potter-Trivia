import { useQuiz } from '../context';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Loader } from '../components';

export default function Instruction() {
  const { categoryId } = useParams();
  const {
    quiz: { quizData },
  } = useQuiz();

  const category = quizData?.categories.find((cat) => cat._id === categoryId);

  return (
    <div className="space-y-4 lg:space-y-8 flex flex-col items-center px-4 py-2">
      {!category ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-lg lg:text-4xl text-center lg:mt-6 tracking-widest text-primary">
            {category.name}
          </h1>
          <p className="text-xs lg:text-lg text-justify text-customGray">
            {category.description}
          </p>
          <h1 className="text-lg lg:text-3xl text-center tracking-widest text-primary">
            Instructions
          </h1>
          <ul className="list-outside text-xs lg:text-base list-disc m-6 space-y-2">
            <li>
              There are a total of{' '}
              <span className="text-primary">
                {category.questions.length} questions.
              </span>
            </li>
            <li>
              Each question has a time limit of{' '}
              <span className="text-primary">15 seconds.</span>
            </li>
            <li>
              Click on the <span className="text-primary">Next</span> button to
              go to the next question,{' '}
              <span className="text-primary">Quit</span> to end the game.
            </li>
            <li>
              Each correct answer will be awarded 1 point. 0 for incorrect
              answers.
            </li>
          </ul>
          <div className="lg:my-10 space-x-4">
            <Link
              className="inline-block text-sm text-white bg-primary py-2 px-4 rounded lg:text-xl"
              to={`/category/${categoryId}/play`}
            >
              Start
            </Link>
            <Link
              className="inline-block text-sm text-customGray border-2 border-customGray py-2 px-4 rounded lg:text-xl"
              to="/category"
            >
              Go Back
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
