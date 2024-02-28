import { Router } from 'express';
import sessionController from "../controllers/Session"

const sessionRouter = Router();

sessionRouter.post("/logout", sessionController.logout)

export default sessionRouter

