import express from "express"
const getRoutes = require("../api/v1/private/Admin/routes/Get");
const uploadRoutes = require("../api/v1/private/Admin/routes/Upload");
const updateRoutes = require("../api/v1/private/Admin/routes/Update");
const removeRoutes = require("../api/v1/private/Admin/routes/Remove");
const createRoutes = require("../api/v1/private/Admin/routes/Create");
const sessionRoutes = require("../api/v1/private/Admin/routes/Session");
const router = express.Router()

router.use("/v1/admins/get/", getRoutes)
router.use("/v1/admins/remove/", removeRoutes);
router.use("/v1/admins/upload/", uploadRoutes);
router.use("/v1/admins/update/", updateRoutes);
router.use("/v1/admins/create/", createRoutes);
router.use("/v1/admins/session", sessionRoutes)

module.exports = router
