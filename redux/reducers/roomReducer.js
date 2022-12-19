import {
    GET_ROOMS_FAILURE,
    GET_ROOMS_SUCCESS,
    GET_ROOM_FAILURE,
    GET_ROOM_SUCCESS,
    NEW_REVIEW_FAILURE,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,
    REVIEW_AVAILABILITY_FAILURE,
    REVIEW_AVAILABILITY_REQUEST,
    REVIEW_AVAILABILITY_SUCCESS,
    GET_ROOMS_ADMIN_FAILURE,
    GET_ROOMS_ADMIN_REQUEST,
    GET_ROOMS_ADMIN_SUCCESS,
    NEW_ROOM_ADMIN_FAILURE,
    NEW_ROOM_ADMIN_REQUEST,
    NEW_ROOM_ADMIN_RESET,
    NEW_ROOM_ADMIN_SUCCESS,
    UPDATE_ROOM_ADMIN_FAILURE,
    UPDATE_ROOM_ADMIN_REQUEST,
    UPDATE_ROOM_ADMIN_SUCCESS,
    UPDATE_ROOM_ADMIN_RESET,
    DELETE_ROOM_ADMIN_FAILURE,
    DELETE_ROOM_ADMIN_REQUEST,
    DELETE_ROOM_ADMIN_SUCCESS,
    DELETE_ROOM_ADMIN_RESET,
    GET_REVIEWS_ADMIN_FAILURE,
    GET_REVIEWS_ADMIN_REQUEST,
    GET_REVIEWS_ADMIN_SUCCESS,
    DELETE_REVIEW_ADMIN_FAILURE,
    DELETE_REVIEW_ADMIN_REQUEST,
    DELETE_REVIEW_ADMIN_RESET,
    DELETE_REVIEW_ADMIN_SUCCESS,
    CLEAR_ERRORS,
} from "../constants/roomConstants";

export const allRoomsReducer = (state = { rooms: [], loading: true }, action) => {
    switch (action.type) {
        case GET_ROOMS_ADMIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ROOMS_SUCCESS:
            return {
                roomsCount: action.payload.roomsCount,
                resPerPage: action.payload.resPerPage,
                filteredRoomCount: action.payload.filteredRoomCount,
                rooms: action.payload.rooms
            }

        case GET_ROOMS_ADMIN_SUCCESS:
            return {
                loading: false,
                rooms: action.payload
            }

        case GET_ROOMS_FAILURE:
        case GET_ROOMS_ADMIN_FAILURE:
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

export const roomDetailsReducer = (state = { room: {} }, action) => {
    switch (action.type) {
        case GET_ROOM_SUCCESS:
            return {
                room: action.payload
            }

        case GET_ROOM_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return { error: null, ...state }

        default:
            return { ...state }
    }
}

export const newRoomAdminReducer = (state = { room: {} }, action) => {
    switch (action.type) {
        case NEW_ROOM_ADMIN_REQUEST:
            return {
                loading: true,
            }
        case NEW_ROOM_ADMIN_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                room: action.payload.room
            }

        case NEW_ROOM_ADMIN_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case NEW_ROOM_ADMIN_RESET:
            return {
                loading: false,
                success: false
            }

        case CLEAR_ERRORS:
            return { error: null, ...state }

        default:
            return { ...state }
    }
}

export const roomAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ROOM_ADMIN_REQUEST:
        case DELETE_ROOM_ADMIN_REQUEST:
            return {
                loading: true,
            }
        case UPDATE_ROOM_ADMIN_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_ROOM_ADMIN_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ROOM_ADMIN_FAILURE:
        case DELETE_ROOM_ADMIN_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_ROOM_ADMIN_RESET:
            return {
                loading: false,
                isUpdated: false
            }

        case DELETE_ROOM_ADMIN_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return { error: null, ...state }

        default:
            return { ...state }
    }
}

export const reviewAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_ADMIN_REQUEST:
            return {
                loading: true,
            }
        case DELETE_REVIEW_ADMIN_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_ADMIN_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_REVIEW_ADMIN_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return { error: null, ...state }

        default:
            return { ...state }
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                loading: true,
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case NEW_REVIEW_RESET:
            return {
                loading: false,
                success: false
            }

        case CLEAR_ERRORS:
            return { error: null, ...state }

        default:
            return { ...state }
    }
}
export const checkReviewReducer = (state = { reviewAvailable: null }, action) => {
    switch (action.type) {
        case REVIEW_AVAILABILITY_REQUEST:
            return {
                loading: true,
            }
        case REVIEW_AVAILABILITY_SUCCESS:
            return {
                loading: false,
                reviewAvailable: action.payload
            }
        case REVIEW_AVAILABILITY_FAILURE:
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
export const roomReviewsAdminReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case GET_REVIEWS_ADMIN_REQUEST:
            return {
                loading: true,
            }
        case GET_REVIEWS_ADMIN_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }
        case GET_REVIEWS_ADMIN_FAILURE:
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