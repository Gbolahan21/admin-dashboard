import {
  FACULTY,
  FACULTY_CREATE,
  FACULTY_UPDATE,
  FACULTY_DELETE,
} from "../types";

const initialState = {
  faculties: [],
};

// eslint-disable-next-line react-refresh/only-export-components
export default function (state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case FACULTY:
      return {
        ...state,
        faculties: payload.faculties,
      };

    case FACULTY_CREATE:
      return {
        ...state,
        faculties: [
          ...state.faculties,
          payload.faculty,
        ],
      };

    case FACULTY_UPDATE:
      return {
        ...state,
        faculties: state.faculties.map((faculty) =>
          faculty.id === payload.faculty.id
            ? payload.faculty
            : faculty
        ),
      };

    case FACULTY_DELETE:
      return {
        ...state,
        faculties: state.faculties.filter(
          (faculty) => faculty.id !== payload.id
        ),
      };

    default:
      return state;
  }
}