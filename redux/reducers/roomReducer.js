import {
    CLEAR_ERRORS, GET_ROOMS_FAILURE, GET_ROOMS_SUCCESS, GET_ROOM_FAILURE, GET_ROOM_SUCCESS,
    NEW_REVIEW_FAILURE,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,
    REVIEW_AVAILABILITY_FAILURE,
    REVIEW_AVAILABILITY_REQUEST,
    REVIEW_AVAILABILITY_SUCCESS
} from "../constants/roomConstants";

export const allRoomsReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case GET_ROOMS_SUCCESS:
            return {
                roomsCount: action.payload.roomsCount,
                resPerPage: action.payload.resPerPage,
                filteredRoomCount: action.payload.filteredRoomCount,
                rooms: action.payload.rooms
            }

        case GET_ROOMS_FAILURE:
            return {
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
                error: action.payload
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