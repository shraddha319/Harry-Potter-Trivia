import API from './config.api';

/**
 *
 * @param {email: String, password: String, authToken: JWT} credentials
 */
export function loginUser(credentials: {
  email?: string;
  password?: string;
  authToken?: string;
}) {
  if (credentials.email && credentials.password)
    return API.post('/auth/login', credentials);
  else
    return API.post(
      '/auth/login',
      {},
      {
        headers: { Authorization: credentials.authToken },
      }
    );
}

/**
 *
 * @param {Object: {
 * email: String,
 * password: String,
 * firstName: String,
 * lastName: String
 * }} user
 */
export function signUpUser(user: {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}) {
  return API.post('/users', user);
}
