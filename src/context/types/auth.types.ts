import { MongooseObjectId } from './common.types';

type AuthState = {
  user: User | null;
  authToken: AuthToken | null;
  leaderboard: Leaderboard | null;
  history: History[] | null;
};

type User = {
  _id: MongooseObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
};

type AuthToken = string;

type Leaderboard = {
  _id: { firstName: string; lastName: string };
  points: number;
  timestamp: string;
}[];

type History = {
  quiz: {
    _id: MongooseObjectId;
    name: string;
  };
  score: number;
  timestamp: string;
};

type AuthActionType =
  | { type: 'LOGIN_USER'; payload: { user: User; authToken: AuthToken } }
  | {
      type: 'SET_AUTH_TOKEN';
      payload: { authToken: AuthToken };
    }
  | { type: 'SET_USER'; payload: { user: User } }
  | { type: 'FETCH_LEADERBOARD'; payload: { leaderboard: Leaderboard } }
  | { type: 'FETCH_USER_HISTORY'; payload: { history: History[] } }
  | { type: 'LOGOUT_USER' };

type AuthContextType = {
  auth: AuthState;
  dispatchAuth: React.Dispatch<AuthActionType>;
};

export type { AuthState, AuthActionType, AuthContextType };
