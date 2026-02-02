export const isRequired = (value) => value.trim().length > 0;

export const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const minLength = (value, min) =>
  value.trim().length >= min;

export const maxLength = (value, max) =>
  value.trim().length <= max;
