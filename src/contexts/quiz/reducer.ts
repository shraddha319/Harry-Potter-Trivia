import { QuizState, QuizActionType } from './types';

export const quizReducer = (state: QuizState, action: QuizActionType) => {
  switch (action.type) {
    case 'FETCH_QUIZ_REQUEST':
      return { ...state, quiz: { ...state.quiz, status: 'loading' } };

    case 'FETCH_QUIZ_SUCCESS':
      return {
        ...state,
        quiz: {
          status: 'success',
          error: null,
          data: {
            quizName: 'Harry Potter Trivia',
            categories: action.payload.categories,
          },
        },
      };

    case 'FETCH_QUIZ_FAILED':
      return {
        ...state,
        quiz: { status: 'failed', error: action.payload.error, data: null },
      };

    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload.username,
      };

    case 'SET_USER_RESPONSE':
      return {
        ...state,
        session: { ...state.session, ...action.payload },
      };

    case 'RESET_QUIZ':
      return {
        ...state,
        session: null,
      };

    case 'SET_THEME': {
      return { ...state, theme: action.payload.theme };
    }

    case 'FETCH_LEADERBOARD_REQUEST':
      return {
        ...state,
        leaderboard: { ...state.leaderboard, status: 'loading' },
      };

    case 'FETCH_LEADERBOARD_SUCCESS':
      return {
        ...state,
        leaderboard: {
          status: 'success',
          error: null,
          data: action.payload.leaderboard,
        },
      };

    case 'FETCH_LEADERBOARD_FAILED':
      return {
        ...state,
        leaderboard: {
          status: 'failed',
          data: null,
          error: action.payload.error,
        },
      };

    case 'REMOVE_LEADERBOARD':
      return {
        ...state,
        leaderboard: { status: 'idle', data: null, error: null },
      };

    default:
      return state;
  }
};
