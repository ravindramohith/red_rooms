import {
    CLEAR_ERRORS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST
} from "../constants/userConstants";

export const authReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return { loading: true }

        case LOAD_USER_REQUEST:
            return { loading: true, isAuthenticated: false }

        case REGISTER_USER_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case REGISTER_USER_FAILURE:
            return {
                loading: false,
                error: action.payload
            }

        case LOAD_USER_FAILURE:
            return {
                loading: false,
                error: action.payload,
                isAuthenticated: false
            }

        case CLEAR_ERRORS:
            return { error: null, ...state }

        default:
            return { ...state }
    }
}