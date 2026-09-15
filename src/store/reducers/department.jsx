import {
    DEPARTMENT,
    DEPARTMENT_CREATE,
    DEPARTMENT_UPDATE,
    DEPARTMENT_DELETE,
} from "../types";

const initialState = {
    departments: [],
};

// eslint-disable-next-line react-refresh/only-export-components
export default function (state = initialState, action) {
    const { payload } = action;

    switch (action.type) {
        case DEPARTMENT:
            return {
                ...state,
                departments: payload.departments,
            };

        case DEPARTMENT_CREATE:
            return {
                ...state,
                departments: [
                    ...state.departments,
                    payload.department,
                ],
            };

        case DEPARTMENT_UPDATE:
            return {
                ...state,
                departments: state.departments.map(
                    (department) =>
                        department.id === payload.department.id
                            ? payload.department
                            : department
                ),
            };

        case DEPARTMENT_DELETE:
            return {
                ...state,
                departments: state.departments.filter(
                    (department) =>
                        department.id !== payload.id
                ),
            };

        default:
            return state;
    }
}