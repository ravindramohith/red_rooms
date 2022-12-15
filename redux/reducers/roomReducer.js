import { CLEAR_ERRORS, GET_ROOMS_FAILURE, GET_ROOMS_SUCCESS, GET_ROOM_FAILURE, GET_ROOM_SUCCESS } from "../constants/roomConstants";

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
            return { rooms: [] }
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
            return { room: {} }
    }
}