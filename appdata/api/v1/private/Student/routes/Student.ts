import { Router } from 'express';
import studentController from "../controllers/Student"

const studentRouter = Router();

studentRouter.post("/create", studentController.createStudent)

studentRouter.post("/update", studentController.createStudent)
studentRouter.post("/delete", studentController.createStudent)
studentRouter.post("/getExistingClass", studentController.createStudent)
studentRouter.post("/getAttendance", studentController.createStudent)

export default studentRouter
