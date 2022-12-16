import nc from 'next-connect'
import dbConnect from '../../config/dbConnect'
import { webhookCheckout } from '../../controllers/paymentControllers'
import onError from '../../middlewares/errors'
import { Authorization } from '../../middlewares/auth'

const connect = nc({ onError })
dbConnect()
export const config = {
    api: {
        bodyParser: false,
    }
}
connect.post(webhookCheckout)
export default connect