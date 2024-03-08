import { Router } from 'express';
import classController from "../controllers/Class"

const classRouter = Router();

classRouter.post("/createClass", classController.createClass)

 classRouter.put("/updateClassName", classController.updateClassName)
classRouter.delete("/deleteClass", classController.deleteClass)
 classRouter.get("/viewClass", classController.viewClass)
//classRouter.post("/getAttendance", classController.createStudent)

export default classRouter
