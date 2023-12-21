/* eslint-disable max-len */
const express = require("express");
const multer = require("multer");
const router = express.Router();
const postulationController = require("../controllers/postulation.controller");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(authenticationMiddleware);
router.get("/getPostulation/:postId", authorizationMiddleware.isAdmin, postulationController.getPostulationSpecific);
router.get("/getAllPostulations", authorizationMiddleware.isAdmin, postulationController.getAllPostulations);
router.get("/getProcessedPostulations", authorizationMiddleware.isAdmin, postulationController.getProcessedPostulations);
router.get("/getPendingPostulations", authorizationMiddleware.isAdmin, postulationController.getPendingPostulations);
router.post("/updateFile", upload.single("archivo"), postulationController.setNuevoDocumento);
router.get("/getFile/:postId/:tipoDocumento", postulationController.getDocumento);
router.post("/createPostulation", upload.fields([
    { name: "certificadoEgreso", maxCount: 1 },
    { name: "antecedentesPenales", maxCount: 1 },
    { name: "carnet", maxCount: 1 },
    { name: "certificadoResidencia", maxCount: 1 },
]), postulationController.createPostulation);

module.exports = router;
