import axios from "axios";
import absoluteUrl from 'next-absolute-url'
import {
    CHECK_BOOKING_FAILURE,
    CHECK_BOOKING_REQUEST,
    CHECK_BOOKING_SUCCESS,
    BOOKED_DATES_SUCCESS,
    BOOKED_DATES_FAILURE,
    MY_BOOKINGS_FAILURE,
    MY_BOOKINGS_SUCCESS,
    GET_BOOKING_FAILURE,
    GET_BOOKING_SUCCESS,
    CLEAR_ERRORS
} from "../constants/bookingConstants";

export const checkBooking = (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    dispatch({ type: CHECK_BOOKING_REQUEST });
    try {
        let link = `/api/bookings/check?room_id=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
        const { data } = await axios.get(link)
        dispatch({
            type: CHECK_BOOKING_SUCCESS,
            payload: data.isAvailable,
        })
    } catch (e) {
        dispatch({ type: CHECK_BOOKING_FAILURE, payload: e });
        return;
    }
}


export const checkBookedDates = (roomId) => async (dispatch) => {
    try {
        let link = `/api/bookings/checkBookedDates?room_id=${roomId}`
        const { data } = await axios.get(link)

        dispatch({
            type: BOOKED_DATES_SUCCESS,
            payload: data,
        })
    } catch (e) {
        dispatch({ type: BOOKED_DATES_FAILURE, payload: e });
        return;
    }
}

export const getMyBookings = (authCookie, req) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req);
        let link = `${origin}/api/bookings/me`
        const config = {
            headers: {
                cookie: authCookie
            }
        }
        const { data } = await axios.get(link, config)
        dispatch({
            type: MY_BOOKINGS_SUCCESS,
            payload: data,
        })
    } catch (e) {
        dispatch({ type: MY_BOOKINGS_FAILURE, payload: e });
        return;
    }
}

export const getBooking = (authCookie, req, id) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req);
        let link = `${origin}/api/bookings/${id}`
        const config = {
            headers: {
                cookie: authCookie
            }
        }
        const { data } = await axios.get(link, config)
        dispatch({
            type: GET_BOOKING_SUCCESS,
            payload: data,
        })
    } catch (e) {
        dispatch({ type: GET_BOOKING_FAILURE, payload: e });
        return;
    }
}

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}