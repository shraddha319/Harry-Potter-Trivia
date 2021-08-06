import { useQuiz } from "../context/quiz";

import { Link } from "react-router-dom";

export default function Instruction() {
  const {
    quiz: { quizData, session },
  } = useQuiz();

  return (
    <div className="space-y-4 flex flex-col items-center px-4 py-2">
      <h1 className="text-lg text-center uppercase tracking-widest text-primary">
        {session.categorySelected.category}
      </h1>
      <p className="text-xs text-justify text-customGray">
        {session.categorySelected.description}
      </p>
      <h1 className="text-lg text-center uppercase tracking-widest text-primary">
        Instructions
      </h1>
      <ul className="list-outside text-xs list-disc m-6 space-y-2">
        <li>
          There are a total of{" "}
          <span className="text-primary">
            {session.categorySelected.questions.length} questions.
          </span>
        </li>
        <li>
          Each question has a time limit of{" "}
          <span className="text-primary">15 seconds.</span>
        </li>
        <li>
          Click on the <span className="text-primary">Next</span> button to go
          to the next question, <span className="text-primary">Quit</span> to
          end the game.
        </li>
        <li>
          Each correct answer will be awarded 1 point. 0 for incorrect answers.
        </li>
      </ul>
      <div>
        <Link
          className="inline-block text-sm text-white bg-primary py-2 px-4 mx-1 rounded "
          to="/quiz"
        >
          Start
        </Link>
        <Link
          className="inline-block text-sm text-customGray border-2 border-customGray mx-1 py-2 px-4 rounded "
          to="/category"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
