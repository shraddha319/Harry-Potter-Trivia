import { formError } from '../constants/form';
import { ValidationRules } from './types';
const { EMAIL_INVALID, PASSWORD_INVALID, PASSWORD_MATCH } = formError;

export const registerValidationRules: ValidationRules = {
  email: {
    required: true,
    format: {
      regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      message: EMAIL_INVALID,
    },
  },
  password: {
    required: true,
    minLen: 8,
    format: {
      regexp: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message: PASSWORD_INVALID,
    },
  },
  firstName: {
    required: true,
  },
  confirmPassword: {
    required: true,
    crossFieldEquality: {
      field: 'password',
      message: PASSWORD_MATCH,
    },
  },
};
