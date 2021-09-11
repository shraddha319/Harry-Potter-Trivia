import API from './config.api';

export async function getLeaderboard(userId) {
  return API.get(`/users/${userId}/scores`, {
    params: { type: 'leaderboard' },
  });
}

export async function postUserScore(userId, data) {
  return API.post(`/users/${userId}/scores`, { ...data });
}
