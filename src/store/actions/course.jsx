import * as Helpers from '../../helpers';

import {
  ERROR,
  LOADING,
  COURSE,
  COURSE_CREATE,
  COURSE_UPDATE,
  COURSE_DELETE,
} from '../types';


export const getCourses = (error, success) =>
    Helpers.api(
        '/course',
        'GET',
        {},
        { error, success },
        {
            error: ERROR,
            loading: LOADING,
            responder: COURSE,
        }
    );

export const createCourse = (
    course_code,
    course_title,
    course_unit,
    department_id,
    level_id,
    semester_id,
    error,
    success
) =>
    Helpers.api(
        '/course',
        'POST',
        {
            course_code,
            course_title,
            course_unit,
            department_id,
            level_id,
            semester_id,
        },
        { error, success },
        {
            error: ERROR,
            loading: LOADING,
            responder: COURSE_CREATE,
        }
    );

export const updateCourse = (
    id,
    course_code,
    course_title,
    course_unit,
    department_id,
    level_id,
    semester_id,
    error,
    success
) =>
    Helpers.api(
        `/course/${id}`,
        'PUT',
        {
            course_code,
            course_title,
            course_unit,
            department_id,
            level_id,
            semester_id,
        },
        { error, success },
        {
            error: ERROR,
            loading: LOADING,
            responder: COURSE_UPDATE,
        }
    );

export const deleteCourse = (id, error, success) =>
    Helpers.api(
        `/course/${id}`,
        'DELETE',
        {},
        { error, success },
        {
            error: ERROR,
            loading: LOADING,
            responder: COURSE_DELETE,
        }
    );