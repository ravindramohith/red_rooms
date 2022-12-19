import axios from "axios";
import {
    GET_ROOMS_FAILURE,
    GET_ROOMS_SUCCESS,
    GET_ROOM_FAILURE,
    GET_ROOM_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAILURE,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    REVIEW_AVAILABILITY_FAILURE,
    REVIEW_AVAILABILITY_REQUEST,
    REVIEW_AVAILABILITY_SUCCESS,
    GET_ROOMS_ADMIN_FAILURE,
    GET_ROOMS_ADMIN_REQUEST,
    GET_ROOMS_ADMIN_SUCCESS,
    NEW_ROOM_ADMIN_FAILURE,
    NEW_ROOM_ADMIN_REQUEST,
    NEW_ROOM_ADMIN_SUCCESS,
    UPDATE_ROOM_ADMIN_FAILURE,
    UPDATE_ROOM_ADMIN_REQUEST,
    UPDATE_ROOM_ADMIN_SUCCESS,
    UPDATE_ROOM_ADMIN_RESET,
    DELETE_ROOM_ADMIN_FAILURE,
    DELETE_ROOM_ADMIN_REQUEST,
    DELETE_ROOM_ADMIN_SUCCESS,
    DELETE_ROOM_ADMIN_RESET,
    CLEAR_ERRORS,
} from "../constants/roomConstants";
import absoluteUrl from 'next-absolute-url'

//Get all Rooms

export const getRooms = (req, currentPage = 1, location = '', guests, category) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req);
        let link = `${origin}/api/rooms/?page=${currentPage}&location=${location}`
        if (!currentPage || currentPage == NaN) {
            currentPage = 1;
        }
        if (guests) link = link + `&guestCapacity=${guests}`
        if (category) { link = link + `&category=${category}` }
        const { data } = await axios.get(link);
        dispatch({
            type: GET_ROOMS_SUCCESS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: GET_ROOMS_FAILURE,
            payload: e.response.data.message
        })
    }
}

//admin
export const getRoomsAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ROOMS_ADMIN_REQUEST })
        const link = '/api/admin/rooms'
        const { data } = await axios.get(link);
        dispatch({
            type: GET_ROOMS_ADMIN_SUCCESS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: GET_ROOMS_ADMIN_FAILURE,
            payload: e.response.data.message
        })
    }
}

//Get Room
export const getRoom = (req, id) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req);
        const { data } = await axios.get(`${origin}/api/rooms/${id}`)
        dispatch({
            type: GET_ROOM_SUCCESS,
            payload: data.room
        })
    } catch (e) {
        dispatch({
            type: GET_ROOM_FAILURE,
            payload: e
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/reviews`, reviewData, config)
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (e) {
        dispatch({
            type: NEW_REVIEW_FAILURE,
            payload: e
        })
    }
}

export const newRoomAdmin = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_ROOM_ADMIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/admin/rooms`, reviewData, config)
        dispatch({
            type: NEW_ROOM_ADMIN_SUCCESS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: NEW_ROOM_ADMIN_FAILURE,
            payload: e
        })
    }
}

export const updateRoomAdmin = (id, roomData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ROOM_ADMIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/rooms/${id}`, roomData, config)
        dispatch({
            type: UPDATE_ROOM_ADMIN_SUCCESS,
            payload: data.success
        })
    } catch (e) {
        dispatch({
            type: UPDATE_ROOM_ADMIN_FAILURE,
            payload: e.response.data.message
        })
    }
}

export const deleteRoomAdmin = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ROOM_ADMIN_REQUEST })
        const { data } = await axios.delete(`/api/rooms/${id}`)
        dispatch({
            type: DELETE_ROOM_ADMIN_SUCCESS,
            payload: data.success
        })
    } catch (e) {
        dispatch({
            type: DELETE_ROOM_ADMIN_FAILURE,
            payload: e.response.data.message
        })
    }
}

export const checkReviewAvailability = (roomId) => async (dispatch) => {
    try {
        dispatch({ type: REVIEW_AVAILABILITY_REQUEST })
        const { data } = await axios.get(`/api/reviews/check?roomId=${roomId}`)
        dispatch({
            type: REVIEW_AVAILABILITY_SUCCESS,
            payload: data.isReviewAvailable
        })
    } catch (e) {
        dispatch({
            type: REVIEW_AVAILABILITY_FAILURE,
            payload: e
        })
    }
}

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}


// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req }) => {
//     await store.dispatch(getRooms(req))
//   })