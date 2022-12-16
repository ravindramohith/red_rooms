import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { newBooking } from '../../../controllers/bookingControllers'
import { Authorization } from '../../../middlewares/auth'
import onError from '../../../middlewares/errors'

const connect = nc({ onError })
dbConnect()

connect.use(Authorization).post(newBooking)
export default connect