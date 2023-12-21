"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de autenticación */
const mailerController = require("../controllers/mailer.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
/** Instancia del enrutador */
const router = express.Router();

router.use(authenticationMiddleware);

// Define las rutas para la 
router.post("/send/:postId", authorizationMiddleware.isAdmin, mailerController.sendMailType1);


// Exporta el enrutador
module.exports = router;
