import API from './config.api';
import { MongooseObjectId } from '../context/types/common.types';

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

export async function postUserScore(
  userId: MongooseObjectId,
  data: { quiz: MongooseObjectId; score: number }
) {
  return API.post(`/users/${userId}/scores`, { ...data });
}
