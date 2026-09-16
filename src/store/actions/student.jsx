import * as Helpers from "../../helpers";

import {
    ERROR,
    LOADING,
    STUDENT,
} from "../types";

export const getStudents = (
    page = 1,
    limit = 10,
    search = "",
    error,
    success
) =>
    Helpers.api(
        `/admin/students?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
        "GET",
        {},
        { error, success },
        {
            error: ERROR,
            loading: LOADING,
            responder: STUDENT,
        }
    );