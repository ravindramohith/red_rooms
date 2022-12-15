import nc from 'next-connect'
import dbConnect from '../../config/dbConnect'
import { getCurrentUser } from '../../controllers/authControllers'
import onError from '../../middlewares/errors'
import { Authorization } from '../../middlewares/auth'

const connect = nc({ onError })
dbConnect()
connect.use(Authorization).get(getCurrentUser)
export default connect