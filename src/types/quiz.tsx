type Session = {
  score: number;
  questNum: number;
  response: { [key: number]: string };
  username: string;
  answered: boolean;
  timer: number;
  categorySelected: Category | null;
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

type Category = {
  category: string;
  description: string;
  questions: Question[];
};

type QuizData = {
  quizName: string;
  categories: Category[];
};

type Quiz = {
  quizData: QuizData | {};
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
  | { type: "CLEAR_TIMER"; payload: { questNum: number } }
  | { type: "SET_QUIZ_CATEGORY"; payload: { category: Category } }
  | { type: "FETCH_QUIZ"; payload: { categories: Category[] } };

type QuizContextType = {
  quiz: Quiz;
  dispatchQuiz: React.Dispatch<QuizActionType>;
};

export { Session, QuizData, Option, Quiz, QuizContextType, QuizActionType };
