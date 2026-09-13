/* eslint-disable react-refresh/only-export-components */
import * as Helpers from '../../helpers';

import {
    DASHBOARD,
    DASHBOARD_LOADING,
    DASHBOARD_ERROR,
} from "../types";

const initialState = {
    loading: [],
    error: null,

    stats: {
        totalStudents: 0,
        presentToday: 0,
        absentToday: 0,
        attendanceRate: 0,
    },
};

export default function (state = initialState, action) {
  const { loading } = state;
  const { payload } = action;

  switch (action.type) {
    case DASHBOARD_LOADING:
      return {
        ...state,
        loading: loading.some((item) => item === payload)
          ? loading.filter((item) => item !== payload)
          : [...loading, payload],
      };

     case DASHBOARD:
        return {
            ...state,
            loading: true,
            error: null,
        };

    case DASHBOARD_ERROR:
      if (payload && payload.data && payload.data.error) {
        payload.data.error.map((err) =>
          Helpers.notification.error(err)
        );
      } else if (payload && payload.message) {
        Helpers.notification.error(payload.message);
      } else {
        Helpers.notification.error(
          'Unfortunately we were unable to fetch some data. Try again.'
        );
      }

      return state;

    default:
      return state;
  }
}