import { getQuiz } from './quiz.api';
import { registerUser, loginUser, getUser } from './user.api';
import { getLeaderboard, getUserHistory, postUserScore } from './score.api';
import API from './config.api';

export {
  API,
  getQuiz,
  registerUser,
  loginUser,
  getUser,
  getLeaderboard,
  getUserHistory,
  postUserScore,
};
