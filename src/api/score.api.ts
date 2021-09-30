import API from './config.api';
import { MongooseObjectId } from '../contexts/common.types';

export async function getUserHistory(userId: MongooseObjectId) {
  return API.get(`/users/${userId}/scores`, {
    params: { type: 'user' },
  });
}

export async function getLeaderboard(userId: MongooseObjectId) {
  return API.get(`/users/${userId}/scores`, {
    params: { type: 'leaderboard' },
  });
}

export async function postUserScore(args: {
  userId: MongooseObjectId;
  quizId: MongooseObjectId;
  score: number;
}) {
  return API.post(`/users/${args.userId}/scores`, {
    quiz: args.quizId,
    score: args.score,
  });
}
