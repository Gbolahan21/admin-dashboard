import {
  LEVEL,
  LEVEL_CREATE,
  LEVEL_UPDATE,
  LEVEL_DELETE,
} from "../types";

const initialState = {
  levels: [],
};

// eslint-disable-next-line react-refresh/only-export-components
export default function (state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case LEVEL:
      return {
        ...state,
        levels: payload.levels,
      };

    case LEVEL_CREATE:
      return {
        ...state,
        levels: [
          ...state.levels,
          payload.level,
        ],
      };

    case LEVEL_UPDATE:
      return {
        ...state,
        levels: state.levels.map((level) =>
          level.id === payload.level.id
            ? payload.level
            : level
        ),
      };

    case LEVEL_DELETE:
      return {
        ...state,
        levels: state.levels.filter(
          (level) => level.id !== payload.id
        ),
      };

    default:
      return state;
  }
}