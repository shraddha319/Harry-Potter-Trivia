import API from './config.api';
import { FormInput } from '../types/form.types';
import { MongooseObjectId } from '../context/types/common.types';

export async function registerUser(user: FormInput) {
  return API.post('/users', { ...user });
}

export async function loginUser(credentials: FormInput) {
  return API.post('/auth/login', { ...credentials });
}

export async function getUser(userId: MongooseObjectId) {
  return API.get(`/users/${userId}`);
}
