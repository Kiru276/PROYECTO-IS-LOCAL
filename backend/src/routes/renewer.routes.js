const express = require("express");
const router = express.Router();
const renewerController = require("../controllers/renewer.controller");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(authenticationMiddleware);
router.get("/getAllRenewers", authorizationMiddleware.isAdmin, renewerController.getAllRenewers);
router.get("/getSpecificRenewer/:postId", authorizationMiddleware.isAdmin, renewerController.getSpecificRenewer);
router.get("/getPendingRenewers", authorizationMiddleware.isAdmin, renewerController.getPendingRenewers);
router.get("/getAcceptRenewers", authorizationMiddleware.isAdmin, renewerController.getAcceptRenewers);
router.get("/getRejectedRenewers", authorizationMiddleware.isAdmin, renewerController.getRejectedRenewers);
router.post("/createRenewer", upload.single("archivo"), renewerController.createRenewer);

module.exports = router;

