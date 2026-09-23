import * as Helpers from "../../helpers";

import {
    GET_ACTIVE_ATTENDANCE,
    START_ATTENDANCE,
    CLOSE_ATTENDANCE,
    LECTURER_ATTENDANCE_LOADING,
    LECTURER_ATTENDANCE_ERROR,
} from "../types";


const initialState = {
    loading: [],
    error: null,

    activeSession: null,
    sessions: [],
};

export default function lecturerAttendance(
    state = initialState,
    action
) {
    const { payload } = action;

    switch (action.type) {

        case LECTURER_ATTENDANCE_LOADING:
            return {
                ...state,

                loading: state.loading.some(
                    (item) => item === payload
                )
                    ? state.loading.filter(
                        (item) => item !== payload
                    )
                    : [
                        ...state.loading,
                        payload,
                    ],
            };


        case GET_ACTIVE_ATTENDANCE:
            return {
                ...state,

                error: null,

                sessions:
                    payload?.sessions || [],

                activeSession:
                    payload?.sessions?.length > 0
                        ? payload.sessions[0]
                        : null,
            };


        case START_ATTENDANCE:
            return {
                ...state,

                error: null,

                activeSession:
                    payload?.session || null,
            };


        case CLOSE_ATTENDANCE:
            return {
                ...state,

                error: null,

                activeSession: null,
            };


        case LECTURER_ATTENDANCE_ERROR:

            if (
                payload?.data?.error
            ) {
                payload.data.error.map(
                    (err) =>
                        Helpers.notification.error(err)
                );
            } else if (
                payload?.message
            ) {
                Helpers.notification.error(
                    payload.message
                );
            } else {
                Helpers.notification.error(
                    "Unable to process attendance."
                );
            }

            return {
                ...state,

                error:
                    payload?.message ||
                    "Unable to process attendance.",
            };


        default:
            return state;
    }
}