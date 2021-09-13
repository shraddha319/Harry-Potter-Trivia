import { MongooseObjectId } from './common.types';

type QuizState = {
  quizData: QuizData | null;
  username: string | null;
  session: Session | null;
  theme: Theme;
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

type QuizActionType =
  | { type: 'FETCH_QUIZ'; payload: { categories: Category[] } }
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
  | { type: 'SET_THEME'; payload: { theme: Theme } };

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
