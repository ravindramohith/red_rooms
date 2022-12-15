import axios from "axios";
import { GET_ROOMS_FAILURE, GET_ROOMS_SUCCESS, CLEAR_ERRORS, GET_ROOM_FAILURE, GET_ROOM_SUCCESS } from "../constants/roomConstants";
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

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}


// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req }) => {
//     await store.dispatch(getRooms(req))
//   })