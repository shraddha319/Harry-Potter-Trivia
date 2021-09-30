import { UserState, UserActionType } from './types';

export const userReducer = (state: UserState, action: UserActionType) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, profile: action.payload.user };

    case 'LOGOUT_USER':
      return {
        profile: null,
        scores: {
          status: 'idle',
          scores: [],
          error: null,
        },
      };

    case 'FETCH_SCORES_REQUEST':
      return { ...state, scores: { ...state.scores, status: 'loading' } };

    case 'FETCH_SCORES_SUCCESS':
      return {
        ...state,
        scores: {
          status: 'success',
          scores: action.payload.scores,
          error: null,
        },
      };

    case 'FETCH_SCORES_FAILED':
      return {
        ...state,
        scores: { status: 'failed', scores: [], error: action.payload.error },
      };

    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: state.profile
          ? { ...state.profile, ...action.payload.update }
          : null,
      };

    default:
      return state;
  }
};
