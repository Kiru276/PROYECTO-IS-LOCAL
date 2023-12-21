const express = require("express");
/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const teoricExamController = require("../controllers/teoricExam.controller");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/getAllTeoricExams", teoricExamController.getAllTeoricExams);


module.exports = router;