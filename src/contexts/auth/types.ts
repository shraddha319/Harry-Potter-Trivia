import { APIError } from '../common.types';

type AuthState = {
  token: AuthToken | null;
  error: APIError | null;
  status: string;
};

type AuthToken = string;

type AuthActionType =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: { authToken: AuthToken } }
  | { type: 'LOGIN_FAILED' }
  | { type: 'LOGOUT_AUTH' }
  | { type: 'SIGNUP_REQUEST' }
  | { type: 'SIGNUP_SUCCESS'; payload: { authToken: AuthToken } }
  | { type: 'SIGNUP_FAILED'; payload: { error: APIError } };

type AuthContextType = {
  auth: AuthState;
  dispatchAuth: React.Dispatch<AuthActionType>;
};

export type { AuthState, AuthActionType, AuthContextType };
