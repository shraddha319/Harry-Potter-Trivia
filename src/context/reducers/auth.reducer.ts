import { AuthState, AuthActionType } from '../types/auth.types';

export function authReducer(
  auth: AuthState,
  action: AuthActionType
): AuthState {
  switch (action.type) {
    case 'SET_AUTH_TOKEN':
      return { ...auth, authToken: action.payload.authToken };

    case 'SET_USER':
      return { ...auth, user: action.payload.user };

    case 'LOGIN_USER':
      return { ...auth, ...action.payload };

    case 'LOGOUT_USER':
      return {
        user: null,
        leaderboard: null,
        authToken: null,
        history: null,
      };

    case 'FETCH_USER_HISTORY':
      return { ...auth, history: action.payload.history };

    case 'FETCH_LEADERBOARD': {
      return { ...auth, leaderboard: action.payload.leaderboard };
    }

    default:
      return auth;
  }
}
