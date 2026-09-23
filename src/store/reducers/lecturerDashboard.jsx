/* eslint-disable react-refresh/only-export-components */
import {
    LECTURER_DASHBOARD,
    LECTURER_DASHBOARD_LOADING,
    LECTURER_DASHBOARD_ERROR,
} from "../types";

const initialState = {
    loading: [],
    error: null,

    stats: {
        totalCourses: 0,
        totalStudents: 0,
        presentToday: 0,
        absentToday: 0,
        attendanceRate: 0,
        courses: [],
    },
};

export default function (
    state = initialState,
    action
) {
    const { payload } = action;

    switch (action.type) {

        case LECTURER_DASHBOARD_LOADING:
            return {
                ...state,

                loading: state.loading.some(
                    (item) => item === payload
                )
                    ? state.loading.filter(
                          (item) => item !== payload
                      )
                    : [...state.loading, payload],
            };

        case LECTURER_DASHBOARD:
            return {
                ...state,
                error: null,
                stats: payload,
            };

        case LECTURER_DASHBOARD_ERROR:
            return {
                ...state,
                error:
                    payload?.message ||
                    "Unable to load lecturer dashboard.",
            };

        default:
            return state;
    }
}