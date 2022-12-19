import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'
import { allRoomsAdmin, newRoom } from '../../../../controllers/roomControllers'
import onError from '../../../../middlewares/errors'
import { Authorization, authorizeRules } from '../../../../middlewares/auth'

const connect = nc({ onError })
dbConnect()
connect.use(Authorization, authorizeRules('admin')).get(allRoomsAdmin).post(newRoom)
export default connect