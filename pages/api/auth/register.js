import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { register } from '../../../controllers/authControllers'
import onError from '../../../middlewares/errors'

const connect = nc({ onError })
dbConnect()
connect.post(register)
export default connect