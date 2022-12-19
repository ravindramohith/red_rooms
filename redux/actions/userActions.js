import {
    CLEAR_ERRORS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAILURE,
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
    DELETE_USER_ADMIN_FAILURE,
    DELETE_USER_ADMIN_REQUEST,
    DELETE_USER_ADMIN_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

// Register user
export const registerUser = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/auth/register', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAILURE,
            payload: error.response
        })
    }
}

export const updateUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/me/update', userData, config)

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAILURE,
            payload: error.response
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_ADMIN_REQUEST });

        const { data } = await axios.delete(`/api/admin/users/${id}`)

        dispatch({
            type: DELETE_USER_ADMIN_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_USER_ADMIN_FAILURE,
            payload: error.response
        })
    }
}

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const { data } = await axios.post('/api/password/forgot', email)
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: error.response
        })
    }
}

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const { data } = await axios.put(`/api/password/reset/${token}`, passwords)
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAILURE,
            payload: error.response
        })
    }
}

// Load User
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get('/api/me')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {

        dispatch({
            type: LOAD_USER_FAILURE,
            payload: error.response.data.message
        })
    }
}
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: GET_USERS_ADMIN_REQUEST });

        const { data } = await axios.get('/api/admin/users')

        dispatch({
            type: GET_USERS_ADMIN_SUCCESS,
            payload: data.users
        })

    } catch (error) {

        dispatch({
            type: GET_USERS_ADMIN_FAILURE,
            payload: error.response.data.message
        })
    }
}
export const UserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_ADMIN_REQUEST });

        const { data } = await axios.get(`/api/admin/users/${id}`)

        dispatch({
            type: GET_USER_ADMIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {

        dispatch({
            type: GET_USER_ADMIN_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const updateUserAdmin = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_ADMIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/admin/users/${id}`, userData, config)

        dispatch({
            type: UPDATE_USER_ADMIN_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_ADMIN_FAILURE,
            payload: error.response
        })
    }
}
//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}
