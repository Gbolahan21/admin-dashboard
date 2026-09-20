import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  SIGNIN,
  SIGNUP,
  LOAD,
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

