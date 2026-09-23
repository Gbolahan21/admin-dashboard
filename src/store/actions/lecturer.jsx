import * as Helpers from "../../helpers";

import {
    GET_CURRENT_SEMESTER,
    GET_LECTURER_FACULTIES,
    GET_LECTURER_DEPARTMENTS,
    GET_LECTURER_LEVELS,
    GET_AVAILABLE_LECTURER_COURSES,
    GET_MY_LECTURER_COURSES,
    REGISTER_LECTURER_COURSES,
    REMOVE_LECTURER_COURSE,
    ERROR,
    LOADING,
} from "../types";

export const getCurrentSemester = (
    error,
    success
) =>
    Helpers.api(
        "/lecturer/course-registration/current-semester",
        "GET",
        {},
        { error, success },
        {
            error: ERROR,
            loading: LOADING,
            responder: GET_CURRENT_SEMESTER,
        }
    );

export const getLecturerFaculties = (
    error,
    success
) =>
    Helpers.api(
        "/lecturer/course-registration/faculties",
        "GET",
        {},
        { error, success },
        {
            error: ERROR,
            loading: LOADING,
            responder: GET_LECTURER_FACULTIES,
        }
    );

export const getDepartmentsByFaculty = (
    facultyId,
    error,
    success
) =>
    Helpers.api(
        `/lecturer/course-registration/departments/${facultyId}`,
        "GET",
        {},
        { error, success },
        {
            error: ERROR,
            loading: LOADING,
            responder: GET_LECTURER_DEPARTMENTS,
        }
    );

export const getLecturerLevels = (
    error,
    success
) =>
    Helpers.api(
        "/lecturer/course-registration/levels",
        "GET",
        {},
        { error, success },
        {
            error: ERROR,
            loading: LOADING,
            responder: GET_LECTURER_LEVELS,
        }
    );

export const getAvailableCourses = (
    data,
    error,
    success
) =>
    Helpers.api(
        "/lecturer/course-registration/courses",
        "GET",
        data,
        { error, success },
        {
            error: ERROR,
            loading: LOADING,
            responder: GET_AVAILABLE_LECTURER_COURSES,
        }
    );

export const getMyCourses = (
    error,
    success
) =>
    Helpers.api(
        "/lecturer/course-registration",
        "GET",
        {},
        { error, success },
        {
            error: ERROR,
            loading: LOADING,
            responder: GET_MY_LECTURER_COURSES,
        }
    );

export const registerCourses = (
    data,
    error,
    success
) =>
    Helpers.api(
        "/lecturer/course-registration",
        "POST",
        data,
        { error, success },
        {
            error: ERROR,
            loading: LOADING,
            responder: REGISTER_LECTURER_COURSES,
        }
    );

export const removeCourseRegistration = (
    id,
    error,
    success
) =>
    Helpers.api(
        `/lecturer/course-registration/${id}`,
        "DELETE",
        {},
        { error, success },
        {
            error: ERROR,
            loading: LOADING,
            responder: REMOVE_LECTURER_COURSE,
        }
    );