import { combineReducers } from 'redux'
import { allRoomsReducer, roomDetailsReducer } from './roomReducer'
import { authReducer, userReducer, forgotPasswordReducer } from './userReducers'
import { checkBookingReducer, bookedDatesReducer, myBookingsReducer, getBookingReducer } from './bookingReducers'

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    myBookings: myBookingsReducer,
    bookingDetails: getBookingReducer
})

export default reducer