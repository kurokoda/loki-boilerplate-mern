export const isRequired = fieldName => `${fieldName} is required`;

export const mustMatch = otherFieldName => fieldName =>
  `${fieldName} must match ${otherFieldName}`;

export const minLength = length => fieldName =>
  `${fieldName} must be at least ${length} characters`;

export const maxLength = length => fieldName =>
  `${fieldName} must be ${length} characters max`;

export const exactLengthAlphanumeric = length => fieldName =>
  `${fieldName} must be ${length} characters long`;

export const atLeastOneAlphaOneNumeric = fieldName =>
  `${fieldName} Password must contain at least one letter and number`;
