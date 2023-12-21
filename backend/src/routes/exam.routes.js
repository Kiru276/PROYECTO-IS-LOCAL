const express = require("express");

const examController = require("../controllers/exams.controller");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);


router.get("/getAllExams", examController.getAllExams);
router.get("/getExamById/:examId", examController.getExamById);
router.get("/getExamByPostulationId/:postulationId", examController.getExamByPostulationId);
router.post("/createExam", authorizationMiddleware.isAdmin, examController.createExam);
router.put("/updateExam/:examId", authorizationMiddleware.isAdmin,  examController.updateExam);

module.exports = router;