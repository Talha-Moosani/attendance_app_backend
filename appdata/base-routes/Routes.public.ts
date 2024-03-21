import express from "express"

import userSessionRoutes from '../api/v1/public/User/routes/Session'
import userAuthRouter from "../api/v1/public/User/routes/Auth"
import adminAuthRouter from "../api/v1/public/Admin/routes/Auth"

import userRouter from "../api/v1/private/User/routes/User"
import studentRoutes from "../api/v1/public/Student/routes/Student"
import classRoutes from "../api/v1/public/Class/routes/Class"
import subjectRoutes from "../api/v1/public/Subject/routes/Subject"
import attendanceRoutes from "../api/v1/public/Attendance/routes/Attendance"
import teacherRoutes from "../api/v1/public/Teacher/routes/Teacher"
const publicRouter = express.Router()
publicRouter.use('/v1/session', userSessionRoutes)
publicRouter.use('/v1/admin/auth', adminAuthRouter)
publicRouter.use('/v1/user/auth', userAuthRouter)

publicRouter.use('/v1/users/', userRouter)
publicRouter.use('/v1/students', studentRoutes)
publicRouter.use('/v1/classes', classRoutes)
publicRouter.use('/v1/subjects', subjectRoutes)
publicRouter.use('/v1/attendance', attendanceRoutes)
publicRouter.use('/v1/teacher',teacherRoutes)





export default publicRouter