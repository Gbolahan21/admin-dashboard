import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  SIGNIN,
  SIGNUP,
  LOAD,
  FORGOT_PASSWORD,
  VERIFY_RESET_CODE,
  RESET_PASSWORD
} from '../types';

export const signup = (data, error, success) => {
  const endpoint = data.role === 'admin' ? '/auth/admin/register' : '/auth/lecturer/register';
  return Helpers.api(
    endpoint,
    'POST',
    data,
    { error, success },
    { error: ERROR, loading: LOADING, responder: SIGNUP }
  );
};

export const signin = (email, password, error, success) =>
  Helpers.api(
    '/auth/login',
    'POST',
    { email, password },
    { error, success },
    { error: ERROR, loading: LOADING, responder: SIGNIN }
  );

export const load = (error, success) =>
  Helpers.api(
    '/auth/load',
    'GET',
    {},
    { error, success },
    { error: ERROR, loading: LOADING, responder: LOAD }
  );

export const forgotPassword = (data, error, success) =>
  Helpers.api(
    "/reset-password/student/forgot-password",
    "POST",
    data,
    { error, success },
    {
      error: ERROR,
      loading: LOADING,
      responder: FORGOT_PASSWORD,
    }
  );

export const verifyResetCode = (data, error, success) =>
  Helpers.api(
    "/reset-password/student/verify-reset-code",
    "POST",
    data,
    { error, success },
    {
      error: ERROR,
      loading: LOADING,
      responder: VERIFY_RESET_CODE,
    }
  );

export const resetPassword = (data, error, success) =>
  Helpers.api(
    "/reset-password/student/reset-password",
    "POST",
    data,
    { error, success },
    {
      error: ERROR,
      loading: LOADING,
      responder: RESET_PASSWORD,
    }
  );

