import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  SEMESTER,
  SEMESTER_CREATE,
  SEMESTER_UPDATE,
  SEMESTER_DELETE,
  SEMESTER_CURRENT
} from '../types';


// GET ALL FACULTIES
export const getSemesters = (error, success) =>

  Helpers.api(

    '/semester',

    'GET',

    {},

    { error, success },

    { error: ERROR, loading: LOADING, responder: SEMESTER }

  );


// CREATE FACULTY
export const createSemester = (payload, error, success) =>

  Helpers.api(

    '/semester',

    'POST',

    payload,

    { error, success },

    { error: ERROR, loading: LOADING, responder: SEMESTER_CREATE }

  );


// UPDATE FACULTY
export const updateSemester = (id, payload, error, success) =>

  Helpers.api(

    `/semester/${id}`,

    'PUT',

    payload,

    { error, success },

    { error: ERROR, loading: LOADING, responder: SEMESTER_UPDATE }

  );


// DELETE FACULTY
export const deleteSemester = (id, error, success) =>

  Helpers.api(

    `/semester/${id}`,

    'DELETE',

    {},

    { error, success },

    { error: ERROR, loading: LOADING, responder: SEMESTER_DELETE }

  );

export const setCurrentSemester = (id, error, success) =>

  Helpers.api(

    `/semester/${id}/current`,

    'PATCH',

    {},

    { error, success },

    { error: ERROR, loading: LOADING, responder: SEMESTER_CURRENT }

  );