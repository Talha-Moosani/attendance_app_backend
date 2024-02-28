const sessionRouter = require("express").Router()
import sessionController from "../controllers/Session"
import { verifyUserOnLogin } from "../../../../../../utils/auth.utils"

sessionRouter.post(
  "/login",
  verifyUserOnLogin,
  sessionController.login
)


export default sessionRouter
