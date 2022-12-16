import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { stripeCheckoutSession } from '../../../controllers/paymentControllers'
import onError from '../../../middlewares/errors'
import { Authorization } from '../../../middlewares/auth'

const connect = nc({ onError })
dbConnect()
connect.use(Authorization).get(stripeCheckoutSession)
export default connect
