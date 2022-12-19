import { combineReducers } from 'redux'
import { allRoomsReducer, checkReviewReducer, newReviewReducer, roomDetailsReducer, newRoomAdminReducer, roomAdminReducer } from './roomReducer'
import { authReducer, userReducer, forgotPasswordReducer } from './userReducers'
import { checkBookingReducer, bookedDatesReducer, myBookingsReducer, getBookingReducer } from './bookingReducers'

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    newRoom: newRoomAdminReducer,
    room: roomAdminReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    myBookings: myBookingsReducer,
    bookingDetails: getBookingReducer,
    newReview: newReviewReducer,
    checkReview: checkReviewReducer,
})

export default reducer