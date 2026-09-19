import {
    ATTENDANCE,
} from "../types";

const initialState = {
    attendance: [],
};

// eslint-disable-next-line react-refresh/only-export-components
export default function (state = initialState, action) {
    const { payload } = action;

    switch (action.type) {
        case ATTENDANCE:
            return {
                ...state,
                attendance: payload.attendance,
            };

        default:
            return state;
    }
}