import { Router } from 'express';
import subjectController from "../controllers/Subject"

const subjectRouter = Router();

subjectRouter.post("/viewByCid", subjectController.getSubjectsByCid)

// subjectRouter.post("/update", subjectController.createStudent)
// subjectRouter.post("/delete", subjectController.createStudent)
// subjectRouter.post("/getExistingClass", subjectController.createStudent)
// subjectRouter.post("/getAttendance", subjectController.createStudent)

export default subjectRouter
