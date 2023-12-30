const express = require("express");
const router = express.Router();
const reserveController = require("../controllers/reserve.controller");
const { isAdmin } = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

// Define routes and their corresponding controller functions
// getReserveByUserId
// modifyReserve
// router.get("/getAllReserves", isAdmin, reserveController.getAllReserves);
// router.get("/getAllReserves", reserveController.getAllReserves);

router.use(authenticationMiddleware);

router.get("/getAllReserves", isAdmin, reserveController.getAllReserves);
router.get("/getAllReservesByUserId/:userId", reserveController.getAllReservesByUserId);
router.get("/getAllReservesByUserRut/:rut", reserveController.getAllReservesByUserRut);
router.post("/createReserve1", reserveController.createReserveTeorical);
router.post("/createReserve2", reserveController.createReservePsychotechnical);
router.post("/createReserve3", reserveController.createReserveOphthalmologic);
router.post("/createReserve4", reserveController.createReservePractical);
router.delete("/deleteReserve/:id", isAdmin, reserveController.deleteReserve);

module.exports = router;
