import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { checkReviewAvailability } from '../../../controllers/roomControllers'
import onError from '../../../middlewares/errors'
import { Authorization } from '../../../middlewares/auth'

const connect = nc({ onError })
dbConnect()
connect.use(Authorization).get(checkReviewAvailability)
export default connect
