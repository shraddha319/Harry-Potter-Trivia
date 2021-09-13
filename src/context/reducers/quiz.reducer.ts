import { QuizState, QuizActionType } from '../types/quiz.types';

export function quizReducer(
  quiz: QuizState,
  action: QuizActionType
): QuizState {
  switch (action.type) {
    case 'FETCH_QUIZ':
      return {
        ...quiz,
        quizData: {
          quizName: 'Harry Potter Trivia',
          categories: action.payload.categories,
        },
      };

    case 'SET_USERNAME':
      return {
        ...quiz,
        username: action.payload.username,
      };

    case 'SET_USER_RESPONSE':
      return {
        ...quiz,
        session: { ...quiz.session, ...action.payload },
      };

    case 'RESET_QUIZ':
      return {
        ...quiz,
        session: null,
      };

    case 'SET_THEME': {
      return { ...quiz, theme: action.payload.theme };
    }
    default:
      return quiz;
  }
}
