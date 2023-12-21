/* eslint-disable max-len */

const ReserveService = require("../services/reserve.service");
const { reserveSchema, reserveIdSchema } = require("../schema/reserve.schema");
const { userRutSchema } = require("../schema/user.schema");
// const { verifyJWT } = require("../middlewares/authentication.middleware");

exports.getAllReserves = async function(req, res) {
    try {
        const reserves = await ReserveService.getAllReserves();
        return res.status(200).json(reserves);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getAllReservesByUserId = async function(req, res) {
    try {
        const { userId } = req.params; // Accede al parámetro de ID de usuario de la URL
        await reserveIdSchema.validateAsync({ reserveId: userId });

        const reserves = await ReserveService.getAllReservesByUserId(userId);

        if (!reserves) {
            // Si no hay reservas, devolver un error 404
            return res.status(404).json({ error: "No se encontraron reservas para el usuario con el ID proporcionado." });
        }
        
        return res.status(200).json(reserves);
    } catch (error) {
        // Manejo específico para el error de validación del esquema
        if (error.name === "ValidationError") {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({ error: `Error de validación del ID usuario: ${errorMessage}` });
        }

        return res.status(500).json({ error: error.message });
    }
};

exports.getAllReservesByUserRut = async function(req, res) {
    try {
        const { rut } = req.params;
        await userRutSchema.validateAsync({ rut });

        // Si la validación es exitosa, continúa con el resto del código
        const reserves = await ReserveService.getAllReservesByUserRut(rut);
        if (reserves === null) {
            // Si no se encontraron reservas, devuelve un código de estado 404
            return res.status(404).json({ error: "No se encontraron reservas para el usuario con el RUT proporcionado." });
        }
        return res.status(200).json(reserves);
    } catch (error) {
        // Manejo específico para el error de validación del esquema
        if (error.name === "ValidationError") {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({ error: `Error de validación del RUT: ${errorMessage}` });
        }
        
        // Otros errores
        return res.status(500).json({ error: error.message });
    }
};


exports.createReserveTeorical = async function(req, res) {
    try {
        const { fechaReserva, horaReserva, solicitanteId } = req.body;
        await reserveSchema.validateAsync({ fechaReserva, horaReserva, solicitanteId });
    
        const data = {
            fechaReserva,
            horaReserva, 
            tipoPrueba: "Teorico", 
            solicitanteId,
        };

        const savedReserve = await ReserveService.createReserve(data);

        return res.status(201).json({ message: "Reserva teorica creada", reserve: savedReserve });
    } catch (error) {
        if (error.name === "ValidationError") {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({ error: `Error al crear reserva de examen teorico: ${errorMessage}` });
        }


        return res.status(500).json({ error: error.message });
    }
};


exports.createReservePsychotechnical = async function(req, res) {
    try {
        const { fechaReserva, horaReserva, solicitanteId } = req.body;
        await reserveSchema.validateAsync({ fechaReserva, horaReserva, solicitanteId });
    
        const data = {
            fechaReserva,
            horaReserva, 
            tipoPrueba: "Psicotecnico", 
            solicitanteId,
        };

        const savedReserve = await ReserveService.createReserve(data);

        return res.status(201).json({ message: "Reserva psicotecnica creada", reserve: savedReserve });
    } catch (error) {
        if (error.name === "ValidationError") {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({ error: `Error al crear reserva de examen psicotécnico: ${errorMessage}` });
        }


        return res.status(500).json({ error: error.message });
    }
};


exports.createReserveOphthalmologic = async function(req, res) {
    try {
        const { fechaReserva, horaReserva, solicitanteId } = req.body;
        await reserveSchema.validateAsync({ fechaReserva, horaReserva, solicitanteId });

        const data = {
            fechaReserva,
            horaReserva, 
            tipoPrueba: "Oftalmologico", 
            solicitanteId,
        };
    
        const savedReserve = await ReserveService.createReserve(data);

        return res.status(201).json({ message: "Reserva oftalmologica creada", reserve: savedReserve });
    } catch (error) {
        if (error.name === "ValidationError") {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({ error: `Error al crear reserva de examen oftalmológico: ${errorMessage}` });
        }
        return res.status(500).json({ error: error.message });
    }
};


exports.createReservePractical = async function(req, res) {
    try {
        const { fechaReserva, horaReserva, solicitanteId } = req.body;
        await reserveSchema.validateAsync({ fechaReserva, horaReserva, solicitanteId });

        const data = {
            fechaReserva,
            horaReserva, 
            tipoPrueba: "Practico", 
            solicitanteId,
        };

        const savedReserve = await ReserveService.createReserve(data);

        return res.status(201).json({ message: "Reserva practica creada", reserve: savedReserve });
    } catch (error) {
        if (error.name === "ValidationError") {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({ error: `Error al crear reserva de examen práctico: ${errorMessage}` });
        }
        return res.status(500).json({ error: error.message });
    }
};

// Controlador para eliminar una reserva
exports.deleteReserve = async function(req, res) {
    try {
        const { id } = req.params;
        // await reserveIdSchema.validateAsync({ reserveIdSchema });
        
        const deletedReserve = await ReserveService.deleteReserve(id);

        if (!deletedReserve) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        return res.status(200).json({ message: "Reserva eliminada con éxito", reserve: deletedReserve });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


