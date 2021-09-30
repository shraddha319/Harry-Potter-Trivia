import { UserActionType, ProfileUpdate } from './types';
import { getUserHistory, postUserScore, updateProfile } from '../../api';

export const fetchUserScores = async (
  dispatchUser: React.Dispatch<UserActionType>,
  userId: string
) => {
  dispatchUser({ type: 'FETCH_SCORES_REQUEST' });
  try {
    const {
      status,
      data: {
        data: { scores },
      },
    } = await getUserHistory(userId);
    if (status === 200)
      dispatchUser({ type: 'FETCH_SCORES_SUCCESS', payload: { scores } });
  } catch (error) {
    if (error?.response)
      dispatchUser({
        type: 'FETCH_SCORES_FAILED',
        payload: { error: error.response.data },
      });
    else console.log(error);
  }
};

export const updateUserScore = async (
  dispatchUser: React.Dispatch<UserActionType>,
  data: { userId: string; quizId: string; score: number }
) => {
  try {
    const { status } = await postUserScore(data);
    if (status === 204) fetchUserScores(dispatchUser, data.userId);
    // dispatchUser({ type: 'FETCH_SCORES_SUCCESS', payload: { scores } });
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (
  dispatchUser: React.Dispatch<UserActionType>,
  userId: string,
  update: ProfileUpdate
) => {
  try {
    const { status } = await updateProfile(userId, update);
    if (status === 204)
      dispatchUser({ type: 'UPDATE_PROFILE', payload: { update } });
  } catch (error) {
    console.log(error);
  }
};
