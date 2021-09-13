import { formError } from '../constants/form';
import { FormInput, FormError } from '../../types/form.types';
import { ValidationRules } from './types';

export function validate(
  input: FormInput,
  validationRules: ValidationRules
): FormError {
  const { FIELD_REQUIRED } = formError;
  const errors: FormError = {};

  Object.entries(validationRules).forEach(([field, rules]) => {
    const value = input[field];

    if (rules.required && (!value || value === '')) {
      errors[field] = FIELD_REQUIRED;
    } else if (rules.minLen && value?.length < rules.minLen) {
      errors[
        field
      ] = `${field} must be atleast ${rules.minLen} characters long.`;
    } else if (rules.format && !rules.format?.regexp.test(value)) {
      errors[field] = rules.format.message;
    } else if (
      rules.crossFieldEquality &&
      input[rules.crossFieldEquality.field] !== value
    ) {
      errors[field] = rules.crossFieldEquality.message;
    }
  });
  return errors;
}
