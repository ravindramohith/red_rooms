import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { getBooking } from '../../../controllers/bookingControllers'
import { Authorization } from '../../../middlewares/auth'
import onError from '../../../middlewares/errors'

const connect = nc({ onError })
dbConnect()
connect.use(Authorization).get(getBooking)
export default connect 