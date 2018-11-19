const minLength = (value, length) => value && value.length >= length;

const matches = (value, match) => value === match;

export const email = value => {
  let result;
  if (!minLength(value, 5)) {
    result = 'Email must be at least five characters long';
  }
  return result;
};

export const password = value => {
  let result;
  if (!minLength(value, 5)) {
    result = 'Password must be at least five characters long';
  }
  return result;
};

export const passwordWithConfirmation = (value, values) => {
  let result;
  if (!minLength(value, 5)) {
    result = 'Password must be at least five characters long';
  } else if (!matches(value, values.confirmPassword)) {
    result = 'Password must match the confirm password field';
  }
  return result;
};

export const confirmPassword = (value, values) => {
  let result;
  if (!matches(value, values.password)) {
    result = 'Confirm password must match the password field';
  }
  return result;
};

export const username = value => {
  let result;
  if (!minLength(value, 5)) {
    result = 'Username must be at least five characters long';
  }
  return result;
};
