import { Router } from 'express';
import syllabusController from "../controllers/Syllabus"

const syllabusRouter = Router();

syllabusRouter.post("/create", syllabusController.create)
syllabusRouter.post("/mark", syllabusController.mark)
syllabusRouter.post("/get", syllabusController.get)
syllabusRouter.post("/getAssignedExpected", syllabusController.getAssignedExpected)





export default syllabusRouter
