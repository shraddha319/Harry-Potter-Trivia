import * as api from '../../api';
import { AuthActionType } from './types';
import { UserActionType } from '../user/types';

export const loginUser = async (
  dispatchAuth: React.Dispatch<AuthActionType>,
  dispatchUser: React.Dispatch<UserActionType>,
  credentials: { email?: string; password?: string; authToken?: string }
) => {
  try {
    dispatchAuth({ type: 'LOGIN_REQUEST' });
    const {
      data: {
        data: { user, authToken },
      },
      status,
    } = await api.loginUser(credentials);
    if (status === 200) {
      api.API.defaults.headers.common['Authorization'] = authToken;
      dispatchUser({ type: 'SET_USER', payload: { user } });
      dispatchAuth({ type: 'LOGIN_SUCCESS', payload: { authToken } });
      localStorage.setItem('authToken', authToken);
    }
  } catch (error) {
    if (error?.response) {
      dispatchAuth({
        type: 'LOGIN_FAILED',
      });
    } else console.log(error);
  }
};

export const signUpUser = async (
  dispatchAuth: React.Dispatch<AuthActionType>,
  dispatchUser: React.Dispatch<UserActionType>,
  input: {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
  }
) => {
  try {
    dispatchAuth({ type: 'SIGNUP_REQUEST' });
    const { status } = await api.signUpUser(input);
    if (status === 201) {
      const loginCred = (({ email, password }) => ({ email, password }))(input);
      loginUser(dispatchAuth, dispatchUser, loginCred);
    }
  } catch (error) {
    if (error?.response) {
      dispatchAuth({
        type: 'SIGNUP_FAILED',
        payload: { error: error.response.data.error },
      });
    } else console.log(error);
  }
};
