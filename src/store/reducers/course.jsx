import {
    COURSE,
    COURSE_CREATE,
    COURSE_UPDATE,
    COURSE_DELETE,
} from "../types";

const initialState = {
    courses: [],
};

// eslint-disable-next-line react-refresh/only-export-components
export default function (state = initialState, action) {
    const { payload } = action;

    switch (action.type) {
        case COURSE:
            return {
                ...state,
                courses: payload.courses,
            };

        case COURSE_CREATE:
            return {
                ...state,
                courses: [
                    ...state.courses,
                    payload.course,
                ],
            };

        case COURSE_UPDATE:
            return {
                ...state,
                courses: state.courses.map(
                    (course) =>
                        course.id === payload.course.id
                            ? payload.course
                            : course
                ),
            };

        case COURSE_DELETE:
            return {
                ...state,
                courses: state.courses.filter(
                    (course) =>
                        course.id !== payload.id
                ),
            };

        default:
            return state;
    }
}