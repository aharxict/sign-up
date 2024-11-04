import * as Yup from 'yup';

import { FormValues } from './types/formTypes';

const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const validationSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, 'Invalid email address')
    .required('This is required field'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .max(64, 'Must be at most 64 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .required('This is required field'),
});

export const validateRules = ({ email, password }: FormValues) => {
  return {
    email: emailRegex.test(email),
    length:
      password.length >= 8 && password.length <= 64 && !password.includes(' '),
    uppercaseLowercase: /[A-Z]/.test(password) && /[a-z]/.test(password),
    digit: /\d/.test(password),
  };
};
