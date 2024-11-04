'use client';

import { NextPage } from 'next';
import { useState } from 'react';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { validationSchema, validateRules } from '../../utils/validation';
import { FormValues } from '../../types/formTypes';
import { getFieldStyles } from '../../utils/stylesUtils';
import { colors } from '../../utils/colors';
import styles from './SignUp.module.css';

const SignUp: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [submittedValues, setSubmittedValues] = useState({
    email: '',
    password: '',
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (values: FormValues) => {
    setSubmittedValues(values);
    setOpenDialog(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign up</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        validateOnBlur
        onSubmit={(
          values: FormValues,
          { setSubmitting }: FormikHelpers<FormValues>
        ) => {
          setSubmitting(false);
          handleSubmit(values);
        }}>
        {({ values, errors, touched }) => {
          const validatedRules = validateRules(values);
          const emailStyles = getFieldStyles({
            isSuccess: validatedRules.email,
            isTouched: touched.email,
            isError: !!errors.email,
            isPasswordHint: false,
          });
          const passwordStyles = getFieldStyles({
            isSuccess:
              validatedRules.length &&
              validatedRules.uppercaseLowercase &&
              validatedRules.digit,
            isTouched: touched.password,
            isError: !!errors.password,
            isPasswordHint: false,
          });

          return (
            <Form>
              <div className={styles.formFieldsWrapper}>
                <Field
                  as={TextField}
                  type='email'
                  name='email'
                  placeholder='Email'
                  variant='outlined'
                  className={styles.formFieldRootElement}
                  sx={{
                    '&': {
                      backgroundColor: emailStyles.backgroundColor,
                    },
                    '& .MuiOutlinedInput-root': {
                      '& input': {
                        color: emailStyles.color,
                      },
                      '& fieldset': {
                        border: emailStyles.border,
                      },
                      '&:hover fieldset': {
                        border: emailStyles.border,
                      },
                      '&.Mui-focused fieldset': {
                        border: emailStyles.isDefault
                          ? `1px solid ${colors.borderDefault}`
                          : emailStyles.border,
                      },
                    },
                  }}
                  fullWidth
                />
                <ErrorMessage
                  name='email'
                  component='div'
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.formFieldsWrapper}>
                <Field
                  as={TextField}
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Create your password'
                  variant='outlined'
                  className={styles.formFieldRootElement}
                  sx={{
                    '&': {
                      backgroundColor: passwordStyles.backgroundColor,
                    },
                    '& .MuiOutlinedInput-root': {
                      '& input': {
                        color: passwordStyles.color,
                      },
                      '& path': {
                        color: passwordStyles.color,
                      },
                      '& fieldset': {
                        border: passwordStyles.border,
                      },
                      '&:hover fieldset': {
                        border: passwordStyles.border,
                      },
                      '&.Mui-focused fieldset': {
                        border: passwordStyles.isDefault
                          ? `1px solid ${colors.borderDefault}`
                          : passwordStyles.border,
                      },
                    },
                  }}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label={
                            showPassword
                              ? 'hide the password'
                              : 'display the password'
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          className={styles.formFieldIconElement}
                          edge='end'>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.passwordHints}>
                <p
                  style={{
                    color: getFieldStyles({
                      isSuccess: validatedRules.length,
                      isTouched: touched.password,
                      isError: !!errors.password,
                      isPasswordHint: true,
                    }).color,
                  }}>
                  8 characters or more (no spaces)
                </p>
                <p
                  style={{
                    color: getFieldStyles({
                      isSuccess: validatedRules.uppercaseLowercase,
                      isTouched: touched.password,
                      isError: !!errors.password,
                      isPasswordHint: true,
                    }).color,
                  }}>
                  Uppercase and lowercase letters
                </p>
                <p
                  style={{
                    color: getFieldStyles({
                      isSuccess: validatedRules.digit,
                      isTouched: touched.password,
                      isError: !!errors.password,
                      isPasswordHint: true,
                    }).color,
                  }}>
                  At least one digit
                </p>
              </div>
              <div className={styles.formSubmitButtonWrapper}>
                <Button
                  type='submit'
                  variant='contained'
                  className={styles.formSubmitButton}
                  fullWidth>
                  Sign up
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Sign up success</DialogTitle>
        <DialogContent>
          <p>Your account has been created successfully!</p>
          <p>
            <strong>Email:</strong> {submittedValues.email}
          </p>
          <p>
            <strong>Password:</strong> {submittedValues.password}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUp;
