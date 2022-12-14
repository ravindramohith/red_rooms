import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { getSingleRoom, updateSingleRoom, deleteSingleRoom } from '../../../controllers/roomControllers'
import onError from "../../../middlewares/errors"


const connect = nc({ onError })
dbConnect()
connect.get(getSingleRoom).put(updateSingleRoom).delete(deleteSingleRoom)
export default connect
