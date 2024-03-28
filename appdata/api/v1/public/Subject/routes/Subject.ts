import { Router } from 'express';
import subjectController from "../controllers/Subject"

const subjectRouter = Router();

subjectRouter.post("/getAssigned", subjectController.getAssigned)
subjectRouter.post("/create", subjectController.create)
subjectRouter.post("/getUnassigned", subjectController.getUnassigned)
subjectRouter.post("/getAll", subjectController.getAll)
subjectRouter.post("/getByCid", subjectController.getByCid)


// subjectRouter.post("/update", subjectController.createStudent)
// subjectRouter.post("/delete", subjectController.createStudent)
// subjectRouter.post("/getExistingClass", subjectController.createStudent)
// subjectRouter.post("/getAttendance", subjectController.createStudent)

export default subjectRouter
