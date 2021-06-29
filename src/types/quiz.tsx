type Session = {
  score: number;
  questNum: number;
  response: { [key: number]: string };
  username: string;
  answered: boolean;
  timer: number;
};

type Option = {
  option: string;
  isRight: boolean;
};

type Question = {
  question: string;
  points: number;
  options: Option[];
};

type QuizData = {
  quizName: string;
  questions: Question[];
};

type Quiz = {
  quizData: QuizData;
  session: Session;
};

type QuizActionType =
  | { type: "SET_USERNAME"; payload: { username: string } }
  | {
      type: "STORE_USER_RESPONSE";
      payload: {
        questNum: number;
        answered: boolean;
        userResponse: string;
        points: number;
      };
    }
  | {
      type: "INCREMENT_QUEST_NUM";
      payload: { questNum: number; answered: boolean };
    }
  | { type: "RESET_QUIZ" }
  | { type: "DECREMENT_TIMER" }
  | { type: "CLEAR_TIMER"; payload: { questNum: number } };

type QuizContextType = {
  quiz: Quiz;
  dispatchQuiz: React.Dispatch<QuizActionType>;
};

export { Session, QuizData, Option, Quiz, QuizContextType, QuizActionType };
