import * as Helpers from '../../helpers';

import {
    LECTURER_DASHBOARD,
    LECTURER_DASHBOARD_LOADING,
    LECTURER_DASHBOARD_ERROR,
} from "../types";

export const getLecturerDashboardStats = (error, success) =>
    Helpers.api(
        "/lecturer/course-registration/dashboard",
        "GET",
        {},
        { error, success },
        {
            error: LECTURER_DASHBOARD_ERROR,
            loading: LECTURER_DASHBOARD_LOADING,
            responder: LECTURER_DASHBOARD,
        }
    );