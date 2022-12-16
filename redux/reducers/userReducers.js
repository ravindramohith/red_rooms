import {
    CLEAR_ERRORS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    UPDATE_USER_FAILURE,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_REQUEST,
    UPDATE_USER_RESET,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
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



//user Reducer:
export const userReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return { loading: true }
        case UPDATE_USER_SUCCESS:
            return { loading: false, isUpdated: action.payload }
        case UPDATE_USER_RESET:
            return { loading: false, isUpdated: false }
        case UPDATE_USER_FAILURE:
            return { loading: false, error: action.payload }
        case CLEAR_ERRORS:
            return { error: null, ...state }

        default:
            return { ...state }
    }
}

//forgot password reducer

export const forgotPasswordReducer = (state, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return { loading: true }

        case FORGOT_PASSWORD_SUCCESS:
            return { loading: false, message: action.payload }

        case RESET_PASSWORD_SUCCESS:
            return { loading: false, success: true }

        case FORGOT_PASSWORD_FAILURE:
        case RESET_PASSWORD_FAILURE:
            return { loading: false, error: action.payload }

        case CLEAR_ERRORS:
            return { error: null, ...state }

        default:
            return { ...state }
    }
}