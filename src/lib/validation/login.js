import { formError } from "../constants/form";
const { EMAIL_INVALID, PASSWORD_INVALID } = formError;

export const loginValidationRules = {
  email: {
    required: true,
  },
  password: {
    required: true,
  },
};
