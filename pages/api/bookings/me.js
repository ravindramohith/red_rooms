import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { getMyBookings } from '../../../controllers/bookingControllers'
import { Authorization } from '../../../middlewares/auth'
import onError from '../../../middlewares/errors'

const connect = nc({ onError })
dbConnect()

connect.use(Authorization).get(getMyBookings)
export default connect