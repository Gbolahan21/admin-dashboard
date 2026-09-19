import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  ATTENDANCE,
} from '../types';

export const getAttendance = (error, success) =>
  Helpers.api(
    '/attendance/admin',
    'GET',
    {},
    { error, success },
    { error: ERROR, loading: LOADING, responder: ATTENDANCE }
  );