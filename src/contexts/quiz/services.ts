import { getQuiz, getLeaderboard } from '../../api';
import { QuizActionType } from './types';

export const fetchQuiz = async (
  dispatchQuiz: React.Dispatch<QuizActionType>
) => {
  dispatchQuiz({ type: 'FETCH_QUIZ_REQUEST' });
  try {
    const {
      data: {
        data: { quiz },
      },
      status,
    } = await getQuiz();
    if (status === 200)
      dispatchQuiz({
        type: 'FETCH_QUIZ_SUCCESS',
        payload: { categories: quiz },
      });
  } catch (error) {
    if (error?.response) {
      dispatchQuiz({
        type: 'FETCH_QUIZ_FAILED',
        payload: { error: error.response.data },
      });
    } else console.log(error);
  }
};

export const fetchLeaderboard = async (
  dispatchQuiz: React.Dispatch<QuizActionType>,
  userId: string
) => {
  dispatchQuiz({ type: 'FETCH_LEADERBOARD_REQUEST' });
  try {
    const {
      data: {
        data: { leaderboard },
      },
      status,
    } = await getLeaderboard(userId);
    if (status === 200)
      dispatchQuiz({
        type: 'FETCH_LEADERBOARD_SUCCESS',
        payload: { leaderboard },
      });
  } catch (error) {
    if (error?.response) {
      dispatchQuiz({
        type: 'FETCH_LEADERBOARD_FAILED',
        payload: { error: error.response.data },
      });
    } else console.log(error);
  }
};
