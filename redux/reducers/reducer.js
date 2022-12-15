import { combineReducers } from 'redux'
import { allRoomsReducer, roomDetailsReducer } from './roomReducer'
import { authReducer } from './userreducers'

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
})

export default reducer