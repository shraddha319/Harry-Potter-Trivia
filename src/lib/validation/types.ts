type ValidationRule = {
  required?: boolean;
  format?: {
    regexp: RegExp;
    message: string;
  };
  minLen?: number;
  crossFieldEquality?: {
    field: string;
    message: string;
  };
};

type ValidationRules = { [key: string]: ValidationRule };

export type { ValidationRules };
