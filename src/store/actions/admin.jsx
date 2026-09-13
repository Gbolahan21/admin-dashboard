import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  SIGNIN,
  SIGNUP,
  LOAD,
  FACULTIES,
  DEPARTMENTS,
  LEVELS,
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

export const getFaculties = (error, success) =>
  Helpers.api(
    '/admin/faculties',
    'GET',
    {},
    { error, success },
    { error: ERROR, loading: LOADING, responder: FACULTIES }
  );

export const getDepartments = (error, success) =>
  Helpers.api(
    '/admin/departments',
    'GET',
    {},
    { error, success },
    { error: ERROR, loading: LOADING, responder: DEPARTMENTS }
  );

export const getLevels = (error, success) =>
  Helpers.api(
    '/admin/levels',
    'GET',
    {},
    { error, success },
    { error: ERROR, loading: LOADING, responder: LEVELS }
  );

