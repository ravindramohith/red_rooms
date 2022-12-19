import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'
import { getAllBookingsAdmin } from '../../../../controllers/bookingControllers'
import onError from '../../../../middlewares/errors'
import { Authorization, authorizeRules } from '../../../../middlewares/auth'

const connect = nc({ onError })
dbConnect()
connect.use(Authorization, authorizeRules('admin')).get(getAllBookingsAdmin)
export default connect