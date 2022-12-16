import axios from "axios";
import {
    GET_ROOMS_FAILURE, GET_ROOMS_SUCCESS, CLEAR_ERRORS, GET_ROOM_FAILURE, GET_ROOM_SUCCESS, NEW_REVIEW_FAILURE,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,
    REVIEW_AVAILABILITY_FAILURE,
    REVIEW_AVAILABILITY_REQUEST,
    REVIEW_AVAILABILITY_SUCCESS,
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
            payload: e.response.data.message
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