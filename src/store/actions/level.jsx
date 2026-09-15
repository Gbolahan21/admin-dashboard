import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  LEVEL,
  LEVEL_CREATE,
  LEVEL_UPDATE,
  LEVEL_DELETE,
} from '../types';


// GET ALL FACULTIES
export const getLevels = (error, success) =>

  Helpers.api(

    '/level',

    'GET',

    {},

    { error, success },

    { error: ERROR, loading: LOADING, responder: LEVEL }

  );


// CREATE FACULTY
export const createLevel = (name, error, success) =>

  Helpers.api(

    '/level',

    'POST',

    {
      name,
    },

    { error, success },

    { error: ERROR, loading: LOADING, responder: LEVEL_CREATE }

  );


// UPDATE FACULTY
export const updateLevel = (id, name, error, success) =>

  Helpers.api(

    `/level/${id}`,

    'PUT',

    {
      name,
    },

    { error, success },

    { error: ERROR, loading: LOADING, responder: LEVEL_UPDATE }

  );


// DELETE FACULTY
export const deleteLevel = (id, error, success) =>

  Helpers.api(

    `/level/${id}`,

    'DELETE',

    {},

    { error, success },

    { error: ERROR, loading: LOADING, responder: LEVEL_DELETE }

  );