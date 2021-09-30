import { QuizProvider, useQuiz } from './quiz/context';
import { AuthProvider, useAuth } from './auth/context';
import { UserProvider, useUser } from './user/context';

import { loginUser, signUpUser } from './auth/services';
import { fetchQuiz, fetchLeaderboard } from './quiz/services';
import { fetchUserScores, updateUserScore, editProfile } from './user/services';

export {
  QuizProvider,
  useQuiz,
  AuthProvider,
  useAuth,
  UserProvider,
  useUser,
  loginUser,
  signUpUser,
  fetchQuiz,
  fetchLeaderboard,
  fetchUserScores,
  updateUserScore,
  editProfile,
};
