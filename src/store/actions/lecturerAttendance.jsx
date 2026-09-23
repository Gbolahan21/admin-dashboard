import * as Helpers from "../../helpers";

import {
    GET_ACTIVE_ATTENDANCE,
    START_ATTENDANCE,
    CLOSE_ATTENDANCE,
    LECTURER_ATTENDANCE_LOADING,
    LECTURER_ATTENDANCE_ERROR,
} from "../types";


export const getActiveAttendance = (
    error,
    success
) =>
    Helpers.api(
        "/attendance-session/active",
        "GET",
        {},
        { error, success },
        {
            error: LECTURER_ATTENDANCE_ERROR,
            loading:
                LECTURER_ATTENDANCE_LOADING,
            responder: GET_ACTIVE_ATTENDANCE,
        }
    );


export const startAttendance = (
    data,
    error,
    success
) =>
    Helpers.api(
        "/attendance-session/start",
        "POST",
        data,
        { error, success },
        {
            error: LECTURER_ATTENDANCE_ERROR,
            loading:
                LECTURER_ATTENDANCE_LOADING,
            responder: START_ATTENDANCE,
        }
    );


export const closeAttendance = (
    sessionId,
    error,
    success
) =>
    Helpers.api(
        `/attendance-session/close/${sessionId}`,
        "POST",
        {},
        { error, success },
        {
            error: LECTURER_ATTENDANCE_ERROR,
            loading:
                LECTURER_ATTENDANCE_LOADING,
            responder: CLOSE_ATTENDANCE,
        }
    );