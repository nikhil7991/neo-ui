export const EmailValidation = {
  required: true,
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
};
export const PasswordValidation = {
  required: true,
  minLength: 8,
  maxLength: 80,
};

export const CodeValidation = {
  required: true,
  minLength: 6,
  maxLength: 6,
};

export const FullNameValidation = { required: true, maxLength: 80 };

export const PhoneValidation = {
  required: true,
  pattern: { value: /^([0]|\+91|\+91\s)?\d{10}/i },
};

export const PhoneOptionalValidation = {
  required: false,
  pattern: { value: /^([0]|\+91|\+91\s)?\d{10}/i },
};

export const AnyValidStringValidation = {
  required: true,
  maxLength: 80,
};

export const SelectAnyValueValidation = {
  required: true,
};
