import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { createRoomReview } from '../../../controllers/roomControllers'
import onError from '../../../middlewares/errors'
import { Authorization } from '../../../middlewares/auth'

const connect = nc({ onError })
dbConnect()
connect.use(Authorization).put(createRoomReview)
export default connect
