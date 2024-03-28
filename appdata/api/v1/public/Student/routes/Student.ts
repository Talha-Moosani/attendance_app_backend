import { Router } from 'express';
import studentController from "../controllers/Student"

const studentRouter = Router();

studentRouter.post("/create", studentController.createStudent)

studentRouter.post("/update", studentController.updateDetails)
//studentRouter.post("/delete", studentController.deleteStudent)
studentRouter.post("/getByCid", studentController.getByCid)
studentRouter.post("/getAll", studentController.getAll)


export default studentRouter
