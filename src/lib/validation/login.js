import { formError } from "../constants/form";
const { EMAIL_INVALID, PASSWORD_INVALID } = formError;

export const loginValidationRules = {
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
};
