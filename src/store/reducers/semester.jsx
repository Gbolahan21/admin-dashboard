import {
  SEMESTER,
  SEMESTER_CREATE,
  SEMESTER_UPDATE,
  SEMESTER_DELETE,
} from "../types";

const initialState = {
  semesters: [],
};

// eslint-disable-next-line react-refresh/only-export-components
export default function (state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case SEMESTER:
      return {
        ...state,
        semesters: payload.semesters,
      };

    case SEMESTER_CREATE:
      return {
        ...state,
        semesters: [
          ...state.semesters,
          payload.semester,
        ],
      };

    case SEMESTER_UPDATE:
      return {
        ...state,
        semesters: state.semesters.map((semester) =>
          semester.id === payload.semester.id
            ? payload.semester
            : semester
        ),
      };

    case SEMESTER_DELETE:
      return {
        ...state,
        semesters: state.semesters.filter(
          (semester) => semester.id !== payload.id
        ),
      };

    default:
      return state;
  }
}