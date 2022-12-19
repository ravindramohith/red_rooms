import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { getSingleRoom, updateSingleRoom, deleteSingleRoom } from '../../../controllers/roomControllers'
import onError from "../../../middlewares/errors"
import { Authorization, authorizeRules } from '../../../middlewares/auth'


const connect = nc({ onError })
dbConnect()
connect.get(getSingleRoom)
connect.use(Authorization, authorizeRules('admin')).put(updateSingleRoom).delete(deleteSingleRoom)
export default connect
