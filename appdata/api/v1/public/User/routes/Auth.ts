const userRouter = require("express").Router()
import userController from "../controllers/Auth"

userRouter.post(
  "/register",
  userController.register
)
userRouter.post(
  "/resetPassword",
  userController.resetPassword
)

export default userRouter
