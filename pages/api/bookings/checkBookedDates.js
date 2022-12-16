import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { checkBookedDates } from '../../../controllers/bookingControllers'
import { Authorization } from '../../../middlewares/auth'
import onError from '../../../middlewares/errors'

const connect = nc({ onError })
dbConnect()
connect.get(checkBookedDates)
export default connect