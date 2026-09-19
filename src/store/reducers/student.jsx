import {
    STUDENT,
    REG_COURSES
} from "../types";

const initialState = {
    students: [],
    page: 1,
    totalPages: 1,
    total: 0,
    reg_courses: [],
};

// eslint-disable-next-line react-refresh/only-export-components
export default function (state = initialState, action) {
    const { payload } = action;

    switch (action.type) {
        case STUDENT:
            return {
                ...state,
                students: payload.records,
                page: payload.page,
                totalPages: payload.totalPages,
                total: payload.total,
            };

        case REG_COURSES:
            return {
                ...state,
                reg_courses: payload.courses,
            };

        default:
            return state;
    }
}