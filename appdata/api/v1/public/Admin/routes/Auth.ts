import { Router } from "express";
import adminController from "../controllers/Auth";

const adminAuthRouter = Router();

adminAuthRouter.post("/register", adminController.register);

adminAuthRouter.post("/reset-password", adminController.resetPassword);

export default adminAuthRouter;
