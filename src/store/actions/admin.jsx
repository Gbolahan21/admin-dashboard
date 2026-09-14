import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  SIGNIN,
  SIGNUP,
  LOAD,
} from '../types';

export const signup = (firstname, lastname, email, title, password, error, success) => 
  Helpers.api(
  '/admin/signup',
  'POST',
  {
    firstname,
    lastname,
    email,
    title,
    password,
  },
  { error, success },
  { error: ERROR, loading: LOADING, responder: SIGNUP }
);

export const signin = (email, password, error, success) =>
  Helpers.api(
    '/admin/signin',
    'POST',
    { email, password },
    { error, success },
    { error: ERROR, loading: LOADING, responder: SIGNIN }
  );

export const load = (error, success) =>
  Helpers.api(
    '/admin/load',
    'GET',
    {},
    { error, success },
    { error: ERROR, loading: LOADING, responder: LOAD }
  );

