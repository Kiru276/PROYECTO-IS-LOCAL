"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

const mailerRoutes = require("./mailer.routes.js");

const postulationRoutes = require("./postulation.routes.js");

const renewerRoutes = require("./renewer.routes.js");

const examRoutes = require("./exam.routes.js");

const reserveRoutes = require("./reserve.routes.js");

const teoricExamRoutes = require("./teoricExam.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

router.use("/mailer", mailerRoutes);

router.use("/postulation", postulationRoutes);

router.use("/renewer", renewerRoutes);

router.use("/exam", examRoutes);

router.use("/reserve", reserveRoutes);

router.use("/teoricExam", teoricExamRoutes);

// Exporta el enrutador
module.exports = router;
