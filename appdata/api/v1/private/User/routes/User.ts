import { Router } from 'express';
import userController from "../controllers/User"

const userRouter = Router();


userRouter.get(
  "/department/get/all/:id",
  userController.getUsersByDepartment
)

userRouter.get(
  "/types/get/all",
  userController.getUserTypes
)

// userRouter.get(
//   "/complaint-types/get/all",
//   userController.getComplaintTypes
// )

// userRouter.get(
//   "/statuses/get/all",
//   userController.getAllComplaintStatus
// )

export default userRouter
