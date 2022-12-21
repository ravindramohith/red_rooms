import {
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
    GET_USERS_ADMIN_FAILURE,
    GET_USERS_ADMIN_REQUEST,
    GET_USERS_ADMIN_SUCCESS,
    GET_USER_ADMIN_FAILURE,
    GET_USER_ADMIN_REQUEST,
    GET_USER_ADMIN_SUCCESS,
    UPDATE_USER_ADMIN_FAILURE,
    UPDATE_USER_ADMIN_REQUEST,
    UPDATE_USER_ADMIN_SUCCESS,
    UPDATE_USER_ADMIN_RESET,
    DELETE_USER_ADMIN_FAILURE,
    DELETE_USER_ADMIN_REQUEST,
    DELETE_USER_ADMIN_SUCCESS,
    DELETE_USER_ADMIN_RESET,
    CLEAR_ERRORS,
} from "../constants/userConstants";

export const authReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return { loading: true }

        case REGISTER_USER_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case REGISTER_USER_FAILURE:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return { error: null, ...state }

        default:
            return { ...state }
    }
}
export const loadUserReducer = (state = { loading: true, user: null }, action) => {
    switch (action.type) {
        case LOAD_USER_REQUEST:
            return { loading: true, isAuthenticated: false }

        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
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

export const allUsersReducer = (state = { users: [], loading: true }, action) => {
    switch (action.type) {
        case GET_USERS_ADMIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_USERS_ADMIN_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }

        case GET_USERS_ADMIN_FAILURE:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return { error: null, ...state }

        default:
            return { ...state }
    }
}

export const userAdminReducer = (state = { user: {}, loading: true }, action) => {
    switch (action.type) {
        case GET_USER_ADMIN_REQUEST:
            return {
                loading: true,
            }
        case GET_USER_ADMIN_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }

        case GET_USER_ADMIN_FAILURE:
            return {
                loading: false,
                error: action.payload
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
        case UPDATE_USER_ADMIN_REQUEST:
        case DELETE_USER_ADMIN_REQUEST:
            return { loading: true }

        case UPDATE_USER_SUCCESS:
        case UPDATE_USER_ADMIN_SUCCESS:
            return { loading: false, isUpdated: action.payload }

        case DELETE_USER_ADMIN_SUCCESS:
            return { loading: false, isDeleted: action.payload }

        case UPDATE_USER_RESET:
        case UPDATE_USER_ADMIN_RESET:
            return { loading: false, isUpdated: false }

        case DELETE_USER_ADMIN_RESET:
            return { loading: false, isDeleted: false }

        case UPDATE_USER_FAILURE:
        case UPDATE_USER_ADMIN_FAILURE:
        case DELETE_USER_ADMIN_FAILURE:
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

