import { formError } from '../constants/form';
import { ValidationRules } from './types';
const { EMAIL_INVALID } = formError;

export const editProfileValidationRules: ValidationRules = {
  // email: {
  //   required: true,
  //   format: {
  //     regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  //     message: EMAIL_INVALID,
  //   },
  // },
  firstName: {
    required: true,
  },
};
