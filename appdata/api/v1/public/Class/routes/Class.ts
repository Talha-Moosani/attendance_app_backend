import { Router } from 'express';
import classController from "../controllers/Class"

const classRouter = Router();

classRouter.post("/createClass", classController.createClass)

 classRouter.post("/updateClassName", classController.updateClassName)
classRouter.post("/deleteClass", classController.deleteClass)
 classRouter.post("/viewClass", classController.viewClass)
 classRouter.post("/viewAll", classController.viewAll)

 //classRouter.post("/getAttendance", classController.createStudent)

export default classRouter
