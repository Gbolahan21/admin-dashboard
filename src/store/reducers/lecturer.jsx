/* eslint-disable react-refresh/only-export-components */
import {
    GET_CURRENT_SEMESTER,
    GET_LECTURER_FACULTIES,
    GET_LECTURER_DEPARTMENTS,
    GET_LECTURER_LEVELS,
    GET_AVAILABLE_LECTURER_COURSES,
    GET_MY_LECTURER_COURSES,
    REGISTER_LECTURER_COURSES,
    REMOVE_LECTURER_COURSE,
} from "../types";

const initialState = {
    currentSemester: null,
    faculties: [],
    departments: [],
    levels: [],
    availableCourses: [],
    myCourses: [],
    loading: [],
};

export default function (
    state = initialState,
    action
) {
    const { payload } = action;

    switch (action.type) {

        case GET_CURRENT_SEMESTER:
            return {
                ...state,
                currentSemester:
                    payload.semester,
            };

        case GET_LECTURER_FACULTIES:
            return {
                ...state,
                faculties:
                    payload.faculties || [],
            };

        case GET_LECTURER_DEPARTMENTS:
            return {
                ...state,
                departments:
                    payload.departments || [],
            };

        case GET_LECTURER_LEVELS:
            return {
                ...state,
                levels:
                    payload.levels || [],
            };

        case GET_AVAILABLE_LECTURER_COURSES:
            return {
                ...state,
                availableCourses:
                    payload.courses || [],
            };

        case GET_MY_LECTURER_COURSES:
            return {
                ...state,
                myCourses:
                    payload.courses || [],
            };

        case REGISTER_LECTURER_COURSES:
            return {
                ...state,
                myCourses: [
                    ...state.myCourses,
                    ...(payload.registeredCourses || []),
                ],
            };

        case REMOVE_LECTURER_COURSE:
            return {
                ...state,
                myCourses:
                    state.myCourses.filter(
                        (course) =>
                            course.registration_id !==
                            payload.registration?.id
                    ),
            };

        default:
            return state;
    }
}