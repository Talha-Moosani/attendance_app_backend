import { Router } from 'express';
import attendanceController from "../controllers/Attendance"

const attendanceRouter = Router();

attendanceRouter.post("/mark", attendanceController.mark)

// attendanceRouter.post("/update", attendanceController.update)
// attendanceRouter.post("/delete", attendanceController.delete)
// attendanceRouter.get("/getByCid", attendanceController.viewByCid)
// attendanceRouter.post("/getBySid", attendanceController.viewBySid)

export default attendanceRouter
