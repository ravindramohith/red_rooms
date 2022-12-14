import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { allRooms, newRoom } from '../../../controllers/roomControllers'
import onError from '../../../middlewares/errors'

const connect = nc({ onError })
dbConnect()
connect.get(allRooms).post(newRoom)
export default connect
