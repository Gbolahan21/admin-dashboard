import * as Helpers from '../../helpers';

import {
    DASHBOARD,
    DASHBOARD_ERROR,
    DASHBOARD_LOADING,
} from "../types";

export const getDashboardStats = (error, success) => 
  Helpers.api(
  '/admin/dashboard',
  'GET',
  {},
  { error, success },
  { error: DASHBOARD_ERROR, loading: DASHBOARD_LOADING, responder: DASHBOARD }
);