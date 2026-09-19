import * as Helpers from "../../helpers";

import {
    ERROR,
    LOADING,
    STUDENT,
    REG_COURSES
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

export const getRegCourses = (error, success) =>
  Helpers.api(
    "/student/courses",
    "GET",
    {},
    { error, success },
    {
      error: ERROR,
      loading: LOADING,
      responder: REG_COURSES,
    }
  );