import API from './config.api';

export async function registerUser(user) {
  return API.post('/users', { user });
}

export async function verifyIfAvailable({ key, value }) {
  return API.head('/users', {
    headers: { key, value },
  });
}

export async function loginUser(credentials) {
  return API.post('/auth/login', { ...credentials });
}

export async function getUser(userId) {
  return API.get(`/users/${userId}`);
}
