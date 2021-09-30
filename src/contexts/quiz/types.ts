import { MongooseObjectId, APIError } from '../common.types';

type QuizState = {
  quiz: {
    status: string;
    error: APIError | null;
    data: QuizData | null;
  };
  username: string | null;
  session: Session | null;
  theme: Theme;
  leaderboard: {
    status: string;
    error: APIError | null;
    data: Leaderboard | null;
  };
};

type QuizData = {
  quizName: string;
  categories: Category[];
};

type Category = {
  _id: MongooseObjectId;
  name: string;
  description: string;
  questions: Question[];
};

type Question = {
  _id: MongooseObjectId;
  question: string;
  points: number;
  options: Option[];
};

type Option = {
  _id: MongooseObjectId;
  option: string;
  isRight: boolean;
};

type Response = { [key: string]: any };

type Session = {
  score: number;
  response: Response;
  categoryId: MongooseObjectId;
};

type Theme = string;

type Leaderboard = [
  {
    _id: { firstName: string; lastName: string };
    points: number;
    timestamp: string;
  }
];

type QuizActionType =
  | { type: 'FETCH_QUIZ_REQUEST' }
  | { type: 'FETCH_QUIZ_SUCCESS'; payload: { categories: Category[] } }
  | { type: 'FETCH_QUIZ_FAILED'; payload: { error: APIError } }
  | { type: 'SET_USERNAME'; payload: { username: string } }
  | {
      type: 'SET_USER_RESPONSE';
      payload: {
        response: Response;
        score: number;
        categoryId: MongooseObjectId;
      };
    }
  | { type: 'RESET_QUIZ' }
  | { type: 'SET_THEME'; payload: { theme: Theme } }
  | { type: 'FETCH_LEADERBOARD_REQUEST' }
  | { type: 'FETCH_LEADERBOARD_SUCCESS'; payload: { leaderboard: Leaderboard } }
  | { type: 'FETCH_LEADERBOARD_FAILED'; payload: { error: APIError } }
  | { type: 'REMOVE_LEADERBOARD' };

type QuizContextType = {
  quiz: QuizState;
  dispatchQuiz: React.Dispatch<QuizActionType>;
};

export type {
  Session,
  QuizData,
  Option,
  QuizState,
  QuizContextType,
  QuizActionType,
  Theme,
};
