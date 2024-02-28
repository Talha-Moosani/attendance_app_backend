import sessionController from "../controllers/Session";
import { verifyUser, verifyUserOnLogin } from "../../../../../../utils/auth.utils";
import { Router } from "express";

const adminSessionRouter = Router();

adminSessionRouter.post(
  "/login",
  verifyUserOnLogin,
  sessionController.login
);

export default adminSessionRouter;
