import { createContext, useReducer, useContext } from "react";
import { Quiz, QuizData, QuizContextType, QuizActionType } from "../types/quiz";
import { data } from "../data";

const QuizContext = createContext<QuizContextType | null>(null);

function quizReducer(quiz: Quiz, action: QuizActionType): Quiz {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...quiz,
        session: { ...quiz.session, username: action.payload.username },
      };

    case "SET_QUIZ_CATEGORY":
      return {
        ...quiz,
        session: { ...quiz.session, categorySelected: action.payload.category },
      };

    case "STORE_USER_RESPONSE":
      return {
        ...quiz,
        session: {
          ...quiz.session,
          answered: action.payload.answered,
          score: quiz.session.score + action.payload.points,
          response: {
            ...quiz.session.response,
            [action.payload.questNum]: action.payload.userResponse,
          },
        },
      };

    case "INCREMENT_QUEST_NUM":
      return {
        ...quiz,
        session: {
          ...quiz.session,
          questNum: action.payload.questNum,
          answered: action.payload.answered,
          timer: 15,
        },
      };

    case "RESET_QUIZ":
      return {
        ...quiz,
        session: {
          ...quiz.session,
          score: 0,
          questNum: 0,
          response: {},
          answered: false,
          timer: 15,
          categorySelected: quiz.quizData.categories[0],
        },
      };

    case "DECREMENT_TIMER":
      return {
        ...quiz,
        session: {
          ...quiz.session,
          timer: quiz.session.timer - 1,
        },
      };

    case "CLEAR_TIMER":
      return {
        ...quiz,
        session: {
          ...quiz.session,
          timer: 15,
          questNum: action.payload.questNum,
          answered: false,
        },
      };

    default:
      return quiz;
  }
}

export function QuizProvider({ children }) {
  const quizData: QuizData = data;

  const initialQuiz: Quiz = {
    quizData,
    session: {
      score: 0,
      questNum: 0,
      response: {},
      username: "anon",
      answered: false,
      timer: 15,
      categorySelected: quizData.categories[0],
    },
  };
  const [quiz, dispatchQuiz] = useReducer(quizReducer, initialQuiz);

  return (
    <QuizContext.Provider value={{ quiz, dispatchQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz(): QuizContextType {
  return useContext(QuizContext);
}
