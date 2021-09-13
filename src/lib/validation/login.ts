import { ValidationRules } from './types';

export const loginValidationRules: ValidationRules = {
  email: {
    required: true,
  },
  password: {
    required: true,
  },
};
