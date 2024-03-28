import { Router } from 'express';
import attendanceController from "../controllers/Attendance"

const attendanceRouter = Router();

attendanceRouter.post("/mark", attendanceController.mark)
attendanceRouter.post("/getWithinDatesS",attendanceController.getWithinDatesS)
attendanceRouter.post("/getWithinDatesT",attendanceController.getWithinDatesT)
attendanceRouter.post("/getByCidnDate",attendanceController.getByCidnDate)
attendanceRouter.post("/getByCid",attendanceController.getByCid)
attendanceRouter.post("/verifyByCid",attendanceController.verifyByCid)


// attendanceRouter.post("/update", attendanceController.update)
// attendanceRouter.post("/delete", attendanceController.delete)
// attendanceRouter.get("/getByCid", attendanceController.viewByCid)
// attendanceRouter.post("/getBySid", attendanceController.viewBySid)

export default attendanceRouter
