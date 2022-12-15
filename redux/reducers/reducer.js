import { combineReducers } from 'redux'
import { allRoomsReducer, roomDetailsReducer } from './roomReducer'

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer
})

export default reducer