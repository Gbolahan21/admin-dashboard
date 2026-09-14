import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  FACULTY,
  FACULTY_CREATE,
  FACULTY_UPDATE,
  FACULTY_DELETE,
} from '../types';


// GET ALL FACULTIES
export const getFaculties = (error, success) =>

  Helpers.api(

    '/faculty',

    'GET',

    {},

    { error, success },

    { error: ERROR, loading: LOADING, responder: FACULTY }

  );


// CREATE FACULTY
export const createFaculty = (name, error, success) =>

  Helpers.api(

    '/faculty',

    'POST',

    {
      name,
    },

    { error, success },

    { error: ERROR, loading: LOADING, responder: FACULTY_CREATE }

  );


// UPDATE FACULTY
export const updateFaculty = (id, name, error, success) =>

  Helpers.api(

    `/faculty/${id}`,

    'PUT',

    {
      name,
    },

    { error, success },

    { error: ERROR, loading: LOADING, responder: FACULTY_UPDATE }

  );


// DELETE FACULTY
export const deleteFaculty = (id, error, success) =>

  Helpers.api(

    `/faculty/${id}`,

    'DELETE',

    {},

    { error, success },

    { error: ERROR, loading: LOADING, responder: FACULTY_DELETE }

  );