import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'
import { getUserAdmin, updateUserAdmin, deleteUserAdmin } from '../../../../controllers/authControllers'
import onError from "../../../../middlewares/errors"
import { Authorization, authorizeRules } from '../../../../middlewares/auth'


const connect = nc({ onError })
dbConnect()
connect.use(Authorization, authorizeRules('admin')).get(getUserAdmin).put(updateUserAdmin).delete(deleteUserAdmin)
export default connect