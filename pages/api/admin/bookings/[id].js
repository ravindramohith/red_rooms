import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'
import { deleteBooking } from '../../../../controllers/bookingControllers'
import onError from "../../../../middlewares/errors"
import { Authorization, authorizeRules } from '../../../../middlewares/auth'


const connect = nc({ onError })
dbConnect()
// connect.get(getSingleRoom)
connect.use(Authorization, authorizeRules('admin')).delete(deleteBooking)
export default connect