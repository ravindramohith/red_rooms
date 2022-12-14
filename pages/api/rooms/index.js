import { deprecationHandler } from 'moment'
import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { allRooms } from '../../../controllers/roomControllers'

const connect = nc()
dbConnect()
connect.get(allRooms)
export default connect
// connect.get()