import "./instruction.scss";
import { useQuiz } from "../../context/quiz";

import { Link } from "react-router-dom";

export default function Instruction() {
  const {
    quiz: { quizData, session },
  } = useQuiz();

  return (
    <div className="instruction layout--default">
      <h1 className="instruction__title">{quizData.quizName}</h1>
      <h2>Welcome {session.username}!</h2>
      <h3>Total Questions: {quizData.questions.length}</h3>
      <h3>Time: 10 min</h3>
      <Link to="/quiz">start</Link>
    </div>
  );
}
