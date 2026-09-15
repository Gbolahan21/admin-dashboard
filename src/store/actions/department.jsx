import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  DEPARTMENT,
  DEPARTMENT_CREATE,
  DEPARTMENT_UPDATE,
  DEPARTMENT_DELETE,
} from '../types';

export const getDepartments = (error, success) =>

  Helpers.api(

    '/department',

    'GET',

    {},

    { error, success },

    { error: ERROR, loading: LOADING, responder: DEPARTMENT }

  );

export const createDepartment = (name, faculty_id, error, success) =>

  Helpers.api(

    '/department',

    'POST',

    {
      name, faculty_id,
    },

    { error, success },

    { error: ERROR, loading: LOADING, responder: DEPARTMENT_CREATE }

  );

export const updateDepartment = (id, name, faculty_id, error, success) =>

  Helpers.api(

    `/department/${id}`,

    'PUT',

    {
      name, faculty_id,
    },

    { error, success },

    { error: ERROR, loading: LOADING, responder: DEPARTMENT_UPDATE }

  );

export const deleteDepartment = (id, error, success) =>

  Helpers.api(

    `/department/${id}`,

    'DELETE',

    {},

    { error, success },

    { error: ERROR, loading: LOADING, responder: DEPARTMENT_DELETE }

  );