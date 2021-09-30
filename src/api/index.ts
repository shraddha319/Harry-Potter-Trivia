import { getQuiz } from './quiz.api';
import { registerUser, getUser, updateProfile } from './user.api';
import { getLeaderboard, getUserHistory, postUserScore } from './score.api';
import API from './config.api';
import { loginUser, signUpUser } from './auth.api';

export {
  API,
  getQuiz,
  registerUser,
  loginUser,
  signUpUser,
  getUser,
  getLeaderboard,
  getUserHistory,
  postUserScore,
  updateProfile,
};
