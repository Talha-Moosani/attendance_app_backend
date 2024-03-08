import express from "express"
// const customerRoutes = require("../api/v1/public/Customer/routes/Auth")
// const customerSessionRoutes = require("../api/v1/public/Customer/routes/Session")
// const productRoutes = require("../api/v1/public/Product/routes/Product")
// const categoryRoutes = require("../api/v1/public/Category/routes/Category")
// const shippingAddressRoutes = require("../api/v1/public/ShippingAddress/routes/ShippingAddress")
// const ethRoutes = require("../api/v1/public/Ethereum/routes/Ethereum")
import userSessionRoutes from '../api/v1/public/User/routes/Session'
import userAuthRouter from "../api/v1/public/User/routes/Auth"
import adminAuthRouter from "../api/v1/public/Admin/routes/Auth"
// const paymentMethodTypesRoutes = require("../api/v1/public/PaymentMethodType/routes/PaymentMethodType")
// const orderWebhookRoutes = require("../api/v1/public/webhooks/routes/Order")
// const newsLetterSubscriberRoutes = require("../api/v1/public/NewsletterSubscriber/routes/NewsletterSubscriber")
// const ppRouter = require("../api/v1/public/PropserPoints/routes/ProsperPoints")
// const orderPublicRouter = require("../api/v1/public/Order/routes/Order")
// import departmentRoutes from "../api/v1/private/Departments/routes/Departments"
// import complaintRouter from "../api/v1/private/Complaints/routes/Complaints"
import userRouter from "../api/v1/private/User/routes/User"
import studentRoutes from "../api/v1/public/Student/routes/Student"
import classRoutes from "../api/v1/public/Class/routes/Class"
import subjectRoutes from "../api/v1/public/Subject/routes/Subject"
const publicRouter = express.Router()
publicRouter.use('/v1/session', userSessionRoutes)
publicRouter.use('/v1/admin/auth', adminAuthRouter)
publicRouter.use('/v1/user/auth', userAuthRouter)
// publicRouter.use("/v1/departments/", departmentRoutes)
// publicRouter.use('/v1/complaints', complaintRouter)
publicRouter.use('/v1/users/', userRouter)
publicRouter.use('/v1/students', studentRoutes)
publicRouter.use('/v1/classes', classRoutes)
publicRouter.use('/v1/subjects', subjectRoutes)
// router.use("/v1/customer", customerRoutes)
// router.use("/v1/customer/session", customerSessionRoutes)
// router.use("/v1/product", productRoutes)
// router.use("/v1/category", categoryRoutes)
// router.use("/v1/shipping-address", shippingAddressRoutes)
// router.use("/v1/ethereum", ethRoutes)
// router.use("/vi/propser-points", ppRouter)
// router.use("/v1/payment-method-types", paymentMethodTypesRoutes)
// router.use("/v1/webhooks/order", orderWebhookRoutes)
// router.use("/v1/newsletter/subscribers", newsLetterSubscriberRoutes)
// router.use("/v1/webhooks/", orderPublicRouter)

export default publicRouter