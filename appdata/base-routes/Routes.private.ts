import express from "express"
import userSessionRoutes from "../api/v1/private/User/routes/Session"
//import studentRoutes from "../api/v1/private/Student/routes/Student"
// import complaintsRoutes from "../api/v1/private/Complaints/routes/Complaints"
// import departmentRoutes from "../api/v1/private/Departments/routes/Departments"
import userRouter from "../api/v1/private/User/routes/User"
// import settingsRoutes from "../api/v1/private/Settings/routes/Settings"


const privateRouter = express.Router()

privateRouter.use("/v1/users/session/", userSessionRoutes)
// privateRouter.use("/v1/students", studentRoutes)
// privateRouter.use("/v1/class", studentRoutes)
// privateRouter.use("/v1/attendance", studentRoutes)
// privateRouter.use("/v1/complaints/", complaintsRoutes)
// privateRouter.use("/v1/settings/", settingsRoutes)
// privateRouter.use('/v1/users/', userRouter)

// POST: url: localhost:8000/api/v1/students/create, data:{'name':'Talha'}

export default privateRouter
