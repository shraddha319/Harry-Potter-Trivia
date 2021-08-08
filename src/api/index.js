import { getQuiz } from "./quiz.api";
import {
  registerUser,
  verifyIfAvailable,
  loginUser,
  getUser,
} from "./user.api";
import API from "./config.api";

export { API, getQuiz, registerUser, verifyIfAvailable, loginUser, getUser };
