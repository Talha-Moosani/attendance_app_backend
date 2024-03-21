import { Router } from 'express';
import teacherController from "../controllers/Teacher"

const teacherRouter = Router();

teacherRouter.post("/create", teacherController.create)
teacherRouter.post("/assignSubject",teacherController.assignSubject)
teacherRouter.post("/viewAll",teacherController.viewAll)
teacherRouter.post("/viewByCid",teacherController.viewByCid)

// teacherRouter.post("/update", teacherController.update)
// teacherRouter.post("/delete", teacherController.delete)
// teacherRouter.get("/getByCid", teacherController.viewByCid)
// teacherRouter.post("/getBySid", teacherController.viewBySid)

export default teacherRouter