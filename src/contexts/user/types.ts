import { UserType, MongooseObjectId, APIError } from '../common.types';

type UserState = {
  profile: null | UserType;
  scores: {
    status: string;
    scores: Scores[];
    error: APIError | null;
  };
};

type Scores = {
  quiz: {
    _id: MongooseObjectId;
    name: string;
  };
  score: number;
  timestamp: string;
};

type ProfileUpdate = {
  email?: string;
  firstName?: string;
  lastName?: string;
};

type UserActionType =
  | { type: 'SET_USER'; payload: { user: UserType } }
  | { type: 'LOGOUT_USER' }
  | { type: 'FETCH_SCORES_REQUEST' }
  | { type: 'FETCH_SCORES_SUCCESS'; payload: { scores: Scores[] } }
  | { type: 'FETCH_SCORES_FAILED'; payload: { error: APIError } }
  | { type: 'UPDATE_PROFILE'; payload: { update: ProfileUpdate } };

type UserContextType = {
  user: UserState;
  dispatchUser: React.Dispatch<UserActionType>;
};

export type {
  UserState,
  Scores,
  UserContextType,
  UserActionType,
  ProfileUpdate,
};
